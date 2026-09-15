// src/components/SpeedMasterChapterList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SpeedMasterChapterList = ({ book }) => {
  const isExamMode = localStorage.getItem('user_exam_mode') !== 'false';

  const parts = [
    { num: 1, title: '内容理解（短文）', titleEn: 'Short Passages (20 Questions)', firstMondai: 'short-1', mondaiCount: 20, time: '3 min / Q' },
    { num: 2, title: '内容理解（中文）', titleEn: 'Medium Passages (16 Units)', firstMondai: 'medium-1', mondaiCount: 16, time: '7 min / Unit' },
    { num: 3, title: '内容理解（長文）', titleEn: 'Long Passages (12 Units)', firstMondai: 'long-1', mondaiCount: 12, time: '10 min / Unit' },
    { num: 4, title: '情報検索', titleEn: 'Information Retrieval (15 Units)', firstMondai: 'search-1', mondaiCount: 15, time: '8 min / Unit' },
    { num: 5, title: '模擬試験', titleEn: 'Full Mock Examination', firstMondai: 'mock-exam', mondaiCount: 1, time: '70 min' },
  ];

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
                ⚡ EXAM MODE: DAILY DOKKAI
              </span>
              <span className="text-xs font-bold text-amber-400">⏱️ Timed High-Yield Reading Drills</span>
            </div>
            <h2 className="text-xl font-black text-white mb-1">
              Speed Master N3 Dokkai Readiness Plan
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] m-0 max-w-lg leading-relaxed">
              Target 2–3 passage units daily across Short, Medium, and Information Retrieval to maintain test pace before exam day.
            </p>
          </div>

          <div className="flex gap-2.5 flex-wrap">
            <Link
              to={`/books/${book.id}/chapters/short-1`}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-xs transition shadow-md hover:shadow-emerald-500/25 flex items-center gap-1.5"
            >
              🚀 Start Today's Mission &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Only show Classic Section Cards when Exam Mode is OFF */}
      {!isExamMode && (
        <>
          <div className="flex items-center justify-between mt-8 mb-4">
            <h3 className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
              📖 Classic Section Breakdown (By Type)
            </h3>
            <span className="text-xs text-[var(--color-text-muted)]">64 Total Passage Units</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parts.map((part) => (
              <Link
                key={part.num}
                to={`/books/${book.id}/chapters/${part.firstMondai}`}
                className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-5 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                      {part.title}
                    </h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                      {part.time}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    {part.titleEn}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-1.5 font-medium">
                    <span>{part.mondaiCount} {part.num === 5 ? 'Exam' : 'Units'}</span>
                    <span>Section {part.num}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                      style={{ width: '0%' }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SpeedMasterChapterList;
