# Zod v4 Validation Checklist

Use this checklist for implementing or reviewing TypeScript runtime validation with Zod v4.

## Compiler and package baseline

- `tsconfig.json` has `"strict": true`; if not, report Zod inference as unsafe until fixed.
- Regular `zod` is the default import for most backend and application code.
- `zod/mini` is considered only when bundle size is a real constraint; account for its functional `.check(...)` style.
- Do not use `@zod/mini`; the Zod Mini import path is `zod/mini`.
- Project code imports one Zod major/version family consistently.

## Boundary placement

- Unknown data is parsed at the boundary before business logic uses it.
- Boundaries include API input, env config, forms, webhooks, files, queues, jobs, and external service responses.
- Business logic receives parsed output, not raw unknown input.
- Legacy adapters are isolated before strict parsing.

## Schema source of truth

- Define the Zod schema first for runtime contracts, then derive TypeScript with `z.infer`, `z.input`, or `z.output`.
- Avoid manually maintained interfaces for the same DTO/domain contract.
- Use `z.input<typeof Schema>` for data before parsing and `z.output<typeof Schema>` or `z.infer<typeof Schema>` after parsing.
- Keep exported schema/type names stable when other packages import them.

## Schema design

- Schemas are named by contract or boundary, not by vague technical shape.
- Create, update, patch, and response schemas are separate when their rules differ.
- Reusable sub-schemas remove real duplication without creating a global schema dumping ground.
- Unknown key policy is intentional:
  - `z.object(...)` strips unrecognized keys from parsed output.
  - `z.strictObject(...)` rejects unrecognized keys.
  - `z.looseObject(...)` preserves unrecognized keys.
  - `.catchall(schema)` validates unrecognized keys.
- Use `z.strictObject` for config, security-sensitive RPC, and typo-sensitive payloads.
- Use `z.object` for input cleaning where extra fields must not reach ORM/domain code.
- Use `z.looseObject` only when forwarding or observability requires preserving untouched payload fields.

## Composition and recursion

- Use `.safeExtend()` when extending schemas that contain refinements or when overwrite assignability matters.
- Prefer spreading `.shape` into a fresh object schema when merging many schemas or when strictness should be obvious.
- Spread shapes, not schema instances, when building a new object schema.
- Use native getters for recursive object fields so the recursive schema remains a normal object schema with `.pick`, `.omit`, `.partial`, and `.extend` available.
- Use `z.discriminatedUnion()` for large tagged unions; model exactly-one object constraints with a union plus `refine` or `.check()`, because Zod v4 has no `z.xor()` helper.

## Scalars and formats

- Prefer top-level string formats: `z.email()`, `z.uuid()`, `z.url()`, `z.httpUrl()`, `z.ipv4()`, `z.mac()`, `z.iso.date()`, `z.iso.time()`, `z.iso.datetime()`, and `z.iso.duration()`.
- Restrict UUID versions with `z.uuid({ version: "v4" })` or convenience helpers such as `z.uuidv4()` when the domain requires it.
- Use `z.iso.datetime({ offset: true })`, `local: true`, or `precision` only when those timestamp forms are deliberately accepted.
- Use numeric formats such as `z.int()`, `z.int32()`, `z.uint32()`, `z.float32()`, `z.int64()`, or `z.uint64()` when storage/API bounds are part of the contract.
- For IDs, pagination, limits, and sizes, combine integer and range checks such as `.int().positive()` or `.int().nonnegative()`.

## Parsing behavior

- Use `safeParse` or `safeParseAsync` for expected invalid external input.
- Use `parse` or `parseAsync` only when throwing is the desired invariant failure.
- Use async parse methods when schemas include async refinements or transforms.
- Do not use parsed success data before checking `result.success`.

## Conversion lifecycle

- Use `z.coerce` only when accepting non-canonical input is intentional; its input type is `unknown` unless a generic is supplied.
- Keep `z.preprocess()` callbacks pure and explicit; annotate the preprocessor parameter when consumers need a narrower `z.input` type.
- Avoid accidental `undefined` returns from preprocessors for required fields; represent empty input deliberately with `null` plus `.nullable()` or with a documented default.
- Remember `.default(value)` short-circuits on `undefined` and the value must match the output type.
- Use `.prefault(value)` when an `undefined` input should still flow through validation/transforms and the value matches the input type.
- Use `.catch(value)` only when silently replacing invalid input is the desired contract.
- Transform functions should not throw; add issues through `ctx.issues` and return `z.NEVER` when a transform cannot produce output.

## Bidirectional contracts

- Use `z.codec(inputSchema, outputSchema, { decode, encode })` for values that cross transport/storage boundaries in both directions.
- Prefer codecs for ISO datetime string to `Date`, JSON string to object, URL string to `URL`, bytes/base64, and similar reversible contracts.
- Use `decode`, `encode`, `safeDecode`, `safeEncode`, and async variants consistently at the boundary.
- Do not use `.transform()` when the same schema must later encode; transforms are unidirectional.
- Use `z.input` for encoded/transport shapes and `z.output` for decoded/domain shapes.

## Refinements and business rules

- Use built-in schemas and checks before custom refinements.
- Use `refine` for single-value predicates and `superRefine` or `.check()` for multi-issue/cross-field validation.
- Keep refinements deterministic and side-effect free unless the boundary explicitly requires async checks.
- Use `parseAsync` or `safeParseAsync` whenever async refinement, async transform, or async codec logic is present.

## Errors

- Convert Zod failures into the project's stable error payload.
- Use the unified `error` parameter instead of legacy `message`, `required_error`, `invalid_type_error`, or old `errorMap` patterns.
- Schema-level errors have higher precedence than per-parse errors; global `z.config({ customError })` is lower precedence.
- Return `undefined` from a custom error function when the next error handler or locale should handle the issue.
- Use `z.treeifyError()` for nested structures, `z.flattenError()` for shallow forms, and `z.prettifyError()` for CLI/log readability.
- Avoid leaking raw `ZodError` objects across public API boundaries.
- Keep user-facing error messages actionable and avoid logging sensitive raw input.
- Only enable `reportInput` when logging or error payloads are allowed to include the original input.

## Metadata and generated contracts

- Use `.meta()` or a registry when JSON Schema/OpenAPI/form rendering needs titles, descriptions, examples, or other structured metadata.
- Use `z.toJSONSchema()` for JSON Schema/OpenAPI/LLM structured-output contracts, and check whether transforms or unsupported runtime-only types are representable.
- Treat `z.fromJSONSchema()` as experimental if the project considers stable API surface important.

## Runtime and framework patterns

- API handlers and Server Actions should parse request bodies, query params, route params, and form data before touching domain or ORM code.
- Environment loaders should parse once at startup and fail fast on invalid required configuration.
- Forms should align `defaultValues` with `z.input` when preprocess/coercion changes pre-parse values.
- For React Hook Form, normalize browser empty strings deliberately instead of letting required domain fields become ambiguous.
- For NestJS or similar frameworks, use a Zod DTO/pipe/serializer bridge only when it keeps one Zod schema as the source of truth.
- For RPC/callback boundaries, use `z.function({ input, output }).implement(...)` when both arguments and return values need runtime enforcement.

## Verification

- Cover one accepted shape, one rejected shape, and one edge case around optionality, defaults, transforms, or compatibility.
- Include an unknown-key case when object strictness affects security or forwarding.
- Include an encode/decode round trip when codecs are introduced.
- Run the repo's type-check command when schema-derived types affect callers.
- Run affected API/form/env tests when parse boundaries move.
