import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

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
  
  // --- NEW: State for the history filter ---
  const [activeFilter, setActiveFilter] = useState('all');

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
  
  // --- NEW: Memoized filtering logic for quiz history ---
  const filteredHistory = useMemo(() => {
    switch (activeFilter) {
      case 'mastered':
        return history.filter(item => item.score === item.total);
      case 'incomplete':
        return history.filter(item => item.score > 0 && item.score < item.total);
      case 'incorrect':
        return history.filter(item => item.score === 0);
      case 'all':
      default:
        return history;
    }
  }, [history, activeFilter]);

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Dashboard</h1>
      <div className="profile-grid-container">

        <div className="profile-main-content">
          <div className="profile-section">
            <h2 className="profile-subtitle">Create a New Quiz</h2>
            <div className="creator-form-inline">{/* ... Creator Form JSX ... */}</div>
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
            <h2 className="profile-subtitle">Recent Quiz History</h2>
            
            {/* --- NEW: Filter Tabs --- */}
            <div className="filter-tabs">
              <button onClick={() => setActiveFilter('all')} className={activeFilter === 'all' ? 'active' : ''}>All</button>
              <button onClick={() => setActiveFilter('mastered')} className={activeFilter === 'mastered' ? 'active' : ''}>Mastered</button>
              <button onClick={() => setActiveFilter('incomplete')} className={activeFilter === 'incomplete' ? 'active' : ''}>Incomplete</button>
              <button onClick={() => setActiveFilter('incorrect')} className={activeFilter === 'incorrect' ? 'active' : ''}>Incorrect</button>
            </div>
            
            {filteredHistory.length === 0 ? (
              <div className="no-history-card">
                <p className="empty-state-text">No quiz results for this filter.</p>
                {history.length === 0 && <Link to="/levels" className="action-button next-level">Start a Quiz!</Link>}
              </div>
            ) : (
              <div className="history-list">
                {filteredHistory.map((item) => {
                  const isMastered = item.score === item.total;
                  return (
                    <div key={item.id} className="history-item">
                      <div className="history-item-header">
                        <h3>{item?.level?.toUpperCase()} - {item?.category} ({item?.difficulty})</h3>
                        <span className="history-item-date">{new Date(item.timestamp).toLocaleDateString()}</span>
                      </div>
                      <div className="history-item-body">
                        <p>Score: <strong>{item?.score} / {item?.total}</strong></p>
                        <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: `${item.total > 0 ? (item.score / item.total) * 100 : 0}%` }}></div></div>
                      </div>
                      {/* --- NEW: Conditional Retry Button --- */}
                      {!isMastered && (
                        <div className="history-item-actions">
                          <Link to={`/quiz/${item.level}/${item.category}`} className="action-button restart">Retry Quiz</Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;