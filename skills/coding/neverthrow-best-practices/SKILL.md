---
name: neverthrow-best-practices
description: Use when designing or reviewing TypeScript neverthrow Result/ResultAsync domain error contracts, safeTry flows, observability tees, or throw-to-Result migrations; do not use for throw-first APIs or infallible helpers.
---

# Neverthrow Best Practices

## Purpose

Enforce neverthrow-based TypeScript error contracts that make expected failures explicit, composable, observable, and safe at domain and service boundaries. Keep implementation patterns in `references/`.

## Trigger Conditions

- Add neverthrow to TypeScript code.
- Refactor throwing, nullable, or rejected flows into typed `Result` or `ResultAsync`.
- Review `Result` and `ResultAsync` usage.
- Standardize error handling contracts.
- Design new APIs with neverthrow.
- Flatten dependent `Result` flows with `safeTry`.
- Add schema-backed domain errors or exhaustive error routing.
- Add logging, metrics, tracing, or alerts to neverthrow chains.
- Audit neverthrow performance, unsafe unwraps, or discarded results.

## When Not To Use

- A code path cannot fail and a plain value is sufficient.
- The user explicitly wants exception-first flow at that boundary.
- Throwaway scripts do not need typed failure contracts.
- The task is only about generic logging, tracing, or validation without typed failure contracts.

## Inputs

- Boundary functions and module contracts to refactor.
- Existing error shapes, throw sites, and promise rejection paths.
- Constraints on backward compatibility and error semantics.
- Observability, schema validation, and linting constraints in the target project.
- Hot-path or high-throughput constraints that affect `ResultAsync` usage.

## Decision Rules

1. Module and service boundaries must declare explicit result return types.
2. Use one failure channel per boundary: either typed `Result` flows or thrown exceptions, never both.
3. Model `E` as narrow discriminated unions with actionable variants, preserved context, and a stable discriminator such as `_tag` or the project's existing `type` field.
4. Prefer schema-backed error construction at trust boundaries; use strict parsing to prevent leaking unexpected fields.
5. Treat `.andThen` as a connector, not a logic body: pass named functions or tiny adapters and extract branches into explicit functions.
6. Use `safeTry` for multi-step dependent flows, but declare the outer `Result` or `ResultAsync` return type explicitly.
7. For neverthrow 8.x, use `yield* result` or `yield* resultAsync` directly in `safeTry`; do not introduce `.safeUnwrap()`.
8. `safeTry` only unwraps `Result` values and short-circuits `Err`; convert thrown exceptions or rejected promises with `Result.fromThrowable`, `ResultAsync.fromThrowable`, `fromAsyncThrowable`, or `ResultAsync.fromPromise` before yielding them.
9. Use `andTee` and `orTee` for non-blocking observability side effects, and `andThrough` for side effects or checks whose failure must stop the flow.
10. Prefer an async shell and sync core: keep I/O boundaries in `ResultAsync`, but keep CPU-heavy validation and transformation loops in synchronous `Result` where practical.
11. Consume results at adapter boundaries with `match` or `unwrapOr`; keep unsafe unwraps out of production paths.
12. Enable or recommend `eslint-plugin-neverthrow` so results cannot be silently discarded.
13. Convert only real failure boundaries; do not wrap trivial pure helpers that cannot fail.
14. Ban weak typing such as `Result<any, any>`, `ResultAsync<any, any>`, or broad `unknown` error unions without normalization.

## Workflow

1. Identify boundary functions and classify expected failure modes.
2. Define or tighten discriminated error unions, including schema validation when data crosses trust boundaries.
3. Wrap thrown, nullable, and rejected sources into typed `Result` or `ResultAsync` at the nearest adapter.
4. Compose domain steps with named functions, atomic `.andThen` connectors, or explicit `safeTry` flows.
5. Add observability with tee operators without changing the success or error contract.
6. Normalize consumption at controllers, jobs, CLI handlers, or other adapters.
7. Verify call sites handle all variants explicitly and that linting prevents dropped results.
8. Check whether hot paths should use synchronous `Result` instead of fine-grained `ResultAsync` chains.

## Output Format

- `Boundary decisions`: where neverthrow was applied and where it was intentionally skipped.
- `Type contract changes`: updated `Result` or `ResultAsync` signatures and error union variants.
- `Composition changes`: `andThen`, `safeTry`, tee, or sync/async boundary choices.
- `Migration notes`: required call-site handling, lint/tooling updates, and remaining risks.

## Trigger Test Prompts

- Should trigger: "Refactor these service methods from throw/catch to ResultAsync with typed error unions."
- Should trigger: "Review this neverthrow usage for mixed failure channels and unsafe unwraps."
- Should trigger: "Flatten this nested neverthrow flow with safeTry and remove safeUnwrap."
- Should trigger: "Add OpenTelemetry spans to this ResultAsync chain without changing the domain error type."
- Should not trigger: "Add try/catch logging only and keep thrown exceptions as the primary API contract."
- Should not trigger: "Optimize a pure helper function that has no failure path."

## References

- `references/patterns.md`
- `references/review-checklist.md`
- `references/refactor-recipes.md`
