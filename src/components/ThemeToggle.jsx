// src/components/ThemeToggle.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeToggle({ className = '', compact = false }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center rounded-full p-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-inner select-none cursor-pointer ${
        compact ? 'w-12 h-6' : 'w-14 h-7'
      } ${
        isDark
          ? 'bg-slate-800 border border-slate-700 hover:border-slate-600'
          : 'bg-[#ede3ce] border border-[#decfae] hover:border-[#cbbe9f]'
      } ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle light/dark theme"
    >
      {/* Animated Sliding Thumb (Contains the SINGLE active Sun or Moon icon) */}
      <span
        className={`rounded-full flex items-center justify-center transition-all duration-300 ease-out shadow-sm transform ${
          compact ? 'w-5 h-5 text-[11px]' : 'w-6 h-6 text-xs'
        } ${
          isDark
            ? (compact ? 'translate-x-6' : 'translate-x-7') + ' bg-slate-900 text-amber-300 border border-slate-700'
            : 'translate-x-0.5 bg-[#fcf9f2] text-amber-500 border border-[#decfae]'
        }`}
      >
        <span className="transition-transform duration-300 transform active:scale-90 select-none">
          {isDark ? '🌙' : '☀️'}
        </span>
      </span>
    </button>
  );
}
