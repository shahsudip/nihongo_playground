// src/components/Shin500QuizPage.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useTheme } from '../context/ThemeContext.jsx';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import { STATIC_BOOKS } from '../data/static_books_catalog.js';
import { ExitConfirmModal } from './ui/ExitConfirmModal.jsx';
import '../assets/shin500_drill.css';

const Shin500QuizPage = ({ bookId: propBookId }) => {
  const { bookId: paramBookId, chapterId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { theme } = useTheme();

  // Safely resolve bookId whether passed via prop, route param, or URL pathname
  const bookId = useMemo(() => {
    if (propBookId) return propBookId;
    if (paramBookId) return paramBookId;
    const match = location.pathname.match(/\/books\/(shin-nihongo-500-[^\/]+)/);
    if (match) return match[1];
    return 'shin-nihongo-500-n3';
  }, [propBookId, paramBookId, location.pathname]);

  const staticBook = STATIC_BOOKS.find(b => b.id === bookId) || null;
  const [bookTitle, setBookTitle] = useState(staticBook?.title || "Shin Nihongo 500 Mon");
  const [bookLevel, setBookLevel] = useState(staticBook?.level || "N3");
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { [qId]: { selectedIndex, selectedText, isCorrect } }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  // Warn user if trying to close browser/tab with active answers
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const answeredCount = Object.keys(answers).length;
      if (answeredCount > 0 && !isFinished) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [answers, isFinished]);

  // Helper to extract correct index & text
  const getCorrectAnswerInfo = useCallback((q) => {
    let correctIdx = null;
    let correctText = '';
    if (!q) return { index: null, text: '' };

    if (q.correctOption && typeof q.correctOption === 'object') {
      correctIdx = q.correctOption.index !== undefined ? q.correctOption.index : null;
      correctText = q.correctOption.text || '';
    } else if (typeof q.correctOption === 'number') {
      correctIdx = q.correctOption;
    } else if (typeof q.correctOption === 'string') {
      correctText = q.correctOption;
    }

    if (correctIdx === null && q.correctIndex !== undefined) {
      correctIdx = q.correctIndex;
    }

    const opts = Array.isArray(q.options) ? q.options : [];
    if (opts.length > 0) {
      if (correctIdx !== null && correctIdx >= 0 && correctIdx < opts.length) {
        if (!correctText) {
          const raw = opts[correctIdx];
          correctText = typeof raw === 'object' && raw !== null ? (raw.text || '') : (raw || '');
        }
      } else if (correctText) {
        const found = opts.findIndex(opt => {
          const t = typeof opt === 'object' && opt !== null ? opt.text : opt;
          return t === correctText;
        });
        if (found !== -1) correctIdx = found;
      }
    }

    return { index: correctIdx, text: correctText };
  }, []);

  // Determine question category (Moji / Goi / Bunpou)
  const getCategoryInfo = useCallback((q, index) => {
    if (!q) return { type: 'moji', label: '文字 (Kanji)', icon: '🈁' };
    const text = (q.questionText || '') + ' ' + (q.explanation || '');
    if (q.category) {
      if (q.category.includes('moji') || q.category.includes('kanji')) return { type: 'moji', label: '文字 (Kanji)', icon: '🈁' };
      if (q.category.includes('goi') || q.category.includes('vocab')) return { type: 'goi', label: '語彙 (Vocabulary)', icon: '📚' };
      if (q.category.includes('bunpou') || q.category.includes('grammar')) return { type: 'bunpou', label: '文法 (Grammar)', icon: '⛩️' };
    }

    if (text.includes('(MOJI)') || text.includes('文字') || text.includes('漢字')) {
      return { type: 'moji', label: '文字 (Kanji)', icon: '🈁' };
    }
    if (text.includes('(GOI)') || text.includes('語彙') || text.includes('ことば')) {
      return { type: 'goi', label: '語彙 (Vocabulary)', icon: '📚' };
    }
    if (text.includes('(BUNPOU)') || text.includes('文法')) {
      return { type: 'bunpou', label: '文法 (Grammar)', icon: '⛩️' };
    }

    // Default 3-question cyclical triad: Q1=Moji, Q2=Goi, Q3=Bunpou
    const mod = index % 3;
    if (mod === 0) return { type: 'moji', label: '文字 (Kanji)', icon: '🈁' };
    if (mod === 1) return { type: 'goi', label: '語彙 (Vocabulary)', icon: '📚' };
    return { type: 'bunpou', label: '文法 (Grammar)', icon: '⛩️' };
  }, []);

  // Fetch chapter data directly from Firestore
  useEffect(() => {
    let isMounted = true;

    const fetchChapter = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch top-level book title if needed
        if (!staticBook) {
          const bookDocRef = doc(db, 'books', bookId);
          const bookSnap = await getDoc(bookDocRef);
          if (bookSnap.exists()) {
            const bData = bookSnap.data();
            if (bData.title) setBookTitle(bData.title);
            if (bData.level) setBookLevel(bData.level);
          }
        }

        // Try fetching chapter from subcollection
        const chapDocRef = doc(db, 'books', bookId, 'chapters', chapterId);
        let chapSnap = await getDoc(chapDocRef);

        // Fallback: search within main book doc chapters array
        if (!chapSnap.exists()) {
          const bookDocRef = doc(db, 'books', bookId);
          const bookSnap = await getDoc(bookDocRef);
          if (bookSnap.exists()) {
            const bData = bookSnap.data();
            const found = (bData.chapters || []).find(c => c.id === chapterId);
            if (found) {
              chapSnap = { exists: () => true, data: () => found };
            }
          }
        }

        if (!chapSnap.exists()) {
          if (isMounted) {
            setError(`Drill "${chapterId}" not found in ${bookId}.`);
            setLoading(false);
          }
          return;
        }

        const chapData = chapSnap.data();
        if (isMounted) setChapter(chapData);

        // Flatten questions
        const flat = [];
        if (chapData.passages && Array.isArray(chapData.passages)) {
          chapData.passages.forEach((p, pIdx) => {
            (p.questions || []).forEach((q, qIdx) => {
              flat.push({
                ...q,
                id: q.id || `p${pIdx}-q${qIdx}`,
                qNumber: flat.length + 1,
                instruction: p.title || p.instruction || ''
              });
            });
          });
        } else if (chapData.questions && Array.isArray(chapData.questions)) {
          chapData.questions.forEach((q, qIdx) => {
            flat.push({
              ...q,
              id: q.id || `q${qIdx}`,
              qNumber: flat.length + 1,
              instruction: q.instruction || ''
            });
          });
        }

        // 1. Restore saved attempt from localStorage first
        const storageKey = currentUser
          ? `shin500_quiz_${currentUser.uid}_${bookId}_${chapterId}`
          : `shin500_quiz_guest_${bookId}_${chapterId}`;

        let restoredAnswers = {};
        let restoredIndex = 0;

        try {
          const cached = localStorage.getItem(storageKey);
          if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed && typeof parsed.answers === 'object') {
              restoredAnswers = parsed.answers;
              if (typeof parsed.currentIndex === 'number') {
                restoredIndex = parsed.currentIndex;
              }
            }
          }
        } catch (e) {
          console.warn("Could not read local Shin 500 quiz state:", e);
        }

        // 2. Also check Firestore if user is logged in
        if (currentUser) {
          try {
            const historyDocId = `${bookId}-${chapterId}`;
            const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId);
            const historySnap = await getDoc(historyDocRef);
            if (historySnap.exists()) {
              const histData = historySnap.data();
              if (histData.answers && typeof histData.answers === 'object') {
                if (Object.keys(histData.answers).length >= Object.keys(restoredAnswers).length) {
                  restoredAnswers = histData.answers;
                  if (typeof histData.currentIndex === 'number') {
                    restoredIndex = histData.currentIndex;
                  }
                }
              }
            }
          } catch (e) {
            console.warn("Could not read Firestore Shin 500 quiz state:", e);
          }
        }

        if (isMounted) {
          setQuestions(flat);
          setAnswers(restoredAnswers);

          if (Object.keys(restoredAnswers).length > 0) {
            const firstUnanswered = flat.findIndex(q => !restoredAnswers[q.id]);
            if (firstUnanswered !== -1) {
              setCurrentIndex(firstUnanswered);
            } else if (restoredIndex >= 0 && restoredIndex < flat.length) {
              setCurrentIndex(restoredIndex);
            } else {
              setCurrentIndex(0);
            }
          } else {
            setCurrentIndex(0);
          }

          setIsFinished(false);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading Shin 500 drill:", err);
        if (isMounted) {
          setError("Failed to load drill: " + err.message);
          setLoading(false);
        }
      }
    };

    fetchChapter();

    return () => {
      isMounted = false;
    };
  }, [bookId, chapterId, staticBook, currentUser]);

  const getStorageKey = useCallback(() => {
    return currentUser
      ? `shin500_quiz_${currentUser.uid}_${bookId}_${chapterId}`
      : `shin500_quiz_guest_${bookId}_${chapterId}`;
  }, [currentUser, bookId, chapterId]);

  // Save Progress to localStorage and Firestore
  const saveProgress = useCallback(async (currentAnswers = answers, isFinal = false, targetIndex = currentIndex) => {
    if (!chapter || questions.length === 0) return;

    // 1. Immediately cache in localStorage
    const storageKey = getStorageKey();
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        answers: currentAnswers,
        currentIndex: targetIndex,
        timestamp: new Date().toISOString()
      }));
    } catch (e) {
      console.warn("Could not cache Shin 500 state locally:", e);
    }

    const answeredCount = Object.keys(currentAnswers).length;
    if (!currentUser || answeredCount === 0) return;

    try {
      let correctCount = 0;
      Object.values(currentAnswers).forEach(ans => {
        if (ans && ans.isCorrect) correctCount++;
      });

      const isAllAnswered = answeredCount === questions.length;
      const accuracy = questions.length > 0 ? (correctCount / questions.length) : 0;
      
      // Strict Mastered rule: Must have completed ALL questions and scored >= 80%
      let status = 'incomplete';
      if (isAllAnswered || isFinal) {
        if (accuracy >= 0.8 && correctCount > 0) {
          status = 'mastered';
        } else if (isAllAnswered) {
          status = 'completed';
        }
      }

      const historyDocId = `${bookId}-${chapterId}`;
      const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId);

      const record = {
        quizId: historyDocId,
        bookId,
        chapterId,
        title: chapter.title || chapterId,
        type: 'book',
        timestamp: new Date().toISOString(),
        score: correctCount,
        total: questions.length,
        answered: answeredCount,
        answers: currentAnswers,
        currentIndex: targetIndex,
        accuracy: Math.round(accuracy * 100),
        status
      };

      await setDoc(historyDocRef, record, { merge: true });
    } catch (err) {
      console.warn("Could not save Shin 500 progress:", err);
    }
  }, [currentUser, chapter, questions, answers, bookId, chapterId, getStorageKey, currentIndex]);

  // Cleanup on unmount - ensure final state is persisted
  useEffect(() => {
    return () => {
      saveProgress(answers, false, currentIndex);
    };
  }, [saveProgress, answers, currentIndex]);

  const handleResetDrill = async () => {
    if (!window.confirm("Are you sure you want to reset this drill? All your answers will be cleared so you can retake every question from scratch.")) {
      return;
    }

    setAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);

    const storageKey = getStorageKey();
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
      console.warn("Failed to remove local Shin 500 state:", e);
    }

    if (currentUser) {
      try {
        const historyDocId = `${bookId}-${chapterId}`;
        const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId);
        await setDoc(historyDocRef, {
          score: 0,
          answered: 0,
          answers: {},
          currentIndex: 0,
          status: 'incomplete',
          timestamp: new Date().toISOString()
        }, { merge: true });
      } catch (err) {
        console.warn("Failed to reset Shin 500 history doc:", err);
      }
    }
  };

  const handleAttemptExit = () => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount > 0 && !isFinished) {
      setShowExitModal(true);
    } else {
      navigate(`/books/${bookId}`);
    }
  };

  const handleConfirmExit = () => {
    saveProgress(answers, false, currentIndex);
    setShowExitModal(false);
    navigate(`/books/${bookId}`);
  };

  // Handle Option Click (locked after first selection)
  const handleSelectOption = (optIdx, optText) => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    if (answers[currentQ.id]) return; // lock once clicked

    const correctInfo = getCorrectAnswerInfo(currentQ);
    const isCorrect = (correctInfo.index !== null && correctInfo.index === optIdx) ||
                      (correctInfo.text && correctInfo.text === optText);

    const nextAnswers = {
      ...answers,
      [currentQ.id]: {
        selectedIndex: optIdx,
        selectedText: optText,
        isCorrect
      }
    };

    setAnswers(nextAnswers);
    saveProgress(nextAnswers, false, currentIndex);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      saveProgress(answers, false, nextIdx);
    } else if (Object.keys(answers).length >= questions.length) {
      setIsFinished(true);
      saveProgress(answers, true, currentIndex);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      saveProgress(answers, false, prevIdx);
    }
  };

  // Keyboard navigation (1, 2, 3, 4 for options; Enter / Arrow Right for next)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (loading || error || isFinished || questions.length === 0) return;
      const currentQ = questions[currentIndex];
      if (!currentQ || !currentQ.options) return;

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= currentQ.options.length) {
        const optIdx = num - 1;
        handleSelectOption(optIdx, currentQ.options[optIdx]);
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [loading, error, isFinished, questions, currentIndex, answers, handleSelectOption, handleNext, handlePrev]);

  // Calculate statistics
  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter(a => a.isCorrect).length;
  const currentQ = questions[currentIndex];
  const currentAnswer = (currentQ && answers[currentQ.id]) ? answers[currentQ.id] : null;
  const currentCorrectInfo = currentQ ? getCorrectAnswerInfo(currentQ) : { index: null, text: '' };
  const currentCategory = currentQ ? getCategoryInfo(currentQ, currentIndex) : { type: 'moji', label: '文字', icon: '🈁' };

  if (loading) {
    return (
      <div className={`shin500-page theme-${theme} flex items-center justify-center min-h-screen`}>
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className={`shin500-page theme-${theme} flex flex-col items-center justify-center px-4`}>
        <div className="shin-card p-8 max-w-md text-center">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <Link to={`/books/${bookId}`} className="px-5 py-2.5 rounded-xl font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-all">
            &larr; Back to Chapter List
          </Link>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className={`shin500-page theme-${theme} flex flex-col items-center justify-center px-4`}>
        <div className="shin-card p-8 max-w-md text-center">
          <p className="mb-4" style={{ color: 'var(--shin-text-secondary)' }}>No questions found for this drill.</p>
          <Link to={`/books/${bookId}`} className="px-5 py-2.5 rounded-xl font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-all">
            &larr; Back to Chapter List
          </Link>
        </div>
      </div>
    );
  }

  // Summary View when completed
  if (isFinished) {
    const pct = Math.round((correctCount / questions.length) * 100);
    return (
      <div className={`shin500-page theme-${theme}`}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="shin-card p-8 text-center animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl" style={{ backgroundColor: 'var(--shin-accent-light)', color: 'var(--shin-accent)', border: '1px solid var(--shin-accent-border)' }}>
              {pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '💪'}
            </div>

            <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--shin-text-primary)' }}>
              Drill Completed!
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--shin-text-muted)' }}>
              {chapter.title} &bull; {bookTitle}
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8">
              <div className="shin-card-alt p-4 rounded-xl">
                <span className="block text-2xl font-black" style={{ color: 'var(--shin-text-primary)' }}>{correctCount} / {questions.length}</span>
                <span className="text-xs font-medium" style={{ color: 'var(--shin-text-muted)' }}>Score</span>
              </div>
              <div className="shin-card-alt p-4 rounded-xl">
                <span className="block text-2xl font-black" style={{ color: 'var(--shin-accent)' }}>{pct}%</span>
                <span className="text-xs font-medium" style={{ color: 'var(--shin-text-muted)' }}>Accuracy</span>
              </div>
              <div className="shin-card-alt p-4 rounded-xl">
                <span className="block text-2xl font-black" style={{ color: 'var(--shin-text-primary)' }}>{questions.length}</span>
                <span className="text-xs font-medium" style={{ color: 'var(--shin-text-muted)' }}>Questions</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleResetDrill}
                className="px-5 py-2.5 rounded-xl border font-semibold text-red-600 dark:text-red-400 border-red-300 dark:border-red-900/60 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                🔄 Reset & Retry Drill
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsFinished(false);
                  setCurrentIndex(0);
                }}
                className="px-5 py-2.5 rounded-xl border font-medium transition-all cursor-pointer"
                style={{ borderColor: 'var(--shin-border)', color: 'var(--shin-text-primary)', backgroundColor: 'var(--shin-card-alt)' }}
              >
                📖 Review Answers
              </button>

              <Link
                to={`/books/${bookId}`}
                className="px-6 py-2.5 rounded-xl font-medium bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all"
              >
                Done &rarr; Chapter List
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`shin500-page theme-${theme}`}>
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Top Header & Breadcrumb with Light / Dark Theme Switcher at Top Right */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <button
              type="button"
              onClick={handleAttemptExit}
              className="inline-flex items-center text-sm font-medium transition-colors mb-1 hover:underline cursor-pointer bg-transparent border-0 p-0"
              style={{ color: 'var(--shin-text-muted)' }}
            >
              &larr; {bookTitle}
            </button>
            <h1 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--shin-text-primary)' }}>
              <span>{chapter.title}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-md font-bold text-white bg-emerald-600">
                {bookLevel}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleResetDrill}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-red-300 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
              title="Reset all answers and retake this drill from scratch"
            >
              <span>🔄</span>
              <span>Reset</span>
            </button>

            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg border" style={{ backgroundColor: 'var(--shin-card-alt)', borderColor: 'var(--shin-border)', color: 'var(--shin-text-secondary)' }}>
              {answeredCount} / {questions.length}
            </span>
          </div>
        </div>

        {/* Question Step Navigator Pills */}
        <div className="shin-navigator-track">
          {questions.map((q, idx) => {
            const ans = answers[q.id];
            const isCurrent = idx === currentIndex;
            
            let statusClass = '';
            if (ans) {
              statusClass = ans.isCorrect ? 'is-correct' : 'is-wrong';
            }
            if (isCurrent) {
              statusClass += ' is-active';
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`shin-nav-pill ${statusClass.trim()}`}
                title={`Question ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Active Question Card */}
        {currentQ && (
          <div className="shin-card p-6 md:p-8 mb-6 animate-fade-in">
            
            {/* Question Header & Category Chip */}
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b" style={{ borderColor: 'var(--shin-border)' }}>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-xs bg-emerald-600">
                  {currentIndex + 1}
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 ${
                  currentCategory.type === 'moji' ? 'shin-badge-moji' :
                  currentCategory.type === 'goi' ? 'shin-badge-goi' : 'shin-badge-bunpou'
                }`}>
                  <span>{currentCategory.icon}</span>
                  <span>{currentCategory.label}</span>
                </span>
              </div>

              <span className="text-xs font-medium" style={{ color: 'var(--shin-text-muted)' }}>
                {currentQ.options?.length || 4} Choices
              </span>
            </div>

            {/* Instruction if available */}
            {currentQ.instruction && (
              <p className="text-xs font-medium mb-3" style={{ color: 'var(--shin-text-muted)' }}>
                {currentQ.instruction}
              </p>
            )}

            {/* Question Text */}
            <div className="mb-6">
              <h2
                className="text-xl md:text-2xl font-medium leading-relaxed shin500-japanese-text"
                style={{ color: 'var(--shin-text-primary)' }}
                dangerouslySetInnerHTML={{ __html: currentQ.questionText }}
              />
            </div>

            {/* Options List / Grid */}
            <div className={`gap-3 mb-4 ${currentQ.options?.length === 2 ? 'shin-dual-options-grid' : 'space-y-3'}`}>
              {currentQ.options?.map((opt, optIdx) => {
                const optText = typeof opt === 'object' ? opt.text : opt;
                const isSelected = currentAnswer?.selectedIndex === optIdx;
                const isCorrect = (optIdx === currentCorrectInfo.index || optText === currentCorrectInfo.text);
                
                let optionStateClass = '';
                if (currentAnswer) {
                  if (isCorrect) {
                    optionStateClass = 'is-correct';
                  } else if (isSelected && !currentAnswer.isCorrect) {
                    optionStateClass = 'is-wrong';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx, optText)}
                    disabled={Boolean(currentAnswer)}
                    className={`shin-option-btn ${optionStateClass}`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="shin-key-badge">{optIdx + 1}</span>
                        <span
                          className="shin500-japanese-text font-medium flex-1 text-left"
                          dangerouslySetInnerHTML={{ __html: optText }}
                        />
                      </div>
                      {currentAnswer && (
                        <span className={`ml-2 text-[0.75rem] font-bold px-2 py-0.5 rounded flex items-center gap-1 shrink-0 ${
                          isCorrect
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : isSelected
                            ? 'bg-rose-600 text-white shadow-sm'
                            : 'opacity-0'
                        }`}>
                          {isCorrect ? '✓ 正解' : isSelected ? '✕ 不正解' : ''}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dedicated Explanation Card when answered */}
            {currentAnswer && currentQ.explanation && (
              <div 
                className="mt-4 mb-2 p-4.5 rounded-2xl border shadow-sm transition-all animate-fade-in text-left"
                style={{ 
                  backgroundColor: 'var(--shin-card-alt)', 
                  borderColor: currentAnswer.isCorrect ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)' 
                }}
              >
                <div className="flex items-center gap-2 mb-2 text-xs font-black uppercase tracking-wider" style={{ color: currentAnswer.isCorrect ? '#059669' : '#dc2626' }}>
                  <span className="text-base">💡</span>
                  <span>解説 • Explanation</span>
                </div>
                <div
                  className="text-sm md:text-base leading-relaxed shin500-japanese-text font-medium"
                  style={{ color: 'var(--shin-text-primary)' }}
                  dangerouslySetInnerHTML={{ __html: currentQ.explanation }}
                />
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-6 border-t mt-6 gap-3 flex-wrap" style={{ borderColor: 'var(--shin-border)' }}>
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl text-sm font-semibold border disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                style={{ borderColor: 'var(--shin-border)', backgroundColor: 'var(--shin-card-alt)', color: 'var(--shin-text-primary)' }}
              >
                &larr; Prev
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetDrill}
                  className="px-4 py-2 rounded-xl text-sm font-semibold border border-red-300 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Reset all answers and retake this drill from scratch"
                >
                  <span>🔄</span>
                  <span>Reset Drill</span>
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all cursor-pointer"
                  >
                    Next &rarr;
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsFinished(true);
                      saveProgress(answers, true, currentIndex);
                    }}
                    className="px-6 py-2 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all cursor-pointer"
                  >
                    Finish Drill ✓
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Exit Confirmation Modal */}
      <ExitConfirmModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={handleConfirmExit}
        answeredCount={answeredCount}
        totalQuestions={questions.length}
        theme={theme}
      />
    </div>
  );
};

export default Shin500QuizPage;
