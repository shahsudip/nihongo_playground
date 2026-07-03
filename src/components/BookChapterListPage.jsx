// src/components/BookChapterListPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import { formatDateTime } from '../utils/formatters.jsx';

const BookChapterListPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [book, setBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedWeek, setExpandedWeek] = useState(null);

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

  const getQuestionCount = (chapter) => {
    if (!chapter.passages || !Array.isArray(chapter.passages)) return 0;
    return chapter.passages.reduce((sum, passage) => sum + (passage.questions?.length || 0), 0);
  };

  // Group chapters by week
  const groupByWeek = (chaptersList) => {
    const weeks = {};
    chaptersList.forEach(chapter => {
      // Extract week number from title like "Week 1 - Day 1"
      const weekMatch = chapter.title?.match(/Week\s*(\d+)/i);
      const weekNum = weekMatch ? parseInt(weekMatch[1]) : 0;
      const key = weekNum > 0 ? `Week ${weekNum}` : 'Other';
      if (!weeks[key]) weeks[key] = { weekNum, chapters: [] };
      weeks[key].chapters.push(chapter);
    });
    // Sort weeks by number
    return Object.entries(weeks).sort((a, b) => a[1].weekNum - b[1].weekNum);
  };

  const getWeekProgress = (weekChapters) => {
    let completed = 0;
    let inProgress = 0;
    weekChapters.forEach(ch => {
      const progress = history[ch.id];
      if (progress?.status === 'mastered') completed++;
      else if (progress) inProgress++;
    });
    return { completed, inProgress, total: weekChapters.length };
  };

  const getDayLabel = (title) => {
    const dayMatch = title?.match(/Day\s*(\d+)/i);
    if (dayMatch) return `Day ${dayMatch[1]}`;
    if (title?.toLowerCase().includes('review')) return 'Review';
    return title?.replace(/Week\s*\d+\s*[-–]\s*/i, '').trim() || title;
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!book) return null;

  const weekGroups = groupByWeek(chapters);

  return (
    <div className="book-detail-container">
      {/* Clean Header */}
      <div className="book-detail-header">
        <button onClick={() => navigate('/books')} className="back-button">
          &larr; Back to Books
        </button>
        <div className="book-detail-info">
          <span className="book-detail-level">{book.level}</span>
          <h1 className="book-detail-title">{book.title}</h1>
          <p className="book-detail-desc">{book.description}</p>
          <div className="book-detail-meta">
            <span>{chapters.length} Lessons</span>
            <span>•</span>
            <span>{weekGroups.length} Weeks</span>
          </div>
        </div>
      </div>

      {/* Week Cards Grid */}
      <div className="weeks-grid">
        {weekGroups.map(([weekName, weekData]) => {
          const isExpanded = expandedWeek === weekName;
          const progress = getWeekProgress(weekData.chapters);
          const progressPct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

          return (
            <div key={weekName} className={`week-block ${isExpanded ? 'expanded' : ''}`}>
              <button
                className="week-card"
                onClick={() => setExpandedWeek(isExpanded ? null : weekName)}
              >
                <div className="week-card-top">
                  <h3 className="week-card-title">{weekName}</h3>
                  <span className="week-card-count">{weekData.chapters.length} days</span>
                </div>
                <div className="week-card-progress">
                  <div className="week-progress-bar">
                    <div className="week-progress-fill" style={{ width: `${progressPct}%` }}></div>
                  </div>
                  <span className="week-progress-text">
                    {progress.completed}/{progress.total} done
                  </span>
                </div>
                <span className={`week-expand-icon ${isExpanded ? 'rotated' : ''}`}>▼</span>
              </button>

              {isExpanded && (
                <div className="week-days-grid">
                  {weekData.chapters.map((chapter) => {
                    const qCount = getQuestionCount(chapter);
                    const userProgress = history[chapter.id];
                    const isMastered = userProgress && userProgress.status === 'mastered';
                    const isIncomplete = userProgress && userProgress.status === 'incomplete';
                    const dayLabel = getDayLabel(chapter.title);

                    return (
                      <Link
                        key={chapter.id}
                        to={`/books/${book.id}/chapters/${chapter.id}`}
                        className={`day-card ${isMastered ? 'day-mastered' : isIncomplete ? 'day-progress' : ''}`}
                      >
                        <div className="day-card-label">{dayLabel}</div>
                        <div className="day-card-questions">{qCount} Q</div>
                        <div className="day-card-status">
                          {isMastered ? (
                            <span className="day-status-badge mastered">✓</span>
                          ) : isIncomplete ? (
                            <span className="day-status-badge progress">◔</span>
                          ) : (
                            <span className="day-status-badge new">○</span>
                          )}
                        </div>
                        {userProgress && (
                          <div className="day-card-score">
                            {isMastered
                              ? `${userProgress.mastered}/${userProgress.numberOfQuestions}`
                              : `${userProgress.score}/${userProgress.total}`
                            }
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookChapterListPage;

