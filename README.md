# skills

Personal agent skills for Cursor and other agents that support the [Agent Skills](https://agentskills.io) format.

## Install

```bash
npx skills add zogwosh/skills --list

npx skills add zogwosh/skills --skill typescript-style -a cursor -g -y
npx skills add zogwosh/skills --skill harness-ui-craft -a cursor -g -y

# both
npx skills add zogwosh/skills --skill '*' -a cursor -g -y
```

Omit `-g` for project-scoped install.

## Skills

| Skill | Role |
| --- | --- |
| `typescript-style` | TS/React house style (cognitive load + Google beyond gts) |
| `harness-ui-craft` | UI: preset → Linear design → code → evidence for user/CI (not LLM visual PASS) |

Two skills on purpose: **code style** vs **UI craft**. A single mega-skill would muddy triggers. The old `web-ui-verification` skill was folded into `harness-ui-craft` Phase 3 so UI work does not compete with a second skill.

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
