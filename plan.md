# Virtual Queue - Implementation Plan

## Sprint 1: Foundation (Week 1-2) — 13 points

### TUS-01: Project Scaffolding & Configuration (5 pts)
- [x] Initialize Vite project with `react-ts` template
- [x] Install dependencies: `react-router-dom@7`, `@supabase/supabase-js`
- [x] Install dev dependencies: `tailwindcss`, `@tailwindcss/vite`, `@types/react`, `@types/react-dom`, `eslint`, `prettier`
- [x] Configure `vite.config.ts` with Tailwind plugin + path aliases (`@/*` → `./src/*`)
- [x] Configure `tsconfig.json` with strict mode + matching path aliases
- [x] Set up `src/index.css` with `@import "tailwindcss"`
- [x] Create `.env` with placeholder Supabase variables
- [x] Set up ESLint + Prettier configs
- [x] Create full folder structure: `src/{api,types,services,hooks,context,components/ui,pages,utils,data}`
- [x] Configure React Router v7 in `App.tsx` with 3 routes (/, /provider/:id, /queue/:id)
- [x] Add placeholder page components for each route
- [x] Verify: `npm run dev` starts, all routes resolve, Tailwind works, TS compiles

### TUS-02: Core Types & Seed Data (3 pts)
- [x] Create `src/types/provider.ts` — Provider interface (7 fields)
- [x] Create `src/types/queue.ts` — QueueEntry interface, AppState interface
- [x] Create `src/types/index.ts` — barrel export
- [x] Create `src/data/providers.ts` — 5+ diverse seed providers (healthcare, barber, etc.)
- [x] Verify: all types importable via `@/types`, seed data passes TS validation

### TUS-03: Global State Management — QueueContext (5 pts)
- [x] Create `src/context/QueueContext.tsx` with QueueProvider + useQueueContext hook
- [x] State: `providers: Provider[]`, `myQueue: QueueEntry | null`
- [x] Initialize from seed data on mount
- [x] Implement `joinQueue(providerId)` — calculate number, increment count, store entry
- [x] Implement `leaveQueue()` — decrement count (min 0), clear myQueue
- [x] Implement `advanceQueue()` — increment currentServing for active provider
- [x] Implement `getCurrentProvider(id)` — lookup by ID
- [x] Add 8-second setInterval for simulated queue progression
- [x] Clean up interval on unmount
- [x] useQueueContext throws if used outside QueueProvider
- [x] Wrap App router with QueueProvider

## Sprint 2: Discovery Pages (Week 3-4) — 15 points

### TUS-04: Base UI Component Library (5 pts)
- [ ] `src/components/ui/Button.tsx` — variants (primary/secondary/danger), sizes (sm/md/lg), full-width, disabled
- [ ] `src/components/ui/Card.tsx` — rounded, shadow, padding, optional header/footer
- [ ] `src/components/ui/Input.tsx` — label, placeholder, onChange, optional icon
- [ ] `src/components/ui/Badge.tsx` — color variants (blue/green/amber/red/gray)
- [ ] `src/components/ui/ProgressBar.tsx` — percentage fill, color prop, animated transitions
- [ ] `src/components/ui/index.ts` — barrel export
- [ ] All components: accept className prop, focus-visible states, 44px min tap targets, mobile-responsive

### TUS-05: Landing Page with Provider Search (5 pts)
- [ ] `src/pages/Home.tsx` — header with branding + tagline
- [ ] Two-tab navigation: Search (default active) + Scan QR (local state, no route change)
- [ ] `src/components/ProviderCard.tsx` — avatar, name, specialty badge, queue count, wait estimate
- [ ] Search input with real-time filtering (name + specialty, case-insensitive)
- [ ] Show all providers when search is empty
- [ ] Empty state: search icon + "No providers found"
- [ ] Tap ProviderCard → navigate to `/provider/:id`

### TUS-06: QR Scanner & Manual Code Entry (5 pts)
- [ ] `src/components/QRScanner.tsx` — camera placeholder (icon, corner brackets, instructions)
- [ ] Manual code entry: input + "Go" button
- [ ] Valid code → navigate to `/provider/:id`
- [ ] Invalid code → browser alert, input retained for retry
- [ ] Submit on Enter key or Go button click

## Sprint 3: Provider & Queue Join (Week 5-6) — 10 points

