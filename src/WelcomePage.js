// WelcomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

function WelcomePage() {
  let navigate = useNavigate(); // Use useNavigate hook

  const navigateToDisclaimer = () => {
    navigate('/disclaimer'); // Use navigate function for navigation
  };

  return (
    <div className="full-height-section" style={{ /* Background image and styling */ }}>
      <img src={process.env.PUBLIC_URL + "/NUHS_Logo.png"} alt="NUHS Logo" />
      <div className="welcome-container">
        <div className="WelcomeBox">
          <p>Welcome to your Virtual Pharmacist</p>
        </div>
        <button onClick={navigateToDisclaimer} className="fancy-button">Enter</button>
      </div>
    </div>
  );
}

export default WelcomePage;
