import json

file_path = r"D:\sudip_software\nihongo_playground\nihongo power drill\power_drill_data.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

drill_14_sections = [
    {
      "id": "mondai-1",
      "mondaiHeader": "つぎの文の（　）に入れるのに最もよいものを、１・２・３・４から一つえらびなさい。",
      "questions": [
        {
          "id": "g14-m1-q1",
          "questionText": "本当はお酒が飲めない（　）、無理して飲むから気分が悪くなるんだよ。",
          "options": ["くせに", "せいで", "ままで", "わりに"],
          "correctIndex": 0,
          "explanation": ""
        },
        {
          "id": "g14-m1-q2",
          "questionText": "バイクには乗れる（　）乗れますが、ふだんはあまり乗りません。",
          "options": ["ことは", "わけは", "ことには", "わけには"],
          "correctIndex": 0,
          "explanation": ""
        },
        {
          "id": "g14-m1-q3",
          "questionText": "A：荷物がまだ届かないんです。\nB：昨日送ったのなら、今日の午後には（　）なんですが……。",
          "options": ["着くはず", "着くべき", "着いたもの", "着いたわけ"],
          "correctIndex": 0,
          "explanation": ""
        },
        {
          "id": "g14-m1-q4",
          "questionText": "（　）あちらにおかけになってお待ちください。",
          "options": ["よろしいと", "よろしければ", "よろしいなら", "よろしい場合"],
          "correctIndex": 1,
          "explanation": ""
        },
        {
          "id": "g14-m1-q5",
          "questionText": "もしこの店が家の近くに（　）、毎日でも通うのになあ。",
          "options": ["あると", "あるから", "あったら", "あるとして"],
          "correctIndex": 2,
          "explanation": ""
        },
        {
          "id": "g14-m1-q6",
          "questionText": "明日の最高気温は35度になる（　）ニュースで言ってたよ。",
          "options": ["って", "っけ", "だって", "もん"],
          "correctIndex": 0,
          "explanation": ""
        },
        {
          "id": "g14-m1-q7",
          "questionText": "昨日先輩に何曲も（　）せいで、今日はのどが痛い。",
          "options": ["歌い続けた", "歌い切った", "歌わされた", "歌ってしまった"],
          "correctIndex": 2,
          "explanation": ""
        },
        {
          "id": "g14-m1-q8",
          "questionText": "仕事に慣れる（　）、だんだん会社が楽しくなってきた。",
          "options": ["ために", "しだいに", "によって", "にしたがって"],
          "correctIndex": 3,
          "explanation": ""
        },
        {
          "id": "g14-m1-q9",
          "questionText": "この学校では大学進学に力を入れる（　）、クラブ活動も活発だ。",
          "options": ["一方", "と反対に", "に対して", "にかわって"],
          "correctIndex": 0,
          "explanation": ""
        },
        {
          "id": "g14-m1-q10",
          "questionText": "2010年の冬のオリンピックはカナダのバンクーバー（　）開催された。",
          "options": ["において", "にとって", "に応じて", "にあたって"],
          "correctIndex": 0,
          "explanation": ""
        }
      ]
    },
    {
      "id": "mondai-2",
      "mondaiHeader": "つぎの文の ★ に入る最もよいものを、１・２・３・４から一つえらびなさい。",
      "questions": [
        {
          "id": "g14-m2-q1",
          "questionText": "私は大好きなチーズ ＿＿＿ ＿＿＿ ＿★＿ ＿＿＿ いりません。",
          "options": ["さえ", "何も", "あれば", "他には"],
          "correctIndex": 3,
          "explanation": "私は大好きなチーズ(さえ)(あれば)(他には)(何も)いりません。"
        },
        {
          "id": "g14-m2-q2",
          "questionText": "私のを使ってください。1回しか使わない ＿＿＿ ＿＿＿ ＿★＿ ＿＿＿ ありませんよ。",
          "options": ["のに", "買う", "ことは", "わざわざ"],
          "correctIndex": 1,
          "explanation": "1回しか使わない(のに)(わざわざ)(買う)(ことは)ありませんよ。"
        },
        {
          "id": "g14-m2-q3",
          "questionText": "コンタクトレンズを ＿＿＿ ＿＿＿ ＿★＿ ＿＿＿ 目が痛い。",
          "options": ["まま", "せいで", "つけた", "寝てしまった"],
          "correctIndex": 3,
          "explanation": "コンタクトレンズを(つけた)(まま)(寝てしまった)(せいで)目が痛い。"
        },
        {
          "id": "g14-m2-q4",
          "questionText": "こんなに忙しかったら、 ＿＿＿ ＿＿＿ ＿★＿ ＿＿＿ ない。",
          "options": ["も", "なんて", "夏休み", "とれそう"],
          "correctIndex": 3,
          "explanation": "こんなに忙しかったら、(夏休み)(なんて)(とれそう)(も)ない。"
        }
      ]
    },
    {
      "id": "mondai-3",
      "mondaiHeader": "つぎの文章を読んで、[ 1 ]から[ 3 ]の中に入る最もよいものを、1・2・3・4から一つえらびなさい。",
      "passageText": "「ため息をつく[ 1 ]幸せが逃げていく」ということばを聞いたことがある人も多いだろう。疲れたときや、悩みがあるとき、フーッとため息が出てしまうことがよくある。\nでは、ため息はなぜ出るのだろうか。\n人は、元気がなくなると、自然に下を向いて姿勢が悪くなり[ 2 ]。このようなときは、気づかないうちに息が浅くなっていて、十分に息を吸ったりはいたりしていないことが多い。すると、脳や体に送られる酸素が少なくなる。そこで、体は自然に大きく息を吸い込んで、脳や体に新鮮な空気を送ろうとする。[ 3 ]、ため息なのだ。\nため息をつくと「幸せが逃げていく」のではなく、実は反対に、ため息のおかげでまた元気になれるのである。",
      "questions": [
        {
          "id": "g14-m3-q1",
          "questionText": "[ 1 ]",
          "options": ["たびに", "わりに", "ついでに", "とおりに"],
          "correctIndex": 0,
          "explanation": ""
        },
        {
          "id": "g14-m3-q2",
          "questionText": "[ 2 ]",
          "options": ["かける", "すぎる", "がちだ", "たがる"],
          "correctIndex": 2,
          "explanation": ""
        },
        {
          "id": "g14-m3-q3",
          "questionText": "[ 3 ]",
          "options": ["これが", "これで", "これは", "これさえ"],
          "correctIndex": 0,
          "explanation": ""
        }
      ]
    }
]

for chapter in data.get("chapters", []):
    if chapter.get("id") == "grammar-14":
        chapter["sections"] = drill_14_sections
        if "passages" in chapter:
            del chapter["passages"]
        print("Updated grammar-14")

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Drill 14 successfully saved into the unified database.")
