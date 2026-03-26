# Changelog

---

## [TUS-12] Error Handling & Edge Cases — 2026-03-26

### Completed
- [x] Created `src/services/validationService.ts` — 3 pure, unit-testable exports: `isValidProviderId(id)` (type guard `string | undefined → id is string`, rejects `undefined` and `''`); `hasActiveQueue(myQueue)` (type guard `QueueEntry | null → myQueue is QueueEntry`); `queueMatchesProvider(myQueue, providerId)` (equality check on `myQueue.providerId`). No React, no DOM — fully platform-agnostic per architecture rules.
- [x] Created `src/components/ui/Toast.tsx` — `ToastProps { message, variant: 'success' | 'error', onDismiss?, className? }`; `fixed bottom-4 left-4 right-4 max-w-lg mx-auto` positioning; success variant: `bg-green-50 border-green-300 text-green-800` with `✓` icon; error variant: `bg-red-50 border-red-300 text-red-800` with `✕` icon; optional dismiss button with `min-h-[44px] min-w-[44px]` tap target; `role="alert"` for accessibility. Not wired into app state — caller owns visibility.
- [x] Added `Toast` + `ToastProps` to `src/components/ui/index.ts` barrel export
- [x] **Verified** all 4 error states already functional (no fixes needed):
  - `/provider/invalid-id` → "Provider not found" card + Go Home button (`ProviderDetail.tsx:43–54`)
  - `/queue/1` without active entry → silent redirect to `/` (`Queue.tsx:23–38`)
  - Invalid QR/manual code → `window.alert`, input retained (`Home.tsx:16–23` + QRScanner never self-clears)
  - Go Home button → `navigate('/')` (`ProviderDetail.tsx:49`)

### validationService Functions
```typescript
isValidProviderId(id: string | undefined): id is string
// true if id is a non-empty string — guards getCurrentProvider calls

hasActiveQueue(myQueue: QueueEntry | null): myQueue is QueueEntry
// true if user has an active entry — narrows null away

queueMatchesProvider(myQueue: QueueEntry, providerId: string): boolean
// true if entry belongs to this provider — used in Queue.tsx validation
```

### Toast Variants
```typescript
// Success
<Toast variant="success" message="You've joined the queue!" onDismiss={() => setVisible(false)} />
// Error
<Toast variant="error" message="Something went wrong. Try again." />
```

### Notes
> `validationService.ts` extracts the exact conditions already inline in `Queue.tsx:25–30` as named, type-guarded functions. The component does not yet import from this service (no refactor needed for MVP) — the service exists so these rules are unit-testable in isolation.
> `Toast.tsx` is future-proofing for Supabase integration (TUS-14+). Caller controls mount/unmount — no internal timer or auto-dismiss — keeping the component stateless and easy to test.

---

## [TUS-11] Queue Exit Flow — 2026-03-26 (Verification)

### Verification
All acceptance criteria confirmed against existing implementation — no code changes required.

- [x] **Leave from Provider Detail** — red "Leave Queue" `<Button variant="danger">` at `ProviderDetail.tsx:131–138` calls `handleLeave()` → `leaveQueue()` (context action); `isInThisQueue` becomes `false` on next render; green banner disappears, Join Queue button re-appears. User stays on provider detail page.
- [x] **Leave from Queue Tracking** — "← Leave Queue" header button at `Queue.tsx:47–50` calls `handleLeave()` → `leaveQueue()` + `navigate('/', { replace: true })`. User lands on home page.
- [x] **No confirmation dialog** — neither handler calls `window.confirm` or renders a modal. (ADR-007 compliant)
- [x] **`totalInQueue` decrements (min 0), `myQueue` → null** — `leaveQueue()` at `QueueContext.tsx:71–84` uses `Math.max(0, p.totalInQueue - 1)` and sets `myQueue: null`.
- [x] **Home page reflects updated counts** — `Home.tsx:11` reads `providers` from `useQueueContext()`; same state object updated by `leaveQueue()`; `ProviderCard` re-renders with decremented count.

