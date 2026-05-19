# neverthrow refactor recipes

## 1) try/catch -> Result with atomic connectors

Before:

```ts
function parseUser(raw: string): { id: string; email: string } {
  try {
    const data = JSON.parse(raw) as { id?: string; email?: string };
    if (!data.id || !data.email) throw new Error("Missing required fields");
    return { id: data.id, email: data.email };
  } catch (e) {
    throw new Error(`Invalid user payload: ${String(e)}`);
  }
}
```

After:

```ts
import { Result, fromThrowable, err, ok } from "neverthrow";

type UserParseError =
  | { _tag: "InvalidJson"; message: string; cause: unknown }
  | { _tag: "MissingFields"; fields: Array<"id" | "email"> };

type User = { id: string; email: string };

const parseJson = fromThrowable(
  (value: string) => JSON.parse(value) as { id?: string; email?: string },
  (cause): UserParseError => ({
    _tag: "InvalidJson",
    message: "User payload is not valid JSON",
    cause,
  }),
);

function validateUserFields(data: { id?: string; email?: string }): Result<User, UserParseError> {
  const missing: Array<"id" | "email"> = [];
  if (!data.id) missing.push("id");
  if (!data.email) missing.push("email");

  return missing.length === 0
    ? ok({ id: data.id, email: data.email })
    : err({ _tag: "MissingFields", fields: missing });
}

function parseUser(raw: string): Result<User, UserParseError> {
  return parseJson(raw).andThen(validateUserFields);
}
```

Notes:

- Define `E` first, then convert throw site.
- Keep original `cause` where possible.
- Keep `.andThen` as a connector by extracting validation logic.

## 2) Promise rejection -> ResultAsync

Before:

```ts
async function loadUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

After:

```ts
import { ResultAsync, err, ok, type Result } from "neverthrow";

type UserError =
  | { _tag: "HttpError"; status: number; cause: unknown }
  | { _tag: "ParseError"; cause: unknown };

function fetchUser(id: string): ResultAsync<Response, UserError> {
  return ResultAsync.fromPromise(fetch(`/api/users/${id}`), (cause): UserError => ({
    _tag: "HttpError",
    status: 0,
    cause,
  }));
}

function assertUserResponse(res: Response): Result<Response, UserError> {
  return res.ok ? ok(res) : err({ _tag: "HttpError", status: res.status, cause: res });
}

function parseUserResponse(res: Response): ResultAsync<User, UserError> {
  return ResultAsync.fromPromise(
    res.json() as Promise<User>,
    (cause): UserError => ({ _tag: "ParseError", cause }),
  );
}

function loadUser(id: string): ResultAsync<User, UserError> {
  return fetchUser(id).andThen(assertUserResponse).andThen(parseUserResponse);
}
```

Notes:

- Rejections and parse failures are both typed.
- No thrown errors escape the function.
- If the called function may throw before returning a promise, prefer `ResultAsync.fromThrowable`.

## 3) nested dependent flow -> safeTry

Before:

```ts
function checkout(orderId: string): ResultAsync<Receipt, CheckoutError> {
  return loadOrder(orderId).andThen((order) =>
    loadUser(order.userId).andThen((user) =>
      chargeUser(user, order.total).andThen((receipt) => saveReceipt(order, receipt)),
    ),
  );
}
```

After:

```ts
import { ok, safeTry, type ResultAsync } from "neverthrow";

function checkout(orderId: string): ResultAsync<Receipt, CheckoutError> {
  return safeTry<Receipt, CheckoutError>(async function* () {
    const order = yield* loadOrder(orderId);
    const user = yield* loadUser(order.userId);
    const receipt = yield* chargeUser(user, order.total);
    const saved = yield* saveReceipt(order, receipt);

    return ok(saved);
  });
}
```

Notes:

- neverthrow 8.x supports direct `yield*` on `Result` and `ResultAsync`.
- Do not call `.safeUnwrap()` in new code.
- `safeTry` does not catch thrown exceptions; wrap unsafe sources before yielding.
- Keep the return type explicit to preserve the intended error union.

## 4) nullable return -> Result

Before:

```ts
function findToken(headers: Headers): string | null {
  return headers.get("x-token");
}
```

After:

```ts
import { Result, err, ok } from "neverthrow";

