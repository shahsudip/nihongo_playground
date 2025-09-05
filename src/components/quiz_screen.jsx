import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizData } from '../data/quiz_data.jsx';
import { useSrsQuiz } from '../logic/quiz_logic_hook.jsx';




// --- スコアカウンター コンポーネント ---
const ScoreCounter = ({ correct, incorrect, mastered, total }) => (
  <div className="score-counter-container">
    <div className="score-item correct">Correct: <span>{correct}</span></div>
    <div className="score-item incorrect">Incorrect: <span>{incorrect}</span></div>
    <div className="score-item mastered">Mastered: <span>{mastered} / {total}</span></div>
  </div>
);

// --- クイズ本体のコンポーネント ---
const Quiz = ({ quizContent, quizTitle, quizType, onComplete }) => {
  const {
    currentCard,
    currentOptions,
    masteredCount,
    totalCorrect,
    totalIncorrect,
    deckSize,
    handleAnswer,
    isComplete,
  } = useSrsQuiz(quizContent, quizType);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const navigate = useNavigate();

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
  
  useEffect(() => {
    if (isComplete) {
      onComplete(totalCorrect, totalCorrect + totalIncorrect);
    }
  }, [isComplete, onComplete, totalCorrect, totalIncorrect]);

  if (!currentCard && !isComplete) {
    return <div className="loading-text">Loading Quiz...</div>;
  }

  return (
    <div className="quiz-card">
      <h1 className="quiz-title">{quizTitle}</h1>
      <ScoreCounter 
        correct={totalCorrect} 
        incorrect={totalIncorrect} 
        mastered={masteredCount}
        total={deckSize}
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
  );
};

// --- メインページコンポーネント (難易度選択を処理) ---
const QuizPage = () => {
  const { level, category } = useParams();
  const navigate = useNavigate();

  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [unlockedDifficulty, setUnlockedDifficulty] = useState('easy');
  
  const difficulties = ['easy', 'medium', 'hard'];
  const difficultyMap = { easy: 1, medium: 2, hard: 3 };

  useEffect(() => {
    const storageKey = `quiz-progress-${level}-${category}`;
    const savedProgress = localStorage.getItem(storageKey);
    if (savedProgress) {
      setUnlockedDifficulty(savedProgress);
    }
  }, [level, category]);
  
  const onQuizComplete = (finalScore, totalAttempts) => {
    const storageKey = `quiz-progress-${level}-${category}`;
    if (selectedDifficulty === 'easy' && unlockedDifficulty === 'easy') {
      localStorage.setItem(storageKey, 'medium');
    } else if (selectedDifficulty === 'medium' && unlockedDifficulty === 'medium') {
      localStorage.setItem(storageKey, 'hard');
    }
    navigate('/results', { state: { score: finalScore, total: totalAttempts } });
  };

  const renderDifficultySelection = () => {
    const categoryData = quizData[level]?.[category];
    if (!categoryData) {
        return (
             <div className="quiz-card">
                <h1>Content for "{category}" not found!</h1>
                <button onClick={() => navigate('/levels')} className="back-to-levels-button">
                    &larr; Back to Categories
                </button>
            </div>
        )
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
              <button
                key={difficulty}
                className={`difficulty-button ${isLocked || !hasContent ? 'locked' : ''}`}
                disabled={isLocked || !hasContent}
                onClick={() => setSelectedDifficulty(difficulty)}
                title={!hasContent ? "No questions for this difficulty yet" : ""}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                {(isLocked || !hasContent) && <span className="lock-icon">?</span>}
              </button>
            );
          })}
        </div>
        <button onClick={() => navigate('/levels')} className="back-to-levels-button">
          &larr; Back to Categories
        </button>
      </div>
    );
  };
  
  const renderQuiz = () => {
    const quizContent = quizData[level]?.[category]?.[selectedDifficulty]?.quiz_content;
    const quizTitle = quizData[level]?.[category]?.[selectedDifficulty]?.title;
    return <Quiz quizContent={quizContent} quizTitle={quizTitle} quizType={category} onComplete={onQuizComplete} />;
  };

  return (
    <div className="quiz-container">
      {!selectedDifficulty ? renderDifficultySelection() : renderQuiz()}
    </div>
  );
};

export default QuizPage;