import sys

file_path = 'src/components/BookQuizTakerPage.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix question text rendering (handle `stem` vs `questionText`)
old_q_render = """<h2 className="text-xl md:text-2xl font-medium japanese-text leading-relaxed" dangerouslySetInnerHTML={{ __html: currentQ.questionText.replace(/^(問い|問\d+)/, '<span class="text-[var(--color-primary)] font-bold">$&</span>').replace(/ (A「|B「|A：|B：|男：|女：|男の人：|女の人：|店員：|客：|Ａ「|Ｂ「|Ａ：|Ｂ：)/g, '<br />$1') }}></h2>"""

new_q_render = """<h2 className="text-xl md:text-2xl font-medium japanese-text leading-relaxed" dangerouslySetInnerHTML={{ __html: (currentQ.questionText || currentQ.stem || '').replace(/^(問い|問\d+)/, '<span class="text-[var(--color-primary)] font-bold">$&</span>').replace(/ (A「|B「|A：|B：|男：|女：|男の人：|女の人：|店員：|客：|Ａ「|Ｂ「|Ａ：|Ｂ：)/g, '<br />$1') }}></h2>
          
          {/* Audio Player Support for Listening Questions */}
          {currentQ.audioSrc && (
            <div className="mt-4 p-4 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)] flex items-center justify-center">
              <audio controls controlsList="nodownload" className="w-full max-w-md" key={currentQ.audioSrc}>
                <source src={`${import.meta.env.BASE_URL.replace(/\\/$/, '')}${currentQ.audioSrc}`} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          
          {/* Image Support directly on Question level */}
          {currentQ.imageSrc && !currentQ.passageText && (
            <div className="mt-4 p-4 text-center bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)]">
              <img src={`${import.meta.env.BASE_URL.replace(/\\/$/, '')}${currentQ.imageSrc}`} alt="Question illustration" className="max-w-full h-auto rounded-lg mx-auto" />
            </div>
          )}"""

if "{/* Audio Player Support for Listening Questions */}" not in content:
    content = content.replace(old_q_render, new_q_render)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ Fixed BookQuizTakerPage: added stem fallback and audio player support!")
else:
    print("✅ Already fixed.")
