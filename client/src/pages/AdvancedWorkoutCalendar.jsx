import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/AdvancedWorkoutCalendar.css";
import CalendarPopUpWindow from "./CalendarPopUpWindow";

const AdvancedWorkoutCalendar = () => {
  const localizer = momentLocalizer(moment);
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(moment().month());
  const [currentYear, setCurrentYear] = useState(moment().year());
  const [stats, setStats] = useState({ monthly: 0, weekly: 0 });

  const [workoutDetails, setWorkoutDetails] = useState({
    title: "",
    startTime: "",
    endTime: "",
    cardio: [],
    strength: [],
    flexibility: [],
  });

  const cardioExercises = ["Running", "Walking"];
  const strengthExercises = [
    "Bicep Curl",
    "Hammer Curl",
    "Cross Hammer Curl",
    "Bent Over Rows",
    "Pull Ups",
    "Pull Downs",
    "Bench",
    "Push Ups",
    "Squats",
    "Goblet Squats",
    "Romanian Deadlifts",
  ];
  const flexibilityExercises = ["Toe Touches", "Side Lunges", "Arm Stretch"];

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setWorkoutDetails({
      title: "",
      startTime: "",
      endTime: "",
      cardio: [],
      strength: [],
      flexibility: [],
    });
    setIsModalOpen(true);
  };

  const handleAddEvent = async () => {
    const { title, startTime, endTime, exercises } = workoutDetails;
    if (!title || !startTime || !endTime) {
        alert("Please fill out the workout name, start time, and end time.");
        return;
    }

    const start = new Date(selectedDate);
    const end = new Date(selectedDate);
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    start.setHours(startHour, startMinute);
    end.setHours(endHour, endMinute);

    if (end <= start) {
        alert("End time must be after start time.");
        return;
    }

    const workoutData = {
        date: selectedDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
        title,
        startTime,
        endTime,
        exercises: workoutDetails.exercises || [],
    };

    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5050/api/workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(workoutData),
        });

        if (response.ok) {
            alert("Workout saved successfully!");

            // Add the newly saved workout to the calendar events
            setEvents([...events, { title, start, end }]);
            setIsModalOpen(false); // Close the modal after saving
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch (err) {
        console.error("Error saving workout:", err);
        alert("Failed to save workout.");
    }
};

  const handleViewChange = (date) => {
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("User not authenticated. Please log in again.");
                return;
            }

            const response = await fetch("http://localhost:5050/api/workouts", {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token for authentication
                },
            });

            if (response.ok) {
                const data = await response.json();

                // Map the fetched workout logs into the format required for the calendar
                const fetchedEvents = data.workoutLogs.map((log) => ({
                    title: log.title,
                    start: new Date(`${log.date}T${log.startTime}`), // Combine date and startTime
                    end: new Date(`${log.date}T${log.endTime}`),     // Combine date and endTime
                }));

                // Update the `events` state with the fetched workout logs
                setEvents(fetchedEvents);
            } else {
                const error = await response.json();
                console.error("Error fetching workouts:", error.message);
            }
        } catch (err) {
            console.error("Error fetching workouts:", err);
        }
    };

    fetchWorkouts(); // Fetch workouts when the component loads
}, []);

useEffect(() => {
  const calculateStats = () => {
    // Get the start and end of the current month
    const startOfMonth = moment([currentYear, currentMonth]).startOf("month").toDate();
    const endOfMonth = moment([currentYear, currentMonth]).endOf("month").toDate();

    // Get the start and end of the current week
    const now = new Date();
    const startOfWeek = moment(now).startOf("week").toDate();
    const endOfWeek = moment(now).endOf("week").toDate();

    // Filter events for the current month
    const monthlyWorkouts = events.filter(
      (event) => event.start >= startOfMonth && event.start <= endOfMonth
    ).length;

    // Filter events for the current week
    const weeklyWorkouts = events.filter(
      (event) => event.start >= startOfWeek && event.start <= endOfWeek
    ).length;

    // Update stats
    setStats({ monthly: monthlyWorkouts, weekly: weeklyWorkouts });
  };

  calculateStats();
}, [events, currentMonth, currentYear]);


  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Log Your Workouts</h2>

      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="back-btn">
        Back
      </button>

      <div className="calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable
          views={["month", "week", "day"]}
          defaultView="month"
          onSelectSlot={handleSelectSlot}
          onNavigate={handleViewChange}
      />
      </div>

      {isModalOpen && (
        <CalendarPopUpWindow
          workoutDetails={workoutDetails}
          setWorkoutDetails={setWorkoutDetails}
          onSave={handleAddEvent}
          onClose={() => setIsModalOpen(false)}
          cardioExercises={cardioExercises}
          strengthExercises={strengthExercises}
          flexibilityExercises={flexibilityExercises}
        />
      )}

      {/* Workout Stats */}
      <div className="stats-section">
        <h3>
          Workout Details for the Month of {moment([currentYear, currentMonth]).format("MMMM YYYY")}
        </h3>
        <p>
          <strong>Monthly Workouts:</strong> {stats.monthly}
        </p>
        <p>
          <strong>Weekly Workouts:</strong> {stats.weekly}
        </p>
      </div>
    </div>
  );
};

