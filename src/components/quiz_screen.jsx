import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizData as staticQuizData } from '../data/quiz_data.jsx'; // Renamed for clarity
import { useSrsQuiz } from '../logic/quiz_logic_hook.jsx';

// --- Sub-Component: ScoreCounter ---
const ScoreCounter = ({ correct, incorrect, mastered, total, unseen }) => (
  <div className="score-counter-container">
    <div className="score-item unseen">New: <span>{unseen}</span></div>
    <div className="score-item correct">Correct: <span>{correct}</span></div>
    <div className="score-item incorrect">Incorrect: <span>{incorrect}</span></div>
    <div className="score-item mastered">Mastered: <span>{mastered} / {total}</span></div>
  </div>
);

// --- Sub-Component: Final Completion Modal ---
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

// --- Sub-Component: First Pass Modal ---
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

// --- Sub-Component: The Quiz View ---
const Quiz = ({ quizContent, quizTitle, quizType, onComplete, onEndQuizEarly }) => {
  const [showFirstPassModal, setShowFirstPassModal] = useState(false);
  const quizState = useSrsQuiz(quizContent, quizType);
  const { currentCard, currentOptions, handleAnswer, acknowledgeFirstPass, isComplete, isLoading, isFirstPassComplete, hasAcknowledgedFirstPass, firstPassStats, totalCorrect, totalIncorrect, masteredCount, deckSize, unseenCount } = quizState;
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

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

// --- Main Page Component ---
const QuizPage = () => {
  const { level, category } = useParams();
  const navigate = useNavigate();
  const isCustomQuiz = level.startsWith('custom-');

  const [selectedDifficulty, setSelectedDifficulty] = useState(isCustomQuiz ? 'easy' : null);
  const [unlockedDifficulty, setUnlockedDifficulty] = useState('easy');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [finalScore, setFinalScore] = useState({ score: 0, total: 0 });

  const difficulties = ['easy', 'medium', 'hard'];
  const difficultyMap = { easy: 1, medium: 2, hard: 3 };

  useEffect(() => {
    if (selectedDifficulty || isCustomQuiz) {
      const quizId = isCustomQuiz ? level : `${level}-${category}-${selectedDifficulty}`;
      const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
      const hasBeenStarted = history.some(item => item.quizId === quizId);
      if (!hasBeenStarted) {
        const newRecord = {
          quizId: quizId,
          id: Date.now(),
          level: isCustomQuiz ? level : level,
          category: category,
          difficulty: isCustomQuiz ? 'custom' : selectedDifficulty,
          score: 0,
          total: 1,
          timestamp: new Date().toISOString(),
        };
        const updatedHistory = [...history, newRecord];
        localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
      }
    }
  }, [selectedDifficulty, isCustomQuiz, level, category]);

  useEffect(() => {
    if (!isCustomQuiz) {
      const storageKey = `quiz-progress-${level}-${category}`;
      const savedProgress = localStorage.getItem(storageKey);
      if (savedProgress) setUnlockedDifficulty(savedProgress);
    }
  }, [level, category, isCustomQuiz]);

// Find this function in your src/pages/QuizPage.jsx and replace it completely.

  const onQuizComplete = (finalScoreValue, totalAttempts) => {
    // This part for unlocking standard quizzes is correct and remains the same.
    if (!isCustomQuiz) {
      const storageKey = `quiz-progress-${level}-${category}`;
      if (selectedDifficulty === 'easy' && unlockedDifficulty === 'easy') {
        localStorage.setItem(storageKey, 'medium');
      } else if (selectedDifficulty === 'medium' && unlockedDifficulty === 'medium') {
        localStorage.setItem(storageKey, 'hard');
      }
    }
    
    // 1. Create the consistent, unique ID for the quiz that was just played.
    const quizId = isCustomQuiz ? level : `${level}-${category}-${selectedDifficulty}`;
    const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
    
    // 2. Find the correct title for the quiz from its original data source.
    let quizTitle = "Custom Quiz";
    if (isCustomQuiz) {
        const customQuizzes = JSON.parse(localStorage.getItem('customQuizzes')) || [];
        const quiz = customQuizzes.find(q => q.id === level);
        if(quiz) quizTitle = quiz.title;
    } else {
        const standardQuiz = staticQuizData[level]?.[category]?.[selectedDifficulty];
        if(standardQuiz) quizTitle = standardQuiz.title;
    }
    
    // 3. Find the index of the existing record for this quiz in your history.
    const recordIndex = history.findIndex(item => item.quizId === quizId);

    // 4. Create the new, updated result object.
    const newResult = {
      quizId: quizId,
      // If we found a record, reuse its original unique timestamp ID. Otherwise, create a new one.
      id: recordIndex > -1 ? history[recordIndex].id : Date.now(),
      title: quizTitle,
      level: isCustomQuiz ? level : level,
      category,
      difficulty: isCustomQuiz ? 'custom' : selectedDifficulty,
      score: finalScoreValue,
      total: totalAttempts,
      timestamp: new Date().toISOString(), // Always update to the latest attempt time
    };
    
    const updatedHistory = [...history]; // Create a safe copy of the history

    // 5. If a record was found (recordIndex is not -1), UPDATE it. Otherwise, add it.
    if (recordIndex > -1) {
      updatedHistory[recordIndex] = newResult;
    } else {
      updatedHistory.push(newResult); 
    }
    
    // 6. Save the corrected history and show the completion modal.
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
    setFinalScore({ score: finalScoreValue, total: totalAttempts });
    setShowCompletionModal(true);
  };
  const handleModalContinue = () => {
    setShowCompletionModal(false);
    navigate('/profile');
  };
  
  const handleEndQuizEarly = (stats) => {
    const quizId = isCustomQuiz ? level : `${level}-${category}-${selectedDifficulty}`;
    navigate('/results', { state: { score: stats.score, total: stats.total, quizId: quizId } });
  };

  const renderDifficultySelection = () => {
    const categoryData = staticQuizData[level]?.[category];
    if (!categoryData) {
      return (<div className="quiz-card"><h1>Content for "{category}" not found!</h1></div>);
    }
    const unlockedLevelNum = difficultyMap[unlockedDifficulty];
    return (
      <div className="difficulty-selection-container">
        <h1 className="difficulty-title">{level.toUpperCase()} - {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
        <div className="difficulty-grid">
          {difficulties.map(difficulty => {
            const currentLevelNum = difficultyMap[difficulty];
            const isLocked = currentLevelNum > unlockedLevelNum;
            const hasContent = categoryData[difficulty]?.quiz_content?.length > 0;
            return (
              <button key={difficulty} className={`difficulty-button ${isLocked || !hasContent ? 'locked' : ''}`} disabled={isLocked || !hasContent} onClick={() => setSelectedDifficulty(difficulty)} title={!hasContent ? "No questions for this difficulty yet" : ""}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                {(isLocked || !hasContent) && <span className="lock-icon">?</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  };
  
  const renderQuiz = () => {
    let quizContent, quizTitle;
    // --- THIS IS THE FIX ---
    // The quizId variable is now correctly defined within the scope of this function.
    const quizId = isCustomQuiz ? level : `${level}-${category}-${selectedDifficulty}`;

    if (isCustomQuiz) {
      const customQuizzes = JSON.parse(localStorage.getItem('customQuizzes')) || [];
      const quiz = customQuizzes.find(q => q.id === level);
      if (!quiz) return <h1>Custom Quiz Not Found!</h1>;
      quizContent = quiz.quiz_content;
      quizTitle = quiz.title;
    } else {
      const standardQuiz = staticQuizData[level]?.[category]?.[selectedDifficulty];
      if (!standardQuiz) return <h1>Quiz Content Not Found!</h1>;
      quizContent = standardQuiz.quiz_content;
      quizTitle = standardQuiz.title;
    }
    return (
      <Quiz
        key={quizId} // The key is now guaranteed to have a value
        quizContent={quizContent}
        quizTitle={quizTitle}
        quizType={category}
        onComplete={onQuizComplete}
        onEndQuizEarly={handleEndQuizEarly}
        level={level}
        category={category}
        difficulty={selectedDifficulty}
      />
    );
  };

  return (
    <div className="quiz-container">
      {!selectedDifficulty ? renderDifficultySelection() : renderQuiz()}
      {showCompletionModal && <CompletionModal score={finalScore.score} total={finalScore.total} onContinue={handleModalContinue} />}
    </div>
  );
};

export default QuizPage;