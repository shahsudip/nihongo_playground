import sys, json, re, glob, os
sys.stdout.reconfigure(encoding='utf-8')

books = ['zenkamoku_n1', 'zenkamoku_n2', 'zenkamoku_n3']

# Check CSS classes used in passages
CSS_PATTERN = re.compile(r'class=["\']([^"\']+)["\']')

for book in books:
    print(f"\n{'='*60}")
    print(f"  {book}")
    print(f"{'='*60}")
    files = sorted(glob.glob(f'src/data/{book}/*.json'))
    css_classes_seen = set()
    missing_ruby = []
    missing_passage_box = []
    
    for fp in files:
        base = os.path.basename(fp)
        with open(fp, 'r', encoding='utf-8') as f:
            d = json.load(f)
        
        for s in d.get('sections', []):
            passage = s.get('passage', '')
            if passage:
                classes = CSS_PATTERN.findall(passage)
                for cls in classes:
                    for c in cls.split():
                        css_classes_seen.add(c)
                
                # Check for ruby tags
                if '<ruby>' not in passage and re.search(r'[\u4e00-\u9fff]', passage):
                    missing_ruby.append(base)
                
                # Check passage box class
                if 'speed-master-lined-paper' not in passage and 'speed-master-flyer' not in passage and 'border' not in passage:
                    missing_passage_box.append(base)
        
        for q in d.get('questions', []):
            pass
    
    print(f"CSS classes used in passages: {sorted(css_classes_seen)}")
    print(f"Files with passages missing ruby: {missing_ruby[:5]}")
    print(f"Files with passages missing box: {missing_passage_box[:5]}")

# Now compare w05-d01 passage structure
print("\n\n=== W05-D01 PASSAGE COMPARISON ===")
for book in books:
    with open(f'src/data/{book}/w05-d01.json', 'r', encoding='utf-8') as f:
        d = json.load(f)
    print(f"\n-- {book} --")
    for i, s in enumerate(d.get('sections', [])):
        p = s.get('passage', '')
        print(f"  Section {i}: type={s.get('type')}, passage_len={len(p)}, passage_start='{p[:120]}'")
