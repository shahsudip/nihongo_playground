import json, glob, os, re

files = sorted(glob.glob('src/data/zenkamoku_n2/w0[1-3]-d*.json'))
print(f"Auditing {len(files)} files for Week 1 to 3...")

issues = []

for f in files:
    fname = os.path.basename(f)
    with open(f, 'r', encoding='utf-8') as fp:
        d = json.load(fp)
    
    sections = d.get('sections', [])
    for s_idx, sec in enumerate(sections):
        stype = sec.get('type')
        questions = sec.get('questions', [])
        for q in questions:
            qnum = q.get('number')
            stem = q.get('stem', '')
            options = q.get('options', [])
            correct = q.get('correct')
            correctOpt = q.get('correctOption', '')
            expl = q.get('explanation', '')
            
            # Check 1: 4 options
            if len(options) != 4:
                issues.append(f"[{fname}] Sec {stype} Q{qnum}: options count is {len(options)}, expected 4")
            
            # Check 2: correct index
            if not (1 <= correct <= 4):
                issues.append(f"[{fname}] Sec {stype} Q{qnum}: invalid correct index {correct}")
            
            # Check 3: correctOption match
            expected_opt = options[correct - 1] if 1 <= correct <= len(options) else ""
            if correctOpt != expected_opt:
                issues.append(f"[{fname}] Sec {stype} Q{qnum}: correctOption '{correctOpt}' != options[{correct-1}] '{expected_opt}'")
            
            # Check 4: Unclosed ruby
            for text in [stem, expl] + options:
                open_r = text.count('<ruby>')
                close_r = text.count('</ruby>')
                open_rt = text.count('<rt>')
                close_rt = text.count('</rt>')
                if open_r != close_r or open_rt != close_rt or open_r != open_rt:
                    issues.append(f"[{fname}] Sec {stype} Q{qnum}: broken ruby tag in '{text[:40]}...'")
            
            # Check 5: Underline presence for specific section types
            if stype in ['kanji_reading', 'orthography']:
                if '<u>' not in stem:
                    issues.append(f"[{fname}] Sec {stype} Q{qnum}: missing <u> in stem: {stem}")
            
            if stype == 'sentence_composition':
                if '★' not in stem:
                    issues.append(f"[{fname}] Sec {stype} Q{qnum}: missing ★ in stem: {stem}")
                if not q.get('starPosition') or not q.get('correctOrder'):
                    issues.append(f"[{fname}] Sec {stype} Q{qnum}: missing starPosition or correctOrder")

print(f"Total issues found: {len(issues)}")
for i in issues:
    print("  -", i)
