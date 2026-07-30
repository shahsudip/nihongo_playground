import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import '../assets/tango_reading.css'; // Import theme-matching CSS

export default function TangoReadingPage() {
  const { bookId, chapterId } = useParams();
  const [stories, setStories] = useState([]);
  const [topicTitle, setTopicTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showTranslation, setShowTranslation] = useState({});

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    
    // Fetch topic title
    const topicRef = doc(db, 'books', bookId, 'topics', chapterId);
    getDoc(topicRef).then(topicSnap => {
      if (topicSnap.exists()) {
        setTopicTitle(topicSnap.data().title);
      }
    });

    // Real-time listener for stories so UI updates automatically as DB populates
    const storiesRef = collection(db, 'books', bookId, 'topics', chapterId, 'stories');
    const unsubscribe = onSnapshot(storiesRef, (snap) => {
      const fetched = [];
      snap.forEach(doc => fetched.push({ id: doc.id, ...doc.data() }));
      
      // Sort by story_number or page number
      fetched.sort((a, b) => {
        if (a.story_number !== undefined && b.story_number !== undefined && a.story_number !== b.story_number) {
          return a.story_number - b.story_number;
        }
        return a.id.localeCompare(b.id, undefined, { numeric: true });
      });
      setStories(fetched);
      setLoading(false);
    }, (err) => {
      console.error("Error listening to stories:", err);
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [bookId, chapterId]);

  const toggleTranslation = (id) => {
    setShowTranslation(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNext = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-8 text-red-500 font-bold">Error: {error}</div>;
  if (stories.length === 0) return <div className="p-8 text-center text-xl text-gray-600">No stories found for this topic.</div>;

  const renderAnnotatedText = (story) => {
    let html = story.japanese_text;
    if (!html) return "";
    
    if (story.annotated_words && story.annotated_words.length > 0) {
      let wordIndex = 0;
      html = html.replace(/<u>(.*?)<\/u>/g, (match, p1) => {
        if (wordIndex < story.annotated_words.length) {
          const word = story.annotated_words[wordIndex];
          wordIndex++;
          return `<span class="inline-flex flex-col items-center justify-center align-middle mx-1" style="vertical-align: middle; line-height: 1.2;">
            <span class="text-[12px] text-[var(--color-text-secondary)] mb-1 whitespace-nowrap font-sans tracking-normal leading-none">${word.meaning_en}</span>
            <span class="underline decoration-[var(--primary-green)] decoration-[3px] underline-offset-[4px]">${p1}</span>
            <span class="text-[12px] text-[var(--primary-green)] mt-1 whitespace-nowrap font-sans tracking-normal leading-none">${word.furigana}</span>
          </span>`;
        }
        return match; // If there are more <u> tags than words, leave them as is
      });
    }
    return html;
  };

  const currentStory = stories[currentStoryIndex];

  return (
    <div className="tango-page-container pt-[100px]">
      
      {/* Header Navigation */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between">
        <Link 
          to={`/books/${bookId}`} 
          className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors inline-block"
        >
          &larr; Exit Reading
        </Link>
        <div className="text-[var(--color-text-secondary)] text-sm font-medium">
          Story {currentStoryIndex + 1} of {stories.length}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        {/* Main Reading Passage Card */}
        <div className="relative bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-6 md:p-10 mb-8 shadow-sm h-[60vh] min-h-[450px] flex flex-col">
          
          <button 
            onClick={() => toggleTranslation(currentStory.id)} 
            className="absolute top-4 right-4 bg-[var(--primary-green)] text-white px-4 py-1.5 rounded text-sm font-medium hover:opacity-80 transition-opacity z-20 shadow-md"
          >
            {showTranslation[currentStory.id] ? "Hide Translation" : "See English"}
          </button>

          <div className="mt-6 flex-1 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
            <p 
              className="text-2xl md:text-3xl text-[var(--color-text-primary)] tango-japanese-text whitespace-pre-wrap pt-4"
              dangerouslySetInnerHTML={{ __html: renderAnnotatedText(currentStory) }}
              style={{ lineHeight: '3.5' }}
            />

            {showTranslation[currentStory.id] && (
              <div className="mt-8 pt-6 border-t border-[var(--color-border)] animate-fadeIn pb-4">
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-wrap">
                  {currentStory.english_translation}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Vocabulary List Removed per user request */}

        {/* Stories Navigator */}
        <div className="mt-12 pt-6 border-t border-[var(--color-border)]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-[var(--color-text-muted)] font-medium m-0">Story Navigator</p>
            <span className="text-xs text-[var(--color-text-muted)]">{currentStoryIndex + 1}/{stories.length}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {stories.map((_, idx) => {
              const isCurrent = currentStoryIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentStoryIndex(idx);
                    window.scrollTo(0, 0);
                  }}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                    isCurrent 
                      ? 'bg-[var(--primary-green)] text-white shadow-md' 
                      : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--primary-green)] hover:text-[var(--primary-green)]'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
