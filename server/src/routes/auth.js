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

// /*
//  * FEATURE - USER SIGN UP
//  * This file is dedicated to handling user authentication, including user sign-up and login.
//  * It includes:
//  * - Database usage: Stores users in a dedicated 'users' collection rather than the 'employees' collection.
//  * - Password security: Uses bcrypt to hash passwords before storing.
//  * - Response structure: Provides a success message for signup and a JSON Web Token (JWT) for login.
//  */

// import express from "express";                         // Importing Express to create route handlers
// import bcrypt from "bcrypt";                           // Importing bcrypt for password hashing
// import jwt from "jsonwebtoken";                        // Importing JSON Web Token for secure user sessions
// import { usersCollection } from "../db/connection.js"; // Import users collection

// // Creating a router instance for authentication routes
// const router = express.Router();

// // User Sign-Up Route
// // This route handles user registration by receiving user details, hashing the password, 
// // and saving the new user in the users collection.
// router.post("/signup", async (req, res) => {
//   const { name, username, email, password } = req.body;                 // Destructuring user data from request body
//   try {

//     // Check if user already exists in the database by email
//     const existingUser = await usersCollection.findOne({ email });     
//     if (existingUser) {
//       console.log("User already exists with email:", email);           // Debugging info for duplicate user
//       return res.status(400).json({ message: "User already exists" }); // Respond with 400 status if user exists
//     }

//     // Hash the password for secure storage
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the new user object with hashed password
//     const newUser = { name, username, email, password: hashedPassword };
//     // Insert new user into the database
//     const result = await usersCollection.insertOne(newUser); 

//     console.log("New user registered:", result); // Log the MongoDB result for debugging
//     // Send success message
//     res.status(201).json({ message: "User registered successfully", userId: result.insertedId });
//   } catch (err) {
//     console.error("Error during signup:", err);
//     res.status(500).json({ message: "Error signing up" });
//   }
// });

// User Login Route
// This route handles user login by validating credentials, comparing password hashes,
// and generating a JWT token if credentials are valid.
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Find the user by email
//     const user = await usersCollection.findOne({ email });
//     if (!user) {
//       console.log("User not found with email:", email);            // Debugging info for missing user
//       return res.status(400).json({ message: "User not found" });  // Respond with 400 status if user is not found
//     }

//     // Verify the password by comparing provided password with the stored hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log("Invalid credentials for user:", email);              // Debugging info for invalid password
//       return res.status(400).json({ message: "Invalid credentials" });  // Respond with 400 status for invalid credentials
//     }

//     // Generate a JWT token with user ID as the payload, setting expiration to 1 hour
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//     console.log("User logged in successfully:", email);     // Debugging info for successful login
//     res.json({ token, message: "Login successful" });       // Send token and success message in response
//   } catch (err) {
//     console.error("Error during login:", err);              // Log errors for debugging
//     res.status(500).json({ message: "Error logging in" });  // Send error response on server error
//   }
// });
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
      },
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Error logging in" });
  }
});

// Export router to use in the main server file
export default router;
