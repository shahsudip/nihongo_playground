import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import LoadingSpinner from './utils/loading_spinner.jsx';
import './assets/app_style.css';
import './assets/book_features.css';
import './assets/restored_tests.css';
import './assets/drill_animations.css';
import './assets/practice_sets.css';

import MainLayout from './components/main_layout.jsx';
import LandingPage from './components/landing_screen.jsx';

// Lazy-loaded page components for optimal mobile bundle size and performance
const LevelSelectionPage = lazy(() => import('./components/level_selection_screen.jsx'));
const JlptQuizPage = lazy(() => import('./components/jlpt_quiz_screen.jsx'));
const ResultsPage = lazy(() => import('./components/result_screen.jsx'));
const ProfilePage = lazy(() => import('./components/profile_screen.jsx'));
const ExerciseGridPage = lazy(() => import('./components/exercise_grid_screen.jsx'));
const StandardQuizPage = lazy(() => import('./components/standard_quiz_screen.jsx'));
const ReadingQuizPage = lazy(() => import('./components/ReadingQUizPage.jsx'));
const VocabularyListPage = lazy(() => import('./components/VocabularyListPage.jsx'));
const FlashcardViewer = lazy(() => import('./components/FlashcardViewer.jsx'));
const GrammarStudyPage = lazy(() => import('./components/grammar_study_page.jsx'));
const GrammarListPage = lazy(() => import('./components/grammar_list_page.jsx'));
const KanjiDetailsPage = lazy(() => import('./components/KanjiDetailsPage.jsx'));
const VocabDetailsPage = lazy(() => import('./components/VocabDetailsPage.jsx'));
const GrammarDetailsPage = lazy(() => import('./components/GrammarDetailsPage.jsx'));
const SRSReviewHub = lazy(() => import('./components/SRSReviewHub.jsx'));
const AnkiDecksPage = lazy(() => import('./components/AnkiDecksPage.jsx'));
const AnkiQuizViewer = lazy(() => import('./components/AnkiQuizViewer.jsx'));
const ApkgDeckViewerPage = lazy(() => import('./components/ApkgDeckViewerPage.jsx'));

// Practice Test Flow
const PracticeCategoryPage = lazy(() => import('./components/PracticeCategoryPage.jsx'));
const PracticeTestListPage = lazy(() => import('./components/PracticeTestListPage.jsx'));
const TestTakerPage = lazy(() => import('./components/TestTakerPage.jsx'));
const ConversationsPage = lazy(() => import('./components/ConversationsPage.jsx'));

// Book Collection
const BookListPage = lazy(() => import('./components/BookListPage.jsx'));
const BookChapterListPage = lazy(() => import('./components/BookChapterListPage.jsx'));
const BookQuizTakerPage = lazy(() => import('./components/BookQuizTakerPage.jsx'));
const ZenkamokuPageViewer = lazy(() => import('./components/ZenkamokuPageViewer.jsx'));
const SomatomeN3Book = lazy(() => import('./components/SomatomeN3Book.jsx'));
const ShinkanzenN3ReadingBook = lazy(() => import('./components/ShinkanzenN3ReadingBook.jsx'));
const ShinkanzenN3ListeningBook = lazy(() => import('./components/ShinkanzenN3ListeningBook.jsx'));
const SpeedMasterN3ReadingBook = lazy(() => import('./components/SpeedMasterN3ReadingBook.jsx'));
const Shin500QuizPage = lazy(() => import('./components/Shin500QuizPage.jsx'));
const TangoReadingPage = lazy(() => import('./components/TangoReadingPage.jsx'));
const DailySprintListPage = lazy(() => import('./components/DailySprintListPage.jsx'));
const DailySprintRunnerPage = lazy(() => import('./components/DailySprintRunnerPage.jsx'));


// Practice Sets
const PracticeSetsListPage = lazy(() => import('./components/PracticeSetsListPage.jsx'));
const PracticeSetDetailsPage = lazy(() => import('./components/PracticeSetDetailsPage.jsx'));
const PracticeSetQuizPage = lazy(() => import('./components/PracticeSetQuizPage.jsx'));

// N4 Practice Sets (Chokuzen Taisaku)
const N4PracticeSetsListPage = lazy(() => import('./components/N4PracticeSetsListPage.jsx'));
const N4PracticeSetDetailsPage = lazy(() => import('./components/N4PracticeSetDetailsPage.jsx'));
const N4PracticeSetQuizPage = lazy(() => import('./components/N4PracticeSetQuizPage.jsx'));

const KanjiListPage = lazy(() => import('./components/KanjiListPage.jsx'));

