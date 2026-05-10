---
name: pr-reviewer
description: Use when reviewing pull request changes for correctness and regression risk with concrete code evidence; do not use for feature implementation tasks without a review scope.
---

# PR Reviewer

## Purpose

Provide a rigorous pull request review that prioritizes bugs, behavior regressions, missing test coverage, and maintainability risks before style-only comments.

## Trigger Conditions

- Review a PR diff, commit range, or staged change set.
- Assess merge risk and missing tests before approval.
- Produce a severity-ordered findings report.

## When Not To Use

- The task is to implement features instead of reviewing an existing diff.
- There is no diff, commit range, or changed-file scope to inspect.
- The user asks only for style rewrites without risk evaluation.

## Inputs

- Pull request diff, commit range, or changed file list.
- Relevant acceptance criteria, bug reports, or issue links.
- Optional project constraints such as runtime, performance, or compatibility requirements.

## Decision Rules

1. Prioritize correctness and regression risk over style.
2. Trace each risky change to call paths, contracts, and error behavior.
3. Require evidence for behavioral assumptions.
4. Distinguish blocking defects from non-blocking suggestions.
5. Explicitly call out missing test coverage for changed behavior.

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

## Trigger Test Prompts

- Should trigger: "Review this PR for regressions and missing tests before we merge."
- Should trigger: "Audit this commit range and list high/medium/low findings with file evidence."
- Should not trigger: "Implement a new endpoint and add tests for it."
- Should not trigger: "Rewrite this module style without doing a review."

## Edge Cases

- Large refactors with no behavior change: request proof from tests or benchmarks.
- Generated files mixed with source edits: focus on source-of-truth changes first.
- Partial context: explicitly call out what was not reviewed and why.
