import json
import re
import itertools

with open("nihongo power drill/power_drill_grammar_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for chapter in data["chapters"]:
    m = re.search(r'grammar-(\d+)', chapter["id"])
    if m:
        chap_num = int(m.group(1))
        if 16 <= chap_num <= 30:
            for passage in chapter["passages"]:
                if "mondai2" in passage["id"] or "問題2" in passage.get("title", ""):
                    for q in passage["questions"]:
                        if q["options"] == ["1", "2", "3", "4"]:
                            text = q["questionText"]
                            # Example: 姉がおとなしいのに対して、妹はうるさいぐらいよくしゃべる。（1: 妹は  2: うるさい  3: おとなしい  4: のに対して）
                            m = re.search(r'^(.*?)（1:\s*(.*?)\s*2:\s*(.*?)\s*3:\s*(.*?)\s*4:\s*(.*?)\）', text)
                            if m:
                                full_sentence = m.group(1).strip()
                                opts = [m.group(2).strip(), m.group(3).strip(), m.group(4).strip(), m.group(5).strip()]
                                
                                q["options"] = opts
                                
                                perms = list(itertools.permutations([0,1,2,3]))
                                best_match = None
                                for p in perms:
                                    # allow optional commas between options in the full_sentence
                                    pattern = re.escape(opts[p[0]]) + r'[、]?' + re.escape(opts[p[1]]) + r'[、]?' + re.escape(opts[p[2]]) + r'[、]?' + re.escape(opts[p[3]])
                                    match = re.search(pattern, full_sentence)
                                    if match:
                                        best_match = (p, match)
                                        break
                                
                                if best_match:
                                    p, match = best_match
                                    prefix = full_sentence[:match.start()]
                                    suffix = full_sentence[match.end():]
                                    q["questionText"] = f"{prefix}＿＿　＿＿　★　＿＿{suffix}"
                                    order_str = " ".join([str(x+1) for x in p])
                                    q["explanation"] = f"{full_sentence} -> {order_str}"
                                else:
                                    print(f"Could not match options in {full_sentence} for {q['id']}")
                                    q["questionText"] = f"{full_sentence} ＿＿　＿＿　★　＿＿"
                                    q["explanation"] = full_sentence

with open("nihongo power drill/power_drill_grammar_data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Done fixing chapters 16-30!")
