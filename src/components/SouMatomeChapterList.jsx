// src/components/SouMatomeChapterList.jsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const SouMatomeChapterList = ({ book, history = {} }) => {
  const isExamMode = localStorage.getItem('user_exam_mode') !== 'false';
  const [showAllWeeks, setShowAllWeeks] = useState(!isExamMode);

  const weeks = [
    { weekNum: 1, title: "Week 1: お知らせや案内を読もう①", targetChapterId: "week1-day1" },
    { weekNum: 2, title: "Week 2: 掲示や広告を読もう", targetChapterId: "week2-day1" },
    { weekNum: 3, title: "Week 3: メールや手紙を読もう", targetChapterId: "week3-day1" },
    { weekNum: 4, title: "Week 4: 短い文章を読もう", targetChapterId: "week4-day1" },
    { weekNum: 5, title: "Week 5: 中くらいの文章を読もう", targetChapterId: "week5-day1" },
    { weekNum: 6, title: "Week 6: 長い文章・情報検索", targetChapterId: "week6-day1" }
  ];

  const getWeekProgressFromHistory = (weekNum) => {
    let completed = 0;
    for (let day = 1; day <= 7; day++) {
      const chapId = `week${weekNum}-day${day}`;
      const p = history[chapId];
      if (p?.status === 'mastered') completed++;
    }
    return { completed, total: 7 };
  };

  // Find next unmastered week/day for Exam Mode Today's Mission
  const nextTargetRoute = useMemo(() => {
    for (const w of weeks) {
      for (let day = 1; day <= 7; day++) {
        const chapId = `week${w.weekNum}-day${day}`;
        if (!history[chapId] || history[chapId].status !== 'mastered') {
          return `/books/${book.id}/chapters/${chapId}`;
        }
      }
    }
    return `/books/${book.id}/chapters/week1-day1`;
  }, [weeks, history, book.id]);

  return (
    <div className="space-y-6 mt-6">
      {/* Exam Mode Focus Mission Card */}
      {isExamMode && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(30, 41, 59, 0.95) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
        }}>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span style={{
                background: '#10b981',
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: 900,
                padding: '3px 8px',
                borderRadius: '6px',
                textTransform: 'uppercase'
              }}>
                ⚡ EXAM MODE: 6-WEEK SPRINT
              </span>
              <span className="text-xs font-bold text-amber-400">⏱️ Daily 1-Day Structured Drill</span>
            </div>
            <h2 className="text-xl font-black text-white mb-1">
              Sou Matome N3 Reading Daily Mission
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] m-0 max-w-lg leading-relaxed">
              Complete today's reading lesson with practical announcements, letters, notices, and short essays.
            </p>
          </div>

          <div className="flex gap-2.5 flex-wrap">
            <Link
              to={nextTargetRoute}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-xs transition shadow-md hover:shadow-emerald-500/25 flex items-center gap-1.5"
            >
              🚀 Start Today's Mission &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* When in Exam Mode, provide a clean toggle button instead of sprawling classic weeks */}
      {isExamMode && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setShowAllWeeks(prev => !prev)}
            className="px-5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-white text-xs font-bold transition flex items-center gap-2 shadow-sm"
          >
            <span>{showAllWeeks ? '▲ Hide Classic Weeks' : '📁 Browse All 6 Weeks Archive'}</span>
          </button>
        </div>
      )}

      {/* Classic Week Cards (Shown when Exam Mode is OFF or user toggled Browse) */}
      {(!isExamMode || showAllWeeks) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weeks.map((week) => {
            const progress = getWeekProgressFromHistory(week.weekNum);
            const progressPct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

            return (
              <Link
                key={week.weekNum}
                to={`/books/${book.id}/chapters/${week.targetChapterId}`}
                className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">
                  {week.title}
                </h3>

                <div>
                  <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-1.5 font-medium">
                    <span>Progress</span>
                    <span>{progress.completed}/{progress.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SouMatomeChapterList;
