import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';

const PracticeSetDetailsPage = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const [currentSet, setCurrentSet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const docRef = doc(db, 'books', 'jlpt-n3-practice-sets');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const bookData = docSnap.data();
          const set = bookData.sets.find(s => s.id === setId);
          setCurrentSet(set);
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
  }, [setId]);

  if (loading) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Loading Section...</div>;

  if (!currentSet) {
    return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Set not found in Firebase.</div>;
  }

  // Count questions
  const vocabKanjiTotal = currentSet.sections['vocabulary-kanji']?.questions?.length || 0;
  const grammarTotal = currentSet.sections['grammar-reading']?.questions?.length || 0;

  return (
    <div className="ps-details-container animate-fade-in">
      <nav aria-label="Breadcrumb" className="ps-breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          <li className="flex items-center">
            <Link to="/" className="breadcrumb-link">Home</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2 breadcrumb-separator">/</span>
            <Link to="/practice-sets" className="breadcrumb-link">JLPT N3</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2 breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{currentSet.title}</span>
          </li>
        </ol>
      </nav>

      <header className="ps-details-header">
        <div className="flex items-center gap-4">
          <div className="ps-level-icon">
            N3
          </div>
          <div>
            <h1 className="text-3xl font-bold">{currentSet.title}</h1>
            <p className="ps-subtitle-text">JLPT N3 Examination • {vocabKanjiTotal + grammarTotal} questions</p>
          </div>
        </div>
      </header>

      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white mb-6">Choose a Section</h2>
        
        <div className="ps-details-grid">
          
          {/* Vocabulary & Kanji Card */}
          <Link to={`/practice-sets/${setId}/vocabulary-kanji`} className="ps-section-card group">
            <div className="flex items-start justify-between mb-4">
              <div className="ps-icon-box bg-primary-light">
                <span className="text-2xl">文</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="ps-question-badge">{vocabKanjiTotal} questions</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2 group-hover-text-accent">Vocabulary & Kanji</h3>
            <p className="text-sm text-secondary mb-4">文字・語彙 (Moji / Goi)</p>
            
            <ul className="ps-section-list">
              {vocabKanjiTotal > 0 && (
                <li className="flex items-center gap-2">
                  <span className="ps-list-dot"></span>
                  <span>漢字の読み・書き · Kanji Reading/Writing</span>
                </li>
              )}
            </ul>
            
            <div className="mt-4 flex justify-end">
              <span className="ps-btn ps-btn-primary">Start Practice &rarr;</span>
            </div>
          </Link>

          {/* Grammar Card */}
          <Link to={`/practice-sets/${setId}/grammar`} className="ps-section-card group">
            <div className="flex items-start justify-between mb-4">
              <div className="ps-icon-box bg-accent-light">
                <span className="text-2xl">読</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="ps-question-badge">{grammarTotal} questions</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2 group-hover-text-accent">Grammar</h3>
            <p className="text-sm text-secondary mb-4">文法 (Bunpou)</p>
            
            <ul className="ps-section-list">
              <li className="flex items-center gap-2">
                <span className="ps-list-dot"></span>
                <span>文法 · Grammar</span>
              </li>
            </ul>
            
            <div className="mt-4 flex justify-end">
              <span className="ps-btn ps-btn-accent">Start Practice &rarr;</span>
            </div>
          </Link>

        </div>

        <div className="ps-tips-box mt-8">
          <h3 className="font-bold mb-3 text-white">Study Tips for N3</h3>
          <ul className="text-sm text-secondary space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-accent">&bull;</span>
              Take your time - there's no timer in practice mode
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">&bull;</span>
              Review incorrect answers carefully to understand the correct grammar
            </li>
          </ul>
        </div>
      </section>
      
      <section className="mt-12 pt-8 border-t border-color-border">
        <h2 className="text-lg font-bold mb-4 text-white">More N3 Practice Tests</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/practice-sets" className="ps-more-card group">
            <span className="text-sm group-hover-text-accent">View All N3 Practice Tests</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PracticeSetDetailsPage;
