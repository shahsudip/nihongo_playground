// scripts/verify_speedmaster.cjs
// Enhanced Verification Pipeline for Speed Master Dokkai modules (N3, N2, N1)
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const dataDir = path.join(projectRoot, 'src', 'data', 'speed_master_n3_reading');

if (!fs.existsSync(dataDir)) {
    console.error(`❌ Data directory not found: ${dataDir}`);
    process.exit(1);
}

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json')).sort();
const vietnameseCharRegex = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/i;

console.log(`======================================================`);
console.log(`🔍 Speed Master Dokkai Integrity & Visual Asset Audit`);
console.log(`Directory: ${dataDir}`);
console.log(`Public Root: ${publicDir}`);
console.log(`Total Chapters: ${files.length}`);
console.log(`======================================================\n`);

let errorCount = 0;
let warningCount = 0;
let totalQuestions = 0;
let totalVocab = 0;
let totalFootnotes = 0;
let totalAssetsChecked = 0;

// Helper: Check if a public asset path exists
function checkAssetExists(assetPath, context) {
    if (!assetPath) return null;
    totalAssetsChecked++;
    // Strip leading /nihongo_playground/ or /
    let clean = assetPath.replace(/^\/nihongo_playground\//, '/').replace(/^\//, '');
    const fullAssetPath = path.join(publicDir, clean);
    if (!fs.existsSync(fullAssetPath)) {
        return `Missing asset file [${assetPath}] referenced in ${context}`;
    }
    return null;
}

// Helper: Extract all src="..." image/svg references from an HTML string
function extractHtmlImageSources(html) {
    if (!html || typeof html !== 'string') return [];
    const matches = [];
    const srcRegex = /src=["']([^"']+)["']/g;
    let match;
    while ((match = srcRegex.exec(html)) !== null) {
        matches.push(match[1]);
    }
    return matches;
}

// Helper: Strip HTML and ruby tags for option matching
function normalizeText(str) {
    if (!str) return '';
    return str
        .replace(/<rt>.*?<\/rt>/g, '')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, '')
        .trim();
}

