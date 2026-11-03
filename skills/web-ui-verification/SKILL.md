---
name: web-ui-verification
description: >-
  Browser UI evidence workflow for harness/frontend changes. Runs the real app,
  captures scoped screenshots, exercises affected interactions, and prefers
  project E2E or visual-regression tools over model judgment. Use when the user
  asks to verify, QA, or gather acceptance evidence for web UI. Do not use to
  let the agent self-certify visual polish from screenshots; do not use for
  design-first crafting (prefer harness-ui-craft); skip backend-only and native
  non-browser UI.
---

# Web UI Verification (evidence, not LLM judgment)

Gather **reproducible evidence** that the user (or automated visual tools) can accept.

**Why:** Model attention is a poor allocator for “does this UI look right?”. Do not treat agent screenshot glance as Visual PASS.

| Actor | Responsibility |
| --- | --- |
| Agent | Start app, scope tests, run tools, capture artifacts, list checkable findings |
| Project tools | E2E / screenshot diff / a11y when available — prefer these over model taste |
| User | Final acceptance of look-and-feel and product correctness |

## Applicability

**Use when**
- User asks to verify / QA / collect acceptance evidence for browser UI
- After `harness-ui-craft`, deeper evidence is requested

**Do not use when**
- Design-first build/polish → `harness-ui-craft`
- Backend-only or native non-browser UI
- Expectation is agent aesthetic sign-off without human/tool gate

## Workflow

```text
1. Scope what changed
2. Prefer project verification tools
3. Run the real app
4. Capture visual evidence (+ tool diffs if any)
5. Exercise affected interactions; record outcomes
6. Report evidence → user (or CI tool) decides accept/reject
```

### 1. Scope

From diff/requirements: affected surfaces, viewports, states, interactions only. No unrelated journeys.

### 2. Prefer tools over eyeballing

Inspect `package.json`, E2E configs, visual-regression setup. Order:

1. Project Playwright/Cypress/Storybook/Chromatic/Percy/etc.
2. Generic browser automation only as fallback to **produce artifacts**
3. Model image commentary only as optional hints — never the acceptance decision

### 3. Run the real app

Documented project start path. Build/lint/DOM read ≠ verified. Judge readiness from observable app state, not fixed sleeps.

### 4. Visual evidence

- Capture real viewports for affected sizes (e.g. ~1440px + project narrow breakpoint)
- For async/temporal UI: capture distinct states (skeleton vs loaded), observe live if needed
- If screenshot-diff tools exist, run them and report **diff results**
- Agent may flag **objective** issues (clipping, overlap, horizontal scroll, broken control hit targets) as candidates
- Agent must **not** declare aesthetic PASS/FAIL on polish, “Linear feel”, or typography taste

### 5. Behavioral evidence

- Only affected actions (click, type, submit, …)
- Record observable outcomes (UI state, network, console)
- Reject fake UI (controls that don’t drive real behavior)
- Distinguish expected errors (e.g. 422 on invalid input) from regressions

### 6. Report (evidence package)

```markdown
### UI Evidence Report

**Artifacts**
- Screenshots / recordings: …
- Tool runs (E2E, visual diff, a11y): … (pass/fail/skipped + logs)

**Objective findings** (agent-observed, for user confirmation)
- …

**Behavioral notes**
- Interactions exercised: …
- Runtime/network: …

**Acceptance**
- Agent visual self-PASS: **not allowed**
- Awaiting: user review / CI visual gate
```

## Forbidden equivalences

```text
build / lint / types / unit tests     ≠  UI accepted
screenshot file exists                ≠  visual accepted
agent says "looks good"               ≠  visual accepted
DOM / source inspection               ≠  browser evidence
could not capture evidence            ≠  accepted
```

## Result labels (honest)

| Label | Meaning |
| --- | --- |
| EVIDENCE_READY | Artifacts (+ tool results) produced for user/CI |
| TOOL_FAIL | Project verification tool reported failure |
| BLOCKED | Could not run app/browser/tools/credentials |
| AGENT_PASS on visuals | **Disallowed** |
