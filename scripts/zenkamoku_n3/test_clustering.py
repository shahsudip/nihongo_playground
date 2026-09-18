import sys
import fitz

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('tmp_inspect/zenkamoku_n3/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N3.pdf')
page = doc[5]
spans = []
for b in page.get_text("dict")["blocks"]:
    if "lines" in b:
        for l in b["lines"]:
            for s in l["spans"]:
                if s["bbox"][0] >= 258 and s["size"] >= 7.0 and 40 <= s["bbox"][1] <= 695:
                    spans.append(s)

# Cluster lines properly:
# 1. Sort spans by y0
spans.sort(key=lambda s: s["bbox"][1])

lines = []
for s in spans:
    placed = False
    for line in lines:
        # Check if span belongs to line: y overlap or close y-center
        avg_y = sum(x["bbox"][1] for x in line) / len(line)
        if abs(s["bbox"][1] - avg_y) < 4.0:
            line.append(s)
            placed = True
            break
    if not placed:
        lines.append([s])

# Sort each line by x0
for line in lines:
    line.sort(key=lambda s: s["bbox"][0])

# Sort all lines by their average y0
lines.sort(key=lambda line: sum(s["bbox"][1] for s in line) / len(line))

for line in lines:
    line_text = "".join([s["text"] for s in line]).strip()
    if line_text:
        print(f"y={line[0]['bbox'][1]:5.1f} | {line_text}")
