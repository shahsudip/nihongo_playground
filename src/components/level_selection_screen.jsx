// src/components/level_selection_screen.jsx

import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const levelMeta = {
  n5: { title: 'N5', subtitle: 'Beginner', desc: 'Basic Kanji, Hiragana, Katakana & essential grammar for daily life.', badge: 'Introductory' },
  n4: { title: 'N4', subtitle: 'Elementary', desc: 'Everyday Japanese, basic conversations, and standard grammar patterns.', badge: 'Basic' },
  n3: { title: 'N3', subtitle: 'Intermediate', desc: 'Bridge to fluency. Moderate speed dialogues, reading comprehension, and natural expressions.', badge: 'Bridge' },
  n2: { title: 'N2', subtitle: 'Upper-Intermediate', desc: 'Business and academic Japanese, nuanced grammar, and news articles.', badge: 'Professional' },
  n1: { title: 'N1', subtitle: 'Advanced', desc: 'Mastery of complex texts, editorial writings, and sophisticated expressions.', badge: 'Mastery' },
};

const categories = [
  {
    id: 'kanji-list',
    title: 'Kanji List',
    japaneseTitle: '漢字リスト',
    icon: '🈯',
    desc: 'Master Kanji characters, stroke orders, Onyomi, Kunyomi, and common compound words.',
  },
  {
    id: 'vocabulary-list',
    title: 'Vocabulary List',
    japaneseTitle: '語彙リスト',
    icon: '📖',
    desc: 'Expand your vocabulary with high-frequency JLPT word banks, definitions, and audio.',
  },
  {
    id: 'grammar-list',
    title: 'Grammar List',
    japaneseTitle: '文法リスト',
    icon: '📜',
    desc: 'Study sentence structures, formation rules, connection points, and example sentences.',
  },
];

const LevelSelectionPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();

  const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];
  const currentLvlUpper = level ? level.toUpperCase() : '';
  const currentLvlInfo = level ? levelMeta[level.toLowerCase()] : null;

  // View 2: Select List (Kanji, Vocabulary, Grammar)
  const renderCategorySelection = () => (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <button 
          onClick={() => navigate('/levels')} 
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
        >
          <span>←</span>
          <span>Back to All Levels</span>
        </button>
      </div>

      <div className="text-center mb-10">
        <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase mb-3">
          JLPT {currentLvlUpper} Study Tracks
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          {currentLvlUpper} {currentLvlInfo?.subtitle ? `— ${currentLvlInfo.subtitle}` : ''}
        </h1>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 max-w-xl mx-auto font-medium">
          {currentLvlInfo?.desc || 'Select a section to begin your focused study session.'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/levels/${level}/${cat.id}`}
            className="block group"
          >
            <div className="h-full bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-emerald-500/60 dark:hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group-hover:-translate-y-1">
              <div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-zinc-800 dark:to-zinc-800/60 border border-emerald-200/50 dark:border-white/5 mb-5">
                  {cat.icon}
                </div>
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                  {cat.japaneseTitle}
                </div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors mb-2">
                  {cat.title}
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-6">
                  {cat.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs font-black text-emerald-600 dark:text-emerald-400">
                <span>Start Learning</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  // View 1: Select Level (N5, N4, N3, N2, N1)
  const renderLevelSelection = () => (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-10">
        <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase mb-3">
          JLPT Mastery Roadmap
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Select a JLPT Level
        </h1>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 max-w-lg mx-auto font-medium">
          Choose your target level to explore Kanji, Vocabulary, and Grammar lists.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {levels.map((lvl) => {
          const info = levelMeta[lvl];
          return (
            <Link key={lvl} to={`/levels/${lvl}`} className="block group">
              <div className="h-full bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-emerald-500/60 dark:hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group-hover:-translate-y-1">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {info.title}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40 text-xs font-black">
                      {info.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-gray-800 dark:text-gray-200 mb-2">
                    {info.subtitle}
                  </h3>

                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-6">
                    {info.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs font-black text-emerald-600 dark:text-emerald-400">
                  <span>Enter {info.title}</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      {level ? renderCategorySelection() : renderLevelSelection()}
    </div>
  );
};

export default LevelSelectionPage;