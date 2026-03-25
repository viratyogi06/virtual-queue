# Architecture Decisions

This file records key architectural decisions made for the Virtual Queue Application.
Reference this when questioning technology choices during development.

## ADR-001: React + Vite over Next.js
**Decision:** Use Vite as the build tool with React, not Next.js.
**Reason:** This is a client-heavy SPA with no SEO requirements. Vite produces a clean client-side bundle that deploys anywhere and translates directly to React Native later. Next.js would add server-side rendering complexity and server dependencies that complicate the planned mobile transition.

## ADR-002: Supabase over Firebase (Production)
**Decision:** Use Supabase (Postgres) for the production backend.
**Reason:** Queue data is relational with structured ordering — Postgres handles this natively with SQL. Firebase Firestore (NoSQL) would require denormalization and complex queries for queue ordering. Supabase also provides Row Level Security that maps cleanly to provider/customer roles.

## ADR-003: Tailwind CSS over Component Libraries
**Decision:** Use Tailwind CSS utility classes, not MUI/Chakra/shadcn.
**Reason:** The app has a custom UI design per the BRD. Component libraries add weight and opinionated styling that's harder to customize. Tailwind gives precise control and is mobile-first by default.

## ADR-004: React Context over Redux/Zustand
**Decision:** Use React Context + custom hooks for state management.
**Reason:** MVP has a small state surface (provider list + single active queue entry). Context handles this cleanly. When Supabase is integrated, real-time subscriptions handle state sync, further reducing the need for external state libraries. Re-evaluate if state complexity grows.

## ADR-005: Local State for MVP
**Decision:** MVP uses browser-local state with simulated queue progression (8s interval).
**Reason:** Allows rapid prototyping without backend dependency. Architecture is designed so the mock data layer can be swapped for Supabase with no changes to components or hooks — only the API layer changes.

## ADR-006: Single Queue Constraint
**Decision:** Users can only be in one queue at a time in MVP.
**Reason:** Simplifies state management and UI. Multi-queue support is planned for a future phase.

## ADR-007: No Confirmation on Queue Exit
**Decision:** Queue exit is instant with no confirmation dialog.
**Reason:** BRD specifies "trust user intent." A confirmation dialog adds friction to a simple action. The user can always rejoin.

## ADR-008: Path Aliases
**Decision:** Use `@/*` path aliases mapping to `./src/*`.
**Reason:** Cleaner imports (`@/types/provider` vs `../../types/provider`). Configured in both `tsconfig.json` and `vite.config.ts`.

## ADR-009: Mobile-First, Platform-Agnostic Logic
**Decision:** All non-UI code (types, API, services, hooks) must be reusable across React web and React Native.
**Reason:** Mobile app is on the roadmap. This architecture maximizes code reuse (~60%) when that transition happens.