for (const file of files) {
    const fullPath = path.join(dataDir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    let data;
    try {
        data = JSON.parse(content);
    } catch (e) {
        console.error(`❌ ${file}: Invalid JSON - ${e.message}`);
        errorCount++;
        continue;
    }

    const checkIssues = [];
    const checkWarnings = [];

    // 1. Language & Vietnamese check
    if (vietnameseCharRegex.test(content)) {
        checkIssues.push(`Contains Vietnamese characters`);
    }

    // 2. Ruby / Furigana Tag Matching
    const rubyOpenCount = (content.match(/<ruby>/g) || []).length;
    const rubyCloseCount = (content.match(/<\/ruby>/g) || []).length;
    const rtOpenCount = (content.match(/<rt>/g) || []).length;
    const rtCloseCount = (content.match(/<\/rt>/g) || []).length;

    if (rubyOpenCount !== rubyCloseCount) {
        checkIssues.push(`Mismatched <ruby> tags: ${rubyOpenCount} open vs ${rubyCloseCount} close`);
    }
    if (rtOpenCount !== rtCloseCount) {
        checkIssues.push(`Mismatched <rt> tags: ${rtOpenCount} open vs ${rtCloseCount} close`);
    }

    // 3. Required Fields
    if (!data.id && !data.chapterId) checkIssues.push(`Missing id or chapterId`);
    if (!data.part) checkIssues.push(`Missing part`);
    if (!data.section) checkIssues.push(`Missing section`);
    if (!data.title) checkIssues.push(`Missing title`);
    if (!data.passageText && !data.sections && !data.passage) {
        checkIssues.push(`Missing passageText / passage content`);
    }

    // 4. Visual Asset & Diagram Integrity Checks (Zero Broken Images)
    const assetRefs = [
        { path: data.imageSrc, name: 'data.imageSrc' },
        { path: data.pageScan, name: 'data.pageScan' },
        { path: data.footnotesDiagram, name: 'data.footnotesDiagram' },
        { path: data.footnotesDiagramLeft, name: 'data.footnotesDiagramLeft' },
        { path: data.footnotesDiagramRight, name: 'data.footnotesDiagramRight' }
    ];

    // Check inline image sources in passageText
    const inlineSources = extractHtmlImageSources(data.passageText || data.passage || '');
    inlineSources.forEach((src, sIdx) => {
        assetRefs.push({ path: src, name: `passageText inline img[${sIdx}]` });
    });

    // Check assets in sections (if present, e.g. mock exam)
    if (Array.isArray(data.sections)) {
        data.sections.forEach((sec, secIdx) => {
            if (sec.pageScan) assetRefs.push({ path: sec.pageScan, name: `section[${secIdx}].pageScan` });
            if (sec.footnotesDiagram) assetRefs.push({ path: sec.footnotesDiagram, name: `section[${secIdx}].footnotesDiagram` });
            if (sec.footnotesDiagramLeft) assetRefs.push({ path: sec.footnotesDiagramLeft, name: `section[${secIdx}].footnotesDiagramLeft` });
            if (sec.footnotesDiagramRight) assetRefs.push({ path: sec.footnotesDiagramRight, name: `section[${secIdx}].footnotesDiagramRight` });

            const secInlineSources = extractHtmlImageSources(sec.passageText || '');
            secInlineSources.forEach((src, sIdx) => {
                assetRefs.push({ path: src, name: `section[${secIdx}].passageText inline img[${sIdx}]` });
            });
        });
    }

    for (const ref of assetRefs) {
        if (ref.path) {
            const err = checkAssetExists(ref.path, ref.name);
            if (err) checkIssues.push(err);
        }
    }

    // 5. Flyer & Graph Layout Verifications (情報検索 chapters)
    if (data.id && data.id.startsWith('search-')) {
        const text = data.passageText || '';
        // If it contains a flyer, ensure proper container card
        if (text.includes('flyer') || text.includes('.svg') || text.includes('チラシ')) {
            if (!text.includes('speed-master-flyer-card') && !text.includes('speed-master-memo-card') && !text.includes('speed-master-diagram-img')) {
                checkWarnings.push(`Search flyer passage may lack .speed-master-flyer-card container`);
            }
        }
    }

    // 6. Mock Exam Section Integrity
    if (data.id === 'mock-exam') {
        if (!Array.isArray(data.sections) || data.sections.length === 0) {
            checkIssues.push(`Mock exam must define 'sections' array for structured dual-mode rendering`);
        } else {
            const coveredIndices = new Set();
            data.sections.forEach((sec, sIdx) => {
                if (!sec.id) checkIssues.push(`Section[${sIdx}] missing id`);
                if (!sec.sectionTitle) checkIssues.push(`Section[${sIdx}] missing sectionTitle`);
                if (!sec.passageText) checkIssues.push(`Section[${sIdx}] missing passageText`);
                if (!Array.isArray(sec.questionIndices) || sec.questionIndices.length === 0) {
                    checkIssues.push(`Section[${sIdx}] missing questionIndices`);
                } else {
                    sec.questionIndices.forEach(qIdx => {
                        if (coveredIndices.has(qIdx)) {
                            checkIssues.push(`Duplicate questionIndex ${qIdx} in section[${sIdx}]`);
                        }
                        coveredIndices.add(qIdx);
                    });
                }
            });

            // Ensure all questions 0..totalQuestions-1 are covered
            const qLen = Array.isArray(data.questions) ? data.questions.length : 0;
            for (let i = 0; i < qLen; i++) {
                if (!coveredIndices.has(i)) {
                    checkIssues.push(`Mock question index ${i} (Q${i + 1}) is not mapped to any section`);
                }
            }
        }
    }

    // 7. Vocabulary Check
    if (Array.isArray(data.vocabulary)) {
        totalVocab += data.vocabulary.length;
        data.vocabulary.forEach((v, vIdx) => {
            if (!v.word || !v.meaning) {
                checkIssues.push(`Vocabulary[${vIdx}] missing word or meaning`);
            }
        });
    }

    // 8. Footnotes Check
    if (Array.isArray(data.footnotes)) {
        totalFootnotes += data.footnotes.length;
        data.footnotes.forEach((fn, fnIdx) => {
            if (!fn.term || !fn.definition) {
                checkIssues.push(`Footnote[${fnIdx}] missing term or definition`);
            }
        });
    }

    // 9. Questions & Option Accuracy Check
    if (!Array.isArray(data.questions) || data.questions.length === 0) {
        checkIssues.push(`No questions found in chapter`);
    } else {
        totalQuestions += data.questions.length;
        data.questions.forEach((q, qIdx) => {
            if (!q.options || q.options.length !== 4) {
                checkIssues.push(`Question[${qIdx}] must have exactly 4 options (found: ${q.options ? q.options.length : 0})`);
            }
            if (typeof q.correct !== 'number' || q.correct < 1 || q.correct > 4) {
                checkIssues.push(`Question[${qIdx}] invalid correct index (must be 1-4): ${q.correct}`);
            }
            if (!q.correctOption) {
                checkIssues.push(`Question[${qIdx}] missing correctOption text`);
            } else if (q.options && q.options[q.correct - 1]) {
                const normSelected = normalizeText(q.options[q.correct - 1]);
                const normCorrect = normalizeText(q.correctOption);
                if (normSelected !== normCorrect) {
                    checkIssues.push(`Question[${qIdx}] correctOption mismatch with options[${q.correct - 1}]: "${q.correctOption}" vs "${q.options[q.correct - 1]}"`);
                }
            }
            if (!q.questionText) {
                checkIssues.push(`Question[${qIdx}] missing questionText`);
            }
            if (!q.explanation) {
                checkWarnings.push(`Question[${qIdx}] missing detailed explanation`);
            }
        });
    }

    // Output per chapter
    if (checkIssues.length > 0) {
        console.error(`❌ ${file}:`);
        checkIssues.forEach(iss => console.error(`    - 🚨 ${iss}`));
        errorCount += checkIssues.length;
    } else if (checkWarnings.length > 0) {
        console.warn(`⚠️  ${file} OK with warnings:`);
        checkWarnings.forEach(w => console.warn(`    - ⚠️  ${w}`));
        warningCount += checkWarnings.length;
    } else {
        const qCount = Array.isArray(data.questions) ? data.questions.length : 0;
        console.log(`✓ ${file.padEnd(16)} OK (${qCount} Qs, ${rubyOpenCount} ruby, all assets valid)`);
    }
}

console.log(`\n======================================================`);
console.log(`📊 Comprehensive Verification Summary:`);
console.log(`  Total Files:          ${files.length}`);
console.log(`  Total Questions:      ${totalQuestions} (All 4-option JLPT format)`);
console.log(`  Total Vocab Words:    ${totalVocab}`);
console.log(`  Total Footnotes:      ${totalFootnotes}`);
console.log(`  Total Assets Checked: ${totalAssetsChecked} (Scans, Diagrams, SVGs, PNGs)`);
console.log(`  Warnings:             ${warningCount}`);
console.log(`  Errors / Issues:      ${errorCount}`);
console.log(`======================================================\n`);

if (errorCount > 0) {
    console.error(`❌ Verification failed with ${errorCount} error(s). Please fix before deploying.`);
    process.exit(1);
} else {
    console.log(`🎉 All ${files.length} Speed Master Dokkai chapters passed 100% verification! Ready for production.`);
    process.exit(0);
}
