// src/components/BookChapterListPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import PowerDrillChapterList from './PowerDrillChapterList.jsx';
import Shin500ChapterList from './Shin500ChapterList.jsx';
import StandardChapterList from './StandardChapterList.jsx';
import { STATIC_BOOKS } from '../data/static_books_catalog.js';

const BookChapterListPage = () => {
  const { bookId } = useParams();
  const { currentUser } = useAuth();
  
  const staticBook = STATIC_BOOKS.find(b => b.id === bookId) || null;
  const [book, setBook] = useState(staticBook);
  const [chapters, setChapters] = useState([]);
  const [history, setHistory] = useState({});
  // If we already have static book info and it's a specialized reading book, no blocking spinner needed
  const isReadingBook = ['speed-master-n3-reading', 'shinkanzen-master-n3-reading', 'shinkanzen-master-n3-listening', 'sou-matome-n3-reading'].includes(bookId);
  const [loading, setLoading] = useState(!staticBook);
  const [error, setError] = useState(null);
  const isPowerDrill = bookId.includes('power-drill');
  const isShin500 = bookId.startsWith('shin-nihongo-500') || bookId.includes('500');

  useEffect(() => {
    let isMounted = true;

    const fetchChaptersAndProgress = async () => {
      try {
        if (!staticBook) {
          setLoading(true);
        }
        setError(null);

        // 1. Fetch book metadata if not in static catalog
        let bookData = staticBook;
        if (!bookData) {
          const bookDocRef = doc(db, 'books', bookId);
          const bookSnap = await getDoc(bookDocRef);
          if (bookSnap.exists()) {
            bookData = { id: bookSnap.id, ...bookSnap.data() };
          }
        }

        if (!bookData) {
          if (isMounted) {
            setError("Book not found.");
            setLoading(false);
          }
          return;
        }

        if (isMounted) setBook(bookData);

        // 2. Specialized reading books have static UI layouts and don't need heavy chapter downloads
        if (isReadingBook) {
          if (isMounted) setLoading(false);
        } else {
          // Fetch chapters or topics for quiz books (Power Drill, Tango, Shin Nihongo 500)
          const subColName = bookId.startsWith('tango') ? 'topics' : 'chapters';
          const chaptersColRef = collection(db, 'books', bookId, subColName);
          const chaptersSnap = await getDocs(chaptersColRef);
          
          let chaptersList = [];
          chaptersSnap.forEach(docSnap => {
            chaptersList.push({ id: docSnap.id, ...docSnap.data() });
          });

          // Fallback or merge with local chapters
          if (chaptersList.length === 0) {
            const { sampleBooks } = await import('../data/book_data.jsx');
            const localBook = sampleBooks.find(b => b.id === bookId);
            if (localBook && localBook.chapters) {
              chaptersList = localBook.chapters;
            }
          }
          if (isMounted) {
            setChapters(chaptersList);
            setLoading(false);
          }
        }

        // 3. Fetch progress history for this book in background
        if (currentUser) {
          const historyColRef = collection(db, 'users', currentUser.uid, 'quizHistory');
          getDocs(historyColRef).then(historySnap => {
            if (!isMounted) return;
            const bookHistory = {};
            historySnap.forEach(docSnap => {
              const data = docSnap.data();
              if (data && data.type === 'book' && data.quizId.startsWith(`${bookId}-`)) {
                const chapId = data.quizId.replace(`${bookId}-`, '');
                bookHistory[chapId] = data;
              }
            });
            setHistory(bookHistory);
          }).catch(err => {
            console.warn("Background history load:", err);
          });
        }

      } catch (err) {
        console.error("Error loading chapter page details:", err);
        if (isMounted) setError("Failed to load chapters: " + err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchChaptersAndProgress();

    return () => {
      isMounted = false;
    };
  }, [bookId, currentUser, staticBook, isReadingBook]);

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
            {isPowerDrill ? (
              <span>
                {chapters.filter(c => c.id.startsWith('vocab') || c.id.startsWith('training')).length} Vocab Drills &amp; {chapters.filter(c => c.id.startsWith('grammar')).length} Grammar Drills
              </span>
            ) : isShin500 ? (
              <span>
                500 Questions &bull; {chapters.length} Daily Drills
              </span>
            ) : (
              <span>{chapters.length} Lessons</span>
            )}
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
      ) : isShin500 ? (
        <Shin500ChapterList
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
