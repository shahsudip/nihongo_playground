// src/pages/ExerciseListPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import { formatDateTime } from '../utils/formatters.jsx';

const ExerciseListPage = () => {
  const { level, category } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [history, setHistory] = useState({});

  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      try {
        const exerciseCollectionPath = `jlpt/${level}/${category}-test`;
        const exerciseSnapshot = await getDocs(collection(db, exerciseCollectionPath));
        const fetchedExercises = exerciseSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
        setExercises(fetchedExercises);

        const historyQuery = query(
          collection(db, `users/${currentUser.uid}/quizHistory`),
          where('level', '==', level),
          where('category', '==', category)
        );
        const historySnapshot = await getDocs(historyQuery);
        const fetchedHistory = {};
        historySnapshot.forEach(doc => {
          const quizId = doc.data().quizId || '';
          const match = quizId.match(/exercise-(\d+)/);
          if (match) {
            const exerciseId = `exercise-${match[1]}`;
            fetchedHistory[exerciseId] = doc.data();
          }
        });
        setHistory(fetchedHistory);

      } catch (error) {
        console.error("Error fetching exercise data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [level, category, currentUser]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="exercise-list-container">
      <div className="exercise-list-header">
        <button onClick={() => navigate(-1)} className="back-button">← Back</button>
        <h1 className="exercise-list-title">{level.toUpperCase()} - {category} Exercises</h1>
      </div>
      <div className="exercise-grid">
        {exercises.map(exercise => {
          const exerciseHistory = history[exercise.id];
          const isMastered = exerciseHistory?.status === 'mastered';
          const hasContent = exercise.questions && exercise.questions.length > 0;
          const quizLink = `/quiz/jlpt/${level}/${category}/${exercise.id}`;
          const title = exercise.title || exercise.id.replace('-', ' ');

          return (
            <Link
              to={quizLink}
              key={exercise.id}
              className={`difficulty-button ${isMastered ? 'mastered' : ''} ${!hasContent ? 'locked' : ''}`}
              onClick={(e) => { if (isMastered || !hasContent) e.preventDefault(); }}
            >
              {exerciseHistory ? (
                <>
                  <span className={`difficulty-status-badge status-badge status-${exerciseHistory.status}`}>{exerciseHistory.status}</span>
                  <div className="difficulty-main">
                    <span className="difficulty-main-text">{title}</span>
                    <span className="difficulty-score">{`${exerciseHistory.score}/${exerciseHistory.total}`}</span>
                  </div>
                  <div className="difficulty-timestamp">
                    {formatDateTime(exerciseHistory.timestamp)}
                  </div>
                </>
              ) : (
                <div className="difficulty-main">
                  <span className="difficulty-main-text">{hasContent ? `${title}` : title}</span>
                  {!hasContent && <span className="lock-icon">🔒</span>}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ExerciseListPage;