# rithy.org redesign: preview, migration, deployment

## Preview locally

```sh
cd rithyorg
bun install
bun run build && bun run start   # http://localhost:3000
bun test                          # content and routing tests
bun run typecheck
```

## Design rules

Simplicity comes from saying no. Keep these when changing the site:

- **One focus per page.** The home page leads with the book. It has one
  filled button, **About the book**. Other actions are text links.
- **Say each thing once.** Lists hide the topic column when every row
  shares a topic. Articles skip the topic label when the back link names it.
  Lists show titles, not excerpts. Digests open on their TL;DR, not on a
  repeated summary.
- **One system.** Every size and gap comes from the tokens at the top of
  `app/globals.css`: 5 text sizes, 2 display sizes, and 8px-based spacing.
  Every two-column section uses `--split`.
- **Care in the details.** Headlines use balanced wrapping and paragraphs
  avoid orphans. Date figures line up (tabular numerals). Browser chrome
  matches the paper colour. The favicon and "Writing in progress" marker
  reuse the wordmark's rust period. Text selection uses the accent.
- **Nothing decorative.** No shadows, gradients, rounded pills, animation,
  or stock imagery.

## URL changes

| URL | Before | After |
|---|---|---|
| `/` | Crypto digest cards | Home: hero, book, four featured essays, SmallWorld |
| `/book` | none | Book page (new) |
| `/writing` | "Coming soon" | Full index: 15 essays and 8 crypto digests, by year |
| `/writing/<slug>` | none on `main` | The 15 essays from the previous site, same slugs (see below) |
| `/crypto` | Digest cards and filter buttons that did nothing | Digest series index (kept, out of main nav) |
| `/crypto/<slug>` | 8 digests | Same 8 URLs and canonicals, new article layout |
| `/about` | Generic archive text | Short factual biography |
| `/projects` | Empty "Coming soon" | Project list restored from the previous site |
| `/social` | none on `main` | Social links restored from the previous site |
| `/privacy`, `/terms` | Kept | Kept, text unchanged. The footer "Terms" link used to point to `/privacy`; now fixed |
| `/sitemap.xml`, `/robots.txt` | Kept | Sitemap lists published routes only; `/projects` removed, `/book` added |

There were no feeds, forms, subscriptions, images, or Khmer content in the
repository. Nothing like that was removed.

### Essays from the previous site

`main` did not contain the essays. They were on older branches of this
repository with unrelated history (`v2`, `feat-minimalist-typography-redesign`).
The 15 posts in `content/posts/` were copied verbatim from commit `23a3aab`,
the last content commit by rithythul. The only change is a `featured: true`
line on the four essays shown on the homepage. Their front matter
(`description`, `status: "draft"`) is read as-is. Where an essay body uses an
H1, its headings are shifted down one level so the page keeps a single H1.

Not carried over: `book/toc.md` (manuscript planning, not for publication),
the cross-posting workflow (it posts to social networks and needs secrets and
a script not in this history), and Vercel Analytics (not re-added without a
decision).

## Deployment

The repository has no hosting config: no `vercel.json`, Netlify, or Docker
files. The site is a standard Next.js server build. `redirects()` in
`next.config.ts` needs a Next-aware host (Vercel, `next start`), not a static
export.

Before cutover:

1. Deploy this branch as a preview on the existing host. On Vercel, preview
   URLs are sent with `X-Robots-Tag: noindex` automatically. Other hosts
   need the equivalent set up.
2. Check the preview against the live site: every live `/writing/<slug>`
   should load on the preview too.
3. The previous site lived at the repository root. This one lives in
   `rithyorg/`, so the Vercel project's Root Directory must be `rithyorg`,
   install `bun install`, build `bun run build`.

Cutover: promote the reviewed preview to production.

Rollback: promote the previous production deployment, or revert the merge
commit and redeploy. The change includes no data migrations or new services.
