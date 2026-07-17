import json
import os

data_path = 'power_drill_data.json'
with open(data_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

drills = {
    "grammar-20": {
        "id": "grammar-20",
        "title": "第20回",
        "sections": [
            {
                "id": "grammar-20-1",
                "title": "問題1",
                "instruction": "つぎの文の（　）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。",
                "questions": [
                    {
                        "id": "grammar-20-1-1",
                        "text": "まだ勉強を始めて半年の私が、通訳（　）できるとは思えない。",
                        "options": ["さえ", "など", "ほど", "くらい"],
                        "answer": "など",
                        "explanation": "など expresses modesty or lowers the value ('things like interpreting')."
                    },
                    {
                        "id": "grammar-20-1-2",
                        "text": "明日は朝早いから、もう寝なきゃ。寝坊（　）いいけど。",
                        "options": ["したら", "すれば", "しないで", "しないと"],
                        "answer": "しないと",
                        "explanation": "〜ないといい (I hope I don't〜). 寝坊しないといいけど (I hope I don't oversleep)."
                    },
                    {
                        "id": "grammar-20-1-3",
                        "text": "このアイスクリーム店は、夏（　）冬でも混んでいる。",
                        "options": ["ばかりに", "に比べて", "に比べると", "ばかりでなく"],
                        "answer": "ばかりでなく",
                        "explanation": "〜ばかりでなく (not only〜 but also)."
                    },
                    {
                        "id": "grammar-20-1-4",
                        "text": "私たちの生活は、便利になる（　）、エネルギーも大量に消費するようになった。",
                        "options": ["一方で", "うえに", "くせに", "ばかりか"],
                        "answer": "一方で",
                        "explanation": "〜一方で (on the other hand / while at the same time)."
                    },
                    {
                        "id": "grammar-20-1-5",
                        "text": "逃げた車は、青（　）、水色に近い薄い青だったように思います。",
                        "options": ["というか", "に比べて", "に対して", "といえば"],
                        "answer": "というか",
                        "explanation": "〜というか (or rather)."
                    },
                    {
                        "id": "grammar-20-1-6",
                        "text": "普通免許を持っていること（　）、違反がないことが応募の条件です。",
                        "options": ["に応じて", "に加えて", "にしたがって", "にかわって"],
                        "answer": "に加えて",
                        "explanation": "〜に加えて (in addition to)."
                    },
                    {
                        "id": "grammar-20-1-7",
                        "text": "新聞によると、今年は去年の2倍の花粉が飛ぶ（　）。",
                        "options": ["わけだ", "かもしれない", "ということだ", "ことになっている"],
                        "answer": "ということだ",
                        "explanation": "〜によると〜ということだ (According to〜, it is said that〜)."
                    }
                ]
            },
            {
                "id": "grammar-20-2",
                "title": "問題2",
                "instruction": "つぎの文の＿★＿に入る最もよいものを、1・2・3・4から一つえらびなさい。",
                "questions": [
                    {
                        "id": "grammar-20-2-1",
                        "text": "ここでは女の子が＿＿　＿＿　＿★＿　＿＿物がたくさん売られている。",
                        "options": ["がり", "ほし", "かわいい", "そうな"],
                        "answer": "そうな",
                        "explanation": "女の子が[ほし][がり][そうな★][かわいい]物がたくさん売られている。(2, 1, 4, 3)"
                    },
                    {
                        "id": "grammar-20-2-2",
                        "text": "今日は天気が＿＿　＿＿　＿★＿　＿＿から、海には行かないことにした。",
                        "options": ["いい", "低い", "気温が", "わりには"],
                        "answer": "気温が",
                        "explanation": "天気が[いい][わりには][気温が★][低い]から (1, 4, 3, 2)"
                    },
                    {
                        "id": "grammar-20-2-3",
                        "text": "メールでは＿＿　＿＿　＿★＿　＿＿彼には言いたいことがたくさんある。",
                        "options": ["書き", "ほど", "とても", "きれない"],
                        "answer": "きれない",
                        "explanation": "メールでは[とても][書き][きれない★][ほど] (3, 1, 4, 2)"
                    }
                ]
            },
            {
                "id": "grammar-20-3",
                "title": "問題3",
                "instruction": "つぎの文章を読んで、[ 1 ]から[ 5 ]の中に入る最もよいものを、1・2・3・4から一つえらびなさい。",
                "passage": "滋賀県にある琵琶湖は、日本でいちばん大きい湖 [ 1 ] 有名だ。しかし、この湖が日本でいちばん古い湖だということは、あまり知られていない。\nふつう、湖の寿命は数千年から数万年と言われている。これは、湖に流れこんでいる川が運ぶ砂や土が湖の底にたまっていき、月日がたつ [ 2 ] 湖を埋めていくからだ。\nところが、なかには10万年以上長生きする湖もある。このような湖は「古代湖」と呼ばれる。「古代湖」は世界でも20だけしか確認 [ 3 ] 。その中でいちばん古いのは、ロシアにあるバイカル湖で、2000万年の歴史がある。琵琶湖はバイカル湖 [ 4 ] 古くはないが、400万年もの歴史がある日本でたった一つの「古代湖」だ。\n「古代湖」では、他の場所にはいないめずらしい生物が見られる。琵琶湖にも、琵琶湖にしかいない生物が50種類以上いる。\n400万年もの歴史を持つ琵琶湖と、そこに住むめずらしい生物たちを、これからも [ 5 ] ものだ。",
                "questions": [
                    {
                        "id": "grammar-20-3-1",
                        "text": "[ 1 ] に入るもの",
                        "options": ["として", "において", "について", "としたら"],
                        "answer": "として",
                        "explanation": "〜として有名だ (famous as〜)."
                    },
                    {
                        "id": "grammar-20-3-2",
                        "text": "[ 2 ] に入るもの",
                        "options": ["ことで", "につれて", "によって", "ところで"],
                        "answer": "につれて",
                        "explanation": "月日がたつにつれて (As time passes)."
                    },
                    {
                        "id": "grammar-20-3-3",
                        "text": "[ 3 ] に入るもの",
                        "options": ["しない", "させていない", "させられない", "されていない"],
                        "answer": "されていない",
                        "explanation": "確認されていない (has not been confirmed)."
                    },
                    {
                        "id": "grammar-20-3-4",
                        "text": "[ 4 ] に入るもの",
                        "options": ["こそ", "さえ", "ほど", "まで"],
                        "answer": "ほど",
                        "explanation": "バイカル湖ほど古くはない (Not as old as Lake Baikal)."
                    },
                    {
                        "id": "grammar-20-3-5",
                        "text": "[ 5 ] に入るもの",
                        "options": ["守り続ける", "守り続けよう", "守り続けるべき", "守り続けていきたい"],
                        "answer": "守り続けていきたい",
                        "explanation": "守り続けていきたいものだ (I want to continue protecting them)."
                    }
                ]
            }
        ]
    },
    "grammar-training-7": {
        "id": "grammar-training-7",
        "title": "集中トレーニング ⑦ 副詞（１）",
        "sections": [
            {
                "id": "grammar-training-7-1",
                "title": "問題1",
                "instruction": "（　）の中のaとbのうち、文に合うほうをえらびましょう。",
                "questions": [
                    {
                        "id": "grammar-training-7-1-1",
                        "text": "子どもが（ a 今ごろ　b 今にも ）泣き出しそうな顔をしている。",
                        "options": ["今ごろ", "今にも"],
                        "answer": "今にも",
                        "explanation": "今にも〜そうだ (looks like it's about to〜 at any moment)."
                    },
                    {
                        "id": "grammar-training-7-1-2",
                        "text": "雨がやんで、（ a 次第に　b 次々に ）空が明るくなってきた。",
                        "options": ["次第に", "次々に"],
                        "answer": "次第に",
                        "explanation": "次第に (gradually)."
                    },
                    {
                        "id": "grammar-training-7-1-3",
                        "text": "（ a 実に　b 別に ）私はそのやり方が悪いと言っているわけじゃないんです。",
                        "options": ["実に", "別に"],
                        "answer": "別に",
                        "explanation": "別に〜ない (not particularly)."
                    },
                    {
                        "id": "grammar-training-7-1-4",
                        "text": "彼女の誕生日は（ a 確か　b 確かに ）3月じゃなかったっけ。",
                        "options": ["確か", "確かに"],
                        "answer": "確か",
                        "explanation": "確か (If I remember correctly)."
                    },
                    {
                        "id": "grammar-training-7-1-5",
                        "text": "（ a つい　b たとえ ）練習がつらくても、私はがんばります。",
                        "options": ["つい", "たとえ"],
                        "answer": "たとえ",
                        "explanation": "たとえ〜ても (even if)."
                    },
                    {
                        "id": "grammar-training-7-1-6",
                        "text": "私はスペイン語なんて（ a ちっとも　b めったに ）話せません。",
                        "options": ["ちっとも", "めったに"],
                        "answer": "ちっとも",
                        "explanation": "ちっとも〜ない (not at all)."
                    },
                    {
                        "id": "grammar-training-7-1-7",
                        "text": "ルールは（ a 決して　b 絶対に ）守ってください。",
                        "options": ["決して", "絶対に"],
                        "answer": "絶対に",
                        "explanation": "絶対に (absolutely). 決して is used with negative."
                    },
                    {
                        "id": "grammar-training-7-1-8",
                        "text": "今の仕事は（ a すっかり　b たいして ）難しくない。",
                        "options": ["すっかり", "たいして"],
                        "answer": "たいして",
                        "explanation": "たいして〜ない (not very much)."
                    },
                    {
                        "id": "grammar-training-7-1-9",
                        "text": "日本にいる間に（ a どうか　b どうしても ）富士山に登りたい。",
                        "options": ["どうか", "どうしても"],
                        "answer": "どうしても",
                        "explanation": "どうしても〜たい (want to〜 no matter what)."
                    },
                    {
                        "id": "grammar-training-7-1-10",
                        "text": "セールだからといって、（ a すべて　b たいてい ）安くなっているとはかぎらない。",
                        "options": ["すべて", "たいてい"],
                        "answer": "すべて",
                        "explanation": "すべて〜とはかぎらない (not necessarily all)."
                    }
                ]
            }
        ]
    },
    "grammar-training-8": {
        "id": "grammar-training-8",
        "title": "集中トレーニング ⑧ 副詞（２）",
        "sections": [
            {
                "id": "grammar-training-8-1",
                "title": "問題1",
                "instruction": "（　）の中のaとbのうち、文に合うほうをえらびましょう。",
                "questions": [
                    {
                        "id": "grammar-training-8-1-1",
                        "text": "こういう場合は、（ a 全然　b 当然 ）責任者が謝るべきだ。",
                        "options": ["全然", "当然"],
                        "answer": "当然",
                        "explanation": "当然 (naturally/of course)."
                    },
                    {
                        "id": "grammar-training-8-1-2",
                        "text": "（ a とくに　b とっくに ）夏は終わったはずなのに、まだ暑い。",
                        "options": ["とくに", "とっくに"],
                        "answer": "とっくに",
                        "explanation": "とっくに (already long ago)."
                    },
                    {
                        "id": "grammar-training-8-1-3",
                        "text": "いやなら（ a はっきり　b ぴったり ）断ればいいのに。",
                        "options": ["はっきり", "ぴったり"],
                        "answer": "はっきり",
                        "explanation": "はっきり断る (refuse clearly)."
                    },
                    {
                        "id": "grammar-training-8-1-4",
                        "text": "会社までいつもはバスだが、（ a たまに　b たまたま ）自転車で行くこともある。",
                        "options": ["たまに", "たまたま"],
                        "answer": "たまに",
                        "explanation": "たまに (occasionally)."
                    },
                    {
                        "id": "grammar-training-8-1-5",
                        "text": "疲れをとるには、（ a ぐっすり　b すっかり ）眠ることだ。",
                        "options": ["ぐっすり", "すっかり"],
                        "answer": "ぐっすり",
                        "explanation": "ぐっすり眠る (sleep soundly)."
                    },
                    {
                        "id": "grammar-training-8-1-6",
                        "text": "今日返すつもりだった本を（ a うっかり　b ついに ）家に忘れてきてしまった。",
                        "options": ["うっかり", "ついに"],
                        "answer": "うっかり",
                        "explanation": "うっかり (carelessly)."
                    },
                    {
                        "id": "grammar-training-8-1-7",
                        "text": "夜中に（ a こっそり　b そっくり ）家を出ようとしたら、母に見つかってしまった。",
                        "options": ["こっそり", "そっくり"],
                        "answer": "こっそり",
                        "explanation": "こっそり (secretly/stealthily)."
                    },
                    {
                        "id": "grammar-training-8-1-8",
                        "text": "店内にごみが落ちていないかどうか、（ a 常に　b 非常に ）注意するように。",
                        "options": ["常に", "非常に"],
                        "answer": "常に",
                        "explanation": "常に (always/constantly)."
                    },
                    {
                        "id": "grammar-training-8-1-9",
                        "text": "遠いのに（ a まあまあ　b わざわざ ）来てくれてありがとう。",
                        "options": ["まあまあ", "わざわざ"],
                        "answer": "わざわざ",
                        "explanation": "わざわざ (going out of one's way)."
                    },
                    {
                        "id": "grammar-training-8-1-10",
                        "text": "昔住んでいたこの町は、今では（ a すっかり　b ちっとも ）変わってしまった。",
                        "options": ["すっかり", "ちっとも"],
                        "answer": "すっかり",
                        "explanation": "すっかり変わる (completely change)."
                    }
                ]
            }
        ]
    },
    "grammar-21": {
        "id": "grammar-21",
        "title": "第21回",
        "sections": [
            {
                "id": "grammar-21-1",
                "title": "問題1",
                "instruction": "つぎの文の（　）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。",
                "questions": [
                    {
                        "id": "grammar-21-1-1",
                        "text": "あ、エアコンが消えている。どうりで暑い（　）。",
                        "options": ["ことだ", "までだ", "ものだ", "わけだ"],
                        "answer": "わけだ",
                        "explanation": "どうりで〜わけだ (No wonder〜)."
                    },
                    {
                        "id": "grammar-21-1-2",
                        "text": "町が有名になる（　）、観光客も増えてきた。",
                        "options": ["くらい", "わりに", "おかげで", "につれて"],
                        "answer": "につれて",
                        "explanation": "〜につれて (As〜)."
                    },
                    {
                        "id": "grammar-21-1-3",
                        "text": "彼と大事な話（　）最中に、母から電話がかかってきた。",
                        "options": ["をする", "をした", "をしている", "をしようとした"],
                        "answer": "をしている",
                        "explanation": "〜している最中に (In the middle of doing〜)."
                    },
                    {
                        "id": "grammar-21-1-4",
                        "text": "はやく病院に行かないと、傷がひどく（　）。",
                        "options": ["なりたがる", "なりかねない", "なるところだ", "なろうとする"],
                        "answer": "なりかねない",
                        "explanation": "〜かねない (Could possibly happen - negative outcome)."
                    },
                    {
                        "id": "grammar-21-1-5",
                        "text": "いろいろと（　）、引っ越しはしないことに決めた。",
                        "options": ["考えたすえ", "考えたなら", "考えながら", "考えるほど"],
                        "answer": "考えたすえ",
                        "explanation": "〜た末 (After having done〜)."
                    },
                    {
                        "id": "grammar-21-1-6",
                        "text": "この小型車はデザインがいい（　）価格も安いため、大ヒットした。",
                        "options": ["うえに", "かわりに", "ついでに", "にともなって"],
                        "answer": "うえに",
                        "explanation": "〜うえに (On top of that / besides)."
                    },
                    {
                        "id": "grammar-21-1-7",
                        "text": "こんなに道が混んでたら（　）から、高橋さんに連絡しとこう。",
                        "options": ["間に合いっこない", "間に合わないことはない", "間に合うかもしれない", "間に合うわけにはいかない"],
                        "answer": "間に合いっこない",
                        "explanation": "〜っこない (No way that〜 will happen)."
                    }
                ]
            },
            {
                "id": "grammar-21-2",
                "title": "問題2",
                "instruction": "つぎの文の＿★＿に入る最もよいものを、1・2・3・4から一つえらびなさい。",
                "questions": [
                    {
                        "id": "grammar-21-2-1",
                        "text": "天気が悪いから、今日はやめて＿＿　＿＿　＿★＿　＿＿か。",
                        "options": ["に", "来週", "しません", "行くこと"],
                        "answer": "に",
                        "explanation": "今日はやめて[来週][行くこと][に★][しません]か。(2, 4, 1, 3)"
                    },
                    {
                        "id": "grammar-21-2-2",
                        "text": "服は買う前に着て＿＿　＿＿　＿★＿　＿＿わからない。",
                        "options": ["みない", "どうか", "似合うか", "ことには"],
                        "answer": "似合うか",
                        "explanation": "買う前に着て[みない][ことには][似合うか★][どうか]わからない。(1, 4, 3, 2)"
                    },
                    {
                        "id": "grammar-21-2-3",
                        "text": "この講義は、教科書の＿＿　＿＿　＿★＿　＿＿こととします。",
                        "options": ["いく", "内容", "進めて", "に沿って"],
                        "answer": "進めて",
                        "explanation": "教科書の[内容][に沿って][進めて★][いく]こととします。(2, 4, 3, 1)"
                    }
                ]
            },
            {
                "id": "grammar-21-3",
                "title": "問題3",
                "instruction": "つぎの文章を読んで、[ 1 ]から[ 5 ]の中に入る最もよいものを、1・2・3・4から一つえらびなさい。",
                "passage": "ぼくはこの春、希望の大学に合格し、東京で一人暮らしを始めることになった。\nぼくは４人兄弟で、家の中はいつもにぎやかだったので、早く自分だけの静かな時間がほしいと思っていた。[ 1 ]、東京に出てくるときは、夢のような気分だった。一人暮らしなら、[ 2-a ] 昼過ぎまで寝ていても、夜 [ 2-b ] 遅く起きても、文句を言う人などいないのだ。\nぼくは小さいころから母の手伝いをよくしていたので、料理は姉に[ 3-a ] くらい [ 3-b ] だし、掃除も洗濯も問題なくできる。一人で生活することに、不安はまったくなかった。\n一緒に東京に来た父は、大学を見たあとぼくの部屋を確認すると、安心したように帰っていった。ぼくは父を見送りながら、これでようやく望んでいた[ 4 ] 一人きりの時間を持つことができたのだと喜んでいた。\nところが、１週間も経つと、一人で部屋にいることがだんだん寂しくなってきた。いつもうるさくて嫌だと思っていた家が、実は、とても安心できる場所だった[ 5 ]、一人になってはじめて気がついたのだった。",
                "questions": [
                    {
                        "id": "grammar-21-3-1",
                        "text": "[ 1 ] に入るもの",
                        "options": ["そこで", "だから", "だけど", "そのうえ"],
                        "answer": "だから",
                        "explanation": "だから (Therefore)."
                    },
                    {
                        "id": "grammar-21-3-2",
                        "text": "[ 2-a ] / [ 2-b ] に入るもの",
                        "options": ["a いくらでも / b どんなに", "a たとえ / b どんなに", "a どんなに / b いつか", "a どうしても / b たとえ"],
                        "answer": "a いくらでも / b どんなに",
                        "explanation": "いくらでも昼過ぎまで寝ていても、どんなに夜遅くまで起きていても"
                    },
                    {
                        "id": "grammar-21-3-3",
                        "text": "[ 3-a ] / [ 3-b ] に入るもの",
                        "options": ["a 負ける / b 上手", "a 負ける / b 下手", "a 負けない / b 上手", "a 負けない / b 下手"],
                        "answer": "a 負けない / b 上手",
                        "explanation": "負けないくらい上手だし (Good enough not to lose to my sister)."
                    },
                    {
                        "id": "grammar-21-3-4",
                        "text": "[ 4 ] に入るもの",
                        "options": ["かわりに", "くらいの", "とおりの", "みたいな"],
                        "answer": "とおりの",
                        "explanation": "望んでいたとおりの (Exactly as I had hoped)."
                    },
                    {
                        "id": "grammar-21-3-5",
                        "text": "[ 5 ] に入るもの",
                        "options": ["ところに", "ことに", "ものに", "ように"],
                        "answer": "ことに",
                        "explanation": "〜ことに気がついた (Realized that〜)."
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

print("Added Drills 20, Training 7, Training 8, and Drill 21")
