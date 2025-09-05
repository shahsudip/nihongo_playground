import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LevelSelectionPage = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];
  const categories = ['vocabulary', 'kanji', 'grammar', 'reading'];

  // View for when a level has been selected
  const renderCategorySelection = () => {
    return (
      <div className="category-selection-view">
        <button onClick={() => setSelectedLevel(null)} className="back-button">
          &larr; Back to Levels
        </button>
        <h1 className="category-title">
          {selectedLevel.toUpperCase()} Quizzes
        </h1>
        <div className="category-grid">
          {categories.map((category) => (
            <Link key={category} to={`/quiz/${selectedLevel}/${category}`} className="category-card">
              {category.charAt(0).toUpperCase() + category.slice(1)} Test
            </Link>
          ))}
        </div>
      </div>
    );
  };

  // View for the initial level selection
  const renderLevelSelection = () => {
    return (
      <div className="level-selection-view">
        <h1 className="level-title">Select Your Level</h1>
        <div className="level-grid">
          {levels.map((level) => (
            <button key={level} onClick={() => setSelectedLevel(level)} className="level-card">
              {level.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="level-selection-container">
      {selectedLevel ? renderCategorySelection() : renderLevelSelection()}
    </div>
  );
};

export default LevelSelectionPage;