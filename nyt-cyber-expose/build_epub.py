import os, re, sys
from pathlib import Path
import markdown
from ebooklib import epub

# Paths
repo_root = Path(__file__).parent
chapters_dir = repo_root / 'manuscript' / 'chapter_drafts'
output_dir = repo_root / 'output'
output_dir.mkdir(exist_ok=True)

# Gather chapter files sorted by numeric prefix
chapter_files = sorted(chapters_dir.glob('chapter_*.md'), key=lambda p: int(re.search(r'chapter_(\d+)_', p.name).group(1)))

book = epub.EpubBook()
# Use title from Table of Contents first header line if available
toc_path = repo_root / 'manuscript' / 'Table_of_Contents.md'
title = 'Untitled Manuscript'
if toc_path.exists():
    with open(toc_path, 'r', encoding='utf-8') as f:
        for line in f:
            m = re.search(r'##\s*(.+)', line)
            if m:
                title = m.group(1).strip()
                break
book.set_title(title)
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

# Define Table Of Contents and Spine
book.toc = tuple(chapters)
book.spine = ['nav'] + chapters
# Add default NCX and Nav files
book.add_item(epub.EpubNcx())
book.add_item(epub.EpubNav())

output_path = output_dir / 'nyt-cyber-expose.epub'
epub.write_epub(str(output_path), book, {} )
print(f'EPUB written to {output_path}')
