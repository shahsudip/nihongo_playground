import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import JapaneseText from '../components/JapaneseText.jsx';
import { useQuizManager } from '../hooks/use_quiz_manager.js';

const parseCsvToQuizContent = (csvText) => {
  if (!csvText) return [];
  return csvText.split('\n').slice(1).map(line => line.trim()).filter(line => line)
    .map(line => {
      const [meaning, kanji, hiragana] = line.split(',');
      return { kanji: kanji || '', hiragana: hiragana || '', meaning: meaning || '' };
    });
};

const ProfilePage = () => {
  const { allQuizzes, isLoading } = useQuizManager();
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [newQuizTag, setNewQuizTag] = useState('vocabulary');
  const [csvText, setCsvText] = useState('');
  const [activeFilter, setActiveFilter] = useState('mastered');

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
    const customQuizzes = JSON.parse(localStorage.getItem('customQuizzes')) || [];
    const updatedQuizzes = [...customQuizzes, newQuiz];
    localStorage.setItem('customQuizzes', JSON.stringify(updatedQuizzes));
    window.location.reload(); // Reload to see new quiz in the list
  };
  
  const filteredList = useMemo(() => {
    if (isLoading) return [];
    if (activeFilter === 'unattended') {
      return allQuizzes.filter(q => q.status === 'unattended');
    }
    // For mastered/incomplete, we only show quizzes that have a history record
    const historyQuizzes = allQuizzes.filter(q => q.status !== 'unattended');
    if (activeFilter === 'mastered') {
      return historyQuizzes.filter(item => item.status === 'mastered');
    }
    if (activeFilter === 'incomplete') {
      return historyQuizzes.filter(item => item.status === 'incomplete');
    }
    return [];
  }, [allQuizzes, activeFilter, isLoading]);

  const customQuizzes = useMemo(() => allQuizzes.filter(q => q.type === 'custom'), [allQuizzes]);

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Dashboard</h1>
      <div className="profile-grid-container">
        <div className="profile-main-content">
          <div className="profile-section">
            <h2 className="profile-subtitle">Create a New Quiz</h2>
            <div className="creator-form-inline">
              <input type="text" value={newQuizTitle} onChange={(e) => setNewQuizTitle(e.target.value)} placeholder="Enter Quiz Title (e.g., Chapter 1 Vocab)" />
              <div className="tag-selector">
                <button className={`tag-button ${newQuizTag === 'vocabulary' ? 'active' : ''}`} onClick={() => setNewQuizTag('vocabulary')}><JapaneseText>語彙</JapaneseText> (Vocab)</button>
                <button className={`tag-button ${newQuizTag === 'kanji' ? 'active' : ''}`} onClick={() => setNewQuizTag('kanji')}><JapaneseText>漢字</JapaneseText> (Kanji)</button>
              </div>
              <textarea value={csvText} onChange={(e) => setCsvText(e.target.value)} placeholder="Paste your list here...&#10;Format: English Meaning,Kanji,Hiragana" rows="8"></textarea>
              <button onClick={handleCreateQuiz} className="action-button next-level create-button">Create and Save Quiz</button>
            </div>
          </div>
          <div className="profile-section">
            <h2 className="profile-subtitle">My Custom Quizzes</h2>
            {customQuizzes.length === 0 ? (
              <p className="empty-state-text">Your created quizzes will appear here.</p>
            ) : (
              <div className="history-list">
                {customQuizzes.map((quiz) => {
                  const creationDate = new Date(parseInt(quiz.uniqueId.split('-')[1])).toLocaleDateString();
                  return (
                    <div key={quiz.uniqueId} className="history-item custom-quiz-card">
                      <div className="card-header">
                        <p className="custom-quiz-date">{creationDate}</p>
                        <span className={`status-badge status-${quiz.status}`}>{quiz.status}</span>
                      </div>
                      <h3 className="custom-quiz-title">{quiz.title}</h3>
                      <div className="custom-quiz-meta">
                        <span className={`meta-tag tag-${quiz.category}`}>{quiz.category}</span>
                        <span className="meta-count">{quiz.quiz_content?.length || 0} terms</span>
                      </div>
                      <div className="custom-quiz-actions">
                        <Link to={`/quiz/${quiz.level}/${quiz.category}`} className="action-button next-level">Start Quiz</Link>
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
            {isLoading ? <p className="empty-state-text">Loading...</p> : (
              filteredList.length === 0 ? (
                <div className="no-history-card">
                  <p className="empty-state-text">No quizzes match this filter.</p>
                </div>
              ) : (
                <div className="history-list">
                  {filteredList.map((item) => (
                    activeFilter === 'unattended' ? (
                      <div key={item.uniqueId} className="history-item unattended-item">
                         <h3>{item.title}</h3>
                         <Link to={`/quiz/${item.level}/${item.category}`} className="action-button next-level">Start Quiz</Link>
                      </div>
                    ) : (
                      <div key={item.uniqueId} className="history-item">
                        <div className="history-item-header">
                          <h3>{item.title}</h3>
                          <span className="history-item-date">{new Date(item.timestamp).toLocaleDateString()}</span>
                        </div>
                        <div className="history-item-body">
                          <p>Score: <strong>{item.score} / {item.total}</strong></p>
                          <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: `${item.total > 0 ? (item.score / item.total) * 100 : 0}%` }}></div></div>
                        </div>
                        {item.status !== 'mastered' && (
                          <div className="history-item-actions">
                            <Link to={`/quiz/${item.level}/${item.category}`} className="action-button restart">Retry Quiz</Link>
                          </div>
                        )}
                      </div>
                    )
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;