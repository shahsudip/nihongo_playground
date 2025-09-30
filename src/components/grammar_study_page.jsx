import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';

const GrammarStudyPage = () => {
  const { level, slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Get location to access the passed state

  const [grammarPoint, setGrammarPoint] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const loadGrammarPoint = async () => {
      setIsLoading(true);
      setError(null);
      
      // 1. Check if the data was passed directly from the list page.
      if (location.state && location.state.grammarPointData) {
        setGrammarPoint(location.state.grammarPointData);
        setIsLoading(false);
      } 
      // 2. If not (e.g., page was refreshed), fetch from Firestore as a fallback.
      else {
        try {
          const docRef = doc(db, 'jlpt', level, 'grammar_list', slug);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            // Re-apply the title shortening logic for consistency on refresh
            let shortTitle = data.title;
             if (data.title && data.title.includes(':')) {
                let relevantPart = data.title.split(':')[1];
                if (relevantPart) {
                    if (relevantPart.includes('–')) {
                        shortTitle = relevantPart.split('–')[0].trim();
                    } else {
                        shortTitle = relevantPart.trim();
                    }
                }
            }
            setGrammarPoint({ ...data, title: shortTitle });
          } else {
            setError("Grammar point not found. The link may be incorrect or the data may not exist.");
          }
        } catch (err) {
          console.error("Firestore error:", err);
          setError("An error occurred while fetching data from the database.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadGrammarPoint();
  }, [level, slug, location.state]);

  const handleNextExample = () => {
    setIsFlipped(false);
    setTimeout(() => {
        if (grammarPoint && grammarPoint.examples) {
            setCurrentExampleIndex(prev => (prev + 1) % grammarPoint.examples.length);
        }
    }, 150);
  };

  const handlePrevExample = () => {
    setIsFlipped(false);
    setTimeout(() => {
        if (grammarPoint && grammarPoint.examples) {
            setCurrentExampleIndex(prev => (prev - 1 + grammarPoint.examples.length) % grammarPoint.examples.length);
        }
    }, 150);
  };

  if (isLoading) return <LoadingSpinner />;
  
  if (error) {
    return (
        <div className="grammar-study-container">
             <button onClick={() => navigate(-1)} className="back-button" style={{position: 'absolute', top: '20px', left: '20px'}}>← Back to List</button>
             <div className="grammar-details-card" style={{textAlign: 'center'}}>
                <p className="empty-state-text" style={{color: 'var(--feedback-incorrect)', fontSize: '1.2rem'}}>{error}</p>
             </div>
        </div>
    );
  }

  if (!grammarPoint || !grammarPoint.examples || grammarPoint.examples.length === 0) {
    return (
        <div className="grammar-study-container">
            <button onClick={() => navigate(-1)} className="back-button" style={{position: 'absolute', top: '20px', left: '20px'}}>← Back to List</button>
            <div className="grammar-details-card" style={{textAlign: 'center'}}>
                <p className="empty-state-text">This grammar point has no examples to display.</p>
            </div>
        </div>
    );
  }

  const currentExample = grammarPoint.examples[currentExampleIndex];

  return (
    <div className="grammar-study-container">
      <button onClick={() => navigate(-1)} className="back-button" style={{position: 'absolute', top: '20px', left: '20px'}}>← Back to List</button>
      <div className="grammar-details-card">
        <h1 className="grammar-title">{grammarPoint.title}</h1>
        <div className="grammar-section">
          <h2>Meaning</h2>
          <p>{grammarPoint.meaning}</p>
        </div>
        <div className="grammar-section">
          <h2>Formation</h2>
          <p>{grammarPoint.formation}</p>
        </div>
      </div>

      <div className="example-carousel">
        <h2>Example Sentences ({currentExampleIndex + 1} / {grammarPoint.examples.length})</h2>
        <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
            <div className="flashcard-inner">
                <div className="flashcard-face flashcard-front">
                    <p className="flashcard-text">{currentExample.japanese}</p>
                </div>
                <div className="flashcard-face flashcard-back">
                    <p className="flashcard-text english">{currentExample.english}</p>
                    <p className="flashcard-subtext">{currentExample.romaji}</p>
                </div>
            </div>
        </div>
        <div className="carousel-navigation">
            <button onClick={handlePrevExample} disabled={grammarPoint.examples.length <= 1}>Previous</button>
            <button onClick={handleNextExample} disabled={grammarPoint.examples.length <= 1}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default GrammarStudyPage;

