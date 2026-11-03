---
name: harness-ui-craft
description: >-
  Design-first UI craft for harness, playground, sandbox, or frontend work:
  require a project UI preset, draft a Linear-inspired design before coding,
  then screenshot-verify the rendered result. Use when the user asks to modify,
  refactor, polish, or build UI views/components in a harness or component
  sandbox, or mentions Linear aesthetics, UI preset, or design-first UI.
  Do not use for backend-only work, native non-browser UI, or pure verification
  without design/implementation (prefer web-ui-verification for deep QA).
---

# Harness UI Craft

Workflow for building or polishing UI in a harness / sandbox / playground / frontend app.

**Priority:** project UI preset → design plan → code → real screenshot check.

For deep visual + behavioral QA beyond a craft screenshot loop, invoke `web-ui-verification`.

## Applicability

**Use when**
- Modifying, refactoring, polishing, or building UI in a harness/sandbox/playground
- User wants Linear-like craft, design-before-code, or project UI presets enforced

**Do not use when**
- Backend-only / no browser UI
- Native non-browser UI
- User only wants verification/QA of existing UI with no design/implementation → `web-ui-verification`

## Phase 0 — Preset gate

Find a project UI preset (e.g. `design.md`, `DESIGN.md`, `tokens.json`, design-system docs, component library guidelines).

| Result | Action |
| --- | --- |
| Found | Treat it as the normative baseline for this change |
| Missing | **Stop.** Do not edit UI. Tell the user the project has no UI preset and ask them to provide or generate one first |

## Phase 1 — Design before code

Before any UI code change, output a short design plan using the preset **and** Linear-style craft:

- Structure and information hierarchy
- Typography ladder and rhythm
- Visual hierarchy; Default / Hover / Active / Focus where relevant
- Restraint, alignment, density, subtle motion — Linear aesthetics, not loud decoration

Get alignment (explicit user OK, or clear go-ahead in-thread) before implementing.

## Phase 2 — Implement

- Follow the agreed plan and the preset tokens/patterns
- Prefer one abstraction level; avoid unexplained magic numbers
- Match existing project stack and file conventions

## Phase 3 — Screenshot verification

1. Start or open the local harness / app the project actually uses
2. Render the changed view/component in a real browser
3. Capture screenshots of the affected UI (relevant viewports/states)
4. Inspect the images (not “screenshot command succeeded = pass”)
5. Fix visual gaps vs plan/preset; re-capture after fixes
6. Show screenshots to the user for acceptance

Static checks (build/lint/DOM read) do **not** replace screenshots.

## Checklist

1. Preset present — else halt
2. Design plan written (Linear + preset) before code
3. Implementation matches plan
4. Real render + screenshots inspected and shared
