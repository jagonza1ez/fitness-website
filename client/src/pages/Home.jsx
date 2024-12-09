/**
 * @file Home.jsx
 * @description Defines the Home page component for the IronPulse Fitness website.
 * Provides users with a welcome message and navigation buttons.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // Import the dedicated CSS for the home page

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            {/* Website Title */}
            <h1 className="home-title">
                IronPulse <span>Fitness</span>
            </h1>

            {/* Description */}
            <p className="home-description">
                Your gateway to health and fitness. Track progress, connect with friends, and achieve your goals!
            </p>

            {/* Signup and Login Buttons */}
            <div>
                <button
                    className="home-button signup"
                    onClick={() => navigate('/signup')}
                >
                    Signup
                </button>
                <button
                    className="home-button login"
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Home;
