import './logo.css';
import './CounsellingPage.css';
import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CounsellingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // Function to navigate to the thank you page
  const navigateToThankYouPage = () => {
    navigate('/thankyou');
  };

  // Extract medication data from the router's location state
  const medicationData = location.state?.medicationData;

  // State for managing displayed sentences and index
  const [currentSet, setCurrentSet] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  // Update displayed set of sentences
  useEffect(() => {
    const sentences = JSON.stringify(medicationData, null, 2).split('\\n\\n');
    displaySet(sentences, currentIndex);
    setMaxIndex(sentences.length);
  }, [medicationData, currentIndex]);

  const displaySet = (sentences, index) => {
    const set = sentences.slice(index, index + 3);
    setCurrentSet(set);
  };

  const handleNext = () => {
    const sentences = JSON.stringify(medicationData, null, 2).split('\\n\\n');
    if (currentIndex + 3 < sentences.length) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 3 >= 0 ? prev - 3 : 0));
  };

  const isLastPage = currentIndex + 3 >= maxIndex;  // Determines if it's the last page
  const isFirstPage = currentIndex === 0;           // Determines if it's the first page

  return (
    <div className="background">
      <div className="logo-container">
        <img src={`${process.env.PUBLIC_URL}/NUHS_Logo.png`} alt="NUH Virtual Pharmacist Logo" />
      </div>
      <div className="section image-section">
        <video ref={videoRef} autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: '0', left: '0', zIndex: -1 }}>
          <source src={`${process.env.PUBLIC_URL}/Counselling_Background.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="content-container">
        <h1>Counselling Information</h1>
        <div className="medication-container">
          <h2>Medication Details</h2>
          <div>
            {currentSet.map((sentence, index) => (
              <p key={index}>{sentence}</p>
            ))}
          </div>
        </div>
        <div className="navigation-container">
          <div className="navigation-buttons">
            {isFirstPage ? (
              <button style={{ visibility: 'hidden' }}>Previous</button>  // Invisible button
            ) : (
            <button onClick={handlePrevious}>Previous</button>
          )}
          {isLastPage ? (
            <button onClick={navigateToThankYouPage}>Proceed to Collect Medication</button>
          ) : (
            <button onClick={handleNext}>Next</button>
          )}
        </div>
        <div className="page-index">
          Page {Math.ceil((currentIndex + 1) / 3)} of {Math.ceil(maxIndex / 3)}
        </div>
      </div>
      </div>
    </div>
  );
}

export default CounsellingPage;
