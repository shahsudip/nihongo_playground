import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getTestById, savePracticeTestRecord } from '../utils/jlpt_practice_tests_service.js';
import { getPastExamById, savePastExamRecord } from '../utils/jlpt_past_exams_service.js';
import { calculateJlptExamScore } from '../utils/jlptScoring.js';
import LoadingSpinner from '../utils/loading_spinner.jsx';

// Reusable UI
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { OptionButton } from './ui/OptionButton';
import { ExitConfirmModal } from './ui/ExitConfirmModal';
import { JlptOmrAnswerSheet } from './ui/JlptOmrAnswerSheet';
import { JlptScoreCertificateModal } from './ui/JlptScoreCertificateModal';
import { formatJlptRuby } from '../utils/jlptRubyParser.js';

// Official JLPT Mondai Instructions mapped to typeLabel / types
const MONDAI_INSTRUCTIONS = {
  '漢字読み': '___の言葉の読み方として最もよいものを、１・２・３・４から一つ選びなさい。',
  '表記': '___の言葉を漢字で書くとき、最もよいものを、１・２・３・４から一つ選びなさい。',
  '語形成': '___に入る最もよいものを、１・２・３・４から一つ選びなさい。',
  '文脈規定': '（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。',
  '言い換え類義': '___の言葉に意味が最も近いものを、１・２・３・４から一つ選びなさい。',
  '用法': '次の言葉の使い方が最もよいものを、１・２・３・４から一つ選びなさい。',
  '文の文法1（文法形式の判断）': '（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。',
  '文の文法2（文の組み立て）': '★ に入るものはどれか。最もよいものを、１・２・３・４から一つ選びなさい。',
  '文章の文法': '文章全体の趣旨を踏まえ、枠内に入る最も適当なものを、１・２・３・４から一つ選びなさい。',
  '内容理解（短文）': '次の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。',
  '内容理解（中文）': '次の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。',
  '内容理解（長文）': '次の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。',
  '統合理解': '次の文章ＡとＢを読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。',
  '主張理解（長文）': '次の文章を読んで、筆者の主張として最も適当なものを、１・２・３・４から一つ選びなさい。',
  '情報検索': '案内を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。',
  '課題理解': '問題用紙を見ながら、流れる音声を聞いて、最も適当なものを１・２・３・４から一つ選びなさい。',
  'ポイント理解': '音声を聞いて、質問に対する答えとして最も適当なものを１・２・３・４から一つ選びなさい。',
  '概要理解': '話の内容全体を聞いて、最も適当なものを１・２・３・４から一つ選びなさい。',
  '発話表現': '矢印（⇒）の人が何と言うか、適切な表現を１・２・３から一つ選びなさい。',
  '即時応答': '短い問いかけを聞いて、最も適切な返事を１・２・３から一つ選びなさい。',
};

function getMondaiInstruction(q) {
  if (!q) return '';
  if (q.instructions && q.instructions.trim().length > 0) {
    return q.instructions;
  }
  if (q.typeLabel && MONDAI_INSTRUCTIONS[q.typeLabel]) {
    return MONDAI_INSTRUCTIONS[q.typeLabel];
  }
  return '最もよいものを、１・２・３・４から一つ選びなさい。';
}