### Implementation References
- `leaveQueue()` — `src/context/QueueContext.tsx:71`
- Provider Detail leave handler — `src/pages/ProviderDetail.tsx:21`
- Queue Tracking leave handler — `src/pages/Queue.tsx:47`

---

## [TUS-10] Multi-Modal Notification System — 2026-03-26

### Completed
- [x] Created `src/utils/sound.ts` — `playBuzzer()`: creates a new `AudioContext` per call; inner `beepAt(startTime)` helper creates one `OscillatorNode` + `GainNode` pair per beep (`type = 'square'`, `frequency = 800Hz`, `gain = 0.3`, duration `0.15s`); beeps fire at `ctx.currentTime + 0.0`, `+ 0.2`, `+ 0.4`
- [x] Created `src/services/notificationService.ts` — `triggerNotification(onVisual: () => void)`: orchestrates all three modalities fire-and-forget: `playBuzzer()` (audio), `if ('vibrate' in navigator) navigator.vibrate([200, 100, 200, 100, 200])` (haptic), `onVisual()` (visual state callback)
- [x] Created `src/hooks/useNotifications.ts` — `useNotifications(currentServing, queueNumber): { ready }`: `useRef(false)` flag (`hasTriggered`) set to `true` before side effects to prevent race; `useEffect` deps `[currentServing, queueNumber]` checks `isReady` from `queueCalculator.ts`; on first true: sets `hasTriggered.current = true`, calls `triggerNotification(() => setReady(true))`; returns `{ ready: boolean }`
- [x] Created `src/components/ReadyScreen.tsx` — `fixed inset-0 z-50` full-screen overlay; `bg-gradient-to-b from-green-400 to-green-600`; `animate-pulse text-8xl` ✅ checkmark; `text-4xl font-bold text-white` "You're Ready!" heading; `text-lg text-green-100` "Please proceed to the service area." subtext
- [x] Modified `src/pages/Queue.tsx` — added `useNotifications` hook call after derived value calculations (`const { ready } = useNotifications(provider.currentServing, myQueue.queueNumber)`); added `{ready && <ReadyScreen />}` as first child of outer `div` (overlay renders above all queue UI); added imports for `useNotifications` + `ReadyScreen`
- [x] **Bug fix in `src/pages/Queue.tsx`** — "You're next!" yellow banner condition: `{next && (` → `{next && !ready && (` — banner now correctly disappears when `ReadyScreen` takes over (both `isNext` and `isReady` are true simultaneously at trigger point)

### Notification Data Flow
```
QueueContext setInterval (8s) → advanceQueue() → provider.currentServing++
  → Queue.tsx re-render → useNotifications effect
    → isReady(currentServing, queueNumber) === true
      → hasTriggered.current = true (guard set first)
        → triggerNotification(onVisual)
            ├── playBuzzer()               [audio — 3 × 800Hz square beeps]
            ├── navigator.vibrate(...)     [haptic — feature-guarded]
            └── setReady(true)             [visual — ReadyScreen overlay]
```

### useRef Guard
```typescript
const hasTriggered = useRef(false)  // useRef not useState — no extra render cycle
useEffect(() => {
  if (!hasTriggered.current && isReady(currentServing, queueNumber)) {
    hasTriggered.current = true
    triggerNotification(() => setReady(true))
  }
}, [currentServing, queueNumber])
```

### Verification
- [x] Join queue and wait for `currentServing >= queueNumber` — `ReadyScreen` green overlay appears
- [x] Yellow "You're next!" banner does NOT appear alongside `ReadyScreen`
- [x] Audio beeps fire once (3 × 800Hz, square wave) — browser audio permission required
- [x] Haptic fires on mobile — silent no-op on desktop (feature-guarded)
- [x] Subsequent `advanceQueue` ticks do NOT re-trigger notification (`useRef` guard)
- [x] Page refresh resets all state (MVP: no persistence)

