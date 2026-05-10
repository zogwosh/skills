# Business Flow Slice Spec Prompt Trigger Checks

Use these checks when changing the skill description, purpose, or trigger boundaries.

## Positive prompts

These prompts should trigger this skill:

- "Create a BUSINESS_FLOW.md for checkout order creation. Include state transitions, side effects, failure paths, and validation."
- "Review this business flow spec and tell me what is missing before a coding agent changes the implementation."
- "Convert this ticket and the related code paths into a vertical slice spec for the invite acceptance flow."
- "Document the data writes, downstream assumptions, and compensation behavior for payment capture."

## Negative prompts

These prompts should not trigger this skill:

- "Model the Order aggregate using DDD tactical patterns."
- "Generate API reference docs for every endpoint in this module."
- "Explain the overall architecture of the billing service."
- "Refactor this TypeScript business logic into a more direct style."
- "Write database table documentation for these migrations."

## Boundary checks

- If the prompt asks for one concrete business outcome plus state/data/failure behavior, use this skill.
- If the prompt asks for generic architecture, DDD modeling, API reference, or module inventory, do not use this skill unless the user explicitly asks for a `BUSINESS_FLOW.md` or vertical slice spec.
- If both a business-flow spec and code changes are requested, use this skill for the spec shape and then apply normal repo-specific coding instructions for implementation.
