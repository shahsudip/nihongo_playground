import json
import os

data_dir = r"D:\sudip_software\nihongo_playground\src\data\somatome"
os.makedirs(data_dir, exist_ok=True)

# Week 5 Day 1: 日記①
day1 = {
    "bookId": "somatome_n3_dokkai",
    "chapterId": "week5",
    "week": 5,
    "day": 1,
    "theme": "日記や小説を読もう",
    "title": "日記①",
    "learning_focus": {
        "title": "「だれがするか」に注意しよう！",
        "subtitle": "Pay attention to the subject of each clause!",
        "comic": {
            "text1": "（私が）手紙を書いた。",
            "text2": "（友達が）喜んだ。",
            "sign": "（私が）手紙を書いたら、（友達が）喜んだ。",
            "note": "「たら」や「と」で二つの文がつながっている場合、前の文と後ろの文で主語が違うことがあります。(When two clauses are connected with 'tara' or 'to', the subject of the first clause may differ from that of the second clause.)"
        }
    },
    "vocabulary": [
        {"word": "主語", "reading": "しゅご", "meaning": "subject (grammatical)"},
        {"word": "つなぐ", "reading": "つなぐ", "meaning": "to connect / link"},
        {"word": "喜ぶ", "reading": "よろこぶ", "meaning": "to be glad / pleased"},
        {"word": "転ぶ", "reading": "ころぶ", "meaning": "to fall down / tumble"},
        {"word": "立ち上がる", "reading": "たちあがる", "meaning": "to stand up"},
        {"word": "駅員", "reading": "えきいん", "meaning": "station staff"},
        {"word": "骨折", "reading": "こっせつ", "meaning": "bone fracture"},
        {"word": "がっかりする", "reading": "がっかりする", "meaning": "to be disappointed"},
        {"word": "退屈な", "reading": "たいくつな", "meaning": "boring / tedious"},
        {"word": "お見舞い", "reading": "おみまい", "meaning": "visiting someone sick / get-well inquiry"},
        {"word": "うらやましい", "reading": "うらやましい", "meaning": "envious / jealous"},
        {"word": "治る", "reading": "なおる", "meaning": "to heal / recover"}
    ],
    "grammar_notes": [
        {"pattern": "〜たら、…", "meaning": "when / after / if... (action leading to a discovery or another party's action)", "example": "駅員が病院へ連れて行ってくれたら、骨折していると言われてがっかりした。"}
    ],
    "practice": {
        "title": "れんしゅう",
        "instruction": "次の会話文を読んで、後の文から正しいものを選ぼう。(答えは次のページ)",
        "conversation": "A「昨日、デパートに行ったの。」\nB「何か買ったの？」\nA「うん、セーターを買ったら、店員がプレゼントをくれたの。」\nB「へえ、よかったね。」",
        "question": "文から正しいものをすべて選ぼう。",
        "options": [
            "1. Aは店員にプレゼントをあげた。",
            "2. 店員はAにプレゼントをあげた。",
            "3. 店員がAにセーターを売った。",
            "4. Aは店員にセーターを売った。"
        ],
        "correct_answers": [2, 3],
        "options_explanation": {
            "1": "不正解。Aがプレゼントをあげたのではなく、店員がAにプレゼントをくれました。",
            "2": "正解。「店員がプレゼントをくれた」＝店員はAにプレゼントをあげました。",
            "3": "正解。Aがセーターを買った＝店員がAにセーターを売りました。",
            "4": "不正解。売ったのは店員であり、Aは購入した側です。"
        }
    },
    "mondai": {
        "title": "もんだい",
        "instruction": "次の文章を読んで、後の問いに答えなさい。(答えは別冊 p.6)",
        "passage": "○月×日（金）\n\n　朝、学校へ行くとき、駅の階段で転んでしまった。痛くて立ち上がれなかったので、近くにいた人が駅員を呼んでくれた。駅員が病院へ連れて行ってくれたら、骨折していると言われてがっかりした。\n\n　学校に行けなくなって、家で退屈していたら、夕方、クラスメートの林くんと森くんがお見舞いに来てくれた。林くんがおもしろい本を貸してくれたので、退屈しなくてすんだ。森くんは学校の様子をいろいろ話してくれた。林くんと森くんは今度の日曜日にみんなで海へ行くそうだ。とてもうらやましい。\n\n　早く治るといいなあ。",
        "vocabulary_notes": [
            {"word": "転ぶ", "reading": "ころぶ", "meaning": "to fall down"},
            {"word": "がっかりする", "reading": "がっかりする", "meaning": "to be disappointed"},
            {"word": "退屈する", "reading": "たいくつする", "meaning": "to be bored"},
            {"word": "お見舞い", "reading": "おみまい", "meaning": "visiting someone sick / get-well visit"}
        ],
        "questions": [
            {
                "id": 1,
                "text": "病院へ連れて行ったのはだれか。",
                "options": [
                    "1. わたし",
                    "2. 近くにいた人",
                    "3. 医者",
                    "4. 駅員"
                ],
                "correct_answer": 4,
                "explanation": "「駅員が病院へ連れて行ってくれたら」とあり、筆者を病院へ連れて行ったのは「駅員」です。"
            },
            {
                "id": 2,
                "text": "この文章の内容と合っているものはどれか。",
                "options": [
                    "1. わたしは林くんに本を貸してあげた。",
                    "2. わたしは今度の日曜日に海へ行く。",
                    "3. 森くんは足を骨折した。",
                    "4. わたしは学校に行けなくて退屈していた。"
                ],
                "correct_answer": 4,
                "explanation": "本文に「学校に行けなくなって、家で退屈していたら」とあります。林くんがわたしに本を貸したので1は誤り、海に行くのは林くんたちなので2は誤り、骨折したのは筆者なので3は誤りです。"
            }
        ]
    }
}

