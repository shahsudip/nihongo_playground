import sys
import json
import glob

sys.stdout.reconfigure(encoding='utf-8')

total_qs = 0
for w in [1, 2]:
    for d in range(1, 6):
        path = f'src/data/zenkamoku_n3/w{w:02d}-d{d:02d}.json'
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        sec_counts = []
        day_total = 0
        for s in data.get('sections', []):
            qs = s.get('questions', [])
            sec_counts.append(f"{s.get('type')}: {len(qs)}")
            day_total += len(qs)
        print(f"Week {w} Day {d} ({path}): {day_total} questions -> {', '.join(sec_counts)}")
        total_qs += day_total

print(f"Total questions in Week 1 & 2 JSON files: {total_qs}")