// This component protects routes that require a user to be logged in
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
        
          {/* All protected pages use the MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/levels/:level/kanji-list" element={<ProtectedRoute><KanjiListPage /></ProtectedRoute>} />
            <Route path="/levels/:level/vocabulary-list" element={<ProtectedRoute><VocabularyListPage /></ProtectedRoute>} />
            <Route path="/levels/:level/grammar-list" element={<ProtectedRoute><GrammarListPage /></ProtectedRoute>} />
            <Route path="/levels/:level/new-vocab-list" element={<ProtectedRoute><VocabularyListPage /></ProtectedRoute>} />
            <Route path="/levels/:level/new-grammar-list" element={<ProtectedRoute><GrammarListPage /></ProtectedRoute>} />
            <Route path="/levels/:level/kanji-details/:id" element={<ProtectedRoute><KanjiDetailsPage /></ProtectedRoute>} />
            <Route path="/levels/:level/vocab-details/:id" element={<ProtectedRoute><VocabDetailsPage /></ProtectedRoute>} />
            <Route path="/levels/:level/grammar-details/:id" element={<ProtectedRoute><GrammarDetailsPage /></ProtectedRoute>} />
            <Route
              path="/profile"
              element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
            />
          <Route
            path="/levels"
            element={<ProtectedRoute><LevelSelectionPage /></ProtectedRoute>}
          />
          <Route
            path="/levels/:level"
            element={<ProtectedRoute><LevelSelectionPage /></ProtectedRoute>}
          />
          <Route
            path="/levels/:level/:category"
            element={<ProtectedRoute><LevelSelectionPage /></ProtectedRoute>}
          />
          <Route
            path="/levels/:level/:category/difficulties"
            element={<ProtectedRoute><StandardQuizPage /></ProtectedRoute>}
          />
          <Route
            path="/levels/:level/:category/exercises"
            element={<ProtectedRoute><ExerciseGridPage /></ProtectedRoute>}
          />
          <Route
            path="/quiz/:quizId"
            element={<ProtectedRoute><JlptQuizPage /></ProtectedRoute>}
          />
          <Route
            path="/custom-quiz/:quizId"
            element={<ProtectedRoute><StandardQuizPage /></ProtectedRoute>}
          />

          <Route
            path="/reading-quiz/:quizId"
            element={<ProtectedRoute><ReadingQuizPage /></ProtectedRoute>}
          />
          <Route path="/srs-review" element={<ProtectedRoute><SRSReviewHub /></ProtectedRoute>} />
          <Route path="/srs" element={<ProtectedRoute><SRSReviewHub /></ProtectedRoute>} />
          <Route path="/anki-decks" element={<ProtectedRoute><AnkiDecksPage /></ProtectedRoute>} />
          <Route path="/anki-quiz/:deckId" element={<ProtectedRoute><AnkiQuizViewer /></ProtectedRoute>} />
          <Route path="/apkg-viewer" element={<ProtectedRoute><ApkgDeckViewerPage /></ProtectedRoute>} />
          <Route path="/flashcards/:level/:type/:chunkIndex" element={<ProtectedRoute><FlashcardViewer /></ProtectedRoute>} />
          <Route path="/flashcards/:level/vocabulary_list/:chunkIndex" element={<ProtectedRoute><FlashcardViewer /></ProtectedRoute>} />

          <Route 
            path="/study/grammar/:level/:slug" 
            element={<ProtectedRoute><GrammarStudyPage /></ProtectedRoute>} 
          />
          <Route
            path="/levels/:level/conversations"
            element={<ProtectedRoute><ConversationsPage /></ProtectedRoute>}
          />
          <Route
            path="/results"
            element={<ProtectedRoute><ResultsPage /></ProtectedRoute>}
          />
          
          {/* --- NEW ROUTES FOR PRACTICE TEST FLOW --- */}
          <Route
            path="/level/:levelId/practice-test"
            element={<ProtectedRoute><PracticeCategoryPage /></ProtectedRoute>}
          />
          <Route
            path="/level/:levelId/practice-test/:categoryId"
            element={<ProtectedRoute><PracticeTestListPage /></ProtectedRoute>}
          />
          <Route
            path="/level/:levelId/practice-test/:categoryId/:testId"
            element={<ProtectedRoute><TestTakerPage /></ProtectedRoute>}
          />
          {/* --- END NEW ROUTES --- */}

          {/* --- BOOK COLLECTION ROUTES --- */}
          <Route
            path="/books"
            element={<ProtectedRoute><BookListPage /></ProtectedRoute>}
          />
          <Route
            path="/books/:bookId"
            element={<ProtectedRoute><BookChapterListPage /></ProtectedRoute>}
          />
          <Route
            path="/books/sou-matome-n3-reading/chapters/:chapterId"
            element={<ProtectedRoute><SomatomeN3Book /></ProtectedRoute>}
          />
          <Route
            path="/books/:bookId/sprints"
            element={<ProtectedRoute><DailySprintListPage /></ProtectedRoute>}
          />
          <Route
            path="/books/:bookId/sprint/:dayNumber"
            element={<ProtectedRoute><DailySprintRunnerPage /></ProtectedRoute>}
          />
          <Route
            path="/books/shinkanzen-master-n3-reading/chapters/:chapterId"
            element={<ProtectedRoute><ShinkanzenN3ReadingBook /></ProtectedRoute>}
          />

          <Route
            path="/books/shinkanzen-master-n3-listening/chapters/:chapterId"
            element={<ProtectedRoute><ShinkanzenN3ListeningBook /></ProtectedRoute>}
          />
          <Route
            path="/books/speed-master-n3-reading/chapters/:chapterId"
            element={<ProtectedRoute><SpeedMasterN3ReadingBook /></ProtectedRoute>}
          />
          <Route
            path="/books/shin-nihongo-500-n1/chapters/:chapterId"
            element={<ProtectedRoute><Shin500QuizPage bookId="shin-nihongo-500-n1" /></ProtectedRoute>}
          />
          <Route
            path="/books/shin-nihongo-500-n2/chapters/:chapterId"
            element={<ProtectedRoute><Shin500QuizPage bookId="shin-nihongo-500-n2" /></ProtectedRoute>}
          />
          <Route
            path="/books/shin-nihongo-500-n3/chapters/:chapterId"
            element={<ProtectedRoute><Shin500QuizPage bookId="shin-nihongo-500-n3" /></ProtectedRoute>}
          />
          <Route
            path="/books/shin-nihongo-500-n4-n5/chapters/:chapterId"
            element={<ProtectedRoute><Shin500QuizPage bookId="shin-nihongo-500-n4-n5" /></ProtectedRoute>}
          />
          <Route
            path="/books/zenkamoku-n1-best-workbook/chapters/:chapterId"
            element={<ProtectedRoute><ZenkamokuPageViewer /></ProtectedRoute>}
          />
          <Route
            path="/books/zenkamoku-n2-best-workbook/chapters/:chapterId"
            element={<ProtectedRoute><ZenkamokuPageViewer /></ProtectedRoute>}
          />
          <Route
            path="/books/zenkamoku-n3-best-workbook/chapters/:chapterId"
            element={<ProtectedRoute><ZenkamokuPageViewer /></ProtectedRoute>}
          />
          <Route
            path="/books/:bookId/chapters/:chapterId"
            element={<ProtectedRoute><BookQuizTakerPage /></ProtectedRoute>}
          />
          <Route
            path="/tango-reading/:bookId/chapters/:chapterId"
            element={<ProtectedRoute><TangoReadingPage /></ProtectedRoute>}
          />

          {/* --- PRACTICE SETS ROUTES --- */}
          <Route
            path="/practice-sets"
            element={<ProtectedRoute><PracticeSetsListPage /></ProtectedRoute>}
          />
          <Route
            path="/practice-sets/:setId"
            element={<ProtectedRoute><PracticeSetDetailsPage /></ProtectedRoute>}
          />
          <Route
            path="/practice-sets/:setId/:sectionId"
            element={<ProtectedRoute><PracticeSetQuizPage /></ProtectedRoute>}
          />

          {/* --- N4 PRACTICE SETS (CHOKUZEN TAISAKU) ROUTES --- */}
          <Route
            path="/chokuzen-taisaku-n4"
            element={<ProtectedRoute><N4PracticeSetsListPage /></ProtectedRoute>}
          />
          <Route
            path="/chokuzen-taisaku-n4/:setId"
            element={<ProtectedRoute><N4PracticeSetQuizPage /></ProtectedRoute>}
          />
          <Route
            path="/chokuzen-taisaku-n4/:setId/:sectionId"
            element={<ProtectedRoute><N4PracticeSetQuizPage /></ProtectedRoute>}
          />

          {/* Direct aliases for /n4-practice-sets and /books/chokuzen-taisaku-n4 */}
          <Route
            path="/n4-practice-sets"
            element={<Navigate to="/chokuzen-taisaku-n4" replace />}
          />
          <Route
            path="/n4-practice-sets/:setId"
            element={<ProtectedRoute><N4PracticeSetDetailsPage /></ProtectedRoute>}
          />
          <Route
            path="/n4-practice-sets/:setId/:sectionId"
            element={<ProtectedRoute><N4PracticeSetQuizPage /></ProtectedRoute>}
          />
          <Route
            path="/books/chokuzen-taisaku-n4"
            element={<Navigate to="/chokuzen-taisaku-n4" replace />}
          />

        </Route>
      </Routes>
      </Suspense>
    </Router>
    </ThemeProvider>
  );
}