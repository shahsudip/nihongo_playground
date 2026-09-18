import sys
import fitz

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('tmp_inspect/zenkamoku_n3/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N3.pdf')
# Note: Page 10 is Week 3 (which we don't even need!). Week 2 ends on Page 10 column 1 (混む is on p10 col1).
# But let's check Week 2 lines to see if there are any ordering issues!
# Let's check Week 2 Day 1 Q1
page = doc[5] # Page 5 has W2D1 Q1
d = page.get_text("dict")
spans = []
for b in d["blocks"]:
    if "lines" in b:
        for l in b["lines"]:
            for s in l["spans"]:
                if s["bbox"][0] >= 258 and s["size"] >= 7.0 and 40 <= s["bbox"][1] <= 695:
                    spans.append(s)

spans.sort(key=lambda s: (round(s["bbox"][1] / 3) * 3, s["bbox"][0]))
lines = []
curr_line = []
curr_y = None
for s in spans:
    if curr_y is None or abs(s["bbox"][1] - curr_y) < 4:
        curr_line.append(s)
        curr_y = s["bbox"][1]
    else:
        lines.append(curr_line)
        curr_line = [s]
        curr_y = s["bbox"][1]
if curr_line:
    lines.append(curr_line)

for line in lines:
    line_text = "".join([s["text"] for s in line]).strip()
    y_pos = line[0]["bbox"][1]
    print(f"y={y_pos:5.1f} | {line_text}")
