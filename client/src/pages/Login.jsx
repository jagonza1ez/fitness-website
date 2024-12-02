/**
 * @file Login.jsx
 * @description Provides a login component for user authentication. Sends login details to the backend and 
 * stores the JWT token in local storage upon successful login.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Import the dedicated CSS for the login page

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5050/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Store token and user details in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/user-homepage");
      } else {
        setMessage(data.message);
        setError(true);
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("An error occurred. Please try again.");
      setError(true);
    }
  };
  

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      {message && (
        <p className={`login-message ${error ? 'error' : 'success'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Login;
