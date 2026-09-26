"""
wrap_plaintext_passages.py
Finds passages that are plain text (not wrapped in a <div>) and wraps them
with the N3 golden master class:
  <div class="speed-master-lined-paper whitespace-pre-line font-serif leading-loose">
"""
import sys, json, glob, os

sys.stdout.reconfigure(encoding='utf-8')

GOLDEN_CLASS = 'speed-master-lined-paper whitespace-pre-line font-serif leading-loose'

fixed_total = 0
files_fixed = 0

for book in ['zenkamoku_n1', 'zenkamoku_n2']:
    for fp in sorted(glob.glob(f'src/data/{book}/*.json')):
        base = os.path.basename(fp)
        with open(fp, 'r', encoding='utf-8') as f:
            d = json.load(f)
        
        changed = False
        for s in d.get('sections', []):
            p = s.get('passage', '')
            if not p:
                continue
            
            stripped = p.strip()
            if not stripped.startswith('<'):
                # Plain text — wrap it
                s['passage'] = f'<div class="{GOLDEN_CLASS}">\n{p}\n</div>'
                changed = True
                fixed_total += 1
                print(f"Wrapped plain text: {book}/{base}")
        
        if changed:
            with open(fp, 'w', encoding='utf-8') as f:
                json.dump(d, f, ensure_ascii=False, indent=2)
            files_fixed += 1

print(f"\n✅ Done: Wrapped {fixed_total} plain-text passages across {files_fixed} files.")
