import './App.css'; // Adjust the path as necessary
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function QueryScreen() {
  let navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [nric, setNric] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to store the error message

  const navigateToCounselling = () => {
    // Check for exactly 9 characters
    if (nric.length !== 9) {
      setErrorMessage('NRIC must have exactly 9 characters.');
      return;
    }
    // Check if it starts and ends with an alphabet
    if (!/^[A-Za-z].*[A-Za-z]$/.test(nric)) {
      setErrorMessage('NRIC must start and end with a letter.');
      return;
    }
    // Check if the middle characters are numeric
    if (!/^[A-Za-z][0-9]{7}[A-Za-z]$/.test(nric)) {
      setErrorMessage('The middle characters must be numeric.');
      return;
    }

    // If all checks pass
    setErrorMessage(''); // Clear any previous error messages
    navigate('/counselling', { state: { nric: nric } });
  };

  const handleInputChange = (event) => {
    setNric(event.target.value);
  };

  const handleNoButtonClick = () => {
    setShowInput(true);
  };

  return (
    <div className="query-screen">
      <div className="section query-section">
        <h2>Do you have any Allergies?</h2>
        <button className="yes-button">Yes</button>
        <button className="no-button" onClick={handleNoButtonClick}>No</button>
        {/* The input box can be initially hidden and shown based on the No button press */}
        <div className="id-input" style={{ display: showInput ? 'block' : 'none' }}>
          <p>Please Key/Scan your NRIC below</p>
          <input type="text" value={nric} onChange={handleInputChange} placeholder="Enter ID" />
          <button className="submit-button" onClick={navigateToCounselling}>Submit</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
      <div className="section image-section"></div>
      <div className="section image-section"></div>
    </div>
  );
}

export default QueryScreen;
