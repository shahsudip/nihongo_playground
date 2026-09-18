import sys, os, json

sys.stdout.reconfigure(encoding='utf-8')

OUT_DIR = os.path.join('src', 'data', 'zenkamoku_n3')
os.makedirs(OUT_DIR, exist_ok=True)

with open('scripts/zenkamoku_n3/answer_keys_raw.json', encoding='utf-8') as f:
    answer_keys = json.load(f)

# Define Week 1 and Week 2 data
chapters = [
    # ==================== WEEK 1 DAY 1 ====================
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w01-d01",
        "week": 1,
        "day": 1,
        "weekTitle": "第1週",
        "dayTitle": "1日目",
        "sectionTitle": "漢字読み・表記",
        "sectionTitleEn": "Kanji Reading & Orthography",
        "subSections": [
            {
                "type": "kanji_reading",
                "title": "漢字読み",
                "titleEn": "Kanji reading",
                "pageRef": "p.16",
                "instruction": "＿＿のことばの読み方として最もよいものを、１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "作文は<u>月末</u>までに出さなければならない。",
                        "options": ["1. つきまつ", "2. つきすえ", "3. げつまつ", "4. げつすえ"],
                        "correct": 3,
                        "correctOption": "3. げつまつ"
                    },
                    {
                        "number": 2,
                        "stem": "<ruby>吉田<rt>よしだ</rt></ruby>さんに<u>伝えて</u>ください。",
                        "options": ["1. こたえて", "2. あたえて", "3. おしえて", "4. つたえて"],
                        "correct": 4,
                        "correctOption": "4. つたえて"
                    },
                    {
                        "number": 3,
                        "stem": "ここからそこまで<u>往復</u>でいくらですか。",
                        "options": ["1. おうふく", "2. おおふく", "3. おうぶく", "4. おおぶく"],
                        "correct": 1,
                        "correctOption": "1. おうふく"
                    },
                    {
                        "number": 4,
                        "stem": "やっとライオンが<u>現れました</u>。",
                        "options": ["1. うまれました", "2. みられました", "3. かくれました", "4. あらわれました"],
                        "correct": 4,
                        "correctOption": "4. あらわれました"
                    },
                    {
                        "number": 5,
                        "stem": "はじめて<u>選挙</u>に行きました。",
                        "options": ["1. せんきょ", "2. せんぎょ", "3. せんきょう", "4. せんぎょう"],
                        "correct": 1,
                        "correctOption": "1. せんきょ"
                    },
                    {
                        "number": 6,
                        "stem": "父は<u>卵</u>料理が上手だ。",
                        "options": ["1. めん", "2. たまご", "3. まめ", "4. なべ"],
                        "correct": 2,
                        "correctOption": "2. たまご"
                    },
                    {
                        "number": 7,
                        "stem": "このコーヒーは少し<u>濃い</u>。",
                        "options": ["1. うすい", "2. こい", "3. にがい", "4. あまい"],
                        "correct": 2,
                        "correctOption": "2. こい"
                    },
                    {
                        "number": 8,
                        "stem": "近所に<u>薬局</u>ができた。",
                        "options": ["1. やっぎょく", "2. やくぎょく", "3. やっきょく", "4. やくきょく"],
                        "correct": 3,
                        "correctOption": "3. やっきょく"
                    }
                ]
            },
            {
                "type": "orthography",
                "title": "表記",
                "titleEn": "Orthography",
                "pageRef": "p.17",
                "instruction": "＿＿のことばを漢字で書くとき、最もよいものを１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "<ruby>彼<rt>かれ</rt></ruby>はたくさんの<ruby>有名<rt>ゆうめい</rt></ruby>な<u>きょく</u>を作った。",
                        "options": ["1. 歌", "2. 曲", "3. 音", "4. 踊"],
                        "correct": 2,
                        "correctOption": "2. 曲"
                    },
                    {
                        "number": 2,
                        "stem": "父に<u>あつい</u>本をもらった。",
                        "options": ["1. 太い", "2. 増い", "3. 厚い", "4. 多い"],
                        "correct": 3,
                        "correctOption": "3. 厚い"
                    },
                    {
                        "number": 3,
                        "stem": "先生から<u>れんらく</u>があった。",
                        "options": ["1. 練絡", "2. 連絡", "3. 練格", "4. 連格"],
                        "correct": 2,
                        "correctOption": "2. 連絡"
                    },
                    {
                        "number": 4,
                        "stem": "雪が降ったので、道が<u>こおって</u>いる。",
                        "options": ["1. 冬って", "2. 寒って", "3. 冷って", "4. 凍って"],
                        "correct": 4,
                        "correctOption": "4. 凍って"
                    },
                    {
                        "number": 5,
                        "stem": "テスト前にしっかり<u>ふくしゅう</u>した。",
                        "options": ["1. 復習", "2. 援習", "3. 複習", "4. 後習"],
                        "correct": 1,
                        "correctOption": "1. 復習"
                    },
                    {
                        "number": 6,
                        "stem": "コップが<u>われて</u>いる。",
                        "options": ["1. 折れて", "2. 割れて", "3. 破れて", "4. 落れて"],
                        "correct": 2,
                        "correctOption": "2. 割れて"
                    }
                ]
            }
        ]
    },

    # ==================== WEEK 1 DAY 2 ====================
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w01-d02",
        "week": 1,
        "day": 2,
        "weekTitle": "第1週",
        "dayTitle": "2日目",
        "sectionTitle": "漢字読み・表記",
        "sectionTitleEn": "Kanji Reading & Orthography",
        "subSections": [
            {
                "type": "kanji_reading",
                "title": "漢字読み",
                "titleEn": "Kanji reading",
                "pageRef": "p.18",
                "instruction": "＿＿のことばの読み方として最もよいものを、１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "自分の意見を<u>発表</u>する。",
                        "options": ["1. はつひょう", "2. はつぴょう", "3. はっひょう", "4. はっぴょう"],
                        "correct": 4,
                        "correctOption": "4. はっぴょう"
                    },
                    {
                        "number": 2,
                        "stem": "15分以上<u>遅刻</u>したら、テストは受けられません。",
                        "options": ["1. じこく", "2. ちこく", "3. じごく", "4. ちごく"],
                        "correct": 2,
                        "correctOption": "2. ちこく"
                    },
                    {
                        "number": 3,
                        "stem": "母から手紙が<u>届いた</u>。",
                        "options": ["1. とといた", "2. とどいた", "3. どといた", "4. どどいた"],
                        "correct": 2,
                        "correctOption": "2. とどいた"
                    },
                    {
                        "number": 4,
                        "stem": "台風が来そうなので、<u>雨戸</u>をしっかり閉める。",
                        "options": ["1. あめと", "2. あめど", "3. あまと", "4. あまど"],
                        "correct": 4,
                        "correctOption": "4. あまど"
                    },
                    {
                        "number": 5,
                        "stem": "私はスポーツが<u>苦手</u>です。",
                        "options": ["1. じょうず", "2. へた", "3. にがて", "4. とくい"],
                        "correct": 3,
                        "correctOption": "3. にがて"
                    },
                    {
                        "number": 6,
                        "stem": "<u>信号</u>が青になってから、<ruby>渡<rt>わた</rt></ruby>りましょう。",
                        "options": ["1. しんご", "2. しごう", "3. しんごん", "4. しんごう"],
                        "correct": 4,
                        "correctOption": "4. しんごう"
                    },
                    {
                        "number": 7,
                        "stem": "<ruby>佐々木<rt>ささき</rt></ruby>さんを野球チームのメンバーに<u>加える</u>。",
                        "options": ["1. くわえる", "2. あたえる", "3. むかえる", "4. かぞえる"],
                        "correct": 1,
                        "correctOption": "1. くわえる"
                    },
                    {
                        "number": 8,
                        "stem": "<ruby>木村<rt>きむら</rt></ruby>さんは仕事が<u>速い</u>。",
                        "options": ["1. はやい", "2. おそい", "3. うまい", "4. あらい"],
                        "correct": 1,
                        "correctOption": "1. はやい"
                    }
                ]
            },
            {
                "type": "orthography",
                "title": "表記",
                "titleEn": "Orthography",
                "pageRef": "p.19",
                "instruction": "＿＿のことばを漢字で書くとき、最もよいものを１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "私は体力には<u>じしん</u>がある。",
                        "options": ["1. 白信", "2. 白心", "3. 自信", "4. 自心"],
                        "correct": 3,
                        "correctOption": "3. 自信"
                    },
                    {
                        "number": 2,
                        "stem": "子どもから<ruby>風邪<rt>かぜ</rt></ruby>を<u>うつされた</u>。",
                        "options": ["1. 移された", "2. 写された", "3. 映された", "4. 受された"],
                        "correct": 1,
                        "correctOption": "1. 移された"
                    },
                    {
                        "number": 3,
                        "stem": "新聞に<u>こうこく</u>を出す。",
                        "options": ["1. 交吉", "2. 交告", "3. 広吉", "4. 広告"],
                        "correct": 4,
                        "correctOption": "4. 広告"
                    },
                    {
                        "number": 4,
                        "stem": "チョコレートの<u>げんりょう</u>は何ですか。",
                        "options": ["1. 原量", "2. 原料", "3. 源量", "4. 源料"],
                        "correct": 2,
                        "correctOption": "2. 原料"
                    },
                    {
                        "number": 5,
                        "stem": "この道は車が多く通るので、<u>あぶない</u>。",
                        "options": ["1. 危い", "2. 危ない", "3. 険い", "4. 険ない"],
                        "correct": 2,
                        "correctOption": "2. 危ない"
                    },
                    {
                        "number": 6,
                        "stem": "気をつけていれば、その<ruby>事故<rt>じこ</rt></ruby>は<u>ふせげた</u>だろう。",
                        "options": ["1. 坊げた", "2. 妨げた", "3. 防げた", "4. 訪げた"],
                        "correct": 3,
                        "correctOption": "3. 防げた"
                    }
                ]
            }
        ]
    },

    # ==================== WEEK 1 DAY 3 ====================
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w01-d03",
        "week": 1,
        "day": 3,
        "weekTitle": "第1週",
        "dayTitle": "3日目",
        "sectionTitle": "漢字読み・表記",
        "sectionTitleEn": "Kanji Reading & Orthography",
        "subSections": [
            {
                "type": "kanji_reading",
                "title": "漢字読み",
                "titleEn": "Kanji reading",
                "pageRef": "p.20",
                "instruction": "＿＿のことばの読み方として最もよいものを、１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "この店では<u>格安</u>でパソコンが買える。",
                        "options": ["1. かぐやす", "2. かくやす", "3. かぐあん", "4. かくあん"],
                        "correct": 2,
                        "correctOption": "2. かくやす"
                    },
                    {
                        "number": 2,
                        "stem": "ここで<u>右折</u>してください。",
                        "options": ["1. さきん", "2. うきん", "3. させつ", "4. うせつ"],
                        "correct": 4,
                        "correctOption": "4. うせつ"
                    },
                    {
                        "number": 3,
                        "stem": "このホテルは<u>快適</u>です。",
                        "options": ["1. かいてき", "2. けいてき", "3. かいてい", "4. けいてい"],
                        "correct": 1,
                        "correctOption": "1. かいてき"
                    },
                    {
                        "number": 4,
                        "stem": "<ruby>有名<rt>ゆうめい</rt></ruby>な医者が<ruby>彼<rt>かれ</rt></ruby>を<u>手術</u>しました。",
                        "options": ["1. じゅちゅつ", "2. しゅちゅつ", "3. じゅじゅつ", "4. しゅじゅつ"],
                        "correct": 4,
                        "correctOption": "4. しゅじゅつ"
                    },
                    {
                        "number": 5,
                        "stem": "<u>配送料</u>はいくらですか。",
                        "options": ["1. はいたつりょう", "2. はいそうりょう", "3. はいたつひ", "4. はいそうひ"],
                        "correct": 2,
                        "correctOption": "2. はいそうりょう"
                    },
                    {
                        "number": 6,
                        "stem": "<u>米国</u>とはアメリカのことだ。",
                        "options": ["1. えいこく", "2. まいこく", "3. べいこく", "4. めいこく"],
                        "correct": 3,
                        "correctOption": "3. べいこく"
                    },
                    {
                        "number": 7,
                        "stem": "もっと自分の気持ちを<u>表した</u>ほうがいいですよ。",
                        "options": ["1. かくした", "2. あらわした", "3. だした", "4. しめした"],
                        "correct": 2,
                        "correctOption": "2. あらわした"
                    },
                    {
                        "number": 8,
                        "stem": "<ruby>犯人<rt>はんにん</rt></ruby>は1<ruby>億円<rt>おく</rt></ruby>を<u>要求</u>している。",
                        "options": ["1. ようきゅう", "2. よっきゅう", "3. ようきょう", "4. よっきょう"],
                        "correct": 1,
                        "correctOption": "1. ようきゅう"
                    }
                ]
            },
            {
                "type": "orthography",
                "title": "表記",
                "titleEn": "Orthography",
                "pageRef": "p.21",
                "instruction": "＿＿のことばを漢字で書くとき、最もよいものを１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "生まれて<u>はじめて</u>雪を見ました。",
                        "options": ["1. 初じめて", "2. 初めて", "3. 始じめて", "4. 始めて"],
                        "correct": 2,
                        "correctOption": "2. 初めて"
                    },
                    {
                        "number": 2,
                        "stem": "<u>けっきょく</u><ruby>中野<rt>なかの</rt></ruby>さんは学校に来ませんでした。",
                        "options": ["1. 結曲", "2. 結局", "3. 詰曲", "4. 詰局"],
                        "correct": 2,
                        "correctOption": "2. 結局"
                    },
                    {
                        "number": 3,
                        "stem": "この商品は人気があって、手に入れるのが<u>こんなん</u>だ。",
                        "options": ["1. 因漠", "2. 困漠", "3. 因難", "4. 困難"],
                        "correct": 4,
                        "correctOption": "4. 困難"
                    },
                    {
                        "number": 4,
                        "stem": "父は<u>こうむいん</u>です。",
                        "options": ["1. 公務員", "2. 交預員", "3. 公預員", "4. 交務員"],
                        "correct": 1,
                        "correctOption": "1. 公務員"
                    },
                    {
                        "number": 5,
                        "stem": "とても<ruby>疲<rt>つか</rt></ruby>れていたけれど、よく<ruby>寝<rt>ね</rt></ruby>たら<u>かいふく</u>しました。",
                        "options": ["1. 会復", "2. 会複", "3. 回復", "4. 回複"],
                        "correct": 3,
                        "correctOption": "3. 回復"
                    },
                    {
                        "number": 6,
                        "stem": "赤と青の絵の具を<u>まぜて</u>、むらさき色を作る。",
                        "options": ["1. 渇ぜて", "2. 湿ぜて", "3. 湯ぜて", "4. 混ぜて"],
                        "correct": 4,
                        "correctOption": "4. 混ぜて"
                    }
                ]
            }
        ]
    },

    # ==================== WEEK 1 DAY 4 ====================
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w01-d04",
        "week": 1,
        "day": 4,
        "weekTitle": "第1週",
        "dayTitle": "4日目",
        "sectionTitle": "漢字読み・表記",
        "sectionTitleEn": "Kanji Reading & Orthography",
        "subSections": [
            {
                "type": "kanji_reading",
                "title": "漢字読み",
                "titleEn": "Kanji reading",
                "pageRef": "p.22",
                "instruction": "＿＿のことばの読み方として最もよいものを、１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "妹の日本語は<u>上達</u>した。",
                        "options": ["1. うえだち", "2. うえたつ", "3. じょうだち", "4. じょうたつ"],
                        "correct": 4,
                        "correctOption": "4. じょうたつ"
                    },
                    {
                        "number": 2,
                        "stem": "それを<u>返して</u>ください。",
                        "options": ["1. けして", "2. かえして", "3. おして", "4. かして"],
                        "correct": 2,
                        "correctOption": "2. かえして"
                    },
                    {
                        "number": 3,
                        "stem": "その犬はやっと<u>救助</u>された。",
                        "options": ["1. きょうじょ", "2. きゅうじょ", "3. きょうじょう", "4. きゅうじょう"],
                        "correct": 2,
                        "correctOption": "2. きゅうじょ"
                    },
                    {
                        "number": 4,
                        "stem": "ずっとそこに<u>座って</u>いました。",
                        "options": ["1. たって", "2. のって", "3. すわって", "4. かよって"],
                        "correct": 3,
                        "correctOption": "3. すわって"
                    },
                    {
                        "number": 5,
                        "stem": "テレビが<u>故障</u>している。",
                        "options": ["1. こしょう", "2. こうしょう", "3. こじょう", "4. こうじょう"],
                        "correct": 1,
                        "correctOption": "1. こしょう"
                    },
                    {
                        "number": 6,
                        "stem": "これを3<u>冊</u>ください。",
                        "options": ["1. まい", "2. こ", "3. さつ", "4. だい"],
                        "correct": 3,
                        "correctOption": "3. さつ"
                    },
                    {
                        "number": 7,
                        "stem": "この<u>部分</u>がよくわかりません。",
                        "options": ["1. べふん", "2. ぶふん", "3. べぶん", "4. ぶぶん"],
                        "correct": 4,
                        "correctOption": "4. ぶぶん"
                    },
                    {
                        "number": 8,
                        "stem": "母に<u>人形</u>をもらった。",
                        "options": ["1. じんぎょ", "2. じんぎょう", "3. にんぎょ", "4. にんぎょう"],
                        "correct": 4,
                        "correctOption": "4. にんぎょう"
                    }
                ]
            },
            {
                "type": "orthography",
                "title": "表記",
                "titleEn": "Orthography",
                "pageRef": "p.23",
                "instruction": "＿＿のことばを漢字で書くとき、最もよいものを１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "明日は<u>しゅくじつ</u>です。",
                        "options": ["1. 休日", "2. 昨日", "3. 祝日", "4. 祭日"],
                        "correct": 3,
                        "correctOption": "3. 祝日"
                    },
                    {
                        "number": 2,
                        "stem": "まだ、少し<u>ねむい</u>です。",
                        "options": ["1. 寒い", "2. 眠い", "3. 暑い", "4. 汚い"],
                        "correct": 2,
                        "correctOption": "2. 眠い"
                    },
                    {
                        "number": 3,
                        "stem": "あの二人は<u>こうさい</u>しているようだ。",
                        "options": ["1. 公祭", "2. 公際", "3. 交祭", "4. 交際"],
                        "correct": 4,
                        "correctOption": "4. 交際"
                    },
                    {
                        "number": 4,
                        "stem": "兄は遠くにボールを<u>なげた</u>。",
                        "options": ["1. 飛げた", "2. 投げた", "3. 打げた", "4. 放げた"],
                        "correct": 2,
                        "correctOption": "2. 投げた"
                    },
                    {
                        "number": 5,
                        "stem": "こちらにお名前をご<u>きにゅう</u>ください。",
                        "options": ["1. 記入", "2. 紀入", "3. 配入", "4. 起入"],
                        "correct": 1,
                        "correctOption": "1. 記入"
                    },
                    {
                        "number": 6,
                        "stem": "電話番号を<u>まちがえて</u>しまった。",
                        "options": ["1. 問違えて", "2. 問偉えて", "3. 間違えて", "4. 間偉えて"],
                        "correct": 3,
                        "correctOption": "3. 間違えて"
                    }
                ]
            }
        ]
    },

    # ==================== WEEK 1 DAY 5 ====================
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w01-d05",
        "week": 1,
        "day": 5,
        "weekTitle": "第1週",
        "dayTitle": "5日目",
        "sectionTitle": "漢字読み・表記",
        "sectionTitleEn": "Kanji Reading & Orthography",
        "subSections": [
            {
                "type": "kanji_reading",
                "title": "漢字読み",
                "titleEn": "Kanji reading",
                "pageRef": "p.24",
                "instruction": "＿＿のことばの読み方として最もよいものを、１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "何があったのか<u>正確</u>に教えてください。",
                        "options": ["1. せいかく", "2. せいこう", "3. しょうかく", "4. しょうこう"],
                        "correct": 1,
                        "correctOption": "1. せいかく"
                    },
                    {
                        "number": 2,
                        "stem": "<ruby>息子<rt>むすこ</rt></ruby>は1から10まで<u>数える</u>ことができます。",
                        "options": ["1. おぼえる", "2. おしえる", "3. かぞえる", "4. かずえる"],
                        "correct": 3,
                        "correctOption": "3. かぞえる"
                    },
                    {
                        "number": 3,
                        "stem": "<u>文房具</u>は3階で売っています。",
                        "options": ["1. ぷんぼうぐ", "2. ぶんぼうぐ", "3. ぷんぽうぐ", "4. ぶんぽうぐ"],
                        "correct": 2,
                        "correctOption": "2. ぶんぼうぐ"
                    },
                    {
                        "number": 4,
                        "stem": "<u>書類</u>をメールで送ります。",
                        "options": ["1. しょもつ", "2. しょるい", "3. しょうもつ", "4. しょうるい"],
                        "correct": 2,
                        "correctOption": "2. しょるい"
                    },
                    {
                        "number": 5,
                        "stem": "父は車で<u>通勤</u>している。",
                        "options": ["1. づうぎん", "2. づうきん", "3. つうぎん", "4. つうきん"],
                        "correct": 4,
                        "correctOption": "4. つうきん"
                    },
                    {
                        "number": 6,
                        "stem": "<u>残った</u>食べ物は持ち帰りたいです。",
                        "options": ["1. かわった", "2. さわった", "3. あまった", "4. のこった"],
                        "correct": 4,
                        "correctOption": "4. のこった"
                    },
                    {
                        "number": 7,
                        "stem": "<u>歩道橋</u>を<ruby>渡<rt>わた</rt></ruby>ります。",
                        "options": ["1. ほどうきょう", "2. ほうどうきょう", "3. ほどうばし", "4. ほうどうばし"],
                        "correct": 1,
                        "correctOption": "1. ほどうきょう"
                    },
                    {
                        "number": 8,
                        "stem": "インターネットに<u>接続</u>した。",
                        "options": ["1. せっそく", "2. せっしょく", "3. せつぞく", "4. せつしょく"],
                        "correct": 3,
                        "correctOption": "3. せつぞく"
                    }
                ]
            },
            {
                "type": "orthography",
                "title": "表記",
                "titleEn": "Orthography",
                "pageRef": "p.25",
                "instruction": "＿＿のことばを漢字で書くとき、最もよいものを１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "このゲームは<u>やさしい</u>から、子どもでも遊べます。",
                        "options": ["1. 優しい", "2. 易しい", "3. 優い", "4. 易い"],
                        "correct": 2,
                        "correctOption": "2. 易しい"
                    },
                    {
                        "number": 2,
                        "stem": "兄は最近、<u>きんえん</u>しています。",
                        "options": ["1. 勤延", "2. 勤煙", "3. 禁延", "4. 禁煙"],
                        "correct": 4,
                        "correctOption": "4. 禁煙"
                    },
                    {
                        "number": 3,
                        "stem": "今年は去年の2<u>ばい</u>のお<ruby>客<rt>きゃく</rt></ruby>さんが来た。",
                        "options": ["1. 倍", "2. 培", "3. 部", "4. 割"],
                        "correct": 1,
                        "correctOption": "1. 倍"
                    },
                    {
                        "number": 4,
                        "stem": "<ruby>肌<rt>はだ</rt></ruby>が<u>かんそう</u>しているので、クリームをぬる。",
                        "options": ["1. 乾燥", "2. 感想", "3. 完走", "4. 歓送"],
                        "correct": 1,
                        "correctOption": "1. 乾燥"
                    },
                    {
                        "number": 5,
                        "stem": "<u>きゅうきゅうしゃ</u>が到着した。",
                        "options": ["1. 球急車", "2. 急球車", "3. 救急車", "4. 急救車"],
                        "correct": 3,
                        "correctOption": "3. 救急車"
                    },
                    {
                        "number": 6,
                        "stem": "大切なカップが<u>かけて</u>しまって悲しい。",
                        "options": ["1. 割て", "2. 割けて", "3. 欠て", "4. 欠けて"],
                        "correct": 4,
                        "correctOption": "4. 欠けて"
                    }
                ]
            }
        ]
    },

    # ==================== WEEK 2 DAY 1 ====================
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w02-d01",
        "week": 2,
        "day": 1,
        "weekTitle": "第2週",
        "dayTitle": "1日目",
        "sectionTitle": "文脈規定・言い換え類義",
        "sectionTitleEn": "Contextually-defined expressions & Paraphrases",
        "subSections": [
            {
                "type": "contextually_defined_expressions",
                "title": "文脈規定",
                "titleEn": "Contextually-defined expressions",
                "pageRef": "pp.26-27",
                "instruction": "（　　）に入れるのに最もよいものを、１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "この<ruby>薬<rt>くすり</rt></ruby>はすぐに（　　）が感じられます。",
                        "options": [
                            "1. <ruby>能力<rt>のうりょく</rt></ruby>",
                            "2. <ruby>効果<rt>こうか</rt></ruby>",
                            "3. <ruby>程度<rt>ていど</rt></ruby>",
                            "4. <ruby>調子<rt>ちょうし</rt></ruby>"
                        ],
                        "correct": 2,
                        "correctOption": "2. <ruby>効果<rt>こうか</rt></ruby>"
                    },
                    {
                        "number": 2,
                        "stem": "<ruby>留学<rt>りゅうがく</rt></ruby>する（　　）があれば、日本へ行きたい。",
                        "options": ["1. レジャー", "2. イメージ", "3. チャンス", "4. リポート"],
                        "correct": 3,
                        "correctOption": "3. チャンス"
                    },
                    {
                        "number": 3,
                        "stem": "台風が来たので、旅行のスケジュールを（　　）した。",
                        "options": [
                            "1. <ruby>交換<rt>こうかん</rt></ruby>",
                            "2. <ruby>変更<rt>へんこう</rt></ruby>",
                            "3. <ruby>改正<rt>かいせい</rt></ruby>",
                            "4. <ruby>防止<rt>ぼうし</rt></ruby>"
                        ],
                        "correct": 2,
                        "correctOption": "2. <ruby>変更<rt>へんこう</rt></ruby>"
                    },
                    {
                        "number": 4,
                        "stem": "何時間も待たされて（　　）してしまった。",
                        "options": ["1. じろじろ", "2. ぺこぺこ", "3. ぎらぎら", "4. いらいら"],
                        "correct": 4,
                        "correctOption": "4. いらいら"
                    },
                    {
                        "number": 5,
                        "stem": "兄は前からボランティアに（　　）があった。",
                        "options": [
                            "1. <ruby>関心<rt>かんしん</rt></ruby>",
                            "2. <ruby>協力<rt>きょうりょく</rt></ruby>",
                            "3. <ruby>掲示<rt>けいじ</rt></ruby>",
                            "4. <ruby>話題<rt>わだい</rt></ruby>"
                        ],
                        "correct": 1,
                        "correctOption": "1. <ruby>関心<rt>かんしん</rt></ruby>"
                    },
                    {
                        "number": 6,
                        "stem": "暑い日が<ruby>続<rt>つづ</rt></ruby>いて、<ruby>庭<rt>にわ</rt></ruby>の花が（　　）しまった。",
                        "options": ["1. かたまって", "2. かれて", "3. すべって", "4. けずれて"],
                        "correct": 2,
                        "correctOption": "2. かれて"
                    },
                    {
                        "number": 7,
                        "stem": "<ruby>卒業<rt>そつぎょう</rt></ruby>の（　　）に時計をもらった。",
                        "options": [
                            "1. <ruby>記憶<rt>きおく</rt></ruby>",
                            "2. <ruby>記録<rt>きろく</rt></ruby>",
                            "3. <ruby>記念<rt>きねん</rt></ruby>",
                            "4. <ruby>記号<rt>きごう</rt></ruby>"
                        ],
                        "correct": 3,
                        "correctOption": "3. <ruby>記念<rt>きねん</rt></ruby>"
                    },
                    {
                        "number": 8,
                        "stem": "<ruby>箱<rt>はこ</rt></ruby>のふたが開かないように上から（　　）ください。",
                        "options": ["1. まとめて", "2. おさえて", "3. こぼして", "4. むかえて"],
                        "correct": 2,
                        "correctOption": "2. おさえて"
                    },
                    {
                        "number": 9,
                        "stem": "入社後、3週間の（　　）に参加した。",
                        "options": [
                            "1. <ruby>残業<rt>ざんぎょう</rt></ruby>",
                            "2. <ruby>宿泊<rt>しゅくはく</rt></ruby>",
                            "3. <ruby>休憩<rt>きゅうけい</rt></ruby>",
                            "4. <ruby>研修<rt>けんしゅう</rt></ruby>"
                        ],
                        "correct": 4,
                        "correctOption": "4. <ruby>研修<rt>けんしゅう</rt></ruby>"
                    },
                    {
                        "number": 10,
                        "stem": "この道路は<ruby>事故<rt>じこ</rt></ruby>が多いので、道の<ruby>幅<rt>はば</rt></ruby>を（　　）工事をすることになった。",
                        "options": ["1. ひろめる", "2. ひろげる", "3. のばす", "4. ふくらませる"],
                        "correct": 2,
                        "correctOption": "2. ひろげる"
                    },
                    {
                        "number": 11,
                        "stem": "コンクールで<ruby>優秀作品<rt>ゆうしゅうさくひん</rt></ruby>に<ruby>選<rt>えら</rt></ruby>ばれ、<ruby>彼<rt>かれ</rt></ruby>の絵の（　　）がやっと<ruby>認<rt>みと</rt></ruby>められた。",
                        "options": [
                            "1. <ruby>名所<rt>めいしょ</rt></ruby>",
                            "2. <ruby>利点<rt>りてん</rt></ruby>",
                            "3. <ruby>性質<rt>せいしつ</rt></ruby>",
                            "4. <ruby>価値<rt>かち</rt></ruby>"
                        ],
                        "correct": 4,
                        "correctOption": "4. <ruby>価値<rt>かち</rt></ruby>"
                    }
                ]
            },
            {
                "type": "paraphrases",
                "title": "言い換え類義",
                "titleEn": "Paraphrases",
                "pageRef": "p.27",
                "instruction": "＿＿に意味が最も近いものを、１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "その川で魚を<u>とって</u>遊んだ。",
                        "options": ["1. おいかけて", "2. ひっぱって", "3. つかまえて", "4. にぎって"],
                        "correct": 3,
                        "correctOption": "3. つかまえて"
                    },
                    {
                        "number": 2,
                        "stem": "メールが<u><ruby>受信<rt>じゅしん</rt></ruby>できませんでした</u>。",
                        "options": [
                            "1. 送れませんでした",
                            "2. 受け取れませんでした",
                            "3. <ruby>開<rt>ひら</rt></ruby>けませんでした",
                            "4. 使えませんでした"
                        ],
                        "correct": 2,
                        "correctOption": "2. 受け取れませんでした"
                    },
                    {
                        "number": 3,
                        "stem": "私は、<u>めったに</u>テレビを見ません。",
                        "options": ["1. 最近", "2. ほとんど", "3. 絶対に", "4. ときどき"],
                        "correct": 2,
                        "correctOption": "2. ほとんど"
                    },
                    {
                        "number": 4,
                        "stem": "このゲームは子どもでも楽しめるように、もっと<u><ruby>工夫<rt>くふう</rt></ruby>した</u>ほうがいい。",
                        "options": ["1. 小さくした", "2. 軽くした", "3. 説明書を作った", "4. いいやり方を考えた"],
                        "correct": 4,
                        "correctOption": "4. いいやり方を考えた"
                    },
                    {
                        "number": 5,
                        "stem": "<u><ruby>意外<rt>いがい</rt></ruby>と</u><ruby>遊園地<rt>ゆうえんち</rt></ruby>は<ruby>空<rt>す</rt></ruby>いていた。",
                        "options": [
                            "1. <ruby>予想<rt>よそう</rt></ruby>通り",
                            "2. いつも以上に",
                            "3. 思っていたのと違って",
                            "4. <ruby>珍<rt>めずら</rt></ruby>しく"
                        ],
                        "correct": 3,
                        "correctOption": "3. 思っていたのと違って"
                    }
                ]
            }
        ]
    },

    # ==================== WEEK 2 DAY 2 ====================
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w02-d02",
        "week": 2,
        "day": 2,
        "weekTitle": "第2週",
        "dayTitle": "2日目",
        "sectionTitle": "文脈規定・言い換え類義",
        "sectionTitleEn": "Contextually-defined expressions & Paraphrases",
        "subSections": [
            {
                "type": "contextually_defined_expressions",
                "title": "文脈規定",
                "titleEn": "Contextually-defined expressions",
                "pageRef": "pp.28-29",
                "instruction": "（　　）に入れるのに最もよいものを、１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "部長はさっき（　　）ができて、お帰りになりました。",
                        "options": [
                            "1. <ruby>急用<rt>きゅうよう</rt></ruby>",
                            "2. <ruby>都合<rt>つごう</rt></ruby>",
                            "3. <ruby>情報<rt>じょうほう</rt></ruby>",
                            "4. <ruby>機会<rt>きかい</rt></ruby>"
                        ],
                        "correct": 1,
                        "correctOption": "1. <ruby>急用<rt>きゅうよう</rt></ruby>"
                    },
                    {
                        "number": 2,
                        "stem": "「がんばれ！　がんばれ！」と大きい声でチームを（　　）した。",
                        "options": [
                            "1. <ruby>発言<rt>はつげん</rt></ruby>",
                            "2. <ruby>応援<rt>おうえん</rt></ruby>",
                            "3. <ruby>指導<rt>しどう</rt></ruby>",
                            "4. <ruby>希望<rt>きぼう</rt></ruby>"
                        ],
                        "correct": 2,
                        "correctOption": "2. <ruby>応援<rt>おうえん</rt></ruby>"
                    },
                    {
                        "number": 3,
                        "stem": "<ruby>隣<rt>となり</rt></ruby>の家から晩ご飯のいい（　　）がする。",
                        "options": [
                            "1. <ruby>感<rt>かん</rt></ruby>じ",
                            "2. <ruby>雰囲気<rt>ふんいき</rt></ruby>",
                            "3. あじ",
                            "4. におい"
                        ],
                        "correct": 4,
                        "correctOption": "4. におい"
                    },
                    {
                        "number": 4,
                        "stem": "（　　）を見ると、製品の<ruby>特徴<rt>とくちょう</rt></ruby>がよくわかる。",
                        "options": ["1. アイディア", "2. カタログ", "3. メーカー", "4. メニュー"],
                        "correct": 2,
                        "correctOption": "2. カタログ"
                    },
                    {
                        "number": 5,
                        "stem": "あのレストランの料理は（　　）したほどではなかった。",
                        "options": [
                            "1. <ruby>指示<rt>しじ</rt></ruby>",
                            "2. <ruby>要求<rt>ようきゅう</rt></ruby>",
                            "3. <ruby>期待<rt>きたい</rt></ruby>",
                            "4. <ruby>注目<rt>ちゅうもく</rt></ruby>"
                        ],
                        "correct": 3,
                        "correctOption": "3. <ruby>期待<rt>きたい</rt></ruby>"
                    },
                    {
                        "number": 6,
                        "stem": "道が<ruby>混<rt>こ</rt></ruby>んでいて、（　　）運転するしかなかった。",
                        "options": ["1. くるくる", "2. ふらふら", "3. すらすら", "4. のろのろ"],
                        "correct": 4,
                        "correctOption": "4. のろのろ"
                    },
                    {
                        "number": 7,
                        "stem": "私はいつも8時50分に（　　）している。",
                        "options": [
                            "1. <ruby>出勤<rt>しゅっきん</rt></ruby>",
                            "2. <ruby>労働<rt>ろうどう</rt></ruby>",
                            "3. <ruby>就職<rt>しゅうしょく</rt></ruby>",
                            "4. <ruby>残業<rt>ざんぎょう</rt></ruby>"
                        ],
                        "correct": 1,
                        "correctOption": "1. <ruby>出勤<rt>しゅっきん</rt></ruby>"
                    },
                    {
                        "number": 8,
                        "stem": "<ruby>祖母<rt>そぼ</rt></ruby>が（　　）くれたセーターはとても<ruby>暖<rt>あたた</rt></ruby>かい。",
                        "options": ["1. あんで", "2. ぬって", "3. くみたてて", "4. かざって"],
                        "correct": 1,
                        "correctOption": "1. あんで"
                    },
                    {
                        "number": 9,
                        "stem": "公園に<ruby>捨<rt>す</rt></ruby>てられていた（　　）<ruby>猫<rt>ねこ</rt></ruby>を<ruby>拾<rt>ひろ</rt></ruby>った。",
                        "options": ["1. いじわるな", "2. かわいそうな", "3. おそろしい", "4. にがい"],
                        "correct": 2,
                        "correctOption": "2. かわいそうな"
                    },
                    {
                        "number": 10,
                        "stem": "日が（　　）と、この辺は<ruby>真っ暗<rt>まっくら</rt></ruby>になる。",
                        "options": [
                            "1. <ruby>済<rt>す</rt></ruby>む",
                            "2. <ruby>過<rt>す</rt></ruby>ぎる",
                            "3. <ruby>沈<rt>しず</rt></ruby>む",
                            "4. <ruby>傾<rt>かたむ</rt></ruby>く"
                        ],
                        "correct": 3,
                        "correctOption": "3. <ruby>沈<rt>しず</rt></ruby>む"
                    },
                    {
                        "number": 11,
                        "stem": "まだ着られる服を<ruby>捨<rt>す</rt></ruby>てるのは（　　）。",
                        "options": ["1. つまらない", "2. きたない", "3. もったいない", "4. くだらない"],
                        "correct": 3,
                        "correctOption": "3. もったいない"
                    }
                ]
            },
            {
                "type": "paraphrases",
                "title": "言い換え類義",
                "titleEn": "Paraphrases",
                "pageRef": "p.29",
                "instruction": "＿＿に意味が最も近いものを、１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "この<ruby>成績<rt>せいせき</rt></ruby>なら<ruby>希望<rt>きぼう</rt></ruby>の大学に<u>受かる</u>でしょう。",
                        "options": [
                            "1. <ruby>合格<rt>ごうかく</rt></ruby>する",
                            "2. <ruby>成功<rt>せいこう</rt></ruby>する",
                            "3. 申し込む",
                            "4. 間に合う"
                        ],
                        "correct": 1,
                        "correctOption": "1. <ruby>合格<rt>ごうかく</rt></ruby>する"
                    },
                    {
                        "number": 2,
                        "stem": "この道は<ruby>狭<rt>せま</rt></ruby>いので、<u>速度</u>を落として運転したほうがいい。",
                        "options": ["1. タイム", "2. エネルギー", "3. リズム", "4. スピード"],
                        "correct": 4,
                        "correctOption": "4. スピード"
                    },
                    {
                        "number": 3,
                        "stem": "<ruby>寝<rt>ね</rt></ruby>ている<ruby>息子<rt>むすこ</rt></ruby>に<u>そっと</u><ruby>毛布<rt>もうふ</rt></ruby>をかけた。",
                        "options": ["1. しずかに", "2. いそいで", "3. すこし", "4. きちんと"],
                        "correct": 1,
                        "correctOption": "1. しずかに"
                    },
                    {
                        "number": 4,
                        "stem": "この部屋は<u><ruby>散<rt>ち</rt></ruby>らかっている</u>。",
                        "options": [
                            "1. 物が少なくて広く感じる",
                            "2. 物が整理されずあちこちにある",
                            "3. <ruby>誰<rt>だれ</rt></ruby>も住んでいなくて静かだ",
                            "4. 人が集まっていてうるさい"
                        ],
                        "correct": 2,
                        "correctOption": "2. 物が整理されずあちこちにある"
                    },
                    {
                        "number": 5,
                        "stem": "あのホテルのサービスは<u>ひどかった</u>。",
                        "options": [
                            "1. あまりよくなかった",
                            "2. まあまあだった",
                            "3. 非常に悪かった",
                            "4. 非常によかった"
                        ],
                        "correct": 3,
                        "correctOption": "3. 非常に悪かった"
                    }
                ]
            }
        ]
    },

    # ==================== WEEK 2 DAY 3 ====================
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w02-d03",
        "week": 2,
        "day": 3,
        "weekTitle": "第2週",
        "dayTitle": "3日目",
        "sectionTitle": "文脈規定・言い換え類義",
        "sectionTitleEn": "Contextually-defined expressions & Paraphrases",
        "subSections": [
            {
                "type": "contextually_defined_expressions",
                "title": "文脈規定",
                "titleEn": "Contextually-defined expressions",
                "pageRef": "pp.30-31",
                "instruction": "（　　）に入れるのに最もよいものを、１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "たっぷりの水と<ruby>調味料<rt>ちょうみりょう</rt></ruby>を入れた<ruby>鍋<rt>なべ</rt></ruby>で野菜を（　　）。",
                        "options": [
                            "1. <ruby>焼<rt>や</rt></ruby>く",
                            "2. <ruby>煮<rt>に</rt></ruby>る",
                            "3. <ruby>揚<rt>あ</rt></ruby>げる",
                            "4. <ruby>炒<rt>いた</rt></ruby>める"
                        ],
                        "correct": 2,
                        "correctOption": "2. <ruby>煮<rt>に</rt></ruby>る"
                    },
                    {
                        "number": 2,
                        "stem": "ゴミが（　　）から、<ruby>捨<rt>す</rt></ruby>てに行ってください。",
                        "options": [
                            "1. さわがしい",
                            "2. <ruby>激<rt>はげ</rt></ruby>しい",
                            "3. くさい",
                            "4. <ruby>濃<rt>こ</rt></ruby>い"
                        ],
                        "correct": 3,
                        "correctOption": "3. くさい"
                    },
                    {
                        "number": 3,
                        "stem": "川で（　　）子どもを<ruby>助<rt>たす</rt></ruby>けました。",
                        "options": [
                            "1. おぼれた",
                            "2. あふれた",
                            "3. <ruby>浮<rt>う</rt></ruby>いた",
                            "4. <ruby>崩<rt>くず</rt></ruby>れた"
                        ],
                        "correct": 1,
                        "correctOption": "1. おぼれた"
                    },
                    {
                        "number": 4,
                        "stem": "<ruby>救急車<rt>きゅうきゅうしゃ</rt></ruby>の（　　）が大きな音で<ruby>鳴<rt>な</rt></ruby>っています。",
                        "options": ["1. リボン", "2. ポンプ", "3. クリック", "4. サイレン"],
                        "correct": 4,
                        "correctOption": "4. サイレン"
                    },
                    {
                        "number": 5,
                        "stem": "入りたい会社に（　　）を送る。",
                        "options": [
                            "1. <ruby>定期券<rt>ていきけん</rt></ruby>",
                            "2. <ruby>履歴書<rt>りれきしょ</rt></ruby>",
                            "3. <ruby>運転免許<rt>うんてんめんきょ</rt></ruby>",
                            "4. <ruby>招待状<rt>しょうたいじょう</rt></ruby>"
                        ],
                        "correct": 2,
                        "correctOption": "2. <ruby>履歴書<rt>りれきしょ</rt></ruby>"
                    },
                    {
                        "number": 6,
                        "stem": "<ruby>夫<rt>おっと</rt></ruby>が<ruby>財布<rt>さいふ</rt></ruby>を忘れて家を出ていったので、すぐに（　　）<ruby>渡<rt>わた</rt></ruby>した。",
                        "options": ["1. 追いかけて", "2. 追いこして", "3. 乗りかえて", "4. 乗りこえて"],
                        "correct": 1,
                        "correctOption": "1. 追いかけて"
                    },
                    {
                        "number": 7,
                        "stem": "食べたかったけれど、太りたくないので（　　）して、食べなかった。",
                        "options": ["1. びっくり", "2. がっかり", "3. いたずら", "4. がまん"],
                        "correct": 4,
                        "correctOption": "4. がまん"
                    },
                    {
                        "number": 8,
                        "stem": "うるさいから（　　）ください。",
                        "options": ["1. どいて", "2. つぶれて", "3. だまって", "4. しばって"],
                        "correct": 3,
                        "correctOption": "3. だまって"
                    },
                    {
                        "number": 9,
                        "stem": "今年は天気がいいから、<ruby>植物<rt>しょくぶつ</rt></ruby>が（　　）大きくなる。",
                        "options": ["1. ぐんぐん", "2. わくわく", "3. とんとん", "4. ころころ"],
                        "correct": 1,
                        "correctOption": "1. ぐんぐん"
                    },
                    {
                        "number": 10,
                        "stem": "することがなくて（　　）だったので、散歩に行った。",
                        "options": [
                            "1. <ruby>無事<rt>ぶじ</rt></ruby>",
                            "2. <ruby>退屈<rt>たいくつ</rt></ruby>",
                            "3. <ruby>地味<rt>じみ</rt></ruby>",
                            "4. <ruby>迷惑<rt>めいわく</rt></ruby>"
                        ],
                        "correct": 2,
                        "correctOption": "2. <ruby>退屈<rt>たいくつ</rt></ruby>"
                    },
                    {
                        "number": 11,
                        "stem": "赤ちゃんは（　　）眠っています。",
                        "options": ["1. すっきり", "2. はっきり", "3. ぐっすり", "4. うっかり"],
                        "correct": 3,
                        "correctOption": "3. ぐっすり"
                    }
                ]
            },
            {
                "type": "paraphrases",
                "title": "言い換え類義",
                "titleEn": "Paraphrases",
                "pageRef": "p.31",
                "instruction": "＿＿に意味が最も近いものを、１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "<u>しだいに</u><ruby>雲<rt>くも</rt></ruby>が出てきました。",
                        "options": ["1. だんだん", "2. 急に", "3. 少しだけ", "4. たくさん"],
                        "correct": 1,
                        "correctOption": "1. だんだん"
                    },
                    {
                        "number": 2,
                        "stem": "<u><ruby>吐<rt>は</rt></ruby>き<ruby>気<rt>け</rt></ruby>がする</u>のでちょっと休みます。",
                        "options": [
                            "1. <ruby>頭<rt>あたま</rt></ruby>が<ruby>痛<rt>いた</rt></ruby>いので",
                            "2. 気持ちが悪いので",
                            "3. <ruby>熱<rt>ねつ</rt></ruby>があるので",
                            "4. <ruby>倒<rt>たお</rt></ruby>れそうなので"
                        ],
                        "correct": 2,
                        "correctOption": "2. 気持ちが悪いので"
                    },
                    {
                        "number": 3,
                        "stem": "<u><ruby>貧<rt>まず</rt></ruby>しい</u>人を<ruby>助<rt>たす</rt></ruby>けます。",
                        "options": [
                            "1. 病気になった",
                            "2. <ruby>迷<rt>まよ</rt></ruby>っている",
                            "3. 元気がない",
                            "4. お金がない"
                        ],
                        "correct": 4,
                        "correctOption": "4. お金がない"
                    },
                    {
                        "number": 4,
                        "stem": "友達に<u><ruby>感謝<rt>かんしゃ</rt></ruby>します</u>。",
                        "options": [
                            "1. おめでとうと言います",
                            "2. 大好きだと言います",
                            "3. ごめんなさいと言います",
                            "4. ありがとうと言います"
                        ],
                        "correct": 4,
                        "correctOption": "4. ありがとうと言います"
                    },
                    {
                        "number": 5,
                        "stem": "<ruby>大石<rt>おおいし</rt></ruby>さんは<u>がんこ</u>です。",
                        "options": [
                            "1. 人の気持ちを考えません",
                            "2. まじめにがんばります",
                            "3. 自分の考えを変えません",
                            "4. <ruby>冗談<rt>じょうだん</rt></ruby>を言いません"
                        ],
                        "correct": 3,
                        "correctOption": "3. 自分の考えを変えません"
                    }
                ]
            }
        ]
    },

    # ==================== WEEK 2 DAY 4 ====================
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w02-d04",
        "week": 2,
        "day": 4,
        "weekTitle": "第2週",
        "dayTitle": "4日目",
        "sectionTitle": "文脈規定・言い換え類義",
        "sectionTitleEn": "Contextually-defined expressions & Paraphrases",
        "subSections": [
            {
                "type": "contextually_defined_expressions",
                "title": "文脈規定",
                "titleEn": "Contextually-defined expressions",
                "pageRef": "pp.32-33",
                "instruction": "（　　）に入れるのに最もよいものを、１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "すみません、この服、少し小さいんですが、大きい（　　）のはありますか。",
                        "options": ["1. サイズ", "2. スタイル", "3. レベル", "4. ナンバー"],
                        "correct": 1,
                        "correctOption": "1. サイズ"
                    },
                    {
                        "number": 2,
                        "stem": "本当はしていないのに、先生に「宿題をした」と（　　）をついてしまった。",
                        "options": [
                            "1. <ruby>冗談<rt>じょうだん</rt></ruby>",
                            "2. <ruby>方言<rt>ほうげん</rt></ruby>",
                            "3. うそ",
                            "4. うわさ"
                        ],
                        "correct": 3,
                        "correctOption": "3. うそ"
                    },
                    {
                        "number": 3,
                        "stem": "お<ruby>宅<rt>たく</rt></ruby>の<ruby>息子<rt>むすこ</rt></ruby>さん、毎朝<ruby>庭<rt>にわ</rt></ruby>の<ruby>掃除<rt>そうじ</rt></ruby>をして（　　）ですね。",
                        "options": ["1. あやしい", "2. えらい", "3. おさない", "4. おとなしい"],
                        "correct": 2,
                        "correctOption": "2. えらい"
                    },
                    {
                        "number": 4,
                        "stem": "子どもに教育を受けさせるのは親としての（　　）です。",
                        "options": [
                            "1. <ruby>資格<rt>しかく</rt></ruby>",
                            "2. <ruby>義務<rt>ぎむ</rt></ruby>",
                            "3. <ruby>特徴<rt>とくちょう</rt></ruby>",
                            "4. <ruby>免許<rt>めんきょ</rt></ruby>"
                        ],
                        "correct": 2,
                        "correctOption": "2. <ruby>義務<rt>ぎむ</rt></ruby>"
                    },
                    {
                        "number": 5,
                        "stem": "このクラスはみんないつも（　　）笑っていて楽しそうだ。",
                        "options": ["1. ぐらぐら", "2. ぴかぴか", "3. ごちゃごちゃ", "4. にこにこ"],
                        "correct": 4,
                        "correctOption": "4. にこにこ"
                    },
                    {
                        "number": 6,
                        "stem": "友人が<ruby>一緒<rt>いっしょ</rt></ruby>に映画に行かないかと（　　）くれた。",
                        "options": ["1. あやまって", "2. ゆずって", "3. さそって", "4. ゆるして"],
                        "correct": 3,
                        "correctOption": "3. さそって"
                    },
                    {
                        "number": 7,
                        "stem": "このスカートはデザインも色も（　　）ので、買いました。",
                        "options": ["1. 思いついた", "2. 思い出した", "3. 気にした", "4. 気に入った"],
                        "correct": 4,
                        "correctOption": "4. 気に入った"
                    },
                    {
                        "number": 8,
                        "stem": "<ruby>犯人<rt>はんにん</rt></ruby>が<ruby>捕<rt>つか</rt></ruby>まって、やっと<ruby>事件<rt>じけん</rt></ruby>が（　　）した。",
                        "options": [
                            "1. <ruby>解決<rt>かいけつ</rt></ruby>",
                            "2. <ruby>決心<rt>けっしん</rt></ruby>",
                            "3. <ruby>完成<rt>かんせい</rt></ruby>",
                            "4. <ruby>予防<rt>よぼう</rt></ruby>"
                        ],
                        "correct": 1,
                        "correctOption": "1. <ruby>解決<rt>かいけつ</rt></ruby>"
                    },
                    {
                        "number": 9,
                        "stem": "毎日<ruby>忙<rt>いそが</rt></ruby>しく<ruby>働<rt>はたら</rt></ruby>いていると、休日はどこにも出かけないで家で（　　）したくなる。",
                        "options": ["1. のんびり", "2. きちんと", "3. ぶらぶら", "4. ぴったり"],
                        "correct": 1,
                        "correctOption": "1. のんびり"
                    },
                    {
                        "number": 10,
                        "stem": "このやり方でやれば、<ruby>実験<rt>じっけん</rt></ruby>は（　　）<ruby>成功<rt>せいこう</rt></ruby>するはずだ。",
                        "options": [
                            "1. <ruby>正確<rt>せいかく</rt></ruby>に",
                            "2. <ruby>確実<rt>かくじつ</rt></ruby>に",
                            "3. じょうぶに",
                            "4. めったに"
                        ],
                        "correct": 2,
                        "correctOption": "2. <ruby>確実<rt>かくじつ</rt></ruby>に"
                    },
                    {
                        "number": 11,
                        "stem": "自分の国と日本を（　　）して、同じところと<ruby>違<rt>ちが</rt></ruby>うところをノートに書く。",
                        "options": [
                            "1. <ruby>合計<rt>ごうけい</rt></ruby>",
                            "2. <ruby>区別<rt>くべつ</rt></ruby>",
                            "3. <ruby>競争<rt>きょうそう</rt></ruby>",
                            "4. <ruby>比較<rt>ひかく</rt></ruby>"
                        ],
                        "correct": 4,
                        "correctOption": "4. <ruby>比較<rt>ひかく</rt></ruby>"
                    }
                ]
            },
            {
                "type": "paraphrases",
                "title": "言い換え類義",
                "titleEn": "Paraphrases",
                "pageRef": "p.33",
                "instruction": "＿＿に意味が最も近いものを、１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "母は兄の<ruby>家族<rt>かぞく</rt></ruby>と<u><ruby>暮<rt>く</rt></ruby>らしている</u>。",
                        "options": [
                            "1. 旅行している",
                            "2. 生活している",
                            "3. <ruby>宿泊<rt>しゅくはく</rt></ruby>している",
                            "4. 外出している"
                        ],
                        "correct": 2,
                        "correctOption": "2. 生活している"
                    },
                    {
                        "number": 2,
                        "stem": "学生たちはいすの横に立って、<u>おじぎした</u>。",
                        "options": ["1. 頭を下げた", "2. 上を向いた", "3. 首をふった", "4. 手をたたいた"],
                        "correct": 1,
                        "correctOption": "1. 頭を下げた"
                    },
                    {
                        "number": 3,
                        "stem": "<u>お<ruby>年寄<rt>としよ</rt></ruby>り</u>に道を聞かれた。",
                        "options": [
                            "1. <ruby>高齢者<rt>こうれいしゃ</rt></ruby>",
                            "2. <ruby>先輩<rt>せんぱい</rt></ruby>",
                            "3. <ruby>後輩<rt>こうはい</rt></ruby>",
                            "4. <ruby>祖父母<rt>そふぼ</rt></ruby>"
                        ],
                        "correct": 1,
                        "correctOption": "1. <ruby>高齢者<rt>こうれいしゃ</rt></ruby>"
                    },
                    {
                        "number": 4,
                        "stem": "<ruby>出張<rt>しゅっちょう</rt></ruby>の<u>支度</u>が終わってから、昼休みを取ろうと思います。",
                        "options": [
                            "1. <ruby>報告<rt>ほうこく</rt></ruby>",
                            "2. <ruby>確認<rt>かくにん</rt></ruby>",
                            "3. <ruby>反省<rt>はんせい</rt></ruby>",
                            "4. <ruby>準備<rt>じゅんび</rt></ruby>"
                        ],
                        "correct": 4,
                        "correctOption": "4. <ruby>準備<rt>じゅんび</rt></ruby>"
                    },
                    {
                        "number": 5,
                        "stem": "<u>まもなく</u>3番線に電車がまいります。",
                        "options": ["1. おそらく", "2. たびたび", "3. もうすぐ", "4. きゅうに"],
                        "correct": 3,
                        "correctOption": "3. もうすぐ"
                    }
                ]
            }
        ]
    },

    # ==================== WEEK 2 DAY 5 ====================
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w02-d05",
        "week": 2,
        "day": 5,
        "weekTitle": "第2週",
        "dayTitle": "5日目",
        "sectionTitle": "文脈規定・言い換え類義",
        "sectionTitleEn": "Contextually-defined expressions & Paraphrases",
        "subSections": [
            {
                "type": "contextually_defined_expressions",
                "title": "文脈規定",
                "titleEn": "Contextually-defined expressions",
                "pageRef": "pp.34-35",
                "instruction": "（　　）に入れるのに最もよいものを、１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "漢字は、何回も（　　）書くと覚えられます",
                        "options": ["1. うらがえして", "2. くりかえして", "3. ころがして", "4. かさねて"],
                        "correct": 2,
                        "correctOption": "2. くりかえして"
                    },
                    {
                        "number": 2,
                        "stem": "散歩をしていたら、子どものころに<ruby>流行<rt>りゅうこう</rt></ruby>した（　　）曲が聞こえてきた。",
                        "options": ["1. したい", "2. おしい", "3. なつかしい", "4. くやしい"],
                        "correct": 3,
                        "correctOption": "3. なつかしい"
                    },
                    {
                        "number": 3,
                        "stem": "<ruby>寝<rt>ね</rt></ruby>る時間も食事の時間も決まっていない（　　）生活は、体によくない。",
                        "options": [
                            "1. <ruby>不規則<rt>ふきそく</rt></ruby>な",
                            "2. <ruby>不器用<rt>ぶきよう</rt></ruby>な",
                            "3. <ruby>不自由<rt>ふじゆう</rt></ruby>な",
                            "4. <ruby>不可能<rt>ふかのう</rt></ruby>な"
                        ],
                        "correct": 1,
                        "correctOption": "1. <ruby>不規則<rt>ふきそく</rt></ruby>な"
                    },
                    {
                        "number": 4,
                        "stem": "進学のことで<ruby>悩<rt>なや</rt></ruby>んでいたとき、<ruby>先輩<rt>せんぱい</rt></ruby>が（　　）をしてくれた。",
                        "options": ["1. アンケート", "2. アドバイス", "3. カンニング", "4. カバー"],
                        "correct": 2,
                        "correctOption": "2. アドバイス"
                    },
                    {
                        "number": 5,
                        "stem": "（　　）が悪かったけれど、少し休んだらよくなりました。",
                        "options": [
                            "1. <ruby>具合<rt>ぐあい</rt></ruby>",
                            "2. <ruby>都合<rt>つごう</rt></ruby>",
                            "3. <ruby>機会<rt>きかい</rt></ruby>",
                            "4. <ruby>全体<rt>ぜんたい</rt></ruby>"
                        ],
                        "correct": 1,
                        "correctOption": "1. <ruby>具合<rt>ぐあい</rt></ruby>"
                    },
                    {
                        "number": 6,
                        "stem": "二人は教室の<ruby>隅<rt>すみ</rt></ruby>で何か（　　）話している。",
                        "options": ["1. ひらひら", "2. ごろごろ", "3. ひそひそ", "4. ぼろぼろ"],
                        "correct": 3,
                        "correctOption": "3. ひそひそ"
                    },
                    {
                        "number": 7,
                        "stem": "10年後何をしているのか、自分の将来を（　　）する。",
                        "options": [
                            "1. <ruby>観察<rt>かんさつ</rt></ruby>",
                            "2. <ruby>発見<rt>はっけん</rt></ruby>",
                            "3. <ruby>予定<rt>よてい</rt></ruby>",
                            "4. <ruby>想像<rt>そうぞう</rt></ruby>"
                        ],
                        "correct": 4,
                        "correctOption": "4. <ruby>想像<rt>そうぞう</rt></ruby>"
                    },
                    {
                        "number": 8,
                        "stem": "2回<ruby>続<rt>つづ</rt></ruby>けて受験に<ruby>失敗<rt>しっぱい</rt></ruby>して、<ruby>彼<rt>かれ</rt></ruby>はすっかり（　　）をなくしてしまった。",
                        "options": [
                            "1. <ruby>実力<rt>じつりょく</rt></ruby>",
                            "2. <ruby>自信<rt>じしん</rt></ruby>",
                            "3. <ruby>長所<rt>ちょうしょ</rt></ruby>",
                            "4. <ruby>責任<rt>せきにん</rt></ruby>"
                        ],
                        "correct": 2,
                        "correctOption": "2. <ruby>自信<rt>じしん</rt></ruby>"
                    },
                    {
                        "number": 9,
                        "stem": "この映画は、家を出る<ruby>息子<rt>むすこ</rt></ruby>を父親が静かに見送る（　　）が<ruby>感動的<rt>かんどうてき</rt></ruby>です。",
                        "options": [
                            "1. <ruby>景色<rt>けしき</rt></ruby>",
                            "2. <ruby>範囲<rt>はんい</rt></ruby>",
                            "3. <ruby>画面<rt>がめん</rt></ruby>",
                            "4. <ruby>場面<rt>ばめん</rt></ruby>"
                        ],
                        "correct": 4,
                        "correctOption": "4. <ruby>場面<rt>ばめん</rt></ruby>"
                    },
                    {
                        "number": 10,
                        "stem": "さっきメールを（　　）ました。今から返事を送ります。",
                        "options": ["1. 引き受け", "2. 取り出し", "3. 受け取り", "4. 受け付け"],
                        "correct": 3,
                        "correctOption": "3. 受け取り"
                    },
                    {
                        "number": 11,
                        "stem": "<ruby>就職<rt>しゅうしょく</rt></ruby>が決まったので、お世話になった先生に手紙で（　　）した。",
                        "options": [
                            "1. <ruby>報告<rt>ほうこく</rt></ruby>",
                            "2. <ruby>宣伝<rt>せんでん</rt></ruby>",
                            "3. <ruby>伝言<rt>でんごん</rt></ruby>",
                            "4. <ruby>発言<rt>はつげん</rt></ruby>"
                        ],
                        "correct": 1,
                        "correctOption": "1. <ruby>報告<rt>ほうこく</rt></ruby>"
                    }
                ]
            },
            {
                "type": "paraphrases",
                "title": "言い換え類義",
                "titleEn": "Paraphrases",
                "pageRef": "p.35",
                "instruction": "＿＿に意味が最も近いものを、１・２・３・４から一つえらんでください。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "ブラウンさんは<u>おしゃべりな</u>人だ。",
                        "options": ["1. よく笑う", "2. あまり笑わない", "3. よく話す", "4. あまり話さない"],
                        "correct": 3,
                        "correctOption": "3. よく話す"
                    },
                    {
                        "number": 2,
                        "stem": "手伝われるより、一人でやったほうが<u>かえって</u>早く終わる。",
                        "options": ["1. 反対に", "2. 非常に", "3. 実は", "4. 割合"],
                        "correct": 1,
                        "correctOption": "1. 反対に"
                    },
                    {
                        "number": 3,
                        "stem": "この<ruby>植物園<rt>しょくぶつえん</rt></ruby>では<u><ruby>珍<rt>めずら</rt></ruby>しい</u>花を見ることができる。",
                        "options": [
                            "1. <ruby>有名<rt>ゆうめい</rt></ruby>な",
                            "2. あまり見られない",
                            "3. とても大きい",
                            "4. 育てにくい"
                        ],
                        "correct": 2,
                        "correctOption": "2. あまり見られない"
                    },
                    {
                        "number": 4,
                        "stem": "この島は<ruby>自然<rt>しぜん</rt></ruby>が<u><ruby>豊<rt>ゆた</rt></ruby>かな</u>ところだ。",
                        "options": [
                            "1. 十分にある",
                            "2. 美しい",
                            "3. <ruby>壊<rt>こわ</rt></ruby>されている",
                            "4. とても少ない"
                        ],
                        "correct": 1,
                        "correctOption": "1. 十分にある"
                    },
                    {
                        "number": 5,
                        "stem": "この店はいつも<u>混んでいる</u>。",
                        "options": ["1. 品物が少ない", "2. 品物が多い", "3. 人が少ない", "4. 人が多い"],
                        "correct": 4,
                        "correctOption": "4. 人が多い"
                    }
                ]
            }
        ]
    }
]

# Write out all files
for chap in chapters:
    cid = chap["chapterId"]
    out_path = os.path.join(OUT_DIR, f"{cid}.json")
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(chap, f, ensure_ascii=False, indent=2)
    print(f"✓ Created {out_path} ({len(chap['subSections'])} subSections)")

print(f"\n✅ All {len(chapters)} chapter files written to {OUT_DIR}")
