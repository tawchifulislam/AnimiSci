# AnimiSci

Learn by seeing, not by memorizing. HSC Physics, Chemistry, Biology and Higher Math as step-by-step animations, in simple Bengali.

## Run

```bash
npm install
npm run dev
```

## Design system

- All styling lives in `src/app/globals.css` (design tokens, light and dark themes, components). Class names such as `shell` and `part` are chosen to avoid collisions with Tailwind utilities.
- Icons: Phosphor (`@phosphor-icons/react`). Import only through `src/components/ui/icons.ts` and add new icons there.
- Fonts: Hind Siliguri (Bengali and UI text) and Space Grotesk (Latin brand text), loaded in `src/app/layout.tsx`.

## Adding lessons for a new chapter

1. Create `src/data/<chapter>-index.ts` with the lesson list (slug, title, short, minutes)
2. Put that list in the chapter's `lessons` field in `src/data/chapters.ts`
3. Add one file per lesson plus an `index.ts` in `src/lessons/<chapter>/`
4. Register the chapter in `src/lessons/registry.ts`

## Progress tracking

Lesson completion and the last opened lesson are stored in the browser (`localStorage`, key `animisci:progress:v1`).

## Code conventions

- No Bengali in code or code comments. Bengali lives only in content and data (chapters, lessons, UI text).
