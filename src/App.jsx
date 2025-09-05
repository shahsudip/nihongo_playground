import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/app_style.css'; // Global styles

import LandingPage from './components/landing_screen.jsx';
import LevelSelectionPage from './components/level_selection_screen.jsx';
import QuizPage from './components/quiz_screen.jsx'; // Or your quiz_screen.jsx
import ResultsPage from './components/result_screen.jsx';
import ProfilePage from './components/profile_screen.jsx'; // <-- Import the new page

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* <-- Add the new route */}
        <Route path="/levels" element={<LevelSelectionPage />} />
        <Route path="/quiz/:level/:category" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}


export default App;