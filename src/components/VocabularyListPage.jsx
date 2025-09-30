import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { collection, doc, getDoc, getDocs, setDoc, query, where } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import { formatDateTime } from '../utils/formatters.jsx';

const VocabularyListPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [wordChunks, setWordChunks] = useState([]);
  const [history, setHistory] = useState({});

  const CHUNK_SIZE = 100;

  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const listDocRef = doc(db, 'jlpt', level, 'vocabulary_list', 'full-list');
        const listDocSnap = await getDoc(listDocRef);

        if (listDocSnap.exists()) {
          const words = listDocSnap.data().words || [];
          const chunks = [];
          for (let i = 0; i < words.length; i += CHUNK_SIZE) {
            chunks.push(words.slice(i, i + CHUNK_SIZE));
          }
          setWordChunks(chunks);
        }

        const historyQuery = query(
          collection(db, 'users', currentUser.uid, 'quizHistory'),
          where('level', '==', level),
          where('category', '==', 'vocabulary_list')
        );
        const historySnapshot = await getDocs(historyQuery);
        const historyData = {};
        historySnapshot.forEach(doc => {
          historyData[doc.id] = doc.data();
        });
        setHistory(historyData);

      } catch (error) {
        console.error("Error fetching vocabulary list:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [level, currentUser]);

  const handleChunkClick = async (chunkIndex, chunk) => {
    if (!currentUser) return;

    const quizId = `${level}-vocabulary_list-${chunkIndex}`;
    const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', quizId);
    const isMastered = history[quizId]?.coveredCount === history[quizId]?.totalCount;

    // Prevent navigation if the list is already mastered
    if (isMastered) {
      return;
    }

    try {
      await setDoc(historyDocRef, {
        quizId: quizId,
        level: level,
        category: 'vocabulary_list',
        chunkIndex: chunkIndex,
        title: `Vocabulary List ${chunkIndex + 1}`,
        timestamp: new Date().toISOString(),
        status: 'incomplete',
        coveredCount: 0,
        totalCount: chunk.length,
      }, { merge: true });

      navigate(`/flashcards/${level}/vocabulary_list/${chunkIndex}`);
    } catch (error) {
      console.error("Error setting initial quiz history:", error);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="exercise-list-container">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      <div className="exercise-list-header">
        <h1 className="exercise-list-title">{level.toUpperCase()} - Vocabulary Lists</h1>
      </div>
      <div className="exercise-grid">
        {wordChunks.map((chunk, index) => {
          const quizId = `${level}-vocabulary_list-${index}`;
          const historyRecord = history[quizId];
          const isMastered = historyRecord && historyRecord.coveredCount === historyRecord.totalCount;
          const title = `List ${index + 1}`;

          return (
            <button
              key={index}
              className={`difficulty-button ${isMastered ? 'mastered' : ''}`}
              onClick={() => handleChunkClick(index, chunk)}
              disabled={isMastered}
            >
              {historyRecord ? (
                isMastered ? (
                  <>
                    <span className="difficulty-status-badge status-badge status-mastered">Mastered ✨</span>
                    <div className="difficulty-main">
                      <span className="difficulty-main-text">{title}</span>
                      <span className="difficulty-score">{`${historyRecord.coveredCount}/${historyRecord.totalCount}`}</span>
                    </div>
                    <div className="difficulty-timestamp">{formatDateTime(historyRecord.timestamp)}</div>
                  </>
                ) : (
                  <>
                    <span className={`difficulty-status-badge status-badge status-${historyRecord.status}`}>{historyRecord.status}</span>
                    <div className="difficulty-main">
                      <span className="difficulty-main-text">{title}</span>
                      <span className="difficulty-score">{`${historyRecord.coveredCount}/${historyRecord.totalCount}`}</span>
                    </div>
                    <div className="difficulty-timestamp">{formatDateTime(historyRecord.timestamp)}</div>
                  </>
                )
              ) : (
                <div className="difficulty-main">
                  <span className="difficulty-main-text">Vocabulary {title}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VocabularyListPage;

