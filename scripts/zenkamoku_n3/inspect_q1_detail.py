import sys
import fitz

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('tmp_inspect/zenkamoku_n3/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N3.pdf')
page = doc[1]
d = page.get_text("dict")

# Let's inspect spans in Q1
spans = []
for b in d["blocks"]:
    if "lines" in b:
        for l in b["lines"]:
            for s in l["spans"]:
                if s["bbox"][0] < 257 and 140 <= s["bbox"][1] <= 195:
                    spans.append(s)

print("--- Spans in Q1 ---")
for s in sorted(spans, key=lambda x: (x["bbox"][1], x["bbox"][0])):
    print(f"y0={s['bbox'][1]:.1f}, x0={s['bbox'][0]:.1f}, x1={s['bbox'][2]:.1f}, sz={s['size']:.1f}: {repr(s['text'])}")
