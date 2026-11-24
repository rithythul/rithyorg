# Pattern catalog

The full list behind SKILL.md. Each entry is a candidate, not an automatic edit. Read the context and the carve-out before changing anything. Quoted examples of bad writing (like the ones in this file) are exempt.

Condensed and adapted from [conorbronsdon/avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing) v3.39.0 (MIT). See NOTICE.md.

## Severity

P0, credibility killers. Fix on sight.
- Cutoff disclaimers ("As of my last update", "based on available information").
- Chatbot residue ("I hope this helps", "Great question", "Certainly!").
- Vague attribution ("experts believe") and unnamed validation ("independent benchmarks show we lead").
- Significance inflation on routine events.
- Paste leaks: citation tokens, AI-referrer URL parameters, unfilled placeholders.

P1, obvious tells. Fix before publishing.
- Tier 1 words, template phrases, "Let's" openers, synonym cycling, formulaic openings, bold overuse.
- Future-narrative closers, social endorsement closers, lingering-attention claims, narrated candor.
- Hedge stacks, real/actual inflation, moral words on objects, invented contrast pairs.
- Bullet lists of five or more bare noun phrases. Three or more distinct boilerplate phrases in one piece.

P2, polish. Fix when time allows.
- Generic conclusions, rule of three, uniform paragraphs, copula swaps, transition words.
- Repeated setup-and-reversal punchlines, staccato runs, same-opener runs.
- Unnecessary hyphens, title-case headings, list-label periods.

Quick pass: P0 and P1. Full audit: all three.

## Words

Match inflected forms (leverage, leveraging, leveraged) unless the variant has its own honest sense.

Tier 1, review every match:

| Replace | With |
|---|---|
| delve, deep dive, dive into, unpack | look at, examine, explain |
| landscape, realm (metaphor) | field, area, market |
| tapestry, symphony (metaphor) | describe the actual mix |
| paradigm | model, approach |
| embark | start |
| beacon (metaphor) | name what sets the example |
| testament to, underscores, showcasing | shows |
| robust, comprehensive | strong, thorough, complete |
| cutting-edge | latest, newest |
| leverage (verb) | use |
| pivotal, crucial | important, or say why |
| meticulous | careful, precise |
| seamless | smooth, or say what friction is gone |
| game-changer, watershed moment | say what changed |
| nestled, vibrant, thriving, bustling | is in, active, growing, or cite a number |
| intricate, complexities | name the complexity |
| ever-evolving, enduring | say how it changes, how long it lasted |
| holistic, actionable, impactful | complete, practical, effective, or describe it |
| learnings, best practices | lessons, what works |
| synergy, interplay | combined effect, relationship |
| embrace (metaphor) | adopt, switch to |
| load-bearing (abstract: assumption, claim, premise) | essential, or say what breaks without it |
| genuine, genuinely, truly (intensifier) | cut |
| the future looks bright, only time will tell | cut |

Clarity edits. Good editing, but not evidence of AI authorship: utilize → use, in order to → to, due to the fact that → because, serves as → is, features / boasts → has, commence → start, ascertain → find out, endeavor → try.

Tier 2, flag when two or more share a paragraph: harness, navigate, foster, elevate, unleash, streamline, empower, bolster, spearhead, resonate, revolutionize, facilitate, underpin, nuanced, multifaceted, ecosystem, myriad, plethora, encompass, catalyze, reimagine, galvanize, augment, cultivate, illuminate, elucidate, transformative, cornerstone, paramount, poised, burgeoning, nascent, quintessential, overarching, quietly, deeply (as in "deeply committed").

Tier 3, flag only when one word repeats at least max(3, 3% of word count) times: significant, innovative, effective, dynamic, scalable, compelling, unprecedented, exceptional, remarkable, sophisticated, instrumental, world-class, state-of-the-art.

Boilerplate phrases, flag at two uses of one phrase or three distinct ones: emerging sector, the integration of, the intersection of, community-driven, long-term sustainability, user engagement, designed for long-term.

Technical carve-out: in docs and technical writing, robust, comprehensive, seamless, ecosystem, leverage, facilitate, underpin, streamline and "test harness" can be terms of art. Still flag ornamental uses.

## Stock phrases

