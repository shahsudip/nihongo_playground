import json
import os

data_path = 'power_drill_data.json'
with open(data_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

drills = {
    "grammar-24": {
        "id": "grammar-24",
        "title": "第24回",
        "sections": [
            {
                "id": "grammar-24-1",
                "title": "問題1",
                "instruction": "つぎの文の（　）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。",
                "questions": [
                    {
                        "id": "grammar-24-1-1",
                        "text": "この二つの言葉は意味が似ているので、日本人でもまちがえ（　）。",
                        "options": ["げだ", "がちだ", "っぽい", "だらけだ"],
                        "answer": "がちだ",
                        "explanation": "〜がちだ (Tends to〜)."
                    },
                    {
                        "id": "grammar-24-1-2",
                        "text": "人にぶつかって、駅のホームから（　）だった。危なかった。",
                        "options": ["落ちたところ", "落ちるところ", "落ちかけたこと", "落ちかけること"],
                        "answer": "落ちるところ",
                        "explanation": "〜るところだった (Was about to〜)."
                    },
                    {
                        "id": "grammar-24-1-3",
                        "text": "結婚して名字が変わったが、仕事（　）、元の名前を使っている。",
                        "options": ["中", "以上", "上は", "の最中に"],
                        "answer": "上は",
                        "explanation": "〜上は (As far as〜 is concerned, in terms of〜)."
                    },
                    {
                        "id": "grammar-24-1-4",
                        "text": "この商品は、お客様から募集したアイディア（　）開発されました。",
                        "options": ["によって", "を通じて", "にしたがって", "をもとにして"],
                        "answer": "をもとにして",
                        "explanation": "〜をもとにして (Based on〜)."
                    },
                    {
                        "id": "grammar-24-1-5",
                        "text": "大きな音にびっくりした（　）、手に持っていた皿を落としてしまった。",
                        "options": ["あまり", "かぎり", "かわり", "たびに"],
                        "answer": "あまり",
                        "explanation": "〜あまり (So much that... / Excessively)."
                    },
                    {
                        "id": "grammar-24-1-6",
                        "text": "こんなに大きな花束をもらって、女性が喜ばない（　）。",
                        "options": ["こともない", "はずがない", "ほどではない", "わけではない"],
                        "answer": "はずがない",
                        "explanation": "〜はずがない (There is no way that〜)."
                    },
                    {
                        "id": "grammar-24-1-7",
                        "text": "A：井上さん、忙しいから会長はできないって。\nB：できない（　）、やりたくないんでしょう。",
                        "options": ["っていうか", "ばかりか", "っていうなら", "ばかりじゃなくて"],
                        "answer": "っていうか",
                        "explanation": "〜っていうか (Or rather〜)."
                    }
                ]
            },
            {
                "id": "grammar-24-2",
                "title": "問題2",
                "instruction": "つぎの文の＿★＿に入る最もよいものを、1・2・3・4から一つえらびなさい。",
                "questions": [
                    {
                        "id": "grammar-24-2-1",
                        "text": "先生から、試験の願書は自分で本屋に＿＿　＿＿　＿★＿　＿＿言われた。",
                        "options": ["くる", "行って", "買って", "ように"],
                        "answer": "くる",
                        "explanation": "試験の願書は自分で本屋に[行って][買って][くる★][ように]言われた。(2, 3, 1, 4)"
                    },
                    {
                        "id": "grammar-24-2-2",
                        "text": "車は＿＿　＿＿　＿★＿　＿＿一度は検査しなければならない。",
                        "options": ["年に", "故障", "の有無", "にかかわらず"],
                        "answer": "にかかわらず",
                        "explanation": "車は[故障][の有無][にかかわらず★][年に]一度は検査しなければならない。(2, 3, 4, 1)"
                    },
                    {
                        "id": "grammar-24-2-3",
                        "text": "そのうわさは、インターネット＿＿　＿＿　＿★＿　＿＿いった。",
                        "options": ["広がって", "を通じて", "を中心に", "十代の若者"],
                        "answer": "を中心に",
                        "explanation": "そのうわさは、インターネット[を通じて][十代の若者][を中心に★][広がって]いった。(2, 4, 3, 1)"
                    }
                ]
            },
            {
                "id": "grammar-24-3",
                "title": "問題3",
                "instruction": "つぎの文章を読んで、[ 1 ]から[ 5 ]の中に入る最もよいものを、1・2・3・4から一つえらびなさい。",
                "passage": "山田市　山を歩く会　会員募集！\n\n「山田市　山を歩く会」は山田市の市民によって作られた会です。少しでも多くの方に山歩きの楽しみを知っていただきたいと思い、会ができて20周年の今年、あらためて会員を募集することになりました。\n私たちはこれまで、関東 [ 1 ] 、日本各地のさまざまな山を歩いてきました。会ができたときは10名 [ 2 ] だった会員も、現在では80名を超えています。\n会員からは、「山歩きで心や体が元気になった」「山歩きを通して友達が増えた」「自然に対して興味を持つようになった」などの声が数多く聞かれます。\n当会では、リーダーの指導により、一人ひとりの経験や体力 [ 3 ] 安全な山歩きをしています。今までひとつ [ 4-a ] 事故 [ 4-b ] ありません。\n健康な方なら、年齢やお住まいの場所を問わず、どなたでもご参加 [ 5 ] 。\n山歩きに興味をお持ちの方は、ぜひご連絡ください。\n\n山田市　山を歩く会\n代表　野田\n電話：03-4321-xxxx",
                "questions": [
                    {
                        "id": "grammar-24-3-1",
                        "text": "[ 1 ] に入るもの",
                        "options": ["にかけて", "にわたって", "をはじめ", "という"],
                        "answer": "をはじめ",
                        "explanation": "関東をはじめ (Starting with Kanto, and other places)."
                    },
                    {
                        "id": "grammar-24-3-2",
                        "text": "[ 2 ] に入るもの",
                        "options": ["以上", "しか", "ほど", "まで"],
                        "answer": "ほど",
                        "explanation": "10名ほど (About 10 members)."
                    },
                    {
                        "id": "grammar-24-3-3",
                        "text": "[ 3 ] に入るもの",
                        "options": ["に関した", "に応じた", "に比べた", "にこたえた"],
                        "answer": "に応じた",
                        "explanation": "体力に応じた (According to physical strength)."
                    },
                    {
                        "id": "grammar-24-3-4",
                        "text": "[ 4 ] に入るもの",
                        "options": ["a の / b も", "a は / b が", "a は / b も", "a の / b が"],
                        "answer": "a の / b も",
                        "explanation": "ひとつの事故もありません (Not even a single accident)."
                    },
                    {
                        "id": "grammar-24-3-5",
                        "text": "[ 5 ] に入るもの",
                        "options": ["いただきます", "いただけます", "くださいませ", "くださいませんか"],
                        "answer": "いただけます",
                        "explanation": "ご参加いただけます (You can participate - humble/polite potential)."
                    }
                ]
            }
        ]
    },
    "grammar-25": {
        "id": "grammar-25",
        "title": "第25回",
        "sections": [
            {
                "id": "grammar-25-1",
                "title": "問題1",
                "instruction": "つぎの文の（　）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。",
                "questions": [
                    {
                        "id": "grammar-25-1-1",
                        "text": "今日の仕事はかわりの人がいないから、体調が悪くても行かない（　）。",
                        "options": ["わけだ", "わけがない", "わけではない", "わけにはいかない"],
                        "answer": "わけにはいかない",
                        "explanation": "〜わけにはいかない (Can't afford to / Must not)."
                    },
                    {
                        "id": "grammar-25-1-2",
                        "text": "昨日は晩ご飯（　）ほど眠くて、家に着くとすぐに寝てしまった。",
                        "options": ["など食べる", "など食べない", "さえ食べられる", "さえ食べられない"],
                        "answer": "さえ食べられない",
                        "explanation": "〜さえ〜ない (Can't even〜)."
                    },
                    {
                        "id": "grammar-25-1-3",
                        "text": "今日の参加者が3人というのは、加藤さんが来られなくなった（　）ですか。",
                        "options": ["そう", "っぽい", "みたい", "ってこと"],
                        "answer": "ってこと",
                        "explanation": "〜ってこと (Does it mean that〜?)."
                    },
                    {
                        "id": "grammar-25-1-4",
                        "text": "婚約指輪（　）やっぱりダイヤモンドが一番人気ですね。",
                        "options": ["というか", "といったら", "にとっては", "にすれば"],
                        "answer": "といったら",
                        "explanation": "〜といったら (Speaking of〜)."
                    },
                    {
                        "id": "grammar-25-1-5",
                        "text": "この人と結婚した（　）、何があっても信じようと思う。",
                        "options": ["以上", "上では", "からこそ", "かぎりでは"],
                        "answer": "以上",
                        "explanation": "〜以上 (Now that / Since〜)."
                    },
                    {
                        "id": "grammar-25-1-6",
                        "text": "いなかに引っ越してから、自然に朝早く起きる（　）。",
                        "options": ["ことにした", "ことになった", "ようにした", "ようになった"],
                        "answer": "ようになった",
                        "explanation": "〜ようになった (Reached the point where / Came to〜)."
                    },
                    {
                        "id": "grammar-25-1-7",
                        "text": "毎日パソコンの画面ばかり見ているので、目が悪くなる（　）。",
                        "options": ["一方だ", "かぎりだ", "しかない", "ほどではない"],
                        "answer": "一方だ",
                        "explanation": "〜一方だ (Keeps doing / Only continues to〜 in one direction)."
                    }
                ]
            },
            {
                "id": "grammar-25-2",
                "title": "問題2",
                "instruction": "つぎの文の＿★＿に入る最もよいものを、1・2・3・4から一つえらびなさい。",
                "questions": [
                    {
                        "id": "grammar-25-2-1",
                        "text": "クレジットカードは＿＿　＿＿　＿★＿　＿＿があるので、注意が必要だ。",
                        "options": ["おそれ", "反面", "便利な", "使いすぎる"],
                        "answer": "便利な",
                        "explanation": "クレジットカードは[便利な][反面][使いすぎる][おそれ★]があるので、注意が必要だ。 Wait, the options are arranged as 便利な反面使いすぎるおそれ -> No, wait, 'おそれ' is the 4th word. [便利な(3)][反面(2)][使いすぎる(4)][おそれ(1)]. The star is the 3rd word, which is 4 (使いすぎる). Wait, let's fix this in the Python script. It's actually '使いすぎる'."
                    },
                    {
                        "id": "grammar-25-2-2",
                        "text": "誰かが氷を出し＿＿　＿＿　＿★＿　＿＿だから、溶けてしまった。",
                        "options": ["いた", "もの", "にして", "っぱなし"],
                        "answer": "っぱなし",
                        "explanation": "誰かが氷を出し[っぱなし★][にして][いた][もの]だから、溶けてしまった。(4, 3, 1, 2)"
                    },
                    {
                        "id": "grammar-25-2-3",
                        "text": "その案が決まると、鈴木さんは部屋を出て行った。＿＿　＿＿　＿★＿　＿＿だろう。",
                        "options": ["つまり", "嫌だった", "それほど", "ということ"],
                        "answer": "それほど",
                        "explanation": "[つまり][それほど★][嫌だった][ということ]だろう。(1, 3, 2, 4)"
                    }
                ]
            },
            {
                "id": "grammar-25-3",
                "title": "問題3",
                "instruction": "つぎの文章を読んで、[ 1 ]から[ 5 ]の中に入る最もよいものを、1・2・3・4から一つえらびなさい。",
                "passage": "先日、友人から部屋の中で育てられる植物をもらった。緑色の葉を見ていると心が落ち着くし、植物には空気をきれいにするはたらきもある [ 1 ] 、とても気に入っている。世話もそれほど難しくない。\nただ、私は一人暮らしなので、出張や旅行に行っている間の水やりのことが心配だった。\nこの植物は毎日水をやらなければならないが、出張に行った場合、少なくとも2日間は水がやれなくなる。それを友人に話した [ 2 ] 、ペットボトルで「自動水やり器」を作ったらどうかと言われ、作り方を教えてもらった。\n作り方はとても簡単だ。[ 3 ] 、ペットボトルのキャップに穴を2つあける。次に、ペットボトルにシールやテープをはって、自分の好きなかざりをつける。かざりをつけ終えたら、ペットボトルに水を入れ、キャップをして、土にさしこむ。これでできあがりだ。キャップをどのくらいきつく [ 4 ] 、出る水の量が変わるので、ちょうどいい量の水が出るように調節する。水が少なすぎる場合は、穴の数を増やせばいい。\n今ではこの水やり器 [ 5 ] 、安心して出張や旅行に行けるようになった。",
                "questions": [
                    {
                        "id": "grammar-25-3-1",
                        "text": "[ 1 ] に入るもの",
                        "options": ["といったら", "といっても", "ということで", "というよりも"],
                        "answer": "ということで",
                        "explanation": "〜ということで (Also for the reason that〜)."
                    },
                    {
                        "id": "grammar-25-3-2",
                        "text": "[ 2 ] に入るもの",
                        "options": ["まま", "あまり", "とおり", "ところ"],
                        "answer": "ところ",
                        "explanation": "話したところ (When I talked / told〜)."
                    },
                    {
                        "id": "grammar-25-3-3",
                        "text": "[ 3 ] に入るもの",
                        "options": ["まず", "また", "こうして", "それから"],
                        "answer": "まず",
                        "explanation": "まず (First)."
                    },
                    {
                        "id": "grammar-25-3-4",
                        "text": "[ 4 ] に入るもの",
                        "options": ["しめるとしても", "しめるかによって", "しめるために", "しめるかのように"],
                        "answer": "しめるかによって",
                        "explanation": "〜かによって (Depending on how〜)."
                    },
                    {
                        "id": "grammar-25-3-5",
                        "text": "[ 5 ] に入るもの",
                        "options": ["のせいで", "のおかげで", "を通じて", "を込めて"],
                        "answer": "のおかげで",
                        "explanation": "〜のおかげで (Thanks to〜)."
                    }
                ]
            }
        ]
    }
}

# Wait, the explanation for 25-2-1 should be '使いすぎる'
drills['grammar-25']['sections'][1]['questions'][0]['answer'] = '使いすぎる'
drills['grammar-25']['sections'][1]['questions'][0]['explanation'] = 'クレジットカードは[便利な][反面][使いすぎる★][おそれ]があるので、注意が必要だ。(3, 2, 4, 1)'

for i, chapter in enumerate(data['chapters']):
    if chapter['id'] in drills:
        data['chapters'][i] = drills[chapter['id']]

with open(data_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Added Drills 24 and 25")
