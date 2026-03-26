# Changelog

---

## [TUS-06] QR Scanner & Manual Code Entry — 2026-03-26

### Completed
- [x] Created `src/components/QRScanner.tsx` — `QRScannerProps { onScan: (code: string) => void }` as the only prop; local `useState<string>('')` for the input field
- [x] Camera placeholder: `h-56 rounded-2xl bg-gray-200` container with `overflow-hidden`; 4 absolutely-positioned corner bracket `<div>`s (`w-6 h-6`, `border-2 border-white`, 2-border-side each, `m-3` inset); 48×48 camera SVG icon + "Point your camera at a QR code" instruction text
- [x] Manual entry: `<Card padding="md">` with "Or enter a code manually" label; `<form onSubmit={handleSubmit}>` wrapping `flex gap-2` row — `<Input className="flex-1" />` + `<Button type="submit" size="sm">Go</Button>`; Enter key handled via form submit (not `onKeyDown`) so mobile soft-keyboard "Go" key also triggers submission
- [x] Input never self-clears — on invalid the parent alerts and the field stays populated; on valid, navigation unmounts the component
- [x] Updated `src/pages/Home.tsx` — added `handleScan` function: `providers.find(p => p.id === code.trim())` → `navigate('/provider/:id')` on match, `window.alert(...)` on miss; replaced 5-line emoji placeholder in scan tab with `<QRScanner onScan={handleScan} />`; no new hooks needed (`providers` + `navigate` already in scope)

### Verification
- [x] Scan tab renders camera placeholder + manual entry card
- [x] Code `1` + Enter → navigates to `/provider/1`
- [x] Code `1` + Go click → navigates to `/provider/1`
- [x] Code `999` + Enter → `window.alert`, field retains `999`
- [x] Empty field + Go → no-op (no alert, no navigation)
- [x] All tap targets ≥ 44px (`Input min-h-[44px]`, `Button size="sm"` = `h-11`)

### Notes
> Validation lives in Home.tsx (not inside QRScanner) so the component stays a pure UI collector, decoupled from provider data. `<form onSubmit>` is used instead of `onKeyDown` because the existing `Input` component does not expose a `onKeyDown` prop — the form approach also handles mobile virtual keyboard submission natively.

---

## [TUS-05] Landing Page with Provider Search — 2026-03-26

### Completed
- [x] Created `src/pages/Home.tsx` — `bg-blue-600` header with "Virtual Queue" h1 + "Book your spot in seconds" tagline; replaces placeholder
- [x] Two-tab bar (Search default active, Scan QR) using `useState<'search' | 'scan'>` local state; active tab shows `border-b-2 border-blue-600`; each tab has inline SVG icon + `min-h-[44px]`
- [x] Search tab: `Input` component with magnifying glass SVG icon; filters `providers` from `useQueueContext()` live on every keystroke (name + specialty, case-insensitive)
- [x] All 5 providers rendered as `ProviderCard` list (`space-y-3`); empty state (🔍 + "No providers found" + hint text) shown when filter yields zero results
- [x] Scan QR tab: centered placeholder (📷 + "QR Scanning" + "Coming in a future update")
- [x] Created `src/components/ProviderCard.tsx` — `<button>` wrapper with `focus-visible:ring-2 ring-blue-500`, `w-14 h-14 bg-blue-50` avatar circle, name (truncated), gray `Badge` for specialty, queue count + wait estimate row in `text-gray-500`
- [x] Tap ProviderCard → `navigate('/provider/:id')` via `useNavigate`

### Verification
- [x] `npm run build` — zero TypeScript errors, zero warnings
- [x] Bundle: 241KB JS / 17.81KB CSS (gzipped: 78KB / 4.2KB)

### Notes
> Tab SVGs are inline (no icon library added) to keep zero new dependencies. Queue count and wait estimate rows use emoji (👥 ⏱) for visual affordance without adding an icon package.

---

## [TUS-04] Base UI Component Library — 2026-03-26

### Completed
- [x] Created `src/components/ui/Button.tsx` — variants (primary/secondary/danger), sizes (sm/md/lg), fullWidth, disabled; 44px min tap target on all sizes
- [x] Created `src/components/ui/Card.tsx` — `bg-white rounded-2xl shadow-md`, optional header/footer with `border-b`/`border-t` dividers, padding prop (none/sm/md/lg)
- [x] Created `src/components/ui/Input.tsx` — optional label, left-side icon slot (adds `pl-10`), `onChange` passes string value directly (not raw event), min-h-[44px]
- [x] Created `src/components/ui/Badge.tsx` — 5 color variants (blue/green/amber/red/gray) mapped to bg+text pairs per color system
- [x] Created `src/components/ui/ProgressBar.tsx` — percentage clamped 0–100, 4 fill colors, `transition-all duration-500 ease-out` animated fill
- [x] Created `src/components/ui/index.ts` — barrel export for all 5 components + their prop interfaces
- [x] All components: `className` prop, `focus-visible:ring-2` states, Tailwind utilities only, strict TypeScript (no `any`)

### Verification
- [x] `npm run build` — zero TypeScript errors, zero warnings
- [x] Bundle: 236KB JS / 16KB CSS (gzipped: 77KB / 3.8KB)

### Notes
> `ProgressBar` uses a single `style={{ width: '${n}%' }}` for the runtime fill value — Tailwind cannot generate arbitrary percentages at build time. All other styling is Tailwind utilities.

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
