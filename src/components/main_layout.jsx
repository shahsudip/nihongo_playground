import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import logo from '../assets/logo_transparent.png';

const navLinks = [
  { to: '/levels',   label: 'Practice' },
  { to: '/books',    label: 'Books' },
  { to: '/profile',  label: 'Profile' },
];

const MainHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

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

  const activeCls = 'text-emerald-500 border-b-2 border-emerald-500 pb-1';
  const inactiveCls = 'text-[var(--color-text-secondary)] hover:text-emerald-400';

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[var(--color-bg-primary)]/90 backdrop-blur-md border-b border-[var(--color-border)] shadow-sm transition-all">
      <div className="w-full px-4 md:px-12 h-16 md:h-20 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
          <NavLink
            to="/"
            className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600 hover:opacity-80 transition-opacity"
          >
            Nihongo Playground
          </NavLink>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-[15px] font-medium transition-colors ${isActive ? activeCls : inactiveCls}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-lg hover:bg-[var(--color-bg-secondary)] transition-colors"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-[var(--color-text-primary)] rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[var(--color-text-primary)] rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[var(--color-text-primary)] rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        ref={menuRef}
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
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
        </nav>
      </div>
    </header>
  );
};

const MainLayout = () => (
  <>
    <MainHeader />
    <main className="content-overlay main-content-container">
      <Outlet />
    </main>
  </>
);

export default MainLayout;