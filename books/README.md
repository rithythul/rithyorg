# Books

One folder per book. This table is the inventory; update it when a book changes status or moves on or off the site.

| Order | Book | Kind | Status | On the site | Folder |
|---|---|---|---|---|---|
| 1 | Somehow: Still Building | Non-fiction | Writing in progress | Yes, at `/book` | `somehow/` |
| 2 | Minute Zero | Fiction | Manuscript drafts | No, hidden | `minute-zero/` |

## What "on the site" means

The site is the Next.js app in `rithyorg/`, deployed from that folder alone.
A book is on the site only if the app has a page record for it.
`Somehow: Still Building` has one: `rithyorg/content/pages/book.json`, which feeds `/book`, the home page and `/about`.
`Minute Zero` has none, and it lives outside `rithyorg/`, so nothing in it can ship with the site.

To show a book, write its record in `rithyorg/content/pages/` and add the page; to hide it again, delete the record.
Keep the `On the site` column above in step.

## Building the Minute Zero EPUB

`build_epub.py` at the repo root reads `minute-zero/manuscript/` and writes `output/nyt-cyber-expose.epub`.
It is run by `.github/workflows/build_epub.yml` on every push to `master`.
