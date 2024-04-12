// ThankYouPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ThankYouPage() {
  let navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Navigate back to the homepage after 10 seconds
    }, 10000); // 10000 milliseconds = 10 seconds

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [navigate]); // Dependency array includes navigate to avoid re-running the effect unnecessarily

  return (
    <div className="thankyou-page" style={{ /* Background image and styling if needed */ }}>
      <img src={process.env.PUBLIC_URL + "/NUHS_Logo.png"} alt="NUHS Logo" />
      <div className="thankyou-container">
        <div className="ThankYouBox">
          <p>Thank you for using our Virtual Pharmacist service!</p>
          <p>Your medicines are ready for collection.</p>
        </div>
        {/* The button is optional since we are auto-navigating */}
        <p>You will be redirected to the homepage in 10 seconds.</p>
      </div>
    </div>
  );
}

export default ThankYouPage;
