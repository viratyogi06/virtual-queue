# Current TODO — Sprint 5: Polish & Ship

## ✅ Completed: TUS-01 — Project Scaffolding (5 pts)

## ✅ Completed: TUS-02 — Core Types & Seed Data (3 pts)

## ✅ Completed: TUS-03 — QueueContext (5 pts)

## ✅ Completed: TUS-04 — Base UI Component Library (5 pts)
- [x] `src/components/ui/Button.tsx` — variants (primary/secondary/danger), sizes (sm/md/lg), full-width, disabled
- [x] `src/components/ui/Card.tsx` — rounded, shadow, padding, optional header/footer
- [x] `src/components/ui/Input.tsx` — label, placeholder, onChange, optional icon
- [x] `src/components/ui/Badge.tsx` — color variants (blue/green/amber/red/gray)
- [x] `src/components/ui/ProgressBar.tsx` — percentage fill, color prop, animated transitions
- [x] `src/components/ui/index.ts` — barrel export
- [x] All components: accept className prop, focus-visible states, 44px min tap targets, mobile-responsive

## ✅ Completed: TUS-05 — Landing Page with Provider Search (5 pts)
- [x] `src/pages/Home.tsx` — blue header (branding + tagline), two-tab nav (Search default active + Scan QR) with inline SVG icons
- [x] `src/components/ProviderCard.tsx` — emoji avatar circle, name (truncated), specialty Badge (gray), queue count + wait estimate row
- [x] Real-time search filtering (name + specialty, case-insensitive) via local `searchQuery` state
- [x] Empty state: 🔍 icon + "No providers found" + "Try a different search term"
- [x] Tap ProviderCard → `navigate('/provider/:id')`

## ✅ Completed: TUS-06 — QR Scanner & Manual Code Entry (5 pts)
- [x] `src/components/QRScanner.tsx` — `h-56` gray rounded placeholder, 4 CSS corner brackets (white `border-2`, 2-sides each), 48×48 camera SVG, instruction text
- [x] Manual code entry: `<form onSubmit>` wrapping `Input` (flex-1) + `Button type="submit"` — Enter key and Go button both trigger submit
- [x] Valid code (matching provider ID) → `navigate('/provider/:id')` via `handleScan` in Home.tsx
- [x] Invalid code → `window.alert(...)`, input field NOT cleared
- [x] Updated `src/pages/Home.tsx` — replaced scan tab placeholder with `<QRScanner onScan={handleScan} />`

## ✅ Completed: TUS-07 — Provider Detail Page (5 pts)
- [x] `src/pages/ProviderDetail.tsx` — full implementation replacing placeholder; extracts `:id` via `useParams<{ id: string }>()`
- [x] Back button (`←`) → `navigate('/')`, `min-h-[44px]` tap target, focus-visible ring, left-aligned in white header bar
- [x] Provider Hero card: `w-24 h-24 rounded-full bg-blue-50` avatar circle with `text-6xl` emoji, name `text-2xl font-bold`, gray `Badge` for specialty
- [x] Current Status card: 2-column grid — "Now Serving" + "People in Queue" gray `Badge`s in `bg-gray-50` tiles
- [x] "If You Join Now" preview: blue `Badge` for projected number (`currentServing + totalInQueue + 1`), amber `Badge` for estimated wait (`totalInQueue × averageWaitTime`), avg service time footnote
- [x] Provider not found (invalid/missing `:id`) → error `Card` with 🔍 icon + "Provider not found" message + "Go Home" primary button

## ✅ Completed: TUS-08 — Queue Joining Logic (5 pts)
- [x] `handleJoin` → `joinQueue(id!)` then `navigate('/queue/${id}')` — wires to existing context action
- [x] `handleLeave` → `leaveQueue()` — stays on page, no confirmation dialog (ADR-007)
- [x] Green banner (`bg-green-50 border-green-200`) shown when `isInThisQueue` — displays `myQueue.queueNumber`, "View Queue Status" primary button, "Leave Queue" danger button
- [x] Join Queue button (`size="lg"` full-width primary) shown only when `!isInAnyQueue`
- [x] User in a different queue → Join hidden, no green banner, detail visible normally

