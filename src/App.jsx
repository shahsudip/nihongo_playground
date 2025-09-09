import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/app_style.css'; // Global styles

import LandingPage from './components/landing_screen.jsx';
import LevelSelectionPage from './components/level_selection_screen.jsx';
import QuizPage from './components/quiz_screen.jsx';
import ResultsPage from './components/result_screen.jsx';
import ProfilePage from './components/profile_screen.jsx';

// Import the MainLayout component
import MainLayout from './components/main_layout.jsx';


function App() {
  return (
    <Router>
      <Routes>
        {/* Route 1: The Landing Page stands alone without the main nav bar */}
        <Route path="/" element={<LandingPage />} />

        {/* Route 2: A parent route that uses MainLayout */}
        {/* Any page inside here will have the global navigation bar */}
        <Route element={<MainLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/levels" element={<LevelSelectionPage />} />
          <Route path="/quiz/:level/:category" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
