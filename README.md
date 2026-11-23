# Portfolio

Personal portfolio built with React, TypeScript, Vite and Tailwind CSS v4, in a Frutiger Aero style
(a retro desktop with glossy windows over a dithered Y2K-style wallpaper) with light and dark themes and three languages (PT, EN, ES).

## Scripts

- `npm run dev` starts the dev server
- `npm run build` type-checks and builds to `dist/`
- `npm run lint` runs ESLint
- `npm run deploy` builds and publishes `dist/` to GitHub Pages
- `npm run wallpaper` and `npm run cursors` re-render the generated images (see below)
- `npm run icons` regenerates `src/data/skill-icons.ts` after you add or change a skill's icon

The contact form uses EmailJS and reads `VITE_SERVICE_ID`, `VITE_TEMPLATE_ID` and
`VITE_PUBLIC_KEY` from `.env`.

## Where things live

| Path                       | What it holds                                                        |
| -------------------------- | -------------------------------------------------------------------- |
| `src/data/`                | Content that is the same in every language: jobs, skills, links, FAQ |
| `src/i18n/locales/`        | Translated copy, one file per language                               |
| `src/components/sections/` | One component per page section, each rendered inside a `Window`      |
| `src/components/layout/`   | The desktop: wallpaper, menu bar, window frame, dock, footer         |
| `src/components/ui/`       | Small controls: language switcher, theme toggle, desktop shortcuts   |
| `src/hooks/`, `src/lib/`   | Theme, active-section and clock hooks; date formatting               |
| `src/styles/`              | Design tokens, theme variables, glossy materials, desktop layout     |
| `scripts/`                 | Generators for the wallpaper and cursor images                       |

## Editing content

**Add a job:** add an entry to `JOBS` in `src/data/experience.ts` (company, start/end month,
stack), then add its translated copy under `experience.jobs.<id>` in each locale file. Dates are
formatted per language automatically, and a job with `end: null` is shown as the current one.

**Add a skill:** add it to the right group in `src/data/skills.ts`, naming its react-icons
export (e.g. `icon: 'SiDocker'`), then run `npm run icons`.

**Add a UI icon:** add a line for it to `src/lib/icons.ts` and import it from there. Importing
from `@hugeicons/core-free-icons` directly would load the whole set (about 8 MB) in development.

## Styling

The page is laid out as a retro desktop: a fixed wallpaper, a menu bar along the top, each section
in its own window, shortcuts to external links on the desktop, and a dock for moving between
sections.

- **Wallpaper:** a small ray-traced scene (glass orbs on a grassy hill), drawn at low resolution
  and dithered, by day for the light theme and at dusk for the dark one. The images in
  `src/assets/wallpaper/` come from `scripts/render-wallpaper.mjs` (`npm run wallpaper`).
- **Cursors:** the pixel arrow and hand in `src/assets/cursors/` come from
  `scripts/render-cursors.mjs` (`npm run cursors`), where each is a small bitmap you can edit.
- **Windows, dock, shortcuts:** `src/styles/layout.css`. Sections and their dock icons are listed
  in `SECTIONS`, and the desktop shortcuts in `SHORTCUTS`, both in `src/data/site.ts`.
- Sizes are fluid: type and spacing come from `clamp()` tokens in `src/styles/index.css`
  (`text-fluid-*`, `p-fluid-*`, `gap-fluid-*`), and layouts switch on container width
  (`@2xl:`, `@3xl:`) rather than viewport breakpoints.
- Components never check which theme is active. Colors are CSS variables in
  `src/styles/theme.css`, switched by `data-theme` on `<html>`.
- Tailwind utilities handle layout; named classes (`window`, `tile`, `btn`, `chip`, `orb`) exist
  only for the layered materials and the desktop pieces.
