import sys
import fitz
import re

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('tmp_inspect/zenkamoku_n3/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N3.pdf')

for pno in range(1, 11):
    page = doc[pno]
    d = page.get_text("dict")
    # Separate into col1 (< 258) and col2 (>= 258)
    col1_spans = []
    col2_spans = []
    for b in d["blocks"]:
        if "lines" in b:
            for l in b["lines"]:
                for s in l["spans"]:
                    text = s["text"].strip()
                    if not text:
                        continue
                    # Ignore header and footer
                    if s["bbox"][1] < 35 or s["bbox"][1] > 695:
                        continue
                    if s["bbox"][0] < 258:
                        col1_spans.append(s)
                    else:
                        col2_spans.append(s)
    
    for cidx, spans in enumerate([col1_spans, col2_spans], 1):
        # Find all headings and questions
        spans.sort(key=lambda s: (s["bbox"][1], s["bbox"][0]))
        # print text of spans with size >= 9
        major_texts = []
        for s in spans:
            t = s["text"].strip()
            if s["size"] >= 8.5:
                major_texts.append(t)
        full_col = " ".join(major_texts)
        # Find occurrences of 第\d週, ◆, and \d+\s*答え
        markers = re.findall(r'(第[１２３]週\s*[１２３４５]日目|◆[^\s]+|(?:\b|\s)\d+\s*答え\s*[１２３４])', full_col)
        print(f"P{pno} C{cidx}: {markers}")
