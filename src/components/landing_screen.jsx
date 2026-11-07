import React, { useEffect, useState } from 'react';
import Toast from './ui/Toast.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import logo from '../assets/logo_transparent.png';
import ThemeToggle from './ThemeToggle.jsx';

const featureCards = [
  {
    icon: (
      <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: 'Textbook Digitizations',
    desc: 'Shin Kanzen Master, Speed Master, and Sou Matome Dokkai with authentic exam layouts and native audio.',
    tag: 'Dokkai & listening',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
    title: 'Anki & In-Browser .apkg',
    desc: 'Study Core 10k, AnkiDrone, or drop any custom .apkg deck to study directly inside your browser.',
    tag: 'Deck reader',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    title: 'FSRS-5 Memory Engine',
    desc: 'State-of-the-art Free Spaced Repetition Scheduler optimizing daily reviews and retention.',
    tag: 'Spaced repetition',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    title: 'JLPT Mocks & Sprints',
    desc: 'Timed exam simulations from N5 to N1, Chokuzen Taisaku drills, and 4-week Shin 500 Mon sprints.',
    tag: 'Exam preparation',
  },
];

const levelPills = [
  { lvl: 'N5', label: 'Beginner' },
  { lvl: 'N4', label: 'Elementary' },
  { lvl: 'N3', label: 'Intermediate' },
  { lvl: 'N2', label: 'Upper-intermediate' },
  { lvl: 'N1', label: 'Advanced' },
];

const LandingPage = () => {
  const { loginWithGoogle, currentUser } = useAuth();
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();

  // If already logged in, redirect to levels
  useEffect(() => {
    if (currentUser) {
      navigate('/levels');
    }
  }, [currentUser, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Failed to log in with Google', error);
      setToastMessage('Sign-in was cancelled or failed. Please try again.');
    }
  };

  return (
    <div className="relative h-screen h-[100dvh] w-full flex flex-col justify-between bg-background text-foreground transition-colors duration-200 overflow-hidden select-none">
      {/* Watermark: 日本語 (Japanese Characters Only, Vertical Tategaki) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none flex items-center justify-center select-none z-0 overflow-hidden"
      >
        <div
          className="opacity-5 text-slate-900 dark:text-white font-black leading-none tracking-[0.16em] select-none"
          style={{
            fontSize: 'min(24vh, 18vw)',
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
            fontFamily: "'Noto Serif JP', 'Yu Mincho', 'Hiragino Mincho ProN', serif",
            userSelect: 'none',
          }}
        >
          日本語
        </div>
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full px-6 md:px-12 py-3.5 md:py-4 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Nihongo Playground" className="w-8 h-8 md:w-9 md:h-9 object-contain" />
            <span className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Nihongo Playground
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Expansive Content (Balanced 2-Column on Desktop/Widescreen) */}
      <main className="relative z-10 flex-1 min-h-0 flex items-center justify-center px-5 sm:px-8 md:px-12 py-2 sm:py-4 w-full max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-12 items-center w-full my-auto">
          
          {/* Left Column: Hero, Call to Action, and Levels */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3 md:mb-4">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Complete JLPT curriculum from N5 to N1</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-3 md:mb-4">
              The authentic digital dojo for <br className="hidden sm:inline" />
              <span className="text-emerald-600 dark:text-emerald-400">
                mastering the JLPT
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mb-4 md:mb-6 font-normal line-clamp-2 sm:line-clamp-none">
              Interactive Dokkai reading passages, digitized textbooks (Shin Kanzen & Speed Master), browser-based Anki flashcards, and FSRS-5 spaced repetition.
            </p>

            {/* Google Sign-in Call To Action */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mb-4 md:mb-6">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-card text-card-foreground font-bold text-sm sm:text-base border border-border shadow-xs hover:bg-slate-50 dark:hover:bg-zinc-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>

              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Instant free access, no credit card required
              </span>
            </div>

            {/* Level Pills Bar */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center lg:justify-start">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-1">Levels:</span>
              {levelPills.map((p) => (
                <span
                  key={p.lvl}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-800/70 border border-slate-200/60 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 font-medium"
                >
                  <strong className="text-emerald-700 dark:text-emerald-400 font-semibold mr-1">{p.lvl}</strong> {p.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: 4 Feature Showcase Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 sm:gap-3 lg:gap-3.5 w-full">
            {featureCards.map((feat, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-3.5 sm:p-4 shadow-xs hover:border-emerald-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      {feat.icon}
                    </div>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-emerald-300">
                      {feat.tag}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-card-foreground mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed font-normal line-clamp-2 sm:line-clamp-3">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 w-full px-6 md:px-12 py-3 shrink-0 border-t border-border/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-4 h-4 object-contain" />
            <span className="font-semibold text-foreground">Nihongo Playground</span>
          </div>
          <p>© {new Date().getFullYear()} Nihongo Playground. Dedicated to authentic Japanese learning.</p>
        </div>
      </footer>
      <Toast message={toastMessage} type="error" onClose={() => setToastMessage(null)} />
    </div>
  );
};

export default LandingPage;
