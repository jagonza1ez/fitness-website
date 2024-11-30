import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Default styles
import "../styles/AdvancedWorkoutCalendar.css"; // Your custom styles

const AdvancedWorkoutCalendar = () => {
  const navigate = useNavigate();
  const localizer = momentLocalizer(moment);

  // Sample events
  const [events, setEvents] = useState([
    {
      title: "Morning Yoga",
      start: new Date(2024, 10, 30, 8, 0),
      end: new Date(2024, 10, 30, 9, 0),
    },
    {
      title: "Strength Training",
      start: new Date(2024, 11, 1, 17, 0),
      end: new Date(2024, 11, 1, 18, 30),
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [workoutDetails, setWorkoutDetails] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [stats, setStats] = useState({ daysWorkedOutInMonth: 0, daysWorkedOutInWeek: 0 });

  // Calculate stats when events change
  useEffect(() => {
    calculateStats();
  }, [events]);

  // Handle opening the modal
  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setIsModalOpen(true);
  };

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding a new event
  const handleAddEvent = () => {
    const { title, startTime, endTime } = workoutDetails;

    if (!title || !startTime || !endTime) {
      alert("Please fill out all fields.");
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

    setEvents([...events, { title, start, end }]);
    setWorkoutDetails({ title: "", startTime: "", endTime: "" });
    setIsModalOpen(false);
  };

  // Handle event click to show event details
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  // Calculate stats for the month and the current week
  const calculateStats = () => {
    const uniqueWorkoutDays = new Set(events.map((event) => event.start.toDateString()));

    // Workout days in the current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const daysWorkedOutInMonth = [...uniqueWorkoutDays].filter((date) => {
      const workoutDate = new Date(date);
      return workoutDate.getMonth() === currentMonth && workoutDate.getFullYear() === currentYear;
    }).length;

    // Workout days in the current week
    const today = new Date();
    const startOfWeek = moment(today).startOf("week").toDate();
    const endOfWeek = moment(today).endOf("week").toDate();
    const daysWorkedOutInWeek = [...uniqueWorkoutDays].filter((date) => {
      const workoutDate = new Date(date);
      return workoutDate >= startOfWeek && workoutDate <= endOfWeek;
    }).length;

    setStats({ daysWorkedOutInMonth, daysWorkedOutInWeek });
  };

  // Navigate back to the previous page
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Advanced Workout Calendar</h2>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
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
          onSelectEvent={handleSelectEvent}
          formats={{
            dayFormat: (date, culture, localizer) =>
              localizer.format(date, "ddd", culture), // "Mon", "Tue", etc.
            weekdayFormat: (date, culture, localizer) =>
              localizer.format(date, "dddd", culture), // "Monday", "Tuesday", etc.
          }}
        />
      </div>

      {/* Stats Section */}
      <div className="text-center mt-6 bg-gray-800 text-white p-4 rounded shadow-md w-full max-w-4xl">
        <h3 className="text-lg font-bold mb-2">Workout Stats</h3>
        <p>
          <strong>Workout Days in This Month:</strong> {stats.daysWorkedOutInMonth}/
          {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}
        </p>
        <p>
          <strong>Workout Days in This Week:</strong> {stats.daysWorkedOutInWeek}/7
        </p>
      </div>

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back
      </button>

      {/* Modal for adding events */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">Add Workout</h3>
            <label className="block mb-2 text-gray-600">
              Workout Name:
              <input
                type="text"
                name="title"
                value={workoutDetails.title}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Workout name"
              />
            </label>
            <label className="block mb-2 text-gray-600">
              Start Time:
              <input
                type="time"
                name="startTime"
                value={workoutDetails.startTime}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </label>
            <label className="block mb-4 text-gray-600">
              End Time:
              <input
                type="time"
                name="endTime"
                value={workoutDetails.endTime}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </label>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Add Workout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for event details */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">Workout Details</h3>
            <p>
              <strong>Title:</strong> {selectedEvent.title}
            </p>
            <p>
              <strong>Start Time:</strong>{" "}
              {selectedEvent.start.toLocaleString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <p>
              <strong>End Time:</strong>{" "}
              {selectedEvent.end.toLocaleString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedWorkoutCalendar;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css"; // Default styles
// import "../styles/AdvancedWorkoutCalendar.css"; // Your custom styles


// const AdvancedWorkoutCalendar = () => {
//   const navigate = useNavigate();
//   const localizer = momentLocalizer(moment);

//   // Sample events
//   const [events, setEvents] = useState([
//     {
//       title: "Morning Yoga",
//       start: new Date(2024, 10, 30, 8, 0),
//       end: new Date(2024, 10, 30, 9, 0),
//     },
//     {
//       title: "Strength Training",
//       start: new Date(2024, 11, 1, 17, 0),
//       end: new Date(2024, 11, 1, 18, 30),
//     },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [workoutDetails, setWorkoutDetails] = useState({
//     title: "",
//     startTime: "",
//     endTime: "",
//   });
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   // Handle opening the modal
//   const handleSelectSlot = ({ start }) => {
//     setSelectedDate(start);
//     setIsModalOpen(true);
//   };

//   // Handle form inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setWorkoutDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle adding a new event
//   const handleAddEvent = () => {
//     const { title, startTime, endTime } = workoutDetails;

//     if (!title || !startTime || !endTime) {
//       alert("Please fill out all fields.");
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
//     setWorkoutDetails({ title: "", startTime: "", endTime: "" });
//     setIsModalOpen(false);
//   };

//   // Handle event click to show event details
//   const handleSelectEvent = (event) => {
//     setSelectedEvent(event); // Store the selected event
//   };

//   // Navigate back to the previous page
//   const handleBack = () => {
//     navigate(-1);
//   };

//   return (
//     <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-6">
//       <h2 className="text-2xl font-bold mb-6 text-center">Advanced Workout Calendar</h2>
//       <div className="calendar-wrapper">
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
//           onSelectEvent={handleSelectEvent}
//           formats={{
//             dayFormat: (date, culture, localizer) =>
//               localizer.format(date, "ddd", culture), // "Mon", "Tue", etc.
//             weekdayFormat: (date, culture, localizer) =>
//               localizer.format(date, "dddd", culture), // "Monday", "Tuesday", etc.
//           }}
//         />
//       </div>

//       {/* Back Button */}
//       <button
//         onClick={handleBack}
//         className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         Back
//       </button>

//       {/* Modal for adding events */}
//       {isModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//           onClick={() => setIsModalOpen(false)}
//         >
//           <div
//             className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h3 className="text-xl font-bold mb-4 text-gray-800">Add Workout</h3>
//             <label className="block mb-2 text-gray-600">
//               Workout Name:
//               <input
//                 type="text"
//                 name="title"
//                 value={workoutDetails.title}
//                 onChange={handleChange}
//                 className="w-full mt-1 p-2 border rounded"
//                 placeholder="Workout name"
//               />
//             </label>
//             <label className="block mb-2 text-gray-600">
//               Start Time:
//               <input
//                 type="time"
//                 name="startTime"
//                 value={workoutDetails.startTime}
//                 onChange={handleChange}
//                 className="w-full mt-1 p-2 border rounded"
//               />
//             </label>
//             <label className="block mb-4 text-gray-600">
//               End Time:
//               <input
//                 type="time"
//                 name="endTime"
//                 value={workoutDetails.endTime}
//                 onChange={handleChange}
//                 className="w-full mt-1 p-2 border rounded"
//               />
//             </label>
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddEvent}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//               >
//                 Add Workout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal for event details */}
//       {selectedEvent && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//           onClick={() => setSelectedEvent(null)}
//         >
//           <div
//             className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h3 className="text-xl font-bold mb-4 text-gray-800">Workout Details</h3>
//             <p>
//               <strong>Title:</strong> {selectedEvent.title}
//             </p>
//             <p>
//               <strong>Start Time:</strong>{" "}
//               {selectedEvent.start.toLocaleString("en-US", {
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 hour12: true,
//               })}
//             </p>
//             <p>
//               <strong>End Time:</strong>{" "}
//               {selectedEvent.end.toLocaleString("en-US", {
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 hour12: true,
//               })}
//             </p>
//             <button
//               onClick={() => setSelectedEvent(null)}
//               className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdvancedWorkoutCalendar;
