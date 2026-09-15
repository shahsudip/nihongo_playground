// src/components/ShinkanzenChapterList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ShinkanzenChapterList = ({ book }) => {
  const isExamMode = localStorage.getItem('user_exam_mode') !== 'false';

  // For Shinkanzen Master N3 Reading, show 4 Part cards linking to the digital book viewer + Daily Sprint Banner
  if (book.id === 'shinkanzen-master-n3-reading') {
    const parts = [
      { num: 1, title: '第1部：基礎力をつけよう', titleEn: 'Building Basic Competence', firstMondai: 'part-1', mondaiCount: 13 },
      { num: 2, title: '第2部：いろいろな文章を読もう', titleEn: 'Reading Various Text Types', firstMondai: 'mondai-14', mondaiCount: 7 },
      { num: 3, title: '第3部：内容理解（長文）', titleEn: 'Long Passage Comprehension', firstMondai: 'mondai-21', mondaiCount: 8 },
      { num: 4, title: '第4部：情報検索', titleEn: 'Information Retrieval', firstMondai: 'mondai-29', mondaiCount: 17 },
    ];

    return (
      <div>
        {/* NEW: 15-Day Daily Sprint / Exam Mode Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(30, 41, 59, 0.95) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: '16px',
          padding: '24px',
          marginTop: '20px',
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
                ⚡ EXAM MODE: DAILY SPRINT
              </span>
              <span className="text-xs font-bold text-amber-400">⏱️ 20 Mins/Day • 3–4 Mixed Passages</span>
            </div>
            <h2 className="text-xl font-black text-white mb-1">
              15-Day Timed Sprint (Curated Mixed Passages)
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] m-0 max-w-lg leading-relaxed">
              Passages across all 4 parts are dynamically combined into daily balanced test sets (Short + Medium + Long/Notice) to build real JLPT reading speed and maintain your daily streak.
            </p>
          </div>

          <div className="flex gap-2.5 flex-wrap">
            <Link
              to={`/books/${book.id}/sprints`}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-xs transition shadow-md hover:shadow-emerald-500/25 flex items-center gap-1.5"
            >
              🚀 Start Today's Exam Mission &rarr;
            </Link>
          </div>
        </div>

        {/* Only show Classic Chapter Breakdown when Exam Mode is OFF */}
        {!isExamMode && (
          <>
            <div className="flex items-center justify-between mt-8 mb-4">
              <h3 className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                📖 Classic Chapter Breakdown (By Part)
              </h3>
              <span className="text-xs text-[var(--color-text-muted)]">52 Total Passages</span>
            </div>

            {/* Original 4 Part Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parts.map((part) => (
                <Link
                  key={part.num}
                  to={`/books/${book.id}/chapters/${part.firstMondai}`}
                  className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-5 hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
                      {part.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                      {part.titleEn}
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-1.5 font-medium">
                      <span>{part.mondaiCount} 問題</span>
                      <span>Part {part.num}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-600 h-full rounded-full transition-all duration-300"
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
  }


  // For Shinkanzen Master N3 Listening, show 5 Part cards
  if (book.id === 'shinkanzen-master-n3-listening') {
    const parts = [
      { num: 1, title: '第1部：課題理解', titleEn: 'Task-Based Comprehension', firstMondai: 'mondai-1', count: 15 },
      { num: 2, title: '第2部：ポイント理解', titleEn: 'Comprehension of Key Points', firstMondai: 'mondai-16', count: 15 },
      { num: 3, title: '第3部：概要理解', titleEn: 'Comprehension of General Outline', firstMondai: 'mondai-31', count: 10 },
      { num: 4, title: '第4部：発話表現・即時応答', titleEn: 'Verbal Expressions / Quick Response', firstMondai: 'mondai-41', count: 30 },
      { num: 5, title: '模擬試験', titleEn: 'Mock Exam', firstMondai: 'mondai-71', count: 28 },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {parts.map((part) => (
          <Link
            key={part.num}
            to={`/books/${book.id}/chapters/${part.firstMondai}`}
            className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
                {part.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                {part.titleEn}
              </p>
            </div>

            <div>
              <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-1.5 font-medium">
                <span>{part.count} 問題</span>
                <span>Part {part.num}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return null;
};

export default ShinkanzenChapterList;
