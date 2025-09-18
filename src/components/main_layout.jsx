import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo_transparent.png'; // Using your specified logo path

const MainHeader = () => {
  // Get the current user and logout function from our Auth context
  const navigate = useNavigate();


  return (
    <header className="main-header">
      <div className="logo-container">
        <img src={logo} alt="Nihongo Playground Logo" className="logo-image" />
        <NavLink to="/" className="logo-title">Nihongo Playground</NavLink>
      </div>
      <nav className="main-nav">
        <NavLink to="/levels" className="nav-link">Practice</NavLink>
        {<NavLink to="/profile" className="nav-link">Profile</NavLink>}
        
      </nav>
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