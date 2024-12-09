/**
 * @file WorkoutCalendar.jsx
 * @description Provides a React component for tracking and displaying workout 
 * dates using a calendar interface. Allows users to add workouts, view weekly and 
 * monthly workout stats, and interacts with the backend to fetch and save workout 
 * data.
 */
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../styles/Calendar.css';

const WorkoutCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workoutStats, setWorkoutStats] = useState({ weekly: 0, monthly: 0, dates: [] });

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

    setWorkoutStats({ weekly: weeklyCount, monthly: monthlyCount, dates });
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Replace with context if available
        const response = await fetch(`/api/workouts/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch workouts');
        const data = await response.json();
        calculateWorkoutStats(data.workoutDates || []);
      } catch (err) {
        console.error('Error fetching workout data:', err);
        alert('Unable to load workout data');
      }
    };
    fetchWorkouts();
  }, []);

  const saveWorkout = async (date) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, date: date.toISOString().split('T')[0] }),
      });
      if (!response.ok) throw new Error('Failed to save workout');
      const result = await response.json();
      alert(result.message);

      setWorkoutStats((prevStats) => ({
        ...prevStats,
        dates: [...prevStats.dates, date.toISOString().split('T')[0]],
      }));
    } catch (err) {
      console.error('Error saving workout:', err);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    saveWorkout(date);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">Track Your Workouts</h2>
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <Calendar
          onClickDay={handleDateChange}
          value={selectedDate}
          tileContent={({ date }) => {
            if (workoutStats.dates.includes(date.toISOString().split('T')[0])) {
              return <div className="bg-blue-500 rounded-full w-2 h-2 mx-auto"></div>;
            }
          }}
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-xl font-semibold">Workout Stats</h3>
        <p>Workouts this week: {workoutStats.weekly}</p>
        <p>Workouts this month: {workoutStats.monthly}</p>
      </div>
    </div>
  );
};

export default WorkoutCalendar;
