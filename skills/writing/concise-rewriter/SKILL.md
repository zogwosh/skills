---
name: concise-rewriter
description: Rewrite long or noisy text into concise, high-signal output while preserving intent and key facts.
---

# Concise Rewriter

## Purpose

Condense verbose text into concise output that keeps the original intent, core facts, and required action points.

## Inputs

- Source text (notes, email, spec, or message thread).
- Target format (bullet summary, short paragraph, action list, etc.).
- Optional maximum length or tone constraints.

## Workflow

1. Extract non-negotiable facts, decisions, and deadlines.
2. Remove repetition, filler phrases, and low-value tangents.
3. Rewrite for directness with consistent terminology.
4. Preserve critical nuance when shortening.
5. Validate that compressed output still answers the original need.

## Output Format

- `Concise Version` in requested format.
- `Dropped Details` section for omitted non-critical context.
- `Assumptions` section if the source was ambiguous.

## Edge Cases

- Conflicting statements in source: surface conflict rather than guessing.
- Legal or compliance text: keep exact obligations and dates unchanged.
- Highly emotional writing: preserve intent while neutralizing noise.
