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
- [Installing into CCSwitch](#installing-into-ccswitch)
- [Installing into Codex](#installing-into-codex)
- [Creating a New Skill](#creating-a-new-skill)
- [Maintenance Rules](#maintenance-rules)
- [Resources](#resources)
- [License](#license)

## Skills

<!-- SKILLS:START -->
### Coding

- [business-flow-slice-spec](skills/coding/business-flow-slice-spec) - Create, review, or update BUSINESS_FLOW.md vertical business-flow specs from requirements, code, tickets, or conversations; use for state/data/side-effect/failure/validation flow docs, not for DDD modeling, generic module docs, or architecture essays.
- [direct-code-style](skills/coding/direct-code-style) - Use when implementing or refactoring TypeScript business logic toward explicit low-ceremony code style; do not use when DDD tactical layering or event-driven internals are required.
- [honojs-rpc-best-practices](skills/coding/honojs-rpc-best-practices) - Implement or review Hono TypeScript RPC APIs using hc<AppType>, typed route chains, validator middleware, and c.req.valid; use for route/AppType/client inference issues, not for non-Hono, generic REST, or frontend-only work.
- [neverthrow-best-practices](skills/coding/neverthrow-best-practices) - Use when designing or refactoring TypeScript error contracts with neverthrow Result or ResultAsync; do not use for throw-only flows or paths that cannot fail.
- [pr-reviewer](skills/coding/pr-reviewer) - Use when reviewing pull request changes for correctness and regression risk with concrete code evidence; do not use for feature implementation tasks without a review scope.
- [review-first-commit](skills/coding/review-first-commit) - Use when deciding whether workspace changes are commit-ready and producing clean semantic commits; do not use when the user only wants diagnosis or no commit action.
- [zodjs-v4](skills/coding/zodjs-v4) - Implement or review TypeScript runtime validation with Zod v4 at trust boundaries using schemas, safeParse, derived input/output types, and structured errors; not for compile-time-only types or non-Zod validators.
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

## Installing into CCSwitch

```bash
bun run install:ccswitch
```

This installs each skill directory from `skills/` into `~/.cc-switch/skills/<skill-name>/`.

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
