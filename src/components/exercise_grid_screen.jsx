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
        console.log(`Fetching exercises from: ${exerciseCollectionPath}`);
        const exerciseSnapshot = await getDocs(collection(db, exerciseCollectionPath));
        const fetchedExercises = exerciseSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
        setExercises(fetchedExercises);

        const historyQuery = query(
          collection(db, `users/${currentUser.uid}/quizHistory`),
          where('level', '==', level),
          where('category', '==', category),
          where('type', '==', 'jlpt')
        );
        const historySnapshot = await getDocs(historyQuery);
        const fetchedHistory = {};
        historySnapshot.forEach(doc => {
          const data = doc.data();
          const key = data.quizId;
          if (key) {
            fetchedHistory[key] = data;
          } else {
            console.warn('Missing quizId in document:', doc.id);
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
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      <div className="exercise-list-header">
        <h1 className="exercise-list-title">{level.toUpperCase()} - {category} Exercises</h1>
      </div>

      <div className="exercise-grid">
        {exercises.map(exercise => {
          const exerciseHistory = history[exercise.id];
          const title = exercise.id.replace(/-/g, ' ');
          
          const isReadingTest = category === 'reading' && exercise.passages;
          let hasContent;

          if (isReadingTest) {
            hasContent = exercise.passages.some(p => p.questions && p.questions.length > 0);
          } else {
            hasContent = exercise.questions && exercise.questions.length > 0;
          }
          
          const isMastered = exerciseHistory?.status === 'mastered';
          
          // --- THIS IS THE ONLY CHANGE ---
          // It determines the link and data to pass based on whether it's a reading test.
          let linkTo, navigationState;

          if (isReadingTest) {
            // For reading tests, navigate to the new reading quiz route 
            // and pass the full exercise data.
            linkTo = `/reading-quiz/${exercise.id}`;
            navigationState = {
              quizId: exercise.id,
              quizTitle: title,
              level,
              category,
              type: 'jlpt',
              quizData: exercise 
            };
          } else {
            // For all other tests, use the original navigation logic.
            linkTo = `/quiz/${exercise.id}`;
            navigationState = {
              quizId: exercise.id,
              quizTitle: title,
              level,
              category,
              type: 'jlpt',
              totalQuestions: exercise.questions?.length || 0
            };
          }

          return (
            <Link
              to={linkTo}
              state={navigationState}
              key={exercise.id}
              className={`difficulty-button ${isMastered ? 'mastered' : ''} ${!hasContent ? 'locked' : ''}`}
              onClick={(e) => { if (isMastered || !hasContent) e.preventDefault(); }}
            >
              {exerciseHistory ? (
                isMastered ? (
                  <>
                    <span className="difficulty-status-badge status-badge status-mastered">Mastered ✨</span>
                    <div className="difficulty-main">
                      <span className="difficulty-main-text">{title}</span>
                      <span className="difficulty-score">{`${exerciseHistory.score}/${exerciseHistory.total}`}</span>
                    </div>
                    <div className="difficulty-timestamp">{formatDateTime(exerciseHistory.timestamp)}</div>
                  </>
                ) : (
                  <>
                    <span className={`difficulty-status-badge status-badge status-${exerciseHistory.status}`}>{exerciseHistory.status}</span>
                    <div className="difficulty-main">
                      <span className="difficulty-main-text">{title}</span>
                      <span className="difficulty-score">{`${exerciseHistory.score}/${exerciseHistory.total}`}</span>
                    </div>
                    <div className="difficulty-timestamp">{formatDateTime(exerciseHistory.timestamp)}</div>
                  </>
                )
              ) : (
                <div className="difficulty-main">
                  <span className="difficulty-main-text">{title}</span>
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

