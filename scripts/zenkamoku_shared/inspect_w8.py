import json
import glob
import sys

sys.stdout.reconfigure(encoding='utf-8')

for day in range(1, 6):
    fn = f'src/data/zenkamoku_n2/w08-d{day:02d}.json'
    with open(fn, 'r', encoding='utf-8') as f:
        data = json.load(f)
    print(f"\n==========================================")
    print(f"=== Week 8 Day {day} ({fn}) ===")
    print(f"==========================================")
    for s_idx, sec in enumerate(data.get('sections', [])):
        print(f"\n  Section {s_idx+1}: {sec.get('title')}")
        passage = sec.get('passage', '')
        print(f"    Passage len: {len(passage)}")
        print(f"    Passage snippet:\n{passage[:300]}...")
        print(f"    PassageNote: {sec.get('passageNote')}")
        for q in sec.get('questions', []):
            print(f"      Q{q.get('number')}: {q.get('stem')} (Ans: {q.get('correct')})")
            for o_idx, opt in enumerate(q.get('options', [])):
                print(f"        {opt}")
