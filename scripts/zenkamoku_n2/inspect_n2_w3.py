import json, glob, re, sys
sys.stdout.reconfigure(encoding='utf-8')

files = glob.glob('src/data/zenkamoku_n2/w*.json')
for f in sorted(files):
    with open(f, 'r', encoding='utf-8') as fp:
        data = json.load(fp)
    for sec in data.get('sections', []) + data.get('subSections', []):
        if sec.get('type') == 'sentence_composition' or '文の組み立て' in sec.get('title', ''):
            print(f, 'has sentence composition. Questions count:', len(sec.get('questions', [])))
            for q in sec.get('questions', []):
                stem = q.get('stem')
                starPos = q.get('starPosition')
                order = q.get('correctOrder')
                exp = q.get('explanation')
                print(f"   Q{q['number']}: stem='{stem}' | starPos={starPos} | order={order}")
                print(f"      exp: {exp[:80] if exp else 'NONE'}")
