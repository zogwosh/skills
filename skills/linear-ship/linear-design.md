# Linear design canon (mandatory for design + build)

Use this as the default visual system when creating or extending `design.md`. Do not substitute generic “clean modern”, Material, or typical AI-landing aesthetics.

## Product feel

Linear’s UI reads as a **precise tool**, not a marketing page:

- Calm, dense, professional
- Chrome is quiet; content and structure do the work
- Everything feels measured (spacing, type, borders) — not “airy startup”

## Surfaces & color

Prefer a **neutral near-black / near-white** stack + **one indigo accent** (Linear’s accent family). Example starter tokens (adapt only if the repo already has a theme):

| Token | Dark-leaning default | Light-leaning default |
| --- | --- | --- |
| `bg` | `#0F0F10` | `#F7F8F8` |
| `surface` | `#19191B` | `#FFFFFF` |
| `surface-hover` | `#1F1F22` | `#F0F1F3` |
| `border` | `#2C2C31` | `#E4E5E7` |
| `text` | `#EDEDEF` | `#1B1B1F` |
| `text-muted` | `#8A8F98` | `#6B6F76` |
| `accent` | `#5E6AD2` | `#5E6AD2` |
| `accent-muted` | `#3F45A0` | `#C7CBF5` |
| `danger` | `#EB5757` | `#D94A4A` |

Rules:

- ~90% neutrals; accent only for primary actions, focus rings, selection, key links
- No broad purple/multicolor gradients behind whole pages
- No glow, neon, glassmorphism stacks, or multi-layer drop shadows
- Borders: **1px** hairline at `border`; separation by border/background shift, not shadow

## Typography

- UI sans only (Inter, or project-specified geometric sans). No display serif hero type for app chrome.
- Ladder (stick to these roles):

| Role | Size | Weight | Color |
| --- | --- | --- | --- |
| Page title | 20–24px | 580–600 | `text` |
| Section | 13–14px | 560–600 | `text` |
| Body | 13–14px | 400–450 | `text` |
| Meta / label | 11–12px | 450–500 | `text-muted` |
| Mono (IDs, keys) | 12px | 400 | `text-muted` |

- Tight line-height (~1.35–1.5 for body). Do not inflate type for “marketing warmth.”
- Avoid more than **two** weights on a single view besides regular + semibold.

## Spacing & layout

- Base unit **4px**; common steps 4 / 8 / 12 / 16 / 24 / 32
- Prefer **compact** padding (e.g. controls `6–10px` vertical, panels `12–16px`) over large empty hero regions
- One primary column of work; side nav / list + detail is idiomatic
- Align labels, icons, and text to a shared vertical rhythm
- Radius: **6–8px** controls/panels; **not** pill-everything (`9999px` only for true chips/avatars if needed)

## Components (Linear-like)

- **Buttons:** solid accent primary; quiet ghost/secondary with border or subtle fill; height ~28–32px; no giant CTAs
- **Inputs:** hairline border, same radius, clear focus ring using accent at low opacity; placeholder = `text-muted`
- **Lists/rows:** dense rows, hover = `surface-hover`, selected = accent-tint or left accent bar — not heavy cards
- **Nav:** flat, icon + label, muted until active; active = stronger text + subtle surface, not loud pills
- **Dialogs/menus:** surface + border, small shadow optional (`0 8px 24px` at ~20% black max); no modal theater
- **Icons:** simple stroke/geometric; monochrome; aligned to text caps height

## Motion

- 120–200ms ease for hover/focus/panel
- No bounce, no parallax, no decorative loop animations

## Explicit non-goals (reject in design plans)

- Marketing landing compositions (huge hero headline + gradient orb + three feature cards)
- Dashboard “stat card” grids as the first viewport default
- Soft claymorphism / skeuomorphism
- Rainbow badges, emoji as structure, sticker clutter

## Design plan must answer

Before build, the change plan must explicitly state:

1. **Surfaces:** which bg/surface/border tokens apply to each region  
2. **Type roles:** which ladder steps are used (no ad-hoc sizes)  
3. **Accent usage:** where accent appears (and nowhere else)  
4. **Density:** padding/gap values from the 4px scale  
5. **States:** default / hover / active / focus for new controls  
