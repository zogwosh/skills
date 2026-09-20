# Business Flow Slice Spec Review Checklist

Use this checklist when reviewing an existing `BUSINESS_FLOW.md` or a PR that changes a business flow.

## Business clarity

- Does the spec describe the business outcome rather than only a technical operation?
- Can a new engineer or product person understand what the flow accomplishes without opening code?
- Is the trigger explicit: actor, action, endpoint/job/webhook, and preconditions?

## State and data flow

- Are input states listed before the flow starts?
- Does the state flow table include business events, reads, writes, before states, and after states?
- Are data snapshots, derived fields, copied fields, and read models called out?
- Are ambiguous verbs such as "process", "handle", or "update" replaced with concrete state changes?

## Side effects and boundaries

- Are synchronous, asynchronous, and external side effects separated?
- Does the spec say what must not happen in this slice?
- Are owned files separated from related-but-not-owned files?
- Are neighboring flows and downstream assumptions listed?

## Failure behavior

- Are important failure paths documented?
- Does each failure path state whether records are retained, rolled back, released, marked failed, or never created?
- Are compensation actions explicit?
- Are user-visible or downstream-visible results described?

## Safety properties

- Are invariants direct and testable?
- Is idempotency documented for retries or duplicate requests?
- Are concurrency controls documented for race-prone flows?
- Are authorization, ownership, and tenant boundaries explicit?

## Validation

- Are acceptance scenarios written in Given / When / Then form?
- Do scenarios cover success, failure, and at least one edge case?
- Are test commands specific and runnable?
- Does the PR update this spec when behavior, state transitions, side effects, or downstream assumptions change?
