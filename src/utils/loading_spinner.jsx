import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;