import json, glob, os

files = sorted(glob.glob('src/data/zenkamoku_n2/w0[1-3]-d*.json'))
print(f"Found {len(files)} files for Week 1 to 3")

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        data = json.load(fp)
    sections = data.get('sections', [])
    summary = ", ".join([f"{s.get('type')}:{len(s.get('questions', []))}" for s in sections])
    print(f"{os.path.basename(f)}: Week {data.get('week')} Day {data.get('day')} -> {summary}")
