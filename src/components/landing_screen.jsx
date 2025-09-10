import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import logo from '../assets/logo_transparent.png';

const LandingPage = () => {
  const { loginWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate('/levels');
    }
  }, [currentUser, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Failed to log in with Google", error);
      alert("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="landing-page-wrapper">
      <div id="background-characters"></div>
      <header className="main-header">
        <div className="logo-container">
          <img src={logo} alt="Nihongo Playground Logo" className="logo-image" />
          <h1 className="logo-title">Nihongo Playground</h1>
        </div>
      </header>
      <div className="content-overlay expressive-content">
        <h1 className="expressive-title">
          <span>Master</span>
          <span>Japanese,</span>
          <span>One Quiz</span>
          <span>at a Time.</span>
        </h1>
        <p className="expressive-subtitle">
          From essential Kana to complex Kanji, your personal dojo for mastering the Japanese language awaits.
        </p>
        <div className="home-actions">
          <button onClick={handleGoogleSignIn} className="start-quiz-button-new google-signin">
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