Template slots. "A major step towards...", "a significant step forward for...", "I recently had the pleasure of...". Say what changed or what happened. Neutral uses ("a first step towards the full API") pass.

Transitions. "Moreover", "Furthermore", "Additionally", "In today's [X]", "In an era where", "In conclusion", "To summarize", "When it comes to", "At the end of the day", "That being said". Restructure so the link is obvious, or use and, also, but.

Filler. "It is important to note that", "In terms of", "The reality is that". State the thing.

Confidence cues. "Interestingly", "Importantly", "Surprisingly", "Undoubtedly", "Without a doubt", "Make no mistake", "Fundamentally", "The truth is". Let the fact carry the feeling. One "notably" in 2,000 words is fine; three in 500 is stacking. "This matters because" passes when a real consequence follows ("retries can charge the customer twice").

Vague endorsement. "Worth reading", "worth a look", "worth exploring". Give the reason or cut.

Numbered-list inflation. "Five things to know", "Three key takeaways". Use a count only when the source has that many parallel items.

Dev-blog slogans. "It just works", "zero config", "batteries included", "sane defaults", "fits in your head". Name the behavior the source supports ("installs with no config file").

Empty concessions. "Not always. Not perfectly." repeated to stage honesty. Keep concessions that name the limit ("Not during failover").

Diff-anchored docs. "This function was added to replace the previous approach..." Describe current behavior. Changelogs, release notes, migration guides and decision records narrate change correctly.

Domain collision. In crypto writing, "the launch is our proof" can read as a cryptographic proof. Say "evidence" when you mean evidence.

## Sentence patterns

Negative parallelism. "It's not X, it's Y", the split form across two sentences, and the multi-negation countdown. Write the positive claim. Carve-out: a literal correction ("It isn't a timeout, it's a refused connection") stays. List constraints ("no dependencies, no telemetry") are content.

Tailing negation. "The options come from the selected item, no guessing." Write it as a real clause or cut it.

Negation chains. "No fluff, no filler, no jargon." "It didn't ask. It didn't wait." Say what the thing is.

Hedge stacks. "Could potentially", "may eventually". Keep the one qualifier that carries the real uncertainty. "Might reduce latency if the working set fits in memory" keeps both: the condition is content.

Hollow "actually". Delete it when it only adds emphasis. Keep it when it marks a stated expectation ("we expected a cache hit; it was actually a miss").

Real/actual inflation. "Real on-chain tokenomics." Drop the adjective unless the sentence names the fake version ("real settlement, not bridged IOUs").

Moral words on objects. "An honest shape", "flagged honestly". Use the concrete property, or cut. Related: assumptions don't "stop being true", they "no longer hold". Drop unverifiable universals ("taught in every course").

Copula swaps. "Serves as", "stands as", "boasts", "features", "represents". Default to is or has. Carve-out: an actual role ("Mina serves as chair").

Aphorism formulas. "X is the language of Y." State the claim the formula gestures at. Established idioms and quotations stay.

Invented contrast pairs. "False precision rather than genuine accuracy": one half is a real term, the other a mirror made up for balance. Use a real opposite or drop the contrast.

False concession. "While X is impressive, Y remains a challenge." Keep both claims and drop the frame. Don't pick a side for the writer. A temporal "while" stays.

Superficial -ing analysis. "Symbolizing..., reflecting..., showcasing...". Also "this represents a broader shift", "it speaks to a larger trend". Use a stated consequence or cut.

Transformation crutch. "The concern turns into panic" with no mechanism. Explain what changed if the source says; literal and explained changes pass.

False agency. "The decision emerged after the offsite." Name who decided when the source says. Ordinary personification ("the data shows") passes.

Subjectless fragments and agentless passives. Name the actor in flowing prose. Carve-out: READMEs, changelogs, commit subjects, parameter docs.

Synonym cycling. "Developers... engineers... practitioners" for one group. Pick the right word and repeat it.

Rule of three and colon triples. Keep a triple when there are three real items. Don't add or drop items for rhythm.

Same-opener runs and staccato drama. Three or more sentences starting with the same word, or a run of same-shape fragments each landing like a closer. Keep one if it earns its emphasis and fold the rest into ordinary sentences.

