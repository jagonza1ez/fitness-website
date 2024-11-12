/**
 * @file workoutcalendar.jsx
 * @description Provides a React component for tracking and displaying workout 
 * dates using a calendar interface. Allows users to add workouts, view weekly and 
 * monthly workout stats, and interacts with the backend to fetch and save workout 
 * data.
 */

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

/**
 * WorkoutCalendar Component
 * Manages the workout calendar, including adding workouts on selected dates and 
 * displaying workout statistics.
 * @returns {JSX.Element} The rendered workout calendar component.
 */
const WorkoutCalendar = () => {
  // State to keep track of the selected date on the calendar
  const [selectedDate, setSelectedDate] = useState(new Date());
  // State to store the user's workout statistics (weekly and monthly counts)
  const [workoutStats, setWorkoutStats] = useState({ weekly: 0, monthly: 0 });

  /**
   * Handles the selection of a date on the calendar.
   * Updates the selected date state and triggers saving the workout for that date.
   * @param {Date} date - The date selected by the user.
   */  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    saveWorkout(date); // Saves workout for the selected date
  };

  /**
   * Calculates workout statistics (weekly and monthly) based on an array of 
   * workout dates.
   * @param {Array} dates - An array of workout date strings.
   */
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

  // Fetch workout data when the component mounts and whenever workouts are updated
  useEffect(() => {

  /**
   * Fetches the user's workout data from the server and calculates stats.
   */
    const fetchWorkouts = async () => {
      try {
        // TODO: Replace 'USER_ID' with the actual user ID dynamically
        const response = await fetch('/api/workouts/USER_ID'); // Replace USER_ID dynamically
        const data = await response.json();
        calculateWorkoutStats(data.workoutDates); // Calculates stats based on fetched dates
      } catch (err) {
        console.error('Error fetching workout data:', err);
      }
    };

    fetchWorkouts();
  }, []);

  /**
   * Saves a workout for the selected date to the server.
   * @param {Date} date - The date of the workout to save.
   */
  const saveWorkout = async (date) => {
    try {
      // TODO: Replace 'USER_ID' with the actual user ID dynamically
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'USER_ID', date }), // Replace USER_ID dynamically
      });
      const result = await response.json();
      alert(result.message);

      // Re-fetch workouts to update statistics after saving a new workout
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