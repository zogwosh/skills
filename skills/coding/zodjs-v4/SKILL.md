---
name: zodjs-v4
description: Implement or review TypeScript runtime validation with Zod v4 at trust boundaries using strict schemas, safeParse, schema-derived input/output types, codecs, and structured errors; not for compile-time-only typing or non-Zod validators.
---

# Zod.js v4 Best Practices

## Purpose

Use Zod v4 as the runtime schema source of truth at TypeScript trust boundaries. Business logic should receive parsed schema output, not raw unknown input.

Use this skill for:

- API payload, env config, form, webhook, file, message, or integration input validation with Zod v4.
- Refactoring ad hoc checks or outdated Zod patterns into schemas and parse boundaries.
- Reviewing schema reuse, unknown-key policy, transforms, refinements, codecs, input/output types, JSON Schema export, and validation error mapping.
- Choosing between regular `zod` and `zod/mini` when runtime or bundle constraints matter.

Do not use this skill for:

- Compile-time-only TypeScript interfaces with no runtime parsing.
- Projects that do not use Zod and are not adopting it.
- Joi, Yup, Valibot, ArkType, or custom validator implementations unless the task is specifically migrating to Zod v4.
- Business-rule design that does not involve runtime input/output validation.

## Inputs

Gather:

- trust boundary files: API handlers, env loaders, form handlers, webhook consumers, job/message consumers, external client adapters
- existing schemas and inferred types
- TypeScript strictness settings and Zod import target (`zod` or `zod/mini`)
- expected accepted/rejected shapes and compatibility requirements
- strictness, defaults, optionality, coercion, transform, codec, and error payload requirements
- project conventions for error responses and logging

## Decision Rules

1. Require `"strict": true` before trusting Zod inference; if the project is not strict, flag that as a blocker or explicit risk.
2. Put schemas at trust boundaries; do not scatter duplicate field checks across business logic.
3. Prefer `safeParse` or `safeParseAsync` for expected invalid user/external input.
4. Reserve `parse` or `parseAsync` for fail-fast internal invariants where an exception is the intended failure mode.
5. Derive TypeScript types from schemas with `z.infer`, `z.input`, or `z.output`; avoid duplicated interfaces for the same contract.
6. Use `z.input` and `z.output` when transforms, codecs, coercion, defaults, or pipes make input and output types diverge.
7. Choose object unknown-key behavior deliberately: `z.object` strips, `z.strictObject` rejects, `z.looseObject` preserves, and `.catchall()` validates unknown keys.
8. Prefer top-level format schemas such as `z.email()`, `z.uuid()`, `z.url()`, `z.iso.datetime()`, `z.ipv4()`, and numeric formats such as `z.int()` when they match the domain.
9. Compose object schemas with clear strictness: use `.safeExtend()` for refined schemas, or spread `.shape` into a fresh `z.object`, `z.strictObject`, or `z.looseObject` when that makes strictness and compiler cost clearer.
10. Keep conversions explicit: use `z.coerce`, `z.preprocess`, transforms, pipes, refinements, or `z.codec()` only when the boundary actually requires conversion or validation.
11. Use `z.codec()` for bidirectional transport/domain conversions; do not use unidirectional `.transform()` where later encoding is required.
12. Normalize validation errors into stable, user-actionable payloads with `z.treeifyError()`, `z.flattenError()`, or `z.prettifyError()`; do not leak raw parser exceptions from user-facing flows.
13. Prefer regular `zod`; use `zod/mini` only for unusually strict bundle-size constraints and account for its functional API.
14. Isolate legacy or backward-compatible input adapters before strict schema parsing.

## Workflow

1. Identify every trust boundary affected by the change.
2. Check TypeScript strictness and the Zod import/runtime target.
3. Inspect existing schema ownership, inferred type usage, unknown-key policy, conversion logic, and error handling.
4. Define or refactor schemas close to the boundary, with reusable sub-schemas only where reuse is real.
5. Choose the parse method: safe vs throwing, sync vs async.
6. Model input/output divergence deliberately with `z.input`, `z.output`, defaults, prefaults, transforms, pipes, or codecs.
7. Map validation failures into the project's standard error shape.
8. Replace duplicated TypeScript interfaces or manual checks with schema-derived types where appropriate.
9. Verify accepted, rejected, and edge-case shapes with existing tests or focused checks.

## Output

When implementing, provide:

- `Boundary changes`: files and trust boundaries updated.
- `Schema changes`: new or changed schemas, derived types, transforms/refinements/codecs.
- `Error behavior`: accepted shape, rejected shape, unknown-key behavior, and normalized error payload.
- `Compatibility notes`: legacy adapters, optionality/default behavior, and input/output divergence.
- `Verification`: commands or focused checks run.

When reviewing, lead with concrete findings: missing parse boundary, non-strict TypeScript inference risk, unsafe `parse`, duplicated interface drift, wrong unknown-key policy, over-broad partial schema, unclear transform/refine/codec, raw error leakage, or missing accepted/rejected checks.

## Reference Loading

- Use `references/zod_v4_checklist.md` when implementing or reviewing Zod v4 validation.
- Use `references/prompt_trigger_checks.md` when maintaining this skill's trigger behavior.

## Source Notes

- Zod v4 is the current stable Zod documentation target.
- Zod requires TypeScript strict mode for supported inference.
- `safeParse` returns a discriminated result object, while `parse` throws `ZodError`.
- Zod v4 exposes separate input and output type helpers for schemas whose input and output diverge.
- Zod v4 provides structured error helpers including `z.treeifyError()`, `z.flattenError()`, and `z.prettifyError()`.
- Zod v4 codecs support bidirectional transformations for network and serialization boundaries.
- Zod Mini is imported from `zod/mini`, not `@zod/mini`.

## Anti-Patterns

Avoid:

- Adding Zod schemas but continuing to use unparsed raw input.
- Using `parse` for routine user input failures that should become normal validation responses.
- Duplicating interfaces that are already derivable from schemas.
- Making every schema `.partial()` for convenience.
- Leaving unknown-key behavior implicit when extra fields affect security, forwarding, or compatibility.
- Hiding business-critical transformations inside vague helpers.
- Using unidirectional transforms for values that must be encoded back across a boundary.
- Returning raw `ZodError` objects directly from public APIs.
