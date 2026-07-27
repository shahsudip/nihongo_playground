import json
import os

data = [
    {
        "file": "174_1.json",
        "story_number": 1,
        "japanese_text": "近所の公園の桜の<u>つぼみ</u>が日に日に<u>著しく</u>大きくなり、春の<u>兆し</u>が見られるようになった。感染症対策のため<u>見合わせて</u>いた花見が<u>じきに</u>できると思うと、うれしい。",
        "english_translation": "The buds on the cherry trees in my neighborhood park are getting significantly bigger day by day: a sign of spring. It makes me happy to think that we will soon be able to enjoy cherry blossom viewing, which we had to postpone due to infection control measures.",
        "words": [
            {"id": "1204", "k": "つぼみ", "f": "つぼみ", "e": "bud"},
            {"id": "1205", "k": "著しい", "f": "いちじるしい", "e": "significant"},
            {"id": "1206", "k": "兆し", "f": "きざし", "e": "sign"},
            {"id": "1207", "k": "見合わせる", "f": "みあわせる", "e": "postpone, suspend"},
            {"id": "1208", "k": "じき(に)", "f": "じき(に)", "e": "right away, soon"}
        ]
    },
    {
        "file": "175_1.json",
        "story_number": 2,
        "japanese_text": "雪が<u>舞う</u>季節になると<u>悩ましい</u>のは、窓ガラスいっぱいの<u>水滴</u>だ。<u>とりわけ</u>子ども部屋がひどく、<u>時折</u>窓を開けても結露してしまう。",
        "english_translation": "When the snow starts swirling around, the most annoying thing is the droplets of water that cover form on the window panes. The children's rooms are particularly bad, and even if I open the window now and again, condensation forms.",
        "words": [
            {"id": "1209", "k": "舞う", "f": "まう", "e": "flutter, swirl"},
            {"id": "1210", "k": "悩ましい", "f": "なやましい", "e": "annoying"},
            {"id": "1211", "k": "水滴", "f": "すいてき", "e": "droplet"},
            {"id": "1212", "k": "とりわけ", "f": "とりわけ", "e": "particularly"},
            {"id": "1213", "k": "時折", "f": "ときおり", "e": "occasionally, now and again"}
        ]
    },
    {
        "file": "175_2.json",
        "story_number": 3,
        "japanese_text": "夕方、西の空に<u>辛うじて</u><u>三日月</u>を見つけた。見つけたら良いことがあると聞いたことがあるので、<u>なんだか</u><u>テンション</u>が高くなった。",
        "english_translation": "In the evening, I just managed to spot a crescent moon in the western sky. I'd heard that seeing it would bring good fortune, so I felt a little excitement.",
        "words": [
            {"id": "1214", "k": "辛うじて", "f": "かろうじて", "e": "barely, just"},
            {"id": "1215", "k": "三日月", "f": "みかづき", "e": "crescent moon"},
            {"id": "1216", "k": "なんだか", "f": "なんだか", "e": "somewhat, a little"},
            {"id": "1217", "k": "テンション", "f": "テンション", "e": "excitement, tension"}
        ]
    },
    {
        "file": "176_1.json",
        "story_number": 4,
        "japanese_text": "私の住む町は<u>海抜</u>ゼロメートルのところにある。<u>異常気象</u>のせいで<u>予期</u>しない洪水被害が起きるかもしれないので、町の人々は前もって準備し、いつでも逃げられる<u>態勢</u>をとっている。",
        "english_translation": "My town is located at zero meters above sea level. Due to the possibility of unexpected flooding caused by extreme weather conditions, people in my town are prepared and ready to evacuate at any time.",
        "words": [
            {"id": "1218", "k": "海抜", "f": "かいばつ", "e": "altitude, above sea level"},
            {"id": "1219", "k": "異常気象", "f": "いじょうきしょう", "e": "extreme weather conditions"},
            {"id": "1220", "k": "気象", "f": "きしょう", "e": "weather"},
            {"id": "1221", "k": "予期[する]", "f": "よき[する]", "e": "forecast, expect"},
            {"id": "1222", "k": "態勢", "f": "たいせい", "e": "attitude, preparation"}
        ]
    },
    {
        "file": "176_2.json",
        "story_number": 5,
        "japanese_text": "先日、雨の中父が車で事故を起こした。父は昔から<u>至って</u>健康だが、<u>歳月</u>とともに年老いているのだと実感した。高齢者の運転が<u>一概に</u>危険だとは言えないが、せめて<u>荒天</u>時は運転を<u>慎む</u>ように提案しようと思う。",
        "english_translation": "The other day, in rainy conditions, my father had a car accident. My father has always been exceedingly healthy, but it made me realize that he is getting older as the years pass. I can't say unconditionally that driving is dangerous for the elderly, but I hope at least that he refrains from driving in stormy weather.",
        "words": [
            {"id": "1223", "k": "至って", "f": "いたって", "e": "exceedingly, extremely"},
            {"id": "1224", "k": "歳月", "f": "さいげつ", "e": "the years, time"},
            {"id": "1225", "k": "一概に～ない", "f": "いちがいに～ない", "e": "not unconditionally"},
            {"id": "1226", "k": "荒天", "f": "こうてん", "e": "stormy weather"},
            {"id": "1227", "k": "慎む", "f": "つつむ", "e": "refrain from"}
        ]
    },
    {
        "file": "177_1.json",
        "story_number": 6,
        "japanese_text": "<u>雨雲</u>が本州南岸に<u>停滞</u>し、私が住む<u>内陸</u>部でも大雨が降った。そのため、近所の川が<u>氾濫</u>し、<u>救援</u>が行われているが、<u>依然</u>５人の<u>安否</u>が分かっていない。今後も<u>警戒</u>が必要だ。",
        "english_translation": "After rain clouds piled up on the southern coast of Honshu, heavy rain fell in the inland area where I live. As a result, a local river overflowed, and although rescue efforts are underway, the safety of five people is still unknown. We must continue to be vigilant.",
        "words": [
            {"id": "1228", "k": "雨雲", "f": "あまぐも", "e": "rain cloud"},
            {"id": "1229", "k": "停滞[する]", "f": "ていたい[する]", "e": "stagnation, pile up"},
            {"id": "1230", "k": "内陸", "f": "ないりく", "e": "inland"},
            {"id": "1231", "k": "氾濫[する]", "f": "はんらん[する]", "e": "overflowing, overflow"},
            {"id": "1232", "k": "救援[する]", "f": "きゅうえん[する]", "e": "rescue, rescue"},
            {"id": "1233", "k": "依然", "f": "いぜん", "e": "still"},
            {"id": "1234", "k": "安否", "f": "あんぴ", "e": "safety, wellbeing"},
            {"id": "1235", "k": "警戒[する]", "f": "けいかい[する]", "e": "caution, be vigilant"}
        ]
    },
    {
        "file": "178_1.json",
        "story_number": 7,
        "japanese_text": "<u>すがすがしい</u>５月の夜、家のベランダから空を見ると<u>星座</u>が見えた。<u>何しろ</u><u>天体</u>は好きな<u>領域</u>なので、<u>快い</u>風が吹く中、長時間見つづけた。６月になると<u>雨天</u>が続き、空を見上げるのも難しくなるだろう。",
        "english_translation": "On a crisp May night, I looked at the sky from my balcony and saw constellations. As you know, celestial bodies are a favorite field of mine, so I watched them for a long time as a pleasant breeze was blowing. In June, the rainy weather will be endless and looking up at the sky will be difficult.",
        "words": [
            {"id": "1236", "k": "すがすがしい", "f": "すがすがしい", "e": "bracing, crisp"},
            {"id": "1237", "k": "星座", "f": "せいざ", "e": "constellation"},
            {"id": "1238", "k": "何しろ", "f": "なにしろ", "e": "after all, as you know"},
            {"id": "1239", "k": "天体", "f": "てんたい", "e": "celestial body"},
            {"id": "1240", "k": "領域", "f": "りょういき", "e": "field, territory"},
            {"id": "1241", "k": "快い", "f": "こころよい", "e": "pleasant"},
            {"id": "1242", "k": "雨天", "f": "うてん", "e": "rainy weather"}
        ]
    },
    {
        "file": "178_2.json",
        "story_number": 8,
        "japanese_text": "<u>盆地</u>である京都は、夏は風が通らず気温が高くなる。京都に住んで20年になるが、夏の暑さと<u>生ぬるい</u>風には<u>どうも</u>慣れない。<u>それにしても</u>今日は<u>やけに</u>暑い。",
        "english_translation": "Kyoto, situated in a basin, gets very hot in the summer, and no wind blows. I've lived in Kyoto for 20 years, but somehow I've never gotten used to the summer heat and tepid breezes. Even so, it is still awfully hot today.",
        "words": [
            {"id": "1243", "k": "盆地", "f": "ぼんち", "e": "basin"},
            {"id": "1244", "k": "生ぬるい", "f": "なまぬるい", "e": "tepid"},
            {"id": "1245", "k": "どうも", "f": "どうも", "e": "somehow"},
            {"id": "1246", "k": "それにしても", "f": "それにしても", "e": "even so, nevertheless"},
            {"id": "1247", "k": "やけに", "f": "やけに", "e": "awfully"}
        ]
    },
    {
        "file": "179_1.json",
        "story_number": 9,
        "japanese_text": "<u>近年</u>、ゲリラ豪雨が増加傾向にある。強い雨や雷とともに<u>あられ</u>が降ることもある。車の運転中にあられが降ってきたら、安全な場所に車を止めた方がいい。<u>前方</u>や<u>後方</u>が見えなくなるだけでなく、<u>アクセル</u>を踏むと車が<u>スリップ</u>することがあるので危険だ。",
        "english_translation": "In recent years, sudden downpours have been on the increase. Alongside heavy rain and thunder, sometimes hail also falls. If it starts to hail while you are driving, you should stop your car in a safe place. Not only will you be unable to see what is ahead of or behind you, but your car may slip if you hit the gas pedal, which is dangerous.",
        "words": [
            {"id": "1248", "k": "近年", "f": "きんねん", "e": "recent years, in recent years"},
            {"id": "1249", "k": "あられ", "f": "あられ", "e": "hail, hailstone (up to 5 mm in diameter)"},
            {"id": "1250", "k": "前方", "f": "ぜんぼう", "e": "ahead"},
            {"id": "1251", "k": "後方", "f": "こうほう", "e": "behind"},
            {"id": "1252", "k": "アクセル", "f": "アクセル", "e": "accelerator, gas pedal"},
            {"id": "1253", "k": "スリップ[する]", "f": "スリップ[する]", "e": "slipping, slip"}
        ]
    },
    {
        "file": "180_1.json",
        "story_number": 10,
        "japanese_text": "５月に仕事で<u>赴いた</u>とき、カンボジアは<u>雨季</u>だった。５月の中旬は雨は降らないものの、<u>夕暮れ</u>に<u>稲光</u>が<u>くっきり</u>と見えた。５月の終わりになると<u>猛烈な</u>雨が<u>しょっちゅう</u>降り、そのときには傘をさしても<u>無意味</u>だった。",
        "english_translation": "When I went to Cambodia on business in May, it was the rainy season. In mid-May, it didn't rain, but I could see lightning clearly at dusk. At the end of May, intense rain fell so ceaselessly that using an umbrella was pointless.",
        "words": [
            {"id": "1254", "k": "赴く", "f": "おもむく", "e": "go, head for"},
            {"id": "1255", "k": "雨季", "f": "うき", "e": "rainy season"},
            {"id": "1256", "k": "夕暮れ", "f": "ゆうぐれ", "e": "dusk, twilight"},
            {"id": "1257", "k": "稲光", "f": "いなびかり", "e": "lightning"},
            {"id": "1258", "k": "くっきり(と)", "f": "くっきり(と)", "e": "clearly, distinctly"},
            {"id": "1259", "k": "猛烈な", "f": "もうれつな", "e": "intense"},
            {"id": "1260", "k": "しょっちゅう", "f": "しょっちゅう", "e": "ceaselessly"},
            {"id": "1261", "k": "無意味な", "f": "むいみな", "e": "pointless, useless"}
        ]
    },
    {
        "file": "181_1.json",
        "story_number": 11,
        "japanese_text": "2011年３月11日に<u>マグニチュード</u>９の東日本大震災が起きてから、2023年で12年となった。東北地方は、津波によって<u>原形</u>が分からないほど<u>軒並み</u>建物が<u>破壊</u>されたが、<u>復興</u>へと向かっている。最近では、<u>天災</u>の怖さが忘れられつつあることを<u>危ぶむ</u>声もある。",
        "english_translation": "2023 marks 12 years since the magnitude 9 Great East Japan Earthquake occurred on March 11, 2011. The Tohoku region is on its way to recovery from the tsunami, which destroyed rows of buildings across the city to the point that their original forms were unrecognizable. Recently, some have been apprehensive that we are forgetting our fear of natural disasters.",
        "words": [
            {"id": "1262", "k": "マグニチュード", "f": "マグニチュード", "e": "magnitude"},
            {"id": "1263", "k": "原形", "f": "げんけい", "e": "original form"},
            {"id": "1264", "k": "軒並み", "f": "のきなみ", "e": "row of buildings, across the board"},
            {"id": "1265", "k": "破壊[する]", "f": "はかい[する]", "e": "destruction, destroy"},
            {"id": "1266", "k": "復興[する]", "f": "ふっこう[する]", "e": "recovery, recover"},
            {"id": "1267", "k": "天災", "f": "てんさい", "e": "natural disaster"},
            {"id": "1268", "k": "人災", "f": "じんさい", "e": "human-made disaster"},
            {"id": "1269", "k": "危ぶむ", "f": "あやぶむ", "e": "be apprehensive, have misgivings"}
        ]
    }
]

out_dir = r"D:\sudip_software\nihongo_playground\src\data\tango_n1_raw"

for d in data:
    filepath = os.path.join(out_dir, d["file"])
    out = {
        "is_story": True,
        "story_number": d["story_number"],
        "title": "Topic 15",
        "japanese_text": d["japanese_text"],
        "english_translation": d["english_translation"],
        "annotated_words": []
    }
    
    for w in d["words"]:
        out["annotated_words"].append({
            "word_id": f"n1_{w['id'].zfill(4)}",
            "word_number": int(w["id"]),
            "kanji": w["k"],
            "furigana": w["f"],
            "meaning_en": w["e"]
        })
        
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

print("Done")
