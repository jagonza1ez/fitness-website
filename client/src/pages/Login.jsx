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
      const response = await fetch('http://localhost:5050/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setMessage(data.message);
        setError(false);
        navigate('/user-homepage');
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

// import React, { useState } from 'react';
// // redirect to userHome page
// import { useNavigate } from 'react-router-dom';

// /**
//  * Login Component
//  * Handles user login functionality by capturing user credentials, sending them to the backend, 
//  * and processing the response.
//  * @returns {JSX.Element} The rendered login form component.
//  */
// const Login = () => {
//   // State to manage form data input by the user
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   // State to manage messages and error status 
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState(false);
//   const navigate = useNavigate();
//   /**
//    * Updates the formData state when the user types into the input fields.
//    * @param {Object} e - The event object from the input field.
//    */  
//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
//   /**
//    * Handles form submission by sending a POST request to the backend with user credentials.
//    * On success, stores the JWT token and redirects the user to the homepage.
//    * @param {Object} e - The event object from the form submission.
//    */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // const response = await fetch('/auth/login', {
//     //   method: 'POST',
//     //   headers: { 'Content-Type': 'application/json' },
//     //   body: JSON.stringify(formData),
//     // });

//     try {
//       // Send login details to the backend
//       const response = await fetch('http://localhost:5050/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//     const data = await response.json();

//     if (response.ok) {
//       // Store the token in local storage or context for future requests
//       localStorage.setItem('token', data.token);
//       setMessage(data.message);
//       setError(false);
//       navigate('/user-homepage'); // Redirect to user homepage on successful login
//     } else {
//       setMessage(data.message || 'Login failed.');
//       setError(true);
//     }
//   } catch (err) {
//     console.error('Error:', err);
//     // Display a generic error message
//     setMessage('An error occurred. Please try again later.');
//     setError(true);
//   }
// };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       {message && (
//         <p style={{ color: error ? 'red' : 'green' }}>{message}</p>
//       )}
//     </div>
//   );
// };

// export default Login;
