import React, { useEffect, useRef } from 'react';
import '../../assets/jlpt_exam_hall.css';

/**
 * Authentic Japanese JLPT OMR Bubble Answer Sheet (日本語能力試験 解答用紙)
 * Features real Tokyo exam-style oval bubbles: ( 1 ) ( 2 ) ( 3 ) ( 4 )
 * Styled as an authentic examination document with Inkan seal, HB pencil guide,
 * 5-question grouping rules, and real-time live synchronization.
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
      className={`jlpt-omr-container flex flex-col font-sans select-none ${
        isMobileDrawer ? 'h-full max-h-[85vh]' : 'sticky top-20 max-h-[calc(100vh-6rem)]'
      }`}
    >
      {/* 1. Official OMR Header with Red Hanko Inkan Stamp */}
      <div className="bg-[#f7f3ea] dark:bg-[#1a2334] p-4 border-b-2 border-gray-300 dark:border-zinc-700 shrink-0">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-[11px] font-black tracking-wider text-gray-800 dark:text-gray-200">
                日本語能力試験 解答用紙
              </span>
              <span className="px-2 py-0.2 rounded font-mono font-black text-[11px] bg-red-600 text-white shadow-xs">
                {level}
              </span>
            </div>
            <h3 className="text-sm font-black text-gray-900 dark:text-white tracking-tight">
              {sectionTitle || '言語知識（文字・語彙）'}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Authentic Red Square Inkan Stamp */}
            <div className="jlpt-hanko-seal text-[10px]" title="Official JLPT Tokyo Proctor Stamp">
              <span>実施</span>
              <span>検印</span>
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
        </div>

        {/* 2. Official Examinee Voucher Bar */}
        <div className="jlpt-voucher-box flex items-center justify-between text-[11px] text-gray-600 dark:text-gray-300 mb-2 font-mono">
          <span>受験番号：JLPT-2026-{level}-8842</span>
          <span className="font-bold text-emerald-700 dark:text-emerald-400">
            {markedCount}/{total} マーク済
          </span>
        </div>

        {/* 3. Authentic Pencil Marking Instruction Illustration */}
        <div className="p-2 rounded-xl bg-white/80 dark:bg-zinc-900/60 border border-gray-200/80 dark:border-zinc-800 text-[10px] text-gray-600 dark:text-gray-400 font-mono flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-800 dark:text-gray-200">マーク例：</span>
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
              <span className="w-3.5 h-2.5 rounded-full bg-zinc-800 inline-block"></span>
              <span>● よい (HB)</span>
            </span>
            <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold">
              <span>✕ 悪い</span>
            </span>
          </div>

          {markedCount > 0 && (
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              正解率: {Math.round((correctCount / markedCount) * 100)}% ({correctCount}/{markedCount})
            </span>
          )}
        </div>
      </div>

      {/* 4. Bubble Color Legend */}
      <div className="px-3.5 py-1.5 bg-[#f0ebd9] dark:bg-[#151c2a] border-b border-gray-300 dark:border-zinc-800 flex items-center justify-between text-[10px] text-gray-600 dark:text-gray-400 shrink-0 font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
          <span>正解 (Correct)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-2.5 rounded-full bg-rose-600 inline-block"></span>
          <span>不正解 (Wrong)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-2.5 rounded-full border border-gray-400 dark:border-zinc-500 bg-white dark:bg-zinc-700 inline-block"></span>
          <span>未マーク</span>
        </div>
      </div>

      {/* 5. Scrollable Rows of OMR Questions (Grouped into 5-question blocks) */}
      <div className="overflow-y-auto p-3 space-y-1 grow custom-scrollbar">
        {questions.map((q, idx) => {
          const isCurrent = idx === currentIndex;
          const userChoice = answers[q.id];
          const hasAnswered = userChoice !== undefined;
          const optionCount = q.options?.length || 4;
          const isQCorrect = hasAnswered && userChoice === q.correct;
          const showMondaiDivider = idx === 0 || questions[idx - 1]?.mondai !== q.mondai;
          const isEndOfBlockOf5 = (idx + 1) % 5 === 0 && idx !== questions.length - 1;

          return (
            <React.Fragment key={q.id}>
              {/* Official Mondai Section Break */}
              {showMondaiDivider && (
                <div className="pt-2 pb-1 px-1 flex items-center justify-between border-b-2 border-red-500/30 text-[11px] font-mono text-gray-700 dark:text-gray-300">
                  <span className="font-black text-gray-900 dark:text-white">
                    問題 {q.mondai || 1}
                  </span>
                  {q.typeLabel && (
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
                      【{q.typeLabel}】
                    </span>
                  )}
                </div>
              )}

              <div
                ref={(el) => (rowRefs.current[idx] = el)}
                onClick={() => onSelectQuestion(idx)}
                className={`flex items-center justify-between py-1 px-2 rounded-xl transition-all cursor-pointer border ${
                  isCurrent
                    ? 'bg-emerald-500/15 border-emerald-500 ring-2 ring-emerald-500/50 shadow-sm scale-[1.01]'
                    : 'bg-white/70 dark:bg-zinc-800/40 border-gray-200/80 dark:border-zinc-800 hover:bg-gray-100/80 dark:hover:bg-zinc-800'
                }`}
                title={`Question ${idx + 1}`}
              >
                {/* Question Number */}
                <div className="flex items-center gap-1.5 w-12 shrink-0">
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center font-mono font-black text-xs transition-colors ${
                      isCurrent
                        ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400'
                        : hasAnswered
                        ? isQCorrect
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-black'
                          : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-black'
                        : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {idx + 1}
                  </span>
                </div>

                {/* Oval OMR Bubbles: ( 1 ) ( 2 ) ( 3 ) ( 4 ) */}
                <div className="flex items-center gap-1.5 sm:gap-2 grow justify-end">
                  {Array.from({ length: optionCount }).map((_, optIdx) => {
                    const optNum = optIdx + 1;
                    const isSelected = userChoice === optNum;
                    const isOptCorrect = optNum === q.correct;

                    let bubbleClass = 'jlpt-bubble-btn ';
                    if (hasAnswered) {
                      if (isSelected && isOptCorrect) {
                        bubbleClass += 'is-correct';
                      } else if (isSelected && !isOptCorrect) {
                        bubbleClass += 'is-wrong';
                      } else if (!isSelected && isOptCorrect) {
                        bubbleClass += 'is-revealed';
                      }
                    } else if (isSelected) {
                      bubbleClass += 'is-pencil-filled';
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
                        title={`Q${idx + 1} - (${optNum})`}
                      >
                        {optNum}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5-Question Group Divider Rule (Official JLPT Sheet Format) */}
              {isEndOfBlockOf5 && !showMondaiDivider && (
                <div className="jlpt-omr-group-rule" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* 6. Footer Stamp */}
      <div className="p-2 bg-[#f0ebd9] dark:bg-[#151c2a] border-t border-gray-300 dark:border-zinc-800 text-[10px] text-gray-500 dark:text-gray-400 text-center font-mono shrink-0">
        財団法人 日本国際教育支援協会 • 国際交流基金 準拠形式
      </div>
    </div>
  );
};
