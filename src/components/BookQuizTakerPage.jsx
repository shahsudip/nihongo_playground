// src/components/BookQuizTakerPage.jsx
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';

// -------------------------
// Score Counter Component
// -------------------------
const ScoreCounter = ({ score, totalIncorrect, mastered, totalQuestions, unseen }) => (
  <div className="book-quiz-stats">
    <div className="book-stat-item unseen">
      <span className="book-stat-lbl">New</span>
      <span className="book-stat-val">{unseen}</span>
    </div>
    <div className="book-stat-item correct">
      <span className="book-stat-lbl">Score</span>
      <span className="book-stat-val">{score}</span>
    </div>
    <div className="book-stat-item incorrect">
      <span className="book-stat-lbl">Incorrect</span>
      <span className="book-stat-val">{totalIncorrect}</span>
    </div>
    <div className="book-stat-item mastered">
      <span className="book-stat-lbl">Mastered</span>
      <span className="book-stat-val">{mastered} / {totalQuestions}</span>
    </div>
  </div>
);

// -------------------------
// Completion Modal
// -------------------------
const CompletionModal = ({ score, total, onContinue }) => (
  <div className="modal-overlay">
    <div className="modal-content book-completion-modal">
      <h2>Chapter Completed! 🎉</h2>
      <p className="modal-score-text">Final First-Pass Score:</p>
      <div className="modal-score-display">{score} / {total}</div>
      <p className="modal-description">You have successfully reviewed and mastered all the questions in this chapter!</p>
      <button onClick={onContinue} className="action-button next-level">
        Back to Chapters &rarr;
      </button>
    </div>
  </div>
);

// -------------------------
// First Pass Modal (SRS)
// -------------------------
const FirstPassModal = ({ score, total, onContinueReview, onEndQuiz }) => (
  <div className="modal-overlay">
    <div className="modal-content book-completion-modal">
      <h2>First Round Complete!</h2>
      <p className="modal-score-text">Your Score:</p>
      <div className="modal-score-display">{score} / {total}</div>
      <p className="modal-description">Great job! Continue to the review round to master the questions you got wrong.</p>
      <div className="modal-actions">
        <button onClick={onEndQuiz} className="action-button home">Save & Exit</button>
        <button onClick={onContinueReview} className="action-button next-level">Continue Review</button>
      </div>
    </div>
  </div>
);

