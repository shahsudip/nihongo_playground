/**
 * jlptScoring.js
 * 
 * JLPT score-range definitions and practice scoring helpers.
 * Exact official IRT item parameters and conversions are not public.
 * 
 * Official Passing Criteria by Level:
 * - N1: Overall >= 100 / 180, each section >= 19 / 60
 * - N2: Overall >= 90 / 180,  each section >= 19 / 60
 * - N3: Overall >= 95 / 180, each official scoring section >= 19 / 60
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

export const IRT_ESTIMATE_MODEL = Object.freeze({
  id: 'irt-3pl-eap-estimate',
  label: '3PL EAP practice estimate',
  version: '1.0.0',
  thetaMin: -4,
  thetaMax: 4,
  thetaStep: 0.05,
  scaleThetaMin: -3,
  scaleThetaMax: 3,
});

const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));

const finiteOr = (value, fallback) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
};

export function getIrtItemParameters(question, index, totalQuestions) {
  const explicit = question?.irt || {};
  const position = totalQuestions > 1 ? index / (totalQuestions - 1) : 0.5;
  const distanceFromCenter = Math.abs(position - 0.5) * 2;
  const fallbackDifficulty = -1.75 + (position * 3.5);
  const fallbackDiscrimination = 1.25 - (distanceFromCenter * 0.35);
  const optionCount = Array.isArray(question?.options) && question.options.length > 1
    ? question.options.length
    : 4;

  return {
    difficulty: clamp(finiteOr(explicit.difficulty, fallbackDifficulty), -3, 3),
    discrimination: clamp(finiteOr(explicit.discrimination, fallbackDiscrimination), 0.35, 2.5),
    guessing: clamp(finiteOr(explicit.guessing, 1 / optionCount), 0, 0.35),
    isExplicit: Number.isFinite(Number(explicit.difficulty))
      || Number.isFinite(Number(explicit.discrimination))
      || Number.isFinite(Number(explicit.guessing)),
  };
}

const getCorrectOptionIndex = question => (
  question?.correct !== undefined ? question.correct : question?.correctIndex
);

const getItemSuccessProbability = (theta, parameters) => {
  const exponent = -1.7 * parameters.discrimination * (theta - parameters.difficulty);
  const logistic = exponent >= 0
    ? Math.exp(-exponent) / (1 + Math.exp(-exponent))
    : 1 / (1 + Math.exp(exponent));
  const probability = parameters.guessing + ((1 - parameters.guessing) * logistic);
  return clamp(probability, 1e-9, 1 - 1e-9);
};

const thetaToScaledScore = (theta, maximumScore) => {
  const boundedTheta = clamp(
    theta,
    IRT_ESTIMATE_MODEL.scaleThetaMin,
    IRT_ESTIMATE_MODEL.scaleThetaMax,
  );
  const scaleRange = IRT_ESTIMATE_MODEL.scaleThetaMax - IRT_ESTIMATE_MODEL.scaleThetaMin;
  const normalized = (boundedTheta - IRT_ESTIMATE_MODEL.scaleThetaMin) / scaleRange;
  return Math.round(normalized * maximumScore);
};

export function estimateIrtSectionScore(questions = [], answers = {}, maximumScore = 60) {
  const questionList = Array.isArray(questions) ? questions : [];
  const totalQuestions = questionList.length;
  const safeMaximumScore = Math.max(1, finiteOr(maximumScore, 60));

  if (totalQuestions === 0) {
    return {
      scaledScore: 0,
      abilityEstimate: 0,
      standardError: 0,
      scaledStandardError: 0,
      answeredCount: 0,
      correctCount: 0,
      explicitParameterCount: 0,
      parameterSource: 'none',
    };
  }

  const items = questionList.map((question, index) => {
    const userChoice = answers?.[question.id];
    const isAnswered = userChoice !== undefined && userChoice !== null;
    return {
      parameters: getIrtItemParameters(question, index, totalQuestions),
      isAnswered,
      response: isAnswered && userChoice === getCorrectOptionIndex(question) ? 1 : 0,
    };
  });

  const answeredCount = items.filter(item => item.isAnswered).length;
  const correctCount = items.reduce((sum, item) => sum + item.response, 0);
  const explicitParameterCount = items.filter(item => item.parameters.isExplicit).length;
  const gridPointCount = Math.round(
    (IRT_ESTIMATE_MODEL.thetaMax - IRT_ESTIMATE_MODEL.thetaMin)
      / IRT_ESTIMATE_MODEL.thetaStep,
  );
  const posteriorPoints = [];

  for (let gridIndex = 0; gridIndex <= gridPointCount; gridIndex += 1) {
    const theta = IRT_ESTIMATE_MODEL.thetaMin + (gridIndex * IRT_ESTIMATE_MODEL.thetaStep);
    let logPosterior = -0.5 * theta * theta;

    items.forEach((item) => {
      const probability = getItemSuccessProbability(theta, item.parameters);
      logPosterior += item.response === 1
        ? Math.log(probability)
        : Math.log(1 - probability);
    });

    posteriorPoints.push({ theta, logPosterior });
  }

  const maximumLogPosterior = Math.max(...posteriorPoints.map(point => point.logPosterior));
  const weightedPoints = posteriorPoints.map(point => ({
    theta: point.theta,
    weight: Math.exp(point.logPosterior - maximumLogPosterior),
  }));
  const totalWeight = weightedPoints.reduce((sum, point) => sum + point.weight, 0);
  const abilityEstimate = weightedPoints.reduce(
    (sum, point) => sum + (point.theta * point.weight),
    0,
  ) / totalWeight;
  const variance = weightedPoints.reduce(
    (sum, point) => sum + (((point.theta - abilityEstimate) ** 2) * point.weight),
    0,
  ) / totalWeight;
  const standardError = Math.sqrt(Math.max(0, variance));

  let scaledScore = thetaToScaledScore(abilityEstimate, safeMaximumScore);
  if (answeredCount === 0 || correctCount === 0) scaledScore = 0;
  if (answeredCount === totalQuestions && correctCount === totalQuestions) {
    scaledScore = safeMaximumScore;
  }

  let parameterSource = 'deterministic-position-fallback';
  if (explicitParameterCount === totalQuestions) parameterSource = 'item-metadata';
  else if (explicitParameterCount > 0) parameterSource = 'mixed';

  return {
    scaledScore,
    abilityEstimate: Number(abilityEstimate.toFixed(3)),
    standardError: Number(standardError.toFixed(3)),
    scaledStandardError: Math.round(
      standardError
        * (safeMaximumScore / (
          IRT_ESTIMATE_MODEL.scaleThetaMax - IRT_ESTIMATE_MODEL.scaleThetaMin
        )),
    ),
    answeredCount,
    correctCount,
    explicitParameterCount,
    parameterSource,
  };
}

/**
 * Calculates a practice score report and sectional target status.
 * 
 * Supports:
 * - 3-section full exams (180 points standard, e.g. Vocab 60, Grammar/Reading 60, Listening 60)
 * - 2-section written exams (120 points, e.g. Vocab 60, Grammar/Reading 60)
 * - Strict sectional passing minimums: each section MUST be >= 19/60 (or >= 38/120 for N4/N5 knowledge)
 * 
 * @param {string} level - 'N1' | 'N2' | 'N3' | 'N4' | 'N5'
 * @param {Array} sections - array of section objects from the exam (each with id, questions)
 * @param {Object} answers - map of { [questionId]: chosenOption }
 * @param {Object} options - scoring model and section scale overrides
 * @returns {Object} Full breakdown of scores, scaled points, and pass/fail decision
 */
