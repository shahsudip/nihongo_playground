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
      setLoading(true);
      try {
        let allExercises = [];

        // Fetches original JLPT data
        const originalPath = `jlpt/${level}/${category}-test`;
        const originalQuery = query(collection(db, originalPath));
        const originalSnapshot = await getDocs(originalQuery);
        const originalExercises = originalSnapshot.docs.map(doc => ({
          id: doc.id,
          source: 'japanesetest4you',
          ...doc.data()
        }));
        allExercises.push(...originalExercises);

        // Fetches new MLC data
        if (category === 'kanji' || category === 'grammar' || category === 'vocabulary') {
          const mlcPath = `jlpt-mlc/${level}/quizzes`;
          let filterPrefix = category;
          if (category === 'vocabulary') {
            filterPrefix = 'katakana';
          }
          const mlcQuery = query(collection(db, mlcPath));
          const mlcSnapshot = await getDocs(mlcQuery);
          const mlcExercises = mlcSnapshot.docs
            .filter(doc => doc.id.startsWith(filterPrefix))
            .map(doc => ({
              id: doc.id,
              source: 'mlc', 
              ...doc.data(),
              title: `${doc.data().title} (MLC)`
            }));
          allExercises.push(...mlcExercises);
        }

        // Sorts the combined list
        allExercises.sort((a, b) => {
            const numA = parseInt(a.id.split('-').pop(), 10);
            const numB = parseInt(b.id.split('-').pop(), 10);
            return numA - numB;
        });

        setExercises(allExercises);

        // --- THIS IS THE FIX ---
        // The history fetching logic has been restored to your original, working version.
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
          const key = data.quizId; // Using the quizId field from inside the document
          if (key) {
            fetchedHistory[key] = data;
          } else {
            // Fallback for any older records that might not have the field
            fetchedHistory[doc.id] = data; 
          }
        });
        setHistory(fetchedHistory);
        // --- END OF FIX ---

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
 let title;
          if (exercise.source === 'mlc') {
            const exerciseNumber = exercise.id.split('-').pop();
            title = `Quiz ${exerciseNumber}`;
          } else {
            title = exercise.id.replace(/-/g, ' ');
          }          
          const isReadingTest = category === 'reading' && exercise.passages;
          let hasContent;

          if (isReadingTest) {
            hasContent = exercise.passages.some(p => p.questions && p.questions.length > 0);
          } else {
            hasContent = exercise.questions && exercise.questions.length > 0;
          }
          
          const isMastered = exerciseHistory?.status === 'mastered';
          
          let linkTo, navigationState;

          if (isReadingTest) {
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
            linkTo = `/quiz/${exercise.id}`;
            navigationState = {
              quizId: exercise.id,
              quizTitle: title,
              level,
              category,
              type: 'jlpt',
              source: exercise.source,
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

