import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getTestsForLevel, getPracticeTestHistory } from '../utils/jlpt_practice_tests_service.js';
import LoadingSpinner from '../utils/loading_spinner.jsx';

const LEVEL_META = {
  n5: { title: 'N5', name: 'Beginner', badge: 'Introductory' },
  n4: { title: 'N4', name: 'Elementary', badge: 'Basic' },
  n3: { title: 'N3', name: 'Intermediate', badge: 'Bridge' },
  n2: { title: 'N2', name: 'Upper-Intermediate', badge: 'Professional' },
  n1: { title: 'N1', name: 'Advanced', badge: 'Mastery' },
};

const SECTION_ICONS = {
  vocab: '語',
  grammar_reading: '読',
  vocab_grammar_reading: '総',
  listening: '聴',
};

const SECTION_SHORT_NAMES = {
  vocab: '文字・語彙 (Vocab)',
  grammar_reading: '文法・読解 (Grammar/Reading)',
  listening: '聴解 (Listening)',
};

/**
 * Computes deep status for a test by aggregating full exam records,
 * per-section attempts, and local cache.
 */
function computeTestStatus(test, history, currentUser) {
  const testId = test.id;
  const userPart = currentUser?.uid ? currentUser.uid : 'guest';
  const fullQid = `jlpt-mock-${testId}`;
  const fullRecord = history[fullQid] || null;
  const sections = test.sections || [];

  // Check section attempts
  const sectionSummaries = sections.map((sec) => {
    const secQid = `jlpt-mock-${testId}-${sec.id}`;
    const secRecord = history[secQid] || null;

    // Check localStorage cache for live in-progress answers
    let localCache = null;
    try {
      const raw = localStorage.getItem(`jlpt_mock_${userPart}_${testId}_${sec.id}`)
        || localStorage.getItem(`jlpt_mock_${userPart}_${testId}_full`);
      if (raw) localCache = JSON.parse(raw);
    } catch (_) {}

    const totalQ = sec.questions?.length || sec.questionCount || 0;
    
    // Answers count from record or local cache
    let ansCount = secRecord?.answered ?? 0;
    if (localCache?.answers && typeof localCache.answers === 'object') {
      const qIds = (sec.questions || []).map(q => q.id.toString());
      const localAnsForSec = Object.keys(localCache.answers).filter(qId => qIds.includes(qId.toString())).length;
      ansCount = Math.max(ansCount, localAnsForSec);
    }

    const score = secRecord?.score ?? 0;
    const isCompleted = secRecord?.status === 'completed' || secRecord?.status === 'mastered' || (totalQ > 0 && ansCount >= totalQ);
    const isInProgress = ansCount > 0 && !isCompleted;
    const percentage = totalQ > 0 ? Math.round((score / totalQ) * 100) : 0;

    let resumeIndex = 0;
    if (typeof localCache?.currentIndexBySection?.[sec.id] === 'number') {
      resumeIndex = localCache.currentIndexBySection[sec.id];
    } else if (typeof localCache?.currentIndex === 'number' && localCache?.currentSectionId === sec.id) {
      resumeIndex = localCache.currentIndex;
    } else if (ansCount > 0 && ansCount < totalQ) {
      resumeIndex = ansCount;
    }

    return {
      id: sec.id,
      title: sec.title || SECTION_SHORT_NAMES[sec.id] || sec.id,
      questionCount: totalQ,
      answeredCount: ansCount,
      score,
      percentage,
      isCompleted,
      isInProgress,
      resumeIndex,
      record: secRecord,
    };
  });

  const totalQuestions = test.totalQuestions || sections.reduce((sum, s) => sum + (s.questionCount || s.questions?.length || 0), 0);
  const totalAnswered = fullRecord?.answered
    ? Math.max(fullRecord.answered, sectionSummaries.reduce((sum, s) => sum + s.answeredCount, 0))
    : sectionSummaries.reduce((sum, s) => sum + s.answeredCount, 0);

  const totalScore = fullRecord?.score
    ? Math.max(fullRecord.score, sectionSummaries.reduce((sum, s) => sum + s.score, 0))
    : sectionSummaries.reduce((sum, s) => sum + s.score, 0);

  const allSectionsDone = sectionSummaries.length > 0 && sectionSummaries.every(s => s.isCompleted);
  const isFullDone = fullRecord?.status === 'completed' || fullRecord?.status === 'mastered' || (totalQuestions > 0 && totalAnswered >= totalQuestions) || allSectionsDone;
  const isInProgress = !isFullDone && totalAnswered > 0;

  // Scaled Score (0–180)
  const scaledScore = fullRecord?.totalScaledScore ?? null;
  const isPassed = fullRecord?.isPassed ?? (scaledScore !== null ? scaledScore >= 95 : null);

  let status = 'unattempted';
  if (isPassed || (isFullDone && scaledScore !== null && scaledScore >= 95)) {
    status = 'passed';
  } else if (isFullDone) {
    status = 'completed';
  } else if (isInProgress) {
    status = 'in_progress';
  }

  // Find next section to resume
  const resumeSection = sectionSummaries.find(s => s.isInProgress)
    || sectionSummaries.find(s => !s.isCompleted)
    || sectionSummaries[0];

  return {
    testId,
    status,
    totalQuestions,
    totalAnswered,
    totalScore,
    progressPercentage: totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0,
    scaledScore,
    isPassed,
    fullRecord,
    sections: sectionSummaries,
    resumeSection,
  };
}

