---
name: pr-reviewer
description: Review pull requests for correctness, maintainability, test coverage, and regression risk using concrete code evidence.
---

# PR Reviewer

## Purpose

Provide a rigorous pull request review that prioritizes bugs, behavior regressions, missing test coverage, and maintainability risks before style-only comments.

## Inputs

- Pull request diff, commit range, or changed file list.
- Relevant acceptance criteria, bug reports, or issue links.
- Optional project constraints such as runtime, performance, or compatibility requirements.

## Workflow

1. Read the diff and identify behavior changes, not only code changes.
2. Trace modified logic to call sites, shared contracts, and error handling paths.
3. Evaluate test coverage for changed paths and likely edge scenarios.
4. Flag high-severity issues first with file-level evidence.
5. Separate blocking defects from optional refactors and polish items.

## Output Format

- `Findings` section ordered by severity (`High`, `Medium`, `Low`).
- Each finding includes: file reference, risk description, and recommended fix.
- `Open Questions` section for assumptions needing author confirmation.
- `Summary` section with merge-readiness judgment.

## Edge Cases

- Large refactors with no behavior change: request proof from tests or benchmarks.
- Generated files mixed with source edits: focus on source-of-truth changes first.
- Partial context: explicitly call out what was not reviewed and why.
