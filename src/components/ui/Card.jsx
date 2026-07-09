import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-[var(--color-border-light)] p-6 md:p-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
