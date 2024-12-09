import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LeagueOfFitness.css";

const LeagueOfFitness = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = JSON.parse(localStorage.getItem("user")).id;
  
        // Fetch all users, including the current user
        const response = await fetch(`http://localhost:5050/auth/users?userId=${userId}&includeSelf=true`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }
  
        const usersData = await response.json();
        setUsers(usersData);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []);

  // Get the current user's ID
  const currentUserId = JSON.parse(localStorage.getItem("user")).id;

  // Sort users to place the leader at the top
  const sortedUsers = [...users].sort((a, b) => (b.totalWorkouts || 0) - (a.totalWorkouts || 0));
  const leader = sortedUsers[0];
  const otherUsers = sortedUsers.slice(1);

  if (loading) {
    return <p>Loading users and workouts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="league-page">
      <div className="league-header">
        <h1 className="league-title">League of Fitness</h1>
        <p className="league-subtitle">Compete. Track. Triumph.</p>
      </div>

      {/* Leader section */}
      {leader && (
        <div className="leader-card">
          <div
            className={`user-card leader ${
              leader._id === currentUserId ? "current-user" : ""
            }`}
          >
            <div className="user-avatar">
              <img
                src={leader.profilePicture || "https://via.placeholder.com/150"}
                alt={`${leader.name}'s avatar`}
              />
            </div>
            <div className="user-details">
              <h2>{leader.name}</h2>
              <p>@{leader.username}</p>
              <div className="workouts">
                <h3>
                  Total Workouts: <strong>{leader.totalWorkouts || 0}</strong>
                </h3>
              </div>
              <span className="leader-badge">🏆 Leader</span>
            </div>
          </div>
        </div>
      )}

      {/* Other users grid */}
      <div className="league-grid">
        {otherUsers.map((user) => (
          <div
            key={user._id}
            className={`user-card ${
              user._id === currentUserId ? "current-user" : ""
            }`}
          >
            <div className="user-avatar">
              <img
                src={user.profilePicture || "https://via.placeholder.com/150"}
                alt={`${user.name}'s avatar`}
              />
            </div>
            <div className="user-details">
              <h2>{user.name}</h2>
              <p>@{user.username}</p>
              <div className="workouts">
                <h3>
                  Total Workouts: <strong>{user.totalWorkouts || 0}</strong>
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/user-homepage")} className="league-back-btn">
        Back
      </button>
    </div>
  );
};

export default LeagueOfFitness;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/LeagueOfFitness.css";

// const LeagueOfFitness = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const userId = JSON.parse(localStorage.getItem("user")).id;
  
//         // Fetch all users, including the current user
//         const response = await fetch(`http://localhost:5050/auth/users?userId=${userId}&includeSelf=true`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
  
//         if (!response.ok) {
//           throw new Error("Failed to fetch users.");
//         }
  
//         const usersData = await response.json();
//         setUsers(usersData);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchUsers();
//   }, []);

//   // Get the current user's ID
//   const currentUserId = JSON.parse(localStorage.getItem("user")).id;

//   if (loading) {
//     return <p>Loading users and workouts...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div className="league-page">
//       <div className="league-header">
//         <h1 className="league-title">League of Fitness</h1>
//         <p className="league-subtitle">Compete. Track. Triumph.</p>
//       </div>

//       {/* Display users sorted by total workouts */}
//       <div className="league-grid">
//         {users
//           .sort((a, b) => (b.totalWorkouts || 0) - (a.totalWorkouts || 0))
//           .map((user, index) => (
//             <div
//               key={user._id}
//               className={`user-card ${
//                 user._id === currentUserId ? "current-user" : ""
//               } ${index === 0 ? "leader" : ""}`}
//             >
//               <div className="user-avatar">
//                 <img
//                   src={user.profilePicture || "https://via.placeholder.com/150"}
//                   alt={`${user.name}'s avatar`}
//                 />
//               </div>
//               <div className="user-details">
//                 <h2>{user.name}</h2>
//                 <p>@{user.username}</p>
//                 <div className="workouts">
//                   <h3>
//                     Total Workouts: <strong>{user.totalWorkouts || 0}</strong>
//                   </h3>
//                 </div>
//                 {index === 0 && <span className="leader-badge">🏆 Leader</span>}
//               </div>
//             </div>
//           ))}
//       </div>

//       <button onClick={() => navigate("/user-homepage")} className="league-back-btn">
//         Back
//       </button>
//     </div>
//   );
// };

// export default LeagueOfFitness;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/LeagueOfFitness.css";

// const LeagueOfFitness = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const userId = JSON.parse(localStorage.getItem("user")).id;
  
//         // Fetch all users, including the current user
//         const response = await fetch(`http://localhost:5050/auth/users?userId=${userId}&includeSelf=true`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
  
//         if (!response.ok) {
//           throw new Error("Failed to fetch users.");
//         }
  
//         const usersData = await response.json();
//         setUsers(usersData);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchUsers();
//   }, []);
  

//   if (loading) {
//     return <p>Loading users and workouts...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div className="league-page">
//       <div className="league-header">
//         <h1 className="league-title">League of Fitness</h1>
//         <p className="league-subtitle">Compete. Track. Triumph.</p>
//       </div>

//       <div className="league-content">
//         {users.map((user) => (
//           <div key={user._id} className="user-card">
//             <h2>{user.name}</h2>
//             <p>@{user.username}</p>
//             <div className="workouts">
//               <h3>
//                 Total Workouts: <strong>{user.totalWorkouts || 0}</strong>
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>


//       <button onClick={() => navigate("/user-homepage")} className="league-back-btn">
//         Back
//       </button>
//     </div>
//   );
// };

// export default LeagueOfFitness;
