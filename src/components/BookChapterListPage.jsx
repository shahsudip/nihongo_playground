import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import PowerDrillChapterList from './PowerDrillChapterList.jsx';
import Shin500ChapterList from './Shin500ChapterList.jsx';
import ShinkanzenChapterList from './ShinkanzenChapterList.jsx';
import SpeedMasterChapterList from './SpeedMasterChapterList.jsx';
import SouMatomeChapterList from './SouMatomeChapterList.jsx';
import TangoChapterList from './TangoChapterList.jsx';
import StandardChapterList from './StandardChapterList.jsx';
import { STATIC_BOOKS } from '../data/static_books_catalog.js';
import '../assets/shin500_drill.css';

const BookChapterListPage = () => {
  const { bookId } = useParams();

  const navigate = useNavigate();

  // Redirect Zenkamoku N3 directly to the book viewer (bypass chapter list)
  useEffect(() => {
    if (bookId.startsWith('zenkamoku')) {
      navigate(`/books/${bookId}/chapters/w01-d01`, { replace: true });
    }
  }, [bookId, navigate]);

  if (bookId.startsWith('zenkamoku')) return null;

  const location = useLocation();
  const { currentUser } = useAuth();
  const { theme } = useTheme();
  
  const isFromProfile = location.state?.from === 'profile';
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
  const isShinkanzen = bookId.startsWith('shinkanzen');
  const isSpeedMaster = bookId.startsWith('speed-master');
  const isSouMatome = bookId.startsWith('sou-matome') || bookId.startsWith('somatome');
  const isTango = bookId.startsWith('tango');

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
            if (bookId.startsWith('tango')) {
              const totalTopics = bookData.totalChapters || 14;
              for (let i = 1; i <= totalTopics; i++) {
                const pad = String(i).padStart(2, '0');
                chaptersList.push({
                  id: `topic_${pad}`,
                  title: `Topic ${i}`,
                  type: 'reading'
                });
              }
            } else {
              const { sampleBooks } = await import('../data/book_data.jsx');
              const localBook = sampleBooks.find(b => b.id === bookId);
              if (localBook && localBook.chapters) {
                chaptersList = localBook.chapters;
              }
            }
          }
          if (isMounted) {
            setChapters(chaptersList);
            setLoading(false);
          }
        }

        // 3. Fetch progress history for this book (both local cache and Firestore)
        const localHistory = {};
        try {
          const guestPrefix = `book_quiz_guest_${bookId}_`;
          const userPrefix = currentUser ? `book_quiz_${currentUser.uid}_${bookId}_` : null;
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key) continue;
            let chapId = null;
            if (userPrefix && key.startsWith(userPrefix)) {
              chapId = key.replace(userPrefix, '');
            } else if (key.startsWith(guestPrefix)) {
              chapId = key.replace(guestPrefix, '');
            }
            if (chapId) {
              try {
                const saved = JSON.parse(localStorage.getItem(key));
                if (saved && saved.answers) {
                  const ansCount = Object.keys(saved.answers).length;
                  localHistory[chapId] = {
                    quizId: `${bookId}-${chapId}`,
                    bookId,
                    chapterId: chapId,
                    status: saved.status || (ansCount > 0 ? 'completed' : 'incomplete'),
                    score: saved.score || 0,
                    total: saved.total || 0,
                    answered: ansCount,
                    answers: saved.answers
                  };
                }
              } catch (e) {}
            }
          }
        } catch (e) {
          console.warn("Could not read local quiz progress:", e);
        }

        if (isMounted && Object.keys(localHistory).length > 0) {
          setHistory(localHistory);
        }

        if (currentUser) {
          const historyColRef = collection(db, 'users', currentUser.uid, 'quizHistory');
          getDocs(historyColRef).then(historySnap => {
            if (!isMounted) return;
            const bookHistory = { ...localHistory };
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

  if (loading) {
    if (isShin500) {
      return (
        <div className={`shin500-chapter-page theme-${theme} flex items-center justify-center min-h-screen`}>
          <LoadingSpinner />
        </div>
      );
    }
    return <LoadingSpinner />;
  }
  if (error) return <div className="error-message">{error}</div>;
  if (!book) return null;

  return (
    <div className={`book-detail-container ${isShin500 ? `shin500-chapter-page theme-${theme}` : ''}`}>
      {!isFromProfile && (
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
      )}

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
                500 Questions &bull; {chapters.length || book.totalChapters || 105} Daily Drills
              </span>
            ) : (
              <span>{book.totalChapters || chapters.length || 0} Lessons</span>
            )}
          </div>
        </div>
      </div>

      {/* Dedicated layout components per book family */}
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
      ) : isShinkanzen ? (
        <ShinkanzenChapterList
          book={book}
        />
      ) : isSpeedMaster ? (
        <SpeedMasterChapterList
          book={book}
        />
      ) : isSouMatome ? (
        <SouMatomeChapterList
          book={book}
          history={history}
        />
      ) : isTango ? (
        <TangoChapterList
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
