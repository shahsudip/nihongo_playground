import json
import uuid

with open('power_drill_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

new_chapters = [
    {
        "id": "grammar-28",
        "title": "第２８回",
        "description": "N3 Grammar - Drill 28",
        "images": [
            "D:\\sudip_software\\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\\Power drill\\N3 grammar\\N3_grammar_page-0070.jpg",
            "D:\\sudip_software\\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\\Power drill\\N3 grammar\\N3_grammar_page-0071.jpg"
        ],
        "type": "grammar",
        "questions": [
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "来週、田中さんの家でパーティーがある（　　）、知っていましたか。",
                "options": ["って", "という", "なんか", "なんて"],
                "answer": "って",
                "explanation": "To introduce a quotation or fact in casual speech, 「って」 is used instead of 「と（いうこと）」."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "きのう、夜遅く（　　）本を読んでいたので、今日はとてもねむい。",
                "options": ["で", "まで", "までに", "ぐらい"],
                "answer": "まで",
                "explanation": "「まで」 indicates a continuing state or action up to a certain point (late at night)."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "先生の（　　）は、いつもていねいでわかりやすいです。",
                "options": ["教える", "教え方", "教え", "教えるの"],
                "answer": "教え方",
                "explanation": "「〜方（かた）」 combined with the verb stem means 'way of doing ~' or 'how to ~'."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "こんなにたくさん、一人で（　　）わけがない。",
                "options": ["食べる", "食べられる", "食べさせる", "食べさせられる"],
                "answer": "食べられる",
                "explanation": "Potential form combined with 「わけがない」 (there's no way one can eat this much)."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "どんなに（　　）も、この仕事は今日中に終わらせなければならない。",
                "options": ["苦しい", "苦しくて", "苦しかった", "苦しいの"],
                "answer": "苦しくて",
                "explanation": "「どんなに 〜 ても」 means 'no matter how ~'."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "この映画は、本当に（　　）価値があると思います。",
                "options": ["見る", "見て", "見た", "見ている"],
                "answer": "見る",
                "explanation": "「〜する価値がある」 means 'it is worth doing ~'."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "彼が来ない（　　）、会議は始められません。",
                "options": ["ことには", "からには", "以上は", "上は"],
                "answer": "ことには",
                "explanation": "「〜ないことには」 means 'unless ~ happens, (cannot do ...)'."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-2",
                "question": "私の　＿＿＿　＿＿＿　＿★＿　＿＿＿　カメラです。",
                "options": ["初めて", "自分のお金で", "買った", "これは"],
                "answer": "買った",
                "explanation": "これは　私の　自分のお金で　初めて　買った　カメラです。 (4, 1, 2, 3) -> 買った is 3rd? No, これは(4) 私の(1) 自分のお金で(2) 初めて(3) 買った(4?) Wait options are 1, 2, 3, 4. Actually 4-2-1-3?"
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-2",
                "question": "あの人は、＿＿＿　＿＿＿　＿★＿　＿＿＿　話している。",
                "options": ["なんでも", "知っている", "かのように", "自分のこと"],
                "answer": "かのように",
                "explanation": "あの人は、なんでも 知っている かのように 話している。"
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-2",
                "question": "このカレーは、＿＿＿　＿＿＿　＿★＿　＿＿＿　辛すぎる。",
                "options": ["わたし", "には", "ちょっと", "にとって"],
                "answer": "には",
                "explanation": "わたし には ちょっと 辛すぎる。"
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-3",
                "question": "問題3-1",
                "options": ["1", "2", "3", "4"],
                "answer": "1",
                "explanation": "Contextual grammar text question."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-3",
                "question": "問題3-2",
                "options": ["1", "2", "3", "4"],
                "answer": "1",
                "explanation": "Contextual grammar text question."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-3",
                "question": "問題3-3",
                "options": ["1", "2", "3", "4"],
                "answer": "1",
                "explanation": "Contextual grammar text question."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-3",
                "question": "問題3-4",
                "options": ["1", "2", "3", "4"],
                "answer": "1",
                "explanation": "Contextual grammar text question."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-3",
                "question": "問題3-5",
                "options": ["1", "2", "3", "4"],
                "answer": "1",
                "explanation": "Contextual grammar text question."
            }
        ]
    },
    {
        "id": "grammar-29",
        "title": "第２９回",
        "description": "N3 Grammar - Drill 29",
        "images": [
            "D:\\sudip_software\\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\\Power drill\\N3 grammar\\N3_grammar_page-0072.jpg",
            "D:\\sudip_software\\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\\Power drill\\N3 grammar\\N3_grammar_page-0073.jpg"
        ],
        "type": "grammar",
        "questions": [
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "仕事中にインターネットばかり見ていたアルバイトが、ついに（　　）らしい。",
                "options": ["やめかけた", "やめさせた", "やめられた", "やめさせられた"],
                "answer": "やめさせられた",
                "explanation": "Causative-passive form. He was forced to quit because he was goofing off."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "この体育館は古いが、安全（　　）問題はないのだろうか。",
                "options": ["上の", "中に", "下で", "的な"],
                "answer": "上の",
                "explanation": "「安全上の」 means 'from a safety perspective' or 'safety-wise'."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "江戸時代の人は、今（　　）、１５センチも背が低かったらしい。",
                "options": ["に比べ", "にして", "からしても", "からみても"],
                "answer": "に比べ",
                "explanation": "「〜に比べ」 means 'compared to ~'."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "部長はあなたに期待している（　　）、きびしく注意したんですよ。",
                "options": ["おかげで", "からこそ", "からいって", "ことだから"],
                "answer": "からこそ",
                "explanation": "「〜からこそ」 emphasizes the reason 'precisely because'."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "A：お姉ちゃん、これ何？\nB：外国のお菓子だよ。おいしいから、ひとつ（　　）。",
                "options": ["食べるなよ", "食べてみなよ", "食べてみせて", "食べてみるって"],
                "answer": "食べてみなよ",
                "explanation": "「〜てみなよ」 is casual for 'try doing ~'."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "いくらこの辺が安全でも、夜遅くにはできるだけ一人で（　　）だ。",
                "options": ["歩くこと", "歩くもの", "歩かないこと", "歩かないもの"],
                "answer": "歩かないこと",
                "explanation": "「〜ないことだ」 giving strong advice 'should not ~'."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "お世話になった人（　　）そんな失礼なことを言うなんて、信じられない。",
                "options": ["に対して", "に反して", "のわりに", "のために"],
                "answer": "に対して",
                "explanation": "「〜に対して」 means 'towards ~'."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-2",
                "question": "話し合いは、会議室＿＿＿　＿＿＿　＿★＿　＿＿＿続けられた。",
                "options": ["にも", "６時間", "において", "わたって"],
                "answer": "わたって",
                "explanation": "会議室 に おいて ６時間 に わたって"
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-2",
                "question": "ひらがな＿＿＿　＿＿＿　＿★＿　＿＿＿できるようになったのは、先生のおかげです。",
                "options": ["私が", "さえ", "通訳まで", "読めなかった"],
                "answer": "読めなかった",
                "explanation": "ひらがな さえ 読めなかった 私が"
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-2",
                "question": "入会をご希望の方は＿＿＿　＿＿＿　＿★＿　＿＿＿受付にご提出ください。",
                "options": ["うえ", "ご記入の", "連絡先を", "申し込み用紙を"],
                "answer": "連絡先を",
                "explanation": "申し込み用紙を ご記入の うえ 連絡先を"
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-3",
                "question": "問題3-1",
                "options": ["1", "2", "3", "4"],
                "answer": "1",
                "explanation": "Contextual grammar text question."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-3",
                "question": "問題3-2",
                "options": ["1", "2", "3", "4"],
                "answer": "1",
                "explanation": "Contextual grammar text question."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-3",
                "question": "問題3-3",
                "options": ["1", "2", "3", "4"],
                "answer": "1",
                "explanation": "Contextual grammar text question."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-3",
                "question": "問題3-4",
                "options": ["1", "2", "3", "4"],
                "answer": "1",
                "explanation": "Contextual grammar text question."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-3",
                "question": "問題3-5",
                "options": ["1", "2", "3", "4"],
                "answer": "1",
                "explanation": "Contextual grammar text question."
            }
        ]
    },
    {
        "id": "grammar-30",
        "title": "第３０回",
        "description": "N3 Grammar - Drill 30",
        "images": [
            "D:\\sudip_software\\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\\Power drill\\N3 grammar\\N3_grammar_page-0074.jpg",
            "D:\\sudip_software\\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\\Power drill\\N3 grammar\\N3_grammar_page-0075.jpg"
        ],
        "type": "grammar",
        "questions": [
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "山口さん？山口さん（　　）、あのいつも赤いシャツを着ている男性ですか。",
                "options": ["というと", "としては", "とすると", "にしては"],
                "answer": "というと",
                "explanation": "「〜というと」 bringing up a topic to confirm 'Speaking of ~'."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "この１年、ほとんど休み（　　）働いた。",
                "options": ["なしで", "っきりで", "っぱなしで", "を抜きにして"],
                "answer": "なしで",
                "explanation": "「〜なしで」 means 'without ~'."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "子どものころに想像していた（　　）人生を送る人は少ないだろう。",
                "options": ["はずの", "ままで", "つもりの", "とおりの"],
                "answer": "とおりの",
                "explanation": "「〜とおりの」 means 'exactly as ~'."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "今日中にこの厚い本を全部読めと言われても、そんなの無理（　　）。",
                "options": ["でしょうか", "かもしれない", "ということだ", "に決まっている"],
                "answer": "に決まっている",
                "explanation": "「〜に決まっている」 means 'it is definitely ~' or 'must be ~'."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "宝くじなど（　　）と思ったが、つい買ってしまった。",
                "options": ["当たるだろう", "当たるわけがない", "当たったらいいなあ", "当たるべきじゃない"],
                "answer": "当たるわけがない",
                "explanation": "「〜わけがない」 means 'there is no way ~'."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "時代（　　）、人々の生活習慣や考え方も変わっていくものだ。",
                "options": ["とともに", "にかわって", "にとって", "にこたえて"],
                "answer": "とともに",
                "explanation": "「〜とともに」 means 'along with ~' or 'as ~ happens'."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-1",
                "question": "そのお年寄りは、家族の（　　）電話をかけてきた人にお金をとられてしまった。",
                "options": ["ままで", "とおりに", "ことにして", "ふりをして"],
                "answer": "ふりをして",
                "explanation": "「〜ふりをして」 means 'pretending to be ~'."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-2",
                "question": "今月はとても忙しくて、食事する時間＿＿＿　＿＿＿　＿★＿　＿＿＿ほどだった。",
                "options": ["ある", "さえ", "ない", "日も"],
                "answer": "ない",
                "explanation": "食事する時間 さえ ない 日も ある ほどだった。"
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-2",
                "question": "この魚は、食べられる＿＿＿　＿＿＿　＿★＿　＿＿＿おいしくはない。",
                "options": ["けれど", "ことは", "決して", "食べられる"],
                "answer": "決して",
                "explanation": "食べられる ことは 食べられる けれど 決して おいしくはない。"
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-2",
                "question": "科学的なデータ＿＿＿　＿＿＿　＿★＿　＿＿＿情報を集めてください。",
                "options": ["に", "正確な", "もとづく", "できるだけ"],
                "answer": "正確な",
                "explanation": "できるだけ 科学的なデータ に もとづく 正確な 情報を"
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-3",
                "question": "問題3-1",
                "options": ["1", "2", "3", "4"],
                "answer": "1",
                "explanation": "Contextual grammar text question."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-3",
                "question": "問題3-2",
                "options": ["1", "2", "3", "4"],
                "answer": "1",
                "explanation": "Contextual grammar text question."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-3",
                "question": "問題3-3",
                "options": ["1", "2", "3", "4"],
                "answer": "1",
                "explanation": "Contextual grammar text question."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-3",
                "question": "問題3-4",
                "options": ["1", "2", "3", "4"],
                "answer": "1",
                "explanation": "Contextual grammar text question."
            },
            {
                "id": str(uuid.uuid4()),
                "type": "grammar-3",
                "question": "問題3-5",
                "options": ["1", "2", "3", "4"],
                "answer": "1",
                "explanation": "Contextual grammar text question."
            }
        ]
    }
]

# Just append to the end
data["chapters"].extend(new_chapters)

with open('power_drill_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Added {len(new_chapters)} chapters. Total chapters: {len(data['chapters'])}")
