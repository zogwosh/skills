---
name: harness-ui-craft
description: >-
  Design-first UI craft for harness, playground, sandbox, or frontend work.
  Requires a project UI preset, drafts a Linear-inspired design before coding,
  implements against that plan, then captures screenshots as evidence for the
  user—never as agent self-acceptance. Use when modifying, refactoring,
  polishing, or building UI in a harness/sandbox, or when the user mentions
  Linear aesthetics, UI preset, or design-first UI. Do not use for backend-only
  work, native non-browser UI, or asking the agent to declare UI PASS/FAIL by
  glancing at screenshots.
---

# Harness UI Craft

Build or polish UI in a harness / sandbox / playground / frontend app.

**LLM role:** preset gate, design plan, implementation, evidence capture.  
**Not LLM role:** final visual acceptance. Humans (or pixel/regression tools) own that — model attention is unreliable for “does this look right?”.

## Applicability

**Use when**
- Modify / refactor / polish / build UI in harness or component sandbox
- User wants preset-gated, Linear-inspired, design-before-code workflow

**Do not use when**
- Backend-only or native non-browser UI
- User wants the agent to **certify** UI quality from screenshots alone

## Phase 0 — Preset gate

Locate a project UI preset (`design.md`, `DESIGN.md`, `tokens.json`, design-system docs, etc.).

| Result | Action |
| --- | --- |
| Found | Use as the only style authority for this change |
| Missing | **Stop.** Ask the user to provide or generate a preset before any UI edits |

## Phase 1 — Design before code

Before editing UI code, publish a short plan (preset + Linear craft):

- Information hierarchy and layout structure
- Typography ladder / rhythm
- Hierarchy and interaction states (Default / Hover / Active / Focus) when relevant
- Restraint, alignment, density, subtle motion — not decorative noise

Wait for user go-ahead (or an explicit “just implement”) before coding.

## Phase 2 — Implement

- Follow the agreed plan and preset tokens/patterns
- One abstraction level; no unexplained magic numbers
- Match project stack and file layout

## Phase 3 — Evidence for the user (not self-PASS)

1. Run the real harness/app
2. Capture screenshots of affected views/states/viewports
3. Hand evidence to the user: what changed, which preset/plan items to check, screenshot(s)
4. If the project has visual regression tooling (Playwright screenshots, Chromatic, Percy, etc.), run that and report **tool** output — do not replace it with model opinion
5. Apply user feedback; re-capture after fixes

**Forbidden:** treating “I looked at the screenshot” as acceptance.  
**Allowed:** noting concrete, checkable defects (e.g. overlapping controls, obvious overflow) as **candidates** for the user to confirm — never a final PASS.

## Checklist

1. Preset exists — else halt
2. Design plan before code
3. Implementation matches plan + preset
4. Screenshots (and any regression tools) delivered to the user
5. No agent-declared visual PASS
