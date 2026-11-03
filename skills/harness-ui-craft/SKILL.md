---
name: harness-ui-craft
description: >-
  Design-first UI workflow for harness, playground, sandbox, or frontend work:
  require a project UI preset, draft a Linear-inspired plan before coding,
  implement, then capture browser evidence for the user (or run project visual
  tools)—never agent self-PASS on look-and-feel. Use when modifying, polishing,
  building, or gathering acceptance evidence for UI in a harness/sandbox, or
  when the user mentions Linear aesthetics, UI preset, design-first UI, or UI
  verification evidence. Do not use for backend-only work, native non-browser
  UI, or asking the agent to certify visual polish from screenshots alone.
---

# Harness UI Craft

One workflow for making UI and packaging acceptance evidence.

**LLM:** preset gate, design, implementation, scoped browser evidence / tool runs.  
**Not LLM:** final look-and-feel acceptance (attention drifts). User or visual-regression CI decides.

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
| Found | Sole style authority for this change |
| Missing | **Stop.** Ask user to provide or generate a preset before UI edits |

## Phase 1 — Design before code

Before UI code changes, publish a short plan (preset + Linear craft):

- Structure and information hierarchy
- Typography ladder / rhythm
- Visual hierarchy; Default / Hover / Active / Focus when relevant
- Restraint, alignment, density, subtle motion

Wait for go-ahead (or explicit “just implement”) before coding.

## Phase 2 — Implement

- Follow plan + preset tokens/patterns
- One abstraction level; no unexplained magic numbers
- Match project stack and layout

## Phase 3 — Evidence (not self-PASS)

1. Run the real harness/app (documented start path; lint/build ≠ evidence)
2. Prefer project tools when present (Playwright, Cypress, Chromatic, Percy, Storybook, …); report **tool** output
3. Otherwise capture real-browser screenshots of affected views/states/viewports
4. Scope only what changed — no unrelated journeys
5. Optionally exercise affected interactions; record observable outcomes / console / network
6. Deliver an evidence package to the user; apply their feedback and re-capture

**Allowed:** flag objective candidates (overflow, overlap, clipped controls) for user confirmation.  
**Forbidden:** agent Visual PASS on polish, “Linear feel”, or typography taste.

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
3. Implementation matches plan + preset
4. Real app evidence (tools and/or screenshots) given to user
5. No agent-declared visual PASS
