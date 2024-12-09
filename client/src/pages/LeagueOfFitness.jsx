import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "../styles/LeagueOfFitness.css";

const LeagueOfFitness = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [leader, setLeader] = useState(null); // State to store the leader
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5050/auth/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const fetchedUsers = response.data;

          // Calculate stats and find the leader
          let currentLeader = null;
          let highestWorkouts = 0;

          fetchedUsers.forEach((user) => {
            const { monthlyWorkouts } = calculateStats(
              user.workoutLogs || [],
              moment().year(),
              moment().month()
            );

            if (monthlyWorkouts > highestWorkouts) {
              highestWorkouts = monthlyWorkouts;
              currentLeader = { ...user, monthlyWorkouts };
            }
          });

          setUsers(fetchedUsers);
          setLeader(currentLeader); // Set the leader
        } else {
          throw new Error("Failed to fetch users.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const calculateStats = (workoutLogs, year, month) => {
    const startOfMonth = moment([year, month]).startOf("month").toDate();
    const endOfMonth = moment([year, month]).endOf("month").toDate();

    const now = new Date();
    const startOfWeek = moment(now).startOf("week").toDate();
    const endOfWeek = moment(now).endOf("week").toDate();

    const monthlyWorkouts = workoutLogs.filter(
      (log) => new Date(log.date) >= startOfMonth && new Date(log.date) <= endOfMonth
    ).length;

    const weeklyWorkouts = workoutLogs.filter(
      (log) => new Date(log.date) >= startOfWeek && new Date(log.date) <= endOfWeek
    ).length;

    return { monthlyWorkouts, weeklyWorkouts };
  };

  const handleGoBack = () => {
    navigate("/user-homepage");
  };

  return (
    <div className="league-container">
      <h1 className="league-title">League of Fitness</h1>
      {loading ? (
        <p className="loading-text">Loading users...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <>
        {leader && (
        <div className="leader-section">
            <h2 className="leader-title">🏆 Leader of the Month</h2>
            <div className="leader-card">
            <img
                src={leader.profilePicture || "https://via.placeholder.com/150"}
                alt={`${leader.name}'s profile`}
                className="leader-profile-picture"
            />
            <h2 className="leader-name">{leader.name}</h2>
            <p className="leader-username">@{leader.username}</p>
            <p className="leader-workouts">
                <strong>Monthly Workouts:</strong> {leader.monthlyWorkouts}
            </p>
            <p className="leader-tagline">"Keep pushing your limits!"</p>
            </div>
        </div>
        )}

          <div className="users-list">
            {users.map((user) => {
              const { monthlyWorkouts, weeklyWorkouts } = calculateStats(
                user.workoutLogs || [],
                moment().year(),
                moment().month()
              );

              return (
                <div key={user._id} className="user-card">
                  <img
                    src={user.profilePicture || "https://via.placeholder.com/150"}
                    alt={`${user.name}'s profile`}
                    className="user-profile-picture"
                  />
                  <h2 className="user-name">{user.name}</h2>
                  <p className="user-username">@{user.username}</p>
                  <div className="workout-details">
                    <h3>
                      Workout Details for {moment().format("MMMM YYYY")}
                    </h3>
                    <p>
                      <strong>Monthly Workouts:</strong> {monthlyWorkouts}
                    </p>
                    <p>
                      <strong>Weekly Workouts:</strong> {weeklyWorkouts}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      <button onClick={handleGoBack} className="btn-back">
        Go Back
      </button>
    </div>
  );
};

export default LeagueOfFitness;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
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
//         const response = await axios.get("http://localhost:5050/auth/users", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.status === 200) {
//           setUsers(response.data); // Store all users in state
//         } else {
//           throw new Error("Failed to fetch users.");
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleGoBack = () => {
//     navigate("/user-homepage");
//   };

//   return (
//     <div className="league-container">
//       <h1 className="league-title">League of Fitness</h1>
//       {loading ? (
//         <p className="loading-text">Loading users...</p>
//       ) : error ? (
//         <p className="error-text">{error}</p>
//       ) : users.length > 0 ? (
//         <div className="users-list">
//           {users.map((user) => (
//             <div key={user._id} className="user-card">
//               <img
//                 src={user.profilePicture || "https://via.placeholder.com/150"}
//                 alt={`${user.name}'s profile`}
//                 className="user-profile-picture"
//               />
//               <h2 className="user-name">{user.name}</h2>
//               <p className="user-username">@{user.username}</p>
//               <div className="workout-details">
//                 <h3>Workout Details for December 2024</h3>
//                 <p>
//                   <strong>Monthly Workouts:</strong> {user.workoutLogs.length}
//                 </p>
//                 <p>
//                   <strong>Weekly Workouts:</strong>{" "}
//                   {Math.floor(user.workoutLogs.length / 4)} {/* Example calculation */}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="no-users-text">No users found in the database.</p>
//       )}
//       <button onClick={handleGoBack} className="btn-back">
//         Go Back
//       </button>
//     </div>
//   );
// };

// export default LeagueOfFitness;