const JlptPracticeTestQuizPage = ({ isPastExam: propIsPastExam }) => {
  const { level, testId, sectionId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const isPastExam = Boolean(
    propIsPastExam ||
    window.location.hash.includes('past-questions') ||
    (testId && (testId.includes('past_') || testId.startsWith('past-')))
  );

  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Section state (defaults to sectionId from URL or the first section)
  const [selectedSectionId, setSelectedSectionId] = useState(sectionId || null);

  // Quiz state
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showMobileSheet, setShowMobileSheet] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Audio & Script state
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [showScript, setShowScript] = useState(false);
  const audioRef = useRef(null);

  const lvlKey = (level || 'n3').toLowerCase();
  const lvlUpper = lvlKey.toUpperCase();

  // Load test data
  useEffect(() => {
    let isMounted = true;
    const fetchTest = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = isPastExam
          ? await getPastExamById(testId, lvlUpper)
          : await getTestById(testId);

        if (isMounted) {
          if (!data) {
            setError(`Test "${testId}" could not be found.`);
          } else {
            setTestData(data);
          }
        }
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load test.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchTest();
    return () => { isMounted = false; };
  }, [testId, isPastExam, lvlUpper]);

  // Sync selectedSectionId with testData or route param
  useEffect(() => {
    if (sectionId) {
      setSelectedSectionId(sectionId);
    } else if (testData?.sections?.length) {
      setSelectedSectionId(prev => (prev && testData.sections.some(s => s.id === prev) ? prev : testData.sections[0].id));
    }
  }, [sectionId, testData]);

  // Current active section object (e.g. 第1部: 言語知識（文字・語彙）)
  const currentSection = useMemo(() => {
    if (!testData?.sections?.length) return null;
    if (selectedSectionId) {
      return testData.sections.find(s => s.id === selectedSectionId) || testData.sections[0];
    }
    return testData.sections[0];
  }, [testData, selectedSectionId]);

  // Index of current section among all sections
  const currentSectionIndex = useMemo(() => {
    if (!testData?.sections || !currentSection) return 0;
    return testData.sections.findIndex(s => s.id === currentSection.id);
  }, [testData, currentSection]);

  // Active questions: ONLY questions for this section (e.g. 1 to 36 for vocab)
  const activeQuestions = useMemo(() => {
    if (!currentSection) return [];
    return currentSection.questions.map(q => ({
      ...q,
      sectionCategory: currentSection.id,
      sectionTitle: currentSection.title,
    }));
  }, [currentSection]);

  const totalQuestions = activeQuestions.length;

  const sectionAnsweredCount = useMemo(() => {
    return activeQuestions.filter(q => answers[q.id] !== undefined).length;
  }, [activeQuestions, answers]);

  const sectionCorrectCount = useMemo(() => {
    return activeQuestions.filter(q => answers[q.id] !== undefined && answers[q.id] === q.correct).length;
  }, [activeQuestions, answers]);

  const answeredCount = sectionAnsweredCount;
  const correctCount = sectionCorrectCount;

  const storageKey = useMemo(() => {
    const userPart = currentUser?.uid ? currentUser.uid : 'guest';
    return `jlpt_mock_${userPart}_${testId}_${sectionId || 'full'}`;
  }, [currentUser, testId, sectionId]);

  // Restore saved progress
  useEffect(() => {
    if (totalQuestions === 0) return;
    try {
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.answers && typeof parsed.answers === 'object') {
          setAnswers(parsed.answers);
          if (typeof parsed.currentIndex === 'number' && parsed.currentIndex < totalQuestions) {
            setCurrentIndex(parsed.currentIndex);
          }
          if (typeof parsed.timerSeconds === 'number') {
            setTimerSeconds(parsed.timerSeconds);
          }
        }
      }
    } catch (e) {
      console.warn('Could not restore cached answers:', e);
    }
  }, [storageKey, totalQuestions]);

  // Timer
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

  // Warn before unload
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (answeredCount > 0 && !isFinished) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [answeredCount, isFinished]);

  const currentQ = activeQuestions[currentIndex];

  // Reset script view and audio state on question change
  useEffect(() => {
    setShowScript(false);
    setIsPlaying(false);
    setAudioProgress(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentIndex]);

  // Audio event handlers
  const handleAudioPlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.warn('Audio play error:', err));
    }
  };

  const handleAudioTimeUpdate = () => {
    if (!audioRef.current) return;
    setAudioProgress(audioRef.current.currentTime);
    setAudioDuration(audioRef.current.duration || 0);
  };

  const handleAudioSeek = (e) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setAudioProgress(time);
    }
  };

  const changeSpeed = (rate) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };



  const accuracyPercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Official JLPT scaled score report
  const scoreReport = useMemo(() => {
    if (!testData?.sections) return null;
    return calculateJlptExamScore(lvlUpper, testData.sections, answers);
  }, [testData, lvlUpper, answers]);

  const backUrl = isPastExam
    ? `/levels/${lvlKey}/past-questions`
    : `/levels/${lvlKey}/practice-tests`;
  const backLabel = isPastExam
    ? `Back to ${lvlUpper} Past Exams`
    : `Back to ${lvlUpper} Practice Tests`;

  // Persist attempt
  const persistAttempt = useCallback(async (nextAnswers, targetIndex, isFinal = false) => {
    if (!testData || totalQuestions === 0) return;
    const ansCount = Object.keys(nextAnswers).length;
    let score = 0;
    Object.keys(nextAnswers).forEach((qId) => {
      const q = activeQuestions.find(item => item.id.toString() === qId.toString());
      if (q && nextAnswers[qId] === q.correct) score++;
    });

    const isAllAnswered = ansCount === totalQuestions;
    const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

    let status = 'incomplete';
    if (isAllAnswered || isFinal) {
      status = accuracy >= 80 && score > 0 ? 'mastered' : 'completed';
    }

    const report = calculateJlptExamScore(lvlUpper, testData.sections, nextAnswers);
    const prefix = isPastExam ? 'jlpt-past-' : 'jlpt-mock-';
    const quizId = `${prefix}${testData.id}${sectionId ? `-${sectionId}` : ''}`;
    const sectionTitle = sectionId
      ? testData.sections.find(s => s.id === sectionId)?.title || sectionId
      : 'Full Exam';

    const record = {
      quizId,
      testId: testData.id,
      level: testData.level || lvlUpper,
      title: `${testData.title} (${sectionTitle})`,
      sectionId: sectionId || 'full',
      isPastExam,
      score,
      total: totalQuestions,
      answered: ansCount,
      answers: nextAnswers,
      currentIndex: targetIndex,
      percentage: accuracy,
      status,
      // Authentic JLPT Scaled Scoring Fields
      totalScaledScore: report.totalScaledScore,
      maxScore: report.maxScore,
      overallPassMark: report.overallPassMark,
      isPassed: report.isPassed,
      failReason: report.failReason,
      allSectionsPassed: report.allSectionsPassed,
      sectionsBreakdown: report.sections,
      timerSeconds,
      timestamp: new Date().toISOString(),
    };

    // Save locally
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        answers: nextAnswers,
        currentIndex: targetIndex,
        timerSeconds,
      }));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    // Save to global history & Firestore
    if (isPastExam) {
      await savePastExamRecord(currentUser, record);
    } else {
      await savePracticeTestRecord(currentUser, record);
    }
  }, [testData, totalQuestions, activeQuestions, sectionId, timerSeconds, storageKey, currentUser, isPastExam, lvlUpper]);

  const questionCardRef = useRef(null);

  const handleSelectQuestion = useCallback((idx) => {
    setCurrentIndex(idx);
    if (questionCardRef.current) {
      questionCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, []);

  const handleSelectAnswerForQuestion = (qObj, qIdx, optionNumber) => {
    if (!qObj) return;
    handleSelectQuestion(qIdx);
    if (answers[qObj.id] !== undefined) {
      return;
    }
    const nextAnswers = { ...answers, [qObj.id]: optionNumber };
    setAnswers(nextAnswers);
    persistAttempt(nextAnswers, qIdx, false);
  };

  const handleOptionSelect = (optionNumber) => {
    handleSelectAnswerForQuestion(currentQ, currentIndex, optionNumber);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      persistAttempt(answers, nextIdx, false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (testData?.sections && currentSectionIndex < testData.sections.length - 1) {
      // Advance to next exam section (e.g. Section 1 -> Section 2)
      const nextSec = testData.sections[currentSectionIndex + 1];
      setSelectedSectionId(nextSec.id);
      setCurrentIndex(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      persistAttempt(answers, prevIdx, false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (testData?.sections && currentSectionIndex > 0) {
      // Step back to previous exam section
      const prevSec = testData.sections[currentSectionIndex - 1];
      setSelectedSectionId(prevSec.id);
      setCurrentIndex(prevSec.questions.length - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
    setTimerActive(false);
    setShowCertificateModal(true);
    persistAttempt(answers, currentIndex, true);
  };

  const handleReset = () => {
    if (!window.confirm("Are you sure you want to reset this exam? All answers will be cleared so you can take it fresh.")) return;
    setAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
    setTimerSeconds(0);
    setTimerActive(true);
    try {
      localStorage.removeItem(storageKey);
    } catch (_) {}
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <LoadingSpinner />
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
          Loading {testId}...
        </p>
      </div>
    );
  }

  if (error || !testData || totalQuestions === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {error || 'No questions available for this test.'}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          The test content could not be loaded. Please return to the test list.
        </p>
        <Link
          to={backUrl}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-colors"
        >
          &larr; {backLabel}
        </Link>
      </div>
    );
  }

  // COMPLETION VIEW
  if (isFinished) {
    const isPassed = scoreReport?.isPassed;
    const totalScaled = scoreReport?.totalScaledScore || 0;
    const maxScaled = scoreReport?.maxScore || 180;
    const passThreshold = scoreReport?.overallPassMark || 95;
    const failReason = scoreReport?.failReason;

    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-fade-in">
        {/* Certificate Modal */}
        <JlptScoreCertificateModal
          isOpen={showCertificateModal}
          scoreReport={scoreReport}
          onClose={() => setShowCertificateModal(false)}
          onRetake={handleReset}
          onBackToList={() => navigate(backUrl)}
        />

        <div className="mb-6 flex items-center justify-between">
          <Link
            to={backUrl}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            &larr; {backLabel}
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

        <Card className="text-center p-6 sm:p-10 shadow-2xl border border-gray-200 dark:border-white/10 rounded-3xl relative overflow-hidden">
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

          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-1">
            {testData.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium">
            {sectionId ? sectionId.toUpperCase() : 'Full Official Exam'} • Time: {formatTime(timerSeconds)}
          </p>

          {/* Sectional Failure Alert */}
          {failReason === 'sectional_insufficient' && (
            <div className="max-w-xl mx-auto mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm text-left">
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <span>⚠️</span>
                <span>Sectional Threshold Not Met (基準点未達)</span>
              </div>
              <p>
                Your overall score reached <span className="font-mono font-black">{totalScaled} / {maxScaled} 点</span> (which meets the {passThreshold} 点 pass mark), but you did not pass because at least one section scored below the official <span className="font-bold">19-point minimum threshold</span>.
              </p>
            </div>
          )}

          {/* Official JLPT Scaled Scores Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto mb-6">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/80 dark:border-white/5 text-center">
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                Total Scaled Score
              </span>
              <span className={`block text-3xl font-black font-mono ${isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
                {totalScaled} <span className="text-sm font-normal text-gray-400">/ {maxScaled} 点</span>
              </span>
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 mt-1 block">
                Pass Mark: {passThreshold} 点
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/80 dark:border-white/5 text-center">
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                Raw Accuracy
              </span>
              <span className="block text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                {accuracyPercent}%
              </span>
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 mt-1 block">
                {correctCount} / {totalQuestions} Correct
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/80 dark:border-white/5 text-center">
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                Time Elapsed
              </span>
              <span className="block text-3xl font-black font-mono text-gray-900 dark:text-white">
                {formatTime(timerSeconds)}
              </span>
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 mt-1 block">
                {isPassed ? '✓ Qualified' : '✕ Unqualified'}
              </span>
            </div>
          </div>

          {/* Sectional Score Breakdown (60 pts each, min 19 pts) */}
          {scoreReport?.sections?.length > 0 && (
            <div className="max-w-xl mx-auto mb-8 text-left">
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 px-1">
                <span>得点区分 • Sectional Breakdown</span>
                <span>基準点 • Min 19 点</span>
              </div>
              <div className="space-y-2">
                {scoreReport.sections.map((sec, idx) => (
                  <div
                    key={sec.sectionId || idx}
                    className="p-3 sm:p-4 rounded-2xl bg-gray-50/80 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-xs bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white truncate">
                        {sec.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono font-black text-xs sm:text-sm text-gray-900 dark:text-white">
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

          {/* Question Review Breakdown Grid */}
          <div className="p-5 rounded-2xl border border-gray-200/80 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.02] mb-8 text-left">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4 pb-2 border-b border-gray-200 dark:border-white/10">
              <span className="text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <span>🗂️</span> Question Review Breakdown
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Click any question number to review answer & explanation
              </span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {activeQuestions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isCorrect = isAnswered && answers[q.id] === q.correct;
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
                        : 'bg-gray-200 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-zinc-700'
                    }`}
                    title={`Q${idx + 1}: ${isAnswered ? (isCorrect ? 'Correct' : 'Incorrect') : 'Unanswered'}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
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
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
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
            <Button
              variant="outline"
              onClick={() => navigate(backUrl)}
              className="cursor-pointer"
            >
              &larr; Back to Tests List
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const selectedAnswer = answers[currentQ.id];
  const isAnswered = selectedAnswer !== undefined;
  const isCorrect = isAnswered && selectedAnswer === currentQ.correct;
  const hasPassage = Boolean(currentQ.context);
  const hasImage = Boolean(currentQ.imageUrl);
  const hasAudio = Boolean(currentQ.audioUrl);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 animate-fade-in relative">
      {/* Top Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <button
            type="button"
            onClick={() => {
              if (answeredCount > 0 && !isFinished) setShowExitModal(true);
              else navigate(`/levels/${lvlKey}/practice-tests`);
            }}
            className="inline-flex items-center text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-1.5 cursor-pointer"
          >
            &larr; Back to Practice Tests
          </button>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">
              {testData.title}
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-black text-white bg-emerald-600">
              {lvlUpper}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/5">
              {currentQ.sectionTitle || currentQ.typeLabel || 'Mock Exam'}
            </span>
          </div>
        </div>

        {/* Header Right Stats: Timer, Score, Review, Reset, Mobile Sheet Toggle */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-zinc-800 text-xs font-mono font-bold text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-white/10">
            <span>⏱️</span>
            <span>{formatTime(timerSeconds)}</span>
          </div>

          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200/60 dark:border-emerald-800/40">
            <span>Score:</span>
            <span>{correctCount}/{answeredCount}</span>
            <span className="text-gray-400 font-normal">({totalQuestions})</span>
          </div>

          <button
            type="button"
            onClick={() => setShowMobileSheet(true)}
            className="lg:hidden text-xs px-3 py-1.5 rounded-xl border border-red-500/40 text-red-600 dark:text-red-400 font-bold bg-red-50/60 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>📋</span>
            <span>解答用紙</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="text-xs px-2.5 py-1.5 rounded-xl border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer font-bold"
            title="Reset exam"
          >
            🔄 Reset
          </button>

          {answeredCount > 0 && (
            <button
              type="button"
              onClick={handleFinish}
              className="text-xs px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black transition-all shadow-sm cursor-pointer"
            >
              📝 Finish & Review
            </button>
          )}
        </div>
      </div>

      {/* Main Exam Section Header & Tabs */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-white/10 rounded-3xl p-5 sm:p-6 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-[11px] font-mono font-black uppercase tracking-wider text-red-600 dark:text-red-400">
                JLPT SECTION {currentSectionIndex + 1} OF {testData?.sections?.length || 1}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              {currentSection?.title || '言語知識（文字・語彙）'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              {currentSection?.id === 'vocab' && 'Language Knowledge: Kanji Reading, Orthography & Vocabulary (文字・語彙)'}
              {currentSection?.id === 'grammar_reading' && 'Language Knowledge & Reading: Grammar Forms, Sentence Composition & Reading (文法・読解)'}
              {currentSection?.id === 'listening' && 'Listening Comprehension: Task Understanding, Key Points & Quick Response (聴解)'}
            </p>
          </div>

          {/* Section Switcher Tabs (Part 1, Part 2, Part 3) */}
          {testData?.sections && testData.sections.length > 1 && (
            <div className="flex items-center gap-2 flex-wrap">
              {testData.sections.map((sec, sIdx) => {
                const isSecActive = sec.id === (currentSection?.id || selectedSectionId);
                const secAnsCount = sec.questions.filter(q => answers[q.id] !== undefined).length;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => {
                      setSelectedSectionId(sec.id);
                      setCurrentIndex(0);
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all border cursor-pointer select-none ${
                      isSecActive
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-102 font-black'
                        : 'bg-gray-50 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-emerald-500/40'
                    }`}
                  >
                    <span>{sIdx === 0 ? '①' : sIdx === 1 ? '②' : '③'}</span>
                    <span>{sec.id === 'vocab' ? '文字・語彙' : sec.id === 'grammar_reading' ? '文法・読解' : '聴解'}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                      isSecActive ? 'bg-white/20 text-white font-bold' : 'bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {secAnsCount}/{sec.questionCount}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main 2-Column Container: Left for Question & Passage, Right for Authentic OMR Answer Sheet */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column: Quiz Engine (Questions, Options, Navigation) */}
        <div className="flex-1 min-w-0 w-full space-y-6">
          {/* Official JLPT Mondai Header Banner */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border-l-4 border-emerald-600 border border-emerald-500/20 shadow-sm">
            <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
              <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-black text-xs font-mono shadow-sm">
                問題 {currentQ?.mondai || 1}
              </span>
              {currentQ?.typeLabel && (
                <span className="text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300">
                  【{currentQ.typeLabel}】
                </span>
              )}
            </div>
            <p className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200 leading-relaxed font-sans">
              {getMondaiInstruction(currentQ)}
            </p>
          </div>

      {/* AUDIO PLAYER (for Listening Questions) */}
      {hasAudio && (
        <Card className="w-full mb-6 p-5 sm:p-6 shadow-sm border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5 rounded-3xl">
          <audio
            ref={audioRef}
            src={currentQ.audioUrl}
            onTimeUpdate={handleAudioTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            preload="auto"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAudioPlayPause}
                className="w-12 h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white flex items-center justify-center text-xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                title={isPlaying ? 'Pause Audio' : 'Play Audio'}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                  🎧 Listening Track
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                  {formatTime(Math.floor(audioProgress))} / {formatTime(Math.floor(audioDuration))}
                </span>
              </div>
            </div>

            {/* Playback speed selector */}
            <div className="flex items-center gap-1.5 self-start sm:self-center">
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 mr-1">Speed:</span>
              {[0.8, 1.0, 1.2].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => changeSpeed(rate)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                    playbackRate === rate
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-emerald-500/40'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>

          {/* Seek Bar */}
          <input
            type="range"
            min={0}
            max={audioDuration || 100}
            value={audioProgress}
            onChange={handleAudioSeek}
            className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-lg"
          />

          {/* Transcript Toggle button */}
          {currentQ.script && (
            <div className="mt-4 pt-3 border-t border-emerald-500/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowScript(s => !s)}
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <span>{showScript ? '🙈 Hide Audio Script' : '📜 Show Audio Script (スクリプト)'}</span>
              </button>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                {isAnswered ? 'Check script against answer' : 'Recommended: Listen first before reading'}
              </span>
            </div>
          )}

          {/* Collapsible Transcript */}
          {showScript && currentQ.script && (
            <div className="mt-3 p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-emerald-500/20 text-sm leading-relaxed text-gray-800 dark:text-gray-200 font-sans animate-fade-in">
              <div className="text-[11px] font-black uppercase text-emerald-600 dark:text-emerald-400 mb-1">
                Transcript • スクリプト
              </div>
              <div dangerouslySetInnerHTML={{ __html: formatJlptRuby(currentQ.script) }} />
            </div>
          )}
        </Card>
      )}

      {/* READING PASSAGE / CONTEXT (if present) */}
      {(hasPassage || hasImage) && (
        <Card className="w-full mb-6 p-5 sm:p-7 shadow-sm border border-gray-200/80 dark:border-white/10 rounded-3xl">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100 dark:border-white/5">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span>📖</span>
              <span>{hasImage ? 'Illustration / Passage' : 'Reading Passage (読解本文)'}</span>
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              Reference for Q{currentIndex + 1}
            </span>
          </div>

          {hasImage && (
            <div className="mb-4 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-zinc-800 text-center p-3">
              <img
                src={currentQ.imageUrl}
                alt="Question Diagram"
                className="max-w-full max-h-[500px] object-contain mx-auto rounded-lg"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          )}

          {hasPassage && (
            <div className="p-4 sm:p-6 bg-gray-50 dark:bg-zinc-800/40 border border-gray-200/60 dark:border-white/5 rounded-2xl max-h-[550px] overflow-y-auto leading-loose text-base md:text-lg text-gray-800 dark:text-gray-200 font-sans">
              <div dangerouslySetInnerHTML={{ __html: formatJlptRuby(currentQ.context) }} />
            </div>
          )}
        </Card>
      )}

      {/* MAIN QUESTION CARD */}
      <div ref={questionCardRef} className="w-full">
        <Card className="w-full p-6 sm:p-8 shadow-sm border border-gray-200/80 dark:border-white/10 rounded-3xl mb-6">
          {/* Question Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
                  問{currentIndex + 1}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-mono">
                  問 {currentIndex + 1} / {totalQuestions}
                </span>
                {currentQ.typeLabel && (
                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    [{currentQ.typeLabel}]
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {currentQ.options?.length || 4} Choices
              </span>
            </div>

            {currentQ.instructions && (
              <p
                className="text-xs font-medium mb-3 text-gray-500 dark:text-gray-400 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatJlptRuby(currentQ.instructions) }}
              />
            )}

            {/* Stem / Question Text */}
            {currentQ.stem && (
              <h2
                className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white leading-relaxed font-sans"
                dangerouslySetInnerHTML={{ __html: formatJlptRuby(currentQ.stem) }}
              />
            )}

            {currentQ.blankLabel && !currentQ.stem && (
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                文章中の <u>　{currentQ.blankLabel}　</u> に入るものはどれか。
              </div>
            )}
          </div>

          {/* Options Grid */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((opt, optIdx) => {
              const optNum = optIdx + 1; // 1-based matching q.correct
              const isSelected = selectedAnswer === optNum;
              const isOptCorrect = optNum === currentQ.correct;

              let btnClass = "w-full flex items-center gap-3.5 px-5 py-4 rounded-2xl border-2 transition-all text-left cursor-pointer select-none ";

              if (isAnswered) {
                if (isOptCorrect) {
                  btnClass += "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 font-bold shadow-sm";
                } else if (isSelected && !isOptCorrect) {
                  btnClass += "border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 font-medium";
                } else {
                  btnClass += "border-gray-200/80 dark:border-white/10 opacity-60 text-gray-600 dark:text-gray-400";
                }
              } else {
                btnClass += "border-gray-200/80 dark:border-white/10 hover:border-emerald-500/60 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-800 dark:text-gray-200";
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleOptionSelect(optNum)}
                  disabled={isAnswered}
                  className={btnClass}
                >
                  {/* Real exam style horizontal oval bubble for option number */}
                  <span
                    className={`w-8 h-5.5 sm:w-9 sm:h-6 rounded-full border-2 flex items-center justify-center font-mono text-xs shrink-0 transition-all ${
                      isAnswered && isOptCorrect
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/40 scale-105 font-black'
                        : isAnswered && isSelected && !isOptCorrect
                        ? 'bg-rose-600 border-rose-600 text-white shadow-sm ring-2 ring-rose-500/40 scale-105 font-black'
                        : isAnswered && !isSelected && isOptCorrect
                        ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-black'
                        : 'border-gray-400 dark:border-zinc-500 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold'
                    }`}
                  >
                    {optNum}
                  </span>
                  <span
                    className="text-base md:text-lg leading-relaxed flex-1"
                    dangerouslySetInnerHTML={{ __html: formatJlptRuby(opt) }}
                  />
                  {isAnswered && isOptCorrect && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm shrink-0">
                      ✓ Correct
                    </span>
                  )}
                  {isAnswered && isSelected && !isOptCorrect && (
                    <span className="text-rose-600 dark:text-rose-400 font-bold text-sm shrink-0">
                      ✕ Incorrect
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Dedicated Explanation Card when Answered */}
          {isAnswered && (
            <div className="mt-6 p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] animate-fade-in text-left">
              <div className="flex items-center gap-2 mb-3 text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <span>💡</span>
                <span>解説 • Explanation & Insights</span>
              </div>

              <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <span>✓</span>
                  <span>Correct Option {currentQ.correct}:</span>
                  <span dangerouslySetInnerHTML={{ __html: formatJlptRuby(currentQ.correctOption) }} />
                </div>

                {/* Show reasons for each option */}
                <div className="space-y-2 mt-2 pt-2 border-t border-emerald-500/10 text-xs md:text-sm">
                  {currentQ.options.map((opt, k) => {
                    const reason = currentQ.explanations?.[k];
                    const isOptCorrect = k + 1 === currentQ.correct;
                    return (
                      <div key={k} className="p-2.5 rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-1.5 font-bold mb-1">
                          <span className={isOptCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400'}>
                            Option {k + 1})
                          </span>
                          <span className="font-normal" dangerouslySetInnerHTML={{ __html: formatJlptRuby(opt) }} />
                        </div>
                        {reason ? (
                          <p
                            className="text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-emerald-500/40 italic"
                            dangerouslySetInnerHTML={{ __html: formatJlptRuby(reason) }}
                          />
                        ) : (
                          <p className="text-emerald-600 dark:text-emerald-400 pl-4 border-l-2 border-emerald-500 italic">
                            {isOptCorrect ? 'Correct answer.' : ''}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Footer Navigation: Previous / Next / Finish */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-100 dark:border-white/5 mt-8">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentIndex === 0 && currentSectionIndex === 0}
              className="cursor-pointer"
            >
              &larr; Previous
            </Button>

            {currentIndex < totalQuestions - 1 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
              >
                Next &rarr;
              </Button>
            ) : currentSectionIndex < (testData?.sections?.length || 1) - 1 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black cursor-pointer shadow-md"
              >
                Next: 第{currentSectionIndex + 2}部【{testData.sections[currentSectionIndex + 1]?.title}】 &rarr;
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleFinish}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black cursor-pointer shadow-md"
              >
                Finish Exam 🏆
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>

    {/* Right Column: Authentic JLPT OMR Bubble Answer Sheet (Sticky on Desktop) */}
    <div className="w-full lg:w-80 xl:w-96 shrink-0 hidden lg:block">
      <JlptOmrAnswerSheet
        questions={activeQuestions}
        answers={answers}
        currentIndex={currentIndex}
        onSelectQuestion={handleSelectQuestion}
        onSelectAnswer={(q, idx, optNum) => handleSelectAnswerForQuestion(q, idx, optNum)}
        testTitle={testData?.title}
        sectionTitle={currentSection?.title || '言語知識（文字・語彙）'}
        level={lvlUpper}
      />
    </div>
  </div>

  {/* Floating Action Button for Mobile Sheet */}
  <div className="fixed bottom-6 right-6 lg:hidden z-30">
    <button
      type="button"
      onClick={() => setShowMobileSheet(true)}
      className="flex items-center gap-2 px-4 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-black text-sm shadow-2xl active:scale-95 transition-all border-2 border-white dark:border-zinc-800 cursor-pointer"
    >
      <span>📋</span>
      <span>解答用紙</span>
      <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-mono">
        {answeredCount}/{totalQuestions}
      </span>
    </button>
  </div>

  {/* Slide-over Mobile Drawer for OMR Sheet */}
  {showMobileSheet && (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-transparent max-h-[90vh] p-2 sm:p-0">
        <JlptOmrAnswerSheet
          questions={activeQuestions}
          answers={answers}
          currentIndex={currentIndex}
          onSelectQuestion={(idx) => {
            handleSelectQuestion(idx);
            setShowMobileSheet(false);
          }}
          onSelectAnswer={(q, idx, optNum) => {
            handleSelectAnswerForQuestion(q, idx, optNum);
          }}
          testTitle={testData?.title}
          sectionTitle={currentSection?.title || '言語知識（文字・語彙）'}
          level={lvlUpper}
          isMobileDrawer={true}
          onCloseDrawer={() => setShowMobileSheet(false)}
        />
      </div>
    </div>
  )}

      {/* Exit Modal */}
      <ExitConfirmModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={() => {
          setShowExitModal(false);
          navigate(`/levels/${lvlKey}/practice-tests`);
        }}
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
      />
    </div>
  );
};

export default JlptPracticeTestQuizPage;