type AuthError = { _tag: "MissingToken"; header: "x-token" };

function findToken(headers: Headers): Result<string, AuthError> {
  const token = headers.get("x-token");
  return token ? ok(token) : err({ _tag: "MissingToken", header: "x-token" });
}
```

Notes:

- Use `Result` when absence is a failure in calling context.
- Keep error payload actionable for handlers.

## 5) service method boundary design

Pattern:

```ts
type ServiceError =
  | { _tag: "ValidationError"; field: string; reason: string }
  | { _tag: "Conflict"; entity: "user"; id: string }
  | { _tag: "InfraError"; subsystem: "db"; cause: unknown };

interface UserService {
  create(input: CreateUserInput): ResultAsync<User, ServiceError>;
}
```

Guidelines:

- Service boundary must expose explicit `ResultAsync<T, E>`.
- Convert infrastructure exceptions near adapters, not in controllers.
- Normalize external failures into domain `E` with `mapErr`.
- Keep `E` narrow; do not leak raw driver/library errors.

## 6) side effects and observability

Before:

```ts
return createOrder(input).map((order) => {
  logger.info({ order });
  metrics.increment("order.created");
  return order;
});
```

After:

```ts
return createOrder(input)
  .andThen(persistOrder)
  .andTee((order) => {
    logger.info({ orderId: order.id }, "order persisted");
    metrics.increment("order.persisted");
  })
  .orTee((error) => reportError(error))
  .andThen(publishOrderCreated);
```

Notes:

- Use `andTee` and `orTee` when the side effect must not affect `T` or `E`.
- Use `andThrough` when the side effect or check must stop the chain on failure.
- Add OpenTelemetry events or attributes in tees, but avoid raw domain objects or secrets.

## 7) ResultAsync hot path -> async shell, sync core

Before:

```ts
function normalizeRows(rows: RawRow[]): ResultAsync<NormalizedRow[], NormalizeError> {
  return ResultAsync.combine(rows.map((row) => normalizeRowAsync(row)));
}
```

After:

```ts
import { err, ok, safeTry, type Result, type ResultAsync } from "neverthrow";

function normalizeRows(rows: RawRow[]): Result<NormalizedRow[], NormalizeError> {
  const normalized: NormalizedRow[] = [];

  for (const row of rows) {
    const result = normalizeRow(row);
    if (result.isErr()) return err(result.error);
    normalized.push(result.value);
  }

  return ok(normalized);
}

function importRows(): ResultAsync<ImportSummary, LoadError | NormalizeError | SaveError> {
  return safeTry<ImportSummary, LoadError | NormalizeError | SaveError>(async function* () {
    const rows = yield* loadRows();
    const normalized = yield* normalizeRows(rows);
    const summary = yield* saveRows(normalized);

    return ok(summary);
  });
}
```

Notes:

- Use `ResultAsync` for I/O boundaries.
- Use sync `Result` for CPU-bound validation and transformations inside large loops.

## 8) test assertions for Ok and Err

Example:

```ts
it("returns Ok for valid token", async () => {
  const result = findToken(new Headers([["x-token", "abc"]]));
  expect(result.isOk()).toBe(true);
  if (result.isOk()) expect(result.value).toBe("abc");
});

it("returns Err for missing token", async () => {
  const result = findToken(new Headers());
  expect(result.isErr()).toBe(true);
  if (result.isErr()) expect(result.error._tag).toBe("MissingToken");
});
```

Notes:

- Prefer `isOk`/`isErr` guards over unsafe unwrap in tests.
- If using unsafe unwrap in tests, keep it local and intentional.
