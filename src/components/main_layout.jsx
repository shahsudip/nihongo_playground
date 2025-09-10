import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the authentication context
import logo from '../assets/logo_transparent.png'; // Using your specified logo path

const MainHeader = () => {
  // Get the current user and logout function from our Auth context
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // This function handles the logout process
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirect to the login page after a successful logout
    } catch (error) {
      console.error("Failed to log out", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <header className="main-header">
      <div className="logo-container">
        <img src={logo} alt="Nihongo Playground Logo" className="logo-image" />
        <NavLink to="/" className="logo-title">Nihongo Playground</NavLink>
      </div>
      <nav className="main-nav">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/levels" className="nav-link">Practice</NavLink>
        
        {/* --- This is the new logic --- */}
        {/* Only show the Profile link if a user is logged in */}
        {currentUser && <NavLink to="/profile" className="nav-link">Profile</NavLink>}
        
        {/* Show a "Logout" button if logged in, or a "Login" button if not */}
        {currentUser ? (
          <button onClick={handleLogout} className="nav-button">Logout</button>
        ) : (
          <NavLink to="/login" className="nav-button">Login</NavLink>
        )}
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