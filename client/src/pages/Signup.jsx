/*
*  File supports Feature -> User signup for registration.
*  This will handle the basic fields for sign-up.
*       - Fields -> name
*                -> username 
*                -> email
*                -> password.
*/
/**
 * @file Signup.jsx
 * @description Provides a signup form for new user registration. 
 * Handles input validation and user submission to the backend.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css'; // Import the dedicated CSS for styling

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5050/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError(false);
        navigate('/user-homepage');
      } else {
        setMessage(data.message || 'Sign up failed.');
        setError(true);
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage('An error occurred. Please try again later.');
      setError(true);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && (
        <p className={`signup-message ${error ? 'error' : 'success'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Signup;
