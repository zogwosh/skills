---
name: business-flow-slice-spec
description: Create, review, or update BUSINESS_FLOW.md vertical business-flow specs from requirements, code, tickets, or conversations; use for state/data/side-effect/failure/validation flow docs, not for DDD modeling, generic module docs, or architecture essays.
---

# Business Flow Slice Spec

## Purpose

Create or improve a `BUSINESS_FLOW.md` style specification for one vertical business flow. The output must help both humans and coding agents understand the business outcome, state movement, data movement, side effects, failure paths, invariants, code ownership, and validation plan.

Use this skill for:

- Creating a new business-flow or feature-slice spec from requirements, tickets, code, logs, diagrams, or conversation notes.
- Reviewing an existing `BUSINESS_FLOW.md` or PR for missing state transitions, side effects, failure paths, ownership boundaries, or validation.
- Updating an existing business-flow spec after behavior, state, data, side effects, or downstream assumptions change.

Do not use this skill for:

- DDD entity, aggregate, repository, or service modeling.
- Generic module documentation organized around controllers, services, database tables, or file layout.
- Broad architecture essays that are not centered on one concrete business outcome.
- API reference documentation unless it is part of a specific business flow.

## Core Principle

Document the business chain as a stateful vertical slice:

```text
business outcome -> trigger -> input state -> event/state flow -> data writes -> side effects -> failure/compensation -> invariants -> downstream assumptions -> code map -> validation
```

Prioritize business correctness over implementation structure. Mention code only to anchor the flow to real files and ownership boundaries.

## Inputs

Accept any useful source material:

- flow name, feature name, ticket, requirement, PR, or conversation notes
- repo path, entrypoint, tests, logs, diagrams, schema, or code snippets
- an existing `BUSINESS_FLOW.md` to review or update

If the user wants a complete spec but the target flow is unclear, ask only for the minimum missing facts: flow name, trigger, success result, key states, and implementation paths.

If the user asks for a draft, do not block on missing details. Produce the draft and mark unknowns as `TBD` or `Assumption:`.

## Workflow

1. Identify one concrete business flow.
   - Prefer one user-visible or system-visible outcome, such as `checkout/create-order`, `payment/capture-payment`, `subscription/cancel-plan`, or `team/accept-invite`.
   - If the user gives a broad module, split it into likely flows and ask which one to document unless the context makes the intended flow obvious.

2. Gather source evidence.
   - From supplied material, extract the trigger, actor, preconditions, states, data objects, writes, side effects, failures, downstream assumptions, and validation commands.
   - When code access is available and the user asks about an existing implementation, inspect entrypoints, tests, persistence writes, emitted events/jobs, external calls, and adjacent flows before drafting.
   - Clearly label assumptions when evidence is incomplete.

3. Produce or update the spec.
   - Use the default section order from `references/business_flow_template.md`.
   - Make state transitions explicit enough for a coding agent to modify implementation safely.
   - Use tables for state flow and data flow when they improve scanability.
   - Preserve stable sections when updating an existing spec; change only sections affected by the behavior change.

4. Review the result for operational usefulness.
   - Confirm the spec says what must happen, what must not happen, what can fail, and what downstream flows may assume.
   - Separate ordinary data writes from synchronous, asynchronous, and external side effects.
   - Include ownership boundaries: `owned`, `related but not owned`, and `do not change casually`.

5. Deliver the requested artifact.
   - If the user asks to create or edit repo files and tools are available, create or update `BUSINESS_FLOW.md` next to the vertical slice.
   - If the user asks for a review, return concrete gaps and proposed edits before broad commentary.
   - If the user asks for naming, prefer `Business Flow Slice Spec` for the method and `BUSINESS_FLOW.md` for the file.

## Required Output

Use this section order by default:

```markdown
# Business Flow Slice Spec: <flow name>

## 1. Business outcome
## 2. Trigger
## 3. Participants
## 4. Input state
## 5. State flow
## 6. Data flow
## 7. Side effects
## 8. Failure states and compensation
## 9. Invariants
## 10. Idempotency and concurrency
## 11. Authorization / ownership
## 12. Downstream assumptions
## 13. Observability / audit
## 14. Acceptance scenarios
## 15. Code map
## 16. Change rules
## 17. Validation
```

Adapt the structure only when the user explicitly asks for a smaller or larger artifact.

## Quality Bar

Before finalizing, verify:

- The business outcome is understandable without opening code.
- The state flow shows business events, reads, writes, before states, and after states.
- Data snapshots, derived values, copied fields, and external identifiers are captured.
- Side effects are separated from ordinary data writes.
- Failure and compensation behavior says what is retained, rolled back, released, marked failed, or never created.
- Invariants are direct and testable.
- Idempotency, concurrency, authorization, and ownership are covered when relevant.
- Downstream assumptions include both `may assume` and `must not assume` where needed.
- Code map separates owned files from related-but-not-owned and do-not-change-casually files.
- Acceptance scenarios cover success, failure, and at least one edge case.
- Validation commands are specific enough to run.

## Reference Loading

- Use `references/business_flow_template.md` when creating a full spec or a reusable blank template.
- Use `references/section_guidance.md` when you need detailed writing guidance for individual sections.
- Use `references/spec_review_checklist.md` when reviewing an existing spec or PR.
- Use `references/prompt_trigger_checks.md` when maintaining this skill's trigger behavior.

## Anti-Patterns

Avoid:

- Treating the code map as the main content. The main content is business state flow.
- Hiding meaningful state changes behind vague verbs such as "handle", "process", or "update".
- Writing happy-path-only specs.
- Mixing neighboring flows into the current slice without marking `Must not happen`.
- Turning the spec into DDD or generic architecture documentation.
