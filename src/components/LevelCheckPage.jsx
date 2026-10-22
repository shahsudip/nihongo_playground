import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { doc, setDoc } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import { Card } from './ui/Card.jsx';
import { ExitConfirmModal } from './ui/ExitConfirmModal.jsx';
import { formatJlptRuby } from '../utils/jlptRubyParser.js';
import { STATIC_BOOKS } from '../data/static_books_catalog.js';
import {
  generateRandom20QuestionTest,
  evaluateLevelCheckResult,
  markQuestionsAsSeen,
} from '../utils/levelCheckEngine.js';

const MODE_CARDS = [
  {
    id: 'ALL',
    title: 'All-Levels Placement Check',
    subtitle: '総合レベル診断（N5 → N1）',
    badge: 'Recommended',
    icon: '🧭',
    color: 'from-emerald-600 to-teal-600',
    desc: 'Pulls 20 random questions across N5 through N1 from all textbooks, past exam papers, and static word banks to diagnose your true JLPT level.',
  },
  {
    id: 'N5',
    title: 'JLPT N5 Check',
    subtitle: '初級前半・基礎診断',
    badge: 'Beginner',
    icon: '🌱',
    color: 'from-cyan-500 to-sky-600',
    desc: '20 randomized N5 questions (4 Kanji, 4 Vocab, 6 Grammar, 4 Reading, 2 Listening Audio) pulled from N5 past exams, mock tests & static lists.',
  },
  {
    id: 'N4',
    title: 'JLPT N4 Check',
    subtitle: '初級後半・実力診断',
    badge: 'Elementary',
    icon: '🌿',
    color: 'from-amber-500 to-orange-600',
    desc: '20 randomized N4 questions pulled from Chokuzen Taisaku N4, Past Exam Papers, Mock Tests, and N4 Kanji/Vocab/Grammar lists.',
  },
  {
    id: 'N3',
    title: 'JLPT N3 Check',
    subtitle: '中級・総合実力診断',
    badge: 'Intermediate',
    icon: '🎋',
    color: 'from-emerald-500 to-green-600',
    desc: '20 randomized N3 questions pulled from Zenkamoku N3, Shin Kanzen, Speed Master, Sou Matome, Nihongo no Mori, Tango N3, Past Exams & Static Lists.',
  },
  {
    id: 'N2',
    title: 'JLPT N2 Check',
    subtitle: '中上級・ビジネス実力診断',
    badge: 'Upper-Int',
    icon: '🍁',
    color: 'from-purple-600 to-indigo-600',
    desc: '20 randomized N2 questions pulled from Zenkamoku N2, Tango N2 2500, Official Past Exam Papers, Mock Tests & Static Lists.',
  },
  {
    id: 'N1',
    title: 'JLPT N1 Check',
    subtitle: '上級・最高峰実力診断',
    badge: 'Advanced',
    icon: '👑',
    color: 'from-rose-600 to-pink-600',
    desc: '20 randomized N1 questions pulled from Zenkamoku N1, Tango N1 3000, Official Past Exam Papers, Mock Tests & Static Lists.',
  },
];

const CATEGORY_STEP_PILLS = [
  { key: 'kanji',     label: 'Q1–4 漢字',   icon: '🈁' },
  { key: 'vocab',     label: 'Q5–8 語彙',   icon: '📖' },
  { key: 'grammar',   label: 'Q9–14 文法',  icon: '⛩️' },
  { key: 'reading',   label: 'Q15–18 読解', icon: '📜' },
  { key: 'listening', label: 'Q19–20 聴解', icon: '🎧' },
];

