// src/components/level_selection_screen.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LevelSelectionPage = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  // --- NEW STATE to track the category selection ---
  const [selectedCategory, setSelectedCategory] = useState(null);

  const levels = [
    { name: 'n5' },
    { name: 'n4' },
    { name: 'n3' },
    { name: 'n2' },
    { name: 'n1' },
  ];
  const categories = ['vocabulary', 'kanji', 'grammar', 'reading'];

  // --- NEW RENDER FUNCTION for the final selection level ---
  const renderTypeSelection = () => {
    return (
      <div className="type-selection-view">
        <button onClick={() => setSelectedCategory(null)} className="back-button" style={{ alignSelf: 'flex-start', marginBottom: '20px' }}>
          ← Back to Categories
        </button>
        <h1 className="category-title">{selectedLevel.toUpperCase()} {selectedCategory}</h1>
        <div className="category-grid">
          {/* This link now goes to the exercise list screen */}
          <Link to={`/levels/${selectedLevel}/${selectedCategory}/exercises`} className="category-card">
            Exercises
          </Link>
          <div className="category-card disabled-card">
            List (Coming Soon)
          </div>
        </div>
      </div>
    );
  };

  const renderCategorySelection = () => {
    return (
      <div className="category-selection-view">
        <button onClick={() => setSelectedLevel(null)} className="back-button" style={{ alignSelf: 'flex-start', marginBottom: '20px' }}>
          ← Back to Levels
        </button>
        <h1 className="category-title">{selectedLevel.toUpperCase()} Quizzes</h1>
        <div className="category-grid">
          {categories.map((category) => (
            // This is now a button that sets the category to move to the next view
            <button key={category} onClick={() => setSelectedCategory(category)} className="category-card">
              {category.charAt(0).toUpperCase() + category.slice(1)} Test
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderLevelSelection = () => {
    return (
      <div className="level-selection-view">
        <div className="level-grid">
          <Link to="/create" className="level-card creator-card">
            <div className="creator-card-content">
              <h3>Create Quiz from Image</h3>
              <p>Generate a custom test from your notes or textbook pages.</p>
            </div>
          </Link>
          {levels.map((level) => (
            <button key={level.name} onClick={() => setSelectedLevel(level.name)} className="level-card">
              <span className="level-card-name">{level.name.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="level-selection-container">
      {/* --- UPDATED LOGIC to handle three views --- */}
      {
        !selectedLevel
          ? renderLevelSelection()
          : !selectedCategory
            ? renderCategorySelection()
            : renderTypeSelection()
      }
    </div>
  );
};

export default LevelSelectionPage;