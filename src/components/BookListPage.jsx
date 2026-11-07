// src/components/BookListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { collection, getDocs } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import {
  getAnsweredCount,
  getCombinedAttemptCount,
  mergeHistoryMaps,
  selectPreferredAttempt,
} from '../utils/bookProgress.js';
import { STATIC_BOOKS } from '../data/static_books_catalog.js';
import { readAttempts as readN2Attempts, storageKeyFor as n2StorageKeyFor } from '../utils/chokuzenN2Data.js';

import coverN1 from '../assets/shin_cover_n1.jpg';
import coverN2 from '../assets/shin_cover_n2.jpg';
import coverN3 from '../assets/shin_cover_n3.jpg';
import coverN4N5 from '../assets/shin_cover_n4n5.jpg';

import powerDrillN1 from '../assets/power_drill_n1_cover.jpg';
import powerDrillN2 from '../assets/power_drill_n2_cover.jpg';
import powerDrillN3 from '../assets/power_drill_n3_cover.jpg';
import tangoN1Cover from '../assets/tango_n1_cover.jpg';
import tangoN2Cover from '../assets/tango_n2_cover.jpg';
import tangoN3Cover from '../assets/tango_n3_cover.jpg';

const N3_PRACTICE_BOOK_ID = 'jlpt-n3-practice-sets';
const N2_PRACTICE_BOOK_ID = 'jlpt-n2-practice-sets';
const NIHONGO_NO_MORI_BOOK_ID = 'nihongo-no-mori-n3';
const NIHONGO_NO_MORI_TOTAL_QUESTIONS = 500;
const NIHONGO_NO_MORI_SECTION_COUNT = 19;

const QUESTION_PROGRESS_BOOKS = {
  [N2_PRACTICE_BOOK_ID]: {
    unitCount: 15,
    totalQuestions: 810,
    getUnitId: unitNumber => `set-${unitNumber}`,
    getSectionRecords: (history, unitKey) => [
      history[`${unitKey}-vocabulary-kanji`],
      selectPreferredAttempt(history[`${unitKey}-grammar`], history[`${unitKey}-grammar-reading`]),
    ],
  },
  'first-time-jlpt-n3-350-kanji': {
    unitCount: 7,
    totalQuestions: 280,
    getUnitId: unitNumber => `chapter-${unitNumber}`,
    getSectionRecords: (history, unitKey) => (
      Array.from({ length: 4 }, (_, index) => history[`${unitKey}--section-${index + 1}`])
    ),
  },
  'pass-n3-within-20-days': {
    unitCount: 20,
    totalQuestions: 1160,
    getUnitId: unitNumber => `chapter-${unitNumber}`,
    getSectionRecords: (history, unitKey) => (
      Array.from({ length: 8 }, (_, index) => history[`${unitKey}--section-${index + 1}`])
    ),
  },
  [N3_PRACTICE_BOOK_ID]: {
    unitCount: 15,
    totalQuestions: 870,
    getUnitId: unitNumber => `set-${unitNumber}`,
    getSectionRecords: (history, unitKey) => [
      history[`${unitKey}-vocabulary-kanji`],
      selectPreferredAttempt(
        history[`${unitKey}-grammar`],
        history[`${unitKey}-grammar-reading`]
      ),
    ],
  },
};

const addHistoryRecord = (historyMap, quizId, record) => {
  if (!quizId || !record) return;
  historyMap[quizId] = selectPreferredAttempt(historyMap[quizId], {
    ...record,
    quizId,
  });
};

const loadCachedAttemptHistory = (currentUser = null) => {
  const historyMap = {};
  if (typeof localStorage === 'undefined') return historyMap;

  const bookPrefixes = Object.keys(QUESTION_PROGRESS_BOOKS)
    .filter(bookId => bookId !== N3_PRACTICE_BOOK_ID)
    .flatMap(bookId => [
      { prefix: `book_quiz_guest_${bookId}_`, bookId },
      ...(currentUser ? [{ prefix: `book_quiz_${currentUser.uid}_${bookId}_`, bookId }] : []),
    ]);
  const practicePrefixes = [
    'n3_practice_set_guest_',
    ...(currentUser ? [`n3_practice_set_${currentUser.uid}_`] : []),
  ];

  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const storageKey = localStorage.key(index);
      if (!storageKey) continue;

      bookPrefixes.forEach(({ prefix, bookId }) => {
        if (!storageKey.startsWith(prefix)) return;
        const chapterId = storageKey.slice(prefix.length);
        if (!chapterId) return;

        try {
          const parsed = JSON.parse(localStorage.getItem(storageKey));
          addHistoryRecord(historyMap, `${bookId}-${chapterId}`, parsed);
        } catch {
          // ignore corrupted local entries
        }
      });

      practicePrefixes.forEach(prefix => {
        if (!storageKey.startsWith(prefix)) return;
        const remainingKey = storageKey.slice(prefix.length);
        if (!remainingKey) return;

        const separatorIndex = remainingKey.indexOf('_');
        if (separatorIndex === -1) return;

        const setId = remainingKey.slice(0, separatorIndex);
        const sectionId = remainingKey.slice(separatorIndex + 1);
        if (!setId || !sectionId) return;

        try {
          const parsed = JSON.parse(localStorage.getItem(storageKey));
          addHistoryRecord(historyMap, `${setId}-${sectionId}`, parsed);
        } catch {
          // ignore corrupted local entries
        }
      });
    }
  } catch (storageError) {
    console.warn('Could not inspect cached attempt history:', storageError.message);
  }

  return historyMap;
};

const loadLocalHistory = (currentUser = null) => {
  const userKey = currentUser ? `userHistory_${currentUser.uid}` : null;
  const guestKey = 'userHistory_guest';

  const userSaved = userKey ? localStorage.getItem(userKey) : null;
  const guestSaved = localStorage.getItem(guestKey);

  const baseMap = userSaved
    ? JSON.parse(userSaved)
    : (guestSaved ? JSON.parse(guestSaved) : {});

  return mergeHistoryMaps(baseMap, loadCachedAttemptHistory(currentUser));
};

const getNihongoNoMoriProgress = (history) => {
  let completedSections = 0;
  let totalScore = 0;
  let totalPossible = 0;

  for (let chapterIndex = 1; chapterIndex <= 5; chapterIndex += 1) {
    const chapterId = `chapter-${chapterIndex}`;
    const chapterPrefix = `nihongo-no-mori-n3-${chapterId}-section-`;

    Object.entries(history).forEach(([quizId, record]) => {
      if (!quizId.startsWith(chapterPrefix)) return;
      const answered = getAnsweredCount(record);
      const targetQuestions = record?.total || 0;
      if ((targetQuestions > 0 && answered >= targetQuestions) || record?.status === 'mastered') {
        completedSections += 1;
      }
      totalScore += record?.score || 0;
      totalPossible += targetQuestions;
    });
  }

  const percent = NIHONGO_NO_MORI_SECTION_COUNT > 0
    ? Math.min(100, Math.round((completedSections / NIHONGO_NO_MORI_SECTION_COUNT) * 100))
    : 0;

  return {
    completed: completedSections,
    total: NIHONGO_NO_MORI_SECTION_COUNT,
    percent,
    score: totalScore,
    possible: totalPossible,
    label: `${completedSections}/${NIHONGO_NO_MORI_SECTION_COUNT} Sec`,
    totalQuestions: NIHONGO_NO_MORI_TOTAL_QUESTIONS,
  };
};

