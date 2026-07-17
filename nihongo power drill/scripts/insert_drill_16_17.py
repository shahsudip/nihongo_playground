import json
import os

data_path = 'power_drill_data.json'
with open(data_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

drills = {
    "grammar-16": {
        "id": "grammar-16",
        "title": "第16回",
        "sections": [
            {
                "id": "mondai-1",
                "title": "問題1",
                "description": "つぎの文の（　　）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。",
                "questions": [
                    {
                        "question_number": "1",
                        "text": "新聞に（　　）、交通事故はここ数年減ってきているそうだ。",
                        "options": ["よって", "よると", "よったら", "よっては"],
                        "correct_answer": "2"
                    },
                    {
                        "question_number": "2",
                        "text": "今日は失敗しちゃった。ああ、もっとよく準備を（　　）なあ。",
                        "options": ["したらいいのに", "しとけばよかった", "するはずだった", "するべきなのに"],
                        "correct_answer": "2"
                    },
                    {
                        "question_number": "3",
                        "text": "今日こんなに体が痛いのは、きっと昨日運動しすぎた（　　）。",
                        "options": ["せいだ", "らしい", "かもしれない", "のだろうか"],
                        "correct_answer": "1"
                    },
                    {
                        "question_number": "4",
                        "text": "携帯電話はマナーモードに設定（　　）、通話はご遠慮ください。",
                        "options": ["のうえ", "として", "するなら", "とともに"],
                        "correct_answer": "1"
                    },
                    {
                        "question_number": "5",
                        "text": "子どもたちには、大きな夢を（　　）ものだ。",
                        "options": ["持たれたい", "持ちたがる", "持ってくれる", "持ってほしい"],
                        "correct_answer": "4"
                    },
                    {
                        "question_number": "6",
                        "text": "授業中、友達が急にへんな顔をしたから、（　　）なった。",
                        "options": ["笑おうと", "笑いそうに", "笑うように", "笑うらしく"],
                        "correct_answer": "2"
                    },
                    {
                        "question_number": "7",
                        "text": "何度誘っても来ないから、木村さんはカラオケが好きじゃない（　　）だね。",
                        "options": ["から", "こと", "そう", "みたい"],
                        "correct_answer": "4"
                    }
                ]
            },
            {
                "id": "mondai-2",
                "title": "問題2",
                "description": "つぎの文の＿★＿に入る最もよいものを、1・2・3・4から一つえらびなさい。",
                "questions": [
                    {
                        "question_number": "1",
                        "text": "姉が＿＿　＿＿　＿★＿　＿＿ぐらいよくしゃべる。",
                        "options": ["妹は", "うるさい", "おとなしい", "のに対して"],
                        "correct_answer": "1",
                        "correct_order": "3,4,1,2"
                    },
                    {
                        "question_number": "2",
                        "text": "学生時代はよくみんなでここに＿＿　＿＿　＿★＿　＿＿だ。",
                        "options": ["いた", "もの", "集まって", "しゃべって"],
                        "correct_answer": "1",
                        "correct_order": "3,4,1,2"
                    },
                    {
                        "question_number": "3",
                        "text": "その子は大きく＿＿　＿＿　＿★＿　＿＿顔が母親に似てきた。",
                        "options": ["に", "なる", "つれて", "笑った"],
                        "correct_answer": "3",
                        "correct_order": "2,1,3,4"
                    }
                ]
            },
            {
                "id": "mondai-3",
                "title": "問題3",
                "description": "つぎの文章を読んで、[ 1 ]から[ 5 ]の中に入る最もよいものを、1・2・3・4から一つえらびなさい。",
                "passage": "自転車通勤を始めてみませんか？\n\n最近、車や電車 [ 1 ] 自転車で会社に通勤する人が増えています。\n自転車はガソリン代も交通費もかからず、車や電車と [ 2 ] 経済的です。体を動かすので、健康にもいいし、また、車のように排気ガスで空気を汚す心配もありません。\n無理なく自転車通勤ができる距離は一般的に15kmくらいまでと言われています。約1時間です。もちろん、それより距離が長くても通勤 [ 3 ] が、あまり長い距離を走るのはおすすめしません。健康の [ 4 ] だからといって、毎朝長い距離を自転車で通勤して\nいたら疲れてしまうからです。仕事にも影響が出かねません。\n体力や自転車の性能 [ 5 ] かかる時間は違います。当店ではあなたに合った自転車を選ぶお手伝いをいたします。\nまずはぜひ一度、ご来店ください！\n\n○×自転車店\nTEL：03-1234-XXXX",
                "questions": [
                    {
                        "question_number": "1",
                        "text": "[ 1 ]",
                        "options": ["に先立って", "に関して", "に加えて", "のかわりに"],
                        "correct_answer": "4"
                    },
                    {
                        "question_number": "2",
                        "text": "[ 2 ]",
                        "options": ["比べて", "ともに", "あわせて", "ならんで"],
                        "correct_answer": "1"
                    },
                    {
                        "question_number": "3",
                        "text": "[ 3 ]",
                        "options": ["できないこともありません", "できないはずはありません", "できるわけがありません", "できそうにもありません"],
                        "correct_answer": "1"
                    },
                    {
                        "question_number": "4",
                        "text": "[ 4 ]",
                        "options": ["せい", "ため", "はず", "おかげ"],
                        "correct_answer": "2"
                    },
                    {
                        "question_number": "5",
                        "text": "[ 5 ]",
                        "options": ["に対して", "によって", "にこたえて", "についても"],
                        "correct_answer": "2"
                    }
                ]
            }
        ]
    },
    "grammar-17": {
        "id": "grammar-17",
        "title": "第17回",
        "sections": [
            {
                "id": "mondai-1",
                "title": "問題1",
                "description": "つぎの文の（　　）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。",
                "questions": [
                    {
                        "question_number": "1",
                        "text": "「後日ご連絡します」と言った（　　）、その店からはまったく連絡がない。",
                        "options": ["きり", "だけ", "以来", "かぎり"],
                        "correct_answer": "1"
                    },
                    {
                        "question_number": "2",
                        "text": "いくら東京の冬が寒い（　　）、北海道ほどではない。",
                        "options": ["というと", "といえば", "といったら", "といっても"],
                        "correct_answer": "4"
                    },
                    {
                        "question_number": "3",
                        "text": "A：あ、吉田さん。来月、引っ越しする（　　）？\nB：うん。でも、どうして知ってるの？",
                        "options": ["っけ", "ったら", "んだって", "んだもん"],
                        "correct_answer": "3"
                    },
                    {
                        "question_number": "4",
                        "text": "今の私の実力（　　）、A大学に合格するのが無理だということはわかっている。",
                        "options": ["に応じて", "に比べて", "かと思うと", "からいって"],
                        "correct_answer": "4"
                    },
                    {
                        "question_number": "5",
                        "text": "30年（　　）続けられた岡田先生の講義は、本日が最後となります。",
                        "options": ["を通じて", "を通して", "にかけて", "にわたって"],
                        "correct_answer": "4"
                    },
                    {
                        "question_number": "6",
                        "text": "薬（　　）きちんと飲み続ければ、手術の必要はないでしょう。",
                        "options": ["こそ", "さえ", "しか", "のみ"],
                        "correct_answer": "2"
                    },
                    {
                        "question_number": "7",
                        "text": "合格の知らせを聞いて、うれしさ（　　）言葉が出なかった。",
                        "options": ["うえで", "のあまり", "のおかげで", "ところで"],
                        "correct_answer": "2"
                    }
                ]
            },
            {
                "id": "mondai-2",
                "title": "問題2",
                "description": "つぎの文の＿★＿に入る最もよいものを、1・2・3・4から一つえらびなさい。",
                "questions": [
                    {
                        "question_number": "1",
                        "text": "つい好きなもの＿＿　＿＿　＿★＿　＿＿だが、栄養のバランスには気をつけたい。",
                        "options": ["がち", "しまい", "食べて", "ばかり"],
                        "correct_answer": "2",
                        "correct_order": "4,3,2,1"
                    },
                    {
                        "question_number": "2",
                        "text": "スーパーなら、ここを5分ぐらい＿＿　＿＿　＿★＿　＿＿店がありますよ。",
                        "options": ["と", "行く", "という", "スーパー山田"],
                        "correct_answer": "4",
                        "correct_order": "2,1,4,3"
                    },
                    {
                        "question_number": "3",
                        "text": "来週からは気温が下がり、秋＿＿　＿＿　＿★＿　＿＿です。",
                        "options": ["天気", "よう", "になる", "らしい"],
                        "correct_answer": "3",
                        "correct_order": "4,1,3,2"
                    }
                ]
            },
            {
                "id": "mondai-3",
                "title": "問題3",
                "description": "つぎの文章を読んで、[ 1 ]から[ 5 ]の中に入る最もよいものを、1・2・3・4から一つえらびなさい。",
                "passage": "田中陽子様\n\nこんにちは。アンです。お元気ですか。\n私は1週間前に無事ジャカルタに着きました。もっと早く連絡 [ 1 ] のですが、荷物の整理などが大変で、なかなかメールすることができませんでした。ごめんなさい。\n日本にいるときは、陽子さん [ 2 ] 、田中家のみなさんにはたいへんお世話になりました。みなさんが、私を本当の家族のように思ってくださったことは、慣れない国で生活する私にとって、どんなに心強かった [ 3 ] 。みなさんといっしょに過ごした半年間は、私の大切な思い出です。\n一人っ子の私にとって、陽子さんは本当のお姉さんのようでした。日本語がわからないときには、いつも優しく教えてくれてありがとうございました。陽子さん [ 4 ] 試験に合格することができたと思っています。\n陽子さん、ぜひ近いうちにジャカルタへ遊びに来てください。今度は私 [ 5-a ] 陽子さん [ 5-b ] ご案内します。\nお父さんとお母さんにもどうぞよろしくお伝えください。またメールします。\nそれでは、お元気で。\n\nアン",
                "questions": [
                    {
                        "question_number": "1",
                        "text": "[ 1 ]",
                        "options": ["したと思う", "しようと思う", "すると思っていた", "しようと思っていた"],
                        "correct_answer": "4"
                    },
                    {
                        "question_number": "2",
                        "text": "[ 2 ]",
                        "options": ["など", "をはじめ", "をもとに", "にかわって"],
                        "correct_answer": "2"
                    },
                    {
                        "question_number": "3",
                        "text": "[ 3 ]",
                        "options": ["ことです", "ものです", "ことでしょう", "ものでしょう"],
                        "correct_answer": "3"
                    },
                    {
                        "question_number": "4",
                        "text": "[ 4 ]",
                        "options": ["のせいで", "のおかげで", "にこたえて", "にしたがって"],
                        "correct_answer": "2"
                    },
                    {
                        "question_number": "5",
                        "text": "[ 5 ]",
                        "options": ["a が / b に", "a が / b を", "a は / b に", "a は / b を"],
                        "correct_answer": "2"
                    }
                ]
            }
        ]
    }
}

for i, chapter in enumerate(data['chapters']):
    if chapter['id'] in drills:
        data['chapters'][i] = drills[chapter['id']]

with open(data_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
print("Updated Drill 16 and 17.")
