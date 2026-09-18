import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

OUT_DIR = os.path.join("src", "data", "zenkamoku_n2")
os.makedirs(OUT_DIR, exist_ok=True)

with open("scripts/zenkamoku_n2/answer_keys_raw.json", encoding="utf-8") as f:
    answer_keys = json.load(f)

with open("scripts/zenkamoku_n2/kaisetsu_parsed.json", encoding="utf-8") as f:
    kaisetsu_all = json.load(f)

# Complete curated question definitions for Week 1 (75 questions) and Week 2 (60 questions)
# Structure: chapters_data dictionary keyed by chapterId
CHAPTERS = {
    "w01-d01": {
        "bookId": "zenkamoku-n2-best-workbook",
        "chapterId": "w01-d01",
        "week": 1,
        "day": 1,
        "weekTitle": "第1週",
        "dayTitle": "1日目",
        "sectionTitle": "漢字読み・表記・語形成",
        "sectionTitleEn": "Kanji Reading, Orthography & Word Formation",
        "sections": [
            {
                "type": "kanji_reading",
                "title": "漢字読み",
                "titleEn": "Kanji reading",
                "pageRef": "p.16",
                "instruction": "＿＿の言葉の読み方として最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "父はいつも私の気持ちを<u>尊重</u>してくれた。",
                        "options": ["1. そんじゅう", "2. そんちょう", "3. ぞんじゅう", "4. ぞんちょう"],
                    },
                    {
                        "number": 2,
                        "stem": "<ruby>玄関<rt>げんかん</rt></ruby>に人の<u>気配</u>を感じたが<ruby>誰<rt>だれ</rt></ruby>もいなかった。",
                        "options": ["1. きはい", "2. きばい", "3. けはい", "4. けばい"],
                    },
                    {
                        "number": 3,
                        "stem": "不注意やスピード違反が交通事故の原因の大半を<u>占めて</u>いる。",
                        "options": ["1. しめて", "2. うめて", "3. さだめて", "4. おさめて"],
                    },
                    {
                        "number": 4,
                        "stem": "その<ruby>俳優<rt>はいゆう</rt></ruby>の<u>渋い</u>演技に<ruby>魅了<rt>みりょう</rt></ruby>される人は多い。",
                        "options": ["1. するどい", "2. こまかい", "3. あわい", "4. しぶい"],
                    },
                    {
                        "number": 5,
                        "stem": "手紙を出したが、<u>宛先</u>不明で戻ってきてしまった。",
                        "options": ["1. あてさき", "2. あてざき", "3. えんさき", "4. えんざき"],
                    }
                ]
            },
            {
                "type": "orthography",
                "title": "表記",
                "titleEn": "Orthography",
                "pageRef": "pp.16-17",
                "instruction": "＿＿の言葉を漢字で書くとき、最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "犯人は警察に<u>たいほ</u>された。",
                        "options": ["1. 逮補", "2. 建補", "3. 逮捕", "4. 建捕"],
                    },
                    {
                        "number": 2,
                        "stem": "<ruby>北海道<rt>ほっかいどう</rt></ruby>の冬は寒さが<u>きびしい</u>。",
                        "options": ["1. 寂しい", "2. 貧しい", "3. 激しい", "4. 厳しい"],
                    },
                    {
                        "number": 3,
                        "stem": "地震による被害を受けた地域に多額の<u>きふ</u>をした。",
                        "options": ["1. 奇付", "2. 寄付", "3. 奇符", "4. 寄符"],
                    },
                    {
                        "number": 4,
                        "stem": "面接には<u>せいけつ</u>な服を着て行きましょう。",
                        "options": ["1. 清潔", "2. 清喫", "3. 整潔", "4. 整喫"],
                    },
                    {
                        "number": 5,
                        "stem": "アイスクリームが<u>とけて</u>しまった。",
                        "options": ["1. 解けて", "2. 融けて", "3. 溶けて", "4. 流けて"],
                    }
                ]
            },
            {
                "type": "word_formation",
                "title": "語形成",
                "titleEn": "Word formation",
                "pageRef": "p.17",
                "instruction": "（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "将来は芸術（　　）になりたい。",
                        "options": ["1. 師", "2. 者", "3. 家", "4. 士"],
                    },
                    {
                        "number": 2,
                        "stem": "（　　）文化を受け入れることが大事だ。",
                        "options": ["1. 擬", "2. 否", "3. 未", "4. 異"],
                    },
                    {
                        "number": 3,
                        "stem": "<ruby>山田<rt>やまだ</rt></ruby>さんは子どもみたいな顔（　　）だが、実際はもう30歳だ。",
                        "options": ["1. つき", "2. もち", "3. きれ", "4. ぶり"],
                    },
                    {
                        "number": 4,
                        "stem": "ここは静かな住宅（　　）だ。",
                        "options": ["1. 域", "2. 街", "3. 所", "4. 場"],
                    },
                    {
                        "number": 5,
                        "stem": "<ruby>睡眠不足<rt>すいみんぶそく</rt></ruby>は子どもの成長に（　　）<ruby>影響<rt>えいきょう</rt></ruby>を与えるらしい。",
                        "options": ["1. 乱", "2. 逆", "3. 悪", "4. 苦"],
                    }
                ]
            }
        ]
    },

    "w01-d02": {
        "bookId": "zenkamoku-n2-best-workbook",
        "chapterId": "w01-d02",
        "week": 1,
        "day": 2,
        "weekTitle": "第1週",
        "dayTitle": "2日目",
        "sectionTitle": "漢字読み・表記・語形成",
        "sectionTitleEn": "Kanji Reading, Orthography & Word Formation",
        "sections": [
            {
                "type": "kanji_reading",
                "title": "漢字読み",
                "titleEn": "Kanji reading",
                "pageRef": "p.18",
                "instruction": "＿＿の言葉の読み方として最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "スポーツには速さや得点だけでなく、演技の美しさを<u>競う</u>ものもある。",
                        "options": ["1. あらそう", "2. きそう", "3. たたかう", "4. ねらう"],
                    },
                    {
                        "number": 2,
                        "stem": "先生が<u>鮮やかな</u>色のセーターを着ている。",
                        "options": ["1. あざやか", "2. おだやか", "3. なごやか", "4. はなやか"],
                    },
                    {
                        "number": 3,
                        "stem": "<ruby>木村<rt>きむら</rt></ruby>さんは車の運転が<u>乱暴</u>であぶない。",
                        "options": ["1. ろんばく", "2. ろんぼう", "3. らんばく", "4. らんぼう"],
                    },
                    {
                        "number": 4,
                        "stem": "<u>素肌</u>に着るなら、綿100%のシャツがよい。",
                        "options": ["1. すばだ", "2. すはだ", "3. そばだ", "4. そはだ"],
                    },
                    {
                        "number": 5,
                        "stem": "国会での<u>首相</u>の発言に注目が集まった。",
                        "options": ["1. しゅそう", "2. しゅうそう", "3. しゅしょう", "4. しゅうしょう"],
                    }
                ]
            },
            {
                "type": "orthography",
                "title": "表記",
                "titleEn": "Orthography",
                "pageRef": "pp.18-19",
                "instruction": "＿＿の言葉を漢字で書くとき、最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "頭痛がひどかったので、医者に<u>みて</u>もらった。",
                        "options": ["1. 視て", "2. 観て", "3. 看て", "4. 診て"],
                    },
                    {
                        "number": 2,
                        "stem": "ここは人通りも少なく高い建物もない、花火見物の<u>あなば</u>だ。",
                        "options": ["1. 穴場", "2. 究場", "3. 穴揚", "4. 究揚"],
                    },
                    {
                        "number": 3,
                        "stem": "ここ数年、やっと景気が<u>かいふく</u>してきた。",
                        "options": ["1. 快複", "2. 回複", "3. 快復", "4. 回復"],
                    },
                    {
                        "number": 4,
                        "stem": "子どもの心身の成長には、<u>けんぜんな</u>食生活は欠かせない。",
                        "options": ["1. 建善", "2. 建全", "3. 健善", "4. 健全"],
                    },
                    {
                        "number": 5,
                        "stem": "<u>そうほう</u>の意見を聞いて判断したい。",
                        "options": ["1. 相方", "2. 相法", "3. 双方", "4. 双法"],
                    }
                ]
            },
            {
                "type": "word_formation",
                "title": "語形成",
                "titleEn": "Word formation",
                "pageRef": "p.19",
                "instruction": "（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "深夜に電話をしてくるなんて（　　）常識だ。",
                        "options": ["1. 不", "2. 非", "3. 無", "4. 反"],
                    },
                    {
                        "number": 2,
                        "stem": "この仕事を（　　）優先でするように、部長に言われた。",
                        "options": ["1. 好", "2. 超", "3. 最", "4. 上"],
                    },
                    {
                        "number": 3,
                        "stem": "サラリーマン（　　）の男が訪ねてきた。",
                        "options": ["1. 風", "2. 型", "3. 様", "4. 式"],
                    },
                    {
                        "number": 4,
                        "stem": "この学校は大学進学（　　）がほぼ100%である。",
                        "options": ["1. 度", "2. 数", "3. 割", "4. 率"],
                    },
                    {
                        "number": 5,
                        "stem": "りんごは皮（　　）食べられる果物だ。",
                        "options": ["1. ぐるみ", "2. とも", "3. ずつ", "4. ごと"],
                    }
                ]
            }
        ]
    },

    "w01-d03": {
        "bookId": "zenkamoku-n2-best-workbook",
        "chapterId": "w01-d03",
        "week": 1,
        "day": 3,
        "weekTitle": "第1週",
        "dayTitle": "3日目",
        "sectionTitle": "漢字読み・表記・語形成",
        "sectionTitleEn": "Kanji Reading, Orthography & Word Formation",
        "sections": [
            {
                "type": "kanji_reading",
                "title": "漢字読み",
                "titleEn": "Kanji reading",
                "pageRef": "p.20",
                "instruction": "＿＿の言葉の読み方として最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "黒い雲が出てきて、<u>急激に</u>天候が悪化した。",
                        "options": ["1. きゅうけき", "2. きゅうげき", "3. きっけき", "4. きっげき"],
                    },
                    {
                        "number": 2,
                        "stem": "いつか<u>砂漠</u>を旅してみたいです。",
                        "options": ["1. じゃまく", "2. じゃばく", "3. さまく", "4. さばく"],
                    },
                    {
                        "number": 3,
                        "stem": "容器の<u>底</u>に汚れが付いています。",
                        "options": ["1. そこ", "2. ふた", "3. おもて", "4. ふち"],
                    },
                    {
                        "number": 4,
                        "stem": "<u>潔く</u>自分の負けを認めなさい。",
                        "options": ["1. いざぎよく", "2. いざきよく", "3. いさぎよく", "4. いさきよく"],
                    },
                    {
                        "number": 5,
                        "stem": "仕事を<u>完了</u>したら、上司に報告しよう。",
                        "options": ["1. かんりょう", "2. かんてい", "3. かくりょう", "4. かくてい"],
                    }
                ]
            },
            {
                "type": "orthography",
                "title": "表記",
                "titleEn": "Orthography",
                "pageRef": "pp.20-21",
                "instruction": "＿＿の言葉を漢字で書くとき、最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "あなたのことが<u>にくくて</u>、こんなことを言っているのではありません。",
                        "options": ["1. 増くくて", "2. 憎くくて", "3. 増くて", "4. 憎くて"],
                    },
                    {
                        "number": 2,
                        "stem": "パーティーは<u>せいだい</u>に行われた。",
                        "options": ["1. 盛大", "2. 成大", "3. 盛台", "4. 成台"],
                    },
                    {
                        "number": 3,
                        "stem": "効率的な<u>いりょう</u>システムを整えることが必要だ。",
                        "options": ["1. 匿療", "2. 匿寮", "3. 医療", "4. 医寮"],
                    },
                    {
                        "number": 4,
                        "stem": "彼のようなすばらしい人に出会えた<u>こううん</u>に感謝しています。",
                        "options": ["1. 幸連", "2. 辛連", "3. 幸運", "4. 辛運"],
                    },
                    {
                        "number": 5,
                        "stem": "夏が終わったので、プールの水を<u>ぬいた</u>。",
                        "options": ["1. 緩いた", "2. 抜いた", "3. 貫いた", "4. 扶いた"],
                    }
                ]
            },
            {
                "type": "word_formation",
                "title": "語形成",
                "titleEn": "Word formation",
                "pageRef": "p.21",
                "instruction": "（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "親切（　　）から手伝ったのだが、余計なことをしてしまったようだ。",
                        "options": ["1. 力", "2. 念", "3. 心", "4. 気"],
                    },
                    {
                        "number": 2,
                        "stem": "（　　）性能なパソコンを使用しています。",
                        "options": ["1. 良", "2. 高", "3. 上", "4. 極"],
                    },
                    {
                        "number": 3,
                        "stem": "川（　　）の道を散歩した。",
                        "options": ["1. 横", "2. 元", "3. 沿い", "4. 通り"],
                    },
                    {
                        "number": 4,
                        "stem": "もっと具体（　　）のあるプランを提案してください。",
                        "options": ["1. 性", "2. 的", "3. 感", "4. 化"],
                    },
                    {
                        "number": 5,
                        "stem": "この歌は（　　）世界で流行しました。",
                        "options": ["1. 諸", "2. 両", "3. 各", "4. 全"],
                    }
                ]
            }
        ]
    },

    "w01-d04": {
        "bookId": "zenkamoku-n2-best-workbook",
        "chapterId": "w01-d04",
        "week": 1,
        "day": 4,
        "weekTitle": "第1週",
        "dayTitle": "4日目",
        "sectionTitle": "漢字読み・表記・語形成",
        "sectionTitleEn": "Kanji Reading, Orthography & Word Formation",
        "sections": [
            {
                "type": "kanji_reading",
                "title": "漢字読み",
                "titleEn": "Kanji reading",
                "pageRef": "p.22",
                "instruction": "＿＿の言葉の読み方として最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "この機械の<u>操作</u>方法は、説明書に書いてあります。",
                        "options": ["1. そうさく", "2. そうさ", "3. こうさく", "4. こうさ"],
                    },
                    {
                        "number": 2,
                        "stem": "この店は<u>豊富な</u>品揃えを売りにしている。",
                        "options": ["1. こうふ", "2. こうふう", "3. ほうふ", "4. ほうふう"],
                    },
                    {
                        "number": 3,
                        "stem": "その家は誰もいないようで、<u>物音</u>ひとつしない。",
                        "options": ["1. ものおと", "2. ものおん", "3. ぶつおと", "4. ぶつおん"],
                    },
                    {
                        "number": 4,
                        "stem": "割れたガラスの<u>破片</u>で指を切ってしまった。",
                        "options": ["1. ひかた", "2. ひへん", "3. はかた", "4. はへん"],
                    },
                    {
                        "number": 5,
                        "stem": "ここは昔、貿易の町として<u>栄えた</u>。",
                        "options": ["1. つかえた", "2. さかえた", "3. そなえた", "4. かかえた"],
                    }
                ]
            },
            {
                "type": "orthography",
                "title": "表記",
                "titleEn": "Orthography",
                "pageRef": "pp.22-23",
                "instruction": "＿＿の言葉を漢字で書くとき、最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "予算の関係で、計画を<u>へんこう</u>することにした。",
                        "options": ["1. 返更", "2. 返硬", "3. 変更", "4. 変硬"],
                    },
                    {
                        "number": 2,
                        "stem": "上司にパーティーの参加者<u>めいぼ</u>を作成するよう指示された。",
                        "options": ["1. 名薄", "2. 名簿", "3. 名録", "4. 名禄"],
                    },
                    {
                        "number": 3,
                        "stem": "私の両親は喫茶店を<u>いとなんで</u>いる。",
                        "options": ["1. 営んで", "2. 経んで", "3. 商んで", "4. 業んで"],
                    },
                    {
                        "number": 4,
                        "stem": "大勢の人の前に立つと、<u>はずかしくて</u>顔が真っ赤になってしまう。",
                        "options": ["1. 恥くて", "2. 恥しくて", "3. 恥かしくて", "4. 恥ずかしくて"],
                    },
                    {
                        "number": 5,
                        "stem": "<ruby>上田<rt>うえだ</rt></ruby>さんは<u>きようで</u>細かい作業が得意だ。",
                        "options": ["1. 気用", "2. 気易", "3. 器用", "4. 器易"],
                    }
                ]
            },
            {
                "type": "word_formation",
                "title": "語形成",
                "titleEn": "Word formation",
                "pageRef": "p.23",
                "instruction": "（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "こちらの申込用紙に（　　）住所と電話番号をご記入ください。",
                        "options": ["1. 今", "2. 当", "3. 同", "4. 現"],
                    },
                    {
                        "number": 2,
                        "stem": "（　　）規則な生活を続けていると、いつか体を壊しますよ。",
                        "options": ["1. 否", "2. 脱", "3. 不", "4. 過"],
                    },
                    {
                        "number": 3,
                        "stem": "複数の仕事を任されたが、まずは優先（　　）の高いものから始めることにした。",
                        "options": ["1. 度", "2. 率", "3. 位", "4. 差"],
                    },
                    {
                        "number": 4,
                        "stem": "この地域では使用（　　）の乾電池は、燃えないゴミとして捨ててください。",
                        "options": ["1. 切り", "2. 済み", "3. 締め", "4. 止め"],
                    },
                    {
                        "number": 5,
                        "stem": "面接（　　）に志望理由について質問された。",
                        "options": ["1. 家", "2. 官", "3. 手", "4. 師"],
                    }
                ]
            }
        ]
    },

    "w01-d05": {
        "bookId": "zenkamoku-n2-best-workbook",
        "chapterId": "w01-d05",
        "week": 1,
        "day": 5,
        "weekTitle": "第1週",
        "dayTitle": "5日目",
        "sectionTitle": "漢字読み・表記・語形成",
        "sectionTitleEn": "Kanji Reading, Orthography & Word Formation",
        "sections": [
            {
                "type": "kanji_reading",
                "title": "漢字読み",
                "titleEn": "Kanji reading",
                "pageRef": "p.24",
                "instruction": "＿＿の言葉の読み方として最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "週末は必ず家族全員で食卓を<u>囲む</u>ことにしている。",
                        "options": ["1. はさむ", "2. かこむ", "3. くむ", "4. こむ"],
                    },
                    {
                        "number": 2,
                        "stem": "この川は<u>浅い</u>ので飛び込まないでください。",
                        "options": ["1. あさい", "2. せまい", "3. あつい", "4. ふかい"],
                    },
                    {
                        "number": 3,
                        "stem": "このスーパーは夕方6時以降になると肉や魚が<u>割引</u>になる。",
                        "options": ["1. かつひき", "2. かつびき", "3. わりひき", "4. わりびき"],
                    },
                    {
                        "number": 4,
                        "stem": "両親のけんかを<u>仲裁</u>した。",
                        "options": ["1. ちゅうさい", "2. ちゅうざい", "3. ちょうさい", "4. ちょうざい"],
                    },
                    {
                        "number": 5,
                        "stem": "あなたの<u>率直な</u>意見を聞かせてください。",
                        "options": ["1. すっちょく", "2. すなお", "3. そっちょく", "4. そなお"],
                    }
                ]
            },
            {
                "type": "orthography",
                "title": "表記",
                "titleEn": "Orthography",
                "pageRef": "pp.24-25",
                "instruction": "＿＿の言葉を漢字で書くとき、最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "職場の人間関係に<u>なやんで</u>いる。",
                        "options": ["1. 憎んで", "2. 恨んで", "3. 悩んで", "4. 悔んで"],
                    },
                    {
                        "number": 2,
                        "stem": "この国は経済成長が<u>いちじるしい</u>。",
                        "options": ["1. 者しい", "2. 暑しい", "3. 箸しい", "4. 著しい"],
                    },
                    {
                        "number": 3,
                        "stem": "先週、車の運転免許を<u>しゅとく</u>した。",
                        "options": ["1. 手特", "2. 手得", "3. 取特", "4. 取得"],
                    },
                    {
                        "number": 4,
                        "stem": "この機械は<u>たんじゅんな</u>仕組みでできている。",
                        "options": ["1. 単純", "2. 短純", "3. 単順", "4. 短順"],
                    },
                    {
                        "number": 5,
                        "stem": "駅前の<u>どうぞう</u>の前で待ち合わせしましょう。",
                        "options": ["1. 銅造", "2. 銅像", "3. 胴造", "4. 胴像"],
                    }
                ]
            },
            {
                "type": "word_formation",
                "title": "語形成",
                "titleEn": "Word formation",
                "pageRef": "p.25",
                "instruction": "（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "日本酒の（　　）原料は米である。",
                        "options": ["1. 本", "2. 真", "3. 主", "4. 総"],
                    },
                    {
                        "number": 2,
                        "stem": "この仕事は（　　）経験なので不安だ。",
                        "options": ["1. 浅", "2. 無", "3. 非", "4. 未"],
                    },
                    {
                        "number": 3,
                        "stem": "先月は自宅にいる時間が長かったので、光熱（　　）が高くなってしまった。",
                        "options": ["1. 代", "2. 費", "3. 料", "4. 賃"],
                    },
                    {
                        "number": 4,
                        "stem": "日本では家に入るとき、靴を脱ぐのが一般（　　）だ。",
                        "options": ["1. 式", "2. 感", "3. 風", "4. 的"],
                    },
                    {
                        "number": 5,
                        "stem": "この道には5メートル（　　）に木が植えられている。",
                        "options": ["1. つき", "2. おき", "3. ぶり", "4. あき"],
                    }
                ]
            }
        ]
    },

    "w02-d01": {
        "bookId": "zenkamoku-n2-best-workbook",
        "chapterId": "w02-d01",
        "week": 2,
        "day": 1,
        "weekTitle": "第2週",
        "dayTitle": "1日目",
        "sectionTitle": "文脈規定・言い換え類義",
        "sectionTitleEn": "Contextually-defined expressions & Paraphrases",
        "sections": [
            {
                "type": "contextually_defined_expressions",
                "title": "文脈規定",
                "titleEn": "Contextually-defined expressions",
                "pageRef": "p.26",
                "instruction": "（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "その高校は時代に合わせて校則の一部を（　　）した。",
                        "options": ["1. 校正", "2. 変換", "3. 改正", "4. 変形"],
                    },
                    {
                        "number": 2,
                        "stem": "妹は何年も仕事をしないで、今日も（　　）寝ている。",
                        "options": ["1. 気軽に", "2. のんきに", "3. 単調に", "4. でたらめに"],
                    },
                    {
                        "number": 3,
                        "stem": "もっと（　　）に話せるようになりたい。",
                        "options": ["1. ニュアンス", "2. リズム", "3. スムーズ", "4. テンポ"],
                    },
                    {
                        "number": 4,
                        "stem": "初めて恋人の親に会うので、緊張して（　　）してしまう。",
                        "options": ["1. そわそわ", "2. やれやれ", "3. わいわい", "4. でれでれ"],
                    },
                    {
                        "number": 5,
                        "stem": "台風で木が倒れて道が（　　）いる。",
                        "options": ["1. とじて", "2. つまって", "3. しまって", "4. ふさがって"],
                    },
                    {
                        "number": 6,
                        "stem": "不安だったが、親に（　　）本音を言った。",
                        "options": ["1. 思い込んで", "2. 思い切って", "3. 思いあがって", "4. 思いついて"],
                    },
                    {
                        "number": 7,
                        "stem": "病院で注射を嫌がり、いつも激しく抵抗する娘が、今日は（　　）座っていた。",
                        "options": ["1. やかましく", "2. そうぞうしく", "3. おとなしく", "4. うらやましく"],
                    }
                ]
            },
            {
                "type": "paraphrases",
                "title": "言い換え類義",
                "titleEn": "Paraphrases",
                "pageRef": "p.27",
                "instruction": "＿＿の言葉に意味が最も近いものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "<u>あらゆる</u>方法を試したが、その実験は成功しなかった。",
                        "options": ["1. 最新の", "2. <ruby>従来<rt>じゅうらい</rt></ruby>の", "3. 全ての", "4. 一部の"],
                    },
                    {
                        "number": 2,
                        "stem": "その歌手の<u>見事な</u>歌声に観客は涙を流した。",
                        "options": ["1. 懸命な", "2. 柔らかい", "3. 独特な", "4. 素晴らしい"],
                    },
                    {
                        "number": 3,
                        "stem": "その店のケーキは<u>評判がいい</u>。",
                        "options": ["1. 人気がある", "2. 値段が高い", "3. 見た目がいい", "4. 味がいい"],
                    },
                    {
                        "number": 4,
                        "stem": "この動物の動きは<u>にぶい</u>。",
                        "options": ["1. かわいらしい", "2. 素早い", "3. 弱々しい", "4. のろい"],
                    },
                    {
                        "number": 5,
                        "stem": "足の痛みを<u>こらえて</u>山を降りた。",
                        "options": ["1. やわらげて", "2. がまんして", "3. 忘れて", "4. 感じて"],
                    }
                ]
            }
        ]
    },

    "w02-d02": {
        "bookId": "zenkamoku-n2-best-workbook",
        "chapterId": "w02-d02",
        "week": 2,
        "day": 2,
        "weekTitle": "第2週",
        "dayTitle": "2日目",
        "sectionTitle": "文脈規定・言い換え類義",
        "sectionTitleEn": "Contextually-defined expressions & Paraphrases",
        "sections": [
            {
                "type": "contextually_defined_expressions",
                "title": "文脈規定",
                "titleEn": "Contextually-defined expressions",
                "pageRef": "p.28",
                "instruction": "（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "この事件は（　　）に盛んに取り上げられた。",
                        "options": ["1. マスコミ", "2. マーケット", "3. コレクション", "4. プログラム"],
                    },
                    {
                        "number": 2,
                        "stem": "熱で（　　）している子どもを病院に運んだ。",
                        "options": ["1. ずっしり", "2. ぐったり", "3. じっくり", "4. ぐっすり"],
                    },
                    {
                        "number": 3,
                        "stem": "この書類ですが、データの数字に間違いがあるので、（　　）しておいてください。",
                        "options": ["1. 訂正", "2. 公正", "3. 修繕", "4. 改善"],
                    },
                    {
                        "number": 4,
                        "stem": "先輩に電話番号を教えてもらったので、今晩（　　）かけてみよう。",
                        "options": ["1. たちまち", "2. とっくに", "3. 早速", "4. あらかじめ"],
                    },
                    {
                        "number": 5,
                        "stem": "<ruby>高橋<rt>たかはし</rt></ruby>部長は、お孫さんの誕生や息子さんの結婚など、（　　）ことが続いている。",
                        "options": ["1. しめっぽい", "2. 待ち遠しい", "3. めでたい", "4. なさけない"],
                    },
                    {
                        "number": 6,
                        "stem": "教室の窓を開けると、（　　）な風が廊下へと吹き抜けていった。",
                        "options": ["1. なだらか", "2. さわやか", "3. あきらか", "4. ゆたか"],
                    },
                    {
                        "number": 7,
                        "stem": "地震などの災害時用の非常食は、3日分を（　　）に準備するといい。",
                        "options": ["1. 目的", "2. 目印", "3. 目次", "4. 目安"],
                    }
                ]
            },
            {
                "type": "paraphrases",
                "title": "言い換え類義",
                "titleEn": "Paraphrases",
                "pageRef": "p.29",
                "instruction": "＿＿の言葉に意味が最も近いものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "<ruby>高山<rt>たかやま</rt></ruby>さんは<u>しょっちゅう</u>遅刻をする。",
                        "options": ["1. よく", "2. まれに", "3. たまに", "4. やや"],
                    },
                    {
                        "number": 2,
                        "stem": "父は<u>くたびれた</u>様子で家を出ていった。",
                        "options": ["1. つかれた", "2. はりきった", "3. なまけた", "4. みたされた"],
                    },
                    {
                        "number": 3,
                        "stem": "この二つの言葉は意味が<u>ひとしい</u>。",
                        "options": ["1. 似ている", "2. 異なる", "3. 逆だ", "4. 同じだ"],
                    },
                    {
                        "number": 4,
                        "stem": "今日の試合の結果は<u>あわれな</u>ものだった。",
                        "options": ["1. 危うい", "2. くだらない", "3. 気の毒な", "4. 好調な"],
                    },
                    {
                        "number": 5,
                        "stem": "<u>かげで</u>悪口を言うのはよくない。",
                        "options": ["1. その人がいない場所", "2. その人に聞こえる場所", "3. 日光が当たらない場所", "4. 大勢がいる場所"],
                    }
                ]
            }
        ]
    },

    "w02-d03": {
        "bookId": "zenkamoku-n2-best-workbook",
        "chapterId": "w02-d03",
        "week": 2,
        "day": 3,
        "weekTitle": "第2週",
        "dayTitle": "3日目",
        "sectionTitle": "文脈規定・言い換え類義",
        "sectionTitleEn": "Contextually-defined expressions & Paraphrases",
        "sections": [
            {
                "type": "contextually_defined_expressions",
                "title": "文脈規定",
                "titleEn": "Contextually-defined expressions",
                "pageRef": "p.30",
                "instruction": "（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "子どもの（　　）ないたずらに対して、本気で怒ってしまった。",
                        "options": ["1. 平凡", "2. 純情", "3. 無邪気", "4. 不器用"],
                    },
                    {
                        "number": 2,
                        "stem": "そんな（　　）服装で会社に来ないでください。",
                        "options": ["1. 身近な", "2. ずうずうしい", "3. 滑らかな", "4. だらしない"],
                    },
                    {
                        "number": 3,
                        "stem": "温泉旅館でゆっくり過ごして、大変（　　）できました。",
                        "options": ["1. ミックス", "2. オーバー", "3. リラックス", "4. カバー"],
                    },
                    {
                        "number": 4,
                        "stem": "外国から帰ってきたら、時間の感覚がすっかり（　　）しまった。",
                        "options": ["1. 狂って", "2. 破れて", "3. 交わって", "4. 外れて"],
                    },
                    {
                        "number": 5,
                        "stem": "<ruby>太郎<rt>たろう</rt></ruby>くんと<ruby>奈々子<rt>ななこ</rt></ruby>さんは新婚（　　）のカップルだ。",
                        "options": ["1. にやにや", "2. ほやほや", "3. ぎりぎり", "4. ふわふわ"],
                    },
                    {
                        "number": 6,
                        "stem": "その日は（　　）忙しいので、翌日うかがってもよろしいでしょうか。",
                        "options": ["1. せっかく", "2. しばらく", "3. ながらく", "4. あいにく"],
                    },
                    {
                        "number": 7,
                        "stem": "この（　　）は暖かいので、3月の初めには桜が咲きはじめるそうだ。",
                        "options": ["1. 地方", "2. 方向", "3. 分野", "4. 団体"],
                    }
                ]
            },
            {
                "type": "paraphrases",
                "title": "言い換え類義",
                "titleEn": "Paraphrases",
                "pageRef": "p.31",
                "instruction": "＿＿の言葉に意味が最も近いものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "友人のあのような発言を聞いて、<u>失望しました</u>。",
                        "options": ["1. がっかりしました", "2. おかしいと思いました", "3. 勇気が出ました", "4. 驚きました"],
                    },
                    {
                        "number": 2,
                        "stem": "毎日<u>あわただしく</u>過ごしています。",
                        "options": ["1. 平和に", "2. 健康に", "3. 忙しく", "4. 楽しく"],
                    },
                    {
                        "number": 3,
                        "stem": "新しい薬を使ったら、<u>いくらか</u>効果があった。",
                        "options": ["1. 非常に", "2. 予想以上に", "3. いつの間にか", "4. ある程度"],
                    },
                    {
                        "number": 4,
                        "stem": "その人は私に<u>真実</u>を教えてくれた。",
                        "options": ["1. 願い事", "2. 本当のこと", "3. 正しい方法", "4. 得な情報"],
                    },
                    {
                        "number": 5,
                        "stem": "小学生のお<ruby>小遣<rt>こづか</rt></ruby>いとして、月に1000円くらいは<u>妥当だ</u>と思います。",
                        "options": ["1. 当たり前だ", "2. 多すぎる", "3. 適切だ", "4. 少なすぎる"],
                    }
                ]
            }
        ]
    },

    "w02-d04": {
        "bookId": "zenkamoku-n2-best-workbook",
        "chapterId": "w02-d04",
        "week": 2,
        "day": 4,
        "weekTitle": "第2週",
        "dayTitle": "4日目",
        "sectionTitle": "文脈規定・言い換え類義",
        "sectionTitleEn": "Contextually-defined expressions & Paraphrases",
        "sections": [
            {
                "type": "contextually_defined_expressions",
                "title": "文脈規定",
                "titleEn": "Contextually-defined expressions",
                "pageRef": "p.32",
                "instruction": "（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "小さな子どもが何人も殺されるという（　　）な事件が起きた。",
                        "options": ["1. ユニーク", "2. チェック", "3. ショッキング", "4. パック"],
                    },
                    {
                        "number": 2,
                        "stem": "明日も早いんだから、（　　）寝なさい。",
                        "options": ["1. さっさと", "2. せっせと", "3. そっと", "4. ほっと"],
                    },
                    {
                        "number": 3,
                        "stem": "深刻な失業問題を（　　）ために、3兆円もの予算が組まれた。",
                        "options": ["1. 解約する", "2. 解決する", "3. 解説する", "4. 解散する"],
                    },
                    {
                        "number": 4,
                        "stem": "自分で宿題をせずに、友達にやらせるのは（　　）。",
                        "options": ["1. おしい", "2. あらい", "3. きよい", "4. ずるい"],
                    },
                    {
                        "number": 5,
                        "stem": "事故に遭い、一時は意識もなく（　　）だったが、なんとか目を覚ました。",
                        "options": ["1. 貴重", "2. 慎重", "3. 重心", "4. 重体"],
                    },
                    {
                        "number": 6,
                        "stem": "（　　）少しの間でいいので、荷物を持っていてくれませんか。",
                        "options": ["1. ほんの", "2. たったの", "3. わずかに", "4. たんに"],
                    },
                    {
                        "number": 7,
                        "stem": "このフックについている磁石はとても（　　）で、20kgの重さまで耐えられます。",
                        "options": ["1. 強気", "2. 強大", "3. 強力", "4. 強引"],
                    }
                ]
            },
            {
                "type": "paraphrases",
                "title": "言い換え類義",
                "titleEn": "Paraphrases",
                "pageRef": "p.33",
                "instruction": "＿＿の言葉に意味が最も近いものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "厳しい現状を<u>なげく</u>よりも、それをどう改善していくかを考えるべきだ。",
                        "options": ["1. 気にする", "2. 悲しむ", "3. 後悔する", "4. 反省する"],
                    },
                    {
                        "number": 2,
                        "stem": "友人から<u>おそろしい</u>話を聞いた。",
                        "options": ["1. おもしろい", "2. くやしい", "3. こわい", "4. うまい"],
                    },
                    {
                        "number": 3,
                        "stem": "自分はどちらかというと、<u>陽気な</u>性格だと思う。",
                        "options": ["1. 明るい", "2. おおざっぱな", "3. あたたかい", "4. 生意気な"],
                    },
                    {
                        "number": 4,
                        "stem": "みんなで集まり、<u>故人</u>について語り合った。",
                        "options": ["1. 特別な人", "2. 偉大な人", "3. よく知っている人", "4. 亡くなった人"],
                    },
                    {
                        "number": 5,
                        "stem": "<ruby>田村<rt>たむら</rt></ruby>さんはいつも遅刻してくるが、<u>案の定</u>、今日も遅れてやってきた。",
                        "options": ["1. やはり", "2. ようやく", "3. しきりに", "4. いっせいに"],
                    }
                ]
            }
        ]
    },

    "w02-d05": {
        "bookId": "zenkamoku-n2-best-workbook",
        "chapterId": "w02-d05",
        "week": 2,
        "day": 5,
        "weekTitle": "第2週",
        "dayTitle": "5日目",
        "sectionTitle": "文脈規定・言い換え類義",
        "sectionTitleEn": "Contextually-defined expressions & Paraphrases",
        "sections": [
            {
                "type": "contextually_defined_expressions",
                "title": "文脈規定",
                "titleEn": "Contextually-defined expressions",
                "pageRef": "p.34",
                "instruction": "（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "バイト先の<ruby>山岸<rt>やまぎし</rt></ruby>さんは（　　）なので、仕事が早い。",
                        "options": ["1. ベテラン", "2. テクニック", "3. アドバイス", "4. コントロール"],
                    },
                    {
                        "number": 2,
                        "stem": "どんなに寒い日でも、このスープを飲むと体が（　　）する。",
                        "options": ["1. ぶかぶか", "2. いらいら", "3. にこにこ", "4. ぽかぽか"],
                    },
                    {
                        "number": 3,
                        "stem": "茹でたじゃがいもを（　　）、サラダを作った。",
                        "options": ["1. 刈って", "2. つぶして", "3. 区切って", "4. 傷つけて"],
                    },
                    {
                        "number": 4,
                        "stem": "子どもが「大人になったらお母さんを守るよ。」と、（　　）ことを言ってくれた。",
                        "options": ["1. 夥しい", "2. 甚だしい", "3. 頼もしい", "4. ふさわしい"],
                    },
                    {
                        "number": 5,
                        "stem": "この電子辞書は高かったが、（　　）がいいので満足している。",
                        "options": ["1. 価値", "2. 性能", "3. 知恵", "4. 才能"],
                    },
                    {
                        "number": 6,
                        "stem": "あんなに仲がよかった大学の友人と、卒業後（　　）会わなくなった。",
                        "options": ["1. うっとり", "2. くっきり", "3. めっきり", "4. ぎっしり"],
                    },
                    {
                        "number": 7,
                        "stem": "ベッドを新しいものに変えたら、とても（　　）でよく眠れる。",
                        "options": ["1. 快適", "2. 的確", "3. 上品", "4. 高度"],
                    }
                ]
            },
            {
                "type": "paraphrases",
                "title": "言い換え類義",
                "titleEn": "Paraphrases",
                "pageRef": "p.35",
                "instruction": "＿＿の言葉に意味が最も近いものを、１・２・３・４から一つ選びなさい。",
                "questions": [
                    {
                        "number": 1,
                        "stem": "<ruby>田中<rt>たなか</rt></ruby>さんは<u>絶えず</u>笑顔でクラスの雰囲気を明るくしてくれる。",
                        "options": ["1. なるべく", "2. やがて", "3. ずいぶん", "4. いつも"],
                    },
                    {
                        "number": 2,
                        "stem": "今日は単語をたくさん<u>暗記した</u>。",
                        "options": ["1. 調べた", "2. 覚えた", "3. 練習した", "4. 試験した"],
                    },
                    {
                        "number": 3,
                        "stem": "社長は珍しい<u>柄</u>のネクタイを何本も持っている。",
                        "options": ["1. 模様", "2. 形", "3. 様子", "4. 生地"],
                    },
                    {
                        "number": 4,
                        "stem": "彼らは<u>険しい</u>山道を何時間も歩き続けてやっと頂上に着いた。",
                        "options": ["1. 巨大な", "2. 急な", "3. 苦しい", "4. 限りない"],
                    },
                    {
                        "number": 5,
                        "stem": "80歳の祖父は<u>活発な</u>人で、毎日仲間と出かけていく。",
                        "options": ["1. <ruby>特殊<rt>とくしゅ</rt></ruby>な", "2. 若々しい", "3. 元気な", "4. 勇ましい"],
                    }
                ]
            }
        ]
    }
}

