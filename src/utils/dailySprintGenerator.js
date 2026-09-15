// src/utils/dailySprintGenerator.js

// Eagerly load all local Shinkanzen reading JSON files
const shinkanzenModules = import.meta.glob('../data/shinkanzen_reading/*.json', { eager: true });

/**
 * Extracts and normalizes all individual passages from Shinkanzen Reading files.
 * @returns {Array<Object>} List of 52 normalized passage objects
 */
export const getAllShinkanzenPassages = () => {
  const allPassages = [];

  // 1. Process part-1.json (contains 13 basic competence short passages)
  const part1Key = Object.keys(shinkanzenModules).find(k => k.endsWith('part-1.json'));
  if (part1Key && shinkanzenModules[part1Key]) {
    const part1Data = shinkanzenModules[part1Key].default || shinkanzenModules[part1Key];
    if (part1Data.passages && Array.isArray(part1Data.passages)) {
      part1Data.passages.forEach((p, idx) => {
        allPassages.push({
          id: `part1-p${idx + 1}`,
          sourceFile: 'part-1.json',
          part: 1,
          partTitle: '第1部：基礎力をつけよう',
          partTitleEn: 'Building Basic Competence',
          mondaiNumber: idx + 1,
          title: p.title || `第1部 問題${idx + 1}`,
          type: 'short',
          genre: p.sectionHeader?.japanese || '書き言葉・短文',
          genreEn: p.sectionHeader?.english || 'Short Text Basics',
          passageText: p.passageText || '',
          footnotes: p.footnotes || [],
          vocabulary: p.vocabulary || [],
          questions: p.questions || [],
          estimatedMinutes: 4
        });
      });
    }
  }

  // 2. Process all individual mondai files (mondai-14 to mondai-65)
  Object.keys(shinkanzenModules).forEach(key => {
    if (key.endsWith('part-1.json')) return;
    const data = shinkanzenModules[key].default || shinkanzenModules[key];
    const rawId = data.chapterId || data.id || key.split('/').pop().replace('.json', '');
    const mondaiNum = data.mondaiNumber || parseInt(rawId.replace(/\D/g, '')) || 14;

    let part = data.part || 2;
    let type = 'medium';
    if (mondaiNum >= 29) {
      part = 4;
      type = 'info_retrieval';
    } else if (mondaiNum >= 21) {
      part = 3;
      type = 'long';
    } else if (mondaiNum >= 14) {
      part = 2;
      type = 'short_medium';
    }

    const genreText = typeof data.genre === 'object' ? data.genre?.japanese : data.genre || '読解文章';
    const genreEnText = typeof data.genre === 'object' ? data.genre?.english : data.genreEn || 'Reading Passage';

    allPassages.push({
      id: rawId,
      sourceFile: key.split('/').pop(),
      part: part,
      partTitle: data.partTitle || `第${part}部`,
      partTitleEn: data.partTitleEn || `Part ${part}`,
      mondaiNumber: mondaiNum,
      title: data.title || `問題 ${mondaiNum}`,
      type: type,
      genre: genreText,
      genreEn: genreEnText,
      preReading: data.preReading || '',
      preReadingPrompt: data.preReadingPrompt || '',
      mondaiHeader: data.mondaiHeader || '',
      passageText: data.passageText || '',
      footnotes: data.footnotes || [],
      vocabulary: data.vocabulary || [],
      questions: data.questions || [],
      imageSrc: data.imageSrc || null,
      estimatedMinutes: type === 'long' || type === 'info_retrieval' ? 7 : 5
    });
  });

  return allPassages.sort((a, b) => a.mondaiNumber - b.mondaiNumber);
};

/**
 * Distributes all passages into 15 curated, balanced daily sprint missions.
 * Each daily mission contains a balanced mix:
 * - 1 Short text / notice (Part 1 or Part 2)
 * - 1 Medium text / essay / instructions (Part 2 or Part 3)
 * - 1-2 Long form / Information retrieval / flyer / chart (Part 3 or Part 4)
 * Total time per day: 20 minutes (1200 seconds)
 * 
 * @returns {Array<Object>} 15 Daily Sprint definitions
 */
export const generateShinkanzenDailySprints = () => {
  const allPassages = getAllShinkanzenPassages();
  
  // Categorize into pools
  const poolShort = allPassages.filter(p => p.part === 1 || p.mondaiNumber <= 17);
  const poolMedium = allPassages.filter(p => p.part === 2 && p.mondaiNumber > 17);
  const poolLongAndInfo = allPassages.filter(p => p.part >= 3);

  const TOTAL_SPRINT_DAYS = 15;
  const sprints = [];

  for (let day = 1; day <= TOTAL_SPRINT_DAYS; day++) {
    const dayPassages = [];

    // Pick 1 from short pool
    if (poolShort.length > 0) {
      const idx = (day - 1) % poolShort.length;
      dayPassages.push(poolShort[idx]);
    }

    // Pick 1 from medium pool
    if (poolMedium.length > 0) {
      const idx = (day - 1) % poolMedium.length;
      dayPassages.push(poolMedium[idx]);
    }

    // Pick 1-2 from long & info retrieval pool
    if (poolLongAndInfo.length > 0) {
      const idx1 = ((day - 1) * 2) % poolLongAndInfo.length;
      const idx2 = ((day - 1) * 2 + 1) % poolLongAndInfo.length;
      dayPassages.push(poolLongAndInfo[idx1]);
      if (dayPassages.length < 4 && poolLongAndInfo[idx2] && idx1 !== idx2) {
        dayPassages.push(poolLongAndInfo[idx2]);
      }
    }

    // Count total questions in this daily set
    const totalQuestions = dayPassages.reduce((sum, p) => sum + (p.questions?.length || 0), 0);

    // Calculate genres summary
    const genres = [...new Set(dayPassages.map(p => p.genre))].filter(Boolean);

    sprints.push({
      dayNumber: day,
      id: `day-${day}`,
      sprintKey: `shinkanzen-sprint-day-${day}`,
      title: `Day ${day} Mission: Balanced Mixed Sprint`,
      titleJa: `第${day}日：実戦混合スプリント`,
      passages: dayPassages,
      passageCount: dayPassages.length,
      totalQuestions: totalQuestions || 4,
      allocatedMinutes: 20,
      allocatedSeconds: 20 * 60,
      genres: genres
    });
  }

  return sprints;
};

/**
 * Retrieves a single daily sprint by day number.
 * @param {number|string} dayNumber - e.g. 1, 2, ... 15
 * @returns {Object|null}
 */
export const getShinkanzenSprintByDay = (dayNumber) => {
  const day = parseInt(dayNumber, 10) || 1;
  const sprints = generateShinkanzenDailySprints();
  return sprints.find(s => s.dayNumber === day) || sprints[0] || null;
};
