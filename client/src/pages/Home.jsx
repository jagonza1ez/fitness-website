/*
*  Sets up Fitness website home page
*/

// client/src/pages/Home.jsx
import React from 'react';

/**
 *  Defines the Home function in react.
 * div will wrap the entire component content and ties Tailwind CSS utilities to it.
 * flex flex-col est. a flex container and aligns its children vertically.
 * items-center will center the content horizontally
 * p-6 adds padding of 6 units around the content.
 * h1 servers as the primary title (website name), text-4xl is large font, font-bold is bold font, text-center centers it, mt-4 adds 4 units of spacing.
 * p - is a paragraph format
 *
 * @return {*} 
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
