# neverthrow review checklist

Use this checklist when reviewing neverthrow code.

## API boundaries

- [ ] Public/module/service boundaries use explicit `Result<T, E>` or `ResultAsync<T, E>`.
- [ ] Plain values are returned where no failure is possible.
- [ ] No boundary mixes thrown exceptions with `Result` returns.

## Error modeling

- [ ] Error type is a discriminated union with a `type` field.
- [ ] Error variants are narrow, actionable, and domain-specific.
- [ ] Unknown exceptions are mapped with preserved context (`cause`, message, ids, stack if available).
- [ ] No `Result<any, any>`.

## Composition

- [ ] Exception sources wrapped via `Result.fromThrowable` / `fromThrowable`.
- [ ] Promise/rejection sources wrapped via `ResultAsync.fromPromise` / `fromPromise` / `fromAsyncThrowable`.
- [ ] Success transforms use `map`.
- [ ] Error normalization uses `mapErr`.
- [ ] Dependent operations use `andThen` or `asyncAndThen`.
- [ ] Side effects preserving success value use `andThrough` or `andTee`.
- [ ] Recoverable flows use `orElse`.

## Consumption

- [ ] Results are consumed at boundaries with `match` or `unwrapOr`.
- [ ] Unsafe unwraps are absent in production code.
- [ ] If unsafe unwrap exists, it is limited to tests or explicit throwaway scripts.

## Tooling and consistency

- [ ] `eslint-plugin-neverthrow` is enabled or recommended in the change context.
- [ ] Refactor removed legacy null/throw/reject branches rather than duplicating both paradigms.
- [ ] Naming and typing stay consistent across synchronous and asynchronous paths.

## Tests

- [ ] Tests assert `Ok` path behavior and payload.
- [ ] Tests assert `Err` path behavior and error variant.
- [ ] Tests cover key mapping/recovery branches (`mapErr`, `orElse`).

