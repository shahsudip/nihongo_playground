import sys, json, glob, os, re
sys.stdout.reconfigure(encoding='utf-8')

# N3 w05-d01 - the Golden Master
with open('src/data/zenkamoku_n3/w05-d01.json', 'r', encoding='utf-8') as f:
    d = json.load(f)
print("=== N3 w05-d01 sections (GOLDEN MASTER) ===")
for i, s in enumerate(d.get('sections', [])):
    p = s.get('passage', '')
    print(f"Section {i}: type={s.get('type')}, passage_len={len(p)}")
    print(f"  passage: {repr(p[:200])}")
    print()

# N1 w05-d01
print("\n=== N1 w05-d01 ===")
with open('src/data/zenkamoku_n1/w05-d01.json', 'r', encoding='utf-8') as f:
    d = json.load(f)
for i, s in enumerate(d.get('sections', [])):
    p = s.get('passage', '')
    print(f"Section {i}: type={s.get('type')}, passage_len={len(p)}")
    print(f"  passage: {repr(p[:200])}")
    print()

# Check which classes N3 uses
print("\n=== N3 passage box classes ===")
all_n3 = sorted(glob.glob('src/data/zenkamoku_n3/*.json'))
for fp in all_n3:
    base = os.path.basename(fp)
    with open(fp, 'r', encoding='utf-8') as f:
        d = json.load(f)
    for s in d.get('sections', []):
        p = s.get('passage', '')
        if p:
            classes = re.findall(r'class=["\']([^"\']+)["\']', p)
            if classes:
                print(f"{base}: {classes[0][:80]}")
                break
