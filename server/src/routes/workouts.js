// server/src/routes/workout.js

import express from "express";
import { usersCollection } from "../db/connection.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to authenticate the user
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token
  console.log("Token received:", token); // Debugging token received in the backend

  if (!token) {
      console.error("No token provided.");
      return res.status(401).json({ message: "Unauthorized" });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode and verify the token
      console.log("Decoded token payload:", decoded); // Debug decoded token
      req.userId = decoded.userId; // Attach user ID to request for further processing
      next();
  } catch (err) {
      console.error("Token verification failed:", err); // Debugging token errors
      return res.status(403).json({ message: "Forbidden" });
  }
};


// Save workout session
router.post("/", authenticateUser, async (req, res) => {
  const { date, title, startTime, endTime, exercises } = req.body;

  if (!date || !title || !startTime || !endTime || !exercises) {
      console.error("Incomplete workout details received.");
      return res.status(400).json({ message: "Incomplete workout details." });
  }

  try {
      const user = await usersCollection.findOne({ _id: new ObjectId(req.userId) });
      if (!user) {
          console.error("User not found for ID:", req.userId);
          return res.status(404).json({ message: "User not found." });
      }

      await usersCollection.updateOne(
          { _id: new ObjectId(req.userId) },
          {
              $push: {
                  workoutLogs: {
                      date,
                      title,
                      startTime,
                      endTime,
                      exercises,
                  },
              },
          }
      );

      console.log("Workout saved successfully for user:", req.userId);


            // Trigger total workouts calculation
      await fetch("http://localhost:5050/api/workouts/calculate-total-workouts", {
            method: "POST",
      });

      res.status(201).json({ message: "Workout saved successfully." });
  } catch (error) {
      console.error("Error saving workout:", error);
      res.status(500).json({ message: "Internal server error." });
  }
});


// Get all workout sessions for a user
router.get("/", authenticateUser, async (req, res) => {
    try {
        const user = await usersCollection.findOne({ _id: new ObjectId(req.userId) });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ workoutLogs: user.workoutLogs || [] });
    } catch (error) {
        console.error("Error fetching workouts:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// Add this to your workout.js route file
router.get("/stats", authenticateUser, async (req, res) => {
  try {
      const user = await usersCollection.findOne({ _id: new ObjectId(req.userId) });

      if (!user) {
          return res.status(404).json({ message: "User not found." });
      }

      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

      const monthly = user.workoutLogs.filter(
          (log) => new Date(log.date) >= startOfMonth
      ).length;

      const weekly = user.workoutLogs.filter(
          (log) => new Date(log.date) >= startOfWeek
      ).length;

      res.status(200).json({ monthly, weekly });
  } catch (err) {
      console.error("Error calculating stats:", err);
      res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/user/:userId", async (req, res) => {
    const { userId } = req.params;
  
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId." });
    }
  
    try {
      const user = await usersCollection.findOne(
        { _id: new ObjectId(userId) },
        { projection: { workoutLogs: 1, name: 1, username: 1 } }
      );
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      return res.status(200).json({
        workouts: user.workoutLogs || [],
        name: user.name,
        username: user.username,
      });
    } catch (error) {
      console.error("Error fetching workouts:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  });
  
/**
 * Calculates the total number of workouts for all users
 * and updates each user document with a `totalWorkouts` field.
 */
router.post("/update-total-workouts", async (req, res) => {
    try {
      // Fetch all users
      const users = await usersCollection.find({}).toArray();
  
      // Iterate through each user and calculate total workouts
      for (const user of users) {
        const totalWorkouts = user.workoutLogs ? user.workoutLogs.length : 0;
  
        // Update the user document with the totalWorkouts field
        await usersCollection.updateOne(
          { _id: user._id },
          { $set: { totalWorkouts } }
        );
      }
  
      res.status(200).json({ message: "Total workouts updated successfully for all users." });
    } catch (error) {
      console.error("Error updating total workouts:", error);
      res.status(500).json({ message: "Failed to update total workouts.", error });
    }
  });
  
  router.post("/calculate-total-workouts", async (req, res) => {
    try {
      // Update all users to include the totalWorkouts field
      const result = await usersCollection.updateMany(
        {}, // Match all users
        [
          {
            $set: {
              totalWorkouts: { $size: { $ifNull: ["$workoutLogs", []] } }
            }
          }
        ]
      );
  
      res.status(200).json({ message: "Total workouts updated successfully.", modifiedCount: result.modifiedCount });
    } catch (error) {
      console.error("Error calculating total workouts:", error);
      res.status(500).json({ message: "Failed to calculate total workouts.", error });
    }
  });
  


export default router;

