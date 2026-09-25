import json
import glob
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

for fpath in sorted(glob.glob('src/data/zenkamoku_n2/w06-*.json')):
    fname = os.path.basename(fpath)
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    print(f"=== {fname} ===")
    for sec_i, sec in enumerate(data.get('sections', []), 1):
        passage = sec.get('passage', '')
        for q in sec.get('questions', []):
            stem = q.get('stem', '')
            qnum = q.get('number')
            for marker in ['①', '②', '③', '④', '1', '2', '3']:
                if marker in ['①', '②', '③', '④'] and marker in stem:
                    in_passage = marker in passage
                    print(f"  Sec {sec_i} Q{qnum}: Stem has '{marker}'. Present in passage? {'✅ YES' if in_passage else '❌ MISSING IN PASSAGE'}")
