// src/components/PowerDrillChapterList.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PowerDrillChapterList = ({ book, chapters, history }) => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Filter chapters by section prefix (vocab or grammar)
  const filteredChapters = selectedSection
    ? chapters.filter(ch => {
        if (selectedSection === 'vocab') {
          return ch.id.startsWith('vocab') || ch.id.startsWith('training');
        }
        if (selectedSection === 'grammar') {
          return ch.id.startsWith('grammar');
        }
        return ch.id.startsWith(selectedSection);
      })
    : chapters;

  // Sort filtered chapters numerically
  filteredChapters.sort((a, b) => {
    const getSortVal = (id) => {
      const parts = id.split('-');
      if (id.includes('training')) {
        const tNum = id.startsWith('training') ? parseInt(parts[1]) : parseInt(parts[2]);
        const groupNum = Math.ceil((tNum || 1) / 2);
        return groupNum * 5 + (tNum % 2 === 1 ? 0.1 : 0.2);
      }
      if (id.includes('review')) {
        return (parseInt(parts[1]) || 0) + 0.1; // vocab-5-review-1 -> 5.1
      }
      return parseInt(parts[1]) || 0; // vocab-1 or grammar-1 or chapter-7 -> numeric part
    };
    
    return getSortVal(a.id) - getSortVal(b.id);
  });

  // Group chapters by block of 5
  const getGroupInfo = (chapterId) => {
    const parts = chapterId.split('-');
    let num = parseInt(parts[1]) || 0;
    
    if (chapterId.includes('training')) {
      let tNum = 1;
      if (chapterId.startsWith('training')) {
        tNum = parseInt(parts[1]) || 1; 
      } else {
        tNum = parseInt(parts[2]) || 1;
      }
      num = Math.ceil(tNum / 2) * 5;
    } else if (chapterId.includes('review')) {
       num = parseInt(parts[1]) || 0;
    }
    
    return Math.ceil(num / 5) || 1;
  };

  const groups = {};
  filteredChapters.forEach(chapter => {
    const gNum = getGroupInfo(chapter.id);
    if (!groups[gNum]) {
      groups[gNum] = {
        number: gNum,
        chapters: []
      };
    }
    groups[gNum].chapters.push(chapter);
  });

  const sortedGroups = Object.values(groups).sort((a, b) => a.number - b.number);

  const getGroupProgress = (groupChapters) => {
    let completed = 0;
    let inProgress = 0;
    groupChapters.forEach(ch => {
      const progress = history[ch.id];
      if (progress?.status === 'mastered') completed++;
      else if (progress) inProgress++;
    });
    return { completed, inProgress, total: groupChapters.length };
  };

  if (selectedSection === null) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 max-w-4xl mx-auto">
        {/* Card 1: Vocab & Kanji */}
        <button
          onClick={() => { setSelectedSection('vocab'); setSelectedGroup(null); }}
          className="group relative bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-emerald-500/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between items-start text-left h-60 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-teal-500/0 rounded-full blur-2xl group-hover:scale-150 transition-all"></div>
          <div className="text-4xl mb-4">📖</div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-emerald-400 transition-colors mb-2">Vocab & Kanji</h2>
            <p className="text-[var(--color-text-secondary)] text-sm font-medium">
              漢字・語彙 - Kanji readings, orthography, and context meanings.
            </p>
          </div>
          <div className="text-emerald-400 font-semibold text-sm mt-4 group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Select Drills &rarr;
          </div>
        </button>

        {/* Card 2: Grammar */}
        <button
          onClick={() => { setSelectedSection('grammar'); setSelectedGroup(null); }}
          className="group relative bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-emerald-500/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between items-start text-left h-60 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-500/10 to-emerald-500/0 rounded-full blur-2xl group-hover:scale-150 transition-all"></div>
          <div className="text-4xl mb-4">✍️</div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-emerald-400 transition-colors mb-2">Grammar</h2>
            <p className="text-[var(--color-text-secondary)] text-sm font-medium">
              文法 - Sentence patterns, particles, and grammar structure.
            </p>
          </div>
          <div className="text-emerald-400 font-semibold text-sm mt-4 group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Select Drills &rarr;
          </div>
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => { setSelectedSection(null); setSelectedGroup(null); }}
          className="px-4 py-2 bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-xl text-sm font-semibold text-[var(--color-text-secondary)] hover:text-white transition-all flex items-center gap-2"
        >
          &larr; Back to Sections
        </button>
        <span className="text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full capitalize">
          {selectedSection === 'vocab' ? 'Vocab & Kanji Drills' : 'Grammar Drills'}
        </span>
      </div>

      {filteredChapters.length === 0 ? (
        <div className="text-center py-20 text-[var(--color-text-secondary)] border border-dashed border-[var(--color-border)] rounded-2xl bg-[var(--color-bg-secondary)]/50">
          <span className="text-4xl block mb-4">🗂️</span>
          <p className="font-semibold text-base mb-1">No drills uploaded for this section yet</p>
          <p className="text-xs">Drill chapters will appear here once they are added via the database.</p>
        </div>
      ) : selectedGroup === null ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 animate-fadeIn">
          {sortedGroups.map((group) => {
            const progress = getGroupProgress(group.chapters);
            const progressPct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

            return (
              <button
                key={group.number}
                onClick={() => setSelectedGroup(group.number)}
                className="group relative bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-emerald-500/50 hover:bg-[var(--color-bg-tertiary)] rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between text-left h-full overflow-hidden"
              >
                <div className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                      Group {group.number}
                    </span>
                    <span className="text-xs font-semibold text-[var(--color-text-muted)]">
                      {progress.completed}/{progress.total} Completed
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-emerald-400 transition-colors mb-1.5">
                    Drills { (group.number - 1) * 5 + 1 } - { Math.min(group.number * 5, 30) }
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-xs mb-6">
                    Includes {group.chapters.filter(ch => !ch.id.includes('review')).length} Practice Drills & {group.chapters.filter(ch => ch.id.includes('review')).length} Intensive Review.
                  </p>
                </div>

                <div className="w-full">
                  {/* Mini preview badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {group.chapters.map((chapter) => {
                      const userProgress = history[chapter.id];
                      const isMastered = userProgress && userProgress.status === 'mastered';
                      const isIncomplete = userProgress && userProgress.status === 'incomplete';
                      const isTraining = chapter.id.includes('training');
                      const isReview = chapter.id.includes('review');
                      
                      let drillNum = '';
                      if (isReview) {
                        drillNum = 'R';
                      } else if (isTraining) {
                        const parts = chapter.id.split('-');
                        drillNum = `T${chapter.id.startsWith('training') ? parts[1] : parts[2]}`;
                      } else {
                        drillNum = chapter.id.split('-')[1];
                      }

                      return (
                        <span
                          key={chapter.id}
                          className={`text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                            isMastered
                              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                              : isIncomplete
                                ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                                : 'bg-[var(--color-bg-primary)] border-[var(--color-border)] text-[var(--color-text-muted)]'
                          }`}
                          title={isReview ? 'Review' : isTraining ? `Training ${drillNum.replace('T', '')}` : `Drill ${drillNum}`}
                        >
                          {drillNum}
                        </span>
                      );
                    })}
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full">
                    <div className="h-1.5 w-full bg-[var(--color-bg-primary)] rounded-full overflow-hidden border border-[var(--color-border)]">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="animate-fadeIn">
          <div className="flex items-center justify-between mb-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] px-5 py-3 rounded-2xl">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedGroup(null)}
                className="px-3 py-1.5 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl text-xs font-semibold text-[var(--color-text-secondary)] hover:text-white transition-all flex items-center gap-1.5"
              >
                &larr; Back to Groups
              </button>
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                Group {selectedGroup} Content (Drills { (selectedGroup - 1) * 5 + 1 } - { Math.min(selectedGroup * 5, 30) })
              </h3>
            </div>
            <span className="text-xs font-semibold text-[var(--color-text-muted)]">
              {groups[selectedGroup]?.chapters.filter(ch => history[ch.id]?.status === 'mastered').length || 0} / {groups[selectedGroup]?.chapters.length || 0} Done
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {(groups[selectedGroup]?.chapters || []).map((chapter) => {
              const userProgress = history[chapter.id];
              const isMastered = userProgress && userProgress.status === 'mastered';
              const isIncomplete = userProgress && userProgress.status === 'incomplete';
              const isTraining = chapter.id.includes('training');
              const isReview = chapter.id.includes('review');
              
              let drillNum = '';
              if (isReview) {
                drillNum = `R${chapter.id.split('-')[3] || '1'}`;
              } else if (isTraining) {
                const parts = chapter.id.split('-');
                drillNum = chapter.id.startsWith('training') ? parts[1] : parts[2];
              } else {
                drillNum = chapter.id.split('-')[1] || chapter.id;
              }

              return (
                <Link
                  key={chapter.id}
                  to={`/books/${book.id}/chapters/${chapter.id}`}
                  className={`p-5 rounded-2xl border flex flex-col justify-center items-center text-center transition-all hover:-translate-y-1 ${
                    isMastered
                      ? 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/15 hover:border-emerald-500/50'
                      : isIncomplete
                        ? 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/15 hover:border-amber-500/50'
                        : 'bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-emerald-500/50 hover:bg-[var(--color-bg-tertiary)]'
                  }`}
                >
                  <span className="text-[10px] font-bold text-[var(--color-text-muted)] tracking-wider uppercase">
                    {isReview ? 'Review' : isTraining ? 'Training' : 'Drill'}
                  </span>
                  <span className="text-3xl font-black text-[var(--color-text-primary)] my-1.5">{drillNum}</span>
                  <span className="text-[11px] font-semibold">
                    {isMastered ? (
                      <span className="text-emerald-400">✓ Mastered</span>
                    ) : isIncomplete ? (
                      <span className="text-amber-400">◕ In Progress</span>
                    ) : (
                      <span className="text-[var(--color-text-muted)]">○ New</span>
                    )}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default PowerDrillChapterList;
