// src/components/StandardChapterList.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StandardChapterList = ({ book, chapters, history }) => {
  const [expandedWeek, setExpandedWeek] = useState(null);

  const getQuestionCount = (chapter) => {
    if (!chapter.passages || !Array.isArray(chapter.passages)) return 0;
    return chapter.passages.reduce((sum, passage) => sum + (passage.questions?.length || 0), 0);
  };

  // Group chapters by week
  const groupByWeek = (chaptersList) => {
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
      const progress = history[ch.id];
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

  if (weekGroups.length === 1 && weekGroups[0][0] === 'Other') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {chapters.map((chapter) => {
          const userProgress = history[chapter.id];

          // Clean up titles for the UI (remove "第X部 " and "Part X: ")
          const displayTitle = chapter.title?.replace(/^第\d+部\s*/, '') || '';
          const displayDesc = chapter.description?.replace(/^Part \d+:\s*/i, '') || '';

          return (
            <Link
              key={chapter.id}
              to={`/books/${book.id}/chapters/${chapter.id}`}
              className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-center items-center text-center h-full"
            >
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">{displayTitle}</h3>
              <p className="text-[var(--color-text-secondary)] text-base font-medium">{displayDesc}</p>
            </Link>
          );
        })}
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
                      to={`/books/${book.id}/chapters/${chapter.id}`}
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
