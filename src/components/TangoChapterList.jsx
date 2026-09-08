// src/components/TangoChapterList.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TangoChapterList = ({ book, chapters = [], history = {} }) => {
  const [expandedWeek, setExpandedWeek] = useState('Topics');

  const getQuestionCount = (chapter) => {
    if (!chapter.passages || !Array.isArray(chapter.passages)) return 0;
    return chapter.passages.reduce((sum, passage) => sum + (passage.questions?.length || 0), 0);
  };

  // Group chapters by topic / week
  const groupByWeek = (chaptersList = []) => {
    const weeks = {};
    chaptersList.forEach(chapter => {
      const weekMatch = chapter.title?.match(/Week\s*(\d+)/i);
      const weekNum = weekMatch ? parseInt(weekMatch[1], 10) : 0;
      const key = weekNum > 0 ? `Week ${weekNum}` : 'Topics';
      if (!weeks[key]) weeks[key] = { weekNum, chapters: [] };
      weeks[key].chapters.push(chapter);
    });
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
    const topicMatch = title?.match(/Topic\s*(\d+)/i);
    if (topicMatch) return `Topic ${topicMatch[1]}`;
    const dayMatch = title?.match(/Day\s*(\d+)/i);
    if (dayMatch) return `Day ${dayMatch[1]}`;
    if (title?.toLowerCase().includes('review')) return 'Review';
    return title;
  };

  const weekGroups = groupByWeek(chapters);

  if (weekGroups.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--color-text-secondary)]">
        <p className="text-base">No topics found for this book.</p>
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
                <span className="week-card-count">{weekData.chapters.length} topics</span>
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
                      to={`/tango-reading/${book.id}/chapters/${chapter.id}`}
                      className={`day-card ${isMastered ? 'day-mastered' : isIncomplete ? 'day-progress' : ''}`}
                    >
                      <div className="day-card-label">{dayLabel}</div>
                      {qCount > 0 && <div className="day-card-questions">{qCount} Q</div>}
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

export default TangoChapterList;
