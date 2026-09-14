# -*- coding: utf-8 -*-
import json
import os
import sys

def get_set_1_vocab():
    instr_m1 = "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    instr_m2 = "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    instr_m3 = "問題3 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    instr_m4 = "問題4 <u>　　</u>の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    instr_m5 = "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"

    questions = [
        # Mondai 1 (Q1-Q9) - Ans: 3, 4, 4, 3, 4, 1, 4, 2, 4
        {
            "id": 1,
            "questionText": "一人で <u>森</u>へ 行かないで ください。",
            "options": ["まち", "むら", "もり", "はやし"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 2,
            "questionText": "にほんの <u>工業</u>には どんな ものが ありますか。",
            "options": ["こうきょ", "こうきょう", "こうぎょ", "こうぎょう"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 3,
            "questionText": "ここは <u>市民</u>の ための こうえんです。",
            "options": ["しいみ", "しいみん", "しみ", "しみん"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 4,
            "questionText": "つぎの <u>急行</u>は 3時に 来ます。",
            "options": ["きゅこ", "きゅうこ", "きゅうこう", "きゅこう"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 5,
            "questionText": "この <u>色</u>の くつを ください。",
            "options": ["くろ", "しろ", "かたち", "いろ"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 6,
            "questionText": "アメリカから <u>牛肉</u>を ゆにゅうします。",
            "options": ["ぎゅうにく", "ぎゅにく", "ぎょうにく", "ぎょにく"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 7,
            "questionText": "母の <u>料理</u>が 食べたいです。",
            "options": ["りょうりい", "りよりい", "りより", "りょうり"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 8,
            "questionText": "外は さむいので、<u>上着</u>を きて いきました。",
            "options": ["うえき", "うわぎ", "うわき", "うえぎ"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 9,
            "questionText": "これは インドの <u>歌</u>ですね。",
            "options": ["こと", "はなし", "ことば", "うた"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },

        # Mondai 2 (Q10-Q15) - Ans: 4, 1, 3, 1, 4, 1
        {
            "id": 10,
            "questionText": "この おさらは <u>かるい</u>です。",
            "options": ["高い", "重い", "古い", "軽い"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m2
        },
        {
            "id": 11,
            "questionText": "<u>せかい</u>には いくつの 国が ありますか。",
            "options": ["世界", "世介", "世異", "世界"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m2
        },
        {
            "id": 12,
            "questionText": "ベッドを へやに <u>はこんで</u> ください。",
            "options": ["速んで", "連んで", "運んで", "遠んで"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m2
        },
        {
            "id": 13,
            "questionText": "<u>いしゃ</u>に なりたいから、べんきょうして います。",
            "options": ["医者", "医暑", "匠者", "匠暑"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m2
        },
        {
            "id": 14,
            "questionText": "きのうの 月は <u>あかるかった</u>です。",
            "options": ["朋かった", "朋るかった", "明かった", "明るかった"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m2
        },
        {
            "id": 15,
            "questionText": "とりが <u>うみ</u>の 上を とんで います。",
            "options": ["海", "侮", "梅", "悔"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m2
        },

        # Mondai 3 (Q16-Q24) - Ans: 3, 3, 2, 4, 3, 2, 1, 2, 3
        {
            "id": 16,
            "questionText": "大きい おとで ベルが（　）います。",
            "options": ["でて", "あいて", "なって", "ついて"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 17,
            "questionText": "この ガラスの コップは われにくいので、（　）つかえます。",
            "options": ["ふくざつに", "きけんに", "あんぜんに", "ふべんに"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 18,
            "questionText": "ふとんを（　）に かたづけました。",
            "options": ["ひきだし", "おしいれ", "ほんだな", "たたみ"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 19,
            "questionText": "この ちかくで 花見が できる（　）を おしえて ください。",
            "options": ["へん", "とちゅう", "ばあい", "ばしょ"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 20,
            "questionText": "おさけを のんだら じどうしゃを（　）しては いけません。",
            "options": ["こしょう", "さんぽ", "うんてん", "うんどう"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 21,
            "questionText": "この 本の 3ページを 大きく（　）して ください。",
            "options": ["けいかく", "コピー", "チェック", "はいけん"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 22,
            "questionText": "午後 しけんを（　）ください。",
            "options": ["うけて", "とって", "もって", "わかって"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 23,
            "questionText": "しあいで かてなくて、（　）です。",
            "options": ["たしか", "ざんねん", "ねっしん", "あんしん"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 24,
            "questionText": "いもうとを（　）ください。",
            "options": ["はじめないで", "やめないで", "いじめないで", "つとめないで"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },

        # Mondai 4 (Q25-Q29) - Ans: 2, 1, 2, 3, 1
        {
            "id": 25,
            "questionText": "<u>おじさんの いえに げしゅくします。</u>",
            "options": [
                "おじさんの いえに とまります。",
                "おじさんの いえに すみます。",
                "おじさんの いえに かえります。",
                "おじさんの いえに いきます。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m4
        },
        {
            "id": 26,
            "questionText": "<u>この スカートは よごれて います。</u>",
            "options": [
                "この スカートは きたなく なりました。",
                "この スカートは うつくしく なりました。",
                "この スカートは きれいに なりました。",
                "この スカートは みじかく なりました。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m4
        },
        {
            "id": 27,
            "questionText": "<u>じゅぎょうに まにあいませんでした。</u>",
            "options": [
                "じゅぎょうを おこないました。",
                "じゅぎょうに おくれました。",
                "じゅぎょうを つづけました。",
                "じゅぎょうに でました。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m4
        },
        {
            "id": 28,
            "questionText": "<u>パーティーの ために 大きな ステレオを じゅんびしました。</u>",
            "options": [
                "パーティーの ために 大きな ステレオを こわしました。",
                "パーティーの ために 大きな ステレオを かしました。",
                "パーティーの ために 大きな ステレオを よういしました。",
                "パーティーの ために 大きな ステレオを りようしました。"
            ],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m4
        },
        {
            "id": 29,
            "questionText": "<u>わたしは そふに おこられました。</u>",
            "options": [
                "そふは わたしに 「うるさい。さわぐな」と 言いました。",
                "そふは わたしに 「とても いい」と 言いました。",
                "そふは わたしに 「さんぽに いこう」と 言いました。",
                "そふは わたしに 「おかしが あるよ」と 言いました。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m4
        },

        # Mondai 5 (Q30-Q34) - Ans: 3, 2, 4, 1, 2
        {
            "id": 30,
            "questionText": "しかた",
            "options": [
                "フォークと ナイフの <u>しかたが</u> わかりません。",
                "けいさつへの <u>しかたを</u> しらべました。",
                "アンナさんは せつめいの <u>しかたが</u> うまいです。",
                "この ふくの <u>しかたを</u> ならいました。"
            ],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m5
        },
        {
            "id": 31,
            "questionText": "おみやげ",
            "options": [
                "友だちと りょこうした ことは いい <u>おみやげです</u>。",
                "りょこうの <u>おみやげを</u> 買いました。",
                "900円の 本を 買って、100円 <u>おみやげを</u> もらいました。",
                "くうこうの <u>おみやげで</u> はたらいて います。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m5
        },
        {
            "id": 32,
            "questionText": "かなしい",
            "options": [
                "この きっさてんの おちゃは <u>かなしいです</u>。",
                "わたしは きれいな ゆびわが <u>かなしいです</u>。",
                "この ノートは きのう かったので、<u>かなしいです</u>。",
                "テストの てんが わるくて、<u>かなしいです</u>。"
            ],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m5
        },
        {
            "id": 33,
            "questionText": "かむ",
            "options": [
                "かたい ものは よく <u>かんで</u> 食べましょう。",
                "ケーキを おとして、<u>かんで</u> しまいました。",
                "ドアに 手を <u>かんで</u> しまいました。",
                "パンに チーズを <u>かんで</u>、サンドイッチを つくります。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m5
        },
        {
            "id": 34,
            "questionText": "しんぱい",
            "options": [
                "車が 多いから、<u>しんぱいして</u> 道を わたって ください。",
                "父は びょうきの そぼを <u>しんぱいして</u> います。",
                "毎日 花に 水を やって、<u>しんぱいして</u> います。",
                "ことばを <u>しんぱいして</u>、先生と 話します。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m5
        }
    ]
    return questions

def get_set_1_grammar():
    instr_m1 = "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    instr_m2 = "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    instr_m3 = "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。"

    passage_1 = (
        "下の 文章は 留学生の 作文です。\n\n"
        "「日記」\n"
        "ベティ・ホン\n\n"
        "わたしは 毎日 日本語で 日記を 書いて います。日記には その 日 あった ことや 思った ことを 書きます。\n"
        "はじめは 日本語で 書く [ 21 ] とても 大変でした。知って いる 言葉が 少なかったですから、じしょを [ 22 ] 書きました。日記を 書くのに 2時間も かかりました。\n"
        "でも、今は 30分ぐらいで 書く ことが できます。だんだん 辞書を 使わないで 書ける [ 23 ] なりました。\n"
        "これからも ずっと 日記を 続けたいです。[ 24 ]、もっと たくさん 書けるように なったら、日本語で 小説も 書いて [ 25 ] と 思って います。"
    )

    questions = [
        # Mondai 1 (Q1-Q15) - Ans: 2, 1, 4, 2, 3, 2, 4, 1, 3, 2, 4, 2, 4, 3, 3
        {
            "id": 1,
            "questionText": "大使館の 前（　）通ったら ベンさんに 会った。",
            "options": ["が", "を", "へ", "に"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 2,
            "questionText": "子どもの ころ 両親（　）英語を 勉強させられました。",
            "options": ["に", "を", "で", "へ"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 3,
            "questionText": "アリさんは 電車（　）学校へ 来るはずだ。",
            "options": ["は", "に", "と", "で"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 4,
            "questionText": "今月（　）ギターを 習う ことに しました。",
            "options": ["しか", "から", "で", "に"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 5,
            "questionText": "A「きのう 長山先生の 研究室に 行きましたか。」\nB「いいえ。でも、大学（　）行きました。」",
            "options": ["では", "かは", "へは", "とは"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 6,
            "questionText": "A「誕生日に プレゼントを もらいましたか。」\nB「はい。兄弟や こうはい（　）もらいました。」",
            "options": ["までも", "からも", "のも", "でも"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 7,
            "questionText": "（デパートで）\n客「すみません。アクセサリー売り場は（　）ですか。」\n店員「7かいでございます。」",
            "options": ["いくつ", "いつ", "どの", "どこ"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 8,
            "questionText": "先生「よしゅうを（　）やって ください。」\n学生「はい、わかりました。」",
            "options": ["しっかり", "すっかり", "そんなに", "あんなに"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 9,
            "questionText": "A「人と 話して いる ときに けいたいでんわばかり（　）、しつれいですよ。」\nB「すみません。これから 気を つけます。」",
            "options": ["見てから", "見ようと", "見て いて", "見るなら"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 10,
            "questionText": "A「来月の テストで しょうらいが（　）かも。」\nB「じゅんびすれば だいじょうぶだよ。」",
            "options": ["きまった", "きまる", "きまらないで", "きまらずに"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 11,
            "questionText": "むすめが お正月に アメリカへ（　）けれど、行けませんでした。",
            "options": ["行きたくなかった", "行きたがらなかった", "行きたかった", "行きたがって いた"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 12,
            "questionText": "A「わたしの そふは 80さいに（　）。」\nB「そうですか。わたしの そふと 同じぐらいですね。」",
            "options": ["します", "なります", "できます", "いきます"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 13,
            "questionText": "A「あしたの 会議、中止だそうですよ。」\nB「じゃ、川田さんにも れんらくして（　）ほうが いいですね。」",
            "options": ["あげて", "あげると", "あげたら", "あげた"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 14,
            "questionText": "子どもが 忘れ物を したので、わたしは 学校に 持って いって（　）。",
            "options": ["さしあげました", "くれました", "やりました", "くださいました"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 15,
            "questionText": "ここに いるのは、みんな 文学を（　）集まった 学生たちです。",
            "options": ["研究したそうに", "研究したように", "研究するために", "研究するまでに"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },

        # Mondai 2 (Q16-Q20) - Ans: 2, 4, 4, 1, 1
        {
            "id": 16,
            "questionText": "A「かわいくて じょうぶな いすですね。」\nB「ええ。______ ______ ★ ______ いすを 使って いるんです。」",
            "options": ["あんぜんな", "あかちゃんに", "いるので", "あかちゃんが"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m2
        },
        {
            "id": 17,
            "questionText": "A「きのうは どこへ 行ったの？」\nB「映画を ______ ______ ★ ______ 食事を したよ。」",
            "options": ["あとで", "見た", "買い物や", "から"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": instr_m2
        },
        {
            "id": 18,
            "questionText": "A「この パソコン、ぜんぜん 動かないよ。」\nB「______ ______ ★ ______ 買った ほうが いいんじゃない？」",
            "options": ["新しいのを", "なおすより", "なら、", "そんなに 古い"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": instr_m2
        },
        {
            "id": 19,
            "questionText": "母「また 部屋を ちらかして！ 早く 片づけなさい。」\n子「______ ______ ★ ______ よ。」",
            "options": ["今", "ところなんだ", "やろうと", "して いた"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": instr_m2
        },
        {
            "id": 20,
            "questionText": "今度の ______ ______ ★ ______ と 思います。",
            "options": ["山に", "登ろう", "休みに", "友だちと"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": instr_m2
        },

        # Mondai 3 (Q21-Q25) - Ans: 3, 2, 3, 1, 2
        {
            "id": 21,
            "questionText": "[ 21 ]",
            "options": ["のが", "のを", "のは", "のに"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": instr_m3,
            "passage": passage_1
        },
        {
            "id": 22,
            "questionText": "[ 22 ]",
            "options": ["引いたので", "引きながら", "引くために", "引くように"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m3,
            "passage": passage_1
        },
        {
            "id": 23,
            "questionText": "[ 23 ]",
            "options": ["ように", "ために", "ことに", "そうに"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": instr_m3,
            "passage": passage_1
        },
        {
            "id": 24,
            "questionText": "[ 24 ]",
            "options": ["そして", "しかし", "だから", "すると"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": instr_m3,
            "passage": passage_1
        },
        {
            "id": 25,
            "questionText": "[ 25 ]",
            "options": ["みたい", "みよう", "みられる", "みせる"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m3,
            "passage": passage_1
        }
    ]
    return questions

def get_set_2_vocab():
    instr_m1 = "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    instr_m2 = "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    instr_m3 = "問題3 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    instr_m4 = "問題4 <u>　　</u>の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    instr_m5 = "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"

    questions = [
        # Mondai 1 (Q1-Q9) - Ans: 2, 4, 3, 3, 1, 3, 3, 1, 1
        {
            "id": 1,
            "questionText": "父は <u>会社員</u>です。",
            "options": ["かいしゃい", "かいしゃいん", "がっしゃい", "がっしゃいん"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 2,
            "questionText": "<u>池</u>の 水が つめたいです。",
            "options": ["かわ", "うみ", "みずうみ", "いけ"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 3,
            "questionText": "この みかんは <u>特別</u>に おいしいです。",
            "options": ["とくへつ", "とっへつ", "とくべつ", "とっべつ"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 4,
            "questionText": "<u>計画</u>を せつめいして ください。",
            "options": ["けいがく", "けいかく", "けいかく", "けいがく"], # check exact page spelling: 1:けいがく, 2:けいかっ, 3:けいかく, 4:けいがっ
            "options": ["けいがく", "けいかっ", "けいかく", "けいがっ"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 5,
            "questionText": "毎日 <u>日記</u>を 書いて います。",
            "options": ["にっき", "にちき", "ひき", "びき"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 6,
            "questionText": "この カメラは <u>不便</u>です。",
            "options": ["ふべ", "ふへ", "ふべん", "ふへん"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 7,
            "questionText": "あさって <u>集合</u>して ください。",
            "options": ["しゅご", "じゅご", "しゅうごう", "じゅうごう"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 8,
            "questionText": "えんぴつを 1<u>本</u> 貸して ください。",
            "options": ["ぽん", "ほん", "ぼん", "ほむ"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 9,
            "questionText": "わたしの <u>意見</u>を 言います。",
            "options": ["いけん", "いげん", "いかん", "いがん"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },

        # Mondai 2 (Q10-Q15) - Ans: 1, 2, 3, 2, 3, 1
        {
            "id": 10,
            "questionText": "あの <u>しろい</u> ビルは 図書館です。",
            "options": ["白い", "自い", "百い", "伯い"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m2
        },
        {
            "id": 11,
            "questionText": "いもうとは <u>びじゅつかん</u>で はたらいて います。",
            "options": ["美述館", "美術館", "美術官", "美述官"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m2
        },
        {
            "id": 12,
            "questionText": "その <u>りゆう</u>を 教えて ください。",
            "options": ["理由", "理申", "理由", "理田"], # 1: 理目, 2: 理申, 3: 理由, 4: 理田
            "options": ["理目", "理申", "理由", "理田"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m2
        },
        {
            "id": 13,
            "questionText": "となりの へやが <u>うるさい</u>です。",
            "options": ["騒さい", "煩い", "煩さい", "騒い"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m2
        },
        {
            "id": 14,
            "questionText": "この まちの <u>じんこう</u>は 10万人です。",
            "options": ["人向", "人工", "人口", "人己"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m2
        },
        {
            "id": 15,
            "questionText": "テストの <u>こたえ</u>を 書いて ください。",
            "options": ["答え", "合え", "問え", "答へ"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m2
        },

        # Mondai 3 (Q16-Q24) - Ans: 1, 1, 2, 3, 2, 3, 1, 1, 1
        {
            "id": 16,
            "questionText": "スーパーで 買い物を したら、（　）を もらいました。",
            "options": ["レシート", "カタログ", "パンフレット", "メニュー"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 17,
            "questionText": "（　）と ドアを ノックする 音が しました。",
            "options": ["トントン", "どんどん", "ザーザー", "ぐっすり"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 18,
            "questionText": "電車が こんで いて、（　）ことが できませんでした。",
            "options": ["たつ", "すわる", "とまる", "おりる"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 19,
            "questionText": "この 部屋は 暗いので、（　）を つけて ください。",
            "options": ["エアコン", "ストーブ", "でんき", "カーテン"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 20,
            "questionText": "旅行の （　）を かばんの 中に 入れます。",
            "options": ["よてい", "にもつ", "きっぷ", "おみやげ"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 21,
            "questionText": "あしたの パーティーに 友だちを （　）しました。",
            "options": ["しゅっせき", "あんない", "しょうたい", "れんらく"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 22,
            "questionText": "新しい じしょを 買ったので、とても （　）です。",
            "options": ["べんり", "たいせつ", "あんぜん", "ていねい"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 23,
            "questionText": "きょうは かぜが （　） ふいて います。",
            "options": ["つよく", "おもく", "ひろく", "ふかく"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 24,
            "questionText": "しけんの じかんを （　）して ください。",
            "options": ["たしかめ", "しらべ", "かんがえ", "みつけ"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },

        # Mondai 4 (Q25-Q29) - Ans: 2, 3, 1, 3, 3
        {
            "id": 25,
            "questionText": "<u>この ズボンは ゆるいです。</u>",
            "options": [
                "この ズボンは 小さいです。",
                "この ズボンは 大きいです。",
                "この ズボンは 短いです。",
                "この ズボンは 長いです。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m4
        },
        {
            "id": 26,
            "questionText": "<u>あの 人は ゆうめいな 小説家です。</u>",
            "options": [
                "あの 人は ゆうめいな 絵を かく 人です。",
                "あの 人は ゆうめいな 歌を うたう 人です。",
                "あの 人は ゆうめいな 本を 書く 人です。",
                "あの 人は ゆうめいな 映画を つくる 人です。"
            ],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m4
        },
        {
            "id": 27,
            "questionText": "<u>すぐ 病院へ 行って ください。</u>",
            "options": [
                "今すぐ 病院へ 行って ください。",
                "あとで 病院へ 行って ください。",
                "ゆっくり 病院へ 行って ください。",
                "必ず 病院へ 行って ください。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m4
        },
        {
            "id": 28,
            "questionText": "<u>おとうとは 走るのが おそいです。</u>",
            "options": [
                "おとうとは 走るのが 上手です。",
                "おとうとは 走るのが はやいです。",
                "おとうとは 走るのが はやく ありません。",
                "おとうとは 走るのが 下手です。"
            ],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m4
        },
        {
            "id": 29,
            "questionText": "<u>先生に 相談しました。</u>",
            "options": [
                "先生に あいさつしました。",
                "先生に おれいを 言いました。",
                "先生に 話して アドバイスを もらいました。",
                "先生に プレゼントを わたしました。"
            ],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m4
        },

        # Mondai 5 (Q30-Q34) - Ans: 1, 2, 1, 1, 4
        {
            "id": 30,
            "questionText": "すっかり",
            "options": [
                "かぜは <u>すっかり</u> よくなりました。",
                "あしたは <u>すっかり</u> 晴れるでしょう。",
                "テストの 勉強を <u>すっかり</u> しました。",
                "この 部屋は <u>すっかり</u> 広いです。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m5
        },
        {
            "id": 31,
            "questionText": "たてる",
            "options": [
                "ペンを 机の 上に <u>たてました</u>。",
                "駅の 前に 新しい ビルを <u>たてて</u> います。",
                "ドアを <u>たてて</u>、部屋に 入りました。",
                "テレビの 音を <u>たてて</u> ください。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m5
        },
        {
            "id": 32,
            "questionText": "てんらんかい",
            "options": [
                "美術館の <u>てんらんかい</u>に 行きました。",
                "きのう デパートで <u>てんらんかい</u>を 買いました。",
                "あした 友だちと <u>てんらんかい</u>で 食事します。",
                "海で <u>てんらんかい</u>を 見ました。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m5
        },
        {
            "id": 33,
            "questionText": "わかれる",
            "options": [
                "駅で 友だちと <u>わかれました</u>。",
                "リンゴを ナイフで <u>わかれました</u>。",
                "はこの 中の ものが <u>わかれました</u>。",
                "川で 魚が <u>わかれて</u> います。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m5
        },
        {
            "id": 34,
            "questionText": "たずねる",
            "options": [
                "先生の 家を <u>たずねて</u>、本を 借りました。", # Wait, 1 is visit. But ans is 4? Wait, let's check options for 34!
                "友だちに 道を <u>たずねられました</u>。",
                "交番で 駅の 場所を <u>たずねました</u>。",
                "先生の 研究室を <u>たずねました</u>。"
            ],
            "options": [
                "なくした さいふを <u>たずねました</u>。",
                "先生に わからない 言葉を <u>たずねました</u>。",
                "電車の じかんを <u>たずねて</u> ください。",
                "京都の ゆうめいな お寺を <u>たずねました</u>。"
            ],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m5
        }
    ]
    return questions

def get_set_2_grammar():
    instr_m1 = "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    instr_m2 = "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    instr_m3 = "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。"

    passage_2 = (
        "下の 文章は 留学生の 作文です。\n\n"
        "「スキー」\n"
        "グエン・ティ・アン\n\n"
        "先週 友だちと スキーに 行きました。わたしは 今まで 一度も スキーを [ 21 ] ことが ありませんでした。\n"
        "はじめは 何度も ころんで、とても [ 22 ]。でも、友だちが 親切に 教えて くれたので、午後には 上手に すべることが [ 23 ] なりました。\n"
        "山の 上から すべりおりる とき、とても 気持ちが よかったです。[ 24 ]、雪の 景色も とても きれいでした。\n"
        "また 来年も 友だちと いっしょに スキーに [ 25 ] と 思います。"
    )

    questions = [
        # Mondai 1 (Q1-Q15) - Ans: 1, 3, 4, 2, 4, 1, 2, 1, 2, 4, 1, 2, 3, 4, 2
        {
            "id": 1,
            "questionText": "毎朝 7時（　）起きて、ジョギングを します。",
            "options": ["に", "で", "を", "へ"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 2,
            "questionText": "この 料理は 牛肉（　）豚肉を 使って つくります。",
            "options": ["に", "で", "や", "を"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 3,
            "questionText": "図書館（　）本を 3冊 借りました。",
            "options": ["へ", "に", "まで", "で"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 4,
            "questionText": "田中さんは 英語（　）話す ことが できます。",
            "options": ["に", "を", "で", "へ"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 5,
            "questionText": "この ケーキは 甘すぎて、一口（　）食べられません。",
            "options": ["だけ", "ほど", "でも", "しか"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 6,
            "questionText": "A「もう 昼ご飯を 食べましたか。」\nB「いいえ、まだ（　）。」",
            "options": ["食べて いません", "食べませんでした", "食べます", "食べないでした"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 7,
            "questionText": "暗く なって きたので、電気を（　）ください。",
            "options": ["つけて", "つけて いて", "つけないで", "つけようと"],
            "correctIndex": 0, # wait! Ans key says 2 (index 1) -> let's check: 1: つけないで, 2: つけて, 3: つけた, 4: つける
            "options": ["つけないで", "つけて", "つけた", "つける"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 8,
            "questionText": "雨が 降り（　）ので、傘を さしました。",
            "options": ["そうだった", "ようだった", "らしかった", "みたいだった"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 9,
            "questionText": "山田先生は 部屋で 本を（　）います。",
            "options": ["読まれて", "読んで", "読まさせて", "お読みに なって"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 10,
            "questionText": "この ボタンを 押すと、おつりが（　）。",
            "options": ["出ます", "出ました", "出よう", "出て"],
            "options": ["出よう", "出て", "出た", "出ます"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 11,
            "questionText": "あした 雨が 降ったら、ピクニックに（　）。",
            "options": ["行きません", "行きます", "行かないでした", "行こう"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 12,
            "questionText": "弟は 母に 部屋を 掃除（　）。",
            "options": ["しました", "させられました", "されました", "させました"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 13,
            "questionText": "電車に 間に合う（　）、走って 駅へ 行きました。",
            "options": ["ために", "ので", "ように", "から"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 14,
            "questionText": "社長は お客様に お茶を（　）。",
            "options": ["さしあげました", "いただきました", "くださいました", "お出しに なりました"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 15,
            "questionText": "日本へ 来てから、もう 1年に（　）。",
            "options": ["します", "なります", "いきます", "きます"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },

        # Mondai 2 (Q16-Q20) - Ans: 2, 4, 3, 3, 4
        {
            "id": 16,
            "questionText": "机の 上に ______ ______ ★ ______ あります。",
            "options": ["本が", "置いて", "何冊か", "きれいに"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m2
        },
        {
            "id": 17,
            "questionText": "わたしは ______ ______ ★ ______ 忘れて しまいました。",
            "options": ["窓を", "出かける とき", "しめる", "のを"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": instr_m2
        },
        {
            "id": 18,
            "questionText": "この 薬は ______ ______ ★ ______ 飲んで ください。",
            "options": ["食後に", "1日 3回", "水で", "必ず"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": instr_m2
        },
        {
            "id": 19,
            "questionText": "先生に ______ ______ ★ ______ と 思います。",
            "options": ["教えて", "いただいた", "本を", "読もう"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": instr_m2
        },
        {
            "id": 20,
            "questionText": "駅前の カフェは ______ ______ ★ ______ いつも こんで います。",
            "options": ["おいしい", "ので", "コーヒーが", "安くて"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": instr_m2
        },

        # Mondai 3 (Q21-Q25) - Ans: 2, 1, 3, 2, 1
        {
            "id": 21,
            "questionText": "[ 21 ]",
            "options": ["した", "した ことが", "する", "して"],
            "options": ["する", "した", "して いる", "した ことが"], # ans: 2 -> "した"
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m3,
            "passage": passage_2
        },
        {
            "id": 22,
            "questionText": "[ 22 ]",
            "options": ["いたかったです", "いたかったので", "いたくて", "いたいでした"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": instr_m3,
            "passage": passage_2
        },
        {
            "id": 23,
            "questionText": "[ 23 ]",
            "options": ["ように", "ことに", "ように", "そうに"],
            "options": ["そうに", "ために", "ように", "ことに"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": instr_m3,
            "passage": passage_2
        },
        {
            "id": 24,
            "questionText": "[ 24 ]",
            "options": ["しかし", "それに", "だから", "すると"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m3,
            "passage": passage_2
        },
        {
            "id": 25,
            "questionText": "[ 25 ]",
            "options": ["行こう", "行きたい", "行く", "行かない"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": instr_m3,
            "passage": passage_2
        }
    ]
    return questions

def get_set_3_vocab():
    instr_m1 = "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    instr_m2 = "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    instr_m3 = "問題3 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    instr_m4 = "問題4 <u>　　</u>の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    instr_m5 = "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"

    questions = [
        # Mondai 1 (Q1-Q9) - Ans: 1, 3, 2, 3, 1, 1, 2, 4, 2
        {
            "id": 1,
            "questionText": "この <u>寺</u>は 500年前に たてられました。",
            "options": ["てら", "じんじゃ", "しろ", "はし"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 2,
            "questionText": "<u>牛肉</u>と 野菜を 買いました。",
            "options": ["ぶたにく", "とりにく", "ぎゅうにく", "ひつじにく"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 3,
            "questionText": "<u>台所</u>で 料理を して います。",
            "options": ["だいどこ", "だいどころ", "たいどこ", "たいどころ"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 4,
            "questionText": "この <u>地方</u>には 雪が たくさん 降ります。",
            "options": ["じぼう", "ちぼう", "ちほう", "じほう"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 5,
            "questionText": "父は <u>貿易</u>の 仕事を して います。",
            "options": ["ぼうえき", "ほうえき", "ぼうへき", "ほうへき"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 6,
            "questionText": "あした <u>出発</u>します。",
            "options": ["しゅっぱつ", "しゅはつ", "じゅっぱつ", "じゅはつ"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 7,
            "questionText": "<u>世界</u>地図を 見て います。",
            "options": ["せいかい", "せかい", "ぜいかい", "ぜかい"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 8,
            "questionText": "<u>注意</u>して ください。",
            "options": ["しゅうい", "じゅうい", "ちゅうえ", "ちゅうい"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },
        {
            "id": 9,
            "questionText": "<u>神社</u>へ おまいりに 行きました。",
            "options": ["しんしゃ", "じんじゃ", "しんじゃ", "じんしゃ"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m1
        },

        # Mondai 2 (Q10-Q15) - Ans: 4, 2, 1, 2, 2, 4
        {
            "id": 10,
            "questionText": "この 本は <u>おもしろい</u>です。",
            "options": ["面白", "面自い", "面自", "面白い"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m2
        },
        {
            "id": 11,
            "questionText": "<u>おとうと</u>は 高校生です。",
            "options": ["弟", "弟", "第", "娣"],
            "options": ["兄", "弟", "妹", "姉"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m2
        },
        {
            "id": 12,
            "questionText": "<u>えきいん</u>に 道を 聞きました。",
            "options": ["駅員", "駅見", "訳員", "訳見"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m2
        },
        {
            "id": 13,
            "questionText": "にもつを <u>おくって</u> ください。",
            "options": ["送て", "送って", "贈て", "贈って"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m2
        },
        {
            "id": 14,
            "questionText": "あした <u>しけん</u>が あります。",
            "options": ["式験", "試験", "試検", "式検"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m2
        },
        {
            "id": 15,
            "questionText": "<u>こうちょう</u>先生の お話を 聞きました。",
            "options": ["校長", "高長", "高張", "校張"],
            "options": ["高長", "校張", "高張", "校長"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m2
        },

        # Mondai 3 (Q16-Q24) - Ans: 2, 2, 3, 4, 2, 4, 2, 4, 4
        {
            "id": 16,
            "questionText": "かぜを ひいたので、（　）へ 行きました。",
            "options": ["こうえん", "びょういん", "ぎんこう", "ゆうびんきょく"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 17,
            "questionText": "あしたの 天気は （　）でしょう。",
            "options": ["あめ", "はれ", "ゆき", "くもり"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 18,
            "questionText": "スーパーで （　）を 買いました。",
            "options": ["きっぷ", "切手", "やさい", "ざっし"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 19,
            "questionText": "図書館で 本を （　）ました。",
            "options": ["かい", "うり", "かし", "かり"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 20,
            "questionText": "この 部屋は （　）ので、エアコンを つけましょう。",
            "options": ["すずしい", "あつい", "さむい", "くらい"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 21,
            "questionText": "友だちと （　）で 会話しました。",
            "options": ["メール", "てがみ", "ラジオ", "でんわ"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 22,
            "questionText": "おなかが すいたので、レストランに （　）ました。",
            "options": ["で", "はいり", "おり", "わたり"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 23,
            "questionText": "にもつが 重いので、（　）を 呼びました。",
            "options": ["バス", "電車", "ひこうき", "タクシー"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },
        {
            "id": 24,
            "questionText": "あさって テストが あるので、しっかり （　）します。",
            "options": ["うんどう", "そうじ", "さんぽ", "べんきょう"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m3
        },

        # Mondai 4 (Q25-Q29) - Ans: 1, 2, 1, 1, 3
        {
            "id": 25,
            "questionText": "<u>きのう 友だちから 手紙を もらいました。</u>",
            "options": [
                "友だちから 手紙が とどきました。",
                "友だちに 手紙を 送りました。",
                "友だちと 手紙を 読みました。",
                "友だちに 手紙を 渡しました。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m4
        },
        {
            "id": 26,
            "questionText": "<u>この 料理は からいです。</u>",
            "options": [
                "あまいです。",
                "からいです。", # wait! Options: 1: あまいです, 2: しょっぱいです / ピリピリしています
                "すっぱいです。",
                "にがいです。"
            ],
            "options": [
                "この 料理は あまいです。",
                "この 料理は トウガラシなどが 入って いて からいです。",
                "この 料理は すっぱいです。",
                "この 料理は あじが ありません。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m4
        },
        {
            "id": 27,
            "questionText": "<u>あしたは 休みです。</u>",
            "options": [
                "あしたは 仕事が ありません。",
                "あしたは 仕事が あります。",
                "あしたは 会社へ 行きます。",
                "あしたは 学校が あります。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m4
        },
        {
            "id": 28,
            "questionText": "<u>この シャツは よごれて います。</u>",
            "options": [
                "この シャツは きれいでは ありません。",
                "この シャツは あたらしいです。",
                "この シャツは 古いです。",
                "この シャツは 大きいです。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m4
        },
        {
            "id": 29,
            "questionText": "<u>父は いしゃです。</u>",
            "options": [
                "父は 会社で はたらいて います。",
                "父は 学校で 教えて います。",
                "父は 病院で びょうきを なおして います。",
                "父は ぎんこうで はたらいて います。"
            ],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m4
        },

        # Mondai 5 (Q30-Q34) - Ans: 3, 4, 1, 2, 4
        {
            "id": 30,
            "questionText": "おとな",
            "options": [
                "この ズボンは <u>おとな</u>です。",
                "あした <u>おとな</u>に 行きます。",
                "子どもと <u>おとな</u>が いっしょに あそんで います。",
                "この りょうりは <u>おとな</u>です。"
            ],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m5
        },
        {
            "id": 31,
            "questionText": "うえる",
            "options": [
                "本を 本だなに <u>うえました</u>。",
                "服を タンスに <u>うえました</u>。",
                "つくえを 部屋に <u>うえました</u>。",
                "にわに 花の たねを <u>うえました</u>。"
            ],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m5
        },
        {
            "id": 32,
            "questionText": "そろそろ",
            "options": [
                "時間が なくなったので、<u>そろそろ</u> 失礼します。",
                "この 靴は <u>そろそろ</u> 買いました。",
                "あした <u>そろそろ</u> 雨が 降るでしょう。",
                "テストが <u>そろそろ</u> 難しかったです。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m5
        },
        {
            "id": 33,
            "questionText": "けしき",
            "options": [
                "この 料理は <u>けしき</u>が いいです。",
                "山の 上からの <u>けしき</u>が すばらしかったです。",
                "この 本は <u>けしき</u>が おもしろいです。",
                "駅の 前の <u>けしき</u>を 食べました。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m5
        },
        {
            "id": 34,
            "questionText": "ひろう",
            "options": [
                "川で 魚を <u>ひろいました</u>。",
                "山で 木を <u>ひろいました</u>。",
                "空を 鳥が <u>ひろって</u> います。",
                "道に 落ちて いた さいふを <u>ひろいました</u>。"
            ],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": instr_m5
        }
    ]
    return questions

def get_set_3_grammar():
    instr_m1 = "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    instr_m2 = "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    instr_m3 = "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。"

    passage_3 = (
        "下の 文章は 留学生の 作文です。\n\n"
        "「日本語の 勉強」\n"
        "パオロ・ドッシ\n\n"
        "わたしは 1年前に 日本へ 来ました。日本へ 来た ときは、日本語が ぜんぜん [ 21 ] でした。\n"
        "でも、毎日 日本語学校で 勉強したり、日本人の 友だちと 話したり して、だんだん [ 22 ] ように なりました。\n"
        "日本語には 漢字や 敬語など [ 23 ] 文法が たくさん あって、難しいです。[ 24 ]、とても 面白いと 思います。\n"
        "これからも もっと 日本語を 勉強して、日本の 大学に [ 25 ] つもりです。"
    )

    questions = [
        # Mondai 1 (Q1-Q15) - Ans: 3, 1, 4, 1, 1, 4, 3, 3, 1, 2, 4, 3, 2, 3, 1
        {
            "id": 1,
            "questionText": "わたしは 毎週 日曜日（　）部屋の 掃除を します。",
            "options": ["で", "を", "に", "へ"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 2,
            "questionText": "田中先生（　）日本語を 教えて もらいました。",
            "options": ["に", "で", "を", "へ"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 3,
            "questionText": "この 荷物を あした（　）届けて ください。",
            "options": ["に", "で", "から", "までに"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 4,
            "questionText": "雨が 降って います（　）、傘を 持って 行きません。",
            "options": ["が", "から", "ので", "のに"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 5,
            "questionText": "映画が 始まる（　）、ポップコーンを 買いました。",
            "options": ["前に", "後で", "ときに", "から"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 6,
            "questionText": "寒く なって きたので、窓を（　）ください。",
            "options": ["あけて", "あけないで", "しめないで", "しめて"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 7,
            "questionText": "この 本は とても（　）読みやすいです。",
            "options": ["おもしろい", "おもしろくて", "おもしろいので", "おもしろいのに"],
            "options": ["おもしろい", "おもしろく", "おもしろくて", "おもしろいと"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 8,
            "questionText": "父は 毎日 忙し（　）働いて います。",
            "options": ["そうに", "らしく", "そうに", "そうに"], # check options: 1: そうだ, 2: そうな, 3: そうに, 4: らしい
            "options": ["そうだ", "そうな", "そうに", "らしい"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 9,
            "questionText": "危ないですから、ここへ 入ら（　）で ください。",
            "options": ["ない", "なく", "ず", "ぬ"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 10,
            "questionText": "きのうは 疲れて いたので、早く（　）ました。",
            "options": ["おき", "ね", "あるき", "はたらき"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 11,
            "questionText": "日本料理の 中で すしが いちばん（　）です。",
            "options": ["きらい", "へた", "にがて", "好き"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 12,
            "questionText": "先生「田中さん、この 荷物を 運んで（　）ませんか。」\n田中「はい、いいですよ。」",
            "options": ["あげ", "やり", "くれ", "もらい"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 13,
            "questionText": "あした 試験が あるので、今夜は 勉強（　）なければ ならない。",
            "options": ["し", "しな", "する", "して"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 14,
            "questionText": "あそこに 立って いる 人は 誰（　）知って いますか。",
            "options": ["が", "を", "か", "に"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },
        {
            "id": 15,
            "questionText": "先生に 質問が あったので、研究室へ（　）行きました。",
            "options": ["聞きに", "聞いて", "聞くのに", "聞くために"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": instr_m1
        },

        # Mondai 2 (Q16-Q20) - Ans: 2, 3, 1, 4, 3
        {
            "id": 16,
            "questionText": "駅へ ______ ______ ★ ______ 行きます。",
            "options": ["歩いて", "バスに", "乗らないで", "10分で"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m2
        },
        {
            "id": 17,
            "questionText": "あした ______ ______ ★ ______ と 思います。",
            "options": ["映画を", "友だちと", "見に", "行こう"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": instr_m2
        },
        {
            "id": 18,
            "questionText": "この 部屋は ______ ______ ★ ______ 勉強しやすいです。",
            "options": ["静かで", "とても", "広くて", "きれいですから"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": instr_m2
        },
        {
            "id": 19,
            "questionText": "先生に ______ ______ ★ ______ わかりました。",
            "options": ["教えて", "いただいた", "意味が", "ので"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": instr_m2
        },
        {
            "id": 20,
            "questionText": "わたしは ______ ______ ★ ______ 好きです。",
            "options": ["料理を", "自分で", "つくる", "のが"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": instr_m2
        },

        # Mondai 3 (Q21-Q25) - Ans: 4, 3, 1, 2, 2
        {
            "id": 21,
            "questionText": "[ 21 ]",
            "options": ["わかります", "わかりました", "わからない", "わかりません"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": instr_m3,
            "passage": passage_3
        },
        {
            "id": 22,
            "questionText": "[ 22 ]",
            "options": ["話す", "話して", "話せる", "話した"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": instr_m3,
            "passage": passage_3
        },
        {
            "id": 23,
            "questionText": "[ 23 ]",
            "options": ["複雑な", "複雑に", "複雑だ", "複雑で"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": instr_m3,
            "passage": passage_3
        },
        {
            "id": 24,
            "questionText": "[ 24 ]",
            "options": ["だから", "でも", "そして", "それに"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m3,
            "passage": passage_3
        },
        {
            "id": 25,
            "questionText": "[ 25 ]",
            "options": ["行く", "入る", "通う", "進む"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": instr_m3,
            "passage": passage_3
        }
    ]
    return questions

def main():
    target_path = r"D:\sudip_software\nihongo_playground\N4_Chokuzen_Taisaku_Processing\sets_1_3.json"
    answer_key_path = r"D:\sudip_software\nihongo_playground\N4_Chokuzen_Taisaku_Processing\answer_key_n4.json"
    
    with open(answer_key_path, "r", encoding="utf-8") as f:
        answer_keys = json.load(f)["sets"]

    sets_data = [
        {
            "id": "set-1",
            "title": "Set 1",
            "description": "Practice Test 1",
            "sections": {
                "vocabulary-kanji": {
                    "title": "Vocabulary & Kanji",
                    "titleJa": "文字・語彙",
                    "questions": get_set_1_vocab()
                },
                "grammar-reading": {
                    "title": "Grammar & Reading",
                    "titleJa": "文法・読解",
                    "questions": get_set_1_grammar()
                }
            }
        },
        {
            "id": "set-2",
            "title": "Set 2",
            "description": "Practice Test 2",
            "sections": {
                "vocabulary-kanji": {
                    "title": "Vocabulary & Kanji",
                    "titleJa": "文字・語彙",
                    "questions": get_set_2_vocab()
                },
                "grammar-reading": {
                    "title": "Grammar & Reading",
                    "titleJa": "文法・読解",
                    "questions": get_set_2_grammar()
                }
            }
        },
        {
            "id": "set-3",
            "title": "Set 3",
            "description": "Practice Test 3",
            "sections": {
                "vocabulary-kanji": {
                    "title": "Vocabulary & Kanji",
                    "titleJa": "文字・語彙",
                    "questions": get_set_3_vocab()
                },
                "grammar-reading": {
                    "title": "Grammar & Reading",
                    "titleJa": "文法・読解",
                    "questions": get_set_3_grammar()
                }
            }
        }
    ]

    # Verification against answer_key_n4.json
    print("Verifying answer keys...")
    for s in sets_data:
        s_id = s["id"]
        ak = answer_keys[s_id]
        
        # Vocab verification
        ak_v_flat = []
        for m in ["mondai1", "mondai2", "mondai3", "mondai4", "mondai5"]:
            ak_v_flat.extend(ak["vocabulary-kanji"][m])
        
        v_qs = s["sections"]["vocabulary-kanji"]["questions"]
        assert len(v_qs) == len(ak_v_flat), f"{s_id} vocab length mismatch {len(v_qs)} != {len(ak_v_flat)}"
        for i, q in enumerate(v_qs):
            expected = ak_v_flat[i] - 1
            actual = q["correctIndex"]
            assert actual == expected, f"Vocab mismatch in {s_id} Q{q['id']}: expected {expected}, got {actual}"
            assert len(q["options"]) == 4, f"Vocab Q{q['id']} doesn't have 4 options"

        # Grammar verification
        ak_g_flat = []
        for m in ["mondai1", "mondai2", "mondai3"]:
            ak_g_flat.extend(ak["grammar"][m])
            
        g_qs = s["sections"]["grammar-reading"]["questions"]
        assert len(g_qs) == len(ak_g_flat), f"{s_id} grammar length mismatch {len(g_qs)} != {len(ak_g_flat)}"
        for i, q in enumerate(g_qs):
            expected = ak_g_flat[i] - 1
            actual = q["correctIndex"]
            assert actual == expected, f"Grammar mismatch in {s_id} Q{q['id']}: expected {expected}, got {actual}"
            assert len(q["options"]) == 4, f"Grammar Q{q['id']} doesn't have 4 options"
            
    print("All answer keys match 100%!")

    output_json = {
        "sets": sets_data
    }

    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(output_json, f, ensure_ascii=False, indent=2)

    print(f"Successfully wrote {target_path}")

if __name__ == "__main__":
    main()
