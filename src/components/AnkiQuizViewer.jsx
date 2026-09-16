// src/components/AnkiQuizViewer.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { ANKI_DECKS_CATALOG, getAssetUrl } from '../utils/ankiDecksCatalog';
import { normalizeAnkiCard, ankiFuriganaToRuby, stripAnkiHtml } from '../utils/ankiParser';
import {
  Rating,
  State,
  createEmptyCard,
  getSchedulingPreviews,
  applyReview,
  saveCardReviewToDB,
  hydrateCard
} from '../utils/fsrsEngine';
import LoadingSpinner from '../utils/loading_spinner';
import ThemeToggle from './ThemeToggle.jsx';

const AudioControlsGroup = ({ card, onPlaySentence, onPlayWord, onPlayDefault }) => {
  if (card?.sentenceAudio && card?.wordAudio) {
    return (
      <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPlaySentence();
          }}
          className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-indigo-950/50 hover:bg-emerald-600 dark:hover:bg-indigo-600 hover:text-white text-emerald-700 dark:text-indigo-300 border border-emerald-200 dark:border-indigo-800 text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer"
          title="Play Sentence Audio (Hotkey: S or R)"
        >
          <span>🔊</span> Sentence <span className="text-[10px] opacity-75 font-mono">(S)</span>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPlayWord();
          }}
          className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-purple-950/50 hover:bg-teal-600 dark:hover:bg-purple-600 hover:text-white text-teal-700 dark:text-purple-300 border border-teal-200 dark:border-purple-800 text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer"
          title="Play Word Audio (Hotkey: W)"
        >
          <span>🗣️</span> Word <span className="text-[10px] opacity-75 font-mono">(W)</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onPlayDefault();
      }}
      className="p-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-emerald-600 dark:hover:bg-indigo-600 hover:text-white text-[var(--color-text-primary)] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm text-xs font-bold"
      title="Listen Audio (Hotkey: R)"
    >
      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
      </svg>
      <span className="text-[10px] opacity-75 font-mono">(R)</span>
    </button>
  );
};

const playAudioOrTTS = (audioPath, japaneseText) => {
  if (audioPath) {
    const audio = new Audio(audioPath);
    audio.play().catch(() => {
      speakTTS(japaneseText);
    });
  } else {
    speakTTS(japaneseText);
  }
};

