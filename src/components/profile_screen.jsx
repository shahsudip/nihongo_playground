import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { collection, query, getDocs, addDoc, doc, deleteDoc, orderBy } from 'firebase/firestore';
import { formatDateTime, parseRawDate } from '../utils/formatters.jsx';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import { STATIC_BOOKS } from '../data/static_books_catalog.js';

import coverN1 from '../assets/shin_cover_n1.jpg';
import coverN2 from '../assets/shin_cover_n2.jpg';
import coverN3 from '../assets/shin_cover_n3.jpg';
import coverN4N5 from '../assets/shin_cover_n4n5.jpg';
import powerDrillN1 from '../assets/power_drill_n1_cover.jpg';
import powerDrillN2 from '../assets/power_drill_n2_cover.jpg';
import powerDrillN3 from '../assets/power_drill_n3_cover.jpg';
import tangoN1Cover from '../assets/tango_n1_cover.jpg';
import tangoN2Cover from '../assets/tango_n2_cover.jpg';
import tangoN3Cover from '../assets/tango_n3_cover.jpg';

import ExamPlanModal from './ExamPlanModal.jsx';
import { getUpcomingJlptExams } from '../utils/jlptExamPlanner.js';
import LiveJapanCountdownClock from './LiveJapanCountdownClock.jsx';
import '../assets/profile_style.css';

const parseCsvToQuizContent = (csvText) => {
  if (!csvText) return [];
  const lines = csvText.split('\n').map(line => line.trim()).filter(line => line);
  if (lines.length === 0) return [];
  const firstLine = lines[0].toLowerCase();
  const hasHeader = firstLine.includes('hiragana') || firstLine.includes('meaning') || firstLine.includes('kanji');
  const dataLines = hasHeader ? lines.slice(1) : lines;

  return dataLines.map(line => {
    const [hiragana, meaning, kanji] = line.split(',').map(s => s.trim());
    return { kanji: kanji || '', hiragana: hiragana || '', meaning: meaning || '' };
  });
};

const LEVEL_COLORS = {
  N1: '#ef4444',
  N2: '#a855f7',
  N3: '#10b981',
  N4: '#f59e0b',
  N5: '#06b6d4',
  'N4-N5': '#f59e0b',
  JLPT: '#64748b'
};

export const inferItemLevel = (item) => {
  if (!item) return 'N3';
  let lvl = (item.level || '').toUpperCase();
  if (lvl) return lvl === 'N4-N5' ? 'N4' : lvl;
  const idStr = `${item.bookId || ''} ${item.quizId || ''} ${item.id || ''} ${item.title || ''}`.toLowerCase();
  if (idStr.includes('n1')) return 'N1';
  if (idStr.includes('n2')) return 'N2';
  if (idStr.includes('n3')) return 'N3';
  if (idStr.includes('n4')) return 'N4';
  if (idStr.includes('n5')) return 'N5';
  return 'N3';
};

