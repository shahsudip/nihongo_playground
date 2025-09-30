import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, query } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';

const GrammarListPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [grammarPoints, setGrammarPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    const fetchGrammarList = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const collectionPath = `jlpt/${level}/grammar_list`;
        const collectionRef = collection(db, collectionPath);
        const q = query(collectionRef);
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError(`No grammar points found for ${level.toUpperCase()}. Please check if the data has been scraped correctly.`);
        }

        const points = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => a.title.localeCompare(b.title));
        
        setGrammarPoints(points);

      } catch (err) {
        console.error("Firestore error while fetching grammar list:", err);
        setError("An error occurred while fetching the grammar list. Check the console for details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGrammarList();
  }, [level, currentUser]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="exercise-list-container">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      <div className="exercise-list-header">
        <h1 className="exercise-list-title">{level.toUpperCase()} - Grammar Points</h1>
      </div>

      {error && <p className="empty-state-text" style={{color: 'var(--feedback-incorrect)'}}>{error}</p>}

      <div className="exercise-grid">
        {grammarPoints.map(point => (
          <Link
            key={point.id}
            to={`/study/grammar/${level}/${point.id}`}
            className="difficulty-button"
          >
            <div className="difficulty-main">
              <span className="difficulty-main-text" style={{ fontSize: '1.2rem', textAlign: 'center' }}>{point.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GrammarListPage;

