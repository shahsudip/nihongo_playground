import json

file_path = r"D:\sudip_software\nihongo_playground\nihongo power drill\power_drill_data.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

drill_15_sections = [
    {
      "id": "mondai-1",
      "mondaiHeader": "つぎの文の（　）に入れるのに最もよいものを、１・２・３・４から一つえらびなさい。",
      "questions": [
        {
          "id": "g15-m1-q1",
          "questionText": "茶道や書道（　）、日本の伝統文化は海外でも人気がある。",
          "options": ["をはじめ", "を問わず", "にわたって", "をめぐって"],
          "correctIndex": 0,
          "explanation": ""
        },
        {
          "id": "g15-m1-q2",
          "questionText": "チョコレートをがまんするなんてできない。だって大好き（　）。",
          "options": ["なのです", "なもんか", "なんだもん", "なんだって"],
          "correctIndex": 2,
          "explanation": ""
        },
        {
          "id": "g15-m1-q3",
          "questionText": "（　）考えても、そんな計画が成功するとは思えない。",
          "options": ["どう", "なんで", "いくらでも", "どうして"],
          "correctIndex": 0,
          "explanation": ""
        },
        {
          "id": "g15-m1-q4",
          "questionText": "当店ではご予算（　）お食事プランをご用意しております。",
          "options": ["に応じた", "に関した", "においての", "にとっての"],
          "correctIndex": 0,
          "explanation": ""
        },
        {
          "id": "g15-m1-q5",
          "questionText": "私が卒業した小学校は20年前とほとんど変わっていなくて、昔（　）。",
          "options": ["らしかった", "のはずだった", "のままだった", "みたいだった"],
          "correctIndex": 2,
          "explanation": ""
        },
        {
          "id": "g15-m1-q6",
          "questionText": "こんなに厚い本は読めないと思っていたが、半年かかって全部読み（　）。",
          "options": ["あげた", "きった", "だした", "ぬいた"],
          "correctIndex": 1,
          "explanation": ""
        },
        {
          "id": "g15-m1-q7",
          "questionText": "飼っている犬がいなくなって（　）心配したが、三日後に戻ってきた。",
          "options": ["眠るほど", "眠るように", "眠れないほど", "眠れないように"],
          "correctIndex": 2,
          "explanation": ""
        },
        {
          "id": "g15-m1-q8",
          "questionText": "子どもがどんなに（　）、必要じゃないものは買わないようにしています。",
          "options": ["ほしがっても", "ほしがったら", "ほしそうなら", "ほしそうだから"],
          "correctIndex": 0,
          "explanation": ""
        },
        {
          "id": "g15-m1-q9",
          "questionText": "地球の人口は、今後もますます（　）だろう。",
          "options": ["増え出す", "増えていく", "増えてくる", "増えたがる"],
          "correctIndex": 1,
          "explanation": ""
        },
        {
          "id": "g15-m1-q10",
          "questionText": "会社を出て駅のほうに（　）が、忘れ物に気がついてまた会社に戻った。",
          "options": ["行きかけた", "行きそうだ", "行くようだ", "行きがちだ"],
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
          "id": "g15-m2-q1",
          "questionText": "欠席する ＿＿＿ ＿＿＿ ＿★＿ ＿＿＿ してください。",
          "options": ["際は", "必ず", "ように", "連絡する"],
          "correctIndex": 3,
          "explanation": "欠席する(際は)(必ず)(連絡する)(ように)してください。"
        },
        {
          "id": "g15-m2-q2",
          "questionText": "こちらの新製品 ＿＿＿ ＿＿＿ ＿★＿ ＿＿＿ もよろしいでしょうか。",
          "options": ["説明", "させて", "について", "いただいて"],
          "correctIndex": 1,
          "explanation": "こちらの新製品(について)(説明)(させて)(いただいて)もよろしいでしょうか。"
        },
        {
          "id": "g15-m2-q3",
          "questionText": "みなさんの期待 ＿＿＿ ＿＿＿ ＿★＿ ＿＿＿ ようにがんばります。",
          "options": ["に", "いい結果", "が出せる", "こたえて"],
          "correctIndex": 1,
          "explanation": "みなさんの期待(に)(こたえて)(いい結果)(が出せる)ようにがんばります。"
        },
        {
          "id": "g15-m2-q4",
          "questionText": "全然勉強を ＿＿＿ ＿＿＿ ＿★＿ ＿＿＿ 点がとれてびっくりした。",
          "options": ["は", "いい", "わりに", "しなかった"],
          "correctIndex": 0,
          "explanation": "全然勉強を(しなかった)(わりに)(は)(いい)点がとれてびっくりした。"
        }
      ]
    },
    {
      "id": "mondai-3",
      "mondaiHeader": "つぎの文章を読んで、[ 1 ]から[ 3 ]の中に入る最もよいものを、1・2・3・4から一つえらびなさい。",
      "passageText": "世界には約3000種類のヘビの仲間がいる。そのうち毒を持っているヘビは400種類ほどで、世界でもっとも大きい毒ヘビは、インドからインドネシア[ 1 ]広がる森林に住む「キングコブラ」というヘビだ。\nキングコブラの体長はふつう4メートルくらいだが、大きいものになると、5メートル以上もあるそうだ。しかも、敵にあうと、首の横を広げて頭を持ち上げ、自分の体をさらに大きく見せようとする。さらに、シューという音を出し、相手を[ 2 ]のだ。\nキングコブラは、毒ヘビの中で一番毒が強いというわけではないが、一度に大量の毒を敵の体内に入れることができる。そのため、ゾウのように体の大きい動物[ 3 ]、一度かまれただけで死んでしまうことがあるほど危険なのである。",
      "questions": [
        {
          "id": "g15-m3-q1",
          "questionText": "[ 1 ]",
          "options": ["とともに", "にかけて", "に沿って", "を通して"],
          "correctIndex": 1,
          "explanation": ""
        },
        {
          "id": "g15-m3-q2",
          "questionText": "[ 2 ]",
          "options": ["こわがる", "こわがらせる", "こわがられる", "こわがっている"],
          "correctIndex": 1,
          "explanation": ""
        },
        {
          "id": "g15-m3-q3",
          "questionText": "[ 3 ]",
          "options": ["でさえ", "なんか", "ばかり", "だからこそ"],
          "correctIndex": 0,
          "explanation": ""
        }
      ]
    }
]

for chapter in data.get("chapters", []):
    if chapter.get("id") == "grammar-15":
        chapter["sections"] = drill_15_sections
        if "passages" in chapter:
            del chapter["passages"]
        print("Updated grammar-15")

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Drill 15 successfully saved into the unified database.")
