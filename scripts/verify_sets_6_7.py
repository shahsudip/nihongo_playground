import json

with open(r"D:\sudip_software\nihongo_playground\N4_Chokuzen_Taisaku_Processing\sets_6_7.json", "r", encoding="utf-8") as f:
    data = json.load(f)

with open(r"D:\sudip_software\nihongo_playground\N4_Chokuzen_Taisaku_Processing\answer_key_n4.json", "r", encoding="utf-8") as f:
    answer_keys = json.load(f)

sets = data["sets"]
assert len(sets) == 2, f"Expected 2 sets, got {len(sets)}"

for s in sets:
    set_id = s["id"]
    print(f"Checking {set_id}...")
    
    # Vocab
    vocab_qs = s["sections"]["vocabulary-kanji"]["questions"]
    assert len(vocab_qs) == 34, f"{set_id} Vocab question count mismatch: {len(vocab_qs)}"
    
    # Grammar
    grammar_qs = s["sections"]["grammar-reading"]["questions"]
    assert len(grammar_qs) == 25, f"{set_id} Grammar question count mismatch: {len(grammar_qs)}"
    
    ak_set = answer_keys["sets"][set_id]
    
    # Flatten ak vocab
    ak_vocab = []
    for m in ["mondai1", "mondai2", "mondai3", "mondai4", "mondai5"]:
        ak_vocab.extend(ak_set["vocabulary-kanji"][m])
        
    assert len(ak_vocab) == 34, f"AK vocab length is {len(ak_vocab)}"
    for idx, q in enumerate(vocab_qs):
        expected_ans = ak_vocab[idx] - 1
        assert q["correctIndex"] == expected_ans, f"{set_id} Vocab Q{q['id']} correctIndex mismatch: got {q['correctIndex']}, expected {expected_ans}"
        assert len(q["options"]) == 4, f"{set_id} Vocab Q{q['id']} option count != 4"
        assert q["questionText"], f"{set_id} Vocab Q{q['id']} empty questionText"
        
    # Flatten ak grammar
    ak_grammar = []
    for m in ["mondai1", "mondai2", "mondai3"]:
        ak_grammar.extend(ak_set["grammar"][m])
        
    assert len(ak_grammar) == 25, f"AK grammar length is {len(ak_grammar)}"
    for idx, q in enumerate(grammar_qs):
        expected_ans = ak_grammar[idx] - 1
        assert q["correctIndex"] == expected_ans, f"{set_id} Grammar Q{q['id']} correctIndex mismatch: got {q['correctIndex']}, expected {expected_ans}"
        assert len(q["options"]) == 4, f"{set_id} Grammar Q{q['id']} option count != 4"
        assert q["questionText"], f"{set_id} Grammar Q{q['id']} empty questionText"
        if q["id"] >= 21:
            assert "passage" in q and len(q["passage"]) > 20, f"{set_id} Grammar Q{q['id']} missing passage"

print("ALL CHECKS PASSED PERFECTLY! 100% accurate.")
