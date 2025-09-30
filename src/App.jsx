import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import './assets/app_style.css';

import MainLayout from './components/main_layout.jsx';
import LandingPage from './components/landing_screen.jsx';
import LevelSelectionPage from './components/level_selection_screen.jsx';
import JlptQuizPage from './components/jlpt_quiz_screen.jsx';
import ResultsPage from './components/result_screen.jsx';
import ProfilePage from './components/profile_screen.jsx';
import ExerciseGridPage from './components/exercise_grid_screen.jsx';
import StandardQuizPage from './components/standard_quiz_screen.jsx';
import ReadingQuizPage from './components/ReadingQUizPage.jsx';
//import QuizPage from './components/standard_quiz_screen.jsx';
import VocabularyListPage from './components/VocabularyListPage.jsx';
import FlashcardViewer from './components/FlashcardViewer.jsx';
import GrammarListPage from './components/grammar_list_page.jsx';
import GrammarStudyPage from './components/grammar_study_page.jsx';


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
            path="/levels/:level"
            element={<ProtectedRoute><LevelSelectionPage /></ProtectedRoute>}
          />
          <Route
            path="/levels/:level/:category"
            element={<ProtectedRoute><LevelSelectionPage /></ProtectedRoute>}
          />
          <Route
            path="/levels/:level/:category/difficulties"
            element={<ProtectedRoute><StandardQuizPage /></ProtectedRoute>}
          />
          <Route
            path="/levels/:level/:category/exercises"
            element={<ProtectedRoute><ExerciseGridPage /></ProtectedRoute>}
          />
          <Route
            path="/quiz/:quizId"
            element={<ProtectedRoute><JlptQuizPage /></ProtectedRoute>}
          />
          <Route
            path="/custom-quiz/:quizId"
            element={<ProtectedRoute><StandardQuizPage /></ProtectedRoute>}
          />

          <Route
            path="/reading-quiz/:quizId"
            element={<ProtectedRoute><ReadingQuizPage /></ProtectedRoute>}
          />
          <Route path="/flashcards/:level/vocabulary_list" element={<ProtectedRoute><VocabularyListPage /></ProtectedRoute>} />
          <Route path="/flashcards/:level/vocabulary_list/:chunkIndex" element={<ProtectedRoute><FlashcardViewer /></ProtectedRoute>} />

          <Route 
            path="/grammar-list/:level" 
            element={<ProtectedRoute><GrammarListPage /></ProtectedRoute>} 
          />
          <Route 
            path="/study/grammar/:level/:slug" 
            element={<ProtectedRoute><GrammarStudyPage /></ProtectedRoute>} 
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

