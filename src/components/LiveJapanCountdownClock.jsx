// src/components/LiveJapanCountdownClock.jsx
import React, { useState, useEffect } from 'react';
import '../assets/live_countdown_clock.css';

/**
 * Big Live Countdown Clock Synced with Japan Standard Time (JST / UTC+9)
 * Ticks live every second counting down Days, Hours, Minutes, and Seconds
 * until the official JLPT exam start (12:30 PM JST).
 */
const LiveJapanCountdownClock = ({
  targetExam,
  onOpenPlan,
  compact = false,
  showLaunchSprint = true
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0
  });

  const [jstNow, setJstNow] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      if (!targetExam || !targetExam.date) return;

      const examDate = new Date(targetExam.date);
      // JLPT officially starts at 12:30 PM JST (which is 03:30 AM UTC)
      const targetUtcMs = Date.UTC(
        examDate.getFullYear(),
        examDate.getMonth(),
        examDate.getDate(),
        3,
        30,
        0
      );

      const nowUtcMs = Date.now();
      const diffMs = Math.max(0, targetUtcMs - nowUtcMs);

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        totalSeconds: Math.floor(diffMs / 1000)
      });

      // Current Tokyo Live Time string
      try {
        const tokyoTime = new Date().toLocaleString('ja-JP', {
          timeZone: 'Asia/Tokyo',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        setJstNow(tokyoTime);
      } catch {
        setJstNow(new Date().toUTCString());
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetExam]);

  if (!targetExam) return null;

  const padZero = (n) => String(n).padStart(2, '0');

  return (
    <div className={`live-clock-block ${compact ? 'compact' : ''}`}>
      <div className="live-clock-ambient-glow" />
      
      {/* Top Header Row */}
      <div className="live-clock-header">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="live-clock-badge">
            <span className="live-dot" /> LIVE JST SYNC
          </span>
          <span className="live-clock-target-title">
            {targetExam.name} • {targetExam.formattedDate} (12:30 JST)
          </span>
        </div>

        <div className="live-clock-jst-pill">
          <span className="flag-icon">🇯🇵</span>
          <span className="jst-label">Tokyo JST:</span>
          <span className="jst-time">{jstNow || 'Syncing...'}</span>
        </div>
      </div>

      {/* Main Big Digit Countdown Tiles */}
      <div className="live-clock-grid">
        {/* DAYS */}
        <div className="live-digit-tile days-tile">
          <div className="digit-value">{timeLeft.days}</div>
          <div className="digit-label">
            <span className="en-label">DAYS</span>
            <span className="jp-label">日</span>
          </div>
        </div>

        <div className="live-clock-separator">:</div>

        {/* HOURS */}
        <div className="live-digit-tile">
          <div className="digit-value">{padZero(timeLeft.hours)}</div>
          <div className="digit-label">
            <span className="en-label">HOURS</span>
            <span className="jp-label">時間</span>
          </div>
        </div>

        <div className="live-clock-separator">:</div>

        {/* MINUTES */}
        <div className="live-digit-tile">
          <div className="digit-value">{padZero(timeLeft.minutes)}</div>
          <div className="digit-label">
            <span className="en-label">MINUTES</span>
            <span className="jp-label">分</span>
          </div>
        </div>

        <div className="live-clock-separator">:</div>

        {/* SECONDS (Live Ticking Neon) */}
        <div className="live-digit-tile seconds-tile">
          <div className="digit-value live-pulse">{padZero(timeLeft.seconds)}</div>
          <div className="digit-label">
            <span className="en-label">SECONDS</span>
            <span className="jp-label">秒</span>
          </div>
        </div>
      </div>

      {/* Bottom Subtitle and Action Controls */}
      <div className="live-clock-footer">
        <div className="live-clock-subtext">
          <span>🎯 Official Exam Start: <strong>12:30 PM Japan Standard Time</strong></span>
          <span className="opacity-60 hidden sm:inline">•</span>
          <span className="opacity-90">Registration: {targetExam.registrationWindow}</span>
        </div>

        {onOpenPlan && (
          <button
            type="button"
            onClick={onOpenPlan}
            className="live-clock-plan-btn"
          >
            📅 Configure Daily Quotas & Study Plan &rarr;
          </button>
        )}
      </div>
    </div>
  );
};

export default LiveJapanCountdownClock;
