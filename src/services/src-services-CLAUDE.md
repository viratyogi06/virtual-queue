# Services Directory Rules

This directory contains **pure business logic functions** — no React, no side effects, no DOM access.

## Rules
- Every function must be a pure function (same input → same output, no side effects)
- No React imports (no hooks, no context, no JSX)
- No DOM APIs (those go in utils/)
- No Supabase/API calls (those go in api/)
- All functions must be independently unit-testable
- Export named functions, not default exports

## Files
- `queueCalculator.ts` — Queue math: peopleAhead, progress %, estimated wait time
- `notificationService.ts` — Orchestrates notification channels (audio, haptic, visual)
- `validationService.ts` — Pure validation functions for queue state

## Queue Calculator Formulas
- `peopleAhead = queueNumber - currentServing - 1`
- `progress = ((queueNumber - peopleAhead) / queueNumber) * 100`
- `estimatedWait = peopleAhead * averageWaitTime`
