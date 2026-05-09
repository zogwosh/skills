# neverthrow refactor recipes

## 1) try/catch -> Result

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
  | { type: "INVALID_JSON"; message: string; cause: unknown }
  | { type: "MISSING_FIELDS"; fields: Array<"id" | "email"> };

const parseJson = fromThrowable(
  (value: string) => JSON.parse(value) as { id?: string; email?: string },
  (cause): UserParseError => ({
    type: "INVALID_JSON",
    message: "User payload is not valid JSON",
    cause,
  }),
);

function parseUser(raw: string): Result<{ id: string; email: string }, UserParseError> {
  return parseJson(raw).andThen((data) => {
    const missing: Array<"id" | "email"> = [];
    if (!data?.id) missing.push("id");
    if (!data?.email) missing.push("email");
    return missing.length === 0 ? ok({ id: data.id, email: data.email }) : err({ type: "MISSING_FIELDS", fields: missing });
  });
}
```

Notes:

- Define `E` first, then convert throw site.
- Keep original `cause` where possible.

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
import { ResultAsync, errAsync } from "neverthrow";

type UserError =
  | { type: "HTTP_ERROR"; status: number; cause: unknown }
  | { type: "PARSE_ERROR"; cause: unknown };

function loadUser(id: string): ResultAsync<User, UserError> {
  return ResultAsync.fromPromise(fetch(`/api/users/${id}`), (cause): UserError => ({
    type: "HTTP_ERROR",
    status: 0,
    cause,
  }))
    .andThen((res) =>
      res.ok
        ? ResultAsync.fromPromise(res.json(), (cause): UserError => ({ type: "PARSE_ERROR", cause }))
        : errAsync({ type: "HTTP_ERROR", status: res.status, cause: res }),
    );
}
```

Notes:

- Rejections and parse failures are both typed.
- No thrown errors escape the function.

## 3) nullable return -> Result

Before:

```ts
function findToken(headers: Headers): string | null {
  return headers.get("x-token");
}
```

After:

```ts
import { Result, err, ok } from "neverthrow";

type AuthError = { type: "MISSING_TOKEN"; header: "x-token" };

function findToken(headers: Headers): Result<string, AuthError> {
  const token = headers.get("x-token");
  return token ? ok(token) : err({ type: "MISSING_TOKEN", header: "x-token" });
}
```

Notes:

- Use `Result` when absence is a failure in calling context.
- Keep error payload actionable for handlers.

## 4) service method boundary design

Pattern:

```ts
type ServiceError =
  | { type: "VALIDATION_ERROR"; field: string; reason: string }
  | { type: "CONFLICT"; entity: "user"; id: string }
  | { type: "INFRA_ERROR"; subsystem: "db"; cause: unknown };

interface UserService {
  create(input: CreateUserInput): ResultAsync<User, ServiceError>;
}
```

Guidelines:

- Service boundary must expose explicit `ResultAsync<T, E>`.
- Convert infrastructure exceptions near adapters, not in controllers.
- Normalize external failures into domain `E` with `mapErr`.
- Keep `E` narrow; do not leak raw driver/library errors.

## 5) test assertions for Ok and Err

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
  if (result.isErr()) expect(result.error.type).toBe("MISSING_TOKEN");
});
```

Notes:

- Prefer `isOk`/`isErr` guards over unsafe unwrap in tests.
- If using unsafe unwrap in tests, keep it local and intentional.
