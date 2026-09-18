"""
extract_weeks_9_10.py
Extracts Week 9 and Week 10 Listening sections for 全科目攻略JLPT N3.
- Week 9: 課題理解 Task-based comprehension (Day 1 - 5, pp.146-155, tracks N3-11 to N3-40)
- Week 10: ポイント理解 Point comprehension (Day 1 - 5, pp.156-160, tracks N3-41 to N3-70)
Outputs to src/data/zenkamoku_n3/
"""
import sys
import os
import json
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

SRC_DIR = os.path.join('tmp_inspect', 'zenkamoku_n3')
OUT_DATA_DIR = os.path.join('src', 'data', 'zenkamoku_n3')
OUT_IMG_DIR = os.path.join('public', 'images', 'zenkamoku_n3')
os.makedirs(OUT_DATA_DIR, exist_ok=True)
os.makedirs(OUT_IMG_DIR, exist_ok=True)

# 1. Ensure Week 9 illustrations are cropped and saved
CROPS = [
    ('page_147.jpg', (155, 470, 1060, 1565), 'w09_d1_q1.png'),
    ('page_149.jpg', (155, 470, 1060, 1140), 'w09_d2_q1.png'),
    ('page_151.jpg', (160, 475, 1050, 1165), 'w09_d3_q1.png'),
    ('page_153.jpg', (155, 470, 1060, 1155), 'w09_d4_q1.png'),
    ('page_155.jpg', (160, 475, 1050, 1165), 'w09_d5_q1.png'),
]

for src_file, box, out_name in CROPS:
    src_path = os.path.join(SRC_DIR, src_file)
    dst_path = os.path.join(OUT_IMG_DIR, out_name)
    if not os.path.exists(dst_path):
        img = Image.open(src_path)
        crop = img.crop(box)
        crop.save(dst_path, quality=95)
        print(f'Cropped and saved {out_name}')
    else:
        print(f'Image already exists: {out_name}')

# 2. Define data for Week 9 and Week 10
# Load answer keys
with open('scripts/zenkamoku_n3/answer_keys_raw.json', encoding='utf-8') as f:
    answer_keys = json.load(f)

# Week 9 Days
# Day 1: pp.146-147, N3-11 to N3-16
# Day 2: pp.148-149, N3-17 to N3-22
# Day 3: pp.150-151, N3-23 to N3-28
# Day 4: pp.152-153, N3-29 to N3-34
# Day 5: pp.154-155, N3-35 to N3-40