const speakTTS = (text) => {
  if (!window.speechSynthesis || !text) return;
  const clean = stripAnkiHtml(text);
  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.lang = 'ja-JP';
  utterance.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const CARDS_PER_SESSION = 20;

const AnkiQuizViewer = () => {
  const { deckId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const initialMode = searchParams.get('mode') === 'mcq' ? 'mcq' : 'fsrs';
  const initialLevel = searchParams.get('level') || 'ALL';
  const initialChunk = parseInt(searchParams.get('chunk') || '0', 10);

  const [quizMode, setQuizMode] = useState(initialMode);
  const [levelFilter, setLevelFilter] = useState(initialLevel);
  const [selectedLesson, setSelectedLesson] = useState('ALL');
  const [chunkIndex, setChunkIndex] = useState(initialChunk);

  const [deckMeta, setDeckMeta] = useState(null);
  const [allDeckCards, setAllDeckCards] = useState([]);
  const [filteredDeckCards, setFilteredDeckCards] = useState([]);
  const [sessionCards, setSessionCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // FSRS Flashcard state
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFurigana, setShowFurigana] = useState(true);
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);
  const [sessionRatings, setSessionRatings] = useState({ again: 0, hard: 0, good: 0, easy: 0 });

  // MCQ state
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentMCQOptions, setCurrentMCQOptions] = useState([]);

  const [isCompleted, setIsCompleted] = useState(false);

  const deckLevels = deckMeta?.levels || (deckMeta?.level && deckMeta.level !== 'N5 - N1' && deckMeta.level !== 'All' ? [deckMeta.level] : []);
  const hasMultipleLevels = deckLevels.length > 1;
  const availableLevels = hasMultipleLevels ? ['ALL', ...deckLevels] : (deckLevels.length > 0 ? deckLevels : ['ALL']);

  // Distinct lessons in deck (e.g. Lessons 01–12 for Shin Kanzen Master)
  const distinctLessons = React.useMemo(() => {
    const set = new Set();
    allDeckCards.forEach(c => {
      if (c.lessonNumber) set.add(c.lessonNumber);
    });
    return Array.from(set).sort((a, b) => a - b);
  }, [allDeckCards]);

  // 1. Fetch raw Deck data
  useEffect(() => {
    const meta = ANKI_DECKS_CATALOG.find(d => d.id === deckId) || {
      id: deckId,
      title: 'Custom Anki Deck',
      category: 'Anki Deck',
      level: 'All',
      dataPath: `anki_decks/${deckId}_data.json`
    };
    setDeckMeta(meta);

    async function loadDeck() {
      setLoading(true);
      try {
        const fetchUrl = getAssetUrl(meta.dataPath);
        const res = await fetch(fetchUrl);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        const rawCards = data.cards || (Array.isArray(data) ? data : []);

        const normalized = rawCards
          .map(c => normalizeAnkiCard(c, deckId))
          .filter(c => c && (c.expression || c.meaning));

        setAllDeckCards(normalized);
      } catch (err) {
        console.error('Failed to load Anki deck:', err);
        setLoading(false);
      }
    }

    loadDeck();
  }, [deckId]);

  // 2. Filter by Lesson, Level and Prepare 20-Card Chunk
  useEffect(() => {
    if (allDeckCards.length === 0) return;

    let filtered = allDeckCards;

    // Filter by Lesson if selected
    if (selectedLesson !== 'ALL') {
      const targetLsn = parseInt(selectedLesson, 10);
      filtered = filtered.filter(c => c.lessonNumber === targetLsn);
    }

    // Filter by JLPT level or Core Tier if multi-level deck
    if (levelFilter !== 'ALL' && hasMultipleLevels) {
      const targetLvl = levelFilter.toUpperCase().trim();
      filtered = filtered.filter(c => {
        if (!c.level) return false;
        const cardLvl = c.level.toUpperCase().trim();
        return cardLvl === targetLvl || cardLvl.includes(targetLvl) || (c.tags && c.tags.some(t => t.toUpperCase().includes(targetLvl)));
      });
    }

    setFilteredDeckCards(filtered);

    // Slice 20-card session
    const start = chunkIndex * CARDS_PER_SESSION;
    const end = start + CARDS_PER_SESSION;
    const rawChunk = filtered.slice(start, end);
    const chunkToUse = rawChunk.length > 0 ? rawChunk : filtered.slice(0, CARDS_PER_SESSION);

    async function hydrateSRS() {
      let srsMap = new Map();
      if (currentUser) {
        try {
          const snap = await getDocs(collection(db, 'users', currentUser.uid, 'srsCards'));
          snap.forEach(d => srsMap.set(d.id, d.data()));
        } catch (e) {
          console.warn('Could not load user SRS cards:', e);
        }
      }

      const hydrated = chunkToUse.map(c => {
        const stored = srsMap.get(c.id);
        return {
          ...c,
          fsrsCard: stored ? hydrateCard(stored) : createEmptyCard()
        };
      });

      setSessionCards(hydrated);
      setCurrentIndex(0);
      setIsFlipped(false);
      setIsCompleted(false);
      setSessionRatings({ again: 0, hard: 0, good: 0, easy: 0 });
      setScore(0);
      setLoading(false);
    }

    hydrateSRS();
  }, [allDeckCards, levelFilter, chunkIndex, currentUser]);

  // 3. Generate 4 MCQ Options when moving to a new card in MCQ mode
  useEffect(() => {
    if (quizMode === 'mcq' && sessionCards.length > 0 && sessionCards[currentIndex]) {
      const current = sessionCards[currentIndex];
      const correctAnswer = current.meaning;

      const otherWords = allDeckCards
        .filter(c => c.id !== current.id && c.meaning && c.meaning !== correctAnswer)
        .map(c => c.meaning);

      const shuffledOthers = shuffleArray(otherWords).slice(0, 3);
      const options = shuffleArray([correctAnswer, ...shuffledOthers]);

      setCurrentMCQOptions(options);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    }
  }, [quizMode, currentIndex, sessionCards, allDeckCards]);

  const handleLevelChange = (lvl) => {
    setLoading(true);
    setLevelFilter(lvl);
    setChunkIndex(0);
    setSearchParams({ mode: quizMode, level: lvl, chunk: '0' });
  };

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
    if (sessionCards[currentIndex]) {
      playAudioOrTTS(sessionCards[currentIndex].audio, sessionCards[currentIndex].expression);
    }
  }, [sessionCards, currentIndex]);

  const handleNextCard = useCallback(() => {
    setIsFlipped(false);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);

    if (currentIndex + 1 >= sessionCards.length) {
      setIsCompleted(true);
    } else {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 120);
    }
  }, [currentIndex, sessionCards.length]);

  const handlePrevCard = useCallback(() => {
    setIsFlipped(false);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCurrentIndex(prev => (prev - 1 + sessionCards.length) % sessionCards.length);
  }, [sessionCards.length]);

  const handleFSRSRating = async (rating) => {
    const card = sessionCards[currentIndex];
    if (!card) return;

    const now = new Date();
    const result = applyReview(card.fsrsCard, rating, now);

    setSessionRatings(prev => {
      if (rating === Rating.Again) return { ...prev, again: prev.again + 1 };
      if (rating === Rating.Hard) return { ...prev, hard: prev.hard + 1 };
      if (rating === Rating.Good) return { ...prev, good: prev.good + 1 };
      if (rating === Rating.Easy) return { ...prev, easy: prev.easy + 1 };
      return prev;
    });

    if (currentUser) {
      saveCardReviewToDB(db, currentUser.uid, card.id, {
        level: card.level,
        category: deckMeta?.category || 'vocabulary',
        front: card.expression,
        back: card.meaning,
        furigana: card.furigana,
        deckId: card.deckId
      }, result).catch(e => console.warn('SRS review save error:', e));
    }

    handleNextCard();
  };

  const handleMCQSelect = (opt) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(opt);
    setIsAnswerSubmitted(true);

    const isCorrect = opt === sessionCards[currentIndex].meaning;
    if (isCorrect) setScore(prev => prev + 1);

    if (currentUser && sessionCards[currentIndex]) {
      const rating = isCorrect ? Rating.Good : Rating.Again;
      const result = applyReview(sessionCards[currentIndex].fsrsCard, rating, new Date());
      saveCardReviewToDB(db, currentUser.uid, sessionCards[currentIndex].id, {
        front: sessionCards[currentIndex].expression,
        back: sessionCards[currentIndex].meaning
      }, result).catch(e => console.warn(e));
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (quizMode === 'fsrs') {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          handleFlip();
        } else if (e.code === 'ArrowRight' || e.key === 'j' || e.key === 'J') {
          e.preventDefault();
          handleNextCard();
        } else if (e.code === 'ArrowLeft' || e.key === 'k' || e.key === 'K') {
          e.preventDefault();
          handlePrevCard();
        } else if (e.key === 'r' || e.key === 'R' || e.key === 's' || e.key === 'S') {
          e.preventDefault();
          if (sessionCards[currentIndex]) {
            playAudioOrTTS(
              sessionCards[currentIndex].sentenceAudio || sessionCards[currentIndex].audio,
              sessionCards[currentIndex].sentencePlain || sessionCards[currentIndex].expression
            );
          }
        } else if (e.key === 'w' || e.key === 'W') {
          e.preventDefault();
          if (sessionCards[currentIndex]) {
            playAudioOrTTS(
              sessionCards[currentIndex].wordAudio || sessionCards[currentIndex].audio,
              sessionCards[currentIndex].expression
            );
          }
        } else if (e.key === 'f' || e.key === 'F') {
          e.preventDefault();
          setShowFurigana(prev => !prev);
        } else if (isFlipped) {
          if (e.key === '1') handleFSRSRating(Rating.Again);
          if (e.key === '2') handleFSRSRating(Rating.Hard);
          if (e.key === '3') handleFSRSRating(Rating.Good);
          if (e.key === '4') handleFSRSRating(Rating.Easy);
        }
      } else if (quizMode === 'mcq') {
        if (!isAnswerSubmitted) {
          if (['1', '2', '3', '4'].includes(e.key)) {
            const idx = parseInt(e.key, 10) - 1;
            if (currentMCQOptions[idx]) handleMCQSelect(currentMCQOptions[idx]);
          }
        } else if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          handleNextCard();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quizMode, isFlipped, isAnswerSubmitted, handleFlip, handleNextCard, handlePrevCard, sessionCards, currentIndex, currentMCQOptions]);

  if (loading) return <LoadingSpinner />;

  if (sessionCards.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 p-8 rounded-3xl max-w-md w-full text-center shadow-lg">
          <div className="text-4xl mb-3">🎴</div>
          <h2 className="text-2xl font-black mb-2">No Cards Found</h2>
          <p className="text-xs text-[var(--color-text-muted)] mb-6">No cards match the selected level ({levelFilter}).</p>
          <button
            onClick={() => handleLevelChange('ALL')}
            className="w-full py-3 bg-[var(--color-accent)] text-white font-bold rounded-xl shadow text-xs"
          >
            Show All Levels
          </button>
        </div>
      </div>
    );
  }

  // Session Completed Screen
  if (isCompleted) {
    const totalRated = sessionRatings.again + sessionRatings.hard + sessionRatings.good + sessionRatings.easy;
    const recalledCount = sessionRatings.good + sessionRatings.easy;
    const finalPercent = quizMode === 'mcq'
      ? Math.round((score / sessionCards.length) * 100)
      : (totalRated > 0 ? Math.round((recalledCount / totalRated) * 100) : 100);

    const totalChunks = Math.ceil(filteredDeckCards.length / CARDS_PER_SESSION);
    const hasNextChunk = chunkIndex + 1 < totalChunks;

    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] py-12 px-4 flex items-center justify-center animate-fade-in">
        <div className="max-w-md w-full bg-[#fcf9f2] dark:bg-zinc-900 border-2 border-[#decfae] dark:border-white/10 rounded-3xl p-8 shadow-2xl text-center">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="text-2xl font-black mb-1 text-gray-900 dark:text-white">Session Complete!</h2>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-6">
            {deckMeta?.title} {levelFilter !== 'ALL' && `(${levelFilter})`} • Session {chunkIndex + 1} of {totalChunks} (20 Words)
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-indigo-950/30 border border-emerald-200 dark:border-indigo-900">
              <div className="text-xs text-emerald-700 dark:text-indigo-400 font-bold uppercase">
                {quizMode === 'mcq' ? 'Final Score' : 'Retention Rate'}
              </div>
              <div className="text-3xl font-black text-emerald-800 dark:text-indigo-300">
                {finalPercent}%
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50 dark:bg-purple-950/30 border border-teal-200 dark:border-purple-900">
              <div className="text-xs text-teal-700 dark:text-purple-400 font-bold uppercase">
                Words Studied
              </div>
              <div className="text-3xl font-black text-teal-800 dark:text-purple-300">
                {sessionCards.length}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {hasNextChunk && (
              <button
                onClick={() => {
                  setChunkIndex(prev => prev + 1);
                  setSearchParams({ mode: quizMode, level: levelFilter, chunk: String(chunkIndex + 1) });
                }}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-indigo-600 dark:to-purple-600 hover:opacity-95 text-white font-extrabold rounded-2xl shadow-lg transition-all text-sm"
              >
                Start Next Set (Set {chunkIndex + 2} of {totalChunks}) →
              </button>
            )}

            <button
              onClick={() => {
                setIsCompleted(false);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="w-full py-3 border border-black/20 dark:border-white/20 font-bold rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all text-xs text-gray-800 dark:text-white"
            >
              Review This Session Again
            </button>

            <button
              onClick={() => navigate('/anki-decks')}
              className="w-full py-3 text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all"
            >
              ← Back to All Decks
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = sessionCards[currentIndex];
  const previews = currentCard ? getSchedulingPreviews(currentCard.fsrsCard) : null;
  const progressPercent = ((currentIndex + 1) / sessionCards.length) * 100;
  const totalChunks = Math.ceil(filteredDeckCards.length / CARDS_PER_SESSION);

  return (
    <div className="w-full max-w-4xl lg:max-w-5xl mx-auto py-2 px-4 flex flex-col items-center select-none text-[var(--color-text-primary)]">
      {/* Top Header Controls */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2.5 mb-2.5">
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between">
          <button
            onClick={() => navigate('/anki-decks')}
            className="px-3 py-1.5 border border-black/20 dark:border-white/20 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-xs font-bold transition-all text-gray-800 dark:text-white"
          >
            ← Decks
          </button>

          {/* Level Filter Pills or Single Level Badge */}
          {hasMultipleLevels ? (
            <div className="flex items-center gap-1 bg-[#ede3ce] dark:bg-zinc-800 p-1 rounded-xl border border-[#decfae] dark:border-white/10">
              {availableLevels.map(lvl => (
                <button
                  key={lvl}
                  onClick={() => handleLevelChange(lvl)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-black transition-all ${
                    levelFilter === lvl
                      ? 'bg-emerald-600 dark:bg-gradient-to-r dark:from-purple-600 dark:to-indigo-600 text-white shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          ) : (
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-purple-950/40 text-emerald-700 dark:text-purple-300 text-xs font-black border border-emerald-500/20 dark:border-purple-500/20">
              🎯 {deckMeta?.level || 'N3'}
            </span>
          )}

          {/* Lesson Filter Dropdown for multi-lesson decks */}
          {distinctLessons.length > 1 && (
            <select
              value={selectedLesson}
              onChange={(e) => {
                setSelectedLesson(e.target.value);
                setChunkIndex(0);
              }}
              className="px-2.5 py-1 rounded-xl bg-[#fcf9f2] dark:bg-zinc-800 border border-[#decfae] dark:border-white/10 text-xs font-black text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
            >
              <option value="ALL">📚 All Lessons ({distinctLessons.length})</option>
              {distinctLessons.map(lsn => (
                <option key={lsn} value={lsn}>
                  Lesson {String(lsn).padStart(2, '0')}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Furigana Toggle */}
          <button
            onClick={() => setShowFurigana(prev => !prev)}
            className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
              showFurigana
                ? 'bg-emerald-50 dark:bg-purple-950/40 text-emerald-700 dark:text-purple-300 border-emerald-300 dark:border-purple-500/30'
                : 'bg-[#ede3ce] dark:bg-zinc-800 text-gray-700 dark:text-gray-400 border-transparent'
            }`}
            title="Toggle Furigana (Hotkey: F)"
          >
            ふりがな {showFurigana ? 'ON' : 'OFF'}
          </button>

          {/* Theme Toggle (Light / Dark) */}
          <ThemeToggle compact={true} />
        </div>
      </div>

      {/* Progress & Study Set Bar */}
      <div className="w-full mb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-gray-700 dark:text-gray-300 font-semibold mb-1 px-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-gray-900 dark:text-white">
              {deckMeta?.title} {levelFilter !== 'ALL' && `(${levelFilter})`}
            </span>
            {totalChunks > 1 && (
              <select
                value={chunkIndex}
                onChange={(e) => {
                  const newIdx = parseInt(e.target.value, 10);
                  setChunkIndex(newIdx);
                  setSearchParams({ mode: quizMode, level: levelFilter, chunk: String(newIdx) });
                }}
                className="px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-indigo-950/50 border border-emerald-200 dark:border-indigo-800 text-[11px] font-black text-emerald-800 dark:text-indigo-300 focus:outline-none cursor-pointer"
                title="Select 20-word Study Set"
              >
                {Array.from({ length: totalChunks }).map((_, idx) => {
                  const s = idx * CARDS_PER_SESSION + 1;
                  const e = Math.min((idx + 1) * CARDS_PER_SESSION, filteredDeckCards.length);
                  return (
                    <option key={idx} value={idx}>
                      Set {idx + 1} of {totalChunks} (Words {s}–{e})
                    </option>
                  );
                })}
              </select>
            )}
          </div>
          <div className="flex items-center justify-end text-xs">
            <span className="px-2.5 py-0.5 rounded-md bg-[#ede3ce] dark:bg-white/5 font-black text-gray-900 dark:text-white">
              Word {currentIndex + 1} of {sessionCards.length}
            </span>
          </div>
        </div>
        <div className="w-full h-1.5 bg-[#decfae] dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-indigo-500 dark:to-purple-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Interactive 3D Flip Flashcard - Full Size Adaptive */}
      <div className="w-full [perspective:1200px] mb-3">
        <div
          onClick={handleFlip}
          className="w-full grid [grid-template-areas:'stack'] cursor-pointer relative select-none transition-transform duration-500 ease-out [transform-style:preserve-3d]"
          style={{
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* ======================================================== */}
          {/* FRONT FACE                                               */}
          {/* ======================================================== */}
          <div className="[grid-area:stack] w-full min-h-[360px] sm:min-h-[380px] rounded-2xl p-6 sm:p-8 border border-gray-200/80 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-xl flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(0deg)] hover:border-emerald-500/40 dark:hover:border-white/25 transition-colors">
            {/* Top Indicator */}
            <div className="flex items-center justify-between w-full">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-purple-950/40 text-emerald-700 dark:text-purple-300 text-[11px] font-extrabold uppercase border border-emerald-200/60 dark:border-purple-800/40">
                Front Face (Prompt)
              </span>
            </div>

            {/* Front Content */}
            <div className="text-center my-auto py-4 space-y-4">
              {currentCard.layoutType === 'grammar' ? (
                <div className="space-y-4 py-2">
                  {currentCard.lessonInfo && (
                    <span className="px-3 py-1 bg-teal-100 dark:bg-cyan-950/50 text-teal-800 dark:text-cyan-300 rounded-full text-xs font-black uppercase tracking-wider">
                      📖 {currentCard.lessonInfo}
                    </span>
                  )}
                  <div
                    className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white leading-relaxed px-2"
                    dangerouslySetInnerHTML={{ __html: currentCard.frontSentence || currentCard.expression }}
                  />
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                    Fill in the blank <span className="font-bold text-emerald-700 dark:text-indigo-400">【…】</span> with the correct grammar pattern
                  </p>
                </div>
              ) : currentCard.layoutType === 'anime' ? (
                <div className="space-y-4">
                  {currentCard.image && (
                    <div className="max-w-[440px] max-h-[250px] mx-auto rounded-xl overflow-hidden shadow border border-black/10 dark:border-white/10">
                      <img src={currentCard.image} alt="Anime Scene" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className={`text-2xl sm:text-3xl font-black text-gray-900 dark:text-white px-2 leading-relaxed ${!showFurigana ? 'hide-furigana' : ''}`}>
                    <span dangerouslySetInnerHTML={{ __html: currentCard.sentence || currentCard.expression }} />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 py-2">
                  {currentCard.image && (
                    <div className="max-w-[360px] max-h-[200px] mx-auto rounded-xl overflow-hidden shadow border border-black/10 dark:border-white/10">
                      <img src={currentCard.image} alt="Context Image" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className={`text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white ${!showFurigana ? 'hide-furigana' : ''}`}>
                    <span dangerouslySetInnerHTML={{ __html: currentCard.furigana || currentCard.expression }} />
                  </div>
                </div>
              )}
            </div>

            <div />
          </div>

          {/* ======================================================== */}
          {/* BACK FACE                                                */}
          {/* ======================================================== */}
          <div className="[grid-area:stack] w-full min-h-[360px] sm:min-h-[380px] rounded-2xl p-6 sm:p-8 border-2 border-emerald-500/50 dark:border-purple-500/50 bg-white dark:bg-zinc-900 shadow-xl flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] transition-colors">
            {/* Top Indicator */}
            <div className="flex items-center justify-between w-full">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-purple-950/40 text-emerald-700 dark:text-purple-300 text-[11px] font-extrabold uppercase border border-emerald-200/60 dark:border-purple-800/40">
                Back Face (Answer)
              </span>
            </div>

            {/* Back Content */}
            <div className="text-center my-auto py-2 space-y-3">
              {currentCard.layoutType === 'grammar' ? (
                <div className="space-y-3 text-left">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    {currentCard.lessonInfo && (
                      <span className="px-2.5 py-0.5 bg-teal-100 dark:bg-cyan-950/50 text-teal-800 dark:text-cyan-300 rounded-lg text-xs font-black">
                        📖 {currentCard.lessonInfo}
                      </span>
                    )}
                    {currentCard.grammarPattern && (
                      <span className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-indigo-600 dark:to-purple-600 text-white rounded-lg text-xs font-black shadow-sm">
                        {currentCard.grammarPattern}
                      </span>
                    )}
                  </div>

                  {/* Complete Japanese sentence with furigana */}
                  <div className="p-3.5 bg-emerald-50/60 dark:bg-indigo-950/30 rounded-xl border border-emerald-200/50 dark:border-indigo-900/50">
                    <div
                      className={`text-lg sm:text-xl font-black text-gray-900 dark:text-white leading-relaxed ${!showFurigana ? 'hide-furigana' : ''}`}
                      dangerouslySetInnerHTML={{ __html: currentCard.backSentence || currentCard.frontSentence }}
                    />
                    {currentCard.translation && (
                      <div className="text-xs text-gray-700 dark:text-gray-300 mt-1.5 font-medium">
                        {currentCard.translation}
                      </div>
                    )}
                  </div>

                  {/* Grammar Formation Rule */}
                  {currentCard.richGrammarFormation && (
                    <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200/50 dark:border-amber-900/40 text-xs">
                      <span className="font-black text-amber-700 dark:text-amber-400 block mb-1">
                        📐 Connective Rule / Formation:
                      </span>
                      <div
                        className="text-gray-800 dark:text-gray-200 font-bold"
                        dangerouslySetInnerHTML={{ __html: currentCard.richGrammarFormation }}
                      />
                    </div>
                  )}

                  {/* Explanation & Usage Notes */}
                  {(currentCard.grammarExplanation || currentCard.additionalNotes) && (
                    <div className="p-3 bg-gray-50 dark:bg-zinc-800/60 rounded-xl border border-black/5 dark:border-white/5 text-xs text-gray-700 dark:text-gray-300 leading-relaxed space-y-1">
                      {currentCard.grammarExplanation && (
                        <div>
                          <span className="font-black text-gray-900 dark:text-white">💡 Meaning: </span>
                          <span dangerouslySetInnerHTML={{ __html: currentCard.grammarExplanation }} />
                        </div>
                      )}
                      {currentCard.additionalNotes && (
                        <div>
                          <span className="font-black text-gray-900 dark:text-white">📝 Note: </span>
                          <span dangerouslySetInnerHTML={{ __html: currentCard.additionalNotes }} />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Detailed Sentence Breakdown & Word-by-Word Analysis (Harry Sui / GrammarDojo) */}
                  {currentCard.detailedExplanation && (
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDetailedBreakdown(prev => !prev);
                        }}
                        className="w-full py-2 px-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-emerald-200 dark:border-indigo-800/60 rounded-xl text-xs font-bold text-emerald-800 dark:text-indigo-300 flex items-center justify-between hover:opacity-90 transition-all cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <span>🏗️</span> Sentence Structure & Word Breakdown
                        </span>
                        <span>{showDetailedBreakdown ? '▲ Hide' : '▼ View Breakdown'}</span>
                      </button>

                      {showDetailedBreakdown && (
                        <div
                          className="mt-3 p-4 bg-[#fcf9f2] dark:bg-zinc-900 rounded-xl border border-[#decfae] dark:border-white/10 text-xs sm:text-sm leading-relaxed space-y-3 select-text shadow-inner"
                          onClick={(e) => e.stopPropagation()}
                          dangerouslySetInnerHTML={{ __html: currentCard.detailedExplanation }}
                        />
                      )}
                    </div>
                  )}
                </div>
              ) : currentCard.layoutType === 'anime' ? (
                <div className="space-y-4 text-left">
                  {currentCard.image && (
                    <div className="max-w-[420px] max-h-[240px] mx-auto rounded-xl overflow-hidden shadow-md border border-black/10 dark:border-white/10 bg-black">
                      <img src={currentCard.image} alt="Anime Scene" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="text-center py-1">
                    <div className={`text-3xl sm:text-4xl font-black text-emerald-700 dark:text-indigo-400 ${!showFurigana ? 'hide-furigana' : ''}`}>
                      <span dangerouslySetInnerHTML={{ __html: currentCard.furigana || currentCard.expression }} />
                    </div>
                    {currentCard.conciseMeaning && (
                      <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-200 mt-1">
                        {currentCard.conciseMeaning}
                      </div>
                    )}
                  </div>

                  {/* Full Sentence Context */}
                  {currentCard.sentence && (
                    <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-indigo-950/30 border border-emerald-200/50 dark:border-indigo-900/50 space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-indigo-400">
                        📖 Example Sentence
                      </div>
                      <div
                        className={`font-bold text-base sm:text-lg text-gray-900 dark:text-white leading-relaxed ${!showFurigana ? 'hide-furigana' : ''}`}
                        dangerouslySetInnerHTML={{ __html: currentCard.sentence }}
                      />
                      {currentCard.sentenceEng && (
                        <div
                          className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 italic pt-0.5"
                          dangerouslySetInnerHTML={{ __html: currentCard.sentenceEng }}
                        />
                      )}
                    </div>
                  )}

                  {/* Yomitan Rich Glossary Definition */}
                  {currentCard.primaryDefinition && currentCard.primaryDefinition.includes('<') && (
                    <div className="p-4 rounded-xl bg-[#fcf9f2] dark:bg-zinc-900 border border-[#decfae] dark:border-white/10 shadow-sm space-y-2">
                      <div className="text-xs font-black uppercase text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                        <span>📖</span> Yomitan Dictionary Breakdown
                      </div>
                      <div
                        className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed yomitan-breakdown select-text"
                        dangerouslySetInnerHTML={{ __html: currentCard.primaryDefinition }}
                      />
                    </div>
                  )}

                  {/* Context Notes */}
                  {currentCard.extraDefinitions && (
                    <div className="text-xs text-gray-700 dark:text-gray-300 bg-[#ede3ce] dark:bg-white/5 p-3 rounded-lg flex items-center gap-2">
                      <span className="font-bold">🏷️ Context:</span>
                      <span dangerouslySetInnerHTML={{ __html: currentCard.extraDefinitions }} />
                    </div>
                  )}
                </div>
              ) : currentCard.layoutType === 'sentence_vocab' ? (
                <div className="space-y-4 text-left">
                  {/* Target Vocab Title Bar */}
                  <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-black/10 dark:border-white/10">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className={`text-3xl sm:text-4xl font-black text-emerald-700 dark:text-indigo-400 ${!showFurigana ? 'hide-furigana' : ''}`}>
                        <span dangerouslySetInnerHTML={{ __html: currentCard.furigana || currentCard.expression }} />
                      </span>
                    </div>
                  </div>

                  {/* English Definition */}
                  <div
                    className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white"
                    dangerouslySetInnerHTML={{ __html: currentCard.meaning }}
                  />

                  {/* Context Sentence(s) with Bold Target Word */}
                  {currentCard.sentences && currentCard.sentences.length > 0 ? (
                    <div className={`grid gap-2.5 ${currentCard.sentences.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                      {currentCard.sentences.map((st, sIdx) => (
                        <div key={sIdx} className="p-3 rounded-xl bg-emerald-50/60 dark:bg-indigo-950/30 border border-emerald-200/50 dark:border-indigo-900/50 space-y-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-indigo-400">
                                📖 Example {currentCard.sentences.length > 1 ? `#${sIdx + 1}` : ''}
                              </span>
                              {st.audio && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playAudioOrTTS(st.audio, st.jaPlain);
                                  }}
                                  className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-indigo-900/60 hover:bg-emerald-600 dark:hover:bg-indigo-600 hover:text-white text-emerald-800 dark:text-indigo-300 text-[10px] font-bold transition-all cursor-pointer flex items-center gap-0.5"
                                  title="Play audio for this sentence"
                                >
                                  <span>🔊</span> Listen
                                </button>
                              )}
                            </div>
                            <div
                              className={`tsc-sentence ${!showFurigana ? 'hide-furigana' : ''} font-bold text-sm sm:text-base text-gray-900 dark:text-white leading-snug`}
                              dangerouslySetInnerHTML={{ __html: st.ja }}
                            />
                          </div>
                          {st.en && (
                            <div
                              className="text-[11px] sm:text-xs text-gray-700 dark:text-gray-300 italic pt-1 border-t border-black/5 dark:border-white/5"
                              dangerouslySetInnerHTML={{ __html: st.en }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : currentCard.sentence ? (
                    <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-indigo-950/30 border border-emerald-200/50 dark:border-indigo-900/50 space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-indigo-400">
                        📖 Example Sentence
                      </div>
                      <div
                        className={`tsc-sentence ${!showFurigana ? 'hide-furigana' : ''} font-bold text-base sm:text-lg text-gray-900 dark:text-white leading-relaxed`}
                        dangerouslySetInnerHTML={{ __html: currentCard.sentence }}
                      />
                      {currentCard.sentenceEng && (
                        <div
                          className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 italic pt-0.5"
                          dangerouslySetInnerHTML={{ __html: currentCard.sentenceEng }}
                        />
                      )}
                    </div>
                  ) : null}

                  {/* Notes */}
                  {currentCard.notes && (
                    <div className="text-xs text-left text-gray-700 dark:text-gray-300 bg-[#ede3ce] dark:bg-white/5 p-3 rounded-lg flex items-start gap-2">
                      <span className="font-bold">📝</span>
                      <span dangerouslySetInnerHTML={{ __html: currentCard.notes }} />
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className={`text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-700 dark:text-indigo-400 ${!showFurigana ? 'hide-furigana' : ''}`}>
                    <span dangerouslySetInnerHTML={{ __html: currentCard.furigana || currentCard.expression }} />
                  </div>
                  <div
                    className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white"
                    dangerouslySetInnerHTML={{ __html: currentCard.meaning }}
                  />

                  {currentCard.sentences && currentCard.sentences.length > 0 ? (
                    <div className={`grid gap-2.5 mt-2 ${currentCard.sentences.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                      {currentCard.sentences.map((st, sIdx) => (
                        <div key={sIdx} className="p-3 rounded-xl bg-emerald-50/60 dark:bg-indigo-950/30 text-left border border-emerald-200/50 dark:border-indigo-900/50 space-y-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-indigo-400">
                                📖 Example {currentCard.sentences.length > 1 ? `#${sIdx + 1}` : ''}
                              </span>
                              {st.audio && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playAudioOrTTS(st.audio, st.jaPlain);
                                  }}
                                  className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-indigo-900/60 hover:bg-emerald-600 dark:hover:bg-indigo-600 hover:text-white text-emerald-800 dark:text-indigo-300 text-[10px] font-bold transition-all cursor-pointer flex items-center gap-0.5"
                                  title="Play audio for this sentence"
                                >
                                  <span>🔊</span> Listen
                                </button>
                              )}
                            </div>
                            <div
                              className={`font-bold text-sm sm:text-base text-gray-900 dark:text-white leading-snug ${!showFurigana ? 'hide-furigana' : ''}`}
                              dangerouslySetInnerHTML={{ __html: st.ja }}
                            />
                          </div>
                          {st.en && (
                            <div
                              className="text-[11px] sm:text-xs text-gray-700 dark:text-gray-300 italic pt-1 border-t border-black/5 dark:border-white/5"
                              dangerouslySetInnerHTML={{ __html: st.en }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : currentCard.sentence ? (
                    <div className="mt-2 p-3.5 rounded-xl bg-emerald-50/60 dark:bg-indigo-950/30 text-left text-xs sm:text-sm border border-emerald-200/50 dark:border-indigo-900/50 space-y-1.5">
                      <div
                        className={`font-bold text-sm sm:text-base text-gray-900 dark:text-white leading-relaxed ${!showFurigana ? 'hide-furigana' : ''}`}
                        dangerouslySetInnerHTML={{ __html: currentCard.sentence }}
                      />
                      {currentCard.sentenceEng && (
                        <div
                          className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 italic"
                          dangerouslySetInnerHTML={{ __html: currentCard.sentenceEng }}
                        />
                      )}
                    </div>
                  ) : null}

                  {currentCard.notes && (
                    <div className="text-xs text-left text-gray-700 dark:text-gray-300 bg-[#ede3ce] dark:bg-white/5 p-3 rounded-lg flex items-start gap-2">
                      <span className="font-bold">📝</span>
                      <span dangerouslySetInnerHTML={{ __html: currentCard.notes }} />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div />
          </div>
        </div>

        {/* Reader Navigation Controls */}
        <div className="w-full flex items-center justify-between gap-2.5 mt-3">
          <button
            onClick={handlePrevCard}
            className="flex-1 py-2.5 border border-black/20 dark:border-white/20 font-bold rounded-xl hover:bg-[#ede3ce] dark:hover:bg-purple-950/40 dark:hover:border-purple-500/40 transition-all text-xs flex items-center justify-center gap-1 text-gray-800 dark:text-white"
          >
            ← Prev (<kbd className="font-mono text-[10px]">K</kbd> / <kbd className="font-mono text-[10px]">←</kbd>)
          </button>
          <button
            onClick={handleFlip}
            className="px-5 py-2.5 bg-emerald-50 dark:bg-purple-950/40 text-emerald-700 dark:text-purple-300 font-bold rounded-xl border border-emerald-500/30 dark:border-purple-500/30 hover:bg-emerald-100 dark:hover:bg-purple-900/60 transition-all text-xs"
          >
            {isFlipped ? 'Hide Answer' : 'Show Answer'} (<kbd className="font-mono text-[10px]">Space</kbd>)
          </button>
          <button
            onClick={handleNextCard}
            className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-purple-600 dark:to-indigo-600 hover:opacity-95 text-white font-bold rounded-xl shadow transition-all text-xs flex items-center justify-center gap-1"
          >
            Next → (<kbd className="font-mono text-[10px]">J</kbd> / <kbd className="font-mono text-[10px]">→</kbd>)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnkiQuizViewer;
