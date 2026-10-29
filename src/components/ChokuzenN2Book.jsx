import { createElement, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { summarizeProgress } from '../utils/bookProgress.js';
import {
  BOOK_ROUTE, SECTIONS, attemptId, extractedText, isQuestionReady,
  loadChokuzenN2Book, loadCloudAttempts, makeAttempt, mergeAttempts, readAttempts, saveCloudAttempt,
  sectionFromRoute, sectionProgress, setProgress, storageKeyFor, validAnswers,
} from '../utils/chokuzenN2Data.js';
import StarExplanationCard from './ui/StarExplanationCard.jsx';
import { isStarQuestion } from '../utils/starQuestionExplainer.js';
import '../assets/chokuzen_n2.css';

const STATUS_LABELS = {
  'not-started': 'Ready to begin',
  'in-progress': 'In progress',
  completed: 'Completed',
  mastered: 'Mastered',
};

function Icon({ name, ...props }) {
  const paths = {
    book: 'M4 4h6a3 3 0 0 1 3 3v14a4 4 0 0 0-4-3H4z M20 4h-4a3 3 0 0 0-3 3v14a4 4 0 0 1 4-3h3z',
    arrow: 'M5 12h14 M13 6l6 6-6 6',
    check: 'M5 12l4 4L19 6',
    grid: 'M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z',
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name] || paths.book} /></svg>;
}

function ProgressBar({ progress, label }) {
  return (
    <div className="cn2-meter" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress.completionPercent}>
      <span style={{ width: `${progress.completionPercent}%` }} />
    </div>
  );
}

function Status({ progress }) {
  return <span className={`cn2-status cn2-status--${progress.status}`}>{STATUS_LABELS[progress.status]}</span>;
}

function Explanation({ text, inline = false }) {
  const formatted = useMemo(() => {
    const allowed = new Set(['b', 'strong', 'u', 'br', 'ruby', 'rt', 'rp', 'em', 'p']);
    const blocked = new Set(['script', 'style', 'iframe', 'object', 'embed', 'svg', 'math', 'template']);
    const document = new DOMParser().parseFromString(extractedText(text), 'text/html');
    const renderNode = (node, index) => {
      if (node.nodeType === 3) return node.textContent;
      if (node.nodeType !== 1) return null;
      const tag = node.tagName.toLowerCase();
      if (blocked.has(tag)) return null;
      const children = Array.from(node.childNodes, renderNode);
      if (!allowed.has(tag)) return children;
      return tag === 'br' ? createElement(tag, { key: index }) : createElement(tag, { key: index }, ...children);
    };
    return Array.from(document.body.childNodes, renderNode);
  }, [text]);
  return createElement(inline ? 'span' : 'div', { className: 'cn2-explanation', lang: 'ja' }, formatted);
}

