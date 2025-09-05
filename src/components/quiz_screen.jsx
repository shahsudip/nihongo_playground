import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizData } from '../data/quiz_data.jsx';

const QuizPage = () => {
  const { level, category } = useParams();
  const navigate = useNavigate();

  // State to track which difficulty is chosen to start the quiz
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  
  // State to track the highest difficulty the user has unlocked
  const [unlockedDifficulty, setUnlockedDifficulty] = useState('easy');
  
  const difficulties = ['easy', 'medium', 'hard'];
  const difficultyMap = { easy: 1, medium: 2, hard: 3 };

  // This useEffect runs once to load the user's progress from browser storage
  useEffect(() => {
    const storageKey = `quiz-progress-${level}-${category}`;
    const savedProgress = localStorage.getItem(storageKey);
    if (savedProgress) {
      setUnlockedDifficulty(savedProgress);
    }
  }, [level, category]);
  
  // --- This is the new logic for when the quiz is finished ---
  const onQuizComplete = (currentScore, totalQuestions) => {
    // Check if we need to unlock the next level
    if (selectedDifficulty === 'easy' && unlockedDifficulty === 'easy') {
      const nextLevel = 'medium';
      localStorage.setItem(`quiz-progress-${level}-${category}`, nextLevel);
      setUnlockedDifficulty(nextLevel);
    } else if (selectedDifficulty === 'medium' && unlockedDifficulty === 'medium') {
      const nextLevel = 'hard';
      localStorage.setItem(`quiz-progress-${level}-${category}`, nextLevel);
      setUnlockedDifficulty(nextLevel);
    }
    
    // Navigate to the results page
    navigate('/results', { state: { score: currentScore, total: totalQuestions } });
  };


  // --- VIEW 1: Renders the difficulty selection screen ---
  const renderDifficultySelection = () => {
    const unlockedLevelNum = difficultyMap[unlockedDifficulty];

    return (
      <div className="difficulty-selection-container">
        <h1 className="difficulty-title">{level.toUpperCase()} - {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
        <div className="difficulty-grid">
          {difficulties.map(difficulty => {
            const currentLevelNum = difficultyMap[difficulty];
            const isLocked = currentLevelNum > unlockedLevelNum;
            
            return (
              <button
                key={difficulty}
                className={`difficulty-button ${isLocked ? 'locked' : ''}`}
                disabled={isLocked}
                onClick={() => setSelectedDifficulty(difficulty)}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                {isLocked && <span className="lock-icon">?</span>}
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
  
  // --- VIEW 2: Renders the actual quiz after a difficulty is selected ---
  const renderQuiz = () => {
    // Pass the onQuizComplete function to the Quiz component
    return <Quiz quizData={quizData[level]?.[category]?.[selectedDifficulty]} onComplete={onQuizComplete} />;
  };

  return (
    <div className="quiz-container">
      {!selectedDifficulty ? renderDifficultySelection() : renderQuiz()}
    </div>
  );
};

// --- We've moved the actual quiz logic into its own sub-component ---
// --- This keeps the main component cleaner ---
const Quiz = ({ quizData, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentQuizItem, setCurrentQuizItem] = useState({ question: '', options: [], answer: '' });

  useEffect(() => {
    const vocabularyList = quizData.quiz_content;
    const currentVocabItem = vocabularyList[currentQuestionIndex];
    const correctAnswer = currentVocabItem.hiragana;
    const incorrectOptionsPool = vocabularyList
      .filter(item => item.hiragana !== correctAnswer)
      .map(item => item.hiragana);
    const shuffledPool = incorrectOptionsPool.sort(() => Math.random() - 0.5);
    const distractors = shuffledPool.slice(0, 3);
    const allOptions = [correctAnswer, ...distractors];
    const shuffledFinalOptions = allOptions.sort(() => Math.random() - 0.5);

    setCurrentQuizItem({
      question: currentVocabItem.kanji,
      options: shuffledFinalOptions,
      answer: correctAnswer,
    });
  }, [currentQuestionIndex, quizData]);

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === currentQuizItem.answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.quiz_content.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      // Use the onComplete callback function passed from the parent
      onComplete(score + (selectedOption === currentQuizItem.answer && !isAnswered ? 1 : 0), quizData.quiz_content.length);
    }
  };
  
  if (!quizData) {
    return <h1>Quiz content not found!</h1>;
  }

  return (
    <div className="quiz-card">
      <h1 className="quiz-title">{quizData.title}</h1>
      <p className="question-counter">Question {currentQuestionIndex + 1} / {quizData.quiz_content.length}</p>
      <h2 className="question-text">{currentQuizItem.question}</h2>
      <div className="options-grid">
        {currentQuizItem.options.map((option, index) => {
          const isCorrect = option === currentQuizItem.answer;
          const isSelected = selectedOption === option;
          let buttonClass = 'option-button';
          if (isAnswered) {
            if (isCorrect) buttonClass += ' correct';
            else if (isSelected) buttonClass += ' incorrect';
          }
          return (
            <button key={index} onClick={() => handleOptionClick(option)} className={buttonClass} disabled={isAnswered}>
              {option}
            </button>
          );
        })}
      </div>
      {isAnswered && (
        <button onClick={handleNextQuestion} className="next-button">
          {currentQuestionIndex < quizData.quiz_content.length - 1 ? 'Next' : 'Finish'}
        </button>
      )}
    </div>
  );
};


export default QuizPage;