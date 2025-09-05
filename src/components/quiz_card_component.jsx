import React, { useState, useEffect } from 'react';

// --- UI COMPONENT ---
// Displays the current Kanji question and the 2x2 grid of options.

export default function QuizCard({ card, options, isAnswered, onOptionSelect }) {
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  // Reset the visual selection when a new card is loaded
  useEffect(() => {
    setSelectedOptionId(null);
  }, [card]);

  const handleSelect = (option) => {
    // Prevent changing the answer after one has been submitted
    if (!isAnswered) {
      setSelectedOptionId(option.id);
      onOptionSelect(option);
    }
  };

  // Determines the CSS class for the button based on the answer state
  const getButtonClass = (option) => {
    // Default class before any answer is given
    if (!isAnswered) {
      return 'option-button';
    }
    
    // After answering, highlight the correct answer in green
    if (option.id === card.id) {
        return 'option-button correct';
    }

    // If the selected answer was incorrect, highlight it in red
    if (selectedOptionId === option.id) {
        return 'option-button incorrect';
    }

    // Otherwise, just a standard button
    return 'option-button';
  };

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-card">
      <div className="kanji-display">{card.kanji}</div>
      <div className="options-grid">
        {options.map((option) => (
          <button
            key={option.id}
            className={getButtonClass(option)}
            onClick={() => handleSelect(option)}
            disabled={isAnswered}
          >
            <div className="option-hiragana">{option.hiragana}</div>
            <div className="option-meaning">({option.meaning})</div>
          </button>
        ))}
      </div>
    </div>
  );
}

