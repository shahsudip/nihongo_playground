import json
import glob
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('tmp_inspect/w9_parsed_scripts.json', 'r', encoding='utf-8') as f:
    scripts = json.load(f)

for fpath in sorted(glob.glob('src/data/zenkamoku_n1/w09-d0*.json')):
    with open(fpath, 'r', encoding='utf-8') as fp:
        data = json.load(fp)
    updated = 0
    for q in data.get('questions', []):
        tid = q.get('trackId')
        if tid in scripts and scripts[tid]:
            q['script'] = scripts[tid]
            updated += 1
    with open(fpath, 'w', encoding='utf-8') as fp:
        json.dump(data, fp, ensure_ascii=False, indent=2)
    print(f"Updated {fpath}: {updated}/{len(data['questions'])} scripts populated")
