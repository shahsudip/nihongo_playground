// src/components/Shin500ChapterList.jsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const Shin500ChapterList = ({ book, chapters = [], history = {} }) => {
  const [selectedWeekFilter, setSelectedWeekFilter] = useState('all'); // 'all' or week number e.g. 1, 2, ...
  const [expandedWeeks, setExpandedWeeks] = useState({}); // Record<string, boolean>

  // Question count helper supporting passages array or direct questions array
  const getQuestionCount = (chapter) => {
    if (chapter.passages && Array.isArray(chapter.passages)) {
      return chapter.passages.reduce((sum, p) => sum + (p.questions?.length || 0), 0);
    }
    if (chapter.questions && Array.isArray(chapter.questions)) {
      return chapter.questions.length;
    }
    return 0;
  };

  // Robust parser for Shin 500 Mon chapters (w1-d1, week1-day1, "Week 1 - Day 1", "第1週 第1日", etc.)
  const parsedChapters = useMemo(() => {
    return (chapters || []).map((ch) => {
      const title = ch.title || '';
      const id = String(ch.id || '');

      const weekMatch =
        title.match(/Week\s*(\d+)/i) ||
        id.match(/w(\d+)/i) ||
        id.match(/week-?(\d+)/i) ||
        title.match(/第\s*(\d+)\s*週/i);

      const dayMatch =
        title.match(/Day\s*(\d+)/i) ||
        id.match(/d(\d+)/i) ||
        id.match(/day-?(\d+)/i) ||
        title.match(/第\s*(\d+)\s*日/i);

      const weekNum = weekMatch ? parseInt(weekMatch[1], 10) : 1;
      const dayNum = dayMatch ? parseInt(dayMatch[1], 10) : 1;

      const isReview =
        dayNum === 7 ||
        title.toLowerCase().includes('review') ||
        title.includes('まとめ') ||
        title.includes('実戦') ||
        id.includes('review');

      const qCount = getQuestionCount(ch);
      const userProgress = history[ch.id];
      const isMastered = userProgress && userProgress.status === 'mastered';
      const isIncomplete = userProgress && userProgress.status === 'incomplete';

      return {
        ...ch,
        weekNum,
        dayNum,
        isReview,
        qCount,
        userProgress,
        isMastered,
        isIncomplete,
      };
    });
  }, [chapters, history]);

  // Group by week
  const weekGroups = useMemo(() => {
    const map = {};
    parsedChapters.forEach((ch) => {
      const wKey = ch.weekNum;
      if (!map[wKey]) {
        map[wKey] = {
          weekNum: wKey,
          title: `Week ${wKey}`,
          chapters: [],
        };
      }
      map[wKey].chapters.push(ch);
    });

    // Sort chapters within each week by dayNum
    Object.values(map).forEach((group) => {
      group.chapters.sort((a, b) => a.dayNum - b.dayNum);
    });

    // Return sorted array of week groups
    return Object.values(map).sort((a, b) => a.weekNum - b.weekNum);
  }, [parsedChapters]);

  // Overall book statistics
  const stats = useMemo(() => {
    const totalChapters = parsedChapters.length;
    const mastered = parsedChapters.filter((c) => c.isMastered).length;
    const inProgress = parsedChapters.filter((c) => c.isIncomplete).length;
    const totalQuestions = parsedChapters.reduce((acc, c) => acc + (c.qCount || (c.isReview ? 15 : 3)), 0);
    const progressPct = totalChapters > 0 ? Math.round((mastered / totalChapters) * 100) : 0;

    // First unmastered chapter for "Quick Continue"
    const nextChapter = parsedChapters.find((c) => !c.isMastered) || parsedChapters[0];

    return {
      totalChapters,
      mastered,
      inProgress,
      totalQuestions: totalQuestions || 500,
      progressPct,
      nextChapter,
    };
  }, [parsedChapters]);

  // Toggle expansion state for a week
  const toggleWeek = (weekNum) => {
    setExpandedWeeks((prev) => ({
      ...prev,
      [weekNum]: prev[weekNum] === undefined ? false : !prev[weekNum],
    }));
  };

  // Filtered week groups for display
  const displayedWeekGroups = useMemo(() => {
    if (selectedWeekFilter === 'all') return weekGroups;
    const targetWeekNum = parseInt(selectedWeekFilter, 10);
    return weekGroups.filter((g) => g.weekNum === targetWeekNum);
  }, [weekGroups, selectedWeekFilter]);

  // Level theme styling
  const levelBadgeColor = useMemo(() => {
    const lvl = (book?.level || '').toUpperCase();
    if (lvl.includes('N1')) return 'from-rose-500 to-red-600 text-white border-rose-500/30';
    if (lvl.includes('N2')) return 'from-blue-600 to-indigo-600 text-white border-blue-500/30';
    if (lvl.includes('N3')) return 'from-teal-500 to-emerald-600 text-white border-teal-500/30';
    return 'from-purple-600 to-violet-600 text-white border-purple-500/30'; // N4-N5
  }, [book?.level]);

  if (chapters.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl mt-6">
        <span className="text-4xl block mb-3">📚</span>
        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
          Loading 500 Mon Chapters...
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Please wait while the daily lessons and question sets are loaded.
        </p>
      </div>
    );
  }

  return (
    <div className="shin500-container space-y-6 mt-6">
      {/* Overview & Quick Continue Banner */}
      <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r ${levelBadgeColor}`}>
                {book?.level || '500 MON'}
              </span>
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">
                {weekGroups.length} Weeks &bull; {stats.totalChapters} Daily Lessons &bull; ~500 Questions
              </span>
            </div>
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
              Daily Challenge Program (文字・語彙・文法)
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] max-w-xl">
              Spend just 5-10 minutes each day mastering Kanji, Vocabulary, and Grammar, followed by comprehensive Day 7 weekly review tests.
            </p>
          </div>

          {/* Quick Continue Action */}
          {stats.nextChapter && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[var(--color-bg-primary)] border border-[var(--color-border)] p-4 rounded-xl">
              <div>
                <div className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                  Next Up
                </div>
                <div className="text-sm font-bold text-[var(--color-text-primary)]">
                  {stats.nextChapter.title || `Week ${stats.nextChapter.weekNum} - Day ${stats.nextChapter.dayNum}`}
                </div>
              </div>
              <Link
                to={`/books/${book.id}/chapters/${stats.nextChapter.id}`}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-lg shadow transition-all whitespace-nowrap"
              >
                {stats.nextChapter.isIncomplete ? 'Resume Drill →' : 'Start Today →'}
              </Link>
            </div>
          )}
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
          <div className="flex justify-between items-center text-xs text-[var(--color-text-secondary)] mb-1.5 font-medium">
            <span>Overall Progress</span>
            <span className="font-bold text-[var(--color-text-primary)]">
              {stats.mastered} / {stats.totalChapters} Days Mastered ({stats.progressPct}%)
            </span>
          </div>
          <div className="w-full bg-[var(--color-bg-primary)] h-2 rounded-full overflow-hidden border border-[var(--color-border)]">
            <div
              className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Week Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedWeekFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedWeekFilter === 'all'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
          }`}
        >
          All Weeks ({weekGroups.length})
        </button>

        {weekGroups.map((group) => {
          const masteredInWeek = group.chapters.filter((c) => c.isMastered).length;
          const isWeekDone = masteredInWeek === group.chapters.length && group.chapters.length > 0;

          return (
            <button
              key={group.weekNum}
              onClick={() => setSelectedWeekFilter(String(group.weekNum))}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedWeekFilter === String(group.weekNum)
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
              }`}
            >
              <span>Week {group.weekNum}</span>
              {isWeekDone ? (
                <span className="text-[10px] text-emerald-300">✓</span>
              ) : (
                <span className="text-[10px] opacity-75 font-normal">
                  ({masteredInWeek}/{group.chapters.length})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Weeks & Days List */}
      <div className="space-y-6">
        {displayedWeekGroups.map((group) => {
          const isCollapsed = expandedWeeks[group.weekNum] === false;
          const masteredCount = group.chapters.filter((c) => c.isMastered).length;
          const weekPct =
            group.chapters.length > 0 ? Math.round((masteredCount / group.chapters.length) * 100) : 0;
          const isWeekComplete = masteredCount === group.chapters.length && group.chapters.length > 0;

          return (
            <div
              key={group.weekNum}
              className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl overflow-hidden transition-all shadow-sm"
            >
              {/* Week Accordion Header */}
              <button
                onClick={() => toggleWeek(group.weekNum)}
                className="w-full p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left hover:bg-[var(--color-bg-tertiary)]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${
                      isWeekComplete
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    {isWeekComplete ? '✓' : `W${group.weekNum}`}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                        {group.title}
                      </h3>
                      {isWeekComplete && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Complete
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {group.chapters.length} Daily Sessions (Days 1–6 Daily Drills + Day 7 Review)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right sm:block flex items-center justify-between w-full sm:w-auto">
                    <div className="text-xs font-semibold text-[var(--color-text-muted)]">
                      {masteredCount} / {group.chapters.length} Done
                    </div>
                    <div className="w-24 bg-[var(--color-bg-primary)] h-1.5 rounded-full overflow-hidden border border-[var(--color-border)] mt-1">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${weekPct}%` }}
                      />
                    </div>
                  </div>
                  <span
                    className={`text-xs text-[var(--color-text-muted)] transition-transform duration-200 ${
                      isCollapsed ? '' : 'rotate-180'
                    }`}
                  >
                    ▼
                  </span>
                </div>
              </button>

              {/* Day Cards Grid */}
              {!isCollapsed && (
                <div className="p-5 pt-0 border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]/40">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                    {group.chapters.map((chapter) => {
                      const isRev = chapter.isReview;
                      const qDisplay = chapter.qCount > 0 ? `${chapter.qCount} 問` : isRev ? '15 問' : '3 問';

                      return (
                        <Link
                          key={chapter.id}
                          to={`/books/${book.id}/chapters/${chapter.id}`}
                          className={`group relative p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md ${
                            chapter.isMastered
                              ? 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/60'
                              : chapter.isIncomplete
                                ? 'bg-amber-500/10 border-amber-500/30 hover:border-amber-500/60'
                                : isRev
                                  ? 'bg-purple-500/5 border-purple-500/30 hover:border-purple-500/60'
                                  : 'bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-blue-500/50'
                          }`}
                        >
                          {/* Card Header */}
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                                isRev
                                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                  : 'bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
                              }`}
                            >
                              {isRev ? 'Weekly Review' : `Day ${chapter.dayNum}`}
                            </span>

                            <span className="text-[11px] font-semibold text-[var(--color-text-muted)]">
                              {qDisplay}
                            </span>
                          </div>

                          {/* Card Body */}
                          <div className="my-2">
                            <h4 className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-blue-400 transition-colors">
                              {isRev ? `Week ${chapter.weekNum} まとめテスト` : `Day ${chapter.dayNum} ドリル`}
                            </h4>
                            <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
                              {isRev ? 'Kanji, Vocab & Grammar Test' : 'Kanji • Vocab • Grammar'}
                            </p>
                          </div>

                          {/* Card Footer Status */}
                          <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between text-xs">
                            <div className="font-semibold">
                              {chapter.isMastered ? (
                                <span className="text-emerald-400 flex items-center gap-1">
                                  <span>✓</span> Mastered
                                </span>
                              ) : chapter.isIncomplete ? (
                                <span className="text-amber-400 flex items-center gap-1">
                                  <span>◕</span> In Progress
                                </span>
                              ) : (
                                <span className="text-[var(--color-text-muted)] flex items-center gap-1">
                                  <span>○</span> Start
                                </span>
                              )}
                            </div>

                            {chapter.userProgress && (
                              <span className="text-[11px] font-bold text-[var(--color-text-muted)]">
                                {chapter.isMastered
                                  ? `${chapter.userProgress.mastered || chapter.userProgress.score || 0}/${chapter.userProgress.numberOfQuestions || chapter.userProgress.total || chapter.qCount || 3}`
                                  : `${chapter.userProgress.score || 0}/${chapter.userProgress.total || chapter.qCount || 3}`}
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shin500ChapterList;
