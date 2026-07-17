import json

with open('D:/sudip_software/nihongo_playground/nihongo power drill/power_drill_grammar_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

t9 = {
  "id": "grammar-training-9",
  "title": "集中トレーニング 9",
  "type": "grammar",
  "questions": [
    {
      "mondai": "接続語",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "1",
      "question": "テニスは好きです。（ a だけど b そのため ）下手です。",
      "options": ["だけど", "そのため"],
      "answer": "だけど"
    },
    {
      "mondai": "接続語",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "2",
      "question": "彼はいつも遅刻する。（ a それで b ところが ）今日は一番早く来た。",
      "options": ["それで", "ところが"],
      "answer": "ところが"
    },
    {
      "mondai": "接続語",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "3",
      "question": "朝食はごはんですか、（ a そのうえ b それとも ）パンですか。",
      "options": ["そのうえ", "それとも"],
      "answer": "それとも"
    },
    {
      "mondai": "接続語",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "4",
      "question": "私は用があって行けません。（ a しかし b ですから ）、渡辺さん一人で行ってください。",
      "options": ["しかし", "ですから"],
      "answer": "ですから"
    },
    {
      "mondai": "接続語",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "5",
      "question": "彼は何も言わなかった。（ a つまり b なぜなら ）、だめだということだ。",
      "options": ["つまり", "なぜなら"],
      "answer": "つまり"
    },
    {
      "mondai": "接続語",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "6",
      "question": "毎日遅くまで練習した。（ a ところが b その結果 ）、コンクールで優勝することができた。",
      "options": ["ところが", "その結果"],
      "answer": "その結果"
    },
    {
      "mondai": "接続語",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "7",
      "question": "数日前から大雨が続いている。（ a つまり b そのため ）、川の水が増えていて危険だ。",
      "options": ["つまり", "そのため"],
      "answer": "そのため"
    },
    {
      "mondai": "接続語",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "8",
      "question": "合格おめでとう。（ a ところが b ところで ）、入学式はいつ？",
      "options": ["ところが", "ところで"],
      "answer": "ところで"
    },
    {
      "mondai": "接続語",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "9",
      "question": "この本はとてもおもしろい。（ a そのうえ b それとも ）役に立つことがたくさん書いてある。",
      "options": ["そのうえ", "それとも"],
      "answer": "そのうえ"
    },
    {
      "mondai": "接続語",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "10",
      "question": "今日は早く帰りたい。（ a つまり b なぜなら ）今日は結婚記念日だからだ。",
      "options": ["つまり", "なぜなら"],
      "answer": "なぜなら"
    }
  ]
}

t10 = {
  "id": "grammar-training-10",
  "title": "集中トレーニング 10",
  "type": "grammar",
  "questions": [
    {
      "mondai": "使役・受身",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "1",
      "question": "店長、すみませんが明日（ a 休ませて b 休まれて ）いただけませんか。",
      "options": ["休ませて", "休まれて"],
      "answer": "休ませて"
    },
    {
      "mondai": "使役・受身",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "2",
      "question": "不況で会社を（ a やめさせた b やめさせられた ）。明日から仕事がない。",
      "options": ["やめさせた", "やめさせられた"],
      "answer": "やめさせられた"
    },
    {
      "mondai": "使役・受身",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "3",
      "question": "長い間、この絵の作者はわからないと（ a させて b されて ）いた。",
      "options": ["させて", "されて"],
      "answer": "されて"
    },
    {
      "mondai": "使役・受身",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "4",
      "question": "彼の歌は今でも世界中の人に（ a 愛されて b 愛させられて ）いる。",
      "options": ["愛されて", "愛させられて"],
      "answer": "愛されて"
    },
    {
      "mondai": "使役・受身",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "5",
      "question": "子どもに携帯電話を（ a 持たせる b 持たれる ）べきかどうか悩んでいる。",
      "options": ["持たせる", "持たれる"],
      "answer": "持たせる"
    },
    {
      "mondai": "使役・受身",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "6",
      "question": "今アルバイトに（ a やめさせ b やめられ ）たら、この店は大変だ。",
      "options": ["やめさせ", "やめられ"],
      "answer": "やめられ"
    },
    {
      "mondai": "使役・受身",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "7",
      "question": "庭の写真を（ a とらせて b とられて ）もらってもいいですか。",
      "options": ["とらせて", "とられて"],
      "answer": "とらせて"
    },
    {
      "mondai": "使役・受身",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "8",
      "question": "先輩にお酒をたくさん（ a 飲まれて b 飲まされて ）よっぱらってしまった。",
      "options": ["飲まれて", "飲まされて"],
      "answer": "飲まされて"
    },
    {
      "mondai": "使役・受身",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "9",
      "question": "彼女にプロポーズしたが、（ a 断らせて b 断られて ）しまった。",
      "options": ["断らせて", "断られて"],
      "answer": "断られて"
    },
    {
      "mondai": "使役・受身",
      "instruction": "（　）の中の a と b のうち、文に合うほうをえらびましょう。",
      "number": "10",
      "question": "親にだめだと（ a 言われても b 言わされても ）私は留学したい。",
      "options": ["言われても", "言わされても"],
      "answer": "言われても"
    }
  ]
}

# Update or append
existing_t9 = [c for c in data["chapters"] if c["id"] == "grammar-training-9"]
if existing_t9:
    data["chapters"][data["chapters"].index(existing_t9[0])] = t9
else:
    data["chapters"].append(t9)

existing_t10 = [c for c in data["chapters"] if c["id"] == "grammar-training-10"]
if existing_t10:
    data["chapters"][data["chapters"].index(existing_t10[0])] = t10
else:
    data["chapters"].append(t10)

with open('D:/sudip_software/nihongo_playground/nihongo power drill/power_drill_grammar_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Added Training 9 and 10")
