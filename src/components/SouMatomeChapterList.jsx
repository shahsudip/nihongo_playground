// src/components/SouMatomeChapterList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SOU_MATOME_WEEKS = [
  { num: 1, title: 'Week 1: お知らせや案内を読もう①', titleEn: 'Notices & Announcements 1', firstChapter: 'week1-day1', days: 7 },
  { num: 2, title: 'Week 2: 掲示や広告を読もう', titleEn: 'Signs & Advertisements', firstChapter: 'week2-day1', days: 7 },
  { num: 3, title: 'Week 3: メールや手紙を読もう', titleEn: 'Emails & Letters', firstChapter: 'week3-day1', days: 7 },
  { num: 4, title: 'Week 4: 短い文章を読もう', titleEn: 'Short Passages', firstChapter: 'week4-day1', days: 7 },
  { num: 5, title: 'Week 5: 中くらいの文章を読もう', titleEn: 'Medium Passages', firstChapter: 'week5-day1', days: 7 },
  { num: 6, title: 'Week 6: 長い文章・情報検索', titleEn: 'Long Passages & Information Retrieval', firstChapter: 'week6-day1', days: 7 },
];

const SouMatomeChapterList = ({ book, chapters = [], history = {} }) => {
  // Compute progress for each week based on history
  const getWeekStats = (weekNum) => {
    let completed = 0;
    for (let day = 1; day <= 7; day++) {
      const chapId = `week${weekNum}-day${day}`;
      const progress = history[chapId];
      if (progress?.status === 'mastered') {
        completed++;
      }
    }
    return { completed, total: 7 };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {SOU_MATOME_WEEKS.map((week) => {
        const stats = getWeekStats(week.num);
        const progressPct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

        return (
          <Link
            key={week.num}
            to={`/books/${book.id}/chapters/${week.firstChapter}`}
            className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
                {week.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                {week.titleEn}
              </p>
            </div>

            <div>
              <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-1.5 font-medium">
                <span>Progress</span>
                <span>{stats.completed}/{stats.total} Days</span>
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
