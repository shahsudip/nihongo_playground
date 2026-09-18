import sys
import fitz

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('tmp_inspect/zenkamoku_n3/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N3.pdf')
page = doc[1]
d = page.get_text("dict")

# Collect base spans (size >= 7.0)
spans = []
for b in d["blocks"]:
    if "lines" in b:
        for l in b["lines"]:
            for s in l["spans"]:
                text = s["text"].strip()
                if not text:
                    continue
                # filter out header and footer
                if s["bbox"][1] < 40 or s["bbox"][1] > 695:
                    continue
                if s["size"] < 7.0:
                    continue # Skip furigana
                col = 1 if s["bbox"][0] < 258 else 2
                spans.append({
                    "col": col,
                    "x0": s["bbox"][0],
                    "y0": s["bbox"][1],
                    "x1": s["bbox"][2],
                    "y1": s["bbox"][3],
                    "size": s["size"],
                    "text": s["text"]
                })

# Group spans by column, then group by line (similar y0)
for col_idx in [1, 2]:
    col_spans = [s for s in spans if s["col"] == col_idx]
    # Sort by y0, then x0
    col_spans.sort(key=lambda s: (round(s["y0"] / 3) * 3, s["x0"]))
    
    # Group into lines
    lines = []
    curr_line = []
    curr_y = None
    for s in col_spans:
        if curr_y is None or abs(s["y0"] - curr_y) < 4:
            curr_line.append(s)
            curr_y = s["y0"]
        else:
            lines.append(curr_line)
            curr_line = [s]
            curr_y = s["y0"]
    if curr_line:
        lines.append(curr_line)
        
    print(f"\n================ COLUMN {col_idx} ================")
    for line in lines:
        line_text = "".join([s["text"] for s in line]).strip()
        y_pos = line[0]["y0"]
        print(f"y={y_pos:5.1f} | {line_text}")