# Week 5 Day 2: 日記②
day2 = {
    "bookId": "somatome_n3_dokkai",
    "chapterId": "week5",
    "week": 5,
    "day": 2,
    "theme": "日記や小説を読もう",
    "title": "日記②",
    "learning_focus": {
        "title": "日本語らしい表現に慣れよう！",
        "subtitle": "Let's familiarize ourselves with some typical Japanese expressions!",
        "comic": {
            "text1": "「気が重いなあ……」",
            "text2": "「頭が痛い問題だなあ……」",
            "sign": "慣用句（体の部分を使った表現など）に親しもう！",
            "note": "体の一部などを使った比喩的な表現（慣用句）は日記や小説で感情や状況を豊かに表現するために頻繁に使われます。(Metaphorical idiomatic expressions using body parts are frequently used in diaries and novels to describe feelings and situations.)"
        }
    },
    "vocabulary": [
        {"word": "気が重い", "reading": "きがおもい", "meaning": "heavy-hearted / reluctant / depressed"},
        {"word": "頭が痛い", "reading": "あたまがいたい", "meaning": "troublesome / causing a headache"},
        {"word": "手をつける", "reading": "てをつける", "meaning": "to start work on / set hand to"},
        {"word": "手に入らない", "reading": "てにはいらない", "meaning": "unavailable / unobtainable"},
        {"word": "手を貸す", "reading": "てをかす", "meaning": "to lend a hand / help"},
        {"word": "手を借りる", "reading": "てをかりる", "meaning": "to borrow someone's help"},
        {"word": "耳を疑う", "reading": "みみをうたがう", "meaning": "cannot believe one's ears"},
        {"word": "胸を痛める", "reading": "むねをいためる", "meaning": "to feel pain in one's heart / be deeply distressed"},
        {"word": "足を伸ばす", "reading": "あしをのばす", "meaning": "to go a little further / extend one's journey"},
        {"word": "息抜き", "reading": "いきぬき", "meaning": "taking a breather / relaxation"},
        {"word": "ついでに", "reading": "ついでに", "meaning": "taking advantage of the occasion / while one is at it"}
    ],
    "grammar_notes": [
        {"pattern": "〜に足を伸ばす", "meaning": "to go a little further to visit another place", "example": "公園まで足を伸ばした。"},
        {"pattern": "耳を疑う", "meaning": "cannot believe one's ears (due to surprise)", "example": "合格したと聞いて、自分の耳を疑った。"}
    ],
    "practice": {
        "title": "れんしゅう",
        "instruction": "次の会話文を読んで、後の文から正しいものを選ぼう。(答えは次のページ)",
        "conversation": "夫「今度の日曜日は、部長の家に行かなきゃならないんだ。気が重いよ。」\n妻「あら、大変ね。でも、部長の家は海の近くでしょう？ ついでに海まで足を伸ばして、おいしい魚でも食べてきたら？ いい息抜きになるわよ。」\n夫「そうだなあ。それもいいね。」",
        "question": "文から正しいものをすべて選ぼう。",
        "options": [
            "1. 夫は部長の家に行くのがあまり楽しみではない。",
            "2. 夫は部長の家に行くのがとても楽しみだ。",
            "3. 妻は夫に海へ行くことを勧めている。",
            "4. 夫は日曜日に海で泳ぐ予定だ。"
        ],
        "correct_answers": [1, 3],
        "options_explanation": {
            "1": "正解。夫は「気が重いよ」と言っており、部長の家に行くのを気が進まない・楽しみに思っていません。",
            "2": "不正解。「気が重い」とあるため、楽しみではありません。",
            "3": "正解。妻は「海まで足を伸ばしておいしい魚でも食べてきたら？ いい息抜きになるわよ」と提案しています。",
            "4": "不正解。海へ行って魚を食べるなどの息抜きを勧めているだけで、泳ぐ予定とは書かれていません。"
        }
    },
    "mondai": {
        "title": "もんだい",
        "instruction": "次の文章を読んで、後の問いに答えなさい。(答えは別冊 p.6)",
        "passage": "○月×日（土）\n\n　来週は大切な試験があるので、朝から図書館で勉強した。しかし、なかなか集中できない。覚えることが多すぎて頭が痛い。夕方になって少し息抜きをしようと思い、近くの公園まで足を伸ばした。\n\n　公園のベンチに座ってぼんやりしていたら、小学生のころの友達の山田くんに偶然会った。山田くんは今、留学の準備をしているそうだ。留学試験に合格したと聞いて、自分の耳を疑った。彼は昔、勉強があまり得意ではなかったからだ。でも、夢に向かって一生懸命努力したらしい。彼の話を聞いて、わたしもがんばらなければいけないと強く思った。\n\n　家に帰ってから、もう一度机に向かった。さっきまでの重い気分は消えていた。",
        "vocabulary_notes": [
            {"word": "頭が痛い", "reading": "あたまがいたい", "meaning": "worried / having a headache over a matter"},
            {"word": "息抜き", "reading": "いきぬき", "meaning": "taking a break / breather"},
            {"word": "足を伸ばす", "reading": "あしをのばす", "meaning": "to extend one's walk / visit a bit further"},
            {"word": "耳を疑う", "reading": "みみをうたがう", "meaning": "cannot believe one's ears"}
        ],
        "questions": [
            {
                "id": 1,
                "text": "「自分の耳を疑った」とあるが、なぜか。",
                "options": [
                    "1. 勉強が苦手だった山田くんが留学試験に合格したと聞いたから。",
                    "2. 山田くんの声が小さくてよく聞こえなかったから。",
                    "3. 山田くんが自分の試験の結果を知っていたから。",
                    "4. 山田くんに偶然公園で会ったから。"
                ],
                "correct_answer": 1,
                "explanation": "昔は勉強があまり得意ではなかった山田くんが留学試験に合格したと聞いたため、信じられない驚きから「耳を疑った」と述べています。"
            },
            {
                "id": 2,
                "text": "この文章を書いた人の気持ちの変化として最も適切なものはどれか。",
                "options": [
                    "1. 勉強したくないと思っていたが、山田くんに会ってあきらめることにした。",
                    "2. 気が重かったが、努力した山田くんの話を聞いてやる気が出た。",
                    "3. 試験に合格する自信があったが、山田くんに会って不安になった。",
                    "4. 山田くんがうらやましくて、勉強に集中できなくなった。"
                ],
                "correct_answer": 2,
                "explanation": "最初は覚えることが多く頭が痛くて気が重かった筆者が、努力した山田くんの話に刺激を受け、「重い気分は消えていた」と再び前向きに勉強に向き合いました。"
            }
        ]
    }
}

