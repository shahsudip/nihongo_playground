import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/logo-green.png';

// This is the header we originally designed for the Landing Page
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

// This component wraps our pages
const MainLayout = () => {
  return (
    <>
      <MainHeader />
      {/* The <Outlet /> component from react-router will render the current page */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;