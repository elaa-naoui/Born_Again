## Project snapshot for AI coding agents

This file gives concise, actionable context so an AI assistant can be productive immediately in this repository.

- Stack: Vite + React (TS) + TailwindCSS. Entry: `src/main.tsx` -> `src/App.tsx` -> `src/pages/Index.tsx`.
- Package manager: pnpm (see `package.json` "packageManager"). Use `pnpm` for install/run tasks.

## Quick commands (PowerShell)

- Install deps: `pnpm install`
- Run dev server: `pnpm dev` (runs `vite`)
- Build: `pnpm build` (runs `vite build`)
- Preview build: `pnpm preview` (runs `vite preview`)
- Lint: `pnpm lint` (runs `eslint --quiet ./src`)

## High-level architecture & patterns

- Frontend SPA built with React + TypeScript. App bootstraps in `src/main.tsx` and renders `App`.
- `App.tsx` wires global providers: `QueryClientProvider` (react-query), `TooltipProvider`, `Toaster` and `BrowserRouter` (React Router v6). See `src/App.tsx` for exact composition.
- Routes: defined inline in `App.tsx` — `"/"` => `src/pages/Index.tsx`, `"*"` => `src/pages/NotFound.tsx`.

## UI & component conventions

- UI primitives and wrappers live under `src/components/ui/` — these are thin, project-wide components (Radix + Tailwind patterns). Prefer reusing these instead of adding raw Radix/Tailwind markup.
- Page-specific components live at `src/components/` (e.g., `Hero3D.tsx`, `Flame3D.tsx`, `GallerySection.tsx`). 3D scenes use `@react-three/fiber` + `three`.
- Import alias: `@/*` maps to `./src/*` (see `tsconfig.json`). Example: `import { Toaster } from '@/components/ui/sonner'`.

## State + data fetching

- React Query (`@tanstack/react-query`) is used for remote data (QueryClient mounted in `App.tsx`). Look for query hooks in `src/hooks` or `src/lib`.
- Local state may use `zustand` (installed) — search `create` or the `hooks/` folder for stores.
- Supabase SDK (`@supabase/supabase-js`) is a dependency — search the repo for Supabase client initialization if you need DB access.

## Styling, assets, and 3D

- Tailwind is configured (see `tailwind.config.ts`) and styles are in `src/index.css` and `src/App.css`.
- 3D components use `@react-three/fiber` and `@react-three/drei`. Check `src/components/Hero3D.tsx` and `src/components/Flame3D.tsx` for patterns on loading models, animation use, and performance considerations.

## Conventions & gotchas (repo-specific)

- TypeScript is permissive: `tsconfig.json` disables some strict checks (e.g., `noImplicitAny: false`). Code may rely on looser typing.
- Prefer the UI wrappers in `src/components/ui/*` to keep consistent styling and accessibility.
- React Router v6 routing is used — use `element={<Component/>}` rather than older `component` props.
- No test runner configuration or CI workflows were discovered; add tests or CI only after confirming expectations with maintainers.

## Files to inspect first (fast path)

- `package.json` — scripts & deps
- `tsconfig.json` — path alias `@/*`
- `src/main.tsx`, `src/App.tsx` — app bootstrap & providers
- `src/components/ui/*` — shared UI primitives
- `src/components/Hero3D.tsx`, `src/components/Flame3D.tsx` — 3D usage patterns
- `src/pages/Index.tsx` — home page composition

## When editing / adding features

- Use `pnpm` for installs and tasks.
- Reuse UI primitives for consistency and accessibility.
- When adding data fetching, use React Query hooks and register new query keys centrally.
- If you add global state, prefer `zustand` stores placed under `src/hooks` or `src/lib`.

If anything in this summary is unclear or you want the instructions expanded (examples of common code transforms, preferred commit message style, or where to put new tests), tell me which part and I will update this file.
