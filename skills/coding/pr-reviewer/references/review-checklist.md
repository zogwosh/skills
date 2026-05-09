# PR Review Checklist

## Correctness

- Does the change satisfy stated requirements?
- Are error paths and retries handled safely?
- Are null/undefined/empty cases covered?

## Regression Risk

- Did shared interfaces change?
- Are backward compatibility and migrations addressed?
- Are feature flags or config contracts updated safely?

## Test Coverage

- Are critical paths covered by tests?
- Are edge cases represented?
- Do tests prove behavior, not implementation details?

## Maintainability

- Is logic readable without hidden coupling?
- Are names and boundaries consistent with existing modules?
- Is dead code removed or tracked for cleanup?
