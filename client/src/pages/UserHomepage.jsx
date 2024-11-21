/**
 * @file userHomepage.jsx
 * @description Defines the UserHomepage component with a Facebook-style layout.
 * Provides a profile section, friends list, and navigation buttons for 
 * interacting with the app.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserHomepage.css'; // Import custom styles for UserHomepage

const UserHomepage = () => {
  const navigate = useNavigate();

  const goToCalendar = () => navigate("/calendar");
  const goToWorkoutPage = () => navigate("/workout");
  const addFriend = () => alert("Feature not yet implemented: Add Friend");
  const viewFriends = () => alert("Feature not yet implemented: View Friends");

  // Mock user data - Replace with dynamic fetching
  const userData = {
    profilePicture: "https://via.placeholder.com/150",
    fullName: "John Doe",
    aboutMe: "Fitness enthusiast and marathon runner. I believe in staying active and healthy every day.",
    friendsCount: 10,
  };

  return (
    <div className="user-homepage-container bg-gray-900 text-white min-h-screen flex flex-col items-center py-8 px-4">
      {/* Profile Section */}
      <div className="profile-section bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-lg">
        <img
          src={userData.profilePicture}
          alt="Profile"
          className="profile-picture mx-auto rounded-full mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{userData.fullName}</h2>
        <p className="text-gray-400 text-sm mb-4">{userData.aboutMe}</p>
      </div>

      {/* Friends Section */}
      <div className="friends-section bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-lg mt-6">
        <h3 className="text-xl font-bold mb-4">Friends</h3>
        <p className="text-gray-400 text-sm">You have {userData.friendsCount} friends</p>
        <div className="buttons mt-4 flex justify-center space-x-4">
          <button
            onClick={addFriend}
            className="btn-primary bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Add Friend
          </button>
          <button
            onClick={viewFriends}
            className="btn-secondary bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md"
          >
            View Friends
          </button>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="navigation-section mt-6 flex flex-col space-y-4">
        <button
          onClick={goToCalendar}
          className="btn-calendar bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md"
        >
          Go to Calendar
        </button>
        <button
          onClick={goToWorkoutPage}
          className="btn-workout bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-md"
        >
          Go to Workout Page
        </button>
      </div>
    </div>
  );
};

export default UserHomepage;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/UserHomepage.css'; // Import custom styles for UserHomepage

// const UserHomepage = () => {
//   const navigate = useNavigate();

//   const goToCalendar = () => navigate("/calendar");
//   const addFriend = () => alert("Feature not yet implemented: Add Friend");
//   const viewFriends = () => alert("Feature not yet implemented: View Friends");

//   // Mock user data - Replace with dynamic fetching
//   const userData = {
//     profilePicture: "https://via.placeholder.com/150", // Placeholder image
//     fullName: "John Doe",
//     aboutMe: "Fitness enthusiast and marathon runner. I believe in staying active and healthy every day.",
//     friendsCount: 10, // Mock friends count
//   };

//   return (
//     <div className="user-homepage-container bg-gray-900 text-white min-h-screen flex flex-col items-center py-8 px-4">
//       {/* Profile Section */}
//       <div className="profile-section bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-lg">
//         <img
//           src={userData.profilePicture}
//           alt="Profile"
//           className="profile-picture mx-auto rounded-full mb-4"
//         />
//         <h2 className="text-2xl font-bold mb-2">{userData.fullName}</h2>
//         <p className="text-gray-400 text-sm mb-4">{userData.aboutMe}</p>
//       </div>

//       {/* Friends Section */}
//       <div className="friends-section bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-lg mt-6">
//         <h3 className="text-xl font-bold mb-4">Friends</h3>
//         <p className="text-gray-400 text-sm">You have {userData.friendsCount} friends</p>
//         <div className="buttons mt-4 flex justify-center space-x-4">
//           <button
//             onClick={addFriend}
//             className="btn-primary bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
//           >
//             Add Friend
//           </button>
//           <button
//             onClick={viewFriends}
//             className="btn-secondary bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md"
//           >
//             View Friends
//           </button>
//         </div>
//       </div>

//       {/* Navigation Section */}
//       <div className="navigation-section mt-6">
//         <button
//           onClick={goToCalendar}
//           className="btn-calendar bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md"
//         >
//           Go to Calendar
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserHomepage;

// import React from 'react';
// import { useNavigate } from 'react-router-dom'

// /**
//  * UserHomepage Component
//  * Displays a welcome message and includes a button to navigate to 
//  * the calendar page.
//  * @returns {JSX.Element} The rendered user homepage component.
//  */
// const UserHomepage = () => {
//   const navigate = useNavigate();

//   /**
//    * Navigates the user to the calendar page.
//    */
//   const goToCalendar = () => {
//     navigate("/calendar"); 
//   };

//   return (
//     <div>
//       <h1>WELCOME TO IRON PULSE FITNESS!</h1>
//       {/* Calendar button */}
//       <button onClick={goToCalendar}>Go to Calendar</button>
//     </div>
//   );
// };

// export default UserHomepage
