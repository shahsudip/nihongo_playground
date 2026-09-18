import sys
import fitz
import re
import json
import os

sys.stdout.reconfigure(encoding='utf-8')

PDF_PATH = 'tmp_inspect/zenkamoku_n3/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N3.pdf'
DATA_DIR = 'src/data/zenkamoku_n3'

def extract_kaisetsu():
    print(f"Reading PDF from {PDF_PATH}...")
    doc = fitz.open(PDF_PATH)
    
    all_lines = []

    # Pages 1 to 10 cover Week 1 and Week 2
    for pno in range(1, 11):
        page = doc[pno]
        d = page.get_text("dict")
        
        spans = []
        for b in d["blocks"]:
            if "lines" in b:
                for l in b["lines"]:
                    for s in l["spans"]:
                        text = s["text"].strip()
                        if not text:
                            continue
                        # Filter out header and footer
                        if s["bbox"][1] < 40 or s["bbox"][1] > 695:
                            continue
                        # Skip furigana (smaller font size)
                        if s["size"] < 7.0:
                            continue
                        col = 1 if s["bbox"][0] < 258 else 2
                        spans.append({
                            "pno": pno,
                            "col": col,
                            "bbox": s["bbox"],
                            "size": s["size"],
                            "text": s["text"]
                        })

        for col_idx in [1, 2]:
            col_spans = [s for s in spans if s["col"] == col_idx]
            col_spans.sort(key=lambda s: s["bbox"][1])
            
            # Cluster spans sharing the same line baseline
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

    doc.close()

    clean_lines = [l for l in all_lines if not l.startswith('解説言語知識')]

    parsed = {}
    current_week = None
    current_day = None
    current_section = None
    current_q_num = None
    current_q_lines = []

    def save_q():
        nonlocal current_q_num, current_q_lines
        if current_week and current_day and current_section and current_q_num is not None:
            key = (current_week, current_day, current_section, current_q_num)
            parsed[key] = list(current_q_lines)
        current_q_num = None
        current_q_lines = []

    for line in clean_lines:
        m_day = re.match(r'第([１２３4567890\d]+)週\s*([１２３4567890\d]+)日目', line)
        if m_day:
            save_q()
            w = int(m_day.group(1).translate(str.maketrans('１２３４５６７８９０', '1234567890')))
            d = int(m_day.group(2).translate(str.maketrans('１２３４５６７８９０', '1234567890')))
            if w > 2:
                break
            current_week = w
            current_day = d
            current_section = None
            continue
            
        if line.startswith('◆'):
            save_q()
            if '漢字読み' in line:
                current_section = 'kanji_reading'
            elif '表記' in line:
                current_section = 'orthography'
            elif '文脈' in line:
                current_section = 'contextually_defined_expressions'
            elif '言い換え' in line or '類義' in line:
                current_section = 'paraphrases'
            elif '用法' in line:
                break
            continue
            
        m_q = re.match(r'^(\d+)\s*答え\s*([１２３４\d])', line)
        if m_q:
            save_q()
            q_num = int(m_q.group(1))
            current_q_num = q_num
            rem = line[m_q.end():].strip()
            if rem:
                current_q_lines.append(rem)
            continue
            
        if current_q_num is not None:
            current_q_lines.append(line)

    save_q()
    print(f"Extracted explanations for {len(parsed)} questions.")
    return parsed

def format_explanation(lines, correct_opt_text):
    processed_lines = []
    for l in lines:
        l = l.strip()
        if not l:
            continue
        parts = re.split(r'(?<=[。\.])\s*(?=Choice\s+\d|This\s+is\b)', l)
        for p in parts:
            p = p.strip()
            if p:
                processed_lines.append(p)

    merged_blocks = []
    curr_block = ""
    for l in processed_lines:
        l = re.sub(r'([\u3000-\u9fff\uff00-\uffef])([a-zA-Z])', r'\1 \2', l)
        l = re.sub(r'([a-zA-Z])([\u3000-\u9fff\uff00-\uffef])', r'\1 \2', l)
        
        is_new_item = (
            not curr_block or
            l.startswith('【') or
            l.startswith('※') or
            re.match(r'^[1-4１-４]\s', l) or
            re.match(r'^Choice\s+\d', l) or
            re.match(r'^This\s+is\b', l)
        )
        
        if is_new_item:
            if curr_block:
                merged_blocks.append(curr_block)
            curr_block = l
        else:
            if curr_block[-1].isascii() and l[0].isascii():
                curr_block += " " + l
            elif (not curr_block[-1].isascii() and l[0].isascii()) or (curr_block[-1].isascii() and not l[0].isascii()):
                curr_block += " " + l
            elif re.search(r'(こと|様子|もの|など)$', curr_block):
                curr_block += " " + l
            else:
                curr_block += l
                
    if curr_block:
        merged_blocks.append(curr_block)

    out = []
    if correct_opt_text:
        out.append(f"<b>【正解】{correct_opt_text}</b>")
    for b in merged_blocks:
        out.append(b)
    return "<br/>".join(out)

def update_json_files(parsed_explanations):
    total_updated_questions = 0
    
    for w in [1, 2]:
        for d in range(1, 6):
            filename = f"w{w:02d}-d{d:02d}.json"
            filepath = os.path.join(DATA_DIR, filename)
            
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
                
            day_q_count = 0
            for sec in data.get('sections', []):
                stype = sec.get('type')
                for q in sec.get('questions', []):
                    qnum = q.get('number')
                    c_opt = q.get('correctOption', '')
                    
                    key = (w, d, stype, qnum)
                    if key in parsed_explanations:
                        raw_lines = parsed_explanations[key]
                        formatted = format_explanation(raw_lines, c_opt)
                        q['explanation'] = formatted
                        day_q_count += 1
                        total_updated_questions += 1
                    else:
                        print(f"⚠️  Missing explanation for {key}")

            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
                f.write('\n')
                
            print(f"✓ Updated {filename} ({day_q_count} questions updated)")
            
    print(f"\n🎉 Successfully updated all {total_updated_questions} questions across Week 1 and Week 2!")

if __name__ == '__main__':
    parsed = extract_kaisetsu()
    update_json_files(parsed)
