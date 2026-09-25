import json
import glob
import sys

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

n2_files = sorted(glob.glob('src/data/zenkamoku_n2/w*.json'))
print(f"Total N2 files: {len(n2_files)}")

issues = []
summary = {
    'w4_stem_issues': 0,
    'bg_white_issues': 0,
    'missing_lined_paper_w5_w7': 0,
    'missing_flyer_w8': 0,
    'options_count_issues': 0,
    'missing_ruby_in_passage': 0,
    'missing_underlines': 0
}

import re

for f in n2_files:
    m = re.search(r'w(\d+)-d(\d+)', f)
    if not m:
        continue
    week = int(m.group(1))
    day = int(m.group(2))
    if week < 4:
        continue
    with open(f, 'r', encoding='utf-8') as fp:
        data = json.load(fp)
    
    sections = data.get('sections', [])
    for s_idx, sec in enumerate(sections):
        passage = sec.get('passage', '')
        if passage:
            if 'bg-white' in passage:
                issues.append(f"[BG-WHITE] {f} sec {s_idx}")
                summary['bg_white_issues'] += 1
            if week in [5, 6, 7]:
                if 'speed-master-lined-paper' not in passage and '<table' not in passage:
                    issues.append(f"[NO LINED PAPER] Week {week} Day {day} {f} sec {s_idx}")
                    summary['missing_lined_paper_w5_w7'] += 1
            if week == 8:
                if 'speed-master-flyer-card' not in passage and '<table' not in passage and 'border' not in passage:
                    issues.append(f"[NO FLYER/TABLE] Week {week} Day {day} {f} sec {s_idx}")
                    summary['missing_flyer_w8'] += 1
            if '<ruby>' not in passage and len(passage) > 200:
                summary['missing_ruby_in_passage'] += 1

        for q_idx, q in enumerate(sec.get('questions', [])):
            stem = q.get('stem', '')
            options = q.get('options', [])
            correct = q.get('correct')
            correctOpt = q.get('correctOption', '')

            if week == 4 and stem != '':
                issues.append(f"[W04 STEM NOT EMPTY] {f} q {q_idx}: '{stem}'")
                summary['w4_stem_issues'] += 1
            
            # Options count
            if week <= 8 and len(options) != 4:
                issues.append(f"[OPTIONS NOT 4] {f} q {q_idx}: len={len(options)}")
                summary['options_count_issues'] += 1
            
            if correctOpt and correct and correct <= len(options):
                if options[correct - 1] != correctOpt:
                    issues.append(f"[CORRECT OPT MISMATCH] {f} q {q_idx}: opt={options[correct-1]} vs corr={correctOpt}")

print("\n--- AUDIT SUMMARY FOR N2 WEEKS 4 TO 12 ---")
for k, v in summary.items():
    print(f"{k}: {v}")

print(f"\nTotal issue entries: {len(issues)}")
for iss in issues[:30]:
    print(iss)
if len(issues) > 30:
    print(f"... and {len(issues) - 30} more")
