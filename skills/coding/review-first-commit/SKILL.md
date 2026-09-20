---
name: review-first-commit
description: Use when deciding whether workspace changes are commit-ready and producing clean semantic commits; do not use when the user only wants diagnosis or no commit action.
---

# Review First Commit

## Purpose

Apply a strict review-first workflow before committing any workspace changes.

## Trigger Conditions

- User asks to check whether current changes are commit-ready.
- User asks for commit split planning and clean semantic commits.
- User asks to commit only after quality gates pass.

## When Not To Use

- User explicitly asks only for diagnosis, planning, or code explanation.
- There are no code changes to review or commit.
- User prohibits any git commit activity in the current task.

## Inputs

- Full workspace state (`git status`, staged and unstaged diffs, untracked files).
- Project validation commands relevant to modified files.
- User constraints on commit style, split boundaries, and push behavior.

## Decision Rules

1. Inspect full workspace state first (`status`, staged diff, unstaged diff, untracked files).
2. Block commit if there are obvious incomplete changes, temporary debug artifacts, generated noise, or unrelated edits.
3. Run the most relevant validation commands before committing.
4. Output a concise readiness decision before any `git add` or `git commit`.
5. If not ready, stop and provide only minimal blocking fixes.
6. If ready, split by independent semantics and keep each commit rollback-friendly.
7. Prefer `feat` and `fix` commit types unless clearly misleading.
8. Never push, rewrite history, or create branches unless explicitly requested.

## Workflow

1. Audit workspace state and classify modified files by intent.
2. Run validation gates for the touched scope.
3. Produce an explicit readiness verdict with blockers, if any.
4. If ready, create semantic commit groups and stage per group.
5. Commit each group with clear rollback-friendly messages.

## Output Format

- `Readiness`: pass/fail with concrete reasons.
- `Validation`: commands run and key pass/fail results.
- `Commit plan`: semantic split list and proposed commit messages.
- `Risks`: anything needing user confirmation before commit.

## Trigger Test Prompts

- Should trigger: "Check whether these changes can be committed and split them into clean commits."
- Should trigger: "Review current workspace and commit only if validation passes."
- Should not trigger: "Explain why this bug happens, do not commit anything."
- Should not trigger: "Draft a migration plan only."

## References

- `references/review-checklist.md`
- `references/commit-splitting-guide.md`
