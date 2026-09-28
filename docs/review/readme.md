# Redesign review evidence

Branch `redesign/smallworld-reading`, measured 2026-09-28 against a local production build (`bun run build`, `bun run start -p 3100`).
Lab and headless-browser results only; no real readers, real devices or field data were involved.

## Screenshots

| File | Shows |
|---|---|
| `home-1440-light.png`, `home-768-light.png`, `home-390-light.png`, `home-320-light.png` | Home at desktop, tablet and phone widths (full page) |
| `home-1440-dark.png`, `home-390-dark.png` | Home with dark theme chosen (first viewport) |
| `writing-1440-light.png`, `about-1440-light.png` | Page titles in the gold sticker style (first viewport) |
| `book-1440-light.png` | `/book` (full page) |
| `writing_finding-a-path-{390,1440}-{light,dark}.png` | Article opening in both themes (first viewport) |
| `crypto_category_zzz-390-light.png` | Crypto filter with no matches |
| `does-not-exist-390-light.png` | 404 page |
| `khmer-fixture-390.png` | An unpublished Khmer paragraph injected into an article in the browser; no Khmer is published |
| `reference-desktop.png` | smallworld.xyz, the style reference |

## Design decisions made in review

- Cream light is the default for everyone; dark is opt-in from the footer toggle and no longer follows the system setting (rithythul's call).
- Home H1 is "Building / Learning / Writing" on three lines, no separators (rithythul's call).
- The company is written "smallworld" in all site copy; the two historical essays that say "SmallWorld" are left as published.
- Page titles in Bagel Fat One use smallworld's gold sticker treatment (gold fill, ink stroke, hard ink shadow), as smallworld.xyz does for its display titles; section headings, the book title and article titles stay plain ink.
- Layout lines reduced: none under the header, around the book panel or above the article footer; the remaining section, list, article-title and footer lines are 35% ink. Control and table borders stay full strength (Jev: `layout_lines remove_redundant_soften_rest p=1.0`).
- Site copy follows the Building / Learning / Writing pattern: one name per section ("Writing", "Essays", "Crypto archive"), plain project descriptions without hype words, /about in Building, Learning, Writing and Work with me sections, and an email address on Connect for partners, funders and investors.
- The home intro and book copy were rewritten; "My life is the thread connecting the story" was an authoring note, not reader copy, and is gone from home and `/book`.
- `/terms` and `/crypto/privacy` restore the live legal text verbatim instead of redirecting to `/privacy` (Jev: `legal_pages restore_live_verbatim p=0.99`).

## Per page

| Page | What it does | States checked |
|---|---|---|
| `/` | Hero, book feature with the green "About the book" action, three curated essays, smallworld section | 320/390/768/1440, both themes, keyboard order, 200% text |
| `/writing` | 16 essays, 15 per page, `?page=2` | Pagination with and without JS, back navigation keeps scroll |
| `/writing/[slug]`, `/crypto/[slug]` | Article, back link to its own archive | Direct load, reload, back; crypto articles add the BitcoinPrahok link |
| `/book` | Book record, three approved paragraphs, related writing | Keyboard and touch from home |
| `/about` | Short factual sections, links to smallworld and the book | |
| `/crypto` | 32 articles, topic filter as a plain GET form | Filter without JS, unknown topic shows the empty state |
| `/crypto/privacy`, `/terms`, `/privacy` | Legal text | |
| `/projects`, `/social` | 11 project descriptions; four profiles | |
| 404 | Link back to Writing | Returns HTTP 404 |

## Accessibility

axe-core (WCAG 2.0/2.1/2.2 A and AA) ran on 17 routes × 4 widths (320, 390, 768, 1440) × 2 themes = 136 page views.

- The only violations are `color-contrast` on the gold sticker titles in light mode (52 page views).
  axe measures the gold fill against cream (1.72:1) and ignores the ink stroke.
  Every glyph is outlined in ink, which is 13.61:1 on cream and 7.9:1 against the gold, and the titles are at least 2.8rem.
  WCAG's understanding of 1.4.3 allows an outline to supply the contrast, so this is recorded rather than suppressed; if a strict axe pass is required, the fallback is ink titles in light mode.
- In dark mode the gold is 8.98:1 on the background and axe passes.
- No horizontal overflow on any page view; no interactive control outside running text smaller than 44px tall.
- Exactly one `h1` per page; header, nav, main and footer landmarks on every page.
- Keyboard: first Tab lands on "Skip to content", Enter moves focus to `main`; the first 14 tab stops on home (header, hero, book, writing list, smallworld, footer) each show a solid 3px outline and follow the visual order.
- `prefers-reduced-motion: reduce` sets transitions to 0s. The only motion anywhere is a 140ms colour transition on links and buttons.
- At 200% root text size on a 1280px viewport, no page overflows or clips.
- Lighthouse accessibility score: 100 on all four audited pages.

Palette contrast (text on background):

| Pair | Light | Dark |
|---|---|---|
| Body text | 13.61 | 15.47 |
| Muted text on page | 5.91 | 9.59 |
| Muted text on book panel | 5.45 | 7.98 |
| Green links on page | 6.16 | 10.43 |
| Button label on green | 6.16 | 10.43 |

## Flows

- Home → Writing → article → Back, by keyboard: returns to `/writing` at the same scroll position (600px), and a reload keeps all 15 items.
- Home → Book by keyboard and by touch (390px, touch emulation): both land on `/book` with one activation.
- Home → Writing → article → Back by touch: works.
- Without JavaScript: header links, article links, `/writing?page=2` and the crypto topic filter all work. The theme toggle does not render, so no-JS readers get the light theme.
- The theme choice survives a reload.
- Scrolling is ordinary document scrolling; there is no intro, splash or extra click before the writing.

## Performance

Lighthouse 13.5.0, mobile form factor, simulated throttling (150ms RTT, 1.6Mbps, 4× CPU slowdown, 412×823 screen), headless Chromium, local server.

| Page | Perf | A11y | Best practices | SEO | FCP | LCP | TBT | CLS | Transfer KB | JS KB | Fonts KB |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | 98 | 100 | 100 | 66 | 0.8 s | 2.1 s | 150 ms | 0 | 171 | 103.5 | 56.8 |
| `/writing/finding-a-path` | 98 | 100 | 100 | 66 | 0.8 s | 2.0 s | 140 ms | 0 | 173.9 | 103.5 | 56.8 |
| `/book` | 98 | 100 | 100 | 66 | 0.8 s | 2.1 s | 140 ms | 0 | 170.7 | 103.5 | 56.8 |
| `/crypto` | 96 | 100 | 100 | 54 | 0.8 s | 2.1 s | 190 ms | 0 | 174.5 | 103.5 | 56.8 |

- LCP is within the 2.5s target on every audited page.
- The SEO score is low because preview builds are deliberately `noindex`; production builds with `SITE_ENV=production` are indexable.
- `/crypto` also loses the meta-description check: Next.js 15 streams metadata into the body for dynamic pages when the user agent is not a known crawler. A request with a Googlebot user agent receives the description in the head.
- Fonts on disk: Bagel Fat One 24.4KB, Baloo 2 variable 33.2KB, 57.6KB together against a 200KB budget. There is no decorative art.
- Layout shift measured in the browser on a cold cache at 390px over a throttled connection, including the font swap: home 0.024, article 0.001, book 0.041. Lighthouse reports 0.
- Lab numbers do not establish real-world INP; field data only comes after launch.

## Limitations

- Headless Chromium only: no Safari, Firefox or physical phones, and no screen reader.
- Readers have not tried the site; the flows above show that the paths work, not that they are easy to use.
- Khmer was checked with an injected paragraph rendered on the machine's installed Khmer font; the display fonts are Latin-only, so a Khmer title would fall back to system fonts.
- The live `/crypto/privacy` text says the site uses Vercel Analytics; this build has no analytics. Either enable Vercel Analytics at deploy or change that sentence before cutover.
- Hosting settings for rithy.org live in the Vercel dashboard and were not inspected.
- No RSS or Atom feed exists, here or on the live site (checked `/feed.xml`, `/rss.xml`, `/atom.xml`, `/feed`, `/rss`, `/index.xml`).
