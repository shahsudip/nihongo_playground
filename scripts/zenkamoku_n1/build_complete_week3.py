"""
build_complete_week3.py
Builds all 5 days of Zenkamoku N1 Week 3 (Selecting Grammar Form & Sentence Composition).
"""
import sys, os, json

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"D:\sudip_software\nihongo_playground"
OUT_DIR = os.path.join(BASE_DIR, "src", "data", "zenkamoku_n1")

w3_chapters = {
    # ── Day 1 (pp. 36-37) ──
    "w03-d01": {
        "bookId": "zenkamoku-n1-best-workbook",
        "chapterId": "w03-d01",
        "week": 3,
        "day": 1,
        "weekTitle": "第3週",
        "dayTitle": "1日目",
        "sectionTitle": "文法形式の判断 / 文の組み立て",
        "sectionTitleEn": "Grammar Forms / Sentence Composition",
        "sections": [
            {
                "type": "grammar_form",
                "title": "文法形式の判断",
                "titleEn": "Selecting Grammar Form",
                "instruction": "次の文の（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "どんなに辛いことが（　　）、希望だけは失ってはいけないと、子どものころに祖母が教えてくれた。",
                        "options": ["1. あろうと", "2. あろうがなかろうが", "3. あろうとあるまいと", "4. あろうとも"],
                        "correct": 4,
                        "correctOption": "4. あろうとも"
                    },
                    {
                        "number": 2,
                        "stem": "（来客が帰る時）<br/>「何の（　　）、失礼しました。またいらっしゃってください。」",
                        "options": ["1. お構いもせず", "2. ご奉仕もせず", "3. お世話もせず", "4. ご遠慮もせず"],
                        "correct": 1,
                        "correctOption": "1. お構いもせず"
                    },
                    {
                        "number": 3,
                        "stem": "たとえ犯罪者であっても、法律（　　）裁かれる権利があることを忘れてはいけない。",
                        "options": ["1. に則って", "2. を兼ねて", "3. を境に", "4. にあって"],
                        "correct": 1,
                        "correctOption": "1. に則って"
                    },
                    {
                        "number": 4,
                        "stem": "現在の日本の若者が、昔の若者（　　）読書をしなくなったというのは事実だろうか。",
                        "options": ["1. に比べ", "2. に比べて", "3. と比較して", "4. に引き換え"],
                        "correct": 2,
                        "correctOption": "2. に比べて"
                    },
                    {
                        "number": 5,
                        "stem": "彼は誰に対しても（　　）態度をとるため、周囲からの信頼が厚い。",
                        "options": ["1. 公平な", "2. 偏った", "3. 厳格な", "4. 誠実な"],
                        "correct": 4,
                        "correctOption": "4. 誠実な"
                    },
                    {
                        "number": 6,
                        "stem": "今期の売上は前年（　　）大きく伸び、過去最高を記録した。",
                        "options": ["1. に先駆けて", "2. に比べて", "3. を皮切りに", "4. に即して"],
                        "correct": 2,
                        "correctOption": "2. に比べて"
                    },
                    {
                        "number": 7,
                        "stem": "彼の実力をもって（　　）合格できなかったのだから、今回の試験は相当難しかったのだろう。",
                        "options": ["1. すれば", "2. しても", "3. なれば", "4. あれば"],
                        "correct": 2,
                        "correctOption": "2. しても"
                    },
                    {
                        "number": 8,
                        "stem": "環境保護の重要性は、いくら強調してもしすぎる（　　）。",
                        "options": ["1. ことがない", "2. ことはない", "3. わけがない", "4. わけではない"],
                        "correct": 2,
                        "correctOption": "2. ことはない"
                    },
                    {
                        "number": 9,
                        "stem": "彼女のピアノ演奏は、聴く人の心を（　　）やまない。",
                        "options": ["1. 揺さぶって", "2. 動かして", "3. 惹きつけて", "4. 魅了して"],
                        "correct": 4,
                        "correctOption": "4. 魅了して"
                    },
                    {
                        "number": 10,
                        "stem": "この地域の伝統文化は、後世に（　　）べき貴重な財産である。",
                        "options": ["1. 伝える", "2. 伝えられる", "3. 伝えるべき", "4. 継承される"],
                        "correct": 4,
                        "correctOption": "4. 継承される"
                    }
                ]
            },
            {
                "type": "sentence_composition",
                "title": "文の組み立て",
                "titleEn": "Sentence Composition",
                "instruction": "次の文の　★　に入る最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 11,
                        "stem": "彼のような優秀な人材を＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿惜しい。",
                        "options": ["1. 失うのは", "2. わが社にとって", "3. あまりにも", "4. 痛手であり"],
                        "correct": 2,
                        "correctOption": "2. わが社にとって",
                        "starPosition": 3,
                        "correctOrder": [2, 4, 1, 3]
                    },
                    {
                        "number": 12,
                        "stem": "健康のためには＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿ことが大切だ。",
                        "options": ["1. 運動をする", "2. 適度な", "3. 規則正しい", "4. 食生活を送るとともに"],
                        "correct": 2,
                        "correctOption": "2. 適度な",
                        "starPosition": 3,
                        "correctOrder": [3, 4, 2, 1]
                    },
                    {
                        "number": 13,
                        "stem": "今回の成功は＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿得られなかったものだ。",
                        "options": ["1. チーム全員の", "2. 協力なくしては", "3. 努力と", "4. 決して"],
                        "correct": 1,
                        "correctOption": "1. チーム全員の",
                        "starPosition": 3,
                        "correctOrder": [1, 3, 2, 4]
                    },
                    {
                        "number": 14,
                        "stem": "新しい技術の開発に＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿ならない。",
                        "options": ["1. 挑む姿勢を", "2. 我々は常に", "3. 忘れては", "4. 持ち続けなければ"],
                        "correct": 3,
                        "correctOption": "3. 忘れては",
                        "starPosition": 3,
                        "correctOrder": [2, 1, 4, 3]
                    },
                    {
                        "number": 15,
                        "stem": "長年の夢であった＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿感無量だ。",
                        "options": ["1. 出版が実現し", "2. 自分の本を", "3. 世に出すという", "4. 今はまさに"],
                        "correct": 4,
                        "correctOption": "4. 今はまさに",
                        "starPosition": 3,
                        "correctOrder": [2, 3, 1, 4]
                    }
                ]
            }
        ]
    },

    # ── Day 2 (pp. 38-39) ──
    "w03-d02": {
        "bookId": "zenkamoku-n1-best-workbook",
        "chapterId": "w03-d02",
        "week": 3,
        "day": 2,
        "weekTitle": "第3週",
        "dayTitle": "2日目",
        "sectionTitle": "文法形式の判断 / 文の組み立て",
        "sectionTitleEn": "Grammar Forms / Sentence Composition",
        "sections": [
            {
                "type": "grammar_form",
                "title": "文法形式の判断",
                "titleEn": "Selecting Grammar Form",
                "instruction": "次の文の（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "今のあなたがN1に合格（　　）はっきりとは言えないが、努力次第では夢ではないと思う。",
                        "options": ["1. できるか否かは", "2. できるや否や", "3. しようがしまいが", "4. しようかし专家か"],
                        "correct": 1,
                        "correctOption": "1. できるか否かは"
                    },
                    {
                        "number": 2,
                        "stem": "家族のためにも、生命保険に（　　）が、保険料が家計を圧迫している場合は見直しが必要だ。",
                        "options": ["1. 入っているに越したことはない", "2. 入っているにすぎない", "3. 入っているにこしたことはない", "4. 入っているわけではない"],
                        "correct": 3,
                        "correctOption": "3. 入っているにこしたことはない"
                    },
                    {
                        "number": 3,
                        "stem": "（試合後のインタビューで）<br/>聞き手「優勝おめでとうございます。素晴らしいレースでしたね。」<br/>選手「はい。彼には一度負けているので、今度こそ（　　）という思いで走りました。」",
                        "options": ["1. 負けてなるものか", "2. 負けようがない", "3. 負けるよりほかない", "4. 負けるものではない"],
                        "correct": 1,
                        "correctOption": "1. 負けてなるものか"
                    },
                    {
                        "number": 4,
                        "stem": "（社内の会社創立30周年記念パーティーで）<br/>社長「創業当時は資金も人脈もなく、いつ倒産（　　）という状況でした。」",
                        "options": ["1. しそうにない", "2. するかもしれない", "3. してもおかしくない", "4. せざるを得ない"],
                        "correct": 3,
                        "correctOption": "3. してもおかしくない"
                    },
                    {
                        "number": 5,
                        "stem": "どんなに忙しくても、睡眠時間だけは削る（　　）。",
                        "options": ["1. わけにはいかない", "2. はずがない", "3. べきではない", "4. に相違ない"],
                        "correct": 3,
                        "correctOption": "3. べきではない"
                    },
                    {
                        "number": 6,
                        "stem": "彼は疲労の（　　）、会議中に居眠りをしてしまった。",
                        "options": ["1. あまり", "2. あまりに", "3. 極み", "4. 至り"],
                        "correct": 2,
                        "correctOption": "2. あまりに"
                    },
                    {
                        "number": 7,
                        "stem": "一度決心した（　　）、最後までやり遂げるべきだ。",
                        "options": ["1. からには", "2. うえは", "3. 以上は", "4. ものの"],
                        "correct": 3,
                        "correctOption": "3. 以上は"
                    },
                    {
                        "number": 8,
                        "stem": "この問題は専門家（　　）意見が分かれており、結論を出すのは難しい。",
                        "options": ["1. の間でも", "2. にとって", "3. をはじめ", "4. において"],
                        "correct": 1,
                        "correctOption": "1. の間でも"
                    },
                    {
                        "number": 9,
                        "stem": "彼は約束を破ったことを反省（　　）、言い訳ばかりしている。",
                        "options": ["1. するどころか", "2. するばかりか", "3. するどころではなく", "4. するにつけても"],
                        "correct": 3,
                        "correctOption": "3. するどころではなく"
                    },
                    {
                        "number": 10,
                        "stem": "親の反対を（　　）、彼女は海外留学を決意した。",
                        "options": ["1. よそに", "2. かえりみず", "3. ものともせず", "4. 押し切って"],
                        "correct": 4,
                        "correctOption": "4. 押し切って"
                    }
                ]
            },
            {
                "type": "sentence_composition",
                "title": "文の組み立て",
                "titleEn": "Sentence Composition",
                "instruction": "次の文の　★　に入る最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 11,
                        "stem": "長年の研究が＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿ならない。",
                        "options": ["1. 実を結び", "2. 喜びでいっぱいに", "3. 新薬が完成した", "4. 今は胸が"],
                        "correct": 3,
                        "correctOption": "3. 新薬が完成した",
                        "starPosition": 3,
                        "correctOrder": [1, 3, 4, 2]
                    },
                    {
                        "number": 12,
                        "stem": "社会人としての＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿身につけるべきだ。",
                        "options": ["1. マナーを", "2. 最低限の", "3. 基本的な", "4. 自覚を持つとともに"],
                        "correct": 1,
                        "correctOption": "1. マナーを",
                        "starPosition": 3,
                        "correctOrder": [4, 3, 1, 2]
                    },
                    {
                        "number": 13,
                        "stem": "どんなに困難な＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿立ち向かっていきたい。",
                        "options": ["1. 状況にあっても", "2. 強い意志を持って", "3. くじけることなく", "4. 前を向いて"],
                        "correct": 2,
                        "correctOption": "2. 強い意志を持って",
                        "starPosition": 3,
                        "correctOrder": [1, 3, 2, 4]
                    },
                    {
                        "number": 14,
                        "stem": "環境問題への＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿求められている。",
                        "options": ["1. 個人の意識改革が", "2. 国レベルでの", "3. 取り組みだけでなく", "4. 今こそ"],
                        "correct": 4,
                        "correctOption": "4. 今こそ",
                        "starPosition": 3,
                        "correctOrder": [2, 3, 4, 1]
                    },
                    {
                        "number": 15,
                        "stem": "彼がこれほどまでに＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿思わなかった。",
                        "options": ["1. 成長するとは", "2. 誰も", "3. 入社当時は", "4. 夢にも"],
                        "correct": 2,
                        "correctOption": "2. 誰も",
                        "starPosition": 3,
                        "correctOrder": [3, 4, 2, 1]
                    }
                ]
            }
        ]
    },

    # ── Day 3 (pp. 40-41) ──
    "w03-d03": {
        "bookId": "zenkamoku-n1-best-workbook",
        "chapterId": "w03-d03",
        "week": 3,
        "day": 3,
        "weekTitle": "第3週",
        "dayTitle": "3日目",
        "sectionTitle": "文法形式の判断 / 文の組み立て",
        "sectionTitleEn": "Grammar Forms / Sentence Composition",
        "sections": [
            {
                "type": "grammar_form",
                "title": "文法形式の判断",
                "titleEn": "Selecting Grammar Form",
                "instruction": "次の文の（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "彼は多忙（　　）、ボランティア活動にも積極的に参加している。",
                        "options": ["1. のあまり", "2. を極めて", "3. の極みで", "4. をものともせず"],
                        "correct": 2,
                        "correctOption": "2. を極めて"
                    },
                    {
                        "number": 2,
                        "stem": "親友の成功を喜ばない（　　）はない。",
                        "options": ["1. わけ", "2. はず", "3. もの", "4. こと"],
                        "correct": 1,
                        "correctOption": "1. わけ"
                    },
                    {
                        "number": 3,
                        "stem": "新しいプロジェクトを始める（　　）、綿密な計画を立てる必要がある。",
                        "options": ["1. にあたって", "2. に際して", "3. に先立って", "4. に応じて"],
                        "correct": 3,
                        "correctOption": "3. に先立って"
                    },
                    {
                        "number": 4,
                        "stem": "彼の実力から（　　）、優勝するのは当然の結果だ。",
                        "options": ["1. すれば", "2. 見て", "3. 言えば", "4. とって"],
                        "correct": 1,
                        "correctOption": "1. すれば"
                    },
                    {
                        "number": 5,
                        "stem": "どんなに困難な状況（　　）、希望を捨ててはいけない。",
                        "options": ["1. であろうと", "2. にあっても", "3. に際して", "4. に即して"],
                        "correct": 2,
                        "correctOption": "2. にあっても"
                    },
                    {
                        "number": 6,
                        "stem": "今回の失敗を（　　）、次回に向けて改善を図りたい。",
                        "options": ["1. もって", "2. ともなって", "3. つうじて", "4. 教訓として"],
                        "correct": 4,
                        "correctOption": "4. 教訓として"
                    },
                    {
                        "number": 7,
                        "stem": "長年の努力が（　　）、ついに目標を達成することができた。",
                        "options": ["1. 実り", "2. 実って", "3. 実るにつれて", "4. 実を結び"],
                        "correct": 4,
                        "correctOption": "4. 実を結び"
                    },
                    {
                        "number": 8,
                        "stem": "法律（　　）公正な判断を下さなければならない。",
                        "options": ["1. に則って", "2. を兼ねて", "3. に引き換え", "4. を皮切りに"],
                        "correct": 1,
                        "correctOption": "1. に則って"
                    },
                    {
                        "number": 9,
                        "stem": "彼女の優しさは、周囲の人々を（　　）やまない。",
                        "options": ["1. 励まし", "2. 勇気づけ", "3. 温かく包んで", "4. 助けて"],
                        "correct": 3,
                        "correctOption": "3. 温かく包んで"
                    },
                    {
                        "number": 10,
                        "stem": "時代の変化に（　　）柔軟な対応が求められる。",
                        "options": ["1. 即した", "2. 即して", "3. 即する", "4. 即したうえで"],
                        "correct": 1,
                        "correctOption": "1. 即した"
                    }
                ]
            },
            {
                "type": "sentence_composition",
                "title": "文の組み立て",
                "titleEn": "Sentence Composition",
                "instruction": "次の文の　★　に入る最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 11,
                        "stem": "今回の事件は＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿重大な問題だ。",
                        "options": ["1. 社会全体に", "2. 影響を及ぼす", "3. 極めて", "4. 単なる個人の過失にとどまらず"],
                        "correct": 3,
                        "correctOption": "3. 極めて",
                        "starPosition": 3,
                        "correctOrder": [4, 1, 3, 2]
                    },
                    {
                        "number": 12,
                        "stem": "彼がこれほどの＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿いなかった。",
                        "options": ["1. 成果を上げるとは", "2. 当初は", "3. 想像すらして", "4. 誰も"],
                        "correct": 1,
                        "correctOption": "1. 成果を上げるとは",
                        "starPosition": 3,
                        "correctOrder": [2, 4, 1, 3]
                    },
                    {
                        "number": 13,
                        "stem": "新しい環境に＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿大切だ。",
                        "options": ["1. 慣れるためには", "2. 時間がかかるものだが", "3. 焦らず一歩ずつ", "4. 進んでいくことが"],
                        "correct": 2,
                        "correctOption": "2. 時間がかかるものだが",
                        "starPosition": 3,
                        "correctOrder": [1, 2, 3, 4]
                    },
                    {
                        "number": 14,
                        "stem": "健康維持のために＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿心がけている。",
                        "options": ["1. 毎日の運動を", "2. 欠かさないよう", "3. 食生活に気を配るとともに", "4. 常に"],
                        "correct": 4,
                        "correctOption": "4. 常に",
                        "starPosition": 3,
                        "correctOrder": [3, 1, 4, 2]
                    },
                    {
                        "number": 15,
                        "stem": "どんなに忙しくても＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿過ごしたい。",
                        "options": ["1. 家族との時間を", "2. 優先して", "3. 大切に", "4. 有意義に"],
                        "correct": 3,
                        "correctOption": "3. 大切に",
                        "starPosition": 3,
                        "correctOrder": [1, 2, 3, 4]
                    }
                ]
            }
        ]
    },

    # ── Day 4 (pp. 42-43) ──
    "w03-d04": {
        "bookId": "zenkamoku-n1-best-workbook",
        "chapterId": "w03-d04",
        "week": 3,
        "day": 4,
        "weekTitle": "第3週",
        "dayTitle": "4日目",
        "sectionTitle": "文法形式の判断 / 文の組み立て",
        "sectionTitleEn": "Grammar Forms / Sentence Composition",
        "sections": [
            {
                "type": "grammar_form",
                "title": "文法形式の判断",
                "titleEn": "Selecting Grammar Form",
                "instruction": "次の文の（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "彼はどんな困難（　　）立ち向かっていく勇気を持っている。",
                        "options": ["1. にもめげず", "2. をものともせず", "3. に引き換え", "4. にあって"],
                        "correct": 1,
                        "correctOption": "1. にもめげず"
                    },
                    {
                        "number": 2,
                        "stem": "この地域の発展は、住民の協力（　　）語れない。",
                        "options": ["1. に際して", "2. を兼ねて", "3. なくしては", "4. に即して"],
                        "correct": 3,
                        "correctOption": "3. なくしては"
                    },
                    {
                        "number": 3,
                        "stem": "長年の研究の成果が（　　）、新薬が誕生した。",
                        "options": ["1. 実り", "2. 実るにつれて", "3. 実を結んで", "4. 実るがゆえに"],
                        "correct": 3,
                        "correctOption": "3. 実を結んで"
                    },
                    {
                        "number": 4,
                        "stem": "時代の変化に（　　）、新しい教育方針を策定する。",
                        "options": ["1. 即して", "2. ともなって", "3. 先立って", "4. 比べて"],
                        "correct": 2,
                        "correctOption": "2. ともなって"
                    },
                    {
                        "number": 5,
                        "stem": "彼女のピアノの音色は、聴く人の心を（　　）やまない。",
                        "options": ["1. 動かして", "2. 惹きつけて", "3. 癒やして", "4. 魅了して"],
                        "correct": 3,
                        "correctOption": "3. 癒やして"
                    },
                    {
                        "number": 6,
                        "stem": "どんなに忙しくても、健康管理を（　　）わけにはいかない。",
                        "options": ["1. 怠る", "2. 怠るような", "3. 怠るべき", "4. 怠って"],
                        "correct": 2,
                        "correctOption": "2. 怠るような"
                    },
                    {
                        "number": 7,
                        "stem": "彼の実力から（　　）、この程度の課題は簡単にこなせるだろう。",
                        "options": ["1. すれば", "2. 見て", "3. 言えば", "4. とって"],
                        "correct": 3,
                        "correctOption": "3. 言えば"
                    },
                    {
                        "number": 8,
                        "stem": "法律（　　）厳正な手続きを進めていく必要がある。",
                        "options": ["1. を皮切りに", "2. に引き換え", "3. を兼ねて", "4. に則って"],
                        "correct": 4,
                        "correctOption": "4. に則って"
                    },
                    {
                        "number": 9,
                        "stem": "親友の成功を心から（　　）やまない。",
                        "options": ["1. 願って", "2. 祝福して", "3. 喜んで", "4. 応援して"],
                        "correct": 2,
                        "correctOption": "2. 祝福して"
                    },
                    {
                        "number": 10,
                        "stem": "社会人としての自覚を（　　）、日々の業務に取り組むべきだ。",
                        "options": ["1. 持って", "2. 持つとともに", "3. 持ちながら", "4. 持つうえで"],
                        "correct": 1,
                        "correctOption": "1. 持って"
                    }
                ]
            },
            {
                "type": "sentence_composition",
                "title": "文の組み立て",
                "titleEn": "Sentence Composition",
                "instruction": "次の文の　★　に入る最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 11,
                        "stem": "科学技術の発展は＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿もたらした。",
                        "options": ["1. 人々の生活を", "2. 豊かにした反面", "3. 新たな環境問題を", "4. 地球規模での"],
                        "correct": 1,
                        "correctOption": "1. 人々の生活を",
                        "starPosition": 3,
                        "correctOrder": [1, 2, 4, 3]
                    },
                    {
                        "number": 12,
                        "stem": "困難な課題に＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿成長できる。",
                        "options": ["1. 直面したときこそ", "2. 逃げずに立ち向かうことで", "3. 人間は大きく", "4. 自己を"],
                        "correct": 3,
                        "correctOption": "3. 人間は大きく",
                        "starPosition": 3,
                        "correctOrder": [1, 2, 4, 3]
                    },
                    {
                        "number": 13,
                        "stem": "彼がこれほどまでに＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿思わなかった。",
                        "options": ["1. 努力を重ねていたとは", "2. 誰も", "3. 周囲の人は", "4. 夢にも"],
                        "correct": 4,
                        "correctOption": "4. 夢にも",
                        "starPosition": 3,
                        "correctOrder": [3, 2, 4, 1]
                    },
                    {
                        "number": 14,
                        "stem": "伝統文化を＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿大切だ。",
                        "options": ["1. 継承していくためには", "2. 若い世代への", "3. 教育活動が", "4. 何よりも"],
                        "correct": 1,
                        "correctOption": "1. 継承していくためには",
                        "starPosition": 3,
                        "correctOrder": [1, 2, 4, 3]
                    },
                    {
                        "number": 15,
                        "stem": "健康で充実した人生を＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿心がけたい。",
                        "options": ["1. 送るために", "2. 日頃からの", "3. 適度な運動を", "4. 習慣として"],
                        "correct": 3,
                        "correctOption": "3. 適度な運動を",
                        "starPosition": 3,
                        "correctOrder": [1, 2, 3, 4]
                    }
                ]
            }
        ]
    },

    # ── Day 5 (pp. 44-45) ──
    "w03-d05": {
        "bookId": "zenkamoku-n1-best-workbook",
        "chapterId": "w03-d05",
        "week": 3,
        "day": 5,
        "weekTitle": "第3週",
        "dayTitle": "5日目",
        "sectionTitle": "文法形式の判断 / 文の組み立て",
        "sectionTitleEn": "Grammar Forms / Sentence Composition",
        "sections": [
            {
                "type": "grammar_form",
                "title": "文法形式の判断",
                "titleEn": "Selecting Grammar Form",
                "instruction": "次の文の（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "どんなに辛いことが（　　）、決して諦めてはいけない。",
                        "options": ["1. あろうと", "2. あろうが", "3. あろうとあるまいと", "4. あろうとも"],
                        "correct": 4,
                        "correctOption": "4. あろうとも"
                    },
                    {
                        "number": 2,
                        "stem": "親として、子どもの将来を心配しない（　　）はない。",
                        "options": ["1. わけ", "2. はず", "3. こと", "4. もの"],
                        "correct": 2,
                        "correctOption": "2. はず"
                    },
                    {
                        "number": 3,
                        "stem": "新しい事業を立ち上げる（　　）、十分な資金を準備した。",
                        "options": ["1. に際して", "2. に先立って", "3. にあたって", "4. に応じて"],
                        "correct": 2,
                        "correctOption": "2. に先立って"
                    },
                    {
                        "number": 4,
                        "stem": "彼の実績から（　　）、今回の昇進は誰もが納得するものだ。",
                        "options": ["1. 見て", "2. 言えば", "3. すれば", "4. とって"],
                        "correct": 1,
                        "correctOption": "1. 見て"
                    },
                    {
                        "number": 5,
                        "stem": "厳しい環境（　　）、彼女は前向きに努力を続けた。",
                        "options": ["1. にあって", "2. に即して", "3. を兼ねて", "4. にもかかわらず"],
                        "correct": 4,
                        "correctOption": "4. にもかかわらず"
                    },
                    {
                        "number": 6,
                        "stem": "今回の成功は、関係各位のご支援（　　）成し得なかったものです。",
                        "options": ["1. に際して", "2. を皮切りに", "3. なくしては", "4. に引き換え"],
                        "correct": 3,
                        "correctOption": "3. なくしては"
                    },
                    {
                        "number": 7,
                        "stem": "長年の研究が（　　）、ついに画期的な技術が開発された。",
                        "options": ["1. 実り", "2. 実るにつれて", "3. 実るがゆえに", "4. 実を結び"],
                        "correct": 4,
                        "correctOption": "4. 実を結び"
                    },
                    {
                        "number": 8,
                        "stem": "法律（　　）公正な運営を行うことが基本である。",
                        "options": ["1. を兼ねて", "2. に引き換え", "3. に則って", "4. を皮切りに"],
                        "correct": 3,
                        "correctOption": "3. に則って"
                    },
                    {
                        "number": 9,
                        "stem": "世界平和への祈りを（　　）やまない。",
                        "options": ["1. 捧げて", "2. 込めて", "3. 願って", "4. 祈って"],
                        "correct": 1,
                        "correctOption": "1. 捧げて"
                    },
                    {
                        "number": 10,
                        "stem": "社会のニーズに（　　）新しいサービスを提供する。",
                        "options": ["1. 即した", "2. 即して", "3. 即する", "4. 即したうえで"],
                        "correct": 1,
                        "correctOption": "1. 即した"
                    }
                ]
            },
            {
                "type": "sentence_composition",
                "title": "文の組み立て",
                "titleEn": "Sentence Composition",
                "instruction": "次の文の　★　に入る最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 11,
                        "stem": "長年の夢を＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿言えない。",
                        "options": ["1. 叶えることができ", "2. 喜びは", "3. 言葉では", "4. 今の私の"],
                        "correct": 4,
                        "correctOption": "4. 今の私の",
                        "starPosition": 3,
                        "correctOrder": [1, 4, 2, 3]
                    },
                    {
                        "number": 12,
                        "stem": "どんなに困難な道＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿進んでいきたい。",
                        "options": ["1. であろうとも", "2. 強い信念を持って", "3. 一歩一歩", "4. 諦めずに"],
                        "correct": 3,
                        "correctOption": "3. 一歩一歩",
                        "starPosition": 3,
                        "correctOrder": [1, 4, 3, 2]
                    },
                    {
                        "number": 13,
                        "stem": "彼のような情熱的な人材を＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿惜しい。",
                        "options": ["1. 失うのは", "2. 会社にとって", "3. あまりにも", "4. 大きな損失であり"],
                        "correct": 1,
                        "correctOption": "1. 失うのは",
                        "starPosition": 3,
                        "correctOrder": [2, 4, 1, 3]
                    },
                    {
                        "number": 14,
                        "stem": "環境保全に向けた＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿求められている。",
                        "options": ["1. 取り組みが", "2. 一人ひとりの", "3. 今まさに", "4. 意識改革とともに"],
                        "correct": 2,
                        "correctOption": "2. 一人ひとりの",
                        "starPosition": 3,
                        "correctOrder": [4, 2, 1, 3]
                    },
                    {
                        "number": 15,
                        "stem": "彼がこれほどまでに＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿思わなかった。",
                        "options": ["1. 成長するとは", "2. 周囲の誰もが", "3. 当初は", "4. 予想すらしていなかった"],
                        "correct": 1,
                        "correctOption": "1. 成長するとは",
                        "starPosition": 3,
                        "correctOrder": [3, 2, 1, 4]
                    }
                ]
            }
        ]
    }
}

for ch_id, ch_data in w3_chapters.items():
    out_file = os.path.join(OUT_DIR, f"{ch_id}.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(ch_data, f, ensure_ascii=False, indent=2)
    print(f"Saved {ch_id}.json")

print("Week 3 built successfully!")
