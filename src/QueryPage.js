import './logo.css';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './QueryPage.css';
import './DisclaimerPage.css'


function QueryScreen() {
  let navigate = useNavigate();
  const [showIdInput, setShowIdInput] = useState(true);
  const [showAllergiesQuestion, setShowAllergiesQuestion] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [nric, setNric] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrorOccurred, setHasErrorOccurred] = useState(false);
  const [medicationData, setMedicationData] = useState(null);
  const [countdown, setCountdown] = useState(10);
  const [apicalled, setapicalled] = useState(false);

  const [timerSeconds, setTimerSeconds] = useState(10);
  const [isAcknowledgeDisabled, setIsAcknowledgeDisabled] = useState(true);

  const [showNameConfirmation, setShowNameConfirmation] = useState(false);
  const [confirmedName, setConfirmedName] = useState('');

  useEffect(() => {
    let timer;
    if (showDisclaimer && timerSeconds > 0) {
      timer = setTimeout(() => setTimerSeconds(timerSeconds - 1), 1000);
    } else if (timerSeconds === 0) {
      setIsAcknowledgeDisabled(false); // Enable the button when the timer reaches 0
    }

    return () => clearTimeout(timer); // Clean up the timer
  }, [showDisclaimer, timerSeconds]);


  const navigateToMainPage = () => {
    navigate('/'); // Adjust this to your main page's route
  };

  // Start yes for allergy is clicked
  const handleAllergy = () => {
    // Display an alert to the user
    alert('Allergy noted, please proceed to the nearest physical counter for further assistance.');

    // Code here will execute after the user presses "OK" in the alert dialog
    navigateToMainPage(); // Directly navigate to the main page
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

  const loadingVariants = [
    "Your information is being securely loaded. Thank you for your patience.",
    "Gathering your details now, please stay with us.",
    "Just a moment while we make things perfect for you.",
    "We appreciate your patience as we retrieve your data safely and securely.",
    "Almost there! We are finalizing the details just for you.",
    "Ensuring a seamless experience for you, please hold on."
  ];
  const [loadingMsg] = useState(loadingVariants[Math.floor(Math.random() * loadingVariants.length)]);


  const callApiAndShowAllergies = useCallback(() => {
    setIsLoading(true);
    setErrorMessage(''); // Clear previous error messages
    if (nric.length !== 9 || !/^[A-Za-z].*[A-Za-z]$/.test(nric) || !/^[A-Za-z][0-9]{7}[A-Za-z]$/.test(nric)) {
      setErrorMessage('Please ensure the NRIC is correctly formatted.');
      setIsLoading(false);
      return;
    }
    const url = `http://127.0.0.1:8000/drug_counsel?mrn=${encodeURIComponent(nric)}`;
    setShowAllergiesQuestion(true);
    setapicalled(true);
    setShowIdInput(false);
    fetch(url, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    }).then(response => {
      if (!response.ok) throw new Error(`Network response was not ok, status: ${response.status}`);
      return response.json();
    }).then(data => {
      setMedicationData(data);  // Store the fetched data in state
    }).catch((error) => {
      console.error('Error:', error);
      setErrorMessage('Failed to load data: ' + error.message);
      setHasErrorOccurred(true); // Indicate that an error has occurred
    }).finally(() => {
      setIsLoading(false);
    });
  }, [nric]);

  // New logic to handle submit with an initial check
  const handleCheckAndSubmit = useCallback(async () => {
    setShowIdInput(false);
    const result = await checkName();
    if (result[0] === 'Success') {
      setShowNameConfirmation(true);
      setConfirmedName(result[1]);
    } else {
      setErrorMessage('Name check failed: ' + result[1]);
      setShowIdInput(true);
    }
  }, [nric]);

  const handleConfirmNameYes = () => {
    setShowNameConfirmation(false);
    callApiAndShowAllergies();
  };

  const handleConfirmNameNo = () => {
    setShowIdInput(true);
    setShowNameConfirmation(false);
    setErrorMessage('The name does not match. Please re-enter your NRIC.');
  };

  const checkName = async () => {
    setIsLoading(true);
    setErrorMessage(''); // Clear previous error messages

    // Validate NRIC format first
    if (nric.length !== 9 || !/^[A-Za-z].*[A-Za-z]$/.test(nric) || !/^[A-Za-z][0-9]{7}[A-Za-z]$/.test(nric)) {
      setErrorMessage('Please ensure the NRIC is correctly formatted.');
      setIsLoading(false);
      return ['Error', 'Incorrect NRIC format']; // Return an error state
    }

    // Prepare the URL for the API call
    const url = `http://127.0.0.1:8000/return_name_check?mrn=${encodeURIComponent(nric)}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }

      const data = await response.json(); // Assuming the response is JSON formatted and is a list

      // Handle the data as needed
      setIsLoading(false);
      return data; // Expecting this to be a list of two items e.g., ['Name', 'Success']
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to load data: ' + error.message);
      setIsLoading(false);
      return ['Error', error.message]; // Return an error state
    }
  };

  const handleNoAllergies = () => {
    setShowAllergiesQuestion(false);
    setShowDisclaimer(true); // Show the disclaimer next
  };

  const handleDisclaimerAcknowledgement = () => {
    setShowDisclaimer(false);
    setShowLoading(true)
    if (!isLoading) {
      navigate('/counselling', { state: { medicationData } });
    }
  };


  // useEffect hook to handle the scenario where isLoading may still be true when the button is pressed
  useEffect(() => {
    if (!showDisclaimer && !isLoading && apicalled && !showDisclaimer && !showAllergiesQuestion) {
      navigate('/counselling', { state: { medicationData } });
    }
  }, [isLoading, showDisclaimer]);

  const handleInputChange = (event) => {
    setNric(event.target.value);
  };

  return (
    <div className="query-screen">
      <div className="logo-container">
        <img src={`${process.env.PUBLIC_URL}/NUHS_Logo.png`} alt="NUH Virtual Pharmacist Logo" />
      </div>
      <div className="image-section">
        <video ref={videoRef} autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: '0', left: '0' }}>
          <source src={`${process.env.PUBLIC_URL}/query_bg1.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="query-section">
        {showIdInput && (
         <div className="id-input">
          <p>{welcomeMsg}</p>
          <p>Please Key/Scan your NRIC below</p>
          <input type="text" value={nric} onChange={handleInputChange} placeholder="Enter NRIC Here" autoFocus/>
          {!isLoading && (
            <button className="submit-button" onClick={handleCheckAndSubmit}>
              {hasErrorOccurred ? 'Re-submit' : 'Submit'}
            </button>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        )}

        {showNameConfirmation && (
            <div>
              <p>Is your name "{confirmedName}"?</p>
              <button onClick={handleConfirmNameYes}>Yes</button>
              <button onClick={handleConfirmNameNo}>No</button>
            </div>
          )}

        {showAllergiesQuestion && (
          <div>
            <h2>Do you have any Allergies?</h2>
            <div className="buttons-container">
              <button className="yes-button" onClick={handleAllergy}>Yes</button>
              <button className="no-button" onClick={handleNoAllergies}>No</button>
              </div>
            </div>
          )}
          {showDisclaimer && (
            <div className="disclaimer-content">
                <p><strong>Virtual Pharmacy Disclaimer</strong></p>
                <p style={{ textAlign: 'left' }}>Before using the Virtual Pharmacy, it is essential that you read, understand, and agree to the following terms:</p>
                <p style={{ textAlign: 'left' }}>
                    <strong>What This Tool Does:</strong> This tool gives you advice about your medicines. It's here to help shorten your waiting time.
                </p>
                <p style={{ textAlign: 'left' }}>
                    <strong>What to Do if Something Seems Wrong:</strong> If the information you get from this Virtual Pharmacy doesn't match what your medication says, or if you're worried about the advice it gives, please contact us at the counter.
                </p>
                <button onClick={handleDisclaimerAcknowledgement} disabled={isAcknowledgeDisabled} className="acknowledge-button">
                  {isAcknowledgeDisabled ? `${timerSeconds} seconds` : 'Acknowledge'}
                </button>

                <button onClick={handleDecline} className="disclaimer-decline-button">Decline</button>
                  {countdown < 10 && <p>{countdown} seconds to return to Main Page.</p>}
            </div>
          )}
        {showLoading && (
          <div className="loading-content">
            <p>{loadingMsg}</p>
            <img src={`${process.env.PUBLIC_URL}/loading-waiting.gif`} alt="Loading-waiting" />
          </div>
          )}
      </div>
    </div>
  );
}

export default QueryScreen;
