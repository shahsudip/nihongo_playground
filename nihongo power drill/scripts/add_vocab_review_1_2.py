import json
import re

with open('power_drill_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# The vocab schema uses "vocab-X" format, with "passages" array containing "questions".
# Let's match the format of vocab-1.
# A vocab chapter has:
# id, title, description, type, passages

rev1 = {
  "id": "vocab-review-1",
  "title": "集中トレーニング ①",
  "description": "N3語彙ドリル集中トレーニング①",
  "type": "vocab",
  "passages": [
    {
      "title": "動詞（１）",
      "mondaiHeader": "（　）の中のaとbのうち、文に合うほうを選びましょう。",
      "passageText": "",
      "questions": [
        {
          "questionText": "1 銀行に寄ってお金を（　　）から行こう。",
          "options": ["a さげて", "b おろして"],
          "correctOption": {"index": 1, "text": "b おろして"},
          "explanation": "お金をおろす means to withdraw money."
        },
        {
          "questionText": "2 薬が（　　）、熱が下がってきた。",
          "options": ["a きいて", "b みえて"],
          "correctOption": {"index": 0, "text": "a きいて"},
          "explanation": "薬がきく means the medicine takes effect."
        },
        {
          "questionText": "3 最後に使った人は電源を（　　）おいてください。",
          "options": ["a きって", "b しめて"],
          "correctOption": {"index": 0, "text": "a きって"},
          "explanation": "電源をきる means to turn off the power."
        },
        {
          "questionText": "4 まず、みんなで話し合って計画を（　　）。",
          "options": ["a たてましょう", "b つくりましょう"],
          "correctOption": {"index": 0, "text": "a たてましょう"},
          "explanation": "計画をたてる means to make a plan."
        },
        {
          "questionText": "5 では、出席を（　　）。青木さん、井上さん、上田さん……。",
          "options": ["a とります", "b よびます"],
          "correctOption": {"index": 0, "text": "a とります"},
          "explanation": "出席をとる means to take attendance."
        },
        {
          "questionText": "6 大変です。急いで救急車を（　　）ください。",
          "options": ["a とめて", "b よんで"],
          "correctOption": {"index": 1, "text": "b よんで"},
          "explanation": "救急車をよぶ means to call an ambulance."
        },
        {
          "questionText": "7 彼はつまらなそうに、大きなあくびを（　　）。",
          "options": ["a した", "b だした"],
          "correctOption": {"index": 0, "text": "a した"},
          "explanation": "あくびをする means to yawn."
        },
        {
          "questionText": "8 松本課長は今、席を（　　）います。",
          "options": ["a なくして", "b はずして"],
          "correctOption": {"index": 1, "text": "b はずして"},
          "explanation": "席をはずす means to step away from one's desk."
        },
        {
          "questionText": "9 窓を開けて寝たら、風邪を（　　）しまった。",
          "options": ["a ひいて", "b もらって"],
          "correctOption": {"index": 0, "text": "a ひいて"},
          "explanation": "風邪をひく means to catch a cold."
        },
        {
          "questionText": "10 日が（　　）前に帰りましょう。",
          "options": ["a くれる", "b さがる"],
          "correctOption": {"index": 0, "text": "a くれる"},
          "explanation": "日がくれる means the sun sets."
        }
      ]
    }
  ]
}

rev2 = {
  "id": "vocab-review-2",
  "title": "集中トレーニング ②",
  "description": "N3語彙ドリル集中トレーニング②",
  "type": "vocab",
  "passages": [
    {
      "title": "動詞（２）",
      "mondaiHeader": "（　）の中のaとbのうち、文に合うほうを選びましょう。",
      "passageText": "",
      "questions": [
        {
          "questionText": "1 ちょっと休みましょう。コーヒーを（　　）ね。",
          "options": ["a にます", "b いれます"],
          "correctOption": {"index": 1, "text": "b いれます"},
          "explanation": "コーヒーをいれる means to make/brew coffee."
        },
        {
          "questionText": "2 寒くなってきたから、厚い毛布を（　　）寝よう。",
          "options": ["a かけて", "b のせて"],
          "correctOption": {"index": 0, "text": "a かけて"},
          "explanation": "毛布をかける means to put on a blanket."
        },
        {
          "questionText": "3 かさを（　　）自転車に乗るのは危ないですよ。",
          "options": ["a さして", "b ついて"],
          "correctOption": {"index": 0, "text": "a さして"},
          "explanation": "かさをさす means to hold up an umbrella."
        },
        {
          "questionText": "4 私が運転免許証を（　　）のは、二十歳のときです。",
          "options": ["a うけた", "b とった"],
          "correctOption": {"index": 1, "text": "b とった"},
          "explanation": "運転免許証をとる means to get a driver's license."
        },
        {
          "questionText": "5 わからない言葉があったら、すぐ辞書を（　　）ようにしています。",
          "options": ["a とる", "b ひく"],
          "correctOption": {"index": 1, "text": "b ひく"},
          "explanation": "辞書をひく means to look up in a dictionary."
        },
        {
          "questionText": "6 「ええ」「それで」とあいづちを（　　）ながら、話を聞いていた。",
          "options": ["a うち", "b だし"],
          "correctOption": {"index": 0, "text": "a うち"},
          "explanation": "あいづちをうつ means to nod/give backchannel responses."
        },
        {
          "questionText": "7 ああ、のどが（　　）。水をください。",
          "options": ["a ひえた", "b かわいた"],
          "correctOption": {"index": 1, "text": "b かわいた"},
          "explanation": "のどがかわく means to be thirsty."
        },
        {
          "questionText": "8 スポーツをして汗を（　　）のは、気持ちがいい。",
          "options": ["a かく", "b ひく"],
          "correctOption": {"index": 0, "text": "a かく"},
          "explanation": "汗をかく means to sweat."
        },
        {
          "questionText": "9 病気のときは十分睡眠を（　　）ほうがいいですよ。",
          "options": ["a した", "b とった"],
          "correctOption": {"index": 1, "text": "b とった"},
          "explanation": "睡眠をとる means to get sleep."
        },
        {
          "questionText": "10 ３年働いてお金が（　　）、留学しようと思っている。",
          "options": ["a たまったら", "b あつまったら"],
          "correctOption": {"index": 0, "text": "a たまったら"},
          "explanation": "お金がたまる means money is accumulated."
        }
      ]
    }
  ]
}

# Remove old vocab-5-review-1 or similar if it exists
data["chapters"] = [c for c in data["chapters"] if not c["id"].startswith("vocab-5-review-")]
data["chapters"] = [c for c in data["chapters"] if not c["id"].startswith("vocab-review-1")]
data["chapters"] = [c for c in data["chapters"] if not c["id"].startswith("vocab-review-2")]

data["chapters"].append(rev1)
data["chapters"].append(rev2)

with open('power_drill_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Vocab Review 1 and 2 added to local JSON.")
