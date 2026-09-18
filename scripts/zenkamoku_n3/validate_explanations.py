import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

# Read inspected_all_150_explanations.txt
with open('scripts/zenkamoku_n3/inspected_all_150_explanations.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all blocks of [Q...] Explanation:\n...
pattern = re.compile(r'\[Q(\d+)\] Stem: (.*?)\nExplanation:\n(.*?)(?=\n\[Q|\n---|\n===|\Z)', re.DOTALL)
matches = pattern.findall(content)

print(f"Total questions found in inspection file: {len(matches)}")

short_or_empty = []
for i, (qnum, stem, exp) in enumerate(matches, 1):
    exp = exp.strip()
    # Check if explanation has content beyond 正解
    lines = exp.split('<br/>')
    if len(lines) < 2 or len(exp) < 20:
        short_or_empty.append((i, qnum, stem, exp))

if short_or_empty:
    print(f"Found {len(short_or_empty)} short or suspicious explanations:")
    for item in short_or_empty:
        print(item)
else:
    print("ALL 150 EXPLANATIONS HAVE DETAILED CONTENT!")
