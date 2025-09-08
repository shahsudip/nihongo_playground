import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
// app_styles.css should be imported in App.jsx

const LevelSelectionPage = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const navigate = useNavigate(); // Use navigate for the back button

  const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];
  const categories = ['vocabulary', 'kanji', 'grammar', 'reading'];

  const renderCategorySelection = () => {
    return (
      <div className="category-selection-view">
        <button onClick={() => setSelectedLevel(null)} className="back-button">
          &larr; Back to Levels
        </button>
        <h1 className="category-title">{selectedLevel.toUpperCase()} Quizzes</h1>
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

  const renderLevelSelection = () => {
    return (
      <div className="level-selection-view">
        <h1 className="level-title">Select Your Path</h1>
        <div className="level-grid">

          {/* --- NEW CREATOR CARD --- */}
          <Link to="/create" className="level-card creator-card">
            <div className="creator-card-content">
              <h3>Create Quiz from Image</h3>
              <p>Generate a custom test from your notes or textbook pages.</p>
            </div>
          </Link>

          {/* --- Standard Level Cards --- */}
          {levels.map((level) => (
            <button key={level} onClick={() => setSelectedLevel(level)} className="level-card">
              {level.toUpperCase()}
            </button>
          ))}
        </div>
        <button onClick={() => navigate('/')} className="back-to-levels-button">
          &larr; Back to Home
        </button>
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