export function calculateJlptExamScore(level = 'N3', sections = [], answers = {}, options = {}) {
  const normLevel = (level || 'N3').toUpperCase();
  const standard = JLPT_LEVEL_STANDARDS[normLevel] || JLPT_LEVEL_STANDARDS.N3;
  const useIrtEstimate = options.scoringModel === IRT_ESTIMATE_MODEL.id
    || options.scoringModel === 'irt-eap';

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

    const configuredMaxPoints = finiteOr(sec.maxPoints, finiteOr(options.sectionMaxPoints, 0));
    const configuredPassPoints = finiteOr(
      sec.minPassPoints,
      finiteOr(options.sectionPassMark, 0),
    );

    if (configuredMaxPoints > 0) {
      maxPoints = configuredMaxPoints;
      minPassPoints = configuredPassPoints > 0 ? configuredPassPoints : 19;
    } else {
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
    }

    calculatedMaxScore += maxPoints;

    const accuracy = totalQ > 0 ? (correctQ / totalQ) : 0;
    const irtEstimate = useIrtEstimate
      ? estimateIrtSectionScore(qList, answers, maxPoints)
      : null;
    const scaledScore = irtEstimate
      ? irtEstimate.scaledScore
      : Math.min(maxPoints, Math.round(accuracy * maxPoints));
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
      scoringMethod: useIrtEstimate ? IRT_ESTIMATE_MODEL.id : 'raw-linear',
      isEstimated: useIrtEstimate,
      abilityEstimate: irtEstimate?.abilityEstimate ?? null,
      standardError: irtEstimate?.standardError ?? null,
      scaledStandardError: irtEstimate?.scaledStandardError ?? null,
      parameterSource: irtEstimate?.parameterSource ?? null,
      explicitParameterCount: irtEstimate?.explicitParameterCount ?? 0,
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
    scoringMethod: useIrtEstimate ? IRT_ESTIMATE_MODEL.id : 'raw-linear',
    scoringModelLabel: useIrtEstimate ? IRT_ESTIMATE_MODEL.label : 'Raw accuracy scaling',
    scoringModelVersion: useIrtEstimate ? IRT_ESTIMATE_MODEL.version : '1.0.0',
    isEstimated: useIrtEstimate,
    scoreNotice: useIrtEstimate
      ? 'Practice estimate only. Official JLPT item parameters and score conversion are not public.'
      : null,
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
