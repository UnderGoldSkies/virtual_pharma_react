// ThankYouPage.js
import React, { useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './ThankYouPage.css';

function ThankYouPage() {
  let navigate = useNavigate();
  const [seconds, setSeconds] = useState(10); // Initialize countdown seconds to 10
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Navigate back to the homepage after 10 seconds
    }, 10000); // 10000 milliseconds = 10 seconds

    const countdownTimer = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1); // Decrement the seconds by 1 every second
    }, 1000);

    return () => {
      clearTimeout(timer); // Clear the redirect timer if the component unmounts
      clearInterval(countdownTimer); // Clear the countdown timer
    };
  }, [navigate]);

  return (
    <div className="homepage">
    <div className="logo-container">
      <img src={`${process.env.PUBLIC_URL}/NUHS_Logo.png`} alt="NUH Virtual Pharmacist Logo" />
    </div>
    <div className="section image-section">
      <video ref={videoRef} autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: '0', left: '0' }}>
        <source src={`${process.env.PUBLIC_URL}/Main_Background.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
      <div className="thankyou-container">
        <div className="ThankYouBox">
          <p>Thank you for using our Virtual Pharmacist service!</p>
          <p>Your medicines are ready for collection.</p>
          <p>You will be redirected to the homepage in {seconds} seconds.</p>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;
