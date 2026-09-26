// src/components/BookListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { collection, getDocs } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import { STATIC_BOOKS } from '../data/static_books_catalog.js';

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

const BookListPage = () => {
  const { currentUser } = useAuth();
  const [books, setBooks] = useState(STATIC_BOOKS);
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [activeLevel, setActiveLevel] = useState('All');


  // Cover gradient mapping based on book level/index to look premium
  const gradients = [
    'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', // Deep Blue
    'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', // Slate Gray
    'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', // Teal/Green
    'linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)', // Purple/Sunset
    'linear-gradient(135deg, #8a2387 0%, #e94057 50%, #f27121 100%)', // Red/Orange
    'linear-gradient(135deg, #b8860b 0%, #c0392b 50%, #8b0000 100%)', // Gold/Crimson (N1)
  ];

  useEffect(() => {
    // 1. Fetch user history in background asynchronously without blocking UI
    if (currentUser) {
      const historyColRef = collection(db, 'users', currentUser.uid, 'quizHistory');
      getDocs(historyColRef)
        .then(historySnap => {
          const userHistory = {};
          historySnap.forEach(docSnap => {
            const data = docSnap.data();
            if (data && data.type === 'book') {
              userHistory[data.quizId] = data;
            }
          });
          setHistory(userHistory);
        })
        .catch(err => {
          console.warn("Background progress fetch:", err);
        });
    }
  }, [currentUser]);



  const getBookProgress = (book) => {
    let completedCount = 0;
    
    // Count directly from the user history hash map
    Object.keys(history).forEach(key => {
      if (key.startsWith(`${book.id}-`)) {
        const item = history[key];
        if (item && (item.status === 'mastered' || item.status === 'completed' || (item.total > 0 && item.answered >= item.total))) {
          completedCount++;
        }
      }
    });

    // Also check local storage for unauthenticated / cached progress
    if (!currentUser) {
      const guestPrefix = `book_quiz_guest_${book.id}_`;
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith(guestPrefix)) {
            completedCount++;
          }
        }
      } catch (e) {}
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
    <div className="books-list-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="books-header text-center mb-10">
        <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-purple-500/10 border border-emerald-500/30 dark:border-purple-500/30 text-emerald-700 dark:text-purple-300 text-xs font-black uppercase mb-3 shadow-xs">
          Authentic Book Collections & Practice Sets
        </div>
        <h1 className="books-title text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
          Japanese Book Collections
        </h1>
        <p className="books-subtitle text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium">
          Chapter-based reading, listening, and grammar quizzes curated from standard textbooks, official-style mock sets, and drill series.
        </p>
      </div>

      <div className="filter-pills-container flex justify-center items-center gap-2 flex-wrap mb-10">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
        {filteredBooks.map((book, index) => {
          const progress = getBookProgress(book);
          const coverImg = getBookCover(book);
          const gradient = gradients[index % gradients.length];
          const displayName = COVER_BOOK_NAMES[book.id] || book.title;

          return (
            <div
              key={book.id}
              className="group relative rounded-3xl overflow-hidden border border-gray-200/80 dark:border-white/10 bg-slate-900 shadow-lg hover:shadow-2xl hover:border-emerald-500/60 dark:hover:border-purple-500/50 transition-all duration-500 flex flex-col justify-between min-h-[460px] aspect-[3/4.2]"
            >
              {/* 1. Full Image in Background (Extended & Visible) */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {coverImg ? (
                  <img
                    src={coverImg}
                    alt={displayName}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top filter brightness-[0.95] contrast-[1.05] transform group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full" style={{ background: gradient }} />
                )}

                {/* Scrim: bottom ~35% dark for readability, top ~65% fully visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 via-35% to-transparent transition-colors duration-500" />
              </div>

              {/* 2. Top Bar: Level Badge at Top Right (Capsule Pill) with Mode-Adaptive Colors */}
              <div className="relative z-10 p-4 sm:p-5 flex items-center justify-end">
                <span className="px-3.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider leading-relaxed shadow-md backdrop-blur-md transition-all duration-300 bg-white/95 text-emerald-800 border-2 border-emerald-500/80 dark:bg-purple-950/95 dark:text-purple-200 dark:border-purple-400 dark:shadow-[0_0_12px_rgba(168,85,247,0.35)] group-hover:scale-105">
                  {book.level}
                </span>
              </div>

              {/* 3. Bottom Card Content (Brought to front) */}
              <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end">
                {/* Book Name from cover: turns green in light mode, purple in dark mode on hover */}
                <h2 className="text-xl sm:text-2xl font-black text-white leading-snug mb-3.5 drop-shadow-md group-hover:text-emerald-400 dark:group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                  {displayName}
                </h2>

                {/* Simple % Progress Bar: Completed label with increased boldness and size, turns green/purple on hover */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm sm:text-base font-black text-gray-200 group-hover:text-emerald-300 dark:group-hover:text-purple-300 transition-colors duration-300 tracking-wide">
                      Completed
                    </span>
                    <span className="font-mono text-base sm:text-lg font-black text-emerald-400 dark:text-purple-400 group-hover:text-emerald-300 dark:group-hover:text-purple-300 group-hover:scale-105 transition-all duration-300">
                      {progress.percent}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-black/60 overflow-hidden p-[1px] border border-white/15 group-hover:border-emerald-500/50 dark:group-hover:border-purple-500/50 backdrop-blur-xs transition-colors duration-300">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 dark:from-purple-500 dark:via-indigo-400 dark:to-purple-300 group-hover:from-emerald-400 group-hover:via-emerald-300 group-hover:to-teal-200 dark:group-hover:from-purple-400 dark:group-hover:via-fuchsia-400 dark:group-hover:to-indigo-300 group-hover:shadow-[0_0_12px_rgba(52,211,153,0.7)] dark:group-hover:shadow-[0_0_12px_rgba(192,132,252,0.7)] transition-all duration-500"
                      style={{ width: `${progress.percent}%` }}
                    />
                  </div>
                </div>

                {/* Action Button (Brought directly to front: Emerald/Teal in light mode, Purple/Indigo gradient in dark mode) */}
                <Link
                  to={book.customRoute || `/books/${book.id}`}
                  state={{ from: 'books' }}
                  className="w-full py-3.5 px-5 rounded-2xl font-black text-sm text-white flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-purple-600 dark:to-indigo-600 hover:from-emerald-500 hover:to-teal-500 dark:hover:from-purple-500 dark:hover:to-indigo-500 active:scale-[0.98] shadow-lg shadow-emerald-950/50 dark:shadow-purple-950/50 hover:shadow-emerald-500/30 dark:hover:shadow-purple-500/30 transition-all duration-200 cursor-pointer group/btn"
                >
                  <span>{progress.percent > 0 ? 'Continue' : 'Start Reading'}</span>
                  <span className="transform group-hover/btn:translate-x-1.5 transition-transform duration-200 font-bold">→</span>
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
