import json, sys
sys.stdout.reconfigure(encoding='utf-8')

for day in range(1, 6):
    fpath = f'src/data/zenkamoku_n2/w03-d0{day}.json'
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    print(f'=== N2 WEEK 3 DAY {day} ===')
    for sec in data.get('sections', []) + data.get('subSections', []):
        print(f" Section: {sec.get('type')} - {sec.get('title')}")
        for q in sec.get('questions', []):
            print(f"  Q{q['number']}: stem: {q.get('stem')}")
            print(f"     opts: {q.get('options')}")
            print(f"     order: {q.get('correctOrder')}, starPos: {q.get('starPosition')}, correct: {q.get('correct')}")
            print(f"     exp: {q.get('explanation')}\n")
