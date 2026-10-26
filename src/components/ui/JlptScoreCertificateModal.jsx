import React from 'react';
import { Button } from './Button';

/**
 * JlptScoreCertificateModal
 * 
 * Practice score report for raw-scaled and IRT-estimated quiz results.
 */
export const JlptScoreCertificateModal = ({
  isOpen = false,
  scoreReport,
  onClose,
  onRetake,
  onBackToList,
}) => {
  if (!isOpen || !scoreReport) return null;

  const {
    level = 'N3',
    totalScaledScore = 0,
    maxScore = 180,
    overallPassMark = 95,
    isPassed = false,
    failReason,
    sections = [],
    totalRawCorrect = 0,
    totalRawQuestions = 0,
    isEstimated = false,
    scoringModelLabel = 'Practice score',
    scoreNotice = null,
  } = scoreReport;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 bg-[#fdfbf7] dark:bg-zinc-900 border-4 border-double border-gray-300 dark:border-zinc-700 rounded-3xl shadow-2xl p-6 sm:p-8 text-gray-900 dark:text-gray-100 font-sans">
        
        {/* Certificate Header Banner */}
        <div className="text-center pb-5 mb-6 border-b-2 border-dashed border-gray-300 dark:border-zinc-700 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 font-mono text-xs font-black uppercase mb-2">
            <span>🇯🇵</span>
            <span>JLPT PRACTICE SCORE REPORT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            JLPT {level} Practice Score Report
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isEstimated ? `${scoringModelLabel} - response-pattern based` : 'Practice scaled score report'}
          </p>

          {/* Practice target status */}
          <div className="absolute top-0 right-0 sm:right-2">
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 flex flex-col items-center justify-center font-black uppercase tracking-wider transform rotate-[-12deg] shadow-lg transition-transform hover:scale-105 select-none ${
                isPassed
                  ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                  : 'border-rose-600 bg-rose-50/80 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
              }`}
            >
              <span className="text-base sm:text-xl leading-none">
                {isPassed ? 'TARGET' : 'REVIEW'}
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-bold mt-1 tracking-widest">
                {isPassed ? 'MET' : 'NEEDED'}
              </span>
            </div>
          </div>
        </div>

        {isEstimated && scoreNotice && (
          <div className="mb-6 p-3.5 rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50 dark:bg-sky-950/30 text-xs sm:text-sm text-sky-900 dark:text-sky-100">
            {scoreNotice}
          </div>
        )}

        {/* Overall Score Highlight */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
              {isEstimated ? 'Total Estimated IRT Score' : 'Total Practice Score'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
                {totalScaledScore}
              </span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-gray-400">
                / {maxScore} points
              </span>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <div className="text-xs font-bold text-gray-600 dark:text-gray-300">
              Practice Target: <span className="font-mono font-black text-emerald-600 dark:text-emerald-400">{overallPassMark} points</span>
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
              Raw Accuracy: {totalRawCorrect} / {totalRawQuestions} ({totalRawQuestions > 0 ? Math.round((totalRawCorrect / totalRawQuestions) * 100) : 0}%)
            </div>
            {isPassed ? (
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                Target met for this practice selection
              </span>
            ) : (
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                {failReason === 'sectional_insufficient'
                  ? 'A section is under the 19-point target'
                  : 'Below the practice target'}
              </span>
            )}
          </div>
        </div>

        {/* Section score breakdown */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 px-1">
            <span>Section Estimates</span>
            <span>Practice target: 19 points</span>
          </div>

          {sections.map((sec, idx) => {
            const isSecPass = sec.isPassed;
            const pct = Math.round((sec.scaledScore / sec.maxPoints) * 100);
            const thresholdPct = Math.round((sec.minPassPoints / sec.maxPoints) * 100);

            return (
              <div
                key={sec.sectionId || idx}
                className="p-4 rounded-xl bg-white/70 dark:bg-zinc-800/60 border border-gray-200/80 dark:border-zinc-700/80 transition-all hover:bg-white dark:hover:bg-zinc-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-xs bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-sm text-gray-900 dark:text-white">
                      {sec.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm text-gray-900 dark:text-white">
                      {sec.scaledScore} / {sec.maxPoints} 点
                    </span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase font-mono ${
                        isSecPass
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                      }`}
                    >
                      {isSecPass ? 'TARGET' : 'REVIEW'}
                    </span>
                  </div>
                </div>

                {/* Visual Bar with Threshold Marker */}
                <div className="relative w-full h-3 bg-gray-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                  {/* Fill Bar */}
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isSecPass
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                        : 'bg-gradient-to-r from-rose-500 to-amber-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                  {/* 19 Points Threshold Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-gray-900 dark:bg-white z-10 opacity-70"
                    style={{ left: `${thresholdPct}%` }}
                    title={`Practice target: ${sec.minPassPoints} points (${thresholdPct}%)`}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 mt-1.5 font-mono">
                  <span>Questions: {sec.correctCount} / {sec.totalQuestions} ({sec.accuracyPercentage}%)</span>
                  <span>Target: {sec.minPassPoints} points</span>
                </div>
                {sec.isEstimated && (
                  <div className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 font-mono">
                    Ability: {sec.abilityEstimate} | SE: {sec.standardError} | Score SE: +/-{sec.scaledStandardError}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-200 dark:border-zinc-700">
          <Button
            variant="outline"
            onClick={onClose}
            className="cursor-pointer text-xs sm:text-sm"
          >
            📝 Review Answers
          </Button>

          <div className="flex items-center gap-2">
            {onRetake && (
              <Button
                variant="outline"
                onClick={onRetake}
                className="border-red-300 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer text-xs sm:text-sm font-bold"
              >
                🔄 Retake
              </Button>
            )}
            {onBackToList && (
              <Button
                variant="primary"
                onClick={onBackToList}
                className="bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer text-xs sm:text-sm font-bold"
              >
                &larr; Exam Papers List
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default JlptScoreCertificateModal;
