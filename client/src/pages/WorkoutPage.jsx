import React, { useState } from "react";
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
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false); // Tracks if the workout has started
  const [workoutStartTime, setWorkoutStartTime] = useState(null); // Logs the workout start time
  const [selectedType, setSelectedType] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [details, setDetails] = useState({ time: "", distance: "", weight: "", sets: "", reps: "", stretchDuration: "" });

  const handleStartWorkout = () => {
    const currentTime = new Date();
    setWorkoutStartTime(currentTime); // Log the start time
    setIsWorkoutStarted(true); // Show the workout logging section
    console.log(`Workout started at: ${currentTime}`);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setSelectedWorkout("");
    setDetails({ time: "", distance: "", weight: "", sets: "", reps: "", stretchDuration: "" });
  };

  const handleWorkoutSelect = (workout) => setSelectedWorkout(workout);

  const handleDetailChange = (e) => setDetails({ ...details, [e.target.name]: e.target.value });

  const handleFinishWorkout = () => {
    console.log("Workout finished:", {
      startTime: workoutStartTime,
      exercises: {
        type: selectedType,
        workout: selectedWorkout,
        details,
      },
    });
    alert("Workout logged successfully!");
    setIsWorkoutStarted(false); // Reset the page for the next workout
    setWorkoutStartTime(null);
    setSelectedType("");
    setSelectedWorkout("");
    setDetails({ time: "", distance: "", weight: "", sets: "", reps: "", stretchDuration: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Workout saved! Type: ${selectedType}, Exercise: ${selectedWorkout}, Details: ${JSON.stringify(details)}`);
  };

  return (
    <div className="workout-page bg-gray-900 text-white min-h-screen p-6">
      {!isWorkoutStarted ? (
        // Show the "Start Workout" button initially
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Start Your Workout</h2>
          <button
            onClick={handleStartWorkout}
            className="type-btn bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md"
          >
            Start Workout
          </button>
        </div>
      ) : (
        // Show the workout logging section after starting the workout
        <div>
          <h2 className="text-3xl font-bold text-center mb-6">Log Your Workout</h2>

          {/* Workout Type Buttons */}
          <div className="workout-type-buttons text-center">
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

          {/* Workout List */}
          {selectedType && (
            <div className="workout-list mt-6">
              <h3 className="text-xl font-semibold mb-4">Select a {selectedType} workout:</h3>
              <ul className="workout-options">
                {workoutOptions[selectedType].map((workout) => (
                  <li key={workout} className="workout-item">
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

          {/* Workout Details Form */}
          {selectedWorkout && (
            <form onSubmit={handleSubmit} className="workout-details-form mt-6 bg-gray-800 p-4 rounded-lg">
              <h4 className="text-lg font-bold mb-4">Enter details for {selectedWorkout}:</h4>

              {selectedType === "cardio" && (
                <>
                  <input
                    type="number"
                    name="time"
                    placeholder="Time (minutes)"
                    value={details.time}
                    onChange={handleDetailChange}
                    className="input"
                  />
                  <input
                    type="number"
                    name="distance"
                    placeholder="Distance (miles)"
                    value={details.distance}
                    onChange={handleDetailChange}
                    className="input"
                  />
                </>
              )}

              {selectedType === "strength" && (
                <>
                  <input
                    type="number"
                    name="weight"
                    placeholder="Weight (lb)"
                    value={details.weight}
                    onChange={handleDetailChange}
                    className="input"
                  />
                  <input
                    type="number"
                    name="sets"
                    placeholder="Sets"
                    value={details.sets}
                    onChange={handleDetailChange}
                    className="input"
                  />
                  <input
                    type="number"
                    name="reps"
                    placeholder="Reps"
                    value={details.reps}
                    onChange={handleDetailChange}
                    className="input"
                  />
                </>
              )}

              {selectedType === "flexibility" && (
                <>
                  <input
                    type="text"
                    name="stretchDuration"
                    placeholder="Stretch Duration (minutes)"
                    value={details.stretchDuration}
                    onChange={handleDetailChange}
                    className="input"
                  />
                </>
              )}

              <button type="submit" className="btn-submit">
                Save Workout
              </button>
            </form>
          )}

          {/* Finish Workout Button */}
          <div className="text-center mt-6">
            <button
              onClick={handleFinishWorkout}
              className="btn-submit bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md"
            >
              Finish Workout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPage;

// /**
//  * @file WorkoutPage.jsx
//  * @description Allows users to select workout types, view dropdowns of exercises, and enter details for each workout.
//  */

// import React, { useState } from "react";
// import "../styles/WorkoutPage.css";

// const workoutOptions = {
//   cardio: ["Running", "Walking"],
//   strength: [
//     "Bicep Curl",
//     "Hammer Curl",
//     "Cross Hammer Curl",
//     "Cable Curl",
//     "Barbell Curl",
//     "Deadlift",
//     "Bent Over Row",
//     "Dumbbell Row",
//     "Pull-down",
//     "Seated Row",
//     "Pull Up",
//     "Romanian Deadlift",
//     "Bulgarian Split Squat",
//     "Squat",
//     "Calf Raise",
//     "Leg Extension",
//     "Goblet Squat",
//     "Leg Curl",
//     "Hip Thrust",
//   ],
//   flexibility: [
//     "Hamstring Stretch",
//     "Arm Stretch",
//     "Toe Touches",
//     "Quad Stretch",
//     "Side Lunges",
//   ],
// };

// const WorkoutPage = () => {
//   const [selectedType, setSelectedType] = useState("");
//   const [selectedWorkout, setSelectedWorkout] = useState("");
//   const [details, setDetails] = useState({ time: "", distance: "", weight: "", sets: "", reps: "", stretchDuration: "" });

//   const handleTypeSelect = (type) => {
//     setSelectedType(type);
//     setSelectedWorkout("");
//     setDetails({ time: "", distance: "", weight: "", sets: "", reps: "", stretchDuration: "" });
//   };

//   const handleWorkoutSelect = (workout) => setSelectedWorkout(workout);

//   const handleDetailChange = (e) => setDetails({ ...details, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Workout saved! Type: ${selectedType}, Exercise: ${selectedWorkout}, Details: ${JSON.stringify(details)}`);
//   };

//   return (
//     <div className="workout-page bg-gray-900 text-white min-h-screen p-6">
//       <h2 className="text-3xl font-bold text-center mb-6">Log Your Workout</h2>

//       {/* Workout Type Buttons */}
//       <div className="workout-type-buttons flex justify-center gap-6 mb-10">
//         <button onClick={() => handleTypeSelect("cardio")} className={`type-btn ${selectedType === "cardio" ? "active" : ""}`}>
//           Cardio
//         </button>
//         <button onClick={() => handleTypeSelect("strength")} className={`type-btn ${selectedType === "strength" ? "active" : ""}`}>
//           Strength
//         </button>
//         <button onClick={() => handleTypeSelect("flexibility")} className={`type-btn ${selectedType === "flexibility" ? "active" : ""}`}>
//           Flexibility
//         </button>
//       </div>

//       {/* Workout List */}
//       {selectedType && (
//         <div className="workout-list mb-6">
//           <h3 className="text-xl font-semibold mb-4">Select a {selectedType} workout:</h3>
//           <ul className="workout-options">
//             {workoutOptions[selectedType].map((workout) => (
//               <li key={workout} className="workout-item">
//                 <button onClick={() => handleWorkoutSelect(workout)} className={`workout-btn ${selectedWorkout === workout ? "active" : ""}`}>
//                   {workout}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Workout Details Form */}      
//       {selectedWorkout && (
//         <form onSubmit={handleSubmit} className="workout-details-form mt-6 bg-gray-800 p-4 rounded-lg">
//           <h4 className="text-lg font-bold mb-4">Enter details for {selectedWorkout}:</h4>

//           {selectedType === "cardio" && (
//             <>
//               <input type="number" name="time" placeholder="Time (minutes)" value={details.time} onChange={handleDetailChange} className="input" />
//               <input type="number" name="distance" placeholder="Distance (miles)" value={details.distance} onChange={handleDetailChange} className="input" />
//             </>
//           )}

//           {selectedType === "strength" && (
//             <>
//               <input type="number" name="weight" placeholder="Weight (lb)" value={details.weight} onChange={handleDetailChange} className="input" />
//               <input type="number" name="sets" placeholder="Sets" value={details.sets} onChange={handleDetailChange} className="input" />
//               <input type="number" name="reps" placeholder="Reps" value={details.reps} onChange={handleDetailChange} className="input" />
//             </>
//           )}

//           {selectedType === "flexibility" && (
//             <>
//               <input type="text" name="stretchDuration" placeholder="Stretch Duration (minutes)" value={details.stretchDuration} onChange={handleDetailChange} className="input" />
//             </>
//           )}

//           <button type="submit" className="btn-submit">Save Workout</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default WorkoutPage;

// /**
//  * @file WorkoutPage.jsx
//  * @description Allows users to start a workout session, select workout types, view dropdowns of exercises, 
//  * and enter details for each workout. Adds functionality for starting and finishing a workout.
//  */

// import React, { useState } from "react";
// import "../styles/WorkoutPage.css";

// const workoutOptions = {
//   cardio: ["Running", "Walking"],
//   strength: [
//     "Bicep Curl",
//     "Hammer Curl",
//     "Cross Hammer Curl",
//     "Cable Curl",
//     "Barbell Curl",
//     "Deadlift",
//     "Bent Over Row",
//     "Dumbbell Row",
//     "Pull-down",
//     "Seated Row",
//     "Pull Up",
//     "Romanian Deadlift",
//     "Bulgarian Split Squat",
//     "Squat",
//     "Calf Raise",
//     "Leg Extension",
//     "Goblet Squat",
//     "Leg Curl",
//     "Hip Thrust",
//   ],
//   flexibility: [
//     "Hamstring Stretch",
//     "Arm Stretch",
//     "Toe Touches",
//     "Quad Stretch",
//     "Side Lunges",
//   ],
// };

// const WorkoutPage = () => {
//   const [workoutStarted, setWorkoutStarted] = useState(false);
//   const [startTime, setStartTime] = useState(null);
//   const [selectedType, setSelectedType] = useState("");
//   const [selectedWorkout, setSelectedWorkout] = useState("");
//   const [details, setDetails] = useState({
//     time: "",
//     distance: "",
//     weight: "",
//     sets: "",
//     reps: "",
//     stretchDuration: "",
//   });

//   const [workoutData, setWorkoutData] = useState([]);

//   const handleStartWorkout = () => {
//     setWorkoutStarted(true);
//     setStartTime(new Date());
//     alert("Workout started!");
//   };

//   const handleFinishWorkout = () => {
//     const endTime = new Date();
//     alert(
//       `Workout finished! Start: ${startTime.toLocaleString()}, End: ${endTime.toLocaleString()}`
//     );
//     console.log("Workout Data:", workoutData);

//     // Reset state after finishing workout
//     setWorkoutStarted(false);
//     setStartTime(null);
//     setSelectedType("");
//     setSelectedWorkout("");
//     setDetails({
//       time: "",
//       distance: "",
//       weight: "",
//       sets: "",
//       reps: "",
//       stretchDuration: "",
//     });
//     setWorkoutData([]);
//   };

//   const handleTypeSelect = (type) => {
//     setSelectedType(type);
//     setSelectedWorkout("");
//     setDetails({
//       time: "",
//       distance: "",
//       weight: "",
//       sets: "",
//       reps: "",
//       stretchDuration: "",
//     });
//   };

//   const handleWorkoutSelect = (workout) => setSelectedWorkout(workout);

//   const handleDetailChange = (e) =>
//     setDetails({ ...details, [e.target.name]: e.target.value });

//   const handleAddWorkout = (e) => {
//     e.preventDefault();
//     setWorkoutData((prev) => [
//       ...prev,
//       { type: selectedType, workout: selectedWorkout, details },
//     ]);
//     setSelectedWorkout("");
//     setDetails({
//       time: "",
//       distance: "",
//       weight: "",
//       sets: "",
//       reps: "",
//       stretchDuration: "",
//     });
//     alert("Workout added!");
//   };

//   return (
//     <div className="workout-page bg-gray-900 text-white min-h-screen p-6">
//       <h2 className="text-3xl font-bold text-center mb-6">
//         {workoutStarted ? "Log Your Workout" : "Start Your Workout"}
//       </h2>

//       {!workoutStarted ? (
//         <button
//           className="btn btn-start"
//           onClick={handleStartWorkout}
//         >
//           Start Workout
//         </button>
//       ) : (
//         <>
//           <div className="workout-type-selector mb-6">
//             <button
//               onClick={() => handleTypeSelect("cardio")}
//               className={`btn ${selectedType === "cardio" ? "active" : ""}`}
//             >
//               Cardio
//             </button>
//             <button
//               onClick={() => handleTypeSelect("strength")}
//               className={`btn ${selectedType === "strength" ? "active" : ""}`}
//             >
//               Strength
//             </button>
//             <button
//               onClick={() => handleTypeSelect("flexibility")}
//               className={`btn ${
//                 selectedType === "flexibility" ? "active" : ""
//               }`}
//             >
//               Flexibility
//             </button>
//           </div>

//           {selectedType && (
//             <div className="workout-list">
//               <h3 className="text-xl font-semibold mb-4">
//                 Select a {selectedType} workout:
//               </h3>
//               <ul className="workout-options">
//                 {workoutOptions[selectedType].map((workout) => (
//                   <li key={workout} className="workout-item">
//                     <button
//                       onClick={() => handleWorkoutSelect(workout)}
//                       className={`btn ${
//                         selectedWorkout === workout ? "active" : ""
//                       }`}
//                     >
//                       {workout}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {selectedWorkout && (
//             <form
//               onSubmit={handleAddWorkout}
//               className="workout-details-form mt-6 bg-gray-800 p-4 rounded-lg"
//             >
//               <h4 className="text-lg font-bold mb-4">
//                 Enter details for {selectedWorkout}:
//               </h4>

//               {selectedType === "cardio" && (
//                 <>
//                   <input
//                     type="number"
//                     name="time"
//                     placeholder="Time (minutes)"
//                     value={details.time}
//                     onChange={handleDetailChange}
//                     className="input"
//                   />
//                   <input
//                     type="number"
//                     name="distance"
//                     placeholder="Distance (miles)"
//                     value={details.distance}
//                     onChange={handleDetailChange}
//                     className="input"
//                   />
//                 </>
//               )}

//               {selectedType === "strength" && (
//                 <>
//                   <input
//                     type="number"
//                     name="weight"
//                     placeholder="Weight (lb)"
//                     value={details.weight}
//                     onChange={handleDetailChange}
//                     className="input"
//                   />
//                   <input
//                     type="number"
//                     name="sets"
//                     placeholder="Sets"
//                     value={details.sets}
//                     onChange={handleDetailChange}
//                     className="input"
//                   />
//                   <input
//                     type="number"
//                     name="reps"
//                     placeholder="Reps"
//                     value={details.reps}
//                     onChange={handleDetailChange}
//                     className="input"
//                   />
//                 </>
//               )}

//               {selectedType === "flexibility" && (
//                 <>
//                   <input
//                     type="text"
//                     name="stretchDuration"
//                     placeholder="Stretch Duration (minutes)"
//                     value={details.stretchDuration}
//                     onChange={handleDetailChange}
//                     className="input"
//                   />
//                 </>
//               )}

//               <button type="submit" className="btn-submit">
//                 Add Workout
//               </button>
//             </form>
//           )}

//           <button
//             className="btn btn-finish mt-8"
//             onClick={handleFinishWorkout}
//           >
//             Finish Workout
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default WorkoutPage;

// // /**
// //  * @file WorkoutPage.jsx
// //  * @description Allows users to select workout types, view dropdowns of exercises, and enter details for each workout.
// //  */

// // import React, { useState } from "react";
// // import "../styles/WorkoutPage.css";

// // const workoutOptions = {
// //   cardio: ["Running", "Walking"],
// //   strength: [
// //     "Bicep Curl",
// //     "Hammer Curl",
// //     "Cross Hammer Curl",
// //     "Cable Curl",
// //     "Barbell Curl",
// //     "Deadlift",
// //     "Bent Over Row",
// //     "Dumbbell Row",
// //     "Pull-down",
// //     "Seated Row",
// //     "Pull Up",
// //     "Romanian Deadlift",
// //     "Bulgarian Split Squat",
// //     "Squat",
// //     "Calf Raise",
// //     "Leg Extension",
// //     "Goblet Squat",
// //     "Leg Curl",
// //     "Hip Thrust",
// //   ],
// //   flexibility: [
// //     "Hamstring Stretch",
// //     "Arm Stretch",
// //     "Toe Touches",
// //     "Quad Stretch",
// //     "Side Lunges",
// //   ],
// // };

// // const WorkoutPage = () => {
// //   const [selectedType, setSelectedType] = useState("");
// //   const [selectedWorkout, setSelectedWorkout] = useState("");
// //   const [details, setDetails] = useState({ time: "", distance: "", weight: "", sets: "", reps: "", stretchDuration: "" });

// //   const handleTypeSelect = (type) => {
// //     setSelectedType(type);
// //     setSelectedWorkout("");
// //     setDetails({ time: "", distance: "", weight: "", sets: "", reps: "", stretchDuration: "" });
// //   };

// //   const handleWorkoutSelect = (workout) => setSelectedWorkout(workout);

// //   const handleDetailChange = (e) => setDetails({ ...details, [e.target.name]: e.target.value });

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     alert(`Workout saved! Type: ${selectedType}, Exercise: ${selectedWorkout}, Details: ${JSON.stringify(details)}`);
// //   };

// //   return (
// //     <div className="workout-page bg-gray-900 text-white min-h-screen p-6">
// //       <h2 className="text-3xl font-bold text-center mb-6">Plan Your Workout</h2>
      
// //       <div className="workout-type-selector mb-6">
// //         <button onClick={() => handleTypeSelect("cardio")} className={`btn ${selectedType === "cardio" ? "active" : ""}`}>Cardio</button>
// //         <button onClick={() => handleTypeSelect("strength")} className={`btn ${selectedType === "strength" ? "active" : ""}`}>Strength</button>
// //         <button onClick={() => handleTypeSelect("flexibility")} className={`btn ${selectedType === "flexibility" ? "active" : ""}`}>Flexibility</button>
// //       </div>

// //       {selectedType && (
// //         <div className="workout-list">
// //           <h3 className="text-xl font-semibold mb-4">Select a {selectedType} workout:</h3>
// //           <ul className="workout-options">
// //             {workoutOptions[selectedType].map((workout) => (
// //               <li key={workout} className="workout-item">
// //                 <button onClick={() => handleWorkoutSelect(workout)} className={`btn ${selectedWorkout === workout ? "active" : ""}`}>
// //                   {workout}
// //                 </button>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}

// //       {selectedWorkout && (
// //         <form onSubmit={handleSubmit} className="workout-details-form mt-6 bg-gray-800 p-4 rounded-lg">
// //           <h4 className="text-lg font-bold mb-4">Enter details for {selectedWorkout}:</h4>

// //           {selectedType === "cardio" && (
// //             <>
// //               <input type="number" name="time" placeholder="Time (minutes)" value={details.time} onChange={handleDetailChange} className="input" />
// //               <input type="number" name="distance" placeholder="Distance (miles)" value={details.distance} onChange={handleDetailChange} className="input" />
// //             </>
// //           )}

// //           {selectedType === "strength" && (
// //             <>
// //               <input type="number" name="weight" placeholder="Weight (lb)" value={details.weight} onChange={handleDetailChange} className="input" />
// //               <input type="number" name="sets" placeholder="Sets" value={details.sets} onChange={handleDetailChange} className="input" />
// //               <input type="number" name="reps" placeholder="Reps" value={details.reps} onChange={handleDetailChange} className="input" />
// //             </>
// //           )}

// //           {selectedType === "flexibility" && (
// //             <>
// //               <input type="text" name="stretchDuration" placeholder="Stretch Duration (minutes)" value={details.stretchDuration} onChange={handleDetailChange} className="input" />
// //             </>
// //           )}

// //           <button type="submit" className="btn-submit">Save Workout</button>
// //         </form>
// //       )}
// //     </div>
// //   );
// // };

// // export default WorkoutPage;

// // import React from 'react';
// // import '../styles/WorkoutPage.css'; // Custom styling for the workout page

// // const WorkoutPage = () => {
// //   return (
// //     <div className="workout-page bg-gray-100 text-gray-900 min-h-screen flex flex-col items-center p-6">
// //       {/* Header */}
// //       <header className="workout-header text-center py-6 bg-purple-600 text-white rounded-lg shadow-lg w-full">
// //         <h1 className="text-4xl font-bold">Plan Your Workouts</h1>
// //         <p className="text-lg mt-2">Choose exercises, set goals, and track progress!</p>
// //       </header>

// //       {/* Main Content */}
// //       <main className="workout-content mt-6 w-full max-w-4xl">
// //         {/* Search Bar */}
// //         <div className="search-bar mb-6">
// //           <input
// //             type="text"
// //             className="search-input border-gray-300 shadow-sm w-full p-3 rounded-lg"
// //             placeholder="Search exercises..."
// //           />
// //         </div>

// //         {/* Workout Categories */}
// //         <div className="categories grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           <div className="category-card bg-white rounded-lg shadow-lg p-6">
// //             <h3 className="text-xl font-semibold">Cardio</h3>
// //             <p className="text-gray-600 mt-2">Boost endurance and burn calories.</p>
// //           </div>
// //           <div className="category-card bg-white rounded-lg shadow-lg p-6">
// //             <h3 className="text-xl font-semibold">Strength</h3>
// //             <p className="text-gray-600 mt-2">Build muscle and increase power.</p>
// //           </div>
// //           <div className="category-card bg-white rounded-lg shadow-lg p-6">
// //             <h3 className="text-xl font-semibold">Flexibility</h3>
// //             <p className="text-gray-600 mt-2">Improve mobility and prevent injuries.</p>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default WorkoutPage;
