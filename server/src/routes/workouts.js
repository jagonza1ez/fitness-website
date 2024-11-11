/**
 * @file workout.js
 * @description Defines routes for saving and retrieving workout dates for users. Handles 
 * POST requests to save a workout date and GET requests to fetch a user's workout history.
 */

import express from 'express';
import { usersCollection } from '../db/connection.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

/**
 * Route to save a workout date for a user.
 * @route POST /
 * @body {string} userId - The ID of the user.
 * @body {string} date - The date of the workout to be saved.
 * @returns {object} 201 - Success message.
 * @returns {object} 500 - Error message.
 */
router.post('/', async (req, res) => {
  const { userId, date } = req.body;

  try {
    // Add the workout date to the user's workoutDates array in the database
    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $push: { workoutDates: date } } // Adds the date to the user's workoutDates array
    );
    res.status(201).json({ message: 'Workout saved successfully' });
  } catch (error) {
    console.error('Error saving workout:', error);
    res.status(500).json({ message: 'Error saving workout' });
  }
});

/**
 * Route to get the workout history for a user.
 * @route GET /:userId
 * @param {string} userId - The ID of the user.
 * @returns {object} 200 - An array of workout dates.
 * @returns {object} 500 - Error message.
 */
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    // Retrieve the user from the database using the userId
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    // Send back the user's workoutDates array or an empty array if not found
    res.json({ workoutDates: user.workoutDates || [] }); 
  } catch (error) {
    console.error('Error fetching workout data:', error);
    res.status(500).json({ message: 'Error fetching workout data' });
  }
});

export default router;
