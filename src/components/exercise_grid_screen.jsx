// src/components/ExerciseListPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebaseConfig.js'; // Make sure this path is correct
import { doc, onSnapshot } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

/**
 * Internal component to handle loading and displaying the selected quiz.
 */
const QuizView = ({ level, category, exercise, onBack }) => {
  const [quizData, setQuizData] = useState(null);
  const [status, setStatus] = useState('checking'); // checking, scraping, ready, error

  useEffect(() => {
    // --- THIS IS THE CORRECTED DATABASE PATH ---
    const docId = `exercise-${exercise}`;
    const docRef = doc(db, 'jlpt', level, category, docId);
    // --- END OF CORRECTION ---

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
 * Main component that decides whether to show the grid or the quiz.
 */
const ExerciseGridPage = () => {
  const { level, category } = useParams();
  const [selectedExercise, setSelectedExercise] = useState(null);
  const exerciseCount = 15;

  if (selectedExercise) {
    return (
      <QuizView
        level={level}
        category={category}
        exercise={selectedExercise}
        onBack={() => setSelectedExercise(null)}
      />
    );
  }

  return (
    <div className="selection-container">
      <Link to={`/levels/${level}/${category}`} className="back-button">← Back</Link>
      <h1 className="page-title">Select an Exercise</h1>
      <div className="grid three-col">
        {Array.from({ length: exerciseCount }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
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