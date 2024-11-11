/**
 * @file Home.jsx
 * @description Defines the Home page component for the IronPulse Fitness website. 
 * Provides users with a welcome message and a brief introduction to the site's features.
 */


// client/src/pages/Home.jsx
import React from 'react';

/**
 * Home Component
 * Renders the home page with a welcome message and a brief description.
 * Utilizes Tailwind CSS classes for styling and layout.
 *
 * @returns {JSX.Element} The rendered home page component.
 */

const Home = () => {
    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold text-center mt-4">Welcome to IronPulse Fitness Website</h1>
            <p className="mt-2 text-center text-lg text-gray-600">
                Explore our fitness programs, Compete with friends, track your progress, and stay healthy!
            </p>
        </div>
    );
};

export default Home;
