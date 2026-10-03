import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getPastExamsIndex, getPastExamHistory } from '../utils/jlpt_past_exams_service.js';
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

const JlptPastQuestionsListPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [exams, setExams] = useState([]);
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('ALL');

  const lvlKey = (level || 'n3').toLowerCase();
  const lvlUpper = lvlKey.toUpperCase();
  const meta = LEVEL_META[lvlKey] || LEVEL_META.n3;

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setLoading(true);
      try {
        const [indexData, userHistory] = await Promise.all([
          getPastExamsIndex(lvlUpper),
          getPastExamHistory(currentUser),
        ]);
        if (isMounted) {
          setExams(indexData?.exams || []);
          setHistory(userHistory || {});
        }
      } catch (err) {
        console.error('Failed to load past exams index:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, [lvlUpper, currentUser]);

  // Extract distinct years for filtering (e.g. [2024, 2023, 2022, 2021, 2020, 2019, 2018])
  const availableYears = useMemo(() => {
    const set = new Set();
    exams.forEach(e => {
      if (e.year) set.add(e.year);
    });
    return Array.from(set).sort((a, b) => b - a);
  }, [exams]);

  // Filtered exams based on selectedYear
  const filteredExams = useMemo(() => {
    if (selectedYear === 'ALL') return exams;
    return exams.filter(e => e.year === Number(selectedYear));
  }, [exams, selectedYear]);

  // Overall statistics from user attempt history
  const stats = useMemo(() => {
    let completedCount = 0;
    let passedCount = 0;
    let totalScaledScoreSum = 0;

    exams.forEach(exam => {
      const qid = `jlpt-past-${exam.id}`;
      const rec = history[qid];
      if (rec) {
        completedCount++;
        if (rec.isPassed) passedCount++;
        if (typeof rec.totalScaledScore === 'number') {
          totalScaledScoreSum += rec.totalScaledScore;
        }
      }
    });

    const avgScore = completedCount > 0 ? Math.round(totalScaledScoreSum / completedCount) : 0;
    return { completedCount, passedCount, avgScore };
  }, [exams, history]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <LoadingSpinner />
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
          Loading Official JLPT {lvlUpper} Past Exams...
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
            Past JLPT Exams (過去問)
          </li>
        </ol>
      </nav>

      {/* Header Banner */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200/60 dark:border-red-800/40 text-red-700 dark:text-red-300 text-xs font-black uppercase mb-3">
              <span>🏛️</span>
              <span>Official Real Japanese Exam Papers • {exams.length} Test Sessions</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              JLPT {lvlUpper} Past Exams (過去問)
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 max-w-2xl font-medium">
              Official past exam papers organized by year and session. Tested with authentic 180-point scaled scoring: <span className="font-bold text-emerald-600 dark:text-emerald-400">95 / 180 to pass</span> with <span className="font-bold text-amber-600 dark:text-amber-400">&ge; 19 points</span> minimum per section.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-white/10 shadow-sm">
            <div className="text-center px-2">
              <span className="block text-2xl font-black text-gray-900 dark:text-white font-mono">
                {stats.completedCount} / {exams.length}
              </span>
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Attempted
              </span>
            </div>
            <div className="w-px h-8 bg-gray-200 dark:bg-zinc-700" />
            <div className="text-center px-2">
              <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {stats.passedCount}
              </span>
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Passed (合格)
              </span>
            </div>
            {stats.completedCount > 0 && (
              <>
                <div className="w-px h-8 bg-gray-200 dark:bg-zinc-700" />
                <div className="text-center px-2">
                  <span className="block text-2xl font-black text-sky-600 dark:text-sky-400 font-mono">
                    {stats.avgScore}
                  </span>
                  <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Avg Scaled /180
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Year Filter Pills */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mr-1 shrink-0">
            Year Filter:
          </span>
          <button
            type="button"
            onClick={() => setSelectedYear('ALL')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
              selectedYear === 'ALL'
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-sm'
                : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
            }`}
          >
            All Years ({exams.length})
          </button>
          {availableYears.map(year => {
            const count = exams.filter(e => e.year === year).length;
            const isSelected = selectedYear === year.toString();
            return (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year.toString())}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
                }`}
              >
                {year}年 ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Past Exam Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {filteredExams.map((exam) => {
          const qid = `jlpt-past-${exam.id}`;
          const attempt = history[qid];
          const hasAttempt = Boolean(attempt);
          const isPassed = attempt?.isPassed;
          const totalScaled = attempt?.totalScaledScore;
          const maxScaled = attempt?.maxScore || 180;

          return (
            <div
              key={exam.id}
              className="bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-red-500/50 dark:hover:border-red-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Session Name & Pass Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200/50 dark:border-red-800/40">
                      📅
                    </span>
                    <div>
                      <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                        {exam.year}年 • {exam.month === 12 ? 'December' : 'July'} Session
                      </span>
                      <h2 className="text-lg font-black text-gray-900 dark:text-white">
                        {exam.sessionName || `${exam.year}年${exam.month}月`}
                      </h2>
                    </div>
                  </div>

                  {hasAttempt && (
                    <div className="text-right">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-black uppercase font-mono border ${
                          isPassed
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                            : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                        }`}
                      >
                        {isPassed ? '合格 PASSED' : '不合格 FAILED'}
                      </span>
                      {typeof totalScaled === 'number' && (
                        <span className="block text-[11px] font-mono font-bold text-gray-600 dark:text-gray-400 mt-0.5">
                          {totalScaled} / {maxScaled} 点
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Subtitle & Specs */}
                <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-4 line-clamp-1">
                  {exam.japaneseTitle}
                </p>

                {/* Exam Metadata Chips */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 flex items-center gap-1">
                    <span>⏱️</span>
                    <span>{exam.totalMinutes || 140} mins</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 flex items-center gap-1">
                    <span>📝</span>
                    <span>{exam.totalQuestions} Questions</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 flex items-center gap-1">
                    <span>🎯</span>
                    <span>180 Scaled Pts</span>
                  </span>
                </div>

                {/* Sections list */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 block">
                    Exam Sections:
                  </span>
                  {exam.sections?.map((sec, idx) => {
                    const icon = SECTION_ICONS[sec.id] || '📋';
                    return (
                      <Link
                        key={sec.id}
                        to={`/levels/${lvlKey}/past-questions/${exam.id}/${sec.id}`}
                        className="flex items-center justify-between p-2 rounded-xl text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-zinc-700 group"
                      >
                        <span className="flex items-center gap-2 truncate">
                          <span>{icon}</span>
                          <span className="truncate">{sec.title}</span>
                        </span>
                        <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 shrink-0">
                          {sec.questionCount}問 &rarr;
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Main Action Button */}
              <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate(`/levels/${lvlKey}/past-questions/${exam.id}`)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-black bg-red-600 hover:bg-red-500 text-white shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{hasAttempt ? '🔄 Retake Full Exam' : '🚀 Take Full Exam (本番模試)'}</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredExams.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-white/10 rounded-3xl mt-6">
          <div className="text-4xl mb-3">📁</div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            No past exams found for year {selectedYear}.
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Try selecting "All Years" to view all available exam sessions.
          </p>
          <button
            type="button"
            onClick={() => setSelectedYear('ALL')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-900 text-white dark:bg-white dark:text-gray-900"
          >
            Show All Years
          </button>
        </div>
      )}
    </div>
  );
};

export default JlptPastQuestionsListPage;
