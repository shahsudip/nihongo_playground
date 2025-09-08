import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_transparent.png'; // The logo is imported here

const LandingPage = () => {
  useEffect(() => {
    const container = document.getElementById('background-characters');
    if (!container) return;

    // Clear any existing characters
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    const chars = 'あいうえおかがきぎくぐけげこごさざしじすずせぜそぞただちぢつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもやゆよらりるれろわをん日月火水木金土一二三四五六七八九十百千万年人子女男学先南北東西京';
    const charCount = 100;

    for (let i = 0; i < charCount; i++) {
      const span = document.createElement('span');
      span.textContent = chars[Math.floor(Math.random() * chars.length)];
      span.style.left = `${Math.random() * 100}vw`;
      span.style.fontSize = `${1 + Math.random() * 2}rem`;
      span.style.animationDuration = `${15 + Math.random() * 20}s`;
      span.style.animationDelay = `${Math.random() * -30}s`;
      container.appendChild(span);
    }
  }, []);

  return (
    <div className="landing-page-wrapper">
      <div id="background-characters"></div>
      
      {/* --- This is the complete header section --- */}
      <header className="main-header">
        <div className="logo-container">
          {}
          <img src={logo} alt="Nihongo Playground Logo" className="logo-image" />
          <Link to="/" className="logo-title">Nihongo Playground</Link>
        </div>
        <nav className="main-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/levels" className="nav-link">Practice</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </nav>
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
          <Link to="/levels" className="start-quiz-button-new">
            クイズを始める！ (Start Quiz!)
          </Link>

        </div>
      </div>
    </div>
  );
};

export default LandingPage;