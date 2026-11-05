import React, { useState, useEffect, useMemo, useCallback } from 'react';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import { Card } from './ui/Card.jsx';
import { Button } from './ui/Button.jsx';
import { Badge } from './ui/Badge.jsx';
import { ProgressBar } from './ui/ProgressBar.jsx';
import { ExitConfirmModal } from './ui/ExitConfirmModal.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

/**
 * Custom hook to manage the Spaced Repetition System (SRS) logic for the reading quiz.
 */
function useReadingSrsQuiz(quizData) {
  const [deck, setDeck] = useState([]);
  const [unseenQueue, setUnseenQueue] = useState([]);
  const [learningQueue, setLearningQueue] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [masteredCount, setMasteredCount] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalIncorrect, setTotalIncorrect] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstPassComplete, setIsFirstPassComplete] = useState(false);
  const [hasAcknowledgedFirstPass, setHasAcknowledgedFirstPass] = useState(false);
  const [firstPassStats, setFirstPassStats] = useState({ score: 0, total: 0 });

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    if (!quizData || !quizData.passages) return;

    const flattenedQuestions = quizData.passages.flatMap((passage, passageIndex) =>
      (passage.questions || []).map((q, questionIndex) => ({
        ...q,
        passageIndex,
        originalQuestionIndex: questionIndex,
        id: `${passageIndex}-${questionIndex}`,
      }))
    );

    const initializedDeck = flattenedQuestions.map((item) => ({
      ...item,
      correctStreak: 0,
      isMastered: false,
    }));

    setDeck(initializedDeck);
    setUnseenQueue(initializedDeck.map((card) => card.id));
    setLearningQueue([]);
    setMasteredCount(0);
    setTotalCorrect(0);
    setTotalIncorrect(0);
    setCurrentCard(null);
    setIsFirstPassComplete(false);
    setHasAcknowledgedFirstPass(false);
  }, [quizData]);

  const selectNextCard = useCallback(() => {
    let nextCardId = null;
    let newLearningQueue = [...learningQueue];
    let newUnseenQueue = [...unseenQueue];

    if (newLearningQueue.length > 0) {
      nextCardId = newLearningQueue.shift();
    } else if (newUnseenQueue.length > 0) {
      nextCardId = newUnseenQueue.shift();
    } else if (masteredCount < deck.length) {
      const reviewQueue = deck.filter((card) => !card.isMastered).map((card) => card.id);
      if (reviewQueue.length > 0) {
        newLearningQueue = shuffleArray(reviewQueue);
        nextCardId = newLearningQueue.shift();
      }
    }

    if (nextCardId) {
      const nextCard = deck.find((c) => c.id === nextCardId);
      setCurrentCard(nextCard);
      setLearningQueue(newLearningQueue);
      setUnseenQueue(newUnseenQueue);
    } else {
      setCurrentCard(null);
    }
  }, [deck, learningQueue, unseenQueue, masteredCount]);

  const handleAnswer = (isCorrect) => {
    if (!currentCard) return;
    const cardId = currentCard.id;
    if (isCorrect) {
      setTotalCorrect((prev) => prev + 1);
    } else {
      setTotalIncorrect((prev) => prev + 1);
    }

    const updatedDeck = deck.map((card) => {
      if (card.id === cardId) {
        const newStreak = isCorrect ? card.correctStreak + 1 : 0;
        const isNowMastered = newStreak >= 2;
        if (isNowMastered && !card.isMastered) {
          setMasteredCount((prev) => prev + 1);
        }
        return { ...card, correctStreak: newStreak, isMastered: isNowMastered };
      }
      return card;
    });

    setDeck(updatedDeck);

    if (!isCorrect) {
      setLearningQueue((prev) => shuffleArray([...prev, cardId]));
    }

    selectNextCard();
  };

  useEffect(() => {
    if (deck.length > 0 && !currentCard && !isLoading) {
      selectNextCard();
    }
  }, [deck, currentCard, isLoading, selectNextCard]);

  useEffect(() => {
    if (deck.length > 0 && isLoading) {
      setIsLoading(false);
    }
  }, [deck, isLoading]);

  useEffect(() => {
    if (!isLoading && deck.length > 0 && unseenQueue.length === 0 && !isFirstPassComplete) {
      setFirstPassStats({
        score: totalCorrect,
        total: totalCorrect + totalIncorrect,
      });
      setIsFirstPassComplete(true);
    }
  }, [unseenQueue.length, deck.length, isLoading, isFirstPassComplete, totalCorrect, totalIncorrect]);

  const acknowledgeFirstPass = () => {
    setHasAcknowledgedFirstPass(true);
  };

  const isComplete = masteredCount === deck.length && deck.length > 0;

  return {
    currentCard,
    masteredCount,
    totalCorrect,
    totalIncorrect,
    deckSize: deck.length,
    handleAnswer,
    isComplete,
    isLoading,
    isFirstPassComplete,
    hasAcknowledgedFirstPass,
    acknowledgeFirstPass,
    firstPassStats,
    unseenCount: unseenQueue.length,
  };
}

