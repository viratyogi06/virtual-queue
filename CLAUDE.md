# Virtual Queue Application

## Project Overview
A web-based, mobile-first virtual queue platform that lets customers join queues remotely, track position in real-time, and receive multi-modal notifications when their turn arrives. Targets service-based businesses (healthcare, salons, professional services, retail).

**Core Value Proposition:** "Book your spot in seconds"

## Tech Stack
- **Language:** TypeScript 5.x (strict mode, no `any` types)
- **UI Framework:** React 18+
- **Build Tool:** Vite 6.x with `@tailwindcss/vite` plugin
- **Routing:** React Router v7 (data mode)
- **Styling:** Tailwind CSS 4.x (utility-first, mobile-first)
- **State Management:** React Context + Hooks (no Redux/Zustand for MVP)
- **Backend (MVP):** Local state with mock data, simulated queue progression (8-second intervals)
- **Backend (Production):** Supabase (Postgres, Realtime, Auth, Edge Functions)
- **Hosting:** Vercel
- **Package Manager:** npm 10+

## Architecture
Layered architecture with strict separation of concerns:

```
Types Layer     → src/types/         (shared interfaces - platform agnostic)
API Layer       → src/api/           (data access - platform agnostic)
Service Layer   → src/services/      (business logic, pure functions - platform agnostic)
Hook Layer      → src/hooks/         (React hooks wrapping services)
Context Layer   → src/context/       (global state provider)
Component Layer → src/components/    (reusable UI - platform specific)
Page Layer      → src/pages/         (route-level components - platform specific)
```

Bottom 4 layers MUST be reusable for React Native migration.

## Project Structure
```
src/
├── api/                  # Supabase client + data operations
├── types/                # TypeScript interfaces (Provider, QueueEntry, AppState)
├── services/             # Pure business logic (queueCalculator, notificationService, validationService)
├── hooks/                # Custom hooks (useProviders, useQueue, useNotifications)
├── context/              # QueueContext (global state)
├── components/
│   ├── ui/               # Base components (Button, Card, Input, Badge, ProgressBar)
│   ├── ProviderCard.tsx
│   ├── QueueStatusDisplay.tsx
│   ├── ProgressCard.tsx
│   ├── QRScanner.tsx
│   └── ReadyScreen.tsx
├── pages/
│   ├── Home.tsx          # Landing page with Search + QR tabs
│   ├── ProviderDetail.tsx # Provider info + join queue
│   └── Queue.tsx         # Live queue tracking
├── utils/
│   └── sound.ts          # Web Audio API buzzer
├── data/
│   └── providers.ts      # Seed data (MVP only)
├── App.tsx               # Root with RouterProvider + QueueProvider
├── main.tsx              # Entry point
└── index.css             # Tailwind directives + globals
```

## Routes
| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home.tsx | Landing page with Search + QR tabs |
| `/provider/:id` | ProviderDetail.tsx | Provider info, queue preview, join/leave |
| `/queue/:id` | Queue.tsx | Live queue tracking + notifications |

## Core Data Models

### Provider
```typescript
interface Provider {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  currentServing: number;
  totalInQueue: number;
  averageWaitTime: number;
}
```

### QueueEntry
```typescript
interface QueueEntry {
  providerId: string;
  queueNumber: number;
  timestamp: number;
}
```

## Business Rules
- User can only be in ONE queue at a time (MVP)
- Queue number formula: `currentServing + totalInQueue + 1`
- Leaving a queue does NOT reassign numbers
- "You're Ready" triggers when `currentServing >= userQueueNumber`
- Estimated wait = `peopleAhead × averageWaitTime`
- No confirmation dialog on queue exit (trust user intent)
- MVP simulates queue progression every 8 seconds via setInterval

## Code Style & Conventions
- TypeScript strict mode — no `any` types, no `@ts-ignore`
- Functional components with hooks only — no class components
- 2-space indentation
- camelCase for variables/functions, PascalCase for components/interfaces
- All business logic goes in `src/services/` as pure functions
- All queue math in `queueCalculator.ts`, not in components
- Barrel exports via `index.ts` in types/ and components/ui/
- Path aliases: `@/*` maps to `./src/*`
- All interactive elements must be minimum 44x44px tap targets
- Mobile-first responsive: design for 375px first, then 768px, then 1024px

## Color Coding
- **Blue:** User's queue number, primary actions
- **Green:** Ready state, success, confirmation banners
- **Yellow/Amber:** "You're next" warning, estimated wait
- **Gray:** Neutral info (Now Serving number)
- **Red:** Danger actions (Leave Queue)

## Notification System (MVP)
- **Audio:** 3 beeps at 800Hz, square wave, 0.15s each, 0.3 gain, spaced at 0.0s/0.2s/0.4s
- **Haptic:** `navigator.vibrate([200, 100, 200, 100, 200])` with feature detection
- **Visual:** Green gradient "You're Ready!" card with CSS pulse animation
- Fires exactly ONCE per session (useRef flag)

## Don't Do This
- Don't use class components
- Don't use Redux, Zustand, or any external state management
- Don't use `WidthType.PERCENTAGE` in any table styling
- Don't put business logic in components — extract to services
- Don't use inline styles — use Tailwind utilities
- Don't use `any` type — define proper interfaces
- Don't use `localStorage` or `sessionStorage` for queue state in MVP
- Don't add confirmation dialogs for queue exit
- Don't use heavy component libraries (MUI, Chakra) — Tailwind only
- Don't use Next.js — this is a client-side SPA with Vite
- Don't put queue calculations in component files

## Testing Notes
- Validation functions in `validationService.ts` should be pure and unit-testable
- Queue calculator functions should be pure and unit-testable
- Notification service should gracefully degrade (no haptic on desktop, no audio in background tab)

## MVP Limitations (Known, Acceptable)
- Queue data is browser-local, not shared across devices
- Queue advances every 8 seconds (simulation)
- No authentication
- Data lost on page refresh
- Notifications require active browser tab
- Single queue only per user
