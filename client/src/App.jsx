/*
* High-level layout component for the application. It includes a navigation bar (Navbar) 
* and a placeholder (Outlet) for nested route components.
*/
import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

/**
 * Defines the function App and returns the layout
 * in Tailwind CSS format.
 * div is the container for the layout and applies 
 * the Tailwind CSS classes w-full & p-6
 * w-full sets the width to be 100%
 * p-6 adds padding of 6 units.
 * Navbar renders the Navbar component at the top of all pages since its part of App.
 * Outlet is the placeholder for child route components.
 * @return {*} 
 */
const App = () => {
  return (
    <div className="w-full p-6">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default App
