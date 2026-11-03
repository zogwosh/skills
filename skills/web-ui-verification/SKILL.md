---
name: web-ui-verification
description: >-
  Deep browser verification for web UI: real viewport screenshots with image
  inspection, plus dynamic interaction and runtime acceptance. Use when the
  user asks to verify, QA, or acceptance-test browser UI, after harness-ui-craft
  when deeper checks are needed, or when validating visual and behavioral
  regressions. Do not use for design-first UI crafting (prefer harness-ui-craft),
  backend-only work, or native non-browser UI.
---

# Web UI Verification

Capability-based protocol for verifying user-visible changes in browser-rendered UIs.

Do not hard-code project URLs, selectors, fixtures, auth, or frameworks — discover them at runtime.

## Applicability

**Use when**
- User asks to verify / QA / acceptance-test web UI
- Deeper check after `harness-ui-craft` implementation
- Validating visual or behavioral regressions in the browser

**Do not use when**
- Design-first build/polish in a harness → `harness-ui-craft`
- Backend-only or native non-browser UI

## Workflow

```text
1. Derive affected scope
2. Discover project verification capabilities
3. Run the real application
4. Visual Acceptance  ◄── fix & re-run
5. Dynamic Browser Acceptance  ◄── fix & re-run (re-do visual if layout changed)
6. Result: PASS | FAIL | BLOCKED
```

1. **Scope** — From requirements/diff/journeys: affected surfaces, viewports, states, interactions. Only test what changed or is reasonably affected.
2. **Capabilities** — Prefer project E2E/dev tools (`package.json`, Playwright/Cypress, etc.) before generic agent browser tools.
3. **Run app** — Use the project's documented start path. Source/DOM/CSS inspection is not a substitute. Judge readiness from observable app state, not fixed sleeps.
4. **Visual** — Must PASS before dynamic acceptance.
5. **Dynamic** — Real interactions + runtime/network checks on affected flows.
6. **Repair loop** — Fix, re-verify; if a functional fix changes layout, re-run visual.

## Visual acceptance

- At least two viewports when relevant: desktop ~1440px and a narrow/tablet breakpoint from the project.
- Capture the **real** app viewport — not isolated synthetic component dumps as the only evidence.
- **Inspect the image content.** `screenshot succeeded` ≠ PASS.
- Check: overflow/clip/overlap/z-index, spacing/alignment, responsive wrap/truncate, unusable controls/dialogs.
- Time-based UI (skeleton, async reveal, accordion): observe live; screenshot key states if needed. One still frame cannot prove transitions.

## Dynamic acceptance

- Exercise only affected actions (click, type, select, toggle, open/close, submit, retry).
- Verify observable UI/app outcomes — not “handler exists in source”.
- Forms: exercise validation/submit when behavior could change; pure visual form tweaks need visual/focus/runtime stability only.
- Async: `action → pending → result → observable update`. No fake UI (e.g. Save that only closes a modal).
- No unexplained console/runtime errors or unexpected network failures from the flow under test.
- Surfaces with no controls: still load, observe stability and dynamic render; do not invent interactions.

## Forbidden equivalences

```text
build / lint / typecheck / unit tests passed  ≠  UI verified
DOM looks correct                            ≠  UI verified
screenshot file exists                       ≠  Visual PASS
event handler exists                         ≠  Interaction verified
could not verify                             ≠  PASS
```

## Result semantics

| Result | Meaning |
| --- | --- |
| PASS | Applicable stages ran in a live browser and met criteria |
| FAIL | Unresolved visual, functional, interaction, or runtime defects |
| BLOCKED | A required stage could not run (app/browser/credentials). Never assume PASS |

Complete only when **Visual** and **Dynamic** are both PASS (or document BLOCKED honestly).

## Report

```markdown
### Web UI Verification Report

**Visual Acceptance**: PASS | FAIL | BLOCKED
- Viewports: …
- States: …
- Findings: …

**Dynamic Browser Acceptance**: PASS | FAIL | BLOCKED
- Interactions: …
- Async/data flow: …
- Runtime: …

**Overall**: PASS | FAIL | BLOCKED
```
