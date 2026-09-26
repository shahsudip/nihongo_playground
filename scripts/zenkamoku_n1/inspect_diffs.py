import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/zenkamoku_n1/kaisetsu_lines.json', 'r', encoding='utf-8') as f:
    lines = json.load(f)

# Find w05-d04
print("=== W05-D04 lines ===")
for idx, l in enumerate(lines):
    if '第５週 ４日目' in l or '第5週 4日目' in l or '第５週 4日目' in l or '第5週 ４日目' in l:
        for k in range(max(0, idx-2), min(len(lines), idx+35)):
            print(f"{k}: {lines[k]}")
        break

# Find w12-d01
print("\n=== W12-D01 lines ===")
for idx, l in enumerate(lines):
    if '第12' in l or '第１２' in l:
        for k in range(max(0, idx-2), min(len(lines), idx+45)):
            print(f"{k}: {lines[k]}")
        break
