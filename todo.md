# Current TODO — Sprint 4: Live Tracking & Notifications

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

## Active Task: TUS-10 — Multi-Modal Notification System (5 pts)
- [ ] `src/utils/sound.ts` — `playBuzzer()`: 3 beeps at 800Hz, square wave, 0.15s each, 0.3 gain
- [ ] `src/services/notificationService.ts` — orchestrate audio + haptic + visual in parallel
- [ ] `src/hooks/useNotifications.ts` — trigger when `currentServing >= queueNumber`
- [ ] `src/components/ReadyScreen.tsx` — green gradient, checkmark, pulse animation
- [ ] Haptic: `navigator.vibrate([200,100,200,100,200])` with feature detection
- [ ] `useRef` flag prevents re-triggering

## Blocked
- Nothing currently blocked
