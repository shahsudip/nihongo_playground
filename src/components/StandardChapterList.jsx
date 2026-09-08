// src/components/StandardChapterList.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StandardChapterList = ({ book, chapters = [], history = {} }) => {
  const [expandedWeek, setExpandedWeek] = useState(null);

  const getQuestionCount = (chapter) => {
    if (!chapter.passages || !Array.isArray(chapter.passages)) return 0;
    return chapter.passages.reduce((sum, passage) => sum + (passage.questions?.length || 0), 0);
  };

  // Group chapters by week
  const groupByWeek = (chaptersList = []) => {
    const weeks = {};
    chaptersList.forEach(chapter => {
      // Extract week number from title like "Week 1 - Day 1"
      const weekMatch = chapter.title?.match(/Week\s*(\d+)/i);
      const weekNum = weekMatch ? parseInt(weekMatch[1]) : 0;
      const key = weekNum > 0 ? `Week ${weekNum}` : 'Other';
      if (!weeks[key]) weeks[key] = { weekNum, chapters: [] };
      weeks[key].chapters.push(chapter);
    });
    // Sort weeks by number
    return Object.entries(weeks).sort((a, b) => a[1].weekNum - b[1].weekNum);
  };

  const getWeekProgress = (weekChapters) => {
    let completed = 0;
    let inProgress = 0;
    weekChapters.forEach(ch => {
      const progress = history?.[ch.id];
      if (progress?.status === 'mastered') completed++;
      else if (progress) inProgress++;
    });
    return { completed, inProgress, total: weekChapters.length };
  };

  const getDayLabel = (title) => {
    const dayMatch = title?.match(/Day\s*(\d+)/i);
    if (dayMatch) return `Day ${dayMatch[1]}`;
    if (title?.toLowerCase().includes('review')) return 'Review';
    return title;
  };

  const weekGroups = groupByWeek(chapters);

  // For Shinkanzen Master N3 Reading, show 4 Part cards linking to the digital book viewer
  if (book.id === 'shinkanzen-master-n3-reading') {
    const parts = [
      { num: 1, title: '第1部：基礎力をつけよう', titleEn: 'Building Basic Competence', firstMondai: 'part-1', mondaiCount: 13 },
      { num: 2, title: '第2部：いろいろな文章を読もう', titleEn: 'Reading Various Text Types', firstMondai: 'mondai-14', mondaiCount: 7 },
      { num: 3, title: '第3部：内容理解（長文）', titleEn: 'Long Passage Comprehension', firstMondai: 'mondai-21', mondaiCount: 8 },
      { num: 4, title: '第4部：情報検索', titleEn: 'Information Retrieval', firstMondai: 'mondai-29', mondaiCount: 17 },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
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
    );
  }

  // For Speed Master N3 Reading, show section cards linking to the digital book viewer
  if (book.id === 'speed-master-n3-reading') {
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
            className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                  {part.title}
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">
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

  // For Sou Matome books, clean minimal cards with just Title and Progress
  if (book.id.startsWith('sou-matome')) {
    const weekTitles = {
      1: "Week 1: お知らせや案内を読もう①",
      2: "Week 2: 掲示や広告を読もう",
      3: "Week 3: メールや手紙を読もう",
      4: "Week 4: 短い文章を読もう",
      5: "Week 5: 中くらいの文章を読もう",
      6: "Week 6: 長い文章・情報検索"
    };

    // Filter out 'Other' group — only show proper Week cards
    const filteredWeekGroups = weekGroups.filter(([weekName]) => weekName !== 'Other');

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {filteredWeekGroups.map(([weekName, weekData]) => {
          const weekNum = weekData.weekNum;
          const firstChapter = weekData.chapters[0];
          const targetChapterId = firstChapter ? firstChapter.id : `week${weekNum}-day1`;
          const progress = getWeekProgress(weekData.chapters);
          const progressPct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
          const title = weekTitles[weekNum] || weekName;

          return (
            <Link
              key={weekName}
              to={`/books/${book.id}/chapters/${targetChapterId}`}
              className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">
                {title}
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
  }

  if (weekGroups.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--color-text-secondary)]">
        <p className="text-base">No chapters found for this book.</p>
      </div>
    );
  }

  return (
    <div className="weeks-grid">
      {weekGroups.map(([weekName, weekData]) => {
        const isExpanded = expandedWeek === weekName;
        const progress = getWeekProgress(weekData.chapters);
        const progressPct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

        return (
          <div key={weekName} className={`week-block ${isExpanded ? 'expanded' : ''}`}>
            <button
              className="week-card"
              onClick={() => setExpandedWeek(isExpanded ? null : weekName)}
            >
              <div className="week-card-top">
                <h3 className="week-card-title">{weekName}</h3>
                <span className="week-card-count">{weekData.chapters.length} days</span>
              </div>
              <div className="week-card-progress">
                <div className="week-progress-bar">
                  <div className="week-progress-fill" style={{ width: `${progressPct}%` }}></div>
                </div>
                <span className="week-progress-text">
                  {progress.completed}/{progress.total} done
                </span>
              </div>
              <span className={`week-expand-icon ${isExpanded ? 'rotated' : ''}`}>▼</span>
            </button>

            {isExpanded && (
              <div className="week-days-grid animate-fadeIn">
                {weekData.chapters.map((chapter) => {
                  const qCount = getQuestionCount(chapter);
                  const userProgress = history[chapter.id];
                  const isMastered = userProgress && userProgress.status === 'mastered';
                  const isIncomplete = userProgress && userProgress.status === 'incomplete';
                  const dayLabel = getDayLabel(chapter.title);

                  return (
                    <Link
                      key={chapter.id}
                      to={book.id.startsWith('tango') ? `/tango-reading/${book.id}/chapters/${chapter.id}` : `/books/${book.id}/chapters/${chapter.id}`}
                      className={`day-card ${isMastered ? 'day-mastered' : isIncomplete ? 'day-progress' : ''}`}
                    >
                      <div className="day-card-label">{dayLabel}</div>
                      <div className="day-card-questions">{qCount} Q</div>
                      <div className="day-card-status">
                        {isMastered ? (
                          <span className="day-status-badge mastered">✓</span>
                        ) : isIncomplete ? (
                          <span className="day-status-badge progress">◕</span>
                        ) : (
                          <span className="day-status-badge new">○</span>
                        )}
                      </div>
                      {userProgress && (
                        <div className="day-card-score">
                          {isMastered
                            ? `${userProgress.mastered}/${userProgress.numberOfQuestions}`
                            : `${userProgress.score}/${userProgress.total}`
                          }
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StandardChapterList;
