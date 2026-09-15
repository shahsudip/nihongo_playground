import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext.jsx';

const N3PracticeSetsListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const isFromProfile = location.state?.from === 'profile';
  const [practiceSetsBook, setPracticeSetsBook] = useState(null);
  const [userHistory, setUserHistory] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBookAndHistory = async () => {
      try {
        const docRef = doc(db, 'books', 'jlpt-n3-practice-sets');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPracticeSetsBook(docSnap.data());
        } else {
          console.error("No such document!");
        }

        if (currentUser) {
          const historyColRef = collection(db, 'users', currentUser.uid, 'quizHistory');
          const historySnap = await getDocs(historyColRef);
          const historyMap = {};
          historySnap.forEach(d => {
            const data = d.data();
            const qid = data.quizId || d.id;
            if (qid.startsWith('jlpt-n3-practice-sets')) {
              historyMap[qid] = data;
            }
          });
          setUserHistory(historyMap);
        }
      } catch (err) {
        console.error("Error fetching book or history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookAndHistory();
  }, [currentUser]);

  const totalSets = practiceSetsBook?.sets?.length || 15;

  const completedSetsCount = useMemo(() => {
    if (!practiceSetsBook?.sets) return 0;
    let count = 0;
    practiceSetsBook.sets.forEach(set => {
      // Check if any matching history entry is mastered or completed
      const fullKey = `jlpt-n3-practice-sets-${set.id}`;
      const vocabKey = `jlpt-n3-practice-sets-${set.id}-vocabulary-kanji`;
      const grammarKey = `jlpt-n3-practice-sets-${set.id}-grammar`;
      const item = userHistory[fullKey] || userHistory[vocabKey] || userHistory[grammarKey];
      if (item && (item.status === 'mastered' || (item.total > 0 && item.score / item.total >= 0.8))) {
        count++;
      }
    });
    return count;
  }, [practiceSetsBook, userHistory]);

  const progressPercent = totalSets > 0 ? Math.round((completedSetsCount / totalSets) * 100) : 0;

  if (loading) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Loading N3 Chokuzen Taisaku Sets from Firebase...</div>;
  if (!practiceSetsBook) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Book not found in Firebase.</div>;

  return (
    <div className="practice-sets-container">
      <div className="practice-sets-header">
        {!isFromProfile && (
          <nav aria-label="Breadcrumb" className="ps-breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-sm">
              <li className="flex items-center">
                <Link to="/" className="breadcrumb-link">Home</Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2 breadcrumb-separator">/</span>
                <Link to="/books" className="breadcrumb-link">Books</Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2 breadcrumb-separator">/</span>
                <span className="breadcrumb-current">{practiceSetsBook.title || 'JLPT N3 Chokuzen Taisaku (15 Sets)'}</span>
              </li>
            </ol>
          </nav>
        )}
        
        <div className="practice-sets-progress-overview">
          <div className="progress-overview-bar">
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
          <div className="progress-overview-text">
            <strong>{completedSetsCount}/{totalSets}</strong> sets mastered ({progressPercent}%)
          </div>
        </div>
      </div>

      <h2 className="practice-sets-section-title">{totalSets} Chokuzen Taisaku Mock Exam Sets (N3)</h2>
      
      <div className="practice-sets-grid">
        {practiceSetsBook.sets.map((set) => {
          const fullKey = `jlpt-n3-practice-sets-${set.id}`;
          const vocabKey = `jlpt-n3-practice-sets-${set.id}-vocabulary-kanji`;
          const grammarKey = `jlpt-n3-practice-sets-${set.id}-grammar`;
          const historyItem = userHistory[fullKey] || userHistory[vocabKey] || userHistory[grammarKey];
          
          const isMastered = historyItem && (historyItem.status === 'mastered' || (historyItem.total > 0 && historyItem.score / historyItem.total >= 0.8));
          const isAttempted = Boolean(historyItem);
          
          const vocabKanjiQ = set.sections['vocabulary-kanji']?.questions?.length || 0;
          const grammarReadingQ = set.sections['grammar-reading']?.questions?.length || 0;
          const totalQ = vocabKanjiQ + grammarReadingQ;

          return (
            <Link 
              to={`/practice-sets/${set.id}`} 
              key={set.id}
              className={`practice-set-card ${isMastered ? 'border-emerald-500/40' : ''}`}
            >
              <div className="set-card-top">
                <div className="set-card-icon">
                  {isMastered ? '🏆' : isAttempted ? '📝' : '📚'}
                </div>
                <div className="flex items-center gap-2">
                  {historyItem && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isMastered ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'}`}>
                      {historyItem.score}/{historyItem.total} ({Math.round((historyItem.score / historyItem.total) * 100)}%)
                    </span>
                  )}
                  <div className="set-card-questions-badge">
                    {totalQ} Questions
                  </div>
                </div>
              </div>
              
              <div className="set-card-body">
                <h3 className="set-card-title">{set.title}</h3>
                <p className="set-card-subtitle">{set.description}</p>
                
                <div className="set-card-sections">
                  {vocabKanjiQ > 0 && (
                    <div className="set-card-section-row">
                      <div className="section-dot vocabulary"></div>
                      <span>Vocabulary & Kanji ({vocabKanjiQ})</span>
                    </div>
                  )}
                  {grammarReadingQ > 0 && (
                    <div className="set-card-section-row">
                      <div className="section-dot grammar"></div>
                      <span>Grammar & Reading ({grammarReadingQ})</span>
                    </div>
                  )}
                </div>
                
                <div className="set-card-action">
                  <span className={`set-card-start-btn ${isMastered ? 'completed' : ''}`}>
                    {isMastered ? 'Review Set' : isAttempted ? 'Continue Practice' : 'Start Set'} &rarr;
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default N3PracticeSetsListPage;
