// src/components/ExamPlanModal.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateBookPlan, getUpcomingJlptExams } from '../utils/jlptExamPlanner.js';

const ExamPlanModal = ({ isOpen, onClose, book, completedCount = 0, history = {} }) => {
  const navigate = useNavigate();
  const upcomingExams = useMemo(() => getUpcomingJlptExams(), []);
  const [selectedExamId, setSelectedExamId] = useState(() => {
    return upcomingExams[0]?.id || '';
  });

  const activeExamId = useMemo(() => {
    return upcomingExams.some(e => e.id === selectedExamId) ? selectedExamId : upcomingExams[0]?.id || '';
  }, [upcomingExams, selectedExamId]);

  const plan = useMemo(() => {
    if (!book) return null;
    return calculateBookPlan(book, completedCount, activeExamId);
  }, [book, completedCount, activeExamId]);

  if (!isOpen || !book || !plan) return null;

  // Determine next uncompleted chapter/set route
  const getNextChapterRoute = () => {
    if (book.customRoute) {
      return book.customRoute;
    }

    if (book.id === 'speed-master-n3-reading') {
      return `/books/speed-master-n3-reading/chapters/short-1`;
    }
    if (book.id === 'sou-matome-n3-reading') {
      return `/books/sou-matome-n3-reading/chapters/week1-day1`;
    }
    if (book.id === 'shinkanzen-master-n3-reading') {
      return `/books/shinkanzen-master-n3-reading/chapters/part-1`;
    }
    if (book.id === 'shinkanzen-master-n3-listening') {
      return `/books/shinkanzen-master-n3-listening/chapters/mondai-1`;
    }
    return `/books/${book.id}`;
  };

  const handleStartToday = () => {
    onClose();
    navigate(getNextChapterRoute(), { state: { from: 'profile' } });
  };

  const handleViewAllChapters = () => {
    onClose();
    if (book.customRoute) {
      navigate(book.customRoute, { state: { from: 'profile' } });
    } else {
      navigate(`/books/${book.id}`, { state: { from: 'profile' } });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-card text-card-foreground rounded-2xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-border flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-emerald-600 text-white">
                {book.level || 'JLPT'} Exam Mode
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                {book.category || 'General'}
              </span>
            </div>
            <h2 className="text-xl font-bold leading-tight">
              {book.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 max-h-[calc(85vh-140px)] overflow-y-auto space-y-5">
          {/* 1. Target Exam Selection */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2">
              Target JLPT Exam Session
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {upcomingExams.map(exam => {
                const isSelected = exam.id === activeExamId;
                return (
                  <button
                    key={exam.id}
                    type="button"
                    onClick={() => setSelectedExamId(exam.id)}
                    className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 shadow-xs'
                        : 'border-border bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="font-bold text-sm">{exam.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {exam.formattedDate.split(',')[1] || exam.formattedDate}
                    </div>
                    <div className={`text-xs font-semibold mt-1.5 flex items-center gap-1 ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-sky-600 dark:text-sky-400'}`}>
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <circle cx="12" cy="12" r="9" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                      </svg>
                      <span>{exam.daysLeft} days remaining</span>
                    </div>
                    {exam.registrationWindow && (
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        Registration: {exam.registrationWindow}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 rounded-xl border border-border bg-slate-50/50 dark:bg-slate-900/40 text-center">
              <div className="text-xl font-bold">{plan.total}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5 font-medium">Total chapters</div>
            </div>
            <div className="p-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-center">
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{plan.completed}</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5 font-medium">Completed ({plan.percent}%)</div>
            </div>
            <div className="p-3 rounded-xl border border-amber-500/25 bg-amber-500/10 text-center">
              <div className="text-xl font-bold text-amber-600 dark:text-amber-400">{plan.remaining}</div>
              <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5 font-medium">Remaining</div>
            </div>
          </div>

          {/* 3. Daily Quota Goal Highlight Card */}
          <div className="p-4 sm:p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/25">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                Daily Study Target
              </span>
              <span
                className="text-[11px] font-semibold px-2 py-0.5 rounded bg-black/10 dark:bg-black/30"
                style={{ color: plan.paceColor }}
              >
                {plan.paceLabel}
              </span>
            </div>

            {plan.remaining === 0 ? (
              <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                You have completed all content in this book! Ready for exam day.
              </div>
            ) : (
              <div>
                <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">
                  Complete <span className="text-emerald-600 dark:text-emerald-400">{plan.dailyQuota} {plan.dailyQuota === 1 ? 'chapter' : 'chapters'}</span> daily
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                  At this pace ({plan.weeklyQuota} per week), you will comfortably complete all {plan.total} items before <strong className="text-slate-900 dark:text-slate-100">{plan.selectedExam.formattedDate}</strong> ({plan.daysLeft} days remaining).
                </p>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-xs mb-1.5 font-medium">
              <span className="text-muted-foreground">Exam readiness progress</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{plan.percent}%</span>
            </div>
            <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-[width] duration-300 ease-out"
                style={{ width: `${plan.percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:px-6 border-t border-border flex gap-3 bg-slate-50/60 dark:bg-slate-900/60">
          <button
            type="button"
            onClick={handleViewAllChapters}
            className="flex-1 py-2.5 px-4 rounded-xl border border-border bg-card text-card-foreground hover:bg-accent font-semibold text-sm transition-colors cursor-pointer"
          >
            View all chapters
          </button>
          <button
            type="button"
            onClick={handleStartToday}
            className="flex-[2] py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-colors cursor-pointer"
          >
            <span>Start today's plan</span>
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamPlanModal;
