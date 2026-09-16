import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
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
  const menuRef = useRef(null);
  const location = useLocation();
  const { currentUser } = useAuth();
  const userInitial = (currentUser?.displayName || currentUser?.email || 'U').charAt(0).toUpperCase();

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  const activeCls = 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400 pb-1 font-black';
  const inactiveCls = 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold';

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[var(--color-bg-primary)]/95 backdrop-blur-md transition-all border-b border-[var(--color-border)]">
      <div className="w-full px-4 md:px-12 h-16 md:h-20 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
          <NavLink
            to="/"
            className="text-lg md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-300 hover:opacity-85 transition-opacity"
          >
            Nihongo Playground
          </NavLink>
        </div>

        {/* Desktop nav + User Profile Pill + Global Theme Toggle at last */}
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
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-sm'
                    : 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500 text-emerald-400'
                }`
              }
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center text-xs font-extrabold shadow-sm">
                {userInitial}
              </div>
              <span className="max-w-[100px] truncate">{currentUser.displayName || currentUser.email?.split('@')[0]}</span>
            </NavLink>
          )}

          <ThemeToggle />
        </div>

        {/* Mobile controls: User Avatar + Theme Toggle + Hamburger button */}
        <div className="md:hidden flex items-center gap-2">
          {currentUser && (
            <Link
              to="/profile"
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center text-xs font-extrabold shadow-sm border border-emerald-500/30"
            >
              {userInitial}
            </Link>
          )}

          <ThemeToggle compact={true} />

          <button
            className="flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-lg hover:bg-[var(--color-bg-secondary)] transition-colors"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-[var(--color-text-primary)] rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[var(--color-text-primary)] rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[var(--color-text-primary)] rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        ref={menuRef}
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        } bg-[var(--color-bg-primary)] border-t border-[var(--color-border)]`}
      >
        <nav className="flex flex-col px-4 py-3 gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-[15px] font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-emerald-400'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          {currentUser && (
            <NavLink
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-[15px] font-medium transition-colors flex items-center gap-2 ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-emerald-400'
                }`
              }
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center text-[10px] font-extrabold">
                {userInitial}
              </div>
              Profile ({currentUser.displayName || currentUser.email?.split('@')[0]})
            </NavLink>
          )}
        </nav>
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