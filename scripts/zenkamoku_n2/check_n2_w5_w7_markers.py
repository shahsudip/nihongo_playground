import json
import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Checking N2 Weeks 5, 6, 7 for question marker synchronization...")
mismatches = []
total_checked = 0

for f in sorted(glob.glob('src/data/zenkamoku_n2/w0[567]-*.json')):
    with open(f, 'r', encoding='utf-8') as fp:
        data = json.load(fp)
    for s_idx, sec in enumerate(data.get('sections', [])):
        passage = sec.get('passage', '')
        for q in sec.get('questions', []):
            stem = q.get('stem', '')
            num = q.get('number', '')
            total_checked += 1
            
            # Check for ①, ②, ③ in stem
            for marker in ['①', '②', '③', '［１］', '［２］', '［３］']:
                if marker in stem and marker not in passage:
                    mismatches.append(f"{f} Q{num}: marker '{marker}' in stem but missing in passage! (stem: {stem})")

            # Check for 下線部 (underlined part)
            if '下線部' in stem or '下線の' in stem:
                if '<u>' not in passage:
                    mismatches.append(f"{f} Q{num}: stem mentions 下線部 but no <u> in passage! (stem: {stem})")

print(f"Total reading questions checked: {total_checked}")
print(f"Total marker/underline mismatches found: {len(mismatches)}")
for m in mismatches:
    print(m)
