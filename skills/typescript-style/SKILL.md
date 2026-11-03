---
name: typescript-style
description: >-
  Applies house TypeScript/React style focused on low cognitive load (guard
  clauses, direct returns, structured dispatch, no low-value intermediates,
  stepdown/destructuring), plus Google TS judgment rules that gts does not
  enforce. Use when writing, reviewing, or refactoring .ts/.tsx (including
  React), or when the user mentions gts, Google TypeScript style, guard
  clauses, happy path, or cognitive-load style. Do not use for non-TypeScript
  languages, concept-only discussion without code edits, or pure
  formatting/lint issues owned by gts fix/lint.
---

# TypeScript style

House style on top of [gts](https://github.com/google/gts). Format and lint-fixable rules belong to gts — run `gts fix` / `gts lint`; do not restate them here.

**Priority:** gts → house cognitive rules (below) → [google-judgment.md](google-judgment.md).

## Applicability

**Use when**
- Authoring or reviewing `.ts` / `.tsx` (including React components and hooks)
- Refactoring control flow, naming, module boundaries, or types in TS
- User asks for Google TS / gts-aligned style beyond what lint covers

**Do not use when**
- Non-TypeScript code
- Discussion only — no code changes
- Pure format/lint cleanup (`gts fix` is enough)

When this skill applies, also read and apply [google-judgment.md](google-judgment.md).

## House rules

### 1. Guard clauses — happy path shallow

Fail or return early for validation, auth, empty data, and edge cases. Never bury the main path in nested `if`s.

```ts
// Bad
if (user.isActive) {
  if (order.items.length > 0) {
    if (user.hasBalance(order.total)) {
      return executePayment(order, user);
    }
  }
}

// Good
if (!user.isActive) throw new Error('用户未激活');
if (order.items.length === 0) throw new Error('购物车为空');
if (!user.hasBalance(order.total)) throw new Error('余额不足');
return executePayment(order, user);
```

### 2. Direct return — no mutating `let` accumulators

Do not declare `let` fields and overwrite them across branches. Each branch returns a complete result. Limited `let` only for real loop accumulation or tight algorithms.

```ts
// Bad
let remainingText = `剩余 ${limit - used} 个`;
if (limit === 0) remainingText = '无配额上限';
else if (used >= limit) remainingText = '配额已满';
return {remainingText};

// Good
if (limit === 0) {
  return {remainingText: '无配额上限', summaryText: `${used} / 不限`};
}
if (used >= limit) {
  return {remainingText: '配额已满', summaryText: `${used} / ${limit}`};
}
return {
  remainingText: `剩余 ${limit - used} 个`,
  summaryText: `${used} / ${limit}`,
};
```

### 3. Structured dispatch for discrete modes

Peer mutually exclusive states (tabs, modes, status machines) use `switch` or a map — not `if` / `else if` chains. Cover `default` or exhaustiveness.

```tsx
// Bad
if (mode === 'view') return <Viewer data={data} />;
if (mode === 'edit') return <Editor data={data} />;
return <Fallback />;

// Good
switch (mode) {
  case 'view':
    return <Viewer data={data} />;
  case 'edit':
    return <Editor data={data} />;
  default:
    return <Fallback />;
}
```

### 4. No low-value intermediates

Do not extract one-shot obvious booleans or double negatives (`isLimited = !isUnlimited`). Name a local only if the expression is hard to read or the value is reused.

```ts
// Bad
const isUnlimited = limit === 0;
const isLimited = isUnlimited === false;
const isFull = isLimited && used >= limit;
if (isFull) { ... }

// Good
if (limit === 0) { ... }
if (used >= limit) { ... }
```

### 5. Top-level destructuring and stepdown

- If several fields are used repeatedly, destructure once at the top of the function/scope. Keep **parameter** destructuring flat (one level); pull nested objects into locals first.
- **Stepdown:** high-level flow first, helpers/details below — reading order matches business order.

## Checklist

1. gts owns format/lint-fixables
2. Guards first; happy path at shallow indent
3. Branches return snapshots; no overwritten `let` bags
4. Discrete modes → `switch` / map
5. No pointless intermediates; destructure at top; stepdown
6. Apply [google-judgment.md](google-judgment.md) (exports, naming, types, comments)