const ProfileScreen = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('levels');
  const [customQuizzes, setCustomQuizzes] = useState([]);
  const [quizHistory, setQuizHistory] = useState([]);
  const [activityFilterLevel, setActivityFilterLevel] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [targetLevel, setTargetLevel] = useState(() => localStorage.getItem('user_target_level') || 'N3');
  const [avatarImgError, setAvatarImgError] = useState(false);

  // In-UI Toast Notification State
  const [toast, setToast] = useState(null);

  // In-UI Confirmation Modal State
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

  // Exam Mode ON/OFF Toggle State
  const [isExamMode, setIsExamMode] = useState(() => localStorage.getItem('user_exam_mode') !== 'false');

  // Exam Plan Modal State
  const [selectedBookForPlan, setSelectedBookForPlan] = useState(null);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const upcomingExams = useMemo(() => getUpcomingJlptExams(), []);
  const nearestExam = upcomingExams[0] || { name: 'July JLPT', formattedDate: 'Upcoming Sunday', daysLeft: 90 };

  const handleToggleExamMode = () => {
    const next = !isExamMode;
    setIsExamMode(next);
    localStorage.setItem('user_exam_mode', String(next));
    showToast(`Exam Mode turned ${next ? 'ON 🎯' : 'OFF 💤'}`);
  };

  const handleOpenPlan = (book) => {
    setSelectedBookForPlan(book);
    setIsPlanModalOpen(true);
  };


  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Custom Quiz Creator State
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [newQuizTag, setNewQuizTag] = useState('vocabulary');
  const [csvText, setCsvText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let historyData = [];

        if (currentUser) {
          try {
            const customQuizzesQuery = query(collection(db, 'users', currentUser.uid, 'customQuizzes'), orderBy('createdAt', 'desc'));
            const customQuizzesSnapshot = await getDocs(customQuizzesQuery);
            const customQuizzesData = customQuizzesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setCustomQuizzes(customQuizzesData);
          } catch (err) {
            console.warn("Could not fetch custom quizzes:", err);
          }

          try {
            const historyQuery = query(collection(db, 'users', currentUser.uid, 'quizHistory'));
            const historySnapshot = await getDocs(historyQuery);
            historyData = historySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          } catch (err) {
            console.warn("Could not fetch quiz history from Firestore:", err);
          }
        }

        // Merge local storage fallback if any
        try {
          const localHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
          if (Array.isArray(localHistory) && localHistory.length > 0) {
            const existingKeys = new Set(historyData.map(h => h.quizId || h.id));
            localHistory.forEach(item => {
              const k = item.quizId || item.id;
              if (k && !existingKeys.has(k)) {
                historyData.push(item);
              }
            });
          }
        } catch (e) {
          console.warn("Could not parse local quiz history:", e);
        }

        setQuizHistory(historyData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentUser]);

  const handleTargetLevelChange = (newLevel) => {
    setTargetLevel(newLevel);
    localStorage.setItem('user_target_level', newLevel);
  };

  // Filtered Quiz History based on Target Level
  const filteredQuizHistory = useMemo(() => {
    if (targetLevel === 'All') return quizHistory;
    return quizHistory.filter(item => {
      const lvl = inferItemLevel(item);
      if (targetLevel === 'N4' || targetLevel === 'N5') {
        return lvl === targetLevel || lvl === 'N4-N5';
      }
      return lvl === targetLevel;
    });
  }, [quizHistory, targetLevel]);

  // Calculate Daily Study Streak
  const streak = useMemo(() => {
    if (!quizHistory || quizHistory.length === 0) return 0;

    const activityDates = new Set();
    quizHistory.forEach(item => {
      const rawDate = item.timestamp || item.createdAt;
      if (rawDate) {
        const d = new Date(rawDate);
        if (!isNaN(d.getTime())) {
          const dateStr = d.toISOString().split('T')[0];
          activityDates.add(dateStr);
        }
      }
    });

    if (activityDates.size === 0) return 0;

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let checkDate = new Date();
    if (!activityDates.has(todayStr)) {
      if (!activityDates.has(yesterdayStr)) {
        return 0;
      }
      checkDate.setDate(checkDate.getDate() - 1);
    }

    let count = 0;
    while (true) {
      const checkStr = checkDate.toISOString().split('T')[0];
      if (activityDates.has(checkStr)) {
        count++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return count;
  }, [quizHistory]);

  // Aggregated Stats for Selected Target Level
  const stats = useMemo(() => {
    let totalQuestions = 0;
    let totalCorrect = 0;
    let chaptersDone = 0;

    filteredQuizHistory.forEach(item => {
      const score = Number(item.score) || 0;
      const total = Number(item.total) || 0;
      const ansCount = item.answered !== undefined ? Number(item.answered) : (item.answers ? Object.keys(item.answers).length : null);
      if (ansCount === 0 && score === 0) return;

      totalQuestions += total;
      totalCorrect += score;
      const answeredCount = item.answered !== undefined ? Number(item.answered) : (item.answers ? Object.keys(item.answers).length : total);
      const isMastered = total > 0 && score > 0 && (score / total >= 0.8) && item.status !== 'incomplete' && answeredCount >= total && answeredCount > 0;
      if (isMastered) {
        chaptersDone += 1;
      }
    });

    const accuracy = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(1) : 0;
    return { totalQuestions, totalCorrect, chaptersDone, accuracy };
  }, [filteredQuizHistory]);

  // JLPT Level Matrix Breakdown
  const levelStats = useMemo(() => {
    const levels = ['N1', 'N2', 'N3', 'N4', 'N5'];
    const result = {};

    levels.forEach(lvl => {
      result[lvl] = {
        total: 0,
        correct: 0,
        kanji: { total: 0, correct: 0 },
        vocab: { total: 0, correct: 0 },
        grammar: { total: 0, correct: 0 },
        reading: { total: 0, correct: 0 },
      };
    });

    quizHistory.forEach(item => {
      const lvl = (item.level || '').toUpperCase();
      const normalizedLvl = lvl === 'N4-N5' ? 'N4' : lvl;
      if (!result[normalizedLvl]) return;

      const score = Number(item.score) || 0;
      const total = Number(item.total) || 0;
      if (total <= 0) return;

      result[normalizedLvl].total += total;
      result[normalizedLvl].correct += score;

      const cat = (item.category || item.type || '').toLowerCase();
      if (cat.includes('kanji') || cat.includes('moji')) {
        result[normalizedLvl].kanji.total += total;
        result[normalizedLvl].kanji.correct += score;
      } else if (cat.includes('vocab') || cat.includes('goi') || cat.includes('tango')) {
        result[normalizedLvl].vocab.total += total;
        result[normalizedLvl].vocab.correct += score;
      } else if (cat.includes('grammar') || cat.includes('bunpou')) {
        result[normalizedLvl].grammar.total += total;
        result[normalizedLvl].grammar.correct += score;
      } else if (cat.includes('reading') || cat.includes('dokkai')) {
        result[normalizedLvl].reading.total += total;
        result[normalizedLvl].reading.correct += score;
      }
    });

    return result;
  }, [quizHistory]);

  // Book Progress Calculation (Filtered by Target Level)
  const bookCovers = {
    'shin-nihongo-500-n1': coverN1,
    'shin-nihongo-500-n2': coverN2,
    'shin-nihongo-500-n3': coverN3,
    'shin-nihongo-500-n4-n5': coverN4N5,
    'nihongo-power-drill-n1': powerDrillN1,
    'nihongo-power-drill-n2': powerDrillN2,
    'nihongo-power-drill-n3': powerDrillN3,
    'tango_n1': tangoN1Cover,
    'tango_n2': tangoN2Cover,
    'tango_n3': tangoN3Cover,
    'zenkamoku-n1-best-workbook': `${import.meta.env.BASE_URL.replace(/\/$/, '')}/images/zenkamoku_n1_cover.jpg`,
    'zenkamoku-n2-best-workbook': `${import.meta.env.BASE_URL.replace(/\/$/, '')}/images/zenkamoku_n2_cover.jpg`,
    'zenkamoku-n3-best-workbook': `${import.meta.env.BASE_URL.replace(/\/$/, '')}/images/zenkamoku_n3_cover.jpg`,
    'shinkanzen-master-n3-reading': `${import.meta.env.BASE_URL.replace(/\/$/, '')}/shinkanzen_n3_reading_cover.jpg`,
    'shinkanzen-master-n3-listening': `${import.meta.env.BASE_URL.replace(/\/$/, '')}/shinkanzen_n3_listening_cover.jpg`,
    'sou-matome-n3-reading': `${import.meta.env.BASE_URL.replace(/\/$/, '')}/sou_matome_n3_reading_cover.jpg`,
    'speed-master-n3-reading': `${import.meta.env.BASE_URL.replace(/\/$/, '')}/speed_master_n3_pages/speed_master_n3_page-0001.jpg`,
    'jlpt-n3-practice-sets': `${import.meta.env.BASE_URL.replace(/\/$/, '')}/n3_practice_sets_cover.jpg`,
    'chokuzen-taisaku-n4': `${import.meta.env.BASE_URL.replace(/\/$/, '')}/n4_chokuzen_taisaku_cover.jpg`,
  };

  const getBookCover = (book) => {
    if (!book) return null;
    if (bookCovers[book.id]) return bookCovers[book.id];
    if (book.coverUrl) {
      return book.coverUrl.startsWith('http') || book.coverUrl.startsWith('data:')
        ? book.coverUrl
        : `${import.meta.env.BASE_URL.replace(/\/$/, '')}${book.coverUrl.startsWith('/') ? '' : '/'}${book.coverUrl}`;
    }
    if (book.coverImage) {
      return book.coverImage.startsWith('http') || book.coverImage.startsWith('data:')
        ? book.coverImage
        : `${import.meta.env.BASE_URL.replace(/\/$/, '')}${book.coverImage.startsWith('/') ? '' : '/'}${book.coverImage}`;
    }
    return null;
  };

  const bookProgressMap = useMemo(() => {
    const historyKeyMap = new Map();
    quizHistory.forEach(item => {
      const qid = item.quizId || item.id;
      if (qid) historyKeyMap.set(qid, item);
    });

    const relevantBooks = STATIC_BOOKS.filter(book => {
      if (targetLevel === 'All') return true;
      if (targetLevel === 'N4' || targetLevel === 'N5') {
        return book.level === targetLevel || book.level === 'N4-N5';
      }
      return book.level === targetLevel;
    });

    return relevantBooks.map(book => {
      let completedCount = 0;
      let totalQuestions = 0;
      let totalScore = 0;

      historyKeyMap.forEach((val, key) => {
        if (key.startsWith(book.id)) {
          if (val.status === 'mastered' || val.status === 'completed' || (val.total > 0 && val.score / val.total >= 0.8)) {
            completedCount++;
          }
          totalQuestions += Number(val.total) || 0;
          totalScore += Number(val.score) || 0;
        }
      });

      const totalChapters = book.totalChapters || 1;
      const percent = Math.min(100, Math.round((completedCount / totalChapters) * 100));
      const accuracy = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

      let thumbClass = 'thumb-shin';
      if (book.id.includes('speed')) thumbClass = 'thumb-speed';
      else if (book.id.includes('shinkanzen')) thumbClass = 'thumb-shinkanzen';
      else if (book.id.includes('somatome') || book.id.includes('sou-matome')) thumbClass = 'thumb-somatome';
      else if (book.id.includes('power')) thumbClass = 'thumb-power';
      else if (book.id.includes('tango')) thumbClass = 'thumb-tango';

      return {
        ...book,
        completedCount,
        percent,
        accuracy,
        thumbClass
      };
    });
  }, [quizHistory, targetLevel]);

  const historyMap = useMemo(() => {
    const map = {};
    quizHistory.forEach(item => {
      const qid = item.quizId || item.id;
      if (qid) map[qid] = item;
    });
    return map;
  }, [quizHistory]);

  // Format clean activity title from item or ID
  const getActivityTitle = (item) => {
    if (item.title) return item.title;
    if (item.quizTitle) return item.quizTitle;
    const qid = item.quizId || item.id || '';
    if (qid.startsWith('jlpt-n3-practice-sets')) {
      const match = qid.match(/set-(\d+)/i);
      const setNum = match ? match[1] : '';
      return `JLPT N3 直前対策 第${setNum || '1'}回 (Chokuzen Taisaku Set ${setNum || '1'})`;
    }
    if (qid.startsWith('chokuzen-taisaku-n4')) {
      const match = qid.match(/set-(\d+)/i);
      const setNum = match ? match[1] : '';
      return `JLPT N4 直前対策 第${setNum || '1'}回 (Chokuzen Taisaku Set ${setNum || '1'})`;
    }
    const cat = item.category ? `${item.category.charAt(0).toUpperCase() + item.category.slice(1)} ` : '';
    if (item.quizId) {
      const formatted = item.quizId
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      return `${cat}${formatted}`;
    }
    if (item.id) {
      const formattedId = item.id
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      return `${cat}${formattedId}`;
    }
    return 'Practice Drill';
  };

  // Recent Activity Log (Strictly verified real database records across all levels)
  const recentActivity = useMemo(() => {
    return quizHistory
      .filter(item => {
        if (!item) return false;
        if (!item.timestamp && !item.createdAt) return false;
        if (item.total <= 0 && item.score === undefined) return false;
        const ansCount = item.answered !== undefined ? Number(item.answered) : (item.answers ? Object.keys(item.answers).length : null);
        const scr = Number(item.score) || 0;
        if (ansCount === 0 && scr === 0) return false;

        if (activityFilterLevel !== 'All') {
          const lvl = inferItemLevel(item);
          if (activityFilterLevel === 'N4' || activityFilterLevel === 'N5') {
            if (lvl !== activityFilterLevel && lvl !== 'N4-N5') return false;
          } else if (lvl !== activityFilterLevel) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        const dateA = parseRawDate(a.timestamp || a.createdAt) || new Date(0);
        const dateB = parseRawDate(b.timestamp || b.createdAt) || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
  }, [quizHistory, activityFilterLevel]);

  const handleCreateQuiz = async () => {
    if (!currentUser) { showToast("You must be logged in to create a quiz.", "error"); return; }
    if (!newQuizTitle.trim() || !csvText.trim()) { showToast("Please provide a title and paste your vocabulary list.", "error"); return; }

    const quizContent = parseCsvToQuizContent(csvText);
    if (quizContent.length === 0) { showToast("Could not parse any questions. Please check the CSV format.", "error"); return; }

    try {
      const newQuizData = {
        title: newQuizTitle,
        tag: newQuizTag,
        quiz_content: quizContent,
        createdAt: new Date().toISOString(),
        userId: currentUser.uid,
      };
      const userQuizzesColRef = collection(db, 'users', currentUser.uid, 'customQuizzes');
      const docRef = await addDoc(userQuizzesColRef, newQuizData);
      setCustomQuizzes(prev => [{ id: docRef.id, ...newQuizData }, ...prev]);
      setNewQuizTitle('');
      setNewQuizTag('General');
      setCsvText('');
      showToast("Custom quiz created successfully!", "success");
    } catch (error) {
      console.error("Error creating custom quiz:", error);
      showToast("Failed to create custom quiz.", "error");
    }
  };

  const handleDeleteQuiz = (quizIdToDelete) => {
    if (!currentUser) return;
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Custom Quiz?',
      message: 'Are you sure you want to permanently delete this quiz? This action cannot be undone.',
      onConfirm: async () => {
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
        try {
          setCustomQuizzes(prev => prev.filter(q => q.id !== quizIdToDelete));
          await deleteDoc(doc(db, 'users', currentUser.uid, 'customQuizzes', quizIdToDelete));
          showToast("Quiz deleted successfully.");
        } catch (error) {
          console.error("Error deleting quiz:", error);
          showToast("Failed to delete quiz.", "error");
        }
      }
    });
  };

  const handleClearAllHistory = () => {
    if (!currentUser) return;
    setConfirmDialog({
      isOpen: true,
      title: 'Clear All Study History?',
      message: 'This will reset all your answered questions, scores, and book progress across all JLPT levels.',
      onConfirm: async () => {
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
        try {
          setIsLoading(true);
          // 1. Delete all user quiz history from Firestore
          const historyColRef = collection(db, 'users', currentUser.uid, 'quizHistory');
          const snapshot = await getDocs(historyColRef);
          const deletePromises = snapshot.docs.map(d => deleteDoc(doc(db, 'users', currentUser.uid, 'quizHistory', d.id)));
          await Promise.all(deletePromises);

          // 2. Clear all chapter quiz caches from localStorage so individual pages reset completely
          const keysToRemove = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (
              key &&
              (key.startsWith('zenkamoku-progress-') ||
               key.startsWith('shin500_quiz_') ||
               key.startsWith('book_quiz_') ||
               key.startsWith('tango_mastery_') ||
               key.startsWith('jlpt_quiz_') ||
               key.startsWith('practice_') ||
               key === 'quizHistory')
            ) {
              keysToRemove.push(key);
            }
          }
          keysToRemove.forEach(k => localStorage.removeItem(k));

          setQuizHistory([]);
          showToast("All study history and chapter progress have been reset.");
        } catch (error) {
          console.error("Error clearing history:", error);
          showToast("Failed to clear history.", "error");
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
      showToast("Failed to log out.", "error");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const userInitial = (currentUser?.displayName || currentUser?.email || 'S').charAt(0).toUpperCase();

  // Levels to display in score map based on target
  const displayLevels = targetLevel === 'All' ? ['N1', 'N2', 'N3', 'N4', 'N5'] : [targetLevel];

  return (
    <div className="profile-page-wrapper">
      {/* 1. Hero User Profile Card */}
      <div className="profile-hero-card">
        <div className="profile-avatar overflow-hidden">
          {currentUser?.photoURL && !avatarImgError ? (
            <img
              src={currentUser.photoURL}
              alt={currentUser.displayName || currentUser.email || 'Profile'}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full"
              onError={() => setAvatarImgError(true)}
            />
          ) : (
            userInitial
          )}
        </div>
        <div className="profile-user-info">
          <h1>
            {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Learner'}
            <span className="profile-target-badge">
              🎯 Target: 
              <select
                value={targetLevel}
                onChange={(e) => handleTargetLevelChange(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: 'inherit', fontWeight: 800, cursor: 'pointer', outline: 'none' }}
              >
                <option value="N3" style={{ color: '#000' }}>JLPT N3</option>
                <option value="N2" style={{ color: '#000' }}>JLPT N2</option>
                <option value="N1" style={{ color: '#000' }}>JLPT N1</option>
                <option value="N4" style={{ color: '#000' }}>JLPT N4</option>
                <option value="N5" style={{ color: '#000' }}>JLPT N5</option>
                <option value="All" style={{ color: '#000' }}>All Levels</option>
              </select>
            </span>
            <button
              type="button"
              onClick={handleToggleExamMode}
              className={`profile-exam-toggle-btn ${isExamMode ? 'active' : ''}`}
              title={isExamMode ? 'Exam Mode is ON - Click to switch to casual mode' : 'Exam Mode is OFF - Click to enable Exam Mode'}
            >
              <span>{isExamMode ? '⚡ Exam Mode: ON' : '💤 Exam Mode: OFF'}</span>
              <span className="profile-exam-indicator"></span>
            </button>
          </h1>
          <p>
            Active Learner • {currentUser?.email}
          </p>
        </div>
        <div className="profile-hero-stats">
          <div className="profile-hero-stat-pill">
            <div className="profile-stat-val" style={{ color: '#f59e0b' }}>🔥 {streak}</div>
            <div className="profile-stat-lbl">Day Streak</div>
          </div>
          <div className="profile-hero-stat-pill">
            <div className="profile-stat-val">{stats.totalQuestions}</div>
            <div className="profile-stat-lbl">{targetLevel === 'All' ? 'Questions' : `${targetLevel} Questions`}</div>
          </div>
          <div className="profile-hero-stat-pill">
            <div className="profile-stat-val">{stats.accuracy}%</div>
            <div className="profile-stat-lbl">{targetLevel === 'All' ? 'Accuracy' : `${targetLevel} Accuracy`}</div>
          </div>
          <div className="profile-hero-stat-pill">
            <div className="profile-stat-val">{stats.chaptersDone}</div>
            <div className="profile-stat-lbl">Mastered</div>
          </div>
        </div>
      </div>


      {/* 2. Tab Navigation */}
      <div className="profile-tab-nav">
        <button
          className={`profile-tab-btn ${activeTab === 'levels' ? 'active' : ''}`}
          onClick={() => setActiveTab('levels')}
        >
          🗺️ {targetLevel === 'All' ? 'N1–N5 Level Score Map' : `${targetLevel} Score Map`}
        </button>
        <button
          className={`profile-tab-btn ${activeTab === 'books' ? 'active' : ''}`}
          onClick={() => setActiveTab('books')}
        >
          📚 {targetLevel === 'All' ? 'Book Collections' : `${targetLevel} Books (${bookProgressMap.length})`}
        </button>
        <button
          className={`profile-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          🕒 Recent Activity ({recentActivity.length})
        </button>
        <button
          className={`profile-tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
          onClick={() => setActiveTab('custom')}
        >
          ✨ Custom Quizzes ({customQuizzes.length})
        </button>
      </div>

      {/* TAB 1: Level Score Map (Filtered by Target) */}
      {activeTab === 'levels' && (
        <div>
          {/* Big Live Japan Countdown Clock Block (Only when Exam Mode is ON) */}
          {isExamMode && (
            <LiveJapanCountdownClock
              targetExam={nearestExam}
              onOpenPlan={() => {
                const defaultBook = bookProgressMap[0] || STATIC_BOOKS[0];
                handleOpenPlan(defaultBook);
              }}
            />
          )}

          <div className="profile-section-title">
            <span>{targetLevel === 'All' ? 'JLPT Level Mastery Matrix' : `${targetLevel} Mastery Breakdown`}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary, #94a3b8)' }}>
              Real-time calculation from completed drills & quizzes
            </span>
          </div>

          <div className="profile-level-matrix-grid">
            {displayLevels.map(lvl => {
              const data = levelStats[lvl] || { total: 0, correct: 0, kanji: { total: 0, correct: 0 }, vocab: { total: 0, correct: 0 }, grammar: { total: 0, correct: 0 }, reading: { total: 0, correct: 0 } };
              const overallPercent = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
              const kanjiPercent = data.kanji.total > 0 ? Math.round((data.kanji.correct / data.kanji.total) * 100) : 0;
              const vocabPercent = data.vocab.total > 0 ? Math.round((data.vocab.correct / data.vocab.total) * 100) : 0;
              const grammarPercent = data.grammar.total > 0 ? Math.round((data.grammar.correct / data.grammar.total) * 100) : 0;
              const readingPercent = data.reading.total > 0 ? Math.round((data.reading.correct / data.reading.total) * 100) : 0;
              const color = LEVEL_COLORS[lvl] || '#10b981';

              return (
                <div key={lvl} className="profile-level-card">
                  <div className="profile-level-card-header">
                    <span className="profile-level-pill" style={{ background: color }}>{lvl}</span>
                    <span className="profile-level-score" style={{ color }}>{overallPercent}%</span>
                  </div>
                  <div className="profile-progress-bar">
                    <div className="profile-progress-fill" style={{ width: `${overallPercent}%`, background: color }}></div>
                  </div>
                  <div className="profile-skill-rows">
                    <div className="profile-skill-row">
                      <span>🈁 文字・Kanji</span>
                      <span className="profile-skill-val">{data.kanji.total > 0 ? `${kanjiPercent}% (${data.kanji.correct}/${data.kanji.total})` : '—'}</span>
                    </div>
                    <div className="profile-skill-row">
                      <span>📖 語彙・Vocab</span>
                      <span className="profile-skill-val">{data.vocab.total > 0 ? `${vocabPercent}% (${data.vocab.correct}/${data.vocab.total})` : '—'}</span>
                    </div>
                    <div className="profile-skill-row">
                      <span>📐 文法・Grammar</span>
                      <span className="profile-skill-val">{data.grammar.total > 0 ? `${grammarPercent}% (${data.grammar.correct}/${data.grammar.total})` : '—'}</span>
                    </div>
                    <div className="profile-skill-row">
                      <span>📑 読解・Reading</span>
                      <span className="profile-skill-val">{data.reading.total > 0 ? `${readingPercent}% (${data.reading.correct}/${data.reading.total})` : '—'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Book Collections Progress (Filtered by Target) */}
      {activeTab === 'books' && (
        <div>
          <div className="profile-section-title">
            <span>{targetLevel === 'All' ? 'All Book Collections Progress' : `${targetLevel} Book Collections`}</span>
            <Link to="/books" className="profile-btn profile-btn-secondary" style={{ fontSize: '0.8rem' }}>
              📚 View All Books Catalog &rarr;
            </Link>
          </div>

          {bookProgressMap.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', background: 'var(--color-bg-card)', borderRadius: '12px' }}>
              <p>No {targetLevel} books found.</p>
            </div>
          ) : (
            <div className="profile-books-grid">
              {bookProgressMap.map(book => (
                <div key={book.id} className="profile-book-card">
                  <div>
                    <div className="profile-book-top">
                      <div className={`profile-book-thumb`} style={{ padding: 0, overflow: 'hidden', background: '#0f172a' }}>
                        {getBookCover(book) ? (
                          <img src={getBookCover(book)} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', objectPosition: 'top' }} />
                        ) : (
                          <div className={book.thumbClass} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            {book.level}<br />{book.category.slice(0, 3)}
                          </div>
                        )}
                      </div>
                      <div className="profile-book-meta">
                        <span className="profile-book-category-tag">{book.level} • {book.category}</span>
                        <h3>{book.title}</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary, #94a3b8)' }}>
                          {book.description}
                        </p>
                      </div>
                    </div>

                    <div className="profile-progress-bar">
                      <div
                        className="profile-progress-fill"
                        style={{ width: `${book.percent}%`, background: LEVEL_COLORS[book.level] || '#10b981' }}
                      ></div>
                    </div>
                  </div>

                  <div className="profile-book-bottom">
                    <div className="profile-book-progress-text">
                      <strong>{book.completedCount} / {book.totalChapters}</strong> Sets/Chapters ({book.percent}%)
                    </div>
                    <Link
                      to={book.customRoute || `/books/${book.id}`}
                      state={{ from: 'profile' }}
                      className="profile-btn profile-btn-primary"
                      style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                    >
                      {book.completedCount > 0 ? 'Continue' : 'Start'} &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}



      {/* TAB 3: Recent Activity Log (Filtered by Level) */}
      {activeTab === 'history' && (
        <div>
          <div className="profile-section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span>🕒 Chronological Study Activity ({recentActivity.length})</span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '6px', background: 'var(--color-bg-primary, #0f172a)', padding: '4px', borderRadius: '8px', border: '1px solid var(--color-border, #334155)' }}>
                {['All', 'N1', 'N2', 'N3', 'N4', 'N5'].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setActivityFilterLevel(lvl)}
                    className={`profile-filter-pill ${activityFilterLevel === lvl ? 'active' : ''}`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              {quizHistory.length > 0 && (
                <button
                  onClick={handleClearAllHistory}
                  className="profile-btn profile-btn-danger"
                  style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                >
                  🗑️ Clear All History
                </button>
              )}
            </div>
          </div>

          {recentActivity.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', background: 'var(--color-bg-card)', borderRadius: '12px', border: '1px solid var(--color-border, #334155)' }}>
              <p style={{ color: 'var(--color-text-secondary, #94a3b8)', margin: 0 }}>
                No {activityFilterLevel !== 'All' ? `${activityFilterLevel} ` : ''}study sessions recorded yet. Start practicing from Books or Practice sets!
              </p>
            </div>
          ) : (
            <div className="profile-table-container">
              <table className="profile-diagnostic-table">
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Book / Source</th>
                    <th>Activity</th>
                    <th>Level</th>
                    <th>Score</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map(item => {
                    const score = Number(item.score) || 0;
                    const total = Number(item.total) || 0;
                    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
                    const itemLvl = inferItemLevel(item);
                    
                    const answeredCount = item.answered !== undefined ? Number(item.answered) : (item.answers ? Object.keys(item.answers).length : total);
                    const isAllAttempted = total > 0 && answeredCount >= total && answeredCount > 0;

                    const isMastered = isAllAttempted && score > 0 && pct >= 80 && item.status !== 'incomplete';
                    const isCompleted = isAllAttempted && item.status !== 'incomplete';

                    let statusLabel = '⏳ Incomplete';
                    let statusClass = 'badge-incomplete';

                    if (isMastered) {
                      statusLabel = '🏆 Mastered';
                      statusClass = 'badge-mastered';
                    } else if (isCompleted) {
                      statusLabel = '📝 Completed';
                      statusClass = 'badge-completed';
                    } else if (item.status === 'incomplete' || answeredCount < total || score === 0) {
                      statusLabel = '⏳ Incomplete';
                      statusClass = 'badge-incomplete';
                    } else {
                      statusLabel = '💡 Review Needed';
                      statusClass = 'badge-review';
                    }

                    return (
                      <tr key={item.id || item.timestamp || Math.random()}>
                        <td className="!text-gray-800 dark:!text-gray-300 font-medium">{formatDateTime(item.timestamp || item.createdAt)}</td>
                        <td className="text-gray-600 dark:text-gray-400 text-sm">
                          {item.bookId ? item.bookId.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()) : (item.type === 'practice' ? 'Practice Test' : 'Custom Deck')}
                        </td>
                        <td>
                          {item.bookId && item.chapterId ? (
                            <Link 
                              to={`/books/${item.bookId}/chapters/${item.chapterId}`}
                              className="text-emerald-600 dark:text-purple-400 hover:underline font-bold inline-flex items-center gap-1.5 transition-colors"
                              title="Open and review this chapter"
                            >
                              <span>{getActivityTitle(item)}</span>
                              <span className="text-xs opacity-70">↗</span>
                            </Link>
                          ) : item.type === 'practice' ? (
                            <Link
                              to={`/practice-sets/${item.setId || 1}`}
                              className="text-emerald-600 dark:text-purple-400 hover:underline font-bold inline-flex items-center gap-1.5 transition-colors"
                            >
                              <span>{getActivityTitle(item)}</span>
                              <span className="text-xs opacity-70">↗</span>
                            </Link>
                          ) : (
                            <strong>{getActivityTitle(item)}</strong>
                          )}
                        </td>
                        <td>
                          <span className="profile-level-pill" style={{ background: LEVEL_COLORS[itemLvl] || '#64748b', fontSize: '0.75rem', padding: '2px 8px' }}>
                            {itemLvl}
                          </span>
                        </td>
                        <td><strong>{score} / {total}</strong> ({pct}%)</td>
                        <td>
                          <span className={`profile-badge-status ${statusClass}`}>
                            {statusLabel}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Custom Quizzes */}
      {activeTab === 'custom' && (
        <div>
          <div className="profile-section-title">
            <span>Create & Manage Custom Quizzes</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            {/* Create Quiz Form */}
            <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '14px', padding: '20px' }}>
              <h3 style={{ marginBottom: '12px', fontSize: '1.1rem', fontWeight: 700 }}>Add New Quiz</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  value={newQuizTitle}
                  onChange={(e) => setNewQuizTitle(e.target.value)}
                  placeholder="Quiz Title (e.g. Minna no Nihongo L1)"
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-primary)', color: 'inherit' }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    className={`profile-btn ${newQuizTag === 'vocabulary' ? 'profile-btn-primary' : 'profile-btn-secondary'}`}
                    onClick={() => setNewQuizTag('vocabulary')}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    Vocab
                  </button>
                  <button
                    type="button"
                    className={`profile-btn ${newQuizTag === 'kanji' ? 'profile-btn-primary' : 'profile-btn-secondary'}`}
                    onClick={() => setNewQuizTag('kanji')}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    Kanji
                  </button>
                </div>
                <textarea
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  placeholder="Paste CSV format:&#10;Hiragana,Meaning,Kanji&#10;taberu,to eat,食べる"
                  rows="6"
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-primary)', color: 'inherit', fontFamily: 'monospace' }}
                />
                <button onClick={handleCreateQuiz} className="profile-btn profile-btn-primary" style={{ justifyContent: 'center' }}>
                  Create and Save Quiz
                </button>
              </div>
            </div>

            {/* Custom Quizzes List */}
            <div>
              <h3 style={{ marginBottom: '12px', fontSize: '1.1rem', fontWeight: 700 }}>My Saved Quizzes</h3>
              {customQuizzes.length === 0 ? (
                <p style={{ color: 'var(--color-text-secondary)' }}>No custom quizzes created yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {customQuizzes.map(quiz => (
                    <div key={quiz.id} style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ fontWeight: 700, fontSize: '1rem' }}>{quiz.title}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                          {quiz.quiz_content?.length || 0} questions • {quiz.tag}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Link
                          to={`/custom-quiz/${quiz.id}`}
                          state={{ quizId: quiz.id, quizTitle: quiz.title, type: 'custom', totalQuestions: quiz.quiz_content?.length || 0 }}
                          className="profile-btn profile-btn-primary"
                          style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                        >
                          Start
                        </Link>
                        <button
                          onClick={() => handleDeleteQuiz(quiz.id)}
                          className="profile-btn profile-btn-danger"
                          style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Logout Action */}
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <button onClick={handleLogout} className="profile-btn profile-btn-danger">
          Logout
        </button>
      </div>

      {/* In-UI Confirmation Modal */}
      {confirmDialog.isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--color-bg-card, #1e293b)',
            border: '1px solid var(--color-border, #334155)',
            borderRadius: '16px',
            maxWidth: '440px',
            width: '100%',
            padding: '24px',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px', color: 'var(--color-text-primary)' }}>
              {confirmDialog.title}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
              {confirmDialog.message}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null })}
                className="profile-btn profile-btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className="profile-btn profile-btn-danger"
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* In-UI Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 10000,
          background: toast.type === 'error' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(16, 185, 129, 0.95)',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '12px',
          fontWeight: 700,
          fontSize: '0.9rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backdropFilter: 'blur(8px)',
          animation: 'slideUp 0.3s ease-out'
        }}>
          <span>{toast.type === 'error' ? '⚠️' : '✓'}</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Interactive Exam Plan Modal */}
      {selectedBookForPlan && (
        <ExamPlanModal
          isOpen={isPlanModalOpen}
          onClose={() => {
            setIsPlanModalOpen(false);
            setSelectedBookForPlan(null);
          }}
          book={selectedBookForPlan}
          completedCount={selectedBookForPlan.completedCount || 0}
          history={historyMap}
        />
      )}
    </div>
  );
};

export default ProfileScreen;