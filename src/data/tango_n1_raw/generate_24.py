import json
import os

data = [
    {
        "file": "314_1.json",
        "story_number": 2,
        "japanese_text": "首相は<u>施政方針</u>演説で、<u>財政</u>の<u>健全化</u>と<u>社会保障</u>の充実を<u>両立</u>させるため、歳出の<u>削減</u>を進める方針を示した。",
        "english_translation": "In his policy speech, the prime minister indicated a policy of reducing expenditures in order to simultaneously achieve sound public finances and improved social security.",
        "words": [
            {"id": "2248", "k": "施政方針", "f": "しせいほうしん", "e": "administrative policy"},
            {"id": "2249", "k": "財政", "f": "ざいせい", "e": "public finance"},
            {"id": "2250", "k": "健全化", "f": "けんぜんか", "e": "sound management, normalization"},
            {"id": "2251", "k": "社会保障", "f": "しゃかいほしょう", "e": "social security"},
            {"id": "2252", "k": "両立[する]", "f": "りょうりつ", "e": "compatibility, achieve both"},
            {"id": "2253", "k": "削減[する]", "f": "さくげん", "e": "reduction, reduce"}
        ]
    },
    {
        "file": "315_1.json",
        "story_number": 3,
        "japanese_text": "今回の<u>内閣</u>改造では、<u>閣僚</u>の半数が入れ替わった。新たに<u>就任した</u>大臣たちは、<u>公約</u>の実現に向けて<u>尽力</u>すると述べた。",
        "english_translation": "In this cabinet reshuffle, half of the cabinet ministers were replaced. The newly appointed ministers stated that they would devote themselves to fulfilling their election promises.",
        "words": [
            {"id": "2254", "k": "内閣", "f": "ないかく", "e": "cabinet"},
            {"id": "2255", "k": "閣僚", "f": "かくりょう", "e": "cabinet minister"},
            {"id": "2256", "k": "就任[する]", "f": "しゅうにん", "e": "inauguration, assume office"},
            {"id": "2257", "k": "公約", "f": "こうやく", "e": "election promise, pledge"},
            {"id": "2258", "k": "尽力[する]", "f": "じんりょく", "e": "effort, devote oneself"}
        ]
    },
    {
        "file": "315_2.json",
        "story_number": 4,
        "japanese_text": "A：今度の<u>選挙</u>、どの党に<u>投票</u>するか決めた？\nB：まだ。<u>世論調査</u>では<u>与党</u>が優勢みたいだけど、<u>政権</u>交代もあり得るよね。\nA：そうだね。<u>有権者</u>として、ちゃんと考えないとね。",
        "english_translation": "A: Have you decided which party to vote for in the next election? B: Not yet. Polls show the ruling party is ahead, but a change in government is also possible. A: That's right. As voters, we need to think carefully.",
        "words": [
            {"id": "2259", "k": "選挙[する]", "f": "せんきょ", "e": "election, hold an election"},
            {"id": "2260", "k": "投票[する]", "f": "とうひょう", "e": "vote, cast a vote"},
            {"id": "2261", "k": "世論調査", "f": "よろんちょうさ", "e": "public opinion poll"},
            {"id": "2262", "k": "与党", "f": "よとう", "e": "ruling party"},
            {"id": "2263", "k": "政権", "f": "せいけん", "e": "administration, government"},
            {"id": "2264", "k": "有権者", "f": "ゆうけんしゃ", "e": "voter, eligible voter"}
        ]
    },
    {
        "file": "316_1.json",
        "story_number": 5,
        "japanese_text": "<u>国会</u>では、<u>議員</u>たちが新たな<u>法案</u>について激しく<u>審議</u>した。<u>野党</u>は<u>採決</u>を先延ばしにするよう求め、<u>与党</u>との対立が深まった。",
        "english_translation": "In the National Diet, members of parliament debated fiercely over a new bill. The opposition party demanded a delay in the vote, deepening the confrontation with the ruling party.",
        "words": [
            {"id": "2265", "k": "国会", "f": "こっかい", "e": "National Diet, parliament"},
            {"id": "2266", "k": "議員", "f": "ぎいん", "e": "member of parliament, Diet member"},
            {"id": "2267", "k": "法案", "f": "ほうあん", "e": "bill, proposed law"},
            {"id": "2268", "k": "審議[する]", "f": "しんぎ", "e": "deliberation, deliberate"},
            {"id": "2269", "k": "採決[する]", "f": "さいけつ", "e": "vote, take a vote"}
        ]
    },
    {
        "file": "316_2.json",
        "story_number": 6,
        "japanese_text": "<u>憲法</u>の<u>改正</u>を巡って、<u>国民</u>の間で大きな<u>論争</u>が起きている。<u>賛成派</u>は<u>安全保障</u>の強化を訴え、<u>反対派</u>は平和主義の<u>理念</u>を守るべきだと主張している。",
        "english_translation": "A major debate is taking place among the public over constitutional revision. Proponents argue for strengthening national security, while opponents insist on preserving the principles of pacifism.",
        "words": [
            {"id": "2270", "k": "憲法", "f": "けんぽう", "e": "constitution"},
            {"id": "2271", "k": "改正[する]", "f": "かいせい", "e": "revision, revise"},
            {"id": "2272", "k": "論争[する]", "f": "ろんそう", "e": "controversy, debate"},
            {"id": "2273", "k": "安全保障", "f": "あんぜんほしょう", "e": "national security"},
            {"id": "2274", "k": "理念", "f": "りねん", "e": "principle, ideal"}
        ]
    },
    {
        "file": "317_1.json",
        "story_number": 7,
        "japanese_text": "両国の<u>首脳</u>は<u>会談</u>を行い、<u>経済協力</u>や<u>安全保障</u>に関する<u>合意</u>に達した。<u>外交</u>関係の<u>強化</u>に向けた<u>共同声明</u>が発表された。",
        "english_translation": "The leaders of both countries held a summit and reached an agreement on economic cooperation and national security. A joint statement was announced aimed at strengthening diplomatic relations.",
        "words": [
            {"id": "2275", "k": "首脳", "f": "しゅのう", "e": "leader, top official"},
            {"id": "2276", "k": "会談[する]", "f": "かいだん", "e": "talks, hold talks"},
            {"id": "2277", "k": "経済協力", "f": "けいざいきょうりょく", "e": "economic cooperation"},
            {"id": "2278", "k": "合意[する]", "f": "ごうい", "e": "agreement, reach agreement"},
            {"id": "2279", "k": "外交", "f": "がいこう", "e": "diplomacy"},
            {"id": "2280", "k": "共同声明", "f": "きょうどうせいめい", "e": "joint statement"}
        ]
    },
    {
        "file": "317_2.json",
        "story_number": 8,
        "japanese_text": "A：隣国との<u>紛争</u>、どう思う？\nB：<u>交渉</u>で解決してほしいよね。<u>武力</u>に頼るのは最終手段だと思う。\nA：同感。<u>国際社会</u>が<u>仲介</u>に入って、早く<u>停戦</u>が実現するといいね。",
        "english_translation": "A: What do you think about the conflict with the neighboring country? B: I hope it gets resolved through negotiations. I think resorting to military force should be a last resort. A: I agree. I hope the international community can mediate and bring about a ceasefire soon.",
        "words": [
            {"id": "2281", "k": "紛争", "f": "ふんそう", "e": "conflict, dispute"},
            {"id": "2282", "k": "交渉[する]", "f": "こうしょう", "e": "negotiation, negotiate"},
            {"id": "2283", "k": "武力", "f": "ぶりょく", "e": "military force"},
            {"id": "2284", "k": "国際社会", "f": "こくさいしゃかい", "e": "international community"},
            {"id": "2285", "k": "仲介[する]", "f": "ちゅうかい", "e": "mediation, mediate"},
            {"id": "2286", "k": "停戦[する]", "f": "ていせん", "e": "ceasefire, halt fighting"}
        ]
    },
    {
        "file": "318_1.json",
        "story_number": 9,
        "japanese_text": "<u>国連</u>は、<u>難民</u>問題に対処するため<u>加盟国</u>に<u>拠出金</u>を求めた。しかし、<u>財政難</u>を抱える国々からは<u>難色</u>が示された。<u>人道支援</u>の充実が急務となっている。",
        "english_translation": "The United Nations called on member states to contribute funds to address the refugee crisis. However, countries facing financial difficulties expressed reluctance. Strengthening humanitarian aid has become an urgent priority.",
        "words": [
            {"id": "2287", "k": "国連", "f": "こくれん", "e": "United Nations (UN)"},
            {"id": "2288", "k": "難民", "f": "なんみん", "e": "refugee"},
            {"id": "2289", "k": "加盟国", "f": "かめいこく", "e": "member state"},
            {"id": "2290", "k": "拠出金", "f": "きょしゅつきん", "e": "contribution, contributed funds"},
            {"id": "2291", "k": "人道支援", "f": "じんどうしえん", "e": "humanitarian aid"}
        ]
    },
    {
        "file": "318_2.json",
        "story_number": 10,
        "japanese_text": "<u>制裁</u>措置が<u>発動</u>されたことで、その国の<u>貿易</u>は大きく落ち込んだ。<u>輸出</u>品目の多くが<u>禁輸</u>となり、<u>経済的</u>な<u>打撃</u>は深刻だ。",
        "english_translation": "The imposition of sanctions caused a significant decline in the country's trade. Many export items became subject to an embargo, and the economic blow has been severe.",
        "words": [
            {"id": "2292", "k": "制裁", "f": "せいさい", "e": "sanction, penalty"},
            {"id": "2293", "k": "発動[する]", "f": "はつどう", "e": "invocation, invoke"},
            {"id": "2294", "k": "貿易[する]", "f": "ぼうえき", "e": "trade, conduct trade"},
            {"id": "2295", "k": "輸出[する]", "f": "ゆしゅつ", "e": "export, export"},
            {"id": "2296", "k": "禁輸", "f": "きんゆ", "e": "embargo, trade ban"},
            {"id": "2297", "k": "打撃", "f": "だげき", "e": "blow, damage"}
        ]
    },
    {
        "file": "319_1.json",
        "story_number": 11,
        "japanese_text": "A：この地域の<u>領土</u>問題、解決できると思う？\nB：難しいよね。双方が<u>主権</u>を<u>主張</u>していて、<u>妥協</u>の余地がないみたい。\nA：<u>条約</u>を結ぶことで<u>歩み寄り</u>ができればいいんだけど。",
        "english_translation": "A: Do you think the territorial issue in this region can be resolved? B: It's difficult. Both sides are asserting sovereignty and there seems to be no room for compromise. A: I wish a treaty could be concluded to bring them closer together.",
        "words": [
            {"id": "2298", "k": "領土", "f": "りょうど", "e": "territory"},
            {"id": "2299", "k": "主権", "f": "しゅけん", "e": "sovereignty"},
            {"id": "2300", "k": "主張[する]", "f": "しゅちょう", "e": "assertion, assert"},
            {"id": "2301", "k": "妥協[する]", "f": "だきょう", "e": "compromise, make a compromise"},
            {"id": "2302", "k": "条約", "f": "じょうやく", "e": "treaty"},
            {"id": "2303", "k": "歩み寄り", "f": "あゆみより", "e": "compromise, concession"}
        ]
    },
    {
        "file": "320_1.json",
        "story_number": 12,
        "japanese_text": "<u>国際条約</u>の<u>批准</u>をめぐって議会で<u>論議</u>が続いている。<u>締結</u>すれば<u>相互</u>に恩恵を得られるとする声がある一方、<u>自国</u>の<u>利益</u>が損なわれるとの懸念もある。",
        "english_translation": "Debate continues in parliament over the ratification of an international treaty. While some argue that both sides will benefit from concluding it, there are also concerns that it could harm the nation's own interests.",
        "words": [
            {"id": "2304", "k": "国際条約", "f": "こくさいじょうやく", "e": "international treaty"},
            {"id": "2305", "k": "批准[する]", "f": "ひじゅん", "e": "ratification, ratify"},
            {"id": "2306", "k": "論議[する]", "f": "ろんぎ", "e": "debate, discuss"},
            {"id": "2307", "k": "締結[する]", "f": "ていけつ", "e": "conclusion, conclude (a treaty)"},
            {"id": "2308", "k": "相互", "f": "そうご", "e": "mutual, reciprocal"},
            {"id": "2309", "k": "自国", "f": "じこく", "e": "one's own country"}
        ]
    },
    {
        "file": "321_1.json",
        "story_number": 13,
        "japanese_text": "この国では<u>汚職</u>が<u>蔓延</u>し、<u>官僚</u>や<u>政治家</u>への<u>不信感</u>が高まっている。<u>腐敗</u>した<u>体制</u>を<u>刷新</u>するため、市民が声を上げ始めた。",
        "english_translation": "Corruption is rampant in this country, and distrust in bureaucrats and politicians is growing. Citizens have begun to speak out to reform the corrupt system.",
        "words": [
            {"id": "2310", "k": "汚職", "f": "おしょく", "e": "corruption, graft"},
            {"id": "2311", "k": "蔓延[する]", "f": "まんえん", "e": "prevalence, be rampant"},
            {"id": "2312", "k": "官僚", "f": "かんりょう", "e": "bureaucrat"},
            {"id": "2313", "k": "政治家", "f": "せいじか", "e": "politician"},
            {"id": "2314", "k": "腐敗[する]", "f": "ふはい", "e": "corruption, be corrupt"},
            {"id": "2315", "k": "体制", "f": "たいせい", "e": "system, regime"},
            {"id": "2316", "k": "刷新[する]", "f": "さっしん", "e": "reform, overhaul"}
        ]
    },
    {
        "file": "322_1.json",
        "story_number": 14,
        "japanese_text": "<u>民主主義</u>の<u>根幹</u>は、<u>国民</u>が<u>主体的</u>に政治に<u>参加</u>することにある。<u>投票率</u>の低下は<u>民意</u>が<u>反映</u>されにくい状況を生み、<u>政治</u>の<u>質</u>を低下させる恐れがある。",
        "english_translation": "The foundation of democracy lies in citizens actively participating in politics. A decline in voter turnout risks creating a situation in which public opinion is less reflected, potentially lowering the quality of governance.",
        "words": [
            {"id": "2317", "k": "民主主義", "f": "みんしゅしゅぎ", "e": "democracy"},
            {"id": "2318", "k": "根幹", "f": "こんかん", "e": "foundation, core"},
            {"id": "2319", "k": "主体的な", "f": "しゅたいてきな", "e": "autonomous, proactive"},
            {"id": "2320", "k": "投票率", "f": "とうひょうりつ", "e": "voter turnout"},
            {"id": "2321", "k": "民意", "f": "みんい", "e": "public opinion, will of the people"},
            {"id": "2322", "k": "反映[する]", "f": "はんえい", "e": "reflection, reflect"}
        ]
    },
    {
        "file": "323_1.json",
        "story_number": 15,
        "japanese_text": "A：最近の<u>外交</u>問題について、どう思う？\nB：<u>孤立</u>を深めていくのは得策じゃないよね。<u>同盟国</u>との<u>連携</u>を<u>強固</u>にしつつ、<u>対話</u>の<u>窓口</u>は常に開いておくべきだと思う。\nA：<u>多国間</u>の<u>枠組み</u>の中で解決を目指すのがベストだね。",
        "english_translation": "A: What do you think about recent diplomatic issues? B: Deepening isolation isn't a good strategy. I think we should solidify our ties with allied nations while always keeping the door open for dialogue. A: I think aiming for resolution within a multilateral framework is best.",
        "words": [
            {"id": "2323", "k": "孤立[する]", "f": "こりつ", "e": "isolation, become isolated"},
            {"id": "2324", "k": "同盟国", "f": "どうめいこく", "e": "allied nation"},
            {"id": "2325", "k": "連携[する]", "f": "れんけい", "e": "cooperation, cooperate"},
            {"id": "2326", "k": "強固な", "f": "きょうこな", "e": "solid, firm"},
            {"id": "2327", "k": "対話[する]", "f": "たいわ", "e": "dialogue, have a dialogue"},
            {"id": "2328", "k": "多国間", "f": "たこくかん", "e": "multilateral"},
            {"id": "2329", "k": "枠組み", "f": "わくぐみ", "e": "framework"}
        ]
    }
]

out_dir = r"D:\sudip_software\nihongo_playground\src\data\tango_n1_raw"

for d in data:
    filepath = os.path.join(out_dir, d["file"])
    out = {
        "is_story": True,
        "story_number": d["story_number"],
        "title": "Topic 24",
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

print("Done generating Topic 24 JSONs.")
