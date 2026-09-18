"""
03_build_page_index.py
N1 page index based on TOC from page 4-5 (もくじ).
PDF offset: book_page = pdf_idx - 2
File naming: page_{book_page:03d}.jpg
"""
import sys, json
sys.stdout.reconfigure(encoding='utf-8')

# NOTE: All values are BOOK PAGE numbers (as printed on each page)
# File to load: tmp_inspect/zenkamoku_n1/page_{book_page:03d}.jpg
page_index = {
    "pdf_offset": "book_page = pdf_idx - 2",
    "file_naming": "page_{book_page:03d}.jpg in tmp_inspect/zenkamoku_n1/",
    "weeks": {
        # 言語知識 (文字・語彙・文法) 編
        "week1": {
            "theme": "漢字読み・文脈規定",
            "themeEn": "Kanji Reading & Contextually-defined Expressions",
            "day1": 16, "day2": 18, "day3": 20, "day4": 22, "day5": 24
        },
        "week2": {
            "theme": "言い換え類義・用法",
            "themeEn": "Paraphrases & Usage",
            "day1": 26, "day2": 28, "day3": 30, "day4": 32, "day5": 34
        },
        "week3": {
            "theme": "文法形式の判断・文の組み立て",
            "themeEn": "Selecting Grammar Form & Sentence Construction",
            "day1": 36, "day2": 38, "day3": 40, "day4": 42, "day5": 44
        },
        "week4": {
            "theme": "文章の文法",
            "themeEn": "Grammar in Context (Text)",
            "day1": 46, "day2": 48, "day3": 50, "day4": 52, "day5": 54
        },
        # 読解編
        "week5": {
            "theme": "内容理解（短文）",
            "themeEn": "Reading Comprehension (Short)",
            "day1": 66, "day2": 70, "day3": 74, "day4": 78, "day5": 82
        },
        "week6": {
            "theme": "内容理解（中文）",
            "themeEn": "Reading Comprehension (Medium)",
            "day1": 86, "day2": 92, "day3": 98, "day4": 104, "day5": 110
        },
        "week7": {
            "theme": "内容理解（長文）・統合理解",
            "themeEn": "Reading Comprehension (Long) & Integrated",
            "day1": 116, "day2": 120, "day3": 124, "day4": 128, "day5": 132
        },
        "week8": {
            "theme": "主張理解（長文）・情報検索",
            "themeEn": "Understanding Main Argument (Long) & Information Search",
            "day1": 136, "day2": 140, "day3": 144, "day4": 148, "day5": 152
        },
        # 聴解編
        "week9": {
            "theme": "課題理解・ポイント理解",
            "themeEn": "Task Comprehension & Point Comprehension",
            "day1": 168, "day2": 170, "day3": 172, "day4": 174, "day5": 176
        },
        "week10": {
            "theme": "概要理解",
            "themeEn": "Overview Comprehension",
            "day1": 178, "day2": 179, "day3": 180, "day4": 181, "day5": 182
        },
        "week11": {
            "theme": "即時応答",
            "themeEn": "Immediate Response",
            "day1": 183, "day2": 184, "day3": 185, "day4": 186, "day5": 187
        },
        "week12": {
            "theme": "統合理解",
            "themeEn": "Integrated Comprehension",
            "day1": 188, "day2": 189, "day3": 190, "day4": 191, "day5": 192
        }
    },
    "answer_key": {
        "pages_bessatsu": "p2-p5"
    },
    "scripts": {
        "pages_bessatsu": "p6 onwards"
    },
    "vocab_sections": {
        "kotoba_wo_oboeyou_1": 13,
        "kotoba_wo_oboeyou_2": 14,
        "kotoba_wo_oboeyou_3": 56,
        "kotoba_wo_oboeyou_4": 156
    },
    "notes": {
        "book_title": "全科目攻略！JLPT日本語能力試験ベスト総合問題集N1",
        "book_id": "zenkamoku-n1-best-workbook",
        "toc_source": "Pages 4-5 (もくじ)",
        "authors": ["五十嵐香子", "佐藤茉奈花", "金澤美香子", "杉山舞", "植村有里沙"],
        "publisher": "The Japan Times Publishing",
        "isbn": "978-4-7890-1781-7"
    }
}

out_path = 'scripts/zenkamoku_n1/page_index.json'
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(page_index, f, ensure_ascii=False, indent=2)

print('page_index.json saved.')
print(json.dumps(page_index, ensure_ascii=False, indent=2))
