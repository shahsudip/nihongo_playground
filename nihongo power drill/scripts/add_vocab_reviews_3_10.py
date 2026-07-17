import json
import os

file_path = "D:/sudip_software/nihongo_playground/nihongo power drill/power_drill_data.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

reviews = [
    {
        "id": "vocab-review-3",
        "title": "集中トレーニング ③",
        "description": "カタカナ語",
        "questions": [
            {
                "question": "イタリア料理のレストランで（　　）しています。",
                "options": ["アルバイト", "ボランティア"],
                "correctIndex": 0
            },
            {
                "question": "カメラの充電をしたいんですが、この部屋の（　　）はどこですか。",
                "options": ["スイッチ", "コンセント"],
                "correctIndex": 1
            },
            {
                "question": "お金の問題で（　　）を起こした学生から相談を受けた。",
                "options": ["トラブル", "トラベル"],
                "correctIndex": 0
            },
            {
                "question": "話している途中で、携帯電話の（　　）が切れてしまった。",
                "options": ["エネルギー", "バッテリー"],
                "correctIndex": 1
            },
            {
                "question": "白いハトは、平和の（　　）だ。",
                "options": ["シンボル", "センター"],
                "correctIndex": 0
            },
            {
                "question": "シャツとズボンを洗濯したら、（　　）にかけて、ベランダに干してください。",
                "options": ["ハンガー", "ロッカー"],
                "correctIndex": 0
            },
            {
                "question": "スーパーはとても込んでいて、（　　）には長い列ができていた。",
                "options": ["レジ", "ポスト"],
                "correctIndex": 0
            },
            {
                "question": "ちょっとそこの（　　）を取ってもらえませんか。",
                "options": ["プッシュ", "ティッシュ"],
                "correctIndex": 1
            },
            {
                "question": "外国語を勉強して、多くの人と（　　）をとれるようになりたい。",
                "options": ["メッセージ", "コミュニケーション"],
                "correctIndex": 1
            },
            {
                "question": "夜は部屋の中が見えないように、（　　）を閉めたほうがいい。",
                "options": ["カーテン", "シャッター"],
                "correctIndex": 0
            }
        ]
    },
    {
        "id": "vocab-review-4",
        "title": "集中トレーニング ④",
        "description": "擬音語・擬態語",
        "questions": [
            {
                "question": "日本語が（　　）ですね。どれくらい勉強したんですか。",
                "options": ["へらへら", "ぺらぺら"],
                "correctIndex": 1
            },
            {
                "question": "よっぱらって、足が（　　）する。",
                "options": ["ふらふら", "ぶらぶら"],
                "correctIndex": 0
            },
            {
                "question": "彼女はさっきから何を（　　）怒っているのだろう。",
                "options": ["ふんふん", "ぷんぷん"],
                "correctIndex": 1
            },
            {
                "question": "日曜日は何もしないで家で（　　）していた。",
                "options": ["ころころ", "ごろごろ"],
                "correctIndex": 1
            },
            {
                "question": "あの人はいつも（　　）していて、感じがいい人だ。",
                "options": ["にこにこ", "もこもこ"],
                "correctIndex": 0
            },
            {
                "question": "何だか（　　）してるようですが、何かいいことでもあったんですか。",
                "options": ["うきうき", "めきめき"],
                "correctIndex": 0
            },
            {
                "question": "パソコンの調子が悪いと、（　　）する。",
                "options": ["いらいら", "ちくちく"],
                "correctIndex": 0
            },
            {
                "question": "ゆうべは（　　）寝たので、今日は気分がいい。",
                "options": ["くっきり", "ぐっすり"],
                "correctIndex": 1
            },
            {
                "question": "先生はいつも９時（　　）に教室に入ってくる。",
                "options": ["ぎっしり", "ぴったり"],
                "correctIndex": 1
            },
            {
                "question": "間に合ってよかった。（　　）した。",
                "options": ["さっと", "ほっと"],
                "correctIndex": 1
            }
        ]
    },
    {
        "id": "vocab-review-5",
        "title": "集中トレーニング ⑤",
        "description": "慣用句（１）",
        "questions": [
            {
                "question": "卒業式での先生の言葉が、私の（　　）。",
                "options": ["心を打った", "心を込めた"],
                "correctIndex": 0
            },
            {
                "question": "お世話になっている人に、（　　）手紙を書いた。",
                "options": ["心を打って", "心を込めて"],
                "correctIndex": 1
            },
            {
                "question": "沖縄で見た美しい海の風景が、今でも（　　）いる。",
                "options": ["心に残って", "心に残して"],
                "correctIndex": 0
            },
            {
                "question": "少し高かったが、色が（　　）ので、買うことにした。",
                "options": ["気にいった", "気になった"],
                "correctIndex": 0
            },
            {
                "question": "友達の様子が（　　）ので、先生に連絡した。",
                "options": ["気にいった", "気になった"],
                "correctIndex": 1
            },
            {
                "question": "明日は寒くなるそうですから、風邪に（　　）ください。",
                "options": ["気をつけて", "気をつかって"],
                "correctIndex": 0
            },
            {
                "question": "私が足をけがしたとき、友達は（　　）ゆっくり歩いてくれた。",
                "options": ["気をつけて", "気をつかって"],
                "correctIndex": 1
            },
            {
                "question": "隣の部屋から変なにおいがするのに（　　）。",
                "options": ["気がついた", "気をつけた"],
                "correctIndex": 0
            },
            {
                "question": "今日は風が強いから、出かけるのは（　　）。",
                "options": ["気がすまない", "気がすすまない"],
                "correctIndex": 1
            },
            {
                "question": "私は中村さんととても（　　）。",
                "options": ["気が合う", "気がする"],
                "correctIndex": 0
            }
        ]
    },
    {
        "id": "vocab-review-6",
        "title": "集中トレーニング ⑥",
        "description": "慣用句（２）",
        "questions": [
            {
                "question": "母は甘いものに（　　）。",
                "options": ["目がない", "目に入らない"],
                "correctIndex": 0
            },
            {
                "question": "彼は仕事が忙しすぎて、まわりのことは（　　）ようだ。",
                "options": ["目がない", "目に入らない"],
                "correctIndex": 1
            },
            {
                "question": "祖父は（　　）ので、大きい声で話さないと聞こえない。",
                "options": ["耳が痛い", "耳が遠い"],
                "correctIndex": 1
            },
            {
                "question": "リンダさんが急に帰国するといううわさが（　　）。",
                "options": ["耳に入った", "耳に入れた"],
                "correctIndex": 0
            },
            {
                "question": "赤ちゃんは、まわりにあるものを何でも（　　）から、気をつけないといけない。",
                "options": ["口に合う", "口にする"],
                "correctIndex": 1
            },
            {
                "question": "あの人は（　　）から、大切なことは言わないほうがいい。",
                "options": ["口が軽い", "口をきく"],
                "correctIndex": 0
            },
            {
                "question": "仕事が終わったら、飲み会に（　　）つもりだ。",
                "options": ["顔に出る", "顔を出す"],
                "correctIndex": 1
            },
            {
                "question": "妹は思っていることがすぐ（　　）から、うそがつけない。",
                "options": ["顔に出る", "顔を出す"],
                "correctIndex": 0
            },
            {
                "question": "彼女のことが心配で、明日の試験勉強が（　　）。",
                "options": ["手につかない", "身につかない"],
                "correctIndex": 0
            },
            {
                "question": "ほしい本がなかなか（　　）。",
                "options": ["手に入らない", "手に入れない"],
                "correctIndex": 0
            }
        ]
    },
    {
        "id": "vocab-review-7",
        "title": "集中トレーニング ⑦",
        "description": "敬語（１）",
        "questions": [
            {
                "question": "あの、隣に住んでいる（　　）ですが、ちょっとよろしいでしょうか。",
                "options": ["人", "者"],
                "correctIndex": 1
            },
            {
                "question": "（　　）ありがとうございます。Aカンパニーでございます。",
                "options": ["お電話", "ご電話"],
                "correctIndex": 0
            },
            {
                "question": "少し（　　）。",
                "options": ["お待ちいただきますか", "お待ちいただけますか"],
                "correctIndex": 1
            },
            {
                "question": "お客様、私がお荷物を（　　）。",
                "options": ["お持ちします", "お持ちになります"],
                "correctIndex": 0
            },
            {
                "question": "これ、よかったら（　　）ください。",
                "options": ["いただいて", "召し上がって"],
                "correctIndex": 1
            },
            {
                "question": "ここに、お名前を（　　）ください。",
                "options": ["お書き", "お書きして"],
                "correctIndex": 0
            },
            {
                "question": "社長、この資料を（　　）。",
                "options": ["拝見されましたか", "ご覧になりましたか"],
                "correctIndex": 1
            },
            {
                "question": "３時ごろ、先生の研究室に（　　）よろしいでしょうか。",
                "options": ["参っても", "伺っても"],
                "correctIndex": 1
            },
            {
                "question": "いろいろ（　　）、ありがとうございました。",
                "options": ["お教えになって", "教えてくださって"],
                "correctIndex": 1
            },
            {
                "question": "課長はこの件について、（　　）。",
                "options": ["ご存じですか", "存じていらっしゃいますか"],
                "correctIndex": 0
            }
        ]
    },
    {
        "id": "vocab-review-8",
        "title": "集中トレーニング ⑧",
        "description": "敬語（２）",
        "questions": [
            {
                "question": "（　　）はお決まりでしょうか。",
                "options": ["お注文", "ご注文"],
                "correctIndex": 1
            },
            {
                "question": "お帰りになるときは、かさを（　　）。",
                "options": ["お忘れなく", "お忘れないで"],
                "correctIndex": 0
            },
            {
                "question": "社長は、それでいいと（　　）。",
                "options": ["申されました", "おっしゃいました"],
                "correctIndex": 1
            },
            {
                "question": "部長、何を（　　）。",
                "options": ["いただかれますか", "お飲みになりますか"],
                "correctIndex": 1
            },
            {
                "question": "伊藤さんには本当に（　　）。",
                "options": ["お世話になりました", "お世話していただきました"],
                "correctIndex": 0
            },
            {
                "question": "どなたでも（　　）いただけます。",
                "options": ["ご参加", "ご参加して"],
                "correctIndex": 0
            },
            {
                "question": "ご迷惑を（　　）、申しわけございません。",
                "options": ["おかけして", "かけられて"],
                "correctIndex": 0
            },
            {
                "question": "お忙しいところ申しわけありませんが、（　　）、明日までにご返信ください。",
                "options": ["できれば", "よろしかったら"],
                "correctIndex": 0
            },
            {
                "question": "すみません、お手洗いを（　　）よろしいでしょうか。",
                "options": ["お貸ししても", "お借りしても"],
                "correctIndex": 1
            },
            {
                "question": "ぜひ、当店へ（　　）ください。お待ちしています。",
                "options": ["お来て", "お越し"],
                "correctIndex": 1
            }
        ]
    },
    {
        "id": "vocab-review-9",
        "title": "集中トレーニング ⑨",
        "description": "助数詞",
        "questions": [
            {
                "question": "このくつ下は、５（　　）で1,000円です。",
                "options": ["足", "本"],
                "correctIndex": 0
            },
            {
                "question": "この動物園には、パンダが１（　　）もいなくなってしまった。",
                "options": ["頭", "匹"],
                "correctIndex": 0
            },
            {
                "question": "鈴木さんは猫が大好きで、家で８（　　）も飼っているそうだ。",
                "options": ["頭", "匹"],
                "correctIndex": 1
            },
            {
                "question": "神社に行くには、ここから132（　　）もの階段を上らなければならない。",
                "options": ["階", "段"],
                "correctIndex": 1
            },
            {
                "question": "この地域の中学校４（　　）が集まって、クラシックの演奏会を開いた。",
                "options": ["学", "校"],
                "correctIndex": 1
            },
            {
                "question": "毎朝、コップ１（　　）の牛乳を飲むようにしている。",
                "options": ["杯", "本"],
                "correctIndex": 0
            },
            {
                "question": "このCDには、人気歌手の代表的な歌が20（　　）も入っている。",
                "options": ["歌", "曲"],
                "correctIndex": 1
            },
            {
                "question": "東京都内では、昨日一日で100（　　）以上の交通事故が起きた。",
                "options": ["回", "件"],
                "correctIndex": 1
            },
            {
                "question": "そのプレゼントには、全国から約一万（　　）もの応募はがきが届いた。",
                "options": ["通", "枚"],
                "correctIndex": 0
            },
            {
                "question": "小林さんの家は、あの角を曲がって２（　　）目の赤い屋根の家です。",
                "options": ["軒", "宅"],
                "correctIndex": 0
            }
        ]
    },
    {
        "id": "vocab-review-10",
        "title": "集中トレーニング ⑩",
        "description": "あいさつの表現",
        "questions": [
            {
                "question": "先輩、今まで本当に（　　）。",
                "options": ["お世話になりました", "お世話していただきました"],
                "correctIndex": 0
            },
            {
                "question": "Ａ：熱があるようなので、お先に失礼します。\nＢ：大丈夫ですか。（　　）。",
                "options": ["お大事で", "お大事に"],
                "correctIndex": 1
            },
            {
                "question": "Ａ：来週、国へ帰ることになったんです。\nＢ：それは急ですね。どうぞ（　　）。",
                "options": ["お元気で", "お元気に"],
                "correctIndex": 0
            },
            {
                "question": "ご結婚おめでとうございます。どうぞ（　　）。",
                "options": ["お幸せで", "お幸せに"],
                "correctIndex": 1
            },
            {
                "question": "―12月の終わりごろに―\nＡ：次に会うのは新年ですね。\nＢ：ええ、そうですね。（　　）。",
                "options": ["よいお年で", "よいお年を"],
                "correctIndex": 1
            },
            {
                "question": "―玄関で―\nＡ：どうぞお入りください。\nＢ：（　　）。",
                "options": ["おじゃまです", "おじゃまします"],
                "correctIndex": 1
            },
            {
                "question": "Ａ：これ、どうぞ召し上がってください。\nＢ：すみません。じゃ（　　）。",
                "options": ["遠慮なく", "遠慮なくて"],
                "correctIndex": 0
            },
            {
                "question": "Ａ：ビールがいいですか。ワインもウイスキーも、何でもありますよ。\nＢ：今日は車で来たので、（　　）。",
                "options": ["ご遠慮なく", "おかまいなく"],
                "correctIndex": 1
            },
            {
                "question": "―面接で―\nＡ：次の方、どうぞ。\nＢ：（　　）。",
                "options": ["失礼します", "失礼しました"],
                "correctIndex": 0
            },
            {
                "question": "先生：ジョンさん、大学合格おめでとう！\nジョン：ありがとうございます。先生の（　　）。",
                "options": ["おかげです", "おかげさまです"],
                "correctIndex": 0
            }
        ]
    }
]

# Check existing and remove them or just append if they are missing
existing_ids = [c["id"] for c in data["chapters"]]

for rev in reviews:
    if rev["id"] not in existing_ids:
        data["chapters"].append(rev)
    else:
        # replace
        idx = existing_ids.index(rev["id"])
        data["chapters"][idx] = rev

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Added reviews 3-10 to JSON.")
