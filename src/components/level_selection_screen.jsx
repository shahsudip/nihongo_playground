// src/components/level_selection_screen.jsx

import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const LevelSelectionPage = () => {
  const { level, category } = useParams();
  const navigate = useNavigate();

  const levels = [ { name: 'n5' }, { name: 'n4' }, { name: 'n3' }, { name: 'n2' }, { name: 'n1' } ];
  const categories = ['vocabulary', 'kanji', 'grammar', 'reading'];

  // View 3: Select Quiz Type
  const renderTypeSelection = () => (
    <div className="selection-view">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to Categories
      </button>
      <h1 className="category-title">{level} {category}</h1>
      <div className="category-grid">
        <Link to={`/levels/${level}/${category}/exercises`} className="category-card">
          JLPT Exercises
        </Link>
        <Link to={`/levels/${level}/${category}/difficulties`} className="category-card">
          Standard Quiz
        </Link>
      </div>
    </div>
  );

  // View 2: Select Category
  const renderCategorySelection = () => (
    <div className="selection-view">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to Levels
      </button>
      <h1 className="category-title">{level} Quizzes</h1>
      <div className="category-grid">
        {categories.map((cat) => (
          <Link key={cat} to={`/levels/${level}/${cat}`} className="category-card">
            {cat.charAt(0).toUpperCase() + cat.slice(1)} Test
          </Link>
        ))}
                <Link to={`/flashcards/${level}/vocabulary_list`} className="category-card flashcard-mode">
          Vocabulary List
        </Link>

        <Link to={`/flashcards/${level}/grammar_list`} className="category-card flashcard-mode">
          Grammar List
        </Link>
      </div>
    </div>
  );

  // View 1: Select Level
  const renderLevelSelection = () => (
    <div className="selection-view">
      <h1 className="level-title">Select a Level</h1>
      <div className="level-grid">
        <Link to="/create" className="level-card creator-card">
          <div className="creator-card-content">
            <h3>Create Quiz from Image</h3>
            <p>Generate a test from your notes.</p>
          </div>
        </Link>
        {levels.map((lvl) => (
          <Link key={lvl.name} to={`/levels/${lvl.name}`} className="level-card">
            <span className="level-card-name">{lvl.name.toUpperCase()}</span>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="level-selection-container">
      {level && category
        ? renderTypeSelection()
        : level
        ? renderCategorySelection()
        : renderLevelSelection()}
    </div>
  );
};

export default LevelSelectionPage;