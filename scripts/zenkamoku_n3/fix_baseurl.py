import re

with open('src/components/ZenkamokuPageViewer.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Insert processHtml helper
helper = """
  const processHtml = (htmlString) => {
    if (!htmlString) return '';
    const base = import.meta.env.BASE_URL.replace(/\\/$/, '');
    return htmlString.replace(/src="\\/images\\//g, `src="${base}/images/`);
  };
"""

code = code.replace('  const renderContent = () => {', helper + '\n  const renderContent = () => {')

# Replace dangerouslySetInnerHTML
code = code.replace('dangerouslySetInnerHTML={{ __html: sec.passage }}', 'dangerouslySetInnerHTML={{ __html: processHtml(sec.passage) }}')
code = code.replace('dangerouslySetInnerHTML={{ __html: sec.instruction }}', 'dangerouslySetInnerHTML={{ __html: processHtml(sec.instruction) }}')
code = code.replace('dangerouslySetInnerHTML={{ __html: q.stem }}', 'dangerouslySetInnerHTML={{ __html: processHtml(q.stem) }}')
code = code.replace('dangerouslySetInnerHTML={{ __html: sec.passageTitle }}', 'dangerouslySetInnerHTML={{ __html: processHtml(sec.passageTitle) }}')
code = code.replace('dangerouslySetInnerHTML={{ __html: sec.passageNote }}', 'dangerouslySetInnerHTML={{ __html: processHtml(sec.passageNote) }}')

with open('src/components/ZenkamokuPageViewer.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
print('Fixed HTML processing for image paths.')
