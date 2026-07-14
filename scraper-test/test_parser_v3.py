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
    
    # regexes
    # Match standard question format: "N [Type] Question" or "N Question"
    # Matches a number at start of line
    line_start_num_re = re.compile(r'^(\d+)(?:\s+\[(Moji|Goi|Bunpou|Moji/Goi|Moji/Bunpou|Moji/Goi/Bunpou)\])?\s*(.*)$', re.IGNORECASE)
    
    # Matches option line (starts with 1-4, full or half-width)
    option_prefix_re = re.compile(r'^([1234]|[１２３４])[\s　.．、)）](.*)$')

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
            
            # Determine if this is a new question or an option line
            # Rule:
            # - If num > 4: it MUST be a question
            # - If num <= 4:
            #     - If it matches the expected next question number (i.e. 1, 2, 3, 4 at the very start): it is a question
            #     - Otherwise: it is an option line
            expected_next = len(questions) + 1
            is_question = False
            
            if num > 4:
                is_question = True
            elif num == expected_next:
                is_question = True
                
            if is_question:
                if current_q:
                    questions.append(current_q)
                current_q = {
                    "number": num,
                    "type": q_type,
                    "questionText": rest_of_line,
                    "options": [],
                    "line_num": line_idx + 1
                }
                state = "question_text"
                continue
                
        # If we got here, it's not a question line.
        # Check if it matches an option line prefix (1-4)
        opt_match = option_prefix_re.match(line)
        if opt_match and current_q:
            # It's an option line with number prefix (for questions > 4)
            opt_text = opt_match.group(2).strip()
            current_q["options"].append(opt_text)
            state = "options"
            continue
            
        # Otherwise, if we have a current question:
        if current_q:
            # If options don't have number prefixes (questions 1-265)
            # and we are in options state or we finished the question text,
            # we treat any non-empty line as an option, as long as options count < 4
            # Wait, let's look at how we know when the question text ends.
            # In Q1 to Q265, options don't start with numbers, but question text is usually 1 line.
            # Let's check: is question text always 1 line in Q1-265?
            # Yes, they are short sentences like: "郵便局の近くに引っ越したので便利です。"
            # If so, if we are in "question_text" state, and the line has no number, and options count is < 4:
            # Wait, does the question text ever have multiple lines in Q1-265?
            # Let's inspect. Standard questions are single sentences.
            # If we assume question text is 1 line, then the next lines are options.
            # Let's refine this:
            # For Q1-265 (where Moji/Goi/Bunpou tags are present):
            # We can change state to "options" after the first line, and any subsequent lines are options.
            # Let's check if this is true!
            # Let's write this logic:
            if current_q["number"] <= 265:
                # Up to 265, the first line is the question text. Subsequent lines are options.
                if len(current_q["options"]) < 4:
                    current_q["options"].append(line)
                    state = "options"
                else:
                    # Extra lines (rare or error)
                    current_q["options"][-1] += "\n" + line
            else:
                # After 265, options start with numbers (1-4).
                # If a line does not start with 1-4, it must be part of the question text (multi-line) or part of the last option.
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

# Save to parsed_questions_v3.json
with open("parsed_questions_v3.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)
