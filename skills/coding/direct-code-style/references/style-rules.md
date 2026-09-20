# Style Rules

## 1) Zero DDD tactical patterns

Do:

- Keep data in simple local structures and pass them directly through the slice.
- Use plain modules and functions for business orchestration.

Do not:

- Add `Repository`, `Domain Service`, `Aggregate Root`, `Factory` naming/layers.
- Add multi-hop model mapping like `DTO -> DO -> PO` without real necessity.

## 2) No internal pub/sub

Do:

- Use explicit function calls with clear call chains (`sync` or `async/await`).

Do not:

- Add EventBus, observer chains, or hidden listener-triggered execution for in-process business logic.

Exception:

- Cross-system or cross-service async integration where messaging is a real requirement.

## 3) Simplicity and explicitness

Do:

- Choose readable names and straightforward branching.
- Keep abstractions proportional to real reuse.

Do not:

- Use hard-to-read syntax tricks or speculative abstractions.

## 4) Flat over nested

Do:

- Handle invalid branches first and return early.
- Keep indentation shallow.

Do not:

- Build deep `if/else` pyramids.

## 5) Top-down readability

Do:

- Put the main entry function first.
- Place helper functions immediately below in the order they are called.

Do not:

- Scatter related logic across distant files when one slice can contain it.

## 6) Kill god functions

Do:

- Split long overloaded functions into single-purpose helpers in the same slice.
- Prefer pure helper functions for rule calculations.

Do not:

- Collapse all logic into one huge function in the name of "flatness."

## 7) Isolate side effects

Do:

- Keep business rule computation separate from IO operations (DB, HTTP, file, queue).
- Perform orchestration at entry points; keep rule functions deterministic.

Do not:

- Mix complex rule branches with IO calls in every branch.

## 8) Pragmatic types

Do:

- Prefer lightweight data shapes (records, simple object types, data classes).
- Define interfaces only when multiple implementations or clear boundaries exist.

Do not:

- Add pointless getter/setter wrappers.
- Add single-implementation `IService` style interfaces without a real boundary need.

