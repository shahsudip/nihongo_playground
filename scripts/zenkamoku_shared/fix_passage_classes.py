"""
fix_passage_classes.py
Standardizes ALL passage <div class="..."> in N1 and N2 JSON files
to match the N3 Golden Master:
  <div class="speed-master-lined-paper whitespace-pre-line font-serif leading-loose">

For Week 8 flyer/info-retrieval sections that use speed-master-flyer-card,
we leave those alone.
For everything else (short_passage, mid_passage, long_passage, integrated, etc.),
we enforce the golden master class.
"""
import sys, json, glob, os, re

sys.stdout.reconfigure(encoding='utf-8')

GOLDEN_CLASS = 'speed-master-lined-paper whitespace-pre-line font-serif leading-loose'
FLYER_CLASS = 'speed-master-flyer-card'

# Regex to find the opening div class attribute in passages
DIV_CLASS_PATTERN = re.compile(r'<div\s+class=["\']([^"\']*)["\']')

def fix_passage_classes(passage_html):
    """Fix the opening <div class="..."> to match golden master if not flyer."""
    if not passage_html:
        return passage_html
    
    # If it's a flyer card, don't touch it
    if FLYER_CLASS in passage_html:
        return passage_html
    
    # If it starts with <div class="..."> fix it
    def replace_div_class(m):
        existing_class = m.group(1)
        # Keep speed-master-lined-paper if present, add missing golden classes
        parts = set(existing_class.split())
        # Remove stray classes that conflict
        parts.discard('bg-white')
        # Ensure all golden classes are present
        for cls in GOLDEN_CLASS.split():
            parts.add(cls)
        return f'<div class="{GOLDEN_CLASS}"'
    
    # Only replace the FIRST div class (the passage wrapper)
    first_match = DIV_CLASS_PATTERN.search(passage_html)
    if first_match:
        new_html = passage_html[:first_match.start()] + \
                   DIV_CLASS_PATTERN.sub(replace_div_class, passage_html[first_match.start():], count=1)
        return new_html
    return passage_html


total_fixed = 0
total_files_fixed = 0

for book in ['zenkamoku_n1', 'zenkamoku_n2']:
    files = sorted(glob.glob(f'src/data/{book}/*.json'))
    for fp in files:
        base = os.path.basename(fp)
        with open(fp, 'r', encoding='utf-8') as f:
            d = json.load(f)
        
        changed = False
        for s in d.get('sections', []):
            p = s.get('passage', '')
            if not p:
                continue
            
            # Skip flyers
            if FLYER_CLASS in p:
                continue
            
            fixed = fix_passage_classes(p)
            if fixed != p:
                s['passage'] = fixed
                changed = True
                total_fixed += 1
        
        if changed:
            with open(fp, 'w', encoding='utf-8') as f:
                json.dump(d, f, ensure_ascii=False, indent=2)
            total_files_fixed += 1
            print(f"Fixed: {book}/{base}")

print(f"\n✅ Done: Fixed {total_fixed} passages across {total_files_fixed} files.")
print("All passage boxes now use the N3 golden master class:")
print(f"  {GOLDEN_CLASS}")
