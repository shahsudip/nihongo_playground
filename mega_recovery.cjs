const { execSync } = require('child_process');
const fs = require('fs');

console.log('Starting full database recovery...');

const scriptsToRun = [
  "Shin Mon Shared\\rebuild_all_safely.cjs",
  "Shin Mon Shared\\style_mondai_17.cjs",
  "Shin Mon Shared\\style_mondai_21.cjs",
  "Shin Mon Shared\\style_mondai_22.cjs",
  "Shin Mon Shared\\style_mondai_23.cjs",
  "Shin Mon Shared\\style_mondai_24.cjs",
  "Shin Mon Shared\\style_mondai_25.cjs",
  "Shin Mon Shared\\style_mondai_26.cjs",
  "Shin Mon Shared\\style_mondai_27.cjs",
  "Shin Mon Shared\\style_mondai_28.cjs",
  "Shin Mon Shared\\style_mondai_29.cjs",
  "Shin Mon Shared\\style_mondai_30.cjs",
  "Shin Mon Shared\\style_mondai_31.cjs",
  "Shin Mon Shared\\style_mondai_32.cjs",
  "Shin Mon Shared\\style_mondai_33.cjs",
  "Shin Mon Shared\\style_mondai_34.cjs",
  "Shin Mon Shared\\style_mondai_35.cjs",
  "Shin Mon Shared\\style_mondai_36.cjs",
  "Shin Mon Shared\\style_mondai_37.cjs",
  "Shin Mon Shared\\style_mondai_38.cjs",
  "Shin Mon Shared\\style_mondai_39.cjs",
  "Shin Mon Shared\\style_mondai_40.cjs",
  "Shin Mon Shared\\style_mondai_41.cjs",
  "Shin Mon Shared\\style_mondai_42.cjs",
  "Shin Mon Shared\\style_mondai_43.cjs",
  "Shin Mon Shared\\style_mondai_44.cjs",
  "Shin Mon Shared\\style_mondai_45.cjs",
  "Shin Mon Shared\\fix_mondai_15.cjs",
  "Shin Mon Shared\\fix_mondai_17.cjs",
  "Shin Mon Shared\\fix_mondai_27.cjs",
  "Shin Mon Shared\\fix_mondai_27_colors.cjs",
  "Shin Mon Shared\\fix_mondai_41.cjs",
  "Shin Mon Shared\\fix_mondai_48.cjs",
  "Shin Mon Shared\\fix_mondai_48_49_q_underlines.cjs",
  "Shin Mon Shared\\fix_mondai_48_html_opt4.cjs",
  "Shin Mon Shared\\fix_mondai_48_opt4.cjs",
  "Shin Mon Shared\\fix_mondai_48_paragraphs.cjs",
  "Shin Mon Shared\\fix_mondai_49.cjs",
  "Shin Mon Shared\\fix_mondai_50.cjs",
  "Shin Mon Shared\\fix_mondai_50_remove_underline.cjs",
  "Shin Mon Shared\\fix_mondai_50_underline.cjs",
  "Shin Mon Shared\\fix_mondai_51.cjs",
  "Shin Mon Shared\\fix_mondai_51_typos.cjs",
  "Shin Mon Shared\\fix_mondai_52.cjs",
  "Shin Mon Shared\\fix_mondai_52_53_layout.cjs",
  "Shin Mon Shared\\fix_mondai_52_53_stylish.cjs",
  "Shin Mon Shared\\fix_mondai_53.cjs",
  "Shin Mon Shared\\fix_mondai_54_floorplan.cjs",
  "Shin Mon Shared\\fix_mondai_7_47.cjs",
  "Shin Mon Shared\\fix_mondai_headers.cjs",
  "Shin Mon Shared\\fix_mondai_headers_position.cjs"
];

for (const script of scriptsToRun) {
  try {
    console.log(`Running ${script}...`);
    execSync(`node "${script}"`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Error running ${script}:`, err.message);
  }
}

// Now restore 56-63 SVGs
console.log('Restoring 56-63 SVGs...');
const { sampleBooks } = require('./src/data/book_data.jsx');
const svgs = JSON.parse(fs.readFileSync('./saved_svgs.json', 'utf8'));
const shinkanzen = sampleBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

if (shinkanzen) {
  shinkanzen.chapters.forEach(c => {
    c.passages?.forEach(p => {
      const numMatch = p.title.match(/問題\s*(\d+)/) || p.title.match(/(?:^|\b)(\d+)(?:\)|\b|$)/);
      if (numMatch) {
        const n = parseInt(numMatch[1]);
        if (n >= 56 && n <= 63 && svgs[n]) {
          p.passageText = svgs[n];
          p.passageLayout = "html";
          p.title = "問題" + n + " (Visual Layout Format)";
        }
      }
    });
  });
  const newContent = 'export const sampleBooks = ' + JSON.stringify(sampleBooks, null, 2) + ';\n';
  fs.writeFileSync('./src/data/book_data.jsx', newContent, 'utf8');
}

console.log('Running fix_distribution.cjs...');
try {
  execSync(`node fix_distribution.cjs`, { stdio: 'inherit' });
} catch (e) {
  console.error("Error in fix_distribution:", e.message);
}

console.log('Running restore_titles.cjs...');
try {
  execSync(`node restore_titles.cjs`, { stdio: 'inherit' });
} catch (e) {
  console.error("Error in restore_titles:", e.message);
}

// One final push to ensure titles are synced to Firebase
console.log('Re-pushing to Firebase to ensure titles are synced...');
try {
  execSync(`node "Shin Mon Shared\\push_shinkanzen.cjs"`, { stdio: 'inherit' });
} catch (e) {}

console.log('DONE!');
