// src/components/level_selection_screen.jsx

import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card } from './ui/Card';

const LevelSelectionPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();

  const levels = [{ name: 'n5' }, { name: 'n4' }, { name: 'n3' }, { name: 'n2' }, { name: 'n1' }];

  // View 2: Select List (Kanji, Vocabulary, Grammar)
  const renderCategorySelection = () => (
    <div className="w-full max-w-4xl mx-auto px-4 pt-6 pb-12 animate-fade-in">
      <button 
        onClick={() => navigate('/levels')} 
        className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-6 inline-block"
      >
        &larr; Back to Levels
      </button>
      <h1 className="text-3xl md:text-4xl font-black text-center mb-10 uppercase text-gray-900 dark:text-white">
        {level}
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 stagger-children">
        <Link to={`/levels/${level}/kanji-list`} className="block group">
          <Card className="h-full flex flex-col items-center justify-center min-h-[140px] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-[var(--color-accent)]/50 bg-[var(--color-bg-secondary)]">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
              Kanji List
            </h2>
          </Card>
        </Link>

        <Link to={`/levels/${level}/vocabulary-list`} className="block group">
          <Card className="h-full flex flex-col items-center justify-center min-h-[140px] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-[var(--color-accent)]/50 bg-[var(--color-bg-secondary)]">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
              Vocabulary List
            </h2>
          </Card>
        </Link>

        <Link to={`/levels/${level}/grammar-list`} className="block group">
          <Card className="h-full flex flex-col items-center justify-center min-h-[140px] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-[var(--color-accent)]/50 bg-[var(--color-bg-secondary)]">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
              Grammar List
            </h2>
          </Card>
        </Link>
      </div>
    </div>
  );

  // View 1: Select Level (N5, N4, N3, N2, N1)
  const renderLevelSelection = () => (
    <div className="w-full max-w-4xl mx-auto px-4 pt-6 pb-12 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-black text-center mb-10 text-gray-900 dark:text-white">
        Select a Level
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 stagger-children">
        {levels.map((lvl) => (
          <Link key={lvl.name} to={`/levels/${lvl.name}`} className="block group">
            <Card className="h-full flex flex-col items-center justify-center min-h-[140px] p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[var(--color-primary)]/50 bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)]">
              <span className="text-4xl font-black text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                {lvl.name.toUpperCase()}
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {level ? renderCategorySelection() : renderLevelSelection()}
    </div>
  );
};

export default LevelSelectionPage;