import React, { useEffect, useRef } from 'react';

/**
 * Authentic JLPT OMR Bubble Answer Sheet (解答用紙)
 * Features real exam-style oval bubbles: ① ② ③ ④
 * Live synchronization with the quiz taker:
 *  - Correct: solid filled green (bg-emerald-600 text-white)
 *  - Incorrect: solid filled red (bg-rose-600 text-white)
 *  - Missed correct option: emerald outline indicator
 *  - Clicking any bubble selects the answer and/or jumps to that question
 *  - Auto-scrolls to the current question as user navigates
 */
export const JlptOmrAnswerSheet = ({
  questions = [],
  answers = {},
  currentIndex = 0,
  onSelectQuestion,
  onSelectAnswer,
  testTitle = 'JLPT 模擬試験',
  sectionTitle = '言語知識（文字・語彙）',
  level = 'N3',
  isMobileDrawer = false,
  onCloseDrawer,
}) => {
  const rowRefs = useRef([]);

  // Auto-scroll the active question row into center view in the answer sheet
  useEffect(() => {
    if (rowRefs.current[currentIndex]) {
      rowRefs.current[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentIndex]);

  const total = questions.length;
  const markedCount = Object.keys(answers).filter(qId => questions.some(q => q.id.toString() === qId.toString())).length;
  let correctCount = 0;
  questions.forEach((q) => {
    if (answers[q.id] !== undefined && answers[q.id] === q.correct) correctCount++;
  });

  return (
    <div
      className={`bg-[#fdfbf7] dark:bg-zinc-900 border-2 border-dashed sm:border-solid border-gray-300 dark:border-zinc-700 rounded-3xl shadow-xl flex flex-col font-sans select-none overflow-hidden ${
        isMobileDrawer ? 'h-full max-h-[85vh]' : 'sticky top-20 max-h-[calc(100vh-6rem)]'
      }`}
    >
      {/* OMR Sheet Header (Authentic JLPT Exam Style) */}
      <div className="bg-gradient-to-r from-red-600/10 via-amber-600/10 to-emerald-600/10 dark:from-red-950/40 dark:via-zinc-800 dark:to-emerald-950/40 p-4 border-b-2 border-gray-300 dark:border-zinc-700 shrink-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-[11px] font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
              日本語能力試験 解答用紙
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-md font-mono font-black text-xs bg-red-600 text-white shadow-sm">
            {level}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-gray-900 dark:text-white tracking-tight">
              {sectionTitle || '言語知識（文字・語彙）'}
            </h3>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold block">
              OMR BUBBLE SHEET • 解答用紙
            </span>
          </div>
          {isMobileDrawer && onCloseDrawer && (
            <button
              type="button"
              onClick={onCloseDrawer}
              className="text-xs px-2 py-1 rounded-lg bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold cursor-pointer"
            >
              ✕ Close
            </button>
          )}
        </div>

        {/* Real Exam Pencil Instruction */}
        <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 mt-1.5 pt-1.5 border-t border-gray-200 dark:border-zinc-800 font-mono">
          <span>鉛筆で黒くぬる (HB)</span>
          <span className="font-bold text-gray-700 dark:text-gray-300">
            {markedCount}/{total} Marked
          </span>
        </div>

        {/* Live Score Tally */}
        {markedCount > 0 && (
          <div className="mt-2 flex items-center justify-between text-[11px] px-2.5 py-1 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Accuracy:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {correctCount}/{markedCount} ({Math.round((correctCount / markedCount) * 100)}%)
            </span>
          </div>
        )}
      </div>

      {/* Bubble Legend */}
      <div className="px-3.5 py-2 bg-gray-100/70 dark:bg-zinc-800/60 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400 shrink-0 font-mono">
        <div className="flex items-center gap-1">
          <span className="w-3.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
          <span>Correct</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3.5 h-2.5 rounded-full bg-rose-600 inline-block"></span>
          <span>Wrong</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3.5 h-2.5 rounded-full border border-gray-400 dark:border-zinc-500 bg-white dark:bg-zinc-700 inline-block"></span>
          <span>Unmarked</span>
        </div>
      </div>

      {/* Scrollable Rows of OMR Questions */}
      <div className="overflow-y-auto p-3 space-y-1.5 grow custom-scrollbar">
        {questions.map((q, idx) => {
          const isCurrent = idx === currentIndex;
          const userChoice = answers[q.id];
          const hasAnswered = userChoice !== undefined;
          const optionCount = q.options?.length || 4;
          const isQCorrect = hasAnswered && userChoice === q.correct;
          const showMondaiDivider = idx === 0 || questions[idx - 1]?.mondai !== q.mondai;

          return (
            <React.Fragment key={q.id}>
              {/* Mondai Separator in Answer Sheet */}
              {showMondaiDivider && (
                <div className="pt-2.5 pb-1 px-1 flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 text-[11px] font-mono text-gray-500 dark:text-gray-400">
                  <span className="font-black text-gray-800 dark:text-gray-200">
                    問題 {q.mondai || 1}
                  </span>
                  {q.typeLabel && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      {q.typeLabel}
                    </span>
                  )}
                </div>
              )}

              <div
                ref={(el) => (rowRefs.current[idx] = el)}
                onClick={() => onSelectQuestion(idx)}
                className={`flex items-center justify-between py-1.5 px-2.5 rounded-2xl transition-all cursor-pointer border ${
                  isCurrent
                    ? 'bg-emerald-500/15 border-emerald-500 ring-2 ring-emerald-500/50 shadow-sm scale-[1.01]'
                    : 'bg-white/60 dark:bg-zinc-800/40 border-gray-200/70 dark:border-zinc-800 hover:bg-gray-100/60 dark:hover:bg-zinc-800'
                }`}
                title={`Click to view Question ${idx + 1}`}
              >
                {/* Question Number Stamp */}
                <div className="flex items-center gap-1.5 w-12 shrink-0">
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-black text-xs transition-colors ${
                      isCurrent
                        ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400'
                        : hasAnswered
                        ? isQCorrect
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                          : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                        : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  {q.sectionCategory === 'listening' && (
                    <span className="text-[10px]" title="Listening question">
                      🎧
                    </span>
                  )}
                </div>

                {/* Oval OMR Bubbles: 1, 2, 3, 4 */}
                <div className="flex items-center gap-1.5 sm:gap-2 grow justify-end">
                  {Array.from({ length: optionCount }).map((_, optIdx) => {
                    const optNum = optIdx + 1; // 1-based
                    const isSelected = userChoice === optNum;
                    const isOptCorrect = optNum === q.correct;

                    // Oval Shape Styling:
                    // Base oval shape: w-7 h-5 sm:w-8 sm:h-5.5 rounded-full
                    let bubbleClass =
                      'w-7 h-5 sm:w-8 sm:h-5.5 rounded-full border-2 flex items-center justify-center font-mono font-bold text-[11px] transition-all cursor-pointer select-none ';

                    if (hasAnswered) {
                      if (isSelected && isOptCorrect) {
                        // Correct selection -> Solid Green
                        bubbleClass +=
                          'bg-emerald-600 border-emerald-600 text-white shadow-sm scale-105 font-black ring-1 ring-emerald-500';
                      } else if (isSelected && !isOptCorrect) {
                        // Incorrect selection -> Solid Red
                        bubbleClass +=
                          'bg-rose-600 border-rose-600 text-white shadow-sm scale-105 font-black ring-1 ring-rose-500';
                      } else if (!isSelected && isOptCorrect) {
                        // The actual correct answer revealed -> Emerald outlined
                        bubbleClass +=
                          'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 ring-1 ring-emerald-500 font-black';
                      } else {
                        // Unselected distractor
                        bubbleClass +=
                          'border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/40 text-gray-400 dark:text-zinc-600 opacity-60';
                      }
                    } else {
                      // Unanswered bubble
                      bubbleClass +=
                        'border-gray-400 dark:border-zinc-500 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:border-gray-700 dark:hover:border-zinc-300 hover:bg-gray-100 hover:scale-105 active:scale-95';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectQuestion(idx);
                          onSelectAnswer(q, idx, optNum);
                        }}
                        className={bubbleClass}
                        title={`Q${idx + 1} - Option ${optNum}`}
                      >
                        {optNum}
                      </button>
                    );
                  })}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-2.5 bg-gray-100/60 dark:bg-zinc-800/40 border-t border-gray-200 dark:border-zinc-800 text-[10px] text-gray-500 dark:text-gray-400 text-center font-mono shrink-0">
        Click bubble to mark answer • Auto-scroll enabled
      </div>
    </div>
  );
};
