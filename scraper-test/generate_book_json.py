import re
import json
import sys

# Ensure stdout uses UTF-8
sys.stdout.reconfigure(encoding='utf-8')

# 1. Parse all questions
def parse_all_questions(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    questions = []
    current_q = None
    state = "seeking"
    
    line_start_num_re = re.compile(r'^(\d+)(?:\s+\[(Moji|Goi|Bunpou|Moji/Goi|Moji/Bunpou|Moji/Goi/Bunpou)\])?\s*(.*)$', re.IGNORECASE)
    option_line_re = re.compile(r'^([1234]|[１２３４])[\s　.．、)）](.*)$')
    inline_options_re = re.compile(r'([1234]|[１２３４])[\s　.．、)）](.+?)(?=\s+[1234１２３４][\s　.．、)）]|\s*$)')

    for line_idx, line in enumerate(lines):
        line = line.strip()
        if not line:
            continue
            
        if line.startswith("Week") or "Questions" in line or "Here is the continuation" in line or line.startswith("Page"):
            continue
            
        match = line_start_num_re.match(line)
        if match:
            num = int(match.group(1))
            q_type = match.group(2).lower() if match.group(2) else "general"
            rest_of_line = match.group(3).strip()
            
            expected_next = (current_q["number"] + 1) if current_q else 1
            is_question = False
            
            if num > 4:
                is_question = True
            elif num == expected_next:
                is_question = True
                
            if is_question:
                if current_q:
                    questions.append(current_q)
                    
                inline_opts = inline_options_re.findall(rest_of_line)
                has_inline = False
                if inline_opts:
                    num_map = {'１': '1', '２': '2', '３': '3', '４': '4'}
                    mapped_nums = [int(num_map.get(o[0], o[0])) for o in inline_opts]
                    if 1 in mapped_nums:
                        has_inline = True
                        
                if has_inline:
                    options = []
                    first_opt_match = re.search(r'(?:^|\s)([1１])[\s　.．、)）]', rest_of_line)
                    if first_opt_match:
                        q_text_only = rest_of_line[:first_opt_match.start()].strip()
                    else:
                        q_text_only = rest_of_line
                        
                    for opt_num_char, opt_text in inline_opts:
                        options.append(opt_text.strip())
                        
                    current_q = {
                        "number": num,
                        "type": q_type,
                        "questionText": q_text_only,
                        "options": options,
                        "line_num": line_idx + 1
                    }
                    state = "options"
                else:
                    current_q = {
                        "number": num,
                        "type": q_type,
                        "questionText": rest_of_line,
                        "options": [],
                        "line_num": line_idx + 1
                    }
                    state = "question_text"
                continue
                
        opt_match = option_line_re.match(line)
        if opt_match and current_q:
            opt_text = opt_match.group(2).strip()
            current_q["options"].append(opt_text)
            state = "options"
            continue
            
        if current_q:
            if current_q["number"] <= 265:
                if len(current_q["options"]) < 4:
                    current_q["options"].append(line)
                    state = "options"
                else:
                    current_q["options"][-1] += "\n" + line
            else:
                if state == "question_text":
                    current_q["questionText"] += "\n" + line
                elif state == "options":
                    if current_q["options"]:
                        current_q["options"][-1] += "\n" + line
                    else:
                        current_q["options"].append(line)

    if current_q:
        questions.append(current_q)
        
    return questions

# 2. Filter duplicates
parsed = parse_all_questions("extracted_text.txt")
unique = {}
for q in parsed:
    num = q["number"]
    if num not in unique:
        unique[num] = q
        
sorted_nums = sorted(unique.keys())
final_questions = [unique[n] for n in sorted_nums]
print(f"Parsed {len(final_questions)} unique questions.")

# 3. Create Week-Day segments
book_chapters = []

for week in range(1, 5):
    week_start_idx = (week - 1) * 125
    week_questions = final_questions[week_start_idx : week_start_idx + 125]
    
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
            
        # Format the questions for JSON
        formatted_qs = []
        for q in q_slice:
            opts = q["options"]
            # Fallback placeholder answer
            ans_text = opts[0] if opts else "Option 1"
            formatted_qs.append({
                "questionText": q["questionText"],
                "options": opts,
                "correctOption": {
                    "index": 0,
                    "text": ans_text
                },
                "explanation": f"Question {q['number']} ({q['type'].upper()}). Answer will be updated soon."
            })
            
        chap_id = f"w{week}-d{day}"
        chap_title = f"Week {week} - Day {day}" if day < 7 else f"Week {week} - Day 7 Review"
        
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

# 4. Generate Book Object
shin_book = {
    "id": "shin-nihongo-500-n3",
    "title": "Shin Nihongo 500 Mon N3",
    "description": "Improve your vocabulary, kanji, and grammar for the JLPT N3. Features a structured 4-week daily challenge program.",
    "coverUrl": "",
    "level": "N3",
    "category": "Drill",
    "chapters": book_chapters
}

with open("scraper-test/shin500.json", "w", encoding="utf-8") as f:
    json.dump(shin_book, f, ensure_ascii=False, indent=2)

print("Generated scraper-test/shin500.json successfully!")
