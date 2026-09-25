"""
build_complete_reading_and_listening.py
Extracts and builds all remaining chapters for Zenkamoku N1:
- Week 5: Days 1 to 5 (Short reading)
- Week 6: Days 1 to 5 (Mid-size reading)
- Week 7: Day 3 (Long reading & Integrated)
- Week 8: Day 2 (Main argument & Info retrieval)
- Week 9: Days 3, 4, 5 (Listening task & point)
"""
import sys, os, json, re
from PIL import Image
import winocr

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"D:\sudip_software\nihongo_playground"
INSPECT_DIR = os.path.join(BASE_DIR, "tmp_inspect", "zenkamoku_n1")
OUT_DIR = os.path.join(BASE_DIR, "src", "data", "zenkamoku_n1")

with open(os.path.join(BASE_DIR, "scripts", "zenkamoku_n1", "n1_ocr_cache.json"), 'r', encoding='utf-8') as f:
    OCR_CACHE = json.load(f)

print("Starting generation of Week 5 through Week 9 remaining chapters...")

# Helper to build standard short reading day
def build_w05_day(day_num, page_start, answers, passages_data):
    sections = []
    for p_idx, p_num in enumerate(range(page_start, page_start + 4)):
        p_data = passages_data[p_idx]
        corr_ans = answers[p_idx]
        options = p_data['options']
        corr_opt = options[corr_ans - 1]
        
        q_obj = {
            "number": p_idx + 1,
            "stem": p_data['stem'],
            "options": options,
            "correct": corr_ans,
            "correctOption": corr_opt
        }
        
        sec_obj = {
            "type": "short_passage",
            "title": f"内容理解（短文） ({p_idx + 1})",
            "titleEn": f"Short Passage ({p_idx + 1})",
            "pageRef": f"p.{p_num - 3}",
            "passage": f"<div class=\"speed-master-lined-paper\">\n{p_data['text']}\n</div>",
            "questions": [q_obj]
        }
        if p_data.get('note'):
            sec_obj['passageNote'] = p_data['note']
        sections.append(sec_obj)
        
    return {
        "bookId": "zenkamoku-n1-best-workbook",
        "chapterId": f"w05-d{day_num:02d}",
        "week": 5,
        "day": day_num,
        "weekTitle": "第5週",
        "dayTitle": f"{day_num}日目",
        "sectionTitle": "内容理解（短文）",
        "sectionTitleEn": "Reading Comprehension (Short)",
        "sections": sections
    }

print("Builder initialized.")
