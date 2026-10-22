import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext.jsx';
import {
  getQuestionGroupProgress,
  selectPreferredAttempt,
  summarizeProgress,
} from '../utils/bookProgress.js';

const BOOK_ID = 'jlpt-n3-practice-sets';

const STATUS_LABELS = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  completed: 'Completed',
  mastered: 'Mastered',
};

const loadLocalHistory = () => {
  try {
    const storedHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    const records = Array.isArray(storedHistory) ? storedHistory : Object.values(storedHistory || {});

    return records.reduce((historyMap, record) => {
      const quizId = record?.quizId || record?.id;
      if (quizId?.startsWith(BOOK_ID)) {
        historyMap[quizId] = selectPreferredAttempt(historyMap[quizId], record);
      }
      return historyMap;
    }, {});
  } catch (error) {
    console.warn('Could not read local N3 practice history:', error.message);
    return {};
  }
};

const getSetProgress = (set, userHistory) => {
  const fullKey = `${BOOK_ID}-${set.id}`;
  const vocabularyKey = `${BOOK_ID}-${set.id}-vocabulary-kanji`;
  const grammarKey = `${BOOK_ID}-${set.id}-grammar`;
  const grammarReadingKey = `${BOOK_ID}-${set.id}-grammar-reading`;
  const fullRecord = userHistory[fullKey];
  const vocabularyRecord = userHistory[vocabularyKey];
  const grammarRecords = [userHistory[grammarKey], userHistory[grammarReadingKey]];
  const vocabularyQuestions = set.sections?.['vocabulary-kanji']?.questions || [];
  const grammarQuestions = set.sections?.['grammar-reading']?.questions || [];
  const vocabulary = getQuestionGroupProgress(vocabularyQuestions, {
    scopedRecords: [vocabularyRecord],
    fullRecords: [fullRecord],
  });
  const grammar = getQuestionGroupProgress(grammarQuestions, {
    scopedRecords: grammarRecords,
    fullRecords: [fullRecord],
  });
  const sections = [vocabulary, grammar].filter(section => section.total > 0);
  const summary = summarizeProgress(sections);

  return {
    ...summary,
    vocabulary,
    grammar,
    isAttempted: summary.answered > 0,
  };
};

const SectionProgressRow = ({ label, tone, progress }) => (
  <div className={`set-card-section-progress ${tone} status-${progress.status}`}>
    <div className="set-card-section-heading">
      <div className="set-card-section-name">
        <span className={`section-dot ${tone}`}></span>
        <span>{label}</span>
      </div>
      <span className="set-card-section-status">{STATUS_LABELS[progress.status]}</span>
    </div>
    <div className="set-card-section-metrics">
      <span>{progress.answered}/{progress.total} attempted</span>
      {progress.answered > 0 && <span>{progress.accuracyPercent}% accuracy</span>}
    </div>
    <div className="set-card-section-track" aria-hidden="true">
      <div
        className="set-card-section-fill"
        style={{ width: `${progress.completionPercent}%` }}
      ></div>
    </div>
  </div>
);

