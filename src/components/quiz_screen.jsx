import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSrsQuiz } from '../hooks/quiz_logic_hook.jsx';
import { useAuth } from '../contexts/AuthContext.jsx'; // Assuming this is the path
import { db } from '../firebaseConfig.js';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

// --- Sub-Components (Unchanged) ---
const ScoreCounter = ({ correct, incorrect, mastered, total, unseen }) => (
  <div className="score-counter-container">
    <div className="score-item unseen">New: <span>{unseen}</span></div>
    <div className="score-item correct">Correct: <span>{correct}</span></div>
    <div className="score-item incorrect">Incorrect: <span>{incorrect}</span></div>
    <div className="score-item mastered">Mastered: <span>{mastered} / {total}</span></div>
  </div>
);

const CompletionModal = ({ score, total, onContinue }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Quiz Complete!</h2>
      <p className="modal-score-text">Your Final Score:</p>
      <div className="modal-score-display">{score} / {total}</div>
      <button onClick={onContinue} className="action-button next-level">View Profile & Save Score &rarr;</button>
    </div>
  </div>
);

const FirstPassModal = ({ score, total, onContinueReview, onEndQuiz }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>First Round Complete!</h2>
      <p className="modal-score-text">Current Score:</p>
      <div className="modal-score-display">{score} / {total}</div>
      <p className="modal-description">Continue to the review round to master the words.</p>
      <div className="modal-actions">
        <button onClick={onEndQuiz} className="action-button home">End Quiz</button>
        <button onClick={onContinueReview} className="action-button next-level">Continue Review</button>
      </div>
    </div>
  </div>
);

// --- Sub-Component: The Quiz View (Unchanged logic, minor prop change) ---
const Quiz = ({ quizContent, quizTitle, quizType, onComplete, onEndQuizEarly }) => {
  const [showFirstPassModal, setShowFirstPassModal] = useState(false);
  const quizState = useSrsQuiz(quizContent, quizType);
  const { currentCard, currentOptions, handleAnswer, acknowledgeFirstPass, isComplete, isLoading, isFirstPassComplete, hasAcknowledgedFirstPass, firstPassStats, totalCorrect, totalIncorrect, masteredCount, deckSize, unseenCount } = quizState;
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const navigate = useNavigate(); // Added useNavigate here

  useEffect(() => {
    if (isFirstPassComplete && !hasAcknowledgedFirstPass) {
      setShowFirstPassModal(true);
    }
    if (isComplete) {
      onComplete(totalCorrect, totalCorrect + totalIncorrect);
    }
  }, [isFirstPassComplete, hasAcknowledgedFirstPass, isComplete, onComplete, totalCorrect, totalIncorrect]);

  const handleContinueReview = () => {
    setShowFirstPassModal(false);
    acknowledgeFirstPass();
    // No longer navigates here, parent component handles navigation after save
  };

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    const isCorrect = option === currentCard.answer;
    setTimeout(() => {
      handleAnswer(isCorrect);
      setIsAnswered(false);
      setSelectedOption(null);
    }, 1000);
  };

  if (isLoading) return <div className="loading-text">Loading Quiz...</div>;
  if (isComplete || !currentCard) return <div className="loading-text">Quiz Complete! Navigating...</div>;

  return (
    <>
      <div className="quiz-card">
        <h1 className="quiz-title">{quizTitle}</h1>
        <ScoreCounter
          correct={totalCorrect}
          incorrect={totalIncorrect}
          mastered={masteredCount}
          total={deckSize}
          unseen={unseenCount}
        />
        <h2 className="question-text">{currentCard.questionText}</h2>
        <div className="options-grid">
          {currentOptions.map((option, index) => {
            const isCorrectAnswer = option === currentCard.answer;
            const isSelected = selectedOption === option;
            let buttonClass = 'option-button';
            if (isAnswered) {
              if (isCorrectAnswer) buttonClass += ' correct';
              else if (isSelected) buttonClass += ' incorrect';
            }
            return (
              <button key={index} onClick={() => handleOptionClick(option)} className={buttonClass} disabled={isAnswered}>
                {option}
              </button>
            );
          })}
        </div>
      </div>
      {showFirstPassModal && <FirstPassModal score={firstPassStats.score} total={firstPassStats.total} onContinueReview={handleContinueReview} onEndQuiz={() => onEndQuizEarly(firstPassStats)} />}
    </>
  );
};


