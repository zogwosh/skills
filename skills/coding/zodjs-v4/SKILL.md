---
name: zodjs-v4
description: Apply Zod v4 best practices to design runtime-safe schemas, parsing boundaries, and actionable validation errors for TypeScript application code.
---

# Zod.js v4 Best Practices

## Purpose

Ensure all data validation logic uses Zod v4 idioms that keep runtime behavior explicit, types accurate, and schema reuse maintainable.

## Inputs

- TypeScript files that define API payloads, env config, forms, or external data contracts.
- Existing validation code that may use ad hoc checks or outdated Zod patterns.
- Requirements about strictness, defaults, optionality, transforms, and error messages.

## Workflow

1. Identify trust boundaries where unknown data enters the system.
2. Create or refactor Zod schemas near those boundaries, with clear naming and reusable sub-schemas.
3. Prefer `safeParse` for expected validation failures and reserve `parse` for fail-fast internal invariants.
4. Use `z.coerce`, `transform`, and `refine/superRefine` only when business rules require them, keeping transformations explicit.
5. Keep output types derived from schemas to avoid duplicated TypeScript interfaces.
6. Return structured, user-actionable validation errors instead of raw thrown exceptions in user-facing flows.

## Output Format

- A concise change summary listing updated schema files and boundary points.
- Schema snippets or file references showing final Zod v4 patterns used.
- Validation behavior notes: accepted shape, rejected shape examples, and error mapping strategy.

## Edge Cases

- Partial updates (PATCH-like inputs): use separate update schemas instead of weakening create schemas.
- Backward compatibility constraints: isolate legacy shape adapters before strict schema parsing.
- Deeply nested unions: reduce ambiguity with discriminators to improve error clarity and maintainability.