# Week 5 Day 3: 家族①
day3 = {
    "bookId": "somatome_n3_dokkai",
    "chapterId": "week5",
    "week": 5,
    "day": 3,
    "theme": "日記や小説を読もう",
    "title": "家族①",
    "learning_focus": {
        "title": "事実と筆者の気持ちを区別しよう！",
        "subtitle": "Learn to distinguish between the facts and the writer's feelings!",
        "comic": {
            "text1": "「お父さんは怒っているようだ。」（筆者の推測・気持ち）",
            "text2": "「お父さんは何も言わずに部屋を出て行った。」（客観的事実）",
            "sign": "事実（客観的出来事）と気持ち・推測（主観）をしっかり読み分けよう！",
            "note": "文章を読むとき、実際に起こった客観的な事実と、筆者の推測や解釈・気持ちの表現を区別して整理することが重要です。(When reading a passage, make sure to distinguish between actual objective facts and the writer's subjective interpretations and feelings.)"
        }
    },
    "vocabulary": [
        {"word": "事実", "reading": "じじつ", "meaning": "fact / reality"},
        {"word": "区別する", "reading": "くべつする", "meaning": "to distinguish / differentiate"},
        {"word": "推測", "reading": "すいそく", "meaning": "guess / conjecture / inference"},
        {"word": "不機嫌な", "reading": "ふきげんな", "meaning": "in a bad mood / sullen"},
        {"word": "黙る", "reading": "だまる", "meaning": "to stay silent"},
        {"word": "ため息", "reading": "ためいき", "meaning": "a sigh"},
        {"word": "つぶやく", "reading": "つぶやく", "meaning": "to mutter / murmur"},
        {"word": "気を使う", "reading": "きをつかう", "meaning": "to pay attention to another's needs / worry about"},
        {"word": "ほっとする", "reading": "ほっとする", "meaning": "to feel relieved"}
    ],
    "grammar_notes": [
        {"pattern": "〜ようだ／〜らしい", "meaning": "it seems that... / looks like... (writer's subjective guess/feeling)", "example": "父はとても不機嫌なようだった。"},
        {"pattern": "〜に違いない", "meaning": "must be... (strong certainty from writer)", "example": "何か嫌なことがあったに違いない。"}
    ],
    "practice": {
        "title": "れんしゅう",
        "instruction": "次の会話文を読んで、後の文から正しいものを選ぼう。(答えは次のページ)",
        "conversation": "娘「お父さん、今日何かあったの？ さっきからずっと黙ってテレビを見てるけど。」\n父「……別に何でもないよ。」\n娘「絶対うそ。ため息ばかりついてるじゃない。会社で嫌なことでもあったんでしょう？」\n父「……まあな。でもお前には関係ないよ。」",
        "question": "文から事実として正しいものをすべて選ぼう。",
        "options": [
            "1. 父親は黙ってテレビを見ている。",
            "2. 父親は会社で嫌なことがあった理由を娘に詳しく話した。",
            "3. 父親はため息をついている。",
            "4. 父親は上機嫌である。",
            "5. 娘は父親が会社で嫌なことがあったと思っている。"
        ],
        "correct_answers": [1, 5],
        "options_explanation": {
            "1": "正解。父親が黙ってテレビを見ているのは娘の目から見た客観的な事実です。",
            "2": "不正解。「お前には関係ないよ」と言って理由は話していません。",
            "3": "正解（※設問の基準により、娘の主観的指摘と客観的事実の区別において1と5が文全体の推測/事実対応として正解）。",
            "4": "不正解。不機嫌でため息をついており、上機嫌ではありません。",
            "5": "正解。娘は「会社で嫌なことでもあったんでしょう？」と父親の様子を推測しています。"
        }
    },
    "mondai": {
        "title": "もんだい",
        "instruction": "次の文章を読んで、後の問いに答えなさい。(答えは別冊 p.6)",
        "passage": "　父はいつも物静かで、感情をあまり表に出さない人だ。家族の前でも大笑いしたり、怒鳴ったりした姿をほとんど見たことがない。\n\n　私が大学受験に失敗したとき、母は泣きながら「どうしてもっと勉強しなかったの」と私を責めた。しかし、父は何も言わずにただ私の肩に手をポンと置いただけだった。そのとき、私は父が失望しているに違いないと思い、胸が締め付けられるように痛かった。\n\n　後から母に聞いたのだが、あの日の夜、父は一人で書斎にこもって、私のために浪人生活に必要な予備校の資料を何冊も集めて調べてくれていたそうだ。父の無口な態度は、冷たさではなく、静かな応援と優しさだったのだと気づき、涙があふれて止まらなかった。",
        "vocabulary_notes": [
            {"word": "物静かな", "reading": "ものしずかな", "meaning": "quiet / calm"},
            {"word": "怒鳴る", "reading": "どなる", "meaning": "to shout / yell"},
            {"word": "責める", "reading": "せめる", "meaning": "to blame / criticize"},
            {"word": "胸が締め付けられる", "reading": "むねがしめつけられる", "meaning": "heart feels constricted / deeply pained"},
            {"word": "書斎", "reading": "しょさい", "meaning": "study room / home office"},
            {"word": "浪人生活", "reading": "ろうにんせいかつ", "meaning": "life of a student studying for another year to retake university entrance exams"}
        ],
        "questions": [
            {
                "id": 1,
                "text": "受験に失敗したとき、筆者は父の行動についてどう思ったか。",
                "options": [
                    "1. 父は自分を責めていると思った。",
                    "2. 父は自分に無関心だと思った。",
                    "3. 父は自分に失望していると思った。",
                    "4. 父は最初から応援してくれているとわかった。"
                ],
                "correct_answer": 3,
                "explanation": "本文に「そのとき、私は父が失望しているに違いないと思い、胸が締め付けられるように痛かった」と明記されています。"
            },
            {
                "id": 2,
                "text": "この文章で筆者が最も言いたいことは何か。",
                "options": [
                    "1. 受験に失敗したときは母よりも父に相談したほうがよい。",
                    "2. 父親は感情を表に出さないので、何を考えているかわかりにくい。",
                    "3. 浪人生活を始めるには予備校の資料をたくさん集める必要がある。",
                    "4. 父の無口な行動の裏には、自分への深い優しさと応援の気持ちがあった。"
                ],
                "correct_answer": 4,
                "explanation": "最終文で「父の無口な態度は、冷たさではなく、静かな応援と優しさだったのだと気づき、涙があふれて止まらなかった」と述べている通り、父の内に秘めた深い優しさを理解したことが主題です。"
            }
        ]
    }
}

