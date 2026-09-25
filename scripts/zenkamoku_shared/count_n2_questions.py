import json
import glob
import sys

sys.stdout.reconfigure(encoding='utf-8')

grand_total = 0
for w in range(1, 13):
    files = sorted(glob.glob(f'src/data/zenkamoku_n2/w{w:02d}-*.json'))
    total_q = 0
    days_info = []
    for fn in files:
        with open(fn, 'r', encoding='utf-8') as f:
            d = json.load(f)
        q_cnt = 0
        if 'questions' in d:
            q_cnt += len(d['questions'])
        if 'sections' in d:
            for s in d['sections']:
                q_cnt += len(s.get('questions', []))
        total_q += q_cnt
        day_num = d.get('day')
        days_info.append(f"D{day_num}:{q_cnt}")
    grand_total += total_q
    print(f"Week {w:02d}: {len(files)} files | Total Qs: {total_q:3d} | Details: {' '.join(days_info)}")

print(f"\nGRAND TOTAL N2 QUESTIONS: {grand_total}")
