// src/components/ThemeToggle.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeToggle({ className = '', compact = false }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center p-2 rounded-full transition-all duration-300 focus:outline-none select-none cursor-pointer bg-black/5 dark:bg-white/10 hover:scale-110 active:scale-95 border border-black/10 dark:border-white/10 shadow-sm ${
        compact ? 'w-8 h-8' : 'w-9 h-9'
      } ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle light/dark theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Crescent Moon */}
        <svg
          className={`absolute inset-0 w-5 h-5 text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.5)] transition-all duration-500 ease-out transform ${
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
            fill="currentColor"
            fillOpacity="0.35"
          />
          <path
            d="M19 3v4m-2-2h4"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-amber-200"
          />
          <circle cx="19" cy="11" r="0.75" fill="currentColor" />
        </svg>

        {/* Radiant Sun */}
        <svg
          className={`absolute inset-0 w-5 h-5 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)] transition-all duration-500 ease-out transform ${
            !isDark
              ? 'rotate-0 scale-100 opacity-100'
              : 'rotate-90 scale-0 opacity-0'
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.35" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </div>
    </button>
  );
}
