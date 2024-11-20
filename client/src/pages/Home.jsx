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

// /**
//  * @file Home.jsx
//  * @description Defines the Home page component for the IronPulse Fitness website. 
//  * Provides users with a welcome message and a brief introduction to the site's features.
//  */


// // client/src/pages/Home.jsx
// import React from 'react';

// /**
//  * Home Component
//  * Renders the home page with a welcome message and a brief description.
//  * Utilizes Tailwind CSS classes for styling and layout.
//  *
//  * @returns {JSX.Element} The rendered home page component.
//  */

// const Home = () => {
//     return (
//         <div className="flex flex-col items-center p-6">
//             <h1 className="text-4xl font-bold text-center mt-4">Welcome to IronPulse Fitness Website</h1>
//             <p className="mt-2 text-center text-lg text-gray-600">
//                 Explore our fitness programs, Compete with friends, track your progress, and stay healthy!
//             </p>
//         </div>
//     );
// };

// export default Home;
