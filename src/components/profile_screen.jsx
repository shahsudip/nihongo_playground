import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
    const savedQuizzes = JSON.parse(localStorage.getItem('customQuizzes')) || [];
    setHistory(savedHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
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

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile & Quizzes</h1>

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
               Vocab
            </button>
            <button className={`tag-button ${newQuizTag === 'kanji' ? 'active' : ''}`} onClick={() => setNewQuizTag('kanji')}>
            Kanji
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
            {customQuizzes.map((quiz) => (
              <div key={quiz.id} className="history-item custom-quiz-item">
                <div className="history-item-header">
                  <h3>{quiz.title}</h3>
                  <span className="history-item-tag">{quiz.tag}</span>
                </div>
                <div className="history-item-body">
                  <p>{quiz.quiz_content.length} terms</p>
                  <Link to={`/quiz/${quiz.id}/${quiz.tag}`} className="action-button restart">
                    Start Quiz
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="profile-section">
        <h2 className="profile-subtitle">Recent Quiz History</h2>
        {history.length === 0 ? (
          <p className="empty-state-text">Your completed quiz scores will appear here.</p>
        ) : (
          <div className="history-list">
            {history.map((item) => (
              <div key={item.id} className="history-item">
                <div className="history-item-header">
                  <h3>{item?.level?.toUpperCase()} - {item?.category} ({item?.difficulty})</h3>
                  <span className="history-item-date">{new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
                <div className="history-item-body">
                  <p>Score: <strong>{item?.score} / {item?.total}</strong></p>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${item.total > 0 ? (item.score / item.total) * 100 : 0}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;