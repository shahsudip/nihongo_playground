// src/components/AnkiDecksPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { ANKI_DECKS_CATALOG } from '../utils/ankiDecksCatalog';
import { parseApkgFile, setLoadedApkgDeck } from '../utils/apkgReader';
import { fetchUserSRSCards, calculateSRSStats } from '../utils/fsrsEngine';

const AnkiDecksPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUser } = useAuth();

  // Active view: 'decks' (Anki library + .apkg) or 'fsrs' (FSRS memory & JLPT queues)
  const currentTab = searchParams.get('tab') === 'fsrs' ? 'fsrs' : 'decks';
  const [activeTab, setActiveTab] = useState(currentTab);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [userDeckProgress, setUserDeckProgress] = useState({});

  // FSRS Stats & JLPT Queue data
  const [srsStats, setSrsStats] = useState({
    totalCards: 0,
    dueCount: 0,
    learningCount: 0,
    matureCount: 0,
    youngCount: 0,
    retentionRate: '100.0',
    avgStability: '0.0',
    avgDifficulty: '0.0'
  });
  const [levelCounts, setLevelCounts] = useState({
    N5: { total: 0, due: 0 },
    N4: { total: 0, due: 0 },
    N3: { total: 0, due: 0 },
    N2: { total: 0, due: 0 },
    N1: { total: 0, due: 0 },
  });

  // APKG Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ percent: 0, status: '' });
  const [uploadError, setUploadError] = useState(null);

  const levels = ['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'];
  const jlptLevels = ['N5', 'N4', 'N3', 'N2', 'N1'];

  useEffect(() => {
    async function loadData() {
      if (!currentUser) return;
      try {
        const cards = await fetchUserSRSCards(db, currentUser.uid);
        const computedStats = calculateSRSStats(cards);
        setSrsStats(computedStats);

        const deckCounts = {};
        const lCounts = {
          N5: { total: 0, due: 0 },
          N4: { total: 0, due: 0 },
          N3: { total: 0, due: 0 },
          N2: { total: 0, due: 0 },
          N1: { total: 0, due: 0 },
        };

        const now = new Date();
        cards.forEach(c => {
          // Deck progress
          const deckId = c.deckId || (c.cardId ? c.cardId.split('-')[0] : 'custom');
          deckCounts[deckId] = (deckCounts[deckId] || 0) + 1;

          // Level progress
          const lvl = (c.level || 'N5').toUpperCase();
          if (lCounts[lvl]) {
            lCounts[lvl].total++;
            const dueDate = new Date(c.due || 0);
            if (dueDate <= now) lCounts[lvl].due++;
          }
        });

        setUserDeckProgress(deckCounts);
        setLevelCounts(lCounts);
      } catch (err) {
        console.warn('Could not load user SRS progress:', err);
      }
    }
    loadData();
  }, [currentUser]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams(tab === 'fsrs' ? { tab: 'fsrs' } : {});
  };

  const handleApkgFileUpload = async (file) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.apkg') && !file.name.toLowerCase().endsWith('.zip')) {
      setUploadError('Please select a valid .apkg Anki package file.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadProgress({ percent: 5, status: 'Reading .apkg archive...' });

    try {
      const parsedDeck = await parseApkgFile(file, (percent, status) => {
        setUploadProgress({ percent, status });
      });

      setLoadedApkgDeck(parsedDeck);
      setIsUploading(false);
      navigate('/apkg-viewer');
    } catch (err) {
      console.error('Error parsing .apkg:', err);
      setUploadError(err.message || 'Failed to parse .apkg file.');
      setIsUploading(false);
    }
  };

  const filteredDecks = ANKI_DECKS_CATALOG.filter(deck => {
    const matchesSearch =
      deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.japaneseTitle.includes(searchQuery);

    const matchesLevel =
      selectedLevel === 'ALL' ||
      deck.level.includes(selectedLevel) ||
      (deck.levels && deck.levels.includes(selectedLevel));

    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] pt-2 pb-8 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Main Header Banner */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
            Anki Decks & .apkg Reader
          </h1>
          <p className="text-sm text-gray-800 dark:text-gray-200 mt-1 max-w-2xl font-semibold">
            Study Japanese Anki decks (Core 10k, AnkiDrone, Shin Kanzen, Speed Master, Anime Mining) or open any <code className="font-mono bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded font-bold text-gray-900 dark:text-white">.apkg</code> file directly in your browser.
          </p>
        </div>

        {/* ANKI DECKS & APKG OPENER */}
        <div className="animate-fade-in">
            {/* Upload Custom .apkg File Banner */}
            <div className="bg-white/80 dark:bg-zinc-900/60 border-2 border-dashed border-emerald-400/60 dark:border-purple-500/40 rounded-3xl p-6 sm:p-8 mb-8 text-center relative overflow-hidden transition-all hover:border-emerald-500 dark:hover:border-purple-400 shadow-sm hover:shadow-md">
              <input
                type="file"
                accept=".apkg,.zip"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleApkgFileUpload(e.target.files[0]);
                  }
                }}
                id="apkg-file-input"
                className="hidden"
                disabled={isUploading}
              />

              {!isUploading ? (
                <div>
                  <div className="text-4xl mb-2">📥</div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">
                    Open Any Anki Package (.apkg)
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 max-w-lg mx-auto mb-4 font-medium">
                    Drag & drop or select any <code className="bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono font-bold text-gray-900 dark:text-white">.apkg</code> file. It runs 100% locally in your browser with all anime screenshots, audio clips, and native card formatting.
                  </p>

                  <label
                    htmlFor="apkg-file-input"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-purple-600 dark:to-indigo-600 hover:opacity-95 text-white font-black text-xs rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
                  >
                    <span>📂</span> Choose .apkg File
                  </label>

                  {uploadError && (
                    <div className="mt-3 text-xs text-red-500 font-bold">
                      ⚠️ {uploadError}
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-4">
                  <div className="text-3xl mb-2 animate-bounce">⚡</div>
                  <h3 className="text-base font-black text-emerald-700 dark:text-purple-400 mb-2">
                    {uploadProgress.status || 'Extracting Anki Deck...'}
                  </h3>
                  <div className="w-full max-w-md mx-auto h-2.5 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-purple-500 dark:to-indigo-600 transition-all duration-300"
                      style={{ width: `${uploadProgress.percent}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-bold mt-2">
                    {uploadProgress.percent}%
                  </div>
                </div>
              )}
            </div>

            {/* Search and Filters Bar */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-white/10 rounded-2xl p-4 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                <input
                  type="text"
                  placeholder="Search decks (e.g. Core 10k, N3, Anime)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/70 dark:bg-zinc-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-purple-500 transition-all"
                />
              </div>

              {/* Level Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {levels.map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedLevel === lvl
                        ? 'bg-emerald-600 dark:bg-gradient-to-r dark:from-purple-600 dark:to-indigo-600 text-white shadow-sm'
                        : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Decks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredDecks.map((deck) => {
                const studied = userDeckProgress[deck.id] || 0;
                const percent = Math.min(100, Math.round((studied / deck.cardCount) * 100));

                return (
                  <div
                    key={deck.id}
                    className="bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-emerald-500/60 dark:hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-800 dark:to-zinc-800/60 border border-gray-200/80 dark:border-white/5">
                          {deck.icon}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-purple-950/40 text-emerald-700 dark:text-purple-300 border border-emerald-200/60 dark:border-purple-800/40 text-xs font-black">
                            {deck.level}
                          </span>
                          {deck.layoutName && (
                            <span className="text-[10px] font-bold text-teal-700 dark:text-indigo-300 bg-teal-50 dark:bg-indigo-950/40 border border-teal-200/60 dark:border-indigo-800/40 px-2 py-0.5 rounded-md">
                              {deck.layoutName}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title & Category */}
                      <h2 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-purple-400 transition-colors">
                        {deck.title}
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-bold mb-3">
                        {deck.japaneseTitle} • {deck.category}
                      </p>

                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-2">
                        {deck.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {deck.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border border-gray-200/60 dark:border-transparent"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      {/* Card count and studied progress */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                          <span>Progress</span>
                          <span>{studied} / {deck.cardCount} words ({percent}%)</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-purple-500 dark:to-indigo-500 transition-all duration-300"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      {/* Action Button: Study Deck */}
                      <button
                        onClick={() => navigate(`/anki-quiz/${deck.id}`)}
                        className="w-full py-2.5 px-3 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-purple-600 dark:to-indigo-600 hover:opacity-95 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/15 dark:shadow-purple-600/15 flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                      >
                        <span>🎴</span> Study Deck
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
      </div>
    </div>
  );
};

export default AnkiDecksPage;
