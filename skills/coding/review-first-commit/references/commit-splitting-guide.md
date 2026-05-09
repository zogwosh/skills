# Commit Splitting Guide

## Splitting principles

- Group by one semantic topic per commit.
- Keep unrelated changes in separate commits.
- Prefer smaller commits when boundaries are uncertain.
- Ensure each commit can be independently reverted.

## Recommended order

1. Functional changes (`feat`/`fix`) first.
2. Supporting docs/config updates tied to that function.
3. Remaining independent topics in separate commits.

## Message style

- Use icon + conventional commit type + concise summary.
- Prefer:
  - `✨ feat: ...`
  - `🐛 fix: ...`
- Use other types only when `feat`/`fix` would be inaccurate.

## Pre-commit checks per split

- Stage only the intended files or hunks.
- Verify staged content with `git diff --cached --`.
- Confirm no unrelated files are staged.

## Post-commit report

After all commits, report:

- number of commits created,
- each commit message,
- current `git status`,
- recent short history,
- validation commands and outcomes.