export default function LevelCheckPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentUser } = useAuth();

  const initialLevelParam = (searchParams.get('level') || '').toUpperCase();

  // Stage: 'lobby' | 'loading' | 'quiz' | 'results'
  const [stage, setStage] = useState('lobby');
  const [selectedMode, setSelectedMode] = useState(
    ['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'].includes(initialLevelParam) ? initialLevelParam : 'ALL'
  );

  // Quiz state
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: 1..4 | 'skip' }
  const [feedbackMode, setFeedbackMode] = useState('Immediate'); // 'Immediate' | 'Exam'
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const [report, setReport] = useState(null);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'wrong' | 'correct'

  // Audio player state for Q19-Q20 Listening
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [showScript, setShowScript] = useState(false);

  // Timer during active quiz
  useEffect(() => {
    if (stage !== 'quiz') return;
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [stage]);

  // Reset audio player on question change
  useEffect(() => {
    setIsPlaying(false);
    setAudioProgress(0);
    setAudioDuration(0);
    setShowScript(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentIndex, stage]);

  const formatTime = (sec = 0) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Start a freshly randomized 20-question assessment
  const handleStartAssessment = async (modeToRun = selectedMode) => {
    setSelectedMode(modeToRun);
    setStage('loading');
    setAnswers({});
    setCurrentIndex(0);
    setElapsedSeconds(0);
    setReport(null);

    try {
      const generated = await generateRandom20QuestionTest(modeToRun);
      markQuestionsAsSeen(generated);
      setQuestions(generated);
      setStage('quiz');
    } catch (err) {
      console.error('Failed to generate random 20-question level check:', err);
      setStage('lobby');
    }
  };

  const currentQ = questions[currentIndex] || null;
  const userChoice = currentQ ? answers[currentQ.id] : undefined;
  const isAnswered = userChoice !== undefined;

  const handleSelectOption = (choiceValue) => {
    if (!currentQ) return;
    if (feedbackMode === 'Immediate' && isAnswered) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: choiceValue,
    }));
  };

  const handleFinishAssessment = async () => {
    const evalReport = evaluateLevelCheckResult(questions, answers, selectedMode, elapsedSeconds);
    setReport(evalReport);
    setStage('results');

    // Persist diagnosed level & history to localStorage & Firestore
    try {
      localStorage.setItem('user_target_level', evalReport.diagnosedLevel);
      localStorage.setItem('user_last_level_check', JSON.stringify({
        ...evalReport,
        timestamp: new Date().toISOString(),
      }));

      const historyEntry = {
        id: `level-check-${Date.now()}`,
        quizId: `level-check-${selectedMode.toLowerCase()}`,
        title: `Level Check (${selectedMode === 'ALL' ? 'N5→N1 Placement' : selectedMode}) — Diagnosed ${evalReport.diagnosedLevel}`,
        level: evalReport.diagnosedLevel,
        score: evalReport.totalCorrect,
        total: evalReport.totalQuestions,
        percentage: evalReport.accuracyPercent,
        scaledScore: evalReport.scaledScore180,
        status: evalReport.accuracyPercent >= 75 ? 'mastered' : 'completed',
        timestamp: new Date().toISOString(),
      };

      const localHist = JSON.parse(localStorage.getItem('quizHistory') || '[]');
      localStorage.setItem('quizHistory', JSON.stringify([historyEntry, ...localHist].slice(0, 150)));

      if (currentUser?.uid) {
        const ref = doc(db, 'users', currentUser.uid, 'quizHistory', historyEntry.id);
        await setDoc(ref, historyEntry, { merge: true });
      }
    } catch (e) {
      console.warn('Could not save level check history:', e);
    }
  };

  // Audio controls
  const toggleAudioPlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleAudioTimeUpdate = () => {
    if (!audioRef.current) return;
    setAudioProgress(audioRef.current.currentTime || 0);
    setAudioDuration(audioRef.current.duration || 0);
  };

  const handleAudioSeek = (e) => {
    const val = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setAudioProgress(val);
    }
  };

  const handleSpeedChange = (rate) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  // Recommended books for the diagnosed level
  const recommendedBooks = useMemo(() => {
    if (!report) return [];
    const target = report.diagnosedLevel;
    return STATIC_BOOKS.filter(b => {
      const bLvl = (b.level || '').toUpperCase();
      return bLvl === target || (target === 'N5' && bLvl.includes('N5')) || (target === 'N4' && bLvl.includes('N4'));
    }).slice(0, 4);
  }, [report]);

  // ---------------------------------------------------------------------------
  // STAGE 1: LOADING SCREEN
  // ---------------------------------------------------------------------------
  if (stage === 'loading') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <LoadingSpinner />
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mt-4">
          Gathering 20 Random Questions Across All Sources...
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md">
          Sampling Kanji (4), Vocabulary (4), Grammar (6), Reading Passages (4), and Listening Audio (2) from digitized textbooks, past exams, and static word banks.
        </p>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // STAGE 2: LOBBY (SELECT ALL-LEVELS OR SPECIFIC LEVEL)
  // ---------------------------------------------------------------------------
  if (stage === 'lobby') {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8 animate-fade-in">
        <div className="flex items-center justify-between gap-2 mb-6">
          <button
            type="button"
            onClick={() => navigate('/levels')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
          >
            <span>←</span>
            <span>Back to Levels</span>
          </button>

          <div className="inline-flex items-center gap-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-2xl p-1">
            <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 px-2.5">Feedback:</span>
            {['Immediate', 'Exam'].map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setFeedbackMode(m)}
                className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  feedbackMode === m
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {m === 'Immediate' ? '⚡ Instant Answer' : '📝 At End'}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase mb-3">
            <span>🎲</span>
            <span>Omni-Source Random Diagnostic • Fresh Every Time</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Check Your JLPT Level
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto font-medium">
            Every session dynamically pulls <strong>20 random questions</strong> from all digitized textbooks, official past exam papers, mock tests, and static vocabulary/kanji/grammar lists.
          </p>

          {/* 20-Question Structure Pill Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            {CATEGORY_STEP_PILLS.map(pill => (
              <span
                key={pill.key}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-white/10 text-xs font-bold text-gray-800 dark:text-gray-200 shadow-2xs"
              >
                <span>{pill.icon}</span>
                <span>{pill.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Mode Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODE_CARDS.map(card => (
            <div
              key={card.id}
              onClick={() => handleStartAssessment(card.id)}
              className="group cursor-pointer bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-emerald-500/60 dark:hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center text-3xl shadow-md`}>
                    {card.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40 text-xs font-black">
                    {card.badge}
                  </span>
                </div>

                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                  {card.subtitle}
                </div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                  {card.title}
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-6">
                  {card.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs font-black text-emerald-600 dark:text-emerald-400">
                <span>Start 20-Question Check</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // STAGE 3: ACTIVE 20-QUESTION QUIZ RUNNER
  // ---------------------------------------------------------------------------
  if (stage === 'quiz' && currentQ) {
    const answeredCount = Object.keys(answers).length;
    const hasAudio = Boolean(currentQ.audioUrl);
    const hasContext = Boolean(currentQ.context && currentQ.context.trim().length > 0);
    const hasImage = Boolean(currentQ.imageUrl);

    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-6 animate-fade-in">
        <ExitConfirmModal
          isOpen={showExitModal}
          onCancel={() => setShowExitModal(false)}
          onConfirm={() => {
            setShowExitModal(false);
            setStage('lobby');
          }}
        />

        {/* Top Sticky Progress & Source Header */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-white/10 rounded-3xl p-4 sm:p-5 shadow-sm mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowExitModal(true)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 transition-colors cursor-pointer"
              >
                ✕ Exit
              </button>
              <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-black">
                {selectedMode === 'ALL' ? 'N5→N1 Placement' : `JLPT ${selectedMode} Check`}
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-black">
                Level: {currentQ.level}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-zinc-800 px-3 py-1.5 rounded-xl">
                ⏱️ {formatTime(elapsedSeconds)}
              </span>
              <button
                type="button"
                onClick={() => handleStartAssessment(selectedMode)}
                title="Re-shuffle a brand new random 20-question set"
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                🎲 Reshuffle 20 Qs
              </button>
            </div>
          </div>

          {/* 20-Question Number Stepper */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {questions.map((q, idx) => {
              const ans = answers[q.id];
              const active = idx === currentIndex;
              let pillCls = 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 border-transparent';

              if (ans !== undefined) {
                if (feedbackMode === 'Immediate') {
                  pillCls =
                    ans === q.correct
                      ? 'bg-emerald-500 text-white border-emerald-600'
                      : 'bg-rose-500 text-white border-rose-600';
                } else {
                  pillCls = 'bg-teal-600 text-white border-teal-700';
                }
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 h-8 rounded-xl text-xs font-black shrink-0 border-2 transition-all cursor-pointer flex items-center justify-center ${pillCls} ${
                    active ? 'ring-2 ring-emerald-500 scale-105' : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category & Source Provenance Banner */}
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border-l-4 border-emerald-600 border border-emerald-500/20 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white font-black text-xs">
                Question {currentIndex + 1} / {questions.length}
              </span>
              <span className="text-xs font-black uppercase text-emerald-800 dark:text-emerald-300">
                【{currentQ.typeLabel || currentQ.category.toUpperCase()}】
              </span>
            </div>
            {currentQ.instructions && (
              <p
                className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: formatJlptRuby(currentQ.instructions) }}
              />
            )}
          </div>

          {/* Source Badge showing exact book / past paper / static list */}
          <div className="shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-700 dark:text-gray-200 shadow-2xs">
              <span>Source:</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-black">{currentQ.sourceLabel}</span>
            </span>
          </div>
        </div>

        {/* LISTENING AUDIO PLAYER (For Q19–Q20) */}
        {hasAudio && (
          <Card className="w-full mb-6 p-5 sm:p-6 shadow-sm border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5 rounded-3xl">
            <audio
              ref={audioRef}
              src={currentQ.audioUrl}
              onTimeUpdate={handleAudioTimeUpdate}
              onLoadedMetadata={handleAudioTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              preload="auto"
            />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleAudioPlay}
                  className="w-12 h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white flex items-center justify-center text-xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </button>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                    🎧 Listening Audio Track ({currentQ.level})
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    {formatTime(audioProgress)} / {formatTime(audioDuration)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 mr-1">Speed:</span>
                {[0.8, 1.0, 1.2].map(rate => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => handleSpeedChange(rate)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                      playbackRate === rate
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={audioDuration || 100}
              value={audioProgress}
              onChange={handleAudioSeek}
              className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-lg"
            />

            {currentQ.script && (
              <div className="mt-4 pt-3 border-t border-emerald-500/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowScript(s => !s)}
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  {showScript ? '🙈 Hide Audio Script' : '📜 Show Audio Script (スクリプト)'}
                </button>
              </div>
            )}

            {showScript && currentQ.script && (
              <div
                className="mt-3 p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-emerald-500/20 text-sm leading-relaxed text-gray-800 dark:text-gray-200"
                dangerouslySetInnerHTML={{ __html: formatJlptRuby(currentQ.script) }}
              />
            )}
          </Card>
        )}

        {/* READING PASSAGE / CONTEXT BOX */}
        {(hasContext || hasImage) && (
          <Card className="w-full mb-6 p-5 sm:p-7 shadow-sm border border-gray-200/80 dark:border-white/10 rounded-3xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100 dark:border-white/5">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span>📖</span>
                <span>Passage / Context ({currentQ.level})</span>
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                {currentQ.sourceLabel}
              </span>
            </div>

            {hasImage && (
              <div className="mb-4 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-zinc-800 text-center p-3">
                <img
                  src={currentQ.imageUrl}
                  alt="Question Visual"
                  className="max-w-full max-h-[420px] object-contain mx-auto rounded-lg"
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            )}

            {hasContext && (
              <div
                className="p-4 sm:p-6 bg-amber-50/20 dark:bg-slate-900/60 border border-gray-200/80 dark:border-white/10 rounded-2xl max-h-[460px] overflow-y-auto leading-loose text-base md:text-lg text-gray-800 dark:text-gray-200"
                dangerouslySetInnerHTML={{ __html: formatJlptRuby(currentQ.context) }}
              />
            )}
          </Card>
        )}

        {/* QUESTION STEM & 4 OPTIONS CARD */}
        <Card className="w-full p-6 sm:p-8 shadow-sm border border-gray-200/80 dark:border-white/10 rounded-3xl mb-6">
          <h2
            className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: formatJlptRuby(currentQ.stem) }}
          />

          <div className="space-y-3 mb-6">
            {(currentQ.options || []).map((opt, idx) => {
              const optNum = idx + 1;
              const isSelected = userChoice === optNum;
              const isCorrectOpt = optNum === currentQ.correct;
              const showFeedback = feedbackMode === 'Immediate' && isAnswered;

              let btnStyle =
                'border-gray-200/80 dark:border-white/10 hover:border-emerald-500/60 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-800 dark:text-gray-200';

              if (showFeedback) {
                if (isCorrectOpt) {
                  btnStyle =
                    'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold';
                } else if (isSelected && !isCorrectOpt) {
                  btnStyle =
                    'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 font-medium';
                } else {
                  btnStyle = 'border-gray-200/60 dark:border-white/5 opacity-60 text-gray-500';
                }
              } else if (isSelected) {
                btnStyle =
                  'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200 font-bold';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(optNum)}
                  className={`w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl border-2 transition-all text-left cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-7 h-7 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-mono font-black text-xs flex items-center justify-center shrink-0">
                      {optNum}
                    </span>
                    <span
                      className="text-base sm:text-lg"
                      dangerouslySetInnerHTML={{ __html: formatJlptRuby(opt) }}
                    />
                  </div>

                  {showFeedback && isCorrectOpt && (
                    <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-emerald-600 text-white shrink-0">
                      ✓ 正解
                    </span>
                  )}
                  {showFeedback && isSelected && !isCorrectOpt && (
                    <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-rose-600 text-white shrink-0">
                      ✕ 不正解
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* "Not Sure / Don't Know" Option to prevent lucky guessing */}
          <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
            <button
              type="button"
              onClick={() => handleSelectOption('skip')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                userChoice === 'skip'
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
                  : 'border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              🤔 わからない (Not Sure / Skip Guess)
            </button>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
                className="px-4 py-2.5 rounded-xl text-xs font-black border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 disabled:opacity-40 cursor-pointer"
              >
                ← Prev
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIndex(i => Math.min(questions.length - 1, i + 1))}
                  className="px-5 py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm cursor-pointer"
                >
                  Next Question →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinishAssessment}
                  className="px-6 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white shadow-md cursor-pointer"
                >
                  🎯 Finish & View Level Diagnosis ({answeredCount}/{questions.length})
                </button>
              )}
            </div>
          </div>

          {/* Instant Explanation Box */}
          {feedbackMode === 'Immediate' && isAnswered && currentQ.explanation && (
            <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/40 text-xs sm:text-sm leading-relaxed text-gray-800 dark:text-gray-200 animate-fade-in">
              <div className="font-black text-emerald-700 dark:text-emerald-400 uppercase mb-1">
                💡 Explanation • 解説
              </div>
              <div dangerouslySetInnerHTML={{ __html: formatJlptRuby(currentQ.explanation) }} />
            </div>
          )}
        </Card>

        {/* Submit anytime bar */}
        {answeredCount >= 1 && currentIndex < questions.length - 1 && (
          <div className="text-center">
            <button
              type="button"
              onClick={handleFinishAssessment}
              className="text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 underline cursor-pointer"
            >
              Finish early and calculate diagnosis now ({answeredCount}/{questions.length} answered)
            </button>
          </div>
        )}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // STAGE 4: DIAGNOSTIC REPORT & STUDY ROADMAP
  // ---------------------------------------------------------------------------
  if (stage === 'results' && report) {
    const filteredReview = questions.filter(q => {
      const u = answers[q.id];
      const ok = u !== undefined && u !== 'skip' && u === q.correct;
      if (reviewFilter === 'wrong') return !ok;
      if (reviewFilter === 'correct') return ok;
      return true;
    });

    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-fade-in">
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <button
            type="button"
            onClick={() => setStage('lobby')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-emerald-500 transition-all cursor-pointer"
          >
            ← Back to Level Check Lobby
          </button>

          <button
            type="button"
            onClick={() => handleStartAssessment(selectedMode)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:opacity-95 transition-all cursor-pointer"
          >
            <span>🎲</span>
            <span>Take New Random 20-Question Check</span>
          </button>
        </div>

        {/* Main Diagnostic Certificate Card */}
        <Card className="p-6 sm:p-10 rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase mb-4">
            <span>🏆 Official Diagnostic Result</span>
          </div>

          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex flex-col items-center justify-center shadow-lg">
              <span className="text-[11px] font-black uppercase opacity-85">Diagnosed</span>
              <span className="text-4xl sm:text-5xl font-black tracking-tight">{report.diagnosedLevel}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-2">
            {report.readinessTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
            {report.readinessDesc}
          </p>

          {/* 3 Summary Stat Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/80 dark:border-white/10">
              <span className="text-[11px] font-black uppercase text-gray-500 dark:text-gray-400 block mb-1">
                Accuracy
              </span>
              <span className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                {report.accuracyPercent}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 block mt-0.5">
                {report.totalCorrect} / {report.totalQuestions} Correct
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/80 dark:border-white/10">
              <span className="text-[11px] font-black uppercase text-gray-500 dark:text-gray-400 block mb-1">
                Scaled JLPT Estimate
              </span>
              <span className="text-3xl font-black font-mono text-gray-900 dark:text-white">
                {report.scaledScore180} <span className="text-sm font-normal text-gray-400">/ 180 点</span>
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 block mt-0.5">
                Target Level Saved: {report.diagnosedLevel}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/80 dark:border-white/10">
              <span className="text-[11px] font-black uppercase text-gray-500 dark:text-gray-400 block mb-1">
                Time Elapsed
              </span>
              <span className="text-3xl font-black font-mono text-gray-900 dark:text-white">
                {formatTime(report.elapsedSeconds)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 block mt-0.5">
                {report.sourceBreakdown.length} Distinct Sources Sampled
              </span>
            </div>
          </div>

          {/* 5-Skill Breakdown Bars (Kanji, Vocab, Grammar, Reading, Listening) */}
          <div className="max-w-2xl mx-auto text-left mb-8">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
              📊 Skill Breakdown (Kanji • Vocab • Grammar • Reading • Listening)
            </h3>
            <div className="space-y-3">
              {report.categoryBreakdown.map(cat => (
                <div
                  key={cat.id}
                  className="p-3.5 rounded-2xl bg-gray-50/80 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10"
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-1.5">
                    <span className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </span>
                    <span className="font-mono font-black text-emerald-600 dark:text-emerald-400">
                      {cat.correct}/{cat.total} ({cat.percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                      style={{ width: `${cat.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Jump to Diagnosed Level Hub */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to={`/levels/${report.diagnosedLevel.toLowerCase()}`}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-black shadow-md transition-all"
            >
              🚀 Go to JLPT {report.diagnosedLevel} Study Hub →
            </Link>
            <Link
              to="/books"
              className="px-5 py-3 rounded-2xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 text-gray-800 dark:text-gray-200 text-xs sm:text-sm font-bold transition-all"
            >
              📚 Browse {report.diagnosedLevel} Textbooks
            </Link>
          </div>
        </Card>

        {/* Recommended Textbooks for Diagnosed Level */}
        {recommendedBooks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-black text-gray-900 dark:text-white mb-3">
              📚 Recommended {report.diagnosedLevel} Books & Drills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendedBooks.map(b => (
                <Link
                  key={b.id}
                  to={b.customRoute || `/books/${b.id}`}
                  className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-white/10 hover:border-emerald-500 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
                      {b.level} • {b.category}
                    </span>
                    <h3 className="text-sm font-black text-gray-900 dark:text-white group-hover:text-emerald-600 mt-2 mb-1 line-clamp-2">
                      {b.title}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-3">
                    Open Book →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Full 20-Question Review List */}
        <Card className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white">
              🧐 Detailed 20-Question Review & Sources
            </h2>
            <div className="flex items-center gap-1.5">
              {[
                { k: 'all', label: `All (${questions.length})` },
                { k: 'wrong', label: `Incorrect (${questions.length - report.totalCorrect})` },
                { k: 'correct', label: `Correct (${report.totalCorrect})` },
              ].map(tab => (
                <button
                  key={tab.k}
                  type="button"
                  onClick={() => setReviewFilter(tab.k)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    reviewFilter === tab.k
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredReview.map(q => {
              const u = answers[q.id];
              const isCorrect = u !== undefined && u !== 'skip' && u === q.correct;
              return (
                <div
                  key={q.id}
                  className={`p-4 sm:p-5 rounded-2xl border ${
                    isCorrect
                      ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/20 dark:bg-emerald-950/10'
                      : 'border-rose-200 dark:border-rose-900/50 bg-rose-50/20 dark:bg-rose-950/10'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-lg text-xs font-black text-white ${
                          isCorrect ? 'bg-emerald-600' : 'bg-rose-600'
                        }`}
                      >
                        Q{q.questionNumber} • {isCorrect ? '✓ Correct' : '✕ Wrong'}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300">
                        {q.level} • {q.typeLabel}
                      </span>
                    </div>

                    {q.sourceRoute ? (
                      <Link
                        to={q.sourceRoute}
                        className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                      >
                        {q.sourceLabel} →
                      </Link>
                    ) : (
                      <span className="text-xs font-bold text-gray-500">{q.sourceLabel}</span>
                    )}
                  </div>

                  <div
                    className="text-base font-bold text-gray-900 dark:text-white mb-2"
                    dangerouslySetInnerHTML={{ __html: formatJlptRuby(q.stem) }}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm mb-2">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200/70 dark:border-white/10">
                      <span className="text-gray-500 dark:text-gray-400 font-bold mr-1.5">Your Answer:</span>
                      <span
                        className={`font-bold ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}
                        dangerouslySetInnerHTML={{
                          __html:
                            u && u !== 'skip' && q.options[u - 1]
                              ? `${u}. ${formatJlptRuby(q.options[u - 1])}`
                              : 'Skipped / Not Sure',
                        }}
                      />
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-emerald-200/80 dark:border-emerald-800/40">
                      <span className="text-gray-500 dark:text-gray-400 font-bold mr-1.5">Correct Answer:</span>
                      <span
                        className="font-bold text-emerald-700 dark:text-emerald-400"
                        dangerouslySetInnerHTML={{
                          __html: `${q.correct}. ${formatJlptRuby(q.options[q.correct - 1] || '')}`,
                        }}
                      />
                    </div>
                  </div>

                  {q.explanation && (
                    <div
                      className="mt-2 pt-2 border-t border-gray-200/60 dark:border-white/10 text-xs text-gray-700 dark:text-gray-300 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formatJlptRuby(q.explanation) }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    );
  }

  return null;
}
