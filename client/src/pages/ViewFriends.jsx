import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ViewFriends.css";

const ViewFriends = () => {
  const [friends, setFriends] = useState([]); // State to store full details of friends
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const token = localStorage.getItem("token");
    
        const response = await fetch(`http://localhost:5050/auth/api/friends/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch friends.");
        }
    
        const data = await response.json();
        console.log("API Response from Friends Endpoint:", data);
        setFriends(data.friends || []);
      } catch (err) {
        console.error("Error fetching friends:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
  
    fetchFriends(); // Fetch the friends data on component mount
  }, []);
  

  const goBack = () => {
    navigate("/user-homepage"); // Navigate back to the UserHomepage
  };

  if (loading) {
    return <p className="text-center text-white">Loading friends...</p>; // Show loading indicator
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>; // Show error message
  }

  return (
    <div className="view-friends-container bg-gray-900 text-white min-h-screen flex flex-col items-center py-8 px-4">
      <div className="title-section bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">View Friends</h1>
        <p className="text-gray-400">Here is the list of your friends:</p>
      </div>
      <div className="friends-list mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div
              key={friend._id}
              className="friend-card bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center"
            >
              <img
                src={friend.profilePicture || "https://via.placeholder.com/150"}
                alt={`${friend.name}'s profile`}
                className="rounded-full w-24 h-24 mb-4"
              />
              <h2 className="text-lg font-semibold">{friend.name}</h2>
              <p className="text-gray-400">@{friend.username}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">You have no friends yet.</p>
        )}
      </div>
      <div className="navigation mt-6">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="back-btn">
        Back
      </button>
      </div>
    </div>
  );
};

export default ViewFriends;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/ViewFriends.css'; // Import the CSS for consistent styling

// const ViewFriends = () => {
//   const navigate = useNavigate();

//   const goBack = () => {
//     navigate('/user-homepage'); // Navigate back to the UserHomepage
//   };

//   return (
//     <div className="view-friends-container bg-gray-900 text-white min-h-screen flex flex-col items-center py-8 px-4">
//       <div className="title-section bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-lg">
//         <h1 className="text-2xl font-bold mb-4">View Friends</h1>
//         <p className="text-gray-400">This is the placeholder for the View Friends page.</p>
//       </div>
//       <div className="navigation mt-6">
//         <button
//           onClick={goBack}
//           className="btn-back bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md"
//         >
//           Go Back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ViewFriends;
