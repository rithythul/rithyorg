import re, sys
from pathlib import Path
import markdown
from ebooklib import epub

repo_root = Path(__file__).parent
manuscript_dir = repo_root / 'books' / 'minute-zero' / 'manuscript'
chapters_dir = manuscript_dir / 'chapter_drafts'
outline_path = manuscript_dir / 'Manuscript_Outline.md'
output_dir = repo_root / 'output'

chapter_files = sorted(chapters_dir.glob('chapter_*.md'), key=lambda p: int(re.search(r'chapter_(\d+)_', p.name).group(1)))
if not chapter_files:
    sys.exit(f'no chapters found in {chapters_dir}')

title_match = re.match(r'#\s+(.+)', outline_path.read_text(encoding='utf-8'))
if not title_match:
    sys.exit(f'no title heading on the first line of {outline_path}')

output_dir.mkdir(exist_ok=True)

book = epub.EpubBook()
book.set_title(title_match.group(1).strip())
book.set_language('en')
book.add_author('Rithy Thul')

chapters = []
for idx, chap_path in enumerate(chapter_files, start=1):
    with open(chap_path, 'r', encoding='utf-8') as f:
        md = f.read()
    html = markdown.markdown(md, extensions=['fenced_code', 'tables'])
    c = epub.EpubHtml(title=chap_path.stem.replace('_', ' ').title(), file_name=f'chap_{idx}.xhtml', lang='en')
    c.content = html
    book.add_item(c)
    chapters.append(c)

book.toc = tuple(chapters)
book.spine = ['nav'] + chapters
book.add_item(epub.EpubNcx())
book.add_item(epub.EpubNav())

output_path = output_dir / 'nyt-cyber-expose.epub'
epub.write_epub(str(output_path), book, {} )
print(f'EPUB written to {output_path}')
