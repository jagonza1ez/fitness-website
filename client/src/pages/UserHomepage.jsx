import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/UserHomepage.css';

const UserHomepage = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false); // To handle upload status
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [friendCount, setFriendCount] = useState(0); // To store the number of friends the user has

  // Fetch the user's friends count
  useEffect(() => {
    const fetchFriendCount = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:5050/api/friends/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log('API Response:', response.data); // Debugging API Response
        if (response.status === 200) {
          setFriendCount(response.data.friends.length);
        }
      } catch (error) {
        console.error('Error fetching friend count:', error);
        setFriendCount(0);
      }
    };
  
    fetchFriendCount();
  }, [user.id]);
  
  const goToCalendar = () => navigate('/calendar');
  const goToWorkoutPage = () => navigate('/workout');
  const goToLeagueOfFitness = () => navigate('/league-of-fitness');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await axios.put(
        `http://localhost:5050/auth/profile-picture/${user.id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      const updatedUser = { ...user, profilePicture: response.data.profilePicture };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    } finally {
      setUploading(false);
    }
  };

  const addFriend = () => navigate('/add-friends');
  const viewFriends = () => navigate('/view-friends');
  const AdvancedWorkoutCalendar = () => navigate('/advanced-calendar');


  return (
    <div className="user-homepage-container bg-gray-900 text-white min-h-screen flex flex-col items-center py-8 px-4">
      {/* Profile Section */}
      <div className="profile-section bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-lg">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="profile-picture mx-auto rounded-full mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
        <p className="text-gray-400 text-sm mb-4">{user.aboutMe}</p>

        {/* Upload New Profile Picture */}
        <div className="upload-section mt-4">
          <label className="upload-label bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer">
            {uploading ? 'Uploading...' : 'Upload New Picture'}
            <input
              type="file"
              onChange={handleProfilePictureUpload}
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
      </div>

      {/* Friends Section */}
      <div className="friends-section bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-lg mt-6">
        <h3 className="text-xl font-bold mb-4">Friends</h3>
        <p className="text-gray-400 text-sm">You have {friendCount} friend(s)</p>
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
        
        <button
          onClick={() => navigate('/advanced-calendar')}
          className="btn-calendar bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md"
        >
          Go to Advanced Calendar
        </button>

        <button
          onClick={goToLeagueOfFitness}
          className="btn-league bg-yellow-600 hover:bg-yellow-700 px-6 py-2 rounded-md"
        >
          League of Fitness
        </button>

        <button
          onClick={handleLogout}
          className="btn-logout bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserHomepage;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/UserHomepage.css';

// const UserHomepage = () => {
//   const navigate = useNavigate();
//   const [uploading, setUploading] = useState(false); // To handle upload status
//   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
//   const [friendCount, setFriendCount] = useState(0); // To store the number of friends the user has

//   // Fetch the user's friends count
//   useEffect(() => {
//     const fetchFriendCount = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(
//           `http://localhost:5050/api/friends/${user.id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         console.log('API Response:', response.data); // Debugging API Response
//         if (response.status === 200) {
//           setFriendCount(response.data.friends.length);
//         }
//       } catch (error) {
//         console.error('Error fetching friend count:', error);
//         setFriendCount(0);
//       }
//     };
  
//     fetchFriendCount();
//   }, [user.id]);
  
//   const goToCalendar = () => navigate('/calendar');
//   const goToWorkoutPage = () => navigate('/workout');

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   const handleProfilePictureUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);

//     try {
//       const formData = new FormData();
//       formData.append('profilePicture', file);

//       const response = await axios.put(
//         `http://localhost:5050/auth/profile-picture/${user.id}`,
//         formData,
//         { headers: { 'Content-Type': 'multipart/form-data' } }
//       );

//       const updatedUser = { ...user, profilePicture: response.data.profilePicture };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//     } catch (error) {
//       console.error('Error uploading profile picture:', error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const addFriend = () => navigate('/add-friends');
//   const viewFriends = () => navigate('/view-friends');
//   const AdvancedWorkoutCalendar = () => navigate('/advanced-calendar');