### Notes
> `triggerNotification` accepts `onVisual` as a callback rather than controlling React state directly — this keeps the service layer platform-agnostic (no React imports in `notificationService.ts`), consistent with the architecture rule that bottom layers must be reusable for React Native migration.

---

## [TUS-09] Live Queue Tracking Page — 2026-03-26

### Completed
- [x] Created `src/services/queueCalculator.ts` — 5 named pure exports (no React, no DOM); formulas from `src-services-CLAUDE.md`: `calculatePeopleAhead(queueNumber, currentServing)` → `max(0, queueNumber - currentServing - 1)`; `calculateProgress(queueNumber, peopleAhead)` → `((queueNumber - peopleAhead) / queueNumber) * 100` clamped 0–100; `calculateEstimatedWait(peopleAhead, averageWaitTime)` → `peopleAhead * averageWaitTime`; `isNext(peopleAhead)` → `peopleAhead === 0`; `isReady(currentServing, queueNumber)` → `currentServing >= queueNumber` (pre-built for TUS-10)
- [x] Created `src/components/QueueStatusDisplay.tsx` — `QueueStatusDisplayProps { currentServing, queueNumber, className? }`; `grid grid-cols-2 gap-4` layout; left tile `bg-gray-100 rounded-2xl` with gray "Now Serving" label + `text-4xl font-bold text-gray-700` number; right tile `bg-blue-600 rounded-2xl` with `text-blue-200` label + `text-4xl font-bold text-white` `#N` number; both tiles `min-h-[88px]`
- [x] Created `src/components/ProgressCard.tsx` — `ProgressCardProps { progress, peopleAhead, estimatedWait, className? }`; wraps `<Card padding="md">`; `{Math.round(progress)}% there` label right-aligned; `<ProgressBar color="blue" percentage={progress} />`; bottom stat row: people ahead (gray, singular/plural) + est. wait (amber `~X min wait`, or green "Almost your turn!" when 0)
- [x] Replaced `src/pages/Queue.tsx` placeholder — `useEffect` mount validation: checks `id !== undefined`, `myQueue !== null`, `myQueue.providerId === id`, `provider !== undefined`; invalid → `navigate('/', { replace: true })`; null-render guard on same conditions for first-render safety; all derived values computed inline per render (no local state); white header with "← Leave Queue" button (`min-h-[44px]`, focus-visible ring) → `leaveQueue()` + `navigate('/', { replace: true })`; provider info card with 64px avatar, name, specialty Badge, in-queue count + avg-time chips; `<QueueStatusDisplay>` + `<ProgressCard>`; yellow `bg-yellow-50 border-yellow-300` "You're next!" banner when `isNext(peopleAhead)`; "Keep this page open" instruction text `text-xs text-gray-400`

### Derived Values Pattern
```typescript
const peopleAhead = calculatePeopleAhead(myQueue.queueNumber, provider.currentServing)
const progress    = calculateProgress(myQueue.queueNumber, peopleAhead)
const estWait     = calculateEstimatedWait(peopleAhead, provider.averageWaitTime)
const next        = isNext(peopleAhead)
```
No `useState` or `useEffect` for derived values — computed inline each render from context, which re-renders every 8 seconds via `advanceQueue()`.

### Verification
- [x] Join queue → `/queue/:id` renders with correct Now Serving + Your Number tiles
- [x] Wait 8 seconds → `currentServing` increments, `ProgressCard` updates, progress bar animates
- [x] `peopleAhead` reaches 0 → yellow "You're next!" banner appears
- [x] "← Leave Queue" → `leaveQueue()` clears context, redirects to `/`, provider queue count decrements
- [x] Navigate to `/queue/bad-id` directly (no queue) → silent redirect to `/`
- [x] Navigate to `/queue/:id` without joining → silent redirect to `/`
- [x] `npm run build` — zero TypeScript errors; bundle 252KB JS / 22.97KB CSS (gzip: 81KB / 5.06KB)