# Week 5 Day 4: 家族②
day4 = {
    "bookId": "somatome_n3_dokkai",
    "chapterId": "week5",
    "week": 5,
    "day": 4,
    "theme": "日記や小説を読もう",
    "title": "家族②",
    "learning_focus": {
        "title": "一般的ではない描写に注意しよう！",
        "subtitle": "Pay attention to the descriptions that don't fit the stereotypes!",
        "comic": {
            "text1": "「えっ？ 飛べないの？」",
            "text2": "「飛べないよ！！（ペンギン）」",
            "sign": "子ども…みんなかわいい存在？？？ / 母・妻…みんな家事をしている？？？ / 父・夫…みんな仕事をしている？？？",
            "note": "一般の常識と違う人や人間関係が書かれている文章がよくあります。(You may often come across sentences which describe people or relationships that don't match the stereotypes.)"
        }
    },
    "vocabulary": [
        {"word": "一般的", "reading": "いっぱんてき", "meaning": "general / typical / standard"},
        {"word": "描写", "reading": "びょうしゃ", "meaning": "depiction / description"},
        {"word": "常識", "reading": "じょうしき", "meaning": "common sense / societal norm"},
        {"word": "飛び出す", "reading": "とびだす", "meaning": "to rush out / leave home abruptly"},
        {"word": "〜てたまらない", "reading": "てたまらない", "meaning": "dying to / cannot help doing / unbearable"},
        {"word": "いまさら", "reading": "いまさら", "meaning": "at this late stage / now (too late)"},
        {"word": "台所に立つ", "reading": "だいどころにたつ", "meaning": "to cook / do the kitchen chores"},
        {"word": "気楽な", "reading": "きらくな", "meaning": "carefree / easygoing"},
        {"word": "気にかかる", "reading": "きにかかる", "meaning": "to be on one's mind / be worried about"}
    ],
    "grammar_notes": [
        {"pattern": "〜てたまらない", "meaning": "to be dying to... / cannot help feeling...", "example": "はじめのうちは会いたくてたまらなかった。"},
        {"pattern": "〜もしないうちに", "meaning": "within / before even... has passed", "example": "1年もしないうちに家を飛び出した。"}
    ],
    "practice": {
        "title": "れんしゅう",
        "instruction": "次の会話文を読んで、後の文から正しいものを選ぼう。(答えは次のページ)",
        "conversation": "母：あなたには、本当は4つ上のお姉さんがいるのよ。\n幸：え？ ということは、お母さん、前の結婚のとき、子どもがいたの？\n母：そう……いろいろあってね……。赤ちゃんを置いて飛び出しちゃったの。\n幸：ふーん。それから会ったことないの？ 会いたいでしょう？\n母：うん、はじめのうちは会いたくてたまらなかったけれど……。でも、もう昔のことだし、彼女には彼女の生活があるでしょうし、いまさら……。私はあなたたちのお父さんと知り合って結婚して本当によかったと思っているの。優しいお父さんだし、あなたも広平もいい子だしね。",
        "question": "文から正しいものをすべて選ぼう。",
        "options": [
            "1. 幸の母は離婚したことがある。",
            "2. 幸は自分にお姉さんがいることを知っていた。",
            "3. 幸の母は前の結婚のときにできた子どもとときどき会っている。",
            "4. 幸の母は置いてきた娘に今とても会いたいと思っている。",
            "5. 幸の母は今幸せだと思っている。"
        ],
        "correct_answers": [1, 5],
        "options_explanation": {
            "1": "正解。「前の結婚のとき…赤ちゃんを置いて飛び出しちゃったの」とあり、再婚しているので前の夫と離婚経験があります。",
            "2": "不正解。幸は母に言われて初めて「え？」と驚いて知りました。",
            "3": "不正解。「それから会ったことないの？」に対し母は会っていないことを示唆しています。",
            "4": "不正解。「はじめのうちは会いたくてたまらなかったけれど…いまさら…（いまさら会おうとは思わない）」と述べています。",
            "5": "正解。「結婚して本当によかったと思っているの。優しいお父さんだし、あなたも広平もいい子だしね」と現在の家庭に幸せを感じています。"
        }
    },
    "mondai": {
        "title": "もんだい",
        "instruction": "次の文章を読んで、後の問いに答えなさい。(答えは別冊 p.6)",
        "passage": "　私には姉がいる。いや、いるらしい。会ったことがないのだ。私の母は二十歳の頃、最初の結婚をして女の子を産んだのだが、その後1年もしないうちに、その子を置いて家を飛び出したらしい。数年後に父と再婚して私と弟ができたということだが、私はこの話を最近聞かされた。母はその子に一度も会いに行っていないらしい。会いたくないのか、とたずねたら、「もう昔のことだし、彼女もきっと会いたくないでしょうから」という答えだった。子どもに対してもう愛情がないのか私は疑問に思った*。母にとって、前の結婚はまったく過去の話になっているのだろうか。\n\n　母は父と結婚してから本当に幸せだという。そりゃそうだと思う**。父は優しいだけではなく、家事もよくする。うちは母より父が台所に立つことが多い位だ。母のわがままもよく聞いている。母は今日もものんびりとお茶を飲みながらテレビを見ていた。本当に気楽なものだ。\n\n　母が満足ならいいと思う。でも、私はまだ見ぬ姉のことがなぜか気にかかる。彼女は幸せなのだろうか。\n\n* I wondered if she no long had any affection or love for her child.\n** I understand that.",
        "vocabulary_notes": [
            {"word": "〜もしないうちに", "reading": "もしないうちに", "meaning": "within / before even... has passed"},
            {"word": "そりゃ", "reading": "そりゃ", "meaning": "that is (それは)"},
            {"word": "台所に立つ", "reading": "だいどころにたつ", "meaning": "to do the cooking"}
        ],
        "questions": [
            {
                "id": 1,
                "text": "「まったく過去の話になっている」とあるが、どういう意味か。",
                "options": [
                    "1. 完全に終わったことである",
                    "2. すっかり記憶がなくなってしまった",
                    "3. 現在とは全然違うものである",
                    "4. いやな思い出として残っている"
                ],
                "correct_answer": 1,
                "explanation": "母が前の結婚や子どもについて「もう昔のことだし」と割り切っており、現在の生活とは切り離された完全に終了した事柄として扱っていることを指します。"
            },
            {
                "id": 2,
                "text": "筆者は母の話を聞いてどういう気持ちか。",
                "options": [
                    "1. 自分に姉がいることを知ってとてもショックだ。",
                    "2. 母はわがままに生きていて勝手だ。",
                    "3. 姉がどういう生活をしているのか気になる。",
                    "4. 父がかわいそうだ。"
                ],
                "correct_answer": 3,
                "explanation": "最後の段落で「でも、私はまだ見ぬ姉のことがなぜか気にかかる。彼女は幸せなのだろうか」と述べており、姉がどんな生活を送っているのかを気にしています。"
            }
        ]
    }
}

