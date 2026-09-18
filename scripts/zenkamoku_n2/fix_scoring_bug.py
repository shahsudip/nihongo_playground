import sys

file_path = 'src/components/ZenkamokuPageViewer.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target1 = """{sec.questions?.map((q, qIdx) => (
                    <QuestionBlock key={qIdx} q={q} qIdx={qIdx} onAnswer={handleAnswer} />
                  ))}"""
replacement1 = """{sec.questions?.map((q, qIdx) => (
                    <QuestionBlock key={`${secIdx}-${qIdx}`} q={q} qIdx={`${secIdx}-${qIdx}`} onAnswer={handleAnswer} />
                  ))}"""

target2 = """{questions.map((q, qIdx) => (
                <QuestionBlock key={qIdx} q={q} qIdx={qIdx} onAnswer={handleAnswer} />
              ))}"""
replacement2 = """{questions.map((q, qIdx) => (
                <QuestionBlock key={`flat-${qIdx}`} q={q} qIdx={`flat-${qIdx}`} onAnswer={handleAnswer} />
              ))}"""

content = content.replace(target1, replacement1)
content = content.replace(target2, replacement2)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
