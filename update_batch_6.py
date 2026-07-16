from insert_grammar import insert_grammar

batch_data = [
    {
        "id": "grammar-training-1",
        "title": "集中トレーニング ①",
        "type": "questions-only",
        "description": "助詞（１）",
        "group": "集中トレーニング",
        "passages": [
            {
                "id": "grammar-training-1-mondai1",
                "title": "問題1",
                "questions": [
                    {
                        "id": "gt1-m1-q1",
                        "questionText": "彼の話（　）よれば、そこはとても危ないところらしい。",
                        "options": ["と", "に"],
                        "correctIndex": 1,
                        "explanation": ""
                    },
                    {
                        "id": "gt1-m1-q2",
                        "questionText": "冬のスポーツ（　）いえば、スキーでしょう。",
                        "options": ["を", "と"],
                        "correctIndex": 1,
                        "explanation": ""
                    },
                    {
                        "id": "gt1-m1-q3",
                        "questionText": "出かける母（　）かわって、今日は私が食事の準備をした。",
                        "options": ["に", "が"],
                        "correctIndex": 0,
                        "explanation": ""
                    },
                    {
                        "id": "gt1-m1-q4",
                        "questionText": "町の人（　）とって、この公園はとても大事な場所だ。",
                        "options": ["に", "を"],
                        "correctIndex": 0,
                        "explanation": ""
                    },
                    {
                        "id": "gt1-m1-q5",
                        "questionText": "私は学生時代（　）比べて積極的になったと思う。",
                        "options": ["に", "を"],
                        "correctIndex": 0,
                        "explanation": ""
                    },
                    {
                        "id": "gt1-m1-q6",
                        "questionText": "あの人の結婚（　）対する考え方は、他の人とは違う。",
                        "options": ["が", "に"],
                        "correctIndex": 1,
                        "explanation": ""
                    },
                    {
                        "id": "gt1-m1-q7",
                        "questionText": "入院中の社長（　）かわりに、私がごあいさつに参りました。",
                        "options": ["の", "に"],
                        "correctIndex": 0,
                        "explanation": ""
                    },
                    {
                        "id": "gt1-m1-q8",
                        "questionText": "けが（　）いっても、たいしたことはないので、心配しないでください。",
                        "options": ["に", "と"],
                        "correctIndex": 1,
                        "explanation": ""
                    },
                    {
                        "id": "gt1-m1-q9",
                        "questionText": "中国の歴史（　）関してくわしい人を知りませんか。",
                        "options": ["に", "を"],
                        "correctIndex": 0,
                        "explanation": ""
                    },
                    {
                        "id": "gt1-m1-q10",
                        "questionText": "同じ国でも、地域（　）よって言葉が違う。",
                        "options": ["に", "が"],
                        "correctIndex": 0,
                        "explanation": ""
                    }
                ]
            }
        ]
    },
    {
        "id": "grammar-training-2",
        "title": "集中トレーニング ②",
        "type": "questions-only",
        "description": "助詞（２）",
        "group": "集中トレーニング",
        "passages": [
            {
                "id": "grammar-training-2-mondai1",
                "title": "問題1",
                "questions": [
                    {
                        "id": "gt2-m1-q1",
                        "questionText": "入学式は、午前10時から体育館（　）おいて行われます。",
                        "options": ["に", "で"],
                        "correctIndex": 0,
                        "explanation": ""
                    },
                    {
                        "id": "gt2-m1-q2",
                        "questionText": "この商品は、性別（　）問わず、ご使用になれます。",
                        "options": ["が", "を"],
                        "correctIndex": 1,
                        "explanation": ""
                    },
                    {
                        "id": "gt2-m1-q3",
                        "questionText": "まず、発表を始める（　）あたって、注意点を申しあげます。",
                        "options": ["と", "に"],
                        "correctIndex": 1,
                        "explanation": ""
                    },
                    {
                        "id": "gt2-m1-q4",
                        "questionText": "これは、彼女の小さいころの体験（　）もとにして書かれた小説だ。",
                        "options": ["に", "を"],
                        "correctIndex": 1,
                        "explanation": ""
                    },
                    {
                        "id": "gt2-m1-q5",
                        "questionText": "このドラマは、実際に起こった事件（　）もとづいて作られた。",
                        "options": ["に", "を"],
                        "correctIndex": 0,
                        "explanation": ""
                    },
                    {
                        "id": "gt2-m1-q6",
                        "questionText": "年をとる（　）したがって、疲れやすくなってきた。",
                        "options": ["と", "に"],
                        "correctIndex": 1,
                        "explanation": ""
                    },
                    {
                        "id": "gt2-m1-q7",
                        "questionText": "子どもの教育問題（　）めぐって、夫婦の意見が対立している。",
                        "options": ["に", "を"],
                        "correctIndex": 1,
                        "explanation": ""
                    },
                    {
                        "id": "gt2-m1-q8",
                        "questionText": "この店は、客の希望（　）応じた料理を出してくれる。",
                        "options": ["を", "に"],
                        "correctIndex": 1,
                        "explanation": ""
                    },
                    {
                        "id": "gt2-m1-q9",
                        "questionText": "合格の知らせを聞いて、嬉しさ（　）あまり泣いてしまった。",
                        "options": ["の", "に"],
                        "correctIndex": 0,
                        "explanation": ""
                    },
                    {
                        "id": "gt2-m1-q10",
                        "questionText": "ここにいる人たちのために、心（　）込めて歌おう。",
                        "options": ["に", "を"],
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
