# skills

Personal agent skills for Cursor and other agents that support the [Agent Skills](https://agentskills.io) format.

## Install

```bash
# List skills in this repo
npx skills add zogwosh/skills --list

# Install to Cursor (global)
npx skills add zogwosh/skills --skill typescript-style -a cursor -g -y
npx skills add zogwosh/skills --skill harness-ui-craft -a cursor -g -y
npx skills add zogwosh/skills --skill web-ui-verification -a cursor -g -y

# Install all
npx skills add zogwosh/skills --skill '*' -a cursor -g -y
```

Omit `-g` for project-scoped install.

## Skills

| Skill | Role | Trigger |
| --- | --- | --- |
| `typescript-style` | TS/React house style (cognitive load + Google beyond gts) | Write/review `.ts`/`.tsx` |
| `harness-ui-craft` | Design-first UI craft (preset → Linear plan → code → screenshot) | Build/polish UI in harness/sandbox |
| `web-ui-verification` | Deep browser visual + behavioral QA | Explicit verify/QA, or deeper check after craft |

`harness-ui-craft` owns **making** UI. `web-ui-verification` owns **proving** UI in the browser. Do not expect craft behavior from the verification skill alone.

## Layout

```text
skills/
  typescript-style/
    SKILL.md
    google-judgment.md
  harness-ui-craft/
    SKILL.md
  web-ui-verification/
    SKILL.md
```
