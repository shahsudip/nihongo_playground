import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../utils/loading_spinner.jsx'; // Corrected path assumption

// --- UI COMPONENT ---
// Displays the current question and the grid of options for any quiz type.

export default function QuizCard({ card, options, isAnswered, onOptionSelect }) {
  const [selectedOption, setSelectedOption] = useState(null);

  // Reset the visual selection when a new card is loaded
  useEffect(() => {
    setSelectedOption(null);
  }, [card]);

  const handleSelect = (option) => {
    // Prevent changing the answer after one has been submitted
    if (!isAnswered) {
      setSelectedOption(option);
      onOptionSelect(option); // The option is now the full answer string
    }
  };

  // REFACTORED: Determines the CSS class based on the new string-based answer format
  const getButtonClass = (option) => {
    if (!isAnswered) {
      return 'option-button';
    }
    
    // After answering, highlight the correct answer in green
    if (option === card.answer) {
      return 'option-button correct';
    }

    // If this option was selected and it was incorrect, highlight it in red
    if (selectedOption === option) {
      return 'option-button incorrect';
    }

    // Otherwise, it's an unselected, incorrect option
    return 'option-button';
  };

  // The loading spinner will show if the card object isn't ready
  if (!card) {
    return <LoadingSpinner />;
  }

  return (
    <div className="quiz-card">
      {/* UPDATED: Displays the universal "questionText" field */}
      <div className="question-display">{card.questionText}</div>
      
      <div className="options-grid">
        {/* UPDATED: Maps over an array of simple strings for the options */}
        {options.map((option, index) => (
          <button
            key={index}
            className={getButtonClass(option)}
            onClick={() => handleSelect(option)}
            disabled={isAnswered}
          >
            {/* The entire option string is now displayed directly */}
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}