### Notes
> `isReady` is included in `queueCalculator.ts` even though TUS-09 only uses `isNext`. It belongs in the service layer as pure queue math and will be consumed by `useNotifications` in TUS-10 without any changes to the calculator file.

### Known Bug (found during manual testing)
- [ ] "You're next!" yellow banner persists when `currentServing >= queueNumber` — should be hidden when `isReady` is true. Fix scheduled in TUS-10.
---

## [TUS-07 + TUS-08] Provider Detail Page & Queue Joining Logic — 2026-03-26

### Completed
- [x] Fully implemented `src/pages/ProviderDetail.tsx` — replaced 14-line placeholder with complete page; single file covers both TUS-07 (display) and TUS-08 (queue join logic) since they are tightly coupled in one component
- [x] White header bar with `←` Back button: `navigate('/')`, `min-h-[44px]` tap target, `focus-visible:ring-2` ring, `rounded-lg` for keyboard nav
- [x] Provider Hero `<Card padding="lg">`: `w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center text-6xl` avatar, name `text-2xl font-bold text-gray-900`, gray `<Badge>` for specialty — `text-center` layout
- [x] Current Status `<Card padding="md">`: `text-xs font-semibold text-gray-500 uppercase tracking-wide` section label; 2-column `grid grid-cols-2 gap-4` with `bg-gray-50 rounded-xl p-3` tiles for "Now Serving" and "People in Queue", each with a gray `<Badge>`
- [x] "If You Join Now" `<Card padding="md">`: blue `<Badge>` showing `currentServing + totalInQueue + 1` (projected number), amber `<Badge>` showing `totalInQueue × averageWaitTime` (estimated wait in minutes), `text-xs text-gray-500` footnote for avg service time
- [x] Error state: `<Card padding="lg">` with 🔍 emoji, "Provider not found" heading, description text, full-width `<Button variant="primary">` → `navigate('/')` — shown when `getCurrentProvider(id ?? '')` returns `undefined`
- [x] `handleJoin`: calls `joinQueue(id!)` (existing context action) then `navigate('/queue/${id}')`
- [x] `handleLeave`: calls `leaveQueue()` (existing context action), stays on provider detail page — user can immediately rejoin (ADR-007: no confirmation dialog)
- [x] Green banner (`bg-green-50 border border-green-200 rounded-2xl p-4`) — conditionally rendered when `isInThisQueue && myQueue`: shows "You're in queue!" heading + Active `<Badge color="green">`, queue number, "View Queue Status" primary button → `/queue/:id`, "Leave Queue" danger button
- [x] Join Queue button (`<Button variant="primary" size="lg" fullWidth>`) — rendered only when `!isInAnyQueue`; hidden when user is in this queue OR any other queue

### State Logic
```typescript
const provider = getCurrentProvider(id ?? '')   // Provider | undefined
const isInThisQueue = myQueue?.providerId === id // shows green banner
const isInAnyQueue  = myQueue !== null           // gates Join button
```

### Verification
- [x] `/provider/1` → City Urgent Care renders; stats show 14 serving, 6 in queue, projected #21, est. ~72 min
- [x] Join Queue → navigates to `/queue/1`; back to `/provider/1` shows green banner with #21, Join button hidden
- [x] Leave Queue → banner disappears, Join button re-appears; stays on provider detail
- [x] While in queue 1, visit `/provider/2` → no green banner, no Join button
- [x] `/provider/invalid` → error card with Go Home button
- [x] `npm run build` — zero TypeScript errors; bundle 248KB JS / 22.34KB CSS (gzip: 80KB / 4.93KB)

### Notes
> TUS-07 and TUS-08 were implemented as a single atomic change to `ProviderDetail.tsx`. No new files were created — all queue math stays inline (`currentServing + totalInQueue + 1`, `totalInQueue × averageWaitTime`) because the formulas are one-liners that don't justify extracting to a service yet. The services layer (`queueCalculator.ts`) will be introduced in TUS-09 where the same formulas are needed in multiple components.

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
