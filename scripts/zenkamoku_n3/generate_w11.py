import json
import re
import os

with open('scripts/zenkamoku_n3/answer_keys_raw.json', 'r', encoding='utf-8') as f:
    answers = json.load(f)

with open('tmp_w11.txt', 'r', encoding='utf-8') as f:
    kaisetsu = f.read()

# Split by day
day_splits = re.split(r'第11\s*週\s*([１２３４５])日目', kaisetsu)
days_data = {}
kanji_num = {'１': 1, '２': 2, '３': 3, '４': 4, '５': 5}

for i in range(1, len(day_splits), 2):
    d_num = kanji_num[day_splits[i].strip()]
    block = day_splits[i+1]
    days_data[d_num] = block

# Output dir
out_dir = 'src/data/zenkamoku_n3'
os.makedirs(out_dir, exist_ok=True)

for day in range(1, 6):
    # Get answers for day
    day_key = f"第11週_{day}日目"
    ans_data = answers.get(day_key, {})
    
    gaiyou_ans = ans_data.get("概要理解", {}).get("answers", {})
    hatsuwa_ans = ans_data.get("発話表現", {}).get("answers", {})
    
    # Process kaisetsu block
    block = days_data.get(day, "")
    
    # Split by section English name
    sec_splits = re.split(r'(Summary comprehension|Utterance expressions)[^\n]*\n', block, flags=re.DOTALL)
    
    gaiyou_text = sec_splits[2] if len(sec_splits) > 2 else ""
    hatsuwa_text = sec_splits[4] if len(sec_splits) > 4 else ""
            
    # Now extract each question's script
    def extract_qs(text):
        q_splits = re.split(r'\n\s*(\d+)\s*答え\s*([0-9１２３４]+)', '\n' + text)
        qs = {}
        for i in range(1, len(q_splits), 3):
            q_num = int(q_splits[i])
            q_ans = q_splits[i+1]
            q_script = q_splits[i+2].strip()
            # Stop matching at next ◆
            q_script = re.sub(r'\n◆.*', '', q_script, flags=re.DOTALL).strip()
            # Clean up the script: remove newlines to merge furigana inline, and remove page numbers
            q_script = re.sub(r'\n?(?:全科目攻略.*|.*?\[解説\].*)\n?', '', q_script)
            q_script = re.sub(r'\n\d+\s*\n', '', q_script) # stray page numbers
            q_script = q_script.replace('\n', '')
            qs[q_num] = q_script
        return qs

    gaiyou_qs = extract_qs(gaiyou_text)
    hatsuwa_qs = extract_qs(hatsuwa_text)
    
    # Construct JSON
    track_offset = 71 + (day - 1) * 7
    
    subSections = []
    
    # 概要理解
    gaiyou_questions = []
    for q_idx in range(1, 4):
        t_id = f"N3-{track_offset + q_idx - 1}"
        ans = str(gaiyou_ans.get(str(q_idx), "1"))
        script = gaiyou_qs.get(q_idx, "")
        
        q_obj = {
            "number": q_idx,
            "trackId": t_id,
            "audioSrc": f"/audio/zenkamoku_n3/{t_id}.mp3",
            "options": ["1", "2", "3", "4"],
            "correct": int(ans),
            "correctOption": ans,
            "script": script
        }
        gaiyou_questions.append(q_obj)
        
    subSections.append({
        "type": "summary_comprehension",
        "title": "概要理解",
        "titleEn": "Summary comprehension",
        "pageRef": f"p.{162 + (day-1)*2}",
        "instruction": "問題用紙に何もいんさつされていません。この問題は、ぜんたいとしてどんなないようかを聞く問題です。話の前に質問はありません。まず話を聞いてください。それから、質問とせんたくしを聞いて、1から4の中から、最もよいものを一つえらんでください。",
        "questions": gaiyou_questions
    })
    
    # 発話表現
    hatsuwa_questions = []
    for q_idx in range(1, 5):
        t_id = f"N3-{track_offset + 3 + q_idx - 1}"
        ans = str(hatsuwa_ans.get(str(q_idx), "1"))
        script = hatsuwa_qs.get(q_idx, "")
        
        q_obj = {
            "number": q_idx,
            "trackId": t_id,
            "audioSrc": f"/audio/zenkamoku_n3/{t_id}.mp3",
            "imageSrc": f"/images/zenkamoku_n3/w11_d{day}_q{q_idx}.jpg",
            "options": ["1", "2", "3"],
            "correct": int(ans),
            "correctOption": ans,
            "script": script
        }
        hatsuwa_questions.append(q_obj)
        
    subSections.append({
        "type": "utterance_expression",
        "title": "発話表現",
        "titleEn": "Utterance expressions",
        "pageRef": f"pp.{162 + (day-1)*2}-{163 + (day-1)*2}",
        "instruction": "えを見ながら質問を聞いてください。やじるし（➡）の人は何と言いますか。1から3の中から、最もよいものを一つえらんでください。",
        "questions": hatsuwa_questions
    })
    
    chapter_data = {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": f"w11-d0{day}",
        "week": 11,
        "day": day,
        "weekTitle": "第11週",
        "dayTitle": f"{day}日目",
        "subSections": subSections
    }
    
    out_file = os.path.join(out_dir, f"w11-d0{day}.json")
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(chapter_data, f, ensure_ascii=False, indent=2)

print("Generated w11 files.")
