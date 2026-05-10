---
name: zodjs-v4
description: Implement or review TypeScript runtime validation with Zod v4 at trust boundaries using schemas, safeParse, derived input/output types, and structured errors; not for compile-time-only types or non-Zod validators.
---

# Zod.js v4 Best Practices

## Purpose

Use Zod v4 to make runtime validation explicit, type-safe, and maintainable at trust boundaries where unknown data enters or leaves TypeScript code.

Use this skill for:

- API payload, env config, form, webhook, file, message, or integration input validation with Zod v4.
- Refactoring ad hoc checks or outdated Zod patterns into schemas and parse boundaries.
- Reviewing schema reuse, transforms, refinements, codecs, input/output types, and validation error mapping.

Do not use this skill for:

- Compile-time-only TypeScript interfaces with no runtime parsing.
- Projects that do not use Zod and are not adopting it.
- Joi, Yup, Valibot, ArkType, or custom validator implementations unless the task is specifically migrating to Zod v4.
- Business-rule design that does not involve runtime input/output validation.

## Inputs

Gather:

- trust boundary files: API handlers, env loaders, form handlers, webhook consumers, job/message consumers, external client adapters
- existing schemas and inferred types
- expected accepted/rejected shapes and compatibility requirements
- strictness, defaults, optionality, coercion, transform, codec, and error payload requirements
- project conventions for error responses and logging

## Decision Rules

1. Put schemas at trust boundaries; do not scatter duplicate field checks across business logic.
2. Prefer `safeParse` or `safeParseAsync` for expected invalid user/external input.
3. Reserve `parse` or `parseAsync` for fail-fast internal invariants where an exception is the intended failure mode.
4. Derive TypeScript types from schemas with `z.infer`, `z.input`, or `z.output`; avoid duplicated interfaces for the same contract.
5. Use `z.input` and `z.output` when transforms, codecs, coercion, defaults, or pipes make input and output types diverge.
6. Keep transformations explicit: use `z.coerce`, `transform`, `pipe`, `refine`, `superRefine`, or `z.codec()` only when the business rule requires that conversion or validation.
7. Use separate create/update/partial schemas instead of weakening one schema until every operation accepts too much.
8. Normalize validation errors into stable, user-actionable payloads; do not leak raw parser exceptions from user-facing flows.
9. Prefer Zod v4 error utilities such as `z.treeifyError()` or `z.flattenError()` for structured error mapping.
10. Isolate legacy or backward-compatible input adapters before strict schema parsing.

## Workflow

1. Identify every trust boundary affected by the change.
2. Inspect existing schema ownership, inferred type usage, and error handling.
3. Define or refactor schemas close to the boundary, with reusable sub-schemas only where reuse is real.
4. Choose the parse method: safe vs throwing, sync vs async.
5. Model input/output divergence deliberately with `z.input`, `z.output`, transforms, pipes, or codecs.
6. Map validation failures into the project's standard error shape.
7. Replace duplicated TypeScript interfaces or manual checks with schema-derived types where appropriate.
8. Verify accepted, rejected, and edge-case shapes with existing tests or focused checks.

## Output

When implementing, provide:

- `Boundary changes`: files and trust boundaries updated.
- `Schema changes`: new or changed schemas, derived types, transforms/refinements/codecs.
- `Error behavior`: accepted shape, rejected shape, and normalized error payload.
- `Compatibility notes`: legacy adapters, optionality/default behavior, and input/output divergence.
- `Verification`: commands or focused checks run.

When reviewing, lead with concrete findings: missing parse boundary, unsafe `parse`, duplicated interface drift, over-broad partial schema, unclear transform/refine, raw error leakage, or missing accepted/rejected checks.

## Reference Loading

- Use `references/zod_v4_checklist.md` when implementing or reviewing Zod v4 validation.
- Use `references/prompt_trigger_checks.md` when maintaining this skill's trigger behavior.

## Source Notes

- Zod v4 is the current stable Zod documentation target.
- `safeParse` returns a discriminated result object, while `parse` throws `ZodError`.
- Zod v4 exposes separate input and output type helpers for schemas whose input and output diverge.
- Zod v4 provides structured error helpers including `z.treeifyError()` and `z.flattenError()`.
- Zod v4 codecs support bidirectional transformations for network and serialization boundaries.

## Anti-Patterns

Avoid:

- Adding Zod schemas but continuing to use unparsed raw input.
- Using `parse` for routine user input failures that should become normal validation responses.
- Duplicating interfaces that are already derivable from schemas.
- Making every schema `.partial()` for convenience.
- Hiding business-critical transformations inside vague helpers.
- Returning raw `ZodError` objects directly from public APIs.
