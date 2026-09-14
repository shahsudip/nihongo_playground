import json
import os

def create_sets_4_5():
    # Instructions
    m1_vocab_inst = "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    m2_vocab_inst = "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    m3_vocab_inst = "問題3 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    m4_vocab_inst = "問題4 <u>　　</u>の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    m5_vocab_inst = "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"

    m1_grammar_inst = "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    m2_grammar_inst = "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    m3_grammar_inst = "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。"

    # ==========================================
    # SET 4
    # ==========================================
    set4_vocab = [
        # Mondai 1 (Q1 - Q9)
        {
            "id": 1,
            "questionText": "父は <u>夜</u> 出かけます。",
            "options": ["あさ", "ひる", "ゆうがた", "よる"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m1_vocab_inst
        },
        {
            "id": 2,
            "questionText": "あのまちは ガラスの <u>産業</u>が ゆうめいです。",
            "options": ["さぎょう", "さんぎょ", "さぎょ", "さんぎょう"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m1_vocab_inst
        },
        {
            "id": 3,
            "questionText": "ちがう <u>意見</u>が あれば 言って ください。",
            "options": ["いけん", "いげん", "いかん", "いがん"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": m1_vocab_inst
        },
        {
            "id": 4,
            "questionText": "<u>近所</u>の しょくどうへ 行きました。",
            "options": ["きんじょ", "きんしょう", "ちかじょ", "ちかしょう"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": m1_vocab_inst
        },
        {
            "id": 5,
            "questionText": "あそこに 小さな <u>光</u>が 見えます。",
            "options": ["けむり", "かげ", "ひかり", "ほし"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": m1_vocab_inst
        },
        {
            "id": 6,
            "questionText": "むすこは <u>大学生</u>に なりました。",
            "options": ["だいがくせい", "たいがくせい", "だいがくしょう", "たいがくしょう"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": m1_vocab_inst
        },
        {
            "id": 7,
            "questionText": "おもしろい <u>映画</u>を 見ました。",
            "options": ["まんが", "え", "しゃしん", "えいが"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m1_vocab_inst
        },
        {
            "id": 8,
            "questionText": "<u>下着</u>を ひきだしに 入れました。",
            "options": ["したき", "したく", "したぎ", "したぐ"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": m1_vocab_inst
        },
        {
            "id": 9,
            "questionText": "<u>首</u>に けがを しました。",
            "options": ["かお", "くび", "うで", "あし"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": m1_vocab_inst
        },

        # Mondai 2 (Q10 - Q15)
        {
            "id": 10,
            "questionText": "どこか <u>とおい</u> ところへ 行きたいです。",
            "options": ["近い", "長い", "速い", "遠い"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m2_vocab_inst
        },
        {
            "id": 11,
            "questionText": "さとうさんは <u>うた</u>が じょうずです。",
            "options": ["音", "歌", "詩", "声"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": m2_vocab_inst
        },
        {
            "id": 12,
            "questionText": "日本の <u>ぶんがく</u>の 本を 読みました。",
            "options": ["文芸", "文学", "文章", "文化"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": m2_vocab_inst
        },
        {
            "id": 13,
            "questionText": "新しい <u>とけい</u>を 買いました。",
            "options": ["時計", "時訂", "待計", "待訂"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": m2_vocab_inst
        },
        {
            "id": 14,
            "questionText": "旅行は とても <u>たのしかった</u>です。",
            "options": ["薬しかった", "楽しかった", "楽かった", "薬かった"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": m2_vocab_inst
        },
        {
            "id": 15,
            "questionText": "きのう ともだちと <u>あいました</u>。",
            "options": ["会いました", "今いました", "介いました", "相いました"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": m2_vocab_inst
        },

        # Mondai 3 (Q16 - Q24)
        {
            "id": 16,
            "questionText": "あしたまでに この しごとを （　） しまいたいです。",
            "options": ["ならべて", "おわって", "とどけて", "やって"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m3_vocab_inst
        },
        {
            "id": 17,
            "questionText": "（駅で）\nＡ「つぎの 電車は いつ 来ますか。」\nＢ「（　） 来ますよ。」",
            "options": ["そろそろ", "やっと", "すっかり", "まもなく"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m3_vocab_inst
        },
        {
            "id": 18,
            "questionText": "森さんは いつも （　） ふくを 着て います。",
            "options": ["おしゃれな", "じょうぶな", "ていねいな", "ふくざつな"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": m3_vocab_inst
        },
        {
            "id": 19,
            "questionText": "この スープは （　）が うすいです。",
            "options": ["あじ", "におい", "いろ", "おと"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": m3_vocab_inst
        },
        {
            "id": 20,
            "questionText": "きょうは 休みですから、（　） 起きました。",
            "options": ["はやく", "おそく", "ゆっくり", "そろそろ"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": m3_vocab_inst
        },
        {
            "id": 21,
            "questionText": "あした 出かける （　）を して います。",
            "options": ["したく", "ようい", "じゅんび", "せわ"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m3_vocab_inst
        },
        {
            "id": 22,
            "questionText": "すみませんが、ちょっと えんぴつを （　） ください。",
            "options": ["かえて", "かりて", "かんがえて", "かえして"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": m3_vocab_inst
        },
        {
            "id": 23,
            "questionText": "田中さんは 来週 （　）へ 行きます。",
            "options": ["外国", "国内", "世界", "海外"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": m3_vocab_inst
        },
        {
            "id": 24,
            "questionText": "あしたの 会議の （　）を コピーして ください。",
            "options": ["しりょう", "しょうらい", "よてい", "じゅんび"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m3_vocab_inst
        },

        # Mondai 4 (Q25 - Q29)
        {
            "id": 25,
            "questionText": "<u>ここは ちゅうしゃじょうでは ありません。</u>",
            "options": [
                "ここに 車を 止めては いけません。",
                "ここに 車を 置いては いけません。",
                "ここに 車を 止めて ください。",
                "ここに 車を 置いて ください。"
            ],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": m4_vocab_inst
        },
        {
            "id": 26,
            "questionText": "<u>わたしは ちょっと 気分が 悪いです。</u>",
            "options": [
                "わたしは ちょっと あしが わるいです。",
                "わたしは ちょっと からだが わるいです。",
                "わたしは ちょっと みみが わるいです。",
                "わたしは ちょっと きぶんが わるいです。"
            ],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m4_vocab_inst
        },
        {
            "id": 27,
            "questionText": "<u>この 肉は やわらかいですね。</u>",
            "options": [
                "この 肉は かたくないですね。",
                "この 肉は おいしくないですね。",
                "この 肉は からくないですね。",
                "この 肉は あまくないですね。"
            ],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m4_vocab_inst
        },
        {
            "id": 28,
            "questionText": "<u>山下さんは かならず 来ます。</u>",
            "options": [
                "山下さんは たぶん 来ます。",
                "山下さんは ぜったいに 来ます。",
                "山下さんは いつも 来ます。",
                "山下さんは たいてい 来ます。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": m4_vocab_inst
        },
        {
            "id": 29,
            "questionText": "<u>わたしは かれに 謝りました。</u>",
            "options": [
                "わたしは かれに 「ごめんなさい」と 言いました。",
                "わたしは かれに 「ありがとう」と 言いました。",
                "わたしは かれに 「さようなら」と 言いました。",
                "わたしは かれに 「こんにちは」と 言いました。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": m4_vocab_inst
        },

        # Mondai 5 (Q30 - Q34)
        {
            "id": 30,
            "questionText": "ようじ",
            "options": [
                "どんな すばらしい ようじが おきましたか。",
                "あしたの ごご わたしは ようじが ありません。",
                "母は わたしの ようじが できます。",
                "たくさんの ようじを けいけんして ください。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": m5_vocab_inst
        },
        {
            "id": 31,
            "questionText": "ふくざつ",
            "options": [
                "この 機械の つかいかたは ふくざつです。",
                "この 本は ふくざつで 読めません。",
                "この 料理は ふくざつで おいしいです。",
                "この 部屋は ふくざつで きれいです。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": m5_vocab_inst
        },
        {
            "id": 32,
            "questionText": "さかんに",
            "options": [
                "この まちは さかんに にぎやかです。",
                "この 国では サッカーが さかんに 行われて います。",
                "さかんに 勉強して ください。",
                "さかんに 走って います。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": m5_vocab_inst
        },
        {
            "id": 33,
            "questionText": "おれい",
            "options": [
                "おれいを 聞いて ください。",
                "先生に おれいを 言いました。",
                "おれいを して ください。",
                "おれいが あります。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": m5_vocab_inst
        },
        {
            "id": 34,
            "questionText": "あさって",
            "options": [
                "あさって きのうの ことを 話します。",
                "あさって 映画を 見に 行きました。",
                "あさって テストが あります。",
                "あさって 友だちに 会いました。"
            ],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": m5_vocab_inst
        }
    ]

    set4_passage = "下の 文章は 「きせつ」に ついての 作文です。\n\n「夏と 冬」\nマイク・テイラー\n\nわたしは 夏と 冬が あまり 好きではありません。夏は 暑すぎるし、冬は 寒すぎるからです。今年の 冬は 雪が たくさん ふって、たいへんでした。夏が とても 暑かったので、その ときは 「早く 冬が [ 21 ]。」と 思いました。でも、冬が 来たら 今度は 「夏の ほう が いい。」と 思って しまいます。\n日本の 春と 秋は 気持ち [ 22 ] いいですが、ちょっと 短いと 思います。[ 23 ]、たくさんの 楽しみが あります。春は 花見が できます。秋は 山が 赤や きいろに なって、きれいです。\n楽しい ことが あったら、夏や 冬も [ 24 ]。だから、これから 夏と 冬の 楽しい ことを [ 25 ] と 思います。"

    set4_grammar = [
        # Mondai 1 (Q1 - Q15)
        {
            "id": 1,
            "questionText": "かばん（　）さいふを 入れて おきます。",
            "options": ["に", "で", "が", "も"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 2,
            "questionText": "冬（　）ように 寒い 日が つづいて います。",
            "options": ["も", "の", "で", "か"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 3,
            "questionText": "車で 来たので、今日は おさけ（　）飲めません。",
            "options": ["と", "に", "は", "や"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 4,
            "questionText": "おなかが すいたから、パンか おにぎり（　）食べよう。",
            "options": ["で", "から", "が", "でも"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 5,
            "questionText": "Ａ「新しく できた コンビニへ 行きましたか。」\nＢ「ええ。カレーや ケーキ（　）たくさん ありましたよ。」",
            "options": ["などの", "などが", "などで", "などから"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 6,
            "questionText": "Ａ「レポートは いつ できますか。」\nＢ「来週の 水曜日（　）書きおわると 思います。」",
            "options": ["だけは", "からは", "には", "へは"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 7,
            "questionText": "（ホテルで）\nＡ「この ホテルには（　）とまりますか。」\nＢ「三日間 とまります。」",
            "options": ["なんの", "どういう", "どのぐらい", "どんな"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 8,
            "questionText": "アリサ「この 問題は むずかしくて、（　）わかりません。」\nカーン「先生に 聞いたら どうですか。」",
            "options": ["すっかり", "ゆっくり", "もっとも", "ちっとも"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 9,
            "questionText": "子ども「友だちの うちへ あそびに 行って くる。」\n母親「（　）、おそく ならないようにね。」",
            "options": ["行けば いいと", "行っても いいなら", "行っても いいけれど", "行ったら いいのに"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 10,
            "questionText": "エリー「先生は あしたの にゅうがくしきに 着物を 着て（　）はずです。」\nサム「そうですか。楽しみですね。」",
            "options": ["くる", "ある", "いた", "した"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 11,
            "questionText": "朝ごはんを（　）すぎて しまった。",
            "options": ["食べて", "食べた", "食べ", "食べる"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 12,
            "questionText": "Ａ「いい においが（　）ね。」\nＢ「はい。ハンバーグを 作ったんです。」",
            "options": ["なります", "あります", "います", "します"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 13,
            "questionText": "ケイト「きのうは 母を うちまで（　）、ありがとうございました。これ、おれいです。」\n金子「ああ、どうも すみません。」",
            "options": ["送られて", "送って さしあげて", "送って くださって", "送って いらっしゃって"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 14,
            "questionText": "駅で きっぷを なくした とき、木田さんが いっしょに さがして（　）。",
            "options": ["やりました", "くれました", "あげました", "もらいました"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 15,
            "questionText": "毎日 かならず ふくしゅうを する という 先生との やくそくを（　）いけない。",
            "options": ["まもれば", "まもらなくても", "まもると", "まもらなくては"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },

        # Mondai 2 (Q16 - Q20)
        {
            "id": 16,
            "questionText": "（電気屋で）\n西田「前川さん、何を 買うんですか。」\n前川「毎日 ______ ______ ★ ______ 買う つもりです。」",
            "options": ["聞きたいので", "ラジオの", "ラジオを", "ニュースを"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": m2_grammar_inst
        },
        {
            "id": 17,
            "questionText": "Ａ「日曜日は いつも 何を しますか。」\nＢ「たいてい うちに いますが、たまに こうえんまで さんぽ ______ ______ ★ ______ あります。」",
            "options": ["こと", "に", "行く", "が"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": m2_grammar_inst
        },
        {
            "id": 18,
            "questionText": "Ａ「きのう 行った レストランは 高かったけれど、おいしくなかったですね。」\nＢ「ええ。もう ______ ______ ★ ______ は 行きたくないです。」",
            "options": ["ああ", "店", "に", "いう"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": m2_grammar_inst
        },
        {
            "id": 19,
            "questionText": "コンサートは 先週 ______ ______ ★ ______ きた。",
            "options": ["行われて", "わたし", "行って", "も"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": m2_grammar_inst
        },
        {
            "id": 20,
            "questionText": "田村「ホンさん、来週の 研究会に 行きますか。」\nホン「まだ わかりませんが、あさってまでには ______ ______ ★ ______ しますね。」",
            "options": ["するか", "しゅっせき", "どうか", "れんらく"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": m2_grammar_inst
        },

        # Mondai 3 (Q21 - Q25)
        {
            "id": 21,
            "questionText": "[ 21 ]",
            "options": ["来れば いい", "来るのは いい", "来る ことが いい", "来て いて いい"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": m3_grammar_inst,
            "passage": set4_passage
        },
        {
            "id": 22,
            "questionText": "[ 22 ]",
            "options": ["に", "と", "を", "が"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": m3_grammar_inst,
            "passage": set4_passage
        },
        {
            "id": 23,
            "questionText": "[ 23 ]",
            "options": ["すると", "それでは", "それに", "けれど"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": m3_grammar_inst,
            "passage": set4_passage
        },
        {
            "id": 24,
            "questionText": "[ 24 ]",
            "options": ["好きらしいです", "好きに して います", "好きに なれるかもしれません", "好きなはずが ありません"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": m3_grammar_inst,
            "passage": set4_passage
        },
        {
            "id": 25,
            "questionText": "[ 25 ]",
            "options": ["さがされない", "さがす", "さがさない", "さがそう"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": m3_grammar_inst,
            "passage": set4_passage
        }
    ]

    # ==========================================
    # SET 5
    # ==========================================
    set5_vocab = [
        # Mondai 1 (Q1 - Q9)
        {
            "id": 1,
            "questionText": "きれいな <u>声</u>ですね。",
            "options": ["かみ", "ゆび", "こえ", "おと"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": m1_vocab_inst
        },
        {
            "id": 2,
            "questionText": "<u>食料品</u>を 買いに 行きます。",
            "options": ["しょぐりょうひん", "しょぐりょひん", "しょくりょうひん", "しょくりょひん"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": m1_vocab_inst
        },
        {
            "id": 3,
            "questionText": "<u>夕飯</u>の とき、テレビを 見ました。",
            "options": ["ゆうはん", "ゆはん", "ゆうほん", "ゆほん"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": m1_vocab_inst
        },
        {
            "id": 4,
            "questionText": "<u>小学校</u>の ちかくに こうさてんが あります。",
            "options": ["しょがっこう", "しょがっこ", "しょうがっこ", "しょうがっこう"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m1_vocab_inst
        },
        {
            "id": 5,
            "questionText": "あそこに <u>鳥</u>が います。",
            "options": ["いぬ", "ねこ", "とり", "むし"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": m1_vocab_inst
        },
        {
            "id": 6,
            "questionText": "<u>正月</u>の 休みに 何を しますか。",
            "options": ["しょがつ", "しょうがつ", "しょかつ", "しょうかつ"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": m1_vocab_inst
        },
        {
            "id": 7,
            "questionText": "この <u>特急</u>は きょうとへ 行きますか。",
            "options": ["とくきゅう", "とくきゅ", "とっきゅう", "とっきゅ"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": m1_vocab_inst
        },
        {
            "id": 8,
            "questionText": "あしたの <u>都合</u>は どうですか。",
            "options": ["つうあい", "つごう", "つうごう", "つあい"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": m1_vocab_inst
        },
        {
            "id": 9,
            "questionText": "おとうとは <u>顔</u>が 小さい。",
            "options": ["せい", "あし", "あたま", "かお"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m1_vocab_inst
        },

        # Mondai 2 (Q10 - Q15)
        {
            "id": 10,
            "questionText": "山から ふく かぜは <u>つよい</u>です。",
            "options": ["早い", "軽い", "弱い", "強い"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m2_vocab_inst
        },
        {
            "id": 11,
            "questionText": "とけいの <u>こうじょう</u>で はたらいて います。",
            "options": ["丁場", "工場", "丁場", "工場"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m2_vocab_inst
        },
        {
            "id": 12,
            "questionText": "むらやまさんの 書いた 文を <u>うつして</u> います。",
            "options": ["字して", "孚して", "写して", "尓して"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": m2_vocab_inst
        },
        {
            "id": 13,
            "questionText": "<u>こんや</u>は ようじが あるので、もう かえります。",
            "options": ["合夜", "合野", "今夜", "今野"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": m2_vocab_inst
        },
        {
            "id": 14,
            "questionText": "その はこは <u>おもかった</u>です。",
            "options": ["重かった", "重もかった", "垂かった", "垂もかった"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": m2_vocab_inst
        },
        {
            "id": 15,
            "questionText": "きょうは <u>ひる</u>に おきました。",
            "options": ["査", "晝", "昼", "旦"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": m2_vocab_inst
        },

        # Mondai 3 (Q16 - Q24)
        {
            "id": 16,
            "questionText": "もんが （　） いたので、いぬが 入って きました。",
            "options": ["しまって", "たって", "ひらいて", "わって"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": m3_vocab_inst
        },
        {
            "id": 17,
            "questionText": "きらいな ものなら （　） 食べなくても いいですよ。",
            "options": ["だめに", "さかんに", "ひつように", "むりに"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m3_vocab_inst
        },
        {
            "id": 18,
            "questionText": "テストの まえに、ならった ところを （　）しました。",
            "options": ["せんしゅう", "らいしゅう", "ふくしゅう", "よしゅう"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": m3_vocab_inst
        },
        {
            "id": 19,
            "questionText": "（　）を はしって のぼると あぶないですよ。",
            "options": ["コンサート", "コンビニ", "エレベーター", "エスカレーター"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m3_vocab_inst
        },
        {
            "id": 20,
            "questionText": "先生の かいた えを （　）しました。",
            "options": ["はいけん", "せいさん", "ほんやく", "しんぱい"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": m3_vocab_inst
        },
        {
            "id": 21,
            "questionText": "おきゃくさんを ぶちょうの へやに （　）しました。",
            "options": ["あんしん", "あんない", "しゅっせき", "しゅっぽつ"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": m3_vocab_inst
        },
        {
            "id": 22,
            "questionText": "つくえの 上に フランスの にんぎょうが （　）あります。",
            "options": ["かえて", "おくって", "すわって", "かざって"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m3_vocab_inst
        },
        {
            "id": 23,
            "questionText": "この コーヒーは いろが くろくて とても （　）です。",
            "options": ["にがい", "あさい", "ふかい", "からい"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": m3_vocab_inst
        },
        {
            "id": 24,
            "questionText": "もう 少し じょうずに なるまで うたの れんしゅうを （　） ください。",
            "options": ["きめないで", "あつめないで", "しめないで", "やめないで"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m3_vocab_inst
        },

        # Mondai 4 (Q25 - Q29)
        {
            "id": 25,
            "questionText": "<u>たくさんの くだものを ゆしゅつして います。</u>",
            "options": [
                "がいこくに たくさん くだものを うって います。",
                "がいこくから たくさん くだものを かって います。",
                "がいこくで たくさん くだものを とって います。",
                "がいこくも たくさん くだものを すてて います。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": m4_vocab_inst
        },
        {
            "id": 26,
            "questionText": "<u>ここは こうつうが ふべんに なりました。</u>",
            "options": [
                "ここから どこかへ 行くのは たいへんに なりました。",
                "ここから どこかへ 行くのは かんたんに なりました。",
                "ここから どこかへ 行くのは やさしく なりました。",
                "ここから どこかへ 行くのは あぶなく なりました。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": m4_vocab_inst
        },
        {
            "id": 27,
            "questionText": "<u>きょうは ひどい 天気です。</u>",
            "options": [
                "きょうは あたたかいです。",
                "きょうは すずしいです。",
                "きょうは 天気が わるいです。",
                "きょうは 天気が いいです。"
            ],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": m4_vocab_inst
        },
        {
            "id": 28,
            "questionText": "<u>せまい 道では 車に ちゅういします。</u>",
            "options": [
                "せまい 道では 車に のります。",
                "せまい 道では 車に 気が つきます。",
                "せまい 道では 車に きょうみを もちます。",
                "せまい 道では 車に 気を つけます。"
            ],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m4_vocab_inst
        },
        {
            "id": 29,
            "questionText": "<u>ケンさんは しゃちょうに おれいを 言われました。</u>",
            "options": [
                "しゃちょうは ケンさんに 「ありがとう」と 言いました。",
                "しゃちょうは ケンさんに 「おだいじに」と 言いました。",
                "しゃちょうは ケンさんに 「ちこくしては いけない」と 言いました。",
                "しゃちょうは ケンさんに 「はやく かえりなさい」と 言いました。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": m4_vocab_inst
        },

        # Mondai 5 (Q30 - Q34)
        {
            "id": 30,
            "questionText": "かっこう",
            "options": [
                "ポケットには 花の かっこうが ついて います。",
                "友だちは かっこうが なきそうです。",
                "むすこは かっこうが おこって います。",
                "この オートバイは かっこうが わるいです。"
            ],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m5_vocab_inst
        },
        {
            "id": 31,
            "questionText": "けしき",
            "options": [
                "この りょうりは けしきが わるいです。",
                "やまの 上から うつくしい けしきが 見えます。",
                "わたしは けしきが よく なりました。",
                "バスと でんしゃの じこの けしきを 見ました。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": m5_vocab_inst
        },
        {
            "id": 32,
            "questionText": "やわらかい",
            "options": [
                "アニタさんは こどもに やわらかいです。",
                "この パンは やわらかいです。",
                "きょうは はれて やわらかいです。",
                "この しごとは かんたんで やわらかいです。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": m5_vocab_inst
        },
        {
            "id": 33,
            "questionText": "こむ",
            "options": [
                "スーツケースが こんで いて、しまりません。",
                "きょうは しゅくだいが こんで いて、おわりません。",
                "おかしが こんで いて、うれしいです。",
                "あさの ちかてつは こんで いて、すわれません。"
            ],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": m5_vocab_inst
        },
        {
            "id": 34,
            "questionText": "しゅっせき",
            "options": [
                "かわむらさんは かいぎに しゅっせきして います。",
                "毎週 にちようびは としょかんに しゅっせきして います。",
                "子どもは サッカーの しあいに しゅっせきして います。",
                "おなかが いたくて、びょういんに しゅっせきして います。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": m5_vocab_inst
        }
    ]

    set5_passage = "下の 文章は 「アルバイト」に ついての 作文です。\n\n「中国料理の 店」\n林 英\n\nわたしは 中国料理の 店で アルバイトを して います。安くて おいしいので、店は いつも [ 21 ]。わたしの 仕事は おさらを 洗う ことと、料理を 運ぶ ことです。わたしの 中国の 友だちも 食べに きた ことが あります。友だちは、「おいしいけれど、中国の 料理 [ 22 ] 少し 味が ちがうね。」と 言いました。\n店の お客さんは ほとんど 日本人です。[ 23 ]、店では 日本人の 好きな 味に して いるのかもしれません。料理の 食べ方も 少し ちがいます。ラーメンと ごはんを いっしょに 食べるのを 見たのは、はじめてでした。\nこの アルバイトは いそがしいですが、楽しいです。日本人の お客さんと 日本語で [ 24 ]。ときどき 「日本語が 上手だね。」と ほめられます。そんな とき、わたしは とても [ 25 ]。"

    set5_grammar = [
        # Mondai 1 (Q1 - Q15)
        {
            "id": 1,
            "questionText": "わたしは 毎朝 弟（　）妹の おべんとうを 作って います。",
            "options": ["も", "が", "や", "で"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 2,
            "questionText": "ここは わたしが 家（　）帰る まえに よく よる スーパーです。",
            "options": ["を", "の", "と", "へ"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 3,
            "questionText": "となりの へやで 大きな 音（　）した。",
            "options": ["が", "で", "や", "を"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 4,
            "questionText": "この 本は あした（　）かえさなければ ならない。",
            "options": ["ばかり", "しか", "までに", "まで"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 5,
            "questionText": "（会社で）\n大西「金田さん、今日は 何時ごろ 帰りますか。」\n金田「８時（　）帰りたいんですが、まだ わかりません。」",
            "options": ["ぐらいに", "ぐらいを", "ぐらいが", "ぐらいの"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 6,
            "questionText": "Ａ「この 大きい えは だれが かいたんですか。」\nＢ「わたしと 池田さん（　）かきました。」",
            "options": ["とに", "とで", "とを", "との"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 7,
            "questionText": "Ａ「パーティーに 使う コップは（　）買ったら いいですか。」\nＢ「30ぐらい あれば いいですよ。」",
            "options": ["いつ", "いかが", "いくつ", "いくら"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 8,
            "questionText": "家に 食べ物が（　）ないから、何か 買いに 行こう。",
            "options": ["ぜんぜん", "だんだん", "どんどん", "だいたい"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 9,
            "questionText": "Ａ「毎日（　）、なかなか 英語が うまく ならないんです。」\nＢ「勉強の やり方を かえて みたら どうですか。」",
            "options": ["勉強したので", "勉強して いるのに", "勉強するから", "勉強して いるし"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 10,
            "questionText": "Ａ「この くすりは いつ 飲めば いいの？」\nＢ「ごはんを（　）まえだよ。」",
            "options": ["食べる", "食べて", "食べた", "食べて いた"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 11,
            "questionText": "子どもが（　）がる 物を ぜんぶ 買って やるのは、いい ことだろうか。",
            "options": ["ほしい", "ほしいと", "ほしくて", "ほし"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 12,
            "questionText": "大川「ボブさん、もう 日本の せいかつに なれましたか。」\nボブ「はい。日本語も だいぶ わかる ように（　）。」",
            "options": ["します", "しました", "なります", "なりました"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 13,
            "questionText": "Ａ「このごろ 学校で ホリーさんを 見ませんね。」\nＢ「国に（　）、そのまま もどって きて いない ようですよ。」",
            "options": ["帰ったように", "帰ったとき", "帰ったらしくて", "帰ったから"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 14,
            "questionText": "せんもんの 本を さがして いたら 先生が いい 本屋を 教えて（　）。",
            "options": ["くださいました", "さしあげました", "いただきました", "いたしました"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },
        {
            "id": 15,
            "questionText": "何かを 説明する ときは、かんたんで（　）言葉を 使った ほうが いい。",
            "options": ["わかりにくい", "わかりやすい", "わからず", "わかりたい"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": m1_grammar_inst
        },

        # Mondai 2 (Q16 - Q20)
        {
            "id": 16,
            "questionText": "Ａ「______ ______ ★ ______ 習いたいです。」\nＢ「それなら、いい 学校が ありますよ。」",
            "options": ["パソコンを", "できると", "パソコンが", "便利なので"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": m2_grammar_inst
        },
        {
            "id": 17,
            "questionText": "森田「この 計画に ついて、安田さんは どう ______ ______ ★ ______ ください。」\n安田「はい、わかりました。」",
            "options": ["か", "いる", "考えて", "聞かせて"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": m2_grammar_inst
        },
        {
            "id": 18,
            "questionText": "Ａ「友だちに 何度 メールを 送っても へんじが 来ないんです。______ ______ ★ ______ すれば いいですか。」\nＢ「電話を して みれば いいと 思います。」",
            "options": ["いう", "こう", "どう", "とき"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": m2_grammar_inst
        },
        {
            "id": 19,
            "questionText": "国へ 帰る まえは ひこうきの チケットを よやくしたり ______ ______ ★ ______ ため、いそがしい。",
            "options": ["する", "じゅんびしたり", "を", "にもつ"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": m2_grammar_inst
        },
        {
            "id": 20,
            "questionText": "森山「安村さんは 車で 大学へ 来て いるんですか。」\n安村「はい。でも、わたしは 車を 上手に ______ ______ ★ ______ されて いるんです。」",
            "options": ["家族に", "できないから", "しんぱい", "運転"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": m2_grammar_inst
        },

        # Mondai 3 (Q21 - Q25)
        {
            "id": 21,
            "questionText": "[ 21 ]",
            "options": ["こんで います", "こんで いません", "こみませんでした", "こみましたか"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": m3_grammar_inst,
            "passage": set5_passage
        },
        {
            "id": 22,
            "questionText": "[ 22 ]",
            "options": ["や", "と", "に", "を"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": m3_grammar_inst,
            "passage": set5_passage
        },
        {
            "id": 23,
            "questionText": "[ 23 ]",
            "options": ["けれども", "しかし", "だから", "それに"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": m3_grammar_inst,
            "passage": set5_passage
        },
        {
            "id": 24,
            "questionText": "[ 24 ]",
            "options": ["話そうと 思って いました", "話させるんです", "話せるからです", "話して くれます"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": m3_grammar_inst,
            "passage": set5_passage
        },
        {
            "id": 25,
            "questionText": "[ 25 ]",
            "options": ["うれしく なりそうです", "うれしく なったそうです", "うれしく なったはずです", "うれしく なります"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": m3_grammar_inst,
            "passage": set5_passage
        }
    ]

    data = {
        "sets": [
            {
                "id": "set-4",
                "title": "Set 4",
                "description": "Practice Test 4",
                "sections": {
                    "vocabulary-kanji": {
                        "title": "Vocabulary & Kanji",
                        "titleJa": "文字・語彙",
                        "questions": set4_vocab
                    },
                    "grammar-reading": {
                        "title": "Grammar & Reading",
                        "titleJa": "文法・読解",
                        "questions": set4_grammar
                    }
                }
            },
            {
                "id": "set-5",
                "title": "Set 5",
                "description": "Practice Test 5",
                "sections": {
                    "vocabulary-kanji": {
                        "title": "Vocabulary & Kanji",
                        "titleJa": "文字・語彙",
                        "questions": set5_vocab
                    },
                    "grammar-reading": {
                        "title": "Grammar & Reading",
                        "titleJa": "文法・読解",
                        "questions": set5_grammar
                    }
                }
            }
        ]
    }

    out_path = r"D:\sudip_software\nihongo_playground\N4_Chokuzen_Taisaku_Processing\sets_4_5.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Saved to {out_path}")

if __name__ == "__main__":
    create_sets_4_5()
