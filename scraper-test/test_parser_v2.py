import re
import json
import sys

# Ensure stdout uses UTF-8 to avoid console errors
sys.stdout.reconfigure(encoding='utf-8')

def parse_all_questions(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    questions = []
    current_q = None
    state = "seeking" # states: "seeking", "question_text", "options"
    
    # regexes
    # Format 1: "1 [Moji] 郵便局の近くに引っ越したので便利です。"
    q_start_fmt1 = re.compile(r'^(\d+)\s+\[(Moji|Goi|Bunpou|Moji/Goi|Moji/Bunpou|Moji/Goi/Bunpou)\]\s*(.*)$', re.IGNORECASE)
    
    # Format 2: "266 この求人広告は仕事の内容がよくわからない。"
    # A number followed by space/Japanese text. We must distinguish it from option lines.
    # Questions are usually > 4 or sequential.
    q_start_fmt2 = re.compile(r'^(\d+)\s+([^0-9].*)$')
    
    # Option lines start with 1, 2, 3, or 4 (half-width or full-width)
    option_re = re.compile(r'^([1234]|[１２３４])[\s　.．、)）](.*)$')

    for line_idx, line in enumerate(lines):
        orig_line = line
        line = line.strip()
        if not line:
            continue
            
        # Skip general header or footer lines
        if line.startswith("Week") or "Questions" in line or "Here is the continuation" in line or line.startswith("Page"):
            continue
            
        # Try to match a new question start
        match_fmt1 = q_start_fmt1.match(line)
        match_fmt2 = q_start_fmt2.match(line)
        
        is_new_q = False
        q_num = None
        q_type = "general"
        q_text = ""
        
        if match_fmt1:
            is_new_q = True
            q_num = int(match_fmt1.group(1))
            q_type = match_fmt1.group(2).lower()
            q_text = match_fmt1.group(3).strip()
        elif match_fmt2:
            potential_num = int(match_fmt2.group(1))
            # If the number is > 4, or it's equal to expected next question number, it's a question.
            # (Options are only 1-4).
            expected_next = len(questions) + 1 if not current_q else current_q["number"] + 1
            if potential_num > 4 or potential_num == expected_next or potential_num == 1:
                is_new_q = True
                q_num = potential_num
                q_text = match_fmt2.group(2).strip()
                
        if is_new_q:
            if current_q:
                questions.append(current_q)
            current_q = {
                "number": q_num,
                "type": q_type,
                "questionText": q_text,
                "options": [],
                "line_num": line_idx + 1
            }
            state = "question_text"
            continue
            
        # Check if it's an option line
        opt_match = option_re.match(line)
        if opt_match and current_q:
            opt_num_char = opt_match.group(1)
            # Map full-width numbers to standard digits
            num_map = {'１': '1', '２': '2', '３': '3', '４': '4'}
            opt_num = int(num_map.get(opt_num_char, opt_num_char))
            opt_text = opt_match.group(2).strip()
            
            # Add to options
            current_q["options"].append(opt_text)
            state = "options"
            continue
            
        # If it's not a question start or option start, it's either:
        # - Multi-line question text (if state is question_text)
        # - Or extra text inside option (if state is options)
        if current_q:
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

questions = parse_all_questions("extracted_text.txt")
print(f"Total questions parsed: {len(questions)}")

# Verify question numbers and gaps
numbers = [q["number"] for q in questions]
print(f"Question numbers range: {min(numbers)} to {max(numbers)}")

missing = []
for i in range(1, max(numbers) + 1):
    if i not in numbers:
        missing.append(i)
        
if missing:
    print(f"Missing question numbers ({len(missing)}): {missing}")
else:
    print("No missing question numbers!")

# Distribution of options
counts = {}
for q in questions:
    opt_len = len(q["options"])
    counts[opt_len] = counts.get(opt_len, 0) + 1

print("\nOptions count distribution:")
for opt_len, qty in sorted(counts.items()):
    print(f"  {opt_len} options: {qty} questions")
    
# Let's inspect any questions that don't have 4 or 2 options
bad_options_questions = [q for q in questions if len(q["options"]) not in (2, 4)]
print(f"\nQuestions with odd option count ({len(bad_options_questions)}):")
for q in bad_options_questions[:10]:
    print(f"  Q{q['number']} at line {q['line_num']} has {len(q['options'])} options: {q['options']}")

# Save to parsed_questions_v2.json
with open("parsed_questions_v2.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)
