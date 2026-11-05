# Linear design canon

Linear is a **precise product UI**, not a look-alike skin. Match how Linear *behaves on the page*, not a token questionnaire.

## Product principles (non-negotiable)

### 1. No descriptive fluff

Linear does **not** explain the UI to you with paragraphs.

- Prefer short labels, nouns, and status — not “Get started by creating your first…” essays
- No section subtitles that restate the obvious
- No marketing blurbs, feature pitches, or helper prose next to primary chrome
- Empty states stay minimal (one line + one action), not onboarding articles
- If a sentence isn’t required to act, cut it

### 2. Don’t show what you don’t need yet

Linear does **not** dump the whole product in your face on first paint.

- First view = the **job at hand** only (list, issue, editor, …)
- Advanced filters, rare actions, secondary metadata → menus, overflow, keyboard, or progressive disclosure
- Don’t pre-render panels, tabs, or settings the user didn’t open
- Don’t decorate the viewport with unused widgets “for discovery”
- Prefer **search / command / context menu** over permanent control strips

### 3. Density for work, not decoration

- Information-dense rows and panels; quiet chrome
- Structure and hierarchy do the teaching — not cards of copy
- One primary work surface; side nav / list + detail when needed
- Ornament (gradients, glow, hero art, stat-card theater) is out of character

### 4. Actions over explanation

- Put the next action where the work is (row actions, inline create, keyboard)
- Prefer affordances that are obvious from layout over instructional text
- States (hover / focus / selected / empty) should be visible without captions

## Visual defaults (support the principles)

Use when generating `design.md` or when the repo has no theme. Principles above win if a pretty layout violates them.

| Token | Dark | Light |
| --- | --- | --- |
| `bg` | `#0F0F10` | `#F7F8F8` |
| `surface` | `#19191B` | `#FFFFFF` |
| `surface-hover` | `#1F1F22` | `#F0F1F3` |
| `border` | `#2C2C31` | `#E4E5E7` |
| `text` | `#EDEDEF` | `#1B1B1F` |
| `text-muted` | `#8A8F98` | `#6B6F76` |
| `accent` | `#5E6AD2` | `#5E6AD2` |
| `danger` | `#EB5757` | `#D94A4A` |

- Neutrals first; accent only for primary action / focus / selection
- Hairline `1px` borders; little or no shadow
- Type: compact UI sans (e.g. Inter); body ~13–14px; titles restrained; muted for meta
- Spacing: 4px grid; compact control height ~28–32px; radius ~6–8px
- Motion: 120–200ms, purposeful only

## Design plan (what to decide)

For each UI change, briefly state — in product terms, not a form:

1. **Job at hand** — what is the one thing this view is for on first paint?  
2. **What’s hidden** — what is intentionally *not* shown until needed, and where it lives (menu, overflow, drill-in)?  
3. **Copy budget** — list every user-visible string; cut anything descriptive that isn’t required to act  
4. **Structure** — regions (nav / list / detail / …) and how hierarchy works without explanatory text  

Optional one-liner on tokens only if creating or extending `design.md`.

## Failure modes (rewrite the design)

- Long helper / onboarding copy in primary chrome  
- First paint shows controls or panels the user doesn’t need yet  
- Layout that “sells” the feature instead of hosting the work  
- Filling space with descriptive cards instead of the actual artifact (list, doc, issue, …)  
