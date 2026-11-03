---
name: web-ui-verification
description: Universal verification protocol for browser-rendered frontend UI changes. Enforces real-browser visual inspection and dynamic behavioral acceptance. Use whenever modifying layout, styling, responsive UI, forms, interactive controls, dialogs, async states, or user-visible browser behavior. Do not use for backend-only or native UI tasks.
---

# Web UI Verification Protocol

A portable, capability-based protocol for verifying user-visible changes in browser-rendered Web UIs.

Do not prescribe or hard-code project-specific URLs, selectors, test IDs, fixtures, authentication flows, framework choices, or directory layouts in this skill. Discover and use project-specific details at execution time when needed.

---

## 1. Applicability

### When to Use
Trigger this skill whenever a task modifies:
- Rendered UI, layout, styling, or responsive behavior
- Forms, inputs, tables, lists, toolbars, or data grids
- Modals, dialogs, drawers, dropdowns, navigation, or menus
- Interactive controls (buttons, switches, toggles, tabs)
- Loading, skeleton, empty, or error states
- Any other user-visible browser behavior

### When NOT to Use
- **Backend-only changes**: APIs, database schemas, or server-side logic without browser UI impact.
- **Native desktop or mobile applications**: Non-browser UI (e.g., iOS, Android, Qt, WPF).

---

## 2. Verification Workflow

Every UI verification MUST follow this sequence:

```text
1. Derive affected scope
   │
2. Discover project verification capabilities
   │
3. Run real application
   │
4. Visual Acceptance ◄────────────────────┐
   │                                      │
   ├── [Defects Found] ──► repair visual defects
   │
5. Dynamic Browser Acceptance ◄───────────┐
   │                                      │
   ├── [Defects Found] ──► repair functional/runtime defects
   │                         │ (if repair alters layout/styling)
   │                         └────────────┘
6. Final Result (PASS / FAIL / BLOCKED)
```

1. **Derive Affected Scope**: Analyze requirements, git diffs, component hierarchy, and user journeys. Identify affected surfaces, viewports, visual states, interactions, and async flows. Test only changed or reasonably affected areas—never run mechanical tests on unrelated business flows.
2. **Discover Project Capabilities**: Inspect project configuration and documentation (`package.json`, test scripts, E2E configs, dev tooling). Prioritize reusing existing project verification tools before falling back to generic browser/debugging capabilities in the agent environment.
3. **Run Real Application**: Start the app via its documented method. Do not substitute source, DOM, CSS inspection, or build checks for running the app. Determine readiness from application-specific observable conditions rather than fixed delays. Persistent background connections (WebSockets, polling, HMR) MUST NOT by themselves prevent verification when the relevant UI state is stable.
4. **Visual Acceptance**: Render in a real browser, capture viewports, inspect images, and verify layout and temporal transitions. Visual Acceptance MUST PASS before Dynamic Browser Acceptance begins.
5. **Dynamic Browser Acceptance**: Execute affected interactions, verify observable state changes and data flow, and inspect runtime/network diagnostics.
6. **Defect Repair & Regression Loop**: Fix defects and re-verify. If a functional/runtime repair alters layout or styling, re-run affected Visual Acceptance steps.

---

## 3. Visual Acceptance

Visual Acceptance ensures that the rendered UI is structurally and cosmetically correct across relevant viewports.

### Viewport Coverage
Verify at least two viewports using real browser rendering:
1. **Desktop viewport**: Target width ~1440px.
2. **Narrow / Tablet viewport**: Aligned with project responsive breakpoints.
If a change targets a specific breakpoint, verify that adjacent breakpoints do not suffer visual regressions.

### Viewport Screenshots & Inspection
- **Complete Viewport Rendering**: Capture the complete relevant browser viewport for each required size. Do not substitute isolated component renders or synthetic images for real-application viewport rendering.
- **Mandatory Visual Inspection**: The agent MUST inspect the captured screenshot using available image inspection capabilities.
  - **Strictly Forbidden**: `screenshot command succeeded → visual PASS`. The agent must evaluate the actual image content.

### Scoped Inspection Checklist
Inspect affected surfaces for:
- **Layout & Overflow**: Unexpected horizontal scrollbars, viewport overflow, clipping, overlap, broken z-index stacking.
- **Spacing & Dimensions**: Distorted margins/padding, abnormal element dimensions, inconsistent alignment.
- **Responsive Integrity**: Broken wrapping, unintended truncation, unwanted ellipses, layout collapse.
- **Component Usability**: Unusable button groups, overlapping table columns, dialogs/drawers exceeding the viewport, sticky regions obscuring content.

