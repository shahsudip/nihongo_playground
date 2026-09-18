// src/components/DailySprintRunnerPage.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { getShinkanzenSprintByDay } from '../utils/dailySprintGenerator.js';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import '../assets/daily_sprint.css';

const DailySprintRunnerPage = () => {
  const { bookId = 'shinkanzen-master-n3-reading', dayNumber = '1' } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const sprint = useMemo(() => {
    return getShinkanzenSprintByDay(dayNumber);
  }, [dayNumber]);

  // Passage and Question state
  const [activePassageIndex, setActivePassageIndex] = useState(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // User answers state: key = `${passageIndex}-${qIndex}`, value = optionNumber (1..4)
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});

  // Countdown Timer state (20 mins = 1200 seconds)
  const [secondsLeft, setSecondsLeft] = useState(() => (sprint?.allocatedSeconds || 1200));
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [savingScore, setSavingScore] = useState(false);

  // Text size zoom & Furigana state
  const [textSize, setTextSize] = useState('normal'); // 'normal', 'large', 'xl'
  const [showFurigana, setShowFurigana] = useState(true);

  const timerRef = useRef(null);

  // Countdown timer interval
  useEffect(() => {
    if (isCompleted || isTimerPaused) return;

    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleFinishMission();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isCompleted, isTimerPaused]);

  if (!sprint) {
    return (
      <div className="sprint-page-wrapper flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Daily Sprint Not Found</h2>
          <Link to={`/books/${bookId}`} className="profile-btn profile-btn-primary">
            Back to Book Index
          </Link>
        </div>
      </div>
    );
  }

  const currentPassage = sprint.passages[activePassageIndex] || sprint.passages[0];
  const currentQuestions = currentPassage?.questions || [];
  const currentQuestion = currentQuestions[activeQuestionIndex] || currentQuestions[0];

  // Format mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isTimerWarning = secondsLeft <= 300 && secondsLeft > 120; // 5 mins
  const isTimerDanger = secondsLeft <= 120; // 2 mins

  const currentKey = `${activePassageIndex}-${activeQuestionIndex}`;
  const isCurrentSubmitted = Boolean(submittedAnswers[currentKey]);
  const currentChoice = selectedAnswers[currentKey];

  // Handle option selection
  const handleSelectOption = (optIndex) => {
    if (isCurrentSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentKey]: optIndex
    }));
  };

  // Submit answer for instant feedback
  const handleSubmitCurrentAnswer = () => {
    if (!currentChoice) return;
    setSubmittedAnswers(prev => ({
      ...prev,
      [currentKey]: true
    }));
  };

  // Navigation between questions & passages
  const handleNext = () => {
    if (activeQuestionIndex < currentQuestions.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
    } else if (activePassageIndex < sprint.passages.length - 1) {
      setActivePassageIndex(prev => prev + 1);
      setActiveQuestionIndex(0);
    }
  };

  const handlePrev = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(prev => prev - 1);
    } else if (activePassageIndex > 0) {
      setActivePassageIndex(prev => prev - 1);
      const prevPassageQCount = sprint.passages[activePassageIndex - 1]?.questions?.length || 1;
      setActiveQuestionIndex(prevPassageQCount - 1);
    }
  };

  // Calculate total score
  const calculateTotalScore = () => {
    let score = 0;
    let total = 0;
    sprint.passages.forEach((p, pIdx) => {
      (p.questions || []).forEach((q, qIdx) => {
        total++;
        const key = `${pIdx}-${qIdx}`;
        if (selectedAnswers[key] === q.correct) {
          score++;
        }
      });
    });
    return { score, total };
  };

  // Finish Daily Mission & Award Streak
  const handleFinishMission = async () => {
    setIsCompleted(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const { score, total } = calculateTotalScore();

    // Auto record to database if user is logged in
    if (currentUser) {
      setSavingScore(true);
      try {
        const timeSpent = (sprint.allocatedSeconds || 1200) - secondsLeft;
        const historyData = {
          userId: currentUser.uid,
          bookId: bookId,
          quizId: sprint.sprintKey,
          title: sprint.title,
          dayNumber: sprint.dayNumber,
          score: score,
          total: total,
          percentage: total > 0 ? Math.round((score / total) * 100) : 0,
          status: score / (total || 1) >= 0.75 ? 'mastered' : 'completed',
          type: 'daily_sprint',
          level: 'N3',
          timeSpentSeconds: timeSpent,
          timestamp: new Date().toISOString(),
          createdAt: new Date().toISOString()
        };

        const colRef = collection(db, 'users', currentUser.uid, 'quizHistory');
        await addDoc(colRef, historyData);
      } catch (err) {
        console.warn("Failed to record sprint score:", err);
      } finally {
        setSavingScore(false);
      }
    }
  };

  const scoreData = calculateTotalScore();
  const nextDayNumber = parseInt(sprint.dayNumber, 10) + 1;

  // Render Mission Complete Screen
  if (isCompleted) {
    const accuracy = scoreData.total > 0 ? Math.round((scoreData.score / scoreData.total) * 100) : 0;
    const isPassed = accuracy >= 75;

    return (
      <div className="sprint-page-wrapper flex items-center justify-center p-6">
        <div className="sprint-complete-card">
          <div className="text-5xl mb-3">{isPassed ? '🔥 🏆' : '📚 ⏱️'}</div>
          <h2 className="text-2xl font-black mb-1">
            {isPassed ? `Day ${sprint.dayNumber} Mission Accomplished!` : `Day ${sprint.dayNumber} Sprint Finished`}
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            {isPassed ? 'Daily streak checkpoint verified. Great speed & accuracy!' : 'Review your passages and continue building your reading stamina.'}
          </p>

          {/* Key Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '14px 10px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#10b981' }}>{scoreData.score} / {scoreData.total}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>Score ({accuracy}%)</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '14px 10px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#38bdf8' }}>{formatTime((sprint.allocatedSeconds || 1200) - secondsLeft)}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>Time Taken</div>
            </div>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', padding: '14px 10px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#f59e0b' }}>🔥 +1</div>
              <div style={{ fontSize: '0.75rem', color: '#f59e0b', marginTop: '2px' }}>Streak Awarded</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link
              to="/profile"
              className="profile-btn profile-btn-secondary"
              style={{ flex: 1, padding: '12px 18px', justifyContent: 'center' }}
            >
              📊 Profile &amp; Streak
            </Link>
            {nextDayNumber <= 15 ? (
              <button
                type="button"
                onClick={() => {
                  setIsCompleted(false);
                  navigate(`/books/${bookId}/sprint/${nextDayNumber}`);
                  window.location.reload();
                }}
                className="profile-btn profile-btn-primary"
                style={{ flex: 1.5, padding: '12px 18px', justifyContent: 'center', background: 'linear-gradient(135deg, #10b981, #059669)' }}
              >
                🚀 Start Day {nextDayNumber} &rarr;
              </button>
            ) : (
              <Link
                to={`/books/${bookId}`}
                className="profile-btn profile-btn-primary"
                style={{ flex: 1.5, padding: '12px 18px', justifyContent: 'center' }}
              >
                🎓 Return to Book
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sprint-page-wrapper">
      {/* 1. Floating HUD Header */}
      <header className="sprint-hud-header">
        <div className="sprint-hud-title">
          <span className="sprint-day-badge">Day {sprint.dayNumber} Sprint</span>
          <span className="hidden sm:inline text-sm font-semibold text-[var(--color-text-secondary)]">
            Shinkanzen Master N3 Reading
          </span>
        </div>

        {/* Passage Stepper Tabs */}
        <div className="sprint-step-tabs">
          {sprint.passages.map((p, pIdx) => {
            const isCurrent = pIdx === activePassageIndex;
            // Check if all questions in this passage are answered
            const isAllAnswered = (p.questions || []).every((_, qIdx) => selectedAnswers[`${pIdx}-${qIdx}`]);

            return (
              <button
                key={p.id || pIdx}
                type="button"
                onClick={() => {
                  setActivePassageIndex(pIdx);
                  setActiveQuestionIndex(0);
                }}
                className={`sprint-step-pill ${isCurrent ? 'active' : ''} ${isAllAnswered ? 'completed' : ''}`}
              >
                <span>{pIdx + 1}. {p.genre.split('・')[0] || `P${pIdx + 1}`}</span>
                {isAllAnswered && <span>✓</span>}
              </button>
            );
          })}
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-3">
          <div className={`sprint-timer-pill ${isTimerDanger ? 'sprint-timer-danger' : isTimerWarning ? 'sprint-timer-warning' : ''}`}>
            <span>⏱️</span>
            <span>{formatTime(secondsLeft)}</span>
            <button
              type="button"
              onClick={() => setIsTimerPaused(prev => !prev)}
              className="text-xs opacity-75 hover:opacity-100 ml-1"
              title={isTimerPaused ? 'Resume Timer' : 'Pause Timer'}
            >
              {isTimerPaused ? '▶' : '⏸'}
            </button>
          </div>

          <button
            type="button"
            onClick={handleFinishMission}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm whitespace-nowrap"
          >
            Submit Mission
          </button>
        </div>
      </header>

      {/* 2. Stacked Workspace (Passage Reader on Top, Question Directly Underneath) */}
      <main className="sprint-workspace">
        {/* TOP: Passage View Card */}
        <div className="sprint-passage-card" id="passage-card">
          <div className="sprint-passage-header">
            <div className="flex items-center gap-2">
              <span className="sprint-genre-badge">{currentPassage.genre}</span>
              <span className="text-xs font-semibold text-[var(--color-text-secondary)]">{currentPassage.genreEn}</span>
            </div>

            {/* Controls: Furigana Toggle + Font Zoom */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowFurigana(prev => !prev)}
                className={`px-2.5 py-1 rounded text-xs font-bold transition border ${
                  showFurigana
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border-[var(--color-border)]'
                }`}
                title="Toggle Furigana / Ruby Readings"
              >
                {showFurigana ? 'ふりがな ON' : 'ふりがな OFF'}
              </button>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setTextSize(prev => prev === 'xl' ? 'large' : 'normal')}
                  className="px-2 py-1 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded text-xs font-bold"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => setTextSize(prev => prev === 'normal' ? 'large' : 'xl')}
                  className="px-2 py-1 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded text-xs font-bold"
                >
                  A+
                </button>
              </div>
            </div>
          </div>

          {/* Mondai Prompt Header if available */}
          {currentPassage.mondaiHeader && (
            <div
              className="text-xs font-semibold text-[var(--color-text-secondary)] mb-4 p-3 bg-[var(--color-bg-primary)] rounded-lg border border-[var(--color-border)] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentPassage.mondaiHeader }}
            />
          )}

          {/* Passage Text */}
          <div
            className={`sprint-passage-body ${!showFurigana ? 'hide-furigana' : ''} ${textSize === 'large' ? 'text-lg leading-[2.3]' : textSize === 'xl' ? 'text-xl leading-[2.5]' : ''}`}
            dangerouslySetInnerHTML={{ __html: currentPassage.passageText }}
          />

          {/* Footnotes if available */}
          {currentPassage.footnotes && currentPassage.footnotes.length > 0 && (
            <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
              <h4 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Footnotes</h4>
              <div className="space-y-1.5 text-xs text-[var(--color-text-secondary)]">
                {currentPassage.footnotes.map((fn, fIdx) => (
                  <div key={fIdx} className="flex gap-2">
                    <span dangerouslySetInnerHTML={{ __html: fn.term || `(${fIdx + 1})` }} />
                    <span>: {fn.definition}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vocabulary Bank */}
          {currentPassage.vocabulary && currentPassage.vocabulary.length > 0 && (
            <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
              <h4 className="text-xs font-bold text-[#38bdf8] uppercase tracking-wider mb-2">Key Vocabulary</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {currentPassage.vocabulary.slice(0, 6).map((v, vIdx) => (
                  <div key={vIdx} className="p-2 bg-[var(--color-bg-primary)] rounded border border-[var(--color-border)]">
                    <strong className="text-[var(--color-text-primary)]">{v.word}</strong> <span className="opacity-75">({v.reading})</span>
                    <div className="opacity-80 text-[11px] truncate">{v.meaning}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Jump Anchor to Question */}
          <div className="flex justify-end mt-6 pt-4 border-t border-[var(--color-border)]">
            <a href="#question-card" className="sprint-anchor-btn">
              👇 Answer Question ({activeQuestionIndex + 1}/{currentQuestions.length || 1})
            </a>
          </div>
        </div>

        {/* BOTTOM: Question & Answer Desk Card */}
        <div className="sprint-question-card" id="question-card">
          <div className="flex justify-between items-center mb-3">
            <div className="sprint-q-header">
              Passage {activePassageIndex + 1} of {sprint.passages.length} • Question {activeQuestionIndex + 1} of {currentQuestions.length || 1}
            </div>
            <a href="#passage-card" className="sprint-anchor-btn" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
              👆 Review Passage Text
            </a>
          </div>

          <div
            className="sprint-q-prompt"
            dangerouslySetInnerHTML={{ __html: currentQuestion?.questionText || '質問に答えなさい。' }}
          />

          {/* Options Grid */}
          <div className="sprint-options-grid">
            {(currentQuestion?.options || []).map((optionText, optIdx) => {
              const optNum = optIdx + 1;
              const isSelected = currentChoice === optNum;
              const isCorrectOption = currentQuestion?.correct === optNum;

              let optionClass = '';
              if (isCurrentSubmitted) {
                if (isCorrectOption) optionClass = 'correct';
                else if (isSelected) optionClass = 'wrong';
              } else if (isSelected) {
                optionClass = 'selected';
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={isCurrentSubmitted}
                  onClick={() => handleSelectOption(optNum)}
                  className={`sprint-option-btn ${optionClass}`}
                >
                  <span className="sprint-option-num">{optNum}</span>
                  <span className="flex-1" dangerouslySetInnerHTML={{ __html: optionText }} />
                </button>
              );
            })}
          </div>

          {/* Action Button: Check Answer / Next */}
          <div className="flex items-center gap-3">
            {!isCurrentSubmitted ? (
              <button
                type="button"
                disabled={!currentChoice}
                onClick={handleSubmitCurrentAnswer}
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark disabled:opacity-40 text-white font-bold transition shadow-md"
              >
                Check Answer
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-md"
              >
                Next Question &rarr;
              </button>
            )}
          </div>

          {/* Instant Feedback & Explanation Box */}
          {isCurrentSubmitted && (
            <div className="sprint-explanation-box">
              <div className="flex items-center gap-2 mb-2 font-bold text-emerald-400">
                <span>{currentChoice === currentQuestion.correct ? '✓ Correct!' : '✕ Incorrect'}</span>
                <span className="text-xs text-[var(--color-text-secondary)] font-normal">
                  (Correct Answer: Option {currentQuestion.correct})
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed m-0">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Bottom Pagination Controls */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-[var(--color-border)]">
            <button
              type="button"
              disabled={activePassageIndex === 0 && activeQuestionIndex === 0}
              onClick={handlePrev}
              className="text-xs font-bold text-[var(--color-text-secondary)] hover:text-white disabled:opacity-30"
            >
              &larr; Previous
            </button>
            <span className="text-xs text-[var(--color-text-secondary)] font-medium">
              Passage {activePassageIndex + 1}/{sprint.passages.length}
            </span>
            <button
              type="button"
              disabled={activePassageIndex === sprint.passages.length - 1 && activeQuestionIndex === currentQuestions.length - 1}
              onClick={handleNext}
              className="text-xs font-bold text-[var(--color-text-secondary)] hover:text-white disabled:opacity-30"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DailySprintRunnerPage;
