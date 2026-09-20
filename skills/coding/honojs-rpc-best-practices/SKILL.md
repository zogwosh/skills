---
name: honojs-rpc-best-practices
description: Implement or review Hono TypeScript RPC APIs using hc<AppType>, typed route chains, validator middleware, and c.req.valid; use for route/AppType/client inference issues, not for non-Hono, generic REST, or frontend-only work.
---

# Hono RPC Best Practices

## Purpose

Keep Hono server and client code RPC-safe, validator-driven, and easy to maintain without breaking `hc<AppType>()` inference.

Use this skill for:

- Hono TypeScript API work touching route definitions, `AppType`, `hc<AppType>()`, or `hono/client`.
- Fixing RPC inference issues across server/client or monorepo package boundaries.
- Choosing or reviewing validator middleware: `hono/validator`, `@hono/zod-validator`, or `@hono/standard-validator`.
- Refactoring route handler structure while preserving validator input inference and response unions.

Do not use this skill for:

- Non-Hono frameworks.
- Generic REST conventions with no Hono RPC client typing.
- Frontend-only work that does not touch `hono/client`.
- Validation-library design that is independent of Hono route contracts.

## Inputs

Gather:

- route files and route composition style
- exported RPC typing target, such as `typeof route`, `typeof routes`, or `typeof app`
- client creation and facade code using `hc<AppType>()`
- validator middleware and schema dependencies already present in the repo
- response status and payload patterns for success and error branches
- relevant `tsconfig.json` files when RPC types cross packages

## Decision Rules

1. Keep handlers near route declarations by default; avoid controller-style extraction that loses path and validator inference.
2. Use `factory.createHandlers()` only when extracted handlers are necessary and Hono inference must be preserved.
3. Build larger apps with focused route modules and `app.route()`, but keep the exported RPC type on the fully typed route surface.
4. For RPC-facing route modules, prefer chained route declarations so `typeof route` or `typeof app` captures all endpoint types.
5. Export one stable type for the client: `export type AppType = typeof route` or `typeof app`.
6. Treat validator middleware as the request contract source and read only validated input with `c.req.valid(...)`.
7. Standardize one validator track per route module: built-in `validator`, `zValidator`, or `sValidator`.
8. Return `c.json(payload, status)` with explicit status codes when clients need status-specific response unions.
9. Wrap `hc<AppType>()` in a small business-facing client facade when call sites need shared auth, base URL, response parsing, or error normalization.
10. Keep TypeScript `strict` enabled on both server and client packages when sharing Hono RPC types.

## Workflow

1. Identify the Hono route group and whether the client imports its RPC type directly or through a package boundary.
2. Inspect current route composition for inference risks: controller extraction, untyped helper returns, late route mutation, or exporting the wrong app variable.
3. Choose the validator track that matches existing dependencies and project style.
4. Refactor server routes so validators, handlers, explicit statuses, and the exported `AppType` stay on the typed route surface.
5. Refactor client usage around `hc<AppType>()`, preserving base URL, cookies, headers, abort signals, and response parsing semantics.
6. Run type checks that cover both server and client packages.

## Output

When implementing, provide:

- `Architecture decision`: inline routes, chained route module, `app.route()` composition, or `createHandlers()` and why.
- `Validation track`: selected middleware and schema source.
- `Server changes`: route, validator, handler, response status, and exported type changes.
- `Client changes`: `hc<AppType>()` usage, facade behavior, headers/cookies/init handling, and response parsing.
- `Verification`: type-check command and any focused runtime/API checks.

When reviewing, lead with concrete findings: broken inference, wrong export target, invalid input access, mixed validator tracks, ambiguous response unions, missing strict mode, or unsafe client parsing.

## Reference Loading

- Use `references/rpc_route_checklist.md` when implementing or reviewing a Hono RPC route/client pair.
- Use `references/prompt_trigger_checks.md` when maintaining this skill's trigger behavior.

## Source Notes

- Hono RPC infers client input types from validators and output types from `c.json()` responses.
- Hono RPC docs call out `strict: true` on both client and server `tsconfig.json` files for monorepo RPC types.
- Hono best-practice docs prefer direct handlers near routes, `factory.createHandlers()` for extracted handlers, and route chaining for RPC-facing typed apps.

## Anti-Patterns

Avoid:

- Exporting `typeof app` before all RPC routes are attached.
- Reading unvalidated body/query/param data when validator middleware exists.
- Mixing `validator`, `zValidator`, and `sValidator` in one route module without a migration reason.
- Returning JSON without explicit status codes when client code branches by status.
- Hiding `hc<AppType>()` behind an untyped generic HTTP wrapper.