Stranded auxiliary contrast. "The tool died; the data didn't." One is style. A recurring rhythm is a tic.

Setup-and-reversal punchlines. "We planned for every failure mode. Except the one that happened." Merge into one sentence. If the failure isn't named, flag it. Don't invent one.

## Framing patterns

Significance inflation. "Marking a pivotal moment in the evolution of..." If the sentence works without the clause, delete it.

Future-narrative closers. "May become one of the most important narratives of the next cycle." Keep a prediction only if it's testable and sourced.

Vague attribution and validation. "Experts say", "studies show", "analysts agree", "independent testing confirms". Name the source from the material, or flag the gap. Don't silently turn an attributed claim into the writer's own.

Name-dropping. A stack of outlets or historical analogies ("like the printing press and the telegraph"). Keep the one that does analytical work.

Promotional language and formulaic challenges. "A vibrant hub nestled in...", "Despite challenges, it continues to thrive." Use a plain sourced description, or cut.

Speculative gap-filling. "Is believed to have", "likely began his career in", "maintains a low public profile". Guesses dressed as facts. Cut or source them.

Novelty inflation. "She coined the term", "the failure mode nobody's naming", invented labels ("the supervision paradox"). Remove unsupported novelty. Define a term or describe the mechanism.

Dramatized crowd. "Shipped in 2022 while everyone else was still debating timelines." State the fact and cut the invented crowd. Literal simultaneity ("she read while everyone else watched") passes.

Teaser hooks. "The catch?", "The kicker?", "The result?", "Plot twist:", "Here's the thing.", "Honestly?" or "Look," as standalone openers. Delete the hook and state the thing.

Launch-copy introductions. "Enter Flowdesk.", "Meet Flowdesk, your new favorite dashboard", "Think Notion meets Figma". Write "Flowdesk is a treasury dashboard."

Fake-casual props. "*chef's kiss*", "(yes, really)", "hot take:", "pro tip:", one-word verdict closers ("wild."), "Is it fast? Yes." Keep them only if the writer's established voice uses them.

Narrated candor. "Two caveats I'd rather flag than let you discover later:", "I want to be upfront:". Deletion test: if cutting the frame loses nothing, cut it. Carve-outs: the disclosure itself ("I haven't tested this on Windows") and a real conflict-of-interest disclosure.

Performed insight. "Sit with that", "that's not nothing", "the punchline is", "turns out", "the real story was", "that's the whole point". Self-labeling: "That last move is the contrarian one." Let the content carry the weight.

Stock reactions and lingering attention. "What struck me was", "the line I keep coming back to", "I can't stop thinking about this". Lead with the fact. Keep a real stated reaction or ranking ("the most interesting part") when it's the writer's judgment. Keep the attention claim when a reason follows.

Social endorsement closers. "This one is worth your time:", "Bookmark this", "Don't sleep on this", "Thank me later". Give the reason from the source, or let the link stand alone.

Speculative openers and false breadth. "Imagine a world where...", "Whether you're X or Y", "from the Big Bang to dark matter". Make the claim. Teaching examples ("imagine a sorted array") pass.

Rhetorical questions. A question that stalls before the point, or several in a row. Keep at most one. FAQs, interviews and dialogue pass.

Parenthetical hedging. "(and, increasingly, Z)". Give it a sentence or cut it.

Cold-outreach flattery. "I'd love your perspective" as the whole ask. State the question. "I'd value your take on the retry section before Friday" is a normal request.

## Conversation residue

- Chatbot artifacts: "Certainly!", "Absolutely!", "Feel free to reach out", "In this article, we will explore".
- Sycophancy: "Excellent point!", "You're absolutely right!".
- Acknowledgment loops: restating the question before answering. Carve-out: "To answer your question from Tuesday: the invoice went out on the 3rd."
- Recap flattery: summarizing someone's own work back to them as thanks. Keep a short thank-you.
- Reasoning leaks: "Let me think step by step", "Breaking this down", "Here's my thought process".
- Walls of text: a reply under about 150 words with four or more sentences and no break. In chat, issues and DMs, break at thought boundaries. Long-form prose is exempt.

## Leaks

