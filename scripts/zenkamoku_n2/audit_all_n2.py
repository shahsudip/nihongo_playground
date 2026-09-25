import json
import glob
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("=" * 70)
print("AUDITING ALL 60 CHAPTERS OF ZENKAMOKU N2")
print("=" * 70)

all_files = sorted(glob.glob('src/data/zenkamoku_n2/w*.json'))
print(f"Total chapter files found: {len(all_files)}")

issues = []

for fpath in all_files:
    fname = os.path.basename(fpath)
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    week = data.get('week')
    day = data.get('day')
    sections = data.get('sections', []) + data.get('subSections', [])
    
    if not sections:
        issues.append(f"{fname}: NO SECTIONS FOUND")
        continue
    
    for sec_i, sec in enumerate(sections, 1):
        sec_type = sec.get('type')
        questions = sec.get('questions', [])
        passage = sec.get('passage', '')
        imageSrc = sec.get('imageSrc', '')
        
        # Check Dokkai weeks 4-8 for raw imageSrc
        if week in [4, 5, 6, 7, 8]:
            if imageSrc:
                issues.append(f"{fname} Sec {sec_i} ({sec_type}): has raw imageSrc '{imageSrc}'")
            if not passage:
                issues.append(f"{fname} Sec {sec_i} ({sec_type}): MISSING PASSAGE HTML")
            elif 'bg-white' in passage:
                issues.append(f"{fname} Sec {sec_i} ({sec_type}): passage contains hardcoded bg-white")
        
        # Check Sentence Composition in Week 3
        if sec_type == 'sentence_composition' or '文の組み立て' in sec.get('title', ''):
            for q in questions:
                qnum = q.get('number')
                stem = q.get('stem', '')
                order = q.get('correctOrder')
                star = q.get('starPosition')
                exp = q.get('explanation', '')
                
                if not order or len(order) != 4:
                    issues.append(f"{fname} Q{qnum}: missing or invalid correctOrder ({order})")
                if not star:
                    issues.append(f"{fname} Q{qnum}: missing starPosition")
                if '<u>　★　</u>' not in stem:
                    issues.append(f"{fname} Q{qnum}: stem missing <u>　★　</u> ({stem})")
                if not exp:
                    issues.append(f"{fname} Q{qnum}: missing explanation")
        
        # Check Listening weeks 9-12
        if week in [9, 10, 11, 12]:
            for q in questions:
                qnum = q.get('number')
                script = q.get('script') or q.get('transcript')
                audio = q.get('audioSrc')
                exp = q.get('explanation')
                if not script:
                    issues.append(f"{fname} Q{qnum}: missing listening script")
                if not audio:
                    issues.append(f"{fname} Q{qnum}: missing audioSrc")
                if not exp:
                    issues.append(f"{fname} Q{qnum}: missing explanation")

        # General questions check
        for q in questions:
            qnum = q.get('number')
            opts = q.get('options', [])
            correct = q.get('correct')
            corrOpt = q.get('correctOption')
            exp = q.get('explanation')
            
            if len(opts) != 4:
                issues.append(f"{fname} Q{qnum}: options count is {len(opts)} (expected 4)")
            if not (1 <= correct <= 4):
                issues.append(f"{fname} Q{qnum}: invalid correct answer {correct}")
            if not exp or exp.strip() == '':
                issues.append(f"{fname} Q{qnum}: empty explanation")

print(f"\nAudit complete. Found {len(issues)} issues across N2.")
if issues:
    print("\n--- SAMPLE OF IDENTIFIED ISSUES ---")
    for iss in issues[:30]:
        print("  ❌", iss)
    if len(issues) > 30:
        print(f"  ... and {len(issues) - 30} more issues.")
else:
    print("✅ All N2 chapters pass 100% schema and quality checks!")