//   return (
//     <div className="user-homepage-container bg-gray-900 text-white min-h-screen flex flex-col items-center py-8 px-4">
//       {/* Profile Section */}
//       <div className="profile-section bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-lg">
//         <img
//           src={user.profilePicture}
//           alt="Profile"
//           className="profile-picture mx-auto rounded-full mb-4"
//         />
//         <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
//         <p className="text-gray-400 text-sm mb-4">{user.aboutMe}</p>

//         {/* Upload New Profile Picture */}
//         <div className="upload-section mt-4">
//           <label className="upload-label bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer">
//             {uploading ? 'Uploading...' : 'Upload New Picture'}
//             <input
//               type="file"
//               onChange={handleProfilePictureUpload}
//               className="hidden"
//               accept="image/*"
//             />
//           </label>
//         </div>
//       </div>

//       {/* Friends Section */}
//       <div className="friends-section bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-lg mt-6">
//         <h3 className="text-xl font-bold mb-4">Friends</h3>
//         <p className="text-gray-400 text-sm">You have {friendCount} friend(s)</p>
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
//       <div className="navigation-section mt-6 flex flex-col space-y-4">
//         <button
//           onClick={goToCalendar}
//           className="btn-calendar bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md"
//         >
//           Go to Calendar
//         </button>
//         <button
//           onClick={goToWorkoutPage}
//           className="btn-workout bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-md"
//         >
//           Go to Workout Page
//         </button>
        
//         <button
//           onClick={() => navigate('/advanced-calendar')}
//           className="btn-calendar bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md"
//         >
//           Go to Advanced Calendar
//         </button>

//         <button
//           onClick={handleLogout}
//           className="btn-logout bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserHomepage;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/UserHomepage.css';

// const UserHomepage = () => {
//   const navigate = useNavigate();
//   const [uploading, setUploading] = useState(false); // To handle upload status
//   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

//   const goToCalendar = () => navigate('/calendar');
//   const goToWorkoutPage = () => navigate('/workout');

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   const handleProfilePictureUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);

//     try {
//       const formData = new FormData();
//       formData.append('profilePicture', file);

//       const response = await axios.put(
//         `http://localhost:5050/auth/profile-picture/${user.id}`,
//         formData,
//         { headers: { 'Content-Type': 'multipart/form-data' } }
//       );

//       const updatedUser = { ...user, profilePicture: response.data.profilePicture };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//     } catch (error) {
//       console.error('Error uploading profile picture:', error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const addFriend = () => navigate("/add-friends");
//   const viewFriends = () => alert('Feature not yet implemented: View Friends');

//   return (
//     <div className="user-homepage-container bg-gray-900 text-white min-h-screen flex flex-col items-center py-8 px-4">
//       <div className="profile-section bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-lg">
//         <img
//           src={user.profilePicture}
//           alt="Profile"
//           className="profile-picture mx-auto rounded-full mb-4"
//         />
//         <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
//         <p className="text-gray-400 text-sm mb-4">{user.aboutMe}</p>

//         {/* Upload New Profile Picture */}
//         <div className="upload-section mt-4">
//           <label className="upload-label bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer">
//             {uploading ? 'Uploading...' : 'Upload New Picture'}
//             <input
//               type="file"
//               onChange={handleProfilePictureUpload}
//               className="hidden"
//               accept="image/*"
//             />
//           </label>
//         </div>
//       </div>

//       <div className="friends-section bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-lg mt-6">
//         <h3 className="text-xl font-bold mb-4">Friends</h3>
//         <p className="text-gray-400 text-sm">You have 10 friends</p>
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

//       <div className="navigation-section mt-6 flex flex-col space-y-4">
//         <button
//           onClick={goToCalendar}
//           className="btn-calendar bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md"
//         >
//           Go to Calendar
//         </button>
//         <button
//           onClick={goToWorkoutPage}
//           className="btn-workout bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-md"
//         >
//           Go to Workout Page
//         </button>
//         <button
//           onClick={handleLogout}
//           className="btn-logout bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserHomepage;

// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../styles/UserHomepage.css"; // Import custom styles for UserHomepage

// // const UserHomepage = () => {
// //   const navigate = useNavigate();

// //   const goToCalendar = () => navigate("/calendar");
// //   const goToWorkoutPage = () => navigate("/workout");

// //   // Logout handler
// //   const handleLogout = () => {
// //     localStorage.removeItem("token"); // Clear stored token
// //     localStorage.removeItem("user"); // Clear stored user data
// //     navigate("/login"); // Redirect to login page
// //   };

// //   // Retrieve user info from localStorage
// //   const user = JSON.parse(localStorage.getItem("user"));

// //   // Mock functions for Add Friend and View Friends
// //   const addFriend = () => alert("Feature not yet implemented: Add Friend");
// //   const viewFriends = () => alert("Feature not yet implemented: View Friends");

// //   return (
// //     <div className="user-homepage-container bg-gray-900 text-white min-h-screen flex flex-col items-center py-8 px-4">
// //       {/* Profile Section */}
// //       <div className="profile-section bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-lg">
// //         <img
// //           src={user.profilePicture}
// //           alt="Profile"
// //           className="profile-picture mx-auto rounded-full mb-4"
// //         />
// //         <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
// //         <p className="text-gray-400 text-sm mb-4">{user.aboutMe}</p>
// //       </div>

// //       {/* Friends Section */}
// //       <div className="friends-section bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-lg mt-6">
// //         <h3 className="text-xl font-bold mb-4">Friends</h3>
// //         <p className="text-gray-400 text-sm">You have 10 friends</p>
// //         <div className="buttons mt-4 flex justify-center space-x-4">
// //           <button
// //             onClick={addFriend}
// //             className="btn-primary bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
// //           >
// //             Add Friend
// //           </button>
// //           <button
// //             onClick={viewFriends}
// //             className="btn-secondary bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md"
// //           >
// //             View Friends
// //           </button>
// //         </div>
// //       </div>

// //       {/* Navigation Section */}
// //       <div className="navigation-section mt-6 flex flex-col space-y-4">
// //         <button
// //           onClick={goToCalendar}
// //           className="btn-calendar bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md"
// //         >
// //           Go to Calendar
// //         </button>
// //         <button
// //           onClick={goToWorkoutPage}
// //           className="btn-workout bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-md"
// //         >
// //           Go to Workout Page
// //         </button>
// //         <button
// //           onClick={handleLogout}
// //           className="btn-logout bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md"
// //         >
// //           Logout
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserHomepage;

// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import '../styles/UserHomepage.css'; // Import custom styles for UserHomepage

// // const UserHomepage = () => {
// //   const navigate = useNavigate();

// //   const goToCalendar = () => navigate("/calendar");
// //   const goToWorkoutPage = () => navigate("/workout");
// //   const addFriend = () => alert("Feature not yet implemented: Add Friend");
// //   const viewFriends = () => alert("Feature not yet implemented: View Friends");

// //   // Mock user data - Replace with dynamic fetching
// //   const userData = {
// //     profilePicture: "https://via.placeholder.com/150",
// //     fullName: "John Doe",
// //     aboutMe: "Fitness enthusiast and marathon runner. I believe in staying active and healthy every day.",
// //     friendsCount: 10,
// //   };

// //   return (
// //     <div className="user-homepage-container bg-gray-900 text-white min-h-screen flex flex-col items-center py-8 px-4">
// //       {/* Profile Section */}
// //       <div className="profile-section bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-lg">
// //         <img
// //           src={userData.profilePicture}
// //           alt="Profile"
// //           className="profile-picture mx-auto rounded-full mb-4"
// //         />
// //         <h2 className="text-2xl font-bold mb-2">{userData.fullName}</h2>
// //         <p className="text-gray-400 text-sm mb-4">{userData.aboutMe}</p>
// //       </div>