// --- Main Page Component (Refactored for Firebase) ---
const QuizPage = () => {
  const { level, category } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const isCustomQuiz = level.startsWith('custom-');

  // --- State ---
  const [loading, setLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [unlockedDifficulty, setUnlockedDifficulty] = useState('easy');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [finalScore, setFinalScore] = useState({ score: 0, total: 0 });
  const [quizData, setQuizData] = useState({}); // Holds fetched quiz data for the category
  const [customQuizData, setCustomQuizData] = useState(null); // Holds fetched custom quiz data

  const difficulties = ['easy', 'medium', 'hard'];
  const difficultyMap = { easy: 1, medium: 2, hard: 3 };

  // --- Data Fetching Effect ---
  useEffect(() => {
    if (!currentUser) return;

    const fetchQuizData = async () => {
      setLoading(true);
      try {
        if (isCustomQuiz) {
          // Fetch a single custom quiz
          const quizDocRef = doc(db, 'users', currentUser.uid, 'customQuizzes', level);
          const quizDocSnap = await getDoc(quizDocRef);
          if (quizDocSnap.exists()) {
            setCustomQuizData({ id: quizDocSnap.id, ...quizDocSnap.data() });
            setSelectedDifficulty('custom'); // Auto-select for custom quizzes
          } else {
            console.error("Custom quiz not found!");
          }
        } else {
          // Fetch standard quiz progress and content
          const progressDocRef = doc(db, 'users', currentUser.uid, 'quizProgress', `${level}-${category}`);
          const progressSnap = await getDoc(progressDocRef);
          if (progressSnap.exists() && progressSnap.data().unlocked) {
            setUnlockedDifficulty(progressSnap.data().unlocked);
          }

          // Fetch all difficulties for the current standard quiz category
          const q = query(collection(db, 'quizzes'), where('level', '==', level), where('category', '==', category));
          const querySnapshot = await getDocs(q);
          const fetchedQuizzes = {};
          querySnapshot.forEach((doc) => {
            fetchedQuizzes[doc.data().difficulty] = doc.data();
          });
          setQuizData(fetchedQuizzes);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [currentUser, level, category, isCustomQuiz]);

  // --- Handlers (Refactored for Firebase) ---
  const handleDifficultySelect = async (difficulty) => {
    if (!currentUser) return;
    setSelectedDifficulty(difficulty);

    // Create an "in-progress" record in history if it's the first time
    const quizId = `${level}-${category}-${difficulty}`;
    const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', quizId);
    const historyDocSnap = await getDoc(historyDocRef);

    if (!historyDocSnap.exists()) {
      const newRecord = {
        quizId: quizId,
        title: quizData[difficulty]?.title || "Quiz",
        level: level,
        category: category,
        difficulty: difficulty,
        score: 0,
        total: quizData[difficulty]?.quiz_content?.length || 1,
        timestamp: new Date().toISOString(),
      };
      await setDoc(historyDocRef, newRecord);
    }
  };

  const onQuizComplete = async (finalScoreValue, totalAttempts) => {
    if (!currentUser) return;
    const quizId = isCustomQuiz ? level : `${level}-${category}-${selectedDifficulty}`;
    
    // 1. Unlock next level for standard quizzes
    if (!isCustomQuiz) {
      const progressDocRef = doc(db, 'users', currentUser.uid, 'quizProgress', `${level}-${category}`);
      if (selectedDifficulty === 'easy' && unlockedDifficulty === 'easy') {
        await setDoc(progressDocRef, { unlocked: 'medium' });
      } else if (selectedDifficulty === 'medium' && unlockedDifficulty === 'medium') {
        await setDoc(progressDocRef, { unlocked: 'hard' });
      }
    }

    // 2. Update quiz history with final score
    const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', quizId);
    const quizTitle = isCustomQuiz ? customQuizData.title : quizData[selectedDifficulty].title;
    
    const finalResult = {
      quizId: quizId,
      title: quizTitle,
      level: isCustomQuiz ? level : level,
      category: isCustomQuiz ? customQuizData.category || 'custom' : category,
      difficulty: isCustomQuiz ? 'custom' : selectedDifficulty,
      score: finalScoreValue,
      total: totalAttempts,
      timestamp: new Date().toISOString(),
    };
    
    await setDoc(historyDocRef, finalResult, { merge: true }); // Use merge to be safe
    
    // 3. Show completion modal
    setFinalScore({ score: finalScoreValue, total: totalAttempts });
    setShowCompletionModal(true);
  };
  
  const handleEndQuizEarly = async (stats) => {
    if (!currentUser) return;
    const quizId = isCustomQuiz ? level : `${level}-${category}-${selectedDifficulty}`;
    const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', quizId);
    const quizTitle = isCustomQuiz ? customQuizData.title : quizData[selectedDifficulty].title;

    const partialResult = {
      score: stats.score,
      total: stats.total,
      timestamp: new Date().toISOString(),
    };
    
    await setDoc(historyDocRef, partialResult, { merge: true }); // Update existing record with partial score
    navigate('/profile');
  };

  const handleModalContinue = () => {
    setShowCompletionModal(false);
    navigate('/profile');
  };

  // --- Render Functions (Adapted for Fetched Data) ---
  const renderDifficultySelection = () => {
    const unlockedLevelNum = difficultyMap[unlockedDifficulty];
    return (
      <div className="difficulty-selection-container">
        <h1 className="difficulty-title">{level.toUpperCase()} - {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
        <div className="difficulty-grid">
          {difficulties.map(difficulty => {
            const currentLevelNum = difficultyMap[difficulty];
            const isLocked = currentLevelNum > unlockedLevelNum;
            const hasContent = quizData[difficulty]?.quiz_content?.length > 0;
            return (
              <button key={difficulty} className={`difficulty-button ${isLocked || !hasContent ? 'locked' : ''}`} disabled={isLocked || !hasContent} onClick={() => handleDifficultySelect(difficulty)} title={!hasContent ? "No questions for this difficulty yet" : ""}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                {(isLocked || !hasContent) && <span className="lock-icon">🔒</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  };
  
  const renderQuiz = () => {
    let quizContent, quizTitle, quizType;
    if (isCustomQuiz) {
        if (!customQuizData) return <h1>Custom Quiz Not Found!</h1>;
        quizContent = customQuizData.quiz_content;
        quizTitle = customQuizData.title;
        quizType = customQuizData.category || 'custom';
    } else {
        const standardQuiz = quizData[selectedDifficulty];
        if (!standardQuiz) return <h1>Quiz Content Not Found!</h1>;
        quizContent = standardQuiz.quiz_content;
        quizTitle = standardQuiz.title;
        quizType = category;
    }
    return <Quiz quizContent={quizContent} quizTitle={quizTitle} quizType={quizType} onComplete={onQuizComplete} onEndQuizEarly={handleEndQuizEarly} />;
  };

  // --- Main Return ---
  if (loading) {
    return <div className="loading-text">Loading Quiz Data...</div>;
  }
  
  if (!currentUser) {
    return <div className="loading-text">Please log in to play a quiz.</div>
  }

  return (
    <div className="quiz-container">
      {!selectedDifficulty ? renderDifficultySelection() : renderQuiz()}
      {showCompletionModal && <CompletionModal score={finalScore.score} total={finalScore.total} onContinue={handleModalContinue} />}
    </div>
  );
};

export default QuizPage;