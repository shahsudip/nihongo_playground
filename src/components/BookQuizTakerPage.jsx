import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import { isRuntimeBookId, loadRuntimeBook } from '../dataSources/runtimeBookDataSource.js';

import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ProgressBar } from './ui/ProgressBar';
import { OptionButton } from './ui/OptionButton';
import { QuestionNavigator } from './ui/QuestionNavigator';
import { ExitConfirmModal } from './ui/ExitConfirmModal';
import '../assets/first_time_n3_350_kanji.css';
import '../assets/pass_n3_within_20_days.css';

const BookQuizTakerPage = () => {
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const isFirstTimeN3Kanji = bookId === 'first-time-jlpt-n3-350-kanji';
  const isPassN3Within20Days = bookId === 'pass-n3-within-20-days';
  const isEnhancedDrillBook = isFirstTimeN3Kanji || isPassN3Within20Days;
  const usesRuntimeBookData = isRuntimeBookId(bookId);
  const sectionCount = isPassN3Within20Days ? 8 : 4;
  const activeSection = useMemo(() => {
    if (!isEnhancedDrillBook) return null;
    const section = Number.parseInt(new URLSearchParams(location.search).get('section'), 10);
    return section >= 1 && section <= sectionCount ? section : null;
  }, [isEnhancedDrillBook, location.search, sectionCount]);
  const attemptChapterId = activeSection ? `${chapterId}--section-${activeSection}` : chapterId;

  const [chapter, setChapter] = useState(null);
  const [bookTitle, setBookTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbackMode, setFeedbackMode] = useState('Immediate'); // 'Immediate' or 'At End'
  const [showExitModal, setShowExitModal] = useState(false);
  const [showFurigana, setShowFurigana] = useState(true);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [showMobileNavigator, setShowMobileNavigator] = useState(false);
  const latestAttemptRef = useRef({ answers: {}, currentIndex: 0 });
  const saveAnswersStateRef = useRef(null);
  const remoteSaveQueueRef = useRef(Promise.resolve());
  const skipUnmountSaveRef = useRef(false);

  const queueRemoteWrite = useCallback((operation) => {
    const queuedWrite = remoteSaveQueueRef.current
      .catch(() => undefined)
      .then(operation);
    remoteSaveQueueRef.current = queuedWrite;
    return queuedWrite;
  }, []);

  // Warn user if trying to close browser/tab with active answers
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const count = Object.keys(answers).length;
      if (count > 0 && count < questions.length) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [answers, questions.length]);

  // Fetch chapter content
  useEffect(() => {
    let isActive = true;

    const fetchChapterData = async () => {
      try {
        setLoading(true);
        setError(null);

        let chapterData = null;

        if (usesRuntimeBookData) {
          const runtimeBook = await loadRuntimeBook(bookId);
          if (!isActive) return;
          setBookTitle(runtimeBook.title || bookId);
          chapterData = runtimeBook.chapters?.find(chapterItem => chapterItem.id === chapterId) || null;
        } else {
          // Legacy books retain their existing local-first fallback behavior.
          try {
            const { sampleBooks } = await import('../data/book_data.jsx');
            if (!isActive) return;
            const localBook = sampleBooks.find(b => b.id === bookId);
            if (localBook) {
              setBookTitle(localBook.title);
              const localChap = localBook.chapters?.find(c => c.id === chapterId);
              if (localChap) {
                chapterData = localChap;
              }
            }
          } catch (e) {
            console.warn("Failed to load local data:", e);
          }

          // Fallback to Firestore if not found locally
          if (!chapterData) {
            const bookDocRef = doc(db, 'books', bookId);
            const bookSnap = await getDoc(bookDocRef);
            if (!isActive) return;
            if (bookSnap.exists()) {
              setBookTitle(bookSnap.data().title || bookId);
            }

            const docRef = doc(db, 'books', bookId, 'chapters', chapterId);
            const docSnap = await getDoc(docRef);
            if (!isActive) return;
            if (docSnap.exists()) {
              chapterData = docSnap.data();
            }
          }
        }

        if (!chapterData) {
          setError("Chapter quiz not found.");
          setLoading(false);
          return;
        }

        setChapter(chapterData);

        // Flatten questions
        const flattened = [];
        let gIndex = 0;
        
        const sectionsOrPassages = chapterData.sections || chapterData.passages;
        if (sectionsOrPassages && sectionsOrPassages.length > 0) {
          sectionsOrPassages.forEach((passage, passageIdx) => {
            passage.questions?.forEach((q, qIdx) => {
              
              // Generate Japanese title for Mondai if title is missing
              let generatedTitle = passage.title;
              if (!generatedTitle) {
                if (passage.id && passage.id.includes('mondai-')) {
                  const mNum = passage.id.split('-').pop();
                  generatedTitle = `問題${mNum}`;
                } else {
                  generatedTitle = `問題${passageIdx + 1}`;
                }
              }

              flattened.push({
                ...q,
                questionText: q.questionText || q.text || q.question || "",
                id: q.id || `${passageIdx}-${qIdx}`, // preserve original id if it exists
                passageIndex: passageIdx,
                passageText: passage.passageText || passage.passage || "",
                passageLayout: passage.passageLayout || "",
                imageSrc: passage.imageSrc || "",
                passageTitle: generatedTitle,
                mondaiHeader: passage.mondaiHeader || passage.instruction || "",
                passageNotes: passage.passageNotes || "",
                globalQIndex: gIndex++
              });
            });
          });
        } else if (chapterData.questions && chapterData.questions.length > 0) {
          chapterData.questions.forEach((q, qIdx) => {
            flattened.push({
              ...q,
              questionText: q.questionText || q.text || q.question || "",
              id: `direct-${qIdx}`,
              passageIndex: 0,
              passageText: "",
              passageLayout: "",
              imageSrc: "",
              passageTitle: "",
              mondaiHeader: "",
              passageNotes: "",
              globalQIndex: gIndex++
            });
          });
        }

        const visibleQuestions = activeSection
          ? flattened.filter((question) => question.passageIndex === activeSection - 1)
          : flattened;

        setQuestions(visibleQuestions);
        setExamSubmitted(false);
        setShowMobileNavigator(false);

        // 1. Restore saved attempt from localStorage first
        const storageKey = currentUser
          ? `book_quiz_${currentUser.uid}_${bookId}_${attemptChapterId}`
          : `book_quiz_guest_${bookId}_${attemptChapterId}`;

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
          console.warn("Could not read local quiz state:", e);
        }

        // 2. Also check Firestore record if user is logged in
        if (currentUser) {
          try {
            const historyDocId = `${bookId}-${attemptChapterId}`;
            const historyRef = doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId);
            const historySnap = await getDoc(historyRef);
            if (!isActive) return;
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
            console.warn("Could not read Firestore quiz state:", e);
          }
        }

        setAnswers(restoredAnswers);

        // Resume at first unanswered question or saved index
        if (Object.keys(restoredAnswers).length > 0) {
          const firstUnanswered = visibleQuestions.findIndex(q => restoredAnswers[q.id] === undefined);
          if (firstUnanswered !== -1) {
            setCurrentIndex(firstUnanswered);
          } else if (restoredIndex >= 0 && restoredIndex < visibleQuestions.length) {
            setCurrentIndex(restoredIndex);
          } else {
            setCurrentIndex(0);
          }
        } else {
          setCurrentIndex(0);
        }

      } catch (err) {
        if (!isActive) return;
        console.error("Error loading chapter quiz:", err);
        setError("Failed to load quiz content: " + err.message);
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchChapterData();

    return () => {
      isActive = false;
    };
  }, [bookId, chapterId, currentUser, activeSection, attemptChapterId, usesRuntimeBookData]);

  const getStorageKey = useCallback(() => {
    return currentUser
      ? `book_quiz_${currentUser.uid}_${bookId}_${attemptChapterId}`
      : `book_quiz_guest_${bookId}_${attemptChapterId}`;
  }, [currentUser, bookId, attemptChapterId]);

  const getCorrectText = useCallback((q) => {
    if (!q) return '';
    if (q.correctOption) {
      if (typeof q.correctOption === 'object' && q.correctOption.text) return q.correctOption.text;
      if (typeof q.correctOption === 'string') return q.correctOption;
    }
    if (q.correctIndex !== undefined && q.options && q.options[q.correctIndex] !== undefined) {
      const opt = q.options[q.correctIndex];
      return typeof opt === 'object' ? opt.text : opt;
    }
    if (q.answer !== undefined) {
      if (typeof q.answer === 'string') return q.answer;
      if (typeof q.answer === 'number' && q.options && q.options[q.answer] !== undefined) {
        const opt = q.options[q.answer];
        return typeof opt === 'object' ? opt.text : opt;
      }
    }
    return '';
  }, []);

  const checkOptionIsCorrect = useCallback((q, optText, optIdx) => {
    if (!q) return false;
    const correctText = getCorrectText(q);
    if (correctText && optText) {
      return optText === correctText;
    }
    if (q.correctIndex !== undefined) {
      return optIdx === q.correctIndex;
    }
    return false;
  }, [getCorrectText]);

  // Save progress and full quiz answers state
  const saveAnswersState = useCallback(async (currentAnswers, targetIndex = currentIndex) => {
    if (!chapter || questions.length === 0) return;

    const answeredCount = Object.keys(currentAnswers).length;
    let correctCount = 0;
    Object.keys(currentAnswers).forEach(qId => {
      const q = questions.find(qu => qu.id === qId);
      if (q) {
        const correctText = getCorrectText(q);
        if (currentAnswers[qId] === correctText) {
          correctCount++;
        }
      }
    });

    const isAllAnswered = answeredCount === questions.length;
    const accuracy = questions.length > 0 ? (correctCount / questions.length) : 0;
    
    let status = 'incomplete';
    if (isAllAnswered) {
      const isMastered = isEnhancedDrillBook
        ? accuracy > 0.9
        : accuracy >= 0.8;
      if (isMastered && correctCount > 0) {
        status = 'mastered';
      } else {
        status = 'completed';
      }
    }

    // 1. Immediately cache in localStorage
    const storageKey = getStorageKey();
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        answers: currentAnswers,
        currentIndex: targetIndex,
        status,
        score: correctCount,
        total: questions.length,
        answered: answeredCount,
        timestamp: new Date().toISOString()
      }));
    } catch (e) {
      console.warn("Failed to save local quiz state:", e);
    }

    if (!currentUser || answeredCount === 0) return;

    try {
      const historyDocId = `${bookId}-${attemptChapterId}`;
      const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId);
      
      const record = {
        quizId: historyDocId,
        bookId,
        chapterId: attemptChapterId,
        title: chapter.title || chapterId,
        type: 'book',
        timestamp: new Date().toISOString(),
        score: correctCount,
        total: questions.length,
        answered: answeredCount,
        answers: currentAnswers,
        currentIndex: targetIndex,
        status
      };

      await queueRemoteWrite(() => setDoc(historyDocRef, record, { merge: true }));
    } catch (err) {
      console.error("Failed to save chapter progress:", err);
    }
  }, [bookId, chapterId, attemptChapterId, currentUser, chapter, questions, currentIndex, getStorageKey, getCorrectText, isEnhancedDrillBook, queueRemoteWrite]);

  useEffect(() => {
    latestAttemptRef.current = { answers, currentIndex };
  }, [answers, currentIndex]);

  useEffect(() => {
    saveAnswersStateRef.current = saveAnswersState;
  }, [saveAnswersState]);

  useEffect(() => () => {
    if (skipUnmountSaveRef.current) return;
    const latestAttempt = latestAttemptRef.current;
    saveAnswersStateRef.current?.(
      latestAttempt.answers,
      latestAttempt.currentIndex
    );
  }, []);

  const handleFinish = () => {
    saveAnswersState(answers, currentIndex);
    if (isEnhancedDrillBook && feedbackMode === 'At End' && !examSubmitted) {
      setExamSubmitted(true);
      setShowMobileNavigator(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate(`/books/${bookId}`);
  };

  const handleResetQuiz = async () => {
    if (!window.confirm("Are you sure you want to reset this quiz? All your answers will be cleared so you can retake every question from scratch.")) {
      return;
    }

    setAnswers({});
    setCurrentIndex(0);
    latestAttemptRef.current = { answers: {}, currentIndex: 0 };
    skipUnmountSaveRef.current = true;

    const storageKey = getStorageKey();
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
      console.warn("Failed to remove local quiz state:", e);
    }

    if (currentUser) {
      try {
        const historyDocId = `${bookId}-${attemptChapterId}`;
        const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId);
        await queueRemoteWrite(() => setDoc(historyDocRef, {
          score: 0,
          answered: 0,
          answers: {},
          currentIndex: 0,
          status: 'incomplete',
          timestamp: new Date().toISOString()
        }, { merge: true }));
      } catch (err) {
        console.warn("Failed to reset history record:", err);
      }
    }
  };

  const handleAttemptExit = () => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount > 0 && answeredCount < questions.length) {
      setShowExitModal(true);
    } else {
      navigate(`/books/${bookId}`);
    }
  };

  const handleConfirmExit = () => {
    saveAnswersState(answers, currentIndex);
    setShowExitModal(false);
    navigate(`/books/${bookId}`);
  };

  const handleOptionSelect = useCallback((questionId, optionText) => {
    // Lock selection if in Immediate mode and already answered
    if (feedbackMode === 'Immediate' && answers[questionId] !== undefined) return;
    if (isEnhancedDrillBook && examSubmitted) return;
    skipUnmountSaveRef.current = false;

    const nextAnswers = {
      ...answers,
      [questionId]: optionText
    };
    setAnswers(nextAnswers);

    // Persist immediately on each answer
    saveAnswersState(nextAnswers, currentIndex);
    
    // Auto advance if immediate feedback is off
    if (feedbackMode === 'At End') {
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          const nextIdx = currentIndex + 1;
          setCurrentIndex(nextIdx);
          saveAnswersState(nextAnswers, nextIdx);
        }
      }, 300);
    }
  }, [feedbackMode, answers, isEnhancedDrillBook, examSubmitted, saveAnswersState, currentIndex, questions.length]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      saveAnswersState(answers, nextIdx);
    }
  }, [currentIndex, questions.length, saveAnswersState, answers]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      saveAnswersState(answers, prevIdx);
    }
  }, [currentIndex, saveAnswersState, answers]);

  useEffect(() => {
    if (!isEnhancedDrillBook) return undefined;

    const handleKeyDown = (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON', 'A'].includes(target.tagName))) {
        return;
      }

      if (event.key.toLowerCase() === 'f') {
        setShowFurigana((visible) => !visible);
        return;
      }
      if (event.key === 'ArrowLeft') {
        handlePrev();
        return;
      }
      if (event.key === 'ArrowRight') {
        handleNext();
        return;
      }

      const optionIndex = Number.parseInt(event.key, 10) - 1;
      const question = questions[currentIndex];
      const option = question?.options?.[optionIndex];
      if (optionIndex >= 0 && optionIndex <= 3 && option !== undefined) {
        const optionText = typeof option === 'object' && option !== null ? option.text : option;
        handleOptionSelect(question.id, optionText);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEnhancedDrillBook, questions, currentIndex, handleNext, handleOptionSelect, handlePrev]);


  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message" style={{ color: 'white', padding: '100px', textAlign: 'center' }}>{error}</div>;
  if (!chapter || questions.length === 0) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>No questions available.</div>;

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  let correctCount = 0;
  Object.keys(answers).forEach(qId => {
    const q = questions.find(qu => qu.id === qId);
    if (q) {
      const correctText = getCorrectText(q);
      if (answers[qId] === correctText) {
        correctCount++;
      }
    }
  });

  const currentQ = questions[currentIndex] || questions[0];
  const selectedAnswer = currentQ ? answers[currentQ.id] : undefined;
  const shouldShowFeedback = selectedAnswer !== undefined
    && (!isEnhancedDrillBook || feedbackMode === 'Immediate' || examSubmitted);
  const quizScopeLabel = activeSection ? `Section ${activeSection}` : (isPassN3Within20Days ? 'Full day' : 'Full chapter');
  const correctAnswerText = getCorrectText(currentQ).replace(/<[^>]*>/g, '');
  const feedbackAnnouncement = shouldShowFeedback
    ? (selectedAnswer === getCorrectText(currentQ) ? 'Correct answer.' : `Incorrect. Correct answer: ${correctAnswerText}`)
    : '';

  return (
    <div className={`max-w-3xl mx-auto px-4 py-8 animate-fade-in pt-[100px] ${isEnhancedDrillBook ? `first-time-n3-quiz ${isPassN3Within20Days ? 'pass20-quiz' : ''} ${showFurigana ? '' : 'is-furigana-hidden'}` : ''}`}>
      
      {/* Top Header */}
      <div className={`mb-6 ${isEnhancedDrillBook ? 'ft350-quiz-header' : ''}`}>
        <button
          type="button"
          onClick={handleAttemptExit}
          className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-4 inline-block bg-transparent border-0 p-0 cursor-pointer"
        >
          &larr; Exit Quiz
        </button>
        
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex-1">
            {bookId === 'zenkamoku-n3-best-workbook' && chapter.weekTitle ? (
              <div className="flex flex-col gap-2 w-full max-w-2xl mb-2">
                <div className="flex items-stretch shadow-sm">
                   <div className="bg-[#1f2937] text-white px-4 py-2 font-bold text-lg rounded-l-md flex items-center justify-center border-r border-[#374151]">
                     {chapter.weekTitle}
                   </div>
                   <div className="bg-[#e5e7eb] dark:bg-[#d1d5db] text-black px-4 py-2 font-bold text-lg flex-1 flex items-center justify-between">
                     <span>{chapter.dayTitle}</span>
                     <div className="flex items-center gap-1">
                       <span className="text-xl">📅</span>
                       <span className="border-b border-black w-8 inline-block mx-1"></span>
                       <span className="text-sm">月</span>
                       <span className="border-b border-black w-8 inline-block mx-1"></span>
                       <span className="text-sm">日</span>
                     </div>
                   </div>
                </div>
                {chapter.sectionTitle && (
                  <div className="inline-flex self-start border-2 border-black dark:border-white px-3 py-1 font-bold bg-white dark:bg-[#111827] text-black dark:text-white rounded-sm mt-1 shadow-sm">
                    {chapter.sectionTitle} {chapter.sectionTitleEn ? ` ${chapter.sectionTitleEn}` : ''}
                  </div>
                )}
              </div>
            ) : isEnhancedDrillBook ? (
              <div className="ft350-quiz-title-block">
                <span className="ft350-quiz-kicker">{isPassN3Within20Days ? 'JLPT N3 20-DAY DRILL' : 'JLPT N3 KANJI TEST'}</span>
                <h1>{chapter.title || bookTitle}</h1>
                <p>{quizScopeLabel} - {totalQuestions} questions</p>
              </div>
            ) : (
              <>
                <h1 className="text-xl font-bold">{bookTitle}</h1>
                <p className="text-sm text-[var(--color-text-muted)]">{chapter.title}</p>
              </>
            )}
          </div>
          
          <div className={`flex items-center gap-3 flex-wrap ${isEnhancedDrillBook ? 'ft350-quiz-tools' : ''}`}>
            <button
              type="button"
              onClick={handleResetQuiz}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
              title="Reset all answers and retake this chapter from scratch"
            >
              {!isEnhancedDrillBook && <span aria-hidden="true">&#8635;</span>}
              <span>Reset</span>
            </button>

            <div className="flex items-center gap-2 px-3 py-2 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)]" aria-label="Answer feedback mode">
              <span className="text-xs text-[var(--color-text-muted)] mr-1">{isEnhancedDrillBook ? 'Mode:' : 'Feedback:'}</span>
              <button 
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${feedbackMode === 'Immediate' ? 'bg-[var(--color-accent)] text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
                onClick={() => {
                  setFeedbackMode('Immediate');
                  setExamSubmitted(false);
                }}
                aria-pressed={feedbackMode === 'Immediate'}
              >
                {isEnhancedDrillBook ? 'Study' : 'Immediate'}
              </button>
              <button 
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${feedbackMode === 'At End' ? 'bg-[var(--color-accent)] text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
                onClick={() => {
                  setFeedbackMode('At End');
                  setExamSubmitted(false);
                }}
                aria-pressed={feedbackMode === 'At End'}
              >
                {isEnhancedDrillBook ? 'Exam' : 'At End'}
              </button>
            </div>

            {isEnhancedDrillBook && (
              <button
                type="button"
                className="ft350-furigana-toggle"
                onClick={() => setShowFurigana((visible) => !visible)}
                aria-pressed={showFurigana}
                title="Keyboard shortcut: F"
              >
                Furigana {showFurigana ? 'on' : 'off'}
              </button>
            )}
            
            <div className="text-right text-sm">
              <div className="text-[var(--color-text-secondary)]">{answeredCount} / {totalQuestions} answered</div>
              {feedbackMode === 'Immediate' && (
                <div className="text-[var(--color-success-light)] font-semibold">{correctCount} correct</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isEnhancedDrillBook && (
        <nav className="ft350-section-switcher" aria-label="Quiz size">
          <Link className={!activeSection ? 'is-active' : ''} to={`/books/${bookId}/chapters/${chapterId}`}>Full {isPassN3Within20Days ? 58 : 40}</Link>
          {Array.from({ length: sectionCount }, (_, index) => index + 1).map((section) => (
            <Link
              key={section}
              className={activeSection === section ? 'is-active' : ''}
              to={`/books/${bookId}/chapters/${chapterId}?section=${section}`}
            >
              Section {section}
            </Link>
          ))}
        </nav>
      )}

      {isEnhancedDrillBook && examSubmitted && (
        <div className="ft350-exam-result" role="status" aria-live="polite">
          <div>
            <span>Exam result</span>
            <strong>{correctCount}/{totalQuestions}</strong>
          </div>
          <p>Review each marked answer below, then return to the chapter list when ready.</p>
        </div>
      )}

      {/* Progress Bar Component */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="text-[var(--color-text-secondary)]">Progress: {answeredCount}/{totalQuestions}</span>
          {feedbackMode === 'Immediate' && (
             <span className="text-[var(--color-success-light)] font-semibold">&#10003; {correctCount} correct</span>
          )}
        </div>
        <ProgressBar progressPercent={progressPercent} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col">
        
        {/* Passage Container */}
        <div className={`w-full mb-6 ${isEnhancedDrillBook ? 'ft350-passage-area' : ''}`}>
          {currentQ.passageTitle && currentQ.passageTitle !== chapter.title && (currentQ.mondaiHeader || currentQ.passageTitle) && (
            <div className="mb-4 px-4 py-3 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)]">
              <p className="text-base font-bold text-[var(--color-text-primary)] japanese-text flex items-start gap-3">
                <span className="whitespace-nowrap">{currentQ.passageTitle.replace(/^第\d+部\s*/, '')}</span>
                {currentQ.mondaiHeader && (
                  <span 
                    className="text-sm pt-0.5 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: currentQ.mondaiHeader.replace(/^問題\d+\s*/, '') }}
                  />
                )}
              </p>
            </div>
          )}
          
          {(currentQ.passageText || currentQ.imageSrc || currentQ.passageNotes) && (
            <div className="space-y-4">
              {(currentQ.passageText || currentQ.imageSrc) && (
                <div className="px-4 py-3 relative bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)] japanese-text text-base md:text-lg text-[var(--color-text-primary)]">
                  {currentQ.imageSrc && (
                    <div className="text-center mb-3">
                      <img src={currentQ.imageSrc} alt="Passage" className="max-w-full h-auto rounded-lg mx-auto" />
                    </div>
                  )}
                  {currentQ.passageText && (
                    currentQ.passageLayout === 'html' || (currentQ.passageTitle && currentQ.passageTitle.match(/問題(52|53|54|55|58)/)) ? (
                      <div dangerouslySetInnerHTML={{ __html: currentQ.passageText }} />
                    ) : (
                      <div className="whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{ __html: currentQ.passageText }} />
                    )
                  )}
                </div>
              )}
              {currentQ.passageNotes && (
                <div className="px-4 py-3 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] japanese-text leading-loose" dangerouslySetInnerHTML={{ __html: currentQ.passageNotes }} />
              )}
            </div>
          )}
        </div>

        {/* Question Card */}
        <div className="w-full">
          <Card className={`scroll-mt-20 ${isEnhancedDrillBook ? 'ft350-question-card' : ''}`}>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className={`inline-flex items-center justify-center w-8 h-8 text-white text-sm font-bold bg-[var(--color-primary)] ${isEnhancedDrillBook ? 'ft350-question-number' : 'rounded-full'}`}>
              {currentIndex + 1}
            </span>
            <span className="text-sm text-[var(--color-text-muted)]">{currentIndex + 1} of {totalQuestions}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-medium japanese-text leading-relaxed" dangerouslySetInnerHTML={{ __html: (currentQ.questionText || currentQ.stem || '').replace(/^(問い|問\d+)/, '<span class="text-[var(--color-primary)] font-bold">$&</span>').replace(/ (A「|B「|A：|B：|男：|女：|男の人：|女の人：|店員：|客：|Ａ「|Ｂ「|Ａ：|Ｂ：)/g, '<br />$1') }}></h2>
          {/* Audio Player Support for Listening Questions */}
          {currentQ.audioSrc && (
            <div className="mt-4 p-4 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)] flex items-center justify-center">
              <audio controls controlsList="nodownload" className="w-full max-w-md" key={currentQ.audioSrc}>
                <source src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${currentQ.audioSrc}`} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          {/* Image Support directly on Question level */}
          {currentQ.imageSrc && !currentQ.passageText && (
            <div className="mt-4 p-4 text-center bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)]">
              <img src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${currentQ.imageSrc}`} alt="Question illustration" className="max-w-full h-auto rounded-lg mx-auto" />
            </div>
          )}
        </div>

        <fieldset className={`space-y-3 mb-6 border-0 p-0 m-0 ${isEnhancedDrillBook ? 'ft350-options' : ''}`}>
          <legend className="sr-only">Choose one answer</legend>
          {currentQ.options.map((opt, optIdx) => {
            const optText = typeof opt === 'object' && opt !== null ? opt.text : opt;
            const cleanOpt = optText ? optText.replace(/\*\*/g, '') : '';
            return (
              <OptionButton 
                key={optIdx}
                text={cleanOpt}
                index={optIdx}
                isSelected={selectedAnswer === optText}
                isCorrect={checkOptionIsCorrect(currentQ, optText, optIdx)}
                feedbackMode={feedbackMode}
                onClick={() => handleOptionSelect(currentQ.id, optText)}
                disabled={(feedbackMode === 'Immediate' && selectedAnswer !== undefined) || (isEnhancedDrillBook && examSubmitted)}
                showFeedback={shouldShowFeedback}
              />
            );
          })}
        </fieldset>

        {isEnhancedDrillBook && (
          <p className="sr-only" role="status" aria-live="polite">{feedbackAnnouncement}</p>
        )}

        {/* Dedicated Explanation Card when question is answered */}
        {shouldShowFeedback && (currentQ.explanation || currentQ.commentary || currentQ.notes) && (
          <div className={`mb-6 p-4.5 rounded-2xl bg-emerald-50/90 dark:bg-zinc-800/90 border-2 border-emerald-500/40 dark:border-purple-500/40 shadow-sm transition-all animate-fade-in ${isEnhancedDrillBook ? 'ft350-answer-note' : ''}`}>
            <div className="flex items-center gap-2 mb-2 text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-purple-300">
              {!isEnhancedDrillBook && <span className="text-base" aria-hidden="true">i</span>}
              <span>{isEnhancedDrillBook ? 'Answer note' : 'Explanation'}</span>
            </div>
            <div 
              className="text-sm md:text-base leading-relaxed text-gray-900 dark:text-gray-100 japanese-text font-medium"
              dangerouslySetInnerHTML={{ __html: currentQ.explanation || currentQ.commentary || currentQ.notes }}
            />
          </div>
        )}

        {/* Bottom Actions Bar */}
        <div className={`flex justify-between items-center pt-4 border-t border-[var(--color-border)] mt-6 gap-3 flex-wrap ${isEnhancedDrillBook ? 'ft350-card-actions' : ''}`}>
          <Button variant="outline" onClick={handlePrev} disabled={currentIndex === 0}>
            &larr; Previous
          </Button>
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleResetQuiz}
              className="px-4 py-2 rounded-xl text-sm font-semibold border border-red-300 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Reset all answers and retake this chapter from scratch"
            >
              {!isEnhancedDrillBook && <span aria-hidden="true">&#8635;</span>}
              <span>Reset Quiz</span>
            </button>

            {currentIndex === totalQuestions - 1 ? (
              <Button variant="primary" onClick={handleFinish} className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-md">
                {isEnhancedDrillBook && feedbackMode === 'At End' && !examSubmitted ? 'Submit Exam' : 'Finish Chapter'}
              </Button>
            ) : (
              <Button variant="primary" onClick={handleNext}>
                Next &rarr;
              </Button>
            )}
          </div>
        </div>
      </Card>
      </div> {/* closes Question Card container */}
      </div> {/* closes Main Content Area */}

      {/* Question Navigator Component */}
      <div id="ft350-question-navigator" className={`${isEnhancedDrillBook ? 'ft350-navigator' : ''} ${showMobileNavigator ? 'is-open' : ''}`}>
        <QuestionNavigator
          questions={questions}
          answers={answers}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          feedbackMode={isEnhancedDrillBook && examSubmitted ? 'Immediate' : feedbackMode}
          checkIsCorrect={(q, ans) => {
            const correctText = getCorrectText(q);
            return ans[q.id] === correctText;
          }}
        />
      </div>

      {isEnhancedDrillBook && (
        <div className="ft350-mobile-actions" aria-label="Question navigation">
          <button type="button" onClick={handlePrev} disabled={currentIndex === 0}>Previous</button>
          <button
            type="button"
            onClick={() => setShowMobileNavigator((open) => !open)}
            aria-expanded={showMobileNavigator}
            aria-controls="ft350-question-navigator"
          >
            Navigator
          </button>
          {currentIndex === totalQuestions - 1 ? (
            <button type="button" onClick={handleFinish}>
              {feedbackMode === 'At End' && !examSubmitted ? 'Submit' : 'Finish'}
            </button>
          ) : (
            <button type="button" onClick={handleNext}>Next</button>
          )}
        </div>
      )}

      {/* Exit Confirmation Modal */}
      <ExitConfirmModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={handleConfirmExit}
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
      />
    </div>
  );
};

export default BookQuizTakerPage;

// Triggering Vite HMR

// Triggering Vite HMR for layout fix

// Triggering Vite HMR for layout fix 2

// Triggering Vite HMR for exact layout clone

// Triggering Vite HMR after removing line numbers

// Triggering Vite HMR for Mondai 16

// Triggering Vite HMR after Mondai 16 bold underline fix

// Triggering Vite HMR after furigana injection

// Triggering Vite HMR for Mondai 17 update

// Triggering Vite HMR after backporting furigana

// Triggering Vite HMR after Mondai 17 question furigana

// Triggering Vite HMR for Mondai 18 furigana

// Triggering Vite HMR for Mondai 19 rebuild

// Triggering Vite HMR for Mondai 19 underline fix
