# Current TODO — Sprint 2: Discovery Pages

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

## Active Task: TUS-06 — QR Scanner & Manual Code Entry (5 pts)
- [ ] QRScanner.tsx — camera placeholder, corner brackets, instructions
- [ ] Manual code entry: input + Go button
- [ ] Valid code → navigate to `/provider/:id`
- [ ] Invalid code → alert, input retained

## Blocked
- Nothing currently blocked
