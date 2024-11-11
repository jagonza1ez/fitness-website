/**
 * @file Calendar.jsx
 * @description Provides a React component that displays a calendar for users to track and record their workouts. Users can select a date on the calendar to save a workout entry to the database.
 */

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

/**
 * WorkoutCalendar Component
 * Renders a calendar interface for users to select workout dates and saves the selected dates to the database.
 * @returns {JSX.Element} The rendered calendar component.
 */

const WorkoutCalendar = () => {
  // State to keep track of the currently selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  /**
   * Handles the date selection event from the calendar.
   * Updates the selected date state and triggers the saveWorkout function.
   * @param {Date} date - The date selected by the user.
   */

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Save workout to database for selected date
    saveWorkout(date);
  };

  /**
   * Sends a POST request to save the selected workout date to the database.
   * @param {Date} date - The date of the workout to save.
   */
  const saveWorkout = async (date) => {
    const response = await fetch('/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Convert the date object to a JSON string
      body: JSON.stringify({ date }),
    });
    const data = await response.json();
    // Display a message to the user based on the server response
    alert(data.message);
  };

  return (
    <div>
      <h2>Track Your Workouts</h2>
      <Calendar onClickDay={handleDateChange} value={selectedDate} />
    </div>
  );
};

export default WorkoutCalendar;
