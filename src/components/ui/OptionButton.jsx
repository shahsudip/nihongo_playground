import React from 'react';

export const OptionButton = ({ 
  text, 
  index, 
  isSelected, 
  isCorrect, 
  feedbackMode, 
  onClick,
  disabled
}) => {
  let btnClass = "border-[var(--color-border)] hover:border-[var(--color-border-light)] hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]";
  let circleClass = "border-[var(--color-border)]";

  if (isSelected) {
    btnClass = "border-[var(--color-accent)] bg-[var(--color-accent)]/5 text-[var(--color-accent)]";
    circleClass = "border-[var(--color-accent)] bg-[var(--color-accent)]";
    if (feedbackMode === 'Immediate' && isCorrect !== null) {
      if (isCorrect) {
        btnClass = "border-emerald-500 bg-emerald-500/10 text-emerald-500";
        circleClass = "border-emerald-500 bg-emerald-500";
      } else {
        btnClass = "border-red-500 bg-red-500/10 text-red-500";
        circleClass = "border-red-500 bg-red-500";
      }
    }
  } else if (feedbackMode === 'Immediate' && disabled && isCorrect) {
    // Show correct answer if they selected the wrong one
    btnClass = "border-emerald-500 bg-emerald-500/10 text-emerald-500";
    circleClass = "border-emerald-500 bg-emerald-500";
  }

  return (
    <button 
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-lg border-2 transition-all text-left cursor-pointer ${btnClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={`w-5 h-5 flex-shrink-0 rounded-full border-2 transition-all ${circleClass}`}></div>
      <span className="flex-1 japanese-text text-lg">
        <span className="text-[var(--color-text-muted)] mr-2">{index + 1})</span>
        <span dangerouslySetInnerHTML={{ __html: text }}></span>
      </span>
    </button>
  );
};
