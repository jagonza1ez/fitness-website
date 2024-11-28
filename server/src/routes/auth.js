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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usersCollection.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

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

router.get("/users", async (req, res) => {
  const { userId } = req.query;

  try {
    const users = await usersCollection
      .find({ _id: { $ne: new ObjectId(userId) } }) // Exclude the current user
      .toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

router.get('/api/friends/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('friends'); // Populate friends field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ friends: user.friends });
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Export router to use in the main server file
export default router;
