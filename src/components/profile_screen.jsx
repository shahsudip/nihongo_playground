import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { collection, query, getDocs, addDoc, doc, deleteDoc, orderBy } from 'firebase/firestore';
import { formatDateTime } from '../utils/formatters.jsx';
import LoadingSpinner from '../utils/loading_spinner.jsx';

// --- UPDATED HELPER FUNCTION ---
// This function now intelligently detects and handles the presence of a header row.
const parseCsvToQuizContent = (csvText, quizType) => {
  if (!csvText) return [];

  // Clean up lines and remove any empty ones
  const lines = csvText.split('\n').map(line => line.trim()).filter(line => line);
  if (lines.length === 0) return [];

  // Check if the first line looks like a header (case-insensitive)
  const firstLine = lines[0].toLowerCase();
  const hasHeader = firstLine.includes('hiragana') || firstLine.includes('meaning') || firstLine.includes('kanji');
  
  // If a header is found, process all lines after it. Otherwise, process all lines.
  const dataLines = hasHeader ? lines.slice(1) : lines;

  return dataLines.map(line => {
      const [hiragana, meaning, kanji] = line.split(',').map(s => s.trim());
      // For vocabulary, kanji is optional
      if (quizType === 'vocabulary') {
        return { kanji: kanji || '', hiragana: hiragana || '', meaning: meaning || '' };
      }
      return { kanji: kanji || '', hiragana: hiragana || '', meaning: meaning || '' };
    });
};


