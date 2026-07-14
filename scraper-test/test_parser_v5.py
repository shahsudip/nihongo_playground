import re
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

def parse_all_questions(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    questions = []
    current_q = None
    state = "seeking" # "seeking", "question_text", "options"
    
    # Matches standard question start line: e.g., "N [Type] Text" or "N Text"
    line_start_num_re = re.compile(r'^(\d+)(?:\s+\[(Moji|Goi|Bunpou|Moji/Goi|Moji/Bunpou|Moji/Goi/Bunpou)\])?\s*(.*)$', re.IGNORECASE)
    
    # Matches option line start: e.g. "1　...", "2. ...", "1 ..."
    option_line_re = re.compile(r'^([1234]|[１２３４])[\s　.．、)）](.*)$')

    # Regex to find inline options: "1 ... 2 ... 3 ... 4 ..." or "1 ... 2 ..."
    # Fixed lookahead to allow \s*$ (zero or more spaces at the end of the line)
    inline_options_re = re.compile(r'([1234]|[１２３４])[\s　.．、)）](.+?)(?=\s+[1234１２３４][\s　.．、)）]|\s*$)')

    for line_idx, line in enumerate(lines):
        orig_line = line
        line = line.strip()
        if not line:
            continue
            
        # Ignore headers
        if line.startswith("Week") or "Questions" in line or "Here is the continuation" in line or line.startswith("Page"):
            continue
            
        match = line_start_num_re.match(line)
        if match:
            num = int(match.group(1))
            q_type = match.group(2).lower() if match.group(2) else "general"
            rest_of_line = match.group(3).strip()
            
            # Determine if this starts a new question or is an option line
            expected_next = (current_q["number"] + 1) if current_q else 1
            is_question = False
            
            if num > 4:
                is_question = True
            elif num == expected_next:
                is_question = True
                
            if is_question:
                # Save previous question
                if current_q:
                    questions.append(current_q)
                    
                # Check if this line has inline options (e.g. Q287)
                inline_opts = inline_options_re.findall(rest_of_line)
                
                has_inline = False
                if inline_opts:
                    num_map = {'１': '1', '２': '2', '３': '3', '４': '4'}
                    mapped_nums = [int(num_map.get(o[0], o[0])) for o in inline_opts]
                    if 1 in mapped_nums:
                        has_inline = True
                        
                if has_inline:
                    options = []
                    # Find start of first option to isolate questionText
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
                
        # If we got here, it's not a new question start line.
        # Check if it matches an option line prefix
        opt_match = option_line_re.match(line)
        if opt_match and current_q:
            opt_text = opt_match.group(2).strip()
            current_q["options"].append(opt_text)
            state = "options"
            continue
            
        # Otherwise, append to current question
        if current_q:
            if current_q["number"] <= 265:
                # Up to 265, options don't start with numbers.
                if len(current_q["options"]) < 4:
                    current_q["options"].append(line)
                    state = "options"
                else:
                    current_q["options"][-1] += "\n" + line
            else:
                # After 265, options start with numbers.
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

# Check duplicates
seen = {}
for q in questions:
    num = q["number"]
    if num in seen:
        seen[num].append(q)
    else:
        seen[num] = [q]

duplicates = {k: v for k, v in seen.items() if len(v) > 1}
print(f"\nDuplicate question numbers ({len(duplicates)}): {list(duplicates.keys())}")
for k, v in list(duplicates.items())[:5]:
    print(f"  Num {k} is duplicate:")
    for item in v:
        print(f"    Line {item['line_num']}: {item['questionText']}")

# Distribution of options
counts = {}
for q in questions:
    opt_len = len(q["options"])
    counts[opt_len] = counts.get(opt_len, 0) + 1

print("\nOptions count distribution:")
for opt_len, qty in sorted(counts.items()):
    print(f"  {opt_len} options: {qty} questions")
    
# Save to parsed_questions_v5.json
with open("parsed_questions_v5.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)
