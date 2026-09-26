"""
check_n3_explanation_content.py
Verifies N3 explanations are real text, not placeholder/empty strings.
"""
import sys, json, glob, os
sys.stdout.reconfigure(encoding='utf-8')

PLACEHOLDER_PHRASES = [
    'explanation not available',
    'no explanation',
    'coming soon',
    'tbd',
    'todo',
    '準備中',
    'placeholder',
    'n/a',
]

files = sorted(glob.glob('src/data/zenkamoku_n3/*.json'))
total = 0
real = 0
suspicious = []

for fp in files:
    base = os.path.basename(fp)
    with open(fp, 'r', encoding='utf-8') as f:
        d = json.load(f)

    questions = []
    for s in d.get('sections', []):
        questions.extend(s.get('questions', []))
    questions.extend(d.get('questions', []))

    for i, q in enumerate(questions):
        total += 1
        expl = q.get('explanation', '').strip()
        
        is_placeholder = any(ph in expl.lower() for ph in PLACEHOLDER_PHRASES)
        is_too_short = len(expl) < 10
        
        if is_placeholder or is_too_short:
            suspicious.append((base, i+1, q.get('id',''), repr(expl[:80])))
        else:
            real += 1

print(f"N3 Total questions : {total}")
print(f"Real explanations  : {real}")
print(f"Suspicious/short   : {len(suspicious)}")
print()

if suspicious:
    print("=== Suspicious explanations ===")
    for fn, qi, qid, expl in suspicious:
        print(f"  {fn} Q{qi} (id={qid}): {expl}")
else:
    print("✅ All N3 explanations look genuine.")

# Show a sample of actual explanations from each week
print("\n=== Sample explanations by week ===")
for week in ['w01', 'w05', 'w06', 'w07', 'w08', 'w09', 'w10']:
    fp = f'src/data/zenkamoku_n3/{week}-d01.json'
    if not os.path.exists(fp):
        continue
    with open(fp, 'r', encoding='utf-8') as f:
        d = json.load(f)
    qs = []
    for s in d.get('sections', []):
        qs.extend(s.get('questions', []))
    qs.extend(d.get('questions', []))
    if qs:
        expl = qs[0].get('explanation', '').strip()
        print(f"  {week}-d01 Q1: {expl[:120]}")
