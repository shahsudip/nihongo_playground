// src/components/SouMatomeChapterList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SouMatomeChapterList = ({ book, history = {} }) => {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
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
  );
};

export default SouMatomeChapterList;
