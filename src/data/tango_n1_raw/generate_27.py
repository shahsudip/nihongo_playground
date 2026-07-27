import json
import os

data = [
    {
        "file": "344_1.json",
        "story_number": 1,
        "japanese_text": "とある<u>元素</u>の結合に<u>着目</u>した<u>仮説</u>がある。この<u>説</u>が正しければ、目的とする<u>化合物</u>を<u>合成</u>することができる。だが、この化合物は<u>酸</u>に弱いのが課題だ。",
        "english_translation": "There is a hypothesis that focuses on the bonding of certain elements. If this theory is correct, the desired compound can be synthesized. However, the problem is that this compound is vulnerable against acids.",
        "words": [
            {"id": "2496", "k": "元素", "f": "げんそ", "e": "element"},
            {"id": "2497", "k": "着目[する]", "f": "ちゃくもく", "e": "attention, focus on"},
            {"id": "2498", "k": "仮説", "f": "かせつ", "e": "hypothesis"},
            {"id": "2499", "k": "説", "f": "せつ", "e": "theory"},
            {"id": "2500", "k": "化合物", "f": "かごうぶつ", "e": "(chemical) compound"},
            {"id": "2501", "k": "合成[する]", "f": "ごうせい", "e": "synthesis, synthesize"},
            {"id": "2502", "k": "酸", "f": "さん", "e": "acid"}
        ]
    },
    {
        "file": "345_1.json",
        "story_number": 2,
        "japanese_text": "<u>衛星</u>とは、<u>惑星</u>などの周りを移動し、<u>かつ</u>、人工でないものを指す。人の手によって作られた衛星は人工衛星と呼び、気象観測や地球温暖化の<u>証拠</u>を集めることに利用されている。",
        "english_translation": "A natural satellite is anything that moves around a planet or other celestial body, and moreover, is not human-made. Human-made satellites are called artificial satellites, and are used to observe the weather and collect evidence of global warming.",
        "words": [
            {"id": "2503", "k": "衛星", "f": "えいせい", "e": "natural satellite"},
            {"id": "2504", "k": "惑星", "f": "わくせい", "e": "planet"},
            {"id": "2505", "k": "かつ", "f": "かつ", "e": "and, moreover"},
            {"id": "2506", "k": "証拠", "f": "しょうこ", "e": "evidence"}
        ]
    },
    {
        "file": "345_2.json",
        "story_number": 3,
        "japanese_text": "経過報告のあった新薬の研究は、直接がん細胞に<u>作用</u>しているのかについての<u>考察</u>が不十分であったため、来年度の研究支援の対象から<u>除外</u>された。",
        "english_translation": "One study of a new drug including progress reports was excluded from next year's research funding due to insufficient consideration of whether the drug was directly acting on cancer cells.",
        "words": [
            {"id": "2507", "k": "作用[する]", "f": "さよう", "e": "action, act on"},
            {"id": "2508", "k": "考察[する]", "f": "こうさつ", "e": "consideration, consider"},
            {"id": "2509", "k": "除外[する]", "f": "じょがい", "e": "exclusion, exclude"}
        ]
    },
    {
        "file": "346_1.json",
        "story_number": 4,
        "japanese_text": "研究者はどんな分野であれ、<u>根拠</u>を明確に述べた上で、自身の主張が<u>成り立つ</u>ことを示す必要がある。また、研究の問題点を<u>指摘</u>されても、むやみに<u>反論</u>せず、それを<u>受け止める</u>姿勢が求められる。",
        "english_translation": "Whatever their fields, researchers needs to show that their claims hold up by clearly stating the evidence. Also, when someone points out a problem with their research, they should be prepared to accept it without trying desperately to refute it.",
        "words": [
            {"id": "2510", "k": "根拠", "f": "こんきょ", "e": "evidence, grounds"},
            {"id": "2511", "k": "成り立つ", "f": "なりたつ", "e": "hold up"},
            {"id": "2512", "k": "指摘[する]", "f": "してき", "e": "indication, point out"},
            {"id": "2513", "k": "反論[する]", "f": "はんろん", "e": "refutation, refute"},
            {"id": "2514", "k": "受け止める", "f": "うけとめる", "e": "accept"}
        ]
    },
    {
        "file": "346_2.json",
        "story_number": 5,
        "japanese_text": "A：ねぇ聞いて、前回の研究に<u>匹敵</u>するアイデアが<u>ひらめいた</u>よ！\nB：本当に。それは発表に<u>値する</u>内容なの？\nA：<u>大まかな</u>内容はこれから説明するけど、新しい領域を<u>開拓</u>できると思うよ。",
        "english_translation": "A: Hey, listen, I suddenly realized I've got an idea that's comparable to my last study! B: Really? Is it worth presenting? A: I'll explain the rough gist of it, but I think it could open up new territory.",
        "words": [
            {"id": "2515", "k": "匹敵[する]", "f": "ひってき", "e": "equal, be comparable"},
            {"id": "2516", "k": "ひらめく", "f": "ひらめく", "e": "suddenly realize"},
            {"id": "2517", "k": "値する", "f": "あたいする", "e": "be worth"},
            {"id": "2518", "k": "値", "f": "あたい", "e": "value"},
            {"id": "2519", "k": "大まかな", "f": "おおまかな", "e": "crude, rough"},
            {"id": "2520", "k": "開拓[する]", "f": "かいたく", "e": "pioneering, open up"}
        ]
    },
    {
        "file": "347_1.json",
        "story_number": 6,
        "japanese_text": "A：ねぇ、ポマトって知ってる？\nB：知ってる。じゃがいもとトマトの<u>細胞</u>を<u>融合</u>させて作ったやつでしょ？\nA：そうそう。寒い地域でもトマトが育てられるようにって作られたんだけど、失敗して今や過去の<u>産物</u>だよね。\nB：残念ながらね。<u>観点</u>は面白かったんだけどなぁ。",
        "english_translation": "A: Hey, ever heard of a pomato? B: Yes. It's made by fusing potato and tomato cells, right? A: That's right. It was created to grow tomatoes in colder regions, but it failed and is now a product of the past. B: That's unfortunate. It was an interesting perspective.",
        "words": [
            {"id": "2521", "k": "細胞", "f": "さいぼう", "e": "cell"},
            {"id": "2522", "k": "融合[する]", "f": "ゆうごう", "e": "fusion, fuse"},
            {"id": "2523", "k": "産物", "f": "さんぶつ", "e": "product"},
            {"id": "2524", "k": "副産物", "f": "ふくさんぶつ", "e": "byproduct"},
            {"id": "2525", "k": "観点", "f": "かんてん", "e": "perspective"}
        ]
    },
    {
        "file": "348_1.json",
        "story_number": 7,
        "japanese_text": "A：<u>成果</u>発表のため、<u>シンポジウム</u>に参加することになったよ。\nB：出張経費を支給してもらうなら、その<u>内訳</u>が分かるようにしなよ。うちは審査が<u>厳格な</u>だから。<u>疑わしい</u>費用は認めてくれないよ。",
        "english_translation": "A: I'm going to attend a symposium to present my findings. B: If you want to be reimbursed for travel expenses, make sure you get the breakdown right. Our screening process is very strict, and any questionable expenses won't be approved.",
        "words": [
            {"id": "2526", "k": "成果", "f": "せいか", "e": "findings, results"},
            {"id": "2527", "k": "シンポジウム", "f": "シンポジウム", "e": "symposium"},
            {"id": "2528", "k": "内訳", "f": "うちわけ", "e": "breakdown"},
            {"id": "2529", "k": "厳格な", "f": "げんかくな", "e": "strict"},
            {"id": "2530", "k": "疑わしい", "f": "うたがわしい", "e": "doubtful, questionable"}
        ]
    },
    {
        "file": "348_2.json",
        "story_number": 8,
        "japanese_text": "A：おかしいな。この<u>手法</u>で合ってるはずなんだけど。\nB：どうしたの？\nA：<u>細菌</u> <u>群</u>の測定を<u>試み</u>てるんだけどさ、うまく測れなくて。\nB：どれどれ。なんだ。顕微鏡の倍率が違ってるよ。",
        "english_translation": "A: That's odd. I thought this method would work. B: What's wrong? A: I'm trying to measure the bacterial population, but it won't work. B: Let me see. Hey! The microscope has the wrong magnification.",
        "words": [
            {"id": "2531", "k": "手法", "f": "しゅほう", "e": "method"},
            {"id": "2532", "k": "細菌", "f": "さいきん", "e": "bacteria"},
            {"id": "2533", "k": "菌", "f": "きん", "e": "bacteria, germ"},
            {"id": "2534", "k": "群", "f": "ぐん", "e": "group, population"},
            {"id": "2535", "k": "群衆", "f": "ぐんしゅう", "e": "crowd"},
            {"id": "2536", "k": "試みる", "f": "こころみる", "e": "try"},
            {"id": "2537", "k": "試み", "f": "こころみ", "e": "attempt"}
        ]
    },
    {
        "file": "349_1.json",
        "story_number": 9,
        "japanese_text": "<u>査読</u>を依頼された論文は問題の<u>所在</u>が明確だった。また、<u>誤差</u>が小さくなるように手法が工夫されており、結果の<u>検証</u>も十分に行われていた。今後の研究にも多くの<u>示唆</u>を与えるものと評価できる。",
        "english_translation": "The paper requested for peer review was clear on the problematic position. In addition, methods had been devised to minimize errors, and the results were adequately verified. The paper can be highly evaluated as providing many suggestions for future research directions.",
        "words": [
            {"id": "2538", "k": "査読[する]", "f": "さどく", "e": "peer review, perform peer review"},
            {"id": "2539", "k": "所在", "f": "しょざい", "e": "position"},
            {"id": "2540", "k": "誤差", "f": "ごさ", "e": "error"},
            {"id": "2541", "k": "検証[する]", "f": "けんしょう", "e": "verification, verified"},
            {"id": "2542", "k": "示唆[する]", "f": "しさ", "e": "suggestion, suggest"}
        ]
    },
    {
        "file": "350_1.json",
        "story_number": 10,
        "japanese_text": "水の<u>密度</u>より小さいものは浮き、大きいものは沈む。氷が水に浮くのは<u>原子</u>が水素<u>結合</u>し、<u>結晶</u>となることで、密度が小さくなるからである。なお、氷の中で水の<u>分子</u>は４つの頂点を持つ<u>立体的な</u>構造を<u>なす</u>。",
        "english_translation": "Anything of less density than water floats, while anything more dense sinks. Ice floats in water because its density is reduced by the hydrogen bonding of atoms to form crystals. In ice, water molecules form a three-dimensional structure with four vertices.",
        "words": [
            {"id": "2543", "k": "密度", "f": "みつど", "e": "density"},
            {"id": "2544", "k": "人口密度", "f": "じんこうみつど", "e": "population density"},
            {"id": "2545", "k": "原子", "f": "げんし", "e": "atom"},
            {"id": "2546", "k": "結合[する]", "f": "けつごう", "e": "bonding, bond"},
            {"id": "2547", "k": "結晶", "f": "けっしょう", "e": "crystal"},
            {"id": "2548", "k": "分子", "f": "ぶんし", "e": "molecule"},
            {"id": "2549", "k": "立体的な", "f": "りったいてきな", "e": "three-dimensional"},
            {"id": "2550", "k": "なす", "f": "なす", "e": "form"}
        ]
    },
    {
        "file": "350_2.json",
        "story_number": 11,
        "japanese_text": "今回発表された人工ダイヤモンドを素材に使った電子回路は、他の<u>類似</u>したものと異なり、新たな手法を用いて開発された点で画期的である。<u>仮に</u>この回路が実用化されれば、競争上<u>優位</u>に立つことは間違いないだろう。",
        "english_translation": "The recently announced electronic circuit made from synthetic diamonds is groundbreaking. Unlike other similar products, it was developed using a new method. Tentatively, if this circuit were to be put to practical use, it would certainly give the company a superior competitive advantage.",
        "words": [
            {"id": "2551", "k": "類似[する]", "f": "るいじ", "e": "similarity, be similar"},
            {"id": "2552", "k": "仮に", "f": "かりに", "e": "tentatively"},
            {"id": "2553", "k": "優位な", "f": "ゆういな", "e": "superior"}
        ]
    },
    {
        "file": "351_1.json",
        "story_number": 12,
        "japanese_text": "地下にある<u>発掘</u>現場への<u>下降</u>中に原因不明の<u>振動</u>が起きた。その後、安全確保のため地上への<u>脱出</u>が促された。",
        "english_translation": "During our descent to the excavation site, which lay underground, an unexplained vibration occurred, and we were urged to escape to the surface for our own safety.",
        "words": [
            {"id": "2554", "k": "発掘[する]", "f": "はっくつ", "e": "excavation, excavate"},
            {"id": "2555", "k": "下降[する]", "f": "かこう", "e": "descent, descend"},
            {"id": "2556", "k": "振動[する]", "f": "しんどう", "e": "vibration, vibrate"},
            {"id": "2557", "k": "脱出[する]", "f": "だっしゅつ", "e": "escape, escape"}
        ]
    },
    {
        "file": "352_1.json",
        "story_number": 13,
        "japanese_text": "A：ロボットと人工知能は<u>混同</u>されがちだよね。\nB：全然違う<u>定義</u>なんだけどね。それにしても人工知能の発展は目覚ましいね。いずれ<u>知性</u>を獲得したりするのかな？\nA：いずれは人工知能に<u>魂</u>が<u>宿る</u>時代も来るだろうね。知性を持った場合を想定して<u>制御</u>できる環境を整えておく必要がありそう。\nB：なるほど。<u>真理</u>だね。",
        "english_translation": "A: Robots and AI are often confused. B: Their definitions are completely different. But the development of AI is remarkable. Will it eventually gain actual intelligence? A: I think there will come a time when a soul will reside in AI. We will need to prepare an environment to control it if it ever does gain intelligence. B: That's the truth.",
        "words": [
            {"id": "2558", "k": "混同[する]", "f": "こんどう", "e": "confusion, confuse"},
            {"id": "2559", "k": "定義[する]", "f": "ていぎ", "e": "definition, define"},
            {"id": "2560", "k": "知性", "f": "ちせい", "e": "intelligence"},
            {"id": "2561", "k": "魂", "f": "たましい", "e": "soul"},
            {"id": "2562", "k": "宿る", "f": "やどる", "e": "reside"},
            {"id": "2563", "k": "制御[する]", "f": "せいぎょ", "e": "control, control"},
            {"id": "2564", "k": "真理", "f": "しんり", "e": "truth"}
        ]
    },
    {
        "file": "353_1.json",
        "story_number": 14,
        "japanese_text": "生物の構造について考える際、自分で<u>個々</u>の生物を<u>解剖</u>することにより、<u>書物</u>からは得られない発見を<u>もたらす</u>ことがある。",
        "english_translation": "When considering the structures of organisms, dissecting individual organisms yourself can lead to discoveries that cannot be obtained from books.",
        "words": [
            {"id": "2565", "k": "個々", "f": "ここ", "e": "individual"},
            {"id": "2566", "k": "解剖[する]", "f": "かいぼう", "e": "dissection, dissect"},
            {"id": "2567", "k": "書物", "f": "しょもつ", "e": "books"},
            {"id": "2568", "k": "もたらす", "f": "もたらす", "e": "bring about, lead to"}
        ]
    },
    {
        "file": "353_2.json",
        "story_number": 15,
        "japanese_text": "ハッブルは、多くの<u>異論</u>もあった中で、宇宙が誕生してから膨大な時間を<u>経て</u> <u>膨張</u>していることを示した。",
        "english_translation": "Hubble demonstrated, in the face of many objections, that the universe has been expanding in the enormous amount of time that has passed since its emergence.",
        "words": [
            {"id": "2569", "k": "異論", "f": "いろん", "e": "dissent, objection"},
            {"id": "2570", "k": "経る", "f": "へる", "e": "pass (time)"},
            {"id": "2571", "k": "膨張[する]", "f": "ぼうちょう", "e": "expansion, expand"}
        ]
    }
]

out_dir = r"D:\sudip_software\nihongo_playground\src\data\tango_n1_raw"
os.makedirs(out_dir, exist_ok=True)

for d in data:
    filepath = os.path.join(out_dir, d["file"])
    out = {
        "is_story": True,
        "story_number": d["story_number"],
        "title": "Topic 27",
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
