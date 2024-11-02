import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const WorkoutCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Save workout to database for selected date
    saveWorkout(date);
  };

  const saveWorkout = async (date) => {
    const response = await fetch('/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date }),
    });
    const data = await response.json();
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
