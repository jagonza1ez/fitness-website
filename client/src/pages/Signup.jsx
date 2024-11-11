/*
*  File supports Feature -> User signup for registration.
*  This will handle the basic fields for sign-up.
*       - Fields -> name
*                -> username 
*                -> email
*                -> password.
*/

import React, { useState } from 'react';
// redirects to userHome page
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '' });
  const [message, setMessage] = useState(''); // For success or error messages
  const [error, setError] = useState(false);  // For handling error state
  const navigate = useNavigate(); // Initialize navigate

  // Handle form input changes
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend signup endpoint
      const response = await fetch('http://localhost:5050/auth/signup', { // Use full backend URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Display success message
        setError(false); // Reset error state
        navigate('/user-homepage'); // Redirect to user homepage on success
      } else {
        setMessage(data.message || 'Sign up failed.'); // Display error message
        setError(true); // Set error state
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage('An error occurred. Please try again later.');
      setError(true);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>

      {message && (
        <p style={{ color: error ? 'red' : 'green' }}>{message}</p>
      )}
    </div>
  );
};

export default Signup;
