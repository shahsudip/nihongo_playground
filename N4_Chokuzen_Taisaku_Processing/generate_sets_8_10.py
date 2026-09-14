import json
import os

sets_data = [
  {
    "id": "set-8",
    "title": "Set 8",
    "description": "Practice Test 8",
    "sections": {
      "vocabulary-kanji": {
        "title": "Vocabulary & Kanji",
        "titleJa": "文字・語彙",
        "questions": [
          {
            "id": 1,
            "questionText": "<u>今週</u>は いそがしいです。",
            "options": ["こんしゅう", "こんしょう", "こんじゅう", "こんじょう"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 2,
            "questionText": "<u>朝</u> ごはんを 食べませんでした。",
            "options": ["ひる", "あさ", "よる", "ばん"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 3,
            "questionText": "あそこに <u>高い</u> たてものが あります。",
            "options": ["ひくい", "たかい", "ながい", "みじかい"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 4,
            "questionText": "この へやは <u>暗い</u>ですね。",
            "options": ["あかるい", "すずしい", "あたたかい", "くらい"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 5,
            "questionText": "<u>池</u>の 水が つめたいです。",
            "options": ["うみ", "いけ", "かわ", "みずうみ"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 6,
            "questionText": "かれは <u>小説</u>を 書いて います。",
            "options": ["しょうせつ", "しょうぜつ", "じょうせつ", "じょうぜつ"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 7,
            "questionText": "<u>急に</u> 雨が ふりだしました。",
            "options": ["じゅうに", "きゅうに", "じゅに", "きゅに"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 8,
            "questionText": "あした <u>試験</u>が あります。",
            "options": ["しけん", "じけん", "しげん", "じげん"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 9,
            "questionText": "<u>都合</u>が いい 日を おしえて ください。",
            "options": ["とごう", "つあう", "つごう", "とあう"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 10,
            "questionText": "まいあさ コーヒーを <u>のみます</u>。",
            "options": ["飯みます", "食みます", "吸みます", "飲みます"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 11,
            "questionText": "すきな <u>うた</u>を うたいました。",
            "options": ["詩", "曲", "歌", "楽"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 12,
            "questionText": "かのじょに <u>てがみ</u>を おくりました。",
            "options": ["手氏", "手紙", "手民", "手低"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 13,
            "questionText": "<u>おとうと</u>は 中学生です。",
            "options": ["兄", "弟", "妹", "姉"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 14,
            "questionText": "<u>こんど</u>の 日曜日に えいがを 見ます。",
            "options": ["今度", "今回", "来度", "来回"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 15,
            "questionText": "ともだちの 家へ <u>あそび</u>に 行きました。",
            "options": ["遊び", "泳び", "旅び", "歩び"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 16,
            "questionText": "じゅぎょうの あとで（　）へ 行って、本を 借りました。",
            "options": ["としょしつ", "としょかん", "きょうしつ", "しょくどう"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 17,
            "questionText": "あしたの パーティーには どんな 服を（　）行けば いいですか。",
            "options": ["はいて", "かぶって", "着て", "かけて"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 18,
            "questionText": "道が こんで いたので、やくそくの 時間に（　）しまいました。",
            "options": ["まにあって", "おくれて", "おくれて", "まにあわなくて"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 19,
            "questionText": "スーパーで バナナを 一（　）買いました。",
            "options": ["まい", "ほん", "さつ", "こ"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 20,
            "questionText": "かぜを ひいたので、病院で（　）を もらいました。",
            "options": ["おゆ", "おちゃ", "ごはん", "くすり"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 21,
            "questionText": "（レストランで）\n店員「いらっしゃいませ。何（　）様ですか。」\nきゃく「二人です。」",
            "options": ["人", "名", "方", "者"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 22,
            "questionText": "テストの 前に ノートを（　）して おきます。",
            "options": ["コピー", "サービス", "ニュース", "スピーチ"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 23,
            "questionText": "この シャツは 洗濯しても すぐ（　）ます。",
            "options": ["かわき", "ぬれ", "よごれ", "やぶれ"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 24,
            "questionText": "へやの 空気を かえるために、まどを（　）ました。",
            "options": ["しめ", "けし", "あけ", "つけ"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 25,
            "questionText": "<u>あしたの 会議は なくなりました。</u>",
            "options": [
              "あしたの 会議は はじまります。",
              "あしたの 会議は ちゅうしに なりました。",
              "あしたの 会議は 早く おわります。",
              "あしたの 会議は おくれます。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題4 ＿＿の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 26,
            "questionText": "<u>かれは すぐ 来るでしょう。</u>",
            "options": [
              "かれは ぜんぜん 来ません。",
              "かれは もうすぐ 来るでしょう。",
              "かれは ゆっくり 来るでしょう。",
              "かれは たまに 来るでしょう。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題4 ＿＿の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 27,
            "questionText": "<u>この まちは にぎやかです。</u>",
            "options": [
              "この まちは 人が たくさん いて 明るいです。",
              "この まちは しずかです。",
              "この まちは 店が ぜんぜん ありません。",
              "この まちは きたないです。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題4 ＿＿の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 28,
            "questionText": "<u>わたしは ピアノを ひく ことが できます。</u>",
            "options": [
              "わたしは ピアノが じょうずです。",
              "わたしは ピアノを ひくのが 下手です。",
              "わたしは ピアノを 持って いません。",
              "わたしは ピアノが きらいです。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題4 ＿＿の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 29,
            "questionText": "<u>あした ゆうがた 電話して ください。</u>",
            "options": [
              "あしたの ひるすぎに 電話して ください。",
              "あしたの よる おそくに 電話して ください。",
              "あしたの あさ はやくに 電話して ください。",
              "あしたの ひるまえに 電話して ください。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題4 ＿＿の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 30,
            "questionText": "えらぶ",
            "options": [
              "すきな 色の ペンを 一本 <u>えらんで</u> ください。",
              "駅まで タクシーを <u>えらび</u>ました。",
              "あしたの 天気を <u>えらび</u>ましょう。",
              "時間を <u>えらんで</u> ごはんを 食べます。"
            ],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
          },
          {
            "id": 31,
            "questionText": "にゅうがく",
            "options": [
              "兄は 先月 会社に <u>入学</u>しました。",
              "弟は 来年 大学に <u>入学</u>します。",
              "来週 病院に <u>入学</u>する よていです。",
              "新しい 図書館が <u>入学</u>しました。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
          },
          {
            "id": 32,
            "questionText": "ふくざつ",
            "options": [
              "この 機械の 使い方 は とても <u>ふくざつ</u>で わかりにくい。",
              "この へやは <u>ふくざつ</u>で 広いです。",
              "きょうの 天気は <u>ふくざつ</u>に 晴れています。",
              "この 料理は <u>ふくざつ</u>で おいしいです。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
          },
          {
            "id": 33,
            "questionText": "そろそろ",
            "options": [
              "電車の 中で <u>そろそろ</u> ねました。",
              "あしたは <u>そろそろ</u> 雨が ふるでしょう。",
              "もう 10時ですから、<u>そろそろ</u> 帰りましょう。",
              "<u>そろそろ</u> 走ると あぶないですよ。"
            ],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
          },
          {
            "id": 34,
            "questionText": "きめる",
            "options": [
              "かぜを ひいたので、薬を <u>きめ</u>ました。",
              "まどを <u>きめて</u> 出かけました。",
              "友だちと 映画を <u>きめ</u>ました。",
              "旅行の 行き先を <u>きめ</u>ました。"
            ],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
          }
        ]
      },
      "grammar-reading": {
        "title": "Grammar & Reading",
        "titleJa": "文法・読解",
        "questions": [
          {
            "id": 1,
            "questionText": "わたしは 毎週 土曜日に プール（　）泳ぎに 行きます。",
            "options": ["を", "で", "へ", "に"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 2,
            "questionText": "山田さんは 歌も 上手（　）、ピアノも ひけます。",
            "options": ["で", "し", "に", "と"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 3,
            "questionText": "テレビの 音が 大きいから、少し 小さく（　）ください。",
            "options": ["なって", "して", "あって", "いれて"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 4,
            "questionText": "きのうは 疲れて いたので、ごはんを 食べ（　）ねて しまいました。",
            "options": ["ないで", "ずに", "なくて", "ないで"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 5,
            "questionText": "この 本は おもしろい（　）、すぐに 読めますよ。",
            "options": ["のに", "から", "でも", "なら"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 6,
            "questionText": "電車に かさを（　）しまいました。",
            "options": ["わすれて", "おとして", "おいて", "なくして"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 7,
            "questionText": "あした 雨が（　）、ピクニックは 中止です。",
            "options": ["ふれば", "ふると", "ふったら", "ふっても"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 8,
            "questionText": "わたしは 先生に 本を（　）。",
            "options": ["あげました", "いただきました", "くれました", "やりました"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 9,
            "questionText": "日本語が（　）ように、毎日 ラジオを 聞いて います。",
            "options": ["上手な", "上手に", "上手になる", "上手になれる"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 10,
            "questionText": "出かける まえに、電気が ついて いるか（　）見て ください。",
            "options": ["どうか", "どうかを", "か", "かを"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 11,
            "questionText": "田中さんは 今 会議中ですから、ここに（　）待って いて ください。",
            "options": ["すわって", "すわり", "すわる", "すわった"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 12,
            "questionText": "子どもに 部屋の そうじを（　）。",
            "options": ["させました", "されました", "して もらいました", "して あげました"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 13,
            "questionText": "この 料理は かんたんに（　）そうです。",
            "options": ["作れる", "作れ", "作る", "作った"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 14,
            "questionText": "あしたは 早く 起きなければ（　）。",
            "options": ["いけません", "なりません", "だめです", "いいです"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 15,
            "questionText": "先生、この 言葉の 意味を 教えて（　）ませんか。",
            "options": ["ください", "いただけ", "もらい", "あげ"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 16,
            "questionText": "わたしは ______ ______ ★ ______ 思います。",
            "options": ["日本へ", "行きたい", "いつか", "と"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
          },
          {
            "id": 17,
            "questionText": "駅前の 店で ______ ______ ★ ______ 買いました。",
            "options": ["おいしい", "パン", "とても", "を"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
          },
          {
            "id": 18,
            "questionText": "田中さんは ______ ______ ★ ______ 言って いました。",
            "options": ["来られない", "あした", "と", "パーティーに"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
          },
          {
            "id": 19,
            "questionText": "この 部屋は ______ ______ ★ ______ 勉強しやすい。",
            "options": ["しずか", "とても", "で", "広くて"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
          },
          {
            "id": 20,
            "questionText": "わたしが ______ ______ ★ ______ ください。",
            "options": ["まで", "来る", "ここで", "待って いて"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
          },
          {
            "id": 21,
            "questionText": "[ 21 ]",
            "options": ["着たのを", "着て いたのを", "着て いるのを", "着るのを"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
            "passage": "下の 文章は 「夏休み」についての 作文です。\n\n「おまつり」\nマリア・グリーン\n\n夏休みに わたしは 友だちの 山口さんと じんじゃの おまつりに 行きました。わたしは 「ゆかた」と いう かんたんな 着物を 着て いきました。着方が わからなかったので、山口さんに [ 21 ] 手伝って もらいました。\nじんじゃは さかの 上に ありました。さかの とちゅう [ 22 ] 石の かいだんを のぼりました。かいだんは [ 23 ]、ゆかたを 着て いたので、時間が かかりました。\nじんじゃには いろいろな 店が ありました。あまり 見た ことが ない 食べ物の 店も ありました。それから、たくさんの 人が おまつりの おどりを おどって いました。おまつりの おどりは 「ぼんおどり」と [ 24 ]。おどりを見て いたら、おどって いる 人に 「いっしょに おどろう。」と 言われました。[ 25 ]、わたしと 山口さんも いっしょに おどりました。\nとても 楽しかったです。"
          },
          {
            "id": 22,
            "questionText": "[ 22 ]",
            "options": ["や", "へ", "から", "しか"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
            "passage": "下の 文章は 「夏休み」についての 作文です。\n\n「おまつり」\nマリア・グリーン\n\n夏休みに わたしは 友だちの 山口さんと じんじゃの おまつりに 行きました。わたしは 「ゆかた」と いう かんたんな 着物を 着て いきました。着方が わからなかったので、山口さんに [ 21 ] 手伝って もらいました。\nじんじゃは さかの 上に ありました。さかの とちゅう [ 22 ] 石の かいだんを のぼりました。かいだんは [ 23 ]、ゆかたを 着て いたので、時間が かかりました。\nじんじゃには いろいろな 店が ありました。あまり 見た ことが ない 食べ物の 店も ありました。それから、たくさんの 人が おまつりの おどりを おどって いました。おまつりの おどりは 「ぼんおどり」と [ 24 ]。おどりを見て いたら、おどって いる 人に 「いっしょに おどろう。」と 言われました。[ 25 ]、わたしと 山口さんも いっしょに おどりました。\nとても 楽しかったです。"
          },
          {
            "id": 23,
            "questionText": "[ 23 ]",
            "options": ["急だし", "急だと", "急なら", "急でも"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
            "passage": "下の 文章は 「夏休み」についての 作文です。\n\n「おまつり」\nマリア・グリーン\n\n夏休みに わたしは 友だちの 山口さんと じんじゃの おまつりに 行きました。わたしは 「ゆかた」と いう かんたんな 着物を 着て いきました。着方が わからなかったので、山口さんに [ 21 ] 手伝って もらいました。\nじんじゃは さかの 上に ありました。さかの とちゅう [ 22 ] 石の かいだんを のぼりました。かいだんは [ 23 ]、ゆかたを 着て いたので、時間が かかりました。\nじんじゃには いろいろな 店が ありました。あまり 見た ことが ない 食べ物の 店も ありました。それから、たくさんの 人が おまつりの おどりを おどって いました。おまつりの おどりは 「ぼんおどり」と [ 24 ]。おどりを見て いたら、おどって いる 人に 「いっしょに おどろう。」と 言われました。[ 25 ]、わたしと 山口さんも いっしょに おどりました。\nとても 楽しかったです。"
          },
          {
            "id": 24,
            "questionText": "[ 24 ]",
            "options": ["いわせます", "いって みます", "いうつもりです", "いうそうです"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
            "passage": "下の 文章は 「夏休み」についての 作文です。\n\n「おまつり」\nマリア・グリーン\n\n夏休みに わたしは 友だちの 山口さんと じんじゃの おまつりに 行きました。わたしは 「ゆかた」と いう かんたんな 着物を 着て いきました。着方が わからなかったので、山口さんに [ 21 ] 手伝って もらいました。\nじんじゃは さかの 上に ありました。さかの とちゅう [ 22 ] 石の かいだんを のぼりました。かいだんは [ 23 ]、ゆかたを 着て いたので、時間が かかりました。\nじんじゃには いろいろな 店が ありました。あまり 見た ことが ない 食べ物の 店も ありました。それから、たくさんの 人が おまつりの おどりを おどって いました。おまつりの おどりは 「ぼんおどり」と [ 24 ]。おどりを見て いたら、おどって いる 人に 「いっしょに おどろう。」と 言われました。[ 25 ]、わたしと 山口さんも いっしょに おどりました。\nとても 楽しかったです。"
          },
          {
            "id": 25,
            "questionText": "[ 25 ]",
            "options": ["それで", "すると", "しかし", "それでは"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
            "passage": "下の 文章は 「夏休み」についての 作文です。\n\n「おまつり」\nマリア・グリーン\n\n夏休みに わたしは 友だちの 山口さんと じんじゃの おまつりに 行きました。わたしは 「ゆかた」と いう かんたんな 着物を 着て いきました。着方が わからなかったので、山口さんに [ 21 ] 手伝って もらいました。\nじんじゃは さかの 上に ありました。さかの とちゅう [ 22 ] 石の かいだんを のぼりました。かいだんは [ 23 ]、ゆかたを 着て いたので、時間が かかりました。\nじんじゃには いろいろな 店が ありました。あまり 見た ことが ない 食べ物の 店も ありました。それから、たくさんの 人が おまつりの おどりを おどって いました。おまつりの おどりは 「ぼんおどり」と [ 24 ]。おどりを見て いたら、おどって いる 人に 「いっしょに おどろう。」と 言われました。[ 25 ]、わたしと 山口さんも いっしょに おどりました。\nとても 楽しかったです。"
          }
        ]
      }
    }
  },
  {
    "id": "set-9",
    "title": "Set 9",
    "description": "Practice Test 9",
    "sections": {
      "vocabulary-kanji": {
        "title": "Vocabulary & Kanji",
        "titleJa": "文字・語彙",
        "questions": [
          {
            "id": 1,
            "questionText": "あした <u>東京</u>へ 行きます。",
            "options": ["とうきょう", "とうぎょう", "どきょう", "どぎょう"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 2,
            "questionText": "<u>毎朝</u> 新聞を 読みます。",
            "options": ["まいよる", "まいあさ", "まいにち", "まいばん"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 3,
            "questionText": "ここは <u>静か</u>な 町です。",
            "options": ["にぎやか", "さわやか", "しずか", "ゆたか"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 4,
            "questionText": "<u>急</u>に 雨が ふりだしました。",
            "options": ["じゅう", "きゅう", "じゅ", "きゅ"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 5,
            "questionText": "<u>姉</u>は 看護師です。",
            "options": ["いもうと", "あね", "あに", "おとうと"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 6,
            "questionText": "この 川は <u>深い</u>ですから 気をつけて ください。",
            "options": ["あさい", "ひろい", "ながい", "ふかい"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 7,
            "questionText": "<u>牛肉</u>を 買いに 行きました。",
            "options": ["ぶたにく", "とりにく", "ぎゅうにく", "うまにく"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 8,
            "questionText": "<u>外国</u>の 友だちから 手紙が 来ました。",
            "options": ["がいこく", "がいごく", "かいこく", "かいごく"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 9,
            "questionText": "へやの <u>電気</u>を けしました。",
            "options": ["てんき", "でんわ", "でんき", "てんわ"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 つぎの ことばは どう よみますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 10,
            "questionText": "あしたの <u>てんき</u>は 雨でしょう。",
            "options": ["天気", "電気", "点気", "転気"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 11,
            "questionText": "毎日 日本語を <u>べんきょう</u>して います。",
            "options": ["勉教", "勉京", "勉強", "勉競"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 12,
            "questionText": "駅まで <u>あるいて</u> 行きました。",
            "options": ["走いて", "泳いて", "飛いて", "歩いて"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 13,
            "questionText": "友だちと <u>りょこう</u>の 計画を たてました。",
            "options": ["旅交", "旅好", "旅行", "旅向"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 14,
            "questionText": "きれいな <u>はな</u>が さいて います。",
            "options": ["草", "木", "花", "葉"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 15,
            "questionText": "スーパーで 魚を <u>かい</u>ました。",
            "options": ["買い", "貝い", "賣い", "買"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題2 つぎの ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 16,
            "questionText": "テーブルの 上に くだものが（　）あります。",
            "options": ["おいて", "おきて", "いれて", "つけて"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 17,
            "questionText": "パーティーの（　）を 友だちに たのみました。",
            "options": ["じゅんび", "やくそく", "あんない", "よてい"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 18,
            "questionText": "かぜを ひいて、熱が（　）ました。",
            "options": ["おり", "あがり", "さがり", "あがり"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 19,
            "questionText": "（ホテルで）\n「すみません、（　）は どこですか。」\n「あちらの 1階で ございます。」",
            "options": ["エレベーター", "エスカレーター", "ロビー", "フロント"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 20,
            "questionText": "この シャツは （　）ので、とても 着やすいです。",
            "options": ["おもい", "あつい", "かたい", "かるい"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 21,
            "questionText": "しごとが おわったので、（　）帰ります。",
            "options": ["そろそろ", "だんだん", "なかなか", "ぜんぜん"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 22,
            "questionText": "山田さんは いつも （　）な 服を 着て います。",
            "options": ["しんせつ", "べんり", "じょうず", "おしゃれ"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 23,
            "questionText": "あしたは 朝から （　）が あります。",
            "options": ["かいぎ", "かいわ", "しょうかい", "せつめい"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 24,
            "questionText": "暗いので、電気を （　）ください。",
            "options": ["けして", "あけて", "しめて", "つけて"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 25,
            "questionText": "<u>この へやは くらいです。</u>",
            "options": [
              "この へやは あかるく ないです。",
              "この へやは ひろく ないです。",
              "この へやは すずしく ないです。",
              "この へやは あたたかく ないです。"
            ],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題4 ＿＿の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 26,
            "questionText": "<u>かれは すぐ 来るでしょう。</u>",
            "options": [
              "かれは もうすぐ 来るでしょう。",
              "かれは ぜんぜん 来ないでしょう。",
              "かれは ゆっくり 来るでしょう。",
              "かれは たまに 来るでしょう。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題4 ＿＿の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 27,
            "questionText": "<u>あした ゆうがた 電話して ください。</u>",
            "options": [
              "あしたの あさに 電話して ください。",
              "あしたの ひるに 電話して ください。",
              "あしたの 夕方に 電話して ください。",
              "あしたの 夜に 電話して ください。"
            ],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題4 ＿＿の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 28,
            "questionText": "<u>この まちは にぎやかです。</u>",
            "options": [
              "この まちは 人が たくさん います。",
              "この まちは しずかです。",
              "この まちは 店が すくないです。",
              "この まちは きたないです。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題4 ＿＿の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 29,
            "questionText": "<u>先生の 質問に 答えました。</u>",
            "options": [
              "先生の 質問を 聞きました。",
              "先生の 質問に へんじを しました。",
              "先生の 質問を おぼえました。",
              "先生の 質問を わすれました。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題4 ＿＿の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 30,
            "questionText": "まじめ",
            "options": [
              "山田さんは とても <u>まじめ</u>に 勉強して います。",
              "この 本は とても <u>まじめ</u>で おもしろい。",
              "きのうは <u>まじめ</u>な 天気でした。",
              "この 部屋は <u>まじめ</u>で 広いです。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
          },
          {
            "id": 31,
            "questionText": "うけつけ",
            "options": [
              "はかない くつは <u>うけつけ</u>に しまいます。",
              "<u>うけつけ</u>で まえかわさんを よんで もらいました。",
              "くらいので、でんきの <u>うけつけ</u>を して ください。",
              "しょうがつは かぞくで <u>うけつけ</u>へ 行って、いのります。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
          },
          {
            "id": 32,
            "questionText": "こわい",
            "options": [
              "ケーキが あまくて、<u>こわかった</u>です。",
              "木の はの いろが かわって、<u>こわかった</u>です。",
              "新聞の かんじは <u>こわかった</u>です。",
              "きのうの じしんは <u>こわかった</u>です。"
            ],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
          },
          {
            "id": 33,
            "questionText": "すべる",
            "options": [
              "ゆきの 日に 道で <u>すべって</u>、ズボンが よごれました。",
              "この 国の けいざいは だんだん <u>すべって</u> います。",
              "あの 人の 名前が <u>すべって</u>、おもいだせません。",
              "にほんへ 来て、三年が <u>すべって</u> います。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
          },
          {
            "id": 34,
            "questionText": "へんじ",
            "options": [
              "先生は しつもんに <u>へんじして</u> います。",
              "今 しけんの もんだいに <u>へんじして</u> います。",
              "テストは えんぴつで <u>へんじして</u> ください。",
              "名前を よばれたら <u>へんじして</u> ください。"
            ],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
          }
        ]
      },
      "grammar-reading": {
        "title": "Grammar & Reading",
        "titleJa": "文法・読解",
        "questions": [
          {
            "id": 1,
            "questionText": "バス（　）おりた とき、雨が ふりはじめた。",
            "options": ["で", "を", "に", "へ"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 2,
            "questionText": "森口さんは 旅行中だから、今日の コンサートに 来るはず（　）ない。",
            "options": ["や", "を", "で", "が"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 3,
            "questionText": "A「つかれて いるようだな。ゆうべは 何時に ねた（　）？」\nB「2時ぐらいだったと 思う。」",
            "options": ["な", "わ", "の", "も"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 4,
            "questionText": "今 200円（　）持って いません。",
            "options": ["しか", "ごろ", "や", "に"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 5,
            "questionText": "A「きのう 出かけたんですか。」\nB「いいえ、どこ（　）行って いません。」",
            "options": ["とも", "にも", "のも", "でも"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 6,
            "questionText": "A「さいきん メアリーさんに 会いましたか。」\nB「いいえ。メアリーさん（　）ぜんぜん 会って いませんよ。」",
            "options": ["へは", "とは", "では", "のは"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 7,
            "questionText": "リサ「ポンさんの クラスの 先生は（　）人ですか。」\nポン「ちょっと きびしいですが、いい 先生だと 思います。」",
            "options": ["どの", "どなた", "どんな", "どれ"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 8,
            "questionText": "仕事が 少ない 日は（　）早く 帰るように して います。",
            "options": ["なかなか", "なるべく", "とうとう", "ぜんぜん"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 9,
            "questionText": "（病院で）\n医者「中山さん、（　）しばらく おさけを 飲んだり たばこを すったり しては いけませんよ。」\n中山「はい、わかりました。」",
            "options": ["たいいんしても", "たいいんしたのに", "たいいんしたし", "たいいんすると"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 10,
            "questionText": "（ろうかで）\nA「ちょっと 話が あるんだけど。」\nB「急いで いるから、（　）ながらでも いい？」",
            "options": ["歩く", "歩いて", "歩いた", "歩き"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 11,
            "questionText": "この 本は 漢字が 多くて 字が 小さいので、（　）にくい。",
            "options": ["読む", "読んで", "読んだ", "読み"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 12,
            "questionText": "A「来月から 北海道の 会社へ うつる ことに（　）。」\nB「そうですか。さびしく なります。」",
            "options": ["なりました", "ありました", "おわりました", "いました"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 13,
            "questionText": "チェ「きのうは 古川さんに 日本語の 作文を（　）、うれしかったです。」\nロン「それは よかったですね。」",
            "options": ["なおして", "なおしたし", "なおしたので", "なおして もらって"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 14,
            "questionText": "となりの へやの 人は いつも わたしの へやの 前も そうじして（　）。",
            "options": ["くれます", "あげます", "もらいます", "やります"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 15,
            "questionText": "わたしは むすめを 外国で（　）つもりです。",
            "options": ["勉強される", "勉強させる", "勉強して いる", "勉強できる"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 16,
            "questionText": "A「学校の となりの パン屋は おいしいんですか。」\nB「ええ。わたしは よく 野菜の ______ ______ ★ ______ 行きますよ。」",
            "options": ["たまごの", "サンドイッチとか", "サンドイッチとかを", "買いに"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
          },
          {
            "id": 17,
            "questionText": "ヤン「高村さん、いそがしい ______ ______ ★ ______ か。」\n高村「いいえ、だいじょうぶです。」",
            "options": ["も", "手伝いましょう", "わたし", "なら"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
          },
          {
            "id": 18,
            "questionText": "レイ「田川さん、はしの 使い方を 教えて ください。」\n田川「はい。______ ______ ★ ______ いいですよ。」",
            "options": ["と", "やって", "こう", "使う"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
          },
          {
            "id": 19,
            "questionText": "この すうがくの 問題は ______ ______ ★ ______ すぐ 答えられた 学生が いたらしい。",
            "options": ["ふくざつ", "のに", "むずかしい", "で"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
          },
          {
            "id": 20,
            "questionText": "A「この 本で ______ ______ ★ ______ して ください。」\nB「ええ。わたしの 車で 行きましょう。」",
            "options": ["場所へ", "されて いる", "あんない", "しょうかい"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
          },
          {
            "id": 21,
            "questionText": "[ 21 ]",
            "options": ["着たのを", "着て いたのを", "着て いるのを", "着るのを"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
            "passage": "下の 文章は 「夏休み」についての 作文です。\n\n「おまつり」\nマリア・グリーン\n\n夏休みに わたしは 友だちの 山口さんと じんじゃの おまつりに 行きました。わたしは 「ゆかた」と いう かんたんな 着物を 着て いきました。着方が わからなかったので、山口さんに [ 21 ] 手伝って もらいました。\nじんじゃは さかの 上に ありました。さかの とちゅう [ 22 ] 石の かいだんを のぼりました。かいだんは [ 23 ]、ゆかたを 着て いたので、時間が かかりました。\nじんじゃには いろいろな 店が ありました。あまり 見た ことが ない 食べ物の 店も ありました。それから、たくさんの 人が おまつりの おどりを おどって いました。おまつりの おどりは 「ぼんおどり」と [ 24 ]。おどりを見て いたら、おどって いる 人に 「いっしょに おどろう。」と 言われました。[ 25 ]、わたしと 山口さんも いっしょに おどりました。\nとても 楽しかったです。"
          },
          {
            "id": 22,
            "questionText": "[ 22 ]",
            "options": ["や", "へ", "から", "しか"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
            "passage": "下の 文章は 「夏休み」についての 作文です。\n\n「おまつり」\nマリア・グリーン\n\n夏休みに わたしは 友だちの 山口さんと じんじゃの おまつりに 行きました。わたしは 「ゆかた」と いう かんたんな 着物を 着て いきました。着方が わからなかったので、山口さんに [ 21 ] 手伝って もらいました。\nじんじゃは さかの 上に ありました。さかの とちゅう [ 22 ] 石の かいだんを のぼりました。かいだんは [ 23 ]、ゆかたを 着て いたので、時間が かかりました。\nじんじゃには いろいろな 店が ありました。あまり 見た ことが ない 食べ物の 店も ありました。それから、たくさんの 人が おまつりの おどりを おどって いました。おまつりの おどりは 「ぼんおどり」と [ 24 ]。おどりを見て いたら、おどって いる 人に 「いっしょに おどろう。」と 言われました。[ 25 ]、わたしと 山口さんも いっしょに おどりました。\nとても 楽しかったです。"
          },
          {
            "id": 23,
            "questionText": "[ 23 ]",
            "options": ["急だし", "急だと", "急なら", "急でも"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
            "passage": "下の 文章は 「夏休み」についての 作文です。\n\n「おまつり」\nマリア・グリーン\n\n夏休みに わたしは 友だちの 山口さんと じんじゃの おまつりに 行きました。わたしは 「ゆかた」と いう かんたんな 着物を 着て いきました。着方が わからなかったので、山口さんに [ 21 ] 手伝って もらいました。\nじんじゃは さかの 上に ありました。さかの とちゅう [ 22 ] 石の かいだんを のぼりました。かいだんは [ 23 ]、ゆかたを 着て いたので、時間が かかりました。\nじんじゃには いろいろな 店が ありました。あまり 見た ことが ない 食べ物の 店も ありました。それから、たくさんの 人が おまつりの おどりを おどって いました。おまつりの おどりは 「ぼんおどり」と [ 24 ]。おどりを見て いたら、おどって いる 人に 「いっしょに おどろう。」と 言われました。[ 25 ]、わたしと 山口さんも いっしょに おどりました。\nとても 楽しかったです。"
          },
          {
            "id": 24,
            "questionText": "[ 24 ]",
            "options": ["いわせます", "いって みます", "いうつもりです", "いうそうです"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
            "passage": "下の 文章は 「夏休み」についての 作文です。\n\n「おまつり」\nマリア・グリーン\n\n夏休みに わたしは 友だちの 山口さんと じんじゃの おまつりに 行きました。わたしは 「ゆかた」と いう かんたんな 着物を 着て いきました。着方が わからなかったので、山口さんに [ 21 ] 手伝って もらいました。\nじんじゃは さかの 上に ありました。さかの とちゅう [ 22 ] 石の かいだんを のぼりました。かいだんは [ 23 ]、ゆかたを 着て いたので、時間が かかりました。\nじんじゃには いろいろな 店が ありました。あまり 見た ことが ない 食べ物の 店も ありました。それから、たくさんの 人が おまつりの おどりを おどって いました。おまつりの おどりは 「ぼんおどり」と [ 24 ]。おどりを見て いたら、おどって いる 人に 「いっしょに おどろう。」と 言われました。[ 25 ]、わたしと 山口さんも いっしょに おどりました。\nとても 楽しかったです。"
          },
          {
            "id": 25,
            "questionText": "[ 25 ]",
            "options": ["それで", "すると", "しかし", "それでは"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
            "passage": "下の 文章は 「夏休み」についての 作文です。\n\n「おまつり」\nマリア・グリーン\n\n夏休みに わたしは 友だちの 山口さんと じんじゃの おまつりに 行きました。わたしは 「ゆかた」と いう かんたんな 着物を 着て いきました。着方が わからなかったので、山口さんに [ 21 ] 手伝って もらいました。\nじんじゃは さかの 上に ありました。さかの とちゅう [ 22 ] 石の かいだんを のぼりました。かいだんは [ 23 ]、ゆかたを 着て いたので、時間が かかりました。\nじんじゃには いろいろな 店が ありました。あまり 見た ことが ない 食べ物の 店も ありました。それから、たくさんの 人が おまつりの おどりを おどって いました。おまつりの おどりは 「ぼんおどり」と [ 24 ]。おどりを見て いたら、おどって いる 人に 「いっしょに おどろう。」と 言われました。[ 25 ]、わたしと 山口さんも いっしょに おどりました。\nとても 楽しかったです。"
          }
        ]
      }
    }
  },
  {
    "id": "set-10",
    "title": "Set 10",
    "description": "Practice Test 10",
    "sections": {
      "vocabulary-kanji": {
        "title": "Vocabulary & Kanji",
        "titleJa": "文字・語彙",
        "questions": [
          {
            "id": 1,
            "questionText": "<u>池</u>の まわりを さんぽします。",
            "options": ["にわ", "はやし", "てら", "いけ"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 ＿＿の ことばは ひらがなで どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 2,
            "questionText": "わたしは <u>旅行</u>が すきです。",
            "options": ["りょごう", "りゅこう", "りゅごう", "りょこう"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 ＿＿の ことばは ひらがなで どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 3,
            "questionText": "<u>去年</u> にわに 木を うえました。",
            "options": ["きゅねん", "きょねん", "きょうねん", "きゅうねん"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 ＿＿の ことばは ひらがなで どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 4,
            "questionText": "いなかに <u>兄弟</u>の いえが あります。",
            "options": ["きょうだい", "きょうたい", "きょうてい", "きょうでい"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 ＿＿の ことばは ひらがなで どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 5,
            "questionText": "ここは いい <u>所</u>ですね。",
            "options": ["うち", "みせ", "まち", "ところ"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 ＿＿の ことばは ひらがなで どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 6,
            "questionText": "かのじょの むすこは <u>高校生</u>です。",
            "options": ["こうごうせい", "ごうこうせ", "こうこうせい", "ごうこうせい"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 ＿＿の ことばは ひらがなで どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 7,
            "questionText": "かべに 外国の <u>地図</u>が はって あります。",
            "options": ["ちす", "ちいず", "ちず", "ちずう"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 ＿＿の ことばは ひらがなで どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 8,
            "questionText": "きれいな <u>着物</u>が ほしいです。",
            "options": ["ぎもの", "きもの", "きぶつ", "ちゃくぶつ"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 ＿＿の ことばは ひらがなで どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 9,
            "questionText": "はやく <u>答えて</u> ください。",
            "options": ["かんがえて", "おぼえて", "かえて", "こたえて"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題1 ＿＿の ことばは ひらがなで どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 10,
            "questionText": "<u>みじかい</u> スカートを 買いました。",
            "options": ["長い", "短い", "白い", "軽い"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題2 ＿＿の ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 11,
            "questionText": "<u>としょかん</u>で じしょを かりました。",
            "options": ["図書間", "固書館", "図書館", "固書間"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題2 ＿＿の ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 12,
            "questionText": "もうすぐ テストが <u>おわります</u>。",
            "options": ["柊わります", "終わります", "柊わります", "佟わります"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題2 ＿＿の ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 13,
            "questionText": "きのうの よる きんじょで <u>かじ</u>が ありました。",
            "options": ["火時", "家事", "火事", "家時"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題2 ＿＿の ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 14,
            "questionText": "ゆうびんきょくの 前を <u>とおります</u>。",
            "options": ["踊おります", "通おります", "踊ります", "通ります"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題2 ＿＿の ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 15,
            "questionText": "あそこに いるのは わたしの <u>あね</u>です。",
            "options": ["妹", "姉", "姐", "組"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題2 ＿＿の ことばは どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 16,
            "questionText": "きのう やいた ケーキは、ぜんぶ 食べて もう（　）いません。",
            "options": ["なおって", "のこって", "とまって", "もどって"],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 17,
            "questionText": "テストの べんきょうは（　）して あります。",
            "options": ["さかんに", "だいじに", "じゅうぶんに", "ひつように"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 18,
            "questionText": "大学で（　）の けんきゅうを して います。",
            "options": ["きょうみ", "やくそく", "よやく", "ぶんぽう"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 19,
            "questionText": "ピアノの（　）に 行きました。",
            "options": ["アクセサリー", "コンピューター", "スクリーン", "コンサート"],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 20,
            "questionText": "びょういんで（　）を されました。",
            "options": ["にもつ", "ぐあい", "ちゅうしゃ", "くすり"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 21,
            "questionText": "どうして わたしの いけんに（　）して いるのですか。",
            "options": ["りよう", "しんぱい", "はんたい", "ちゅうし"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 22,
            "questionText": "いらない ものは ぜんぶ あそこの はこに（　）ください。",
            "options": ["すてて", "ひろって", "さがして", "つづけて"],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 23,
            "questionText": "いもうとは うたが とても（　）です。",
            "options": ["せまい", "うすい", "うまい", "おもい"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 24,
            "questionText": "しょうらいの ことは 一人で（　）ください。",
            "options": ["つとめないで", "とめないで", "きめないで", "やめないで"],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題3 （　）に なにを いれますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 25,
            "questionText": "<u>ことばの いみを せつめいしました。</u>",
            "options": [
              "ことばの いみを ききました。",
              "ことばの いみを おしえました。",
              "ことばの いみを しりました。",
              "ことばの いみを おぼえました。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題4 ＿＿の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 26,
            "questionText": "<u>みなとへ 行く バスは すいて います。</u>",
            "options": [
              "みなとへ 行く バスは きゃくが すくないです。",
              "みなとへ 行く バスは きゃくが おおいです。",
              "みなとへ 行く バスは せきが すくないです。",
              "みなとへ 行く バスは せきが おおいです。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題4 ＿＿の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 27,
            "questionText": "<u>この こうえんの はなは うつくしいです。</u>",
            "options": [
              "この こうえんの はなは ゆうめいです。",
              "この こうえんの はなは きれいです。",
              "この こうえんの はなは きたないです。",
              "この こうえんの はなは めずらしいです。"
            ],
            "correctIndex": 1,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題4 ＿＿の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 28,
            "questionText": "<u>この こうじょうでは じてんしゃを せいさんして います。</u>",
            "options": [
              "この こうじょうでは じてんしゃを こわして います。",
              "この こうじょうでは じてんしゃを なおして います。",
              "この こうじょうでは じてんしゃを つくって います。",
              "この こうじょうでは じてんしゃを つかって います。"
            ],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題4 ＿＿の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 29,
            "questionText": "<u>わたしは ジョンさんに みちを たずねられました。</u>",
            "options": [
              "ジョンさんは わたしに 「先生は どこですか」と 言いました。",
              "ジョンさんは わたしに 「いっしょに えいがを 見ましょう」と 言いました。",
              "ジョンさんは わたしに 「いえに 行っても いいですか」と 言いました。",
              "ジョンさんは わたしに 「この ばしょへ どうやって 行きますか」と 言いました。"
            ],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題4 ＿＿の ぶんと だいたい おなじ いみの ぶんが あります。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 30,
            "questionText": "あんしん",
            "options": [
              "テストが 終わって、<u>安心</u>しました。",
              "お金を <u>安心</u>して 買いました。",
              "友だちに 会えて <u>安心</u>を 言いました。",
              "道を <u>安心</u>して 歩きました。"
            ],
            "correctIndex": 0,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
          },
          {
            "id": 31,
            "questionText": "おどろく",
            "options": [
              "あしたの 天気に <u>おどろき</u>ます。",
              "本を 読んで <u>おどろき</u>ました。",
              "おいしい ご飯を <u>おどろき</u>ました。",
              "大きな 音に <u>おどろいて</u>、飛び起きました。"
            ],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
          },
          {
            "id": 32,
            "questionText": "じゆう",
            "options": [
              "この へやは <u>自由</u>で 明るいです。",
              "あしたは <u>自由</u>な 雨が ふるでしょう。",
              "この 料理は <u>自由</u>に おいしいです。",
              "日曜日は <u>自由</u>な 時間が たくさん あります。"
            ],
            "correctIndex": 3,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
          },
          {
            "id": 33,
            "questionText": "しっかり",
            "options": [
              "あしたは <u>しっかり</u> 晴れるでしょう。",
              "この パンは <u>しっかり</u> 甘いです。",
              "ドアを <u>しっかり</u> しめて ください。",
              "山が <u>しっかり</u> 見えます。"
            ],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
          },
          {
            "id": 34,
            "questionText": "とうとう",
            "options": [
              "あした <u>とうとう</u> 会いましょう。",
              "<u>とうとう</u> 走ると あぶないですよ。",
              "長い 間 練習して、<u>とうとう</u> 試合に 勝てました。",
              "<u>とうとう</u>な 話を 聞きました。"
            ],
            "correctIndex": 2,
            "sectionType": "vocabulary-kanji",
            "instruction": "問題5 つぎの ことばの つかいかたで いちばん いい ものを 1・2・3・4から ひとつ えらんで ください。"
          }
        ]
      },
      "grammar-reading": {
        "title": "Grammar & Reading",
        "titleJa": "文法・読解",
        "questions": [
          {
            "id": 1,
            "questionText": "あそこに おいて ある スーツケースは ビリーさん（　）です。",
            "options": ["に", "が", "は", "の"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 2,
            "questionText": "むすこは いつも 外で あそんで いて、暗く なる（　）帰って こない。",
            "options": ["から", "より", "まで", "だけ"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 3,
            "questionText": "日曜日に 何を する（　）、まだ きめて いない。",
            "options": ["が", "か", "ね", "よ"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 4,
            "questionText": "会社には まだ 五人（　）のこって いるようだ。",
            "options": ["ぐらい", "ごろ", "と", "や"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 5,
            "questionText": "わたしは 毎日 シャワーを あびますが、おふろ（　）ほとんど 入りません。",
            "options": ["にしか", "にでも", "には", "にと"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 6,
            "questionText": "A「きのう 社長を むかえに くうこうに 行ったんですか。」\nB「いいえ。たのまれなかったので、くうこう（　）行きませんでした。」",
            "options": ["へは", "への", "へしか", "へでも"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 7,
            "questionText": "村田「ライさんは 日本へ 来て（　）に なるんですか。」\nライ「もう 3年に なります。」",
            "options": ["どうして", "どれぐらい", "どう", "どなた"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 8,
            "questionText": "空が（　）明るく なって きた。もうすぐ 朝だ。",
            "options": ["たしか", "たぶん", "だいぶ", "たいてい"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 9,
            "questionText": "A「あなたが れんらくせずに アルバイトを（　）、みんな こまって いましたよ。」\nB「すみません。けいたいでんわが こわれて、れんらくが できなかったんです。」",
            "options": ["休んだから", "休めば", "休にながら", "休むなら"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 10,
            "questionText": "（教室で）\n学生「先生、質問が あります。」\n先生「説明が ぜんぶ（　）あとに して ください。」",
            "options": ["終わる", "終わって", "終わって いた", "終わった"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 11,
            "questionText": "弟は 昼から ずっと（　）つづけて いる。",
            "options": ["眠って", "眠った", "眠る", "眠り"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 12,
            "questionText": "小学生の とき、わたしは 母に 毎日 三時間 勉強すると いう やくそくを（　）。",
            "options": ["して きます", "されて おきました", "させられました", "させて いたでしょう"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 13,
            "questionText": "スー「早川さんの 家を 知って いますか。」\nコン「はい。わたしは 早川さんの 家に（　）ことが ありますから。」",
            "options": ["しょうたいして もらった", "しょうたいした", "しょうたいして", "しょうたいする"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 14,
            "questionText": "外国人に 道を 聞かれたので、教えて（　）。",
            "options": ["あげました", "くれました", "くださいました", "いただきました"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 15,
            "questionText": "あした 学校へ（　）本は かばんに 入れて あります。",
            "options": ["持たないで", "持って いる", "持って いく", "持ったような"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題1 （　）に 何を 入れますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
          },
          {
            "id": 16,
            "questionText": "A「あの 木の えだに 白い ______ ______ ★ ______ 見えますか。」\nB「はい、見えます。かわいいですね。」",
            "options": ["赤い", "いるのが", "小鳥や", "小鳥が"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
          },
          {
            "id": 17,
            "questionText": "A「遠山さんは まだですか。」\nB「今 出かける じゅんび ______ ______ ★ ______ そうですよ。」",
            "options": ["して", "いる", "を", "ところだ"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
          },
          {
            "id": 18,
            "questionText": "A「あなたの 友だちで だれか 新聞社に つとめて いる 人が いますか。」\nB「いいえ。______ ______ ★ ______ いませんよ。」",
            "options": ["そう", "は", "いう", "人"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
          },
          {
            "id": 19,
            "questionText": "わたしは ______ ______ ★ ______、家族の 写真を 見れば、元気に なる。",
            "options": ["とき", "さびしくて", "でも", "かなしい"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
          },
          {
            "id": 20,
            "questionText": "中田「西川さんは 旅行が 好きですか。」\n西川「はい。でも、ペットの ______ ______ ★ ______ は できません。」",
            "options": ["を", "しなくては いけないので", "旅行", "せわ"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": "問題2 ★に 入る ものは どれですか。1・2・3・4から いちばん いい ものを 一つ えらんで ください。"
          },
          {
            "id": 21,
            "questionText": "[ 21 ]",
            "options": ["きまりました", "きまっています", "きまりませんでした", "きまらないでしょう"],
            "correctIndex": 2,
            "sectionType": "grammar-reading",
            "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
            "passage": "下の 文章は 「買い物」についての 作文です。\n\n「おみやげ」\nトーマス・シュミット\n\nわたしは 来月 国へ 帰るので、おみやげを 買いに 行きました。父と 弟の おみやげは すぐ きまりました。父の おみやげは 日本の おさけと たばこです。弟の おみやげは ゲームの ソフトに きめました。\nしかし、母の おみやげは なかなか [ 21 ]。店員さんに [ 22 ] と、「お母さんは 何が お好きですか。」と 聞かれました。わたしは 「出かける ことが 好きです。」と 答えました。店員さんは 「[ 23 ]、この にほんせいの かさは いかがですか。軽いし、[ 24 ] よ。」と 言いました。いろいろな かさの 中から わたしは 花の えの かさを えらびました。\nそれから、日本の おかしも 買いました。10こ 買ったら 店員さんが もう 1こ くれました。にもつが ふえたので、お店から 国へ 送って もらう ことに しました。\nいい おみやげ [ 25 ] たくさん 買えて、よかったです。"
          },
          {
            "id": 22,
            "questionText": "[ 22 ]",
            "options": ["そうだんした", "そうだんして", "そうだんしよう", "そうだんすると"],
            "correctIndex": 3,
            "sectionType": "grammar-reading",
            "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
            "passage": "下の 文章は 「買い物」についての 作文です。\n\n「おみやげ」\nトーマス・シュミット\n\nわたしは 来月 国へ 帰るので、おみやげを 買いに 行きました。父と 弟の おみやげは すぐ きまりました。父の おみやげは 日本の おさけと たばこです。弟の おみやげは ゲームの ソフトに きめました。\nしかし、母の おみやげは なかなか [ 21 ]。店員さんに [ 22 ] と、「お母さんは 何が お好きですか。」と 聞かれました。わたしは 「出かける ことが 好きです。」と 答えました。店員さんは 「[ 23 ]、この にほんせいの かさは いかがですか。軽いし、[ 24 ] よ。」と 言いました。いろいろな かさの 中から わたしは 花の えの かさを えらびました。\nそれから、日本の おかしも 買いました。10こ 買ったら 店員さんが もう 1こ くれました。にもつが ふえたので、お店から 国へ 送って もらう ことに しました。\nいい おみやげ [ 25 ] たくさん 買えて、よかったです。"
          },
          {
            "id": 23,
            "questionText": "[ 23 ]",
            "options": ["それから", "それなら", "それでも", "それに"],
            "correctIndex": 1,
            "sectionType": "grammar-reading",
            "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
            "passage": "下の 文章は 「買い物」についての 作文です。\n\n「おみやげ」\nトーマス・シュミット\n\nわたしは 来月 国へ 帰るので、おみやげを 買いに 行きました。父と 弟の おみやげは すぐ きまりました。父の おみやげは 日本の おさけと たばこです。弟の おみやげは ゲームの ソフトに きめました。\nしかし、母の おみやげは なかなか [ 21 ]。店員さんに [ 22 ] と、「お母さんは 何が お好きですか。」と 聞かれました。わたしは 「出かける ことが 好きです。」と 答えました。店員さんは 「[ 23 ]、この にほんせいの かさは いかがですか。軽いし、[ 24 ] よ。」と 言いました。いろいろな かさの 中から わたしは 花の えの かさを えらびました。\nそれから、日本の おかしも 買いました。10こ 買ったら 店員さんが もう 1こ くれました。にもつが ふえたので、お店から 国へ 送って もらう ことに しました。\nいい おみやげ [ 25 ] たくさん 買えて、よかったです。"
          },
          {
            "id": 24,
            "questionText": "[ 24 ]",
            "options": ["じょうぶですよ", "じょうぶでした", "じょうぶな", "じょうぶで"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
            "passage": "下の 文章は 「買い物」についての 作文です。\n\n「おみやげ」\nトーマス・シュミット\n\nわたしは 来月 国へ 帰るので、おみやげを 買いに 行きました。父と 弟の おみやげは すぐ きまりました。父の おみやげは 日本の おさけと たばこです。弟の おみやげは ゲームの ソフトに きめました。\nしかし、母の おみやげは なかなか [ 21 ]。店員さんに [ 22 ] と、「お母さんは 何が お好きですか。」と 聞かれました。わたしは 「出かける ことが 好きです。」と 答えました。店員さんは 「[ 23 ]、この にほんせいの かさは いかがですか。軽いし、[ 24 ] よ。」と 言いました。いろいろな かさの 中から わたしは 花の えの かさを えらびました。\nそれから、日本の おかしも 買いました。10こ 買ったら 店員さんが もう 1こ くれました。にもつが ふえたので、お店から 国へ 送って もらう ことに しました。\nいい おみやげ [ 25 ] たくさん 買えて、よかったです。"
          },
          {
            "id": 25,
            "questionText": "[ 25 ]",
            "options": ["が", "を", "に", "で"],
            "correctIndex": 0,
            "sectionType": "grammar-reading",
            "instruction": "問題3 21から 25に 何を 入れますか。文章の 意味を 考えて、1・2・3・4から いちばん いい ものを 一つ えらんで ください。",
            "passage": "下の 文章は 「買い物」についての 作文です。\n\n「おみやげ」\nトーマス・シュミット\n\nわたしは 来月 国へ 帰るので、おみやげを 買いに 行きました。父と 弟の おみやげは すぐ きまりました。父の おみやげは 日本の おさけと たばこです。弟の おみやげは ゲームの ソフトに きめました。\nしかし、母の おみやげは なかなか [ 21 ]。店員さんに [ 22 ] と、「お母さんは 何が お好きですか。」と 聞かれました。わたしは 「出かける ことが 好きです。」と 答えました。店員さんは 「[ 23 ]、この にほんせいの かさは いかがですか。軽いし、[ 24 ] よ。」と 言いました。いろいろな かさの 中から わたしは 花の えの かさを えらびました。\nそれから、日本の おかしも 買いました。10こ 買ったら 店員さんが もう 1こ くれました。にもつが ふえたので、お店から 国へ 送って もらう ことに しました。\nいい おみやげ [ 25 ] たくさん 買えて、よかったです。"
          }
        ]
      }
    }
  }
]

out_obj = { "sets": sets_data }
out_path = r"D:\sudip_software\nihongo_playground\N4_Chokuzen_Taisaku_Processing\sets_8_10.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(out_obj, f, ensure_ascii=False, indent=2)

print(f"Successfully generated {out_path} with {len(sets_data)} sets.")
