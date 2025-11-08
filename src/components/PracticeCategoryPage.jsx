import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const PracticeCategoryPage = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="level-selection-container">
      <div className="selection-view">
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Back to Test Type
      </button>
        <h1 className="category-title">{levelId.toUpperCase()} Practice Tests</h1>
        <div className="category-grid">
          
          <Link to={`/level/${levelId}/practice-test/vocabulary-test`} className="category-card">
            Vocabulary Tests
          </Link>
          
          <Link to={`/level/${levelId}/practice-test/grammar-test`} className="category-card">
            Grammar & Reading
          </Link>
          
          <Link to={`/level/${levelId}/practice-test/listening-test`} className="category-card">
            Listening Tests
          </Link>

        </div>
      </div>
    </div>
  );
};

export default PracticeCategoryPage;