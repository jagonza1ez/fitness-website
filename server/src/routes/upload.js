// src/routes/upload.js
import express from "express";
import cloudinary from "../db/cloudinary.js";
import { usersCollection } from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Endpoint to handle image uploads
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { file } = req.body;

  try {
    if (!file) return res.status(400).json({ message: "No file provided" });

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file, {
      folder: "user_photos",
    });

    // Update the user's profilePicture in MongoDB
    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { profilePicture: result.secure_url } }
    );

    res.status(200).json({
      message: "Image uploaded successfully",
      profilePicture: result.secure_url,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Error uploading image" });
  }
});

export default router;
