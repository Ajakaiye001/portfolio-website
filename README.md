# Timmy Ajakaiye — Portfolio

A Swiss-technical portfolio for a Product Designer & UI/UX Engineer. Ink on warm bone with a blueprint-orange accent. Built with vanilla HTML, CSS, and JavaScript — no build step required.

## Features

- Orchestrated page load: counter + name reveal → hero typographic stagger (GSAP)
- Interactive canvas dot-field in the hero (ripples toward the pointer)
- Lenis smooth scrolling wired into GSAP ScrollTrigger
- Editorial work rows with clip-path reveals and inner-image parallax
- Custom cursor with contextual "View case" label (fine pointers only)
- Orange skill marquee, ink-drenched contact section, live London clock
- Full-screen overlay menu on mobile (burger injected by JS)
- Case study pages share the design system via CSS variables
- `prefers-reduced-motion` collapses all motion to simple fades

## Project structure

```
Portfolio_website/
├── index.html              # Redirect → pages/index.html
├── PRODUCT.md              # Brand context (audience, voice, principles)
├── DESIGN.md               # Design tokens (color, type, motion)
├── pages/
│   ├── index.html          # Home
│   ├── wastebazaar.html    # Case study
│   ├── yearbook.html       # Case study
│   ├── closet-manager.html # Case study
│   └── kora.html           # Case study (in progress)
├── styles/
│   ├── main.css            # Design system + home sections
│   ├── case.css            # Shared case-study system (palette via CSS vars)
│   ├── wastebazaar.css     # WasteBazaar page (pine/lime)
│   ├── closet-manager.css  # Closet Manager (raisin black/earth yellow/light green)
│   ├── yearbook.css        # Yearbook (brand blue/bright peach)
│   └── case-study.css      # Legacy layouts, now only used by kora.html
├── scripts/
│   ├── main.js             # Home: loader, cursor, canvas, scroll
│   ├── case.js             # Closet/Yearbook: reveals, counters, parallax (vanilla)
│   ├── wastebazaar.js      # WasteBazaar: same system, page-scoped
│   └── case-study.js       # Legacy, now only used by kora.html
└── assets/                 # Case study imagery
```

## Type & color

| Role | Choice |
|------|--------|
| Display + body | Bricolage Grotesque (variable) |
| Italic accents | Spectral |
| Labels / meta | Martian Mono |
| Canvas | `#F3EFE7` warm bone |
| Ink | `#16130D` |
| Accent | `#E84B0F` blueprint orange |

## Running locally

```bash
npx serve            # → http://localhost:3000
# or
python -m http.server 8000
```

## Dependencies (CDN, no install)

| Library | Purpose |
|---------|---------|
| [GSAP 3.12](https://gsap.com) + ScrollTrigger | Load choreography, scroll animations |
| [Lenis](https://lenis.darkroom.engineering) | Smooth scrolling |
| Google Fonts | Bricolage Grotesque, Spectral, Martian Mono |

## Deploying

Netlify drag-and-drop or GitHub Pages both work as-is. Asset paths are case-sensitive on Linux hosts — keep folder names exactly as they are in `assets/`.

## To do

- Add a real resume PDF (the download link was removed until one exists)
- Point the social links in the contact section at real profiles
