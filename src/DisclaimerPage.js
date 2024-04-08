// WelcomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

function WelcomePage() {
  let navigate = useNavigate(); // Use useNavigate hook

  const navigateToQuery = () => {
    navigate('/query'); // Use navigate function for navigation
  };

  return (
    <div class="disclaimer-screen">
  <div class="disclaimer-content">
    <p>Please read the disclaimer...</p>
    <button onClick={navigateToQuery} className="fancy-button">Accept</button>
    <button class="decline-button">Decline</button>
  </div>
</div>

  );
}

export default WelcomePage;
