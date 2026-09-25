import json
import glob
import sys

sys.stdout.reconfigure(encoding='utf-8')

for day in range(1, 6):
    fn = f'src/data/zenkamoku_n1/w01-d{day:02d}.json'
    with open(fn, 'r', encoding='utf-8') as f:
        data = json.load(f)
    print(f"\n=== Week 1 Day {day} ({fn}) ===")
    for s_idx, sec in enumerate(data.get('sections', [])):
        print(f"  Sec {s_idx+1}: {sec.get('title')} ({len(sec.get('questions', []))} Qs)")
        for q in sec.get('questions', []):
            print(f"    Q{q.get('number')}: {q.get('stem')} -> Ans: {q.get('correctOption')}")
