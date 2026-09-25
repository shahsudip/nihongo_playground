import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

for day in range(1, 6):
    fpath = f'src/data/zenkamoku_n2/w05-d0{day}.json'
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    print(f"=== N2 Week 5 Day {day} Passages ===")
    for sec_i, sec in enumerate(data.get('sections', []), 1):
        passage = sec.get('passage', '')
        print(f"Passage {sec_i}: length={len(passage)}, starts='{passage[:40]}...', has_bg_white={'bg-white' in passage}")
