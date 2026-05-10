---
name: neverthrow-best-practices
description: Use when designing or refactoring TypeScript error contracts with neverthrow Result or ResultAsync; do not use for throw-only flows or paths that cannot fail.
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

## When Not To Use

- A code path cannot fail and a plain value is sufficient.
- The user explicitly wants exception-first flow at that boundary.
- Throwaway scripts do not need typed failure contracts.

## Inputs

- Boundary functions and module contracts to refactor.
- Existing error shapes, throw sites, and promise rejection paths.
- Constraints on backward compatibility and error semantics.

## Decision Rules

1. Module and service boundaries must declare explicit result return types.
2. Use one failure channel per boundary: either typed `Result` flows or thrown exceptions, never both.
3. Model `E` as narrow discriminated unions with actionable variants and preserved context.
4. Keep result consumption at adapters and boundary layers; avoid unsafe unwrap in production paths.
5. Convert only real failure boundaries; do not wrap trivial pure helpers that cannot fail.
6. Ban weak typing such as `Result<any, any>`.

## Workflow

1. Identify boundary functions and classify expected failure modes.
2. Define narrow discriminated error unions with preserved context.
3. Refactor return types to `Result` or `ResultAsync` at boundaries.
4. Remove mixed error channels and normalize consumption points.
5. Verify call sites handle all variants explicitly.

## Output Format

- `Boundary decisions`: where neverthrow was applied and where it was intentionally skipped.
- `Type contract changes`: updated `Result` or `ResultAsync` signatures and error union variants.
- `Migration notes`: required call-site handling updates and remaining risks.

## Trigger Test Prompts

- Should trigger: "Refactor these service methods from throw/catch to ResultAsync with typed error unions."
- Should trigger: "Review this neverthrow usage for mixed failure channels and unsafe unwraps."
- Should not trigger: "Add try/catch logging only and keep thrown exceptions as the primary API contract."
- Should not trigger: "Optimize a pure helper function that has no failure path."

## References

- `references/patterns.md`
- `references/review-checklist.md`
- `references/refactor-recipes.md`
