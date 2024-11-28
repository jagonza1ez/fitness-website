import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ViewFriends.css'; // Import the CSS for consistent styling

const ViewFriends = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/user-homepage'); // Navigate back to the UserHomepage
  };

  return (
    <div className="view-friends-container bg-gray-900 text-white min-h-screen flex flex-col items-center py-8 px-4">
      <div className="title-section bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">View Friends</h1>
        <p className="text-gray-400">This is the placeholder for the View Friends page.</p>
      </div>
      <div className="navigation mt-6">
        <button
          onClick={goBack}
          className="btn-back bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ViewFriends;
