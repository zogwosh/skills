# skills

Agent Skills catalog ([Agent Skills](https://agentskills.io) / `.agents/skills`).

## Install

```bash
npx skills add zogwosh/skills --list

# Project: ./.agents/skills/
npx skills add zogwosh/skills --skill typescript-style -a universal -y
npx skills add zogwosh/skills --skill linear-ship -a universal -y

npx skills add zogwosh/skills --skill '*' -a universal -y

# Global: ~/.config/agents/skills/
npx skills add zogwosh/skills --skill '*' -a universal -g -y
```

Remove renamed skills if you still have them locally:

```bash
npx skills remove harness-ui-craft -a universal -y
npx skills remove web-ui-verification -a universal -y
```

## Skills

| Skill | Role |
| --- | --- |
| `typescript-style` | TS/React house style (cognitive load + Google beyond gts) |
| `linear-ship` | Linear canon → `design.md` → build → Playwright verify (`linear-design.md` forces real Linear design, not generic UI) |

**UI trust model:** ship gate is Playwright (or project E2E), not model taste. Screenshots are artifacts for humans/CI.

## Layout

```text
skills/
  typescript-style/
    SKILL.md
    google-judgment.md
  linear-ship/
    SKILL.md
    linear-design.md
```
