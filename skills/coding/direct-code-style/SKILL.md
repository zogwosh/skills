---
name: direct-code-style
description: Enforce explicit and low-ceremony implementation style with zero DDD tactical patterns, no internal pubsub, guard clauses, and top-down readability.
---

# Direct Code Style

## Purpose

Apply a strict implementation style that keeps business logic simple, direct, and easy to read.

## Trigger Conditions

- Apply project coding style during generation, modification, or refactor.
- Simplify over-engineered architecture and remove unnecessary abstractions.
- Replace implicit control flow with explicit function calls.
- Flatten nested logic and improve readability.

## Decision Rules

1. Do not introduce DDD tactical patterns (`Repository`, `Domain Service`, `Aggregate`, `Factory`) unless the user explicitly asks for them.
2. Do not introduce internal EventBus, observer/listener chains, or pub/sub for single-system business flow.
3. Prefer explicit and straightforward code over clever syntax and deep abstractions.
4. Use guard clauses and early return to keep control flow flat.
5. Keep top-down readability in each file: main entry first, helpers below in call order.
6. Split overloaded long functions into focused local helpers inside the same slice.
7. Separate business rules from IO side effects; keep rules as pure functions where practical.
8. Use pragmatic data types; avoid meaningless interfaces, getter or setter boilerplate, and heavyweight entity wrappers.

## When To Use

- Day-to-day TypeScript feature work and refactors.
- Business logic where maintainability and visible call chains matter.
- Cleanup of deeply nested, event-driven, or over-patterned code.

## When Not To Use

- User explicitly requires DDD tactical layering for compatibility or external standards.
- Cross-service asynchronous integration that truly needs messaging semantics.
- Generated framework code that must keep framework-mandated structure.

## References

- `references/style-rules.md`
- `references/review-checklist.md`

