import json
import os

OUTPUT_FILE = r"D:\sudip_software\nihongo_playground\src\data\somatome\week6-day7.json"

w6d7 = {
  "bookId": "sou-matome-n3-reading",
  "chapterId": "week6-day7",
  "week": 6,
  "day": 7,
  "theme": "意見文や説明文を読もう",
  "title": "Week 6 - Day 7: 模擬試験（総まとめ実戦テスト）",
  "learning_focus": {
    "title": "第6週・全書総まとめ！模擬試験に挑戦しよう",
    "subtitle": "Final Review Mock Test: Comprehensive Reading Practice for JLPT N3!",
    "comic": {
      "situation": "第6週のまとめテストおよび全6週間の総合読解模擬試験。",
      "dialogue": [
        {
          "speaker": "先生鳥",
          "text": "これまでに学んだお知らせ、案内、手紙、メール、新聞、意見文、小説の読み方を総動員して、最後の模擬試験に挑戦しよう！"
        },
        {
          "speaker": "鳥",
          "text": "制限時間20分、全問正解を目指すぞ！"
        }
      ],
      "note": "★長文読解では、まず設問を読んで「何が問われているか」を把握してから本文を読むと効果的です。"
    }
  },
  "vocabulary": [
    {
      "word": "模擬試験",
      "reading": "もぎしけん",
      "meaning": "mock exam / practice test",
      "example": "本番前の模擬試験で実力を試す。"
    },
    {
      "word": "総合的な",
      "reading": "そうごうてきな",
      "meaning": "comprehensive / overall",
      "example": "総合的な読解力を高める。"
    },
    {
      "word": "効率よく",
      "reading": "こうりつよく",
      "meaning": "efficiently",
      "example": "文章の構成をつかんで効率よく読む。"
    },
    {
      "word": "要旨",
      "reading": "ようし",
      "meaning": "main point / summary / gist",
      "example": "筆者が最も伝えたい要旨を把握する。"
    }
  ],
  "practice": {
    "title": "実戦問題について",
    "instruction": "制限時間：20分、配点：各問25点（計100点）。JLPT N3読解の本試験形式で問題1・問題2の4問を解きましょう。(答えは別冊 p.6)",
    "conversation": [],
    "options": [],
    "correct_answers": [],
    "options_explanation": {}
  },
  "mondai": {
    "title": "模擬試験（総まとめ実戦問題）",
    "instruction": "次の2つの文章を読んで、後の問いに対する答えとして最もよいものを1・2・3・4から1つ選びなさい。(答えは別冊 p.6)",
    "notice": {
      "title": "問題1：生活習慣と健康に関する説明文",
      "sections": [
        {
          "header": "文章1",
          "rows": [
            {
              "label": "本文",
              "value": "人間は毎日同じリズムで生活することで、体内時計が整い、自律神経や免疫機能が正常に働くようにできている。しかし、休日に遅くまで寝ていたり、夜更かしを繰り返したりすると、体内時計が狂ってしまい、週明けの月曜日に強い疲労感や集中力の低下を感じることになる。休日の起床時間は、平日との差を2時間以内に抑えることが、健康を保つための秘訣である。"
            }
          ]
        },
        {
          "header": "文章2：情報社会におけるコミュニケーション（長文・意見文）",
          "rows": [
            {
              "label": "本文",
              "value": "SNSの普及によって、私たちはいつでもどこでも誰とでも瞬時につながることができるようになった。しかし、文字だけの短いやり取りが増えたことで、相手の表情や声のトーンから感情を察する能力が薄れつつあるのではないだろうか。顔を合わせて言葉を交わす対面コミュニケーションこそが、人間同士の信頼関係を深める最も確実な方法である。"
            }
          ]
        }
      ],
      "footer": "※制限時間：20分。各問25点。"
    },
    "notice_vocab": [
      { "word": "体内時計", "meaning": "biological clock / circadian rhythm" },
      { "word": "自律神経", "meaning": "autonomic nervous system" },
      { "word": "対面", "meaning": "face-to-face" }
    ],
    "questions": [
      {
        "id": "問1",
        "text": "【文章1】休日の生活について、筆者はどのようにアドバイスしているか。",
        "options": [
          "1 休日は平日の疲れをとるために夕方まで寝るべきだ。",
          "2 起きる時間を平日と比べて2時間以上遅くしないほうがよい。",
          "3 休日も平日と全く同じ時間に起きて勉強するべきだ。",
          "4 休日は夜更かしをして趣味に時間を使うべきだ。"
        ],
        "correct_answer": 2,
        "explanation": "The text states '休日の起床時間は、平日との差を2時間以内に抑えることが、健康を保つための秘訣である' (keep weekend waking time within a 2-hour difference from weekdays), matching Option 2."
      },
      {
        "id": "問2",
        "text": "【文章1】体内時計が狂うとどうなると述べられているか。",
        "options": [
          "1 平日よりも免疫力が高まる。",
          "2 週明けの月曜日に疲労感や集中力の低下を感じる。",
          "3 夜早く眠れるようになる。",
          "4 自律神経が活発に働くようになる。"
        ],
        "correct_answer": 2,
        "explanation": "The text notes '体内時計が狂ってしまい、週明けの月曜日に強い疲労感や集中力の低下を感じることになる', matching Option 2."
      },
      {
        "id": "問3",
        "text": "【文章2】SNSでのやり取りについて筆者が懸念していることは何か。",
        "options": [
          "1 インターネット料金が高すぎること。",
          "2 相手の表情や感情を察する能力が薄れること。",
          "3 誰とも連絡が取れなくなること。",
          "4 文字を打つスピードが遅くなること。"
        ],
        "correct_answer": 2,
        "explanation": "The author expresses concern that '相手の表情や声のトーンから感情を察する能力が薄れつつあるのではないだろうか', matching Option 2."
      },
      {
        "id": "問4",
        "text": "【文章2】筆者が最も重要だと主張していることはどれか。",
        "options": [
          "1 SNSでの発信回数を増やすこと。",
          "2 文字だけのコミュニケーションを極めること。",
          "3 直接顔を合わせて対面で言葉を交わすこと。",
          "4 最新のスマートフォンに買い替えること。"
        ],
        "correct_answer": 3,
        "explanation": "The author concludes '顔を合わせて言葉を交わす対面コミュニケーションこそが、人間同士の信頼関係を深める最も確実な方法である' (face-to-face communication is the most reliable way to deepen mutual trust), matching Option 3."
      }
    ]
  }
}

with open(OUTPUT_FILE, "w", encoding="utf-8") as fp:
    json.dump(w6d7, fp, ensure_ascii=False, indent=2)

print(f"Saved {OUTPUT_FILE} successfully!")