const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // --- State Management ---
  const [standardQuizzes, setStandardQuizzes] = useState([]);
  const [customQuizzes, setCustomQuizzes] = useState([]);
  const [quizHistory, setQuizHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [newQuizTag, setNewQuizTag] = useState('vocabulary');
  const [csvText, setCsvText] = useState(''); // Start with an empty textarea
  const [activeFilter, setActiveFilter] = useState('mastered');

  // --- Data Fetching for the Logged-in User ---
  useEffect(() => {
    if (!currentUser) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 1. Fetch all standard quizzes (for the 'unattended' list)
        const standardQuizzesQuery = query(collection(db, 'quizzes'));
        const standardQuizzesSnapshot = await getDocs(standardQuizzesQuery);
        const standardQuizzesData = standardQuizzesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setStandardQuizzes(standardQuizzesData);
        
        // 2. Fetch user-specific custom quizzes
        const customQuizzesQuery = query(collection(db, 'users', currentUser.uid, 'customQuizzes'), orderBy('createdAt', 'desc'));
        const customQuizzesSnapshot = await getDocs(customQuizzesQuery);
        const customQuizzesData = customQuizzesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setCustomQuizzes(customQuizzesData);
        
        // 3. Fetch user-specific quiz history
        const historyQuery = query(collection(db, 'users', currentUser.uid, 'quizHistory'));
        const historySnapshot = await getDocs(historyQuery);
        const historyData = historySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setQuizHistory(historyData);
        
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentUser]);


  // --- Event Handlers ---
  const handleCreateQuiz = async () => {
    if (!currentUser) { alert("You must be logged in to create a quiz."); return; }
    if (!newQuizTitle.trim() || !csvText.trim()) { alert('Please provide a title and paste your vocabulary list.'); return; }
    
    const quizContent = parseCsvToQuizContent(csvText, newQuizTag);
    if (quizContent.length === 0) { alert('Could not parse any questions. Please check the format.'); return; }

    try {
      const newQuizData = {
        title: newQuizTitle,
        tag: newQuizTag,
        quiz_content: quizContent,
        createdAt: new Date().toISOString(),
        userId: currentUser.uid,
      };
      const userQuizzesColRef = collection(db, 'users', currentUser.uid, 'customQuizzes');
      // No need to await if we optimistically update the UI
      addDoc(userQuizzesColRef, newQuizData);
      
      // Optimistic UI update
      const tempId = `temp-${Date.now()}`;
      setCustomQuizzes(prevQuizzes => [{...newQuizData, id: tempId}, ...prevQuizzes]);

      setNewQuizTitle('');
      setCsvText('');

    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Failed to create quiz.");
      // Revert optimistic update on error if needed
    }
  };

  const handleDeleteQuiz = async (quizIdToDelete) => {
    if (!currentUser) { alert("You must be logged in to delete a quiz."); return; }
    if (!window.confirm("Are you sure you want to delete this quiz? This cannot be undone.")) return;
    try {
      // Optimistic UI update
      setCustomQuizzes(prevQuizzes => prevQuizzes.filter(q => q.id !== quizIdToDelete));
      await deleteDoc(doc(db, 'users', currentUser.uid, 'customQuizzes', quizIdToDelete));
    } catch (error) {
      console.error("Error deleting quiz:", error);
      alert("Failed to delete quiz.");
      // Revert optimistic update on error if needed
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
      alert("Failed to log out.");
    }
  };

  // --- Memoized Filtering Logic ---
  const filteredList = useMemo(() => {
    const historyMap = new Map(quizHistory.map(h => [h.quizId, h]));

    if (activeFilter === 'unattended') {
      const standardUnattended = standardQuizzes.filter(q => !historyMap.has(q.id));
      const customUnattended = customQuizzes.filter(q => !historyMap.has(q.id));
      return [...standardUnattended, ...customUnattended];
    }
    
    const attendedQuizzes = quizHistory.map(historyItem => {
      let baseQuiz = standardQuizzes.find(q => q.id === historyItem.quizId) || customQuizzes.find(q => q.id === historyItem.quizId);
      return baseQuiz ? { ...baseQuiz, latestResult: historyItem } : null;
    }).filter(Boolean);

    if (activeFilter === 'mastered') {
      return attendedQuizzes.filter(item => item.latestResult.status === 'completed');
    }
    if (activeFilter === 'incomplete') {
      return attendedQuizzes.filter(item => item.latestResult.status === 'incomplete');
    }
    return [];
  }, [quizHistory, standardQuizzes, customQuizzes, activeFilter]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Welcome, {currentUser?.displayName || 'Student'}!</h1>
      <div className="profile-grid-container">
        <div className="profile-main-content">
          <div className="profile-section">
            <h2 className="profile-subtitle">Create a New Quiz</h2>
            <div className="creator-form-inline">
              <input type="text" value={newQuizTitle} onChange={(e) => setNewQuizTitle(e.target.value)} placeholder="Enter Quiz Title (e.g., Chapter 1 Vocab)" />
              <div className="tag-selector">
                <button className={`tag-button ${newQuizTag === 'vocabulary' ? 'active' : ''}`} onClick={() => setNewQuizTag('vocabulary')}>(Vocab)</button>
                <button className={`tag-button ${newQuizTag === 'kanji' ? 'active' : ''}`} onClick={() => setNewQuizTag('kanji')}>(Kanji)</button>
              </div>
              <textarea value={csvText} onChange={(e) => setCsvText(e.target.value)} placeholder="Paste your list here...&#10;Format: Hiragana,Meaning,Kanji (Header is optional)" rows="8"></textarea>
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
                  const historyRecord = quizHistory.find(h => h.quizId === quiz.id);
                  const status = historyRecord?.status || 'unattended';
                  const quizLink = `/quiz/${quiz.id}/${quiz.tag}`;
                  
                  return (
                    <div key={quiz.id} className="history-item custom-quiz-card">
                      <button onClick={() => handleDeleteQuiz(quiz.id)} className="delete-quiz-button" aria-label="Delete quiz">
                        <i className="material-icons" style={{ fontSize: '36px', color: 'red' }}>delete</i>
                      </button>
                      <div className="card-header">
                        <p className="custom-quiz-date">{formatDateTime(quiz.createdAt)}</p>
                        <span className={`status-badge status-${status}`}>{status}</span>
                      </div>
                      <h3 className="custom-quiz-title">{quiz.title}</h3>
                      <div className="custom-quiz-meta">
                        <span className={`meta-tag tag-${quiz.tag}`}>{quiz.tag}</span>
                        <span className="meta-count">{quiz.quiz_content?.length || 0} questions</span>
                      </div>
                      <div className="custom-quiz-actions">
                        <Link to={quizLink} className="action-button next-level">Start Quiz</Link>
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
              <button onClick={() => setActiveFilter('mastered')} className={`filter-mastered ${activeFilter === 'mastered' ? 'active' : ''}`}>Mastered</button>
              <button onClick={() => setActiveFilter('incomplete')} className={`filter-incomplete ${activeFilter === 'incomplete' ? 'active' : ''}`}>Incomplete</button>
              <button onClick={() => setActiveFilter('unattended')} className={`filter-unattended ${activeFilter === 'unattended' ? 'active' : ''}`}>Unattended</button>
            </div>
            {filteredList.length === 0 ? (
              <div className="no-history-card"><p className="empty-state-text">No quizzes match this filter.</p></div>
            ) : (
              <div className="history-list">
                {filteredList.map((item) => {
                  const itemLink = item.userId ? `/quiz/${item.id}/${item.tag}` : `/quiz/${item.level}/${item.category}`;
                  return activeFilter === 'unattended' ? (
                    <div key={item.id} className="history-item unattended-item">
                      <h3>{item.title}</h3>
                      <Link to={itemLink} className="action-button next-level">Start Quiz</Link>
                    </div>
                  ) : (
                    <div key={item.id} className="history-item">
                      <div className="history-item-header">
                        <h3>{item.title}</h3>
                        <span className="history-item-date">{formatDateTime(item.latestResult.timestamp)}</span>
                      </div>
                      <div className="history-item-body">
                        <p>Score: <strong>{item.latestResult.score} / {item.latestResult.total}</strong></p>
                        <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: `${item.latestResult.total > 0 ? (item.latestResult.score / item.latestResult.total) * 100 : 0}%` }}></div></div>
                      </div>
                      {item.latestResult.status !== 'completed' && (
                        <div className="history-item-actions">
                          <Link to={itemLink} className="action-button restart">Retry Quiz</Link>
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
      <div className="profile-logout-section">
        <button onClick={handleLogout} className="action-button home logout-button">Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;