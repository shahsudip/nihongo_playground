import json

with open('src/data/chokuzen_n2/answer_keys_9_15.json', encoding='utf-8') as f:
    ak = json.load(f)

s12_ak = next(s for s in ak['sets'] if s['id'] == 'set-12')
s13_ak = next(s for s in ak['sets'] if s['id'] == 'set-13')

with open('src/data/chokuzen_n2/proofread_set_12.json', encoding='utf-8') as f:
    p12 = json.load(f)['sets'][0]['questions']
with open('src/data/chokuzen_n2/proofread_set_13.json', encoding='utf-8') as f:
    p13 = json.load(f)['sets'][0]['questions']

for i, (q, a) in enumerate(zip(p12, s12_ak['answers'])):
    assert q['correctOption'] == a, f"Mismatch set 12 q{i+1}: {q['correctOption']} vs {a}"

for i, (q, a) in enumerate(zip(p13, s13_ak['answers'])):
    assert q['correctOption'] == a, f"Mismatch set 13 q{i+1}: {q['correctOption']} vs {a}"

print("All 54 answers in Set 12 and 54 answers in Set 13 match answer keys perfectly!")
