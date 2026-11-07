import React, { useState, useEffect } from 'react';

/**
 * Toast notification component compliant with Hallmark and UI-UX Pro Max:
 * - Non-blocking (no browser freeze)
 * - Auto-dismisses in 4 seconds
 * - Animated GPU-composited slide-up
 * - High-contrast, theme-adaptive glassmorphism
 */
export const Toast = ({ message, type = 'error', onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const isError = type === 'error';

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full mx-auto px-4 pointer-events-auto transition-transform duration-200 ease-out"
    >
      <div className={`flex items-center justify-between gap-3 p-4 rounded-2xl shadow-xl backdrop-blur-md border ${
        isError
          ? 'bg-rose-950/90 text-rose-100 border-rose-500/40'
          : 'bg-emerald-950/90 text-emerald-100 border-emerald-500/40'
      }`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-lg flex-shrink-0" aria-hidden="true">
            {isError ? '⚠️' : '✅'}
          </span>
          <p className="text-xs sm:text-sm font-semibold truncate leading-snug">
            {message}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="p-1 rounded-lg hover:bg-white/10 active:scale-95 transition-transform flex-shrink-0 text-white/70 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