## ✅ Completed: TUS-09 — Live Queue Tracking Page (8 pts)
- [x] `src/services/queueCalculator.ts` — 5 pure named exports: `calculatePeopleAhead`, `calculateProgress`, `calculateEstimatedWait`, `isNext`, `isReady`
- [x] `src/components/QueueStatusDisplay.tsx` — `grid-cols-2` tile pair: gray "Now Serving" + blue "Your Number #X", `text-4xl font-bold` numbers
- [x] `src/components/ProgressCard.tsx` — progress % label, `ProgressBar color="blue"`, people ahead count, amber est. wait (green "Almost your turn!" when 0)
- [x] `src/pages/Queue.tsx` — replaced placeholder; mount validation (`useEffect` → `navigate('/', { replace: true })` on invalid state); null-render guard; derived values inline from context; "← Leave Queue" header; yellow "You're next!" banner when `isNext`; "Keep this page open" instruction text

## ✅ Completed: TUS-10 — Multi-Modal Notification System (5 pts)
- [x] `src/utils/sound.ts` — `playBuzzer()`: 3 square-wave oscillators at 800Hz, 0.3 gain, 0.15s each, spaced at 0.0s / 0.2s / 0.4s via `AudioContext`
- [x] `src/services/notificationService.ts` — `triggerNotification(onVisual)`: calls `playBuzzer()`, `navigator.vibrate([200,100,200,100,200])` (feature-guarded), then `onVisual()`
- [x] `src/hooks/useNotifications.ts` — `useNotifications(currentServing, queueNumber)`: `useRef` guard (`hasTriggered`) fires once when `isReady` becomes true; returns `{ ready: boolean }`
- [x] `src/components/ReadyScreen.tsx` — `fixed inset-0` green gradient (`from-green-400 to-green-600`), `animate-pulse` ✅ checkmark, "You're Ready!" heading, "Please proceed to the service area" text, `z-50`
- [x] Haptic: `navigator.vibrate([200,100,200,100,200])` with `'vibrate' in navigator` feature detection
- [x] `useRef` flag (`hasTriggered`) prevents re-triggering across renders
- [x] **Bug fix:** "You're next!" yellow banner condition changed from `{next && (` to `{next && !ready && (` so it disappears when `ReadyScreen` takes over

## ✅ Completed: TUS-11 — Queue Exit Flow (3 pts) — Verification only
- [x] Leave from Provider Detail: red "Leave Queue" button (`ProviderDetail.tsx:131`) calls `leaveQueue()`, re-renders page to Join state
- [x] Leave from Queue Tracking: "← Leave Queue" header button (`Queue.tsx:47`) calls `leaveQueue()` + `navigate('/', { replace: true })`
- [x] No confirmation dialog (ADR-007)
- [x] `totalInQueue` decrements (min 0) via `Math.max(0, p.totalInQueue - 1)`, `myQueue` → null (`QueueContext.tsx:71`)
- [x] Home page reflects updated queue counts — `providers` from context re-renders `ProviderCard`s

## ✅ Completed: TUS-12 — Error Handling & Edge Cases (4 pts)
- [x] `src/services/validationService.ts` — 3 pure type-guard exports: `isValidProviderId`, `hasActiveQueue`, `queueMatchesProvider` — no React, no DOM, unit-testable
- [x] `src/components/ui/Toast.tsx` — `success`/`error` variants; `fixed bottom-4` positioning; optional dismiss button (44px tap target); `role="alert"`; added to `ui/index.ts` barrel export
- [x] `/provider/invalid-id` → "Provider not found" + Go Home button (`ProviderDetail.tsx:43`) — verified working
- [x] `/queue/:id` without active entry → silent redirect to `/` (`Queue.tsx:23`) — verified working
- [x] Invalid QR/manual code → `window.alert`, input retained (`Home.tsx:16`) — verified working

## Active Task: TUS-13 — Final Polish & Deployment (3 pts)
- [ ] Responsive audit: 375px, 768px, 1024px
- [ ] All tap targets ≥ 44×44px
- [ ] Color coding consistency (blue/green/yellow/gray/red)
- [ ] Custom CSS animations (pulse for ready screen)
- [ ] Favicon + meta tags (PWA-ready)
- [ ] Lazy route loading with `React.lazy` + `Suspense`
- [ ] `vercel.json` with SPA rewrites
- [ ] Production build: no warnings, <200KB gzipped
- [ ] Deploy to Vercel, verify deep linking
- [ ] Lighthouse mobile score > 90

## Blocked
- Nothing currently blocked
