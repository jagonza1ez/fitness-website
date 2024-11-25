import cloudinary from "../db/cloudinary.js"; // Import the default export
import multer from "multer";
import express from "express";
import { usersCollection } from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.put("/profile-picture/:userId", upload.single("profilePicture"), async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "user_profiles",
    });

    const updateResult = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { profilePicture: result.secure_url } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile picture updated successfully",
      profilePicture: result.secure_url,
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ message: "Error uploading profile picture" });
  }
});

export default router;
