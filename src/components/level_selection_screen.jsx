// src/components/level_selection_screen.jsx

import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card } from './ui/Card';

const LevelSelectionPage = () => {
  const { level, category } = useParams();
  const navigate = useNavigate();

  const levels = [ { name: 'n5' }, { name: 'n4' }, { name: 'n3' }, { name: 'n2' }, { name: 'n1' } ];
  const categories = ['vocabulary', 'kanji', 'grammar', 'reading'];

  // View 3: Select Quiz Type
  const renderTypeSelection = () => (
    <div className="w-full max-w-4xl mx-auto px-4 pt-[100px] pb-12 animate-fade-in">
      <button 
        onClick={() => navigate(-1)} 
        className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-6 inline-block"
      >
        &larr; Back to Categories
      </button>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 capitalize bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)]">
        {level} {category}
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 stagger-children">
        <Link to={`/levels/${level}/${category}/exercises`} className="block group">
          <Card className="h-full flex flex-col items-center justify-center py-12 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[var(--color-accent)]/50 bg-[var(--color-bg-secondary)]">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
              JLPT Exercises
            </h2>
            <p className="mt-3 text-sm text-[var(--color-text-muted)] text-center px-4">
              Practice specific question formats from the actual exam.
            </p>
          </Card>
        </Link>
        <Link to={`/levels/${level}/${category}/difficulties`} className="block group">
          <Card className="h-full flex flex-col items-center justify-center py-12 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[var(--color-accent)]/50 bg-[var(--color-bg-secondary)]">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
              Standard Quiz
            </h2>
            <p className="mt-3 text-sm text-[var(--color-text-muted)] text-center px-4">
              General mixed practice questions for this category.
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );

  // View 2: Select Category
  const renderCategorySelection = () => (
    <div className="w-full max-w-4xl mx-auto px-4 pt-[100px] pb-12 animate-fade-in">
      <button 
        onClick={() => navigate(-1)} 
        className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-6 inline-block"
      >
        &larr; Back to Levels
      </button>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 capitalize bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)]">
        {level} Quizzes
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 stagger-children">
        {categories.map((cat) => (
          <Link key={cat} to={`/levels/${level}/${cat}`} className="block group">
            <Card className="h-full flex flex-col items-center justify-center py-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-[var(--color-accent)]/50 bg-[var(--color-bg-secondary)]">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                {cat.charAt(0).toUpperCase() + cat.slice(1)} Test
              </h2>
            </Card>
          </Link>
        ))}
        
        <Link to={`/flashcards/${level}/vocabulary_list`} className="block group">
          <Card className="h-full flex flex-col items-center justify-center py-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-emerald-500/50 bg-emerald-500/5 border-emerald-500/20">
            <h2 className="text-xl font-bold text-emerald-600 group-hover:text-emerald-500 transition-colors">
              Vocabulary List
            </h2>
          </Card>
        </Link>

        <Link to={`/grammar-list/${level}`} className="block group">
          <Card className="h-full flex flex-col items-center justify-center py-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-emerald-500/50 bg-emerald-500/5 border-emerald-500/20">
            <h2 className="text-xl font-bold text-emerald-600 group-hover:text-emerald-500 transition-colors">
              Grammar List
            </h2>
          </Card>
        </Link>

        <Link to={`/level/${level}/practice-test`} className="block group">
          <Card className="h-full flex flex-col items-center justify-center py-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-amber-500/50 bg-amber-500/5 border-amber-500/20">
            <h2 className="text-xl font-bold text-amber-600 group-hover:text-amber-500 transition-colors">
              Practice Test
            </h2>
          </Card>
        </Link>
      </div>
    </div>
  );

  // View 1: Select Level
  const renderLevelSelection = () => (
    <div className="w-full max-w-4xl mx-auto px-4 pt-[100px] pb-12 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)]">
        Select a Level
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 stagger-children">
        <Link to="/create" className="block group md:col-span-3 lg:col-span-1">
          <Card className="h-full flex flex-col items-center justify-center py-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-dashed border-2 border-[var(--color-accent)] bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] group-hover:border-solid">
            <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors mb-2">Create Quiz from Image</h3>
            <p className="text-sm text-[var(--color-text-muted)] text-center">Generate a test from your notes.</p>
          </Card>
        </Link>
        
        {levels.map((lvl) => (
          <Link key={lvl.name} to={`/levels/${lvl.name}`} className="block group">
            <Card className="h-full flex flex-col items-center justify-center py-12 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[var(--color-primary)]/50 bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)]">
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
      {level && category
        ? renderTypeSelection()
        : level
        ? renderCategorySelection()
        : renderLevelSelection()}
    </div>
  );
};

export default LevelSelectionPage;