const N3PracticeSetsListPage = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const isFromProfile = location.state?.from === 'profile';
  const [practiceSetsBook, setPracticeSetsBook] = useState(null);
  const [userHistory, setUserHistory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookAndHistory = async () => {
      const localHistory = loadLocalHistory();
      setUserHistory(localHistory);

      try {
        const bookRef = doc(db, 'books', BOOK_ID);
        const setsRef = collection(db, 'books', BOOK_ID, 'sets');
        const [bookSnap, setsSnap] = await Promise.all([
          getDoc(bookRef),
          getDocs(setsRef),
        ]);

        if (!bookSnap.exists()) {
          throw new Error('Book metadata not found in Firebase.');
        }

        const sets = setsSnap.docs
          .map(setDoc => ({ ...setDoc.data(), id: setDoc.id }))
          .sort((left, right) => {
            const leftNumber = Number(left.id.replace(/\D/g, ''));
            const rightNumber = Number(right.id.replace(/\D/g, ''));
            return leftNumber - rightNumber;
          });

        setPracticeSetsBook({
          ...bookSnap.data(),
          id: bookSnap.id,
          sets,
        });

        if (currentUser) {
          try {
            const historyColRef = collection(db, 'users', currentUser.uid, 'quizHistory');
            const historySnap = await getDocs(historyColRef);
            const historyMap = { ...localHistory };
            historySnap.forEach(historyDoc => {
              const data = historyDoc.data();
              const quizId = data.quizId || historyDoc.id;
              if (quizId.startsWith(BOOK_ID)) {
                historyMap[quizId] = selectPreferredAttempt(historyMap[quizId], data);
              }
            });
            setUserHistory(historyMap);
          } catch (historyError) {
            console.warn('Could not fetch user history:', historyError.message);
          }
        }
      } catch (error) {
        console.error('Error fetching book or history:', error);
        setPracticeSetsBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBookAndHistory();
  }, [currentUser]);

  const totalSets = practiceSetsBook?.sets?.length || 15;
  const setsWithProgress = useMemo(() => {
    return (practiceSetsBook?.sets || []).map(set => ({
      set,
      progress: getSetProgress(set, userHistory),
    }));
  }, [practiceSetsBook, userHistory]);

  const overallProgress = useMemo(() => {
    return setsWithProgress.reduce((summary, { progress }) => {
      summary.totalQuestions += progress.total;
      summary.answeredQuestions += progress.answered;
      summary.totalSections += Number(progress.vocabulary.total > 0) + Number(progress.grammar.total > 0);
      summary.completedSections += Number(progress.vocabulary.isCompleted) + Number(progress.grammar.isCompleted);
      summary.masteredSections += Number(progress.vocabulary.isMastered) + Number(progress.grammar.isMastered);
      summary.startedSets += Number(progress.isAttempted);
      summary.completedSets += Number(progress.isCompleted);
      summary.masteredSets += Number(progress.isMastered);
      return summary;
    }, {
      totalQuestions: 0,
      answeredQuestions: 0,
      totalSections: 0,
      completedSections: 0,
      masteredSections: 0,
      startedSets: 0,
      completedSets: 0,
      masteredSets: 0,
    });
  }, [setsWithProgress]);

  const progressPercent = overallProgress.totalQuestions > 0
    ? Math.round((overallProgress.answeredQuestions / overallProgress.totalQuestions) * 100)
    : 0;

  if (loading) {
    return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Loading N3 Chokuzen Taisaku Sets from Firebase...</div>;
  }

  if (!practiceSetsBook) {
    return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Book not found in Firebase.</div>;
  }

  return (
    <div className="practice-sets-container">
      <div className="practice-sets-header">
        {!isFromProfile && (
          <nav aria-label="Breadcrumb" className="ps-breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-sm">
              <li className="flex items-center">
                <Link to="/" className="breadcrumb-link">Home</Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2 breadcrumb-separator">/</span>
                <Link to="/books" className="breadcrumb-link">Books</Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2 breadcrumb-separator">/</span>
                <span className="breadcrumb-current">{practiceSetsBook.title || 'JLPT N3 Chokuzen Taisaku (15 Sets)'}</span>
              </li>
            </ol>
          </nav>
        )}

        <div className="practice-sets-progress-overview">
          <div className="progress-overview-main">
            <div className="progress-overview-heading">
              <span>Overall question progress</span>
              <strong>{progressPercent}%</strong>
            </div>
            <div className="progress-overview-bar">
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
            <div className="progress-overview-text">
              <strong>{overallProgress.answeredQuestions}/{overallProgress.totalQuestions}</strong> vocabulary and grammar questions attempted
            </div>
          </div>
          <div className="progress-overview-stats">
            <div className="progress-overview-stat">
              <strong>{overallProgress.startedSets}/{totalSets}</strong>
              <span>Sets started</span>
            </div>
            <div className="progress-overview-stat">
              <strong>{overallProgress.completedSections}/{overallProgress.totalSections}</strong>
              <span>Sections completed</span>
            </div>
            <div className="progress-overview-stat mastered">
              <strong>{overallProgress.masteredSections}/{overallProgress.totalSections}</strong>
              <span>Sections mastered</span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="practice-sets-section-title">{totalSets} Chokuzen Taisaku Mock Exam Sets (N3)</h2>

      <div className="practice-sets-grid">
        {setsWithProgress.map(({ set, progress }) => (
          <Link
            to={`/practice-sets/${set.id}`}
            key={set.id}
            className={`practice-set-card ${progress.isMastered ? 'is-mastered' : progress.isCompleted ? 'is-completed' : progress.isAttempted ? 'is-progress' : ''}`}
          >
            <div className="set-card-top">
              <span className={`set-card-status-badge status-${progress.status}`}>
                {STATUS_LABELS[progress.status]}
              </span>
              <div className="set-card-top-badges">
                <span className="set-card-attempt-badge">{progress.completionPercent}% complete</span>
              </div>
            </div>

            <div className="set-card-body">
              <h3 className="set-card-title">{set.title}</h3>
              <p className="set-card-subtitle">{set.description}</p>

              <div className="set-card-sections">
                {progress.vocabulary.total > 0 && (
                  <SectionProgressRow
                    label="Vocabulary & Kanji"
                    tone="vocabulary"
                    progress={progress.vocabulary}
                  />
                )}
                {progress.grammar.total > 0 && (
                  <SectionProgressRow
                    label="Grammar & Reading"
                    tone="grammar"
                    progress={progress.grammar}
                  />
                )}
              </div>

              <div className="set-card-action">
                <span className={`set-card-start-btn ${progress.isCompleted ? 'completed' : ''}`}>
                  {progress.isCompleted ? 'Review Set' : progress.isAttempted ? 'Continue Practice' : 'Start Set'} &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default N3PracticeSetsListPage;
