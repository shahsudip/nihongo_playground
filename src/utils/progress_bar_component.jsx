import React from 'react';

// --- UI COMPONENT ---
// Visualizes the user's mastery progress.

export default function ProgressBar({ mastered, total }) {
  const percentage = total > 0 ? (mastered / total) * 100 : 0;

  return (
    <div className="progress-bar-container">
      <div 
        className="progress-bar-fill"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
