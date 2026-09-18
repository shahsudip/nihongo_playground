import React from 'react';

export const OptionButton = ({ 
  text, 
  index, 
  isSelected, 
  isCorrect, 
  feedbackMode, 
  onClick,
  disabled,
  explanation,
  showFeedback: showFeedbackProp
}) => {
  let btnClass = "border-[var(--color-border)] hover:border-[var(--color-border-light)] hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]";
  let circleClass = "border-[var(--color-border)]";
  const showFeedback = showFeedbackProp !== undefined 
    ? showFeedbackProp 
    : (feedbackMode === 'Immediate' && disabled);

  if (isSelected) {
    btnClass = "border-[var(--color-accent)] bg-[var(--color-accent)]/5 text-[var(--color-accent)]";
    circleClass = "border-[var(--color-accent)] bg-[var(--color-accent)]";
    if (showFeedback && isCorrect !== null && isCorrect !== undefined) {
      if (isCorrect) {
        btnClass = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold";
        circleClass = "border-emerald-500 bg-emerald-500 text-white";
      } else {
        btnClass = "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 font-semibold";
        circleClass = "border-red-500 bg-red-500 text-white";
      }
    }
  } else if (showFeedback && isCorrect) {
    // Show correct answer if they selected the wrong one or in review mode
    btnClass = "border-emerald-500/80 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium";
    circleClass = "border-emerald-500 bg-emerald-500 text-white";
  }

  return (
    <button 
      className={`w-full flex flex-col items-stretch px-5 py-3.5 rounded-lg border-2 transition-all text-left cursor-pointer ${btnClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex items-center gap-4 w-full">
        <div className={`w-5 h-5 flex-shrink-0 rounded-full border-2 transition-all ${circleClass}`}></div>
        <span className="flex-1 japanese-text text-base md:text-lg">
          <span className="text-[var(--color-text-muted)] mr-2">{index + 1})</span>
          <span dangerouslySetInnerHTML={{ __html: text }}></span>
        </span>
      </div>

      {showFeedback && isCorrect && explanation && (
        <div 
          className="mt-2 pt-2 border-t text-xs leading-relaxed opacity-90 japanese-text border-emerald-500/20 text-[var(--color-text-secondary)]"
          dangerouslySetInnerHTML={{ __html: explanation }}
        />
      )}
    </button>
  );
};