// //       {/* Friends Section */}
// //       <div className="friends-section bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-lg mt-6">
// //         <h3 className="text-xl font-bold mb-4">Friends</h3>
// //         <p className="text-gray-400 text-sm">You have {userData.friendsCount} friends</p>
// //         <div className="buttons mt-4 flex justify-center space-x-4">
// //           <button
// //             onClick={addFriend}
// //             className="btn-primary bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
// //           >
// //             Add Friend
// //           </button>
// //           <button
// //             onClick={viewFriends}
// //             className="btn-secondary bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md"
// //           >
// //             View Friends
// //           </button>
// //         </div>
// //       </div>

// //       {/* Navigation Section */}
// //       <div className="navigation-section mt-6 flex flex-col space-y-4">
// //         <button
// //           onClick={goToCalendar}
// //           className="btn-calendar bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md"
// //         >
// //           Go to Calendar
// //         </button>
// //         <button
// //           onClick={goToWorkoutPage}
// //           className="btn-workout bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-md"
// //         >
// //           Go to Workout Page
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserHomepage;

// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import '../styles/UserHomepage.css'; // Import custom styles for UserHomepage

// // const UserHomepage = () => {
// //   const navigate = useNavigate();

// //   const goToCalendar = () => navigate("/calendar");
// //   const addFriend = () => alert("Feature not yet implemented: Add Friend");
// //   const viewFriends = () => alert("Feature not yet implemented: View Friends");

// //   // Mock user data - Replace with dynamic fetching
// //   const userData = {
// //     profilePicture: "https://via.placeholder.com/150", // Placeholder image
// //     fullName: "John Doe",
// //     aboutMe: "Fitness enthusiast and marathon runner. I believe in staying active and healthy every day.",
// //     friendsCount: 10, // Mock friends count
// //   };

// //   return (
// //     <div className="user-homepage-container bg-gray-900 text-white min-h-screen flex flex-col items-center py-8 px-4">
// //       {/* Profile Section */}
// //       <div className="profile-section bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-lg">
// //         <img
// //           src={userData.profilePicture}
// //           alt="Profile"
// //           className="profile-picture mx-auto rounded-full mb-4"
// //         />
// //         <h2 className="text-2xl font-bold mb-2">{userData.fullName}</h2>
// //         <p className="text-gray-400 text-sm mb-4">{userData.aboutMe}</p>
// //       </div>

// //       {/* Friends Section */}
// //       <div className="friends-section bg-gray-800 rounded-lg shadow-lg p-6 text-center w-full max-w-lg mt-6">
// //         <h3 className="text-xl font-bold mb-4">Friends</h3>
// //         <p className="text-gray-400 text-sm">You have {userData.friendsCount} friends</p>
// //         <div className="buttons mt-4 flex justify-center space-x-4">
// //           <button
// //             onClick={addFriend}
// //             className="btn-primary bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
// //           >
// //             Add Friend
// //           </button>
// //           <button
// //             onClick={viewFriends}
// //             className="btn-secondary bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md"
// //           >
// //             View Friends
// //           </button>
// //         </div>
// //       </div>

// //       {/* Navigation Section */}
// //       <div className="navigation-section mt-6">
// //         <button
// //           onClick={goToCalendar}
// //           className="btn-calendar bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md"
// //         >
// //           Go to Calendar
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserHomepage;

// // import React from 'react';
// // import { useNavigate } from 'react-router-dom'

// // /**
// //  * UserHomepage Component
// //  * Displays a welcome message and includes a button to navigate to 
// //  * the calendar page.
// //  * @returns {JSX.Element} The rendered user homepage component.
// //  */
// // const UserHomepage = () => {
// //   const navigate = useNavigate();

// //   /**
// //    * Navigates the user to the calendar page.
// //    */
// //   const goToCalendar = () => {
// //     navigate("/calendar"); 
// //   };

// //   return (
// //     <div>
// //       <h1>WELCOME TO IRON PULSE FITNESS!</h1>
// //       {/* Calendar button */}
// //       <button onClick={goToCalendar}>Go to Calendar</button>
// //     </div>
// //   );
// // };

// // export default UserHomepage
