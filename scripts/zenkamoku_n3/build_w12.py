import json
import re
import os

def build_week12():
    # Load answers
    with open('scripts/zenkamoku_n3/answer_keys_raw.json', 'r', encoding='utf-8') as f:
        answers_data = json.load(f)

    # Load kaisetsu
    with open('scripts/zenkamoku_n3/kaisetsu_text.txt', 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Find the start of Week 12
    start_idx = 0
    for i, line in enumerate(lines):
        if '第12 週 １日目' in line:
            start_idx = i
            break
            
    if start_idx == 0:
        print("Could not find start of Week 12 in kaisetsu")
        return

    kaisetsu_w12 = lines[start_idx:]
    
    # Parse explanations
    # Explanations structure:
    # 第12 週 １日目
    # 1 答え 1
    # text
    # 2 答え 3
    # text
    
    explanations = {}
    current_day = 0
    current_q = 0
    
    for line in kaisetsu_w12:
        line = line.strip()
        if not line:
            continue
            
        day_match = re.search(r'第12\s*週\s*([１-５1-5])日目', line)
        if day_match:
            day_str = day_match.group(1)
            # map fullwidth to halfwidth
            if day_str in '１２３４５':
                current_day = '１２３４５'.index(day_str) + 1
            else:
                current_day = int(day_str)
            explanations[current_day] = {}
            current_q = 0
            continue
            
        if current_day == 0:
            continue
            
        # Match '1  答え １' or '1 答え 1'
        q_match = re.match(r'^(\d+)\s*答え\s*([１-９1-9])', line)
        if q_match:
            current_q = int(q_match.group(1))
            explanations[current_day][current_q] = []
            continue
            
        if current_q > 0:
            # exclude header lines like '◆即時応答' or page refs
            if '即時応答' in line or 'Quick response' in line or 'p.17' in line or '全科目攻略！' in line:
                continue
            # avoid appending single numbers or just page numbers
            if re.match(r'^\d+$', line):
                continue
            explanations[current_day][current_q].append(line)

    # Tracks mapping (from viewing images)
    # Day 1: 106-114
    # Day 2: 115-123
    # Day 3: 124-132
    # Day 4: 133-141
    # Day 5: 142-150
    tracks = {}
    track_counter = 106
    for d in range(1, 6):
        tracks[d] = {}
        for q in range(1, 10): # 9 questions per day
            tracks[d][q] = f"N3-{track_counter}"
            track_counter += 1

    out_dir = 'src/data/zenkamoku_n3'
    os.makedirs(out_dir, exist_ok=True)
    
    for day in range(1, 6):
        day_key = f"第12週_{day}日目"
        if day_key not in answers_data:
            print(f"Answers for {day_key} not found")
            continue
            
        day_answers = answers_data[day_key]["即時応答"]["answers"]
        
        questions = []
        for q_num_str, ans in day_answers.items():
            q_num = int(q_num_str)
            
            # Combine explanation lines
            exp_lines = explanations.get(day, {}).get(q_num, [])
            script_text = " ".join(exp_lines).replace("  ", " ").strip()
            
            track_id = tracks[day][q_num]
            
            q_obj = {
                "number": q_num,
                "trackId": track_id,
                "audioSrc": f"/audio/zenkamoku_n3/{track_id}.mp3",
                "options": ["1", "2", "3"],
                "correct": int(ans),
                "correctOption": str(ans),
                "script": script_text
            }
            questions.append(q_obj)
            
        json_data = {
            "bookId": "zenkamoku-n3-best-workbook",
            "chapterId": f"w12-d0{day}",
            "week": 12,
            "day": day,
            "weekTitle": "第12週",
            "dayTitle": f"{day}日目",
            "subSections": [
                {
                    "type": "quick_response",
                    "title": "即時応答",
                    "titleEn": "Quick response",
                    "pageRef": f"p.{171 + day}",
                    "instruction": "問題用紙に何もいんさつされていません。まず文を聞いてください。それから、そのへんじを聞いて、1から3の中から、最もよいものを一つえらんでください。",
                    "questions": questions
                }
            ]
        }
        
        out_file = os.path.join(out_dir, f"w12-d0{day}.json")
        with open(out_file, 'w', encoding='utf-8') as f:
            json.dump(json_data, f, ensure_ascii=False, indent=2)
        print(f"Created {out_file}")

if __name__ == '__main__':
    build_week12()