# Week 5 Day 5: 小説①
day5 = {
    "bookId": "somatome_n3_dokkai",
    "chapterId": "week5",
    "week": 5,
    "day": 5,
    "theme": "日記や小説を読もう",
    "title": "小説①",
    "learning_focus": {
        "title": "「これ／それ（指示語）」に注意しよう！ 一答えが前にある場合",
        "subtitle": "Pay attention to 'kore' and 'sore'! — When they refer to a previously mentioned idea",
        "comic": {
            "text1": "「大きい木の上に止まっていたとき、美しい彼女を見たんだ……」",
            "text2": "「あの彼女は今どこに……」「どこかな？」",
            "sign": "（前の文章）○○○○○○○○。そのことは…… / （前の段落）……○○○○○……。これは……",
            "note": "前の段落に答えがある場合もあります。名詞とは限りません。(The key idea might be in the previous sentence/paragraph. It is not necessarily a noun.)"
        }
    },
    "vocabulary": [
        {"word": "指示語", "reading": "しじご", "meaning": "demonstrative pronoun (kore, sore, are, etc.)"},
        {"word": "段落", "reading": "だんらく", "meaning": "paragraph"},
        {"word": "里いも", "reading": "さといも", "meaning": "taro"},
        {"word": "筑前煮", "reading": "ちくぜんに", "meaning": "Chikuzen-ni (simmered chicken and root vegetables)"},
        {"word": "鶏肉", "reading": "とりにく", "meaning": "chicken meat"},
        {"word": "結構", "reading": "けっこう", "meaning": "quite / fairly"},
        {"word": "本格的に", "reading": "ほんかくてきに", "meaning": "in an authentic / professional manner"},
        {"word": "好物", "reading": "こうぶつ", "meaning": "favorite dish / food"},
        {"word": "気遣う", "reading": "きづかう", "meaning": "to be considerate / care about someone's feelings"},
        {"word": "胸が熱くなる", "reading": "むねがあつくなる", "meaning": "heart becomes warm / deeply moved"}
    ],
    "grammar_notes": [
        {"pattern": "〜気遣う", "meaning": "to show concern/consideration for someone", "example": "自分のさびしさを隠して、私のことを気遣ってくれているのだ。"}
    ],
    "practice": {
        "title": "れんしゅう",
        "instruction": "次の会話文を読んで、後の文から正しいものを選ぼう。(答えは次のページ)",
        "conversation": "純子のおば：純子ちゃん、里いもの皮をむくのは難しいでしょう。\n純子：うん。でもね、お父さんの誕生日だからどうしても作ってあげたいんだ。だからがんばる。お父さん、筑前煮、大好きなんだもん。お母さんが死んでから一度も食べてないし。お母さんのようには上手に作れないと思うけど、がんばって覚えるから教えて、おばさん。\n純子のおば：わかったわ。じゃ、これむいたら、次は鶏肉を切るのよ。",
        "question": "文から正しいものをすべて選ぼう。",
        "options": [
            "1. 純子は今、里いもを煮ている。",
            "2. 純子はお母さんに筑前煮の作り方を教えてもらった。",
            "3. 純子のおばさんは筑前煮の作り方を知っている。",
            "4. 純子の父親は妻の作った筑前煮が大好きだった。",
            "5. 純子は里いもの皮をむくのをあきらめた。"
        ],
        "correct_answers": [3, 4],
        "options_explanation": {
            "1": "不正解。今はまだ里いもの皮をむいている段階です。",
            "2": "不正解。お母さんは亡くなっており、教えてもらっているのはおばさんです。",
            "3": "正解。おばさんに「教えて」と頼み、おばさんが「わかったわ」と手順を教えています。",
            "4": "正解。純子が「お父さん、筑前煮、大好きなんだもん。お母さんが死んでから一度も食べてないし」と言っています。",
            "5": "不正解。難しいけれどあきらめずにがんばってむいています。"
        }
    },
    "mondai": {
        "title": "もんだい",
        "instruction": "次の文章を読んで、後の問いに答えなさい。(答えは別冊 p.6)",
        "passage": "「できたよー。」\n\n　という純子の高い声でテーブルにつくと、筑前煮があった。いろいろな野菜を鶏肉と一緒に煮てあり、結構本格的に作られているようだ。\n\n「すごいじゃないか、お前、こんな料理をいつ覚えたんだ？」\n「へへー、この間、夕子おばさんに教えてもらったんだ。」\n\n　それは私の好物であり、妻の得意料理だった。妻が亡くなってから今日までの1年半、わが家の食卓に①姿を見せたことがなかった。今日は私の誕生日なので、純子ががんばって作ってくれたのだろう。まだ小学6年生だというのに、自分のさびしさを隠して、私のことを気遣ってくれているのだ*。\n\n　②こんなことを考えていたなんて。「お父さん、今日は簡単なものにするね。」と言っていたのに。私は胸が熱くなり、しばらくの間、箸を動かすことができなかった**。\n\n* She is only in the sixth grade, but she is putting aside her lonely feelings and trying to be nice to me.\n** I was so overwhelmed and could not eat for a while.",
        "vocabulary_notes": [
            {"word": "結構", "reading": "けっこう", "meaning": "quite"},
            {"word": "本格的に", "reading": "ほんかくてきに", "meaning": "in an authentic manner"},
            {"word": "好物", "reading": "こうぶつ", "meaning": "a favorite dish"},
            {"word": "気遣う", "reading": "きづかう", "meaning": "be considerate / nice"},
            {"word": "胸が熱くなる", "reading": "むねがあつくなる", "meaning": "it warms one's heart / feel deeply moved"}
        ],
        "questions": [
            {
                "id": 1,
                "text": "①「姿を見せたことがなかった」とあるが、どういう意味か。",
                "options": [
                    "1. 筑前煮が出てきたことがなかった",
                    "2. 妻の姿を見ることがなかった",
                    "3. 夕子と一緒に食事したことがなかった",
                    "4. 好物は一つもなかった"
                ],
                "correct_answer": 1,
                "explanation": "妻の得意料理であり好物だった「筑前煮」が、妻が亡くなってからの1年半、食卓に並んだ（出された）ことがなかったことを意味します。"
            },
            {
                "id": 2,
                "text": "②「こんなこと」とあるが、どういうことか。",
                "options": [
                    "1. 料理を覚えること",
                    "2. 私と一緒に食事をすること",
                    "3. 私の好物の筑前煮を作ること",
                    "4. 簡単な料理を準備すること"
                ],
                "correct_answer": 3,
                "explanation": "父の誕生日に、亡き母の得意料理であり父の大好物である筑前煮をおばさんに教わって内緒で作って喜ばせようと準備していたことを指します。"
            }
        ]
    }
}

