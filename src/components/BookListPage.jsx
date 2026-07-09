// src/components/BookListPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';

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
      const allowedBooks = ['shin-nihongo-500-n3', 'shinkanzen-master-n3-reading', 'shin-nihongo-500-n2'];
      
      booksSnap.forEach(docSnap => {
        if (allowedBooks.includes(docSnap.id)) {
          fetchedBooks.push({ id: docSnap.id, ...docSnap.data() });
        }
      });
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
      const booksWithChapters = [];
      for (const book of fetchedBooks) {
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
        booksWithChapters.push({ ...book, chapters });
      }

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

  const handleSeedBooks = async () => {
    if (!currentUser) return;
    try {
      setSeeding(true);
      setError(null);

      const { sampleBooks } = await import('../data/book_data.jsx');

      for (const book of sampleBooks) {
        // Write book metadata
        const bookDocRef = doc(db, 'books', book.id);
        await setDoc(bookDocRef, {
          id: book.id,
          title: book.title,
          description: book.description,
          level: book.level,
          category: book.category,
        });

        // Write chapters
        for (const chapter of book.chapters) {
          const chapterDocRef = doc(db, 'books', book.id, 'chapters', chapter.id);
          await setDoc(chapterDocRef, {
            id: chapter.id,
            title: chapter.title,
            type: chapter.type,
            description: chapter.description,
            passages: chapter.passages
          });
        }
      }

      alert("Sample Books successfully seeded to Firestore!");
      await fetchBooksAndProgress();
    } catch (err) {
      console.error("Error seeding books to Firestore:", err);
      setError("Failed to seed books to Firestore: " + err.message);
    } finally {
      setSeeding(false);
    }
  };

  /* --- AI ADDED: Cleanup function to remove unknown books from Firestore --- */
  const handleCleanBooks = async () => {
    if (!currentUser) return;
    if (!window.confirm("Are you sure you want to delete all unknown books (like Genki and Soumatome) from Firestore?")) return;
    
    try {
      setCleaning(true);
      setError(null);
      
      const { deleteDoc } = await import('firebase/firestore');
      const booksColRef = collection(db, 'books');
      const booksSnap = await getDocs(booksColRef);
      const allowedBooks = ['shin-nihongo-500-n3', 'shinkanzen-master-n3-reading', 'shin-nihongo-500-n2'];
      
      let deletedCount = 0;
      for (const docSnap of booksSnap.docs) {
        if (!allowedBooks.includes(docSnap.id)) {
          // Note: In Firestore web SDK, deleting a document doesn't delete its subcollections automatically.
          // But since the UI only queries the root 'books' collection, deleting the root document
          // makes it disappear from the app entirely.
          await deleteDoc(doc(db, 'books', docSnap.id));
          deletedCount++;
        }
      }
      
      alert(`Successfully deleted ${deletedCount} unknown books from Firestore!`);
      await fetchBooksAndProgress();
    } catch (err) {
      console.error("Error cleaning books from Firestore:", err);
      setError("Failed to clean books: " + err.message);
    } finally {
      setCleaning(false);
    }
  };
  /* ------------------------------------------------------------------------- */

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
        
        {currentUser && (
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button onClick={handleSeedBooks} disabled={seeding || cleaning} className="seed-database-button">
              {seeding ? "Seeding Firestore..." : "🔄 Refresh/Seed Books"}
            </button>
            
            {/* --- AI ADDED: Clean Database Button --- */}
            <button onClick={handleCleanBooks} disabled={seeding || cleaning} className="seed-database-button" style={{ borderColor: '#f56565', color: '#f56565' }}>
              {cleaning ? "Cleaning Firestore..." : "🗑️ Delete Unknown Books"}
            </button>
            {/* ----------------------------------------- */}
          </div>
        )}
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
          const gradient = gradients[index % gradients.length];
          return (
            <div key={book.id} className="book-card">
              <div className="book-cover-artwork" style={{ background: gradient }}>
                <span className="book-cover-badge">{book.level}</span>
                <h3 className="book-cover-title">{book.title.split(':')[0]}</h3>
                <span className="book-cover-category">{book.category}</span>
              </div>
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
