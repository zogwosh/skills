# Review Checklist

Use this checklist before any commit.

## Workspace integrity

- [ ] `git status --short --branch` reviewed.
- [ ] `git diff --staged --` reviewed.
- [ ] `git diff --` reviewed.
- [ ] `git ls-files --others --exclude-standard` reviewed.

## Exclusion screening

- [ ] No debug logs, temporary prints, or local experiment code.
- [ ] No commented-out dead blocks kept accidentally.
- [ ] No build artifacts, caches, or editor temp files.
- [ ] No unrelated file changes mixed into the same submission.
- [ ] No obviously incomplete or broken implementation.

## Validation

- [ ] Relevant checks (lint/typecheck/build/test when applicable) executed.
- [ ] Required checks passed, or failures are proven unrelated and excluded.

## Commitability decision

- [ ] Readiness result was stated before staging and commit.
- [ ] Blocking issues (if any) are listed with minimal fix actions.

