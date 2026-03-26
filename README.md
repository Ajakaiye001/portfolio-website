# Timmy Ajakaiye — Portfolio

A premium, minimal portfolio website for a Product Designer & UI/UX Engineer. Built with vanilla HTML, CSS, and JavaScript — no framework required.

## Features

- Cinematic scroll-based project preview (GSAP ScrollTrigger)
- Custom animated cursor with follower
- Page loader with letter-by-letter reveal
- Scroll-triggered fade-up animations (Intersection Observer)
- Case study overlays with full editorial layout
- CSS-drawn project mockups (no external images needed)
- Fully responsive (mobile-first)
- Accessible markup (ARIA labels, keyboard nav)

## Project Structure

```
Portfolio website/
├── index.html          # HTML structure (clean, no inline styles or scripts)
├── styles/
│   └── main.css        # All styles — variables, components, responsive
├── scripts/
│   └── main.js         # All JavaScript — animations, interactions, data
├── assets/
│   ├── images/         # Place project screenshots / photos here
│   └── icons/          # Custom icons / favicon
├── .gitignore
└── README.md
```

## Running Locally

### Option A — Python (zero setup, built into your OS)

```bash
cd "Portfolio website"
python -m http.server 8000
```

Open → [http://localhost:8000](http://localhost:8000)

### Option B — Node.js (npx serve)

```bash
cd "Portfolio website"
npx serve
```

Open → [http://localhost:3000](http://localhost:3000)

### Option C — VS Code Live Server

1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**

Auto-reloads on file save.

## Customising Content

All project data lives in the `projects` array at the top of `scripts/main.js`. Each entry has:

| Field | Description |
|-------|-------------|
| `title` | Project name |
| `category` | Type / platform label |
| `tagline` | One-line hook |
| `bgColor` | Hero background colour |
| `accent` | Metric highlight colour |
| `year`, `role`, `duration`, `platform` | Meta info |
| `overview`, `problem`, `goal`, `solution` | Case study copy |
| `process` | Array of process steps |
| `metrics` | Array of `{ num, label }` impact stats |

To update personal info, edit the relevant sections in `index.html` directly.

## Adding Real Images

1. Drop screenshots into `assets/images/`
2. Replace CSS mockup `<div>` elements in `index.html` with `<img>` tags:

```html
<img src="assets/images/aria-mockup.png" alt="Aria app screenshot" loading="lazy" />
```

## Deploying

### Netlify (recommended — drag and drop)

1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag the entire `Portfolio website` folder onto the deploy zone
3. Done — live in seconds

### GitHub Pages

```bash
git init
git add .
git commit -m "initial portfolio"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

Then enable GitHub Pages from the repository Settings → Pages → Source: `main` branch.

## Git Setup

```bash
git init
git add .
git commit -m "refactored portfolio — clean HTML/CSS/JS structure"
```

## Dependencies (CDN — no install needed)

| Library | Purpose |
|---------|---------|
| [GSAP 3.12](https://gsap.com) | Scroll-based animations, ScrollTrigger |
| [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) | Display / serif typeface |
| [DM Sans](https://fonts.google.com/specimen/DM+Sans) | Body / UI typeface |
