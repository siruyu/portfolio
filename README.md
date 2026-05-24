# Aisik Saha — Portfolio

A brutalist/terminal-themed single-page portfolio built with React, TypeScript, and Tailwind CSS v4. Features a 3D wireframe sphere, interactive particle nebula, cinematic loading sequence, and a contact form with email backend.

## Tech Stack

| Category | Tools |
|---|---|
| **Framework** | React 19, TypeScript 5.8 |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Motion, custom Canvas 3D |
| **Icons** | Lucide React |
| **Backend** | Express.js, Nodemailer |
| **Fonts** | Space Grotesk, JetBrains Mono |

## Sections

- **Hero** — Name display, tagline, resume download, CTA
- **Projects** — 3 project cards with modal case studies (Ossuary, MUSICA, UI/UX Architecture)
- **Core Capabilities** — Accordion listing 4 skill areas
- **About + Contact** — Biography, details grid, contact form with email backend

## Key Features

- Cinematic boot loader animation
- 3D wireframe sphere rendered on 2D Canvas with mouse interaction & scroll parallax
- Nebula particle starfield background
- System control panel (accent color, sphere speed, particle density, mesh style, grid toggle)
- Project detail modal drawer with full case study metadata
- Contact form with simulated transmission UX, local message archive, and Nodemailer email delivery
- Real-time system clock & rotating developer log ticker in header

## Run Locally

**Prerequisites:** Node.js

```bash
# Install dependencies
npm install

# Set environment variables in .env
GEMINI_API_KEY=your_key
SMTP_EMAIL=your_email@gmail.com
SMTP_PASS=your_app_password

# Start dev server (Vite on port 3000)
npm run dev

# Start Express backend (port 3002) in another terminal
npm run dev:server
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run dev:server` | Start Express backend |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | TypeScript type-checking |
