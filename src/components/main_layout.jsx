import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import logo from '../assets/logo_transparent.png';
import ThemeToggle from './ThemeToggle.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const navLinks = [
  { to: '/levels',     label: 'Levels' },
  { to: '/books',      label: 'Books' },
  { to: '/anki-decks', label: 'Anki Decks' },
];

const MainHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();
  const { currentUser } = useAuth();
  const userInitial = (currentUser?.displayName || currentUser?.email || 'U').charAt(0).toUpperCase();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Close on outside click (avoiding race conditions with the hamburger button)
  useEffect(() => {
    const handler = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handler);
      document.addEventListener('touchstart', handler);
    }
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [menuOpen]);

  const activeCls = 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400 pb-1 font-black';
  const inactiveCls = 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold';

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 bg-[var(--color-bg-primary)]/95 backdrop-blur-md transition-all "
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex justify-between items-center">

        {/* Logo & App Name */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
          <NavLink
            to="/"
            className="text-lg md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-300 hover:opacity-85 transition-opacity"
          >
            Nihongo Playground
          </NavLink>
        </div>

        {/* Desktop Navigation: Links + Profile + Theme Toggle */}
        <div className="hidden md:flex items-center gap-5">
          <nav className="flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-[15px] transition-colors ${isActive ? activeCls : inactiveCls}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="h-6 w-px bg-[var(--color-border)] opacity-60" />

          {currentUser && (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border transition-all text-xs font-bold ${
                  isActive
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500 text-emerald-600 dark:text-emerald-400'
                }`
              }
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center text-xs font-extrabold shadow-xs">
                {userInitial}
              </div>
              <span className="max-w-[100px] truncate">{currentUser.displayName || currentUser.email?.split('@')[0]}</span>
            </NavLink>
          )}

          <ThemeToggle />
        </div>

        {/* Mobile: ONLY Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-xl hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all cursor-pointer select-none"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span
              className={`block w-5 h-0.5 bg-[var(--color-text-primary)] rounded-full transition-transform duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[var(--color-text-primary)] rounded-full transition-opacity duration-200 ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[var(--color-text-primary)] rounded-full transition-transform duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } bg-[var(--color-bg-primary)] border-t border-[var(--color-border)] shadow-lg`}
      >
        <div className="flex flex-col px-4 py-3 gap-1">
          {/* Main nav links */}
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-[15px] font-bold transition-colors ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <div className="my-1.5 border-t border-[var(--color-border)] opacity-60" />

          {/* Bottom Row: User Profile (Left) + Theme Toggle (Right) */}
          <div className="px-2 py-1 flex items-center justify-between gap-3">
            {currentUser ? (
              <NavLink
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex-1 px-3 py-2 rounded-xl text-[14px] font-bold transition-colors flex items-center gap-2.5 min-w-0 ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5'
                  }`
                }
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center text-xs font-extrabold shrink-0">
                  {userInitial}
                </div>
                <span className="truncate">{currentUser.displayName || currentUser.email}</span>
              </NavLink>
            ) : (
              <div />
            )}

            <div className="shrink-0 p-1">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const MainLayout = () => (
  <>
    <MainHeader />
    <main className="content-overlay main-content-container pt-20 md:pt-24">
      <Outlet />
    </main>
  </>
);

export default MainLayout;