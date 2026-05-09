---
name: review-first-commit
description: Review workspace changes, decide commit readiness, split semantic commits, and commit safely without mixing unrelated topics.
---

# Review First Commit

## Purpose

Apply a strict review-first workflow before committing any workspace changes.

## Trigger Conditions

- User asks to check whether current changes are commit-ready.
- User asks for commit split planning and clean semantic commits.
- User asks to commit only after quality gates pass.

## Decision Rules

1. Inspect full workspace state first (`status`, staged diff, unstaged diff, untracked files).
2. Block commit if there are obvious incomplete changes, temporary debug artifacts, generated noise, or unrelated edits.
3. Run the most relevant validation commands before committing.
4. Output a concise readiness decision before any `git add` or `git commit`.
5. If not ready, stop and provide only minimal blocking fixes.
6. If ready, split by independent semantics and keep each commit rollback-friendly.
7. Prefer `feat` and `fix` commit types unless clearly misleading.
8. Never push, rewrite history, or create branches unless explicitly requested.

## When To Use

- Multi-file changes need quality screening before commit.
- User wants clean commit boundaries for review and rollback.
- Repository has validation scripts that should gate commits.

## When Not To Use

- User explicitly asks only for diagnosis/planning without any commit action.
- There are no code changes to review or commit.

## References

- `references/review-checklist.md`
- `references/commit-splitting-guide.md`