// -------------------------
// Main Taker Page
// -------------------------
const BookQuizTakerPage = () => {
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // SRS States
  const [deck, setDeck] = useState([]);
  const [unseenQueue, setUnseenQueue] = useState([]);
  const [learningQueue, setLearningQueue] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);

  const [masteredCount, setMasteredCount] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalIncorrect, setTotalIncorrect] = useState(0);
  const [isFirstPassComplete, setIsFirstPassComplete] = useState(false);
  const [hasAcknowledgedFirstPass, setHasAcknowledgedFirstPass] = useState(false);
  const [firstPassStats, setFirstPassStats] = useState({ score: 0, total: 0 });
  const [showFirstPassModal, setShowFirstPassModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // UI Selection States
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const isQuizCompletedRef = useRef(false);
  const quizStateRef = useRef({});

  // 1. Fetch chapter content
  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch from Firestore
        const docRef = doc(db, 'books', bookId, 'chapters', chapterId);
        const docSnap = await getDoc(docRef);

        let chapterData = null;
        if (docSnap.exists()) {
          chapterData = docSnap.data();
        } else {
          // Fallback to local sample books
          const { sampleBooks } = await import('../data/book_data.jsx');
          const localBook = sampleBooks.find(b => b.id === bookId);
          if (localBook) {
            const localChapter = localBook.chapters.find(c => c.id === chapterId);
            if (localChapter) {
              chapterData = localChapter;
            }
          }
        }

        if (!chapterData) {
          setError("Chapter quiz not found.");
          setLoading(false);
          return;
        }

        setChapter(chapterData);

        // 2. Initialize deck from chapter passages/questions
        const flattened = [];
        chapterData.passages?.forEach((passage, passageIdx) => {
          passage.questions?.forEach((q, qIdx) => {
            flattened.push({
              ...q,
              id: `${passageIdx}-${qIdx}`,
              passageIndex: passageIdx,
              passageText: passage.passageText || "",
              
              /* --- AI ADDED: Pass layout and image fields to flattened deck --- */
              passageLayout: passage.passageLayout || "",
              imageSrc: passage.imageSrc || "",
              /* --------------------------------------------------------------- */
              
              passageTitle: passage.title || "Passage",
              originalQuestionIndex: qIdx,
              correctStreak: 0,
              isMastered: false,
            });
          });
        });

        setDeck(flattened);
        setUnseenQueue(flattened.map(card => card.id));
        setLearningQueue([]);
        setMasteredCount(0);
        setTotalCorrect(0);
        setTotalIncorrect(0);
        setIsFirstPassComplete(false);
        setHasAcknowledgedFirstPass(false);
        
        if (flattened.length > 0) {
          setCurrentCard(flattened[0]);
        }

      } catch (err) {
        console.error("Error loading chapter quiz:", err);
        setError("Failed to load quiz content: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterData();
  }, [bookId, chapterId]);

  // 3. Save progress on unmount or stats change
  const saveProgress = useCallback(async (isFinal = false, finalStats = null) => {
    if (isQuizCompletedRef.current || !currentUser || !chapter) return;

    try {
      const stats = finalStats || quizStateRef.current;
      const historyDocId = `${bookId}-${chapterId}`;
      const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId);
      
      const record = {
        quizId: historyDocId,
        bookId,
        chapterId,
        title: chapter.title,
        type: 'book',
        timestamp: new Date().toISOString(),
        score: stats.score || 0,
        total: stats.total || deck.length,
        totalIncorrect: stats.totalIncorrect || 0,
        mastered: stats.mastered || 0,
        numberOfQuestions: deck.length,
        status: isFinal ? 'mastered' : 'incomplete'
      };

      await setDoc(historyDocRef, record, { merge: true });
    } catch (err) {
      console.error("Failed to save chapter progress:", err);
    }
  }, [bookId, chapterId, currentUser, chapter, deck.length]);

  // Update refs when stats change
  useEffect(() => {
    quizStateRef.current = {
      score: totalCorrect,
      total: deck.length,
      totalIncorrect,
      mastered: masteredCount,
      unseen: unseenQueue.length,
    };
  }, [totalCorrect, totalIncorrect, masteredCount, unseenQueue.length, deck.length]);

  // Auto-save on page exit
  useEffect(() => {
    return () => {
      saveProgress(false);
    };
  }, [saveProgress]);

  // 4. SRS Selection Logic
  const shuffleArray = (arr) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const selectNextCard = useCallback((updatedDeck, nextUnseen, nextLearning) => {
    const activeDeck = updatedDeck || deck;
    const activeUnseen = nextUnseen !== undefined ? nextUnseen : unseenQueue;
    const activeLearning = nextLearning !== undefined ? nextLearning : learningQueue;

    let nextCardId = null;
    let newLearning = [...activeLearning];
    let newUnseen = [...activeUnseen];

    // Priority 1: First item in the learning queue (spaced review)
    if (newLearning.length > 0) {
      nextCardId = newLearning.shift();
    } 
    // Priority 2: Next unseen card (sequentially)
    else if (newUnseen.length > 0) {
      nextCardId = newUnseen.shift();
    } 
    // Priority 3: Randomly review non-mastered cards if queues are empty
    else {
      const nonMastered = activeDeck.filter(c => !c.isMastered).map(c => c.id);
      if (nonMastered.length > 0) {
        newLearning = shuffleArray(nonMastered);
        nextCardId = newLearning.shift();
      }
    }

    if (nextCardId) {
      const nextCard = activeDeck.find(c => c.id === nextCardId);
      setCurrentCard(nextCard);
      setUnseenQueue(newUnseen);
      setLearningQueue(newLearning);
    } else {
      // Completed the entire deck!
      setCurrentCard(null);
      isQuizCompletedRef.current = true;
      const finalStats = {
        score: totalCorrect,
        total: activeDeck.length,
        totalIncorrect,
        mastered: masteredCount,
      };
      saveProgress(true, finalStats);
      setShowCompletionModal(true);
    }
  }, [deck, unseenQueue, learningQueue, masteredCount, totalCorrect, totalIncorrect, saveProgress]);

  // 5. Answer Handler
  const handleAnswerClick = (option) => {
    if (isAnswered || !currentCard) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = currentCard.correctOption.text === option;
    
    // Calculate new counters
    const nextCorrect = isCorrect ? totalCorrect + 1 : totalCorrect;
    const nextIncorrect = isCorrect ? totalIncorrect : totalIncorrect + 1;
    
    if (isCorrect) {
      setTotalCorrect(prev => prev + 1);
    } else {
      setTotalIncorrect(prev => prev + 1);
    }

    // Update the deck card streak
    let nextMasteredCount = masteredCount;
    const updatedDeck = deck.map(card => {
      if (card.id === currentCard.id) {
        const newStreak = isCorrect ? card.correctStreak + 1 : 0;
        const isNowMastered = newStreak >= 2; // Mastered after 2 consecutive correct answers
        
        if (isNowMastered && !card.isMastered) {
          nextMasteredCount++;
          setMasteredCount(nextMasteredCount);
        }
        
        return {
          ...card,
          correctStreak: newStreak,
          isMastered: isNowMastered,
        };
      }
      return card;
    });

    setDeck(updatedDeck);

    // Setup queues
    let nextLearning = [...learningQueue];
    if (!isCorrect) {
      // Put wrong answers back in learning queue
      if (!nextLearning.includes(currentCard.id)) {
        nextLearning.push(currentCard.id);
      }
      nextLearning = shuffleArray(nextLearning);
    }

    // Trigger next question transition after 800ms
    setTimeout(() => {
      setIsAnswered(false);
      setSelectedOption(null);

      // Check first pass completion
      if (unseenQueue.length === 0 && !isFirstPassComplete) {
        setFirstPassStats({
          score: nextCorrect,
          total: nextCorrect + nextIncorrect,
        });
        setIsFirstPassComplete(true);
        if (!hasAcknowledgedFirstPass) {
          setShowFirstPassModal(true);
          return;
        }
      }

      selectNextCard(updatedDeck, unseenQueue, nextLearning);
    }, 1500); // 1.5s delay to let user read the explanation
  };

  // 6. Navigation manual click
  const handleNavClick = (cardId) => {
    if (isAnswered) return; // Prevent navigation during feedback transition
    const clickedCard = deck.find(c => c.id === cardId);
    if (clickedCard) {
      setCurrentCard(clickedCard);
    }
  };

  const handleContinueReview = () => {
    setShowFirstPassModal(false);
    setHasAcknowledgedFirstPass(true);
    selectNextCard();
  };

  const handleEndQuizEarly = () => {
    setShowFirstPassModal(false);
    isQuizCompletedRef.current = true;
    saveProgress(false);
    navigate(`/books/${bookId}`);
  };

  const handleCompletionConfirm = () => {
    setShowCompletionModal(false);
    navigate(`/books/${bookId}`);
  };

  // Helper: check if passage exists in the entire chapter
  const hasPassageText = useMemo(() => {
    /* --- AI ADDED: Also trigger passage layout if card has imageSrc --- */
    return deck.some(card => (card.passageText && card.passageText.trim() !== "") || card.imageSrc);
    /* ------------------------------------------------------------------ */
  }, [deck]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!chapter || deck.length === 0) return null;

  return (
    <div className="book-quiz-container">
      {/* Quiz Header */}
      <div className="book-quiz-header">
        <div className="header-left">
          <button onClick={handleEndQuizEarly} className="back-button">
            &larr; Exit Quiz
          </button>
          <div className="header-titles">
            <span className="book-quiz-subtitle">{chapter.title}</span>
            <h1 className="book-quiz-title">{currentCard ? currentCard.passageTitle : "Quiz Complete"}</h1>
          </div>
        </div>

        <ScoreCounter
          score={totalCorrect}
          totalIncorrect={totalIncorrect}
          mastered={masteredCount}
          totalQuestions={deck.length}
          unseen={unseenQueue.length}
        />
      </div>

      {/* Progress Bar */}
      <div className="book-quiz-progressbar">
        <div 
          className="book-progressbar-fill" 
          style={{ width: `${deck.length > 0 ? (masteredCount / deck.length) * 100 : 0}%` }}
        ></div>
      </div>

      {/* Quiz Workspace */}
      <div className={`book-quiz-workspace ${hasPassageText ? 'split-pane' : 'full-pane'}`}>
        
        {/* Left Pane: Passage (Only shown if passageText exists) */}
        {hasPassageText && currentCard && (currentCard.passageText || currentCard.imageSrc) && (
          <div className="book-passage-panel">
            <h2 className="passage-title">{currentCard.passageTitle}</h2>
            
            {/* --- AI ADDED: Render Passage Image if imageSrc exists --- */}
            {currentCard.imageSrc && (
              <div className="passage-image-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img src={currentCard.imageSrc} alt="Passage figure" style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ccc' }} />
              </div>
            )}
            {/* --------------------------------------------------------- */}
            {currentCard.passageText && (
              currentCard.passageLayout === 'html' ? (
                <div 
                  className="passage-text-content" 
                  dangerouslySetInnerHTML={{ __html: currentCard.passageText }} 
                />
              ) : (
                <div className="passage-text-content">
                  {currentCard.passageText.split('\n').map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
                </div>
              )
            )}
          </div>
        )}

        {/* Right Pane: Question & Options */}
        {currentCard ? (
          <div className="book-question-panel">
            <div className="question-card-box">
              <span className="question-number-badge">
                Question {deck.indexOf(currentCard) + 1}
              </span>
              <h2 className="book-question-text">{currentCard.questionText}</h2>
            </div>

            <div className="book-options-grid">
              {currentCard.options.map((option, idx) => {
                const isCorrect = currentCard.correctOption.text === option;
                const isSelected = selectedOption === option;
                
                let btnStyle = "book-opt-btn";
                if (isAnswered) {
                  if (isCorrect) btnStyle += " opt-correct";
                  else if (isSelected) btnStyle += " opt-incorrect";
                  else btnStyle += " opt-disabled";
                }

                return (
                  <button
                    key={idx}
                    className={btnStyle}
                    disabled={isAnswered}
                    onClick={() => handleAnswerClick(option)}
                  >
                    <span className="opt-letter">{String.fromCharCode(65 + idx)}</span>
                    <span className="opt-txt">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {isAnswered && currentCard.explanation && (
              <div className="book-explanation-box">
                <h4>Explanation</h4>
                <p>{currentCard.explanation}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="book-quiz-finished-message">
            <h2>No question selected.</h2>
            <button onClick={handleCompletionConfirm} className="action-button next-level">
              Return to Book Chapters
            </button>
          </div>
        )}
      </div>

      {/* Question Navigator */}
      <div className="book-navigator-section">
        <h3 className="navigator-title">Question Navigator</h3>
        <div className="navigator-dots-grid">
          {deck.map((card, idx) => {
            const isCurrent = currentCard && currentCard.id === card.id;
            const isMastered = card.isMastered;
            const inProgress = card.correctStreak > 0;
            const isIncorrect = learningQueue.includes(card.id);

            let dotClass = "nav-dot-btn";
            if (isCurrent) dotClass += " dot-active";
            if (isMastered) dotClass += " dot-mastered";
            else if (isIncorrect) dotClass += " dot-incorrect";
            else if (inProgress) dotClass += " dot-progress";

            return (
              <button
                key={card.id}
                className={dotClass}
                disabled={isAnswered}
                title={`Question ${idx + 1}`}
                onClick={() => handleNavClick(card.id)}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Completion Modals */}
      {showFirstPassModal && (
        <FirstPassModal
          score={firstPassStats.score}
          total={firstPassStats.total}
          onContinueReview={handleContinueReview}
          onEndQuiz={handleEndQuizEarly}
        />
      )}

      {showCompletionModal && (
        <CompletionModal
          score={totalCorrect}
          total={deck.length}
          onContinue={handleCompletionConfirm}
        />
      )}
    </div>
  );
};

export default BookQuizTakerPage;
