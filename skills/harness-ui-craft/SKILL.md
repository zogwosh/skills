---
name: harness-ui-craft
description: >-
  Design-first Linear-style UI for harness, playground, sandbox, or frontend
  work. Requires a project UI preset, plans before coding, implements with
  Linear aesthetics (not only in the design doc), then captures browser evidence
  for the user or project visual tools—never agent self-PASS on look-and-feel.
  Use when modifying, polishing, building, or gathering UI evidence in a
  harness/sandbox, or when the user mentions Linear style, UI preset, or
  design-first UI. Do not use for backend-only work, native non-browser UI, or
  asking the agent to certify visual polish from screenshots alone.
---

# Harness UI Craft

Make UI and package acceptance evidence.

**LLM:** preset gate, Linear design + **Linear implementation**, evidence capture.  
**Not LLM:** final look-and-feel acceptance. User or visual-regression CI decides.

Linear is binding for **code**, not only the Phase 1 write-up. If preset and Linear conflict, **preset wins**; otherwise apply Linear craft below.

## Applicability

**Use when**
- Build / polish / refactor UI in harness, sandbox, playground, or frontend
- Need screenshots or project E2E/visual-tool evidence after UI changes

**Do not use when**
- Backend-only or native non-browser UI
- Expectation is agent aesthetic sign-off without human/tool gate

## Phase 0 — Preset gate

Find a project UI preset (`design.md`, `DESIGN.md`, `tokens.json`, design-system docs, …).

| Result | Action |
| --- | --- |
| Found | Sole **token/brand** authority; still apply Linear craft where preset is silent |
| Missing | **Stop.** Ask user to provide or generate a preset before UI edits |

## Phase 1 — Design before code

Before UI code changes, publish a short plan (preset + Linear):

- Structure and information hierarchy
- Typography ladder / rhythm
- Visual hierarchy; Default / Hover / Active / Focus when relevant
- Restraint, alignment, density, subtle motion

Wait for go-ahead (or explicit “just implement”) before coding.

## Phase 2 — Implement (Linear-constrained)

Code must match the plan **and** these craft rules (unless the preset overrides):

**Layout & density**
- Tight, consistent spacing scale; align to a clear grid/baseline
- High information density without clutter; prefer one composition per view
- No dashboard-of-cards by default; avoid ornamental chrome

**Typography**
- Clear type ladder (few sizes/weights); strong hierarchy, not many competing styles
- Prefer purposeful UI fonts already in the preset/project over generic system stacks when the preset specifies them

**Color & surface**
- Restrained palette; neutral surfaces + one accent when needed
- Borders/dividers hairline and quiet; avoid heavy shadows, glow, and loud gradients
- Do not invent a second visual language beside the preset

**Interaction**
- Explicit Default / Hover / Active / Focus where controls are interactive
- Motion: short, subtle, purposeful (presence/hierarchy)—not decorative noise

**Code hygiene**
- One abstraction level; no unexplained magic numbers — use preset tokens/CSS variables
- Match project stack and file layout

**Anti-patterns (unless preset requires them)**
- Purple-on-white / generic AI gradient themes
- Pill soup, stat strips, icon rows as decoration
- Over-rounded “toy” controls, multi-layer shadows, emoji ornament

## Phase 3 — Evidence (not self-PASS)

1. Run the real harness/app (documented start path; lint/build ≠ evidence)
2. Prefer project tools when present (Playwright, Cypress, Chromatic, Percy, Storybook, …); report **tool** output
3. Otherwise capture real-browser screenshots of affected views/states/viewports
4. Scope only what changed
5. Optionally exercise affected interactions; record outcomes / console / network
6. Deliver evidence to the user; apply feedback and re-capture

**Allowed:** flag objective candidates (overflow, overlap, clipped controls) for user confirmation.  
**Forbidden:** agent Visual PASS on polish or “feels Linear.”

```text
build / lint / types / unit tests   ≠  accepted
screenshot file exists              ≠  accepted
agent "looks good"                  ≠  accepted
could not capture evidence          ≠  accepted
```

### Evidence report

```markdown
### UI Evidence Report

**Artifacts:** screenshots / recordings / tool logs …
**Tool results:** pass | fail | skipped …
**Objective candidates (for user):** …
**Behavioral notes:** …
**Acceptance:** awaiting user or CI — agent visual self-PASS disallowed
```

## Checklist

1. Preset present — else halt
2. Design plan before code
3. Implementation follows plan + preset + Linear craft rules above
4. Real app evidence given to user
5. No agent-declared visual PASS
