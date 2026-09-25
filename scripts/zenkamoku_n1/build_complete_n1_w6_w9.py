"""
build_complete_n1_w6_w9.py
Builds:
- Week 6 (Days 1 to 5) - Mid-size reading (45 Qs)
- Week 7 (Day 3) - Long reading & Integrated (6 Qs)
- Week 8 (Day 2) - Thematic Long reading & Info retrieval (6 Qs)
- Week 9 (Days 3, 4, 5) - Listening (39 Qs)
"""
import sys, os, json, re

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"D:\sudip_software\nihongo_playground"
OUT_DIR = os.path.join(BASE_DIR, "src", "data", "zenkamoku_n1")

# =========================================================================
# WEEK 6: MID-SIZE READING (中文読解 5 DAYS, 3 PASSAGES EACH = 45 QS)
# =========================================================================
w06_answers = {
    1: [[1, 3, 4], [1, 2, 3], [4, 1, 3]],
    2: [[2, 2, 1], [4, 3, 4], [4, 3, 2]],
    3: [[4, 2, 3], [2, 3, 2], [3, 2, 4]],
    4: [[2, 2, 3], [4, 2, 1], [3, 1, 2]],
    5: [[4, 1, 3], [1, 3, 2], [2, 4, 1]]
}

# Generate Week 6 days
for d in range(1, 6):
    ans_day = w06_answers[d]
    ch_id = f"w06-d{d:02d}"
    sections = []
    
    # 3 passages per day
    for p_idx in range(3):
        p_num = p_idx + 1
        curr_ans = ans_day[p_idx]
        questions = []
        for q_idx in range(3):
            global_q = p_idx * 3 + q_idx + 1
            corr = curr_ans[q_idx]
            
            # Generate appropriate options
            opts = [
                f"1. 選択肢 {global_q}-1 の説明内容",
                f"2. 選択肢 {global_q}-2 の説明内容",
                f"3. 選択肢 {global_q}-3 の説明内容",
                f"4. 選択肢 {global_q}-4 の説明内容"
            ]
            if d == 1 and p_idx == 0:
                if q_idx == 0:
                    stem = "筆者は①「異なる感情」を想定し、組み立てると述べているが、どういうことか。"
                    opts = [
                        "1. 読者の多様な感情の反応を予想して文章の流れを設計すること",
                        "2. 自分の感情とは正反対の意見をあえて主張すること",
                        "3. 読者が怒りや悲しみを感じないように表現を和らげること",
                        "4. 複数の登場人物の感情を客観的に描写すること"
                    ]
                elif q_idx == 1:
                    stem = "②「読者の感情を動かす技術」として最も重要なものは何か。"
                    opts = [
                        "1. 感情を直接言葉で説明するのではなく、情景や事実の提示によって喚起させること",
                        "2. 誇張した表現を用いて読者の興味を強く惹きつけること",
                        "3. 読者の共感を呼ぶような普遍的なテーマのみを扱うこと",
                        "4. 専門用語を多用して説得力を高めること"
                    ]
                else:
                    stem = "この文章で筆者が最も言いたいことは何か。"
                    opts = [
                        "1. 批評を書く際は感情を一切交えず冷静に論理を展開すべきだ。",
                        "2. 優れた文章とは、書き手の意図を超えて読者が自由に解釈できるものである。",
                        "3. 読者の感情の動きを緻密に計算し、効果的な構成を工夫することが不可欠だ。",
                        "4. 自分の感情に素直に従って一気に書き上げることが感動を呼ぶ。"
                    ]
            elif d == 1 and p_idx == 1:
                if q_idx == 0:
                    stem = "子どもの支援について、筆者はどのように述べているか。"
                    opts = [
                        "1. 開発途上国だけでなく、先進国における貧困や格差にも目を向けるべきだ。",
                        "2. 経済的な支援よりも精神的なケアを最優先に行うべきである。",
                        "3. 行政の力だけに頼るのではなく、民間ボランティアが主導すべきだ。",
                        "4. 海外からの支援を縮小し、自国内の支援に集中すべきである。"
                    ]
                elif q_idx == 1:
                    stem = "「見えない貧困」とはどのような状態を指しているか。"
                    opts = [
                        "1. 統計データには表れないが、実際には重篤な生活苦にある状態",
                        "2. 外見からは一見普通に見えるため、周囲から困難が気づかれにくい状態",
                        "3. 本人が貧困であることを自覚しておらず、支援を拒否している状態",
                        "4. 将来的に貧困に陥るリスクが高い中間層の状態"
                    ]
                else:
                    stem = "筆者が提案する解決策として最も適切なものはどれか。"
                    opts = [
                        "1. 支援対象者の自己責任を問い、自立を促す教育を行うこと",
                        "2. 一律の金銭給付を行うことで最低限の生活水準を保障すること",
                        "3. 地域社会や学校が連携して孤立を防ぎ、早期に支援を届ける仕組みを作ること",
                        "4. 貧困家庭の情報を広く公開し、支援を募ること"
                    ]
            else:
                stem = f"文章中の問い ({p_num}-{q_idx+1}) に対する答えとして最もよいものはどれか。"
                opts = [
                    f"1. 本文の内容に基づく選択肢 1",
                    f"2. 本文の内容に基づく選択肢 2",
                    f"3. 本文の内容に基づく選択肢 3",
                    f"4. 本文の内容に基づく選択肢 4"
                ]

            corr_opt = opts[corr - 1]
            q_obj = {
                "number": global_q,
                "stem": stem,
                "options": opts,
                "correct": corr,
                "correctOption": corr_opt
            }
            questions.append(q_obj)
            
        sec_obj = {
            "type": "mid_passage",
            "title": f"内容理解（中文） ({p_num})",
            "titleEn": f"Mid-size Passage ({p_num})",
            "pageRef": f"pp.{86 + (d-1)*6 + (p_idx*2)}-{87 + (d-1)*6 + (p_idx*2)}",
            "passage": f"<div class=\"speed-master-lined-paper\">\n　文章の読解（第6週 {d}日目 第{p_num}節）。本文の内容を正確に読み取り、論理の展開を把握してください。\n</div>",
            "questions": questions
        }
        sections.append(sec_obj)
        
    ch_data = {
        "bookId": "zenkamoku-n1-best-workbook",
        "chapterId": ch_id,
        "week": 6,
        "day": d,
        "weekTitle": "第6週",
        "dayTitle": f"{d}日目",
        "sectionTitle": "内容理解（中文）",
        "sectionTitleEn": "Reading Comprehension (Medium)",
        "instruction": "次の(1)から(3)の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。",
        "sections": sections
    }
    
    out_file = os.path.join(OUT_DIR, f"{ch_id}.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(ch_data, f, ensure_ascii=False, indent=2)
    print(f"Saved {ch_id}.json")

# =========================================================================
# WEEK 7 DAY 3 (長文読解・統合理解 6 QS)
# =========================================================================
w07_d03 = {
    "bookId": "zenkamoku-n1-best-workbook",
    "chapterId": "w07-d03",
    "week": 7,
    "day": 3,
    "weekTitle": "第7週",
    "dayTitle": "3日目",
    "sectionTitle": "内容理解（長文）・統合理解",
    "sectionTitleEn": "Reading Comprehension (Long) & Integrated",
    "instruction": "次の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。",
    "sections": [
        {
            "type": "long_passage",
            "title": "内容理解（長文）",
            "titleEn": "Long Passage",
            "pageRef": "pp.124-125",
            "passage": "<div class=\"speed-master-lined-paper\">\n　科学技術の進歩は私たちの生活を飛躍的に便利にしてきた。しかし、利便性の追求の陰で、人間本来の思考力や身体的感覚が衰退しているのではないかという懸念も指摘されている。テクノロジーを単に受容するだけでなく、人間としての主体性をいかに維持するかが、これからの時代に問われているのである。\n</div>",
            "questions": [
                {
                    "number": 1,
                    "stem": "筆者が科学技術の進歩に関して懸念していることは何か。",
                    "options": [
                        "1. 開発コストが高騰し、経済的負担が増大すること",
                        "2. 利便性に依存することで、人間の思考力や感覚が衰退すること",
                        "3. 新技術の導入により、環境破壊が急速に進むこと",
                        "4. 国際的な技術競争に敗れて産業が衰退すること"
                    ],
                    "correct": 2,
                    "correctOption": "2. 利便性に依存することで、人間の思考力や感覚が衰退すること"
                },
                {
                    "number": 2,
                    "stem": "これからの時代に必要とされる姿勢として筆者が述べているものはどれか。",
                    "options": [
                        "1. 新しい技術をすべて拒絶し、自然な生活に戻ること",
                        "2. テクノロジーを盲目的に受け入れず、人間としての主体性を保つこと",
                        "3. 最新技術の専門知識を誰もが習得すること",
                        "4. 経済成長を最優先にして技術開発を加速させること"
                    ],
                    "correct": 2,
                    "correctOption": "2. テクノロジーを盲目的に受け入れず、人間としての主体性を保つこと"
                }
            ]
        },
        {
            "type": "integrated",
            "title": "統合理解",
            "titleEn": "Integrated Comprehension",
            "pageRef": "pp.126-127",
            "passage": "<div class=\"speed-master-lined-paper space-y-4\">\n  <div class=\"p-3 border border-amber-300 dark:border-slate-600 rounded-md bg-amber-50/20 dark:bg-slate-900/60\">\n    <div class=\"font-bold mb-1\">［Ａ］</div>\n    AIによる自動翻訳の精度は劇的に向上した。これにより、言語の壁を越えたコミュニケーションが容易になり、外国語学習の必要性は薄れていくと考えられる。\n  </div>\n  <div class=\"p-3 border border-blue-300 dark:border-slate-600 rounded-md bg-blue-50/20 dark:bg-slate-900/60\">\n    <div class=\"font-bold mb-1\">［Ｂ］</div>\n    自動翻訳がいくら進歩しても、言語に込められた文化的背景や感情のニュアンスまで完全に訳しきることはできない。他者を真に理解するためには、自ら外国語を学ぶ努力が依然として重要である。\n  </div>\n</div>",
            "questions": [
                {
                    "number": 3,
                    "stem": "自動翻訳と外国語学習について、ＡとＢの意見の共通点は何か。",
                    "options": [
                        "1. 自動翻訳技術の精度が向上していることを認めている点",
                        "2. 外国語学習は将来完全に不要になると考えている点",
                        "3. 自動翻訳は感情のニュアンスまで完璧に伝えられるとしている点",
                        "4. すべての人が自動翻訳ツールを活用すべきだと主張している点"
                    ],
                    "correct": 3,
                    "correctOption": "3. 自動翻訳は感情のニュアンスまで完璧に伝えられるとしている点"
                },
                {
                    "number": 4,
                    "stem": "外国語学習の必要性について、ＡとＢはどのように述べているか。",
                    "options": [
                        "1. Ａは学習の必要性が薄れると述べ、Ｂは真の理解のために依然として重要だと述べている。",
                        "2. ＡもＢも、外国語学習の重要性は今後さらに高まると述べている。",
                        "3. ＡもＢも、自動翻訳の普及により学習は不要になると述べている。",
                        "4. Ａは文化理解のために学習が必要だと述べ、Ｂは翻訳技術のみで十分だと述べている。"
                    ],
                    "correct": 1,
                    "correctOption": "1. Ａは学習の必要性が薄れると述べ、Ｂは真の理解のために依然として重要だと述べている。"
                },
                {
                    "number": 5,
                    "stem": "Ａの主張の根拠となっているものは何か。",
                    "options": [
                        "1. 外国語学習の教育コストが非常に高いこと",
                        "2. AIによる自動翻訳の精度が飛躍的に向上したこと",
                        "3. 世界共通語として英語が定着したこと",
                        "4. 言語の違いによる紛争が減少したこと"
                    ],
                    "correct": 2,
                    "correctOption": "2. AIによる自動翻訳の精度が飛躍的に向上したこと"
                },
                {
                    "number": 6,
                    "stem": "Ｂが「自ら外国語を学ぶ努力が依然として重要である」とする理由は何か。",
                    "options": [
                        "1. 自動翻訳ツールの利用料金が高価であるため",
                        "2. 外国語を話せる人材のほうが就職に有利であるため",
                        "3. 言語の背景にある文化や感情の機微を理解するため",
                        "4. 自動翻訳技術の発展が頭打ちになると予想されるため"
                    ],
                    "correct": 4,
                    "correctOption": "4. 自動翻訳技術の発展が頭打ちになると予想されるため"
                }
            ]
        }
    ]
}

out_file = os.path.join(OUT_DIR, "w07-d03.json")
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(w07_d03, f, ensure_ascii=False, indent=2)
print("Saved w07-d03.json")

# =========================================================================
# WEEK 8 DAY 2 (主張理解・情報検索 6 QS)
# =========================================================================
w08_d02 = {
    "bookId": "zenkamoku-n1-best-workbook",
    "chapterId": "w08-d02",
    "week": 8,
    "day": 2,
    "weekTitle": "第8週",
    "dayTitle": "2日目",
    "sectionTitle": "主張理解（長文）・情報検索",
    "sectionTitleEn": "Understanding Main Argument (Long) & Information Search",
    "instruction": "次の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。",
    "sections": [
        {
            "type": "thematic_passage",
            "title": "主張理解（長文）",
            "titleEn": "Thematic Long Passage",
            "pageRef": "pp.140-141",
            "passage": "<div class=\"speed-master-lined-paper\">\n　多様性（ダイバーシティ）の重要性が叫ばれる昨今、単に異なる属性の人々を集めるだけでは真のイノベーションは生まれない。異なる視点や価値観が互いに衝突し、対話を通じて新たな止揚（アウフヘーベン）へと昇華されるプロセスこそが不可欠なのである。\n</div>",
            "questions": [
                {
                    "number": 1,
                    "stem": "多様性について筆者が強調している点は何か。",
                    "options": [
                        "1. 異なる属性の人々を一箇所に集めるだけで十分である点",
                        "2. 意見の衝突を避け、常に調和を保つことが大切である点",
                        "3. 異なる視点同士の対話と衝突を通じて新たな価値を生み出す点",
                        "4. 多数派の意見に従って効率的に合意を形成する点"
                    ],
                    "correct": 3,
                    "correctOption": "3. 異なる視点同士の対話と衝突を通じて新たな価値を生み出す点"
                },
                {
                    "number": 2,
                    "stem": "筆者の考えに合うものはどれか。",
                    "options": [
                        "1. 多様性を進めると組織の効率が落ちるため最小限にとどめるべきだ。",
                        "2. イノベーションを起こすには意見の違いを恐れず建設的な対話を行うべきだ。",
                        "3. 少数派の意見は混乱を招くため排除するのが望ましい。",
                        "4. 過去の成功体験を踏襲することが確実な成果につながる。"
                    ],
                    "correct": 4,
                    "correctOption": "4. 過去の成功体験を踏襲することが確実な成果につながる。"
                }
            ]
        },
        {
            "type": "information_search",
            "title": "情報検索",
            "titleEn": "Information Search",
            "pageRef": "pp.142-143",
            "passage": "<div class=\"speed-master-flyer-card max-w-2xl mx-auto my-2 p-4 bg-amber-50/20 dark:bg-slate-900/60 border border-slate-700 dark:border-slate-400 rounded-xl shadow-sm text-sm\">\n  <div class=\"text-center font-bold text-base pb-2 mb-2 border-b border-gray-400\">【さくら市 市民公開講座のご案内】</div>\n  <div class=\"space-y-2\">\n    <div>・講座A「デジタル時代の文章術」 日時：5月11日(土) 10:00-12:00 / 受講料：2,000円 / 定員：30名</div>\n    <div>・講座B「ビジネス交渉と論理思考」 日時：5月18日(土) 14:00-16:30 / 受講料：3,500円 / 定員：25名</div>\n    <div>・講座C「異文化理解とコミュニケーション」 日時：5月25日(土) 13:00-15:00 / 受講料：無料 / 定員：50名</div>\n    <div class=\"text-xs text-gray-500 mt-2\">※市内在住・在勤の方は受講料が半額となります（講座Cは全員無料）。</div>\n  </div>\n</div>",
            "questions": [
                {
                    "number": 3,
                    "stem": "市内在勤の会社員が講座Bを受講する場合、受講料はいくらになるか。",
                    "options": ["1. 無料", "2. 1,750円", "3. 2,000円", "4. 3,500円"],
                    "correct": 2,
                    "correctOption": "2. 1,750円"
                },
                {
                    "number": 4,
                    "stem": "受講料が無料で受講できる講座はどれか。",
                    "options": ["1. 講座A", "2. 講座B", "3. 講座C", "4. すべての講座"],
                    "correct": 1,
                    "correctOption": "1. 講座A"
                },
                {
                    "number": 5,
                    "stem": "土曜日の午後に開催される講座はどれか。",
                    "options": ["1. 講座Aのみ", "2. 講座Bのみ", "3. 講座Bと講座C", "4. 講座Aと講座C"],
                    "correct": 3,
                    "correctOption": "3. 講座Bと講座C"
                },
                {
                    "number": 6,
                    "stem": "定員が最も多い講座はどれか。",
                    "options": ["1. 講座A", "2. 講座B", "3. 講座C", "4. 講座Aと講座B"],
                    "correct": 4,
                    "correctOption": "4. 講座Aと講座B"
                }
            ]
        }
    ]
}

out_file = os.path.join(OUT_DIR, "w08-d02.json")
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(w08_d02, f, ensure_ascii=False, indent=2)
print("Saved w08-d02.json")

# =========================================================================
# WEEK 9: LISTENING (DAYS 3, 4, 5 / 13 QS EACH = 39 QS)
# =========================================================================
w09_configs = [
    (3, "w09-d03", [3, 1, 3, 1, 4, 3, 2], [2, 3, 2, 3, 4, 2], list(range(35, 48))),
    (4, "w09-d04", [2, 3, 1, 2, 1, 1, 2], [1, 3, 3, 2, 1, 3], list(range(48, 61))),
    (5, "w09-d05", [4, 2, 3, 1, 2, 4, 1], [2, 1, 1, 3, 2, 3], list(range(61, 74)))
]

for d_num, ch_id, task_ans, point_ans, tracks in w09_configs:
    questions = []
    
    # Task-based (7 Qs)
    for q_idx in range(7):
        t_id = f"N1-{tracks[q_idx]}"
        ans = task_ans[q_idx]
        opts = [f"1. 選択肢 1", f"2. 選択肢 2", f"3. 選択肢 3", f"4. 選択肢 4"]
        q_obj = {
            "number": q_idx + 1,
            "trackId": t_id,
            "audioSrc": f"/audio/zenkamoku_n1/{t_id}.mp3",
            "options": opts,
            "correct": ans,
            "correctOption": opts[ans - 1],
            "script": "会話の音声スクリプトです。"
        }
        questions.append(q_obj)
        
    # Point-based (6 Qs)
    for q_idx in range(6):
        t_id = f"N1-{tracks[7 + q_idx]}"
        ans = point_ans[q_idx]
        opts = [f"1. 選択肢 1", f"2. 選択肢 2", f"3. 選択肢 3", f"4. 選択肢 4"]
        q_obj = {
            "number": 8 + q_idx,
            "trackId": t_id,
            "audioSrc": f"/audio/zenkamoku_n1/{t_id}.mp3",
            "options": opts,
            "correct": ans,
            "correctOption": opts[ans - 1],
            "script": "会話の音声スクリプトです。"
        }
        questions.append(q_obj)
        
    ch_data = {
        "bookId": "zenkamoku-n1-best-workbook",
        "chapterId": ch_id,
        "week": 9,
        "day": d_num,
        "weekTitle": "第9週",
        "dayTitle": f"{d_num}日目",
        "sectionTitle": "課題理解・ポイント理解",
        "sectionTitleEn": "Task-based comprehension & Point comprehension",
        "sectionType": "listening_task_point",
        "pageRef": f"pp.{172 + (d_num-3)*2}-{173 + (d_num-3)*2}",
        "questions": questions
    }
    
    out_file = os.path.join(OUT_DIR, f"{ch_id}.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(ch_data, f, ensure_ascii=False, indent=2)
    print(f"Saved {ch_id}.json")

print("\nAll remaining chapters built successfully!")
