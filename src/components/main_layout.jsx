import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo_transparent.png';

const MainHeader = () => {
  return (
    <header className="main-header">
      <div className="logo-container">
        <img src={logo} alt="Nihongo Playground Logo" className="logo-image" />
        <NavLink to="/" className="logo-title">Nihongo Playground</NavLink>
      </div>
      <nav className="main-nav">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/levels" className="nav-link">Practice</NavLink>
        
      </nav>
    </header>
  );
};

const MainLayout = () => {
  return (
    <>
      <MainHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;