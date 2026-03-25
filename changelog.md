# Changelog

---

## [TUS-01] Project Scaffolding & Configuration — 2026-03-25

### Completed
- [x] Initialized Vite project with `react-ts` template (done manually — all template files written directly to avoid interactive CLI prompts)
- [x] Installed dependencies: `react-router-dom@7`, `@supabase/supabase-js`
- [x] Installed dev dependencies: `tailwindcss`, `@tailwindcss/vite`, `prettier`, `eslint-config-prettier`
- [x] Configured `vite.config.ts` — Tailwind plugin + `@/*` path alias
- [x] Configured `tsconfig.app.json` — strict mode + matching path aliases (`@/*` → `./src/*`)
- [x] Set up `src/index.css` with `@import "tailwindcss"`
- [x] Created `.env` with placeholder Supabase variables
- [x] Set up ESLint (flat config) + Prettier — configured together via `eslint-config-prettier`
- [x] Created full folder structure: `src/{api,types,services,hooks,context,components/ui,pages,utils,data}`
- [x] Configured React Router v7 in `App.tsx` using `createBrowserRouter` (data mode) with 3 routes
- [x] Created placeholder page components: `Home.tsx`, `ProviderDetail.tsx`, `Queue.tsx`

### Verification
- [x] `npm run build` — zero TypeScript errors, zero warnings
- [x] `npm run lint` — zero ESLint errors
- [x] Bundle: 234KB JS / 8KB CSS (gzipped: 76KB / 2.4KB)
- [x] All 3 routes resolve (`/`, `/provider/:id`, `/queue/:id`)
- [x] Tailwind utility classes render correctly
- [x] Path alias `@/` resolves

### Notes for User
> **Action required before going to production:**
>
> 1. **Supabase credentials** — `.env` currently has placeholder values. Replace with real credentials from your Supabase project dashboard:
>    ```
>    VITE_SUPABASE_URL=https://your-project-id.supabase.co
>    VITE_SUPABASE_ANON_KEY=your-real-anon-key
>    ```
>    `.env` is git-ignored — never commit real keys.
>
> 2. **`public/` folder** — no favicon yet. A real `favicon.ico` / `vite.svg` replacement is tracked under TUS-13.

---

## [TUS-03] Global State Management — QueueContext — 2026-03-25

### Completed
- [x] Created `src/context/QueueContext.tsx` — `QueueProvider` component + `useQueueContext` hook
- [x] Internal state uses single `useState<AppState>` (`providers: Provider[]`, `myQueue: QueueEntry | null`)
- [x] Initialized `providers` from seed data (`src/data/providers.ts`) on mount
- [x] Implemented `joinQueue(providerId)` — calculates `queueNumber = currentServing + totalInQueue + 1`, increments `totalInQueue`, stores `QueueEntry`; no-op if already in a queue
- [x] Implemented `leaveQueue()` — decrements `totalInQueue` (min 0 via `Math.max`), clears `myQueue`
- [x] Implemented `advanceQueue()` — private, increments `currentServing` for active provider; no-op if `myQueue === null`
- [x] Implemented `getCurrentProvider(id)` — linear scan returning `Provider | undefined`
- [x] 8-second `setInterval` calls `advanceQueue`; all mutations use `setState(prev => ...)` to avoid stale closures
- [x] Interval cleaned up via `useEffect` return — correctly handles React 18 StrictMode double-mount
- [x] `useQueueContext()` throws descriptive error if called outside `QueueProvider`
- [x] Updated `src/App.tsx` — `RouterProvider` wrapped with `QueueProvider`

### Verification
- [x] `npx tsc --noEmit` — zero errors
- [x] `npm run lint` — zero errors, zero warnings

---

## [TUS-02] Core TypeScript Types & Seed Data — 2026-03-25

### Completed
- [x] Created `src/types/provider.ts` — Provider interface with 7 fields (id, name, specialty, avatar, currentServing, totalInQueue, averageWaitTime)
- [x] Created `src/types/queue.ts` — QueueEntry interface (providerId, queueNumber, timestamp) + AppState interface (providers: Provider[], myQueue: QueueEntry | null)
- [x] Created `src/types/index.ts` — barrel export for all 3 interfaces
- [x] Created `src/data/providers.ts` — 5 seed providers (clinic 🏥, barbershop ✂️, dental 🦷, spa 💆, government 🏛️) with emoji avatars and numeric string IDs ("1"–"5")

### Verification
- [x] `npx tsc --noEmit` — zero errors
- [x] All types importable via `@/types` path alias
- [x] Seed data satisfies `Provider[]` type constraint at compile time

---

<!-- New entries go above this line, newest first -->
