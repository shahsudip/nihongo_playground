import React, { useState, useEffect } from "react";
import { useJlptSrsQuiz } from "../hooks/useJlptSrsQuiz.jsx";
import LoadingSpinner from "../utils/loading_spinner.jsx";

const ScoreCounter = ({ score, totalIncorrect, mastered, numberOfQuestions, unseen }) => (
  <div className="score-counter-container">
    <div className="score-item unseen">New: <span>{unseen}</span></div>
    <div className="score-item correct">Score: <span>{score}</span></div>
    <div className="score-item incorrect">Incorrect: <span>{totalIncorrect}</span></div>
    <div className="score-item mastered">Mastered: <span>{mastered} / {numberOfQuestions}</span></div>
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

// --- CHANGE: Component now accepts 'source' as a prop ---
const JlptQuiz = ({ quizId, quizTitle = "", level, category, source, onComplete, onEndQuizEarly, quizStateRef }) => {
  const {
    currentCard,
    handleAnswer,
    acknowledgeFirstPass,
    isLoading,
    isFirstPassComplete,
    hasAcknowledgedFirstPass,
    firstPassStats,
    isComplete,
    totalCorrect: score,
    totalIncorrect,
    masteredCount,
    unseenCount,
    deckSize: numberOfQuestions,
  } = useJlptSrsQuiz(quizId, level, category, source); // --- CHANGE: 'source' is passed to the hook ---

  const [showFirstPassModal, setShowFirstPassModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (quizStateRef) {
      quizStateRef.current = {
        score,
        total: numberOfQuestions,
        totalIncorrect,
        mastered: masteredCount,
        unseen: unseenCount,
        numberOfQuestions,
      };
    }
  }, [score, totalIncorrect, masteredCount, unseenCount, numberOfQuestions, quizStateRef]);

  useEffect(() => {
    if (isFirstPassComplete && !hasAcknowledgedFirstPass) {
      setShowFirstPassModal(true);
    }
    if (isComplete) {
      onComplete?.({
        score,
        total: numberOfQuestions,
        totalIncorrect,
        mastered: masteredCount,
        unseen: unseenCount,
      });
    }
  }, [isFirstPassComplete, hasAcknowledgedFirstPass, isComplete, score, totalIncorrect, masteredCount, unseenCount, onComplete, numberOfQuestions]);

  const handleOptionClick = (option) => {
    if (isAnswered || !currentCard) return;
    setSelectedOption(option);
    setIsAnswered(true);
    const isCorrect = option === currentCard.correctOption.text;
    setTimeout(() => {
      handleAnswer(isCorrect);
      setIsAnswered(false);
      setSelectedOption(null);
    }, 800);
  };

  if (isLoading) return <LoadingSpinner />;
   if (isFirstPassComplete && !hasAcknowledgedFirstPass) {
    return (
      <FirstPassModal
        score={firstPassStats?.score ?? 0}
        total={firstPassStats?.total ?? 0}
        onContinueReview={() => {
          setShowFirstPassModal(false);
          acknowledgeFirstPass();
        }}
        onEndQuiz={() => onEndQuizEarly(quizStateRef.current)}
      />
    );
  }
  if (!currentCard) return <div className="quiz-card"><p>No card available. Could not load quiz content.</p></div>;

  const options = Array.isArray(currentCard.options) ? currentCard.options : [];

  return (
    <>
      <div className="quiz-card">
        <h1 className="quiz-title">{quizTitle}</h1>
        <ScoreCounter
          score={score}
          totalIncorrect={totalIncorrect}
          mastered={masteredCount}
          numberOfQuestions={numberOfQuestions}
          unseen={unseenCount}
        />
        <h2 className="question-text">{currentCard.questionText}</h2>
        <div className="options-grid">
          {options.map((option, idx) => {
            const isCorrectAnswer = option === currentCard.correctOption.text;
            const isSelected = selectedOption === option;
            let buttonClass = "option-button";
            if (isAnswered) {
              if (isCorrectAnswer) buttonClass += " correct";
              else if (isSelected) buttonClass += " incorrect";
            }
            return (
              <button key={idx} onClick={() => handleOptionClick(option)} className={buttonClass} disabled={isAnswered}>
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default JlptQuiz;