/**
 * Highlights matching vocabulary words in Japanese text and shows an informative tooltip.
 */
const HighlightedText = ({ text, vocab }) => {
  if (!vocab || vocab.length === 0 || !text) {
    return <>{text}</>;
  }

  const { regex, vocabMap } = useMemo(() => {
    const map = new Map();
    const allForms = [];

    for (const entry of vocab) {
      if (entry.japanese) {
        allForms.push(entry.japanese);
        map.set(entry.japanese, entry);
        if (entry.reading && entry.reading !== entry.japanese) {
          allForms.push(entry.reading);
          map.set(entry.reading, entry);
        }
      }
    }

    if (allForms.length === 0) {
      return { regex: null, vocabMap: null };
    }

    const uniqueForms = [...new Set(allForms)].sort((a, b) => b.length - a.length);
    const finalRegex = new RegExp(`(${uniqueForms.map(f => f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
    return { regex: finalRegex, vocabMap: map };
  }, [vocab]);

  if (!regex) {
    return <>{text}</>;
  }

  const parts = text.split(regex).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        const vocabEntry = vocabMap.get(part);

        if (vocabEntry) {
          return (
            <span
              key={index}
              className="group relative inline-block text-emerald-700 dark:text-emerald-300 font-bold underline decoration-dotted decoration-emerald-400 dark:decoration-emerald-500 underline-offset-4 cursor-help"
            >
              {part}
              <span className="pointer-events-none invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2.5 rounded-xl bg-slate-900/95 dark:bg-slate-800 text-white text-xs shadow-2xl z-50 border border-slate-700 leading-snug">
                <span className="font-bold text-emerald-400 block mb-0.5">{vocabEntry.japanese} {vocabEntry.reading ? `(${vocabEntry.reading})` : ''}</span>
                <span className="text-slate-300 block">{vocabEntry.english}</span>
                {vocabEntry.romaji && <span className="text-[10px] text-slate-400 block mt-0.5 italic">{vocabEntry.romaji}</span>}
              </span>
            </span>
          );
        }
        return part;
      })}
    </>
  );
};

const ReadingQuizScreen = ({ quizState, onComplete, onEndQuizEarly, quizStateRef }) => {
  const { quizData, quizTitle, level } = quizState;
  const { theme } = useTheme();

  const {
    currentCard,
    handleAnswer,
    acknowledgeFirstPass,
    isLoading,
    isFirstPassComplete,
    hasAcknowledgedFirstPass,
    firstPassStats,
    isComplete,
    totalCorrect: score,
    totalIncorrect,
    masteredCount,
    unseenCount,
    deckSize: numberOfQuestions,
  } = useReadingSrsQuiz(quizData);

  const [viewedPassageIndex, setViewedPassageIndex] = useState(null);
  const [viewedQuestionIndex, setViewedQuestionIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const viewedPassage = useMemo(() => {
    if (!quizData?.passages || viewedPassageIndex === null) return null;
    return quizData.passages[viewedPassageIndex];
  }, [quizData, viewedPassageIndex]);

  const viewedQuestion = useMemo(() => {
    if (!viewedPassage?.questions || viewedQuestionIndex === null) return null;
    return viewedPassage.questions[viewedQuestionIndex];
  }, [viewedPassage, viewedQuestionIndex]);

  useEffect(() => {
    if (currentCard) {
      setViewedPassageIndex(currentCard.passageIndex);
      setViewedQuestionIndex(currentCard.originalQuestionIndex);
    }
  }, [currentCard]);

  useEffect(() => {
    if (quizStateRef) {
      quizStateRef.current = {
        score,
        total: numberOfQuestions,
        totalIncorrect,
        mastered: masteredCount,
        unseen: unseenCount,
      };
    }
  }, [score, totalIncorrect, masteredCount, unseenCount, numberOfQuestions, quizStateRef]);

  useEffect(() => {
    if (isComplete) {
      onComplete?.({
        score,
        total: numberOfQuestions,
        totalIncorrect,
        mastered: masteredCount,
        unseen: unseenCount,
      });
    }
  }, [isComplete, score, totalIncorrect, masteredCount, unseenCount, onComplete, numberOfQuestions]);

  const handleOptionClick = (option) => {
    if (isAnswered || !currentCard) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = currentCard.correctOption?.text === option;

    setTimeout(() => {
      handleAnswer(isCorrect);
      setIsAnswered(false);
      setSelectedOption(null);
    }, 700);
  };

  const handlePassageSelect = (index) => {
    setViewedPassageIndex(index);
    setViewedQuestionIndex(0);
  };

  const handleQuestionNav = (direction) => {
    if (!viewedPassage) return;
    const newIndex = viewedQuestionIndex + direction;
    if (newIndex >= 0 && newIndex < viewedPassage.questions.length) {
      setViewedQuestionIndex(newIndex);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  // First Round Checkpoint Modal
  if (isFirstPassComplete && !hasAcknowledgedFirstPass) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
        <div
          className="w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all animate-scale-up"
          style={{
            backgroundColor: theme === 'light' ? '#fcf9f2' : theme === 'sepia' ? '#f5ede0' : '#0f172a',
            borderColor: theme === 'light' ? '#decfae' : theme === 'sepia' ? '#cbbe9f' : '#1e293b',
            color: theme === 'light' || theme === 'sepia' ? '#1f2937' : '#f8fafc',
          }}
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-3xl font-bold">
              🏁
            </div>
            <div>
              <Badge variant="primary" className="mb-2 text-[11px] font-black uppercase tracking-wider">
                Round 1 Complete
              </Badge>
              <h2 className="text-2xl font-black">第1ラウンド完了！</h2>
              <p className="text-xs opacity-75 mt-1">
                You went through all initial questions once.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className="text-xs uppercase tracking-wider opacity-60 font-bold block mb-1">First Pass Score</span>
              <span className="text-3xl font-black text-emerald-500">
                {firstPassStats?.score ?? 0}
                <span className="text-base font-semibold opacity-60 text-current"> / {firstPassStats?.total ?? 0}</span>
              </span>
            </div>

            <p className="text-xs leading-relaxed opacity-80">
              Continue to the spaced review round to achieve 100% mastery, or save your current score and exit.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1 py-2.5 text-xs font-bold justify-center rounded-xl"
                onClick={() => onEndQuizEarly(quizStateRef.current)}
              >
                Save & Exit (保存して終了)
              </Button>
              <Button
                variant="primary"
                className="flex-1 py-2.5 text-xs font-black justify-center shadow-lg shadow-emerald-500/20 rounded-xl"
                onClick={acknowledgeFirstPass}
              >
                Continue Review (復習へ) &rarr;
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!viewedPassage || !viewedQuestion) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-xl font-bold">Loading Quiz...</h2>
      </div>
    );
  }

  const isSrsActiveQuestion = currentCard?.id === `${viewedPassageIndex}-${viewedQuestionIndex}`;
  const totalPassageQuestions = viewedPassage?.questions?.length || 0;
  const progressPercent = numberOfQuestions > 0 ? (masteredCount / numberOfQuestions) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header & Telemetry Bar */}
      <Card className="!p-5 bg-[var(--color-bg-primary)]/90 backdrop-blur-md border border-[var(--color-border)] rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--color-border)]/60">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              {level?.toUpperCase() || 'JLPT'}
            </span>
            <div>
              <h1 className="text-lg md:text-xl font-black tracking-tight text-[var(--color-text-primary)]">
                {quizTitle || 'Reading Comprehension (読解)'}
              </h1>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Passage {viewedPassageIndex + 1} of {quizData.passages.length} &bull; Question {viewedQuestionIndex + 1} of {totalPassageQuestions}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            {/* Telemetry Stats */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20" title="New Unseen Questions">
                New: {unseenCount}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" title="Mastered Questions">
                Mastered: {masteredCount}/{numberOfQuestions}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20" title="Incorrect Answers">
                Missed: {totalIncorrect}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExitModalOpen(true)}
              className="text-xs font-bold ml-2 rounded-xl"
            >
              Exit
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pt-3">
          <div className="flex justify-between items-center text-[11px] font-bold text-[var(--color-text-secondary)] mb-1">
            <span>Overall Drill Mastery</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <ProgressBar progressPercent={progressPercent} />
        </div>
      </Card>

      {/* Main Study Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Passage Tabs & Reading Passage Card */}
        <div className="lg:col-span-7 space-y-4">
          {/* Passage Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {quizData.passages.map((passage, index) => {
              const isSelected = index === viewedPassageIndex;
              return (
                <button
                  key={index}
                  onClick={() => handlePassageSelect(index)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all border ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20'
                      : 'bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-emerald-500/50'
                  }`}
                >
                  {passage?.title || `Passage ${index + 1}`}
                </button>
              );
            })}
          </div>

          {/* Reading Passage Sheet */}
          <Card className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-2xl shadow-sm p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]/60">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                本文 (Reading Passage)
              </span>
              <span className="text-xs text-[var(--color-text-secondary)]">
                💡 Hover dotted words for vocabulary notes
              </span>
            </div>

            <h3 className="text-lg font-black text-[var(--color-text-primary)]">
              {viewedPassage?.title || `Passage ${viewedPassageIndex + 1}`}
            </h3>

            <div className="prose dark:prose-invert max-w-none text-base leading-relaxed text-[var(--color-text-primary)] font-sans whitespace-pre-line select-text">
              <HighlightedText
                text={viewedPassage?.passageText || '[Passage content is missing]'}
                vocab={quizData?.vocab}
              />
            </div>
          </Card>
        </div>

        {/* Right Column: Question & Answer Console */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-2xl shadow-sm p-6 space-y-5">
            {/* Question Header & Navigator */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]/60">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  Q {viewedQuestionIndex + 1}/{totalPassageQuestions}
                </span>
                {isSrsActiveQuestion && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400">
                    Active Drill
                  </span>
                )}
              </div>

              {totalPassageQuestions > 1 && (
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-lg"
                    onClick={() => handleQuestionNav(-1)}
                    disabled={viewedQuestionIndex === 0}
                  >
                    &lsaquo;
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-lg"
                    onClick={() => handleQuestionNav(1)}
                    disabled={viewedQuestionIndex === totalPassageQuestions - 1}
                  >
                    &rsaquo;
                  </Button>
                </div>
              )}
            </div>

            {/* Question Text */}
            <div>
              <h2 className="text-base font-bold leading-relaxed text-[var(--color-text-primary)]">
                <HighlightedText
                  text={viewedQuestion?.questionText || '[Question text is missing]'}
                  vocab={quizData?.vocab}
                />
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {viewedQuestion?.options?.map((option, index) => {
                const isCorrectAnswer = viewedQuestion.correctOption?.text === option;
                const isSelected = selectedOption === option;

                let stateClass = "border-[var(--color-border)] hover:border-emerald-500/60 hover:bg-black/5 dark:hover:bg-white/5 text-[var(--color-text-primary)]";
                let circleClass = "border-[var(--color-border)] text-transparent";

                if (isSrsActiveQuestion && isAnswered) {
                  if (isCorrectAnswer) {
                    stateClass = "border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm";
                    circleClass = "border-emerald-500 bg-emerald-500 text-white";
                  } else if (isSelected) {
                    stateClass = "border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold";
                    circleClass = "border-rose-500 bg-rose-500 text-white";
                  }
                } else if (isSelected) {
                  stateClass = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold";
                  circleClass = "border-emerald-500 bg-emerald-500 text-white";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    disabled={!isSrsActiveQuestion || isAnswered}
                    className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-start gap-3 cursor-pointer disabled:cursor-not-allowed ${stateClass}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition-all ${circleClass}`}>
                      {index + 1}
                    </div>
                    <div className="text-sm md:text-base leading-snug flex-1">
                      <HighlightedText text={option} vocab={quizData?.vocab} />
                    </div>
                  </button>
                );
              }) || <p className="text-xs opacity-60">No options available.</p>}
            </div>

            {!isSrsActiveQuestion && (
              <p className="text-[11px] text-center opacity-60 italic pt-1">
                Viewing question. Answer prompt is active on the current SRS queue card.
              </p>
            )}
          </Card>
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      <ExitConfirmModal
        isOpen={isExitModalOpen}
        onCancel={() => setIsExitModalOpen(false)}
        onConfirm={() => {
          setIsExitModalOpen(false);
          onEndQuizEarly(quizStateRef.current);
        }}
        answeredCount={score + totalIncorrect}
        totalQuestions={numberOfQuestions}
        title="Leave Reading Quiz?"
      />
    </div>
  );
};

export default ReadingQuizScreen;