### TUS-07: Provider Detail Page (5 pts)
- [ ] `src/pages/ProviderDetail.tsx` — extract `:id` from URL params
- [ ] Back button → navigate to home
- [ ] Provider card: large avatar (96px), name, specialty badge
- [ ] Current status: Now Serving number + People in Queue count
- [ ] "If You Join Now" preview: projected number (blue) + estimated wait (amber)
- [ ] Average service time display
- [ ] Full-width "Join Queue" button (hidden if already in queue)
- [ ] Green banner with queue number when already in THIS queue
- [ ] "View Queue Status" button → `/queue/:id`
- [ ] "Leave Queue" red button when in this queue
- [ ] Provider not found → error message + "Go Home" button

### TUS-08: Queue Joining Logic (5 pts)
- [ ] Wire Join Queue button to `joinQueue(providerId)` in context
- [ ] After join → programmatic navigate to `/queue/:providerId`
- [ ] Queue number = `currentServing + totalInQueue + 1`
- [ ] Provider `totalInQueue` incremented by 1
- [ ] QueueEntry stored with providerId, queueNumber, timestamp
- [ ] Join button hidden if already in a queue

## Sprint 4: Live Tracking & Notifications (Week 7-8) — 13 points

### TUS-09: Live Queue Tracking Page (8 pts)
- [ ] `src/pages/Queue.tsx` — validate state on mount (provider exists, myQueue matches)
- [ ] Invalid state → silent redirect to `/`
- [ ] "Leave Queue" back-arrow in header
- [ ] Provider info card (avatar, name, specialty, queue count, avg time)
- [ ] `src/components/QueueStatusDisplay.tsx` — Now Serving (gray) + Your Number (blue) tiles
- [ ] `src/components/ProgressCard.tsx` — progress %, bar, people ahead, estimated wait
- [ ] `src/services/queueCalculator.ts` — peopleAhead, progress %, estimated wait (pure functions)
- [ ] Yellow "You're next!" banner when peopleAhead === 0
- [ ] Reactive updates from context state changes
- [ ] Leave Queue → clear state + navigate to `/`

### TUS-10: Multi-Modal Notification System (5 pts)
- [ ] `src/utils/sound.ts` — playBuzzer(): 3 beeps at 800Hz, square wave, 0.15s, 0.3 gain
- [ ] `src/services/notificationService.ts` — orchestrate audio + haptic + visual in parallel
- [ ] `src/hooks/useNotifications.ts` — trigger when `currentServing >= queueNumber`
- [ ] `src/components/ReadyScreen.tsx` — green gradient, checkmark, pulse animation
- [ ] Haptic: `navigator.vibrate([200,100,200,100,200])` with feature detection
- [ ] useRef flag prevents re-triggering
- [ ] "Keep this page open" instruction text on queue page

## Sprint 5: Polish & Ship (Week 9-10) — 10 points

### TUS-11: Queue Exit Flow (3 pts)
- [ ] Leave from Provider Detail: red button, calls leaveQueue(), re-renders to Join state
- [ ] Leave from Queue Tracking: back-arrow, calls leaveQueue(), navigates to `/`
- [ ] No confirmation dialog
- [ ] `totalInQueue` decrements (min 0), `myQueue` → null
- [ ] Home page reflects updated counts

### TUS-12: Error Handling & Edge Cases (4 pts)
- [ ] `src/services/validationService.ts` — pure validation functions
- [ ] Provider not found → error message + Go Home button
- [ ] Invalid queue state → silent redirect to `/`
- [ ] Invalid QR code → alert, input retained
- [ ] `src/components/ui/Toast.tsx` — error/success variants (future-proofing)

### TUS-13: Final Polish & Deployment (3 pts)
- [ ] Responsive audit: 375px, 768px, 1024px
- [ ] All tap targets ≥ 44x44px
- [ ] Color coding consistency (blue/green/yellow/gray/red)
- [ ] Custom CSS animations (pulse for ready screen)
- [ ] Favicon + meta tags (PWA-ready)
- [ ] Lazy route loading with React.lazy + Suspense
- [ ] `vercel.json` with SPA rewrites
- [ ] Production build: no warnings, <200KB gzipped
- [ ] Deploy to Vercel, verify deep linking
- [ ] Lighthouse mobile score > 90