- Citation tokens: citeturn0search0, contentReference[oaicite:0]{index=0}, oai_citation, [attached_file:1], grok_card. Strip them. Add the real reference if supplied, otherwise flag it.
- AI-referrer parameters: utm_source=chatgpt.com, copilot.com, openai, claude.ai, perplexity.ai, referrer=grok.com. Strip the parameter and keep the rest of the URL.
- Placeholders: [Your Name], [Insert source], 2025-XX-XX, "<!-- add citation -->". Fill only with supplied content. Templates keep theirs.

## Formatting

- Em dashes and the double-hyphen substitute: zero in our prose, headings included. Carve-out: a list separator after a bold term or link (`- [label](url) — description`).
- Bold: one phrase per section at most, or none. Lead with the point instead.
- Emoji: none in headings. A social post may end a line with one or two.
- Inline-header lists: "**Performance:** Performance improved..." Drop the label.
- List-label periods: "**Intros.** Years of conferences." Use a colon or a plain sentence.
- Headings: sentence case. More than three in under 300 words is scaffolding. Cut a line that restates its heading. Generic headings ("Overview", "Key points", "Conclusion") should name the content.
- Bullets: convert list-shaped prose back to prose when it isn't a list. Steps, parameters and comparisons stay lists. Five or more verbless adjective-noun bullets read as a one-pager.
- Hashtags: two or three specific ones, or none. Issue refs (#88), hex colors and code don't count.
- Hyphens: open welded noun phrases ("data source strategy"), close standard compounds (codebase, dataset, roadmap), drop hyphens in adverbial use ("in real time", "works out of the box"). Keep them before a noun ("real-time analytics"). Stacks of hyphenated modifiers: keep the one that matters.
- Quotes: curly versus straight is a destination style choice, not a tell.

## Whole-text tests

- Reshuffle: if two body paragraphs can swap without breaking anything, the piece is a list of points. Report the missing through-line.
- Treadmill: ask what each paragraph adds. A large cut that loses nothing marks filler.
- Rhythm: uniform sentence and paragraph lengths read as machine-made. Vary them by clarifying content. Never by chopping sentences or adding questions.
- Vocabulary range: in general prose over 200 words, heavy repetition of a small vocabulary is worth a second look. Fix it with specifics from the source, never a thesaurus. Narrow technical text compresses vocabulary legitimately.
- Over-polishing: removing every irregularity makes human writing more uniform. Keep the writer's disfluencies, odd word choices and uneven pacing.
- Rewrite or patch: five or more findings across three or more categories plus uniform structure suggest a rebuild. Rebuild only when the user allows broad edits; otherwise patch and report.

## Context

| Rule | Social post | Blog | Technical | Investor email | Docs | Casual chat |
|---|---|---|---|---|---|---|
| Bold | relaxed | strict | strict | strict | relaxed | skip |
| Bullets | skip | strict | relaxed | strict | skip | skip |
| Hedging | strict | strict | relaxed | strict | relaxed | skip |
| Word tiers | strict | strict | partial | strict | relaxed | P0 only |
| Promotional language, inflation, closers | relaxed | strict | strict | extra strict | relaxed | skip |
| Copula swaps | skip | strict | relaxed | strict | skip | skip |
| Fragments, agentless passives | relaxed | strict | relaxed | strict | skip | skip |
| Rhetorical questions | one as hook | strict | strict | strict | strict | skip |

Extra strict means one instance is enough. Em dashes stay at zero everywhere in prose we write. When editing someone else's text, follow their house style for marks.

Infer the context when nobody names it: under 300 words with hashtags is a social post; code or APIs make it technical; a salutation plus fundraising language makes it an investor email; steps and parameters make it docs. With no strong signal, treat it as a blog and leave borderline cases as judgment calls.

## Optional mechanical check

The upstream project ships a deterministic detector. It needs Node 18 or later and network access to npm:

```bash
npx --package avoid-ai-writing-detector avoid-ai-writing draft.md
npx --package avoid-ai-writing-detector avoid-ai-writing --context technical draft.md
```

It prints JSON with a 0 to 100 score and the issues found. Use it as a second reader, not a verdict: it covers the regex-detectable patterns only, and a score is never proof of who wrote a text. Say whether it ran; if it didn't, call the audit model-only.
