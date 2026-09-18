import sys
import fitz

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('tmp_inspect/zenkamoku_n3/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N3.pdf')
page = doc[1]

# Extract all spans in column 1 (x < 257) between y=120 and y=250 (Questions 1 & 2)
d = page.get_text("dict")
spans = []
for b in d["blocks"]:
    if "lines" in b:
        for l in b["lines"]:
            for s in l["spans"]:
                if s["bbox"][0] < 257 and 120 <= s["bbox"][1] <= 280:
                    spans.append(s)

spans.sort(key=lambda s: (s["bbox"][1], s["bbox"][0]))
for s in spans:
    print(f"y0={s['bbox'][1]:.1f}, y1={s['bbox'][3]:.1f}, x0={s['bbox'][0]:.1f}, x1={s['bbox'][2]:.1f}, size={s['size']:.1f}, text={repr(s['text'])}")
