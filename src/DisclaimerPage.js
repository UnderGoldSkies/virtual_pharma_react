// DisclaimerPage.js
import './logo.css'
import './DisclaimerPage.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

function DisclaimerPage() {
  let navigate = useNavigate(); // Use useNavigate hook
  const [countdown, setCountdown] = useState(10);

  const navigateToQuery = () => {
    navigate('/query'); // Use navigate function for navigation
  };

  // Navigate to the main page (home page, or wherever you'd like the user to go if they decline)
  const navigateToMainPage = () => {
    navigate('/'); // Adjust this to your main page's route
  };
  // Start countdown when decline is clicked
  const handleDecline = () => {
  alert('Acknowledgement required to proceed with using this tool.');
  let intervalId = setInterval(() => {
    setCountdown((currentCountdown) => {
      if (currentCountdown <= 1) {
        clearInterval(intervalId);
        navigateToMainPage(); // Redirect when countdown finishes
        return 10; // Reset countdown for next time page is visited
      }
      return currentCountdown - 1;
    });
  }, 1000);
};

  return (
    <div class="disclaimer-screen">
      <div className="logo-container">
        <img src={`${process.env.PUBLIC_URL}/NUHS_Logo.png`} alt="NUH Virtual Pharmacist Logo" />
      </div>
      <div class="disclaimer-content">
      <p><strong>Virtual Pharmacy Disclaimer</strong></p>
      <p style={{ textAlign: 'left' }}>Before using the Virtual Pharmacy, it is essential that you read, understand, and agree to the following terms:</p>
      <p style={{ textAlign: 'left' }}>
      <strong>What This Tool Does:</strong> This tool gives you advice about your medicines. It's here to help shorten your waiting time.
      </p>
      <p style={{ textAlign: 'left' }}>
      <strong>What to Do if Something Seems Wrong:</strong> If the information you get from this Virtual Pharmacy doesn't match what your medication says, or if you're worried about the advice it gives, please contact us at the counter.
      </p>
      <button onClick={navigateToQuery} className="disclaimer-accept-button">Acknowledge</button>
        <button onClick={handleDecline} className="disclaimer-decline-button">Decline</button>
        {countdown < 10 && <p>{countdown} seconds to return to Main Page.</p>}
      </div>
    </div>

  );
}

export default DisclaimerPage;
