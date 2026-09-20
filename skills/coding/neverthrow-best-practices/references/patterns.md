# neverthrow patterns

## 1) Schema-backed domain errors

Prefer stable, narrow error variants. At trust boundaries, validate or construct
errors through a schema so logs and API responses cannot accidentally leak
unexpected fields. Use `_tag` for new Effect-style domains, or keep `type` if
the project already standardizes on it.

Good:

```ts
import { err, type Result } from "neverthrow";
import { z } from "zod";

const StockInsufficientSchema = z
  .object({
    _tag: z.literal("StockInsufficient"),
    available: z.number().nonnegative(),
    required: z.number().positive(),
    correlationId: z.string().uuid(),
  })
  .strict();

type StockInsufficient = z.infer<typeof StockInsufficientSchema>;
type InternalError = { _tag: "InternalError"; message: string };
type StockError = StockInsufficient | InternalError;

function stockInsufficient(
  available: number,
  required: number,
  correlationId: string,
): Result<never, StockError> {
  const parsed = StockInsufficientSchema.safeParse({
    _tag: "StockInsufficient",
    available,
    required,
    correlationId,
  });

  return parsed.success
    ? err(parsed.data)
    : err({ _tag: "InternalError", message: "Failed to construct StockInsufficient" });
}
```

Bad:

```ts
return err({ message: "No stock", dbError, rawRequestBody, userSecret });
```

## 2) Sync exception wrappers

Good:

```ts
import { Result, fromThrowable } from "neverthrow";

type ParseError = { _tag: "ParseJsonError"; message: string; cause: unknown };

const parseJson = fromThrowable(
  JSON.parse,
  (cause): ParseError => ({
    _tag: "ParseJsonError",
    message: "Invalid JSON payload",
    cause,
  }),
);

function readPayload(input: string): Result<{ id: string }, ParseError> {
  return parseJson(input);
}
```

Bad:

```ts
function readPayload(input: string) {
  try {
    return JSON.parse(input);
  } catch {
    return null;
  }
}
```

## 3) Async exception/rejection wrappers

Use `ResultAsync.fromThrowable` or `fromAsyncThrowable` when the function may
throw synchronously before returning a promise. Use `ResultAsync.fromPromise`
when the promise has already been created safely and only rejection needs to be
mapped.

Good:

```ts
import { ResultAsync } from "neverthrow";

type DbError = { _tag: "DbError"; operation: "insertUser"; cause: unknown };

const insertUser = ResultAsync.fromThrowable(
  db.insertUser,
  (cause): DbError => ({ _tag: "DbError", operation: "insertUser", cause }),
);
```

Good when the promise expression is already safe to create:

```ts
import { ResultAsync } from "neverthrow";

type HttpError = { _tag: "HttpError"; url: string; cause: unknown };

function fetchUser(id: string): ResultAsync<Response, HttpError> {
  const url = `/users/${id}`;
  return ResultAsync.fromPromise(fetch(url), (cause): HttpError => ({
    _tag: "HttpError",
    url,
    cause,
  }));
}
```

Bad:

```ts
async function fetchUser(id: string) {
  return fetch(`/users/${id}`); // may reject; no typed error contract
}
```

## 4) Atomic connectors

Treat `.andThen` as a connector between named domain operations. Move branches,
validation rules, and mutation logic into explicit functions with declared
input and output types.

Good:

```ts
function updateCheckout(input: CheckoutInput): ResultAsync<Receipt, CheckoutError> {
  return validateCheckout(input)
    .andThen(reserveInventory)
    .andThen(chargePayment)
    .andThen(sendReceipt);
}
```

Acceptable adapter:

```ts
return loadUser(userId).andThen((user) => loadOrders(user.id));
```

Bad:

```ts
return loadUser(userId).andThen((user) => {
  if (!user.active) return err({ _tag: "InactiveUser" });
  if (user.balance < total) return err({ _tag: "InsufficientFunds" });
  return chargeUser(user, total);
});
```

## 5) safeTry for dependent values

For neverthrow 8.x, yield `Result` or `ResultAsync` directly. Do not add
`.safeUnwrap()`. Always declare the outer return type because TypeScript can
lose precise error unions across generator `yield*` chains.

Good:

```ts
import { ok, safeTry, type ResultAsync } from "neverthrow";

type CheckoutError = LoadOrderError | LoadUserError | PaymentError;

function checkout(orderId: string): ResultAsync<Receipt, CheckoutError> {
  return safeTry<Receipt, CheckoutError>(async function* () {
    const order = yield* loadOrder(orderId);
    const user = yield* loadUser(order.userId);
    const receipt = yield* chargeUser(user, order.total);

    return ok(receipt);
  });
}
```

Bad:

```ts
return safeTry(async function* () {
  const order = yield* loadOrder(id).safeUnwrap();
  const user = yield* loadUser(order.userId).safeUnwrap();
  return ok(yield* chargeUser(user, order.total).safeUnwrap());
});
```

Do not rely on `safeTry` to catch exceptions. Convert unsafe boundaries before
yielding them:

```ts
const loadOrder = ResultAsync.fromThrowable(orderRepository.load, toLoadOrderError);
```

## 6) Transform and normalize

Good:

```ts
return readPayload(raw)
  .map((v) => v.id.trim())
  .mapErr((e) => ({ _tag: "InputError" as const, detail: e }));
```

Bad:

```ts
return readPayload(raw).map((v) => {
  if (!v.id) throw new Error("missing id");
  return v.id;
});
```

## 7) Observability side effects

Use tee operators for logs, metrics, alerts, and tracing. Use `andTee` for
non-critical success-side effects, `orTee` for non-critical error reporting,
and `andThrough` when the callback failure must become part of the typed error
channel.

Good:

```ts
import { trace } from "@opentelemetry/api";

return createOrder(input)
  .andThen(persistOrder)
  .andTee((order) => {
    trace.getActiveSpan()?.addEvent("Order persisted", { orderId: order.id });
  })
  .orTee(reportOrderError)
  .andThrough(assertPublishAllowed)
  .andThen(publishOrderCreated);
```

Bad:

```ts
return createOrder(input).map((order) => {
  auditLog(order);
  return { ok: true }; // destroys original success value
});
```

## 8) Async shell, sync core

Avoid fine-grained `ResultAsync` chains inside CPU-heavy loops. Keep I/O as
`ResultAsync`, then run in-memory validation and transformations with sync
`Result`.

Good:

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

Bad:

```ts
return ResultAsync.combine(rows.map((row) => ResultAsync.fromSafePromise(Promise.resolve(normalizeRow(row)))));
```

## 9) Recovery and boundary consumption

Good:

```ts
import { err, ok } from "neverthrow";

return loadProfile(userId)
  .orElse((issue) => (issue._tag === "NotFound" ? ok(defaultProfile) : err(issue)))
  .match(
    (profile) => ({ status: 200, body: profile }),
    (e) => ({ status: 400, body: { error: e._tag } }),
  );
```

Bad:

```ts
return loadProfile(userId)._unsafeUnwrap();
```
