# DESIGN.md

Aesthetic lane: Swiss-technical with editorial scale. Reference: Klim-style orange-on-paper drench applied to a designer-engineer portfolio. Color strategy: Committed (ink on warm bone, blueprint orange load-bearing on every interactive surface, ink-drenched closing section).

## Color

| Token | Value | Use |
|---|---|---|
| `--bg` | `#F3EFE7` | Warm bone canvas |
| `--bg-dark` | `#16130D` | Ink. Contact/footer drench, dark case sections |
| `--text` | `#16130D` | Primary ink |
| `--text-secondary` | `#6E675A` | Body secondary |
| `--text-muted` | `#A39B8B` | Captions, indices |
| `--accent` | `#E84B0F` | Blueprint orange. Links, hovers, indices, marquee, availability dot |
| `--border` | `rgba(22,19,13,0.12)` | Hairlines |
| `--border-strong` | `rgba(22,19,13,0.24)` | Emphasized rules |

Never pure `#000`/`#fff`. All neutrals tinted warm (toward the orange hue).

## Typography

| Role | Family | Notes |
|---|---|---|
| Display + body (`--sans`) | Bricolage Grotesque (variable: opsz, wdth, wght 200–800) | Headings 700–800 uppercase, tight tracking (-0.03em). Body 380–420 |
| Accent italic (`--serif`) | Spectral italic 200–400 | Single italic words inside headings, pull quotes |
| Labels (`--mono`) | Martian Mono 300–500 | Eyebrows, indices, meta, captions. 10–12px, letter-spacing 0.12–0.2em, uppercase |

Scale: fluid clamp() display sizes up to 16vw for the hero name; ratio ≥1.3 between heading steps.

## Motion

- Easing: `cubic-bezier(0.16,1,0.3,1)` (expo-out) everywhere; `cubic-bezier(0.87,0,0.13,1)` for masks/loader.
- One orchestrated load: loader counter → name unmask → hero stagger.
- Scroll: clip-path image reveals, inner-image parallax (GSAP ScrollTrigger scrub), fade-up staggers.
- Custom cursor: ink dot + trailing ring (mix-blend difference), grows with "View" label over project media. Fine pointers only.
- `prefers-reduced-motion`: all reveals collapse to opacity, parallax and canvas disabled.

## Components

- Nav: fixed, transparent over hero, bone blur after scroll. Full-screen ink overlay menu on mobile (burger injected by JS).
- Marquee: orange band, ink uppercase Bricolage, infinite loop, pauses for reduced motion.
- Project rows: editorial alternating layout, oversized titles, mono meta, 4px-radius media masks. Never identical card grids.
- Footer/contact: ink drench, giant email link, orange hover states.
