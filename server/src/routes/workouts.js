import express from 'express';
import { usersCollection } from '../db/connection.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Route to save a workout date
router.post('/', async (req, res) => {
  const { userId, date } = req.body;

  try {
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

// Route to get workout history for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    res.json({ workoutDates: user.workoutDates || [] }); // Sends back an array of workout dates
  } catch (error) {
    console.error('Error fetching workout data:', error);
    res.status(500).json({ message: 'Error fetching workout data' });
  }
});

export default router;
