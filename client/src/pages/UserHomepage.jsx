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
