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
| `/` | Crypto digest cards | Home: hero, book, notes & writing, SmallWorld |
| `/book` | none | Book page (new) |
| `/writing` | "Coming soon" | Full index: essays and crypto digests, by year |
| `/writing/<slug>` | none | Essays from `content/posts/*.md` (none published yet) |
| `/crypto` | Digest cards and filter buttons that did nothing | Digest series index (kept, out of main nav) |
| `/crypto/<slug>` | 8 digests | Same 8 URLs and canonicals, new article layout |
| `/about` | Generic archive text | Short factual biography |
| `/projects` | Empty "Coming soon" | **308 permanent redirect to `/about`** |
| `/privacy`, `/terms` | Kept | Kept, text unchanged. The footer "Terms" link used to point to `/privacy`; now fixed |
| `/sitemap.xml`, `/robots.txt` | Kept | Sitemap lists published routes only; `/projects` removed, `/book` added |

There were no feeds, forms, subscriptions, images, or Khmer content in the
repository. Nothing like that was removed.

## Deployment

The repository has no hosting config: no `vercel.json`, Netlify, or Docker
files. The site is a standard Next.js server build. `redirects()` in
`next.config.ts` needs a Next-aware host (Vercel, `next start`), not a static
export.

Before cutover:

1. Deploy this branch as a preview on the existing host. On Vercel, preview
   URLs are sent with `X-Robots-Tag: noindex` automatically. Other hosts
   need the equivalent set up.
2. Check that the live rithy.org serves nothing this repository lacks, such
   as older essays from another system. If it does, add them to
   `content/posts/` with their original slugs, or add redirects, first.
3. Set the project root to `rithyorg/` and the build command to
   `bun run build`.

Cutover: promote the reviewed preview to production.

Rollback: promote the previous production deployment, or revert the merge
commit and redeploy. The change includes no data migrations or new services.
