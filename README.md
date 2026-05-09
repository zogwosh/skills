# Personal Awesome Skills

A private curated collection of my personal AI agent skills for coding, writing, research, automation, and personal workflows.

## Quickstart

```bash
bun install
bun run check
```

## CC Switch Indexing

Owner: YOUR_GITHUB_USERNAME  
Name: personal-awesome-skills  
Branch: main  
Subdirectory: skills

## Contents

- [Skills](#skills)
  - [Coding](#coding)
  - [Writing](#writing)
  - [Research](#research)
  - [Personal Ops](#personal-ops)
- [Getting Started](#getting-started)
- [Installing into Claude Code](#installing-into-claude-code)
- [Installing into Codex](#installing-into-codex)
- [Creating a New Skill](#creating-a-new-skill)
- [Maintenance Rules](#maintenance-rules)
- [Resources](#resources)
- [License](#license)

## Skills

<!-- SKILLS:START -->
### Coding

- [direct-code-style](skills/coding/direct-code-style) - Enforce explicit and low-ceremony implementation style with zero DDD tactical patterns, no internal pubsub, guard clauses, and top-down readability.
- [neverthrow-best-practices](skills/coding/neverthrow-best-practices) - Enforce modern neverthrow 8.2.0 patterns for TypeScript boundaries, refactors, API design, and Result or ResultAsync code reviews.
- [pr-reviewer](skills/coding/pr-reviewer) - Review pull requests for correctness, maintainability, test coverage, and regression risk using concrete code evidence.
- [review-first-commit](skills/coding/review-first-commit) - Review workspace changes, decide commit readiness, split semantic commits, and commit safely without mixing unrelated topics.
- [zodjs-v4](skills/coding/zodjs-v4) - Apply Zod v4 best practices to design runtime-safe schemas, parsing boundaries, and actionable validation errors for TypeScript application code.
<!-- SKILLS:END -->

## Coding

Coding skills focus on review quality, test design, debugging strategy, and delivery confidence.

## Writing

Writing skills help with editing, rewriting, and producing clear communication across technical and business contexts.

## Research

Research skills structure dense sources into decision-ready summaries and highlight uncertainty explicitly.

## Personal Ops

Personal ops skills support recurring personal workflows such as weekly reviews and planning loops.

## Getting Started

1. Clone this repository.
2. Run `bun install`.
3. Run `bun run check`.
4. Add or edit skills inside `skills/<category>/<skill-name>/SKILL.md`.

## Installing into Claude Code

```bash
bun run install:claude
```

This installs each skill directory from `skills/` into `~/.claude/skills/<skill-name>/`.

## Installing into Codex

```bash
bun run install:codex
```

This installs each skill directory from `skills/` into `~/.agents/skills/<skill-name>/`, which matches the Codex skills discovery path documented at:
https://developers.openai.com/codex/skills

## Creating a New Skill

1. Copy [`templates/basic-skill/SKILL.md`](templates/basic-skill/SKILL.md).
2. Create `skills/<category>/<skill-name>/SKILL.md`.
3. Keep the frontmatter fields `name` and `description` accurate.
4. Run:

```bash
bun run validate
bun run registry
bun run readme
```

## Maintenance Rules

- Every installable skill must live under `skills/`.
- Every skill directory must include `SKILL.md`.
- `name` in frontmatter must match the skill directory name.
- Keep descriptions explicit about trigger conditions and input scenarios.
- Use `bun run check` before every commit.
- Keep `registry.json` and README skill index in sync via scripts.

## Resources

- [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)
- [Bun Documentation](https://bun.sh/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## License

MIT. See [LICENSE](LICENSE).
