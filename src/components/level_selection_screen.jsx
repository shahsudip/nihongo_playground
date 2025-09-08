import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
// app_styles.css should be imported in App.jsx

const LevelSelectionPage = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const navigate = useNavigate(); // Use navigate for the back button

  const levels = [
    { name: 'n5', title: 'Beginner' },
    { name: 'n4', title: 'Elementary'},
    { name: 'n3', title: 'Intermediate' },
    { name: 'n2', title: 'Upper-Intermediate' },
    { name: 'n1', title: 'Advanced' },
  ];  const categories = ['vocabulary', 'kanji', 'grammar', 'reading'];

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
        <div className="level-grid">

          {/* Creator Card is now the first item in the grid */}
          <Link to="/create" className="level-card creator-card">
            <div className="creator-card-content">
              <h3>Create Quiz from Image</h3>
              <p>Generate a custom test from your notes or textbook pages.</p>
            </div>
          </Link>

          {/* Standard Level Cards */}
          {levels.map((level) => (
            <button key={level.name} onClick={() => setSelectedLevel(level.name)} className="level-card">
              <span className="level-card-name">{level.name.toUpperCase()}</span>
              <h3 className="level-card-title">{level.title}</h3>
              <p className="level-card-description">{level.description}</p>
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