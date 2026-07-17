import json

with open('power_drill_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Re-define 24 and 25
with open('scripts/insert_drill_24_25.py', 'r', encoding='utf-8') as f:
    exec_globals = {}
    exec(f.read(), exec_globals)
    drills = exec_globals['drills']

grammar_24 = drills['grammar-24']
grammar_25 = drills['grammar-25']

grammar_training_9 = {
    "id": "grammar-training-9",
    "title": "集中トレーニング ⑨",
    "type": "questions-only",
    "description": "接続語",
    "group": "Group 3",
    "sections": [
        {
            "id": "mondai-1",
            "questions": [
                {"id": "gt9-m1-q1", "questionText": "テニスは好きです。（　）下手です。", "options": ["だけど", "そのため"], "correctIndex": 0, "explanation": "だけど (However)"},
                {"id": "gt9-m1-q2", "questionText": "彼はいつも遅刻する。（　）今日は一番早く来た。", "options": ["それで", "ところが"], "correctIndex": 1, "explanation": "ところが (However)"},
                {"id": "gt9-m1-q3", "questionText": "朝ごはんはごはんですか、（　）パンですか。", "options": ["そのうえ", "それとも"], "correctIndex": 1, "explanation": "それとも (Or)"},
                {"id": "gt9-m1-q4", "questionText": "私は用があって行けません。（　）、渡辺さん一人で行ってください。", "options": ["しかし", "ですから"], "correctIndex": 1, "explanation": "ですから (Therefore)"},
                {"id": "gt9-m1-q5", "questionText": "彼は何も言わなかった。（　）、だめだということだ。", "options": ["つまり", "なぜなら"], "correctIndex": 0, "explanation": "つまり (In other words)"},
                {"id": "gt9-m1-q6", "questionText": "毎日遅くまで練習した。（　）、コンクールで優勝することができた。", "options": ["ところが", "その結果"], "correctIndex": 1, "explanation": "その結果 (As a result)"},
                {"id": "gt9-m1-q7", "questionText": "数日前から大雨が続いている。（　）、川の水が増えていて危険だ。", "options": ["つまり", "そのため"], "correctIndex": 1, "explanation": "そのため (For that reason / Therefore)"},
                {"id": "gt9-m1-q8", "questionText": "合格おめでとう。（　）、入学式はいつ？", "options": ["ところが", "ところで"], "correctIndex": 1, "explanation": "ところで (By the way)"},
                {"id": "gt9-m1-q9", "questionText": "この本はとてもおもしろい。（　）役に立つことがたくさん書いてある。", "options": ["そのうえ", "それとも"], "correctIndex": 0, "explanation": "そのうえ (Moreover / In addition)"},
                {"id": "gt9-m1-q10", "questionText": "今日は早く帰りたい。（　）今日は結婚記念日だからだ。", "options": ["つまり", "なぜなら"], "correctIndex": 1, "explanation": "なぜなら (Because)"}
            ]
        }
    ]
}

grammar_training_10 = {
    "id": "grammar-training-10",
    "title": "集中トレーニング ⑩",
    "type": "questions-only",
    "description": "使役・受身",
    "group": "Group 3",
    "sections": [
        {
            "id": "mondai-1",
            "questions": [
                {"id": "gt10-m1-q1", "questionText": "店長、すみませんが明日（　）いただけませんか。", "options": ["休ませて", "休まれて"], "correctIndex": 0, "explanation": "休ませて (Let me take a day off)"},
                {"id": "gt10-m1-q2", "questionText": "不況で会社を（　）。明日から仕事がない。", "options": ["やめさせた", "やめさせられた"], "correctIndex": 1, "explanation": "やめさせられた (Was forced to quit)"},
                {"id": "gt10-m1-q3", "questionText": "長い間、この絵の作者はわからないと（　）いた。", "options": ["させて", "されて"], "correctIndex": 1, "explanation": "されて (Has been considered/said)"},
                {"id": "gt10-m1-q4", "questionText": "彼の歌は今でも世界中の人に（　）いる。", "options": ["愛されて", "愛させられて"], "correctIndex": 0, "explanation": "愛されて (Is loved)"},
                {"id": "gt10-m1-q5", "questionText": "子どもに携帯電話を（　）べきかどうか悩んでいる。", "options": ["持たせる", "持たれる"], "correctIndex": 0, "explanation": "持たせる (Let/Make them have)"},
                {"id": "gt10-m1-q6", "questionText": "今アルバイトに（　）たら、この店は大変だ。", "options": ["やめさせ", "やめられ"], "correctIndex": 1, "explanation": "やめられたら (If they quit on us)"},
                {"id": "gt10-m1-q7", "questionText": "庭の写真を（　）もらってもいいですか。", "options": ["とらせて", "とられて"], "correctIndex": 0, "explanation": "とらせて (Could you let me take...)"},
                {"id": "gt10-m1-q8", "questionText": "先輩にお酒をたくさん（　）よっぱらってしまった。", "options": ["飲まれて", "飲まされて"], "correctIndex": 1, "explanation": "飲まされて (Was forced to drink)"},
                {"id": "gt10-m1-q9", "questionText": "彼女にプロポーズしたが、（　）しまった。", "options": ["断らせて", "断られて"], "correctIndex": 1, "explanation": "断られて (Was rejected)"},
                {"id": "gt10-m1-q10", "questionText": "親にだめだと（　）私は留学したい。", "options": ["言われても", "言わされても"], "correctIndex": 0, "explanation": "言われても (Even if I am told no)"}
            ]
        }
    ]
}

grammar_26 = {
    "id": "grammar-26",
    "title": "第26回",
    "sections": [
        {
            "id": "grammar-26-1",
            "title": "問題1",
            "instruction": "つぎの文の（　）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。",
            "questions": [
                {"id": "grammar-26-1-1", "text": "海水の温度が高くなる（　）、台風が起きる可能性が高くなるそうだ。", "options": ["にそって", "につれて", "にとって", "によって"], "answer": "につれて", "explanation": "〜につれて (As〜)"},
                {"id": "grammar-26-1-2", "text": "彼に嫌われたくないなら、そんなこと（　）。", "options": ["言ってしまった", "言わなければいいのに", "言うべきだろうか", "言わなければよかった"], "answer": "言わなければいいのに", "explanation": "〜ばいいのに (You shouldn't have said that / It would be better if you didn't say that)"},
                {"id": "grammar-26-1-3", "text": "電気がついていないから、もう教室には誰もいない（　）。", "options": ["ことだ", "そうだ", "ものだ", "ようだ"], "answer": "ようだ", "explanation": "〜ようだ (It seems that〜)"},
                {"id": "grammar-26-1-4", "text": "接戦の（　）、私たちのクラスは隣のクラスに負けてしまった。", "options": ["上", "中", "下", "末"], "answer": "末", "explanation": "〜の末 (At the end of / After〜)"},
                {"id": "grammar-26-1-5", "text": "中村さんの私（　）態度は、他の人とはぜんぜん違う。", "options": ["に関する", "に対する", "についての", "にとっての"], "answer": "に対する", "explanation": "〜に対する (Towards〜)"},
                {"id": "grammar-26-1-6", "text": "最近あまり寝ていない（　）、頭痛がする。", "options": ["ことか", "せいか", "そうか", "だろうか"], "answer": "せいか", "explanation": "〜せいか (Perhaps because〜)"},
                {"id": "grammar-26-1-7", "text": "この地方に昔から伝わる話（　）絵本を書いた。", "options": ["のうえで", "のもとで", "をもとに", "をとおして"], "answer": "をもとに", "explanation": "〜をもとに (Based on〜)"}
            ]
        },
        {
            "id": "grammar-26-2",
            "title": "問題2",
            "instruction": "つぎの文の＿★＿に入る最もよいものを、1・2・3・4から一つえらびなさい。",
            "questions": [
                {"id": "grammar-26-2-1", "text": "これから毎朝30分、この練習＿＿　＿＿　＿★＿　＿＿いる。", "options": ["を", "いこう", "続けて", "と思って"], "answer": "いこう", "explanation": "この練習[を][続けて][いこう★][と思って]いる。(1, 3, 2, 4)"},
                {"id": "grammar-26-2-2", "text": "最近は＿＿　＿＿　＿★＿　＿＿子ども服がたくさん売られている。", "options": ["大人", "おしゃれ", "に見える", "からみても"], "answer": "おしゃれ", "explanation": "最近は[大人][からみても][おしゃれ★][に見える]子ども服がたくさん売られている。(1, 4, 2, 3)"},
                {"id": "grammar-26-2-3", "text": "だんだん雨が＿＿　＿＿　＿★＿　＿＿店の前には大勢の人が並んでいた。", "options": ["強く", "にも", "かかわらず", "なってきた"], "answer": "にも", "explanation": "だんだん雨が[強く][なってきた][にも★][かかわらず]店の前には大勢の人が並んでいた。(1, 4, 2, 3)"}
            ]
        },
        {
            "id": "grammar-26-3",
            "title": "問題3",
            "instruction": "つぎの文章を読んで、[ 1 ]から[ 5 ]の中に入る最もよいものを、1・2・3・4から一つえらびなさい。",
            "passage": "退院おめでとうございます。\n予定より10日も早く退院できて、ほんとうによかったですね。\n入院中はお見舞いに行けなくて、すみませんでした。先週まで仕事がとても [ 1 ] 、なかなか都合がつかなかったので、今週末にでも行こうと思っていました。\nこれは、お見舞いに持っていこうと思っていたものですが、退院祝い [ 2 ] 送ります。うちの近所では、行列ができるほど人気のお菓子なので、ぜひお子さんや奥さんといっしょに食べてください。\nところで、今の会社に転職してから、あまり体の調子がよくないと聞いて、心配しています。高校時代は、「あいつ [ 3-a ] 丈夫なやつは [ 3-b ] 」とみんなから言われるくらいだったのに……。\n奥さんから聞いたのですが、入院中もずっと、やり [ 4 ] 仕事のことを心配していたそうですね。仕事の遅れを心配する気持ちはわかりますが、くれぐれも無理はしない [ 5 ] 。何をするにも、とにかく健康が一番ですよ。\n近いうちに、他の人も誘って、退院祝いをしましょう。また、携帯に連絡します。\nでは、お大事に。",
            "questions": [
                {"id": "grammar-26-3-1", "text": "[ 1 ] に入るもの", "options": ["忙しく", "忙しいから", "忙しかったので", "忙しいまま"], "answer": "忙しく", "explanation": "忙しく (Was busy)"},
                {"id": "grammar-26-3-2", "text": "[ 2 ] に入るもの", "options": ["として", "にとって", "に対して", "のために"], "answer": "として", "explanation": "〜として (As a〜)"},
                {"id": "grammar-26-3-3", "text": "[ 3 ] に入るもの", "options": ["a のように / b いる", "a ほど / b いない", "a くらい / b いる", "a さえ / b いない"], "answer": "a ほど / b いない", "explanation": "〜ほど〜ない (There is no one as... as...)"},
                {"id": "grammar-26-3-4", "text": "[ 4 ] に入るもの", "options": ["かねない", "かけの", "きれない", "ぬいた"], "answer": "かけの", "explanation": "〜かけの (Half-finished〜)"},
                {"id": "grammar-26-3-5", "text": "[ 5 ] に入るもの", "options": ["ように", "ようで", "ことに", "ことで"], "answer": "ように", "explanation": "〜ように (Please make sure to〜)"}
            ]
        }
    ]
}

grammar_27 = {
    "id": "grammar-27",
    "title": "第27回",
    "sections": [
        {
            "id": "grammar-27-1",
            "title": "問題1",
            "instruction": "つぎの文の（　）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。",
            "questions": [
                {"id": "grammar-27-1-1", "text": "履歴書を見ても、実際に会って（　）どんな人かわからない。", "options": ["みたことには", "みることなく", "みないことには", "みないことでは"], "answer": "みないことには", "explanation": "〜ないことには (Unless〜)"},
                {"id": "grammar-27-1-2", "text": "A：このソフト、使える？\nB：使えない（　）けど、あんまりくわしくはないよ。", "options": ["ことはない", "わけがない", "ことじゃない", "わけにはいかない"], "answer": "ことはない", "explanation": "〜ないことはない (It's not that I can't...)"},
                {"id": "grammar-27-1-3", "text": "携帯電話を忘れてきてしまった（　）、友達と連絡できなくて困った。", "options": ["ものなら", "わけなら", "ものだから", "わけだから"], "answer": "ものだから", "explanation": "〜ものだから (Because〜 / Reason)"},
                {"id": "grammar-27-1-4", "text": "最近仕事が忙しくて寝不足（　）だから、今日は早く帰って寝よう。", "options": ["げ", "ぎみ", "すぎ", "っぽい"], "answer": "ぎみ", "explanation": "〜ぎみ (Tending to be〜)"},
                {"id": "grammar-27-1-5", "text": "この歌の意味（　）、ファンの間で議論が続いている。", "options": ["に対して", "によって", "を通して", "をめぐって"], "answer": "をめぐって", "explanation": "〜をめぐって (Concerning / Over〜)"},
                {"id": "grammar-27-1-6", "text": "みんなの予想（　）、優勝したのは一番弱いと言われていたAチームだった。", "options": ["に反して", "のせいで", "のわりには", "にもかかわらず"], "answer": "に反して", "explanation": "〜に反して (Contrary to〜)"},
                {"id": "grammar-27-1-7", "text": "私は国語教師の両親（　）たくさんの本に囲まれて育った。", "options": ["のすえに", "のもとで", "にともなって", "にもとづいて"], "answer": "のもとで", "explanation": "〜のもとで (Under〜)"}
            ]
        },
        {
            "id": "grammar-27-2",
            "title": "問題2",
            "instruction": "つぎの文の＿★＿に入る最もよいものを、1・2・3・4から一つえらびなさい。",
            "questions": [
                {"id": "grammar-27-2-1", "text": "相手が＿＿　＿＿　＿★＿　＿＿続けていれば、いつかは勝てる日がくるはずだ。", "options": ["さえ", "努力", "強くても", "どんなに"], "answer": "努力", "explanation": "相手が[どんなに][強くても][努力★][さえ]続けていれば... (4, 3, 2, 1)"},
                {"id": "grammar-27-2-2", "text": "お申し込みに＿＿　＿＿　＿★＿　＿＿なる場合がありますので、ご用意ください。", "options": ["は", "際して", "必要と", "身分証明書が"], "answer": "身分証明書が", "explanation": "お申し込みに[際して][は][身分証明書が★][必要と]なる場合がありますので、ご用意ください。(2, 1, 4, 3)"},
                {"id": "grammar-27-2-3", "text": "すみません、この言葉が＿＿　＿＿　＿★＿　＿＿知らなかったんです。", "options": ["失礼な", "なんて", "そんなに", "言葉だった"], "answer": "言葉だった", "explanation": "すみません、この言葉が[そんなに][失礼な][言葉だった★][なんて]知らなかったんです。(3, 1, 4, 2)"}
            ]
        },
        {
            "id": "grammar-27-3",
            "title": "問題3",
            "instruction": "つぎの文章を読んで、[ 1 ]から[ 5 ]の中に入る最もよいものを、1・2・3・4から一つえらびなさい。",
            "passage": "「もし山でクマに出会ったら、木に登るといい」とか、「死んだ [ 1 ] とクマは離れていく」などという話を聞いたことはありませんか。多くの人はこの話が本当だと思っていますが、これらはどちらも間違いです。\nクマは動かないものも食べるので、 [ 2-a ] じっと [ 2-b ] 、かみつかれることがあります。また、クマは木登りが得意なので、木に登るのも無駄です。\nもしクマに出会ったら、できるだけ落ち着いて [ 3 ] してください。クマが遠くにいるときは、静かにその場を離れます。近くで出会ってしまったら、大声を出したり、物を投げつけたりしないで、クマと目を [ 4 ] ゆっくり後ろに下がります。クマに背中を見せて走って逃げるのは危険です。\nクマは体は大きいですが、実はこわがりです。人間がいることに気づくと逃げていくので、鈴やラジオなどで音を出しながら歩くとよいでしょう。\n一番大切なのは、クマに出会ったら [ 5 ] を知っていることではなく、クマに出会わないようにすることです。",
            "questions": [
                {"id": "grammar-27-3-1", "text": "[ 1 ] に入るもの", "options": ["ことにする", "ばかりだ", "ふりをする", "ようになる"], "answer": "ふりをする", "explanation": "ふりをする (Pretend to)"},
                {"id": "grammar-27-3-2", "text": "[ 2 ] に入るもの", "options": ["a たとえ / b していては", "a たとえ / b していても", "a もしも / b したなら", "a もしも / b するなら"], "answer": "a たとえ / b していても", "explanation": "たとえ〜ても (Even if〜)"},
                {"id": "grammar-27-3-3", "text": "[ 3 ] に入るもの", "options": ["そのとおりに", "言うとおりに", "次のように", "あのように"], "answer": "次のように", "explanation": "次のように (As follows)"},
                {"id": "grammar-27-3-4", "text": "[ 4 ] に入るもの", "options": ["合わせるほど", "合わせたところ", "合わせたまま", "合わせたとたん"], "answer": "合わせたまま", "explanation": "〜まま (Keeping〜 / While maintaining〜)"},
                {"id": "grammar-27-3-5", "text": "[ 5 ] に入るもの", "options": ["どうすればいいか", "どうしたらいい", "どうしたんですか", "どうしたのか"], "answer": "どうすればいいか", "explanation": "どうすればいいか (What you should do)"}
            ]
        }
    ]
}


# Let's cleanly rebuild the array
new_chapters = []
for c in data['chapters']:
    if c['id'] not in ('grammar-24', 'grammar-25', 'grammar-training-9', 'grammar-training-10', 'grammar-26', 'grammar-27'):
        new_chapters.append(c)

# We want to place:
# grammar-24 after grammar-23
# grammar-25 after grammar-24
# grammar-26 after grammar-25
# grammar-27 after grammar-26
# grammar-training-9 after grammar-training-8
# grammar-training-10 after grammar-training-9

final_chapters = []
for c in new_chapters:
    final_chapters.append(c)
    if c['id'] == 'grammar-23':
        final_chapters.append(grammar_24)
        final_chapters.append(grammar_25)
        final_chapters.append(grammar_26)
        final_chapters.append(grammar_27)
    elif c['id'] == 'grammar-training-8':
        final_chapters.append(grammar_training_9)
        final_chapters.append(grammar_training_10)

data['chapters'] = final_chapters

with open('power_drill_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Inserted Drills 24-27 and Training 9-10 successfully!")