const getQuestionBasedProgress = (book, history) => {
  const config = QUESTION_PROGRESS_BOOKS[book.id];
  if (!config) return { completed: 0, total: 0, percent: 0 };

  if (book.id === N2_PRACTICE_BOOK_ID) {
    const attempts = readN2Attempts();
    let completedSets = 0;
    let totalScore = 0;
    let totalPossible = 0;

    for (let setNumber = 1; setNumber <= config.unitCount; setNumber += 1) {
      const vocabRecord = attempts[n2StorageKeyFor(setNumber, 'vocabulary-kanji')];
      const grammarRecord = attempts[n2StorageKeyFor(setNumber, 'grammar')];

      const vocabDone = vocabRecord?.score !== undefined;
      const grammarDone = grammarRecord?.score !== undefined;

      if (vocabDone && grammarDone) {
        completedSets += 1;
      }

      totalScore += (vocabRecord?.score || 0) + (grammarRecord?.score || 0);
      totalPossible += (vocabRecord?.total || 0) + (grammarRecord?.total || 0);
    }

    const percent = config.totalQuestions > 0
      ? Math.min(100, Math.round((totalPossible > 0 ? (totalScore / totalPossible) * 100 : 0)))
      : 0;

    return {
      completed: completedSets,
      total: config.unitCount,
      percent,
      label: `${completedSets}/${config.unitCount} Sets`,
      totalQuestions: config.totalQuestions,
    };
  }

  let answeredQuestions = 0;
  let masteredUnits = 0;

  for (let unitNumber = 1; unitNumber <= config.unitCount; unitNumber += 1) {
    const unitId = config.getUnitId(unitNumber);
    const unitKey = `${book.id}-${unitId}`;
    const sectionRecords = config.getSectionRecords(history, unitKey);

    const unitAnswered = sectionRecords.reduce((total, record) => (
      total + getAnsweredCount(record)
    ), 0);
    const unitAttempts = sectionRecords.reduce((total, record) => (
      total + getCombinedAttemptCount(record)
    ), 0);

    answeredQuestions += unitAnswered;
    if (unitAttempts > 0 || unitAnswered > 0) {
      masteredUnits += 1;
    }
  }

  const boundedAnswered = Math.min(config.totalQuestions, answeredQuestions);
  const percent = config.totalQuestions > 0
    ? Math.min(100, Math.round((boundedAnswered / config.totalQuestions) * 100))
    : 0;

  return {
    completed: boundedAnswered,
    total: config.totalQuestions,
    percent,
    label: `${boundedAnswered}/${config.totalQuestions} Qs`,
    masteredUnits,
    unitCount: config.unitCount,
  };
};

