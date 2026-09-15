import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext.jsx';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import '../assets/n4_practice_sets.css';

const MOTIVATIONAL_QUOTES = [
  { jp: '継続は力なり。', en: 'Continuity is power. Every question brings you closer to N4 mastery.' },
  { jp: '一歩一歩、確実に。', en: 'Step by step, steadily. Conquer one mock test at a time.' },
  { jp: '夢をかなえる努力を。', en: 'Effort turns ambition into reality. You are fully capable of passing!' },
  { jp: '直前対策で合格を掴む！', en: 'Master the high-yield patterns in these 10 mock sets for test-day confidence.' }
];

const N4PracticeSetsListPage = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const isFromProfile = location.state?.from === 'profile';
  const [bookData, setBookData] = useState(null);
  const [userHistory, setUserHistory] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const randomQuote = useMemo(() => {
    return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
  }, []);

  useEffect(() => {
    const fetchBookAndHistory = async () => {
      try {
        const docRef = doc(db, 'books', 'chokuzen-taisaku-n4');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBookData(docSnap.data());
        }

        if (currentUser) {
          const historyColRef = collection(db, 'users', currentUser.uid, 'quizHistory');
          const historySnap = await getDocs(historyColRef);
          const historyMap = {};
          historySnap.forEach(d => {
            const data = d.data();
            const qid = data.quizId || d.id;
            if (qid.startsWith('chokuzen-taisaku-n4')) {
              historyMap[qid] = data;
            }
          });
          setUserHistory(historyMap);
        }
      } catch (err) {
        console.error('Error fetching N4 practice sets from Firestore:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookAndHistory();
  }, [currentUser]);

  if (loading) return <LoadingSpinner />;

  const sets = bookData?.sets || [];
  const totalSets = sets.length || 10;
  const totalQuestions = sets.reduce((acc, s) => {
    const v = s.sections?.['vocabulary-kanji']?.questions?.length || 0;
    const g = s.sections?.['grammar-reading']?.questions?.length || 0;
    return acc + v + g;
  }, 0) || 590;

  const completedSetsCount = sets.reduce((acc, set) => {
    const fullKey = `chokuzen-taisaku-n4-${set.id}`;
    const vocabKey = `chokuzen-taisaku-n4-${set.id}-vocabulary-kanji`;
    const grammarKey = `chokuzen-taisaku-n4-${set.id}-grammar`;
    const item = userHistory[fullKey] || userHistory[vocabKey] || userHistory[grammarKey];
    if (item && (item.status === 'mastered' || (item.total > 0 && item.score / item.total >= 0.8))) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const filteredSets = sets.filter((s, idx) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.title?.toLowerCase().includes(q) ||
      s.description?.toLowerCase().includes(q) ||
      `set ${idx + 1}`.includes(q) ||
      `第${idx + 1}回`.includes(q)
    );
  });

  return (
    <div className="n4-practice-container">
      {/* Breadcrumb */}
      {!isFromProfile && (
        <nav aria-label="Breadcrumb" className="n4-breadcrumb">
          <Link to="/">Home</Link>
          <span className="separator">/</span>
          <Link to="/books">Books</Link>
          <span className="separator">/</span>
          <span className="current">直前対策 JLPT N4</span>
        </nav>
      )}

      {/* Modern Hero Shell */}
      <div className="n4-hero-shell">
        <div className="n4-hero-ambient-glow" />
        <div className="n4-hero-ambient-glow-2" />

        <div className="n4-hero-layout">
          <div className="n4-hero-cover-frame">
            <img
              src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/n4_chokuzen_taisaku_cover.jpg`}
              alt="Chokuzen Taisaku JLPT N4"
            />
          </div>

          <div className="n4-hero-info">
            <div className="n4-pill-container">
              <span className="n4-pill-level">JLPT N4</span>
              <span className="n4-pill-soft">{totalSets} Mock Sets</span>
              <span className="n4-pill-soft">{totalQuestions} Questions</span>
              <span className="n4-pill-kanji">直前対策</span>
            </div>

            <h1 className="n4-hero-heading">日本語能力試験 直前対策 N4</h1>
            <p className="n4-hero-subheading">
              Intensive last-minute preparation for JLPT N4. Master Kanji readings, context vocabulary, sentence unscrambles (★), and short reading passages across 10 official-format mock exams.
            </p>

            {/* Motivational Quote Bar */}
            <div className="n4-motivation-bar">
              <span className="fire-icon">🔥</span>
              <div>
                <strong>{randomQuote.jp}</strong> — <span className="opacity-90">{randomQuote.en}</span>
              </div>
            </div>

            {/* Meta Grid */}
            <div className="n4-stat-grid">
              <div className="n4-stat-box">
                <span className="n4-stat-icon">🈸</span>
                <div>
                  <div className="n4-stat-label">文字・語彙</div>
                  <div className="n4-stat-value">34 Qs / Set (30m)</div>
                </div>
              </div>

              <div className="n4-stat-box">
                <span className="n4-stat-icon">⛩️</span>
                <div>
                  <div className="n4-stat-label">文法・読解</div>
                  <div className="n4-stat-value">25 Qs / Set (35m)</div>
                </div>
              </div>

              <div className="n4-stat-box">
                <span className="n4-stat-icon">🎯</span>
                <div>
                  <div className="n4-stat-label">Pass Target</div>
                  <div className="n4-stat-value">90 / 180 Pts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sets Header & Search Bar */}
      <div className="n4-section-title-wrap">
        <h2 className="n4-section-title">
          <span className="diamond">◆</span> All {totalSets} Practice Tests (第1回 〜 第10回)
        </h2>

        <div className="relative min-w-[240px]">
          <input
            type="text"
            placeholder="Search sets (e.g. Set 1, 第2回)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'var(--n4-search-bg)',
              borderColor: 'var(--n4-search-border)',
              color: 'var(--n4-text-main)'
            }}
            className="w-full border focus:border-orange-500 rounded-xl px-4 py-2 text-sm placeholder:opacity-60 outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Sets Grid */}
      <div className="n4-cards-grid">
        {filteredSets.map((set, idx) => {
          const vocabQCount = set.sections?.['vocabulary-kanji']?.questions?.length || 34;
          const grammarQCount = set.sections?.['grammar-reading']?.questions?.length || 25;
          const setTotal = vocabQCount + grammarQCount;
          const setNum = parseInt(set.id?.replace(/\D/g, '')) || (idx + 1);

          const fullKey = `chokuzen-taisaku-n4-${set.id}`;
          const vocabKey = `chokuzen-taisaku-n4-${set.id}-vocabulary-kanji`;
          const grammarKey = `chokuzen-taisaku-n4-${set.id}-grammar`;
          const historyItem = userHistory[fullKey] || userHistory[vocabKey] || userHistory[grammarKey];
          const isMastered = historyItem && (historyItem.status === 'mastered' || (historyItem.total > 0 && historyItem.score / historyItem.total >= 0.8));
          const isAttempted = Boolean(historyItem);

          return (
            <div key={set.id || idx} className={`n4-modern-card ${isMastered ? 'ring-2 ring-emerald-500/50' : ''}`}>
              <div className="n4-card-top">
                <div className="n4-card-set-badge">
                  <span className="n4-kanji-num">{isMastered ? '🏆 第' : '第'}{setNum}回</span>
                  <span className="n4-en-set">Set {setNum}</span>
                </div>
                <div className="flex items-center gap-2">
                  {historyItem && (
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${isMastered ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'}`}>
                      {historyItem.score}/{historyItem.total} ({Math.round((historyItem.score / historyItem.total) * 100)}%)
                    </span>
                  )}
                  <span className="n4-card-q-badge">{setTotal} Questions</span>
                </div>
              </div>

              <div className="n4-card-rows">
                <div className="n4-card-row">
                  <span>🈸 言語知識 (文字・語彙)</span>
                  <span className="font-bold text-orange-300">{vocabQCount} 問</span>
                </div>
                <div className="n4-card-row">
                  <span>⛩️ 文法・読解</span>
                  <span className="font-bold text-amber-300">{grammarQCount} 問</span>
                </div>
              </div>

              <Link to={`/chokuzen-taisaku-n4/${set.id}`} className="n4-card-btn">
                {isMastered ? 'Review Set' : isAttempted ? 'Continue Set' : `Practice Set ${setNum}`} &rarr;
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default N4PracticeSetsListPage;
