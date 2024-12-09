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

export default router;

