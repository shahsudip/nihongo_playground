// src/components/DailySprintListPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { collection, getDocs } from 'firebase/firestore';
import { generateShinkanzenDailySprints } from '../utils/dailySprintGenerator.js';
import { getNextUpcomingExam } from '../utils/jlptExamPlanner.js';
import LiveJapanCountdownClock from './LiveJapanCountdownClock.jsx';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import '../assets/daily_sprint.css';

const DailySprintListPage = () => {
  const { bookId = 'shinkanzen-master-n3-reading' } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const sprints = useMemo(() => generateShinkanzenDailySprints(), []);
  const nextExam = useMemo(() => getNextUpcomingExam(), []);

  const [historyMap, setHistoryMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    const fetchHistory = async () => {
      try {
        const historyColRef = collection(db, 'users', currentUser.uid, 'quizHistory');
        const snap = await getDocs(historyColRef);
        const map = {};
        snap.forEach(docSnap => {
          const data = docSnap.data();
          if (data && data.quizId && data.quizId.startsWith('shinkanzen-sprint-day-')) {
            map[data.quizId] = data;
          }
        });
        setHistoryMap(map);
      } catch (err) {
        console.warn("Failed to fetch sprint history:", err);
      }
    };
    fetchHistory();
  }, [currentUser]);

  // Find today's active mission day (first unmastered day)
  const todayDayNumber = useMemo(() => {
    for (const sprint of sprints) {
      if (!historyMap[sprint.sprintKey] || historyMap[sprint.sprintKey].status !== 'mastered') {
        return sprint.dayNumber;
      }
    }
    return sprints.length; // all completed
  }, [sprints, historyMap]);

  const todaySprint = useMemo(() => {
    return sprints.find(s => s.dayNumber === todayDayNumber) || sprints[0];
  }, [sprints, todayDayNumber]);

  const todayHistory = historyMap[todaySprint.sprintKey];
  const isTodayMastered = todayHistory && (todayHistory.status === 'mastered' || (todayHistory.total > 0 && todayHistory.score / todayHistory.total >= 0.75));
  const isTodayAttempted = Boolean(todayHistory);

  const completedCount = useMemo(() => {
    return Object.values(historyMap).filter(h => h.status === 'mastered' || (h.total > 0 && h.score / h.total >= 0.75)).length;
  }, [historyMap]);

  return (
    <div className="sprint-page-wrapper" style={{ padding: '30px 20px 80px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <li><Link to="/books" className="hover:underline">Books</Link></li>
            <li>/</li>
            <li><Link to={`/books/${bookId}`} className="hover:underline">Shinkanzen Master N3 Reading</Link></li>
            <li>/</li>
            <li className="text-[var(--color-text-primary)] font-bold">Exam Mode Today's Mission</li>
          </ol>
        </nav>

        {/* Live Japan Countdown Clock Block */}
        <LiveJapanCountdownClock
          targetExam={nextExam}
          compact={false}
        />

        {/* 🎯 TODAY'S EXAM MISSION CARD (The Only Card Shown In Focused Mode) */}
        <div className="today-mission-card">
          <div className="today-mission-glow" />

          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span style={{
              background: isTodayMastered ? 'rgba(16, 185, 129, 0.25)' : '#10b981',
              color: isTodayMastered ? '#10b981' : '#ffffff',
              fontSize: '0.75rem',
              fontWeight: 900,
              padding: '4px 12px',
              borderRadius: '8px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>
              {isTodayMastered ? '✓ TODAY’S MISSION COMPLETED' : `🎯 TODAY’S TARGET — DAY ${todaySprint.dayNumber} OF ${sprints.length}`}
            </span>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <span className="px-2.5 py-1 rounded-md bg-black/30 border border-white/10">
                ⏱️ {todaySprint.allocatedMinutes} Mins Allocated
              </span>
              <span className="px-2.5 py-1 rounded-md bg-black/30 border border-white/10">
                ❓ {todaySprint.totalQuestions} Questions
              </span>
            </div>
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>
            {todaySprint.titleJa}
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '24px', maxWidth: '640px' }}>
            Complete today's balanced 3-passage sprint under realistic 20-minute JLPT exam conditions to keep your daily study streak active.
          </p>

          {/* Today's Included Passages Breakdown */}
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              📝 Passages To Conquer Today:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {todaySprint.passages.map((p, pIdx) => {
                const genreBadge = p.partNum === 1 ? '短文理解 (Short)' : p.partNum === 2 ? '中文理解 (Medium)' : p.partNum === 3 ? '長文理解 (Long)' : '情報検索 (Info Retrieval)';
                const badgeColor = p.partNum === 1 ? '#38bdf8' : p.partNum === 2 ? '#34d399' : p.partNum === 3 ? '#a78bfa' : '#fbbf24';

                return (
                  <div key={pIdx} className="today-checklist-item">
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.2)',
                      color: '#10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 900,
                      flexShrink: 0
                    }}>
                      {pIdx + 1}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: 800, color: badgeColor, textTransform: 'uppercase' }}>
                        {genreBadge}
                      </div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.title}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            {isTodayMastered ? (
              <div className="flex items-center gap-3">
                <div className="text-2xl">🎉</div>
                <div>
                  <div className="text-sm font-bold text-emerald-400">
                    Day {todaySprint.dayNumber} Mastered! ({todayHistory.score}/{todayHistory.total} Correct)
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)]">
                    Streak secured for today. Ready for next day or review anytime.
                  </div>
                </div>
              </div>
            ) : isTodayAttempted ? (
              <div className="text-xs text-amber-400 font-bold">
                ⚠️ Attempted ({todayHistory.score}/{todayHistory.total}) — Retake to achieve &ge;75% mastery.
              </div>
            ) : (
              <div className="text-xs text-[var(--color-text-secondary)]">
                ⚡ Ready to begin. Timer starts when you launch.
              </div>
            )}

            <div className="flex items-center gap-3">
              {isTodayAttempted && (
                <Link
                  to={`/books/${bookId}/sprint/${todaySprint.dayNumber}`}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm transition"
                >
                  📝 Review
                </Link>
              )}

              <Link
                to={`/books/${bookId}/sprint/${todaySprint.dayNumber}`}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-sm shadow-xl hover:shadow-emerald-500/30 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                {isTodayMastered ? '🔄 Practice Today’s Mission Again' : isTodayAttempted ? '🚀 Retake Today’s Mission' : '🚀 Start Today’s Mission (20 Min) →'}
              </Link>
            </div>
          </div>
        </div>

        {/* 15-Day Minimalist Streak Timeline Strip */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.4)',
          border: '1px solid var(--color-border, #334155)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              📅 15-Day Exam Streak Roadmap ({completedCount}/{sprints.length} Completed)
            </span>
            <span className="text-xs font-extrabold text-emerald-400">
              {Math.round((completedCount / sprints.length) * 100)}%
            </span>
          </div>

          <div className="streak-timeline-strip">
            {sprints.map((s) => {
              const hist = historyMap[s.sprintKey];
              const isDone = hist && (hist.status === 'mastered' || hist.percentage >= 75);
              const isCurrent = s.dayNumber === todaySprint.dayNumber;
              const isLocked = s.dayNumber > todaySprint.dayNumber && !isDone;

              let chipClass = 'streak-day-chip';
              if (isCurrent) chipClass += ' active-today';
              else if (isDone) chipClass += ' completed';
              else if (isLocked) chipClass += ' locked';

              return (
                <Link
                  key={s.dayNumber}
                  to={isLocked ? '#' : `/books/${bookId}/sprint/${s.dayNumber}`}
                  onClick={(e) => { if (isLocked) e.preventDefault(); }}
                  className={chipClass}
                  title={`Day ${s.dayNumber}: ${s.titleJa}`}
                >
                  <span style={{ fontSize: '0.68rem', opacity: 0.7 }}>DAY</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 900 }}>{s.dayNumber}</span>
                  <span style={{ fontSize: '0.65rem', marginTop: '2px' }}>
                    {isDone ? '✓ Done' : isCurrent ? '🎯 Today' : '🔒'}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Optional Accordion for Full Curriculum Archive */}
        <div className="text-center">
          <button
            onClick={() => setShowArchive(!showArchive)}
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-[var(--color-text-secondary)] hover:text-white transition border border-white/10"
          >
            {showArchive ? '▲ Hide Full 15-Day Curriculum Archive' : '▼ View Full 15-Day Curriculum Archive (Review Mode)'}
          </button>
        </div>

        {/* Collapsible Archive Grid */}
        {showArchive && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginTop: '20px' }}>
            {sprints.map((sprint) => {
              const hist = historyMap[sprint.sprintKey];
              const isDone = Boolean(hist);
              const isMastered = hist && (hist.status === 'mastered' || hist.percentage >= 75);
              const isCurrent = sprint.dayNumber === todaySprint.dayNumber;

              return (
                <div
                  key={sprint.dayNumber}
                  style={{
                    background: isCurrent ? 'rgba(16, 185, 129, 0.08)' : 'var(--color-bg-card, #1e293b)',
                    border: isCurrent ? '2px solid #10b981' : isDone ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--color-border, #334155)',
                    borderRadius: '14px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#10b981' }}>
                        DAY {sprint.dayNumber}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>
                        ⏱️ {sprint.allocatedMinutes}m
                      </span>
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
                      {sprint.titleJa}
                    </h4>
                    <p style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                      {sprint.passageCount} passages &bull; {sprint.totalQuestions} questions
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span style={{ fontSize: '0.72rem', color: isMastered ? '#10b981' : isDone ? '#f59e0b' : 'var(--color-text-muted)' }}>
                      {isMastered ? `✓ ${hist.score}/${hist.total}` : isDone ? `${hist.score}/${hist.total}` : 'Pending'}
                    </span>
                    <Link
                      to={`/books/${bookId}/sprint/${sprint.dayNumber}`}
                      className="text-xs font-bold text-emerald-400 hover:underline"
                    >
                      {isDone ? 'Review →' : 'Start →'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default DailySprintListPage;
