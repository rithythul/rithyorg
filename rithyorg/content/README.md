# Content

Everything the site publishes comes from this folder. Files are trusted,
repository-authored Markdown rendered with `marked` (no MDX, nothing executed).

## `book/index.md`

The single record for the book. The homepage feature and `/book` both read it.

- `title`, `author`, `label`, `status`, `statusNote`: shown as written.
- `summary`: the short paragraphs on the homepage feature.
- Body: the approved `/book` page copy.

An approved introduction can go in `book/introduction.md`. It only appears on
`/book` when its front matter says `approved: true`. Manuscript drafts do not
belong in this folder.

## `posts/*.md` → `/writing/<file-name>`

Essays and notes. Front matter:

```yaml
title: "Title"
date: 2026-10-01        # real publication date; omit if unknown
excerpt: "One or two sentences for lists and search results."
topic: "SmallWorld"     # short label shown in lists (defaults to first tag)
tags: [smallworld]
author: "rithythul"     # default for new essays
lang: "en"              # use "km" for Khmer
featured: true          # optional: pin to the homepage list
draft: true             # drafts are left out of routes, lists, and the sitemap
```

## `crypto/*.md` → `/crypto/<file-name>`

The crypto digest series. Same front matter; `canonicalUrl` is kept as given.
