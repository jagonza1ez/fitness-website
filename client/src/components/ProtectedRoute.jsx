// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute Component
 * Ensures that only authenticated users can access the wrapped routes.
 * Redirects unauthenticated users to the login page.
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - Child components to render if authenticated.
 * @returns {ReactNode} The rendered component or a redirect.
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/login" />;
  }

  return children; // Render the child components if authenticated
};

export default ProtectedRoute;
