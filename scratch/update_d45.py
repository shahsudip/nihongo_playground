import json

def update_d4():
    d4_path = "src/data/zenkamoku_n3/w05-d04.json"
    with open(d4_path, "r", encoding="utf-8") as f:
        d4 = json.load(f)

    # D4 - 0
    d4["subSections"][0]["passageIntro"] = "みどり体育館の入口に、このお知らせがはってある。"
    if "passage" in d4["subSections"][0]:
        del d4["subSections"][0]["passage"]
    d4["subSections"][0]["documentBody"] = "みどり体育館 ご利用者の<ruby>皆様<rt>みなさま</rt></ruby>\n\nいつもご利用ありがとうございます。<ruby>水道管<rt>すいどうかん</rt></ruby>の<ruby>修理<rt>しゅうり</rt></ruby>のため、2021年6月20日から7月10日まで、みどり体育館はお休みとなります。ご不便をおかけしますが、他の体育館のご利用をお願いいたします。予定されている運動教室は以下の通り、場所が<ruby>変更<rt>へんこう</rt></ruby>となりますので、ご注意ください。\n\n・月曜日 17時～18時　こどもダンス教室　　➡　市立第2小学校体育館\n・木曜日 10時～11時　<ruby>健康体操<rt>けんこうたいそう</rt></ruby>教室　　➡　中央体育館\n\n柳原市 みどり体育館"

    # D4 - 1
    d4["subSections"][1]["passageIntro"] = "<ruby>娘<rt>むすめ</rt></ruby>がうちに帰ると、テーブルの上に母親からのメモが置いてあった。"
    if "passage" in d4["subSections"][1]:
        del d4["subSections"][1]["passage"]
    d4["subSections"][1]["documentBody"] = "いろはちゃんへ\n\nおかえりなさい。今日の学校は楽しかった？\nお母さんは今日会議でいつもより<ruby>遅<rt>おそ</rt></ruby>くなります。晩ご飯は温めるだけにしてあるから、もしお母さんが帰る前におなかがすいたら、待たずに温めて食べてね。\n今日はゆう<ruby>太<rt>た</rt></ruby>くんのうちに遊びに行くと言っていたけど、行くなら暗くならないうちに帰ってきてね。\nそれから、お母さんが帰ってくる前に宿題をすること。\n明日おじいちゃんとおばあちゃんが遊びに来るから、今夜一<ruby>緒<rt>しょ</rt></ruby>に部屋を片付けようね。\n\nお母さんより"

    # D4 - 2
    d4["subSections"][2]["passage"] = "ニュースによると、高い音が聞こえにくいという若い日本人が増えているそうだ。年を取ると<ruby>誰<rt>だれ</rt></ruby>でも高い音は聞こえにくくなるのだが、その<ruby>症状<rt>しょうじょう</rt></ruby>が今、特に若い女性に多く見られるようになっているとのことだ。スマートフォンの使用やオンライン会議が増えるにつれ、イヤホンをつける時間が長くなっている。こうした<ruby>習慣<rt>しゅうかん</rt></ruby>が耳に悪い<ruby>影響<rt>えいきょう</rt></ruby>を与えている可能性がある。専門家は、イヤホンを長時間つけないことや、音量をあまり上げないこと、できればスピーカーで聞くことを<ruby>勧<rt>すす</rt></ruby>めている。\n\n(注) オンライン会議：インターネットを使った会議"

    # D4 - 3
    d4["subSections"][3]["passage"] = "言葉はプラスのエネルギーとマイナスのエネルギーを持っているそうです。\n<ruby>例<rt>たと</rt></ruby>えば、「ありがとう」や「大好き」といったプラス（注1）の言葉を日常的に使っていると、うれしいことが起きたり、ほしいものが手に入ったりすると言われています。反対に「<ruby>面倒<rt>めんどう</rt></ruby>だ」や「<ruby>疲<rt>つか</rt></ruby>れた」といったマイナス（注2）の言葉を<ruby>習慣的<rt>しゅうかんてき</rt></ruby>に使っていると、気持ちも考え方も暗くなり、周囲の人を<ruby>嫌<rt>いや</rt></ruby>な気持ちにしてしまうというのです。\nそれなら、<ruby>例<rt>たと</rt></ruby>えば、<ruby>忙<rt>いそが</rt></ruby>しかった日も「<ruby>疲<rt>つか</rt></ruby>れた」というかわりに「今日もよくやった」と言ったほうが、人生が楽しくなるのではないでしょうか。\n\n（注1）プラス：ここでは、いいという意味\n（注2）マイナス：ここでは、よくないという意味"

    with open(d4_path, "w", encoding="utf-8") as f:
        json.dump(d4, f, ensure_ascii=False, indent=2)

