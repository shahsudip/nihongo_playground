import json
import os

data_path = 'power_drill_data.json'
with open(data_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

drills = {
    "grammar-22": {
        "id": "grammar-22",
        "title": "第22回",
        "sections": [
            {
                "id": "grammar-22-1",
                "title": "問題1",
                "instruction": "つぎの文の（　）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。",
                "questions": [
                    {
                        "id": "grammar-22-1-1",
                        "text": "本を読んでいる（　）眠くなって、そのままソファで寝てしまった。",
                        "options": ["場合", "うちに", "間", "ところ"],
                        "answer": "うちに",
                        "explanation": "〜うちに (While doing〜)."
                    },
                    {
                        "id": "grammar-22-1-2",
                        "text": "あなたの帰りが遅かったから、私はどんなに心配（　）。",
                        "options": ["したことか", "したことだ", "するものか", "するものだ"],
                        "answer": "したことか",
                        "explanation": "どんなに〜したことか (How much I did〜!)."
                    },
                    {
                        "id": "grammar-22-1-3",
                        "text": "この小説は、その事件の関係者から聞いた話（　）書かれたそうだ。",
                        "options": ["のまま", "のもとに", "にしたがって", "にもとづいて"],
                        "answer": "にもとづいて",
                        "explanation": "〜にもとづいて (Based on〜)."
                    },
                    {
                        "id": "grammar-22-1-4",
                        "text": "上司と（　）上で、お返事させていただきます。",
                        "options": ["相談", "相談した", "相談して", "ご相談する"],
                        "answer": "相談した",
                        "explanation": "〜た上で (Upon doing〜 / After doing〜)."
                    },
                    {
                        "id": "grammar-22-1-5",
                        "text": "たくさんありますから、どうぞ好きな（　）食べてください。",
                        "options": ["だけ", "ほど", "まで", "くらい"],
                        "answer": "だけ",
                        "explanation": "好きなだけ (As much as you like)."
                    },
                    {
                        "id": "grammar-22-1-6",
                        "text": "A：来週は忙しい？\nB：曜日（　）けど、月曜か水曜なら空いてるよ。",
                        "options": ["という", "とする", "による", "における"],
                        "answer": "による",
                        "explanation": "〜による (Depends on〜)."
                    },
                    {
                        "id": "grammar-22-1-7",
                        "text": "熱がある（　）のだが、どうも具合が悪い。",
                        "options": ["ぎみな", "はずな", "べきじゃない", "わけじゃない"],
                        "answer": "わけじゃない",
                        "explanation": "〜わけじゃない (It's not that〜)."
                    }
                ]
            },
            {
                "id": "grammar-22-2",
                "title": "問題2",
                "instruction": "つぎの文の＿★＿に入る最もよいものを、1・2・3・4から一つえらびなさい。",
                "questions": [
                    {
                        "id": "grammar-22-2-1",
                        "text": "ビザ＿＿　＿＿　＿★＿　＿＿は、こちらのウェブサイトをご覧ください。",
                        "options": ["説明", "に関する", "の更新", "くわしい"],
                        "answer": "くわしい",
                        "explanation": "ビザ[の更新][に関する][くわしい★][説明]は (3, 2, 4, 1)"
                    },
                    {
                        "id": "grammar-22-2-2",
                        "text": "基本＿＿　＿＿　＿★＿　＿＿やろうとしても、うまくいくはずがない。",
                        "options": ["を", "ばかり", "抜きにして", "難しいこと"],
                        "answer": "難しいこと",
                        "explanation": "基本[を][抜きにして][難しいこと★][ばかり]やろうとしても (1, 3, 4, 2)"
                    },
                    {
                        "id": "grammar-22-2-3",
                        "text": "私は自分の家の電話番号＿＿　＿＿　＿★＿　＿＿のが苦手だ。",
                        "options": ["さえ", "ほど", "暗記する", "覚えられない"],
                        "answer": "ほど",
                        "explanation": "私は自分の家の電話番号[さえ][覚えられない][ほど★][暗記する]のが苦手だ。(1, 4, 2, 3)"
                    }
                ]
            },
            {
                "id": "grammar-22-3",
                "title": "問題3",
                "instruction": "つぎの文章を読んで、[ 1 ]から[ 5 ]の中に入る最もよいものを、1・2・3・4から一つえらびなさい。",
                "passage": "先輩、お元気ですか。\n今日はご報告があります。就職が決まり、この4月から、中町カンパニーという会社で働くことになりました。\nなかなか就職が [ 1 ] あせりましたが、こうして無事に就職することができたのは、先輩のアドバイスのおかげです。\n就職活動は思っていた [ 2 ] きびしくて、不合格通知を何度も受け取りました。でも、そのたびに先輩がおっしゃった「不合格の数は経験の数だから、その経験を生かさないといけないよ」という言葉を思い出し、がんばろうという気持ちになりました。先輩の言葉があった [ 3 ] 前向きに就職活動を続けられ、合格通知を受け取ることができたのだと思います。本当にありがとうございました。\nそれから、就職 [ 4 ] 引っ越しもしました。最寄駅は中町駅です。今度の家は駅から徒歩3分の便利なところなので、近くにいらっしゃった際にはぜひ [ 5 ] ください。\nこれからも、どうぞよろしくお願いいたします。",
                "questions": [
                    {
                        "id": "grammar-22-3-1",
                        "text": "[ 1 ] に入るもの",
                        "options": ["決まらず", "決まることなく", "決まらなくても", "決まらないなら"],
                        "answer": "決まらず",
                        "explanation": "なかなか就職が決まらず (Without being able to decide on a job)."
                    },
                    {
                        "id": "grammar-22-3-2",
                        "text": "[ 2 ] に入るもの",
                        "options": ["以上", "以上で", "以上に", "以上は"],
                        "answer": "以上に",
                        "explanation": "思っていた以上に (More than I thought)."
                    },
                    {
                        "id": "grammar-22-3-3",
                        "text": "[ 3 ] に入るもの",
                        "options": ["からこそ", "からには", "ことさえ", "ことより"],
                        "answer": "からこそ",
                        "explanation": "あったからこそ (Precisely because I had〜)."
                    },
                    {
                        "id": "grammar-22-3-4",
                        "text": "[ 4 ] に入るもの",
                        "options": ["にかわって", "にかかわって", "にともなって", "にもとづいて"],
                        "answer": "にともなって",
                        "explanation": "就職にともなって (Along with getting a job)."
                    },
                    {
                        "id": "grammar-22-3-5",
                        "text": "[ 5 ] に入るもの",
                        "options": ["お寄り", "お寄りして", "お寄りなさって", "お寄りいただいて"],
                        "answer": "お寄り",
                        "explanation": "お寄りください (Please drop by - honorific)."
                    }
                ]
            }
        ]
    },
    "grammar-23": {
        "id": "grammar-23",
        "title": "第23回",
        "sections": [
            {
                "id": "grammar-23-1",
                "title": "問題1",
                "instruction": "つぎの文の（　）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。",
                "questions": [
                    {
                        "id": "grammar-23-1-1",
                        "text": "私が日本語を教える（　）、私に中国語を教えてくれませんか。",
                        "options": ["一方", "反面", "かわりに", "にかわり"],
                        "answer": "かわりに",
                        "explanation": "〜かわりに (In exchange for〜)."
                    },
                    {
                        "id": "grammar-23-1-2",
                        "text": "割れる（　）ので、このグラスには熱いお湯を入れないでください。",
                        "options": ["にかぎる", "おそれがある", "おそれがない", "とはかぎらない"],
                        "answer": "おそれがある",
                        "explanation": "〜おそれがある (There is a risk/fear that〜)."
                    },
                    {
                        "id": "grammar-23-1-3",
                        "text": "妻とは共通の友人（　）知り合いました。",
                        "options": ["において", "を通じて", "を込めて", "をめぐって"],
                        "answer": "を通じて",
                        "explanation": "〜を通じて (Through〜)."
                    },
                    {
                        "id": "grammar-23-1-4",
                        "text": "熱があって、のどに軽い痛（　）を感じるから、たぶんかぜだろう。",
                        "options": ["げ", "さ", "み", "め"],
                        "answer": "み",
                        "explanation": "痛み (Pain). Suffix 'み' makes a noun describing state or sensation."
                    },
                    {
                        "id": "grammar-23-1-5",
                        "text": "いくらその車が安いといっても、今の私がすぐに（　）。",
                        "options": ["買えない", "買えるほどだ", "買えるかもしれない", "買えるほどじゃない"],
                        "answer": "買えない",
                        "explanation": "いくら〜といっても (No matter how〜, I can't buy it)."
                    },
                    {
                        "id": "grammar-23-1-6",
                        "text": "あの時私が父の言ったとおりにしていれば、あんなことには（　）。",
                        "options": ["なっただろう", "ならないのに", "なるだろうか", "ならなかったのに"],
                        "answer": "ならなかったのに",
                        "explanation": "〜ば、〜のに (If I had〜, it wouldn't have〜)."
                    },
                    {
                        "id": "grammar-23-1-7",
                        "text": "明日の無料コンサートは、来場者数によっては入場できない（　）もあります。",
                        "options": ["際", "とき", "場合", "もの"],
                        "answer": "場合",
                        "explanation": "〜場合 (Case/situation)."
                    }
                ]
            },
            {
                "id": "grammar-23-2",
                "title": "問題2",
                "instruction": "つぎの文の＿★＿に入る最もよいものを、1・2・3・4から一つえらびなさい。",
                "questions": [
                    {
                        "id": "grammar-23-2-1",
                        "text": "部長は＿＿　＿＿　＿★＿　＿＿ほうがいいかもしれないね。",
                        "options": ["忙しい", "だから", "みたい", "話しかけない"],
                        "answer": "だから",
                        "explanation": "部長は[忙しい][みたい][だから★][話しかけない]ほうがいいかもしれないね。(1, 3, 2, 4)"
                    },
                    {
                        "id": "grammar-23-2-2",
                        "text": "こんなにいい詩が書けるのは、作者にこれまでの＿＿　＿＿　＿★＿　＿＿と思う。",
                        "options": ["から", "がある", "こそだ", "いろいろな経験"],
                        "answer": "から",
                        "explanation": "作者にこれまでの[いろいろな経験][がある][から★][こそだ]と思う。(4, 2, 1, 3)"
                    },
                    {
                        "id": "grammar-23-2-3",
                        "text": "電車に＿＿　＿＿　＿★＿　＿＿後ろの人から急に押されてびっくりした。",
                        "options": ["と", "した", "乗ろう", "ところ"],
                        "answer": "した",
                        "explanation": "電車に[乗ろう][と][した★][ところ]後ろの人から急に押されてびっくりした。(3, 1, 2, 4)"
                    }
                ]
            },
            {
                "id": "grammar-23-3",
                "title": "問題3",
                "instruction": "つぎの文章を読んで、[ 1 ]から[ 5 ]の中に入る最もよいものを、1・2・3・4から一つえらびなさい。",
                "passage": "バスに乗っていたら、後ろの席から女の子2人の会話が聞こえてきた。話の内容 [ 1 ] 、2人は大学生のようだった。\n「聞いた？ 木村さん、9月から留学 [ 2 ] 。」\n「えー、ほんと？ 知らなかった。どこの国に行くの？」\n「フランスらしいよ」\n「フランスかぁ……。フランスで何やるつもりなの？」\n「さあ、何だろうね。今度会ったら [ 3 ] ？」\n「そうだね。でも、うらやましいなあ」\n「何が？」\n「自分のやりたいことがはっきりしていることが。私 [ 4 ] 、何やったらいいのか、まだぜんぜんわからないだもん」\n「うん。私も……」\nこの2人の会話を聞いて、最近読んだ雑誌の記事を思い出した。いまの大学生の多くが、やりたいことが見つからないと言っているらしい。\nしかし、私が学生のころだって [ 5 ] 。私は「そのうち、きっと見つかるよ。がんばれ」と心の中で2人を応援した。",
                "questions": [
                    {
                        "id": "grammar-23-3-1",
                        "text": "[ 1 ] に入るもの",
                        "options": ["からこそ", "からすると", "を通して", "をもとにして"],
                        "answer": "からすると",
                        "explanation": "話の内容からすると (Judging from the content of the conversation)."
                    },
                    {
                        "id": "grammar-23-3-2",
                        "text": "[ 2 ] に入るもの",
                        "options": ["したらいいのに", "するんだっけ", "するんだって", "するしかないよ"],
                        "answer": "するんだって",
                        "explanation": "〜んだって (I heard that〜)."
                    },
                    {
                        "id": "grammar-23-3-3",
                        "text": "[ 3 ] に入るもの",
                        "options": ["聞いておけば", "聞いてみれば", "聞こうとしたら", "聞いてもらったら"],
                        "answer": "聞いてみれば",
                        "explanation": "聞いてみれば？ (Why don't you ask?)."
                    },
                    {
                        "id": "grammar-23-3-4",
                        "text": "[ 4 ] に入るもの",
                        "options": ["って", "など", "なんて", "にとって"],
                        "answer": "なんて",
                        "explanation": "私なんて (Someone like me)."
                    },
                    {
                        "id": "grammar-23-3-5",
                        "text": "[ 5 ] に入るもの",
                        "options": ["同じではなかった", "同じくらいだった", "同じようなものだった", "同じわけはなかった"],
                        "answer": "同じようなものだった",
                        "explanation": "同じようなものだった (It was about the same)."
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

print("Added Drills 22 and 23")