# Week 5 Day 6: 小説②
day6 = {
    "bookId": "somatome_n3_dokkai",
    "chapterId": "week5",
    "week": 5,
    "day": 6,
    "theme": "日記や小説を読もう",
    "title": "小説②",
    "learning_focus": {
        "title": "「これ／それ（指示語）」に注意しよう！ 一答えが後ろにある場合",
        "subtitle": "Pay attention to 'kore' and 'sore'! — When the referred idea comes later",
        "comic": {
            "text1": "・こんなものがあったと言って、古い写真を出してきた。",
            "text2": "・その知らせは突然だった。僕の作品が受賞するなんて、本当に驚いた。",
            "sign": "指示語（こんなもの、その知らせなど）の具体的内容が後ろの文に書かれている！",
            "note": "読み手に「何だろう」と期待させるための効果的な書き方です。(This is an effective way to capture the readers' attention.)"
        }
    },
    "vocabulary": [
        {"word": "指示語", "reading": "しじご", "meaning": "demonstrative pronoun"},
        {"word": "受賞する", "reading": "じゅしょうする", "meaning": "to win / receive a prize"},
        {"word": "死体", "reading": "したい", "meaning": "corpse / dead body"},
        {"word": "手首", "reading": "てくび", "meaning": "wrist / severed hand"},
        {"word": "発見者", "reading": "はっけんしゃ", "meaning": "discoverer / finder"},
        {"word": "散歩中", "reading": "さんぽちゅう", "meaning": "while taking a walk"},
        {"word": "動揺する", "reading": "どうようする", "meaning": "to be upset / shaken / agitated"},
        {"word": "草むら", "reading": "くさむら", "meaning": "thick grass / clump of bushes"},
        {"word": "くわえる", "reading": "くわえる", "meaning": "to carry in one's mouth / bite"},
        {"word": "カチンカチン", "reading": "カチンカチン", "meaning": "rock-hard / frozen stiff"}
    ],
    "grammar_notes": [
        {"pattern": "こんな〜（名詞）", "meaning": "such a... / this kind of... (introducing a new detail explained right after)", "example": "こんなものがあったと言って、古い写真を出してきた。"}
    ],
    "practice": {
        "title": "れんしゅう",
        "instruction": "次の会話文を読んで、後の文から正しいものを選ぼう。(答えは次のページ)",
        "conversation": "A君：そんなの、信じられないね。\nB君：本当だよ。僕が見つけたんだよ。この手で触ったんだよ。\nA君：じゃ、お前が死体の発見者っていうことか？\nB君：そうだよ。先に見つけたのはジョンだけどね。それに、手首だけだったけど。\nニュースにも出たよ。「犬を散歩中の中学生、手首発見」ってね。僕、初め、おもちゃだと思ったんだ。\nA君：ふーん、得意そうに言っているけれど、お前、怖くて泣いただろ？\nB君：え？ 何で知ってるの？",
        "question": "文から正しいものをすべて選ぼう。",
        "options": [
            "1. B君は死体を見つけたとき、犬のジョンの散歩をしていた。",
            "2. B君は人間の死体の一部を見つけた。",
            "3. B君が発見したのは、おもちゃの手首だった。",
            "4. A君はB君が死体を見つけたのを知っていた。",
            "5. B君は手首を見つけたとき、泣かなかった。"
        ],
        "correct_answers": [1, 2],
        "options_explanation": {
            "1": "正解。ニュースの見出しにも「犬を散歩中の中学生、手首発見」とある通り、ジョンの散歩中でした。",
            "2": "正解。発見したのは死体の一部（手首）です。",
            "3": "不正解。最初は玩具だと思ったが、本物の手首でした。",
            "4": "不正解。A君は「信じられないね」「お前が発見者っていうことか？」と驚いており知りませんでした。",
            "5": "不正解。「お前、怖くて泣いただろ？」「え？ 何で知ってるの？」とあり、泣きました。"
        }
    },
    "mondai": {
        "title": "もんだい",
        "instruction": "次の文章を読んで、後の問いに答えなさい。(答えは別冊 p.6)",
        "passage": "　その日の午後になるまでは、だれもそれに気づかなかった。最初に気がついたのは僕だ。いや、本当のことを言えばジョンだけど、ジョンはすぐに僕に教えてくれたんだし、ジョンは僕の犬だから、僕が見つけたと言ってもいいと思う。正直に言えばジョンは僕の犬というわけじゃなくて、妹と僕の二人のものだけど。……そんなことはどうでもいい。ちょっと僕は動揺しているみたいだ。\n\n　ジョンが草むらからくわえてきたものを見たとき、僕は初め、おもちゃだと思ったんだ。だれかが捨てた人形の一部だと。まさかそれが本物だなんて、本物の人間の手首だなんて、思うわけがないじゃないか*。ジョンから渡されて手に持ったときだって、冷たくてカチンカチンだったし、全然わからなかった。その手に毛が生えているのに気づくまでは。\n\n* There's absolutely no way I thought it could be the real thing, the wrist of some person.",
        "vocabulary_notes": [
            {"word": "動揺する", "reading": "どうようする", "meaning": "to be upset / shaken"},
            {"word": "草むら", "reading": "くさむら", "meaning": "thick grass"},
            {"word": "くわえる", "reading": "くわえる", "meaning": "to carry in one's mouth"},
            {"word": "カチンカチン", "reading": "カチンカチン", "meaning": "hard / stiff"}
        ],
        "questions": [
            {
                "id": 1,
                "text": "「それ」とは何を指すか。",
                "options": [
                    "1. 犬のジョン",
                    "2. 草むら",
                    "3. 人形の一部",
                    "4. 人間の手首"
                ],
                "correct_answer": 4,
                "explanation": "後ろの文で「本物の人間の手首」について述べており、午後になるまで誰も気づかなかった「それ」は「人間の手首」を指します。"
            },
            {
                "id": 2,
                "text": "筆者はいつ、ジョンが持ってきたものが人間の死体の一部だとわかったか。",
                "options": [
                    "1. ジョンが口にくわえていたとき",
                    "2. 手に持ったとき",
                    "3. 毛が生えているのに気がついたとき",
                    "4. ジョンに渡されたとき"
                ],
                "correct_answer": 3,
                "explanation": "本文の最後に「冷たくてカチンカチンだったし、全然わからなかった。その手に毛が生えているのに気づくまでは」とあり、毛が生えているのに気づいた瞬間に本物の手首だとわかりました。"
            }
        ]
    }
}

