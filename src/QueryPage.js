import './logo.css';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './QueryPage.css';

function QueryScreen() {
  let navigate = useNavigate();
  const [showIdInput, setShowIdInput] = useState(true);
  const [showAllergiesQuestion, setShowAllergiesQuestion] = useState(false);
  const [nric, setNric] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrorOccurred, setHasErrorOccurred] = useState(false);
  const [medicationData, setMedicationData] = useState(null);



  useEffect(() => {
    const handleVideoLoad = () => {
      setTimeout(() => setShowIdInput(true), 3500);
    };

    const videoElement = videoRef.current;
    videoElement && videoElement.addEventListener('loadeddata', handleVideoLoad);

    return () => videoElement && videoElement.removeEventListener('loadeddata', handleVideoLoad);
  }, []);

  const welcomeVariants = [
    "Hello there, I am here to provide drug counselling for your medication.",
    "Greetings! Ready to assist you with medication counselling.",
    "Welcome! Let's get started with your medication counselling session."
  ];
  const [welcomeMsg] = useState(welcomeVariants[Math.floor(Math.random() * welcomeVariants.length)]);

  const callApiAndShowAllergies = useCallback(() => {
    setIsLoading(true);
    setErrorMessage(''); // Clear previous error messages
    if (nric.length !== 9 || !/^[A-Za-z].*[A-Za-z]$/.test(nric) || !/^[A-Za-z][0-9]{7}[A-Za-z]$/.test(nric)) {
      setErrorMessage('Please ensure the NRIC is correctly formatted.');
      setIsLoading(false);
      return;
    }
    const url = `http://127.0.0.1:8000/drug_counsel?mrn=${encodeURIComponent(nric)}`;
    fetch(url, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    }).then(response => {
      if (!response.ok) throw new Error(`Network response was not ok, status: ${response.status}`);
      return response.json();
    }).then(data => {
      setMedicationData(data);  // Store the fetched data in state
      setShowAllergiesQuestion(true);
    }).catch((error) => {
      console.error('Error:', error);
      setErrorMessage('Failed to load data: ' + error.message);
      setHasErrorOccurred(true); // Indicate that an error has occurred
    }).finally(() => {
      setIsLoading(false);
    });
  }, [nric]);


  const handleNoAllergies = () => {
    navigate('/counselling',{ state: { medicationData } });
  };

  const handleInputChange = (event) => {
    setNric(event.target.value);
  };

  return (
    <div className="query-screen">
      <div className="logo-container">
        <img src={`${process.env.PUBLIC_URL}/NUHS_Logo.png`} alt="NUH Virtual Pharmacist Logo" />
      </div>
      <div className="section image-section">
        <video ref={videoRef} autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: '0', left: '0' }}>
          <source src={`${process.env.PUBLIC_URL}/pharmacy_gif_full.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="section query-section">
        <p>{welcomeMsg}</p>
        {showIdInput && (
         <div className="id-input">
          <p>Please Key/Scan your NRIC below</p>
          <input type="text" value={nric} onChange={handleInputChange} placeholder="Enter NRIC Here" />
          {!isLoading && (
            <button className="submit-button" onClick={callApiAndShowAllergies}>
              {hasErrorOccurred ? 'Re-submit' : 'Submit'}
            </button>
          )}
          {isLoading && <div className="loading"><p>Loading...</p></div>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        )}
        {showAllergiesQuestion && (
          <div>
            <h2>Do you have any Allergies?</h2>
            <div className="buttons-container">
              <button className="yes-button">Yes</button>
              <button className="no-button" onClick={handleNoAllergies}>No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QueryScreen;
