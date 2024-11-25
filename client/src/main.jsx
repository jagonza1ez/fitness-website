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
    ],
  },
]);

// Render the router configuration to the root DOM element
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);



/*
 *  Main entry point for defining application routes and rendering the root component.
 *  Uses React Router's `createBrowserRouter` and `RouterProvider` for routing.
 */

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "./App";
// import Home from "./pages/Home"; // Home page for public visitors
// import Signup from "./pages/Signup"; // Sign up page
// import Login from "./pages/Login"; // Login page
// import UserHomepage from "./pages/UserHomepage"; // User homepage after login
// import WorkoutCalendar from "./pages/WorkoutCalendar"; // Workout calendar for tracking workouts
// import WorkoutPage from "./pages/WorkoutPage"; // New workout page for exercises
// import "./index.css"; // Global styles

/**
 * Application Routes
 * Organized to group related routes together and ensure scalability.
 */
// const router = createBrowserRouter([
//   {
//     path: "/", // Root route, defines App layout
//     element: <App />,
//     children: [
//       {
//         path: "/", // Default home page route
//         element: <Home />,
//       },
//       {
//         path: "/signup", // Sign up route
//         element: <Signup />,
//       },
//       {
//         path: "/login", // Login route
//         element: <Login />,
//       },
//       {
//         path: "/user-homepage", // User homepage
//         element: <UserHomepage />,
//       },
//       {
//         path: "/calendar", // Workout calendar for tracking progress
//         element: <WorkoutCalendar />,
//       },
//       {
//         path: "/workout", // New workout page for exercises
//         element: <WorkoutPage />,
//       },
//     ],
//   },
// ]);

// // Render the router configuration to the root DOM element
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

// /*
// *  Sets uop Home page as default route for the root path (/).
// *  Organizes other routes under /records, /edit/:id and /create.
// */

// import * as React from "react";
// import * as ReactDOM from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import App from "./App";
// import Record from "./components/Record";
// import RecordList from "./components/RecordList";
// // Feature Website Homepage.
// import Home from "./pages/Home";
// // Feature User Logins -> Sign up & Login.
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import UserHomepage from './pages/UserHomepage';
// // Import the calendar component
// import WorkoutCalendar from './pages/WorkoutCalendar';
// import "./index.css";


// /** 
//  *  The createBrowserRouter function defines the routes as follows:
//  *  Root Route (/): -> path: "/" obj defines the root route with App as the layout component.
//  *      - App renders Navbar and includes <Outlet /> component, where the nested route components ( Home and RecordList ) will be displayed.
//  *  Nested Routes for Root (/): Under the root route we have 2 children routes -> path "/", element: <Home /> & path: "/records", element: <RecordList />.
//  *      - { path: "/", element: <Home /> }: When users visit /, the Home component renders by default.
//  *      - { path: "/records", element: <RecordList /> }: When users visit /records, RecordList renders within the App layout.
//  *  Edit Route ( /edit/:id ) -> This allows users to edit specific records based on an ID parameter.
//  *      - The URL structure "/edit/:id" means that :id is a dynamic segment, allowing routes like /edit/123.
//  *      - App serves as the layout, and the Record component renders within its <Outlet />.
//  *  Create Route ( /create ) -> This route is used to create new records.
//  *      - When users navigate to /create, App renders as the layout, and the Record component displays within its <Outlet />.
// */
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,             // Home page displayed at "/"
//       },
//       {
//         path: "/signup",
//         element: <Signup />,           // Sign Up feature displayed at "/" (Home)
//       },
//       {
//         path: "/login",
//         element: <Login />,           // Sign Up feature displayed at "/" (Home)
//       },
//       { 
//         path: '/user-homepage', 
//         element: <UserHomepage />    // User homepage route
//       },
//       {
//         path: "/calendar",
//         element: <WorkoutCalendar /> 
//       },
//       {
//         path: "/records",
//         element: <RecordList />,       // RecordList page displayed at "/records"
//       },
//     ],
//   },
//   {
//     path: "/edit/:id",
//     element: <App />,
//     children: [
//       {
//         path: "/edit/:id",
//         element: <Record />,     // Record component displayed at "/edit/:id"
//       },
//     ],
//   },
//   {
//     path: "/create",
//     element: <App />,
//     children: [
//       {
//         path: "/create",
//         element: <Record />,    // Record component displayed at "/create"
//       },
//     ],
//   },
// ]);

// // RouterProvider takes the router configuration and manages the entire app’s routing.
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>  // helps identify potential issues in the app’s components during development.
// );