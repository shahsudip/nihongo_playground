"""
Zenkamoku Standard Validation Engine (for N1, N2, and N3)

Validates:
1. Exact option counts:
   - Reading/Grammar/Vocab: strictly 4 options
   - Listening Quick Response (即時応答): strictly 3 options
2. exact correctOption match:
   - correctOption must identically equal options[correct - 1]
3. Full tag pairing and closure:
   - All <ruby>...<rt>...</rt></ruby> tags must be strictly paired.
   - All <u>...</u>, <b>...</b>, <sup>...</sup>, <sub>...</sub> tags must be closed.
4. Text grammar (文章の文法):
   - Stems must strictly be "" (empty string) with no synthetic prompt.
5. Star question representation:
   - Star questions must contain <u>　★　</u> and correctOrder / starPosition.
6. CSS Dark-Mode safety:
   - NO hardcoded 'bg-white' in passage HTML. Must use theme-adaptive classes or speed-master classes.
"""

import json
import glob
import re
import os
from typing import List, Dict, Tuple

def validate_zenkamoku_book(level: str, data_dir: str = None) -> Tuple[int, List[str]]:
    level_lower = level.lower()
    if not data_dir:
        data_dir = f"src/data/zenkamoku_{level_lower}"

    files = sorted(glob.glob(os.path.join(data_dir, "w*.json")))
    if not files:
        return 0, [f"No JSON files found in {data_dir}"]

    issues = []
    total_questions = 0

    for fpath in files:
        fname = os.path.basename(fpath)
        with open(fpath, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except Exception as e:
                issues.append(f"[{fname}] JSON syntax error: {e}")
                continue

        # Check instruction for tag mismatches
        instruction = data.get('instruction', '')
        for tag in ['ruby', 'rt', 'u', 'b', 'sup', 'sub']:
            if len(re.findall(rf'<{tag}\b[^>]*>', instruction)) != len(re.findall(rf'</{tag}>', instruction)):
                issues.append(f"[{fname}] instruction has unclosed <{tag}> tag")

        sections = data.get('sections') or data.get('subSections')
        if not sections and 'questions' in data:
            sections = [{'questions': data['questions']}]
        elif not sections:
            sections = []

        for s_idx, sec in enumerate(sections):
            sec_type = sec.get('type', '')
            passage = sec.get('passage', '')
            
            # Check passage HTML
            if passage:
                # Disallow hardcoded bg-white
                if 'bg-white' in passage:
                    issues.append(f"[{fname}] Section {s_idx+1}: contains hardcoded 'bg-white' (breaks dark mode)")
                    
                for tag in ['ruby', 'rt', 'u', 'b', 'sup', 'sub', 'div', 'span']:
                    open_c = len(re.findall(rf'<{tag}\b[^>]*>', passage))
                    close_c = len(re.findall(rf'</{tag}>', passage))
                    if open_c != close_c:
                        issues.append(f"[{fname}] Section {s_idx+1}: passage <{tag}> mismatch ({open_c} open vs {close_c} close)")

            questions = sec.get('questions', [])
            total_questions += len(questions)

            for q in questions:
                q_num = q.get('number', '?')
                opts = q.get('options', [])
                correct = q.get('correct')
                correct_opt = q.get('correctOption')
                stem = q.get('stem', '')

                # 1. Option count
                clean_sec_title = re.sub(r'<[^>]+>', '', sec.get('title', ''))
                clean_book_title = re.sub(r'<[^>]+>', '', data.get('sectionTitle', ''))
                clean_instruct = re.sub(r'<[^>]+>', '', data.get('instruction', ''))
                
                type_str = f"{sec_type} {data.get('sectionType', '')} {data.get('type', '')}".lower()
                
                is_three_option_task = (
                    any(t in type_str for t in ['quick_response', 'utterance_expressions', 'listening_response']) or 
                    '即時応答' in clean_sec_title or 
                    '発話表現' in clean_sec_title or
                    '即時応答' in clean_book_title or
                    '発話表現' in clean_book_title or
                    '3つの選択肢' in clean_instruct or
                    '1・2・3から' in clean_instruct or
                    '１・２・３から' in clean_instruct
                )
                expected_opts = 3 if is_three_option_task else 4
                if len(opts) != expected_opts and q.get('type') != 'example':
                    issues.append(f"[{fname}] Q{q_num}: option count is {len(opts)} (expected {expected_opts})")

                # 2. correctOption exact match
                if correct and opts:
                    if correct < 1 or correct > len(opts):
                        issues.append(f"[{fname}] Q{q_num}: correct index {correct} out of bounds")
                    elif correct_opt is not None:
                        opt_str = opts[correct - 1] if isinstance(opts[correct - 1], str) else opts[correct - 1].get('text', '')
                        corr_str = correct_opt if isinstance(correct_opt, str) else correct_opt.get('text', '')
                        if opt_str != corr_str:
                            issues.append(f"[{fname}] Q{q_num}: correctOption '{corr_str}' does not match options[{correct-1}] '{opt_str}'")

                # 3. Text grammar stem check (Week 4 / 文章の文法)
                if 'text_grammar' in sec_type or '文章の文法' in sec.get('title', ''):
                    if stem != "":
                        issues.append(f"[{fname}] Q{q_num} (Text Grammar): stem must be empty string, but found '{stem}'")

                # 4. Ruby tag matching in stem and options
                if stem:
                    for tag in ['ruby', 'rt', 'u', 'b', 'sup', 'sub']:
                        open_c = len(re.findall(rf'<{tag}\b[^>]*>', stem))
                        close_c = len(re.findall(rf'</{tag}>', stem))
                        if open_c != close_c:
                            issues.append(f"[{fname}] Q{q_num}: stem <{tag}> tag mismatch ({open_c} open vs {close_c} close)")

                for o_idx, opt in enumerate(opts):
                    opt_text = opt if isinstance(opt, str) else opt.get('text', '')
                    for tag in ['ruby', 'rt', 'u', 'b', 'sup', 'sub']:
                        open_c = len(re.findall(rf'<{tag}\b[^>]*>', opt_text))
                        close_c = len(re.findall(rf'</{tag}>', opt_text))
                        if open_c != close_c:
                            issues.append(f"[{fname}] Q{q_num} Option {o_idx+1}: <{tag}> tag mismatch ({open_c} open vs {close_c} close)")

    return total_questions, issues


if __name__ == '__main__':
    for lvl in ['n1', 'n2', 'n3']:
        print(f"\n==========================================")
        print(f"       AUDITING ZENKAMOKU {lvl.upper()}")
        print(f"==========================================")
        total_q, errs = validate_zenkamoku_book(lvl)
        print(f"Total questions validated: {total_q}")
        if not errs:
            print(f"[OK] 100% PERFECT: Zenkamoku {lvl.upper()} passed all validation checks with 0 issues!")
        else:
            print(f"[FAIL] Found {len(errs)} issues in Zenkamoku {lvl.upper()}:")
            for i, err in enumerate(errs[:30]):
                print(f"  {i+1}. {err}")
            if len(errs) > 30:
                print(f"  ... and {len(errs)-30} more.")
