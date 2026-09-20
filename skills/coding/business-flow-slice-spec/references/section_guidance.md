# Business Flow Slice Spec Section Guidance

Use this reference when a section needs more detail than the main skill instructions provide.

## 1. Business outcome

State the business result, not the technical implementation.

Good:

```text
用户从可变购物车获得一个金额冻结、库存已预留、可继续支付的订单。
```

Poor:

```text
调用 OrderService 创建订单。
```

## 2. Trigger

Describe actor, event, API/UI/job/webhook trigger, and preconditions.

Include:

- actor or system source
- user/system action
- interface such as UI route, API endpoint, job, webhook, queue consumer, or cron
- required preconditions

## 3. Participants

List business participants, not only technical services. Include users, systems, data objects, external providers, scheduled jobs, and downstream consumers when relevant.

## 4. Input state

Describe the required state before the flow starts. Include statuses, ownership, existing records, missing records, locks, pending jobs, or external system state.

## 5. State flow

This is the core section. Use a step table with business events, reads, writes, before state, and after state.

Rules:

- Each row must represent a meaningful business event or state transition.
- Include only implementation steps that affect business meaning, data, state, or side effects.
- Prefer concrete states such as `cart=active`, `order=payment_pending`, `inventory=reserved`.
- Do not hide important writes inside vague descriptions such as "process order".

## 6. Data flow

Show how important data moves and transforms across the slice. Include snapshots, derived totals, copied fields, normalized input, external identifiers, and read models.

## 7. Side effects

Separate side effects from normal writes.

Use categories:

```markdown
Synchronous:
- database writes
- cache updates

Asynchronous:
- emitted events
- queued jobs
- scheduled expiry tasks

External:
- payment provider call
- email provider call
- webhook response

Must not happen:
- actions explicitly outside this slice
```

Always include `Must not happen` when a neighboring flow is easy to confuse with the current flow.

## 8. Failure states and compensation

Document failure branches, not only the happy path. For each failure, state:

- what caused it
- what user/system sees
- which records must not be created
- which records must be rolled back, released, retained, or marked failed
- what retry or compensation behavior applies

## 9. Invariants

List business facts that must remain true regardless of code changes. Use direct, testable statements.

Examples:

- Payment must never be created before price snapshot.
- Failed checkout must not leave active inventory reservations.
- Same idempotency key must not create duplicate orders.

## 10. Idempotency and concurrency

Document retry keys, deduplication rules, locks, uniqueness constraints, transaction boundaries, race conditions, and concurrent request behavior.

## 11. Authorization / ownership

Document who can run the flow and what data scope is valid. Include tenant/org/user ownership boundaries and privileged exceptions.

## 12. Downstream assumptions

Separate what downstream flows may assume from what they must not assume.

Use this format:

```markdown
<Downstream flow> may assume:
- ...

<Downstream flow> must not assume:
- ...
```

## 13. Observability / audit

Document logs, metrics, traces, audit records, and operational signals that should exist or should not be removed.

## 14. Acceptance scenarios

Use Given / When / Then. Cover at least:

- main success path
- one important failure path
- one edge case involving state, authorization, concurrency, or idempotency

## 15. Code map

Group files by relationship to the flow.

Use:

```markdown
Entrypoints:
- ...

Core flow:
- ...

Data access:
- ...

Side effects:
- ...

Tests:
- ...

Related but not owned:
- ...

Do not change casually:
- ...
```

## 16. Change rules

Give instructions for future humans and agents. Tie changes to spec sections and tests.

Examples:

```markdown
If you change the request shape, update Trigger, Code map, and API contract tests.
If you change a state transition, update State flow, Failure states, and Acceptance scenarios.
If you change side effects, update Side effects, Observability, and affected downstream specs.
```

## 17. Validation

List specific commands or manual checks needed to validate the flow. Include conditional tests when a change touches a related area.
