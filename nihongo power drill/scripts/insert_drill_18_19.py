import json
import os

data_path = 'power_drill_data.json'
with open(data_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

drills = {
    "grammar-18": {
        "id": "grammar-18",
        "title": "第18回",
        "sections": [
            {
                "id": "mondai-1",
                "title": "問題1",
                "description": "つぎの文の（　　）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。",
                "questions": [
                    {
                        "question_number": "1",
                        "text": "この人は歌手（　　）歌が下手すぎる。私のほうが上手だと思う。",
                        "options": ["くらい", "なんか", "のくせに", "のせいで"],
                        "correct_answer": "3"
                    },
                    {
                        "question_number": "2",
                        "text": "母はいつも妹に、もっと女の子（　　）服を着なさいと言っている。",
                        "options": ["そうな", "らしい", "のような", "みたいな"],
                        "correct_answer": "2"
                    },
                    {
                        "question_number": "3",
                        "text": "A：今日が誕生日だって、もちろん覚えてたよ。\nB：うそ（　　）！",
                        "options": ["っきり", "だらけ", "ばっかり", "なんだから"],
                        "correct_answer": "3"
                    },
                    {
                        "question_number": "4",
                        "text": "本日の花火大会は、雨天（　　）中止とさせていただきます。",
                        "options": ["だから", "により", "を問わず", "にあたって"],
                        "correct_answer": "2"
                    },
                    {
                        "question_number": "5",
                        "text": "医者から、激しい運動は（　　）と言われた。",
                        "options": ["してごらん", "するように", "しないように", "するしかない"],
                        "correct_answer": "3"
                    },
                    {
                        "question_number": "6",
                        "text": "100年前にはできる（　　）と思われていたことが、今ではすっかり普通になっている。",
                        "options": ["わけか", "わけがない", "わけではない", "わけにはいかない"],
                        "correct_answer": "2"
                    },
                    {
                        "question_number": "7",
                        "text": "試験の日がどんどん（　　）。もうあと1週間しかない。",
                        "options": ["近づいていく", "近づいてくる", "近づきそうだ", "近づくようだ"],
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
                        "text": "この動物の生態＿＿　＿＿　＿★＿　＿＿わかっていないことが多い。",
                        "options": ["に", "でさえ", "ついては", "専門家"],
                        "correct_answer": "2",
                        "correct_order": "1,3,4,2"
                    },
                    {
                        "question_number": "2",
                        "text": "ここ数年で、ガソリン車＿＿　＿＿　＿★＿　＿＿普及してきている。",
                        "options": ["が", "に", "かわって", "電気自動車"],
                        "correct_answer": "4",
                        "correct_order": "2,3,4,1"
                    },
                    {
                        "question_number": "3",
                        "text": "言葉が通じない＿＿　＿＿　＿★＿　＿＿何を言っているか推測するしかなかった。",
                        "options": ["その人の", "から", "態度や表情", "以上"],
                        "correct_answer": "3",
                        "correct_order": "4,1,3,2"
                    }
                ]
            },
            {
                "id": "mondai-3",
                "title": "問題3",
                "description": "つぎの文章を読んで、[ 1 ]から[ 5 ]の中に入る最もよいものを、1・2・3・4から一つえらびなさい。",
                "passage": "明日は母の誕生日だ。父と相談し、今年は母にホームベーカリーをプレゼントすることにした。\nホームベーカリーがあれば、家で手軽に [ 1 ] パンが食べられるようになる。母はパンが大好きだし、父の話では、以前二人でデパートの家電売り場に行ったときに、母がほしそうに見ていたらしいのだ。\n昨日、父とデパートに行ってきた。ホームベーカリー [ 2 ] パンを焼くだけでなく、ケーキやジャムやうどんまで作れるものがあると知って驚いた。米からパンを作るこができるものもあるそうだ。\nどれを買おうか2時間以上迷った [ 3 ] 、結局、一番人気があるものに決めた。使い方が簡単で、いろいろなパンを作れるところが気に入った。\n家に帰る途中、父から、「お母さんは説明書を読んでも [ 4 ] から、プレゼントしたら、ちゃんと使い方まで教えてあげるんだよ」と言われたので、説明書を読んでおかなければ。\n母はきっと喜んで [ 5 ] 。母と一緒にパンを焼くのがとても楽しみだ。",
                "questions": [
                    {
                        "question_number": "1",
                        "text": "[ 1 ]",
                        "options": ["焼きがちな", "焼きかけの", "焼きすぎの", "焼きたての"],
                        "correct_answer": "4"
                    },
                    {
                        "question_number": "2",
                        "text": "[ 2 ]",
                        "options": ["としたら", "としても", "といったら", "といっても"],
                        "correct_answer": "4"
                    },
                    {
                        "question_number": "3",
                        "text": "[ 3 ]",
                        "options": ["うえ", "すえ", "あまり", "ところ"],
                        "correct_answer": "2"
                    },
                    {
                        "question_number": "4",
                        "text": "[ 4 ]",
                        "options": ["わかりにくい", "わかりかねる", "わかりかねない", "わかりっこない"],
                        "correct_answer": "4"
                    },
                    {
                        "question_number": "5",
                        "text": "[ 5 ]",
                        "options": ["あげるだろう", "くれるだろう", "もらえるだろう", "ほしいだろう"],
                        "correct_answer": "2"
                    }
                ]
            }
        ]
    },
    "grammar-19": {
        "id": "grammar-19",
        "title": "第19回",
        "sections": [
            {
                "id": "mondai-1",
                "title": "問題1",
                "description": "つぎの文の（　　）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。",
                "questions": [
                    {
                        "question_number": "1",
                        "text": "東京で生活する人（　　）、電車はとても大事な交通手段だ。",
                        "options": ["なら", "だから", "にとって", "ともなると"],
                        "correct_answer": "3"
                    },
                    {
                        "question_number": "2",
                        "text": "ただいまホームページ（　　）、アルバイトを募集しております。",
                        "options": ["上", "上に", "上にて", "上には"],
                        "correct_answer": "3"
                    },
                    {
                        "question_number": "3",
                        "text": "このコンテストは、年齢も国籍も（　　）。みなさん、ぜひ応募してください。",
                        "options": ["ありません", "問いません", "かぎりません", "決まりません"],
                        "correct_answer": "2"
                    },
                    {
                        "question_number": "4",
                        "text": "朝食（　　）学校に行くのは体に悪いからやめたほうがいい。",
                        "options": ["だけに", "なしに", "ぬきで", "のみで"],
                        "correct_answer": "3"
                    },
                    {
                        "question_number": "5",
                        "text": "そんな不思議なことが本当に起こるとは（　　）。",
                        "options": ["信じがたい", "信じやすい", "信じないことはない", "信じるわけではない"],
                        "correct_answer": "1"
                    },
                    {
                        "question_number": "6",
                        "text": "彼がどんなに謝った（　　）、私は彼を許すことはできない。",
                        "options": ["といえば", "としても", "とすれば", "といったら"],
                        "correct_answer": "2"
                    },
                    {
                        "question_number": "7",
                        "text": "あの子はどうしていつも（　　）表情をしているのだろう。",
                        "options": ["さびしげな", "さびしいらしい", "さびしがった", "さびしいほどの"],
                        "correct_answer": "1"
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
                        "text": "いつまでも親に頼って＿＿　＿＿　＿★＿　＿＿自立するべきだ。",
                        "options": ["で", "そろそろ", "いない", "ばかり"],
                        "correct_answer": "1",
                        "correct_order": "4,3,1,2"
                    },
                    {
                        "question_number": "2",
                        "text": "今日はレストランで食事する＿＿　＿＿　＿★＿　＿＿店は閉まっていた。",
                        "options": ["のに", "つもり", "だった", "行ったら"],
                        "correct_answer": "1",
                        "correct_order": "2,3,1,4"
                    },
                    {
                        "question_number": "3",
                        "text": "ねえ、知ってる？昔、吉村先生＿＿　＿＿　＿★＿　＿＿。",
                        "options": ["歌手", "って", "だった", "んだって"],
                        "correct_answer": "3",
                        "correct_order": "2,1,3,4"
                    }
                ]
            },
            {
                "id": "mondai-3",
                "title": "問題3",
                "description": "つぎの文章を読んで、[ 1 ]から[ 5 ]の中に入る最もよいものを、1・2・3・4から一つえらびなさい。",
                "passage": "みなさんは、スターアップルを知っていますか。\nスターアップルは、東南アジア [ 1 ] 、中央アメリカや南アメリカなど、気温が高く雨の多い地域に植えられている植物です。\nスターアップルの木は、成長すると高さが10〜20メートルになります。葉は、たまごの形 [ 2 ] 、長さは5〜15センチ、表側は暗い緑色ですが、裏側は黄色っぽい茶色です。実は丸く、大きさは5〜10センチほどです。種類 [ 3 ] 皮の色はさまざまですが、大きく分けると、むらさき色のものと緑色のものがあります。実を横に切ると、たねのまわりに白い星形の模様があるため、スターアップルという名前がつけられた [ 4 ] 。\n食べるときは、実を半分に切り、中身だけスプーンですくって食べます。味はあまく、冷やして食べるとゼリーみたいな感じでとてもおいしいです。また、昔は、葉から作ったお茶を薬 [ 5 ] 利用していたそうです。",
                "questions": [
                    {
                        "question_number": "1",
                        "text": "[ 1 ]",
                        "options": ["において", "にともなって", "をもとにして", "をはじめとして"],
                        "correct_answer": "4"
                    },
                    {
                        "question_number": "2",
                        "text": "[ 2 ]",
                        "options": ["をしていて", "をとっていて", "になっていて", "にできていて"],
                        "correct_answer": "1"
                    },
                    {
                        "question_number": "3",
                        "text": "[ 3 ]",
                        "options": ["によって", "に比べて", "にこたえて", "に対して"],
                        "correct_answer": "1"
                    },
                    {
                        "question_number": "4",
                        "text": "[ 4 ]",
                        "options": ["ものでした", "ところでした", "ことにします", "ということです"],
                        "correct_answer": "4"
                    },
                    {
                        "question_number": "5",
                        "text": "[ 5 ]",
                        "options": ["として", "にとって", "は問わず", "をもとに"],
                        "correct_answer": "1"
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
print("Updated Drill 18 and 19.")