chapters_data = [
    # ==================== WEEK 9 ====================
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w09-d01",
        "week": 9,
        "day": 1,
        "weekTitle": "第9週",
        "dayTitle": "1日目",
        "sectionTitle": "課題理解",
        "sectionTitleEn": "Task-based comprehension",
        "sectionType": "listening_task",
        "pageRef": "pp.146-147",
        "questions": [
            {
                "number": 1,
                "trackId": "N3-11",
                "audioSrc": "/audio/zenkamoku_n3/N3-11.mp3",
                "imageSrc": "/images/zenkamoku_n3/w09_d1_q1.png",
                "options": [
                    "1. ア ウ",
                    "2. ア エ",
                    "3. イ ウ",
                    "4. イ エ"
                ]
            },
            {
                "number": 2,
                "trackId": "N3-12",
                "audioSrc": "/audio/zenkamoku_n3/N3-12.mp3",
                "options": [
                    "1. 火曜日",
                    "2. 水曜日",
                    "3. 木曜日",
                    "4. 金曜日"
                ]
            },
            {
                "number": 3,
                "trackId": "N3-13",
                "audioSrc": "/audio/zenkamoku_n3/N3-13.mp3",
                "options": [
                    "1. きょうかしょを教室に運ぶ",
                    "2. クラスの学生のにんずうをかぞえる",
                    "3. きょうかしょをはこに入れる",
                    "4. つくえを教室に運ぶ"
                ]
            },
            {
                "number": 4,
                "trackId": "N3-14",
                "audioSrc": "/audio/zenkamoku_n3/N3-14.mp3",
                "options": [
                    "1. もうしこみようしを書く",
                    "2. うけつけで しょうめいできるものを見せる",
                    "3. さんかひをはらう",
                    "4. せつめい会にさんかする"
                ]
            },
            {
                "number": 5,
                "trackId": "N3-15",
                "audioSrc": "/audio/zenkamoku_n3/N3-15.mp3",
                "options": [
                    "1. ドレミさんぎょうの社長と話す",
                    "2. かいぎで使うしりょうを作る",
                    "3. ほかの人に仕事をたのむ",
                    "4. お茶とおかしをじゅんびする"
                ]
            },
            {
                "number": 6,
                "trackId": "N3-16",
                "audioSrc": "/audio/zenkamoku_n3/N3-16.mp3",
                "options": [
                    "1. トマトを買いに行く",
                    "2. なべを火にかける",
                    "3. なべにしおを入れる",
                    "4. あじをチェックする"
                ]
            }
        ]
    },
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w09-d02",
        "week": 9,
        "day": 2,
        "weekTitle": "第9週",
        "dayTitle": "2日目",
        "sectionTitle": "課題理解",
        "sectionTitleEn": "Task-based comprehension",
        "sectionType": "listening_task",
        "pageRef": "pp.148-149",
        "questions": [
            {
                "number": 1,
                "trackId": "N3-17",
                "audioSrc": "/audio/zenkamoku_n3/N3-17.mp3",
                "imageSrc": "/images/zenkamoku_n3/w09_d2_q1.png",
                "options": [
                    "1. ア イ",
                    "2. ア ウ",
                    "3. イ エ",
                    "4. イ オ"
                ]
            },
            {
                "number": 2,
                "trackId": "N3-18",
                "audioSrc": "/audio/zenkamoku_n3/N3-18.mp3",
                "options": [
                    "1. じょうけんを かくにんする",
                    "2. もうしこみ用紙をもらう",
                    "3. もうしこみ用紙を送る",
                    "4. 作文を書く"
                ]
            },
            {
                "number": 3,
                "trackId": "N3-19",
                "audioSrc": "/audio/zenkamoku_n3/N3-19.mp3",
                "options": [
                    "1. つくえといすをならべる",
                    "2. しりょうの いんさつをする",
                    "3. じゅんびの手伝いをよぶ",
                    "4. しゅっせきしゃを せきにあんないする"
                ]
            },
            {
                "number": 4,
                "trackId": "N3-20",
                "audioSrc": "/audio/zenkamoku_n3/N3-20.mp3",
                "options": [
                    "1. がめんをふく",
                    "2. しゅうり会社に電話する",
                    "3. 中のぶひんをクリーニングする",
                    "4. せつめいしょを見る"
                ]
            },
            {
                "number": 5,
                "trackId": "N3-21",
                "audioSrc": "/audio/zenkamoku_n3/N3-21.mp3",
                "options": [
                    "1. 料理をテーブルにはこぶ",
                    "2. 料理を皿に分ける",
                    "3. 飲み物の作り方を習う",
                    "4. テーブルをかたづける"
                ]
            },
            {
                "number": 6,
                "trackId": "N3-22",
                "audioSrc": "/audio/zenkamoku_n3/N3-22.mp3",
                "options": [
                    "1. クラスでアンケートをとる",
                    "2. 先生にこうこくをもらう",
                    "3. 水族館に行くことをていあんする",
                    "4. 夏休みのけいかくを学校に知らせる"
                ]
            }
        ]
    },
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w09-d03",
        "week": 9,
        "day": 3,
        "weekTitle": "第9週",
        "dayTitle": "3日目",
        "sectionTitle": "課題理解",
        "sectionTitleEn": "Task-based comprehension",
        "sectionType": "listening_task",
        "pageRef": "pp.150-151",
        "questions": [
            {
                "number": 1,
                "trackId": "N3-23",
                "audioSrc": "/audio/zenkamoku_n3/N3-23.mp3",
                "imageSrc": "/images/zenkamoku_n3/w09_d3_q1.png",
                "options": [
                    "1. 1",
                    "2. 2",
                    "3. 3",
                    "4. 4"
                ]
            },
            {
                "number": 2,
                "trackId": "N3-24",
                "audioSrc": "/audio/zenkamoku_n3/N3-24.mp3",
                "options": [
                    "1. パンケーキにバナナをのせる",
                    "2. イチゴをれいぞうこから出す",
                    "3. バターを買いに行く",
                    "4. バナナを切る"
                ]
            },
            {
                "number": 3,
                "trackId": "N3-25",
                "audioSrc": "/audio/zenkamoku_n3/N3-25.mp3",
                "options": [
                    "1. コンビニエンスストアでもうしこむ",
                    "2. びじゅつ館のホームページからもうしこむ",
                    "3. ばんぐみのホームページからもうしこむ",
                    "4. びじゅつ館のおみやげ屋でもうしこむ"
                ]
            },
            {
                "number": 4,
                "trackId": "N3-26",
                "audioSrc": "/audio/zenkamoku_n3/N3-26.mp3",
                "options": [
                    "1. 皿をかたづける",
                    "2. テーブルのいちをなおす",
                    "3. きゃくをおいかける",
                    "4. ゆかをそうじする"
                ]
            },
            {
                "number": 5,
                "trackId": "N3-27",
                "audioSrc": "/audio/zenkamoku_n3/N3-27.mp3",
                "options": [
                    "1. 上着を着る",
                    "2. しゅくだいをする",
                    "3. シャワーをあびる",
                    "4. かぜぐすりを飲む"
                ]
            },
            {
                "number": 6,
                "trackId": "N3-28",
                "audioSrc": "/audio/zenkamoku_n3/N3-28.mp3",
                "options": [
                    "1. 写真のまいすうをへらす",
                    "2. チームの人の意見を聞く",
                    "3. 写真を明るくする",
                    "4. カメラマンに電話をする"
                ]
            }
        ]
    },
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w09-d04",
        "week": 9,
        "day": 4,
        "weekTitle": "第9週",
        "dayTitle": "4日目",
        "sectionTitle": "課題理解",
        "sectionTitleEn": "Task-based comprehension",
        "sectionType": "listening_task",
        "pageRef": "pp.152-153",
        "questions": [
            {
                "number": 1,
                "trackId": "N3-29",
                "audioSrc": "/audio/zenkamoku_n3/N3-29.mp3",
                "imageSrc": "/images/zenkamoku_n3/w09_d4_q1.png",
                "options": [
                    "1. ア",
                    "2. イ",
                    "3. ウ",
                    "4. エ"
                ]
            },
            {
                "number": 2,
                "trackId": "N3-30",
                "audioSrc": "/audio/zenkamoku_n3/N3-30.mp3",
                "options": [
                    "1. おかしのセットを作る",
                    "2. ゲームのじゅんびをする",
                    "3. げんかんにジュースをおく",
                    "4. 車ににもつを運ぶ"
                ]
            },
            {
                "number": 3,
                "trackId": "N3-31",
                "audioSrc": "/audio/zenkamoku_n3/N3-31.mp3",
                "options": [
                    "1. いらいしょに入力する",
                    "2. かんりぶに いらいしょを送る",
                    "3. ぶちょうに きょかをもらう",
                    "4. ぶんぼうぐをチェックする"
                ]
            },
            {
                "number": 4,
                "trackId": "N3-32",
                "audioSrc": "/audio/zenkamoku_n3/N3-32.mp3",
                "options": [
                    "1. 6時15分",
                    "2. 6時30分",
                    "3. 6時45分",
                    "4. 7時00分"
                ]
            },
            {
                "number": 5,
                "trackId": "N3-33",
                "audioSrc": "/audio/zenkamoku_n3/N3-33.mp3",
                "options": [
                    "1. 本をふくしま先生にかえす",
                    "2. 本をきむら先生にとどける",
                    "3. もう一度本を読む",
                    "4. ノートにサインする"
                ]
            },
            {
                "number": 6,
                "trackId": "N3-34",
                "audioSrc": "/audio/zenkamoku_n3/N3-34.mp3",
                "options": [
                    "1. カレーをたなにならべる",
                    "2. かたづけをする",
                    "3. ポスターをはる",
                    "4. お茶をじゅんびする"
                ]
            }
        ]
    },
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w09-d05",
        "week": 9,
        "day": 5,
        "weekTitle": "第9週",
        "dayTitle": "5日目",
        "sectionTitle": "課題理解",
        "sectionTitleEn": "Task-based comprehension",
        "sectionType": "listening_task",
        "pageRef": "pp.154-155",
        "questions": [
            {
                "number": 1,
                "trackId": "N3-35",
                "audioSrc": "/audio/zenkamoku_n3/N3-35.mp3",
                "imageSrc": "/images/zenkamoku_n3/w09_d5_q1.png",
                "options": [
                    "1. 1",
                    "2. 2",
                    "3. 3",
                    "4. 4"
                ]
            },
            {
                "number": 2,
                "trackId": "N3-36",
                "audioSrc": "/audio/zenkamoku_n3/N3-36.mp3",
                "options": [
                    "1. 火曜日",
                    "2. 水曜日",
                    "3. 木曜日",
                    "4. 金曜日"
                ]
            },
            {
                "number": 3,
                "trackId": "N3-37",
                "audioSrc": "/audio/zenkamoku_n3/N3-37.mp3",
                "options": [
                    "1. かちょうにメールをする",
                    "2. かちょうにちょくせつ聞きに行く",
                    "3. 女のせんぱいにメールをする",
                    "4. 女のせんぱいに しりょうをわたす"
                ]
            },
            {
                "number": 4,
                "trackId": "N3-38",
                "audioSrc": "/audio/zenkamoku_n3/N3-38.mp3",
                "options": [
                    "1. 自分のレポートをみじかくする",
                    "2. 男の学生のメールを見る",
                    "3. 友だちに早くレポートを出させる",
                    "4. 友だちに てつだいが必要か聞く"
                ]
            },
            {
                "number": 5,
                "trackId": "N3-39",
                "audioSrc": "/audio/zenkamoku_n3/N3-39.mp3",
                "options": [
                    "1. 大人用のすし 6人分",
                    "2. 大人用のすし 5人分",
                    "3. 大人用のすし 4人分と子ども用のすし 2人分",
                    "4. 大人用のすし 4人分と子ども用のすし 1人分"
                ]
            },
            {
                "number": 6,
                "trackId": "N3-40",
                "audioSrc": "/audio/zenkamoku_n3/N3-40.mp3",
                "options": [
                    "1. 家族に会いに行く",
                    "2. クッキーを買う",
                    "3. おばあちゃんに電話する",
                    "4. カラオケ教室に行く"
                ]
            }
        ]
    },

    # ==================== WEEK 10 ====================
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w10-d01",
        "week": 10,
        "day": 1,
        "weekTitle": "第10週",
        "dayTitle": "1日目",
        "sectionTitle": "ポイント理解",
        "sectionTitleEn": "Point comprehension",
        "sectionType": "listening_point",
        "pageRef": "p.156",
        "questions": [
            {
                "number": 1,
                "trackId": "N3-41",
                "audioSrc": "/audio/zenkamoku_n3/N3-41.mp3",
                "options": [
                    "1. 食事がおいしくなったこと",
                    "2. ちょきんが できるようになったこと",
                    "3. 気持ちが楽になったこと",
                    "4. けんこうになったこと"
                ]
            },
            {
                "number": 2,
                "trackId": "N3-42",
                "audioSrc": "/audio/zenkamoku_n3/N3-42.mp3",
                "options": [
                    "1. 弟をよぶため",
                    "2. しゃしんを さがすため",
                    "3. 子どもとあそぶため",
                    "4. うえきを おくため"
                ]
            },
            {
                "number": 3,
                "trackId": "N3-43",
                "audioSrc": "/audio/zenkamoku_n3/N3-43.mp3",
                "options": [
                    "1. 車のじこがあったから",
                    "2. タクシーがすすまないから",
                    "3. 道で工事をしているから",
                    "4. 自転車がなかったから"
                ]
            },
            {
                "number": 4,
                "trackId": "N3-44",
                "audioSrc": "/audio/zenkamoku_n3/N3-44.mp3",
                "options": [
                    "1. 自分でいろいろな料理を作ってみる",
                    "2. 料理教室に通う",
                    "3. インターネットのサイトを見る",
                    "4. 会社の人に教えてもらう"
                ]
            },
            {
                "number": 5,
                "trackId": "N3-45",
                "audioSrc": "/audio/zenkamoku_n3/N3-45.mp3",
                "options": [
                    "1. さけによったきゃくが くること",
                    "2. タバコの名前を おぼえなければならないこと",
                    "3. いつも店がいそがしいこと",
                    "4. トイレに行けないときがあること"
                ]
            },
            {
                "number": 6,
                "trackId": "N3-46",
                "audioSrc": "/audio/zenkamoku_n3/N3-46.mp3",
                "options": [
                    "1. 去年のしんこうひょうを見る",
                    "2. ダンス部のメンバーに会いに行く",
                    "3. 先生にそうだんに行く",
                    "4. かいかいしきの後ですることを考える"
                ]
            }
        ]
    },
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w10-d02",
        "week": 10,
        "day": 2,
        "weekTitle": "第10週",
        "dayTitle": "2日目",
        "sectionTitle": "ポイント理解",
        "sectionTitleEn": "Point comprehension",
        "sectionType": "listening_point",
        "pageRef": "p.157",
        "questions": [
            {
                "number": 1,
                "trackId": "N3-47",
                "audioSrc": "/audio/zenkamoku_n3/N3-47.mp3",
                "options": [
                    "1. 一日中よわい雨がふる",
                    "2. 雨がふって風もつよくふく",
                    "3. きおんが上がるがあつくかんじない",
                    "4. 午後3時ごろまで雨がふる"
                ]
            },
            {
                "number": 2,
                "trackId": "N3-48",
                "audioSrc": "/audio/zenkamoku_n3/N3-48.mp3",
                "options": [
                    "1. 先生にほめられたいから",
                    "2. 大学生とあそびたいから",
                    "3. 会話のれんしゅうが できるから",
                    "4. チンさんの料理が食べられるから"
                ]
            },
            {
                "number": 3,
                "trackId": "N3-49",
                "audioSrc": "/audio/zenkamoku_n3/N3-49.mp3",
                "options": [
                    "1. アルバイトの日がかえられなかったから",
                    "2. 母のおみまいに行くから",
                    "3. 母のたいいんの てつづきに行くから",
                    "4. 母が家でゆっくりできるように じゅんびするから"
                ]
            },
            {
                "number": 4,
                "trackId": "N3-50",
                "audioSrc": "/audio/zenkamoku_n3/N3-50.mp3",
                "options": [
                    "1. けいごがうまく使えないこと",
                    "2. 仕事のおぼえが悪いこと",
                    "3. 自分の意見を言わないこと",
                    "4. 仕事中にしゃべりすぎること"
                ]
            },
            {
                "number": 5,
                "trackId": "N3-51",
                "audioSrc": "/audio/zenkamoku_n3/N3-51.mp3",
                "options": [
                    "1. 本を借りるため",
                    "2. 勉強するため",
                    "3. 本をかえすため",
                    "4. はたらくため"
                ]
            },
            {
                "number": 6,
                "trackId": "N3-52",
                "audioSrc": "/audio/zenkamoku_n3/N3-52.mp3",
                "options": [
                    "1. 3000円",
                    "2. 2500円",
                    "3. 2250円",
                    "4. 2200円"
                ]
            }
        ]
    },
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w10-d03",
        "week": 10,
        "day": 3,
        "weekTitle": "第10週",
        "dayTitle": "3日目",
        "sectionTitle": "ポイント理解",
        "sectionTitleEn": "Point comprehension",
        "sectionType": "listening_point",
        "pageRef": "p.158",
        "questions": [
            {
                "number": 1,
                "trackId": "N3-53",
                "audioSrc": "/audio/zenkamoku_n3/N3-53.mp3",
                "options": [
                    "1. スポーツざっし",
                    "2. ファッションざっし",
                    "3. テレビざっし",
                    "4. マンガざっし"
                ]
            },
            {
                "number": 2,
                "trackId": "N3-54",
                "audioSrc": "/audio/zenkamoku_n3/N3-54.mp3",
                "options": [
                    "1. かべの前",
                    "2. ベンチの後ろ",
                    "3. いけのよこ",
                    "4. まどの近く"
                ]
            },
            {
                "number": 3,
                "trackId": "N3-55",
                "audioSrc": "/audio/zenkamoku_n3/N3-55.mp3",
                "options": [
                    "1. 日本と韓国",
                    "2. ドイツとフランス",
                    "3. 日本とスペイン",
                    "4. ブラジルとイタリア"
                ]
            },
            {
                "number": 4,
                "trackId": "N3-56",
                "audioSrc": "/audio/zenkamoku_n3/N3-56.mp3",
                "options": [
                    "1. おとなしい子ども",
                    "2. みんなの中心にいる子ども",
                    "3. スポーツがだいすきな子ども",
                    "4. よくなく子ども"
                ]
            },
            {
                "number": 5,
                "trackId": "N3-57",
                "audioSrc": "/audio/zenkamoku_n3/N3-57.mp3",
                "options": [
                    "1. かんじの問題集",
                    "2. 作文",
                    "3. ぶんぽうのプリント",
                    "4. テストの見なおし"
                ]
            },
            {
                "number": 6,
                "trackId": "N3-58",
                "audioSrc": "/audio/zenkamoku_n3/N3-58.mp3",
                "options": [
                    "1. にほんしゅがおいしいから",
                    "2. 社長でも食べられるお肉があるから",
                    "3. 社長が食べたいと言っているものがあるから",
                    "4. どんなものでも用意できるから"
                ]
            }
        ]
    },
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w10-d04",
        "week": 10,
        "day": 4,
        "weekTitle": "第10週",
        "dayTitle": "4日目",
        "sectionTitle": "ポイント理解",
        "sectionTitleEn": "Point comprehension",
        "sectionType": "listening_point",
        "pageRef": "p.159",
        "questions": [
            {
                "number": 1,
                "trackId": "N3-59",
                "audioSrc": "/audio/zenkamoku_n3/N3-59.mp3",
                "options": [
                    "1. 時計",
                    "2. けいたい電話",
                    "3. じしょ",
                    "4. 飲み物"
                ]
            },
            {
                "number": 2,
                "trackId": "N3-60",
                "audioSrc": "/audio/zenkamoku_n3/N3-60.mp3",
                "options": [
                    "1. 日にやけて はだがいたくなるから",
                    "2. むしが多くて さされるとはれるから",
                    "3. 山を歩くとつかれるから",
                    "4. さむいのがにがてだから"
                ]
            },
            {
                "number": 3,
                "trackId": "N3-61",
                "audioSrc": "/audio/zenkamoku_n3/N3-61.mp3",
                "options": [
                    "1. りゅうがくするため",
                    "2. しゅうしょくのため",
                    "3. きゃくと話すため",
                    "4. こいびとを作るため"
                ]
            },
            {
                "number": 4,
                "trackId": "N3-62",
                "audioSrc": "/audio/zenkamoku_n3/N3-62.mp3",
                "options": [
                    "1. 肉料理とスープ",
                    "2. 肉料理とサラダ",
                    "3. 魚料理とスープ",
                    "4. 魚料理とサラダ"
                ]
            },
            {
                "number": 5,
                "trackId": "N3-63",
                "audioSrc": "/audio/zenkamoku_n3/N3-63.mp3",
                "options": [
                    "1. 出かけるとき雨がふっていたから",
                    "2. ふとんを かわかしていたから",
                    "3. 雨にぬれておふろに入っていたから",
                    "4. ごみをとりに来てもらったから"
                ]
            },
            {
                "number": 6,
                "trackId": "N3-64",
                "audioSrc": "/audio/zenkamoku_n3/N3-64.mp3",
                "options": [
                    "1. 書きやすいから",
                    "2. 先生にもらったから",
                    "3. 高かったから",
                    "4. もう売っていないから"
                ]
            }
        ]
    },
    {
        "bookId": "zenkamoku-n3-best-workbook",
        "chapterId": "w10-d05",
        "week": 10,
        "day": 5,
        "weekTitle": "第10週",
        "dayTitle": "5日目",
        "sectionTitle": "ポイント理解",
        "sectionTitleEn": "Point comprehension",
        "sectionType": "listening_point",
        "pageRef": "p.160",
        "questions": [
            {
                "number": 1,
                "trackId": "N3-65",
                "audioSrc": "/audio/zenkamoku_n3/N3-65.mp3",
                "options": [
                    "1. やいたり にたりしていないから",
                    "2. あじがすきではないから",
                    "3. 食べすぎてあきたから",
                    "4. ダイエットをしているから"
                ]
            },
            {
                "number": 2,
                "trackId": "N3-66",
                "audioSrc": "/audio/zenkamoku_n3/N3-66.mp3",
                "options": [
                    "1. こうつうじこが あったから",
                    "2. けいさつがはんにんを つかまえていたから",
                    "3. 人気のはいゆうが来ていたから",
                    "4. ドラマのさつえいをしていたから"
                ]
            },
            {
                "number": 3,
                "trackId": "N3-67",
                "audioSrc": "/audio/zenkamoku_n3/N3-67.mp3",
                "options": [
                    "1. 友だちを作りたいから",
                    "2. とざんを したことがないから",
                    "3. 体力にじしんがあるから",
                    "4. おいしいおさけが飲みたいから"
                ]
            },
            {
                "number": 4,
                "trackId": "N3-68",
                "audioSrc": "/audio/zenkamoku_n3/N3-68.mp3",
                "options": [
                    "1. しずかな音楽",
                    "2. アニメの音楽",
                    "3. クラシック音楽",
                    "4. 外国語の音楽"
                ]
            },
            {
                "number": 5,
                "trackId": "N3-69",
                "audioSrc": "/audio/zenkamoku_n3/N3-69.mp3",
                "options": [
                    "1. あつすぎるから",
                    "2. 試験勉強をしていたから",
                    "3. ゲームをしていたから",
                    "4. テレビを見ていたから"
                ]
            },
            {
                "number": 6,
                "trackId": "N3-70",
                "audioSrc": "/audio/zenkamoku_n3/N3-70.mp3",
                "options": [
                    "1. 月曜日",
                    "2. 火曜日",
                    "3. 水曜日",
                    "4. 金曜日"
                ]
            }
        ]
    }
]

# 3. Attach answer keys from answer_keys_raw.json and write files
for ch in chapters_data:
    week_key = f"第{ch['week']}週_{ch['day']}日目"
    sec_key = ch['sectionTitle']
    ans_map = answer_keys.get(week_key, {}).get(sec_key, {}).get('answers', {})
    
    if not ans_map:
        raise ValueError(f"Could not find answer keys for {week_key} {sec_key}")
    
    for q in ch['questions']:
        q_num = str(q['number'])
        if q_num not in ans_map:
            raise ValueError(f"Missing answer for {ch['chapterId']} Q{q_num}")
        corr = ans_map[q_num]
        q['correct'] = corr
        q['correctOption'] = q['options'][corr - 1]
    
    filename = f"{ch['chapterId']}.json"
    out_path = os.path.join(OUT_DATA_DIR, filename)
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(ch, f, ensure_ascii=False, indent=2)
    print(f'✅ Wrote {out_path} ({len(ch["questions"])} questions)')

print('\n🎉 All 10 files successfully generated!')
