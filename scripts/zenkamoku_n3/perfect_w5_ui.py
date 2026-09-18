import json

# W5 D1
with open('src/data/zenkamoku_n3/w05-d01.json', encoding='utf-8') as f:
    d = json.load(f)

email_html = """<div class="border-2 border-gray-500 rounded-t-md overflow-hidden font-sans max-w-3xl mx-auto shadow-sm bg-white text-black relative">
  <!-- Window Title Bar -->
  <div class="bg-[#555555] px-2 py-1.5 flex justify-end items-center gap-1.5 border-b-2 border-gray-700">
    <div class="w-4 h-4 border-2 border-white rounded-sm"></div>
    <div class="w-4 h-4 border-2 border-white rounded-sm"></div>
    <div class="w-4 h-4 border-2 border-white rounded-sm flex items-center justify-center text-[10px] font-bold text-white relative">
      <div class="absolute w-2.5 h-0.5 bg-white rotate-45"></div>
      <div class="absolute w-2.5 h-0.5 bg-white -rotate-45"></div>
    </div>
  </div>
  
  <!-- Email Meta -->
  <div class="p-5 border-b border-gray-300 leading-loose text-[15px]">
    <div class="flex"><div class="w-24 tracking-[0.5em]">あて先</div><div>： baitosiyou@orangemart.co.jp</div></div>
    <div class="flex"><div class="w-24 tracking-[0.5em]">件名</div><div>： 年末年始の出勤について</div></div>
    <div class="flex"><div class="w-24 tracking-[0.2em]">送信日時</div><div>： 2021 12月5日 18:00</div></div>
  </div>
  
  <!-- Email Body with fake scrollbar on the right -->
  <div class="flex">
    <div class="flex-1 p-6 pb-12 leading-[2.2] whitespace-pre-wrap text-[16px]">アルバイトのみなさん

おつかれさまです。
今年もあと数週間となりました。そこで、年末年始（12月29日～1月3日）に仕事ができる方を募集します。出勤できる方は、希望の日にちと時間を12月10日までにメールでお知らせください。
なお、この期間中は時給を200円アップいたします。

オレンジマート
店長 高井</div>
    <!-- Scrollbar Track -->
    <div class="w-5 bg-gray-200 border-l border-gray-300 flex flex-col justify-between">
      <div class="h-4 bg-gray-300 border-b border-gray-400 flex items-center justify-center"><div class="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-600"></div></div>
      <div class="flex-1 px-0.5 py-1"><div class="w-full h-16 bg-gray-400 rounded-sm"></div></div>
      <div class="h-4 bg-gray-300 border-t border-gray-400 flex items-center justify-center"><div class="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-600"></div></div>
    </div>
  </div>
</div>"""

d['subSections'][0]['passage'] = email_html
with open('src/data/zenkamoku_n3/w05-d01.json', 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)

# W5 D5
with open('src/data/zenkamoku_n3/w05-d05.json', encoding='utf-8') as f:
    d = json.load(f)

tooth_html = """<div class="border border-gray-900 p-8 md:p-12 max-w-2xl mx-auto bg-white text-black font-serif shadow-sm">
  <div class="mb-8 text-lg font-bold">宮田様</div>
  
  <div class="leading-[2.5] text-justify whitespace-pre-wrap text-[16px]">　その後、<ruby>歯<rt>は</rt></ruby>の具合はいかがですか。前にいらっしゃってから半年が経ちましたので、定期<ruby>健診<rt>けんしん</rt></ruby>のお知らせをいたします。
　<ruby>歯<rt>は</rt></ruby>の<ruby>健康<rt>けんこう</rt></ruby>を守るためには、早く<ruby>虫歯<rt>むしば</rt></ruby>を発見し、治すことが大切です。自分では気がつかない小さい<ruby>虫歯<rt>むしば</rt></ruby>がないか、定期<ruby>健診<rt>けんしん</rt></ruby>で<ruby>確認<rt>かくにん</rt></ruby>しましょう。小さい<ruby>虫歯<rt>むしば</rt></ruby>ならば、その日のうちに<ruby>薬<rt>くすり</rt></ruby>をぬって治すこともできます。また、ご<ruby>希望<rt>きぼう</rt></ruby>があれば、チェックの後、<ruby>歯<rt>は</rt></ruby>のクリーニングをすることもできます。</div>
  
  <div class="my-8 text-center leading-loose text-[16px]">
    ご予約は、03-0123-0123までお電話ください。
  </div>
  
  <div class="flex justify-between items-end mt-12">
    <img src="/images/zenkamoku_n3/w05_d05_tooth.png" alt="Tooth Character" class="w-40 object-contain mix-blend-multiply" />
    <div class="text-right leading-loose text-[16px]">
      <div class="font-bold text-lg">デンタル石橋</div>
      <div>東京都杉山区金沢町50-52</div>
    </div>
  </div>
</div>"""

d['subSections'][3]['passage'] = tooth_html
with open('src/data/zenkamoku_n3/w05-d05.json', 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)

print("Applied perfect UI layouts.")
