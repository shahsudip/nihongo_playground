import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

def clean_text_spacing(text):
    text = re.sub(r'([\u3000-\u9fff\uff00-\uffef])([a-zA-Z])', r'\1 \2', text)
    text = re.sub(r'([a-zA-Z])([\u3000-\u9fff\uff00-\uffef])', r'\1 \2', text)
    return text

text = "効果：ききめ 望ましい結果effect"
print(clean_text_spacing(text))

split_test = "人や物の状態について使う。Choice 4, 調子, is used to refer to the condition of people or things."
parts = re.split(r'(?<=。)\s*(?=Choice\b)', split_test)
print(parts)
