import React from 'react';
// --- THIS IS THE FIX: We need to import 'Navigate' here ---
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import './assets/app_style.css';

import MainLayout from './components/MainLayout.jsx';
import LandingPage from './components/landing_screen.jsx';
import LevelSelectionPage from './components/level_selection_screen.jsx';
import QuizPage from './components/quiz_screen.jsx';
import ResultsPage from './components/result_screen.jsx';
import ProfilePage from './components/profile_screen.jsx';

// This component protects routes that require a user to be logged in
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  // This is where the <Navigate /> component is used
  return currentUser ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* All other pages use the MainLayout and are protected */}
        <Route element={<MainLayout />}>
          <Route 
            path="/profile" 
            element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} 
          />
          <Route 
            path="/levels" 
            element={<ProtectedRoute><LevelSelectionPage /></ProtectedRoute>} 
          />
          <Route 
            path="/quiz/:level/:category" 
            element={<ProtectedRoute><QuizPage /></ProtectedRoute>} 
          />
          <Route 
            path="/results" 
            element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} 
          />
        </Route>
      </Routes>
    </Router>
  );
}

