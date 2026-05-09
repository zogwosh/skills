---
name: neverthrow-best-practices
description: Enforce modern neverthrow 8.2.0 patterns for TypeScript boundaries, refactors, API design, and Result or ResultAsync code reviews.
---

# Neverthrow Best Practices

## Purpose

Enforce consistent neverthrow-based error contracts in TypeScript code while keeping implementation details in `references/`.

## Trigger Conditions

- Add neverthrow to TypeScript code.
- Refactor throwing, nullable, or rejected flows into typed `Result` or `ResultAsync`.
- Review `Result` and `ResultAsync` usage.
- Standardize error handling contracts.
- Design new APIs with neverthrow.

## Decision Rules

1. Module and service boundaries must declare explicit result return types.
2. Use one failure channel per boundary: either typed `Result` flows or thrown exceptions, never both.
3. Model `E` as narrow discriminated unions with actionable variants and preserved context.
4. Keep result consumption at adapters and boundary layers; avoid unsafe unwrap in production paths.
5. Convert only real failure boundaries; do not wrap trivial pure helpers that cannot fail.
6. Ban weak typing such as `Result<any, any>`.

## When To Use

- Cross-module APIs need explicit success and failure contracts.
- Legacy code mixes `try/catch`, `null`, and rejected promises.
- Teams need consistent, reviewable error behavior.
- Refactors must preserve business meaning while tightening type safety.

## When Not To Use

- The function cannot fail and a plain value is sufficient.
- The code path is an explicit throwaway script where strict result contracts add no value.
- A broad migration would add noise without improving boundary safety.

## References

- `references/patterns.md`
- `references/review-checklist.md`
- `references/refactor-recipes.md`
