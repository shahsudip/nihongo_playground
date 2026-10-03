import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { practiceSetsBook as localPracticeSetsBook } from '../data/practice_sets_data.js';
import { useAuth } from '../context/AuthContext.jsx';

// Reusable UI Components
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { OptionButton } from './ui/OptionButton';
import { ExitConfirmModal } from './ui/ExitConfirmModal';
import { JlptScoreCertificateModal } from './ui/JlptScoreCertificateModal';
import { calculateJlptExamScore } from '../utils/jlptScoring.js';

const N3PracticeSetQuizPage = () => {
  const { setId, sectionId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbackMode, setFeedbackMode] = useState('Immediate');
  const [isFinished, setIsFinished] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const [currentSet, setCurrentSet] = useState(null);
  const [loading, setLoading] = useState(true);

  // Warn user if trying to close browser/tab with active answers
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const count = Object.keys(answers).length;
      if (count > 0 && !isFinished) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [answers, isFinished]);

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (timerActive && !isFinished) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isFinished]);

  const formatTime = (totalSec) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchBook = async () => {
      const localSet = localPracticeSetsBook?.sets?.find(s => s.id === setId) || null;
      try {
        let setFound = null;

        // 1. Try parent document first (where sync_practice_sets.mjs writes)
        try {
          const docRef = doc(db, 'books', 'jlpt-n3-practice-sets');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const bookData = docSnap.data();
            setFound = Array.isArray(bookData.sets)
              ? bookData.sets.find(s => s.id === setId)
              : (bookData.sets ? bookData.sets[setId] : null);
          }
        } catch (parentErr) {
          console.warn("Parent doc fetch error:", parentErr.message);
        }

        

        setCurrentSet(setFound || localSet);
      } catch (err) {
        console.warn("Error fetching book, using local fallback:", err.message);
        setCurrentSet(localSet);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [setId]);

  const sectionsToShow = useMemo(() => {
    if (sectionId === 'vocabulary-kanji') return ['vocabulary-kanji'];
    if (sectionId === 'grammar') return ['grammar-reading'];
    return ['vocabulary-kanji', 'grammar-reading'];
  }, [sectionId]);

  const pageTitle = useMemo(() => {
    if (sectionId === 'vocabulary-kanji') return 'Vocabulary & Kanji';
    if (sectionId === 'grammar') return 'Grammar & Reading';
    return 'Full Practice';
  }, [sectionId]);

  const questions = useMemo(() => {
    if (!currentSet) return [];
    const qs = [];
    sectionsToShow.forEach(sec => {
      const secData = currentSet.sections[sec];
      if (secData && secData.questions) {
        secData.questions.forEach(q => {
          qs.push({ ...q, sectionType: sec });
        });
      }
    });
    return qs;
  }, [currentSet, sectionsToShow]);

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  // Official JLPT Scaled Score Report
  const scoreReport = useMemo(() => {
    if (!currentSet?.sections) return null;
    const examSections = [];
    if (sectionsToShow.includes('vocabulary-kanji') && currentSet.sections['vocabulary-kanji']?.questions) {
      examSections.push({
        id: 'vocab',
        title: '言語知識（文字・語彙）',
        questions: currentSet.sections['vocabulary-kanji'].questions,
      });
    }
    if (sectionsToShow.includes('grammar') && currentSet.sections['grammar']?.questions) {
      examSections.push({
        id: 'grammar_reading',
        title: '言語知識（文法）・読解',
        questions: currentSet.sections['grammar'].questions,
      });
    }
    return calculateJlptExamScore('N3', examSections, answers);
  }, [currentSet, sectionsToShow, answers]);

  const getStorageKey = useCallback(() => {
    return currentUser
      ? `n3_practice_set_${currentUser.uid}_${setId}_${sectionId || 'full'}`
      : `n3_practice_set_guest_${setId}_${sectionId || 'full'}`;
  }, [currentUser, setId, sectionId]);

  // Restore saved attempt from localStorage and Firestore
  const [attemptRestored, setAttemptRestored] = useState(false);

  useEffect(() => {
    if (questions.length === 0 || attemptRestored) return;

    const restoreAttempt = async () => {
      let restoredAnswers = {};
      let restoredIndex = 0;
      let restoredTime = 0;

      // 1. Check local session storage
      const storageKey = getStorageKey();
      try {
        const cached = localStorage.getItem(storageKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && typeof parsed.answers === 'object') {
            restoredAnswers = parsed.answers;
            if (typeof parsed.currentIndex === 'number') {
              restoredIndex = parsed.currentIndex;
            }
            if (typeof parsed.timeElapsed === 'number') {
              restoredTime = parsed.timeElapsed;
            }
          }
        }
      } catch (e) {
        console.warn("Could not read local practice set attempt:", e);
      }

      // 2. Also check Firestore quizHistory if user is logged in
      if (currentUser) {
        try {
          const historyDocId = `jlpt-n3-practice-sets-${setId}${sectionId ? `-${sectionId}` : ''}`;
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
                if (typeof histData.timeElapsed === 'number') {
                  restoredTime = histData.timeElapsed;
                }
              }
            }
          }
        } catch (e) {
          console.warn("Could not read Firestore quiz state:", e);
        }
      }

      if (Object.keys(restoredAnswers).length > 0) {
        setAnswers(restoredAnswers);
        if (restoredTime > 0) setTimerSeconds(restoredTime);
        const firstUnanswered = questions.findIndex(q => restoredAnswers[q.id] === undefined);
        if (firstUnanswered !== -1) {
          setCurrentIndex(firstUnanswered);
        } else if (restoredIndex >= 0 && restoredIndex < questions.length) {
          setCurrentIndex(restoredIndex);
        }
      }
      setAttemptRestored(true);
    };

    restoreAttempt();
  }, [questions, attemptRestored, getStorageKey, currentUser, setId, sectionId]);

  const correctCount = useMemo(() => {
    let count = 0;
    Object.keys(answers).forEach(qId => {
      const q = questions.find(qu => qu.id.toString() === qId.toString());
      if (q && answers[qId] === q.correctIndex) {
        count++;
      }
    });
    return count;
  }, [answers, questions]);

  const overallPercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Persist attempt to localStorage and Firestore
  const persistAttempt = useCallback(async (nextAnswers, targetIndex, isFinal = false) => {
    if (!currentSet || totalQuestions === 0) return;

    const storageKey = getStorageKey();
    const ansCount = Object.keys(nextAnswers).length;
    
    let score = 0;
    Object.keys(nextAnswers).forEach(qId => {
      const q = questions.find(qu => qu.id.toString() === qId.toString());
      if (q && nextAnswers[qId] === q.correctIndex) {
        score++;
      }
    });

    const isAllAnswered = ansCount === totalQuestions;
    const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    
    let status = 'incomplete';
    if (isAllAnswered || isFinal) {
      if (accuracy >= 80 && score > 0) {
        status = 'mastered';
      } else if (isAllAnswered) {
        status = 'completed';
      }
    }

    const historyDocId = `jlpt-n3-practice-sets-${setId}${sectionId ? `-${sectionId}` : ''}`;
    const record = {
      quizId: historyDocId,
      bookId: 'jlpt-n3-practice-sets',
      setId: setId,
      sectionId: sectionId || 'full',
      title: `JLPT N3 直前対策 — ${currentSet.title || `Set ${setId}`} (${pageTitle})`,
      level: 'N3',
      category: 'Chokuzen Taisaku',
      type: 'practice',
      score: score,
      total: totalQuestions,
      answered: ansCount,
      answers: nextAnswers,
      currentIndex: targetIndex,
      percentage: accuracy,
      status,
      // Official JLPT Scaled Scoring Fields
      totalScaledScore: scoreReport?.totalScaledScore,
      maxScore: scoreReport?.maxScore,
      overallPassMark: scoreReport?.overallPassMark,
      isPassed: scoreReport?.isPassed,
      failReason: scoreReport?.failReason,
      allSectionsPassed: scoreReport?.allSectionsPassed,
      sectionsBreakdown: scoreReport?.sections,
      timeElapsed: timerSeconds,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    // 1. Session storage
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        answers: nextAnswers,
        currentIndex: targetIndex,
        timeElapsed: timerSeconds
      }));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }

    // 2. Global quizHistory for Profile Activity List
    try {
      const localHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
      const existingIdx = localHistory.findIndex(h => (h.quizId || h.id) === historyDocId);
      if (existingIdx >= 0) {
        localHistory[existingIdx] = { ...localHistory[existingIdx], ...record };
      } else {
        localHistory.unshift(record);
      }
      localStorage.setItem('quizHistory', JSON.stringify(localHistory));
    } catch (e) {
      console.warn("Could not save to global quizHistory:", e);
    }

    // 3. User Firestore history
    if (currentUser) {
      try {
        const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId);
        await setDoc(historyDocRef, record, { merge: true });
      } catch (err) {
        console.warn("Error saving quiz history to Firestore:", err);
      }
    }
  }, [currentSet, totalQuestions, getStorageKey, setId, sectionId, pageTitle, questions, timerSeconds, currentUser]);

  const handleAttemptExit = () => {
    if (answeredCount > 0 && !isFinished) {
      setShowExitModal(true);
    } else {
      navigate(`/practice-sets/${setId}`);
    }
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    navigate(`/practice-sets/${setId}`);
  };

  const handleReset = () => {
    if (!window.confirm("Are you sure you want to reset this drill? All your answers will be cleared so you can retake every question from scratch.")) return;
    
    setAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
    setTimerSeconds(0);

    const storageKey = getStorageKey();
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
      console.warn("Could not clear localStorage:", e);
    }

    const historyDocId = `jlpt-n3-practice-sets-${setId}${sectionId ? `-${sectionId}` : ''}`;
    try {
      const localHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
      const existingIdx = localHistory.findIndex(h => (h.quizId || h.id) === historyDocId);
      if (existingIdx >= 0) {
        localHistory.splice(existingIdx, 1);
        localStorage.setItem('quizHistory', JSON.stringify(localHistory));
      }
    } catch (e) {
      console.warn("Could not clear global quizHistory entry:", e);
    }

    if (currentUser) {
      const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId);
      deleteDoc(historyDocRef).catch(err => console.warn("Could not delete doc from Firestore:", err));
    }
  };

  if (loading) return <div className="text-white p-20 text-center">Loading N3 Quiz Data...</div>;
  if (!currentSet) return <div className="text-white p-20 text-center">Set not found in Firebase.</div>;
  if (totalQuestions === 0) return <div className="text-white p-20 text-center">No questions available.</div>;

  const handleOptionSelect = (questionId, optionIndex) => {
    if (answers[questionId] !== undefined) return;

    const nextAnswers = { ...answers, [questionId]: optionIndex };
    setAnswers(nextAnswers);
    persistAttempt(nextAnswers, currentIndex, false);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      persistAttempt(answers, nextIdx, false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      persistAttempt(answers, prevIdx, false);
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
    setTimerActive(false);
    setShowCertificateModal(true);
    persistAttempt(answers, currentIndex, true);
  };

  // Completion View
  if (isFinished) {
    const isPassed = scoreReport?.isPassed;
    const totalScaled = scoreReport?.totalScaledScore || 0;
    const maxScaled = scoreReport?.maxScore || 120;
    const passThreshold = scoreReport?.overallPassMark || 63;
    const failReason = scoreReport?.failReason;

    return (
      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in pt-[84px] md:pt-[96px]">
        {/* Certificate Modal */}
        <JlptScoreCertificateModal
          isOpen={showCertificateModal}
          scoreReport={scoreReport}
          onClose={() => setShowCertificateModal(false)}
          onRetake={handleReset}
          onBackToList={() => navigate(`/practice-sets/${setId}`)}
        />

        <div className="mb-6 flex items-center justify-between">
          <Link to={`/practice-sets/${setId}`} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors inline-block">
            &larr; Back to Set Details
          </Link>
          <button
            type="button"
            onClick={() => setShowCertificateModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800 hover:bg-amber-100 transition-all cursor-pointer"
          >
            <span>📜</span>
            <span>View Certificate (合否結果通知書)</span>
          </button>
        </div>

        <Card className="text-center p-6 sm:p-10 shadow-2xl border border-[var(--color-border)] w-full relative overflow-hidden">
          {/* Authentic Pass/Fail Stamp */}
          <div className="flex justify-center mb-4">
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 flex flex-col items-center justify-center font-black uppercase tracking-wider transform rotate-[-8deg] shadow-md select-none ${
                isPassed
                  ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                  : 'border-rose-600 bg-rose-50/80 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
              }`}
            >
              <span className="text-base sm:text-xl leading-none">
                {isPassed ? '合格' : '不合格'}
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-bold mt-1 tracking-widest">
                {isPassed ? 'PASSED' : 'FAILED'}
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-1">
            N3 {currentSet.title}
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            {pageTitle} &bull; Time: {formatTime(timerSeconds)}
          </p>

          {/* Sectional Failure Alert */}
          {failReason === 'sectional_insufficient' && (
            <div className="max-w-xl mx-auto mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm text-left">
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <span>⚠️</span>
                <span>Sectional Threshold Not Met (基準点未達)</span>
              </div>
              <p>
                Your overall score reached <span className="font-mono font-black">{totalScaled} / {maxScaled} 点</span> (which meets the passing mark), but you did not pass because at least one section scored below the official <span className="font-bold">19-point minimum threshold</span>.
              </p>
            </div>
          )}

          {/* Official JLPT Scaled Scores Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto mb-6">
            <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center">
              <span className="text-[11px] font-black uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">
                Scaled Score
              </span>
              <span className={`block text-3xl font-black font-mono ${isPassed ? 'text-emerald-500' : 'text-[var(--color-text-primary)]'}`}>
                {totalScaled} <span className="text-sm font-normal text-gray-400">/ {maxScaled} 点</span>
              </span>
              <span className="text-[11px] font-bold text-[var(--color-text-muted)] mt-1 block">
                Pass Mark: {passThreshold} 点
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center">
              <span className="text-[11px] font-black uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">
                Raw Accuracy
              </span>
              <span className="block text-3xl font-black font-mono text-emerald-400">
                {overallPercent}%
              </span>
              <span className="text-[11px] font-bold text-[var(--color-text-muted)] mt-1 block">
                {correctCount} / {totalQuestions} Correct
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center">
              <span className="text-[11px] font-black uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">
                Time Elapsed
              </span>
              <span className="block text-3xl font-black font-mono text-[var(--color-text-primary)]">
                {formatTime(timerSeconds)}
              </span>
              <span className="text-[11px] font-bold text-[var(--color-text-muted)] mt-1 block">
                {isPassed ? '✓ Qualified' : '✕ Unqualified'}
              </span>
            </div>
          </div>

          {/* Sectional Score Breakdown (each with 19-pt threshold) */}
          {scoreReport?.sections?.length > 0 && (
            <div className="max-w-xl mx-auto mb-6 text-left">
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-[var(--color-text-muted)] mb-3 px-1">
                <span>得点区分 • Sectional Breakdown</span>
                <span>基準点 • Min 19 点</span>
              </div>
              <div className="space-y-2">
                {scoreReport.sections.map((sec, idx) => (
                  <div
                    key={sec.sectionId || idx}
                    className="p-3 sm:p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-xs bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)] truncate">
                        {sec.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono font-black text-xs sm:text-sm text-[var(--color-text-primary)]">
                        {sec.scaledScore} / {sec.maxPoints} 点
                      </span>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase font-mono ${
                          sec.isPassed
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                        }`}
                      >
                        {sec.isPassed ? 'PASS' : 'FAIL (<19)'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Question Breakdown Box in Results Screen */}
          <div className="p-4 sm:p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-sm mb-6 text-left">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3 pb-2 border-b border-[var(--color-border)]">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--color-text-secondary)] flex items-center gap-1.5">
                <span>🗂️</span> Question Review Breakdown
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">Click any question to review</span>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-2.5 justify-center sm:justify-start">
              {questions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isCorrect = isAnswered && answers[q.id] === q.correctIndex;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      setIsFinished(false);
                      setCurrentIndex(idx);
                    }}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center border cursor-pointer ${
                      isAnswered
                        ? isCorrect
                          ? 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500 shadow-sm'
                          : 'bg-rose-600 text-white border-rose-500 hover:bg-rose-500 shadow-sm'
                        : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] border-[var(--color-border)]'
                    }`}
                    title={`Q${idx + 1}: ${isAnswered ? (isCorrect ? 'Correct' : 'Incorrect') : 'Unanswered'}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons: Reset, Review, Certificate, Activity List */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-red-300 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 font-semibold cursor-pointer"
            >
              🔄 Reset & Retake
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsFinished(false);
                setCurrentIndex(0);
              }}
              className="cursor-pointer"
            >
              📝 Review Answers
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowCertificateModal(true)}
              className="border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30 font-bold cursor-pointer"
            >
              📜 Score Certificate
            </Button>
            <Link
              to="/profile"
              className="px-4 py-2 rounded-xl text-sm font-medium border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] transition-colors text-[var(--color-text-primary)] inline-flex items-center gap-1.5"
            >
              🕒 Activity List
            </Link>
            <Button
              variant="outline"
              onClick={() => navigate(`/practice-sets/${setId}`)}
              className="cursor-pointer"
            >
              &larr; Back to Set
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const selectedIdx = answers[currentQ.id];
  const hasPassage = Boolean(currentQ.passageText || currentQ.imageSrc);

  const renderQuestionCard = () => (
    <Card className="w-full scroll-mt-20">
      <div className="mb-6">
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-xs bg-emerald-600">
              {currentIndex + 1}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
          </div>
          <span className="text-xs font-medium text-[var(--color-text-muted)]">
            {currentQ.options?.length || 4} Choices
          </span>
        </div>

        {currentQ.instruction && (
          <p className="text-xs font-medium mb-4 text-[var(--color-text-muted)] japanese-text leading-relaxed">
            {currentQ.instruction}
          </p>
        )}

        <h2 className="text-xl md:text-2xl font-medium japanese-text leading-relaxed" dangerouslySetInnerHTML={{ __html: (() => {
          let html = currentQ.questionText;
          const instr = currentQ.instruction || '';
          const isMondai1 = instr.includes('問題1') && currentQ.sectionType === 'vocabulary-kanji';
          const isMondai2 = instr.includes('問題2') && currentQ.sectionType === 'vocabulary-kanji';
          if (isMondai1) {
            html = html
              .replace(/<rp[^>]*>[\s\S]*?<\/rp>/gi, '')
              .replace(/<rt[^>]*>[\s\S]*?<\/rt>/gi, '')
              .replace(/<\/?ruby[^>]*>/gi, '');
          } else if (isMondai2) {
            html = html.replace(/<ruby[^>]*>[\s\S]*?<rt[^>]*>([\s\S]*?)<\/rt>[\s\S]*?<\/ruby>/gi, '$1');
          }
          return html.replace(/ (A「|B「|A：|B：|男：|女：|男の人：|女の人：|店員：|客：|Ａ「|Ｂ「|Ａ：|Ｂ：)/g, '<br />$1');
        })() }}></h2>
      </div>

      <div className="space-y-3 mb-8">
        {currentQ.options.map((opt, optIdx) => {
          const instr = currentQ.instruction || '';
          const isMondai2 = instr.includes('問題2') && currentQ.sectionType === 'vocabulary-kanji';
          const displayOpt = isMondai2
            ? opt
                .replace(/<rp[^>]*>[\s\S]*?<\/rp>/gi, '')
                .replace(/<rt[^>]*>[\s\S]*?<\/rt>/gi, '')
                .replace(/<\/?ruby[^>]*>/gi, '')
            : opt;
          return (
            <OptionButton 
              key={optIdx}
              text={displayOpt}
              index={optIdx}
              isSelected={selectedIdx === optIdx}
              isCorrect={currentQ.correctIndex !== -1 ? currentQ.correctIndex === optIdx : null}
              feedbackMode="Immediate"
              onClick={() => handleOptionSelect(currentQ.id, optIdx)}
              disabled={selectedIdx !== undefined}
            />
          );
        })}
      </div>

      {/* Dedicated Explanation Card when question is answered */}
      {selectedIdx !== undefined && currentQ.explanation && (
        <div className="mt-5 p-4.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-sm animate-fade-in text-left">
          <div className="flex items-center gap-2 mb-3 text-xs font-black uppercase tracking-wider text-emerald-500">
            <span className="text-base">💡</span>
            <span>解説 • Explanation</span>
          </div>

          <div className="space-y-2.5 text-sm md:text-base leading-relaxed">
            {(() => {
              const parsedLines = [];
              currentQ.explanation.split('\n').forEach(raw => {
                const trimmed = raw.trim();
                if (!trimmed) return;
                // If line ends with an inline (English) translation
                const match = trimmed.match(/^(.*?)(?:\s*[\(（]([A-Za-z][^()（）]{2,})[\)）]\s*)$/);
                if (match && !trimmed.startsWith('【英訳】') && !trimmed.startsWith('【正解】')) {
                  if (match[1].trim()) parsedLines.push(match[1].trim());
                  parsedLines.push(`【英訳】${match[2].trim()}`);
                } else {
                  parsedLines.push(trimmed);
                }
              });

              return parsedLines.map((line, lIdx) => {
                // English Translation on its OWN NEW LINE
                if (line.startsWith('【英訳】') || line.startsWith('【英語訳】') || line.startsWith('English:')) {
                  const engText = line.replace(/^(?:【(?:英訳|英語訳)】|English:)\s*/, '');
                  return (
                    <div key={lIdx} className="pt-2">
                      <div className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <span>🌐</span>
                        <span>English Translation</span>
                      </div>
                      <div className="text-[var(--color-text-secondary)] italic pl-3 border-l-2 border-emerald-500/60 bg-[var(--color-bg-tertiary,rgba(255,255,255,0.03))] py-2 px-3 rounded-r-lg">
                        {engText}
                      </div>
                    </div>
                  );
                }

                // Correct Answer line
                if (line.startsWith('【正解】') || line.startsWith('【★ 正解】')) {
                  return (
                    <div key={lIdx} className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <span>✓</span>
                      <span>{line}</span>
                    </div>
                  );
                }

                // Meaning / Context line
                if (line.startsWith('【意味】') || line.startsWith('【文脈】')) {
                  return (
                    <div key={lIdx} className="font-medium text-[var(--color-text-primary)]">
                      {line}
                    </div>
                  );
                }

                // Word Order
                if (line.startsWith('【語順】') || line.startsWith('語順：')) {
                  return (
                    <div key={lIdx} className="font-semibold text-amber-400 bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/20">
                      {line}
                    </div>
                  );
                }

                // Commentary / Notes
                return (
                  <div key={lIdx} className="text-[var(--color-text-secondary)] leading-relaxed">
                    {line}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-[var(--color-border)] mt-8">
        <Button variant="outline" onClick={handlePrev} disabled={currentIndex === 0}>
          &larr; Previous
        </Button>

        {currentIndex < totalQuestions - 1 ? (
          <Button variant="primary" onClick={handleNext}>
            Next &rarr;
          </Button>
        ) : (
          <Button variant="primary" onClick={handleFinish} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
            Finish Quiz 🏆
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in pt-[84px] md:pt-[96px]">
      
      {/* Top Header matching other books */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <button
            type="button"
            onClick={handleAttemptExit}
            className="inline-flex items-center text-sm font-medium transition-colors mb-1 hover:underline cursor-pointer bg-transparent border-0 p-0 text-[var(--color-text-muted)]"
          >
            &larr; Back to Sets
          </button>
          <h1 className="text-xl font-bold flex items-center gap-2 text-[var(--color-text-primary)]">
            <span>{currentSet.title}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-md font-bold text-white bg-emerald-600">
              N3
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-md font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
              {pageTitle}
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Score Pill */}
          <span 
            className="text-xs font-bold px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-emerald-400 flex items-center gap-1.5"
            title="Current score / Answered count"
          >
            <span>Score:</span>
            <span>{correctCount}/{answeredCount}</span>
            <span className="text-[var(--color-text-muted)] font-normal">({totalQuestions})</span>
          </span>

          {/* Reset Button */}
          <button
            type="button"
            onClick={handleReset}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-red-300 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
            title="Reset all answers"
          >
            <span>🔄</span>
            <span>Reset</span>
          </button>

          {/* Review / Finish Button */}
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={handleFinish}
              className="text-xs px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              title="Finish and Review Answers"
            >
              <span>📝</span>
              <span>Review</span>
            </button>
          )}

          {/* Activity List Link */}
          <Link
            to="/profile"
            className="text-xs px-2.5 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] transition-colors text-[var(--color-text-secondary)] flex items-center gap-1.5 font-medium cursor-pointer"
            title="Open Activity List in Profile"
          >
            <span>🕒</span>
            <span>Activity List</span>
          </Link>
        </div>
      </div>

      {/* Question Navigator Box - No scrolling, wrapped tiles */}
      <div className="w-full mb-6 p-4 sm:p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-3.5 pb-2.5 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <span className="text-base">🗂️</span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Question Navigator
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-muted)] font-semibold">
              {answeredCount} / {totalQuestions} Answered
            </span>
          </div>

          {/* Color Status Legend */}
          <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 inline-block shadow-sm"></span>
              <span>Correct</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-600 inline-block shadow-sm"></span>
              <span>Incorrect</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] inline-block"></span>
              <span>Unanswered</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm ring-2 ring-emerald-500 inline-block"></span>
              <span>Current</span>
            </span>
          </div>
        </div>

        {/* Wrapped Grid of Questions - Zero horizontal scrolling */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCorrect = isAnswered && answers[q.id] === q.correctIndex;
            const isCurrent = idx === currentIndex;

            let btnClass = "w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center border cursor-pointer select-none ";
            if (isCurrent) {
              btnClass += "ring-2 ring-emerald-500 ring-offset-2 ring-offset-[var(--color-bg-primary)] scale-105 z-10 font-extrabold shadow-md ";
            }
            if (isAnswered) {
              btnClass += isCorrect 
                ? "bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500 shadow-sm " 
                : "bg-rose-600 text-white border-rose-500 hover:bg-rose-500 shadow-sm ";
            } else {
              btnClass += "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-border)] hover:text-[var(--color-text-primary)] ";
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={btnClass}
                title={`Question ${idx + 1}${isAnswered ? (isCorrect ? ' (Correct)' : ' (Incorrect)') : ' (Unanswered)'}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Passage Reference Box if question has passage or image */}
      {hasPassage && (
        <Card className="w-full mb-6 p-5 sm:p-6 shadow-sm border border-[var(--color-border)]">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--color-border)]">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--color-text-secondary)] flex items-center gap-1.5">
              <span>📖</span>
              <span>Reading Passage / Reference</span>
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-medium">
              Reference for Q{currentIndex + 1}
            </span>
          </div>

          {currentQ.imageSrc && (
            <div className="mb-4 rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-sm text-center">
              <img 
                src={currentQ.imageSrc} 
                alt="Passage Reference" 
                className="max-w-full max-h-[520px] object-contain mx-auto"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          )}

          {currentQ.passageText && (
            <div className="p-4 md:p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl shadow-inner max-h-[500px] overflow-y-auto custom-scrollbar">
              <div 
                className="text-base md:text-lg text-[var(--color-text)] japanese-text leading-loose whitespace-pre-wrap" 
                dangerouslySetInnerHTML={{ __html: currentQ.passageText }} 
              />
            </div>
          )}
        </Card>
      )}

      {/* Main Question & Option Box (Exact same width as Question Navigator) */}
      <div className="w-full mb-6">
        {renderQuestionCard()}
      </div>

      {/* Exit Confirmation Modal */}
      <ExitConfirmModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={handleConfirmExit}
        answeredCount={Object.keys(answers).length}
        totalQuestions={totalQuestions}
      />
    </div>
  );
};

export default N3PracticeSetQuizPage;
