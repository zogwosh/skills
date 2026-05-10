# Business Flow Slice Spec Template

```markdown
# Business Flow Slice Spec: <flow name>

## 1. Business outcome

<Describe the business result in user/system/business terms.>

## 2. Trigger

Actor:
- <user/system/job/provider>

Trigger:
- <UI action / API endpoint / job / webhook / queue event>

Preconditions:
- <required state before this flow can start>

## 3. Participants

- <business object or actor>: <role in this flow>

## 4. Input state

Before this flow starts:

- `<object>.<field> = <state>`
- `<record>` exists / does not exist
- `<external system>` is expected to be <state>

## 5. State flow

| Step | Business event | Reads | Writes | Before | After |
|---|---|---|---|---|---|
| 1 | <EventName> | <data read> | <data written> | <state before> | <state after> |

## 6. Data flow

| Data object | Source | Transformation | Destination | Notes |
|---|---|---|---|---|
| <field/object> | <source> | <copy/derive/normalize/snapshot> | <destination> | <notes> |

## 7. Side effects

Synchronous:
- <db/cache/session write>

Asynchronous:
- <event/job/task>

External:
- <third-party call or webhook>

Must not happen:
- <neighboring flow behavior that must not be triggered here>

## 8. Failure states and compensation

### <failure name>

Cause:
- <why this branch happens>

Result:
- <what user/system sees>

Data state:
- <what is retained/rolled back/not created/marked failed>

Compensation:
- <release/retry/cancel/reverse action if any>

## 9. Invariants

- <business fact that must always hold>

## 10. Idempotency and concurrency

Idempotency key:
- `<key>`

Repeated request behavior:
- <what happens on duplicate request>

Concurrency controls:
- <transaction/lock/unique constraint/conditional update>

## 11. Authorization / ownership

- <who can run this flow>
- <ownership or tenant constraints>
- <privileged exceptions if any>

## 12. Downstream assumptions

<downstream flow> may assume:
- <stable fact produced by this flow>

<downstream flow> must not assume:
- <fact not guaranteed by this flow>

## 13. Observability / audit

Logs:
- `<log event>`

Metrics:
- `<metric name>`

Audit:
- <audit record fields>

## 14. Acceptance scenarios

### <success scenario>

Given:
- <initial business state>

When:
- <trigger/action>

Then:
- <observable business result>

### <failure or edge scenario>

Given:
- <initial business state>

When:
- <trigger/action>

Then:
- <observable business result>

## 15. Code map

Entrypoints:
- `<path>`

Core flow:
- `<path>`

Data access:
- `<path>`

Side effects:
- `<path>`

Tests:
- `<path>`

Related but not owned:
- `<path>`

Do not change casually:
- `<path>`

## 16. Change rules

- If <behavior changes>, update <sections/tests>.

## 17. Validation

Required:
- `<test command>`

Conditional:
- When changing <area>, run `<test command>`.
```
