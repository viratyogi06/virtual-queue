# Current TODO — Sprint 1: Foundation

## ✅ Completed: TUS-01 — Project Scaffolding (5 pts)

## ✅ Completed: TUS-02 — Core Types & Seed Data (3 pts)

## ✅ Completed: TUS-03 — QueueContext (5 pts)
- [x] Created `src/context/QueueContext.tsx` — QueueProvider + useQueueContext hook
- [x] State: `providers: Provider[]`, `myQueue: QueueEntry | null` (using AppState)
- [x] Initialized providers from seed data on mount
- [x] Implemented `joinQueue(providerId)` — calculate number, increment count, store entry
- [x] Implemented `leaveQueue()` — decrement count (min 0), clear myQueue
- [x] Implemented `advanceQueue()` — private, increments currentServing for active provider
- [x] Implemented `getCurrentProvider(id)` — lookup by ID
- [x] 8-second setInterval for simulated queue progression
- [x] Interval cleanup on unmount
- [x] useQueueContext throws if used outside QueueProvider
- [x] Wrapped App router with QueueProvider in App.tsx

## Active Task: TUS-04 — Base UI Component Library (5 pts)
- [ ] `src/components/ui/Button.tsx` — variants (primary/secondary/danger), sizes (sm/md/lg), full-width, disabled
- [ ] `src/components/ui/Card.tsx` — rounded, shadow, padding, optional header/footer
- [ ] `src/components/ui/Input.tsx` — label, placeholder, onChange, optional icon
- [ ] `src/components/ui/Badge.tsx` — color variants (blue/green/amber/red/gray)
- [ ] `src/components/ui/ProgressBar.tsx` — percentage fill, color prop, animated transitions
- [ ] `src/components/ui/index.ts` — barrel export
- [ ] All components: accept className prop, focus-visible states, 44px min tap targets, mobile-responsive

## Up Next: TUS-05 — Landing Page with Provider Search (5 pts)
- [ ] Home.tsx with header, two-tab nav (Search + Scan QR)
- [ ] ProviderCard.tsx component
- [ ] Real-time search filtering
- [ ] Empty state

## Blocked
- Nothing currently blocked
