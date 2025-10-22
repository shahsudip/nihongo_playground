import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';

// A simple speaker icon component
const SpeakerIcon = ({ onClick }) => (
  <svg
    onClick={onClick}
    className="speaker-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

// Utility function for text-to-speech
const speak = (text, lang) => {
  if (!window.speechSynthesis) {
    console.warn("Browser does not support speech synthesis.");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9; // Adjust speed as needed
  window.speechSynthesis.cancel(); // Cancel any ongoing speech
  window.speechSynthesis.speak(utterance);
};


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

          const fetchedCards = chunkWords.map(word => ({
            id: word.japanese,
            front: word.japanese,
            back_meaning: word.english,
            back_romaji: word.romaji,
            subtext: null
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
    
    // Clean up speech synthesis on component unmount
    return () => {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    };
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
    
    // Stop any speech when flipping
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }

    const currentCardId = cards[currentIndex]?.id;
    if (currentCardId && !coveredInSession.has(currentCardId)) {
      const newCoveredSet = new Set(coveredInSession).add(currentCardId);
      setCoveredInSession(newCoveredSet);
      updateProgressInDB(newCoveredSet);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
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

  // --- NEW: Event handlers for speaking ---
  const handleSpeakFront = (event) => {
    event.stopPropagation(); // Prevents the card from flipping
    speak(currentCard.front, 'ja-JP'); // 'ja-JP' for Japanese
  };

  const handleSpeakBack = (event) => {
    event.stopPropagation(); // Prevents the card from flipping
    speak(currentCard.back_meaning, 'en-US'); // 'en-US' for English
  };

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
            {/* --- NEW: Speaker icon for the front --- */}
            <SpeakerIcon onClick={handleSpeakFront} />
            
            {isCardCovered && <span className="status-badge status-mastered covered-badge">✓</span>}
            <p className="flashcard-text">{currentCard.front}</p>
            {currentCard.subtext && <p className="flashcard-subtext">{currentCard.subtext}</p>}
          </div>
          
          <div className="flashcard-face flashcard-back">
            {/* --- NEW: Speaker icon for the back --- */}
            <SpeakerIcon onClick={handleSpeakBack} />
            
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