import glob
import json
import re
import os

def audit_all_weeks():
    files = sorted(glob.glob('src/data/zenkamoku_n3/w*.json'))
    print(f"Total files found for Zenkamoku N3: {len(files)}")

    issues = []
    week_summary = {}

    for fpath in files:
        fname = os.path.basename(fpath)
        week_num = fname.split('-')[0]
        if week_num not in week_summary:
            week_summary[week_num] = {'count': 0, 'issues': 0}
        week_summary[week_num]['count'] += 1

        with open(fpath, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except Exception as e:
                issues.append(f"{fname}: JSON syntax error: {e}")
                week_summary[week_num]['issues'] += 1
                continue

        sections = data.get('sections') or data.get('subSections')
        if not sections and 'questions' in data:
            sections = [{'questions': data['questions']}]
        elif not sections:
            sections = []

        for s_idx, sec in enumerate(sections):
            passage = sec.get('passage', '')
            if passage:
                for tag in ['ruby', 'rt', 'u', 'b', 'sup', 'sub']:
                    open_count = len(re.findall(rf'<{tag}\b[^>]*>', passage))
                    close_count = len(re.findall(rf'</{tag}>', passage))
                    if open_count != close_count:
                        msg = f"{fname} Sec {s_idx+1}: tag <{tag}> mismatch ({open_count} open vs {close_count} close)"
                        issues.append(msg)
                        week_summary[week_num]['issues'] += 1

            for q in sec.get('questions', []):
                q_num = q.get('number', '?')
                opts = q.get('options', [])
                correct = q.get('correct')
                correct_opt = q.get('correctOption')

                if len(opts) != 4 and q.get('type') != 'example':
                    issues.append(f"{fname} Q{q_num}: options count = {len(opts)} (expected 4)")
                    week_summary[week_num]['issues'] += 1

                if correct and opts:
                    if correct < 1 or correct > len(opts):
                        issues.append(f"{fname} Q{q_num}: correct={correct} out of bounds")
                        week_summary[week_num]['issues'] += 1
                    elif correct_opt is not None:
                        opt_target = opts[correct - 1]
                        opt_target_str = opt_target if isinstance(opt_target, str) else opt_target.get('text', '')
                        corr_str = correct_opt if isinstance(correct_opt, str) else correct_opt.get('text', '')
                        if opt_target_str != corr_str:
                            issues.append(f"{fname} Q{q_num}: correctOption mismatch:\n   correctOption: '{corr_str}'\n   options[{correct-1}]: '{opt_target_str}'")
                            week_summary[week_num]['issues'] += 1

                stem = q.get('stem', '')
                if stem:
                    for tag in ['ruby', 'rt', 'u', 'b', 'sup', 'sub']:
                        open_count = len(re.findall(rf'<{tag}\b[^>]*>', stem))
                        close_count = len(re.findall(rf'</{tag}>', stem))
                        if open_count != close_count:
                            issues.append(f"{fname} Q{q_num}: stem tag <{tag}> mismatch ({open_count} vs {close_count})")
                            week_summary[week_num]['issues'] += 1

                for opt_idx, opt in enumerate(opts):
                    opt_str = opt if isinstance(opt, str) else opt.get('text', '')
                    for tag in ['ruby', 'rt', 'u', 'b', 'sup', 'sub']:
                        open_count = len(re.findall(rf'<{tag}\b[^>]*>', opt_str))
                        close_count = len(re.findall(rf'</{tag}>', opt_str))
                        if open_count != close_count:
                            issues.append(f"{fname} Q{q_num} opt{opt_idx+1}: tag <{tag}> mismatch ({open_count} vs {close_count})")
                            week_summary[week_num]['issues'] += 1

    print("\n--- Week Summary ---")
    for w, stats in sorted(week_summary.items()):
        print(f"  {w}: {stats['count']} files, {stats['issues']} issues")

    print(f"\n--- Total Issues: {len(issues)} ---")
    for i, iss in enumerate(issues[:40]):
        print(f"{i+1}. {iss}")
    if len(issues) > 40:
        print(f"... and {len(issues)-40} more.")

if __name__ == '__main__':
    audit_all_weeks()
