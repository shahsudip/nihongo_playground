import sys
from test_parse_all import parsed_data

sys.stdout.reconfigure(encoding='utf-8')

sample_keys = [
    (1, 1, 'kanji_reading', 1),
    (1, 1, 'kanji_reading', 4),
    (1, 1, 'orthography', 1),
    (1, 1, 'orthography', 5),
    (1, 2, 'kanji_reading', 1),
    (2, 1, 'contextually_defined_expressions', 1),
    (2, 1, 'contextually_defined_expressions', 6),
    (2, 1, 'paraphrases', 1),
    (2, 3, 'contextually_defined_expressions', 4),
    (2, 5, 'paraphrases', 5)
]

for k in sample_keys:
    lines = parsed_data.get(k, [])
    print(f"\n=== Question {k} ===")
    for l in lines:
        print(f"  {l}")
