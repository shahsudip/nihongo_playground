// src/components/BookChapterListPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import PowerDrillChapterList from './PowerDrillChapterList.jsx';
import StandardChapterList from './StandardChapterList.jsx';

const BookChapterListPage = () => {
  const { bookId } = useParams();
  const { currentUser } = useAuth();
  const [book, setBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isPowerDrill = bookId.includes('power-drill');

  useEffect(() => {
    const fetchChaptersAndProgress = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch book metadata
        let bookData = null;
        const bookDocRef = doc(db, 'books', bookId);
        const bookSnap = await getDoc(bookDocRef);

        if (bookSnap.exists()) {
          bookData = bookSnap.data();
        } else {
          // Fallback to local
          const { sampleBooks } = await import('../data/book_data.jsx');
          const localBook = sampleBooks.find(b => b.id === bookId);
          if (localBook) {
            bookData = {
              id: localBook.id,
              title: localBook.title,
              description: localBook.description,
              level: localBook.level,
              category: localBook.category,
            };
          }
        }

        if (!bookData) {
          setError("Book not found.");
          setLoading(false);
          return;
        }

        // 2. Fetch chapters
        const chaptersColRef = collection(db, 'books', bookId, 'chapters');
        const chaptersSnap = await getDocs(chaptersColRef);
        
        let chaptersList = [];
        chaptersSnap.forEach(docSnap => {
          chaptersList.push({ id: docSnap.id, ...docSnap.data() });
        });

        // Fallback to local chapters
        if (chaptersList.length === 0) {
          const { sampleBooks } = await import('../data/book_data.jsx');
          const localBook = sampleBooks.find(b => b.id === bookId);
          if (localBook && localBook.chapters) {
            chaptersList = localBook.chapters;
          }
        }

        setBook(bookData);
        setChapters(chaptersList);

        // 3. Fetch progress history for this book
        if (currentUser) {
          const historyColRef = collection(db, 'users', currentUser.uid, 'quizHistory');
          const historySnap = await getDocs(historyColRef);
          
          const bookHistory = {};
          historySnap.forEach(docSnap => {
            const data = docSnap.data();
            if (data && data.type === 'book' && data.quizId.startsWith(`${bookId}-`)) {
              const chapId = data.quizId.replace(`${bookId}-`, '');
              bookHistory[chapId] = data;
            }
          });
          setHistory(bookHistory);
        }

      } catch (err) {
        console.error("Error loading chapter page details:", err);
        setError("Failed to load chapters: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChaptersAndProgress();
  }, [bookId, currentUser]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!book) return null;

  return (
    <div className="book-detail-container">
      <nav aria-label="Breadcrumb" className="ps-breadcrumb mb-6">
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
            <span className="breadcrumb-current">{book.title}</span>
          </li>
        </ol>
      </nav>

      {/* Clean Header */}
      <div className="book-detail-header pt-2">
        <div className="book-detail-info">
          <span className="book-detail-level">{book.level}</span>
          <h1 className="book-detail-title">{book.title}</h1>
          <p className="book-detail-desc">{book.description}</p>
          <div className="book-detail-meta">
            <span>{chapters.length} Lessons</span>
          </div>
        </div>
      </div>

      {/* Layout components determined by book type */}
      {isPowerDrill ? (
        <PowerDrillChapterList
          book={book}
          chapters={chapters}
          history={history}
        />
      ) : (
        <StandardChapterList
          book={book}
          chapters={chapters}
          history={history}
        />
      )}
    </div>
  );
};

export default BookChapterListPage;