export default AdvancedWorkoutCalendar;

// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css"; // Calendar styles
// import "../styles/AdvancedWorkoutCalendar.css"; // Custom styles
// import CalendarPopUpWindow from "./CalendarPopUpWindow"; // Relative import for the popup window

// const AdvancedWorkoutCalendar = () => {
//   const localizer = momentLocalizer(moment);
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   const [events, setEvents] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [currentMonth, setCurrentMonth] = useState(moment().month());
//   const [currentYear, setCurrentYear] = useState(moment().year());
//   const [stats, setStats] = useState({ monthly: 0, weekly: 0 });

//   const [workoutDetails, setWorkoutDetails] = useState({
//     title: "",
//     startTime: "",
//     endTime: "",
//     cardio: [],
//     strength: [],
//     flexibility: [],
//   });

//   const cardioExercises = ["Running", "Walking"];
//   const strengthExercises = [
//     "Bicep Curl",
//     "Hammer Curl",
//     "Cross Hammer Curl",
//     "Bent Over Rows",
//     "Pull Ups",
//     "Pull Downs",
//     "Bench",
//     "Push Ups",
//     "Squats",
//     "Goblet Squats",
//     "Romanian Deadlifts",
//   ];
//   const flexibilityExercises = ["Toe Touches", "Side Lunges", "Arm Stretch"];

//   const handleSelectSlot = ({ start }) => {
//     setSelectedDate(start);
//     setWorkoutDetails({
//       title: "",
//       startTime: "",
//       endTime: "",
//       cardio: [],
//       strength: [],
//       flexibility: [],
//     });
//     setIsModalOpen(true);
//   };

//   const handleAddEvent = () => {
//     const { title, startTime, endTime } = workoutDetails;
//     if (!title || !startTime || !endTime) {
//       alert("Please fill out the workout name, start time, and end time.");
//       return;
//     }

//     const start = new Date(selectedDate);
//     const end = new Date(selectedDate);
//     const [startHour, startMinute] = startTime.split(":").map(Number);
//     const [endHour, endMinute] = endTime.split(":").map(Number);
//     start.setHours(startHour, startMinute);
//     end.setHours(endHour, endMinute);

//     if (end <= start) {
//       alert("End time must be after start time.");
//       return;
//     }

//     setEvents([...events, { title, start, end }]);
//     setIsModalOpen(false);
//   };

//   const handleViewChange = (date) => {
//     setCurrentMonth(date.getMonth());
//     setCurrentYear(date.getFullYear());
//   };

//   useEffect(() => {
//     const calculateStats = () => {
//       const startOfMonth = moment([currentYear, currentMonth]).startOf("month").toDate();
//       const endOfMonth = moment([currentYear, currentMonth]).endOf("month").toDate();

//       const startOfWeek = moment().startOf("week").toDate();
//       const endOfWeek = moment().endOf("week").toDate();

//       const monthlyWorkouts = events.filter(
//         (event) => event.start >= startOfMonth && event.start <= endOfMonth
//       ).length;

//       const weeklyWorkouts = events.filter(
//         (event) => event.start >= startOfWeek && event.start <= endOfWeek
//       ).length;

//       setStats({ monthly: monthlyWorkouts, weekly: weeklyWorkouts });
//     };

//     calculateStats();
//   }, [events, currentMonth, currentYear]);

//   return (
//     <div className="bg-gray-900 text-white min-h-screen p-6">
//       <h2 className="text-2xl font-bold mb-6">Log Your Workouts</h2>

//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)} // Navigate back to the previous page
//         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6"
//       >
//         Back
//       </button>

//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <Calendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: 500 }}
//           selectable
//           views={["month", "week", "day"]}
//           defaultView="month"
//           onSelectSlot={handleSelectSlot}
//           onNavigate={handleViewChange}
//         />
//       </div>

//       {isModalOpen && (
//         <CalendarPopUpWindow
//           workoutDetails={workoutDetails}
//           setWorkoutDetails={setWorkoutDetails}
//           onSave={handleAddEvent}
//           onClose={() => setIsModalOpen(false)}
//           cardioExercises={cardioExercises}
//           strengthExercises={strengthExercises}
//           flexibilityExercises={flexibilityExercises}
//         />
//       )}

//       {/* Workout Stats */}
//       <div className="bg-gray-800 text-white p-6 mt-6 rounded-lg shadow-lg">
//         <h3 className="text-xl font-bold mb-4">
//           Workout Details for the Month of {moment([currentYear, currentMonth]).format("MMMM YYYY")}
//         </h3>
//         <p>
//           <strong>Monthly Workouts:</strong> {stats.monthly}
//         </p>
//         <p>
//           <strong>Weekly Workouts:</strong> {stats.weekly}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AdvancedWorkoutCalendar;
