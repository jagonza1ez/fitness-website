/*
 * Main entry point for defining application routes and rendering the root component.
 * Uses React Router's `createBrowserRouter` and `RouterProvider` for routing.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home"; // Home page for public visitors
import Signup from "./pages/Signup"; // Sign up page
import Login from "./pages/Login"; // Login page
import UserHomepage from "./pages/UserHomepage"; // User homepage after login
import WorkoutCalendar from "./pages/WorkoutCalendar"; // Workout calendar for tracking workouts
import WorkoutPage from "./pages/WorkoutPage"; // New workout page for exercises
import ProtectedRoute from "./components/ProtectedRoute"; // ProtectedRoute component
import AddFriends from "./pages/AddFriends"; // Import the new page
import ViewFriends from './pages/ViewFriends'; // Import View Friends Page
import "./index.css"; // Global styles

/**
 * Application Routes
 * Organized to group related routes together and ensure scalability.
 */
const router = createBrowserRouter([
  {
    path: "/", // Root route, defines App layout
    element: <App />,
    children: [
      {
        path: "/", // Default home page route
        element: <Home />,
      },
      {
        path: "/signup", // Sign up route
        element: <Signup />,
      },
      {
        path: "/login", // Login route
        element: <Login />,
      },
      {
        path: "/user-homepage", // User homepage
        element: (
          <ProtectedRoute>
            <UserHomepage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/calendar", // Workout calendar for tracking progress
        element: (
          <ProtectedRoute>
            <WorkoutCalendar />
          </ProtectedRoute>
        ),
      },
      {
        path: "/workout", // New workout page for exercises
        element: (
          <ProtectedRoute>
            <WorkoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-friends", // Route for Add Friends page
        element: (
          <ProtectedRoute>
            <AddFriends />
          </ProtectedRoute>
        ),
      },  
      {
        path: '/view-friends', // Add View Friends route
        element: (
          <ProtectedRoute>
            <ViewFriends />
          </ProtectedRoute>
        ),
      },   
    ],
  },
]);

// Render the router configuration to the root DOM element
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
