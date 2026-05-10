---
name: zodjs-v4
description: Use when implementing or refactoring TypeScript runtime validation with Zod v4 at trust boundaries; do not use when the project is not using Zod schemas.
---

# Zod.js v4 Best Practices

## Purpose

Ensure all data validation logic uses Zod v4 idioms that keep runtime behavior explicit, types accurate, and schema reuse maintainable.

## Trigger Conditions

- Validate external inputs for APIs, env config, forms, or integrations with Zod v4.
- Refactor ad hoc validation into schema-based parsing.
- Standardize validation errors and schema-derived types.

## When Not To Use

- The project does not use Zod and has no plan to adopt it.
- The task is compile-time typing only with no runtime validation boundary.
- The user explicitly requests a different validation stack.

## Inputs

- TypeScript files that define API payloads, env config, forms, or external data contracts.
- Existing validation code that may use ad hoc checks or outdated Zod patterns.
- Requirements about strictness, defaults, optionality, transforms, and error messages.

## Decision Rules

1. Put schemas at trust boundaries where unknown data enters the system.
2. Prefer `safeParse` for expected invalid input and reserve `parse` for fail-fast invariants.
3. Keep output types derived from schemas to avoid duplicated interfaces.
4. Use `coerce`, `transform`, and `refine/superRefine` only for explicit business rules.
5. Return structured error payloads instead of leaking raw parser exceptions.

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

## Trigger Test Prompts

- Should trigger: "Refactor this API input validation to Zod v4 schemas and safeParse boundaries."
- Should trigger: "Review these Zod schemas for transform/refine misuse and error clarity."
- Should not trigger: "Add TypeScript interfaces only; no runtime parsing needed."
- Should not trigger: "Implement Joi-based validation for this module."

## Edge Cases

- Partial updates (PATCH-like inputs): use separate update schemas instead of weakening create schemas.
- Backward compatibility constraints: isolate legacy shape adapters before strict schema parsing.
- Deeply nested unions: reduce ambiguity with discriminators to improve error clarity and maintainability.
