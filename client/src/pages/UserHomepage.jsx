/**
 * @file userhomepage.jsx
 * @description Defines the UserHomepage component for the IronPulse 
 * Fitness application. Provides users with a welcome message and navigation 
 * to the calendar page for tracking workouts.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom'

/**
 * UserHomepage Component
 * Displays a welcome message and includes a button to navigate to 
 * the calendar page.
 * @returns {JSX.Element} The rendered user homepage component.
 */
const UserHomepage = () => {
  const navigate = useNavigate();

  /**
   * Navigates the user to the calendar page.
   */
  const goToCalendar = () => {
    navigate("/calendar"); 
  };

  return (
    <div>
      <h1>WELCOME TO IRON PULSE FITNESS!</h1>
      {/* Calendar button */}
      <button onClick={goToCalendar}>Go to Calendar</button>
    </div>
  );
};

export default UserHomepage
