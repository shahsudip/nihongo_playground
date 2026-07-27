import json
import os

out_dir = r"D:\sudip_software\nihongo_playground\src\data\tango_n1_raw"

data = [
    {
        "file": "338_1.json",
        "story_number": 1,
        "japanese_text": "私たちの生活にとって電気が<u>不可欠な</u>ものであることは<u>もはや</u><u>否めない</u>が、<u>震災</u>を<u>教訓</u>にせず、このまま<u>原子力発電</u>を続けてもよいのだろうか。",
        "english_translation": "We can no longer deny that electricity is essential to our lives, but can we continue with nuclear power generation without learning our lesson from the earthquake?",
        "words": [
            {"id": "2444", "k": "不可欠な", "f": "ふかけつ", "e": "essential, indispensable"},
            {"id": "2445", "k": "もはや", "f": "もはや", "e": "no longer (used with negative)"},
            {"id": "2446", "k": "否めない", "f": "いなめない", "e": "undeniable"},
            {"id": "2447", "k": "震災", "f": "しんさい", "e": "earthquake"},
            {"id": "2448", "k": "教訓", "f": "きょうくん", "e": "lesson"},
            {"id": "2449", "k": "原子力発電", "f": "げんしりょくはつでん", "e": "nuclear power generation"},
            {"id": "2450", "k": "原子力", "f": "げんしりょく", "e": "nuclear power"}
        ]
    },
    {
        "file": "339_1.json",
        "story_number": 2,
        "japanese_text": "日本の<u>世界遺産</u>は西日本を中心に<u>分布して</u>おり、特に近畿<u>圏</u>に多い。",
        "english_translation": "Japan's World Heritage sites are distributed mainly across western Japan, especially the Kinki region.",
        "words": [
            {"id": "2451", "k": "世界遺産", "f": "せかいいさん", "e": "World Heritage"},
            {"id": "2452", "k": "分布[する]", "f": "ぶんぷ", "e": "distribution, distribute"},
            {"id": "2453", "k": "～圏", "f": "けん", "e": "region"}
        ]
    },
    {
        "file": "339_2.json",
        "story_number": 3,
        "japanese_text": "その島は<u>溶岩</u>によってできている島で、約３キロ平方メートルほどあると<u>推定される</u>。しかし、今もその島は<u>緩やかに</u>広がり続けており、<u>地形</u>が明らかになっていない。そのため、<u>領土</u>問題につながることも<u>予想される</u>。",
        "english_translation": "Formed of lava, the island is estimated to be about three square kilometers in area. However, the island is still gradually expanding and its topography is not yet clear. For this reason, territorial disputes are anticipated.",
        "words": [
            {"id": "2454", "k": "溶岩", "f": "ようがん", "e": "lava"},
            {"id": "2455", "k": "推定[する]", "f": "すいてい", "e": "estimation, estimate"},
            {"id": "2456", "k": "緩やかな", "f": "ゆるやかな", "e": "gentle, gradual"},
            {"id": "2457", "k": "地形", "f": "ちけい", "e": "topography"},
            {"id": "2458", "k": "領土", "f": "りょうど", "e": "territory"},
            {"id": "2459", "k": "予想[する]", "f": "よそう", "e": "prediction, anticipate"}
        ]
    },
    {
        "file": "340_1.json",
        "story_number": 4,
        "japanese_text": "2020年、<u>おびただしい</u>数の石が<u>海峡</u>に<u>漂う</u>という<u>事例</u>が発生した。その石は火山噴火で生まれたもので、とても軽くて小さい。そのため、魚が飲み込んでしまうこともあり、<u>沿岸</u>部<u>一帯</u>の生き物にも<u>有害な</u>ものとなった。",
        "english_translation": "In 2020, an incident occurred when countless stones drifted into the strait. Produced by volcanic eruptions, the stones were very light and small. Because of this, they could be swallowed by fish, and were harmful to creatures throughout the coastal area.",
        "words": [
            {"id": "2460", "k": "おびただしい", "f": "おびただしい", "e": "countless, innumerable"},
            {"id": "2461", "k": "海峡", "f": "かいきょう", "e": "strait"},
            {"id": "2462", "k": "漂う", "f": "ただよう", "e": "drift, float"},
            {"id": "2463", "k": "事例", "f": "じれい", "e": "case, incident"},
            {"id": "2464", "k": "沿岸", "f": "えんがん", "e": "coast"},
            {"id": "2465", "k": "一帯", "f": "いったい", "e": "all over, throughout"},
            {"id": "2466", "k": "有害な", "f": "ゆうがいな", "e": "harmful"},
            {"id": "2467", "k": "無害な", "f": "むがいな", "e": "harmless"}
        ]
    },
    {
        "file": "340_2.json",
        "story_number": 5,
        "japanese_text": "<u>山岳</u>部で<u>土砂崩れ</u>があった。<u>岩石</u>も落下したために道が塞がれ、<u>被災者</u>は孤立してしまった。",
        "english_translation": "There was a landslide in a mountainous area. Rocks also fell, blocking the roads and isolating victims.",
        "words": [
            {"id": "2468", "k": "山岳", "f": "さんがく", "e": "mountain"},
            {"id": "2469", "k": "土砂崩れ", "f": "どしゃくずれ", "e": "landslide"},
            {"id": "2470", "k": "土砂", "f": "どしゃ", "e": "earth and sand, soil"},
            {"id": "2471", "k": "岩石", "f": "がんせき", "e": "rocks"},
            {"id": "2472", "k": "被災者", "f": "ひさいしゃ", "e": "victim"},
            {"id": "2473", "k": "被災[する]", "f": "ひさい", "e": "affliction, suffer"}
        ]
    },
    {
        "file": "341_1.json",
        "story_number": 6,
        "japanese_text": "近所の<u>河川敷</u>が部分的に<u>閉鎖される</u>ことになった。どうやら改修が必要らしい。そこは、<u>四季折々</u>の景色が楽しめて好きだったのだが、先日見に行ったら<u>がっちりと</u>ロープが張られて、もう入れないようになっていた。",
        "english_translation": "The riverbed in my neighborhood is going to be partially closed. Apparently, it needs to be repaired. I liked it there because I enjoy watching the scenery change from season to season, but when I went to check it out the other day, it was roped off so tightly that I couldn't get in.",
        "words": [
            {"id": "2474", "k": "河川敷", "f": "かせんしき", "e": "riverbed"},
            {"id": "2475", "k": "河川", "f": "かせん", "e": "river"},
            {"id": "2476", "k": "閉鎖[する]", "f": "へいさ", "e": "closure, close"},
            {"id": "2477", "k": "四季折々", "f": "しきおりおり", "e": "season to season"},
            {"id": "2478", "k": "折々", "f": "おりおり", "e": "time to time"},
            {"id": "2479", "k": "がっちり(と)", "f": "がっちり(と)", "e": "firmly, tightly"}
        ]
    },
    {
        "file": "342_1.json",
        "story_number": 7,
        "japanese_text": "<u>原油</u>の値段が上がり、ガソリンが高騰しているから、経費<u>削減</u>のために社用車の利用を<u>規制し</u>たいと考えている。",
        "english_translation": "Since the price of crude oil and gasoline are soaring, I'm thinking of regulating the use of company cars to cut costs.",
        "words": [
            {"id": "2480", "k": "原油", "f": "げんゆ", "e": "crude oil"},
            {"id": "2481", "k": "削減[する]", "f": "さくげん", "e": "reduction, cut"},
            {"id": "2482", "k": "規制[する]", "f": "きせい", "e": "regulation, regulate"}
        ]
    },
    {
        "file": "342_2.json",
        "story_number": 8,
        "japanese_text": "この辺りは、大きな<u>運河</u>があり、空気も<u>清らかだ</u>。インフラは、首都圏に比べて<u>貧弱だ</u>と思うが、<u>ありのまま</u>の自然があって心地よい。",
        "english_translation": "This area has a large canal and the air is clean. The infrastructure is poor compared to metropolitan areas, but it's pleasant because of the unspoiled natural setting.",
        "words": [
            {"id": "2483", "k": "運河", "f": "うんが", "e": "canal"},
            {"id": "2484", "k": "清らかな", "f": "きよらかな", "e": "clean, pure"},
            {"id": "2485", "k": "清い", "f": "きよい", "e": "clear"},
            {"id": "2486", "k": "貧弱な", "f": "ひんじゃくな", "e": "poor"},
            {"id": "2487", "k": "ありのまま", "f": "ありのまま", "e": "unchanged, unspoiled"}
        ]
    },
    {
        "file": "343_1.json",
        "story_number": 9,
        "japanese_text": "世界では、<u>膨大な</u>量の<u>樹々</u>が<u>伐採されて</u>おり、問題となっている。一方で、日本では、樹々が伐採される量が年々減っている。しかし、若い樹々よりも<u>成熟した</u>樹々の方が<u>生態系</u>に有害なこともあるため、日本ではもっと樹々を伐採する必要があるという<u>趣旨</u>の<u>見解</u>が示されている。",
        "english_translation": "Globally, huge numbers of trees are being cut down, which is becoming a problem. In Japan, on the other hand, the amount of trees cut down is decreasing year by year. Some people have a view to the effect that more trees need to be cut down in Japan, because mature trees can be more harmful to the ecosystem than younger trees.",
        "words": [
            {"id": "2488", "k": "膨大な", "f": "ぼうだいな", "e": "huge, massive"},
            {"id": "2489", "k": "樹々", "f": "きぎ", "e": "trees"},
            {"id": "2490", "k": "伐採[する]", "f": "ばっさい", "e": "logging, cut down"},
            {"id": "2491", "k": "成熟[する]", "f": "せいじゅく", "e": "maturation, mature"},
            {"id": "2492", "k": "生態系", "f": "せいたいけい", "e": "ecosystem"},
            {"id": "2493", "k": "生態", "f": "せいたい", "e": "ecology"},
            {"id": "2494", "k": "趣旨", "f": "しゅし", "e": "effect, point"},
            {"id": "2495", "k": "見解", "f": "けんかい", "e": "opinion, view"}
        ]
    }
]

for d in data:
    filepath = os.path.join(out_dir, d["file"])
    out = {
        "is_story": True,
        "story_number": d["story_number"],
        "title": "Topic 26",
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

print("Done creating JSON files.")
