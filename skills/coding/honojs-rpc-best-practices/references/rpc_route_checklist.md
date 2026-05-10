# Hono RPC Route Checklist

Use this checklist for implementing or reviewing Hono TypeScript RPC APIs.

## Server route surface

- The exported RPC type points at the final typed route surface, not a partially built app.
- RPC-facing routes are declared in a way TypeScript can infer path params, validator input, and response output.
- Larger apps use focused route modules and `app.route()` composition.
- Extracted handlers use Hono factory helpers when extraction is required for inference.

## Validation

- Each route module uses one validator track unless a migration requires otherwise.
- Validated input is read through `c.req.valid("json" | "form" | "query" | "param" | "header" | "cookie")`.
- Raw `c.req.json()`, `c.req.query()`, or manual body parsing is not used after validator middleware.
- Validation failure shape is intentional and compatible with callers.

## Responses

- Success and error branches return `c.json(payload, status)`.
- Status codes are explicit when client code needs status-specific unions.
- Error payloads are stable enough for client parsing.
- Handler return types are not widened by untyped helpers.

## Client

- Client code imports `hc` from `hono/client` and passes the exported `AppType`.
- Base URL handling is explicit. Use an absolute URL when code calls `$url()`.
- Shared headers, cookies, credentials, abort signals, and custom search param behavior are configured in the facade or call site intentionally.
- Response parsing checks status or `res.ok` before assuming a success payload.

## TypeScript

- Server and client packages that share RPC types use `compilerOptions.strict = true`.
- The route type crosses package boundaries through type-only exports.
- Type checks cover both the server route package and the client package.
