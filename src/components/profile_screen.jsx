import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import JapaneseText from '../components/JapaneseText.jsx';
import { useQuizManager } from '../hooks/useQuizManager.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore';

// Helper function to parse the comma-separated text from the textarea
const parseCsvToQuizContent = (csvText) => {
  if (!csvText) return [];
  return csvText.split('\n').slice(1).map(line => line.trim()).filter(line => line)
    .map(line => {
      const [hiragana, english, kanji] = line.split(',');
      return { kanji: kanji || '', hiragana: hiragana || '', meaning: meaning || '' };
    });
};

const ProfilePage = () => {
  // This hook is now the single source of truth for all quiz data and statuses.
  const { allQuizzes, isLoading } = useQuizManager();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // State for the "Create Quiz" form
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [newQuizTag, setNewQuizTag] = useState('vocabulary');
  const [csvText, setCsvText] = useState('');
  
  // State for the sidebar filter
  const [activeFilter, setActiveFilter] = useState('mastered');

  // Function to save a new custom quiz to Firestore
  const handleCreateQuiz = async () => {
    if (!currentUser) { alert("You must be logged in to create a quiz."); return; }
    if (!newQuizTitle.trim() || !csvText.trim()) { alert('Please provide a title and paste your vocabulary list.'); return; }
    
    const quizContent = parseCsvToQuizContent(csvText);
    if (quizContent.length === 0) { alert('Could not parse any questions. Please check the format.'); return; }
    
    try {
      const newQuizData = {
        title: newQuizTitle,
        tag: newQuizTag,
        quiz_content: quizContent,
        createdAt: new Date().toISOString(),
        userId: currentUser.uid,
        status: 'unattended', // Initial status is always unattended
      };
      const userQuizzesColRef = collection(db, 'users', currentUser.uid, 'customQuizzes');
      await addDoc(userQuizzesColRef, newQuizData);
      // Clear the form on successful creation. The real-time listener will update the list automatically.
      setNewQuizTitle('');
      setCsvText('');
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Failed to create quiz.");
    }
  };

  // Function to delete a custom quiz from Firestore
  const handleDeleteQuiz = async (quizIdToDelete) => {
    if (!currentUser) { alert("You must be logged in to delete a quiz."); return; }
    if (!window.confirm("Are you sure you want to delete this quiz? This cannot be undone.")) return;

    try {
      const quizDocRef = doc(db, 'users', currentUser.uid, 'customQuizzes', quizIdToDelete);
      await deleteDoc(quizDocRef);
      // The real-time listener will automatically remove the quiz from the view.
    } catch (error) {
      console.error("Error deleting quiz:", error);
      alert("Failed to delete quiz.");
    }
  };
  
  // Function to handle logging out
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
      alert("Failed to log out.");
    }
  };
  
  // Memoized logic to filter the main list for the sidebar
  const filteredList = useMemo(() => {
    if (isLoading) return [];
    if (activeFilter === 'unattended') {
      return allQuizzes.filter(q => q.status === 'unattended');
    }
    const historyQuizzes = allQuizzes.filter(q => q.status !== 'unattended');
    if (activeFilter === 'mastered') {
      return historyQuizzes.filter(item => item.status === 'mastered');
    }
    if (activeFilter === 'incomplete') {
      return historyQuizzes.filter(item => item.status === 'incomplete');
    }
    return [];
  }, [allQuizzes, activeFilter, isLoading]);

  // Memoized logic to get only the custom quizzes for the main content area
  const customQuizzes = useMemo(() => allQuizzes.filter(q => q.type === 'custom'), [allQuizzes]);

  return (
    <div className="profile-container">
      <h1 className="profile-title">
        Welcome, {currentUser?.displayName || 'Student'}!
      </h1>
      <div className="profile-grid-container">
        <div className="profile-main-content">
          <div className="profile-section">
            <h2 className="profile-subtitle">Create a New Quiz</h2>
            <div className="creator-form-inline">
              <input type="text" value={newQuizTitle} onChange={(e) => setNewQuizTitle(e.target.value)} placeholder="Enter Quiz Title (e.g., Chapter 1 Vocab)" />
              <div className="tag-selector">
                <button className={`tag-button ${newQuizTag === 'vocabulary' ? 'active' : ''}`} onClick={() => setNewQuizTag('vocabulary')}><JapaneseText>Œêœb</JapaneseText> (Vocab)</button>
                <button className={`tag-button ${newQuizTag === 'kanji' ? 'active' : ''}`} onClick={() => setNewQuizTag('kanji')}><JapaneseText>Š¿Žš</JapaneseText> (Kanji)</button>
              </div>
              <textarea value={csvText} onChange={(e) => setCsvText(e.target.value)} placeholder="Paste your list here...&#10;Format: English Meaning,Kanji,Hiragana" rows="8"></textarea>
              <button onClick={handleCreateQuiz} className="action-button next-level create-button">Create and Save Quiz</button>
            </div>
          </div>
          <div className="profile-section">
            <h2 className="profile-subtitle">My Custom Quizzes</h2>
            {isLoading ? <p className="empty-state-text">Loading quizzes...</p> : (
              customQuizzes.length === 0 ? (
                <p className="empty-state-text">Your created quizzes will appear here.</p>
              ) : (
                <div className="history-list">
                  {customQuizzes.map((quiz) => {
                    const creationDate = new Date(quiz.createdAt).toLocaleDateString();
                    return (
                      <div key={quiz.uniqueId} className="history-item custom-quiz-card">
                        <button onClick={() => handleDeleteQuiz(quiz.uniqueId)} className="delete-quiz-button" aria-label="Delete quiz">??</button>
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
              )
            )}
          </div>
        </div>
        <div className="profile-sidebar">
          <div className="profile-section">
            <h2 className="profile-subtitle">Quiz Status</h2>
            <div className="filter-tabs">
              <button onClick={() => setActiveFilter('mastered')} className={`filter-mastered ${activeFilter === 'mastered' ? 'active' : ''}`}>Mastered</button>
              <button onClick={() => setActiveFilter('incomplete')} className={`filter-incomplete ${activeFilter === 'incomplete' ? 'active' : ''}`}>Incomplete</button>
              <button onClick={() => setActiveFilter('unattended')} className={`filter-unattended ${activeFilter === 'unattended' ? 'active' : ''}`}>Unattended</button>
            </div>
            {isLoading ? <p className="empty-state-text">Loading...</p> : (
              filteredList.length === 0 ? (
                <div className="no-history-card"><p className="empty-state-text">No quizzes match this filter.</p></div>
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
                          <span className="history-item-date">{new Date(item.latestResult.timestamp).toLocaleDateString()}</span>
                        </div>
                        <div className="history-item-body">
                          <p>Score: <strong>{item.latestResult.score} / {item.latestResult.total}</strong></p>
                          <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: `${item.latestResult.total > 0 ? (item.latestResult.score / item.latestResult.total) * 100 : 0}%` }}></div></div>
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
      <div className="profile-logout-section">
        <button onClick={handleLogout} className="action-button home logout-button">Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;

