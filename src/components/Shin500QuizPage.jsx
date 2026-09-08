// src/components/Shin500QuizPage.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import { STATIC_BOOKS } from '../data/static_books_catalog.js';
import '../assets/shin500_drill.css';

const Shin500QuizPage = () => {
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const staticBook = STATIC_BOOKS.find(b => b.id === bookId) || null;
  const [bookTitle, setBookTitle] = useState(staticBook?.title || "Shin Nihongo 500 Mon");
  const [bookLevel, setBookLevel] = useState(staticBook?.level || "N3");
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { [qId]: { selectedIndex, selectedText, isCorrect } }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbackMode, setFeedbackMode] = useState('Immediate'); // 'Immediate' or 'At End'
  const [showExplanation, setShowExplanation] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

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
          const bSnap = await getDoc(doc(db, 'books', bookId));
          if (bSnap.exists()) {
            const bData = bSnap.data();
            if (isMounted) {
              setBookTitle(bData.title || bookId);
              setBookLevel(bData.level || "N3");
            }
          }
        }

        // Fetch chapter doc from subcollection 'chapters'
        let chapSnap = await getDoc(doc(db, 'books', bookId, 'chapters', chapterId));
        
        // Multi-alias fallback if direct ID not found
        if (!chapSnap.exists()) {
          const wMatch = chapterId.match(/week[_-]?(\d+)[_-]?day[_-]?(\d+)/i) || chapterId.match(/w(\d+)[_-]?d(\d+)/i);
          if (wMatch) {
            const altId1 = `w${wMatch[1]}-d${wMatch[2]}`;
            const altId2 = `week${wMatch[1]}-day${wMatch[2]}`;
            const altId3 = `week${wMatch[1]}_day${wMatch[2]}`;
            for (const alt of [altId1, altId2, altId3]) {
              if (alt !== chapterId) {
                const altSnap = await getDoc(doc(db, 'books', bookId, 'chapters', alt));
                if (altSnap.exists()) {
                  chapSnap = altSnap;
                  break;
                }
              }
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

        if (isMounted) {
          setQuestions(flat);
          setCurrentIndex(0);
          setAnswers({});
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
  }, [bookId, chapterId, staticBook]);

  // Save Progress to Firestore
  const saveProgress = useCallback(async (isFinal = false) => {
    if (!currentUser || !chapter || questions.length === 0) return;

    try {
      let correctCount = 0;
      Object.values(answers).forEach(ans => {
        if (ans.isCorrect) correctCount++;
      });

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
        status: isFinal ? 'mastered' : 'incomplete'
      };

      await setDoc(historyDocRef, record, { merge: true });
    } catch (err) {
      console.warn("Could not save Shin 500 progress:", err);
    }
  }, [currentUser, chapter, questions, answers, bookId, chapterId]);

  // Handle Option Click
  const handleSelectOption = (optIdx, optText) => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    const correctInfo = getCorrectAnswerInfo(currentQ);
    const isCorrect = (correctInfo.index !== null && correctInfo.index === optIdx) ||
                      (correctInfo.text && correctInfo.text === optText);

    // If immediate feedback is on and already answered, don't re-select
    if (feedbackMode === 'Immediate' && answers[currentQ.id]) return;

    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        selectedIndex: optIdx,
        selectedText: optText,
        isCorrect
      }
    }));
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
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else if (Object.keys(answers).length >= questions.length) {
          setIsFinished(true);
          saveProgress(true);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [loading, error, isFinished, questions, currentIndex, answers, handleSelectOption, saveProgress]);

  // Calculate statistics
  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter(a => a.isCorrect).length;
  const currentQ = questions[currentIndex];
  const currentAnswer = currentQ ? answers[currentQ.id] : null;
  const currentCorrectInfo = currentQ ? getCorrectAnswerInfo(currentQ) : { index: null, text: '' };
  const currentCategory = currentQ ? getCategoryInfo(currentQ, currentIndex) : { type: 'moji', label: '文字', icon: '🈁' };

  if (loading) return <LoadingSpinner />;
  if (error) {
    return (
      <div className="shin500-container flex flex-col items-center justify-center px-4" data-level={bookLevel}>
        <div className="bg-[var(--color-bg-secondary)] border border-red-500/30 rounded-2xl p-8 max-w-md text-center">
          <p className="text-red-500 font-semibold mb-4">{error}</p>
          <Link to={`/books/${bookId}`} className="px-5 py-2.5 rounded-xl bg-[var(--shin-accent,#0d9488)] text-white font-medium">
            &larr; Back to Chapter List
          </Link>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="shin500-container flex flex-col items-center justify-center px-4" data-level={bookLevel}>
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-8 max-w-md text-center">
          <p className="text-[var(--color-text-secondary)] mb-4">No questions found for this drill.</p>
          <Link to={`/books/${bookId}`} className="px-5 py-2.5 rounded-xl bg-[var(--shin-accent,#0d9488)] text-white font-medium">
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
      <div className="shin500-container" data-level={bookLevel}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-8 text-center shadow-lg animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
              {pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '💪'}
            </div>

            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">
              Drill Completed!
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">
              {chapter.title} &bull; {bookTitle}
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8">
              <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]">
                <span className="block text-2xl font-black text-[var(--color-text-primary)]">{correctCount} / {questions.length}</span>
                <span className="text-xs text-[var(--color-text-secondary)] font-medium">Score</span>
              </div>
              <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]">
                <span className="block text-2xl font-black text-emerald-500">{pct}%</span>
                <span className="text-xs text-[var(--color-text-secondary)] font-medium">Accuracy</span>
              </div>
              <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]">
                <span className="block text-2xl font-black text-[var(--shin-accent,#0d9488)]">{questions.length}</span>
                <span className="text-xs text-[var(--color-text-secondary)] font-medium">Questions</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  setAnswers({});
                  setCurrentIndex(0);
                  setIsFinished(false);
                }}
                className="px-5 py-2.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] font-medium transition-all"
              >
                🔄 Retry Drill
              </button>

              <Link
                to={`/books/${bookId}`}
                className="px-6 py-2.5 rounded-xl bg-[var(--shin-accent,#0d9488)] text-white font-medium hover:opacity-90 shadow-md transition-all"
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
    <div className="shin500-container" data-level={bookLevel}>
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Top Header & Breadcrumb */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <Link
              to={`/books/${bookId}`}
              className="inline-flex items-center text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--shin-accent,#0d9488)] transition-colors mb-1"
            >
              &larr; {bookTitle}
            </Link>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              <span>{chapter.title}</span>
              <span className="text-xs px-2 py-0.5 rounded-md font-bold bg-[var(--shin-accent,#0d9488)] text-white">
                {bookLevel}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Feedback Mode Toggle */}
            <div className="inline-flex p-1 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs">
              <button
                onClick={() => setFeedbackMode('Immediate')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${feedbackMode === 'Immediate' ? 'bg-[var(--shin-accent,#0d9488)] text-white shadow-sm' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
              >
                Instant Check
              </button>
              <button
                onClick={() => setFeedbackMode('At End')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${feedbackMode === 'At End' ? 'bg-[var(--shin-accent,#0d9488)] text-white shadow-sm' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
              >
                Test Mode
              </button>
            </div>

            <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
              {answeredCount}/{questions.length}
            </span>
          </div>
        </div>

        {/* Question Step Navigator Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {questions.map((q, idx) => {
            const ans = answers[q.id];
            const isCurrent = idx === currentIndex;
            let statusBg = 'bg-[var(--color-bg-secondary)] border-[var(--color-border)] text-[var(--color-text-secondary)]';

            if (ans) {
              if (feedbackMode === 'Immediate') {
                statusBg = ans.isCorrect
                  ? 'bg-emerald-500 text-white border-emerald-600 font-bold'
                  : 'bg-red-500 text-white border-red-600 font-bold';
              } else {
                statusBg = 'bg-[var(--shin-accent,#0d9488)] text-white font-bold border-transparent';
              }
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`min-w-[2.2rem] h-8 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all flex-shrink-0 ${statusBg} ${isCurrent ? 'ring-2 ring-offset-2 ring-[var(--shin-accent,#0d9488)]' : 'hover:opacity-80'}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Active Question Card */}
        {currentQ && (
          <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-6 md:p-8 shadow-sm mb-6 animate-fade-in">
            
            {/* Question Header & Category Chip */}
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--shin-accent,#0d9488)] text-white font-bold text-xs">
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

              <span className="text-xs text-[var(--color-text-secondary)]">
                {currentQ.options?.length || 4} Choices
              </span>
            </div>

            {/* Instruction if available */}
            {currentQ.instruction && (
              <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-3">
                {currentQ.instruction}
              </p>
            )}

            {/* Question Text */}
            <div className="mb-6">
              <h2
                className="text-xl md:text-2xl font-medium leading-relaxed shin500-japanese-text text-[var(--color-text-primary)]"
                dangerouslySetInnerHTML={{ __html: currentQ.questionText }}
              />
            </div>

            {/* Options List / Grid */}
            <div className={`gap-3 mb-6 ${currentQ.options?.length === 2 ? 'shin-dual-options-grid' : 'space-y-3'}`}>
              {currentQ.options?.map((opt, optIdx) => {
                const optText = typeof opt === 'object' ? opt.text : opt;
                const isSelected = currentAnswer?.selectedIndex === optIdx;
                
                let optionStateClass = '';
                if (feedbackMode === 'Immediate' && currentAnswer) {
                  if (optIdx === currentCorrectInfo.index || optText === currentCorrectInfo.text) {
                    optionStateClass = 'is-correct';
                  } else if (isSelected && !currentAnswer.isCorrect) {
                    optionStateClass = 'is-wrong';
                  }
                } else if (isSelected) {
                  optionStateClass = 'is-selected';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx, optText)}
                    disabled={feedbackMode === 'Immediate' && currentAnswer !== null}
                    className={`shin-option-btn ${optionStateClass}`}
                  >
                    <span className="shin-key-badge">{optIdx + 1}</span>
                    <span
                      className="shin500-japanese-text flex-1"
                      dangerouslySetInnerHTML={{ __html: optText }}
                    />
                    {feedbackMode === 'Immediate' && currentAnswer && (
                      <span className="ml-2 font-bold text-sm">
                        {(optIdx === currentCorrectInfo.index || optText === currentCorrectInfo.text) ? '✓' : isSelected ? '✕' : ''}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Drawer (when answered in Immediate mode) */}
            {feedbackMode === 'Immediate' && currentAnswer && showExplanation && (
              <div className="shin-explanation-card">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                      Answer &amp; Explanation
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${currentAnswer.isCorrect ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'}`}>
                      {currentAnswer.isCorrect ? 'Correct! ✓' : 'Incorrect ✕'}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[var(--shin-accent,#0d9488)]">
                    Correct: Option {currentCorrectInfo.index !== null ? currentCorrectInfo.index + 1 : ''} ({currentCorrectInfo.text})
                  </span>
                </div>

                {currentQ.explanation && currentQ.explanation !== "Answer will be updated soon." ? (
                  <p
                    className="text-sm text-[var(--color-text-secondary)] leading-relaxed shin500-japanese-text"
                    dangerouslySetInnerHTML={{ __html: currentQ.explanation }}
                  />
                ) : (
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    正解：<strong>{currentCorrectInfo.text}</strong>
                  </p>
                )}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)] mt-6">
              <button
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)] disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                &larr; Prev
              </button>

              <div className="flex items-center gap-2">
                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex(prev => prev + 1)}
                    className="px-6 py-2 rounded-xl text-sm font-semibold bg-[var(--shin-accent,#0d9488)] text-white hover:opacity-90 shadow-md transition-all"
                  >
                    Next &rarr;
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsFinished(true);
                      saveProgress(true);
                    }}
                    className="px-6 py-2 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md transition-all"
                  >
                    Finish Drill ✓
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shin500QuizPage;
