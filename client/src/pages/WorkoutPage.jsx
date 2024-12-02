import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "../styles/WorkoutPage.css";

const workoutOptions = {
  cardio: ["Running", "Walking"],
  strength: [
    "Bicep Curl",
    "Hammer Curl",
    "Cross Hammer Curl",
    "Cable Curl",
    "Barbell Curl",
    "Deadlift",
    "Bent Over Row",
    "Dumbbell Row",
    "Pull-down",
    "Seated Row",
    "Pull Up",
    "Romanian Deadlift",
    "Bulgarian Split Squat",
    "Squat",
    "Calf Raise",
    "Leg Extension",
    "Goblet Squat",
    "Leg Curl",
    "Hip Thrust",
  ],
  flexibility: [
    "Hamstring Stretch",
    "Arm Stretch",
    "Toe Touches",
    "Quad Stretch",
    "Side Lunges",
  ],
};

const WorkoutPage = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [details, setDetails] = useState({ time: "", distance: "", weight: "", sets: "", reps: "", stretchDuration: "" });
  const [workoutLog, setWorkoutLog] = useState([]);

  useEffect(() => {
    if (workoutStarted) {
      const now = new Date();
      const formattedDateTime = now.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
      setCurrentDateTime(formattedDateTime);
    }
  }, [workoutStarted]);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setSelectedWorkout("");
    setDetails({ time: "", distance: "", weight: "", sets: "", reps: "", stretchDuration: "" });
  };

  const handleWorkoutSelect = (workout) => setSelectedWorkout(workout);

  const handleDetailChange = (e) => setDetails({ ...details, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedWorkout) return;

    const formattedWorkout = {
      type: selectedType,
      workout: selectedWorkout,
      details: {
        time: details.time ? `${details.time} mins` : "",
        distance: details.distance ? `${details.distance} miles` : "",
        weight: details.weight ? `${details.weight} lbs` : "",
        sets: details.sets ? `${details.sets} sets` : "",
        reps: details.reps ? `${details.reps} reps` : "",
        stretchDuration: details.stretchDuration ? `${details.stretchDuration} mins` : "",
      },
    };

    setWorkoutLog([...workoutLog, formattedWorkout]);
    setSelectedWorkout("");
    setDetails({ time: "", distance: "", weight: "", sets: "", reps: "", stretchDuration: "" });
  };

  const handleFinishWorkout = async () => {
    if (workoutLog.length === 0) {
      alert("No workouts logged!");
      return;
    }
  
    const token = localStorage.getItem("token");
    const userId = JSON.parse(localStorage.getItem("user")).id;
  
    const payload = {
      date: currentDateTime, // Use the formatted date-time from the state
      workouts: workoutLog,
    };
  
    try {
      const response = await fetch("http://localhost:5050/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        alert("Workout session saved!");
        navigate("/user-homepage");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error saving workout:", err);
      alert("An error occurred while saving the workout.");
    }
  };

  return (
    <div className="workout-page bg-gray-900 text-white min-h-screen p-6">
      {!workoutStarted ? (
        <>
          <h2 className="text-3xl font-bold text-center mb-6">Start Your Workout</h2>
          <button
            onClick={() => setWorkoutStarted(true)}
            className="type-btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            Start Workout
          </button>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-center mb-4">Log Your Workout</h2>
          <p className="text-center text-gray-400 mb-6">{currentDateTime}</p>

          <div className="workout-type-buttons mb-6">
            <button onClick={() => handleTypeSelect("cardio")} className={`type-btn ${selectedType === "cardio" ? "active" : ""}`}>Cardio</button>
            <button onClick={() => handleTypeSelect("strength")} className={`type-btn ${selectedType === "strength" ? "active" : ""}`}>Strength</button>
            <button onClick={() => handleTypeSelect("flexibility")} className={`type-btn ${selectedType === "flexibility" ? "active" : ""}`}>Flexibility</button>
          </div>

          {selectedType && (
            <div className="workout-list mb-6">
              <h3 className="text-xl font-semibold mb-4">Select a {selectedType} workout:</h3>
              <ul className="workout-options">
                {workoutOptions[selectedType].map((workout) => (
                  <li key={workout}>
                    <button
                      onClick={() => handleWorkoutSelect(workout)}
                      className={`workout-btn ${selectedWorkout === workout ? "active" : ""}`}
                    >
                      {workout}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedWorkout && (
            <form onSubmit={handleSubmit} className="workout-details-form mt-6 bg-gray-800 p-4 rounded-lg">
              <h4 className="text-lg font-bold mb-4">Enter details for {selectedWorkout}:</h4>

              {selectedType === "cardio" && (
                <>
                  <input type="number" name="time" placeholder="Time (minutes)" value={details.time} onChange={handleDetailChange} className="input" />
                  <input type="number" name="distance" placeholder="Distance (miles)" value={details.distance} onChange={handleDetailChange} className="input" />
                </>
              )}

              {selectedType === "strength" && (
                <>
                  <input type="number" name="weight" placeholder="Weight (lb)" value={details.weight} onChange={handleDetailChange} className="input" />
                  <input type="number" name="sets" placeholder="Sets" value={details.sets} onChange={handleDetailChange} className="input" />
                  <input type="number" name="reps" placeholder="Reps" value={details.reps} onChange={handleDetailChange} className="input" />
                </>
              )}

              {selectedType === "flexibility" && (
                <>
                  <input type="number" name="stretchDuration" placeholder="Stretch Duration (minutes)" value={details.stretchDuration} onChange={handleDetailChange} className="input" />
                </>
              )}

              <button type="submit" className="btn-submit">Save Workout</button>
            </form>
          )}

          {workoutLog.length > 0 && (
            <div className="workout-log mt-8">
              <h3 className="text-xl font-bold mb-4">Completed Workouts</h3>
              <ul className="workout-log-list">
                {workoutLog.map((log, index) => (
                  <li key={index} className="workout-log-item bg-gray-800 p-4 rounded-lg mb-4">
                    <h4 className="text-lg font-semibold">{log.workout} ({log.type})</h4>
                    <ul className="text-gray-400 mt-2">
                      {Object.entries(log.details).map(([key, value]) =>
                        value ? <li key={key}>{value}</li> : null
                      )}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="finish-button mt-6">
            <button
              onClick={handleFinishWorkout}
              className="btn-submit bg-red-500 hover:bg-red-600"
            >
              Finish Workout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WorkoutPage;
