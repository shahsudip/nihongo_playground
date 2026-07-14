import re
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

def parse_n2_questions(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    questions = []
    
    current_q = None
    state = "seek"
    expected_q_num = 1
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        match = re.match(r'^(?:\*\*)?(?:Q)?(\d+)(?:\*\*)?[\s.、]*(.*)', line)
        if match:
            num = int(match.group(1))
            if num == expected_q_num:
                if current_q:
                    questions.append(current_q)
                    
                q_text = match.group(2)
                if q_text is None:
                    q_text = ""
                
                current_q = {
                    "number": num,
                    "questionText": q_text.strip(),
                    "options": [],
                    "correctOption": {"index": 0, "text": ""},
                    "explanation": ""
                }
                expected_q_num += 1
                state = "text"
                continue
                
        if not current_q:
            continue
            
        if state in ["text", "options"] and re.match(r'^(?:1|１)[\s.、]+.+(?:2|２)[\s.、]+', line):
            opt_matches = re.split(r'[1234１２３４][\s　.．、)）]', line)
            opts = [o.strip() for o in opt_matches if o.strip()]
            if opts:
                current_q["options"] = opts
            state = "options"
            continue
            
        if line.startswith('**Correct:') or line.startswith('Correct:'):
            correct_match = re.search(r'Correct:\s*(\d+)\s*(.*)', line)
            if correct_match:
                idx = int(correct_match.group(1)) - 1
                rest = correct_match.group(2).strip()
                
                expl_match = re.search(r'\((.*?)\)', rest)
                ans_text = rest
                if expl_match:
                    ans_text = rest[:expl_match.start()].replace('**', '').strip()
                    current_q["explanation"] = f"({expl_match.group(1)})"
                else:
                    ans_text = ans_text.replace('**', '').strip()
                    
                current_q["correctOption"] = {
                    "index": idx,
                    "text": ans_text
                }
            state = "explanation"
            continue
            
        if state == "text":
            current_q["questionText"] += "\n" + line
        elif state == "explanation":
            current_q["explanation"] += "\n" + line

    if current_q:
        questions.append(current_q)
        
    return questions

questions = parse_n2_questions('extracted_text_n2.txt')
print(f"Parsed {len(questions)} questions.")

book_chapters = []

# N2 Shin 500: 4 weeks. Each week has 125 questions.
# Days 1-6 have 15 questions each (90 total).
# Day 7 has 35 questions.

for week in range(1, 5):
    week_start_idx = (week - 1) * 125
    week_questions = questions[week_start_idx : week_start_idx + 125]
    
    for day in range(1, 8):
        if day < 7:
            day_start = (day - 1) * 15
            day_end = day_start + 15
            q_slice = week_questions[day_start:day_end]
            chap_type = "questions-only"
            desc = f"Week {week} Day {day}: 15 vocabulary and grammar exercises."
        else:
            q_slice = week_questions[90:125]
            chap_type = "day-challenge"
            desc = f"Week {week} Day 7: Comprehensive review of the week's exercises (35 questions)."
            
        chap_id = f"w{week}-d{day}"
        chap_title = f"Week {week} - Day {day}" if day < 7 else f"Week {week} - Day 7 Review"
        
        formatted_qs = []
        for q in q_slice:
            opts = q["options"]
            if not opts:
                opts = ["Option 1", "Option 2", "Option 3", "Option 4"]
                
            c_idx = q["correctOption"]["index"]
            if c_idx >= len(opts):
                c_idx = 0
                
            ans_text = q["correctOption"]["text"]
            if not ans_text:
                ans_text = opts[c_idx] if c_idx < len(opts) else "Unknown"
                
            formatted_qs.append({
                "questionText": q["questionText"],
                "options": opts,
                "correctOption": {
                    "index": c_idx,
                    "text": ans_text
                },
                "explanation": q["explanation"].strip() or f"Question {q['number']}."
            })
            
        book_chapters.append({
            "id": chap_id,
            "title": chap_title,
            "type": chap_type,
            "description": desc,
            "passages": [
                {
                    "title": chap_title,
                    "passageText": "",
                    "questions": formatted_qs
                }
            ]
        })

shin_book = {
    "id": "shin-nihongo-500-n2",
    "title": "Shin Nihongo 500 Mon N2",
    "description": "Improve your vocabulary, kanji, and grammar for the JLPT N2. Features a structured 4-week daily challenge program.",
    "coverUrl": "",
    "level": "N2",
    "category": "Drill",
    "chapters": book_chapters
}

with open("shin500_n2.json", "w", encoding="utf-8") as f:
    json.dump(shin_book, f, ensure_ascii=False, indent=2)

print("Generated shin500_n2.json successfully!")
