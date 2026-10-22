import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  getQuestionGroupProgress,
  summarizeProgress,
} from '../utils/bookProgress.js';

const CHAPTER_RANGES = [
  '001-048',
  '049-102',
  '103-150',
  '151-198',
  '199-252',
  '253-300',
  '301-350'
];

const SECTION_LABELS = [
  'Reading in context',
  'Kanji in context',
  'Word readings',
  'Kanji in phrases'
];

const STATUS_LABELS = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  completed: 'Completed',
  mastered: 'Mastered',
};

const getChapterProgress = (chapter, chapterId, history) => {
  const groups = chapter?.sections || chapter?.passages || [];
  const fullRecord = history[chapterId];
  const sections = groups.map((group, index) => ({
    ...getQuestionGroupProgress(group.questions || [], {
      scopedRecords: [history[`${chapterId}--section-${index + 1}`]],
      fullRecords: [fullRecord],
    }),
    label: SECTION_LABELS[index] || group.title || `Section ${index + 1}`,
  }));

  return {
    ...summarizeProgress(sections),
    sections,
  };
};

const FirstTimeN3KanjiChapterList = ({ book, chapters = [], history = {} }) => {
  const chapterCards = useMemo(() => {
    const orderedChapters = [...chapters].sort((left, right) => {
      const leftNumber = left.chapterNumber || Number.parseInt(left.id?.match(/\d+/)?.[0], 10) || 0;
      const rightNumber = right.chapterNumber || Number.parseInt(right.id?.match(/\d+/)?.[0], 10) || 0;
      return leftNumber - rightNumber;
    });

    return CHAPTER_RANGES.map((range, index) => {
      const chapter = orderedChapters[index] || {};
      const id = chapter.id || `chapter-${index + 1}`;
      const progress = getChapterProgress(chapter, id, history);
      return {
        ...chapter,
        id,
        number: index + 1,
        range,
        total: progress.total,
        progress,
      };
    });
  }, [chapters, history]);

  const overallProgress = useMemo(
    () => summarizeProgress(chapterCards.map(chapter => chapter.progress)),
    [chapterCards]
  );
  const completedChapters = chapterCards.filter(chapter => chapter.progress.isCompleted).length;
  const masteredChapters = chapterCards.filter(chapter => chapter.progress.isMastered).length;
  const resumeChapter = chapterCards.find(chapter => !chapter.progress.isCompleted) || chapterCards[0];
  const incompleteSectionIndex = resumeChapter.progress.sections.findIndex(section => !section.isCompleted);
  const resumeSectionIndex = incompleteSectionIndex >= 0 ? incompleteSectionIndex : 0;
  const resumeHref = `/books/${book.id}/chapters/${resumeChapter.id}?section=${resumeSectionIndex + 1}`;

  return (
    <section className="ft350-dashboard" aria-labelledby="ft350-dashboard-title">
      <div className="ft350-hero">
        <div className="ft350-hero-copy">
          <p className="ft350-kicker">JLPT N3 KANJI WORKBOOK</p>
          <h2 id="ft350-dashboard-title">Build recognition through focused tests.</h2>
          <p>Seven chapters cover 350 kanji with reading and spelling practice. Choose a 10-question section or take the complete 40-question chapter test.</p>
          <div className="ft350-hero-stats" aria-label="Book contents">
            <span><strong>7</strong> chapters</span>
            <span><strong>28</strong> sections</span>
            <span><strong>280</strong> questions</span>
          </div>
        </div>
        <aside className="ft350-resume-card" aria-label="Book progress">
          <div className="ft350-overall-progress">
            <div
              className="ft350-progress-ring"
              style={{ '--ft-progress': `${overallProgress.completionPercent}%` }}
              aria-label={`${overallProgress.completionPercent}% complete`}
            >
              <strong>{overallProgress.completionPercent}%</strong>
            </div>
            <div>
              <span className="ft350-resume-label">Book progress</span>
              <strong>{overallProgress.answered}/{overallProgress.total}</strong>
              <span>questions attempted</span>
            </div>
          </div>
          <div className="ft350-progress-stats">
            <span><strong>{completedChapters}</strong>/7 completed</span>
            <span><strong>{masteredChapters}</strong>/7 mastered</span>
          </div>
          <div className="ft350-next-step">
            <span>Next: Chapter {resumeChapter.number}, Section {resumeSectionIndex + 1}</span>
            <Link to={resumeHref}>{overallProgress.isCompleted ? 'Review practice' : 'Continue practice'}</Link>
          </div>
        </aside>
      </div>

      <div className="ft350-chapter-grid">
        {chapterCards.map((chapter) => {
          return (
            <article className={`ft350-chapter-card is-${chapter.progress.status}`} key={chapter.id}>
              <header className="ft350-chapter-card-header">
                <span className="ft350-chapter-number" aria-hidden="true">{String(chapter.number).padStart(2, '0')}</span>
                <div>
                  <p>Chapter {chapter.number}</p>
                  <h3>Kanji {chapter.range}</h3>
                </div>
                <span className="ft350-score-box" aria-label={`${chapter.progress.completionPercent}% complete`}>
                  {chapter.progress.completionPercent}%
                </span>
              </header>

              <div className="ft350-progress-summary">
                <div className="ft350-progress-copy">
                  <span>{chapter.progress.answered}/{chapter.total} attempted</span>
                  <span>
                    {chapter.progress.answered > 0
                      ? `${chapter.progress.accuracyPercent}% accuracy`
                      : STATUS_LABELS[chapter.progress.status]}
                  </span>
                </div>
                <div className="ft350-section-rail" aria-label={`Chapter ${chapter.number} section progress`}>
                  {chapter.progress.sections.map((section, index) => (
                    <span
                      key={section.label}
                      className={`is-${section.status}`}
                      title={`Section ${index + 1}: ${STATUS_LABELS[section.status]}`}
                    />
                  ))}
                </div>
              </div>

              <div className="ft350-section-links" aria-label={`Chapter ${chapter.number} practice sections`}>
                {chapter.progress.sections.map((section, index) => (
                  <Link
                    className={`is-${section.status}`}
                    key={section.label}
                    to={`/books/${book.id}/chapters/${chapter.id}?section=${index + 1}`}
                  >
                    <span>{index + 1}</span>
                    <span>
                      {section.label}
                      <small>{STATUS_LABELS[section.status]}</small>
                    </span>
                    <small>{section.answered}/{section.total}</small>
                  </Link>
                ))}
              </div>

              <Link className="ft350-full-test-link" to={`/books/${book.id}/chapters/${chapter.id}`}>
                Full chapter test <span>{STATUS_LABELS[chapter.progress.status]} - {chapter.total} questions</span>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default FirstTimeN3KanjiChapterList;
