import './logo.css';
import './WelcomePage.css';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const navigateToQuery = () => {
    navigate('/query');
  };

  return (
    <div className="homepage" onClick={navigateToQuery} style={{ height: '100vh', cursor: 'pointer' }}>
      <div className="logo-container">
        <img src={`${process.env.PUBLIC_URL}/NUHS_Logo.png`} alt="NUH Virtual Pharmacist Logo" />
      </div>
      <div className="section image-section">
        <video ref={videoRef} autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: '0', left: '0' }}>
          <source src={`${process.env.PUBLIC_URL}/Main_Background.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="WelcomeBoxContainer">
        <div className="WelcomeBox">
          <p>Welcome to NUH Virtual Pharmacist</p>
          <p> </p>
          <p>CLICK ANYWHERE TO START</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
