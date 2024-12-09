import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/AddFriends.css";

const AddFriends = () => {
  const navigate = useNavigate(); // Initialize navigation hook.
  const [users, setUsers] = useState([]);       // Store the list of users
  const [loading, setLoading] = useState(true); // Track the loading state
  const [error, setError] = useState(null);     // Track any errors

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");                // Retrieve token for authorization
        const userId = JSON.parse(localStorage.getItem("user")).id; // Current user's ID

        const response = await fetch(`http://localhost:5050/auth/users?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token for authenticated access
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }

        const data = await response.json();
        setUsers(data);                   // Update state with fetched users
      } catch (err) {
        setError(err.message);            // Set error message if fetching fails
      } finally {
        setLoading(false);                // Set loading to false after fetching
      }
    };

    fetchUsers();
  }, []);

  // Handle add friend
  const handleAddFriend = async (friendId) => {
    try {
      const userId = JSON.parse(localStorage.getItem("user")).id; // Get current user ID
      const token = localStorage.getItem("token"); // Get the token

      const response = await fetch("http://localhost:5050/auth/add-friend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, friendId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add friend.");
      }

      // Remove the added friend from the `users` list
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== friendId));

      alert("Friend added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error adding friend.");
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="add-friends-page">
      <h1 className="text-2xl font-bold mb-4">Add Friends</h1>

      <div className="users-list bg-gray-800 p-6 rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="user-card p-4 bg-gray-700 rounded-lg flex justify-between items-center"
            >
              <div className="user-info">
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-gray-400">@{user.username}</p>
              </div>
              <button
                className="add-friend-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => handleAddFriend(user._id)}
              >
                Add Friend
              </button>
            </div>
          ))
        ) : (
          <p>No users available to add as friends.</p>
        )}
      </div>

      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="back-btn">
        Back
      </button>
    </div>
  );
};

export default AddFriends;
