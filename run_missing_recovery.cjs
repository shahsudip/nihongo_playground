const { execSync } = require('child_process');

const scriptsToRun = [
  "Shin Mon Shared\\extract_all_notes.cjs",
  "Shin Mon Shared\\fix_notes.cjs",
  "Shin Mon Shared\\extract_notes_19_20.cjs",
  "Shin Mon Shared\\fix_broken_notes.cjs",
  "Shin Mon Shared\\fix_question_prefixes.cjs",
  "Shin Mon Shared\\fix_part3_prefix.cjs",
  "Shin Mon Shared\\fix_other_parts_prefix.cjs",
  "Shin Mon Shared\\remove_english.cjs",
  "Shin Mon Shared\\patch_filled_blanks.cjs",
  "Shin Mon Shared\\fix_all_citations.cjs",
  "Shin Mon Shared\\revert_citations.cjs",
  "Shin Mon Shared\\fix_37_citation.cjs"
];

for (const script of scriptsToRun) {
  try {
    console.log(`Running ${script}...`);
    execSync(`node "${script}"`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Error running ${script}:`, err.message);
  }
}

console.log('Running fix_distribution_final.cjs...');
try {
  execSync(`node fix_distribution_final.cjs`, { stdio: 'inherit' });
} catch (e) {
  console.error("Error in fix_distribution_final:", e.message);
}

console.log('DONE missing recovery!');
