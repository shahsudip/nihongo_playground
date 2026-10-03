import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getTestsForLevel, getPracticeTestHistory } from '../utils/jlpt_practice_tests_service.js';
import LoadingSpinner from '../utils/loading_spinner.jsx';

const LEVEL_META = {
  n5: { title: 'N5', name: 'Beginner', badge: 'Introductory', color: 'emerald' },
  n4: { title: 'N4', name: 'Elementary', badge: 'Basic', color: 'teal' },
  n3: { title: 'N3', name: 'Intermediate', badge: 'Bridge', color: 'sky' },
  n2: { title: 'N2', name: 'Upper-Intermediate', badge: 'Professional', color: 'indigo' },
  n1: { title: 'N1', name: 'Advanced', badge: 'Mastery', color: 'purple' },
};

const SECTION_ICONS = {
  vocab: '📖',
  grammar_reading: '📜',
  vocab_grammar_reading: '📚',
  listening: '🎧',
};

const JlptPracticeTestsListPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [tests, setTests] = useState([]);
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState(true);

  const lvlKey = (level || 'n3').toLowerCase();
  const lvlUpper = lvlKey.toUpperCase();
  const meta = LEVEL_META[lvlKey] || LEVEL_META.n3;

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setLoading(true);
      try {
        const [testsList, userHistory] = await Promise.all([
          getTestsForLevel(lvlUpper),
          getPracticeTestHistory(currentUser),
        ]);
        if (isMounted) {
          setTests(testsList || []);
          setHistory(userHistory || {});
        }
      } catch (err) {
        console.error('Failed to load practice tests for level:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, [lvlUpper, currentUser]);

  const totalTests = tests.length || 5;

  const stats = useMemo(() => {
    let completed = 0;
    let mastered = 0;
    let totalQuestionsAttempted = 0;
    let totalScore = 0;

    tests.forEach((t) => {
      const qid = `jlpt-mock-${t.id}`;
      const rec = history[qid];
      if (rec) {
        if (rec.status === 'mastered') mastered++;
        if (rec.status === 'completed' || rec.status === 'mastered') completed++;
        if (rec.answered) totalQuestionsAttempted += rec.answered;
        if (rec.score) totalScore += rec.score;
      }
    });

    const accuracy = totalQuestionsAttempted > 0
      ? Math.round((totalScore / totalQuestionsAttempted) * 100)
      : 0;

    return { completed, mastered, totalQuestionsAttempted, accuracy };
  }, [tests, history]);

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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 animate-fade-in">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6">
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

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 border border-emerald-500/20 dark:border-emerald-500/30 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase mb-3">
              <span>🎯</span>
              <span>JLPT {lvlUpper} • {meta.badge} Track</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              {lvlUpper} 模擬試験 (Practice Tests)
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2 max-w-2xl leading-relaxed">
              Standard full-length mock examinations covering Language Knowledge, Reading passages, and Listening audio sections with instant explanation breakdowns.
            </p>
          </div>

          {/* Quick Stats overview */}
          <div className="grid grid-cols-3 gap-3 shrink-0 bg-white/70 dark:bg-zinc-900/80 backdrop-blur-sm border border-gray-200/80 dark:border-white/10 p-4 rounded-2xl shadow-sm">
            <div className="text-center px-2">
              <span className="block text-2xl font-black text-gray-900 dark:text-white">
                {stats.mastered}/{totalTests}
              </span>
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Mastered
              </span>
            </div>
            <div className="text-center px-2 border-x border-gray-200 dark:border-white/10">
              <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {stats.accuracy}%
              </span>
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Accuracy
              </span>
            </div>
            <div className="text-center px-2">
              <span className="block text-2xl font-black text-gray-900 dark:text-white">
                {totalTests}
              </span>
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total Sets
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test, index) => {
          const testId = test.id || `n${lvlKey}_test_${test.testNumber || index + 1}`;
          const qid = `jlpt-mock-${testId}`;
          const historyItem = history[qid];
          const isMastered = historyItem?.status === 'mastered';
          const isAttempted = Boolean(historyItem);
          const sections = test.sections || [];

          return (
            <div
              key={testId}
              className={`bg-white dark:bg-zinc-900 border rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                isMastered
                  ? 'border-emerald-500/60 dark:border-emerald-500/40 ring-1 ring-emerald-500/30'
                  : 'border-gray-200/80 dark:border-white/10 hover:border-emerald-500/50'
              }`}
            >
              <div>
                {/* Card Top: Number, Badge, Score */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-zinc-800 dark:to-zinc-800/60 border border-emerald-200/50 dark:border-white/10 flex items-center justify-center font-black text-sm text-emerald-700 dark:text-emerald-400 shadow-sm">
                      #{index + 1}
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {test.title || `${lvlUpper}【模擬試験】${index + 1}`}
                      </h2>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>⏱️ {test.totalMinutes || 90}m</span>
                        <span>•</span>
                        <span>📝 {test.totalQuestions} Questions</span>
                      </div>
                    </div>
                  </div>

                  {historyItem && (
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                        isMastered
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                          : 'bg-sky-500/15 text-sky-600 dark:text-sky-300 border-sky-500/30'
                      }`}
                      title="Latest recorded attempt score"
                    >
                      {historyItem.score}/{historyItem.total} ({historyItem.percentage || 0}%)
                    </span>
                  )}
                </div>

                {/* Section breakdown list */}
                <div className="space-y-2 mb-6">
                  {sections.map((sec) => (
                    <div
                      key={sec.id}
                      className="flex items-center justify-between text-xs py-1.5 px-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-gray-700 dark:text-gray-300"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span>{SECTION_ICONS[sec.id] || '📑'}</span>
                        <span className="font-semibold truncate">{sec.title}</span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 font-mono text-[11px] shrink-0 ml-2">
                        {sec.questionCount}q
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 dark:border-white/5 space-y-2">
                <Link
                  to={`/levels/${lvlKey}/practice-tests/${testId}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-sm transition-all shadow-md shadow-emerald-600/20"
                >
                  <span>{isMastered ? '🏆 Review Full Exam' : isAttempted ? '📝 Continue Exam' : '▶️ Take Full Exam'}</span>
                  <span>&rarr;</span>
                </Link>

                {/* Direct quick-drill into individual sections */}
                <div className="flex flex-wrap gap-1.5 pt-1 justify-center">
                  {sections.map((sec) => (
                    <Link
                      key={sec.id}
                      to={`/levels/${lvlKey}/practice-tests/${testId}/${sec.id}`}
                      className="text-[11px] font-bold py-1 px-2.5 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-gray-600 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors border border-transparent hover:border-emerald-300/40"
                    >
                      {SECTION_ICONS[sec.id]} {sec.id === 'vocab' ? 'Vocab' : sec.id === 'grammar_reading' ? 'Grammar' : sec.id === 'listening' ? 'Listening' : 'Section'}
                    </Link>
                  ))}
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
