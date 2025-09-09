import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import JapaneseText from '../components/JapaneseText';
import { quizData as staticQuizData } from '../data/quiz_data.js';

// Helper function to parse the comma-separated text
const parseCsvToQuizContent = (csvText) => {
  if (!csvText) return [];
  return csvText.split('\n').slice(1).map(line => line.trim()).filter(line => line)
    .map(line => {
      const [meaning, kanji, hiragana] = line.split(',');
      return { kanji: kanji || '', hiragana: hiragana || '', meaning: meaning || '' };
    });
};

const ProfilePage = () => {
  const [history, setHistory] = useState([]);
  const [customQuizzes, setCustomQuizzes] = useState([]);
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [newQuizTag, setNewQuizTag] = useState('vocabulary');
  const [csvText, setCsvText] = useState('');
  const [activeFilter, setActiveFilter] = useState('mastered');

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
    const savedQuizzes = JSON.parse(localStorage.getItem('customQuizzes')) || [];
    setHistory([...savedHistory].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    setCustomQuizzes(savedQuizzes);
  }, []);

  const handleCreateQuiz = () => {
    if (!newQuizTitle.trim() || !csvText.trim()) {
      alert('Please provide a title and paste your vocabulary list.');
      return;
    }
    const quizContent = parseCsvToQuizContent(csvText);
    if (quizContent.length === 0) {
      alert('Could not parse any questions. Please check the format.');
      return;
    }
    const newQuiz = {
      id: `custom-${Date.now()}`,
      title: newQuizTitle,
      tag: newQuizTag,
      quiz_content: quizContent,
    };
    const updatedQuizzes = [...customQuizzes, newQuiz];
    setCustomQuizzes(updatedQuizzes);
    localStorage.setItem('customQuizzes', JSON.stringify(updatedQuizzes));
    setNewQuizTitle('');
    setCsvText('');
  };
  
  const filteredList = useMemo(() => {
    if (activeFilter === 'mastered') {
      return history.filter(item => item.score === item.total);
    }
    if (activeFilter === 'incomplete') {
      return history.filter(item => item.score < item.total);
    }
    if (activeFilter === 'unattended') {
      const allPossibleQuizzes = [];
      Object.keys(staticQuizData).forEach(level => {
        Object.keys(staticQuizData[level]).forEach(category => {
          Object.keys(staticQuizData[level][category]).forEach(difficulty => {
            allPossibleQuizzes.push({
              id: `${level}-${category}-${difficulty}`,
              title: staticQuizData[level][category][difficulty].title,
              level, category, difficulty
            });
          });
        });
      });
      customQuizzes.forEach(quiz => {
        allPossibleQuizzes.push({
          id: quiz.id,
          title: quiz.title,
          level: quiz.id,
          category: quiz.tag,
          difficulty: 'custom'
        });
      });
      const completedQuizIds = new Set(history.map(item => {
        if (item.level.startsWith('custom-')) return item.level;
        return `${item.level}-${item.category}-${item.difficulty}`;
      }));
      return allPossibleQuizzes.filter(quiz => !completedQuizIds.has(quiz.id));
    }
    return [];
  }, [history, customQuizzes, activeFilter]);

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Dashboard</h1>
      <div className="profile-grid-container">
        <div className="profile-main-content">
          <div className="profile-section">
            <h2 className="profile-subtitle">Create a New Quiz</h2>
            <div className="creator-form-inline">
              <input 
                type="text" 
                value={newQuizTitle} 
                onChange={(e) => setNewQuizTitle(e.target.value)} 
                placeholder="Enter Quiz Title (e.g., Chapter 1 Vocab)" 
              />
              <div className="tag-selector">
                <button className={`tag-button ${newQuizTag === 'vocabulary' ? 'active' : ''}`} onClick={() => setNewQuizTag('vocabulary')}>
                  <JapaneseText>語彙</JapaneseText> (Vocab)
                </button>
                <button className={`tag-button ${newQuizTag === 'kanji' ? 'active' : ''}`} onClick={() => setNewQuizTag('kanji')}>
                  <JapaneseText>漢字</JapaneseText> (Kanji)
                </button>
              </div>
              <textarea 
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                placeholder="Paste your list here...&#10;Format: English Meaning,Kanji,Hiragana"
                rows="8"
              ></textarea>
              <button onClick={handleCreateQuiz} className="action-button next-level create-button">
                Create and Save Quiz
              </button>
            </div>
          </div>
          <div className="profile-section">
            <h2 className="profile-subtitle">My Custom Quizzes</h2>
            {customQuizzes.length === 0 ? (
              <p className="empty-state-text">Your created quizzes will appear here.</p>
            ) : (
              <div className="history-list">
                {customQuizzes.map((quiz) => {
                  const creationDate = new Date(parseInt(quiz.id.split('-')[1])).toLocaleDateString();
                  return (
                    <div key={quiz.id} className="history-item custom-quiz-card">
                      <p className="custom-quiz-date">{creationDate}</p>
                      <h3 className="custom-quiz-title">{quiz.title}</h3>
                      <div className="custom-quiz-meta">
                        <span className={`meta-tag tag-${quiz.tag}`}>{quiz.tag}</span>
                        <span className="meta-count">{quiz.quiz_content?.length || 0} terms</span>
                      </div>
                      <div className="custom-quiz-actions">
                        <Link to={`/quiz/${quiz.id}/${quiz.tag}`} className="action-button next-level">Start Quiz</Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="profile-sidebar">
          <div className="profile-section">
            <h2 className="profile-subtitle">Quiz Status</h2>
            <div className="filter-tabs">
              <button onClick={() => setActiveFilter('mastered')} className={activeFilter === 'mastered' ? 'active' : ''}>Mastered</button>
              <button onClick={() => setActiveFilter('incomplete')} className={activeFilter === 'incomplete' ? 'active' : ''}>Incomplete</button>
              <button onClick={() => setActiveFilter('unattended')} className={activeFilter === 'unattended' ? 'active' : ''}>Unattended</button>
            </div>
            {filteredList.length === 0 ? (
              <div className="no-history-card">
                <p className="empty-state-text">No quizzes match this filter.</p>
                {history.length === 0 && activeFilter !== 'unattended' && <Link to="/levels" className="action-button next-level">Start a Quiz!</Link>}
              </div>
            ) : (
              <div className="history-list">
                {filteredList.map((item) => (
                  activeFilter === 'unattended' ? (
                    <div key={item.id} className="history-item unattended-item">
                       <h3>{item.title}</h3>
                       <Link to={`/quiz/${item.level}/${item.category}`} className="action-button next-level">Start Quiz</Link>
                    </div>
                  ) : (
                    <div key={item.id} className="history-item">
                      <div className="history-item-header">
                        <h3>{item?.level?.toUpperCase()} - {item?.category} ({item?.difficulty})</h3>
                        <span className="history-item-date">{new Date(item.timestamp).toLocaleDateString()}</span>
                      </div>
                      <div className="history-item-body">
                        <p>Score: <strong>{item?.score} / {item?.total}</strong></p>
                        <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: `${item.total > 0 ? (item.score / item.total) * 100 : 0}%` }}></div></div>
                      </div>
                      {! (item.score === item.total) && (
                        <div className="history-item-actions">
                          <Link to={`/quiz/${item.level}/${item.category}`} className="action-button restart">Retry Quiz</Link>
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;