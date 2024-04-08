import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function CounsellingPage() {
  const location = useLocation();
  const { nric } = location.state || {}; // Fallback to an empty object if state is undefined
  const [apiResponseSections, setApiResponseSections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // To track the current section being displayed
  const [errorMessage, setErrorMessage] = useState(''); // State to store potential error messages

  useEffect(() => {
    // Only call the API if nric is not undefined or empty
    if (nric) {
      callApi();
    }
  }, [nric]); // This effect depends on `nric`

  const callApi = () => {
    const url = `http://127.0.0.1:8000/drug_counsel?mrn=${encodeURIComponent(nric)}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Directly use 'data' if it's the string you need to split
      const sections = data.split("\n\n");
      setApiResponseSections(sections);
      setErrorMessage(''); // Clear any previous error messages
    })
    .catch((error) => {
      console.error('Error:', error);
      setErrorMessage('Failed to load data: ' + error.message);
      setApiResponseSections([]); // Clear previous sections if error occurs
    });
  };

  const handleNext = () => {
    if (currentIndex < apiResponseSections.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="interactive-screen">
      <div className="info-content">
        <p>NRIC: {nric}</p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {!errorMessage && apiResponseSections.length > 0 &&
          <p>{apiResponseSections[currentIndex]}</p>}
        <button className="back-button" onClick={handleBack} disabled={currentIndex === 0}>Back</button>
        <button className="next-button" onClick={handleNext} disabled={currentIndex === apiResponseSections.length - 1}>Next</button>
      </div>
    </div>
  );
}

export default CounsellingPage;
