import pypdf
import json
import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Read Kaisetsu text
pdf_path = 'tmp_inspect/zenkamoku_n1/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N1.pdf'
reader = pypdf.PdfReader(pdf_path)

# Map of explanations from Kaisetsu pages 32 to 40
full_kaisetsu = ''
for pno in range(31, len(reader.pages)):
    full_kaisetsu += '\n' + reader.pages[pno].extract_text()

# Week 10 answers (5 days x 6 Qs)
w10_answers = {
    1: [4, 3, 4, 3, 3, 2],
    2: [3, 4, 1, 4, 1, 4],
    3: [1, 1, 4, 2, 2, 4],
    4: [1, 4, 2, 3, 2, 3],
    5: [2, 2, 2, 4, 3, 1],
}

# Week 11 answers (5 days x 14 Qs)
w11_answers = {
    1: [2, 2, 3, 1, 2, 2, 1, 3, 1, 3, 1, 3, 2, 1],
    2: [3, 1, 2, 1, 2, 1, 3, 2, 3, 1, 2, 1, 1, 2],
    3: [1, 3, 3, 2, 1, 3, 1, 2, 1, 1, 3, 2, 3, 2],
    4: [2, 1, 3, 1, 3, 1, 2, 3, 2, 3, 1, 3, 1, 2],
    5: [1, 1, 3, 2, 2, 1, 1, 3, 1, 2, 1, 2, 3, 1],
}

# Week 12 answers (5 days x 4 Qs)
w12_answers = {
    1: [1, 2, 1, 4],
    2: [3, 1, 1, 3],
    3: [2, 3, 1, 3],
    4: [1, 1, 3, 2],
    5: [1, 3, 2, 4],
}

w12_options = {
    1: {
        3: ["1. 寄木公園", "2. 城田公園", "3. 山上公園", "4. 光の丘公園"],
        4: ["1. 寄木公園", "2. 城田公園", "3. 山上公園", "4. 光の丘公園"]
    },
    2: {
        3: ["1. 末端冷え性タイプ", "2. 内臓冷え性タイプ", "3. ほてり冷え性タイプ", "4. 全身冷え性タイプ"],
        4: ["1. 末端冷え性タイプ", "2. 内臓冷え性タイプ", "3. ほてり冷え性タイプ", "4. 全身冷え性タイプ"]
    },
    3: {
        3: ["1. あかね書店", "2. 北川出版", "3. さくらパブリッシング", "4. かえで書房"],
        4: ["1. あかね書店", "2. 北川出版", "3. さくらパブリッシング", "4. かえで書房"]
    },
    4: {
        3: ["1. スタディツアー", "2. 海外インターンシップ", "3. 交換留学", "4. 自由留学"],
        4: ["1. スタディツアー", "2. 海外インターンシップ", "3. 交換留学", "4. 自由留学"]
    },
    5: {
        3: ["1. 石田タイプ", "2. 松本タイプ", "3. 町田タイプ", "4. 北野タイプ"],
        4: ["1. 石田タイプ", "2. 松本タイプ", "3. 町田タイプ", "4. 北野タイプ"]
    }
}

# Helper to find explanation segment
def extract_explanation(week_num, day_num, q_num):
    # Regex to find the day block
    day_kanji = ["１", "２", "３", "４", "５"][day_num - 1]
    pat = rf'第{week_num}\s*週\s*[{day_num}{day_kanji}]\s*日目(.*?)(?:第{week_num}\s*週|第{week_num+1}\s*週|第1[0-2]\s*週|\Z)'
    m = re.search(pat, full_kaisetsu, re.DOTALL)
    if not m:
        return ""
    day_block = m.group(1)
    
    # In day_block, find question explanation
    if week_num == 12 and q_num in [3, 4]:
        sub_q = "質問１" if q_num == 3 else "質問２"
        next_sub = "質問２" if q_num == 3 else r'(?:第|\Z)'
        q_pat = rf'{sub_q}\s*答え\s*([１-４1-4])(.*?)(?={next_sub}|\d+\s*答え|\Z)'
    else:
        q_kanji = str(q_num)
        q_pat = rf'(?:^|\n)\s*{q_num}\s*答え\s*([１-４1-4])(.*?)(?=(?:^|\n)\s*\d+\s*答え|\n◆|\Z)'
        
    qm = re.search(q_pat, day_block, re.DOTALL)
    if qm:
        ans = qm.group(1)
        body = qm.group(2).strip()
        body_clean = '<br/>'.join([line.strip() for line in body.splitlines() if line.strip() and not line.strip().startswith('全科目攻略') and not line.strip().isdigit()])
        return f"<b>【正解】{ans}</b><br/>{body_clean}"
    return ""

