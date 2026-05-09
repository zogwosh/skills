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
- [Creating a New Skill](#creating-a-new-skill)
- [Maintenance Rules](#maintenance-rules)
- [Resources](#resources)
- [License](#license)

## Skills

<!-- SKILLS:START -->
### Coding

- [pr-reviewer](skills/coding/pr-reviewer) - Review pull requests for correctness, maintainability, test coverage, and regression risk using concrete code evidence.
- [test-writer](skills/coding/test-writer) - Design and implement focused tests from feature requirements, bug reports, and changed code paths.
- [zodjs-v4](skills/coding/zodjs-v4) - Apply Zod v4 best practices to design runtime-safe schemas, parsing boundaries, and actionable validation errors for TypeScript application code.

### Writing

- [blog-editor](skills/writing/blog-editor) - Edit technical or product blog drafts for structure, clarity, factual flow, and audience alignment.
- [concise-rewriter](skills/writing/concise-rewriter) - Rewrite long or noisy text into concise, high-signal output while preserving intent and key facts.

### Research

- [paper-summarizer](skills/research/paper-summarizer) - Summarize research papers into objective findings, method limits, and practical takeaways for engineering decisions.

### Personal Ops

- [weekly-review](skills/personal-ops/weekly-review) - Produce a weekly review of goals, completed work, blockers, and next actions from personal notes and logs.
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
