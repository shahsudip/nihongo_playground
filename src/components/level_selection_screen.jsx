import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
// app_styles.css should be imported in App.jsx

const LevelSelectionPage = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const navigate = useNavigate(); // Use navigate for the back button

  const levels = [
    { name: 'n5' },
    { name: 'n4'},
    { name: 'n3' },
    { name: 'n2' },
    { name: 'n1' },
  ];  const categories = ['vocabulary', 'kanji', 'grammar', 'reading'];

  const renderCategorySelection = () => {
    return (
      <div className="category-selection-view">
      
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