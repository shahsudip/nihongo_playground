import json
import glob
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("=" * 70)
print("AUDITING JLPT N1 ZENKAMOKU DATASET")
print("=" * 70)

all_files = sorted(glob.glob('src/data/zenkamoku_n1/w*.json'))
print(f"Total chapter files found in src/data/zenkamoku_n1: {len(all_files)} / 60")

# List missing files
missing = []
for w in range(1, 13):
    for d in range(1, 6):
        cid = f"w{w:02d}-d{d:02d}"
        fpath = f"src/data/zenkamoku_n1/{cid}.json"
        if not os.path.exists(fpath):
            missing.append(cid)

print(f"Missing chapters ({len(missing)}): {missing}")

# Check content of existing chapters
print("\n=== Chapter by Chapter Summary ===")
for fpath in all_files:
    fname = os.path.basename(fpath)
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    sections = data.get('sections', []) + data.get('subSections', [])
    q_count = sum(len(s.get('questions', [])) for s in sections)
    if not sections and 'questions' in data:
        q_count = len(data['questions'])
    
    passages = [s.get('passage', '') for s in sections if s.get('passage')]
    has_imageSrc = any(s.get('imageSrc') for s in sections)
    has_bg_white = any('bg-white' in p for p in passages)
    
    status = f"sections={len(sections)}, questions={q_count}"
    if passages:
        status += f", passages={len(passages)}"
    if has_imageSrc:
        status += ", ⚠️ has raw imageSrc"
    if has_bg_white:
        status += ", ⚠️ has bg-white"
    
    print(f"  {fname}: {status}")

