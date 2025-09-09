import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/app_style.css'; // Global styles

import LandingPage from './components/landing_screen.jsx';
import LevelSelectionPage from './components/level_selection_screen.jsx';
import QuizPage from './components/quiz_screen.jsx';
import ResultsPage from './components/result_screen.jsx';
import ProfilePage from './components/profile_screen.jsx';


function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<MainLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/levels" element={<LevelSelectionPage />} />
          <Route path="/create" element={<CreateQuizPage />} />
          {/* Route for standard N-level quizzes */}
          <Route path="/quiz/:level/:category" element={<QuizPage />} />
          {/* NEW Route for custom quizzes */}
          <Route path="/quiz/custom/:quizId" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}


export default App;
