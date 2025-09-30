import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';

const FlashcardViewer = () => {
  const { level, type, chunkIndex } = useParams(); 
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [coveredInSession, setCoveredInSession] = useState(new Set());
  const historyDocRef = useRef(null);
  const totalCountRef = useRef(0);

  useEffect(() => {
    if (!currentUser) return;
    
    const collectionType = type || 'vocabulary_list';
    const quizId = `${level}-${collectionType}-${chunkIndex}`;
    historyDocRef.current = doc(db, 'users', currentUser.uid, 'quizHistory', quizId);

    const fetchFlashcardData = async () => {
      setIsLoading(true);
      try {
        const listDocRef = doc(db, 'jlpt', level, collectionType, 'full-list');
        const listDocSnap = await getDoc(listDocRef);
        
        if (listDocSnap.exists()) {
          const data = listDocSnap.data();
          let words = [];
          if (collectionType === 'vocabulary_list') {
            words = data.words || [];
          }

          const index = parseInt(chunkIndex, 10);
          const CHUNK_SIZE = 100;
          const start = index * CHUNK_SIZE;
          const end = start + CHUNK_SIZE;
          const chunkWords = words.slice(start, end);

          totalCountRef.current = chunkWords.length;

          // UPDATED: Create card objects with meaning and romaji for the back
          const fetchedCards = chunkWords.map(word => ({
            id: word.japanese, // Use japanese as a unique ID for the session
            front: word.japanese,
            back_meaning: word.english, // Use 'english' field from scraped data
            back_romaji: word.romaji,   // Add the 'romaji' field
            subtext: null               // No separate subtext for vocab lists
          }));
          
          setCards(fetchedCards);
        }
      } catch (error) {
        console.error("Error fetching flashcard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlashcardData();
  }, [level, type, chunkIndex, currentUser]);

  const updateProgressInDB = async (newCoveredSet) => {
    if (!historyDocRef.current) return;
    try {
      await setDoc(historyDocRef.current, {
        coveredCount: newCoveredSet.size,
        totalCount: totalCountRef.current,
        status: newCoveredSet.size === totalCountRef.current ? 'mastered' : 'incomplete',
        timestamp: new Date().toISOString(),
      }, { merge: true });
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    
    const currentCardId = cards[currentIndex]?.id;
    if (currentCardId && !coveredInSession.has(currentCardId)) {
      const newCoveredSet = new Set(coveredInSession).add(currentCardId);
      setCoveredInSession(newCoveredSet);
      updateProgressInDB(newCoveredSet);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 150);
  };
  
  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    }, 150);
  };

  if (isLoading) return <LoadingSpinner />;
  if (cards.length === 0) {
    return (
      <div className="flashcard-container">
        <div className="flashcard-header">
          <h1>No Flashcards Found</h1>
          <p>This deck might be empty or could not be loaded.</p>
        </div>
        <div className="flashcard-navigation">
          <button onClick={() => navigate(-1)} className="nav-button back-button">← Go Back</button>
        </div>
      </div>
    );
  }
  
  const currentCard = cards[currentIndex];
  const isCardCovered = coveredInSession.has(currentCard.id);

  return (
    <div className="flashcard-container">
       <div className="viewer-top-bar" style={{ width: '100%', maxWidth: '500px', textAlign: 'left', marginBottom: '1rem' }}>
         <button onClick={() => navigate(-1)} className="back-button">← Back</button>
       </div>
      <div className="flashcard-header">
        <h1>{(type || "").replace('_', ' ')} - List {parseInt(chunkIndex, 10) + 1}</h1>
        <div className="flashcard-progress">
          Progress: {coveredInSession.size} / {cards.length}
        </div>
      </div>
      <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`} onClick={handleFlip}>
        <div className="flashcard-inner">
          <div className="flashcard-face flashcard-front">
            {isCardCovered && <span className="status-badge status-mastered covered-badge">✓</span>}
            <p className="flashcard-text">{currentCard.front}</p>
            {currentCard.subtext && <p className="flashcard-subtext">{currentCard.subtext}</p>}
          </div>
          {/* UPDATED: The back of the card now shows meaning and romaji */}
          <div className="flashcard-face flashcard-back">
            {isCardCovered && <span className="status-badge status-mastered covered-badge">✓</span>}
            <p className="flashcard-subtext">{currentCard.back_meaning}</p>
            {currentCard.back_romaji && <p className="flashcard-subtext">{currentCard.back_romaji}</p>}
          </div>
        </div>
      </div>
      <div className="flashcard-navigation">
        <button onClick={handlePrev} className="nav-button">← Prev</button>
        <button onClick={handleNext} className="nav-button">Next →</button>
      </div>
    </div>
  );
};

export default FlashcardViewer;

