import { useNavigate } from 'react-router-dom'

const UserHomepage = () => {
  const navigate = useNavigate();

  const goToCalendar = () => {
    navigate("/calendar"); 
  };

  return (
    <div>
      <h1>WELCOME TO IRON PULSE FITNESS!</h1>
      {/* Calendar button */}
      <button onClick={goToCalendar}>Go to Calendar</button>
    </div>
  );
};

export default UserHomepage

// import React from 'react';

// const UserHomepage = () => {
//   return (
//     <div>
//       <h1>Welcome to Your Dashboard</h1>
//       <p>This is your homepage where you can view your personal data and navigate to other sections.</p>
//       {/* Add future features here */}
//     </div>
//   );
// };

// export default UserHomepage;
