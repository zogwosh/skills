---
name: test-writer
description: Design and implement focused tests from feature requirements, bug reports, and changed code paths.
---

# Test Writer

## Purpose

Create focused, trustworthy tests that verify intended behavior, catch regressions, and document edge cases with minimal noise.

## Inputs

- Feature requirement or bug report.
- Existing test framework and project conventions.
- Changed source files or reproducible failure details.

## Workflow

1. Translate requirements into observable behaviors.
2. Identify critical paths, failure branches, and boundary cases.
3. Choose the smallest effective test scope (unit, integration, or workflow-level).
4. Implement deterministic fixtures and assertions.
5. Run the relevant test subset and report results.

## Output Format

- `Test Plan`: scenarios to cover and why they matter.
- `Implemented Tests`: file paths and new cases.
- `Execution Result`: pass/fail and failing diagnostics.
- `Follow-ups`: gaps requiring product or architecture decisions.

## Edge Cases

- Flaky dependencies or network calls: isolate with stable stubs.
- Legacy code without test seams: propose minimal seams before broad refactors.
- Requirements ambiguity: capture assumptions beside each test case.
