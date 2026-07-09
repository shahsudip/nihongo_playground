import React from 'react';

export const ProgressBar = ({ progressPercent, className = '' }) => {
  return (
    <div className={`w-full bg-[var(--color-bg-tertiary)] rounded-sm h-1 overflow-hidden ${className}`}>
      <div 
        className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] h-full transition-all duration-300" 
        style={{ width: `${progressPercent}%` }}
      ></div>
    </div>
  );
};
