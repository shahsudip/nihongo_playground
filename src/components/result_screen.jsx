import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Make sure you have a dedicated CSS file or these styles are in app_styles.css
// import './ProfilePage.css'; 

const ProfilePage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
    
    // --- FIX 1: Create a copy of the array before sorting ---
    const sortedHistory = [...savedHistory].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    setHistory(sortedHistory);
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
                {/* --- FIX 2: Added optional chaining (?.) for safety --- */}
                <h3>{item?.level?.toUpperCase()} - {item?.category} ({item?.difficulty})</h3>
                <span className="history-item-date">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
              </div>
              <div className="history-item-body">
                <p>Score: <strong>{item?.score} / {item?.total}</strong></p>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar-fill" 
                    // Added a check to prevent division by zero
                    style={{ width: `${item.total > 0 ? (item.score / item.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;