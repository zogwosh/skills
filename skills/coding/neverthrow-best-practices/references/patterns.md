# neverthrow patterns

## 1) Sync exception wrappers

Good:

```ts
import { Result, fromThrowable } from "neverthrow";

type ParseError = { type: "PARSE_JSON_ERROR"; message: string; cause: unknown };

const parseJson = fromThrowable(
  JSON.parse,
  (cause): ParseError => ({
    type: "PARSE_JSON_ERROR",
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

## 2) Async exception/rejection wrappers

Good:

```ts
import { ResultAsync } from "neverthrow";

type HttpError = { type: "HTTP_ERROR"; status?: number; message: string; cause: unknown };

function fetchUser(id: string): ResultAsync<Response, HttpError> {
  return ResultAsync.fromPromise(fetch(`/users/${id}`), (cause): HttpError => ({
    type: "HTTP_ERROR",
    status: cause instanceof Response ? cause.status : undefined,
    message: "User request failed",
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

## 3) Transform + normalize

Good:

```ts
return readPayload(raw)
  .map((v) => v.id.trim())
  .mapErr((e) => ({ type: "INPUT_ERROR" as const, detail: e }));
```

Bad:

```ts
return readPayload(raw).map((v) => {
  if (!v.id) throw new Error("missing id");
  return v.id;
});
```

## 4) Dependent operations

Good:

```ts
return loadConfig()
  .andThen(validateConfig)
  .asyncAndThen(saveConfig);
```

Bad:

```ts
const cfg = loadConfig()._unsafeUnwrap();
const valid = validateConfig(cfg)._unsafeUnwrap();
return saveConfig(valid);
```

## 5) Side effects without changing success value

Good:

```ts
return createOrder(input)
  .andTee((order) => auditLog(order))
  .andThrough((order) => publishEvent(order));
```

Bad:

```ts
return createOrder(input).map((order) => {
  auditLog(order);
  publishEvent(order);
  return { ok: true }; // destroys original success value
});
```

## 6) Recovery + boundary consumption

Good:

```ts
import { err, ok } from "neverthrow";

return loadProfile(userId)
  .orElse((issue) => (issue.type === "NOT_FOUND" ? ok(defaultProfile) : err(issue)))
  .match(
    (profile) => ({ status: 200, body: profile }),
    (e) => ({ status: 400, body: { error: e.type } }),
  );
```

Bad:

```ts
return loadProfile(userId)._unsafeUnwrap();
```
