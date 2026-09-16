// src/components/SRSReviewHub.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore';
import { fetchUserSRSCards, calculateSRSStats } from '../utils/fsrsEngine';
import LoadingSpinner from '../utils/loading_spinner';

const SRSReviewHub = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [srsCards, setSrsCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('vocabulary');

  const [stats, setStats] = useState({
    totalCards: 0,
    dueCount: 0,
    learningCount: 0,
    matureCount: 0,
    youngCount: 0,
    retentionRate: '100.0',
    avgStability: '0.0',
    avgDifficulty: '0.0'
  });

  const [categoryLevelCounts, setCategoryLevelCounts] = useState({
    all: {
      N5: { total: 0, due: 0 },
      N4: { total: 0, due: 0 },
      N3: { total: 0, due: 0 },
      N2: { total: 0, due: 0 },
      N1: { total: 0, due: 0 },
    },
    vocabulary: {
      N5: { total: 0, due: 0 },
      N4: { total: 0, due: 0 },
      N3: { total: 0, due: 0 },
      N2: { total: 0, due: 0 },
      N1: { total: 0, due: 0 },
    },
    kanji: {
      N5: { total: 0, due: 0 },
      N4: { total: 0, due: 0 },
      N3: { total: 0, due: 0 },
      N2: { total: 0, due: 0 },
      N1: { total: 0, due: 0 },
    },
    grammar: {
      N5: { total: 0, due: 0 },
      N4: { total: 0, due: 0 },
      N3: { total: 0, due: 0 },
      N2: { total: 0, due: 0 },
      N1: { total: 0, due: 0 },
    }
  });

  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];

  const categoryLabels = {
    all: '📖 Vocabulary Flashcards',
    vocabulary: '📖 Vocabulary'
  };

  useEffect(() => {
    async function loadSRSData() {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const cards = await fetchUserSRSCards(db, currentUser.uid);
        setSrsCards(cards);
        const computedStats = calculateSRSStats(cards);
        setStats(computedStats);

        const counts = {
          all: { N5: { total: 0, due: 0 }, N4: { total: 0, due: 0 }, N3: { total: 0, due: 0 }, N2: { total: 0, due: 0 }, N1: { total: 0, due: 0 } },
          vocabulary: { N5: { total: 0, due: 0 }, N4: { total: 0, due: 0 }, N3: { total: 0, due: 0 }, N2: { total: 0, due: 0 }, N1: { total: 0, due: 0 } },
          kanji: { N5: { total: 0, due: 0 }, N4: { total: 0, due: 0 }, N3: { total: 0, due: 0 }, N2: { total: 0, due: 0 }, N1: { total: 0, due: 0 } },
          grammar: { N5: { total: 0, due: 0 }, N4: { total: 0, due: 0 }, N3: { total: 0, due: 0 }, N2: { total: 0, due: 0 }, N1: { total: 0, due: 0 } }
        };

        const now = new Date();
        cards.forEach(c => {
          const lvl = (c.level || 'N5').toUpperCase();
          let cat = c.category || 'vocabulary';
          if (c.id?.startsWith('kanji-')) cat = 'kanji';
          else if (c.id?.startsWith('grammar-')) cat = 'grammar';
          else if (c.id?.startsWith('vocab-')) cat = 'vocabulary';

          const isDue = new Date(c.due || 0) <= now;

          if (counts.all[lvl]) {
            counts.all[lvl].total++;
            if (isDue) counts.all[lvl].due++;
          }
          if (counts[cat] && counts[cat][lvl]) {
            counts[cat][lvl].total++;
            if (isDue) counts[cat][lvl].due++;
          }
        });

        setCategoryLevelCounts(counts);
      } catch (err) {
        console.error('Error loading SRS data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadSRSData();
  }, [currentUser]);

  if (loading) return <LoadingSpinner />;

  const activeLevelCounts = categoryLevelCounts[selectedCategory] || categoryLevelCounts.all;

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] pt-2 pb-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black rounded-full uppercase tracking-wider shadow-sm">
                FSRS v5 Engine
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Optimal 90% Retention
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)]">
              Spaced Repetition Hub
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Scientific memory scheduling for Vocabulary, Kanji & Grammar. Review just before forgetting.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/anki-decks')}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-sm font-bold shadow-md hover:opacity-95 transition-all flex items-center gap-1.5"
            >
              <span>🎴</span> Anki Decks & Quizzes
            </button>
            <button
              onClick={() => navigate('/levels')}
              className="px-4 py-2 border border-black/20 dark:border-white/20 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-sm font-bold transition-all"
            >
              Browse JLPT Lists
            </button>
          </div>
        </div>

        {/* Global Summary Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Due Today */}
          <div className="bg-[var(--color-bg-secondary)] border-2 border-red-500/40 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">Due for Review</div>
            <div className="text-3xl font-black text-red-500">{stats.dueCount}</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">Cards ready right now</div>
            <div className="absolute top-3 right-3 text-2xl opacity-40">⏰</div>
          </div>

          {/* In Learning */}
          <div className="bg-[var(--color-bg-secondary)] border-2 border-amber-500/40 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">In Learning</div>
            <div className="text-3xl font-black text-amber-500">{stats.learningCount}</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">Short-term memory</div>
            <div className="absolute top-3 right-3 text-2xl opacity-40">⚡</div>
          </div>

          {/* Mastered / Mature */}
          <div className="bg-[var(--color-bg-secondary)] border-2 border-emerald-500/40 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">Mature / Mastered</div>
            <div className="text-3xl font-black text-emerald-500">{stats.matureCount}</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">Stability &ge; 21 days</div>
            <div className="absolute top-3 right-3 text-2xl opacity-40">🧠</div>
          </div>

          {/* Retention Health */}
          <div className="bg-[var(--color-bg-secondary)] border-2 border-blue-500/40 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">Retention Rate</div>
            <div className="text-3xl font-black text-blue-500">{stats.retentionRate}%</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">Target: 90.0%</div>
            <div className="absolute top-3 right-3 text-2xl opacity-40">🎯</div>
          </div>
        </div>

        {/* Level Decks Grid & Category Filter */}
        <div className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-md mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-zinc-800">
            <div>
              <h2 className="text-xl font-black">JLPT Memory Decks</h2>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Review due cards or study fresh flashcards with FSRS intervals
              </p>
            </div>

            {/* Category Selector Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-gray-100 dark:bg-zinc-800 rounded-xl">
              {Object.entries(categoryLabels).map(([catKey, catName]) => (
                <button
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCategory === catKey
                      ? 'bg-white dark:bg-zinc-900 text-[var(--color-accent)] shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {catName}
                </button>
              ))}
            </div>
          </div>

          {/* Category Cards per Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {levels.map(lvl => {
              const lvlLower = lvl.toLowerCase();
              const lvlData = activeLevelCounts[lvl] || { total: 0, due: 0 };
              const hasDue = lvlData.due > 0;

              const vocabData = categoryLevelCounts.vocabulary[lvl] || { total: 0, due: 0 };
              const kanjiData = categoryLevelCounts.kanji[lvl] || { total: 0, due: 0 };
              const grammarData = categoryLevelCounts.grammar[lvl] || { total: 0, due: 0 };

              return (
                <div
                  key={lvl}
                  className={`p-5 rounded-xl border-2 transition-all flex flex-col justify-between ${
                    hasDue
                      ? 'border-red-500/50 bg-red-50/20 dark:bg-red-950/10'
                      : 'border-black/10 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/40'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black">{lvl}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-zinc-200">
                          Vocabulary Deck
                        </span>
                      </div>
                      {vocabData.due > 0 ? (
                        <span className="px-2.5 py-1 bg-red-500 text-white font-black text-xs rounded-full animate-bounce">
                          {vocabData.due} Due
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300 font-bold text-xs rounded-full">
                          Up to date
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]">
                      <div className="flex justify-between">
                        <span>Total Studied Cards:</span>
                        <span className="font-bold text-[var(--color-text-primary)]">{vocabData.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ready for Recall:</span>
                        <span className={`font-bold ${vocabData.due > 0 ? 'text-red-500' : 'text-emerald-500'}`}>{vocabData.due}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="space-y-2 mt-2 pt-2 border-t border-gray-200/60 dark:border-zinc-800/60">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/flashcards/${lvlLower}/vocabulary_list/0?mode=srs`)}
                        className={`flex-1 py-2.5 rounded-lg font-bold text-xs shadow-sm transition-all text-center ${
                          vocabData.due > 0
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-[var(--color-accent)] hover:opacity-90 text-white'
                        }`}
                      >
                        {vocabData.due > 0 ? `Review Due (${vocabData.due})` : 'Study Flashcards'}
                      </button>
                      <button
                        onClick={() => navigate(`/levels/${lvlLower}/vocabulary-list`)}
                        className="px-3 py-2 border border-black/20 dark:border-white/20 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-xs font-bold transition-all"
                        title="View all items in list"
                      >
                        List
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FSRS Learning Tips Box */}
        <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-blue-900/40 border border-indigo-500/30 rounded-2xl p-6 text-sm">
          <h3 className="text-base font-black text-indigo-300 mb-2 flex items-center gap-2">
            <span>💡</span> How FSRS Accelerates Your Japanese Learning
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              <span><strong>Don't Fear "Again":</strong> Pressing Again adjusts stability without wiping card history.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              <span><strong>Natural Intervals:</strong> No "ease factor hell". High difficulty cards won't get stuck permanently.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              <span><strong>Desirable Difficulty:</strong> Reviewing right before 90% recall boundary produces maximum memory strength.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              <span><strong>Quick Rating:</strong> Use keyboard keys <code>1</code>, <code>2</code>, <code>3</code>, <code>4</code> and <code>Space</code> for fast reviews.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SRSReviewHub;

