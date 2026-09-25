"""
Zenkamoku Standard Passage Box Templates & Utilities (for N1, N2, and N3)

Standard archetypes adhering to Zenkamoku Dokkai formatting standards:
1. Email Window (with fake title bar and scrollbar, dark/light adaptive)
2. Memo / Note Card (font-serif, subtle border, stacked date/author footer)
3. Notice Card (font-sans, centered title, arrow transfer items)
4. Postcard (postcard style with contact address and footer)
5. Lined Paper (.speed-master-lined-paper container with optional footnotes)
"""

def get_email_template(recipient: str, subject: str, send_time: str, body_text: str) -> str:
    return f'''<div class="border-2 border-gray-500 dark:border-gray-600 rounded-t-md overflow-hidden font-sans max-w-3xl mx-auto shadow-sm bg-amber-50/20 dark:bg-slate-900/60 text-black dark:text-white relative">
  <!-- Window Title Bar -->
  <div class="bg-[#555555] px-2 py-1.5 flex justify-end items-center gap-1.5 border-b-2 border-gray-700">
    <div class="w-4 h-4 border-2 border-white rounded-sm"></div>
    <div class="w-4 h-4 border-2 border-white rounded-sm"></div>
    <div class="w-4 h-4 border-2 border-white rounded-sm flex items-center justify-center text-[10px] font-bold text-white relative">
      <div class="absolute w-2.5 h-0.5 bg-amber-50/20 dark:bg-slate-900/60 rotate-45"></div>
      <div class="absolute w-2.5 h-0.5 bg-amber-50/20 dark:bg-slate-900/60 -rotate-45"></div>
    </div>
  </div>
  
  <!-- Email Meta -->
  <div class="p-5 border-b border-gray-300 dark:border-gray-700 leading-loose text-[15px]">
    <div class="flex"><div class="w-24 tracking-[0.5em]">あて先</div><div>： {recipient}</div></div>
    <div class="flex"><div class="w-24 tracking-[0.5em]">件名</div><div>： {subject}</div></div>
    <div class="flex"><div class="w-24 tracking-[0.2em]">送信日時</div><div>： {send_time}</div></div>
  </div>
  
  <!-- Email Body with fake scrollbar on the right -->
  <div class="flex">
    <div class="flex-1 p-6 pb-12 leading-[2.2] whitespace-pre-wrap text-[16px]">{body_text}</div>
    <!-- Scrollbar Track -->
    <div class="w-5 bg-gray-200 dark:bg-slate-800 border-l border-gray-300 dark:border-gray-700 flex flex-col justify-between">
      <div class="h-4 bg-gray-300 dark:bg-slate-700 border-b border-gray-400 dark:border-gray-600 flex items-center justify-center"><div class="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-600 dark:border-b-gray-300"></div></div>
      <div class="flex-1 px-0.5 py-1"><div class="w-full h-16 bg-gray-400 dark:bg-slate-600 rounded-sm"></div></div>
      <div class="h-4 bg-gray-300 dark:bg-slate-700 border-t border-gray-400 dark:border-gray-600 flex items-center justify-center"><div class="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-600 dark:border-t-gray-300"></div></div>
    </div>
  </div>
</div>'''


def get_memo_template(addressee: str, body_text: str, sender: str, timestamp: str = "") -> str:
    timestamp_html = f'<div class="text-[15px]">{timestamp}</div>' if timestamp else ""
    return f'''<div class="border-2 border-gray-600 dark:border-gray-400 p-6 md:p-8 max-w-2xl mx-auto rounded-sm bg-amber-50/20 dark:bg-slate-900/60 font-serif leading-loose text-black dark:text-white shadow-sm">
  <div class="mb-4 font-bold text-lg">{addressee}</div>
  <div class="leading-[2.2] whitespace-pre-wrap text-[16px]">{body_text}</div>
  <div class="text-right mt-6 leading-relaxed">
    {timestamp_html}
    <div class="font-bold text-lg">{sender}</div>
  </div>
</div>'''


def get_notice_template(header: str, body_text: str, items_html: str, footer_sender: str) -> str:
    return f'''<div class="border-2 border-gray-600 dark:border-gray-400 p-6 md:p-8 max-w-2xl mx-auto rounded-sm bg-amber-50/20 dark:bg-slate-900/60 font-sans leading-loose text-black dark:text-white shadow-sm">
  <div class="text-center font-bold text-lg mb-6">{header}</div>
  <div class="leading-[2.2] text-[16px] mb-6 indent-4">{body_text}</div>
  <div class="space-y-3 mb-8 text-[15px] pl-2 md:pl-4">
    {items_html}
  </div>
  <div class="text-right font-medium text-[16px]">{footer_sender}</div>
</div>'''


def get_postcard_template(recipient: str, body_text: str, callout_text: str, sender_name: str, address: str, icon_or_diagram: str = "🪥🦷") -> str:
    return f'''<div class="border-2 border-gray-600 dark:border-gray-400 p-8 md:p-12 max-w-2xl mx-auto bg-amber-50/20 dark:bg-slate-900/60 text-black dark:text-white font-serif shadow-sm rounded-sm">
  <div class="mb-8 text-lg font-bold">{recipient}</div>
  
  <div class="leading-[2.5] whitespace-pre-wrap text-[16px]">{body_text}</div>
  
  <div class="my-8 text-center leading-loose text-[16px]">
    {callout_text}
  </div>
  
  <div class="flex justify-between items-end mt-10">
    <div class="text-4xl select-none">{icon_or_diagram}</div>
    <div class="text-right leading-loose text-[16px]">
      <div class="font-bold text-lg">{sender_name}</div>
      <div>{address}</div>
    </div>
  </div>
</div>'''
