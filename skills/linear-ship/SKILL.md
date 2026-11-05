---
name: linear-ship
description: >-
  Ships UI with a Linear-style design → build → automated verify loop. Generates
  a project design.md when missing, implements pages/components to Linear craft
  plus that preset, installs Playwright if absent, and gates completion on
  automated checks—not model aesthetic PASS. Use when designing, building,
  polishing, or shipping web UI / harness / sandbox pages, or when the user
  mentions Linear style, linear-ship, design.md, or Playwright UI verification.
  Do not use for backend-only work or native non-browser UI.
---

# Linear Ship

Pipeline: **Design (Linear) → Build → Automated verify**.

| Step | Agent does | Done means |
| --- | --- | --- |
| Design | Ensure `design.md` (create if missing); publish a short Linear plan | Preset + plan exist |
| Build | Implement UI to preset + Linear craft | Code matches plan |
| Verify | Ensure Playwright; run automated checks | **Tests pass** (not “looks good”) |

Final look-and-feel taste stays with the user; the ship gate is **automation**.

## Applicability

**Use when** building, polishing, or shipping browser UI (app, harness, playground, sandbox).

**Do not use when** backend-only or native non-browser UI.

## Phase 1 — Design

### 1a. `design.md` gate (generate if missing)

Search the repo for a UI preset (`design.md`, `DESIGN.md`, `tokens.json`, design-system docs).

- **If found:** use it as token/brand authority.
- **If missing:** **create** `design.md` at the project root (or the obvious app package root) before coding. It must be concrete enough to implement against:

```markdown
# Design

## Direction
Linear-inspired: restrained, dense, precise alignment, quiet chrome, subtle motion.

## Tokens
- Colors: (background, surface, border, text, text-muted, accent, danger, …)
- Typography: (font families, size/weight ladder, line-height)
- Spacing: (4/8-based scale)
- Radius / border / shadow: (prefer hairline borders; minimal shadow)

## Components
- Buttons, inputs, lists/tables, nav, dialogs — default / hover / active / focus

## Do / Don't
- Do: tight rhythm, one accent, clear hierarchy
- Don't: loud gradients, glow, pill soup, heavy shadows, decorative clutter
```

Fill tokens from the project if CSS variables / theme files already exist; otherwise choose a coherent Linear-like set and stick to it.

### 1b. Change plan

Before substantial UI code, write a short plan for *this* change: structure, type hierarchy, key states. Then proceed to build (no hard wait unless the user asks to review first).

## Phase 2 — Build (Linear-constrained)

Implement against `design.md` + this craft (preset wins on conflict):

**Layout:** tight spacing scale; clear alignment; high density without clutter; one job per view.  
**Type:** few sizes/weights; strong hierarchy.  
**Color/surface:** neutrals + one accent; hairline borders; no glow / loud gradients / multi-layer shadows.  
**Interaction:** Default / Hover / Active / Focus on interactive controls; short purposeful motion only.  
**Code:** use tokens/CSS variables from `design.md`; no unexplained magic numbers; match project stack.

**Avoid unless preset requires:** purple-on-white AI themes, ornamental pills/stat strips, toy radii, emoji chrome.

## Phase 3 — Automated verify

Completion requires **passing automated checks**. Model commentary on screenshots is never the gate.

### 3a. Ensure Playwright

If the project has no Playwright (or equivalent E2E already wired for UI):

1. Install Playwright into the project (`@playwright/test` + browsers) using the package manager already in use
2. Add a minimal config and a smoke spec under the project’s normal test layout
3. Prefer reusing an existing `playwright.config.*` / scripts if present

### 3b. What to automate (minimum)

Scope to the UI just shipped:

1. App/harness starts (use project’s documented start; wire `webServer` in Playwright when useful)
2. Target route/view loads successfully
3. Critical selectors / landmarks for the change are visible
4. No unexplained page errors during the smoke (e.g. pageerror hooks) when practical
5. Optional: screenshot **artifacts** attached to the test run for the user — for humans/CI, not agent PASS

Expand only when the change warrants (form submit, dialog open/close, etc.).

### 3c. Run and gate

```text
npx playwright test   # or the project’s npm script
```

| Result | Ship status |
| --- | --- |
| Tests pass | Verify **PASS** — report command + summary |
| Tests fail | **FAIL** — fix UI or tests, re-run until pass or user stops |
| Cannot install/run | **BLOCKED** — say what broke; do not claim UI verified |

```text
build / lint / types / unit tests only   ≠  verified
agent "looks Linear" / screenshot glance ≠  verified
playwright not run                       ≠  verified
```

## Checklist

1. `design.md` exists (created or reused)
2. Linear plan noted; UI implemented to preset + Linear craft
3. Playwright installed/configured if it was missing
4. Automated UI checks run and **pass**
5. No agent aesthetic self-PASS
