# Review Checklist

Use this checklist when reviewing generated or refactored code under this style.

## Architecture and flow

- [ ] No DDD tactical layers were introduced (`Repository`, `Domain Service`, `Aggregate`, `Factory`).
- [ ] No internal EventBus, listener chain, or observer-style hidden execution path.
- [ ] Main business flow is explicit via direct function calls.

## Simplicity and readability

- [ ] Code favors straightforward logic over clever syntax or over-abstraction.
- [ ] Main entry is at the top of the file and helpers follow in call order.
- [ ] Related logic remains in the same slice unless separation is required.

## Control flow

- [ ] Guard clauses are used for invalid cases and early returns.
- [ ] Nesting depth is low; no deep `if/else` pyramids.
- [ ] Long functions are split into focused helpers.

## Boundaries and side effects

- [ ] Business rules are separated from IO operations.
- [ ] Pure computation helpers are used for non-IO rule logic.
- [ ] Orchestration and side-effect scheduling live in entry handlers.

## Types and data structures

- [ ] Data passing uses lightweight structures.
- [ ] No meaningless interface indirection (for example, one-off `IService` only).
- [ ] No boilerplate getter/setter wrapping without behavior.
- [ ] No unnecessary DTO/DO/PO model-conversion chain.

