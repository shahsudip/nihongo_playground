import React, { useState, useEffect } from "react";
import LoadingSpinner from "../utils/loading_spinner.jsx";

export default function QuizCard({ card, isAnswered, onOptionSelect }) {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setSelectedOption(null);
  }, [card]);

  const handleSelect = (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
      onOptionSelect(option);
    }
  };

  const getButtonClass = (option) => {
    if (!isAnswered) return "option-button";
    if (option === card.answer) return "option-button correct";
    if (selectedOption === option) return "option-button incorrect";
    return "option-button";
  };

  if (!card) return <LoadingSpinner />;

  return (
    <div className="quiz-card">
      <div className="question-display">{card.questionText}</div>
      <div className="options-grid">
        {card.options.map((option, index) => (
          <button
            key={index}
            className={getButtonClass(option)}
            onClick={() => handleSelect(option)}
            disabled={isAnswered}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