print("Generating Week 10 JSON files...")
# Week 10
track_cursor = 74
for day in range(1, 6):
    ch_id = f"w10-d{day:02d}"
    qs = []
    for q_idx in range(6):
        q_num = q_idx + 1
        t_id = f"N1-{track_cursor}"
        track_cursor += 1
        ans = w10_answers[day][q_idx]
        expl = extract_explanation(10, day, q_num)
        if not expl:
            expl = f"<b>【正解】{ans}</b>"
        qs.append({
            "number": q_num,
            "trackId": t_id,
            "audioSrc": f"/audio/zenkamoku_n1/{t_id}.mp3",
            "options": ["1", "2", "3", "4"],
            "correct": ans,
            "correctOption": str(ans),
            "script": "",
            "explanation": expl
        })
    data = {
        "bookId": "zenkamoku-n1-best-workbook",
        "chapterId": ch_id,
        "week": 10,
        "day": day,
        "weekTitle": "第10週",
        "dayTitle": f"{day}日目",
        "sectionTitle": "概要理解",
        "sectionTitleEn": "Summary comprehension",
        "sectionType": "listening_summary",
        "pageRef": f"p.{177 + day}",
        "questions": qs
    }
    with open(f"src/data/zenkamoku_n1/{ch_id}.json", "w", encoding="utf-8") as fp:
        json.dump(data, fp, ensure_ascii=False, indent=2)
    print(f"Wrote {ch_id}.json ({len(qs)} Qs)")

print("Generating Week 11 JSON files...")
# Week 11
track_cursor = 104
for day in range(1, 6):
    ch_id = f"w11-d{day:02d}"
    qs = []
    for q_idx in range(14):
        q_num = q_idx + 1
        t_id = f"N1-{track_cursor}"
        track_cursor += 1
        ans = w11_answers[day][q_idx]
        expl = extract_explanation(11, day, q_num)
        if not expl:
            expl = f"<b>【正解】{ans}</b>"
        qs.append({
            "number": q_num,
            "trackId": t_id,
            "audioSrc": f"/audio/zenkamoku_n1/{t_id}.mp3",
            "options": ["1", "2", "3"],
            "correct": ans,
            "correctOption": str(ans),
            "script": "",
            "explanation": expl
        })
    data = {
        "bookId": "zenkamoku-n1-best-workbook",
        "chapterId": ch_id,
        "week": 11,
        "day": day,
        "weekTitle": "第11週",
        "dayTitle": f"{day}日目",
        "sectionTitle": "即時応答",
        "sectionTitleEn": "Quick response",
        "sectionType": "listening_response",
        "pageRef": f"p.{182 + day}",
        "questions": qs
    }
    with open(f"src/data/zenkamoku_n1/{ch_id}.json", "w", encoding="utf-8") as fp:
        json.dump(data, fp, ensure_ascii=False, indent=2)
    print(f"Wrote {ch_id}.json ({len(qs)} Qs)")

print("Generating Week 12 JSON files...")
# Week 12
track_cursor = 174
for day in range(1, 6):
    ch_id = f"w12-d{day:02d}"
    qs = []
    # Q1 (Track 1)
    ans1 = w12_answers[day][0]
    t1 = f"N1-{track_cursor}"
    expl1 = extract_explanation(12, day, 1) or f"<b>【正解】{ans1}</b>"
    qs.append({
        "number": 1,
        "trackId": t1,
        "audioSrc": f"/audio/zenkamoku_n1/{t1}.mp3",
        "options": ["1", "2", "3", "4"],
        "correct": ans1,
        "correctOption": str(ans1),
        "script": "",
        "explanation": expl1
    })
    # Q2 (Track 2)
    ans2 = w12_answers[day][1]
    t2 = f"N1-{track_cursor + 1}"
    expl2 = extract_explanation(12, day, 2) or f"<b>【正解】{ans2}</b>"
    qs.append({
        "number": 2,
        "trackId": t2,
        "audioSrc": f"/audio/zenkamoku_n1/{t2}.mp3",
        "options": ["1", "2", "3", "4"],
        "correct": ans2,
        "correctOption": str(ans2),
        "script": "",
        "explanation": expl2
    })
    # Q3 & Q4 (Track 3)
    t3 = f"N1-{track_cursor + 2}"
    track_cursor += 3
    ans3 = w12_answers[day][2]
    opts3 = w12_options[day][3]
    expl3 = extract_explanation(12, day, 3) or f"<b>【正解】{opts3[ans3-1]}</b>"
    qs.append({
        "number": 3,
        "trackId": t3,
        "audioSrc": f"/audio/zenkamoku_n1/{t3}.mp3",
        "subQuestionLabel": "質問1",
        "options": opts3,
        "correct": ans3,
        "correctOption": opts3[ans3-1],
        "script": "",
        "explanation": expl3
    })
    ans4 = w12_answers[day][3]
    opts4 = w12_options[day][4]
    expl4 = extract_explanation(12, day, 4) or f"<b>【正解】{opts4[ans4-1]}</b>"
    qs.append({
        "number": 4,
        "trackId": t3,
        "audioSrc": f"/audio/zenkamoku_n1/{t3}.mp3",
        "subQuestionLabel": "質問2",
        "options": opts4,
        "correct": ans4,
        "correctOption": opts4[ans4-1],
        "script": "",
        "explanation": expl4
    })
    data = {
        "bookId": "zenkamoku-n1-best-workbook",
        "chapterId": ch_id,
        "week": 12,
        "day": day,
        "weekTitle": "第12週",
        "dayTitle": f"{day}日目",
        "sectionTitle": "統合理解",
        "sectionTitleEn": "Integrated comprehension",
        "sectionType": "listening_integrated",
        "pageRef": f"p.{187 + day}",
        "questions": qs
    }
    with open(f"src/data/zenkamoku_n1/{ch_id}.json", "w", encoding="utf-8") as fp:
        json.dump(data, fp, ensure_ascii=False, indent=2)
    print(f"Wrote {ch_id}.json ({len(qs)} Qs)")

print("All Weeks 10-12 files generated successfully!")
