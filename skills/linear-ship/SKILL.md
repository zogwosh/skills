---
name: linear-ship
description: >-
  Ships UI with a Linear-style design → build → automated verify loop. Reads the
  Linear design canon, generates design.md from that canon when missing, plans
  and implements pages to those rules (not generic modern UI), installs
  Playwright if absent, and gates completion on automated checks—not model
  aesthetic PASS. Use when designing, building, polishing, or shipping web UI /
  harness / sandbox pages, or when the user mentions Linear style, linear-ship,
  design.md, or Playwright UI verification. Do not use for backend-only work or
  native non-browser UI.
---

# Linear Ship

Pipeline: **Design (Linear canon) → Build → Automated verify**.

| Step | Agent does | Done means |
| --- | --- | --- |
| Design | Read [linear-design.md](linear-design.md); ensure `design.md`; write a **bound** Linear plan | Plan cites canon tokens/roles |
| Build | Implement to `design.md` + canon | Code matches plan |
| Verify | Ensure Playwright; run automated checks | **Tests pass** |

“Linear” is not a vibe word. **Follow [linear-design.md](linear-design.md)** for every design and implementation decision. Generic “clean/modern” UI is a failure mode.

Final taste stays with the user; the ship gate is **automation**.

## Applicability

**Use when** building, polishing, or shipping browser UI (app, harness, playground, sandbox).

**Do not use when** backend-only or native non-browser UI.

## Phase 1 — Design (guided)

**Before any UI plan or `design.md` write:** read [linear-design.md](linear-design.md) in full.

### 1a. `design.md`

Search for `design.md` / `DESIGN.md` / tokens / design-system docs.

- **If found:** merge gaps against the canon (add missing tokens/roles); do not dilute Linear rules with generic marketing UI.
- **If missing:** **create** `design.md` at project (or app package) root **by instantiating the canon** — copy concrete tokens, type ladder, spacing, component rules from [linear-design.md](linear-design.md). Do not leave placeholder “(fill in)” aesthetic lines.

Map tokens to existing CSS variables when the repo already has a theme; otherwise use the canon’s starter palette as-is.

### 1b. Change plan (must be Linear-specific)

Before substantial UI code, publish a plan that **answers every item** in “Design plan must answer” from [linear-design.md](linear-design.md):

1. Surfaces (bg / surface / border per region)  
2. Type roles from the ladder only  
3. Accent usage (where — and nowhere else)  
4. Density (padding/gaps on the 4px scale)  
5. Control states (default / hover / active / focus)

Reject and rewrite the plan if it describes: hero marketing layouts, gradient orbs, stat-card dashboards as the default chrome, soft clay UI, or “general modern SaaS” without canon tokens.

Then proceed to build (unless the user asks to review the plan first).

## Phase 2 — Build

Implement exactly against `design.md` + [linear-design.md](linear-design.md) (project preset tokens win on named conflicts; structure/density/type rules still apply).

- Use CSS variables / tokens from `design.md` — no ad-hoc hex/spacing that bypass the scale  
- Densities, radii, borders, and type roles must match the plan  
- Match project stack and file layout  

## Phase 3 — Automated verify

Completion requires **passing automated checks**. Screenshot glance ≠ pass.

### 3a. Ensure Playwright

If Playwright (or equivalent wired UI E2E) is missing:

1. Install `@playwright/test` + browsers with the repo’s package manager  
2. Add minimal config + smoke spec in the normal test layout  
3. Reuse existing config/scripts when present  

### 3b. Minimum automation

Scoped to what shipped:

1. App/harness starts (`webServer` in Playwright when useful)  
2. Target route/view loads  
3. Critical selectors/landmarks visible  
4. Page errors hooked when practical  
5. Optional screenshot **artifacts** for the user/CI — not agent PASS  

### 3c. Gate

```text
npx playwright test   # or project script
```

| Result | Status |
| --- | --- |
| Pass | Verify **PASS** — command + summary |
| Fail | **FAIL** — fix and re-run |
| Cannot run | **BLOCKED** — no “verified” claim |

```text
build / lint / types / unit only     ≠  verified
agent "looks Linear"                 ≠  verified
playwright not run                   ≠  verified
```

## Checklist

1. Read [linear-design.md](linear-design.md)  
2. `design.md` exists and encodes the canon (created or patched)  
3. Change plan answers all five Linear plan questions  
4. UI built to plan + canon  
5. Playwright ready; automated checks **pass**  
6. No agent aesthetic self-PASS  
