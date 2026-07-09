import React from 'react';

export const QuestionNavigator = ({ 
  questions, 
  answers, 
  currentIndex, 
  setCurrentIndex, 
  feedbackMode,
  checkIsCorrect // Optional generic callback: (q, answers) => boolean
}) => {
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;

  return (
    <div className="mt-6 p-4 bg-[var(--color-bg-secondary)] rounded-lg max-h-[35vh] overflow-y-auto shadow-inner">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs text-[var(--color-text-muted)] font-medium m-0">Question Navigator</p>
        <span className="text-xs text-[var(--color-text-muted)]">{answeredCount}/{totalQuestions} Answered</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.map((q, qIdx) => {
          const isAnswered = answers[q.id] !== undefined;
          const isCurrent = currentIndex === qIdx;
          
          let navClass = "bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]";
          
          if (isCurrent) {
            navClass = "bg-[var(--color-accent)] text-white shadow-md";
          } else if (isAnswered) {
            if (feedbackMode === 'Immediate') {
              // Use provided check or fallback to the N3 Practice set default checking
              let isCorrect = false;
              if (checkIsCorrect) {
                isCorrect = checkIsCorrect(q, answers);
              } else {
                isCorrect = q.correctIndex !== -1 && answers[q.id] === q.correctIndex;
              }

              if (isCorrect) {
                navClass = "bg-[var(--color-success)] text-white";
              } else {
                navClass = "bg-red-500 text-white";
              }
            } else {
              navClass = "bg-[var(--color-primary)] text-white";
            }
          }

          return (
            <button
              key={q.id || qIdx}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${navClass}`}
              onClick={() => setCurrentIndex(qIdx)}
            >
              {qIdx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};
