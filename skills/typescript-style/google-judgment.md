# Google TS judgment (beyond gts)

Rules from the [Google TS/JS Style Guide](https://google.github.io/styleguide/tsguide.html) that gts does not reliably enforce. If these conflict with house cognitive rules in `SKILL.md`, house rules win (e.g. stricter ban on mutating `let` accumulators).

## Modules

- Named exports only — no default exports
- Minimize export surface; export only what other modules need
- No mutable exports (`export let`); use a getter if needed
- No container classes for static namespacing — export consts/functions
- Prefer relative imports within the same project; avoid deep `../../../` when a clearer path exists
- Named imports for frequent/clear symbols; namespace imports (`import * as foo`) for large APIs with generic names
- `import type` / `export type` for type-only symbols
- No `import('...').Type` in type positions — use `import type`
- ES modules only: no `namespace` / `module` blocks, no `import x = require(...)`, no app `/// <reference>`

## Language and classes

- One variable per declaration
- No `Array(...)` / `new Object()` — use `[]` / `{}` / `Array.from`
- No non-index properties on arrays — use `Map` or object
- No unfiltered `for...in` — prefer `Object.keys` / `Object.entries` + `for...of`
- Prefer function declarations for named top-level functions; no `function` expressions (arrows OK; generators / rare `this` rebind excepted)
- Arrow concise body only when the return value is used; else block (or `void`)
- Callbacks: prefer arrows that explicitly forward args
- No class fields/services used only in the constructor — use constructor locals
- Prefer module-local functions over `private static` when readable
- No dynamic static dispatch; no `this` in static methods
- No `#private` — use `private` / `protected`
- `readonly` for never-reassigned properties; prefer parameter properties for obvious ctor→field wiring
- Init fields at declaration when independent of ctor params; avoid field initializers that depend on other `this` init order
- Getters must be pure; no pass-through accessors that only hide a field
- No unnecessary `public`; no `obj['prop']` to bypass visibility
- No `prototype` manipulation in ordinary app code

## Naming

| Style | Use for |
| --- | --- |
| `UpperCamelCase` | class, interface, type, enum, decorator, type params |
| `lowerCamelCase` | variable, parameter, function, method, property, module alias |
| `CONSTANT_CASE` | module-level immutables, enum values |

- No leading/trailing `_` for privacy; no `I` / `Interface` / `opt_` prefixes
- Abbreviations as words: `loadHttpUrl`, `customerId` (not `loadHTTPURL`, `customerID`)
- Names must not restate the type; short names only in tiny scopes (≈≤10 lines)
- Unused required bindings: `_name` or `_`; omit trailing unused params
- Files often `snake_case`; namespace import aliases stay `lowerCamelCase`

## Types

- Prefer `interface` over `type = { ... }` for object shapes; use `type` for unions, tuples, mapped types, primitives
- Annotate structural literals at declaration: `const x: Foo = { ... }`
- Do not put `|null` / `|undefined` inside shared aliases — add nullability at use sites
- Simple elements: `T[]` / `readonly T[]`; complex elements: `Array<...>`
- Index signatures: meaningful key label; prefer `Map` / `Set` when that matches intent
- Prefer simple explicit types over heavy mapped/conditional types when clearer
- Avoid `any` — prefer precise types or `unknown`; document suppressions
- No wrapper types (`String`, `Number`, `Boolean`, `Object`) as types or constructors
- Avoid return-type-only generics; specify type args when calling such APIs
- Infer when trivial; annotate for readability or `isolatedDeclarations` exports

## Comments and JSDoc

- `/** */` for user-facing docs; `//` for implementation (multi-line: multiple `//`, not `/* */`)
- Document non-obvious exports; comments must add information, not restate names/types
- No types in JSDoc in `.ts` source
- Method blurb: third-person verb phrase
- Parameter properties: `@param` on the constructor
- Call sites: `/* paramName= */ value` when the name is unclear; prefer options objects when many args
- JSDoc **before** decorators
- `@deprecated` must include migration guidance
