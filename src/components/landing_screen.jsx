import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  useEffect(() => {
    const container = document.getElementById('background-characters');
    if (!container) return;

    // Clear any existing characters
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    const chars = '縺ゅ＞縺�縺医♀縺九′縺阪℃縺上＄縺代￡縺薙＃縺輔＊縺励§縺吶★縺帙●縺昴◇縺溘□縺｡縺｢縺､縺･縺ｦ縺ｧ縺ｨ縺ｩ縺ｪ縺ｫ縺ｬ縺ｭ縺ｮ縺ｯ縺ｰ縺ｱ縺ｲ縺ｳ縺ｴ縺ｵ縺ｶ縺ｷ縺ｸ縺ｹ縺ｺ縺ｻ縺ｼ縺ｽ縺ｾ縺ｿ繧繧√ｂ繧�繧�繧医ｉ繧翫ｋ繧後ｍ繧上ｒ繧捺律譛育↓豌ｴ譛ｨ驥大悄荳莠御ｸ牙屁莠泌�ｭ荳�蜈ｫ荵晏香逋ｾ蜊�荳�蟷ｴ莠ｺ蟄仙･ｳ逕ｷ蟄ｦ蜈亥漉蛹玲擲隘ｿ莠ｬ';
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
            繧ｯ繧､繧ｺ繧貞ｧ九ａ繧具ｼ� (Start Quiz!)
          </Link>

        </div>
      </div>
    </div>
  );
};

export default LandingPage;