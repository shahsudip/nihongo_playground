import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import logo from '../assets/logo_transparent.png';
import ThemeToggle from './ThemeToggle.jsx';

const featureCards = [
  {
    icon: '📚',
    title: 'Textbook Digitizations',
    desc: 'Shin Kanzen Master, Speed Master, and Sou Matome Dokkai with authentic exam layouts and native audio.',
    tag: 'Dokkai & Listening',
  },
  {
    icon: '🎴',
    title: 'Anki & In-Browser .apkg',
    desc: 'Study Core 10k, AnkiDrone, or drop any custom .apkg deck to study directly inside your browser.',
    tag: 'Deck Reader',
  },
  {
    icon: '🧠',
    title: 'FSRS-5 Memory Engine',
    desc: 'State-of-the-art Free Spaced Repetition Scheduler optimizing your daily reviews and retention.',
    tag: 'Spaced Repetition',
  },
  {
    icon: '🎯',
    title: 'JLPT Mocks & Sprints',
    desc: 'Timed exam simulations (N5 → N1), Chokuzen Taisaku drills, and 4-week Shin 500 Mon sprints.',
    tag: 'Exam Dojo',
  },
];

const levelPills = [
  { lvl: 'N5', label: 'Beginner' },
  { lvl: 'N4', label: 'Elementary' },
  { lvl: 'N3', label: 'Intermediate' },
  { lvl: 'N2', label: 'Upper-Int' },
  { lvl: 'N1', label: 'Advanced' },
];

const LandingPage = () => {
  const { loginWithGoogle, currentUser } = useAuth();
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
      alert('Failed to sign in. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen lg:h-screen w-full flex flex-col justify-between bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] transition-colors duration-300 overflow-x-hidden select-none">
      {/* Subtle Japanese Watermark Characters Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-hidden opacity-[0.03] dark:opacity-[0.04] flex items-center justify-center select-none z-0">
        <div className="text-[34vw] font-black leading-none font-serif tracking-widest text-current">
          日本語
        </div>
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full px-6 md:px-12 py-4 md:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Nihongo Playground" className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-sm" />
            <span className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-300">
              Nihongo Playground
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Expansive Content (Balanced 2-Column on Desktop/Widescreen) */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-12 py-6 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          
          {/* Left Column: Hero, Call to Action, and Levels */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs md:text-sm font-black mb-5 shadow-xs animate-fade-in">
              <span>🌸</span>
              <span>All-In-One Japanese Mastery Platform • JLPT N5 → N1</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-5 animate-fade-in">
              Your Ultimate Dojo for <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 dark:from-emerald-400 dark:via-teal-300 dark:to-indigo-300">
                Mastering the JLPT
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-xl leading-relaxed mb-8 font-medium animate-fade-in">
              Interactive Dokkai reading passages, digitized textbooks (Shin Kanzen & Speed Master), browser-based Anki flashcard engine, and FSRS-5 spaced repetition.
            </p>

            {/* Google Sign-in Call To Action */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8 animate-fade-in">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white dark:bg-zinc-900 text-gray-900 dark:text-white font-black text-base border border-gray-300 dark:border-white/15 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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

              <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                ⚡ Instant access • No card required
              </span>
            </div>

            {/* Level Pills Bar */}
            <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-start">
              <span className="text-xs font-black uppercase text-gray-400 dark:text-gray-500 mr-1">Roadmap:</span>
              {levelPills.map((p) => (
                <span
                  key={p.lvl}
                  className="px-3 py-1 rounded-lg bg-white/80 dark:bg-zinc-900/60 border border-gray-200/80 dark:border-white/10 text-xs font-bold text-gray-800 dark:text-gray-200 shadow-2xs"
                >
                  <strong className="text-emerald-700 dark:text-emerald-400 mr-1">{p.lvl}</strong> {p.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: 4 Feature Showcase Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full animate-fade-in">
            {featureCards.map((feat, i) => (
              <div
                key={i}
                className="bg-white/90 dark:bg-zinc-900/80 border border-gray-200/80 dark:border-white/10 rounded-3xl p-5 shadow-sm hover:shadow-lg hover:border-emerald-500/50 dark:hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{feat.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
                      {feat.tag}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 w-full px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-4 h-4 object-contain" />
            <span className="font-bold text-gray-700 dark:text-gray-300">Nihongo Playground</span>
          </div>
          <p>© {new Date().getFullYear()} Nihongo Playground • Modern Japanese Learning Platform</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
