/*
*  FEATURE - USER SIGN UP -> file dedicated to handling user authentication (sign up and login)
*  Additional database    -> store users in a users collection instead of employees collection
*  Hash passwords  -> use bcrypt for security.
*  Return Response -> for signup returns a success message. 
*                  -> for login returns a JSON Web Token (JWT)
*/

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db/connection.js";

const router = express.Router();

// Sign Up Route
router.post("/signup", async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    // Check if user already exists
    const collection = db.collection("users");
    const existingUser = await collection.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    const newUser = { name, username, email, password: hashedPassword };
    const result = await collection.insertOne(newUser);

    res.status(201).json({ message: "User registered successfully", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error signing up" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const collection = db.collection("users");
    const user = await collection.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in" });
  }
});

export default router;