const JlptPracticeTestsListPage = () => {
  const { level } = useParams();
  const { currentUser } = useAuth();

  const [tests, setTests] = useState([]);
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'in_progress' | 'completed' | 'unattempted'

  const lvlKey = (level || 'n3').toLowerCase();
  const lvlUpper = lvlKey.toUpperCase();
  const _meta = LEVEL_META[lvlKey] || LEVEL_META.n3;

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [testsList, userHistory] = await Promise.all([
        getTestsForLevel(lvlUpper),
        getPracticeTestHistory(currentUser),
      ]);
      setTests(testsList || []);
      setHistory(userHistory || {});
    } catch (err) {
      console.error('Failed to load practice tests for level:', err);
    } finally {
      setLoading(false);
    }
  }, [lvlUpper, currentUser]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Compute test summaries
  const testSummaries = useMemo(() => {
    return tests.map((t) => computeTestStatus(t, history, currentUser));
  }, [tests, history, currentUser]);

  // High level aggregated stats
  const aggregateStats = useMemo(() => {
    const total = testSummaries.length || tests.length || 5;
    const passed = testSummaries.filter(s => s.status === 'passed').length;
    const completed = testSummaries.filter(s => s.status === 'completed' || s.status === 'passed').length;
    const inProgress = testSummaries.filter(s => s.status === 'in_progress').length;
    const unattempted = testSummaries.filter(s => s.status === 'unattempted').length;

    const totalQuestionsAll = testSummaries.reduce((sum, s) => sum + s.totalQuestions, 0);
    const totalAnsweredAll = testSummaries.reduce((sum, s) => sum + s.totalAnswered, 0);
    const totalScoreAll = testSummaries.reduce((sum, s) => sum + s.totalScore, 0);
    const avgAccuracy = totalAnsweredAll > 0 ? Math.round((totalScoreAll / totalAnsweredAll) * 100) : 0;

    return {
      total,
      passed,
      completed,
      inProgress,
      unattempted,
      totalQuestionsAll,
      totalAnsweredAll,
      avgAccuracy,
    };
  }, [testSummaries, tests.length]);

  // Filtered test list
  const filteredTests = useMemo(() => {
    if (activeFilter === 'all') return tests;
    return tests.filter((_, idx) => {
      const summary = testSummaries[idx];
      if (activeFilter === 'in_progress') return summary?.status === 'in_progress';
      if (activeFilter === 'completed') return summary?.status === 'completed' || summary?.status === 'passed';
      if (activeFilter === 'unattempted') return summary?.status === 'unattempted';
      return true;
    });
  }, [tests, testSummaries, activeFilter]);

  const handleResetTest = (testId, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(`Reset mock exam ${testId}? All cached local answers will be cleared.`)) return;

    const userPart = currentUser?.uid ? currentUser.uid : 'guest';
    try {
      localStorage.removeItem(`jlpt_mock_${userPart}_${testId}_full`);
      localStorage.removeItem(`jlpt_mock_${userPart}_${testId}_vocab`);
      localStorage.removeItem(`jlpt_mock_${userPart}_${testId}_grammar_reading`);
      localStorage.removeItem(`jlpt_mock_${userPart}_${testId}_listening`);
    } catch (_) {}

    loadData();
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <LoadingSpinner />
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
          Loading JLPT {lvlUpper} Practice Tests...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 animate-fade-in space-y-6">
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">
          <li>
            <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/levels" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Levels
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link to={`/levels/${lvlKey}`} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {lvlUpper}
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 dark:text-white font-bold">
            Practice Tests (模擬試験)
          </li>
        </ol>
      </nav>

      {/* Streamlined Executive Header (No useless marketing fluff) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-black text-sm flex items-center justify-center font-mono">
              {lvlUpper}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {lvlUpper} 模擬試験 • JLPT Practice Exams
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Official-format mock exams with scaled scoring (0–180 points), audio tracks & full explanations.
          </p>
        </div>

        {/* Real Live Performance Pulse */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <div className="px-4 py-2.5 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10">
            <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Exam Readiness</div>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {aggregateStats.passed} Passed <span className="text-xs font-normal text-gray-400">/ {aggregateStats.total} Total</span>
            </div>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10">
            <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Questions Done</div>
            <div className="text-lg font-black text-gray-900 dark:text-white font-mono">
              {aggregateStats.totalAnsweredAll} <span className="text-xs font-normal text-gray-400">/ {aggregateStats.totalQuestionsAll}</span>
            </div>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10">
            <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Avg Accuracy</div>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {aggregateStats.avgAccuracy}%
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Filter Tabs & Pass Mark Reminder */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-gray-100 dark:bg-black/30 border border-gray-200/60 dark:border-white/10">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            All Exams ({aggregateStats.total})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('in_progress')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeFilter === 'in_progress'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            In Progress ({aggregateStats.inProgress})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('completed')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeFilter === 'completed'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Completed ({aggregateStats.completed})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('unattempted')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeFilter === 'unattempted'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Not Started ({aggregateStats.unattempted})
          </button>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          Pass Mark: <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">95 / 180</span> (Min 19/sec)
        </div>
      </div>

      {/* Modernized Practice Exam Cards */}
      <div className="space-y-4">
        {filteredTests.map((test, filteredIdx) => {
          const origIndex = tests.findIndex(t => t.id === test.id);
          const index = origIndex >= 0 ? origIndex : filteredIdx;
          const testId = test.id || `n${lvlKey}_test_${test.testNumber || index + 1}`;
          const summary = testSummaries[origIndex] || computeTestStatus(test, history, currentUser);

          const isPassed = summary.status === 'passed';
          const isCompleted = summary.status === 'completed' || isPassed;
          const isInProgress = summary.status === 'in_progress';
          const sections = summary.sections || [];

          return (
            <div
              key={testId}
              className={`p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border transition-all duration-200 shadow-sm hover:shadow-lg ${
                isPassed
                  ? 'border-emerald-500/50 dark:border-emerald-500/40'
                  : isInProgress
                  ? 'border-emerald-500/40 dark:border-emerald-500/30'
                  : 'border-gray-200/80 dark:border-white/10'
              }`}
            >
              {/* Card Top: Number, Title, Status & Overall Progress */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm font-mono shrink-0 ${
                    isPassed
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40'
                      : isInProgress
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10'
                  }`}>
                    #{index + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2 className="text-base sm:text-lg font-black text-gray-900 dark:text-white">
                        {test.title || `${lvlUpper}【模擬試験】${index + 1}`}
                      </h2>

                      {/* Status Badges */}
                      {isPassed && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-mono">
                          <span>PASSED • {summary.scaledScore || 95}/180</span>
                        </span>
                      )}

                      {!isPassed && isCompleted && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30 font-mono">
                          Completed ({summary.totalScore}/{summary.totalQuestions})
                        </span>
                      )}

                      {isInProgress && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1.5 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                          In Progress ({summary.totalAnswered}/{summary.totalQuestions})
                        </span>
                      )}

                      {!isInProgress && !isCompleted && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10 font-mono">
                          Not Started
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>{test.totalMinutes || 90}m Limit</span>
                      <span>•</span>
                      <span>{summary.totalQuestions} Questions</span>
                      {summary.scaledScore !== null && (
                        <>
                          <span>•</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                            Scaled Score: {summary.scaledScore}/180
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Overall Exam Progress Bar (when in progress or completed) */}
                {(isInProgress || isCompleted) && (
                  <div className="flex items-center gap-3 min-w-[200px] lg:max-w-xs w-full lg:w-auto">
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] font-bold mb-1 font-mono">
                        <span className="text-gray-500 dark:text-gray-400">Progress</span>
                        <span className="text-emerald-600 dark:text-emerald-400">{summary.progressPercentage}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                          style={{ width: `${summary.progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3 Specific Sections: Live Status & Direct Launch */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
                {sections.map((sec) => (
                  <Link
                    key={sec.id}
                    to={`/levels/${lvlKey}/practice-tests/${testId}/${sec.id}`}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between group select-none ${
                      sec.isCompleted
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/60'
                        : sec.isInProgress
                        ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-500/40 hover:border-amber-500/70'
                        : 'bg-gray-50/60 dark:bg-white/[0.02] border-gray-100 dark:border-white/5 hover:border-emerald-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-base">{SECTION_ICONS[sec.id] || '📑'}</span>
                      <div className="truncate">
                        <div className="text-xs font-bold text-gray-800 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">
                          {sec.title}
                        </div>
                        <div className="text-[11px] text-gray-500 dark:text-gray-400 font-mono">
                          {sec.questionCount} Questions
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 ml-2">
                      {sec.isCompleted ? (
                        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {sec.score}/{sec.questionCount} ({sec.percentage}%) ✓
                        </span>
                      ) : sec.isInProgress ? (
                        <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          問 {sec.resumeIndex + 1} ▶
                        </span>
                      ) : (
                        <span className="text-[11px] text-gray-400 font-mono">
                          Not Started
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Action Bar: Direct, Purposeful Buttons */}
              <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-gray-100 dark:border-white/5">
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <span>Sections: 3 Parts (Vocab, Grammar & Reading, Listening)</span>
                </div>

                <div className="flex items-center gap-2.5">
                  {summary.totalAnswered > 0 && (
                    <button
                      type="button"
                      onClick={(e) => handleResetTest(testId, e)}
                      className="px-3.5 py-2 rounded-xl border border-gray-200 dark:border-white/10 hover:border-red-400/40 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer"
                      title="Clear local cached answers for this test"
                    >
                      🔄 Reset
                    </button>
                  )}

                  {isInProgress ? (
                    <Link
                      to={`/levels/${lvlKey}/practice-tests/${testId}/${summary.resumeSection?.id || ''}`}
                      className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5"
                    >
                      <span>▶️ Resume Exam ({summary.resumeSection?.title} 問 {summary.resumeSection?.resumeIndex + 1})</span>
                      <span>&rarr;</span>
                    </Link>
                  ) : isCompleted ? (
                    <Link
                      to={`/levels/${lvlKey}/practice-tests/${testId}`}
                      className="px-5 py-2.5 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-xs shadow-md hover:bg-gray-800 dark:hover:bg-gray-100 transition flex items-center gap-1.5"
                    >
                      <span>📊 Review Score & Answers</span>
                      <span>&rarr;</span>
                    </Link>
                  ) : (
                    <Link
                      to={`/levels/${lvlKey}/practice-tests/${testId}`}
                      className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5"
                    >
                      <span>🚀 Take Full Exam</span>
                      <span>&rarr;</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JlptPracticeTestsListPage;
