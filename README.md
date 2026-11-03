# skills

Personal agent skills for Cursor and other agents that support the [Agent Skills](https://agentskills.io) format.

## Install

```bash
# List skills in this repo
npx skills add zogwosh/skills --list

# Install one skill (Cursor, global)
npx skills add zogwosh/skills --skill typescript-style -a cursor -g -y
npx skills add zogwosh/skills --skill web-ui-verification -a cursor -g -y

# Install all skills for Cursor
npx skills add zogwosh/skills --skill '*' -a cursor -g -y
```

Project-scoped install (omit `-g`):

```bash
npx skills add zogwosh/skills --skill typescript-style -a cursor -y
```

## Skills

| Skill | Description |
| --- | --- |
| `typescript-style` | Low cognitive-load TS/React style + Google TS judgment beyond gts |
| `web-ui-verification` | Browser UI verification protocol for frontend changes |

## Layout

```text
skills/
  typescript-style/
    SKILL.md
    google-judgment.md
  web-ui-verification/
    SKILL.md
```

Compatible with `npx skills add` discovery (`skills/<name>/SKILL.md`).
