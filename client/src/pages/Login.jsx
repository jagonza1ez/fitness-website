/*
*  Supports Feature -> Login for user logins.
*  This file sends login details to the backend, and on success, stores
*  the JWT Token in localstore.
*/

import React, { useState } from 'react';
// redirect to userHome page
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await fetch('/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });

    try {
      const response = await fetch('http://localhost:5050/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

    const data = await response.json();


    if (response.ok) {
      // Store the token in local storage or context for future requests
      localStorage.setItem('token', data.token);
      setMessage(data.message);
      setError(false);
      navigate('/user-homepage'); // Redirect to user homepage on successful login
    } else {
      setMessage(data.message || 'Login failed.');
      setError(true);
    }
  } catch (err) {
    console.error('Error:', err);
    setMessage('An error occurred. Please try again later.');
    setError(true);
  }
};

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
