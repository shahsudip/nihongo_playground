// src/utils/jlptExamPlanner.js

/**
 * Calculates the exact date of the Nth occurrence of a weekday in a given month and year.
 * @param {number} year - e.g. 2026
 * @param {number} month - 0-indexed (6 = July, 11 = December)
 * @param {number} weekday - 0 = Sunday, 1 = Monday, etc.
 * @param {number} nth - 1 for 1st Sunday
 * @returns {Date}
 */
export const getFirstSundayOfMonth = (year, month) => {
  const date = new Date(year, month, 1, 9, 0, 0); // 9:00 AM local time
  const day = date.getDay();
  const diff = (7 - day) % 7;
  date.setDate(1 + diff);
  return date;
};

/**
 * Returns the upcoming JLPT exam sessions (July and December).
 * JLPT is officially held worldwide twice a year:
 * - July: 1st Sunday of July
 * - December: 1st Sunday of December
 * Automatically computes exact dates for any future year in perpetuity.
 * 
 * @param {Date} [referenceDate] - Current date reference (defaults to client local time)
 * @param {Array<Object>} [customOverrides] - Optional remote official overrides (from Firestore/API)
 * @returns {Array<{ id: string, name: string, season: string, date: Date, daysLeft: number, formattedDate: string, registrationWindow: string, isNext: boolean }>}
 */
export const getUpcomingJlptExams = (referenceDate = new Date(), customOverrides = []) => {
  const now = new Date(referenceDate);
  // Reset time to start of day for precise day difference calculation
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const currentYear = today.getFullYear();
  // Candidate years: current year and next year
  const candidateYears = [currentYear, currentYear + 1];
  const exams = [];

  candidateYears.forEach(year => {
    // July Exam: 1st Sunday of July (Month index 6)
    const defaultJulyExam = getFirstSundayOfMonth(year, 6);
    // December Exam: 1st Sunday of December (Month index 11)
    const defaultDecExam = getFirstSundayOfMonth(year, 11);

    const sessions = [
      {
        monthName: 'July',
        season: 'Summer',
        date: defaultJulyExam,
        registrationWindow: `Early March – Mid April ${year}`
      },
      {
        monthName: 'December',
        season: 'Winter',
        date: defaultDecExam,
        registrationWindow: `Early August – Mid September ${year}`
      }
    ];

    sessions.forEach(({ monthName, season, date: defaultDate, registrationWindow }) => {
      // Check if there is an official remote override released for this session
      const sessionId = `${year}-${monthName.toLowerCase()}`;
      const override = customOverrides.find(o => o.id === sessionId || o.sessionId === sessionId);
      const examDate = override && override.date ? new Date(override.date) : defaultDate;

      const examDay = new Date(examDate.getFullYear(), examDate.getMonth(), examDate.getDate());
      const diffTime = examDay.getTime() - today.getTime();
      const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Strictly include future exams only (daysLeft >= 1)
      if (daysLeft >= 1) {
        const id = `${examDate.getFullYear()}-${examDate.getMonth() + 1 < 10 ? '0' : ''}${examDate.getMonth() + 1}`;
        const formattedDate = examDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        exams.push({
          id,
          sessionId,
          name: `${monthName} ${examDate.getFullYear()} JLPT`,
          season: `${season} Session`,
          date: examDate,
          daysLeft,
          formattedDate,
          registrationWindow: override?.registrationWindow || registrationWindow,
          isNext: false
        });
      }
    });
  });

  // Sort strictly in chronological order (earliest future exam first)
  exams.sort((a, b) => a.date.getTime() - b.date.getTime());
  if (exams.length > 0) {
    exams[0].isNext = true;
  }

  // Return the next 2 upcoming sessions (immediate next target and subsequent session)
  return exams.slice(0, 2);
};

/**
 * Returns the immediate next upcoming JLPT exam.
 * @param {Date} [referenceDate]
 * @returns {Object}
 */
export const getNextUpcomingExam = (referenceDate = new Date()) => {
  const exams = getUpcomingJlptExams(referenceDate);
  return exams[0] || {
    id: 'next-jlpt',
    name: 'Upcoming JLPT Exam',
    season: 'Next Session',
    daysLeft: 90,
    formattedDate: 'Upcoming Official Date',
    registrationWindow: 'Check official JLPT site'
  };
};




/**
 * Calculates a personalized study plan for a specific book.
 * @param {Object} book - Book metadata object from STATIC_BOOKS
 * @param {number} completedCount - Total completed chapters/sets
 * @param {string} [targetExamId] - Optional selected exam ID, defaults to nearest
 * @returns {Object} Study plan details including daily required quota and pace
 */
export const calculateBookPlan = (book, completedCount = 0, targetExamId = null) => {
  const upcomingExams = getUpcomingJlptExams();
  const selectedExam = (targetExamId && upcomingExams.find(e => e.id === targetExamId)) || upcomingExams[0] || {
    id: 'default',
    name: 'Upcoming JLPT',
    season: 'Next Session',
    daysLeft: 90,
    formattedDate: 'Upcoming Exam'
  };

  const total = Number(book.totalChapters) || 1;
  const completed = Math.min(total, Math.max(0, Number(completedCount) || 0));
  const remaining = Math.max(0, total - completed);
  const percent = Math.round((completed / total) * 100);

  const daysLeft = Math.max(1, selectedExam.daysLeft);

  // Daily quota calculation: how many chapters/sets needed per day
  let dailyQuota = 0;
  let weeklyQuota = 0;
  let paceStatus = 'on_track';
  let paceLabel = 'Comfortable Pace';
  let paceColor = '#10b981';

  if (remaining === 0) {
    paceStatus = 'completed';
    paceLabel = 'Mastered / Ready for Exam! 🎓';
    paceColor = '#10b981';
  } else {
    // If daysLeft is large, daily quota may be < 1 (e.g. 1 chapter every 3 days)
    const rawDaily = remaining / daysLeft;
    if (rawDaily >= 2) {
      dailyQuota = Math.ceil(rawDaily);
      weeklyQuota = dailyQuota * 7;
      paceStatus = 'intensive';
      paceLabel = `Intensive Sprint (${dailyQuota} sets/day)`;
      paceColor = '#ef4444';
    } else if (rawDaily >= 0.8) {
      dailyQuota = 1;
      weeklyQuota = 7;
      paceStatus = 'moderate';
      paceLabel = 'Steady Daily Progress (1 set/day)';
      paceColor = '#f59e0b';
    } else {
      dailyQuota = 1;
      const daysPerChapter = Math.floor(daysLeft / remaining);
      weeklyQuota = Math.max(1, Math.round(7 / (daysPerChapter || 1)));
      paceStatus = 'relaxed';
      paceLabel = `Relaxed Pace (1 set every ${daysPerChapter || 1} days)`;
      paceColor = '#3b82f6';
    }
  }

  return {
    book,
    selectedExam,
    upcomingExams,
    total,
    completed,
    remaining,
    percent,
    daysLeft,
    dailyQuota,
    weeklyQuota,
    paceStatus,
    paceLabel,
    paceColor
  };
};