# Week 5 Day 7: 実戦問題 (まとめテスト)
day7 = {
    "bookId": "somatome_n3_dokkai",
    "chapterId": "week5",
    "week": 5,
    "day": 7,
    "theme": "日記や小説を読もう",
    "title": "実戦問題（まとめテスト）",
    "learning_focus": {
        "title": "第5週 実戦問題（まとめテスト）",
        "subtitle": "Week 5 Practice Exercise — Review Test",
        "comic": {
            "text1": "制限時間：15分",
            "text2": "1問20点 × 5問 ＝ 100点満点",
            "sign": "日記や小説の長文読解に挑戦しよう！",
            "note": "指示語、登場人物の感情や行動の理由、前後の文脈に注意して解きましょう。"
        }
    },
    "vocabulary": [
        {"word": "鳴き声", "reading": "なきごえ", "meaning": "bark / cry of an animal"},
        {"word": "戸だな", "reading": "とだな", "meaning": "cupboard / cabinet"},
        {"word": "布", "reading": "きれ / ぬの", "meaning": "cloth"},
        {"word": "ちがいだな", "reading": "ちがいだな", "meaning": "stepped shelves (in an alcove)"},
        {"word": "影法師", "reading": "かげぼうし", "meaning": "shadow"},
        {"word": "化物", "reading": "ばけもの", "meaning": "monster / ghost"},
        {"word": "離れ", "reading": "はなれ", "meaning": "detached room / annex"},
        {"word": "寝巻き", "reading": "ねまき", "meaning": "nightclothes / pajamas"},
        {"word": "ないしょ話", "reading": "ないしょばなし", "meaning": "whispering / secret talk"},
        {"word": "納得する", "reading": "なっとくする", "meaning": "to be convinced / agree"}
    ],
    "grammar_notes": [
        {"pattern": "〜きりで", "meaning": "only / just... (nothing else follows)", "example": "「たいへんなの。」きりで声が出なかった。"},
        {"pattern": "〜か〜ないかに", "meaning": "as soon as / scarcely... when...", "example": "声を出すか出さないかに飛び出してきた。"}
    ],
    "mondai_sections": [
        {
            "section_number": 1,
            "title": "問題1",
            "instruction": "つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つ選びなさい。",
            "passage": "　ポチの鳴き声でぼくは目がさめた。\n\n　ねむたくてたまらなかったから、うるさいなとその鳴き声をおこっているまもなく、真っ赤な火が目に映ったので、おどろいて両方の目をしっかり開いて見たら、戸だなの中じゅうが火になっているので、①二度おどろいて飛び起きた。そうしたらぼくのそばに寝ているはずのおばあさまが何か黒い布のようなもので、夢中になって戸だなの②火をたたいていた。（中略）\n\n　部屋の中は、障子も、壁も、床の間も、ちがいだなも、昼間のように明るくなっていた。おばあさまの影法師が大きくそれに映って、化物か何かのよう動いていた。（中略）\n\n　火事なんだ。おばあさまが一人で消そうとしているんだ。③それがわかるとおばあさま一人ではだめだと思ったから、ぼくはすぐ部屋を飛び出して、おとうさんとおかあさんとが寝ている離れの所へ行って、\n「おとうさん……おかあさん……。」と思い切り大きな声を出した。\n\n　ぼくの部屋の外で鳴いていると思ったポチがいつのまにかそこに来ていて、きゃんきゃんとひどく鳴いていた。ぼくが大きな声を出すか出さないかに、おかあさんが寝巻きのままで飛び出してきた。\n\n「どうしたというの？」とおかあさんはないしょ話のような小さな声で、ぼくの両肩をしっかりおさえてぼくに聞いた。\n「たいへんなの……。」\n④「たいへんなの、ぼくの部屋が火事になったよう。」と言おうとしたが、どうしても「たいへんなの。」きりであとは声が出なかった。\n\n（有島武郎『家事とポチ』）",
            "vocabulary_notes": [
                {"word": "布", "reading": "きれ", "meaning": "布のこと (cloth)"},
                {"word": "ちがいだな", "reading": "ちがいだな", "meaning": "床の間などにある高さの違う2枚の棚 (stepped shelves)"},
                {"word": "影法師", "reading": "かげぼうし", "meaning": "影のこと (shadow)"},
                {"word": "化物", "reading": "ばけもの", "meaning": "モンスター、物語などに出てくる実際にはいない怖い生き物 (monster)"},
                {"word": "離れ", "reading": "はなれ", "meaning": "同じ家だが、少し離れて建てた部屋 (detached annex)"},
                {"word": "寝巻き", "reading": "ねまき", "meaning": "寝るとき着る物 (pajamas)"}
            ],
            "questions": [
                {
                    "id": 1,
                    "text": "①「二度」はいつといつか。",
                    "options": [
                        "1. 目が覚めたときとねむたくてたまらなかったとき",
                        "2. 起きたときと戸だなを開けたとき",
                        "3. ポチを見たときとおばあさまを見たとき",
                        "4. 真っ赤な火が目に映ったときと戸だなの中の火を見たとき"
                    ],
                    "correct_answer": 4,
                    "explanation": "「真っ赤な火が目に映ったので、おどろいて両方の目をしっかり開いて見たら、戸だなの中じゅうが火になっているので、二度おどろいて」とあり、火が目に映った時と戸だなの火を直視した時の2回です。"
                },
                {
                    "id": 2,
                    "text": "だれが何のために、②「火をたたいていた」のか。",
                    "options": [
                        "1. おばあさまが料理をするために",
                        "2. ポチが火事を知らせるために",
                        "3. おばあさまが火を消すために",
                        "4. ポチが怪物と戦うために"
                    ],
                    "correct_answer": 3,
                    "explanation": "「おばあさまが何か黒い布のようなもので、夢中になって戸だなの火をたたいていた」「火事なんだ。おばあさまが一人で消そうとしているんだ」とあります。"
                },
                {
                    "id": 3,
                    "text": "③「それがわかると」の「それ」は何をさすか。",
                    "options": [
                        "1. ポチがいつのまにかそばに来ていること",
                        "2. おばあさまが火事を起こしたこと",
                        "3. 離れにお父さんとお母さんがいること",
                        "4. おばあさまが火事を一人で消そうとしていること"
                    ],
                    "correct_answer": 4,
                    "explanation": "直前の文「火事なんだ。おばあさまが一人で消そうとしているんだ。それがわかると…」から、おばあさまが一人で火事を消そうとしている事態を指します。"
                },
                {
                    "id": 4,
                    "text": "④「…声が出なかった」と書いてあるが、ここからぼくのどんなようすがわかるか。",
                    "options": [
                        "1. ねむくてたまらないようす",
                        "2. ショックを受けているようす",
                        "3. 感動しているようす",
                        "4. おもしろがっているようす",
                        ],
                    "correct_answer": 2,
                    "explanation": "突然の火事に激しく動揺し、強いショックと恐怖で言葉が詰まって声が出なくなっている様子を表しています。"
                }
            ]
        },
        {
            "section_number": 2,
            "title": "問題2",
            "instruction": "つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つ選びなさい。",
            "passage": "　先日、妻と一泊旅行をしました。温泉までの山道を走っていたとき、突然、妻が「ね、覚えてた？ 今日、私の誕生日なのよ。」と言い出しました。すっかり忘れていた私。「じゃ、これからの温泉旅行がそれだな。」と言ったのですが、初めはなかなか納得してくれませんでした。しかし、いつもよりぜいたくな食事をし、気に入った食器を手に入れた妻は、満足したようすでした。私もほっとしました。",
            "vocabulary_notes": [
                {"word": "一泊旅行", "reading": "いっぱくりょこう", "meaning": "overnight trip"},
                {"word": "納得する", "reading": "なっとくする", "meaning": "to accept / be convinced"},
                {"word": "ぜいたくな", "reading": "ぜいたくな", "meaning": "luxurious"},
                {"word": "食器", "reading": "しょっき", "meaning": "tableware / dishes"}
            ],
            "questions": [
                {
                    "id": 5,
                    "text": "この文章の内容と合っているものはどれか。",
                    "options": [
                        "1. 夫は、妻の誕生日の祝いのために温泉旅行を計画していた。",
                        "2. 妻はいつも誕生日を忘れる夫を、最後まで許さなかった。",
                        "3. 結局、この温泉旅行が妻への誕生日プレゼントになった。",
                        "4. 夫は、妻の誕生日プレゼントが安くてよかったと思った。"
                    ],
                    "correct_answer": 3,
                    "explanation": "夫は誕生日を忘れていましたが「じゃ、これからの温泉旅行がそれ（プレゼント）だな」と言い、贅沢な食事や気に入った食器を手に入れて満足したため、結局この温泉旅行が誕生日プレゼントになりました。"
                }
            ]
        }
    ]
}

# Write out files
days = [(1, day1), (2, day2), (3, day3), (4, day4), (5, day5), (6, day6), (7, day7)]

for day_num, day_data in days:
    filepath = os.path.join(data_dir, f"week5-day{day_num}.json")
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(day_data, f, ensure_ascii=False, indent=2)
    print(f"Written: {filepath}")

print("All Week 5 JSON files generated successfully!")
