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
    kanjiChar: '漢',
    desc: 'Master Kanji characters, stroke orders, Onyomi, Kunyomi, and common compound words.',
  },
  {
    id: 'vocabulary-list',
    title: 'Vocabulary List',
    japaneseTitle: '語彙リスト',
    kanjiChar: '語',
    desc: 'Expand your vocabulary with high-frequency JLPT word banks, definitions, and audio.',
  },
  {
    id: 'grammar-list',
    title: 'Grammar List',
    japaneseTitle: '文法リスト',
    kanjiChar: '文',
    desc: 'Study sentence structures, formation rules, connection points, and example sentences.',
  },
  {
    id: 'practice-tests',
    title: 'Practice Tests',
    japaneseTitle: '模擬試験リスト',
    kanjiChar: '試',
    desc: 'Full JLPT mock exams with Vocabulary, Grammar, Reading passages, and Listening audio.',
    badge: '5 Full Tests',
  },
  {
    id: 'past-questions',
    title: 'Past Exam Papers',
    japaneseTitle: '過去問テスト',
    kanjiChar: '歴',
    desc: 'Official real exam sessions organized by year with authentic 180-pt scaled scoring.',
    badge: 'Real Exams',
  },
  {
    id: 'dethitiengnhat',
    title: 'Dethitiengnhat N3 Tests',
    japaneseTitle: '実戦模擬試験 (18回)',
    kanjiChar: '模',
    desc: 'All 18 scraped N3 mock tests (Vocabulary, Grammar/Reading, Listening) in a simple Hallmark exam sheet.',
    badge: '18 Full Sets',
    onlyLevel: 'n3',
  },
];

const LevelSelectionPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();

  const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];
  const currentLvlUpper = level ? level.toUpperCase() : '';
  const currentLvlInfo = level ? levelMeta[level.toLowerCase()] : null;

  // View 2: Select List (Kanji, Vocabulary, Grammar, Practice Tests, Past Exams, Check Level)
  const renderCategorySelection = () => (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between gap-2 mb-6 flex-wrap">
        <button 
          onClick={() => navigate('/levels')} 
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span>Back to All Levels</span>
        </button>

        <Link
          to={`/check-level?level=${currentLvlUpper}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors"
        >
          <span>Check {currentLvlUpper} Level (20 Questions)</span>
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>

      <div className="text-center mb-10">
        <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3">
          JLPT {currentLvlUpper} Study Tracks
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
          {currentLvlUpper} {currentLvlInfo?.subtitle ? `— ${currentLvlInfo.subtitle}` : ''}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-xl mx-auto font-normal">
          {currentLvlInfo?.desc || 'Select a section to begin your focused study session.'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {categories
          .filter((cat) => !cat.onlyLevel || cat.onlyLevel === level?.toLowerCase())
          .map((cat) => (
          <Link
            key={cat.id}
            to={`/levels/${level}/${cat.id}`}
            className="block group"
          >
            <div className="h-full bg-card border border-border rounded-2xl p-6 shadow-xs hover:border-emerald-500/50 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20">
                    <span className="font-serif font-bold text-xl text-emerald-700 dark:text-emerald-400">
                      {cat.kanjiChar}
                    </span>
                  </div>
                  {cat.badge && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold">
                      {cat.badge}
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                  {cat.japaneseTitle}
                </div>
                <h2 className="text-lg font-bold text-card-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                  {cat.title}
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed font-normal mb-6">
                  {cat.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Start Learning</span>
                <svg className="w-3.5 h-3.5 shrink-0 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  // View 1: Select Level (N5, N4, N3, N2, N1)
  const renderLevelSelection = () => (
    <div className="w-full max-w-5xl mx-auto px-4 pt-4 pb-8 animate-fade-in">
      <div className="text-center mb-6">
        <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-2">
          JLPT Mastery Roadmap
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
          Select a JLPT Level
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5 max-w-lg mx-auto font-normal">
          Choose your target level to explore Kanji, Vocabulary, and Grammar lists.
        </p>
      </div>

      {/* Omni-Source Check Your Level Call-to-Action Banner */}
      <div className="mb-6 bg-card border border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-1.5">
            <span>Adaptive 20-Question Diagnostic</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-card-foreground">
            Check Your Level (実力レベル診断)
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl font-normal">
            Every test randomly pulls 4 Kanji, 4 Vocab, 6 Grammar, 4 Reading, and 2 Listening Audio questions from all books, past exams, and static lists.
          </p>
        </div>
        <Link
          to="/check-level"
          className="shrink-0 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2"
        >
          <span>Start Level Check</span>
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((lvl) => {
          const info = levelMeta[lvl];
          return (
            <Link key={lvl} to={`/levels/${lvl}`} className="block group">
              <div className="h-full bg-card border border-border rounded-2xl p-6 shadow-xs hover:border-emerald-500/50 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl sm:text-4xl font-extrabold text-card-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors font-mono">
                      {info.title}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                      {info.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-card-foreground mb-2">
                    {info.subtitle}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed font-normal mb-6">
                    {info.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span>Enter {info.title}</span>
                  <svg className="w-3.5 h-3.5 shrink-0 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {level ? renderCategorySelection() : renderLevelSelection()}
    </div>
  );
};

export default LevelSelectionPage;
