import sys, json
sys.stdout.reconfigure(encoding='utf-8')

# Page index based on TOC from page 5 (もくじ)
# Values are 1-indexed book page numbers
page_index = {
    "weeks": {
        "week1": {
            "day1": 16, "day2": 18, "day3": 20, "day4": 22, "day5": 24
        },
        "week2": {
            "day1": 26, "day2": 28, "day3": 30, "day4": 32, "day5": 34
        },
        "week3": {
            "day1": 36, "day2": 38, "day3": 40, "day4": 42, "day5": 44
        },
        "week4": {
            "day1": 46, "day2": 50, "day3": 54, "day4": 58, "day5": 62
        },
        "week5": {
            "day1": 74, "day2": 78, "day3": 82, "day4": 86, "day5": 90
        },
        "week6": {
            "day1": 94, "day2": 98, "day3": 102, "day4": 106, "day5": 110
        },
        "week7": {
            "day1": 114, "day2": 116, "day3": 118, "day4": 120, "day5": 122
        },
        "week8": {
            "day1": 124, "day2": 126, "day3": 128, "day4": 130, "day5": 132
        },
        "week9": {
            "day1": 146, "day2": 148, "day3": 150, "day4": 152, "day5": 154
        },
        "week10": {
            "day1": 156, "day2": 157, "day3": 158, "day4": 159, "day5": 160
        },
        "week11": {
            "day1": 162, "day2": 164, "day3": 166, "day4": 168, "day5": 170
        },
        "week12": {
            "day1": 172, "day2": 173, "day3": 174, "day4": 175, "day5": 176
        }
    },
    "answer_key": {
        "pages_book": "179-183",
        "pages_bessatsu": "p2-p6"
    },
    "scripts": {
        "pages_book": "183-213",
        "pages_bessatsu": "p6-p36"
    },
    "notes": {
        "pdf_path": "D:/sudip_software/[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi/latest books/全科目攻略JLPT日本語能力試験ベスト総合問題集N3 (五十嵐香子, 金澤美香子, 杉山舞) (z-library.sk, 1lib.sk, z-lib.sk).pdf",
        "toc_source": "Page 5 (もくじ)",
        "page_numbering": "1-indexed book page numbers"
    }
}

out_path = 'scripts/zenkamoku_n3/page_index.json'
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(page_index, f, ensure_ascii=False, indent=2)

print('page_index.json saved.')
print(json.dumps(page_index, ensure_ascii=False, indent=2))
