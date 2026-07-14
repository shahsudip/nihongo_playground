import re
import json
import sys

# Ensure stdout uses UTF-8 to avoid Windows console encoding errors
sys.stdout.reconfigure(encoding='utf-8')

def parse_questions(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    questions = []
    current_q = None
    
    # Regex to match question start: e.g. "1 [Moji] 郵便局の近くに引っ越したので便利です。"
    # Some question starts might be slightly different. Let's make it flexible.
    q_start_re = re.compile(r'^(\d+)\s+\[(Moji|Goi|Bunpou|文字|語彙|文法)\]\s*(.*)$', re.IGNORECASE)
    
    for line_idx, line in enumerate(lines):
        line = line.strip()
        if not line:
            continue
            
        match = q_start_re.match(line)
        if match:
            if current_q:
                questions.append(current_q)
            q_num = int(match.group(1))
            q_type = match.group(2)
            q_text = match.group(3).strip()
            current_q = {
                "number": q_num,
                "type": q_type.lower(),
                "questionText": q_text,
                "options": [],
                "line_num": line_idx + 1
            }
        else:
            if current_q is not None:
                if line.startswith("Week") or "Questions" in line or "Here is the continuation" in line:
                    continue
                current_q["options"].append(line)
                
    if current_q:
        questions.append(current_q)
        
    return questions

questions = parse_questions("extracted_text.txt")
print(f"Total questions parsed: {len(questions)}")

# Check options count distribution
counts = {}
for q in questions:
    opt_len = len(q["options"])
    counts[opt_len] = counts.get(opt_len, 0) + 1

print("\nOptions count distribution:")
for opt_len, qty in sorted(counts.items()):
    print(f"  {opt_len} options: {qty} questions")

# Find the question with a huge number of options
for q in questions:
    if len(q["options"]) > 10:
        print(f"\nQuestion with > 10 options:")
        print(f"  Number: {q['number']}")
        print(f"  Line: {q['line_num']}")
        print(f"  Type: {q['type']}")
        print(f"  Text: {q['questionText']}")
        print(f"  First few options: {q['options'][:5]}")
        print(f"  Total options count: {len(q['options'])}")
        
        # Let's inspect the lines right after this question in the text file
        print("\nNext lines in file after this question:")
        with open("extracted_text.txt", 'r', encoding='utf-8') as f:
            all_lines = f.readlines()
            start_idx = q['line_num'] # 1-based, so it points to the line after
            for i in range(start_idx, min(start_idx + 20, len(all_lines))):
                print(f"    Line {i+1}: {all_lines[i].strip()}")
        break
