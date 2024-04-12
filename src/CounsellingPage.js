import './logo.css';
import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Combine import statements

function CounsellingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // Extract medication data from the router's location state
  const medicationData = location.state?.medicationData;

  // Function to navigate to the thank you page
  const navigateToThankYouPage = () => {
    navigate('/thankyou');
  };

  return (
    <div>
      <div className="logo-container">
        <img src={`${process.env.PUBLIC_URL}/NUHS_Logo.png`} alt="NUH Virtual Pharmacist Logo" />
      </div>
      <div className="section image-section">
        <video ref={videoRef} autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: '0', left: '0' }}>
          <source src={`${process.env.PUBLIC_URL}/Counselling_Background.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <h1>Counselling Information</h1>
      {/* Conditional rendering based on the presence of medication data */}
      {medicationData ? (
        <div className="medication-container">
          <h2>Medication Details</h2>
          <pre>{JSON.stringify(medicationData, null, 2)}</pre>
        </div>
      ) : (
        <p>No medication data available.</p>
      )}
      <button onClick={navigateToThankYouPage}>Proceed to Thank You Page</button>
    </div>
  );
}

export default CounsellingPage;
