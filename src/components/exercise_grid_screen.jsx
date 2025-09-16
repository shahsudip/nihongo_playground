// src/components/ExerciseListPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebaseConfig.js';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

// src/components/exercise_grid_screen.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase/config'; // Adjust path if needed
import { doc, onSnapshot } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

/**
 * A new, internal component to handle loading and displaying the selected quiz.
 * This contains all the logic from your old quiz_screen.jsx.
 */
const QuizView = ({ level, category, exercise, onBack }) => {
  const [quizData, setQuizData] = useState(null);
  const [status, setStatus] = useState('checking'); // checking, scraping, ready, error

  useEffect(() => {
    const docId = `${level}-${category}-exercise-${exercise}`;
    const docRef = doc(db, 'quizzes', docId);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setQuizData(docSnap.data());
        setStatus('ready');
      } else {
        if (status === 'checking') {
          setStatus('scraping');
          const functions = getFunctions();
          const triggerExerciseScraper = httpsCallable(functions, 'triggerExerciseScraper');
          triggerExerciseScraper({ level, category, exercise })
            .catch(err => {
              console.error("Scraper trigger failed:", err);
              setStatus('error');
            });
        }
      }
    }, (error) => {
      console.error("Firestore error:", error);
      setStatus('error');
    });

    return () => unsubscribe();
  }, [level, category, exercise, status]);

  const renderContent = () => {
    switch (status) {
      case 'scraping':
        return (
          <>
            <h1 className="page-title">Fetching Quiz Data...</h1>
            <p className="info-text">Please wait a moment while we retrieve this exercise for the first time.</p>
            <div className="loader"></div>
          </>
        );
      case 'ready':
        return (
          <>
            <h1 className="page-title">{quizData.title}</h1>
            <button className="card start-button">Start Quiz</button>
            {/* The interactive quiz UI would go here */}
          </>
        );
      case 'error':
        return <h1 className="page-title">Error Loading Quiz</h1>;
      default: // 'checking'
        return <div className="loader"></div>;
    }
  };

  return (
    <div className="selection-container">
      <button onClick={onBack} className="back-button">← Back to Exercises</button>
      {renderContent()}
    </div>
  );
};

/**
 * This is the main component that decides whether to show the grid or the quiz.
 */
const ExerciseGridPage = () => {
  const { level, category } = useParams();
  const [selectedExercise, setSelectedExercise] = useState(null);
  const exerciseCount = 15;

  // If an exercise has been selected, show the QuizView
  if (selectedExercise) {
    return (
      <QuizView
        level={level}
        category={category}
        exercise={selectedExercise}
        onBack={() => setSelectedExercise(null)} // Pass a function to go back
      />
    );
  }

  // Otherwise, show the grid of exercise numbers
  return (
    <div className="selection-container">
      <Link to={`/levels/${level}/${category}`} className="back-button">← Back</Link>
      <h1 className="page-title">Select an Exercise</h1>
      <div className="grid three-col">
        {Array.from({ length: exerciseCount }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            // Instead of a Link, this button now sets the state
            onClick={() => setSelectedExercise(num.toString())}
            className="card exercise-card"
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExerciseGridPage;