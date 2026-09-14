import json

set_6_vocab_questions = [
    {
        "id": 1,
        "questionText": "母は 今 <u>家</u>に いません。",
        "options": ["いえ", "そと", "くに", "みせ"],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 2,
        "questionText": "<u>火曜日</u>に パートを して います。",
        "options": ["かようひ", "かゆうひ", "かゆうび", "かようび"],
        "correctIndex": 3,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 3,
        "questionText": "しょうらいの ことは <u>自分</u>で かんがえます。",
        "options": ["じふん", "しぶん", "じぶん", "じぷん"],
        "correctIndex": 2,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 4,
        "questionText": "<u>校長</u>は いつも いそがしそうです。",
        "options": ["こうちょう", "こうちょ", "ごうちょう", "ごちょう"],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 5,
        "questionText": "<u>夏</u>に 友だちと 山へ 行きました。",
        "options": ["ふゆ", "はる", "あき", "なつ"],
        "correctIndex": 3,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 6,
        "questionText": "<u>台風</u>で こうえんの 木が たおれました。",
        "options": ["だいぶう", "だいふう", "たいふう", "たいぶう"],
        "correctIndex": 2,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 7,
        "questionText": "わたしの <u>家族</u>は 五人です。",
        "options": ["がぞく", "かぞく", "かそく", "がそく"],
        "correctIndex": 1,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 8,
        "questionText": "ふうとうに <u>切手</u>を はります。",
        "options": ["きて", "きいて", "せって", "きって"],
        "correctIndex": 3,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 9,
        "questionText": "これは わたしの だいじな <u>物</u>です。",
        "options": ["もの", "こと", "はこ", "かさ"],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 10,
        "questionText": "この アパートは <u>ひろい</u>です。",
        "options": ["広い", "黒い", "暗い", "悪い"],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 11,
        "questionText": "そふは よく 古い <u>じだい</u>の 話を します。",
        "options": ["持代", "時代", "持伐", "時伐"],
        "correctIndex": 1,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 12,
        "questionText": "この りょうりは 少し からいと <u>おもいます</u>。",
        "options": ["愚います", "界います", "思います", "息います"],
        "correctIndex": 2,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 13,
        "questionText": "ピーターさんは <u>たいしかん</u>に 出かけました。",
        "options": ["太使館", "太子漢", "大使館", "大子漢"],
        "correctIndex": 2,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 14,
        "questionText": "来週 いなかに <u>かえります</u>。",
        "options": ["掃えます", "掃ります", "帰えます", "帰ります"],
        "correctIndex": 3,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 15,
        "questionText": "<u>からだ</u>を うごかすと やせますよ。",
        "options": ["足", "腕", "体", "頭"],
        "correctIndex": 2,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 16,
        "questionText": "あそこに タクシーが （　） います。",
        "options": ["みつかって", "おわって", "かかって", "とまって"],
        "correctIndex": 3,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題3 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 17,
        "questionText": "もっと （　） べんきょうして ください。",
        "options": ["まじめに", "きゅうに", "たいせつに", "ふくざつに"],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題3 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 18,
        "questionText": "こんやは とくに （　）が ありません。",
        "options": ["るす", "かんけい", "よてい", "うけつけ"],
        "correctIndex": 2,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題3 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 19,
        "questionText": "（　）で メールを おくります。",
        "options": ["パソコン", "タイプ", "コピー", "レジ"],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題3 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 20,
        "questionText": "えいごの 新しい ことばを （　）して みましょう。",
        "options": ["はつおん", "さんせい", "かいわ", "うんてん"],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題3 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 21,
        "questionText": "学校に ちこくするから、はやく （　）して ください。",
        "options": ["しょうたい", "りよう", "したく", "せいさん"],
        "correctIndex": 2,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題3 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 22,
        "questionText": "わたしは 花を （　） います。",
        "options": ["たずねて", "そだてて", "よんで", "むかえて"],
        "correctIndex": 1,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題3 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 23,
        "questionText": "この 国は きかいの こうぎょうが （　）です。",
        "options": ["りっぱ", "ねっしん", "しんせつ", "さかん"],
        "correctIndex": 3,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題3 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 24,
        "questionText": "ここに ごみを （　） ください。",
        "options": ["はじめないで", "あつめないで", "やめないで", "すてないで"],
        "correctIndex": 1,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題3 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 25,
        "questionText": "<u>しけんに しっぱいしました。</u>",
        "options": [
            "しけんは むずかしくありませんでした。",
            "しけんは かんたんでした。",
            "しけんは ぜんぜん できませんでした。",
            "しけんは よく できました。"
        ],
        "correctIndex": 2,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題4 <u>　　</u>の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 26,
        "questionText": "<u>しごとを 休んだ りゆうを おしえて ください。</u>",
        "options": [
            "しごとを 休んだ 時間を おしえて ください。",
            "しごとを 休んだ 人を おしえて ください。",
            "しごとを 休んだ わけを おしえて ください。",
            "しごとを 休んだ ひを おしえて ください。"
        ],
        "correctIndex": 2,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題4 <u>　　</u>の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 27,
        "questionText": "<u>ほんださんの おたくは こちらです。</u>",
        "options": [
            "ほんださんは ここに すんで います。",
            "ほんださんは ここで はたらきます。",
            "ほんださんは この 人と けっこんして います。",
            "ほんださんの きょうだいは この 人です。"
        ],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題4 <u>　　</u>の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 28,
        "questionText": "<u>つくえの 中を かたづけました。</u>",
        "options": [
            "つくえの 中を きたなく しました。",
            "つくえの 中を しらべました。",
            "つくえの 中を みました。",
            "つくえの 中を きれいに しました。"
        ],
        "correctIndex": 3,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題4 <u>　　</u>の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 29,
        "questionText": "<u>ロンさんは はやしさんに しょうたいされました。</u>",
        "options": [
            "はやしさんは ロンさんに 「早く おきた ほうが いいですよ」と 言いました。",
            "はやしさんは ロンさんに 「こちらは なかたさんです」と 言いました。",
            "はやしさんは ロンさんに 「うちに 来て ください」と 言いました。",
            "はやしさんは ロンさんに 「それは わかりません」と 言いました。"
        ],
        "correctIndex": 2,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題4 <u>　　</u>の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 30,
        "questionText": "おみまい",
        "options": [
            "友だちの あたらしい へやを <u>おみまいに</u> 行きました。",
            "テニスの しあいの <u>おみまいを</u> しました。",
            "わからなかったら、わたしに <u>おみまいを</u> して ください。",
            "びょういんへ <u>おみまいに</u> 行きます。"
        ],
        "correctIndex": 3,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
    },
    {
        "id": 31,
        "questionText": "あんしん",
        "options": [
            "なくした さいふが みつからないので、<u>あんしんです</u>。",
            "この ナイフは だれにでも <u>あんしんです</u>。",
            "わたしは むすこの けがが <u>あんしんです</u>。",
            "げんかんの かぎを しっかり かけたので、<u>あんしんです</u>。"
        ],
        "correctIndex": 3,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
    },
    {
        "id": 32,
        "questionText": "あさい",
        "options": [
            "木の はが <u>あさいです</u>。",
            "この お金は <u>あさいです</u>。",
            "まだ <u>あさいですから</u>、ねむいです。",
            "この みずうみは <u>あさいです</u>。"
        ],
        "correctIndex": 3,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
    },
    {
        "id": 33,
        "questionText": "さがる",
        "options": [
            "あめが きゅうに <u>さがって</u>、ぬれて しまいました。",
            "テストの てんが <u>さがって</u> しまいました。",
            "つくえの 下に ごみが <u>さがって</u> います。",
            "こうさてんを 前に <u>さがって</u>、みぎに すすみます。"
        ],
        "correctIndex": 1,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
    },
    {
        "id": 34,
        "questionText": "こしょう",
        "options": [
            "うでが <u>こしょうして</u>、いしゃに 行きました。",
            "ラジオが <u>こしょうして</u>、おとが 出ません。",
            "かびんを <u>こしょうして</u>、母に しかられました。",
            "おさけを 飲みすぎて、おとうとと <u>こしょうして</u> しまいました。"
        ],
        "correctIndex": 1,
        "sectionType": "vocabulary-kanji",
        "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
    }
]

set_6_grammar_passage = """下の 文章は 「日本で うれしかった こと」についての 作文です。

「さいふ」
イザベラ・サントス

先週 わたしは さいふを なくしました。せんぱいに そうだんしたら、せんぱいは「すぐに けいさつに 行った ほうが いい。」と 言いました。そして、わたしを けいさつに つれて いって くれました。
つぎの 日 けいさつから 電話が [ 21 ]。さいふ [ 22 ] とどけられたそうです。けいさつで 見せられた さいふは わたしのでした。さいふの 中を 見たら、何も [ 23 ]。お金も ぜんぶ ありました。わたしは うれしく なって、だれが とどけて くれたか 聞きました。
[ 24 ]、おしえて もらえませんでした。その 人は 「早く とどけて あげて ください。もう わたしに れんらくは いりません。」と 言ったそうです。その 人に れんらく できないので、わたしは ちょっと [ 25 ]。
わたしは この 親切な 人に 心から おれいが 言いたいです。"""

set_6_grammar_questions = [
    {
        "id": 1,
        "questionText": "今日 （　） あした、大使館へ 行こうと 思って います。",
        "options": ["も", "か", "に", "が"],
        "correctIndex": 1,
        "sectionType": "grammar-reading",
        "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 2,
        "questionText": "きのう 有名な 小説家が イギリス （　） 来ました。",
        "options": ["しか", "で", "から", "も"],
        "correctIndex": 2,
        "sectionType": "grammar-reading",
        "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 3,
        "questionText": "父から 「ねぼうするな。」（　） しかられた。",
        "options": ["に", "を", "の", "と"],
        "correctIndex": 3,
        "sectionType": "grammar-reading",
        "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 4,
        "questionText": "一人で ケーキを 五つ （　） 食べて しまった。",
        "options": ["も", "で", "が", "に"],
        "correctIndex": 0,
        "sectionType": "grammar-reading",
        "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 5,
        "questionText": "A「いすとか テーブル （　） 買うなら、あの かぐ屋が いいですよ。」\nB「わかりました。ありがとうございます。」",
        "options": ["とかの", "とかに", "とかで", "とかを"],
        "correctIndex": 3,
        "sectionType": "grammar-reading",
        "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 6,
        "questionText": "図書館で ほうりつや けいざい （　） 本を さがしました。",
        "options": ["などに", "などで", "などの", "などが"],
        "correctIndex": 2,
        "sectionType": "grammar-reading",
        "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 7,
        "questionText": "先生「きのう （　） 学校を 休んだんですか。」\n学生「すみません。おなかが いたかったんです。」",
        "options": ["どんな", "どの", "どうして", "どうやって"],
        "correctIndex": 2,
        "sectionType": "grammar-reading",
        "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 8,
        "questionText": "A「おとといは やくそくの 場所に 来なかったね。」\nB「あっ、ごめん。（　） 忘れて いた。」",
        "options": ["はっきり", "ゆっくり", "しっかり", "すっかり"],
        "correctIndex": 3,
        "sectionType": "grammar-reading",
        "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 9,
        "questionText": "A「大学の 近くの 新しい アパートに 住みたいです。」\nB「あの アパートは （　） まわりも うるさいから、やめた ほうが いいですよ。」",
        "options": ["せまかったり", "せまいし", "せまいと", "せまかったら"],
        "correctIndex": 1,
        "sectionType": "grammar-reading",
        "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 10,
        "questionText": "青木「山田さんは 外国で 働きたいんですか。」\n山田「ええ。でも、外国で 働くのは、もっと （　） からに する つもりです。」",
        "options": ["勉強する", "勉強した", "勉強して いる", "勉強して"],
        "correctIndex": 3,
        "sectionType": "grammar-reading",
        "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 11,
        "questionText": "川中さんは ギターを （　） はじめたらしい。",
        "options": ["習い", "習う", "習った", "習って"],
        "correctIndex": 0,
        "sectionType": "grammar-reading",
        "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 12,
        "questionText": "A「北村さんは ときどき おそくまで 学校に のこる ことが （　） ようですね。」\nB「コンピューターの 試験の じゅんびを して いるそうですよ。」",
        "options": ["ある", "いる", "なる", "する"],
        "correctIndex": 0,
        "sectionType": "grammar-reading",
        "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 13,
        "questionText": "A「じしょを 持って こなかったんですか。」\nB「ええ。でも、友だちから （　）、だいじょうぶです。」",
        "options": ["借りたので", "借りたのに", "借りたけれど", "借りたり"],
        "correctIndex": 0,
        "sectionType": "grammar-reading",
        "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 14,
        "questionText": "A「この ざっし、少し 見ても いいですか。」\nB「どうぞ。よろしければ、（　）よ。」",
        "options": ["くれます", "やります", "くださいます", "さしあげます"],
        "correctIndex": 3,
        "sectionType": "grammar-reading",
        "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 15,
        "questionText": "あそこに （　） 顔の 子どもが 立って います。",
        "options": ["なきだす", "なくはずの", "なきそうな", "なくような"],
        "correctIndex": 2,
        "sectionType": "grammar-reading",
        "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 16,
        "questionText": "母親「これから この ______ ______ ★ ______ 行って あそんでね。」\n子ども「うん、わかった。」",
        "options": ["へやに", "へやは", "むこうの", "そうじする ところだから"],
        "correctIndex": 2,
        "sectionType": "grammar-reading",
        "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 17,
        "questionText": "A「お正月は 何か よていが ありますか。」\nB「はい。そふの 家へ ______ ______ ★ ______ です。」",
        "options": ["とまり", "つもり", "行く", "に"],
        "correctIndex": 2,
        "sectionType": "grammar-reading",
        "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 18,
        "questionText": "A「町村さんは 大学を やめるんですか。」\nB「ええ。きのう 町村さんが ______ ______ ★ ______ を 聞きましたよ。」",
        "options": ["いる", "言って", "の", "そう"],
        "correctIndex": 0,
        "sectionType": "grammar-reading",
        "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 19,
        "questionText": "どんなに ぐあいが ______ ______ ★ ______ が ある ときは、会社へ 行かなければ ならない。",
        "options": ["大事な", "も", "悪くて", "用事"],
        "correctIndex": 0,
        "sectionType": "grammar-reading",
        "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 20,
        "questionText": "（店で）\nきゃく「これと 同じ ソフトは 売って いませんか。」\n店員「すみません。この ソフトは もう ______ ______ ★ ______ なって おります。」",
        "options": ["生産", "中止", "が", "に"],
        "correctIndex": 1,
        "sectionType": "grammar-reading",
        "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 21,
        "questionText": "[ 21 ]",
        "options": ["かかるでしょう", "かかって きました", "かかって いきました", "かかりました"],
        "correctIndex": 1,
        "sectionType": "grammar-reading",
        "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
        "passage": set_6_grammar_passage
    },
    {
        "id": 22,
        "questionText": "[ 22 ]",
        "options": ["に", "を", "で", "が"],
        "correctIndex": 3,
        "sectionType": "grammar-reading",
        "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
        "passage": set_6_grammar_passage
    },
    {
        "id": 23,
        "questionText": "[ 23 ]",
        "options": [
            "なくなって しまいました",
            "なくなって いました",
            "なくなって いませんでした",
            "なくなって いないはずでした"
        ],
        "correctIndex": 2,
        "sectionType": "grammar-reading",
        "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
        "passage": set_6_grammar_passage
    },
    {
        "id": 24,
        "questionText": "[ 24 ]",
        "options": ["だから", "それから", "それでは", "でも"],
        "correctIndex": 3,
        "sectionType": "grammar-reading",
        "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
        "passage": set_6_grammar_passage
    },
    {
        "id": 25,
        "questionText": "[ 25 ]",
        "options": [
            "ざんねんだろうと 思いました",
            "ざんねんだと 思いました",
            "ざんねんだろうと 思って いました",
            "ざんねんだと 思って いました"
        ],
        "correctIndex": 1,
        "sectionType": "grammar-reading",
        "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
        "passage": set_6_grammar_passage
    }
]

set_7_vocab_questions = [
    {
        "id": 1,
        "questionText": "父は <u>肉</u>が きらいです。",
        "options": ["こめ", "にく", "とり", "むし"],
        "correctIndex": 1,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい1 <u>　　</u>の ことばは ひらがなで どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 2,
        "questionText": "けっこんしきの <u>会場</u>を さがして います。",
        "options": ["かいじょう", "かいじょ", "かいしょう", "かいしょ"],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい1 <u>　　</u>の ことばは ひらがなで どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 3,
        "questionText": "いっしょに <u>写真</u>を とりましょう。",
        "options": ["しょじん", "しゃしん", "しゃじん", "しょしん"],
        "correctIndex": 1,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい1 <u>　　</u>の ことばは ひらがなで どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 4,
        "questionText": "<u>病気</u>で 学校を 休みました。",
        "options": ["びょうき", "びようき", "びょうぎ", "びようぎ"],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい1 <u>　　</u>の ことばは ひらがなで どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 5,
        "questionText": "<u>青</u>の いとは ありますか。",
        "options": ["あか", "あお", "しろ", "くろ"],
        "correctIndex": 1,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい1 <u>　　</u>の ことばは ひらがなで どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 6,
        "questionText": "毎週 <u>教会</u>に かよって います。",
        "options": ["きょうがい", "きょがい", "きょうかい", "きょかい"],
        "correctIndex": 2,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい1 <u>　　</u>の ことばは ひらがなで どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 7,
        "questionText": "よしゅうの <u>仕方</u>が わかりません。",
        "options": ["しかた", "しほう", "しいかた", "しいほう"],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい1 <u>　　</u>の ことばは ひらがなで どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 8,
        "questionText": "あの <u>建物</u>の 中に レストランが あります。",
        "options": ["たつもつ", "たてもの", "たつもの", "たてもつ"],
        "correctIndex": 1,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい1 <u>　　</u>の ことばは ひらがなで どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 9,
        "questionText": "となりの <u>市</u>の としょかんで 本を かりました。",
        "options": ["と", "まち", "むら", "し"],
        "correctIndex": 3,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい1 <u>　　</u>の ことばは ひらがなで どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 10,
        "questionText": "この きょうしつは <u>さむい</u>です。",
        "options": ["古い", "広い", "寒い", "暑い"],
        "correctIndex": 2,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい2 <u>　　</u>の ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 11,
        "questionText": "あす ほうりつの <u>しけん</u>が あります。",
        "options": ["試験", "試検", "訊験", "訊検"],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい2 <u>　　</u>の ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 12,
        "questionText": "メイさんの じゅうしょを <u>おしえて</u> ください。",
        "options": ["数えて", "教えて", "敗えて", "敢えて"],
        "correctIndex": 1,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい2 <u>　　</u>の ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 13,
        "questionText": "エマさんの <u>さくぶん</u>は おもしろいです。",
        "options": ["作交", "作文", "作攵", "作夂"],
        "correctIndex": 1,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい2 <u>　　</u>の ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 14,
        "questionText": "わたしは カレーが <u>すき</u>です。",
        "options": ["孜き", "攷き", "好き", "妤き"],
        "correctIndex": 2,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい2 <u>　　</u>の ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 15,
        "questionText": "この 店で <u>ふく</u>を 買いました。",
        "options": ["販", "報", "破", "服"],
        "correctIndex": 3,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい2 <u>　　</u>の ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 16,
        "questionText": "わたしは まだ かぜが （　） いません。",
        "options": ["なおって", "やんで", "ふいて", "ひいて"],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 17,
        "questionText": "この コンピューターは （　） つかって ください。",
        "options": ["しんせつに", "じゆうに", "じゃまに", "ふべんに"],
        "correctIndex": 1,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 18,
        "questionText": "この （　） は あつくて おいしいです。",
        "options": ["ネクタイ", "カーテン", "テキスト", "ステーキ"],
        "correctIndex": 3,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 19,
        "questionText": "わたしは 車に のると （　）が わるく なります。",
        "options": ["つごう", "くうき", "きぶん", "てんき"],
        "correctIndex": 2,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 20,
        "questionText": "ベトナム語の 本を にほんごに （　） します。",
        "options": ["ほんやく", "ゆにゅう", "ゆしゅつ", "あんない"],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 21,
        "questionText": "わからない ところを 先生に （　） します。",
        "options": ["しつもん", "けんきゅう", "しつれい", "あいさつ"],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 22,
        "questionText": "学生の りょうしんが こうちょうを （　） きました。",
        "options": ["とどけて", "よって", "たずねて", "まいって"],
        "correctIndex": 2,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 23,
        "questionText": "この テキストは ふくしゅうするのに （　） です。",
        "options": ["むり", "てきとう", "じょうぶ", "あんぜん"],
        "correctIndex": 1,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 24,
        "questionText": "いけの 魚を （　） ください。",
        "options": ["むかえないで", "つたえないで", "のりかえないで", "つかまえないで"],
        "correctIndex": 3,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 25,
        "questionText": "<u>今 パーティーの りょうりを よういして います。</u>",
        "options": [
            "今 パーティーの りょうりを つくって います。",
            "今 パーティーの りょうりを かたづけて います。",
            "今 パーティーの りょうりを たべて います。",
            "今 パーティーの りょうりを みて います。"
        ],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい4 <u>　　</u>の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 26,
        "questionText": "<u>車が ふえて、この 道は きけんに なりました。</u>",
        "options": [
            "車が ふえて、この 道は べんりに なりました。",
            "車が ふえて、この 道は にぎやかに なりました。",
            "車が ふえて、この 道は あぶなく なりました。",
            "車が ふえて、この 道は うるさく なりました。"
        ],
        "correctIndex": 2,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい4 <u>　　</u>の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 27,
        "questionText": "<u>この レポートは すばらしいです。</u>",
        "options": [
            "この レポートは じょうずに かけて います。",
            "この レポートは たくさん かけて います。",
            "この レポートは かんたんに かけて います。",
            "この レポートは だいたい かけて います。"
        ],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい4 <u>　　</u>の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 28,
        "questionText": "<u>ヤンさんは 4月に にゅういんしました。</u>",
        "options": [
            "ヤンさんは 4月に がっこうに はいりました。",
            "ヤンさんは 4月に びょういんに はいりました。",
            "ヤンさんは 4月に びょういんを でました。",
            "ヤンさんは 4月に がっこうを でました。"
        ],
        "correctIndex": 1,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい4 <u>　　</u>の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 29,
        "questionText": "<u>アリさんは まちださんに あいさつされました。</u>",
        "options": [
            "まちださんは アリさんに 「おはようございます」と 言いました。",
            "まちださんは アリさんに 「すぐ 行きます」と 言いました。",
            "まちださんは アリさんに 「時間が ありますか」と 言いました。",
            "まちださんは アリさんに 「これが いいです」と 言いました。"
        ],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい4 <u>　　</u>の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
    },
    {
        "id": 30,
        "questionText": "げんいん",
        "options": [
            "これは わたしの きもちを きめる <u>げんいんです</u>。",
            "この もんだいは 会社と <u>げんいんが</u> あります。",
            "これは いそがしい <u>げんいんの</u> しごとです。",
            "じどうしゃの こしょうの <u>げんいんが</u> わかりました。"
        ],
        "correctIndex": 3,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
    },
    {
        "id": 31,
        "questionText": "じょうぶ",
        "options": [
            "かのじょは こころが とても <u>じょうぶです</u>。",
            "きょうは しゅくだいが ないので、<u>じょうぶです</u>。",
            "バスの じこが ありましたが、<u>じょうぶです</u>。",
            "この かばんは やすいですが、<u>じょうぶです</u>。"
        ],
        "correctIndex": 3,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
    },
    {
        "id": 32,
        "questionText": "やさしい",
        "options": [
            "あねの へやは あかるくて <u>やさしいです</u>。",
            "この もめんの ふくは <u>やさしいです</u>。",
            "ピアノの 先生は いつも 子どもに <u>やさしいです</u>。",
            "この 魚は 小さいので、<u>やさしいです</u>。"
        ],
        "correctIndex": 2,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
    },
    {
        "id": 33,
        "questionText": "こわす",
        "options": [
            "パソコンを おとして、<u>こわして</u> しまいました。",
            "けがを <u>こわして</u>、はやく げんきに なりたいです。",
            "ねこが いたずらして、セーターを <u>こわして</u> しまいました。",
            "ナイフで ゆびを <u>こわして</u>、ちが 出ました。"
        ],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
    },
    {
        "id": 34,
        "questionText": "しょうかい",
        "options": [
            "チェンさんは 外国で 新しい ぎじゅつを <u>しょうかいして</u> います。",
            "あなたの たんじょうびを わたしに <u>しょうかいして</u> ください。",
            "やまかわさんは じゅぎょうに <u>しょうかいして</u> います。",
            "ビリーさんは この えいがに <u>しょうかいして</u> いますか。"
        ],
        "correctIndex": 0,
        "sectionType": "vocabulary-kanji",
        "instruction": "もんだい5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
    }
]

set_7_grammar_passage = """下の 文章は 「わたしの 好きな 場所」についての 作文です。

「図書館」
イム・ヒョナ

わたしの 好きな 場所は 家の 近くに ある 図書館です。その 図書館は 大きい こうえんの 中に あります。わたしは ほとんど 毎日 そこへ 行って います。
図書館では みんな [ 21 ]。わたしが 一度 けいたいでんわで 話して いた とき、図書館の 人に [ 22 ]。
日曜日 わたしは おべんとうを 持って 図書館へ 行きます。図書館に 着くと まず かんこく語の 新聞を 読みます。[ 23 ]、DVDを 借ります。DVDは 図書館の 中の パソコンで 見なければ なりません。昼には たいてい 外 [ 24 ] 出て いって、こうえんで おべんとうを 食べます。たまに こうえんの 中を さんぽします。午後は また 図書館で 借りたい 本を さがします。
図書館は 一日中 [ 25 ] 場所だと 思います。"""

set_7_grammar_questions = [
    {
        "id": 1,
        "questionText": "兄は 「新しい 車（　）ほしい。」と 言って います。",
        "options": ["や", "で", "が", "の"],
        "correctIndex": 2,
        "sectionType": "grammar-reading",
        "instruction": "もんだい1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 2,
        "questionText": "けが（　）入院して いる 友だちの おみまいに 行った。",
        "options": ["で", "も", "や", "へ"],
        "correctIndex": 0,
        "sectionType": "grammar-reading",
        "instruction": "もんだい1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 3,
        "questionText": "外国語で 話す（　）は むずかしいけれど、楽しいです。",
        "options": ["の", "が", "で", "へ"],
        "correctIndex": 0,
        "sectionType": "grammar-reading",
        "instruction": "もんだい1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 4,
        "questionText": "妹は ずっと テレビ（　）見て いて、勉強しようと しない。",
        "options": ["ばかり", "ぐらい", "ごろ", "までに"],
        "correctIndex": 0,
        "sectionType": "grammar-reading",
        "instruction": "もんだい1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 5,
        "questionText": "（くうこうの 店で）\n店員「おきゃくさま、この おかしは ここ（　）売って いませんよ。」\nきゃく「そうですか。では、5こ ください。」",
        "options": ["では", "でも", "でだけ", "でしか"],
        "correctIndex": 3,
        "sectionType": "grammar-reading",
        "instruction": "もんだい1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 6,
        "questionText": "上田「大北さん、ずいぶん 大きい かばんを 買ったんですね。」\n大北「はい。ずっと 大きい（　）ほしかったんです。」",
        "options": ["のと", "のや", "のに", "のが"],
        "correctIndex": 3,
        "sectionType": "grammar-reading",
        "instruction": "もんだい1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 7,
        "questionText": "A「ここから びじゅつかんまで （　）行けば いいですか。」\nB「ちかてつで 行くと いいですよ。」",
        "options": ["どれぐらい", "どうやって", "どちら", "どなた"],
        "correctIndex": 1,
        "sectionType": "grammar-reading",
        "instruction": "もんだい1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 8,
        "questionText": "病気に なった ときは、（　）病院へ 行った ほうが いい。",
        "options": ["すぐに", "今すぐ", "もうすぐ", "よく"],
        "correctIndex": 0,
        "sectionType": "grammar-reading",
        "instruction": "もんだい1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 9,
        "questionText": "大村「北川さんは 休みの 日は 何を して いるんですか。」\n北川「音楽を （　）、おかしを 作って いる ことが 多いです。」",
        "options": ["聞くので", "聞くから", "聞きながら", "聞くのに"],
        "correctIndex": 2,
        "sectionType": "grammar-reading",
        "instruction": "もんだい1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 10,
        "questionText": "子ども「お父さん、どこか あそびに つれて いってよ。」\n父親「今日は いそがしいから、時間が （　）ときにね。」",
        "options": ["ない", "なくて", "ある", "あって"],
        "correctIndex": 2,
        "sectionType": "grammar-reading",
        "instruction": "もんだい1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 11,
        "questionText": "あたたかくて （　）らしい 日が つづいて いる。",
        "options": ["春", "春の", "春に", "春で"],
        "correctIndex": 0,
        "sectionType": "grammar-reading",
        "instruction": "もんだい1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 12,
        "questionText": "（洋服売り場で）\nA「あそこに ある スカートは きれいですね。」\nB「ええ。ちょっと はいて （　）です。」",
        "options": ["したい", "みたい", "いたい", "なりたい"],
        "correctIndex": 1,
        "sectionType": "grammar-reading",
        "instruction": "もんだい1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 13,
        "questionText": "A「このあいだ 道で おじいさんの にもつを （　）、おれいを もらいました。」\nB「それは よかったですね。」",
        "options": ["運んだら", "運べば", "運ぶなら", "運んだのに"],
        "correctIndex": 0,
        "sectionType": "grammar-reading",
        "instruction": "もんだい1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 14,
        "questionText": "わたしは ぶちょうの けっこんしきに しょうたいして （　）。",
        "options": ["くれました", "やりました", "くださいました", "いただきました"],
        "correctIndex": 3,
        "sectionType": "grammar-reading",
        "instruction": "もんだい1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 15,
        "questionText": "ニュースに よると、きのう 駅の 近くで 火事が （　）。",
        "options": ["ありそうだ", "あったそうだ", "あるだろう", "あるようだった"],
        "correctIndex": 1,
        "sectionType": "grammar-reading",
        "instruction": "もんだい1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 16,
        "questionText": "（本屋で）\nこうはい「この テキストは わかりやすいですか。」\nせんぱい「この ______ ______ ★ ______ が いいと 思うよ。」",
        "options": ["テキストより", "テキストの", "あの", "ほう"],
        "correctIndex": 1,
        "sectionType": "grammar-reading",
        "instruction": "もんだい2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 17,
        "questionText": "A「ちょっと この 仕事を 手伝って くれませんか。」\nB「今は むりですが、午後からなら ______ ______ ★ ______ よ。」",
        "options": ["が", "できます", "手伝う", "こと"],
        "correctIndex": 0,
        "sectionType": "grammar-reading",
        "instruction": "もんだい2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 18,
        "questionText": "A「______ ______ ★ ______ を して いるんですか。」\nB「ええ。ずっと いそがしくて、時間が なかったんです。」",
        "options": ["こんな", "食事", "時間", "に"],
        "correctIndex": 3,
        "sectionType": "grammar-reading",
        "instruction": "もんだい2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 19,
        "questionText": "朝 急いで いたので、______ ______ ★ ______ を 出て しまったかもしれない。",
        "options": ["つけたまま", "を", "家", "テレビ"],
        "correctIndex": 0,
        "sectionType": "grammar-reading",
        "instruction": "もんだい2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 20,
        "questionText": "大下「ワンさん、京都へ 行くんですか。」\nワン「はい。京都では 有名な 店で ______ ______ ★ ______ したり しようと 思って います。」",
        "options": ["見物", "買い物", "したり", "古い てらを"],
        "correctIndex": 3,
        "sectionType": "grammar-reading",
        "instruction": "もんだい2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
    },
    {
        "id": 21,
        "questionText": "[ 21 ]",
        "options": ["静かに させて ください", "静かに なりました", "静かに しても かまいません", "静かに して います"],
        "correctIndex": 3,
        "sectionType": "grammar-reading",
        "instruction": "もんだい3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
        "passage": set_7_grammar_passage
    },
    {
        "id": 22,
        "questionText": "[ 22 ]",
        "options": ["注意して しまいました", "注意する ところでした", "注意されて しまいました", "注意されて いました"],
        "correctIndex": 2,
        "sectionType": "grammar-reading",
        "instruction": "もんだい3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
        "passage": set_7_grammar_passage
    },
    {
        "id": 23,
        "questionText": "[ 23 ]",
        "options": ["しかし", "すると", "それから", "それで"],
        "correctIndex": 2,
        "sectionType": "grammar-reading",
        "instruction": "もんだい3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
        "passage": set_7_grammar_passage
    },
    {
        "id": 24,
        "questionText": "[ 24 ]",
        "options": ["を", "に", "が", "は"],
        "correctIndex": 1,
        "sectionType": "grammar-reading",
        "instruction": "もんだい3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
        "passage": set_7_grammar_passage
    },
    {
        "id": 25,
        "questionText": "[ 25 ]",
        "options": ["楽しもう", "楽しんだ", "楽しめる", "楽しまれる"],
        "correctIndex": 2,
        "sectionType": "grammar-reading",
        "instruction": "もんだい3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
        "passage": set_7_grammar_passage
    }
]

output_data = {
    "sets": [
        {
            "id": "set-6",
            "title": "Set 6",
            "description": "Practice Test 6",
            "sections": {
                "vocabulary-kanji": {
                    "title": "Vocabulary & Kanji",
                    "titleJa": "文字・語彙",
                    "questions": set_6_vocab_questions
                },
                "grammar-reading": {
                    "title": "Grammar & Reading",
                    "titleJa": "文法・読解",
                    "questions": set_6_grammar_questions
                }
            }
        },
        {
            "id": "set-7",
            "title": "Set 7",
            "description": "Practice Test 7",
            "sections": {
                "vocabulary-kanji": {
                    "title": "Vocabulary & Kanji",
                    "titleJa": "文字・語彙",
                    "questions": set_7_vocab_questions
                },
                "grammar-reading": {
                    "title": "Grammar & Reading",
                    "titleJa": "文法・読解",
                    "questions": set_7_grammar_questions
                }
            }
        }
    ]
}

with open(r"D:\sudip_software\nihongo_playground\N4_Chokuzen_Taisaku_Processing\sets_6_7.json", "w", encoding="utf-8") as f:
    json.dump(output_data, f, ensure_ascii=False, indent=2)

print("Generated sets_6_7.json successfully!")
