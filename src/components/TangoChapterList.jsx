// src/components/TangoChapterList.jsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

const TangoChapterList = ({ book, chapters = [], history = {} }) => {
  // Parse and sort topics numerically (topic_01, topic_02, etc.)
  const sortedTopics = useMemo(() => {
    return [...chapters].sort((a, b) => {
      const getNum = (item) => {
        const match =
          (item.title && item.title.match(/Topic\s*(\d+)/i)) ||
          (item.id && item.id.match(/topic_?(\d+)/i)) ||
          (item.id && item.id.match(/\d+/));
        return match ? parseInt(match[1] || match[0], 10) : 0;
      };
      return getNum(a) - getNum(b);
    });
  }, [chapters]);

  if (chapters.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl mt-6">
        <span className="text-4xl block mb-3">📖</span>
        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
          Loading Tango Topics...
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Please wait while vocabulary topics and stories are loaded.
        </p>
      </div>
    );
  }

  return (
    <div className="tango-chapter-container space-y-6 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedTopics.map((topic, index) => {
          const userProgress = history[topic.id];
          const isMastered = userProgress && userProgress.status === 'mastered';
          const isIncomplete = userProgress && userProgress.status === 'incomplete';
          
          const topicNumber = index + 1;
          const topicTitle = topic.title || `Topic ${topicNumber}`;

          return (
            <Link
              key={topic.id}
              to={`/tango-reading/${book.id}/chapters/${topic.id}`}
              className="group bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-blue-500 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    Topic {topicNumber}
                  </span>
                  {isMastered ? (
                    <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                      <span>✓</span> Mastered
                    </span>
                  ) : isIncomplete ? (
                    <span className="text-xs font-semibold text-amber-500 flex items-center gap-1">
                      <span>◕</span> In Progress
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-[var(--color-text-muted)]">
                      ○ Ready
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-[var(--color-text-primary)] group-hover:text-blue-500 transition-colors mt-2">
                  {topicTitle}
                </h3>
                {topic.description && (
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">
                    {topic.description}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
                <span className="font-medium">Vocabulary &amp; Stories</span>
                <span className="text-blue-500 font-semibold group-hover:translate-x-0.5 transition-transform">
                  Start Reading →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TangoChapterList;
