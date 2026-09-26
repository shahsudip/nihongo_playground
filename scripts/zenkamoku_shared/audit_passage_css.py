import sys, json, glob, os, re
sys.stdout.reconfigure(encoding='utf-8')

# GOLDEN MASTER (N3) passage div:
# <div class="speed-master-lined-paper whitespace-pre-line font-serif leading-loose">

GOLDEN_PASSAGE_CLASS = 'speed-master-lined-paper whitespace-pre-line font-serif leading-loose'

issues = []

for book in ['zenkamoku_n1', 'zenkamoku_n2']:
    files = sorted(glob.glob(f'src/data/{book}/*.json'))
    for fp in files:
        base = os.path.basename(fp)
        with open(fp, 'r', encoding='utf-8') as f:
            d = json.load(f)
        
        for s_idx, s in enumerate(d.get('sections', [])):
            p = s.get('passage', '')
            if not p:
                continue
            
            # Check if passage div has correct class
            # N3 golden: <div class="speed-master-lined-paper whitespace-pre-line font-serif leading-loose">
            has_lined = 'speed-master-lined-paper' in p
            has_whitespace = 'whitespace-pre-line' in p
            has_font = 'font-serif' in p
            has_leading = 'leading-loose' in p
            
            problems = []
            if not has_lined: problems.append('missing: speed-master-lined-paper')
            if not has_whitespace: problems.append('missing: whitespace-pre-line')
            if not has_font: problems.append('missing: font-serif')
            if not has_leading: problems.append('missing: leading-loose')
            
            # Check for hardcoded bg-white (dark mode killer)
            if 'bg-white' in p:
                problems.append('VIOLATION: hardcoded bg-white')
            
            if problems:
                issues.append({
                    'book': book,
                    'file': base,
                    'section': s_idx,
                    'type': s.get('type', ''),
                    'problems': problems
                })

print(f"Total styling issues found: {len(issues)}\n")
for iss in issues:
    print(f"  [{iss['book']}] {iss['file']} section {iss['section']} ({iss['type']})")
    for p in iss['problems']:
        print(f"    -> {p}")
