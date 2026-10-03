/**
 * jlptScoring.js
 * 
 * Official JLPT Scaled Scoring Engine (JEES / Japan Foundation Standard).
 * Standard total score: 180 points.
 * 
 * Official Passing Criteria by Level:
 * - N1: Overall >= 100 / 180, each section >= 19 / 60
 * - N2: Overall >= 90 / 180,  each section >= 19 / 60
 * - N3: Overall >= 95 / 180,  each section >= 19 / 60 (Vocab: 19/60, Grammar/Reading: 19/60, Listening: 19/60)
 * - N4: Overall >= 90 / 180,  Knowledge & Reading >= 38 / 120, Listening >= 19 / 60
 * - N5: Overall >= 80 / 180,  Knowledge & Reading >= 38 / 120, Listening >= 19 / 60
 */

export const JLPT_LEVEL_STANDARDS = {
  N1: {
    level: 'N1',
    maxScore: 180,
    overallPassMark: 100, // 55.6%
    sections: {
      vocab_grammar: { label: '言語知識（文字・語彙・文法）', max: 60, pass: 19 },
      reading:       { label: '読解', max: 60, pass: 19 },
      listening:     { label: '聴解', max: 60, pass: 19 },
    },
  },
  N2: {
    level: 'N2',
    maxScore: 180,
    overallPassMark: 90, // 50.0%
    sections: {
      vocab_grammar: { label: '言語知識（文字・語彙・文法）', max: 60, pass: 19 },
      reading:       { label: '読解', max: 60, pass: 19 },
      listening:     { label: '聴解', max: 60, pass: 19 },
    },
  },
  N3: {
    level: 'N3',
    maxScore: 180,
    overallPassMark: 95, // 52.8% (As specified: 95/180 to pass, each section >= 19/60)
    sections: {
      vocab:           { label: '言語知識（文字・語彙）', max: 60, pass: 19 },
      grammar_reading: { label: '言語知識（文法）・読解', max: 60, pass: 19 },
      listening:       { label: '聴解', max: 60, pass: 19 },
    },
  },
  N4: {
    level: 'N4',
    maxScore: 180,
    overallPassMark: 90, // 50.0%
    sections: {
      knowledge_reading: { label: '言語知識（文字・語彙・文法）・読解', max: 120, pass: 38 },
      listening:         { label: '聴解', max: 60, pass: 19 },
    },
  },
  N5: {
    level: 'N5',
    maxScore: 180,
    overallPassMark: 80, // 44.4%
    sections: {
      knowledge_reading: { label: '言語知識（文字・語彙・文法）・読解', max: 120, pass: 38 },
      listening:         { label: '聴解', max: 60, pass: 19 },
    },
  },
};

/**
 * Calculates official JLPT scaled scores and sectional pass/fail status.
 * 
 * Supports:
 * - 3-section full exams (180 points standard, e.g. Vocab 60, Grammar/Reading 60, Listening 60)
 * - 2-section written exams (120 points, e.g. Vocab 60, Grammar/Reading 60)
 * - Strict sectional passing minimums: each section MUST be >= 19/60 (or >= 38/120 for N4/N5 knowledge)
 * 
 * @param {string} level - 'N1' | 'N2' | 'N3' | 'N4' | 'N5'
 * @param {Array} sections - array of section objects from the exam (each with id, questions)
 * @param {Object} answers - map of { [questionId]: chosenOption }
 * @returns {Object} Full breakdown of scores, scaled points, and pass/fail decision
 */
