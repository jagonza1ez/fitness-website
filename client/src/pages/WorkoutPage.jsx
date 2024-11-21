import React from 'react';
import '../styles/WorkoutPage.css'; // Custom styling for the workout page

const WorkoutPage = () => {
  return (
    <div className="workout-page bg-gray-100 text-gray-900 min-h-screen flex flex-col items-center p-6">
      {/* Header */}
      <header className="workout-header text-center py-6 bg-purple-600 text-white rounded-lg shadow-lg w-full">
        <h1 className="text-4xl font-bold">Plan Your Workouts</h1>
        <p className="text-lg mt-2">Choose exercises, set goals, and track progress!</p>
      </header>

      {/* Main Content */}
      <main className="workout-content mt-6 w-full max-w-4xl">
        {/* Search Bar */}
        <div className="search-bar mb-6">
          <input
            type="text"
            className="search-input border-gray-300 shadow-sm w-full p-3 rounded-lg"
            placeholder="Search exercises..."
          />
        </div>

        {/* Workout Categories */}
        <div className="categories grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="category-card bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold">Cardio</h3>
            <p className="text-gray-600 mt-2">Boost endurance and burn calories.</p>
          </div>
          <div className="category-card bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold">Strength</h3>
            <p className="text-gray-600 mt-2">Build muscle and increase power.</p>
          </div>
          <div className="category-card bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold">Flexibility</h3>
            <p className="text-gray-600 mt-2">Improve mobility and prevent injuries.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkoutPage;
