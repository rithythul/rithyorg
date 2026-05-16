# Chapter Revision Workflow (Hardened)

Before revising any chapter, you must:

1. Review profile.md to understand tone, voice, and style preferences.
2. Review Manual_of_Style.md for all current style rules.
3. Review Manuscript_Outline.md to ensure consistency with overall structure and chapter objectives.

Then follow this hardened 5-pass revision process with verification between each pass:

## PASS 1: STRUCTURAL FOUNDATION
**Goal**: Establish proper paragraph and sentence structure.

1.1 **Segment the draft** into logical paragraphs using natural breaks (topic shifts, temporal markers, or speaker changes). Each paragraph must contain 3-7 sentences.
    - Verification: Count sentences per paragraph; flag any with <3 or >7 sentences for review.
    - Verification: Ensure no sentence fragments (must end with ., !, or ?).
    - Verification: Ensure no run-on sentences (>20 words before segmentation).

1.2 **Verify sentence completeness**: Every line must be a complete sentence with subject and verb.
    - Verification: Manual scan for fragments (especially those starting with "because", "since", "as", "due to", "-ing" verbs without subject).
    - Correction: Attach fragments to previous sentence or rewrite as complete sentence.

## PASS 2: MECHANICAL CORRECTIONS
**Goal**: Fix mechanical style issues.

2.1 **Replace em‑dashes** with commas or rephrased clauses (Rule 1).
    - Verification: Search for "—" and "–"; zero instances must remain.
    - Correction: Replace each with comma, semicolon, or rephrase.

2.2 **Expand acronyms and jargon** at first occurrence with plain‑language equivalents that preserve meaning (Rule 2).
    - Verification: Create list of all acronyms (2+ uppercase letters); ensure first occurrence is expanded.
    - Correction: For each acronym not expanded, write: "[Full term] ([ACRONYM])" then use acronym subsequently.
    - Special handling: If acronym must remain (e.g., well-known like "IT"), add concrete explanation: "information technology (IT), meaning the use of computers to store, retrieve, and send information".

2.3 **Delete or rephrase bracketed notations**—integrate information into the text as complete sentences or move to footnotes.
    - Verification: Search for "[" and "]"; zero instances must remain in main text.
    - Correction: Convert each bracketed phrase to a complete sentence and insert appropriately, or move to footnote with superscript.

## PASS 3: SENTENCE QUALITY & RHYTHM
**Goal**: Ensure sentences meet length, causality, and voice requirements.

3.1 **Eliminate causal‑sentence endings** (Rule 7) and fragments.
    - Verification: 
        - No sentence ends with "because", "since", "as", or "due to".
        - No sentence begins with "because", "since", "as", or "due to" as a fragment.
    - Correction: 
        - For ending: "X happened because Y" → "Because Y, X happened."
        - For beginning: Move causal clause to end of previous sentence or rewrite as complete sentence.

3.2 **Measure and adjust sentence length** (Rules 8, 9).
    - Verification: 
        - Zero sentences exceed 20 words.
        - Target range: 8-14 words for rhythm (allow variation: 6-20 words acceptable if varied).
        - Adverb density: Count ‑ly adverbs; must be <0.2% of total words.
    - Correction:
        - Split long sentences at commas, conjunctions, or natural pauses.
        - Combine very short sentences (<6 words) with adjacent sentences where logical.
        - Replace ‑ly adverbs with stronger verbs (e.g., "quickly ran" → "sprinted").
        - Replace weak verbs with strong alternatives.

3.3 **Eliminate excessive passive voice** (Rule 10).
    - Verification: Passive constructions <10% of clauses.
    - Correction: Rewrite passive to active where possible (e.g., "The ball was thrown by John" → "John threw the ball").

## PASS 4: CLARITY & CONCRETENESS
**Goal**: Ensure all concepts are clear, tangible, and experiential.

4.1 **Run clarity pass** (Rules 3, 4, 11, 12).
    - Verification: 
        - Every technical term, acronym, and unexplained concept is explained through concrete detail, action, or analogy.
        - No unexplained jargon remains.
        - Each concept is made tangible via sensory detail, action, or image.
    - Correction: 
        - For each technical term, add concrete explanation: 
            - Instead of "database", show "a row of blinking lights representing data".
            - Instead of "privileged access termination", show "the system revoking the employee's badge at 5:00 PM".
            - Use analogies: "like a library card that opens specific doors".

