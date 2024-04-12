import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './WelcomePage'; // Adjust with your actual component paths
import DisclaimerPage from './DisclaimerPage';
import QueryPage from './QueryPage';
import CounsellingPage from './CounsellingPage';
import ThankYouPage from './ThankYouPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/query" element={<QueryPage />} />
        <Route path="/counselling" element={<CounsellingPage />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}

export default App;
