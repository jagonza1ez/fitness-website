import express from 'express'; // Import Express
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { usersCollection } from '../db/connection.js';
import { ObjectId } from 'mongodb';
import multer from 'multer';
import cloudinary from '../db/cloudinary.js'; // Import Cloudinary configuration

const router = express.Router(); // Initialize the router

const storage = multer.diskStorage({});
const upload = multer({ storage });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.put('/profile-picture/:userId', upload.single('profilePicture'), async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'user_profiles',
    });

    const updateResult = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { profilePicture: result.secure_url } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile picture updated successfully',
      profilePicture: result.secure_url,
    });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ message: 'Error uploading profile picture' });
  }
});
router.post("/signup", async (req, res) => {
  const { name, username, email, password } = req.body;

  // Validate incoming data
  if (!name || !username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the email or username already exists
    const existingUser = await usersCollection.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username already exists." });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = {
      name,
      username,
      email,
      password: hashedPassword,
      workoutLogs: [], // Initialize workoutLogs as an empty array
      friends: [], // Initialize friends as an empty array
    };

    const result = await usersCollection.insertOne(newUser);

    if (result.acknowledged) {
      return res.status(201).json({ message: "User registered successfully." });
    } else {
      throw new Error("Failed to create user.");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await usersCollection.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
          { userId: user._id }, // Include user ID in the token payload
          process.env.JWT_SECRET, // Use secret from environment variables
          { expiresIn: "1h" } // Token expires in 1 hour
      );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        aboutMe: user.aboutMe || "No bio available",
        profilePicture: user.profilePicture || "https://via.placeholder.com/150",
        friends: user.friends || [], // Include friends array here
      },
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Error logging in" });
  }
});

router.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await usersCollection.findOne(
      { _id: new ObjectId(userId) },
      { projection: { name: 1, username: 1, profilePicture: 1 } } // Include necessary fields only
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


router.get('/api/friends/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId." });
  }

  try {
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    console.log("User's Friends Array:", user.friends);

    // Convert string IDs to ObjectIds for querying
    const friendObjectIds = user.friends.map(friendId => new ObjectId(friendId));

    // Fetch friends' details
    const friends = await usersCollection.find({ _id: { $in: friendObjectIds } }).toArray();

    console.log("Friends Details from DB:", friends); // Debugging log
    res.status(200).json({ friends });
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});




router.post("/add-friend", async (req, res) => {
  const { userId, friendId } = req.body;

  if (!userId || !friendId) {
    return res.status(400).json({ message: "Missing userId or friendId." });
  }

  try {
    // Find the user and the friend by their IDs
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    const friend = await usersCollection.findOne({ _id: new ObjectId(friendId) });

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found." });
    }

    // Check if they are already friends
    if (user.friends && user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Already friends." });
    }

    // Add the friend to the user's friends list
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $addToSet: { friends: friendId } } // Prevent duplicate entries
    );

    if (result.modifiedCount === 0) {
      return res.status(500).json({ message: "Failed to add friend." });
    }

    res.status(200).json({ message: "Friend added successfully." });
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


// Export router to use in the main server file
export default router;
