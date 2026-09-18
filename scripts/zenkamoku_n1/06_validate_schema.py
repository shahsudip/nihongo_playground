"""
06_validate_schema.py
Zero-token offline validator for all zenkamoku_n1 JSON data.
Checks:
- Every question has exactly 4 options
- correct is int 1..4, correctOption matches options[correct-1]
- All ruby tags paired
- All audioSrc files exist in public/
- All imageSrc files exist in public/
"""
import sys, os, json, re, glob

sys.stdout.reconfigure(encoding='utf-8')

DATA_DIR = os.path.join('src', 'data', 'zenkamoku_n1')
PUBLIC_DIR = 'public'
errors = []
warnings = []

def check_ruby(text, context):
    open_ruby = text.count('<ruby>')
    close_ruby = text.count('</ruby>')
    open_rt = text.count('<rt>')
    close_rt = text.count('</rt>')
    if open_ruby != close_ruby:
        errors.append(f'{context}: Unmatched <ruby> tags ({open_ruby} open, {close_ruby} close)')
    if open_rt != close_rt:
        errors.append(f'{context}: Unmatched <rt> tags ({open_rt} open, {close_rt} close)')

def check_file_exists(src_path, context):
    if not src_path:
        return
    full = os.path.join(PUBLIC_DIR, src_path.lstrip('/'))
    if not os.path.exists(full):
        errors.append(f'{context}: Missing file {src_path}')

def validate_chapter(data, filename):
    chapter_id = data.get('chapterId', filename)
    questions = data.get('questions', [])

    # If questions not at top level, gather from sections/subSections
    if not questions:
        for key in ['sections', 'subSections']:
            for sub in data.get(key, []):
                stype = sub.get('type', '')
                for q in sub.get('questions', []):
                    q['_sub_type'] = stype
                    questions.append(q)

    # Check audio/image at chapter level
    check_file_exists(data.get('audioSrc'), chapter_id)
    check_file_exists(data.get('imageSrc'), chapter_id)

    for i, q in enumerate(questions):
        ctx = f'{chapter_id} Q{i+1}'
        opts = q.get('options', [])
        correct = q.get('correct')
        correct_opt = q.get('correctOption', '')

        # Option count (reading/grammar = 4; some listening = 3 for 即時応答)
        q_stype = q.get('_sub_type', '')
        expected_opts = 3 if q_stype == 'quick_response' else 4
        if len(opts) != expected_opts:
            errors.append(f'{ctx}: Expected {expected_opts} options, got {len(opts)}')

        # Correct index
        if correct is None:
            errors.append(f'{ctx}: Missing "correct" field')
        elif not (1 <= correct <= len(opts)):
            errors.append(f'{ctx}: correct={correct} out of range (1-{len(opts)})')
        elif opts and correct_opt:
            clean_opt = re.sub(r'<[^>]+>', '', opts[correct-1])
            clean_correct = re.sub(r'<[^>]+>', '', correct_opt)
            if clean_opt.strip() != clean_correct.strip():
                errors.append(f'{ctx}: correctOption mismatch\n  options[{correct-1}]={clean_opt!r}\n  correctOption={clean_correct!r}')

        # Ruby check
        q_text = q.get('stem') or q.get('questionText', '') or q.get('passage', '')
        if q_text:
            check_ruby(q_text, ctx)
        for opt in opts:
            check_ruby(opt, f'{ctx} option')

        # Per-question audio/image
        check_file_exists(q.get('audioSrc'), ctx)
        check_file_exists(q.get('imageSrc'), ctx)

# Run validation
json_files = glob.glob(os.path.join(DATA_DIR, '**', '*.json'), recursive=True)
if not json_files:
    print(f'⚠️  No JSON files found in {DATA_DIR} yet.')
else:
    for fpath in sorted(json_files):
        with open(fpath, encoding='utf-8') as f:
            try:
                data = json.load(f)
                validate_chapter(data, os.path.basename(fpath))
            except json.JSONDecodeError as e:
                errors.append(f'{fpath}: JSON parse error: {e}')

print(f'\n{"="*50}')
print(f'📁 Validated: {len(json_files)} files')
if errors:
    print(f'❌ {len(errors)} ERROR(S) FOUND:')
    for e in errors:
        print(f'  • {e}')
    sys.exit(1)
else:
    print(f'✅ ALL CHECKS PASSED — Zero defects!')
if warnings:
    for w in warnings:
        print(f'  ⚠️  {w}')
