import React from 'react';

export const Badge = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: "bg-[var(--color-primary)] text-white",
    success: "bg-[var(--color-success)] text-white",
    warning: "bg-amber-500 text-white",
    danger: "bg-red-500 text-white",
    neutral: "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
  };

  return (
    <span 
      className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