function StudyExplanation({ question }) {
  const study = question.studyExplanation;
  const starQuestion = isStarQuestion(question);
  if (!study) {
    return (
      <>
        {starQuestion ? (
          <StarExplanationCard question={question} className="mb-3" />
        ) : (
          <p className="cn2-study-pending">English translation and option-by-option breakdown are pending review for this question.</p>
        )}
        {extractedText(question.explanation).trim() ? <Explanation text={question.explanation} /> : !starQuestion && <p>A verified explanation is not available for this question.</p>}
      </>
    );
  }
  return (
    <div className="cn2-study-explanation" lang="en">
      {starQuestion && <StarExplanationCard question={question} className="mb-4" />}
      <h5>Question in English</h5>
      <p>{study.translation}</p>
      <h5>Correct answer in English</h5>
      <p>{study.correctAnswerEnglish}</p>
      <h5>Option-by-option breakdown</h5>
      <ol>
        {study.choices.map((choice, index) => (
          <li key={index} className={index === question.correctIndex ? 'cn2-study-choice--correct' : ''}>
            <strong><Explanation inline text={question.options[index]} />{choice.romaji && <span className="cn2-study-romaji"> ({choice.romaji})</span>} - {index === question.correctIndex ? 'Correct' : 'Incorrect'}</strong>
            <p>{choice.reason}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Overview({ progress, groups }) {
  return (
    <section className="cn2-overview" aria-label="Practice progress">
      <div className="cn2-overview-main">
        <div className="cn2-row"><strong>Overall question progress</strong><strong className="cn2-accent">{progress.completionPercent}%</strong></div>
        <ProgressBar progress={progress} label="Overall completion" />
        <p className="cn2-muted">{progress.answered} / {progress.total} questions answered</p>
      </div>
      <div className="cn2-stat"><strong>{groups.filter(group => group.isCompleted).length} / {groups.length}</strong><span>Sections complete</span></div>
      <div className="cn2-stat"><strong>{groups.filter(group => group.isMastered).length}</strong><span>Sections mastered</span></div>
      <div className="cn2-stat"><strong>{progress.answered ? `${progress.accuracyPercent}%` : '--'}</strong><span>Practice accuracy</span></div>
    </section>
  );
}

function SectionRow({ section, progress }) {
  return (
    <div className={`cn2-section-row cn2-tone--${section.tone}`}>
      <div className="cn2-row"><span>{section.title}</span><strong>{progress.completionPercent}%</strong></div>
      <ProgressBar progress={progress} label={`${section.title} completion`} />
      <small>{progress.answered} / {progress.total} answered{progress.answered > 0 && ` - ${progress.score} correct`}</small>
    </div>
  );
}

function SetList({ book, attempts }) {
  return (
    <>
      <div className="cn2-section-heading"><div><p className="cn2-eyebrow">YOUR PRACTICE LIBRARY</p><h2>One set closer to confidence.</h2></div><span className="cn2-pill">{book.sets.length} practice sets</span></div>
      <div className="cn2-set-grid">
        {book.sets.map(set => {
          const progress = setProgress(set, attempts);
          return (
            <Link key={set.id} className={`cn2-set-card cn2-card--${progress.status}`} to={`${BOOK_ROUTE}/${set.id}`}>
              <div className="cn2-row"><Status progress={progress} /><span className="cn2-pill">{progress.completionPercent}% complete</span></div>
              <h3>{set.title}</h3>
              <div className="cn2-section-rows">{SECTIONS.map(section => <SectionRow key={section.id} section={section} progress={sectionProgress(set.sections?.[section.id]?.questions || [], attempts[attemptId(set.id, section.id)])} />)}</div>
              <div className="cn2-card-action"><span>{progress.isCompleted ? 'Review set' : progress.answered ? 'Continue practice' : 'Explore set'}</span><Icon name="arrow" /></div>
            </Link>
          );
        })}
      </div>
      {book.sets.length === 0 && <div className="cn2-empty">Practice sets are being prepared.</div>}
    </>
  );
}

function SetDetails({ set, attempts }) {
  return (
    <>
      <div className="cn2-section-heading"><div><p className="cn2-eyebrow">CHOOSE YOUR FOCUS</p><h2>{set.title}</h2></div><Status progress={setProgress(set, attempts)} /></div>
      <div className="cn2-section-grid">
        {SECTIONS.map(section => {
          const questions = set.sections?.[section.id]?.questions || [];
          const progress = sectionProgress(questions, attempts[attemptId(set.id, section.id)]);
          const readyCount = questions.filter(isQuestionReady).length;
          return (
            <Link key={section.id} to={`${BOOK_ROUTE}/${set.id}/${section.route}`} className={`cn2-section-card cn2-tone--${section.tone}`}>
              <div className="cn2-row"><span className="cn2-section-icon"><Icon name={section.id === 'vocabulary-kanji' ? 'grid' : 'book'} /></span><Status progress={progress} /></div>
              <p className="cn2-eyebrow">{section.label}</p><h3>{section.title}</h3>
              <p className="cn2-muted">Japanese text, four choices, focused review.</p>
              <SectionRow section={section} progress={progress} />
              {readyCount < questions.length && <p className="cn2-muted">{readyCount} / {questions.length} questions proofread. The rest are unavailable until their Japanese text is verified.</p>}
              <div className="cn2-card-action"><span>{progress.isCompleted ? 'Review answers' : progress.answered ? 'Resume section' : 'Open section'}</span><Icon name="arrow" /></div>
            </Link>
          );
        })}
      </div>
      <aside className="cn2-study-note"><Icon name="book" /><div><strong>A little practice, a clearer understanding.</strong><p>Questions unlock after Japanese text, furigana, underlines, and choices are proofread. Mastery means every question answered with more than 90% correct.</p><p>Scores are raw practice accuracy, not an official JLPT score or pass prediction.</p></div></aside>
    </>
  );
}

function QuestionNavigator({ questions, answers, currentIndex, goTo }) {
  return (
    <nav className="cn2-quiz-navigator" aria-label="Question navigator">
      <div className="cn2-row"><strong>Question Navigator</strong><span className="cn2-pill">{Object.keys(answers).length} / {questions.length} Answered</span></div>
      <div className="cn2-question-grid">{questions.map((item, index) => {
        const answer = answers[item.id];
        const state = Number.isInteger(answer) ? answer === item.correctIndex ? 'correct' : 'incorrect' : 'unanswered';
        return <button key={item.id} className={`cn2-question-dot cn2-question-dot--${state}`} aria-current={index === currentIndex ? 'step' : undefined} aria-label={`Question ${item.number ?? index + 1}, ${state}${!isQuestionReady(item) ? ', text pending' : ''}`} onClick={() => goTo(index)}>{item.number ?? index + 1}</button>;
      })}</div>
      <p className="cn2-muted cn2-small">Green: correct. Red: incorrect. Outline: unanswered.</p>
    </nav>
  );
}

function Quiz({ set, section, record, onSave }) {
  const questions = set.sections?.[section.id]?.questions || [];
  const answers = validAnswers(questions, record?.answers);
  const savedIdIndex = questions.findIndex(question => question.id === record?.currentQuestionId);
  const currentIndex = savedIdIndex >= 0 ? savedIdIndex : Math.max(0, Math.min(questions.length - 1, Number(record?.currentIndex) || 0));
  const question = questions[currentIndex];
  const progress = sectionProgress(questions, record);
  const selected = question ? answers[question.id] : undefined;
  const isAnswered = Number.isInteger(selected);
  const ready = isQuestionReady(question);
  const textVerified = question?.verification?.ocrTextVerified === true;
  const passageVerified = question?.verification?.passageTextVerified === true;
  const heading = useRef(null);
  const save = changes => onSave(makeAttempt(set, section, record, changes));
  const goTo = (index, scrollToQuestion = true) => {
    save({ currentIndex: index });
    if (scrollToQuestion) {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  };
  const reset = () => {
    if (window.confirm('Reset this section? All saved answers and practice progress for this section will be cleared on this device.')) save({ answers: {}, currentIndex: 0 });
  };
  if (!question) return <div className="cn2-empty"><h2>This section is being prepared.</h2><Link className="cn2-text-link" to={`${BOOK_ROUTE}/${set.id}`}>Return to the set</Link></div>;
  return (
    <>
      <div className="cn2-quiz-toolbar"><div><Link className="cn2-back-link" to={`${BOOK_ROUTE}/${set.id}`}>Back to Sets</Link><h2>{set.title} <span className="cn2-level">N2</span> <span className="cn2-pill">{section.title}</span></h2></div><div className="cn2-quiz-actions"><span className="cn2-score-pill">Correct: {progress.score}/{progress.answered} ({questions.length})</span><button className="cn2-button cn2-button--quiet" onClick={reset}>Reset</button></div></div>
      <QuestionNavigator questions={questions} answers={answers} currentIndex={currentIndex} goTo={index => goTo(index, false)} />
      <div className="cn2-quiz-layout">
        <div className="cn2-question-column">
          <article className="cn2-question-card" aria-labelledby="cn2-question-heading">
            <div className="cn2-question-header"><div className="cn2-question-heading-group"><span className="cn2-question-badge">{currentIndex + 1}</span><h3 id="cn2-question-heading" ref={heading} tabIndex={-1}>Question {question.number ?? currentIndex + 1} of {questions.length}</h3></div><span className="cn2-muted">4 Choices</span></div>
            {textVerified && <><div className="cn2-instruction"><Explanation text={question.instruction} /></div>{passageVerified && <div className="cn2-passage"><Explanation text={question.passage} /></div>}{question.questionText && <div className="cn2-stem"><Explanation text={question.questionText} /></div>}</>}
            {!textVerified && <p className="cn2-notice" role="status">Japanese question text and choices are being proofread. This question is unavailable until the transcription is verified.</p>}
            {textVerified && !ready && <p className="cn2-notice" role="status">The shared passage is being proofread. This question is unavailable until its text is verified.</p>}
            <fieldset className="cn2-choices" disabled={isAnswered || !ready}>
              <legend>Choose an answer</legend>
              {[0, 1, 2, 3].map(optionIndex => {
                const isCorrect = isAnswered && optionIndex === question.correctIndex;
                const isSelected = selected === optionIndex;
                return (
                  <div key={optionIndex} className="cn2-choice-item">
                  <button type="button" className={`cn2-choice${isCorrect ? ' cn2-choice--correct' : ''}${isSelected && !isCorrect ? ' cn2-choice--incorrect' : ''}`} aria-label={`Choose printed option ${optionIndex + 1}`} aria-pressed={isSelected} onClick={() => { if (!isAnswered && ready) save({ answers: { ...answers, [question.id]: optionIndex }, currentIndex }); }}>
                    <span className="cn2-choice-number">{optionIndex + 1}</span>
                    <span className="cn2-choice-content">{textVerified ? <Explanation inline text={question.options[optionIndex]} /> : 'Pending transcription'}</span>
                    {isAnswered && (isCorrect || isSelected) && <span className="cn2-choice-result">{isCorrect ? 'Correct' : 'Your answer'}</span>}
                  </button>
                  </div>
                );
              })}
            </fieldset>
            {isAnswered && <section key={question.id} className="cn2-feedback" aria-live="polite"><h4>Explanation</h4><p>{selected === question.correctIndex ? 'Correct.' : `Incorrect. Correct answer: option ${question.correctIndex + 1}.`}</p><StudyExplanation question={question} /></section>}
          </article>
          <div className="cn2-reader-navigation"><button className="cn2-button cn2-button--quiet" disabled={currentIndex <= 0} onClick={() => goTo(currentIndex - 1)}>Previous</button><Link className="cn2-text-link" to={`${BOOK_ROUTE}/${set.id}`}>Save & return to set</Link><button className="cn2-button" disabled={currentIndex >= questions.length - 1} onClick={() => goTo(currentIndex + 1)}>Next <Icon name="arrow" /></button></div>
          {progress.isCompleted && <section className="cn2-completion" aria-label="Section results"><Icon name="check" /><h3>{progress.isMastered ? 'Section mastered!' : 'Section complete'}</h3><p>{progress.score} / {progress.total} correct ({progress.accuracyPercent}% practice accuracy).</p><p>Review any answer using the question navigator, or reset this section for a fresh attempt.</p><Link className="cn2-button" to={`${BOOK_ROUTE}/${set.id}`}>Choose another section</Link></section>}
        </div>
      </div>
    </>
  );
}

function BookSession({ userId }) {
  const { setId, sectionId } = useParams();
  const storageKey = storageKeyFor(userId);
  const [attempts, setAttempts] = useState(() => readAttempts(storageKey));
  const attemptsRef = useRef(attempts);
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [cloudNotice, setCloudNotice] = useState('');
  const cloudQueue = useRef(Promise.resolve());
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let cancelled = false;
    loadChokuzenN2Book().then(data => { if (!cancelled) setBook(data); }).catch(failure => { if (!cancelled) setError(failure.message); });
    return () => { cancelled = true; };
  }, [retry]);
  useEffect(() => {
    let cancelled = false;
    loadCloudAttempts(userId).then(incoming => {
      if (cancelled) return;
      const merged = mergeAttempts(attemptsRef.current, incoming);
      attemptsRef.current = merged;
      setAttempts(merged);
    }).catch(() => { if (!cancelled) setNotice('Cloud history could not be read. Your separate device progress is still available.'); });
    const onStorage = event => {
      if (event.key !== storageKey && event.key !== null) return;
      const updated = mergeAttempts(attemptsRef.current, readAttempts(storageKey));
      attemptsRef.current = updated;
      setAttempts(updated);
    };
    window.addEventListener('storage', onStorage);
    return () => { cancelled = true; window.removeEventListener('storage', onStorage); };
  }, [storageKey, userId]);
  const save = record => {
    const updated = { ...mergeAttempts(attemptsRef.current, readAttempts(storageKey)), [record.quizId]: record };
    attemptsRef.current = updated;
    setAttempts(updated);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      setNotice('Device storage is unavailable or full. Progress works in this tab but may not survive a reload.');
    }
    if (!import.meta.env.DEV && userId) {
      cloudQueue.current = cloudQueue.current.catch(() => {}).then(() => saveCloudAttempt(userId, record)).then(() => {
        setCloudNotice('');
      }).catch(() => {
        setCloudNotice('Cloud sync failed. Your progress is saved on this device. Answer or navigate again to retry.');
      });
    }
  };
  if (!book) return <main className="cn2-book"><section className="cn2-empty" aria-live="polite"><span className="cn2-level">N2</span><h1>{error ? 'The book is not ready yet' : 'Opening your practice book...'}</h1><p>{error || 'Loading original pages and practice sets.'}</p>{error && <button className="cn2-button" onClick={() => { setError(''); setRetry(value => value + 1); }}>Try again</button>}<Link className="cn2-text-link" to="/books">Back to books</Link></section></main>;
  const set = book.sets.find(item => item.id === setId);
  const section = sectionFromRoute(sectionId);
  const groups = book.sets.flatMap(item => SECTIONS.map(definition => sectionProgress(item.sections?.[definition.id]?.questions || [], attempts[attemptId(item.id, definition.id)])));
  const overall = summarizeProgress(groups);
  const invalidRoute = (setId && !set) || (sectionId && !section);
  return (
    <main className="cn2-book">
      <nav className="cn2-breadcrumb" aria-label="Breadcrumb"><Link to="/books">Books</Link><span aria-hidden="true">/</span><Link to={BOOK_ROUTE} aria-current={!setId ? 'page' : undefined}>Chokuzen Taisaku N2</Link>{set && <><span aria-hidden="true">/</span><Link to={`${BOOK_ROUTE}/${set.id}`} aria-current={!sectionId ? 'page' : undefined}>{set.title}</Link></>}{section && <><span aria-hidden="true">/</span><span aria-current="page">{section.title}</span></>}</nav>
      {!sectionId && <header className="cn2-hero"><div className="cn2-hero-copy"><p className="cn2-eyebrow">CHOKUZEN TAISAKU / JLPT N2</p><h1>{book.title}</h1><p className="cn2-muted">Native Japanese questions with furigana, underlines, and four choices.</p><div className="cn2-hero-actions"><span className="cn2-pill">{book.sets.length} practice sets</span><span className="cn2-pill">{overall.total} questions</span></div></div></header>}
      <div className="cn2-session-line"><Icon name="check" /><p>{notice ? 'Progress kept in this tab' : 'Progress saved on this device'}</p></div>
      {notice && <p className="cn2-notice" role="status">{notice}</p>}
      {cloudNotice && <p className="cn2-notice" role="alert">{cloudNotice}</p>}
      {invalidRoute ? <section className="cn2-empty"><h2>That set or section was not found.</h2><Link className="cn2-button" to={BOOK_ROUTE}>View all N2 sets</Link></section> : section && set ? <Quiz key={`${set.id}:${section.id}`} set={set} section={section} record={attempts[attemptId(set.id, section.id)]} onSave={save} /> : <><Overview progress={set ? setProgress(set, attempts) : overall} groups={set ? SECTIONS.map(definition => sectionProgress(set.sections?.[definition.id]?.questions || [], attempts[attemptId(set.id, definition.id)])) : groups} />{set ? <SetDetails set={set} attempts={attempts} /> : <SetList book={book} attempts={attempts} />}</>}
    </main>
  );
}

export default function ChokuzenN2Book() {
  const { currentUser } = useAuth() || {};
  return <BookSession key={currentUser?.uid || 'guest'} userId={currentUser?.uid || null} />;
}
