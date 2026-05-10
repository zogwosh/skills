---
name: honojs-rpc-best-practices
description: Use when implementing or reviewing Hono TypeScript RPC APIs with hc<AppType> and validator middleware contracts; do not use for non-Hono or non-RPC tasks.
---

# Hono RPC Best Practices

## Purpose

Keep Hono server and client code RPC-safe, validator-driven, and easy to maintain without over-abstracting route handlers.

## Trigger Conditions

- Hono TypeScript API work touching route definitions, `AppType`, or `hc<AppType>()`.
- Need to choose between `hono/validator`, `@hono/zod-validator`, or `@hono/standard-validator`.
- Need to refactor handler structure while preserving RPC inference.

## When Not To Use

- Framework is not Hono.
- Task is generic REST or architecture advice with no `hono/client` typing requirements.
- Task is unrelated to validation contracts or route composition.

## Inputs

- Current route composition style and module boundaries.
- RPC typing target (`typeof routes` or `typeof app`) and where it is exported.
- Validation constraints (no schema library, existing Zod usage, or standard-schema preference).
- Response typing expectations for success and error branches.

## Decision Rules

1. Keep one module focused on one route group and compose modules with `app.route()` at boundaries.
2. Keep route declarations near handlers; only extract with `createHandlers()` when separation is necessary.
3. Export a stable RPC type from the typed route surface: `export type AppType = typeof routes` or `typeof app`.
4. Treat validator middleware as the request contract source and read inputs via `c.req.valid(...)`.
5. Standardize one validator track per module: `validator`, `zValidator`, or `sValidator`.
6. Return `c.json(payload, status)` in each branch so success and error unions stay inferable.
7. Wrap `hc<AppType>()` in a business facade and centralize response parsing behavior.
8. Keep `compilerOptions.strict = true` on both server and client when sharing RPC types.

## Workflow

1. Identify route group scope and whether RPC typing must cross package boundaries.
2. Pick one validator track from dependency constraints.
3. Refactor route composition to preserve typed export targets.
4. Update handlers to consume only validated request data.
5. Add or refactor client facade methods around `hc<AppType>()`.
6. Verify strict-mode and status-code inference behavior.

## Output Format

- `Architecture decision`: inline or module-based composition and why.
- `Validation track`: chosen validator path and reason.
- `Server patch`: concrete route and validation edits.
- `Client patch`: `hc<AppType>()` usage and facade edits.
- `Typing checks`: strict mode, response unions, and exported `AppType`.

## Trigger Test Prompts

- Should trigger: "Refactor this Hono app to preserve `hc<AppType>` inference and fix validator contracts."
- Should trigger: "Choose between `hono/validator` and `@hono/zod-validator` for this Hono RPC module."
- Should not trigger: "Design generic REST conventions for Express."
- Should not trigger: "Optimize a frontend-only React component."

## Reference Links

- Best Practices: https://hono.dev/docs/guides/best-practices
- RPC: https://hono.dev/docs/guides/rpc
- Validation: https://hono.dev/docs/guides/validation
- Zod Validator middleware: https://www.npmjs.com/package/@hono/zod-validator
- Standard Validator middleware: https://www.npmjs.com/package/@hono/standard-validator
