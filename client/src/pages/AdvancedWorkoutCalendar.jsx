import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Default styles
import "../styles/AdvancedWorkoutCalendar.css"; // custom styles

const AdvancedWorkoutCalendar = () => {
  const navigate = useNavigate();
  const localizer = momentLocalizer(moment);

  // Sample events
  const [events, setEvents] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [workoutDetails, setWorkoutDetails] = useState({
    title: "",
    startTime: "",
    endTime: "",
    cardio: [],
    strength: [],
    flexibility: [],
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  const cardioExercises = ["Running", "Walking"];
  const strengthExercises = [
    "Bicep Curl",
    "Hammer Curl",
    "Cross Hammer Curl",
    "Bent Over Row",
    "Dumbbell Row",
    "Pull-down",
    "Pull Up",
    "Romanian Deadlift",
    "Squat",
    "Hip Thrust",
  ];
  const flexibilityExercises = ["Toe Touches", "Side Lunges", "Arm Stretch"];

  const [stats, setStats] = useState({
    workoutDaysInMonth: 0,
    workoutDaysInWeek: 0,
  });
  
  // Track the currently displayed month
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  useEffect(() => {
    // Calculate stats when events or the current displayed month changes
    const calculateStats = () => {
      const startOfMonth = new Date(currentYear, currentMonth, 1); // Start of the displayed month
      const endOfMonth = new Date(currentYear, currentMonth + 1, 0); // End of the displayed month
  
      const startOfWeek = moment(startOfMonth).startOf("week").toDate();
      const endOfWeek = moment(startOfMonth).endOf("week").toDate();
  
      const daysInMonth = new Set(
        events
          .filter(
            (event) =>
              event.start >= startOfMonth && event.start <= endOfMonth
          )
          .map((event) => event.start.getDate())
      );
  
      const daysInWeek = new Set(
        events
          .filter((event) => event.start >= startOfWeek && event.start <= endOfWeek)
          .map((event) => event.start.getDate())
      );
  
      setStats({
        workoutDaysInMonth: daysInMonth.size,
        workoutDaysInWeek: daysInWeek.size,
      });
    };
  
    calculateStats();
  }, [events, currentMonth, currentYear]);
  
  // Handle view change in the calendar to update the currently displayed month
  const handleViewChange = (date) => {
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
  };
  

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

  const handleWorkoutChange = (type, field, index, value) => {
    setWorkoutDetails((prev) => {
      const updatedWorkouts = [...prev[type]];
      updatedWorkouts[index][field] = value;
      return { ...prev, [type]: updatedWorkouts };
    });
  };

  const addWorkoutEntry = (type) => {
    setWorkoutDetails((prev) => ({
      ...prev,
      [type]: [...prev[type], { name: "", weight: "", sets: "", reps: "", time: "", distance: "" }],
    }));
  };

  const removeWorkoutEntry = (type, index) => {
    setWorkoutDetails((prev) => {
      const updatedWorkouts = [...prev[type]];
      updatedWorkouts.splice(index, 1);
      return { ...prev, [type]: updatedWorkouts };
    });
  };

  // Handle adding a new event
  const handleAddEvent = () => {
    const { title, startTime, endTime } = workoutDetails;

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

    setEvents([...events, { ...workoutDetails, start, end }]);
    setWorkoutDetails({
      title: "",
      startTime: "",
      endTime: "",
      cardio: [],
      strength: [],
      flexibility: [],
    });
    setIsModalOpen(false);
  };

  // Handle event click to show event details
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  // Calculate stats
  useEffect(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentWeekStart = moment().startOf("week").toDate();
    const currentWeekEnd = moment().endOf("week").toDate();

    const daysInMonth = new Set(
      events.filter((event) => event.start.getMonth() === currentMonth).map((event) => event.start.getDate())
    );

    const daysInWeek = new Set(
      events.filter(
        (event) => event.start >= currentWeekStart && event.start <= currentWeekEnd
      ).map((event) => event.start.getDate())
    );

    setStats({
      workoutDaysInMonth: daysInMonth.size,
      workoutDaysInWeek: daysInWeek.size,
    });
  }, [events]);

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
          onNavigate={(date) => handleViewChange(date)} 
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
        />
      </div>

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back
      </button>

      {/* Workout Stats */}
      <div className="bg-gray-800 text-white p-6 mt-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h3 className="text-xl font-bold mb-4">Workout Stats</h3>
        <p>
          <strong>Month:</strong>{" "}
          {moment(new Date(currentYear, currentMonth)).format("MMMM YYYY")}
        </p>
        <p>
          <strong>Workout Days in the Month:</strong> {stats.workoutDaysInMonth}
        </p>
        <p>
          <strong>Workout Days in the Week:</strong> {stats.workoutDaysInWeek}
        </p>
      </div>


      {/* Modal for adding events */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white w-full h-full overflow-y-auto rounded-lg shadow-lg p-6"
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

            {/* Cardio Section */}
            <h4 className="text-lg font-bold mt-4 mb-2">Cardio</h4>
            {workoutDetails.cardio.map((workout, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <select
                  className="flex-1 p-2 border rounded"
                  value={workout.name}
                  onChange={(e) =>
                    handleWorkoutChange("cardio", "name", index, e.target.value)
                  }
                >
                  <option value="">Select Cardio</option>
                  {cardioExercises.map((exercise, i) => (
                    <option key={i} value={exercise}>
                      {exercise}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Time (min)"
                  className="p-2 border rounded"
                  value={workout.time}
                  onChange={(e) =>
                    handleWorkoutChange("cardio", "time", index, e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Distance (miles)"
                  className="p-2 border rounded"
                  value={workout.distance}
                  onChange={(e) =>
                    handleWorkoutChange("cardio", "distance", index, e.target.value)
                  }
                />
                <button
                  onClick={() => removeWorkoutEntry("cardio", index)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addWorkoutEntry("cardio")}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Add Cardio
            </button>

            {/* Strength Section */}
            <h4 className="text-lg font-bold mt-4 mb-2">Strength</h4>
            {workoutDetails.strength.map((workout, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <select
                  className="flex-1 p-2 border rounded"
                  value={workout.name}
                  onChange={(e) =>
                    handleWorkoutChange("strength", "name", index, e.target.value)
                  }
                >
                  <option value="">Select Strength Exercise</option>
                  {strengthExercises.map((exercise, i) => (
                    <option key={i} value={exercise}>
                      {exercise}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Weight (lb)"
                  className="p-2 border rounded"
                  value={workout.weight}
                  onChange={(e) =>
                    handleWorkoutChange("strength", "weight", index, e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Sets"
                  className="p-2 border rounded"
                  value={workout.sets}
                  onChange={(e) =>
                    handleWorkoutChange("strength", "sets", index, e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Reps"
                  className="p-2 border rounded"
                  value={workout.reps}
                  onChange={(e) =>
                    handleWorkoutChange("strength", "reps", index, e.target.value)
                  }
                />
                <button
                  onClick={() => removeWorkoutEntry("strength", index)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addWorkoutEntry("strength")}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Add Strength
            </button>

            {/* Flexibility Section */}
            <h4 className="text-lg font-bold mt-4 mb-2">Flexibility</h4>
            {workoutDetails.flexibility.map((workout, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <select
                  className="flex-1 p-2 border rounded"
                  value={workout.name}
                  onChange={(e) =>
                    handleWorkoutChange("flexibility", "name", index, e.target.value)
                  }
                >
                  <option value="">Select Flexibility Exercise</option>
                  {flexibilityExercises.map((exercise, i) => (
                    <option key={i} value={exercise}>
                      {exercise}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Time (min)"
                  className="p-2 border rounded"
                  value={workout.time}
                  onChange={(e) =>
                    handleWorkoutChange("flexibility", "time", index, e.target.value)
                  }
                />
                <button
                  onClick={() => removeWorkoutEntry("flexibility", index)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addWorkoutEntry("flexibility")}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Add Flexibility
            </button>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
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
                Save Workout
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
          <div className="bg-white w-full h-full overflow-y-auto rounded-lg shadow-lg p-6">
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
