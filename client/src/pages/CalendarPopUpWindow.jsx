import React, { useState } from "react";
import "../styles/CalendarPopUpWindow.css"; // Importing the CSS

const CalendarPopUpWindow = ({
  workoutDetails,
  setWorkoutDetails,
  onSave,
  onClose,
  cardioExercises,
  strengthExercises,
  flexibilityExercises,
}) => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [exerciseDetails, setExerciseDetails] = useState({
    time: "",
    distance: "",
    weight: "",
    sets: "",
    reps: "",
    stretchDuration: "",
  });

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setSelectedWorkout("");
    setExerciseDetails({ time: "", distance: "", weight: "", sets: "", reps: "", stretchDuration: "" });
  };

  const handleWorkoutSelect = (workout) => setSelectedWorkout(workout);

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setExerciseDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveExercise = () => {
    if (!selectedWorkout) return alert("Please select a workout.");

    // Add appropriate units to the entered details
    const formattedDetails = {
      time: exerciseDetails.time ? `${exerciseDetails.time} mins` : "",
      distance: exerciseDetails.distance ? `${exerciseDetails.distance} miles` : "",
      weight: exerciseDetails.weight ? `${exerciseDetails.weight} lbs` : "",
      sets: exerciseDetails.sets ? `${exerciseDetails.sets} sets` : "",
      reps: exerciseDetails.reps ? `${exerciseDetails.reps} reps` : "",
      stretchDuration: exerciseDetails.stretchDuration ? `${exerciseDetails.stretchDuration} mins` : "",
    };

    const formattedExercise = {
      name: selectedWorkout,
      type: selectedType,
      details: formattedDetails,
    };

    // Save exercise to the consolidated workoutDetails state
    setWorkoutDetails((prev) => ({
      ...prev,
      exercises: [...(prev.exercises || []), formattedExercise],
    }));

    // Reset selections and details
    setSelectedWorkout("");
    setExerciseDetails({ time: "", distance: "", weight: "", sets: "", reps: "", stretchDuration: "" });
  };

  const handleWorkoutDetailChange = (e) => {
    const { name, value } = e.target;
    setWorkoutDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full h-full overflow-y-auto rounded-lg shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-4 text-gray-800">Add Workout</h3>

        {/* Workout Title Input */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-2 font-semibold">Workout Title</label>
          <input
            type="text"
            name="title"
            value={workoutDetails.title}
            onChange={handleWorkoutDetailChange}
            placeholder="Enter workout title"
            className="input w-full"
          />
        </div>

        {/* Workout Start and End Time Inputs */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-600 mb-2 font-semibold">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={workoutDetails.startTime}
              onChange={handleWorkoutDetailChange}
              className="input w-full"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2 font-semibold">End Time</label>
            <input
              type="time"
              name="endTime"
              value={workoutDetails.endTime}
              onChange={handleWorkoutDetailChange}
              className="input w-full"
            />
          </div>
        </div>

        {/* Workout Type Buttons */}
        <div className="workout-type-buttons mb-6">
          <button
            onClick={() => handleTypeSelect("cardio")}
            className={`type-btn ${selectedType === "cardio" ? "active" : ""}`}
          >
            Cardio
          </button>
          <button
            onClick={() => handleTypeSelect("strength")}
            className={`type-btn ${selectedType === "strength" ? "active" : ""}`}
          >
            Strength
          </button>
          <button
            onClick={() => handleTypeSelect("flexibility")}
            className={`type-btn ${selectedType === "flexibility" ? "active" : ""}`}
          >
            Flexibility
          </button>
        </div>

        {/* Workout List for Selected Type */}
        {selectedType && (
          <div className="workout-list mb-6">
            <h4 className="text-lg font-bold mb-4">Select a {selectedType} workout:</h4>
            <ul className="workout-options">
              {(selectedType === "cardio" ? cardioExercises : selectedType === "strength" ? strengthExercises : flexibilityExercises).map(
                (exercise) => (
                  <li key={exercise}>
                    <button
                      onClick={() => handleWorkoutSelect(exercise)}
                      className={`workout-btn ${selectedWorkout === exercise ? "active" : ""}`}
                    >
                      {exercise}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {/* Exercise Details Input */}
        {selectedWorkout && (
          <div className="exercise-details-form bg-gray-100 p-4 rounded-lg">
            <h4 className="text-lg font-bold mb-4">Enter details for {selectedWorkout}:</h4>

            {selectedType === "cardio" && (
              <>
                <input
                  type="number"
                  name="time"
                  placeholder="Time (minutes)"
                  value={exerciseDetails.time}
                  onChange={handleDetailChange}
                  className="input mb-2"
                />
                <input
                  type="number"
                  name="distance"
                  placeholder="Distance (miles)"
                  value={exerciseDetails.distance}
                  onChange={handleDetailChange}
                  className="input mb-2"
                />
              </>
            )}

            {selectedType === "strength" && (
              <>
                <input
                  type="number"
                  name="weight"
                  placeholder="Weight (lb)"
                  value={exerciseDetails.weight}
                  onChange={handleDetailChange}
                  className="input mb-2"
                />
                <input
                  type="number"
                  name="sets"
                  placeholder="Sets"
                  value={exerciseDetails.sets}
                  onChange={handleDetailChange}
                  className="input mb-2"
                />
                <input
                  type="number"
                  name="reps"
                  placeholder="Reps"
                  value={exerciseDetails.reps}
                  onChange={handleDetailChange}
                  className="input mb-2"
                />
              </>
            )}

            {selectedType === "flexibility" && (
              <>
                <input
                  type="number"
                  name="stretchDuration"
                  placeholder="Stretch Duration (minutes)"
                  value={exerciseDetails.stretchDuration}
                  onChange={handleDetailChange}
                  className="input mb-2"
                />
              </>
            )}

            <button onClick={handleSaveExercise} className="btn-submit mt-4">
              Save Exercise
            </button>
          </div>
        )}

        {/* Display All Saved Exercises */}
        {workoutDetails.exercises && workoutDetails.exercises.length > 0 && (
          <div className="saved-workouts mt-6">
            <h4 className="text-lg font-bold mb-4">Saved Exercises for This Workout:</h4>
            <ul className="bg-gray-100 p-4 rounded-lg">
              {workoutDetails.exercises.map((exercise, index) => (
                <li key={index} className="mb-2">
                  <h5 className="font-semibold">{exercise.name} ({exercise.type})</h5>
                  <ul className="text-gray-600">
                    {Object.entries(exercise.details)
                      .filter(([, value]) => value)
                      .map(([key, value]) => (
                        <li key={key}>{`${key}: ${value}`}</li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Save Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarPopUpWindow;
