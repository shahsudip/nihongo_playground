import json, os, sys
sys.stdout.reconfigure(encoding='utf-8')

for day in range(1, 6):
    cid = f"w03-d0{day}"
    path = f"src/data/zenkamoku_n3/{cid}.json"
    with open(path, 'r', encoding='utf-8') as f:
        d = json.load(f)
    print(f"=== DAY {day} ===")
    for sub in d.get('subSections', []) + d.get('sections', []):
        if sub.get('type') == 'sentence_composition':
            for q in sub.get('questions', []):
                print(f"Q{q['number']}: {q['stem']}")
                print(f"   Options: {q['options']}")
                print(f"   Correct: {q['correct']} | starPos: {q.get('starPosition')} | order: {q.get('correctOrder')}")
