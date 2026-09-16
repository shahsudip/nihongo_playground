# scripts/enrich_dual_sentences.py
import json
import os
import re

# High quality contextual templates and examples for core vocabulary patterns
TEMPLATES = [
    ("明日から毎日、{w}を続けるつもりです。", "From tomorrow, I plan to continue doing {en} every day."),
    ("彼は{w}についてとても詳しいです。", "He is very knowledgeable about {en}."),
    ("この問題について、{w}の視点から考えてみましょう。", "Let's think about this problem from the perspective of {en}."),
    ("最近は{w}の重要性がますます高まっています。", "Recently, the importance of {en} has been increasing more and more."),
    ("先生は{w}の使い方を分かりやすく教えてくれた。", "The teacher clearly taught us how to use {en}."),
    ("私たちは{w}について話し合いました。", "We discussed {en} together."),
    ("彼女は{w}をとても大切にしています。", "She values {en} very much."),
    ("初めて{w}を経験した時、とても驚きました。", "When I first experienced {en}, I was very surprised."),
    ("日常生活で{w}を意識することは大切です。", "It is important to be conscious of {en} in daily life."),
    ("準備をしっかりして、{w}に備えましょう。", "Let's prepare thoroughly and be ready for {en}.")
]

VERB_TEMPLATES = [
    ("週末は家でゆっくり{w}ことにしています。", "On weekends, I make it a rule to relax at home and {en}."),
    ("上手に{w}ためには、毎日の練習が欠かせません。", "To {en} well, daily practice is essential."),
    ("彼はいつも一生懸命に{w}姿が印象的です。", "His attitude of always diligently trying to {en} is impressive."),
    ("みんなで協力して{w}ことができました。", "We were able to cooperate together and {en}."),
    ("もっと上手に{w}ようになりたいです。", "I want to become able to {en} better.")
]

ADJ_TEMPLATES = [
    ("この部屋はとても{w}ので、勉強に集中できます。", "This room is very {en}, so I can concentrate on studying."),
    ("そんなに{w}状況でも、彼は決して諦めなかった。", "Even in such a {en} situation, he never gave up."),
    ("いつもより{w}と感じたら、無理をせず休みましょう。", "If you feel more {en} than usual, rest without overdoing it."),
    ("彼の{w}態度が周りの人を安心させた。", "His {en} attitude made the people around him feel at ease.")
]

def clean_furigana(furi_text):
    if not furi_text:
        return ""
    # Strip any sound tags
    return re.sub(r'\[sound:[^\]]+\]', '', furi_text).strip()

def generate_second_sentence(word_kanji, word_furi, word_def, index):
    clean_w = word_kanji.strip() if word_kanji else word_furi.strip()
    clean_def = word_def.split(';')[0].split(',')[0].strip() if word_def else "this"
    if clean_def.startswith("to "):
        clean_def = clean_def[3:]
    
    # Check if word is verb, adjective or noun
    is_verb = clean_w.endswith(('う', 'く', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'る', 'する'))
    is_i_adj = clean_w.endswith('い') and not is_verb
    is_na_adj = clean_w.endswith('な')

    if is_verb and len(clean_w) > 1:
        tpl_ja, tpl_en = VERB_TEMPLATES[index % len(VERB_TEMPLATES)]
    elif is_i_adj or is_na_adj:
        tpl_ja, tpl_en = ADJ_TEMPLATES[index % len(ADJ_TEMPLATES)]
    else:
        tpl_ja, tpl_en = TEMPLATES[index % len(TEMPLATES)]

    # Format sentence
    sent_kanji_2 = tpl_ja.replace("{w}", clean_w)
    sent_furi_2 = tpl_ja.replace("{w}", word_furi.strip() if word_furi else clean_w)
    sent_eng_2 = tpl_en.replace("{en}", clean_def)

    return sent_kanji_2, sent_furi_2, sent_eng_2

def enrich_deck_file(filepath):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return

    print(f"Reading {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)

    cards = data.get('cards', [])
    print(f"Total cards to enrich: {len(cards)}")

    for idx, card in enumerate(cards):
        # Extract word details
        word_kanji = card.get('vocabKanji') or card.get('expression') or card.get('word') or ''
        word_furi = card.get('vocabFurigana') or card.get('reading') or word_kanji
        word_def = card.get('vocabDef') or card.get('meaning') or ''

        # Generate second sentence
        sent_kanji_2, sent_furi_2, sent_eng_2 = generate_second_sentence(word_kanji, word_furi, word_def, idx)

        card['sentKanji2'] = sent_kanji_2
        card['sentFurigana2'] = sent_furi_2
        card['sentEng2'] = sent_eng_2

    print(f"Saving enriched data to {filepath}...")
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Successfully enriched {filepath} with 2nd example sentences!")

def main():
    paths = [
        "public/anki_decks/core10k_data.json",
        "public/anki_decks/ankidrone_essentials_data.json",
        "anki_decks/core10k_data.json",
        "anki_decks/ankidrone_essentials_data.json"
    ]

    for p in paths:
        if os.path.exists(p):
            enrich_deck_file(p)

if __name__ == "__main__":
    main()
