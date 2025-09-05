import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
    // Sort history with the most recent quiz first
    setHistory(savedHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  }, []);

  return (
    <div className="profile-container">
      <h1 className="profile-title">Quiz History</h1>
      {history.length === 0 ? (
        <div className="no-history-card">
          <p>You haven't completed any quizzes yet.</p>
          <Link to="/levels" className="action-button next-level">Start a Quiz!</Link>
        </div>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div key={item.id} className="history-item">
              <div className="history-item-header">
                <h3>{item.level.toUpperCase()} - {item.category} ({item.difficulty})</h3>
                <span className="history-item-date">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
              </div>
              <div className="history-item-body">
                <p>Score: <strong>{item.score} / {item.total}</strong></p>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${(item.score / item.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
       <Link to="/" className="action-button home profile-home-button">
            Back to Home
        </Link>
    </div>
  );
};

export default ProfilePage;