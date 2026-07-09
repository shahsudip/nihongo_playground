import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo_transparent.png'; // Using your specified logo path

const MainHeader = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[var(--color-bg-primary)]/80 backdrop-blur-md border-b border-[var(--color-border)] shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Nihongo Playground Logo" className="w-10 h-10 object-contain" />
          <NavLink to="/" className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600 hover:opacity-80 transition-opacity">
            Nihongo Playground
          </NavLink>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/levels" className={({isActive}) => `text-[15px] font-medium transition-colors ${isActive ? 'text-emerald-500 border-b-2 border-emerald-500 pb-1' : 'text-[var(--color-text-secondary)] hover:text-emerald-400'}`}>Practice</NavLink>
          <NavLink to="/books" className={({isActive}) => `text-[15px] font-medium transition-colors ${isActive ? 'text-emerald-500 border-b-2 border-emerald-500 pb-1' : 'text-[var(--color-text-secondary)] hover:text-emerald-400'}`}>Books</NavLink>
          <NavLink to="/profile" className={({isActive}) => `text-[15px] font-medium transition-colors ${isActive ? 'text-emerald-500 border-b-2 border-emerald-500 pb-1' : 'text-[var(--color-text-secondary)] hover:text-emerald-400'}`}>Profile</NavLink>
        </nav>
        {/* Mobile menu could go here */}
      </div>
    </header>
  );
};

const MainLayout = () => {
  return (
    <>
      <MainHeader />
      <main className="content-overlay main-content-container">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;