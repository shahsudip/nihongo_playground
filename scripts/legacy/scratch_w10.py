import json
import os

base_dir = r"D:\sudip_software\nihongo_playground\src\data\zenkamoku_n1"
os.makedirs(base_dir, exist_ok=True)

instruction = "<ruby>問題用紙<rt>もんだいようし</rt></ruby>に<ruby>何<rt>なに</rt></ruby>も<ruby>印刷<rt>いんさつ</rt></ruby>されていません。この<ruby>問題<rt>もんだい</rt></ruby>は、<ruby>全体<rt>ぜんたい</rt></ruby>としてどんな<ruby>内容<rt>ないよう</rt></ruby>かを<ruby>聞<rt>き</rt></ruby>く<ruby>問題<rt>もんだい</rt></ruby>です。<ruby>話<rt>はなし</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>に<ruby>質問<rt>しつもん</rt></ruby>はありません。まず<ruby>話<rt>はなし</rt></ruby>を<ruby>聞<rt>き</rt></ruby>いてください。それから、<ruby>質問<rt>しつもん</rt></ruby>と<ruby>選択肢<rt>せんたくし</rt></ruby>を<ruby>聞<rt>き</rt></ruby>いて、1から4の<ruby>中<rt>なか</rt></ruby>から、<ruby>最<rt>もっ</rt></ruby>もよいものを<ruby>一<rt>ひと</rt></ruby>つ<ruby>選<rt>えら</rt></ruby>んでください。"

for day in range(1, 6):
    questions = []
    for q in range(1, 7):
        questions.append({
            "number": q,
            "stem": "音声を聞いて答えてください。",
            "options": ["1", "2", "3", "4"],
            "correct": 1,
            "correctOption": "1"
        })
    
    data = {
        "bookId": "zenkamoku-n1-best-workbook",
        "chapterId": f"w10-d0{day}",
        "week": 10,
        "day": day,
        "weekTitle": "第10週",
        "dayTitle": f"{day}日目",
        "sectionTitle": "概要理解",
        "sectionTitleEn": "Overview Comprehension",
        "sections": [
            {
                "type": "overview_comprehension",
                "title": "概要理解",
                "titleEn": "Summary comprehension",
                "instruction": instruction,
                "questions": questions
            }
        ]
    }
    
    filepath = os.path.join(base_dir, f"w10-d0{day}.json")
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Files generated successfully.")