def update_d5():
    d5_path = "src/data/zenkamoku_n3/w05-d05.json"
    with open(d5_path, "r", encoding="utf-8") as f:
        d5 = json.load(f)

    # D5 - 0
    d5["subSections"][0]["passageIntro"] = "<ruby>夫<rt>おっと</rt></ruby>が仕事から帰ると、<ruby>妻<rt>つま</rt></ruby>からのメモがテーブルに置いてあった。この<ruby>家族<rt>かぞく</rt></ruby>は<ruby>夫<rt>おっと</rt></ruby>、<ruby>妻<rt>つま</rt></ruby>、<ruby>娘<rt>むすめ</rt></ruby>の<ruby>舞<rt>まい</rt></ruby>と、犬のリュウである。"
    if "passage" in d5["subSections"][0]:
        del d5["subSections"][0]["passage"]
    d5["subSections"][0]["documentBody"] = "新一へ\n\nお仕事おつかれさま。\nさっき、母が階段から落ちたと連絡がありました。けがはしていないようでしたが、心配なので、病院へ連れていきます。\nカレーを作っておいたので、温めて舞と二人で先に食べてください。サラダも冷蔵庫に入っています。それから、舞にお弁当箱をちゃんと自分で洗うように伝えてください。\nリュウの散歩は、帰ったら私が連れていくので、行かなくて大丈夫です。病院を出るとき連絡します。よろしくお願いしますね。\n\nランより"

    # D5 - 1
    d5["subSections"][1]["passageIntro"] = "これは友人から<ruby>届<rt>とど</rt></ruby>いたメールである。"
    if "passage" in d5["subSections"][1]:
        del d5["subSections"][1]["passage"]
    d5["subSections"][1]["documentBody"] = "ゆか子さんへ\n\n今、<ruby>耳鼻科<rt>じびか</rt></ruby>で<ruby>診察<rt>しんさつ</rt></ruby>を待っています。\nここから待ち合わせの場所まで15分ぐらいなので、1時半に<ruby>耳鼻科<rt>じびか</rt></ruby>を予約すれば、十分間に合うと思ったのですが、前の方の<ruby>診察<rt>しんさつ</rt></ruby>に時間がかかっているみたいで、<ruby>遅<rt>おく</rt></ruby>れ<ruby>気味<rt>ぎみ</rt></ruby>です。\nもしかしたら、待ち合わせに<ruby>遅<rt>おく</rt></ruby>れてしまうかもしれません。もし、約束の時間を<ruby>過<rt>す</rt></ruby>ぎるようなら、駅前の本屋か<ruby>喫茶店<rt>きっさてん</rt></ruby>で待っていてください。\nそちらに着く時間がわかったら、また連絡します。\n\nみか子"

    # D5 - 2
    d5["subSections"][2]["passage"] = "12月のことを「<ruby>師走<rt>しわす</rt></ruby>」と言う。<ruby>師<rt>し</rt></ruby>（＝お<ruby>坊<rt>ぼう</rt></ruby>さん）が走るほどに<ruby>忙<rt>いそが</rt></ruby>しい月という意味がある。12月に<ruby>忙<rt>いそが</rt></ruby>しくしていると、「<ruby>師走<rt>しわす</rt></ruby>ですね」と声をかけられることがある。私はこの言葉が好きだ。相手は言葉通り「12月ですね」という意味で使っているのかもしれないが、私には「楽しい正月はもうすぐだから、がんばりましょう」と言っているように聞こえるから面白い。12月の<ruby>忙<rt>いそが</rt></ruby>しいときにこの言葉を聞くと、楽しいことまでもうすぐだと思えて、力が出てくるのである。"

    # D5 - 3 (Need to fix the broken JSON structure)
    d5["subSections"][3] = {
        "type": "short_passage",
        "title": "(4)",
        "passage": "冬になると食べたくなるものがある。それは焼き<ruby>芋<rt>いも</rt></ruby>屋さんが車で売りに来る焼き<ruby>芋<rt>いも</rt></ruby>だ。<ruby>窓<rt>まど</rt></ruby>の外から「いーしやーきいもー」という声が聞こえると、冬が来たなと思う。焼き<ruby>芋<rt>いも</rt></ruby>を食べるとおなかの中から温まって元気が出る。焼き<ruby>芋<rt>いも</rt></ruby>は<ruby>砂糖<rt>さとう</rt></ruby>を使ったわけでもないのにびっくりするほど甘い。最近は、冬でなくてもスーパーなどで買えるけれど、やっぱり冬に焼き<ruby>芋<rt>いも</rt></ruby>屋さんから買うのが一番おいしいと思う。焼き<ruby>芋<rt>いも</rt></ruby>屋さんは焼き<ruby>芋<rt>いも</rt></ruby>を紙袋に入れて<ruby>手渡<rt>てわた</rt></ruby>してくれる。冷たい空気の中<ruby>抱<rt>だ</rt></ruby>きしめる、甘い<ruby>香<rt>かお</rt></ruby>りの温かい紙袋こそ、私にとっての冬の幸せの形なのだ。",
        "questions": [
            {
                "number": 1,
                "stem": "この文章からわかることはどれか。",
                "options": [
                    "1. 焼き<ruby>芋<rt>いも</rt></ruby>は<ruby>砂糖<rt>さとう</rt></ruby>よりも甘い。",
                    "2. 焼き<ruby>芋<rt>いも</rt></ruby>は寒い<ruby>季節<rt>きせつ</rt></ruby>にだけ買える。",
                    "3. 焼き<ruby>芋<rt>いも</rt></ruby>はとても体にいい。",
                    "4. 焼き<ruby>芋<rt>いも</rt></ruby>屋は冬にしか来ない。"
                ],
                "correct": 4,
                "correctOption": "4. 焼き<ruby>芋<rt>いも</rt></ruby>屋は冬にしか来ない。"
            }
        ]
    }

    with open(d5_path, "w", encoding="utf-8") as f:
        json.dump(d5, f, ensure_ascii=False, indent=2)

update_d4()
update_d5()
print("Updated D4 and D5")
