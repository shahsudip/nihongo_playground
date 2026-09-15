// src/components/ExamPlanModal.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateBookPlan, getUpcomingJlptExams } from '../utils/jlptExamPlanner.js';

const ExamPlanModal = ({ isOpen, onClose, book, completedCount = 0, history = {} }) => {
  const navigate = useNavigate();
  const upcomingExams = useMemo(() => getUpcomingJlptExams(), []);
  const [selectedExamId, setSelectedExamId] = useState(() => {
    return upcomingExams[0]?.id || '';
  });

  const activeExamId = useMemo(() => {
    return upcomingExams.some(e => e.id === selectedExamId) ? selectedExamId : upcomingExams[0]?.id || '';
  }, [upcomingExams, selectedExamId]);

  const plan = useMemo(() => {
    if (!book) return null;
    return calculateBookPlan(book, completedCount, activeExamId);
  }, [book, completedCount, activeExamId]);

  if (!isOpen || !book || !plan) return null;

  // Determine next uncompleted chapter/set route
  const getNextChapterRoute = () => {
    if (book.customRoute) {
      return book.customRoute;
    }

    if (book.id === 'speed-master-n3-reading') {
      return `/books/speed-master-n3-reading/chapters/short-1`;
    }
    if (book.id === 'sou-matome-n3-reading') {
      return `/books/sou-matome-n3-reading/chapters/week1-day1`;
    }
    if (book.id === 'shinkanzen-master-n3-reading') {
      return `/books/shinkanzen-master-n3-reading/chapters/part-1`;
    }
    if (book.id === 'shinkanzen-master-n3-listening') {
      return `/books/shinkanzen-master-n3-listening/chapters/mondai-1`;
    }
    return `/books/${book.id}`;
  };


  const handleStartToday = () => {
    onClose();
    navigate(getNextChapterRoute(), { state: { from: 'profile' } });
  };

  const handleViewAllChapters = () => {
    onClose();
    if (book.customRoute) {
      navigate(book.customRoute, { state: { from: 'profile' } });
    } else {
      navigate(`/books/${book.id}`, { state: { from: 'profile' } });
    }
  };

  return (
    <div className="exam-plan-overlay" onClick={onClose} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px'
    }}>
      <div 
        className="exam-plan-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--color-bg-card, #1e293b)',
          color: 'var(--color-text-primary, #f8fafc)',
          borderRadius: '20px',
          maxWidth: '560px',
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
          animation: 'examModalIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px 24px 16px',
          borderBottom: '1px solid var(--color-border, rgba(255, 255, 255, 0.1))',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '6px',
                letterSpacing: '0.05em'
              }}>
                {book.level || 'JLPT'} EXAM MODE
              </span>
              <span style={{
                background: 'rgba(59, 130, 246, 0.15)',
                color: '#60a5fa',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '6px'
              }}>
                {book.category || 'General'}
              </span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
              {book.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-secondary, #94a3b8)',
              fontSize: '1.1rem',
              transition: 'all 0.15s ease'
            }}
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '20px 24px', maxHeight: 'calc(85vh - 140px)', overflowY: 'auto' }}>
          {/* 1. Target Exam Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary, #94a3b8)', marginBottom: '8px' }}>
              🎯 Target JLPT Exam Session (Bi-Annual)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
              {upcomingExams.map(exam => {
                const isSelected = exam.id === activeExamId;
                return (
                  <button
                    key={exam.id}
                    type="button"
                    onClick={() => setSelectedExamId(exam.id)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #10b981' : '1px solid var(--color-border, rgba(255, 255, 255, 0.1))',
                      background: isSelected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      color: isSelected ? '#10b981' : 'inherit',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{exam.name}</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '2px' }}>
                      {exam.formattedDate.split(',')[1] || exam.formattedDate}
                    </div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, marginTop: '4px', color: isSelected ? '#10b981' : '#38bdf8' }}>
                      ⏳ {exam.daysLeft} days left
                    </div>
                    {exam.registrationWindow && (
                      <div style={{ fontSize: '0.68rem', opacity: 0.75, marginTop: '2px' }}>
                        📝 Reg: {exam.registrationWindow}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Key Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--color-border, rgba(255, 255, 255, 0.08))',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{plan.total}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary, #94a3b8)', marginTop: '2px' }}>Total Sets/Ch.</div>
            </div>
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>{plan.completed}</div>
              <div style={{ fontSize: '0.72rem', color: '#10b981', marginTop: '2px' }}>Completed ({plan.percent}%)</div>
            </div>
            <div style={{
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f59e0b' }}>{plan.remaining}</div>
              <div style={{ fontSize: '0.72rem', color: '#f59e0b', marginTop: '2px' }}>Remaining</div>
            </div>
          </div>

          {/* 3. Daily Quota Goal Highlight Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '14px',
            padding: '16px 20px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#10b981' }}>
                ⚡ Daily Target Requirement
              </span>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                color: plan.paceColor
              }}>
                {plan.paceLabel}
              </span>
            </div>

            {plan.remaining === 0 ? (
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#10b981' }}>
                🎉 You have completed all content in this book! Ready for exam day.
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fff', marginBottom: '4px' }}>
                  🎯 Finish <span style={{ color: '#10b981' }}>{plan.dailyQuota} {plan.dailyQuota === 1 ? 'Set / Chapter' : 'Sets / Chapters'}</span> daily
                </div>
                <p style={{ fontSize: '0.8rem', margin: 0, color: 'var(--color-text-secondary, #94a3b8)', lineHeight: 1.4 }}>
                  At this pace ({plan.weeklyQuota} per week), you will comfortably complete all {plan.total} items before <strong style={{ color: '#fff' }}>{plan.selectedExam.formattedDate}</strong> ({plan.daysLeft} days remaining).
                </p>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--color-text-secondary, #94a3b8)' }}>Exam Readiness Progress</span>
              <span style={{ fontWeight: 800, color: '#10b981' }}>{plan.percent}%</span>
            </div>
            <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${plan.percent}%`,
                background: 'linear-gradient(90deg, #10b981, #3b82f6)',
                borderRadius: '4px',
                transition: 'width 0.4s ease'
              }}></div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--color-border, rgba(255, 255, 255, 0.1))',
          display: 'flex',
          gap: '10px',
          background: 'rgba(0, 0, 0, 0.15)'
        }}>
          <button
            type="button"
            onClick={handleViewAllChapters}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '10px',
              border: '1px solid var(--color-border, rgba(255, 255, 255, 0.15))',
              background: 'transparent',
              color: 'inherit',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            📚 View All
          </button>
          <button
            type="button"
            onClick={handleStartToday}
            style={{
              flex: 2,
              padding: '10px 18px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
              transition: 'all 0.15s ease'
            }}
          >
            🚀 Start Today's Plan &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamPlanModal;
