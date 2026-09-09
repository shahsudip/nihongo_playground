// src/components/SpeedMasterChapterList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SpeedMasterChapterList = ({ book }) => {
  const parts = [
    { num: 1, title: '内容理解（短文）', titleEn: 'Short Passages (20 Questions)', firstMondai: 'short-1', mondaiCount: 20, time: '3 min / Q' },
    { num: 2, title: '内容理解（中文）', titleEn: 'Medium Passages (16 Units)', firstMondai: 'medium-1', mondaiCount: 16, time: '7 min / Unit' },
    { num: 3, title: '内容理解（長文）', titleEn: 'Long Passages (12 Units)', firstMondai: 'long-1', mondaiCount: 12, time: '10 min / Unit' },
    { num: 4, title: '情報検索', titleEn: 'Information Retrieval (15 Units)', firstMondai: 'search-1', mondaiCount: 15, time: '8 min / Unit' },
    { num: 5, title: '模擬試験', titleEn: 'Full Mock Examination', firstMondai: 'mock-exam', mondaiCount: 1, time: '70 min' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
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
  );
};

export default SpeedMasterChapterList;
