import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  // The animation useEffect from the previous example can be added back here if desired
  return (
    <div className="landing-page-wrapper">
      <div id="background-characters"></div> {/* Container for animated background */}
      <div className="content-overlay">
        <header className="hero-section-new">
          <h1 className="hero-title-new">日本語チャレンジ 🇯🇵</h1>
          <p className="hero-subtitle-new">Master Japanese, One Question at a Time.</p>
          <Link to="/levels" className="start-quiz-button-new">
            Nihongo Playground (Start Quiz!)
          </Link>
            <Link to="/profile" className="profile-button-home">
              View Profile
            </Link>
        </header>
      </div>
    </div>
  );
};

export default LandingPage;