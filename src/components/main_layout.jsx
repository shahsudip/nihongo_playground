import React from 'react';
import logo from '../assets/logo_transparent.png'; // Make sure your logo is in the assets folder

import { NavLink, Outlet } from 'react-router-dom'; 


const MainHeader = () => (
  <header className="main-header">
    <div className="logo-container">
      <img src={logo} alt="Nihongo Playground Logo" className="logo-image" />
      {/* This can remain a NavLink or Link, it points to home */}
      <NavLink to="/" className="logo-title">Nihongo Playground</NavLink>
    </div>
    <nav className="main-nav">
      {/* --- CHANGE THESE from <Link> to <NavLink> --- */}
      
      <NavLink to="/" className="nav-link">Home</NavLink>
      <NavLink to="/levels" className="nav-link">Practice</NavLink>
      <NavLink to="/profile" className="nav-link">Profile</NavLink>
      
    </nav>
  </header>
);

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