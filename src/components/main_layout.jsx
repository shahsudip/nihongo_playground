import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/logo_transparent.png'; // Make sure your logo is in the assets folder

// This is the header that will appear on every page within the layout
const MainHeader = () => (
  <header className="main-header">
    <div className="logo-container">
      <img src={logo} alt="Nihongo Playground Logo" className="logo-image" />
      <Link to="/" className="logo-title">Nihongo Playground</Link>
    </div>
    <nav className="main-nav">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/profile" className="nav-link">Profile</Link>
      <Link to="/levels" className="nav-link">Test</Link>
    </nav>
  </header>
);

// This is the layout component itself
const MainLayout = () => {
  return (
    <>
      <MainHeader />
      {/* The <Outlet /> is a placeholder from React Router. */}
      {/* It renders the current page's component (e.g., ProfilePage, QuizPage). */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;