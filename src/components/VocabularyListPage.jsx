import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Ensure this path is correct
import { useAuth } from '../context/AuthContext'; // Ensure this path is correct
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
        // 1. Fetch the full vocabulary list for the level
        const listDocRef = doc(db, 'jlpt', level, 'vocabulary_list', 'full-list');
        const listDocSnap = await getDoc(listDocRef);

        if (listDocSnap.exists()) {
          const words = listDocSnap.data().words || [];
          
          // 2. Break the list into chunks of 100
          const chunks = [];
          for (let i = 0; i < words.length; i += CHUNK_SIZE) {
            chunks.push(words.slice(i, i + CHUNK_SIZE));
          }
          setWordChunks(chunks);
        }

        // 3. Fetch all history records for these chunks to display progress
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

    try {
      // Create or update the history record when the user starts the quiz
      await setDoc(historyDocRef, {
        quizId: quizId,
        level: level,
        category: 'vocabulary_list',
        chunkIndex: chunkIndex,
        title: `Vocabulary List ${chunkIndex + 1}`,
        timestamp: new Date().toISOString(),
        status: 'incomplete',
        coveredCount: 0, // Always start from a score of 0
        totalCount: chunk.length,
      }, { merge: true });

      // Navigate to the flashcard viewer with the correct state
      navigate(`/flashcards/${level}/vocabulary_list/${chunkIndex}`);
    } catch (error) {
      console.error("Error setting initial quiz history:", error);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="difficulty-selection-container">
      <h1 className="difficulty-title">{level.toUpperCase()} Vocabulary Lists</h1>
      <div className="difficulty-grid">
        {wordChunks.map((chunk, index) => {
          const quizId = `${level}-vocabulary_list-${index}`;
          const historyRecord = history[quizId];
          const isMastered = historyRecord && historyRecord.coveredCount === historyRecord.totalCount;

          return (
            <button
              key={index}
              className={`difficulty-button ${isMastered ? 'mastered' : ''}`}
              onClick={() => handleChunkClick(index, chunk)}
            >
              {historyRecord ? (
                <>
                  <span className={`difficulty-status-badge status-badge status-${isMastered ? 'mastered' : 'incomplete'}`}>
                    {isMastered ? 'Mastered ✨' : 'In Progress'}
                  </span>
                  <div className="difficulty-main">
                    <span className="difficulty-main-text">Vocabulary List {index + 1}</span>
                    <span className="difficulty-score">{`${historyRecord.coveredCount}/${historyRecord.totalCount}`}</span>
                  </div>
                  <div className="difficulty-timestamp">
                    {formatDateTime(historyRecord.timestamp)}
                  </div>
                </>
              ) : (
                <div className="difficulty-main">
                  <span className="difficulty-main-text">Vocabulary List {index + 1}</span>
                  <span className="difficulty-score">Start</span>
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