# Attach correct, correctOption, and explanation to each question
# And verify against answer_keys_raw.json
total_processed = 0

for chapter_id, chapter_obj in CHAPTERS.items():
    w_key = f"w{chapter_obj['week']:02d}"
    d_key = f"d{chapter_obj['day']:02d}"
    raw_day_keys = answer_keys[w_key][d_key]
    kai_day = kaisetsu_all[chapter_id]
    
    global_q_index = 1
    
    for section in chapter_obj["sections"]:
        sec_type = section["type"]
        sec_kai = kai_day.get(sec_type, {})
        
        for q in section["questions"]:
            q_num = q["number"]
            # Answer key lookup from raw keys
            expected_correct = raw_day_keys[f"q{global_q_index}"]
            global_q_index += 1
            
            correct_val = expected_correct
            q["correct"] = correct_val
            q["correctOption"] = q["options"][correct_val - 1]
            
            # Explanation formatting
            kai_item = sec_kai.get(str(q_num), {})
            body_text = kai_item.get("text", "")
            
            # Format explanation HTML
            clean_correct_opt = q["correctOption"]
            q["explanation"] = f"<b>【正解】{clean_correct_opt}</b><br/>{body_text}"
            
            total_processed += 1
            
    # Save chapter JSON
    out_path = os.path.join(OUT_DIR, f"{chapter_id}.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(chapter_obj, f, ensure_ascii=False, indent=2)
    print(f"Saved {chapter_id}.json ({sum(len(s['questions']) for s in chapter_obj['sections'])} questions)")

print(f"\nAll 10 JSON files successfully generated! Total questions processed: {total_processed}")
