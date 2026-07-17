import sys
import os

sys.path.append(r"D:\sudip_software\nihongo_playground")
from insert_grammar import insert_grammar

batch_data = [
    {
      "id": "grammar-training-6",
      "title": "集中トレーニング ⑥",
      "type": "questions-only",
      "description": "文末表現（２）",
      "group": "Group 2",
      "passages": [
        {
          "id": "grammar-training-6-mondai1",
          "title": "問題1",
          "mondaiHeader": "（　）の中のａとｂのうち、文に合うほうをえらびましょう。",
          "questions": [
            {
              "id": "gt6-m1-q1",
              "questionText": "私は健康のために、油が多い物は食べないように（　）。",
              "options": ["している", "なっている"],
              "correctIndex": 0,
              "explanation": ""
            },
            {
              "id": "gt6-m1-q2",
              "questionText": "ああ忙しい。１日が30時間あったら（　）。",
              "options": ["いいのだ", "いいのに"],
              "correctIndex": 1,
              "explanation": ""
            },
            {
              "id": "gt6-m1-q3",
              "questionText": "もし500万円あったって、私は車は（　）。",
              "options": ["買いたい", "買わない"],
              "correctIndex": 1,
              "explanation": ""
            },
            {
              "id": "gt6-m1-q4",
              "questionText": "急いで行けば、間に合わない（　）。",
              "options": ["こともない", "ことじゃない"],
              "correctIndex": 0,
              "explanation": ""
            },
            {
              "id": "gt6-m1-q5",
              "questionText": "彼には一度も勝ったことがないから、また負けるに（　）。",
              "options": ["決まる", "決まっている"],
              "correctIndex": 1,
              "explanation": ""
            },
            {
              "id": "gt6-m1-q6",
              "questionText": "時間が経つにつれて、だんだん（　）。",
              "options": ["不安だった", "不安になった"],
              "correctIndex": 1,
              "explanation": ""
            },
            {
              "id": "gt6-m1-q7",
              "questionText": "もしかすると、私は来年日本にいない（　）。",
              "options": ["かもしれない", "べきではない"],
              "correctIndex": 0,
              "explanation": ""
            },
            {
              "id": "gt6-m1-q8",
              "questionText": "新製品の情報を他の会社の人に話す（　）。",
              "options": ["わけはない", "わけにはいかない"],
              "correctIndex": 1,
              "explanation": ""
            },
            {
              "id": "gt6-m1-q9",
              "questionText": "台風さえ来なければ、昨日から九州に行くつもり（　）。",
              "options": ["なのに", "だったのに"],
              "correctIndex": 1,
              "explanation": ""
            },
            {
              "id": "gt6-m1-q10",
              "questionText": "遅れてごめんなさい。電車が止まっちゃった（　）。",
              "options": ["からなのだ", "ものだから"],
              "correctIndex": 1,
              "explanation": ""
            }
          ]
        }
      ]
    }
]

if __name__ == "__main__":
    insert_grammar(batch_data)
