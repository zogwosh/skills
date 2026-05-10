# Zod.js v4 Best Practices Prompt Trigger Checks

Use these checks when changing the skill description, trigger boundaries, or examples.

## Positive prompts

These prompts should trigger this skill:

- "Refactor this API input validation to Zod v4 schemas and safeParse boundaries."
- "Review these Zod schemas for transform/refine misuse and error clarity."
- "Add env config validation with Zod v4 and derived TypeScript types."
- "Model this webhook payload with Zod and return structured validation errors."
- "Use Zod v4 codecs for date values crossing a JSON boundary."

## Negative prompts

These prompts should not trigger this skill:

- "Add TypeScript interfaces only; no runtime parsing needed."
- "Implement Joi-based validation for this module."
- "Review a Hono RPC route without any Zod schema work."
- "Explain a business rule that does not involve runtime validation."
- "Create database migrations for these fields."

## Boundary checks

- Trigger when the task mentions Zod v4, runtime validation, `safeParse`, parse boundaries, schema-derived types, transforms/refinements, codecs, or structured Zod errors.
- Do not trigger for compile-time-only typing work.
- Do not trigger for non-Zod validators unless the task is specifically about migrating to Zod v4.
