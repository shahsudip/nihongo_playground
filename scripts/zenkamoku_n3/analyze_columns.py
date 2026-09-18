import sys
import fitz

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('tmp_inspect/zenkamoku_n3/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N3.pdf')
page = doc[1]
print(f"Page rect: {page.rect}")

# Let's inspect x-coordinates of all text spans
xs = []
for b in page.get_text("dict")["blocks"]:
    if "lines" in b:
        for l in b["lines"]:
            for s in l["spans"]:
                if s["text"].strip():
                    xs.append(s["bbox"][0])

print(f"Min x: {min(xs)}, Max x: {max(xs)}")
left_spans = [x for x in xs if x < 260]
right_spans = [x for x in xs if x >= 260]
print(f"Left spans count: {len(left_spans)}, Right spans count: {len(right_spans)}")
