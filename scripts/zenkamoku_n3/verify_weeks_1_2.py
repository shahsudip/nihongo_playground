import sys, json, glob

sys.stdout.reconfigure(encoding='utf-8')

files = sorted(glob.glob('src/data/zenkamoku_n3/w0[12]-*.json'))
print(f"Found {len(files)} files for Weeks 1 and 2:")
total_questions = 0

for fpath in files:
    with open(fpath, encoding='utf-8') as f:
        d = json.load(f)
    q_count = sum(len(s['questions']) for s in d['subSections'])
    total_questions += q_count
    sub_desc = ", ".join(f"{s['title']} ({len(s['questions'])} Qs, {s['pageRef']})" for s in d['subSections'])
    print(f"  • {d['chapterId']}: {d['weekTitle']} {d['dayTitle']} - {d['sectionTitle']} -> {q_count} questions [{sub_desc}]")

print(f"\nTotal questions across Weeks 1 & 2: {total_questions}")
