import sys
import fitz
import re
import json

sys.stdout.reconfigure(encoding='utf-8')

# Re-run the extraction with answers recorded
doc = fitz.open('tmp_inspect/zenkamoku_n3/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N3.pdf')
all_lines = []

for pno in range(1, 11):
    page = doc[pno]
    d = page.get_text("dict")
    spans = []
    for b in d["blocks"]:
        if "lines" in b:
            for l in b["lines"]:
                for s in l["spans"]:
                    text = s["text"].strip()
                    if not text: continue
                    if s["bbox"][1] < 40 or s["bbox"][1] > 695: continue
                    if s["size"] < 7.0: continue
                    col = 1 if s["bbox"][0] < 258 else 2
                    spans.append({
                        "pno": pno, "col": col, "bbox": s["bbox"], "size": s["size"], "text": s["text"]
                    })

    for col_idx in [1, 2]:
        col_spans = [s for s in spans if s["col"] == col_idx]
        col_spans.sort(key=lambda s: s["bbox"][1])
        lines = []
        for s in col_spans:
            placed = False
            for line in lines:
                avg_y = sum(x["bbox"][1] for x in line) / len(line)
                if abs(s["bbox"][1] - avg_y) < 4.0:
                    line.append(s)
                    placed = True
                    break
            if not placed:
                lines.append([s])
        for line in lines:
            line.sort(key=lambda s: s["bbox"][0])
        lines.sort(key=lambda line: sum(s["bbox"][1] for s in line) / len(line))
        for line in lines:
            line_text = "".join([s["text"] for s in line]).strip()
            if line_text:
                all_lines.append(line_text)

clean_lines = [l for l in all_lines if not l.startswith('解説言語知識')]

parsed_answers = {}
current_week = None
current_day = None
current_section = None

for line in clean_lines:
    m_day = re.match(r'第([１２３4567890\d]+)週\s*([１２３4567890\d]+)日目', line)
    if m_day:
        w = int(m_day.group(1).translate(str.maketrans('１２３４５６７８９０', '1234567890')))
        d = int(m_day.group(2).translate(str.maketrans('１２３４５６７８９０', '1234567890')))
        if w > 2: break
        current_week = w
        current_day = d
        current_section = None
        continue
    if line.startswith('◆'):
        if '漢字読み' in line: current_section = 'kanji_reading'
        elif '表記' in line: current_section = 'orthography'
        elif '文脈' in line: current_section = 'contextually_defined_expressions'
        elif '言い換え' in line or '類義' in line: current_section = 'paraphrases'
        elif '用法' in line: break
        continue
    m_q = re.match(r'^(\d+)\s*答え\s*([１２３４\d])', line)
    if m_q:
        q_num = int(m_q.group(1))
        ans_num = int(m_q.group(2).translate(str.maketrans('１２３４', '1234')))
        parsed_answers[(current_week, current_day, current_section, q_num)] = ans_num

print(f"Total parsed answers: {len(parsed_answers)}")

# Compare against JSON files
mismatches = []
for w in [1, 2]:
    for d in range(1, 6):
        path = f'src/data/zenkamoku_n3/w{w:02d}-d{d:02d}.json'
        with open(path, 'r', encoding='utf-8') as f:
            jdata = json.load(f)
        for sec in jdata.get('sections', []):
            stype = sec.get('type')
            for q in sec.get('questions', []):
                qnum = q.get('number')
                json_correct = q.get('correct')
                exp_ans = parsed_answers.get((w, d, stype, qnum))
                if exp_ans != json_correct:
                    mismatches.append((w, d, stype, qnum, json_correct, exp_ans))

if mismatches:
    print(f"Found {len(mismatches)} answer mismatches:")
    for m in mismatches:
        print(f"W{m[0]}D{m[1]} {m[2]} Q{m[3]}: JSON correct={m[4]} vs Expl answer={m[5]}")
else:
    print("PERFECT MATCH! All 150 answers in explanation match JSON 'correct' field 100%!")