const BookListPage = () => {
  const { currentUser } = useAuth();
  const [books] = useState(STATIC_BOOKS);
  const [loading] = useState(false);
  const [error] = useState(null);
  const [history, setHistory] = useState(() => loadLocalHistory(currentUser));
  const [activeLevel, setActiveLevel] = useState('All');

  const gradients = [
    'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
    'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
    'linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)',
  ];

  useEffect(() => {
    setHistory(loadLocalHistory(currentUser));

    if (currentUser) {
      const historyColRef = collection(db, 'users', currentUser.uid, 'quizHistory');
      getDocs(historyColRef)
        .then(historySnap => {
          const userHistory = {};
          historySnap.forEach(docSnap => {
            const data = docSnap.data();
            if (data && (
              data.type === 'book'
              || data.bookId === N3_PRACTICE_BOOK_ID
              || data.bookId === N2_PRACTICE_BOOK_ID
              || data.quizId?.startsWith(N3_PRACTICE_BOOK_ID)
            )) {
              userHistory[data.quizId] = data;
            }
          });
          setHistory(currentHistory => {
            const mergedHistory = { ...currentHistory };
            Object.entries(userHistory).forEach(([quizId, record]) => {
              mergedHistory[quizId] = selectPreferredAttempt(mergedHistory[quizId], record);
            });
            return mergedHistory;
          });
        })
        .catch(err => {
          console.warn("Background progress fetch:", err);
        });
    }
  }, [currentUser]);

  const getBookProgress = (book) => {
    if (book.id === NIHONGO_NO_MORI_BOOK_ID) {
      return getNihongoNoMoriProgress(history);
    }

    if (QUESTION_PROGRESS_BOOKS[book.id]) {
      return getQuestionBasedProgress(book, history);
    }

    let completedCount = 0;
    
    Object.keys(history).forEach(key => {
      if (key.startsWith(`${book.id}-`)) {
        const item = history[key];
        if (item && (item.status === 'mastered' || item.status === 'completed' || (item.total > 0 && item.answered >= item.total))) {
          completedCount++;
        }
      }
    });

    if (!currentUser) {
      const guestPrefix = `book_quiz_guest_${book.id}_`;
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith(guestPrefix)) {
            completedCount++;
          }
        }
      } catch (storageError) {
        console.warn('Could not inspect cached book progress:', storageError.message);
      }
    }

    const total = book.totalChapters || 0;
    const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    return { completed: completedCount, total, percent };
  };

  if (loading) return <LoadingSpinner />;

  const bookCovers = {
    'shin-nihongo-500-n1': coverN1,
    'shin-nihongo-500-n2': coverN2,
    'shin-nihongo-500-n3': coverN3,
    'shin-nihongo-500-n4-n5': coverN4N5,
    'nihongo-power-drill-n1': powerDrillN1,
    'nihongo-power-drill-n2': powerDrillN2,
    'nihongo-power-drill-n3': powerDrillN3,
    'tango_n1': tangoN1Cover,
    'tango_n2': tangoN2Cover,
    'tango_n3': tangoN3Cover,
    'speed-master-n3-reading': `${import.meta.env.BASE_URL.replace(/\/$/, '')}/speed_master_n3_pages/speed_master_n3_page-0001.jpg`,
    'zenkamoku-n1-best-workbook': `${import.meta.env.BASE_URL.replace(/\/$/, '')}/images/zenkamoku_n1_cover.jpg`,
    'zenkamoku-n2-best-workbook': `${import.meta.env.BASE_URL.replace(/\/$/, '')}/images/zenkamoku_n2_cover.jpg`,
    'zenkamoku-n3-best-workbook': `${import.meta.env.BASE_URL.replace(/\/$/, '')}/images/zenkamoku_n3_cover.jpg`,
    'shinkanzen-master-n3-reading': `${import.meta.env.BASE_URL.replace(/\/$/, '')}/shinkanzen_n3_reading_cover.jpg`,
    'shinkanzen-master-n3-listening': `${import.meta.env.BASE_URL.replace(/\/$/, '')}/shinkanzen_n3_listening_cover.jpg`,
    'sou-matome-n3-reading': `${import.meta.env.BASE_URL.replace(/\/$/, '')}/sou_matome_n3_reading_cover.jpg`,
    'jlpt-n3-practice-sets': `${import.meta.env.BASE_URL.replace(/\/$/, '')}/n3_practice_sets_cover.jpg`,
    'chokuzen-taisaku-n4': `${import.meta.env.BASE_URL.replace(/\/$/, '')}/n4_chokuzen_taisaku_cover.jpg`,
  };

  const COVER_BOOK_NAMES = {
    'zenkamoku-n1-best-workbook': '全科目攻略 ベスト総合問題集 N1',
    'zenkamoku-n2-best-workbook': '全科目攻略 ベスト総合問題集 N2',
    'zenkamoku-n3-best-workbook': '全科目攻略 ベスト総合問題集 N3',
    'shin-nihongo-500-n1': '新にほんご500問 N1',
    'shin-nihongo-500-n2': '新にほんご500問 N2',
    'shin-nihongo-500-n3': '新にほんご500問 N3',
    'shin-nihongo-500-n4-n5': '新にほんご500問 N4-N5',
    'shinkanzen-master-n3-reading': '新完全マスター 読解 N3',
    'shinkanzen-master-n3-listening': '新完全マスター 聴解 N3',
    'speed-master-n3-reading': '日本語スピードマスター 読解 N3',
    'sou-matome-n3-reading': '日本語総まとめ 読解 N3',
    'nihongo-power-drill-n1': '日本語パワードリル N1',
    'nihongo-power-drill-n2': '日本語パワードリル N2',
    'nihongo-power-drill-n3': '日本語パワードリル N3',
    'tango_n1': '日本語能力試験 N1 単語 3000',
    'tango_n2': '日本語能力試験 N2 単語 2500',
    'tango_n3': '日本語能力試験 N3 単語 2000',
    'jlpt-n3-practice-sets': '直前対策 N3 (15 Sets)',
    'chokuzen-taisaku-n4': '直前対策 N4 (15 Sets)',
  };

  const getBookCover = (book) => {
    if (!book) return null;
    if (bookCovers[book.id]) return bookCovers[book.id];
    if (book.coverUrl) {
      return book.coverUrl.startsWith('http') || book.coverUrl.startsWith('data:')
        ? book.coverUrl
        : `${import.meta.env.BASE_URL.replace(/\/$/, '')}${book.coverUrl.startsWith('/') ? '' : '/'}${book.coverUrl}`;
    }
    if (book.coverImage) {
      return book.coverImage.startsWith('http') || book.coverImage.startsWith('data:')
        ? book.coverImage
        : `${import.meta.env.BASE_URL.replace(/\/$/, '')}${book.coverImage.startsWith('/') ? '' : '/'}${book.coverImage}`;
    }
    return null;
  };

  const filteredBooks = books.filter(b => {
    if (activeLevel === 'All') return true;
    if (activeLevel === 'N4-N5') return b.level === 'N4' || b.level === 'N5' || b.level === 'N4-N5';
    if (activeLevel === 'N4') return b.level === 'N4' || b.level === 'N4-N5';
    return b.level === activeLevel;
  });

  return (
    <div className="books-list-container max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-6 sm:py-8 md:py-12">
      <div className="books-header text-center mb-8 sm:mb-10">
        <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3">
          Authentic Book Collections & Practice Sets
        </div>
        <h1 className="books-title text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
          Japanese Book Collections
        </h1>
        <p className="books-subtitle text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal">
          Chapter-based reading, listening, and grammar quizzes curated from standard textbooks, official-style mock sets, and drill series.
        </p>
      </div>

      <div className="filter-pills-container flex justify-center items-center gap-2 flex-wrap mb-8 sm:mb-10">
        {['All', 'N1', 'N2', 'N3', 'N4-N5'].map(level => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            className={`filter-pill-btn ${activeLevel === level ? 'active' : ''}`}
          >
            {level === 'N4-N5' ? 'N4/N5' : level}
          </button>
        ))}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-7 2xl:gap-8">
        {filteredBooks.map((book, index) => {
          const progress = getBookProgress(book);
          const coverImg = getBookCover(book);
          const gradient = gradients[index % gradients.length];
          const displayName = COVER_BOOK_NAMES[book.id] || book.title;

          return (
            <div
              key={book.id}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border bg-slate-900 shadow-md hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between min-h-[420px] sm:min-h-[460px] aspect-[3/4.2]"
            >
              {/* 1. Full Image in Background */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {coverImg ? (
                  <img
                    src={coverImg}
                    alt={displayName}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top filter brightness-[0.95] contrast-[1.05] transition-all duration-500 ease-out"
                  />
                ) : (
                  <div className="w-full h-full" style={{ background: gradient }} />
                )}

                {/* Scrim: bottom ~40% dark for readability, top ~60% fully visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 via-40% to-transparent" />
              </div>

              {/* 2. Top Bar: Level Badge at Top Right */}
              <div className="relative z-10 p-4 sm:p-5 flex items-center justify-end">
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-slate-900/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-md shadow-xs">
                  {book.level}
                </span>
              </div>

              {/* 3. Bottom Card Content */}
              <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end">
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-3 drop-shadow-md group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {displayName}
                </h2>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-slate-200">
                      {progress.label || 'Completed'}
                    </span>
                    <span className="font-mono text-sm font-bold text-emerald-400">
                      {progress.percent}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950/80 overflow-hidden border border-white/10">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${progress.percent}%` }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to={book.customRoute || `/books/${book.id}`}
                  state={{ from: 'books' }}
                  className="w-full py-3 px-5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-950/40 transition-colors cursor-pointer group/btn"
                >
                  <span>{progress.percent > 0 ? 'Continue' : 'Start Reading'}</span>
                  <svg className="w-4 h-4 shrink-0 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookListPage;
