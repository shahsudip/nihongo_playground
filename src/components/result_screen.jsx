import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { quizData } from '../data/quiz_data.js'; // <-- 1. IMPORT the real quiz data

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    score = 0, 
    total = 0,
    level,
    category,
    completedDifficulty,
  } = location.state || {};

  const percentage = total > 0 ? ((score / total) * 100).toFixed(0) : 0;
  
  // Logic to determine the next difficulty
  let nextDifficulty = null;
  if (completedDifficulty === 'easy') nextDifficulty = 'medium';
  if (completedDifficulty === 'medium') nextDifficulty = 'hard';

  // Check if the next difficulty level actually has content
  const nextLevelHasContent = nextDifficulty && quizData[level]?.[category]?.[nextDifficulty]?.quiz_content?.length > 0;

  return (
    <div className="results-container">
      <div className="results-card">
        <h1 className="results-title">Quiz Results</h1>
        <p className="score-text">{level?.toUpperCase()} - {category} ({completedDifficulty})</p>
        <div className="percentage-circle">
          <span>{score} / {total}</span>
        </div>
        <p className="percentage-text">{percentage}% Correct</p>

        <div className="results-actions">
          <button 
            onClick={() => navigate(`/quiz/${level}/${category}`)} 
            className="action-button restart"
          >
            Play Again
          </button>
          
          {nextLevelHasContent && (
             <button 
              onClick={() => navigate(`/quiz/${level}/${category}`)} 
              className="action-button next-level"
            >
              Start {nextDifficulty} &rarr;
            </button>
          )}

          <Link to="/profile" className="action-button profile">
            View Full History
          </Link>
          
          <Link to="/" className="action-button home">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;