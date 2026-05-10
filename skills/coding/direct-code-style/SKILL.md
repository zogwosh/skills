---
name: direct-code-style
description: Use when implementing or refactoring TypeScript business logic toward explicit low-ceremony code style; do not use when DDD tactical layering or event-driven internals are required.
---

# Direct Code Style

## Purpose

Apply a strict implementation style that keeps business logic simple, direct, and easy to read.

## Trigger Conditions

- Apply project coding style during feature work or refactors.
- Simplify over-engineered modules and remove unnecessary abstractions.
- Replace implicit control flow with explicit function calls.
- Flatten nested logic and improve top-down readability.

## When Not To Use

- The user explicitly requires DDD tactical layering for compatibility.
- The system genuinely requires asynchronous event semantics across boundaries.
- Framework-generated code must keep a fixed structure.

## Inputs

- Target files and module boundaries being changed.
- Existing abstraction pain points (deep inheritance, pubsub chains, indirection).
- Non-negotiable project constraints from the user or framework.

## Decision Rules

1. Do not introduce DDD tactical patterns (`Repository`, `Domain Service`, `Aggregate`, `Factory`) unless the user explicitly asks for them.
2. Do not introduce internal EventBus, observer/listener chains, or pub/sub for single-system business flow.
3. Prefer explicit and straightforward code over clever syntax and deep abstractions.
4. Use guard clauses and early return to keep control flow flat.
5. Keep top-down readability in each file: main entry first, helpers below in call order.
6. Split overloaded long functions into focused local helpers inside the same slice.
7. Separate business rules from IO side effects; keep rules as pure functions where practical.
8. Use pragmatic data types; avoid meaningless interfaces, getter or setter boilerplate, and heavyweight entity wrappers.

## Workflow

1. Identify behavior-critical paths and preserve runtime behavior first.
2. Remove needless indirection and keep main flow in one readable pass.
3. Convert nested branches into guard clauses and early returns.
4. Keep helper functions local and ordered by call flow.
5. Re-check side effects and error paths after simplification.

## Output Format

- `Code changes`: files and key simplifications applied.
- `Readability rationale`: why each simplification improves maintainability.
- `Behavior safety`: confirmed invariants and any residual risks.

## Trigger Test Prompts

- Should trigger: "Refactor this TypeScript service to remove over-abstraction and make control flow explicit."
- Should trigger: "Simplify this nested module with guard clauses and top-down readability."
- Should not trigger: "Design an event-driven integration between two services using pubsub."
- Should not trigger: "Implement strict DDD repositories and aggregates across the module."

## References

- `references/style-rules.md`
- `references/review-checklist.md`
