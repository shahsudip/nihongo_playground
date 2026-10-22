import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  getQuestionGroupProgress,
  summarizeProgress,
} from '../utils/bookProgress.js';

const DAYS_PER_PHASE = 5;
const TOTAL_DAYS = 20;
const QUESTIONS_PER_DAY = 58;

const PHASES = [
  { label: 'Foundation', summary: 'Build reliable kanji, vocabulary, and grammar recall.' },
  { label: 'Reinforcement', summary: 'Strengthen recognition through mixed daily practice.' },
  { label: 'Application', summary: 'Apply core skills to ordering and passage questions.' },
  { label: 'Final Push', summary: 'Finish the course with complete timed-style drills.' }
];

const SKILLS = [
  'Kanji reading',
  'Kanji spelling',
  'Vocabulary',
  'Paraphrase',
  'Word usage',
  'Grammar',
  'Sentence order',
  'Passage grammar'
];

const STATUS_LABELS = {
  'not-started': 'Ready',
  'in-progress': 'In progress',
  completed: 'Completed',
  mastered: 'Mastered',
};

const getDayNumber = (chapter, index) => (
  chapter?.dayNumber
  || chapter?.chapterNumber
  || Number.parseInt(chapter?.id?.match(/\d+/)?.[0], 10)
  || index + 1
);

const getDayProgress = (chapter, chapterId, history) => {
  const groups = chapter?.sections || chapter?.passages || [];
  const fullRecord = history[chapterId];
  const sections = groups.map((group, index) => ({
    ...getQuestionGroupProgress(group.questions || [], {
      scopedRecords: [history[`${chapterId}--section-${index + 1}`]],
      fullRecords: [fullRecord],
    }),
    label: SKILLS[index] || group.title || `Section ${index + 1}`,
  }));

  return {
    ...summarizeProgress(sections),
    sections,
  };
};

const PassN3Within20DaysChapterList = ({ book, chapters = [], history = {} }) => {
  const days = useMemo(() => {
    const orderedChapters = [...chapters].sort((left, right) => (
      getDayNumber(left, 0) - getDayNumber(right, 0)
    ));

    return Array.from({ length: TOTAL_DAYS }, (_, index) => {
      const chapter = orderedChapters[index] || {};
      const dayNumber = getDayNumber(chapter, index);
      const id = chapter.id || `chapter-${dayNumber}`;
      const progress = getDayProgress(chapter, id, history);

      return {
        ...chapter,
        id,
        dayNumber,
        total: progress.total || QUESTIONS_PER_DAY,
        progress,
      };
    });
  }, [chapters, history]);

  const overallProgress = useMemo(
    () => summarizeProgress(days.map(day => day.progress)),
    [days]
  );
  const completedDays = days.filter(day => day.progress.isCompleted).length;
  const masteredDays = days.filter(day => day.progress.isMastered).length;
  const nextDay = days.find(day => !day.progress.isCompleted) || days[days.length - 1];
  const nextHref = `/books/${book.id}/chapters/${nextDay.id}`;

  return (
    <section className="pass20-dashboard" aria-labelledby="pass20-title">
      <div className="pass20-overview">
        <div className="pass20-overview-copy">
          <p className="pass20-kicker">20-DAY JLPT N3 INTENSIVE</p>
          <h2 id="pass20-title">One focused session. Every day. Exam-ready.</h2>
          <p>
            Work through all eight JLPT question styles in compact daily sets. Each day contains
            58 questions covering kanji, vocabulary, grammar, and passage practice.
          </p>
          <div className="pass20-skill-list" aria-label="Skills covered">
            {SKILLS.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </div>

        <aside className="pass20-progress-card" aria-label="Course progress">
          <span className="pass20-progress-label">Course progress</span>
          <strong>{overallProgress.completionPercent}<small>% complete</small></strong>
          <div className="pass20-progress-track" aria-hidden="true">
            <span style={{ width: `${overallProgress.completionPercent}%` }} />
          </div>
          <p>{overallProgress.answered.toLocaleString()} of {overallProgress.total.toLocaleString()} questions attempted</p>
          <div className="pass20-progress-stats">
            <span><strong>{completedDays}</strong>/20 days completed</span>
            <span><strong>{masteredDays}</strong>/20 days mastered</span>
          </div>
          <Link to={nextHref}>
            {nextDay.progress.status === 'in-progress' ? 'Continue' : overallProgress.isCompleted ? 'Review' : 'Start'} Day {nextDay.dayNumber}
          </Link>
        </aside>
      </div>

      <div className="pass20-phases">
        {PHASES.map((phase, phaseIndex) => {
          const phaseDays = days.slice(
            phaseIndex * DAYS_PER_PHASE,
            (phaseIndex + 1) * DAYS_PER_PHASE
          );

          return (
            <section className="pass20-phase" key={phase.label} aria-labelledby={`pass20-phase-${phaseIndex + 1}`}>
              <header className="pass20-phase-header">
                <div>
                  <span>Phase {phaseIndex + 1}</span>
                  <h3 id={`pass20-phase-${phaseIndex + 1}`}>{phase.label}</h3>
                </div>
                <p>{phase.summary}</p>
                <strong>Days {phaseIndex * DAYS_PER_PHASE + 1}-{(phaseIndex + 1) * DAYS_PER_PHASE}</strong>
              </header>

              <div className="pass20-day-grid">
                {phaseDays.map((day) => (
                  <article className={`pass20-day-card is-${day.progress.status}`} key={day.id}>
                    <div className="pass20-day-number">
                      <span>DAY</span>
                      <strong>{String(day.dayNumber).padStart(2, '0')}</strong>
                    </div>
                    <div className="pass20-day-content">
                      <div className="pass20-day-heading">
                        <div>
                          <span>{STATUS_LABELS[day.progress.status]}</span>
                          <h4>{day.title || `Daily Drill ${day.dayNumber}`}</h4>
                        </div>
                        <strong>{day.progress.completionPercent}%</strong>
                      </div>
                      <div className="pass20-day-progress">
                        <span style={{ width: `${day.progress.completionPercent}%` }} />
                      </div>
                      <div className="pass20-section-rail" aria-label={`Day ${day.dayNumber} section progress`}>
                        {day.progress.sections.map(section => (
                          <span
                            className={`is-${section.status}`}
                            key={section.label}
                            title={`${section.label}: ${section.completionPercent}%`}
                          />
                        ))}
                      </div>
                      <div className="pass20-day-footer">
                        <span>
                          {day.progress.answered}/{day.total} attempted
                          {day.progress.answered > 0 ? ` - ${day.progress.accuracyPercent}% accuracy` : ''}
                        </span>
                        <Link to={`/books/${book.id}/chapters/${day.id}`}>
                          {day.progress.status === 'in-progress'
                            ? 'Continue drill'
                            : day.progress.isCompleted
                              ? 'Review day'
                              : 'Start drill'}
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
};

export default PassN3Within20DaysChapterList;
