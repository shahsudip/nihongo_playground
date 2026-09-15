// src/components/StandardChapterList.jsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const StandardChapterList = ({ book, chapters = [], history = {} }) => {
  const isExamMode = localStorage.getItem('user_exam_mode') !== 'false';
  const [showAllWeeks, setShowAllWeeks] = useState(!isExamMode);
  const [expandedWeek, setExpandedWeek] = useState(null);

  const getQuestionCount = (chapter) => {
    if (!chapter.passages || !Array.isArray(chapter.passages)) return 0;
    return chapter.passages.reduce((sum, passage) => sum + (passage.questions?.length || 0), 0);
  };

  // Group chapters by week / topic
  const groupByWeek = (chaptersList = []) => {
    const weeks = {};
    chaptersList.forEach(chapter => {
      const weekMatch = chapter.title?.match(/Week\s*(\d+)/i);
      const weekNum = weekMatch ? parseInt(weekMatch[1], 10) : 0;
      const key = weekNum > 0 ? `Week ${weekNum}` : 'Other';
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
    const dayMatch = title?.match(/Day\s*(\d+)/i);
    if (dayMatch) return `Day ${dayMatch[1]}`;
    if (title?.toLowerCase().includes('review')) return 'Review';
    return title;
  };

  const weekGroups = groupByWeek(chapters);

  const nextChapter = useMemo(() => {
    return chapters.find(c => !history[c.id] || history[c.id].status !== 'mastered') || chapters[0];
  }, [chapters, history]);

  if (weekGroups.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--color-text-secondary)]">
        <p className="text-base">No chapters found for this book.</p>
      </div>
    );
  }

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
                ⚡ EXAM MODE: DAILY DRILL
              </span>
              <span className="text-xs font-bold text-amber-400">⏱️ Daily Focused Practice</span>
            </div>
            <h2 className="text-xl font-black text-white mb-1">
              {book?.title || 'Book'} Today's Mission
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] m-0 max-w-lg leading-relaxed">
              Target: {nextChapter ? (nextChapter.title || nextChapter.id) : 'Next Chapter'}
            </p>
          </div>

          <div className="flex gap-2.5 flex-wrap">
            {nextChapter && (
              <Link
                to={`/books/${book.id}/chapters/${nextChapter.id}`}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-xs transition shadow-md hover:shadow-emerald-500/25 flex items-center gap-1.5"
              >
                🚀 Start Today's Mission &rarr;
              </Link>
            )}
          </div>
        </div>
      )}

      {/* When in Exam Mode, provide a clean toggle button instead of sprawling classic chapters */}
      {isExamMode && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setShowAllWeeks(prev => !prev)}
            className="px-5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-white text-xs font-bold transition flex items-center gap-2 shadow-sm"
          >
            <span>{showAllWeeks ? '▲ Hide Classic Chapters' : `📁 Browse All ${chapters.length} Chapters Archive`}</span>
          </button>
        </div>
      )}

      {/* Classic Week Cards (Shown when Exam Mode is OFF or user toggled Browse) */}
      {(!isExamMode || showAllWeeks) && (
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
    )}
  </div>
  );
};

export default StandardChapterList;