4.2 **Validate paragraph endings** (Rule 6).
    - Verification: 
        - Each paragraph ends on a tangible image, action, or sensory detail.
        - No paragraph ends with an abstraction, summary statement, or causal conjunction.
        - Acceptable endings: blinking light, closing door, hand on keyboard, whirring tape, specific number, named object, action verb.
    - Correction: 
        - Rewrite ending to show concrete detail: 
            - Instead of "This created structural problems." → "The server rack blinked red as alarms sounded."
            - Instead of "Accountability was lost." → "The access log showed no entries after 4:55 PM."

4.3 **Apply experiential writing** (Rule 4).
    - Verification: 
        - Each paragraph contains sensory details (sight, sound, touch) or specific actions.
        - Avoid pure exposition; show via scenes and examples.
    - Correction: 
        - Add physical details: describe what characters see, hear, feel, do.
        - Replace telling with showing: 
            - Instead of "The office was quiet." → "Only the hum of cooling fans and distant keyboard clicks filled the air."
            - Instead of "He felt stressed." → "His jaw tightened as he stared at the access denial message."

## PASS 5: FINAL VERIFICATION & POLISH
**Goal**: Ensure chapter meets all requirements and reads cohesively.

5.1 **Reread for flow and coherence**.
    - Verification: 
        - Logical progression of ideas.
        - Clear transitions between paragraphs.
        - Consistent tone and voice matching profile.md.
        - No repetition or redundancy.
    - Correction: 
        - Add transition sentences where needed.
        - Remove repetitive phrases or examples.
        - Adjust paragraph order if logical flow is disrupted.

5.2 **Compliance checklist** (run final verification):
    - [ ] Zero em‑dashes
    - [ ] All acronyms/jargon expanded at first occurrence
    - [ ] Zero bracketed notations in main text
    - [ ] No sentence >20 words
    - [ ] Zero causal sentence endings/beginnings
    - [ ] Adverb density <0.2%
    - [ ] Passive voice <10% of clauses
    - [ ] Every technical term explained concretely
    - [ ] Every paragraph ends with tangible image/action/detail
    - [ ] Experiential writing present in each paragraph
    - [ ] Proper paragraph segmentation (3-7 sentences each)
    - [ ] Matches chapter objectives in Manuscript_Outline.md
    - [ ] Consistent with profile.md tone/voice

5.3 **Read aloud test** (optional but recommended).
    - Verification: 
        - No awkward phrasing when read aloud.
        - Natural rhythm and pacing.
        - Clear emphasis on key points.

This repeatable, hardened skill ensures consistent, high‑quality output across all chapters by catching errors through multiple targeted passes with specific verifications. Each pass builds upon the previous, creating layers of quality control.

## Pipeline

The pipeline is expressed as a JSON‑compatible delegate‑task definition. It hard‑codes three agents that each run a specific script and a verification stage. The JSON can be fed to `hermes delegate_task` to process any chapter.

```json
{
  "toolsets": ["terminal", "delegate_task"],
  "tasks": [
    {
      "goal": "Run style_clean_agent on ${CHAPTER_PATH}",
      "role": "leaf",
      "toolsets": ["terminal"],
      "context": "${CHAPTER_PATH}"
    },
    {
      "goal": "Run rhythm_agent on ${CHAPTER_PATH}",
      "role": "leaf",
      "toolsets": ["terminal"],
      "context": "${CHAPTER_PATH}"
    },
    {
      "goal": "Run verify_agent on ${CHAPTER_PATH}",
      "role": "leaf",
      "toolsets": ["terminal"],
      "context": "${CHAPTER_PATH}"
    },
    {
      "goal": "Commit the verified chapter to git and push",
      "role": "leaf",
      "toolsets": ["terminal"],
      "context": "${CHAPTER_PATH}"
    }
  ]
}
```

### Named agents
- **style_clean_agent** – runs `scripts/clean_style.py` (em‑dash removal, header blank line, bracket removal, causal‑fragment rewrite).
- **rhythm_agent** – runs `scripts/rhythm_rewrite.py` (LLM‑driven split of >20‑word sentences while preserving meaning).
- **verify_agent** – runs the four verification scripts (`verify_mos.py`, `verify_paragraph_endings.py`, `check_acronyms.py`, `verify_brackets.py`).

### Final EPUB assembly (once all chapters are ready)
```bash
# generate master markdown that includes every chapter in order
cat <<'EOF' > book.md
% NYT Cyber Expose
% Rithy Thul
% 2026
\newpage
# Table of Contents
\newpage
$(for i in {01..16}; do echo "!include manuscript/chapter_drafts/chapter_${i}_*.md"; done)
EOF

pandoc \
  --metadata-file=metadata.yaml \
  --toc \
  --epub-cover-image=cover.jpg \
  --embed-resources \
  -o nyt-cyber-expose.epub book.md
```