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


import LoginPage from './components/LoginPage.jsx'; // Import the new login page
// ... other page imports

// A wrapper to protect routes that require a user to be logged in
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<MainLayout />}>
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route path="/levels" element={<LevelSelectionPage />} />
          <Route path="/quiz/:level/:category" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
