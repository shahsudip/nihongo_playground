// src/components/BookListPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';

import coverN1 from '../assets/shin_cover_n1.jpg';
import coverN2 from '../assets/shin_cover_n2.jpg';
import coverN3 from '../assets/shin_cover_n3.jpg';
import coverN4N5 from '../assets/shin_cover_n4n5.jpg';

import powerDrillN1 from '../assets/power_drill_n1_cover.jpg';
import powerDrillN2 from '../assets/power_drill_n2_cover.jpg';
import powerDrillN3 from '../assets/power_drill_n3_cover.jpg';

const BookListPage = () => {
  const { currentUser } = useAuth();
  const [books, setBooks] = useState([]);
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [cleaning, setCleaning] = useState(false);
  const [error, setError] = useState(null);

  // Cover gradient mapping based on book level/index to look premium
  const gradients = [
    'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', // Deep Blue
    'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', // Slate Gray
    'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', // Teal/Green
    'linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)', // Purple/Sunset
    'linear-gradient(135deg, #8a2387 0%, #e94057 50%, #f27121 100%)', // Red/Orange
    'linear-gradient(135deg, #b8860b 0%, #c0392b 50%, #8b0000 100%)', // Gold/Crimson (N1)
  ];

  const fetchBooksAndProgress = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Fetch books from Firestore
      const booksColRef = collection(db, 'books');
      const booksSnap = await getDocs(booksColRef);
      
      let fetchedBooks = [];
      
      /* --- AI ADDED: Hard filter to only allow specific books --- */
      const allowedBooks = [
        'shin-nihongo-500-n1',
        'shin-nihongo-500-n2',
        'shin-nihongo-500-n3',
        'shin-nihongo-500-n4-n5',
        'shinkanzen-master-n3-reading',
        'nihongo-power-drill-n1',
        'nihongo-power-drill-n2',
        'nihongo-power-drill-n3'
      ];
      
      booksSnap.forEach(docSnap => {
        if (allowedBooks.includes(docSnap.id)) {
          fetchedBooks.push({ id: docSnap.id, ...docSnap.data() });
        }
      });

      // Sort books according to custom order: Shin 500 N1 -> N2 -> N3 -> N4-N5 first
      const levelOrder = {
        'shin-nihongo-500-n1': 1,
        'shin-nihongo-500-n2': 2,
        'shin-nihongo-500-n3': 3,
        'shin-nihongo-500-n4-n5': 4,
        'shinkanzen-master-n3-reading': 5,
        'nihongo-power-drill-n1': 6,
        'nihongo-power-drill-n2': 7,
        'nihongo-power-drill-n3': 8
      };
      fetchedBooks.sort((a, b) => (levelOrder[a.id] || 99) - (levelOrder[b.id] || 99));
      /* -------------------------------------------------------- */

      // If no books are in Firestore, fall back to sample local books
      if (fetchedBooks.length === 0) {
        const { sampleBooks } = await import('../data/book_data.jsx');
        fetchedBooks = sampleBooks.map(b => ({
          id: b.id,
          title: b.title,
          description: b.description,
          level: b.level,
          category: b.category,
          chapters: b.chapters // chapters array is kept locally or populated in Firestore
        }));
      }

      // 2. Fetch all chapters for these books to know the full layout
      // Let's populate the chapters list for each book
      const booksWithChapters = await Promise.all(
        fetchedBooks.map(async (book) => {
          const chaptersColRef = collection(db, 'books', book.id, 'chapters');
          const chaptersSnap = await getDocs(chaptersColRef);
          
          let chapters = [];
          chaptersSnap.forEach(chapSnap => {
            chapters.push({ id: chapSnap.id, ...chapSnap.data() });
          });

          // Fallback to local chapters if Firestore subcollection is empty
          if (chapters.length === 0) {
            const { sampleBooks } = await import('../data/book_data.jsx');
            const localBook = sampleBooks.find(b => b.id === book.id);
            if (localBook) {
              chapters = localBook.chapters;
            }
          }
          return { ...book, chapters };
        })
      );

      setBooks(booksWithChapters);

      // 3. Fetch user history
      if (currentUser) {
        const historyColRef = collection(db, 'users', currentUser.uid, 'quizHistory');
        const historySnap = await getDocs(historyColRef);
        const userHistory = {};
        historySnap.forEach(docSnap => {
          const data = docSnap.data();
          if (data && data.type === 'book') {
            userHistory[data.quizId] = data; // e.g. "genki-1-ch-1-greetings" -> status, score, total
          }
        });
        setHistory(userHistory);
      }
    } catch (err) {
      console.error("Error fetching books/progress:", err);
      setError("Failed to load books. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchBooksAndProgress();
  }, [fetchBooksAndProgress]);



  const getBookProgress = (book) => {
    if (!currentUser || !book.chapters || book.chapters.length === 0) return { completed: 0, total: 0, percent: 0 };
    
    let completedCount = 0;
    book.chapters.forEach(chap => {
      const historyKey = `${book.id}-${chap.id}`;
      if (history[historyKey] && history[historyKey].status === 'mastered') {
        completedCount++;
      }
    });

    const total = book.chapters.length;
    const percent = Math.round((completedCount / total) * 100);
    return { completed: completedCount, total, percent };
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="books-list-container">
      <div className="books-header">
        <h1 className="books-title">Japanese Book Collections</h1>
        <p className="books-subtitle">Chapter-based reading and grammar quizzes curated from standard textbooks and study materials.</p>
        

      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="books-grid">
        {/* Static Card for JLPT Practice Sets */}
        <div className="book-card" style={{ border: '2px solid var(--primary-green)' }}>
          <div className="book-cover-artwork" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
            <span className="book-cover-badge">N3</span>
            <h3 className="book-cover-title">JLPT N3 Practice Sets</h3>
            <span className="book-cover-category">Mixed Practice</span>
          </div>
          <div className="book-card-details">
            <h2 className="book-card-title">JLPT N3 Practice Sets</h2>
            <p className="book-card-description">15 sets of comprehensive JLPT N3 practice covering Kanji, Vocabulary, and Grammar with premium layout.</p>
            
            <div className="book-progress-wrapper" style={{ marginTop: 'auto' }}>
              <div className="book-progress-info">
                <span>15 Full Sets</span>
                <span>500 Questions</span>
              </div>
            </div>

            <div className="book-card-footer">
              <Link to="/practice-sets" className="view-chapters-button" style={{ backgroundColor: 'var(--primary-green)', color: 'white' }}>
                Start Practice &rarr;
              </Link>
            </div>
          </div>
        </div>

        {books.map((book, index) => {
          const progress = getBookProgress(book);
          const bookCovers = {
            'shin-nihongo-500-n1': coverN1,
            'shin-nihongo-500-n2': coverN2,
            'shin-nihongo-500-n3': coverN3,
            'shin-nihongo-500-n4-n5': coverN4N5,
            'nihongo-power-drill-n1': powerDrillN1,
            'nihongo-power-drill-n2': powerDrillN2,
            'nihongo-power-drill-n3': powerDrillN3,
          };
          const coverImg = bookCovers[book.id];
          const levelGradients = {
            'shin-nihongo-500-n1': 'linear-gradient(135deg, #4a154b 0%, #861457 50%, #c1121f 100%)',
            'shin-nihongo-500-n2': 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #3a7bd5 100%)',
            'shin-nihongo-500-n3': 'linear-gradient(135deg, #0d9488 0%, #11998e 50%, #38ef7d 100%)',
            'shin-nihongo-500-n4-n5': 'linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #c084fc 100%)',
          };
          const gradient = levelGradients[book.id] || gradients[index % gradients.length];
          return (
            <div key={book.id} className="book-card">
              {coverImg ? (
                <div className="book-cover-artwork" style={{ padding: 0, overflow: 'hidden', background: '#0f172a' }}>
                  <img 
                    src={coverImg} 
                    alt={book.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                  />
                </div>
              ) : (
                <div className="book-cover-artwork" style={{ background: gradient }}>
                  <span className="book-cover-badge">{book.level}</span>
                  <h3 className="book-cover-title">{book.title.split(':')[0]}</h3>
                  <span className="book-cover-category">{book.category}</span>
                </div>
              )}
              <div className="book-card-details">
                <h2 className="book-card-title">{book.title}</h2>
                <p className="book-card-description">{book.description}</p>
                
                <div className="book-progress-wrapper">
                  <div className="book-progress-info">
                    <span>Progress: {progress.completed}/{progress.total} Chapters</span>
                    <span>{progress.percent}%</span>
                  </div>
                  <div className="book-progress-bar-track">
                    <div className="book-progress-bar-fill" style={{ width: `${progress.percent}%` }}></div>
                  </div>
                </div>

                <div className="book-card-footer">
                  <Link to={`/books/${book.id}`} className="view-chapters-button">
                    View Chapters &rarr;
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookListPage;
