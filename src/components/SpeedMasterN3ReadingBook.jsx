// src/components/SpeedMasterN3ReadingBook.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import '../assets/speed_master_book.css';

// Eagerly load all local Speed Master JSON files in data/speed_master_n3_reading/
const localModules = import.meta.glob('../data/speed_master_n3_reading/*.json', { eager: true });

// Helper to resolve public assets under the app base URL (e.g. /nihongo_playground/)
export const resolveAssetUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${baseUrl}${cleanPath}`;
};

// Pre-defined static chapter structure for Speed Master N3 Dokkai (64 units total)
export const SPEED_MASTER_CHAPTERS = [
  // Part 1: 短文 (1-20)
  ...Array.from({ length: 20 }, (_, i) => {
    const num = i + 1;
    const pageNum = 25 + num;
    return {
      id: `short-${num}`,
      part: 1,
      partTitle: '第1部：実戦練習',
      partTitleEn: 'Practice Exercises',
      section: '内容理解（短文）',
      sectionEn: 'Short Passages',
      targetMinutes: 3,
      pageScan: `/speed_master_n3_pages/speed_master_n3_page-${String(pageNum).padStart(4, '0')}.jpg`,
      title: `問題 ${num}（短文）`,
      number: num,
      category: 'short'
    };
  }),
  // Part 1: 中文 (1-16)
  ...Array.from({ length: 16 }, (_, i) => {
    const num = i + 1;
    return {
      id: `medium-${num}`,
      part: 1,
      partTitle: '第1部：実戦練習',
      partTitleEn: 'Practice Exercises',
      section: '内容理解（中文）',
      sectionEn: 'Medium Passages',
      targetMinutes: 7,
      title: `問題 ${num}（中文）`,
      number: num,
      category: 'medium'
    };
  }),
  // Part 1: 長文 (1-12)
  ...Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    return {
      id: `long-${num}`,
      part: 1,
      partTitle: '第1部：実戦練習',
      partTitleEn: 'Practice Exercises',
      section: '内容理解（長文）',
      sectionEn: 'Long Passages',
      targetMinutes: 10,
      title: `問題 ${num}（長文）`,
      number: num,
      category: 'long'
    };
  }),
  // Part 1: 情報検索 (1-15)
  ...Array.from({ length: 15 }, (_, i) => {
    const num = i + 1;
    return {
      id: `search-${num}`,
      part: 1,
      partTitle: '第1部：実戦練習',
      partTitleEn: 'Practice Exercises',
      section: '情報検索',
      sectionEn: 'Information Retrieval',
      targetMinutes: 8,
      title: `問題 ${num}（情報検索）`,
      number: num,
      category: 'search'
    };
  }),
  // Part 2: 模擬試験 (1)
  {
    id: 'mock-exam',
    part: 2,
    partTitle: '第2部：模擬試験',
    partTitleEn: 'Mock Examination',
    section: '模擬試験',
    sectionEn: 'Full Mock Exam (70 min)',
    targetMinutes: 70,
    title: '模擬試験（本番形式 16問）',
    number: 1,
    category: 'mock'
  }
];

const SECTION_TABS = [
  { key: 'all', label: 'All (全64題)' },
  { key: 'short', label: '短文 (1–20)' },
  { key: 'medium', label: '中文 (1–16)' },
  { key: 'long', label: '長文 (1–12)' },
  { key: 'search', label: '情報検索 (1–15)' },
  { key: 'mock', label: '模擬試験 (70分)' }
];

const SpeedMasterN3ReadingBook = () => {
  const { chapterId = 'short-1' } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Settings & Display States (Global Theme synced with top navbar)
  const { theme } = useTheme();
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('speed_master_font_size') || 'normal');
  const [showVocab, setShowVocab] = useState(true);
  const [showScanModal, setShowScanModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  // Timer States
  const [timerMode, setTimerMode] = useState('countdown'); // 'countdown' | 'countup'
  const [timerSeconds, setTimerSeconds] = useState(180);
  const [timerRunning, setTimerRunning] = useState(false);

  // Answering & Exam Modes
  const isMock = chapterId === 'mock-exam';
  const [examMode, setExamMode] = useState(isMock);
  const [mockViewMode, setMockViewMode] = useState('focus'); // 'focus' | 'full'
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);

  // Chapter lookup
  const currentChapterIndex = SPEED_MASTER_CHAPTERS.findIndex(c => c.id === chapterId);
  const currentChapter = SPEED_MASTER_CHAPTERS[currentChapterIndex] || SPEED_MASTER_CHAPTERS[0];
  const prevChapter = currentChapterIndex > 0 ? SPEED_MASTER_CHAPTERS[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex >= 0 && currentChapterIndex < SPEED_MASTER_CHAPTERS.length - 1 ? SPEED_MASTER_CHAPTERS[currentChapterIndex + 1] : null;

  // Filter Tab state synced with active chapter category
  const [activeTab, setActiveTab] = useState(currentChapter.category || 'all');

  // Keep activeTab in sync when changing chapters
  useEffect(() => {
    if (currentChapter.category && activeTab !== 'all') {
      setActiveTab(currentChapter.category);
    }
  }, [chapterId, currentChapter.category]);

  // Persist font size
  useEffect(() => {
    localStorage.setItem('speed_master_font_size', fontSize);
  }, [fontSize]);

  // Load Chapter Data & Reset States
  useEffect(() => {
    setLoading(true);
    setError(null);
    setAnswers({});
    setRevealed({});
    setSubmitted(false);
    setShowScoreModal(false);
    setActiveQuestionIdx(0);

    const isCurrentMock = chapterId === 'mock-exam';
    setExamMode(isCurrentMock);

    // Reset timer to chapter target
    const targetMins = currentChapter.targetMinutes || 3;
    setTimerSeconds(targetMins * 60);
    setTimerRunning(false);
    setTimerMode('countdown');

    try {
      const matchedKey = Object.keys(localModules).find(k => k.endsWith(`/${chapterId}.json`));
      if (matchedKey && localModules[matchedKey]) {
        const loaded = localModules[matchedKey].default || localModules[matchedKey];
        setData(loaded);
        setLoading(false);
        return;
      }
      setData(null);
      setError(`Content for "${chapterId}" is being prepared.`);
    } catch (err) {
      console.error("Error loading chapter:", err);
      setError(err.message || "Failed to load chapter content.");
    } finally {
      setLoading(false);
    }
  }, [chapterId]);

  // Timer Tick Mechanism (Supports Count-Up and Countdown with Overtime Tracking)
  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => {
          if (timerMode === 'countup') {
            return s + 1;
          } else {
            return s - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerMode]);

  // Keyboard Navigation & Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'n') {
        if (nextChapter) navigate(`/books/speed-master-n3-reading/chapters/${nextChapter.id}`);
      } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'p') {
        if (prevChapter) navigate(`/books/speed-master-n3-reading/chapters/${prevChapter.id}`);
      } else if (e.key === ' ' && !e.target.closest('button')) {
        e.preventDefault();
        setTimerRunning(r => !r);
      } else if (e.key === 'Escape') {
        setShowScanModal(false);
        setShowScoreModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevChapter, nextChapter]);

  // Format Timer String
  const formatTimer = (secs) => {
    const isNegative = secs < 0;
    const absSecs = Math.abs(secs);
    const m = Math.floor(absSecs / 60);
    const s = absSecs % 60;
    const formatted = `${m}:${String(s).padStart(2, '0')}`;
    return isNegative ? `-${formatted}` : formatted;
  };

  // Option Click Handler
  const handleOptionClick = (qIdx, optionNum) => {
    const key = `q-${qIdx}`;
    if (revealed[key] && !examMode) return;

    setAnswers(prev => ({ ...prev, [key]: optionNum }));

    // In Instant Mode, reveal immediately
    if (!examMode) {
      setRevealed(prev => ({ ...prev, [key]: true }));
    }
  };

  // Submit All Answers (Exam Mode)
  const handleSubmitExam = () => {
    if (!data?.questions) return;
    const newRevealed = {};
    data.questions.forEach((_, idx) => {
      newRevealed[`q-${idx}`] = true;
    });
    setRevealed(newRevealed);
    setSubmitted(true);
    setTimerRunning(false);
    setShowScoreModal(true);
  };

  // Reset Answers for Retry
  const handleResetAnswers = () => {
    setAnswers({});
    setRevealed({});
    setSubmitted(false);
    setShowScoreModal(false);
    const targetMins = currentChapter.targetMinutes || 3;
    setTimerSeconds(targetMins * 60);
    setTimerRunning(false);
  };

  // Calculate Scores
  const questionsList = data?.questions || [];
  const totalQuestions = questionsList.length;
  const answeredCount = Object.keys(answers).length;

  const correctCount = useMemo(() => {
    return questionsList.reduce((acc, q, idx) => {
      const userAns = answers[`q-${idx}`];
      return userAns === q.correct ? acc + 1 : acc;
    }, 0);
  }, [questionsList, answers]);

  const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Mock Exam Section Breakdown Calculation
  const mockBreakdown = useMemo(() => {
    if (!isMock || !data?.questions) return null;
    const sections = {
      short: { title: '短文 (Q1–Q4)', range: [0, 3], correct: 0, total: 4 },
      medium: { title: '中文 (Q5–Q10)', range: [4, 9], correct: 0, total: 6 },
      long: { title: '長文 (Q11–Q14)', range: [10, 13], correct: 0, total: 4 },
      search: { title: '情報検索 (Q15–Q16)', range: [14, 15], correct: 0, total: 2 }
    };

    data.questions.forEach((q, idx) => {
      const userAns = answers[`q-${idx}`];
      const isCorrect = userAns === q.correct;
      if (idx <= 3) { if (isCorrect) sections.short.correct++; }
      else if (idx <= 9) { if (isCorrect) sections.medium.correct++; }
      else if (idx <= 13) { if (isCorrect) sections.long.correct++; }
      else { if (isCorrect) sections.search.correct++; }
    });

    return sections;
  }, [isMock, data, answers]);

  // Timer Status Color
  const targetSecs = (currentChapter.targetMinutes || 3) * 60;
  const isOvertime = timerMode === 'countdown' && timerSeconds < 0;
  const isWarning = timerMode === 'countdown' && timerSeconds >= 0 && timerSeconds <= Math.min(60, targetSecs * 0.2);

  const currentScanUrl = resolveAssetUrl(data?.imageSrc || currentChapter?.pageScan);

  // Render Question Card Helper
  const renderQuestionCard = (currentQ, qIdx, showNav = false, isSingleView = false) => {
    if (!currentQ) return null;
    const key = `q-${qIdx}`;
    const userAns = answers[key];
    const isRevealed = revealed[key];
    const isCorrect = userAns === currentQ.correct;
    const isAnswered = !!userAns;

    let cardStatusClass = '';
    if (isRevealed) {
      cardStatusClass = isCorrect ? 'correct' : 'wrong';
    } else if (isAnswered) {
      cardStatusClass = 'answered';
    }

    return (
      <div className="speed-master-q-container" key={qIdx}>
        <div id={`question-card-${qIdx}`} className={`speed-master-q-card ${cardStatusClass}`}>
          {/* Question Header with Optional Top-Right Next/Back Navigation */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-start gap-3 flex-1">
              <span className="speed-master-q-num">
                {currentQ.questionNumber || (qIdx + 1)}
              </span>
              <div 
                className="speed-master-q-text pt-0.5"
                dangerouslySetInnerHTML={{ __html: currentQ.questionText }}
              />
            </div>

            {/* Simple Top-Right Next/Back Arrows (When navigation enabled) */}
            {showNav && totalQuestions > 1 && (
              <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                <span className="text-xs font-bold text-[var(--sm-text-muted)] mr-1">
                  {activeQuestionIdx + 1} / {totalQuestions}
                </span>
                <button
                  onClick={() => setActiveQuestionIdx(prev => Math.max(0, prev - 1))}
                  disabled={activeQuestionIdx === 0}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--sm-border)] bg-[var(--sm-card-alt-bg)] hover:bg-[var(--sm-option-hover)] text-[var(--sm-text-primary)] disabled:opacity-25 disabled:cursor-not-allowed transition font-bold cursor-pointer"
                  title="前の問題 (Previous Question)"
                >
                  ◀
                </button>
                <button
                  onClick={() => setActiveQuestionIdx(prev => Math.min(totalQuestions - 1, prev + 1))}
                  disabled={activeQuestionIdx === totalQuestions - 1}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--sm-border)] bg-[var(--sm-card-alt-bg)] hover:bg-[var(--sm-option-hover)] text-[var(--sm-text-primary)] disabled:opacity-25 disabled:cursor-not-allowed transition font-bold cursor-pointer"
                  title="次の問題 (Next Question)"
                >
                  ▶
                </button>
              </div>
            )}
          </div>

          {/* Options List */}
          <div className="space-y-2 mb-4">
            {currentQ.options.map((opt, optIdx) => {
              const optNum = optIdx + 1;
              let btnClass = '';
              if (isRevealed) {
                if (optNum === currentQ.correct) {
                  btnClass = 'selected-correct font-semibold';
                } else if (userAns === optNum) {
                  btnClass = 'selected-wrong';
                }
              } else if (userAns === optNum) {
                btnClass = 'selected-exam font-semibold';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleOptionClick(qIdx, optNum)}
                  disabled={isRevealed && !examMode}
                  className={`speed-master-option-btn ${btnClass}`}
                >
                  <span className="speed-master-opt-num">
                    {optNum}
                  </span>
                  <span 
                    className="flex-1"
                    dangerouslySetInnerHTML={{ __html: opt }}
                  />
                  {isRevealed && optNum === currentQ.correct && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm shrink-0">✓ 正解</span>
                  )}
                  {isRevealed && userAns === optNum && optNum !== currentQ.correct && (
                    <span className="text-red-500 dark:text-red-400 font-bold text-sm shrink-0">✗ 不正解</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isRevealed && (
            <div className={`speed-master-explanation ${isCorrect ? 'correct' : 'wrong'}`}>
              <div className="speed-master-explanation-title">
                <span>{isCorrect ? '🎉 Excellent! (正解)' : '💡 Explanation (解説)'}</span>
                <span className="speed-master-explanation-badge">
                  Correct: Option {currentQ.correct}
                </span>
              </div>
              <div 
                className="speed-master-explanation-body"
                dangerouslySetInnerHTML={{ __html: currentQ.explanation }} 
              />
            </div>
          )}

          {/* Exam Mode Submit Button inside Card (for Single View) */}
          {examMode && !submitted && isSingleView && (
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--sm-border)]">
              <span className="text-xs font-bold text-[var(--sm-text-secondary)]">
                回答状況: {answeredCount} / {totalQuestions} 問完了
              </span>
              <button
                onClick={handleSubmitExam}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow transition cursor-pointer"
              >
                採点する (Submit & Grade) ✓
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`speed-master-page theme-${theme} font-size-${fontSize}`}>
      <main className="max-w-5xl mx-auto px-4 py-6">
        
        {/* Top Breadcrumb & Section Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 text-sm">
          <nav className="speed-master-breadcrumb">
            <Link to="/books">Books</Link>
            <span>/</span>
            <Link to="/books/speed-master-n3-reading">Speed Master N3</Link>
            <span>/</span>
            <span className="speed-master-breadcrumb-current">{currentChapter.title}</span>
          </nav>

          {/* Quick Filter Section Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {SECTION_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  if (tab.key !== 'all') {
                    const firstInTab = SPEED_MASTER_CHAPTERS.find(c => c.category === tab.key);
                    if (firstInTab && firstInTab.id !== chapterId) {
                      navigate(`/books/speed-master-n3-reading/chapters/${firstInTab.id}`);
                    }
                  }
                }}
                className={`speed-master-tab ${
                  (activeTab === tab.key || (tab.key === currentChapter.category && activeTab === 'all')) ? 'active' : ''
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Speed Master Header Banner */}
        <div className="speed-master-header-banner">
          <div className="flex items-center gap-3">
            <span className="speed-master-badge">JLPT N3</span>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>{data?.section || currentChapter.section}</span>
                <span className="text-emerald-100 text-sm font-medium">({data?.title || currentChapter.title})</span>
              </h1>
              <p className="text-xs md:text-sm text-emerald-50 opacity-90 mt-0.5">
                {data?.partTitle || currentChapter.partTitle} • {data?.partTitleEn || currentChapter.partTitleEn}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
            {/* Target Time Info */}
            <span className="speed-master-mode-pill">
              ⏱ 目安：{currentChapter.targetMinutes}分
            </span>

            {/* Target Timer Widget */}
            <div className={`speed-master-timer-badge ${isOvertime ? 'timer-overtime' : isWarning ? 'timer-warning' : ''}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formatTimer(timerSeconds)}</span>
              {isOvertime && <span className="text-[10px] uppercase font-black bg-black/30 px-1 py-0.5 rounded">Overtime</span>}

              {/* Timer Controls */}
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="ml-1 px-2 py-0.5 bg-white/20 hover:bg-white/30 rounded text-xs transition"
                title={timerRunning ? "Pause Timer (Space)" : "Start Timer (Space)"}
              >
                {timerRunning ? "⏸" : "▶"}
              </button>
              <button
                onClick={() => {
                  setTimerRunning(false);
                  setTimerSeconds(timerMode === 'countdown' ? targetSecs : 0);
                }}
                className="px-1.5 py-0.5 bg-white/20 hover:bg-white/30 rounded text-xs transition"
                title="Reset Timer"
              >
                ↺
              </button>
              <button
                onClick={() => {
                  const newMode = timerMode === 'countdown' ? 'countup' : 'countdown';
                  setTimerMode(newMode);
                  setTimerSeconds(newMode === 'countdown' ? targetSecs : 0);
                }}
                className="px-1.5 py-0.5 bg-white/10 hover:bg-white/20 rounded text-[10px] font-bold"
                title="Toggle Countdown / Count-up"
              >
                {timerMode === 'countdown' ? '▼ Count' : '▲ Stopw'}
              </button>
            </div>
          </div>
        </div>

        {/* Toolbar & Preferences Bar */}
        <div className="speed-master-toolbar">
          {/* Chapter Quick Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--sm-text-muted)]">Chapter:</span>
            <select
              value={chapterId}
              onChange={(e) => navigate(`/books/speed-master-n3-reading/chapters/${e.target.value}`)}
              className="speed-master-select"
            >
              <optgroup label="短文 (Short Passages: 1–20)">
                {SPEED_MASTER_CHAPTERS.filter(c => c.category === 'short').map(ch => (
                  <option key={ch.id} value={ch.id}>{ch.title}</option>
                ))}
              </optgroup>
              <optgroup label="中文 (Medium Passages: 1–16)">
                {SPEED_MASTER_CHAPTERS.filter(c => c.category === 'medium').map(ch => (
                  <option key={ch.id} value={ch.id}>{ch.title}</option>
                ))}
              </optgroup>
              <optgroup label="長文 (Long Passages: 1–12)">
                {SPEED_MASTER_CHAPTERS.filter(c => c.category === 'long').map(ch => (
                  <option key={ch.id} value={ch.id}>{ch.title}</option>
                ))}
              </optgroup>
              <optgroup label="情報検索 (Information Retrieval: 1–15)">
                {SPEED_MASTER_CHAPTERS.filter(c => c.category === 'search').map(ch => (
                  <option key={ch.id} value={ch.id}>{ch.title}</option>
                ))}
              </optgroup>
              <optgroup label="第2部：模擬試験 (Full Mock Exam)">
                {SPEED_MASTER_CHAPTERS.filter(c => c.category === 'mock').map(ch => (
                  <option key={ch.id} value={ch.id}>{ch.title}</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Reader Controls: Theme, Font Size, Exam Mode */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Exam Mode Toggle */}
            <button
              onClick={() => {
                setExamMode(!examMode);
                setRevealed({});
                setSubmitted(false);
              }}
              className={`speed-master-ctrl-btn ${examMode ? 'active' : ''}`}
              title="Toggle Exam Mode (Hide explanations until submit)"
            >
              <span>{examMode ? '📝 Exam Mode' : '💡 Instant Mode'}</span>
            </button>

            {/* Font Size Selector */}
            <div className="speed-master-btn-group">
              <button
                onClick={() => setFontSize('small')}
                className={fontSize === 'small' ? 'active' : ''}
                title="Small Font"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('normal')}
                className={fontSize === 'normal' ? 'active' : ''}
                title="Standard Font"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={fontSize === 'large' ? 'active' : ''}
                title="Large Font"
              >
                A+
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows Bar */}
        <div className="flex items-center justify-between mb-6 px-1">
          <button
            disabled={!prevChapter}
            onClick={() => prevChapter && navigate(`/books/speed-master-n3-reading/chapters/${prevChapter.id}`)}
            className="speed-master-nav-btn"
          >
            <span>&larr; Prev</span>
            {prevChapter && <span className="hidden sm:inline opacity-70">({prevChapter.title})</span>}
          </button>

          <span className="speed-master-counter">
            {currentChapterIndex + 1} / {SPEED_MASTER_CHAPTERS.length}
          </span>

          <button
            disabled={!nextChapter}
            onClick={() => nextChapter && navigate(`/books/speed-master-n3-reading/chapters/${nextChapter.id}`)}
            className="speed-master-nav-btn"
          >
            {nextChapter && <span className="hidden sm:inline opacity-70">({nextChapter.title})</span>}
            <span>Next &rarr;</span>
          </button>
        </div>

        {/* Mock Exam Sticky Question Navigator */}
        {isMock && (
          <div className="speed-master-mock-nav">
            <div className="flex items-center justify-between flex-wrap gap-2 w-full mb-2">
              <div className="flex items-center gap-2">
                <span className="speed-master-mock-jump-label">問題ジャンプ (Q1-16):</span>
                <div className="flex items-center gap-1 flex-wrap">
                  {Array.from({ length: 16 }, (_, i) => {
                    const key = `q-${i}`;
                    const isAns = !!answers[key];
                    const isRev = !!revealed[key];
                    const isCorr = isRev && answers[key] === data?.questions?.[i]?.correct;
                    const isWrn = isRev && answers[key] && !isCorr;

                    let pillClass = '';
                    if (isRev) {
                      pillClass = isCorr ? 'correct' : isWrn ? 'wrong' : '';
                    } else if (isAns) {
                      pillClass = 'answered';
                    }

                    const isActive = i === activeQuestionIdx;
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          setActiveQuestionIdx(i);
                          if (mockViewMode === 'full') {
                            const el = document.getElementById(`question-card-${i}`);
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }
                        }}
                        className={`speed-master-q-pill ${pillClass} ${isActive ? 'active ring-2 ring-emerald-500 font-black' : ''}`}
                        title={`Jump to Q${i + 1}`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* View Toggle Mode: Focus View vs Full Exam View */}
              <div className="flex items-center gap-2">
                <div className="speed-master-btn-group">
                  <button
                    onClick={() => setMockViewMode('focus')}
                    className={mockViewMode === 'focus' ? 'active' : ''}
                    title="Focus on current question & passage"
                  >
                    📋 1問ずつ (Focus)
                  </button>
                  <button
                    onClick={() => setMockViewMode('full')}
                    className={mockViewMode === 'full' ? 'active' : ''}
                    title="View all passages and questions together"
                  >
                    📄 全問一覧 (Full Paper)
                  </button>
                </div>

                <span className="text-xs font-bold text-[var(--sm-text-muted)]">
                  {answeredCount} / 16
                </span>
                {examMode && !submitted && (
                  <button
                    onClick={handleSubmitExam}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow transition cursor-pointer"
                  >
                    Grade Exam ✓
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        {loading ? (
          <div className="py-20 text-center">
            <LoadingSpinner />
            <p className="text-sm text-[var(--sm-text-muted)] mt-3 font-medium">Loading passage and questions...</p>
          </div>
        ) : error ? (
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-8 text-center text-amber-900 dark:text-amber-200 shadow-sm">
            <div className="text-5xl mb-3">📖</div>
            <h3 className="text-xl font-bold mb-2">Content Preparation</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 mb-6 max-w-md mx-auto">{error}</p>
            {currentScanUrl && (
              <button
                onClick={() => setShowScanModal(true)}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-sm font-bold transition inline-flex items-center gap-2 shadow cursor-pointer"
              >
                <span>🔍 View Original Textbook Scan</span>
              </button>
            )}
          </div>
        ) : data ? (
          <div className="space-y-6">

            {/* Score Recap Card (If exam submitted) */}
            {submitted && (
              <div className="speed-master-score-card">
                <h3 className="speed-master-score-title">
                  📊 Test Results (採点結果)
                </h3>
                <div className="flex items-center justify-center gap-6 my-4">
                  <div className="text-4xl font-black text-[var(--sm-accent-blue)]">
                    {correctCount} <span className="text-lg text-[var(--sm-text-muted)]">/ {totalQuestions}</span>
                  </div>
                  <div className="text-3xl font-bold text-[var(--sm-text-primary)]">
                    {scorePercentage}%
                  </div>
                </div>

                <p className="text-sm font-semibold mb-4 text-[var(--sm-text-secondary)]">
                  {scorePercentage >= 80 ? '🎉 Excellent! Passed with High Score (合格水準達成)' : scorePercentage >= 60 ? '👍 Good Job! Passed (合格ライン到達)' : '💪 Needs More Practice (復習しましょう)'}
                </p>

                {/* Section Breakdown for Mock Exam */}
                {mockBreakdown && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-xl mx-auto mb-4 text-xs">
                    {Object.values(mockBreakdown).map((sec, sIdx) => (
                      <div key={sIdx} className="speed-master-score-sec-box">
                        <div className="font-bold text-[var(--sm-text-primary)]">{sec.title}</div>
                        <div className="text-base font-black text-[var(--sm-accent-blue)] mt-1">{sec.correct} / {sec.total}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleResetAnswers}
                    className="px-4 py-2 bg-[var(--sm-card-alt-bg)] hover:bg-[var(--sm-option-hover)] text-[var(--sm-text-primary)] border border-[var(--sm-border)] font-bold rounded-lg text-xs transition cursor-pointer"
                  >
                    ↺ Retake Chapter
                  </button>
                  {currentScanUrl && (
                    <button
                      onClick={() => setShowScanModal(true)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition cursor-pointer"
                    >
                      🔍 View Page Scan
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Instruction Header */}
            {data.instruction && (
              <div 
                className="speed-master-instruction"
                dangerouslySetInnerHTML={{ __html: data.instruction }}
              />
            )}

            {/* Mock Exam: Section-based Rendering (Focus View vs Full Paper View) */}
            {data.sections && data.sections.length > 0 ? (
              mockViewMode === 'focus' ? (
                (() => {
                  const activeSec = data.sections.find(s => s.questionIndices && s.questionIndices.includes(activeQuestionIdx)) || data.sections[0];
                  return (
                    <div className="space-y-6">
                      {/* Active Section Header */}
                      <div className="flex items-center justify-between border-b border-[var(--sm-border)] pb-2">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm md:text-base">
                          {activeSec.sectionTitle} {activeSec.passageTitle ? `— ${activeSec.passageTitle}` : ''}
                        </span>
                        <span className="text-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-bold border border-emerald-200 dark:border-emerald-800">
                          問 {activeQuestionIdx + 1} を回答中
                        </span>
                      </div>

                      {/* Active Section Passage Canvas */}
                      <div className="speed-master-canvas">
                        <div 
                          dangerouslySetInnerHTML={{ 
                            __html: (activeSec.passageText || '').replace(
                              /src=["'](\/(?:speed_master_n3_pages\/)?[^"']+)["']/g,
                              (match, p1) => `src="${resolveAssetUrl(p1)}"`
                            )
                          }}
                        />
                      </div>

                      {/* Active Section Footnotes */}
                      {activeSec.footnotes && activeSec.footnotes.length > 0 && (
                        <div className="speed-master-footnotes">
                          <span className="speed-master-footnotes-title">脚注 (Notes):</span>
                          <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
                            {activeSec.footnotesDiagramLeft && (
                              <div className="speed-master-footnote-diagram shrink-0">
                                <img 
                                  src={resolveAssetUrl(activeSec.footnotesDiagramLeft)} 
                                  alt="Footnote diagram" 
                                  className="speed-master-diagram-img w-28 md:w-36 h-auto object-contain"
                                />
                              </div>
                            )}
                            <div className="speed-master-footnotes-list flex-1">
                              {activeSec.footnotes.map((fn, fIdx) => (
                                <div key={fIdx} className="speed-master-footnote-item">
                                  <span 
                                    className="speed-master-footnote-term" 
                                    dangerouslySetInnerHTML={{ __html: `${fn.term || fn.word}：` }} 
                                  />
                                  <span 
                                    className="speed-master-footnote-def"
                                    dangerouslySetInnerHTML={{ __html: fn.definition || fn.meaning }} 
                                  />
                                </div>
                              ))}
                            </div>
                            {activeSec.footnotesDiagramRight && (
                              <div className="speed-master-footnote-diagram shrink-0">
                                <img 
                                  src={resolveAssetUrl(activeSec.footnotesDiagramRight)} 
                                  alt="Footnote diagram" 
                                  className="speed-master-diagram-img w-28 md:w-36 h-auto object-contain"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Render Current Question Card */}
                      {renderQuestionCard(data.questions[activeQuestionIdx], activeQuestionIdx, true, true)}
                    </div>
                  );
                })()
              ) : (
                /* Full Exam Paper View (All sections stacked) */
                <div className="space-y-8">
                  {data.sections.map((sec, secIdx) => (
                    <div key={sec.id || secIdx} className="space-y-4 pt-6 first:pt-0 border-t border-[var(--sm-border)] first:border-t-0">
                      <div className="flex items-center justify-between border-b border-[var(--sm-border)] pb-2">
                        <h3 className="font-bold text-emerald-600 dark:text-emerald-400 text-base md:text-lg">
                          {sec.sectionTitle} {sec.passageTitle ? `— ${sec.passageTitle}` : ''}
                        </h3>
                        <span className="text-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-full font-bold border border-emerald-200 dark:border-emerald-800">
                          問 {sec.questionIndices.map(qi => qi + 1).join('・')}
                        </span>
                      </div>

                      <div className="speed-master-canvas">
                        <div 
                          dangerouslySetInnerHTML={{ 
                            __html: (sec.passageText || '').replace(
                              /src=["'](\/(?:speed_master_n3_pages\/)?[^"']+)["']/g,
                              (match, p1) => `src="${resolveAssetUrl(p1)}"`
                            )
                          }}
                        />
                      </div>

                      {sec.footnotes && sec.footnotes.length > 0 && (
                        <div className="speed-master-footnotes">
                          <span className="speed-master-footnotes-title">脚注 (Notes):</span>
                          <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
                            <div className="speed-master-footnotes-list flex-1">
                              {sec.footnotes.map((fn, fIdx) => (
                                <div key={fIdx} className="speed-master-footnote-item">
                                  <span 
                                    className="speed-master-footnote-term" 
                                    dangerouslySetInnerHTML={{ __html: `${fn.term || fn.word}：` }} 
                                  />
                                  <span 
                                    className="speed-master-footnote-def"
                                    dangerouslySetInnerHTML={{ __html: fn.definition || fn.meaning }} 
                                  />
                                </div>
                              ))}
                            </div>
                            {sec.footnotesDiagramRight && (
                              <div className="speed-master-footnote-diagram shrink-0">
                                <img 
                                  src={resolveAssetUrl(sec.footnotesDiagramRight)} 
                                  alt="Footnote diagram" 
                                  className="speed-master-diagram-img w-28 md:w-36 h-auto object-contain"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Questions under this section */}
                      <div className="space-y-4 pt-2">
                        {sec.questionIndices.map(qIdx => (
                          data.questions[qIdx] ? renderQuestionCard(data.questions[qIdx], qIdx, false, false) : null
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Submit All Answers Banner for Full Paper View */}
                  {examMode && !submitted && (
                    <div className="p-6 text-center bg-[var(--sm-card-alt-bg)] rounded-2xl border border-[var(--sm-border)] shadow-sm my-8">
                      <h3 className="font-bold text-base md:text-lg mb-2 text-[var(--sm-text-primary)]">
                        模擬試験の回答完了 (Submit Full Exam)
                      </h3>
                      <p className="text-xs md:text-sm text-[var(--sm-text-muted)] mb-4">
                        回答状況: {answeredCount} / 16 問完了
                      </p>
                      <button
                        onClick={handleSubmitExam}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition cursor-pointer"
                      >
                        すべての問題を採点する (Submit & Grade All Questions) ✓
                      </button>
                    </div>
                  )}
                </div>
              )
            ) : (
              /* Standard Chapter Rendering */
              <div className="space-y-6">
                {/* Reading Passage Paper Canvas */}
                <div className="speed-master-canvas">
                  {data.passageHeader && (
                    <div 
                      className="speed-master-passage-header"
                      dangerouslySetInnerHTML={{ __html: data.passageHeader }}
                    />
                  )}
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: (data.passageText || data.passage || '').replace(
                        /src=["'](\/(?:speed_master_n3_pages\/)?[^"']+)["']/g,
                        (match, p1) => `src="${resolveAssetUrl(p1)}"`
                      )
                    }}
                  />
                </div>

                {/* Footnotes if any */}
                {data.footnotes && data.footnotes.length > 0 && (
                  <div className="speed-master-footnotes">
                    <span className="speed-master-footnotes-title">脚注 (Notes):</span>
                    <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
                      {(data.footnotesDiagram || data.footnotesDiagramLeft) && (
                        <div className="speed-master-footnote-diagram shrink-0">
                          <img 
                            src={resolveAssetUrl(data.footnotesDiagram || data.footnotesDiagramLeft)} 
                            alt="Footnote diagram left" 
                            className="speed-master-diagram-img w-28 md:w-36 h-auto object-contain"
                          />
                        </div>
                      )}
                      <div className="speed-master-footnotes-list flex-1">
                        {data.footnotes.map((fn, idx) => (
                          <div key={idx} className="speed-master-footnote-item">
                            <span 
                              className="speed-master-footnote-term" 
                              dangerouslySetInnerHTML={{ __html: `${fn.term || fn.word}：` }} 
                            />
                            <span 
                              className="speed-master-footnote-def"
                              dangerouslySetInnerHTML={{ __html: fn.definition || fn.meaning }} 
                            />
                          </div>
                        ))}
                      </div>
                      {data.footnotesDiagramRight && (
                        <div className="speed-master-footnote-diagram shrink-0">
                          <img 
                            src={resolveAssetUrl(data.footnotesDiagramRight)} 
                            alt="Footnote diagram right" 
                            className="speed-master-diagram-img w-28 md:w-36 h-auto object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Active Question Card for standard chapters */}
                {data.questions && data.questions.length > 0 && (
                  renderQuestionCard(data.questions[activeQuestionIdx], activeQuestionIdx, true, true)
                )}
              </div>
            )}

            {/* Vocabulary & Expressions Section */}
            {data.vocabulary && data.vocabulary.length > 0 && (
              <div className="speed-master-vocab-card">
                <div className="speed-master-vocab-header">
                  <h3 className="speed-master-vocab-title">
                    <span className="w-2 h-4 bg-[var(--sm-accent-blue)] rounded inline-block"></span>
                    <span>ことばと表現 (Vocabulary & Expressions)</span>
                    <span className="text-xs text-[var(--sm-text-muted)] font-normal">({data.vocabulary.length} words)</span>
                  </h3>
                  <button
                    onClick={() => setShowVocab(!showVocab)}
                    className="speed-master-vocab-toggle"
                  >
                    {showVocab ? 'Collapse ▲' : 'Expand ▼'}
                  </button>
                </div>

                {showVocab && (
                  <div className="speed-master-vocab-grid">
                    {data.vocabulary.map((vocab, vIdx) => (
                      <div key={vIdx} className="speed-master-vocab-item">
                        <div className="speed-master-vocab-term-col">
                          <span className="speed-master-vocab-word">
                            {vocab.word && String(vocab.word).includes('<ruby>') ? (
                              <span dangerouslySetInnerHTML={{ __html: vocab.word }} />
                            ) : vocab.reading && vocab.reading !== vocab.word ? (
                              <ruby>{vocab.word}<rt>{vocab.reading}</rt></ruby>
                            ) : (
                              <span>{vocab.word}</span>
                            )}
                          </span>
                        </div>
                        <div className="speed-master-vocab-separator">:</div>
                        <div className="speed-master-vocab-meaning-col">
                          {vocab.meaning}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Original Scan Button Footer */}
            {currentScanUrl && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setShowScanModal(true)}
                  className="px-4 py-2 bg-[var(--sm-card-alt-bg)] hover:bg-[var(--sm-option-hover)] text-[var(--sm-text-primary)] border border-[var(--sm-border)] rounded-xl text-xs font-bold transition inline-flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>📖 View Original Textbook Page Scan</span>
                </button>
              </div>
            )}

          </div>
        ) : null}
      </main>

      {/* Modal for Original Textbook Page Scan */}
      {showScanModal && currentScanUrl && (
        <div className="speed-master-modal-overlay" onClick={() => setShowScanModal(false)}>
          <div className="speed-master-modal-content p-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 border-b border-[var(--sm-border)] mb-3">
              <h3 className="font-bold text-[var(--sm-text-primary)] text-sm">
                Original Textbook Scan — {currentChapter.title}
              </h3>
              <button
                onClick={() => setShowScanModal(false)}
                className="px-3 py-1 bg-[var(--sm-card-alt-bg)] hover:bg-[var(--sm-option-hover)] text-[var(--sm-text-primary)] border border-[var(--sm-border)] rounded-lg text-xs font-bold cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <img
              src={currentScanUrl}
              alt="Speed Master Textbook Scan"
              className="max-h-[80vh] w-auto mx-auto rounded border border-[var(--sm-border)] shadow"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeedMasterN3ReadingBook;