export function calculateJlptExamScore(level = 'N3', sections = [], answers = {}) {
  const normLevel = (level || 'N3').toUpperCase();
  const standard = JLPT_LEVEL_STANDARDS[normLevel] || JLPT_LEVEL_STANDARDS.N3;

  const sectionBreakdowns = [];
  let totalScaledScore = 0;
  let allSectionsPassed = true;
  let totalRawCorrect = 0;
  let totalRawQuestions = 0;
  let totalAnswered = 0;
  let calculatedMaxScore = 0;

  // Map sections
  sections.forEach((sec, idx) => {
    const qList = sec.questions || [];
    const totalQ = qList.length;
    let correctQ = 0;
    let answeredQ = 0;

    qList.forEach((q) => {
      const userChoice = answers[q.id];
      if (userChoice !== undefined && userChoice !== null) {
        answeredQ++;
        // Support both q.correct and q.correctIndex
        const expected = q.correct !== undefined ? q.correct : q.correctIndex;
        if (userChoice === expected) {
          correctQ++;
        }
      }
    });

    totalRawCorrect += correctQ;
    totalRawQuestions += totalQ;
    totalAnswered += answeredQ;

    // Determine target max and pass threshold for this section
    let maxPoints = 60;
    let minPassPoints = 19;

    const secIdLower = (sec.id || '').toLowerCase();
    const isListening = secIdLower.includes('listening') || secIdLower.includes('choukai');

    if (isListening) {
      maxPoints = 60;
      minPassPoints = 19;
    } else {
      const writtenSecCount = sections.filter(s => {
        const sid = (s.id || '').toLowerCase();
        return !sid.includes('listening') && !sid.includes('choukai');
      }).length;

      if (writtenSecCount === 1) {
        maxPoints = 120;
        minPassPoints = 38;
      } else {
        maxPoints = 60;
        minPassPoints = 19;
      }
    }

    calculatedMaxScore += maxPoints;

    const accuracy = totalQ > 0 ? (correctQ / totalQ) : 0;
    const scaledScore = Math.min(maxPoints, Math.round(accuracy * maxPoints));
    const isSectionPassed = scaledScore >= minPassPoints;

    if (!isSectionPassed) {
      allSectionsPassed = false;
    }

    totalScaledScore += scaledScore;

    sectionBreakdowns.push({
      sectionId: sec.id,
      title: sec.title || `Section ${idx + 1}`,
      totalQuestions: totalQ,
      answeredCount: answeredQ,
      correctCount: correctQ,
      accuracyPercentage: Math.round(accuracy * 100),
      scaledScore,
      maxPoints,
      minPassPoints,
      isPassed: isSectionPassed,
    });
  });

  // Calculate dynamic overall pass mark proportional to sections present
  // For standard 3 sections: 180 max, 95 pass mark for N3
  // For 2 sections: 120 max, round(95 * (120/180)) = 63 pass mark for N3
  const effectiveMaxScore = calculatedMaxScore > 0 ? calculatedMaxScore : standard.maxScore;
  const effectivePassMark = effectiveMaxScore === standard.maxScore
    ? standard.overallPassMark
    : Math.round(standard.overallPassMark * (effectiveMaxScore / standard.maxScore));

  // Clamp total scaled score to effective max score
  totalScaledScore = Math.min(effectiveMaxScore, totalScaledScore);

  const isTotalScorePassed = totalScaledScore >= effectivePassMark;
  const isFinalPass = isTotalScorePassed && allSectionsPassed;

  let failReason = null;
  if (!isFinalPass) {
    if (!isTotalScorePassed && !allSectionsPassed) {
      failReason = 'both'; // Both total score & sectional marks below passing threshold
    } else if (!isTotalScorePassed) {
      failReason = 'total_insufficient'; // Total score below pass mark
    } else {
      failReason = 'sectional_insufficient'; // Total score passed, but at least one section fell below 19 points
    }
  }

  return {
    level: normLevel,
    totalScaledScore,
    maxScore: effectiveMaxScore,
    overallPassMark: effectivePassMark,
    isPassed: isFinalPass,
    isTotalScorePassed,
    allSectionsPassed,
    failReason,
    totalRawCorrect,
    totalRawQuestions,
    totalAnswered,
    isFullyAnswered: totalAnswered === totalRawQuestions && totalRawQuestions > 0,
    sections: sectionBreakdowns,
  };
}

export default calculateJlptExamScore;
