# neverthrow review checklist

Use this checklist when reviewing neverthrow code.

## API boundaries

- [ ] Public/module/service boundaries use explicit `Result<T, E>` or `ResultAsync<T, E>`.
- [ ] `safeTry` functions declare the outer `Result` or `ResultAsync` return type explicitly.
- [ ] Plain values are returned where no failure is possible.
- [ ] No boundary mixes thrown exceptions with `Result` returns.
- [ ] Throwing or rejecting external APIs are converted at adapters with `fromThrowable`, `ResultAsync.fromThrowable`, `fromAsyncThrowable`, or `fromPromise`.

## Error modeling

- [ ] Error type is a discriminated union with a stable `_tag` or existing project discriminator such as `type`.
- [ ] Error variants are narrow, actionable, and domain-specific.
- [ ] Runtime schemas or constructor helpers validate error payloads at trust boundaries.
- [ ] Strict schema parsing or explicit picking prevents sensitive or unexpected fields from leaking.
- [ ] Unknown exceptions are mapped with preserved context (`cause`, message, ids, stack if available).
- [ ] Error routing is exhaustive at adapters or pattern-matching utilities.
- [ ] No `Result<any, any>`, `ResultAsync<any, any>`, or broad unnormalized error unions.

## Composition

- [ ] Exception sources wrapped via `Result.fromThrowable` / `fromThrowable`.
- [ ] Promise/rejection sources wrapped via `ResultAsync.fromPromise` / `fromPromise` / `fromAsyncThrowable`.
- [ ] Success transforms use `map`.
- [ ] Error normalization uses `mapErr`.
- [ ] Dependent operations use `andThen` or `asyncAndThen`.
- [ ] `.andThen` callbacks are named functions or tiny adapters, not large logic blocks.
- [ ] Multi-step dependent values use `safeTry` instead of nested closures or accumulator objects.
- [ ] `safeTry` uses direct `yield* result` / `yield* resultAsync`; no `.safeUnwrap()` in neverthrow 8.x code.
- [ ] Side effects preserving success value use `andTee`; error reporting uses `orTee`.
- [ ] Checks or side effects whose failure must stop the flow use `andThrough`.
- [ ] Recoverable flows use `orElse`.

## Consumption

- [ ] Results are consumed at boundaries with `match` or `unwrapOr`.
- [ ] Unsafe unwraps are absent in production code.
- [ ] If unsafe unwrap exists, it is limited to tests or explicit throwaway scripts.
- [ ] No `Result` or `ResultAsync` call is silently ignored.

## Tooling and consistency

- [ ] `eslint-plugin-neverthrow` is enabled or recommended in the change context.
- [ ] The `must-use-result` rule, or an equivalent local rule, blocks discarded results.
- [ ] Refactor removed legacy null/throw/reject branches rather than duplicating both paradigms.
- [ ] Naming and typing stay consistent across synchronous and asynchronous paths.
- [ ] Existing discriminator style is respected unless the task explicitly asks to migrate it.

## Observability

- [ ] Logging, metrics, tracing, and Sentry-style reporting are isolated in `andTee` / `orTee`.
- [ ] Observability callbacks do not change the domain `T` or `E` type unless the failure is intentionally modeled with `andThrough`.
- [ ] OpenTelemetry span attributes and events use safe identifiers, not raw domain objects or secrets.

## Performance

- [ ] I/O boundaries use `ResultAsync`; in-memory hot loops prefer synchronous `Result`.
- [ ] Fine-grained `ResultAsync` wrappers are not created per item in large CPU-bound loops unless I/O is involved.
- [ ] `ResultAsync.combine` / `combineWithAllErrors` usage matches the desired short-circuit or collect-all behavior.

## Tests

- [ ] Tests assert `Ok` path behavior and payload.
- [ ] Tests assert `Err` path behavior and error variant.
- [ ] Tests cover key mapping/recovery branches (`mapErr`, `orElse`).
- [ ] Tests cover `safeTry` short-circuit behavior for each meaningful error variant.
