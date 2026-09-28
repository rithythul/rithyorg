# rithy.org

Personal site of rithythul: writing, the book in progress, and the crypto archive.
The Next.js app lives in `rithyorg/`; everything else at the root (`academic/`, `build_epub.py`, `profile.md`, `selendra-wdk/`) is unrelated to the site.

## Setup

Requires [Bun](https://bun.sh) 1.3 or later.
Every command below runs from the app directory, because content paths resolve from the working directory.

```sh
cd rithyorg
bun install
bun run dev          # http://localhost:3000
```

Checks, all from `rithyorg/`:

```sh
bun test             # archive preservation, dates, drafts, sanitizer, slugs, pagination, filter topics
bun run typecheck
bun run build
```

## Local production preview

```sh
cd rithyorg
bun run build
bun run start -p 3100 -H 127.0.0.1   # http://127.0.0.1:3100
```

A preview build sends `X-Robots-Tag: noindex, nofollow`, a `noindex` robots meta tag, and a `Disallow: /` robots.txt.
Only a Vercel production build (`VERCEL_ENV=production`, set by Vercel) or a build with `SITE_ENV=production` is indexable.

## App structure

| Path | Holds |
|---|---|
| `app/` | Routes: home, `/writing`, `/writing/[slug]`, `/book`, `/about`, `/crypto`, `/crypto/[slug]`, `/crypto/privacy`, `/projects`, `/social`, `/terms`, `/privacy`, 404, sitemap, robots |
| `components/` | Header, footer, theme toggle, article, writing list, archive tabs, pagination, book feature |
| `lib/content.ts` | Reads, validates, sanitizes and sorts Markdown content |
| `lib/metadata.ts` | Canonical URLs (always `https://rithy.org`) and Open Graph metadata |
| `content/posts/` | Essays, served at `/writing/<file-name>` |
| `content/crypto/` | Crypto articles and digests, served at `/crypto/<file-name>` |
| `content/pages/book.json` | The book record shared by the home page and `/book` |
| `content/pages/projects.json` | Project descriptions for `/projects` |
| `public/fonts/` | Bagel Fat One and Baloo 2 Latin subsets (WOFF2) with their OFL licences |

Pages are server-rendered or static HTML with ordinary links, so reading, navigation, archive pagination and the crypto topic filter all work without JavaScript.
Only the theme toggle and the current-page marker in the header hydrate.

## Writing and drafts

Add a Markdown file to `content/posts/` (essays) or `content/crypto/` (crypto).
The file name is the URL slug: lowercase letters, digits and hyphens only.

```yaml
---
title: "Title of the piece"
date: "2026-10-01"
author: "rithythul"
description: "One or two sentences for search results and link previews."
tags: ["cambodia", "startup"]
status: "published"
---
```

- `title` is required; a missing title or an unparseable `date` fails the build.
- A piece is hidden when it has `draft: true`, a `status` other than `published`, or a `date` in the future.
- A future-dated piece appears in the archive lists and at its URL once its date passes; the sitemap picks it up at the next build.
- New pieces use `author: "rithythul"`; older pieces keep their original byline or none.
- Markdown is rendered and sanitized: scripts, event handlers and `javascript:` links are removed; tables, code, images and `lang` attributes are kept.
- A leading `# Title` that repeats the frontmatter title is dropped; any other `#` heading renders as `h2`.
- Set `lang: "km"` for Khmer pieces; files containing Khmer script are detected automatically.
- The crypto filter offers the topics in `cryptoTopics` in `lib/content.ts`; a test fails if a topic matches no article.

## Where the archive came from

`main` held eight crypto digests and an empty Writing page; the live site held a separate, larger archive.
The 48 article URLs (16 essays, 32 crypto) are recorded in `docs/content-inventory.json` with their provenance:

- 12 essays restored byte-for-byte from `origin/feat-minimalist-typography-redesign`, only where their rendered text matched the live page.
- 4 essays and 24 crypto articles recovered from the published HTML on 2026-09-28 and stored as sanitized HTML inside Markdown files. Their dates are the live published dates (`livePublishedDate` in the inventory); prose was not edited.
- The 8 original `main` digests are unchanged byte-for-byte.
- `bitcoin-2025` and `bitcoin-analysis-2025` were published with the same body at two URLs; both are kept.
- `/terms` and `/crypto/privacy` carry the live text verbatim; `/privacy` keeps `main`'s text.
- The favicon is the live `/favicon.svg`, identical to the copy on `origin/feat-minimalist-typography-redesign`.

`bun test` fails if any archived article disappears, its body text changes, or its date drifts from the live date.

## Deploying

The live site is served by Vercel (`server: Vercel` on rithy.org).
No Vercel or other hosting configuration is in this repository, so the project settings live in the Vercel dashboard; confirm them before cutting over:

1. Root directory `rithyorg`, install `bun install`, build `bun run build`, framework Next.js.
2. Nothing to set for indexing: Vercel production builds are indexable, previews are not. On another host, build with `SITE_ENV=production`.
3. Deploy the branch as a preview first and check `/`, `/writing`, an article, `/book`, `/crypto?category=bitcoin`, `/crypto/privacy`, `/sitemap.xml` and `/robots.txt`.
4. Promote to production.

`.github/workflows/build_epub.yml` builds an unrelated EPUB and is not part of the site.

### Rollback

In Vercel, promote the previous production deployment (Deployments → the last good one → Promote to Production); this needs no rebuild.
From git, revert the merge commit on the production branch and redeploy.

## Review evidence

`docs/review/readme.md` has screenshots, per-page notes, accessibility and performance measurements and the known limitations.
