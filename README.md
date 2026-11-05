# skills

Agent Skills catalog ([Agent Skills](https://agentskills.io) / `.agents/skills`).

## Install

Use the **universal** target so skills land in the shared `.agents` tree (not Cursor-specific dirs):

```bash
npx skills add zogwosh/skills --list

# Project: ./.agents/skills/
npx skills add zogwosh/skills --skill typescript-style -a universal -y
npx skills add zogwosh/skills --skill harness-ui-craft -a universal -y

# Both, project-scoped
npx skills add zogwosh/skills --skill '*' -a universal -y

# Global: ~/.config/agents/skills/
npx skills add zogwosh/skills --skill '*' -a universal -g -y
```

If you already use tools that read `~/.agents/skills/` (e.g. Codex/Cline-style), install with `-a codex` or `-a cline` instead of `universal`.

## Skills

| Skill | Role |
| --- | --- |
| `typescript-style` | TS/React house style (cognitive load + Google beyond gts) |
| `harness-ui-craft` | UI: preset → Linear design **and** Linear implementation → evidence for user/CI (not LLM visual PASS). Replaces the old `web-ui-verification` skill. |

**UI trust model:** LLMs are weak at visual acceptance. Craft produces design, code, and artifacts; humans or screenshot-regression CI accept look-and-feel.

## Layout

```text
skills/
  typescript-style/
    SKILL.md
    google-judgment.md
  harness-ui-craft/
    SKILL.md
```
