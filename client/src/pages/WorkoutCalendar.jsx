// WorkoutCalendar.jsx

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

const WorkoutCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workoutStats, setWorkoutStats] = useState({ weekly: 0, monthly: 0 });

  // Handler for calendar date selection (adds a workout)
  const handleDateChange = (date) => {
    setSelectedDate(date);
    saveWorkout(date); // Saves workout for the selected date
  };

  // Function to calculate workout stats based on dates
  const calculateWorkoutStats = (dates) => {
    const today = new Date();
    let weeklyCount = 0;
    let monthlyCount = 0;

    dates.forEach((dateStr) => {
      const date = new Date(dateStr);
      const daysAgo = (today - date) / (1000 * 60 * 60 * 24);

      if (daysAgo <= 7) weeklyCount++;
      if (daysAgo <= 30) monthlyCount++;
    });

    setWorkoutStats({ weekly: weeklyCount, monthly: monthlyCount });
  };

  // Fetch workout data from the server and calculate stats
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workouts/USER_ID'); // Replace USER_ID dynamically
        const data = await response.json();
        calculateWorkoutStats(data.workoutDates); // Calculates stats based on fetched dates
      } catch (err) {
        console.error('Error fetching workout data:', err);
      }
    };

    fetchWorkouts();
  }, []);

  // Function to save workout on the selected date
  const saveWorkout = async (date) => {
    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'USER_ID', date }), // Replace USER_ID dynamically
      });
      const result = await response.json();
      alert(result.message);

      // Re-fetch workouts to update stats
      fetchWorkouts();
    } catch (err) {
      console.error('Error saving workout:', err);
    }
  };

  return (
    <div>
      <h2>Track Your Workouts</h2>
      <Calendar onClickDay={handleDateChange} value={selectedDate} />
      <h3>Workout Stats</h3>
      <p>Workouts this week: {workoutStats.weekly}</p>
      <p>Workouts this month: {workoutStats.monthly}</p>
    </div>
  );
};

export default WorkoutCalendar;