### Temporal Visual Behavior
A single static screenshot CANNOT prove time-dependent visual behavior.
For loading states, skeletons, async content, conditional reveals, accordion expansion, or transitions:
- Observe the transition live in the browser.
- Check for flicker, severe layout shifts (CLS), stale-content flashes, placeholder flashes, or abrupt height jumps.
- Capture distinct screenshots of key states (e.g., skeleton vs. populated) when needed.

### Visual Repair Loop
If a visual defect is found, fix it, render the affected state again, capture new evidence, and inspect the new result. Never use pre-fix screenshots as evidence that a visual defect was resolved.

---

## 4. Dynamic Browser Acceptance

Verify that the UI `looks correct + behaves correctly + fails cleanly` in a live browser.

### Interaction Coverage
- Execute real user actions (`click`, `type`, `select`, `toggle`, `open`, `close`, `submit`, `retry`) for affected controls only.
- Do NOT invent tests for unaffected or non-existent interactions.

### Stateful Controls
- Trigger the interaction and verify visual state changes, accessibility attributes (`aria-*`), and dependent UI updates.
- Verify the resulting application behavior or state through observable effects. Inspect internal application state only when it is necessary and reliably available.
- Do NOT infer correctness from event handler existence or static DOM inspection.

### Forms
- When the change can affect form behavior, validation, state, or dependent fields, exercise the relevant form behavior (inputs, validation triggers, error display/clearing, submit states).
- For purely visual form adjustments (e.g., padding, font size), verify visual states, focus, and runtime stability without running full form validation flows.

### Asynchronous Operations & Data Flow
For save, create, update, delete, or refresh operations, verify the complete lifecycle:
```text
user action → pending indicator → async operation → result processed → observable state update → rendered outcome
```
- **Reject Fake UI**: Disallow visual-only controls that fail to execute real application logic (e.g., a "Save" button that dismisses a modal without persisting state).

### Runtime, Console & Network Diagnostics
- Check for uncaught runtime exceptions, console errors, and unexpected failed requests.
- **Standard**: No unexplained console/runtime errors or unexpected network failures caused by the tested flow.
- **Triage**: Fix flow-induced issues. Distinguish expected failures (e.g., HTTP 422 on invalid test input) or benign external noise; document why they do not invalidate acceptance.

### Surfaces Without Interactive Controls
Dynamic acceptance remains **MANDATORY**. Do not invent interactions. Load the affected surface, observe runtime stability and any relevant dynamic rendering, and confirm that the change introduces no unexplained runtime, console, or network regressions.

---

## 5. Acceptance Rules & Result Semantics

### Strictly Forbidden Equivalences
```text
build passed            ≠  UI verified
lint passed             ≠  UI verified
typecheck passed        ≠  UI verified
unit tests passed       ≠  UI verified
DOM looks correct       ≠  UI verified
screenshot file exists  ≠  Visual Acceptance PASS
event handler exists    ≠  Interaction verified
```

### Result Semantics
- **PASS**: All applicable verification stages were executed in a live browser and met criteria without unresolved defects.
- **FAIL**: Unresolved visual, functional, interaction, or runtime defects were detected.
- **BLOCKED**: A necessary stage could not be executed due to environmental limitations (app cannot start, browser/image inspection unavailable, missing credentials/test data). Never assume correctness when blocked (`could not verify → assume correct → PASS` is strictly prohibited).

### Final Acceptance Gate
Declaring Web UI verification complete requires both:
```text
Visual Acceptance: PASS
Dynamic Browser Acceptance: PASS
```

---

## 6. Verification Report Format

Produce a concise, factual summary upon completing verification:

```markdown
### Web UI Verification Report

**Visual Acceptance**: PASS | FAIL | BLOCKED
- Viewports verified: [e.g., Desktop 1440px, Mobile 375px]
- States inspected: [e.g., default, loading skeleton, error state]
- Visual findings: [Factual summary of layout, spacing, responsive behavior]

**Dynamic Browser Acceptance**: PASS | FAIL | BLOCKED
- Interactions exercised: [e.g., form input, modal open/close, toggle state]
- Async & data flow: [e.g., save request completed, optimistic update reflected]
- Runtime observation: [e.g., no unexplained console/runtime errors or unexpected network failures]

**Static Checks**: [e.g., build / typecheck / tests if executed]

**Overall Result**: PASS | FAIL | BLOCKED
```