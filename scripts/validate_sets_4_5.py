import json

def validate():
    with open('N4_Chokuzen_Taisaku_Processing/sets_4_5.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    with open('N4_Chokuzen_Taisaku_Processing/answer_key_n4.json', 'r', encoding='utf-8') as f:
        ak = json.load(f)

    print('Sets loaded:', len(data['sets']))

    total_errors = 0
    total_questions = 0

    for s in data['sets']:
        set_id = s['id']
        set_num = set_id.replace('set-', '')
        print(f"\n=== Checking {set_id} ===")
        v_qs = s['sections']['vocabulary-kanji']['questions']
        g_qs = s['sections']['grammar-reading']['questions']
        print(f"Vocab questions: {len(v_qs)} (Expected 34)")
        print(f"Grammar questions: {len(g_qs)} (Expected 25)")

        if len(v_qs) != 34:
            print(f"ERROR: Vocab questions count is {len(v_qs)}, expected 34")
            total_errors += 1
        if len(g_qs) != 25:
            print(f"ERROR: Grammar questions count is {len(g_qs)}, expected 25")
            total_errors += 1

        total_questions += len(v_qs) + len(g_qs)

        # Check vocab keys
        v_ans = ak['sets'][set_id]['vocabulary-kanji']
        v_flat = []
        for m in ['mondai1', 'mondai2', 'mondai3', 'mondai4', 'mondai5']:
            v_flat.extend(v_ans[m])

        for idx, (q, expected_1indexed) in enumerate(zip(v_qs, v_flat)):
            expected_0indexed = expected_1indexed - 1
            if q['correctIndex'] != expected_0indexed:
                print(f"ERROR Vocab Q{q['id']}: got correctIndex={q['correctIndex']}, expected={expected_0indexed}")
                total_errors += 1
            if len(q['options']) != 4:
                print(f"ERROR Vocab Q{q['id']}: options count={len(q['options'])}")
                total_errors += 1

        # Check grammar keys
        g_ans = ak['sets'][set_id]['grammar']
        g_flat = []
        for m in ['mondai1', 'mondai2', 'mondai3']:
            g_flat.extend(g_ans[m])

        for idx, (q, expected_1indexed) in enumerate(zip(g_qs, g_flat)):
            expected_0indexed = expected_1indexed - 1
            if q['correctIndex'] != expected_0indexed:
                print(f"ERROR Grammar Q{q['id']}: got correctIndex={q['correctIndex']}, expected={expected_0indexed}")
                total_errors += 1
            if len(q['options']) != 4:
                print(f"ERROR Grammar Q{q['id']}: options count={len(q['options'])}")
                total_errors += 1
            if q['id'] in [16, 17, 18, 19, 20]:
                if '★' not in q['questionText']:
                    print(f"ERROR Grammar Star Q{q['id']}: missing ★ in {q['questionText']}")
                    total_errors += 1
            if q['id'] in [21, 22, 23, 24, 25]:
                if 'passage' not in q or not q['passage']:
                    print(f"ERROR Grammar Mondai 3 Q{q['id']}: missing passage")
                    total_errors += 1

    print(f"\n==========================================")
    print(f"Total Questions Verified: {total_questions} (Expected 118)")
    print(f"Total Errors Found: {total_errors}")
    print(f"==========================================")

if __name__ == '__main__':
    validate()
