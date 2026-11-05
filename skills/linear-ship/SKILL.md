---
name: linear-ship
description: >-
  Ships UI with Linear product design → build → automated verify. Follows Linear
  principles (no descriptive fluff, hide what isn’t needed yet, dense work UI),
  generates design.md from the canon when missing, implements accordingly,
  installs Playwright if absent, and gates on automated checks—not model
  aesthetic PASS. Use when designing, building, polishing, or shipping web UI /
  harness / sandbox pages, or when the user mentions Linear style, linear-ship,
  design.md, or Playwright UI verification. Do not use for backend-only work or
  native non-browser UI.
---

# Linear Ship

Pipeline: **Design (Linear principles) → Build → Automated verify**.

| Step | Agent does | Done means |
| --- | --- | --- |
| Design | Read [linear-design.md](linear-design.md); ensure `design.md`; plan the **product** UI | Plan hides noise; copy is minimal |
| Build | Implement to plan + canon | Code matches |
| Verify | Ensure Playwright; run checks | **Tests pass** |

Linear ≠ “indigo + Inter”. It’s how the page **behaves**: no explanatory prose, nothing unused on first paint. Read [linear-design.md](linear-design.md) before designing.

Ship gate is **automation**; taste stays with the user.

## Applicability

**Use when** building, polishing, or shipping browser UI (app, harness, playground, sandbox).

**Do not use when** backend-only or native non-browser UI.

## Phase 1 — Design

**First:** read [linear-design.md](linear-design.md).

### 1a. `design.md`

- **Exists:** keep it; patch only if it contradicts Linear principles (fluff copy norms, “show everything” layouts).
- **Missing:** create at project/app root from the canon — principles first, then starter tokens.

### 1b. Change plan

Before substantial UI code, write a short plan that covers:

1. **Job at hand** on first paint  
2. **What’s hidden** until needed (and where it lives)  
3. **Copy budget** — every string; cut descriptive filler  
4. **Structure** — regions and hierarchy without helper prose  

If the plan needs paragraphs to explain the UI to the user, the design is wrong — simplify until the structure carries meaning.

Then build (unless the user wants to review the plan first).

## Phase 2 — Build

Implement the plan + [linear-design.md](linear-design.md):

- First paint shows only the job at hand; progressive disclosure for the rest  
- Labels/actions only — no descriptive marketing or tutorial copy in chrome  
- Tokens/spacing/type from `design.md`; match project stack  

## Phase 3 — Automated verify

Completion = **passing automated checks**. Screenshot glance ≠ pass.

### 3a. Ensure Playwright

If missing: install `@playwright/test` + browsers, add minimal config/smoke (or reuse existing E2E).

### 3b. Minimum automation

Scoped to what shipped: app starts, route loads, critical selectors visible, pageerror hooks when practical; screenshots optional as **artifacts**.

### 3c. Gate

```text
npx playwright test   # or project script
```

| Result | Status |
| --- | --- |
| Pass | Verify **PASS** |
| Fail | Fix and re-run |
| Cannot run | **BLOCKED** — don’t claim verified |

```text
build / lint / types / unit only  ≠  verified
agent "looks Linear"              ≠  verified
playwright not run                ≠  verified
```

## Checklist

1. Read [linear-design.md](linear-design.md)  
2. `design.md` present (created or reused)  
3. Plan: job at hand, what’s hidden, copy budget, structure  
4. Build matches — no fluff, no unused chrome on first paint  
5. Playwright checks **pass**  
6. No agent aesthetic self-PASS  
