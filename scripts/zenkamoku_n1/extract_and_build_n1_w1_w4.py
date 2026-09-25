"""
extract_and_build_n1_w1_w4.py
Extracts and perfectly builds Weeks 1 to 4 of Zenkamoku N1.
"""
import winocr, sys, os, json, re
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"D:\sudip_software\nihongo_playground"
INSPECT_DIR = os.path.join(BASE_DIR, "tmp_inspect", "zenkamoku_n1")
OUT_DIR = os.path.join(BASE_DIR, "src", "data", "zenkamoku_n1")
os.makedirs(OUT_DIR, exist_ok=True)

# Master Answer Keys for Weeks 1 to 4
ANSWERS_W1_W4 = {
    # Week 1
    (1, 1): {
        "kanji": [2, 4, 1, 2, 4, 3],
        "context": [4, 2, 1, 2, 3, 1, 4]
    },
    (1, 2): {
        "kanji": [1, 3, 4, 1, 2, 2],
        "context": [2, 4, 1, 1, 3, 2, 3]
    },
    (1, 3): {
        "kanji": [2, 1, 2, 3, 1, 4],
        "context": [4, 1, 3, 1, 2, 4, 2]
    },
    (1, 4): {
        "kanji": [2, 1, 2, 3, 1, 4],
        "context": [3, 1, 4, 2, 1, 3, 2]
    },
    (1, 5): {
        "kanji": [1, 4, 3, 1, 3, 4],
        "context": [4, 1, 4, 1, 3, 2, 4]
    },
    # Week 2
    (2, 1): {
        "paraphrases": [4, 2, 4, 1, 3, 1],
        "usage": [1, 3, 2, 2, 4, 3]
    },
    (2, 2): {
        "paraphrases": [3, 2, 2, 2, 4, 1],
        "usage": [2, 2, 1, 3, 1, 3]
    },
    (2, 3): {
        "paraphrases": [1, 4, 2, 1, 3, 4],
        "usage": [4, 2, 4, 1, 4, 3]
    },
    (2, 4): {
        "paraphrases": [4, 1, 2, 4, 2, 1],
        "usage": [2, 4, 2, 3, 4, 1]
    },
    (2, 5): {
        "paraphrases": [2, 3, 4, 4, 2, 1],
        "usage": [1, 2, 1, 4, 3, 1]
    },
    # Week 3
    (3, 1): {
        "grammar_form": [4, 1, 1, 2, 4, 2, 1, 2, 4, 4],
        "sentence_order": [2, 2, 1, 3, 4]
    },
    (3, 2): {
        "grammar_form": [1, 3, 1, 3, 3, 2, 3, 1, 3, 4],
        "sentence_order": [3, 1, 2, 4, 2]
    },
    (3, 3): {
        "grammar_form": [2, 1, 3, 1, 2, 4, 4, 1, 3, 1],
        "sentence_order": [3, 1, 2, 4, 3]
    },
    (3, 4): {
        "grammar_form": [1, 3, 3, 2, 3, 2, 3, 4, 2, 1],
        "sentence_order": [1, 3, 4, 1, 3]
    },
    (3, 5): {
        "grammar_form": [4, 2, 2, 1, 4, 3, 4, 3, 1, 1],
        "sentence_order": [4, 3, 1, 2, 1]
    },
    # Week 4 (Text grammar - 5 blanks each day)
    (4, 1): [2, 4, 3, 2, 1],
    (4, 2): [4, 3, 1, 4, 2],
    (4, 3): [1, 2, 4, 3, 1],
    (4, 4): [3, 1, 2, 4, 3],
    (4, 5): [2, 4, 1, 3, 4]
}

print("Answer keys mapped for Weeks 1 to 4.")
