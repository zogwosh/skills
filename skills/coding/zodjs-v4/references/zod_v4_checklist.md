# Zod v4 Validation Checklist

Use this checklist for implementing or reviewing TypeScript runtime validation with Zod v4.

## Boundary placement

- Unknown data is parsed at the boundary before business logic uses it.
- Boundaries include API input, env config, forms, webhooks, files, queues, jobs, and external service responses.
- Business logic receives parsed output, not raw unknown input.
- Legacy adapters are isolated before strict parsing.

## Schema design

- Schemas are named by contract or boundary, not by vague technical shape.
- Create, update, patch, and response schemas are separate when their rules differ.
- Reusable sub-schemas remove real duplication without creating a global schema dumping ground.
- Unknown key policy is intentional: strict, passthrough, strip/default behavior, or compatibility adapter.

## Parsing behavior

- Use `safeParse` or `safeParseAsync` for expected invalid external input.
- Use `parse` or `parseAsync` only when throwing is the desired invariant failure.
- Use async parse methods when schemas include async refinements or transforms.
- Do not use parsed success data before checking `result.success`.

## Types

- Use `z.infer<typeof Schema>` for normal output types.
- Use `z.input<typeof Schema>` and `z.output<typeof Schema>` when coercion, transforms, pipes, defaults, or codecs create different input and output shapes.
- Remove duplicated interfaces when they describe the same contract as a schema.
- Keep exported schema/type names stable when other packages import them.

## Transformations and rules

- Use `z.coerce` only when accepting non-canonical input is intentional.
- Use transforms for explicit data conversion, not hidden business workflows.
- Use `refine` or `superRefine` for cross-field or business validation that cannot be expressed structurally.
- Use `z.codec()` when a value must be decoded from a transport format and encoded back later.

## Errors

- Convert Zod failures into the project's stable error payload.
- Use `z.flattenError()` for shallow field errors and `z.treeifyError()` for nested structures.
- Avoid leaking raw `ZodError` objects across public API boundaries.
- Keep user-facing error messages actionable and avoid logging sensitive raw input.

## Verification

- Cover one accepted shape, one rejected shape, and one edge case around optionality, defaults, transforms, or compatibility.
- Run the repo's type-check command when schema-derived types affect callers.
- Run affected API/form/env tests when parse boundaries move.
