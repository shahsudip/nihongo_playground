import glob
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("=" * 70)
print("SCANNING FOR GARBLED NUMBERS OR MISSING PASSAGE MARKERS IN N2 & N3")
print("=" * 70)

for level in ['n2', 'n3']:
    files = sorted(glob.glob(f'src/data/zenkamoku_{level}/w*.json'))
    for fpath in files:
        fname = f"{level}/{os.path.basename(fpath)}"
        with open(fpath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        sections = data.get('sections', []) + data.get('subSections', [])
        for sec_i, s in enumerate(sections, 1):
            passage = s.get('passage', '')
            for q in s.get('questions', []):
                stem = q.get('stem', '')
                qnum = q.get('number')
                
                # Check for garbled brackets or OCR artifacts in stem
                if re.search(r'[工匚コ]|\(\s*\)|\[\s*\]|【\s*】', stem):
                    print(f"[{fname}] Sec {sec_i} Q{qnum} GARBLED STEM: '{stem}'")
                
                # Check if stem refers to an underlined number or marker in passage e.g. <u>1</u> or ① or [ 1 ]
                ref_match = re.search(r'[（(]([1-5１-５①-⑤])[）)]|［([1-5１-５])］|\[([1-5])\]', stem)
                if ref_match and passage:
                    # check if that marker appears in passage
                    marker = ref_match.group(0)
                    if marker not in passage and not any(m in passage for m in [ref_match.group(1) or '', ref_match.group(2) or '', ref_match.group(3) or '']):
                        print(f"[{fname}] Sec {sec_i} Q{qnum}: Stem references '{marker}' but it may be MISSING in passage!")

print("\nScan completed.")
