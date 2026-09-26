import json
import glob
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

for week in range(5, 9):
    print(f"==================== WEEK {week} ====================")
    for day in range(1, 6):
        fn = f'src/data/zenkamoku_n2/w{week:02d}-d{day:02d}.json'
        if not os.path.exists(fn):
            continue
        with open(fn, 'r', encoding='utf-8') as f:
            data = json.load(f)
        instruction = data.get('instruction', '')
        print(f"\n--- {fn} ---")
        for s_idx, sec in enumerate(data.get('sections', [])):
            sec_title = sec.get('title', '')
            passage = sec.get('passage', '')
            markers_in_passage = re.findall(r'[①②③④⑤⑥⑦⑧⑨⑩]|(?:\([0-9]+\))|(?:\[[0-9]+\])|(?:<u>[^<]+</u>)|(?:【[0-9]+】)|(?:注[0-9]+)|(?:\(注[0-9]+\))', passage)
            print(f"  Sec {s_idx} [{sec_title}] markers: {markers_in_passage}")
            for q in sec.get('questions', []):
                q_num = q.get('number')
                q_stem = q.get('stem')
                print(f"    Q{q_num}: {q_stem}")
