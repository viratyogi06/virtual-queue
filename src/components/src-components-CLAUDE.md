# Components Directory Rules

## UI Components (`ui/`)
Base reusable components. These are platform-specific and will be rebuilt for React Native.

### Rules
- Every component must accept a `className` prop for style extension
- All interactive elements: minimum 44x44px tap targets
- All interactive elements: visible focus-visible states
- Use Tailwind utility classes only — no inline styles, no CSS modules
- Mobile-first responsive design (375px base)
- Functional components with hooks only
- No business logic — delegate to services/hooks

### Color System
- Primary actions: blue (`bg-blue-600`, `text-blue-600`)
- Success/Ready: green (`bg-green-500`, `bg-gradient-to-br from-green-400 to-green-600`)
- Warning/Next: yellow/amber (`bg-yellow-100`, `text-amber-600`)
- Neutral/Info: gray (`bg-gray-100`, `text-gray-600`)
- Danger/Leave: red (`bg-red-500`, `text-red-600`)

## Feature Components (root level)
- `ProviderCard.tsx` — Used in Home page provider list
- `QueueStatusDisplay.tsx` — Now Serving / Your Number tile pair
- `ProgressCard.tsx` — Progress bar + stats
- `QRScanner.tsx` — QR placeholder + manual code entry
- `ReadyScreen.tsx` — Green "You're Ready!" overlay
