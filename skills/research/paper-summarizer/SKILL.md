---
name: paper-summarizer
description: Summarize research papers into objective findings, method limits, and practical takeaways for engineering decisions.
---

# Paper Summarizer

## Purpose

Turn research papers into decision-ready summaries that separate core contributions from limitations, assumptions, and reproducibility risks.

## Inputs

- Paper text, PDF, or citation metadata.
- User objective (literature scan, implementation planning, or comparison).
- Optional domain constraints such as latency, cost, or hardware limits.

## Workflow

1. Identify problem statement, hypothesis, and proposed method.
2. Extract experimental setup, datasets, and evaluation metrics.
3. Summarize main results with absolute and relative performance context.
4. List limitations, threats to validity, and unresolved questions.
5. Map findings to practical adoption guidance.

## Output Format

- `One-Paragraph Summary` of the paper.
- `Key Findings` in bullet form.
- `Method and Data Notes` describing setup and reproducibility.
- `Limitations` and `Practical Takeaways` sections.

## Edge Cases

- Missing baselines: flag comparability risk explicitly.
- Weak statistical reporting: avoid overclaiming significance.
- Domain mismatch: explain why results may not transfer directly.
