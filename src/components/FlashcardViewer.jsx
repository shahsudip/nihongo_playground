import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { collection, doc, getDoc, getDocs, setDoc, query, where } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import {
  Rating,
  State,
  createEmptyCard,
  getSchedulingPreviews,
  applyReview,
  saveCardReviewToDB,
  hydrateCard,
  formatInterval
} from '../utils/fsrsEngine';
import { getAssetUrl } from '../utils/ankiDecksCatalog';

// Speaker icon component
const SpeakerIcon = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors inline-flex items-center justify-center text-inherit cursor-pointer"
    title="Listen (Hotkey: R)"
  >
    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  </button>
);

let _speechWarmedUp = false;
const warmUpSpeechSynthesis = () => {
  if (_speechWarmedUp || !window.speechSynthesis) return;
  _speechWarmedUp = true;
  const silence = new SpeechSynthesisUtterance('');
  silence.volume = 0;
  window.speechSynthesis.speak(silence);
};

const speak = (text, lang) => {
  if (!window.speechSynthesis) return;
  warmUpSpeechSynthesis();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  const voices = window.speechSynthesis.getVoices();
  const match = voices.find(v => v.lang === lang || v.lang.startsWith(lang.split('-')[0]));
  if (match) utterance.voice = match;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

const FlashcardViewer = () => {
  const { level, type, chunkIndex } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSRSMode, setIsSRSMode] = useState(true); // Default to FSRS mode

  // Session review counters
  const [sessionRatings, setSessionRatings] = useState({
    again: 0,
    hard: 0,
    good: 0,
    easy: 0
  });
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [coveredInSession, setCoveredInSession] = useState(new Set());
  const historyDocRef = useRef(null);
  const totalCountRef = useRef(0);

  // Fetch words & user SRS cards
  useEffect(() => {
    if (!currentUser) return;

    const collectionType = type || 'vocabulary_list';
    const displayLevel = (level || 'N5').toUpperCase();
    const isKanji = collectionType.toLowerCase().includes('kanji');
    const isGrammar = collectionType.toLowerCase().includes('grammar');
    const category = isKanji ? 'kanji' : isGrammar ? 'grammar' : 'vocabulary';
    
    const quizId = `${level}-${collectionType}-${chunkIndex}`;
    historyDocRef.current = doc(db, 'users', currentUser.uid, 'quizHistory', quizId);

    const fetchFlashcardData = async () => {
      setIsLoading(true);
      try {
        let fetchedItems = [];

        // 1. First try JLPT-matome based on category
        try {
          const matomeSubcol = isKanji ? 'kanjilist' : isGrammar ? 'grammarlist' : 'vocablist';
          const matomeQuery = query(collection(db, 'JLPT-matome', displayLevel, matomeSubcol));
          const matomeSnap = await getDocs(matomeQuery);
          matomeSnap.forEach(docSnap => {
            fetchedItems.push({ id: docSnap.id, ...docSnap.data() });
          });
        } catch (e) {
          console.warn('Could not fetch from JLPT-matome:', e);
        }

        // 2. Fallback to jlpt/{level}/{collectionType}/full-list
        if (fetchedItems.length === 0) {
          try {
            const listDocRef = doc(db, 'jlpt', level, collectionType, 'full-list');
            const listDocSnap = await getDoc(listDocRef);
            if (listDocSnap.exists()) {
              const data = listDocSnap.data();
              fetchedItems = data.words || data.kanji || data.grammar || data.items || [];
            }
          } catch (e) {
            console.warn('Could not fetch from jlpt full-list:', e);
          }
        }

        // 3. Robust fallback to local pre-extracted Anki/Tango JSON data
        if (fetchedItems.length === 0) {
          try {
            let fallbackPath = '';
            if (isGrammar) {
              fallbackPath = getAssetUrl('anki_decks/shin_kanzen_n3_grammar_data.json');
            } else if (isKanji) {
              fallbackPath = getAssetUrl('anki_decks/ankidrone_essentials_data.json');
            } else {
              fallbackPath = displayLevel === 'N3' 
                ? getAssetUrl('anki_decks/shin_kanzen_n3_vocab_data.json')
                : getAssetUrl('anki_decks/ankidrone_essentials_data.json');
            }

            const res = await fetch(fallbackPath);
            if (res.ok) {
              const data = await res.json();
              const raw = data.cards || [];
              const filtered = raw.filter(c => !c.level || c.level === displayLevel || c.tags?.includes(displayLevel));
              const pool = filtered.length > 0 ? filtered : raw;
              
              if (isGrammar) {
                fetchedItems = pool.map(c => ({
                  title: c.expression || c.grammar || '',
                  meaning: c.meaning || '',
                  how_to_use: c.structure || c.reading || '',
                  definition: c.meaning || ''
                })).filter(g => g.title);
              } else if (isKanji) {
                fetchedItems = pool.map(c => ({
                  kanji: c.expression || c.vocabKanji || '',
                  onyomi: c.reading || '',
                  kunyomi: '',
                  meaning: c.meaning || c.vocabDef || ''
                })).filter(k => k.kanji);
              } else {
                fetchedItems = pool.map(c => ({
                  japanese: c.expression || c.vocabKanji || '',
                  hiragana: c.furigana || c.vocabFurigana || '',
                  english: c.meaning || c.vocabDef || '',
                  romaji: ''
                })).filter(w => w.japanese || w.english);
              }
            }
          } catch (e) {
            console.warn('Fallback fetch failed:', e);
          }
        }

        const index = parseInt(chunkIndex || '0', 10);
        const CHUNK_SIZE = 50;
        const start = index * CHUNK_SIZE;
        const end = start + CHUNK_SIZE;
        const chunkItems = fetchedItems.slice(start, end);
        totalCountRef.current = chunkItems.length;

        // Fetch existing SRS states from Firestore
        const userSrsRef = collection(db, 'users', currentUser.uid, 'srsCards');
        const userSrsSnap = await getDocs(userSrsRef);
        const srsMap = new Map();
        userSrsSnap.forEach(d => {
          srsMap.set(d.id, d.data());
        });

        const mappedCards = chunkItems.map((item, idx) => {
          let cardId = '';
          let front = '';
          let hiragana = '';
          let back_meaning = '';
          let back_romaji = '';
          let subtext = null;
          let extraInfo = {};

          if (isKanji) {
            cardId = `kanji-${displayLevel}-${item.kanji || item.character || item.id || idx}`;
            front = item.kanji || item.character || '';
            hiragana = item.onyomi ? `音: ${item.onyomi}` : '';
            if (item.kunyomi) hiragana += (hiragana ? ` | 訓: ${item.kunyomi}` : `訓: ${item.kunyomi}`);
            back_meaning = item.meaning || item.english || '';
            extraInfo = {
              onyomi: item.onyomi || '',
              kunyomi: item.kunyomi || '',
              examples: item.examples || item.words || []
            };
          } else if (isGrammar) {
            cardId = `grammar-${displayLevel}-${item.title || item.grammar || item.id || idx}`;
            front = item.title || item.grammar || '';
            hiragana = item.how_to_use ? `接続: ${item.how_to_use}` : '';
            back_meaning = item.meaning || item.definition || '';
            extraInfo = {
              formation: item.how_to_use || '',
              definition: item.definition || '',
              examples: item.examples || []
            };
          } else {
            cardId = `vocab-${displayLevel}-${item.japanese || item.word || item.id || idx}`;
            front = item.japanese || item.word || '';
            hiragana = item.hiragana || item.reading || '';
            back_meaning = item.english || item.meaning || '';
            back_romaji = item.romaji || '';
            subtext = item.furigana || null;
            extraInfo = {
              examples: item.examples || (item.example ? [item.example] : [])
            };
          }

          const existingSrs = srsMap.get(cardId);
          const fsrsCard = existingSrs ? hydrateCard(existingSrs) : createEmptyCard();

          return {
            id: cardId,
            level: displayLevel,
            category: category,
            front: front,
            hiragana: hiragana,
            back_meaning: back_meaning,
            back_romaji: back_romaji,
            subtext: subtext,
            ...extraInfo,
            fsrsCard: fsrsCard,
            lastRating: existingSrs?.lastRating || null
          };
        });

        // If mode=srs in URL and we have due cards, optionally sort due cards first
        if (searchParams.get('mode') === 'srs') {
          const now = new Date();
          mappedCards.sort((a, b) => {
            const dueA = new Date(a.fsrsCard.due || 0) <= now ? 0 : 1;
            const dueB = new Date(b.fsrsCard.due || 0) <= now ? 0 : 1;
            return dueA - dueB;
          });
        }

        setCards(mappedCards);
      } catch (error) {
        console.error("Error fetching flashcard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlashcardData();

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [level, type, chunkIndex, currentUser]);

  const updateProgressInDB = async (newCoveredSet) => {
    if (!historyDocRef.current) return;
    try {
      await setDoc(historyDocRef.current, {
        coveredCount: newCoveredSet.size,
        totalCount: totalCountRef.current,
        status: newCoveredSet.size === totalCountRef.current ? 'mastered' : 'incomplete',
        timestamp: new Date().toISOString(),
      }, { merge: true });
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    const currentCard = cards[currentIndex];
    if (currentCard && !coveredInSession.has(currentCard.id)) {
      const newCoveredSet = new Set(coveredInSession).add(currentCard.id);
      setCoveredInSession(newCoveredSet);
      updateProgressInDB(newCoveredSet);
    }
  }, [cards, currentIndex, coveredInSession]);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    if (window.speechSynthesis) window.speechSynthesis.cancel();

    if (currentIndex + 1 >= cards.length) {
      setIsSessionComplete(true);
    } else {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 120);
    }
  }, [currentIndex, cards.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
    }, 120);
  }, [cards.length]);

  // FSRS Rating Handler
  const handleRating = async (rating) => {
    const currentCard = cards[currentIndex];
    if (!currentCard || !currentUser) return;

    // Apply review calculation
    const now = new Date();
    const result = applyReview(currentCard.fsrsCard, rating, now);

    // Track session counts
    setSessionRatings(prev => {
      if (rating === Rating.Again) return { ...prev, again: prev.again + 1 };
      if (rating === Rating.Hard) return { ...prev, hard: prev.hard + 1 };
      if (rating === Rating.Good) return { ...prev, good: prev.good + 1 };
      if (rating === Rating.Easy) return { ...prev, easy: prev.easy + 1 };
      return prev;
    });

    // Update in-memory card
    const updatedCards = [...cards];
    updatedCards[currentIndex] = {
      ...currentCard,
      fsrsCard: result.card,
      lastRating: rating
    };
    setCards(updatedCards);

    // Save to Firestore asynchronously
    saveCardReviewToDB(db, currentUser.uid, currentCard.id, {
      level: currentCard.level,
      category: currentCard.category,
      front: currentCard.front,
      back: currentCard.back_meaning,
      hiragana: currentCard.hiragana,
      romaji: currentCard.back_romaji
    }, result).catch(e => console.warn('Failed to save SRS review:', e));

    const newCoveredSet = new Set(coveredInSession).add(currentCard.id);
    setCoveredInSession(newCoveredSet);
    updateProgressInDB(newCoveredSet);

    // Advance to next card or finish
    handleNext();
  };

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore inputs inside form fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        if (cards[currentIndex]) {
          speak(cards[currentIndex].front, 'ja-JP');
        }
      } else if (isFlipped && isSRSMode) {
        if (e.key === '1') {
          e.preventDefault();
          handleRating(Rating.Again);
        } else if (e.key === '2') {
          e.preventDefault();
          handleRating(Rating.Hard);
        } else if (e.key === '3') {
          e.preventDefault();
          handleRating(Rating.Good);
        } else if (e.key === '4') {
          e.preventDefault();
          handleRating(Rating.Easy);
        }
      } else if (!isSRSMode) {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev, isFlipped, isSRSMode, currentIndex, cards]);

  if (isLoading) return <LoadingSpinner />;

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 p-8 rounded-2xl max-w-md w-full text-center shadow-lg">
          <div className="text-4xl mb-4">🎴</div>
          <h1 className="text-2xl font-bold mb-2">No Flashcards Found</h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">This deck is currently empty or loading failed.</p>
          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 bg-[var(--color-accent)] text-white font-bold rounded-xl shadow hover:opacity-90 transition-all"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  // Session Completion Screen
  if (isSessionComplete) {
    const totalRated = sessionRatings.again + sessionRatings.hard + sessionRatings.good + sessionRatings.easy;
    const recalledCount = sessionRatings.hard + sessionRatings.good + sessionRatings.easy;
    const retentionRate = totalRated > 0 ? ((recalledCount / totalRated) * 100).toFixed(0) : '100';

    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4 flex items-center justify-center animate-fade-in">
        <div className="max-w-md w-full bg-white dark:bg-zinc-900 border-2 border-black/10 dark:border-white/10 rounded-3xl p-8 shadow-2xl text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-black mb-1">Session Complete!</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            All {cards.length} cards scheduled with FSRS memory optimization.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
              <div className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase">Retention</div>
              <div className="text-2xl font-black text-blue-700 dark:text-blue-300">{retentionRate}%</div>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase">Learned</div>
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300">{recalledCount}</div>
            </div>
          </div>

          <div className="space-y-2 mb-8 text-xs text-left bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-black/5 dark:border-white/5">
            <div className="flex justify-between">
              <span className="text-red-500 font-semibold">🔴 Again (Repeat soon):</span>
              <span className="font-bold">{sessionRatings.again}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-500 font-semibold">🟠 Hard (Struggled):</span>
              <span className="font-bold">{sessionRatings.hard}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-500 font-semibold">🟢 Good (Recalled):</span>
              <span className="font-bold">{sessionRatings.good}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-500 font-semibold">🔵 Easy (Mastered):</span>
              <span className="font-bold">{sessionRatings.easy}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/srs-review')}
              className="w-full py-3 bg-[var(--color-accent)] text-white font-bold rounded-xl shadow-md hover:opacity-90 transition-all"
            >
              Go to SRS Dashboard
            </button>
            <button
              onClick={() => {
                setIsSessionComplete(false);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="w-full py-3 border border-black/20 dark:border-white/20 font-bold rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all text-sm"
            >
              Review Deck Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const previews = currentCard ? getSchedulingPreviews(currentCard.fsrsCard) : null;
  const progressPercent = ((currentIndex + 1) / cards.length) * 100;

  return (
    <div className="w-full max-w-4xl lg:max-w-5xl mx-auto py-2 px-4 flex flex-col items-center select-none text-[var(--color-text-primary)]">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between mb-2.5">
        <button
          onClick={() => {
            const listPath = type === 'kanji_list'
              ? `/levels/${level || 'n5'}/kanji-list`
              : type === 'grammar_list'
              ? `/levels/${level || 'n5'}/grammar-list`
              : `/levels/${level || 'n5'}/vocabulary-list`;
            navigate(listPath);
          }}
          className="px-3 py-1.5 border border-black/20 dark:border-white/20 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-xs font-bold transition-all"
        >
          ← Back
        </button>

        <div className="flex items-center gap-2">
          {/* Mode Toggle Button */}
          <button
            onClick={() => setIsSRSMode(!isSRSMode)}
            className={`px-3 py-1 text-xs font-black rounded-full border transition-all ${
              isSRSMode
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500 shadow-sm'
                : 'bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border-transparent'
            }`}
          >
            {isSRSMode ? '⚡ FSRS SRS Mode' : '🔄 Flip Mode'}
          </button>
        </div>
      </div>

      {/* Progress & Info Bar */}
      <div className="w-full mb-3">
        <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-semibold mb-1 px-1">
          <span>
            {currentCard?.level} {(type || 'Vocabulary').replace('_', ' ')} • List {parseInt(chunkIndex || '0', 10) + 1}
          </span>
          <span>
            {currentIndex + 1} / {cards.length}
          </span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] transition-all duration-300"
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
          {/* FRONT FACE */}
          <div
            className="[grid-area:stack] w-full min-h-[340px] sm:min-h-[360px] rounded-2xl p-6 sm:p-8 border-2 border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-xl flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(0deg)] hover:border-black/25 dark:hover:border-white/25 transition-colors"
          >
            {/* Top Badge & Speaker */}
            <div className="flex items-center justify-between w-full">
              <span className="px-2.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-[11px] font-extrabold uppercase">
                {currentCard?.level}
              </span>
              <SpeakerIcon
                onClick={(e) => {
                  e.stopPropagation();
                  speak(currentCard?.front, 'ja-JP');
                }}
              />
            </div>

            {/* Front Content */}
            <div className="text-center my-auto py-4 space-y-3">
              {currentCard?.category === 'kanji' ? (
                <div className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-gray-900 dark:text-white">
                  {currentCard?.front}
                </div>
              ) : currentCard?.category === 'grammar' ? (
                <div className="space-y-3">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                    {currentCard?.front}
                  </div>
                  {currentCard?.formation && (
                    <div className="inline-block px-3 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/50 rounded-lg text-xs sm:text-sm font-semibold text-amber-800 dark:text-amber-300">
                      {currentCard.formation}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white">
                    {currentCard?.front}
                  </div>
                  {currentCard?.hiragana && currentCard.hiragana !== currentCard.front && (
                    <div className="text-base sm:text-lg font-bold text-gray-500 dark:text-gray-400">
                      {currentCard.hiragana}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div />
          </div>

          {/* BACK FACE */}
          <div
            className="[grid-area:stack] w-full min-h-[340px] sm:min-h-[360px] rounded-2xl p-6 sm:p-8 border-2 border-indigo-500/40 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-zinc-900 dark:to-indigo-950/40 shadow-xl flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            {/* Top Badge & Speaker */}
            <div className="flex items-center justify-between w-full">
              <span className="px-2.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-[11px] font-extrabold uppercase">
                {currentCard?.level}
              </span>
              <SpeakerIcon
                onClick={(e) => {
                  e.stopPropagation();
                  speak(currentCard?.front, 'ja-JP');
                }}
              />
            </div>

            {/* Back Content */}
            <div className="text-center my-auto py-1 space-y-2">
              <div className="text-2xl font-black text-[var(--color-accent)]">
                {currentCard?.front}
              </div>

              {/* Kanji Details */}
              {currentCard?.category === 'kanji' && (
                <div className="space-y-1.5">
                  <div className="text-xl font-extrabold text-gray-900 dark:text-white">
                    {currentCard?.back_meaning}
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5 pt-0.5 text-xs">
                    {currentCard?.onyomi && (
                      <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-md font-bold">
                        音: {currentCard.onyomi}
                      </span>
                    )}
                    {currentCard?.kunyomi && (
                      <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 rounded-md font-bold">
                        訓: {currentCard.kunyomi}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Grammar Details */}
              {currentCard?.category === 'grammar' && (
                <div className="space-y-1.5">
                  <div className="text-lg font-extrabold text-gray-900 dark:text-white">
                    {currentCard?.back_meaning}
                  </div>
                  {currentCard?.definition && currentCard.definition !== currentCard.back_meaning && (
                    <p className="text-xs text-gray-600 dark:text-gray-300 italic">
                      {currentCard.definition}
                    </p>
                  )}
                  {currentCard?.formation && (
                    <div className="inline-block px-2.5 py-0.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/50 rounded-lg text-xs font-semibold text-amber-800 dark:text-amber-300">
                      {currentCard.formation}
                    </div>
                  )}
                </div>
              )}

              {/* Vocabulary Details */}
              {currentCard?.category === 'vocabulary' && (
                <div className="space-y-1">
                  {currentCard?.hiragana && (
                    <div className="text-sm font-bold text-gray-600 dark:text-gray-300">
                      {currentCard.hiragana}
                    </div>
                  )}
                  <div className="text-xl font-extrabold text-gray-900 dark:text-white">
                    {currentCard?.back_meaning}
                  </div>
                  {currentCard?.back_romaji && (
                    <div className="text-xs font-semibold italic text-gray-500 dark:text-gray-400">
                      [{currentCard.back_romaji}]
                    </div>
                  )}
                </div>
              )}
            </div>

            <div />
          </div>
        </div>
      </div>

      {/* Bottom Controls Area */}
      <div className="w-full">
        {isSRSMode ? (
          // FSRS 4-Rating Buttons Bar
          <div className="min-h-[56px]">
            {isFlipped && (
              <div className="grid grid-cols-4 gap-2 animate-fade-in">
                {/* 1. Again */}
                <button
                  onClick={() => handleRating(Rating.Again)}
                  className="py-2.5 px-2 bg-red-500 hover:bg-red-600 text-white rounded-xl flex flex-col items-center justify-center shadow transition-all active:scale-95 group"
                >
                  <span className="text-[10px] opacity-80 uppercase font-black">1 • Again</span>
                  <span className="text-xs font-extrabold mt-0.5">{previews?.[Rating.Again]?.interval || '< 10m'}</span>
                </button>

                {/* 2. Hard */}
                <button
                  onClick={() => handleRating(Rating.Hard)}
                  className="py-2.5 px-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl flex flex-col items-center justify-center shadow transition-all active:scale-95 group"
                >
                  <span className="text-[10px] opacity-80 uppercase font-black">2 • Hard</span>
                  <span className="text-xs font-extrabold mt-0.5">{previews?.[Rating.Hard]?.interval || '1d'}</span>
                </button>

                {/* 3. Good */}
                <button
                  onClick={() => handleRating(Rating.Good)}
                  className="py-2.5 px-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl flex flex-col items-center justify-center shadow transition-all active:scale-95 group"
                >
                  <span className="text-[10px] opacity-80 uppercase font-black">3 • Good</span>
                  <span className="text-xs font-extrabold mt-0.5">{previews?.[Rating.Good]?.interval || '3d'}</span>
                </button>

                {/* 4. Easy */}
                <button
                  onClick={() => handleRating(Rating.Easy)}
                  className="py-2.5 px-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex flex-col items-center justify-center shadow transition-all active:scale-95 group"
                >
                  <span className="text-[10px] opacity-80 uppercase font-black">4 • Easy</span>
                  <span className="text-xs font-extrabold mt-0.5">{previews?.[Rating.Easy]?.interval || '7d'}</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          // Classic Navigation (Prev / Next)
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="flex-1 py-2.5 border border-black/20 dark:border-white/20 font-bold rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all text-xs"
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              className="flex-1 py-2.5 bg-[var(--color-accent)] text-white font-bold rounded-xl hover:opacity-90 shadow transition-all text-xs"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardViewer;