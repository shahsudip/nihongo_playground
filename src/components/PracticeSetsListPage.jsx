import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';

const PracticeSetsListPage = () => {
  const navigate = useNavigate();
  const [practiceSetsBook, setPracticeSetsBook] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const docRef = doc(db, 'books', 'jlpt-n3-practice-sets');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPracticeSetsBook(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (err) {
        console.error("Error fetching book:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, []);

  if (loading) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Loading Practice Sets from Firebase...</div>;
  if (!practiceSetsBook) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Book not found in Firebase.</div>;

  // Get overall progress
  const totalSets = practiceSetsBook.sets.length;
  const completedSets = 0;
  const progressPercent = Math.round((completedSets / totalSets) * 100) || 0;

  return (
    <div className="practice-sets-container">
      <div className="practice-sets-header">
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
              <span className="breadcrumb-current">{practiceSetsBook.title}</span>
            </li>
          </ol>
        </nav>
        
        <div className="practice-sets-hero">
          <div className="practice-sets-hero-info">
            <h1>{practiceSetsBook.title}</h1>
            <p>{practiceSetsBook.description}</p>
          </div>
        </div>

        <div className="practice-sets-progress-overview">
          <div className="progress-overview-bar">
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
          <div className="progress-overview-text">
            <strong>{completedSets}/{totalSets}</strong> sets completed
          </div>
        </div>
      </div>

      <h2 className="practice-sets-section-title">All Practice Sets</h2>
      
      <div className="practice-sets-grid">
        {practiceSetsBook.sets.map((set, index) => {
          const isCompleted = false; // Stub
          const progress = 0; // Stub
          
          const vocabKanjiQ = set.sections['vocabulary-kanji']?.questions.length || 0;
          const grammarReadingQ = set.sections['grammar-reading']?.questions.length || 0;
          const totalQ = vocabKanjiQ + grammarReadingQ;

          return (
            <Link 
              to={`/practice-sets/${set.id}`} 
              key={set.id}
              className="practice-set-card"
            >
              <div className="set-card-top">
                <div className="set-card-icon">
                  {isCompleted ? '🏆' : '📚'}
                </div>
                <div className="set-card-questions-badge">
                  {totalQ} Questions
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
                  <span className={`set-card-start-btn ${isCompleted ? 'completed' : ''}`}>
                    {isCompleted ? 'Review Set' : 'Start Practice'} &rarr;
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

export default PracticeSetsListPage;
