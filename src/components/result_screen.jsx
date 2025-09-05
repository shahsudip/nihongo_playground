import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ResultsPage = () => {
  const location = useLocation();
  const { score, total } = location.state || { score: 0, total: 0 }; // Default values if state is not passed

  const percentage = total > 0 ? ((score / total) * 100).toFixed(0) : 0;

  return (
    <div className="results-container">
      <div className="results-card">
        <h1 className="results-title">Quiz Complete!</h1>
        <p className="score-text">Your Score</p>
        <p className="score-display">{score} / {total}</p>
        <div className="percentage-circle">
          <span>{percentage}%</span>
        </div>
        <Link to="/" className="home-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ResultsPage;