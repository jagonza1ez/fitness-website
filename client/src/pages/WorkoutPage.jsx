import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import runningImg from "../images/running.jpg";
import walkingImg from "../images/walking.jpg";
import bicepCurlImg from "../images/bicep-curl.jpg";
import hammerCurlImg from "../images/hammer-curl.jpg";
import crossHammerImg from "../images/cross-hammer.jpg";
import cableCurlImg from "../images/cable-curl.jpg";
import barbellCurlImg from "../images/barbell-curl.jpg";
import deadliftImg from "../images/deadlift.jpg";
import bentOverRowImg from "../images/bent-over-row.jpg";
import dumbbellRowImg from "../images/dumbbell-row.jpg";
import pulldownImg from "../images/pulldown.jpg";
import seatedRowImg from "../images/seated-row.jpg";
import pullupImg from "../images/pullup.jpg";
import hamstringStretchImg from "../images/hamstring-stretch.jpg";
import armStretchImg from "../images/arm-stretch.jpg";
import toeTouchesImg from "../images/toe-touches.jpg";

import "../styles/WorkoutPage.css";

const workoutData = {
  cardio: [
    {
      name: "Running",
      description: "1. Warm up with a brisk 5-minute walk.\n2. Maintain a steady pace suitable for your fitness level.\n3. Swing your arms naturally and keep a straight posture.\n4. Breathe rhythmically: inhale through your nose, exhale through your mouth.",
      visual: runningImg,
    },
    {
      name: "Walking",
      description: "1. Start with an upright posture.\n2. Swing your arms naturally at your sides.\n3. Take smooth, even strides.\n4. Maintain a brisk pace to elevate your heart rate.",
      visual: walkingImg,
    },
  ],
  strength: [
    {
      name: "Bicep Curl",
      description: "1. Hold a dumbbell in each hand with palms facing forward.\n2. Keep your elbows close to your torso.\n3. Curl the weights upward by bending your elbows.\n4. Lower the dumbbells back down slowly. Repeat.",
      visual: bicepCurlImg,
    },
    {
      name: "Hammer Curl",
      description: "1. Hold dumbbells with palms facing inward.\n2. Keep your elbows tucked close to your body.\n3. Curl the weights upward while maintaining a neutral wrist.\n4. Lower the dumbbells back down slowly. Repeat.",
      visual: hammerCurlImg,
    },
    {
      name: "Cross Hammer Curl",
      description: "1. Hold dumbbells with palms facing inward.\n2. Curl one dumbbell across your chest toward the opposite shoulder.\n3. Alternate arms with each repetition.\n4. Keep your elbows close to your torso throughout the movement.",
      visual: crossHammerImg,
    },
    {
      name: "Cable Curl",
      description: "1. Stand in front of a cable machine with the handle set to the lowest point.\n2. Grab the handle with palms facing up.\n3. Curl the handle upward, keeping your elbows stationary.\n4. Slowly lower the handle back down. Repeat.",
      visual: cableCurlImg,
    },
    {
      name: "Barbell Curl",
      description: "1. Grip a barbell with palms facing up, shoulder-width apart.\n2. Keep your elbows close to your torso.\n3. Curl the bar upward, squeezing your biceps.\n4. Lower the bar slowly back to the starting position. Repeat.",
      visual: barbellCurlImg,
    },
    {
      name: "Deadlift",
      description: "1. Stand with feet hip-width apart, barbell over midfoot.\n2. Bend at hips and knees to grab the bar with a firm grip.\n3. Lift the bar by straightening your legs and hips simultaneously.\n4. Keep your back straight and core engaged. Lower the bar slowly. Repeat.",
      visual: deadliftImg,
    },
    {
      name: "Bent Over Row",
      description: "1. Hold a barbell or dumbbells with palms facing down.\n2. Bend at your hips and knees, keeping your back straight.\n3. Pull the weights toward your torso by bending your elbows.\n4. Slowly lower the weights back down. Repeat.",
      visual: bentOverRowImg,
    },
    {
      name: "Dumbbell Row",
      description: "1. Place one knee and hand on a bench for support.\n2. Hold a dumbbell in the opposite hand.\n3. Pull the dumbbell toward your torso by bending your elbow.\n4. Lower it back down slowly. Alternate sides.",
      visual: dumbbellRowImg,
    },
    {
      name: "Pull-down",
      description: "1. Sit at a pull-down machine and grab the bar with palms facing forward.\n2. Pull the bar down to your chest while keeping your back straight.\n3. Slowly release the bar back to the starting position. Repeat.",
      visual: pulldownImg,
    },
    {
      name: "Seated Row",
      description: "1. Sit on a rowing machine and grab the handle.\n2. Pull the handle toward your torso, keeping your back straight.\n3. Extend your arms back out to the starting position. Repeat.",
      visual: seatedRowImg,
    },
    {
      name: "Pull Up",
      description: "1. Grab a pull-up bar with palms facing away, shoulder-width apart.\n2. Pull your body upward until your chin is above the bar.\n3. Lower yourself back down with control. Repeat.",
      visual: pullupImg,
    },
  ],
  flexibility: [
    {
      name: "Hamstring Stretch",
      description: "1. Sit on the floor with one leg extended and the other bent.\n2. Reach toward your extended leg, keeping your back straight.\n3. Hold the stretch for 20-30 seconds. Switch sides.",
      visual: hamstringStretchImg,
    },
    {
      name: "Arm Stretch",
      description: "1. Extend one arm across your chest.\n2. Use the opposite hand to gently press your arm closer to your body.\n3. Hold the stretch for 15-20 seconds. Switch arms.",
      visual: armStretchImg,
    },
    {
      name: "Toe Touches",
      description: "1. Stand with your feet shoulder-width apart.\n2. Bend forward at the hips and reach for your toes.\n3. Keep your knees slightly bent if needed. Hold for 20-30 seconds.",
      visual: toeTouchesImg,
    },
  ],
};


const WorkoutPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentExerciseIndex(0);
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < workoutData[selectedCategory].length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  return (
<div className="workout-page bg-gray-900 text-white min-h-screen p-6">
  {!selectedCategory ? (
    <>
      <h1 className="text-3xl font-bold text-center mb-6">
        Learn Your Workouts
      </h1>
      <div className="workout-category-buttons flex flex-wrap justify-center gap-4">
        {Object.keys(workoutData).map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className="btn-category bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </>
  ) : (
    <>
      <div className="exercise-display text-center">
        <h2 className="text-2xl font-bold mb-4">
          {workoutData[selectedCategory][currentExerciseIndex].name}
        </h2>
        <img
          src={workoutData[selectedCategory][currentExerciseIndex].visual}
          alt={workoutData[selectedCategory][currentExerciseIndex].name}
          className="exercise-visual mx-auto mb-4"
        />
        <p className="exercise-description text-gray-300 mb-6">
          {workoutData[selectedCategory][currentExerciseIndex].description.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <div className="exercise-navigation flex justify-center gap-4">
          <button
            onClick={handlePreviousExercise}
            className="btn-nav bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
            disabled={currentExerciseIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNextExercise}
            className="btn-nav bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
            disabled={currentExerciseIndex === workoutData[selectedCategory].length - 1}
          >
            Next
          </button>
        </div>
      </div>
      <button
        onClick={() => setSelectedCategory("")}
        className="btn-back bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mt-6 block mx-auto"
      >
        Back to Categories
      </button>
    </>
  )}
  {/* Back to UserHomepage Button */}
  <button
    onClick={() => navigate("/user-homepage")}
    className="btn-back bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mt-6 block mx-auto"
  >
    Back to User Home page
  </button>
</div>

  );
};

export default WorkoutPage;
