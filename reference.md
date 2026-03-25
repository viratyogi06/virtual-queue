# Quick Reference

## Commands
```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Routes
```
/                  → Home (Search + QR tabs)
/provider/:id      → Provider Detail (info + join)
/queue/:id         → Queue Tracking (live updates)
```

## Key Formulas
```
queueNumber    = currentServing + totalInQueue + 1
peopleAhead    = queueNumber - currentServing - 1
progress%      = ((queueNumber - peopleAhead) / queueNumber) × 100
estimatedWait  = peopleAhead × averageWaitTime
isReady        = currentServing >= queueNumber
isNext         = peopleAhead === 0 && !isReady
```

## Notification Trigger
```
Condition: currentServing >= myQueue.queueNumber
Audio:     3 × 800Hz square wave beeps (0.15s each, 0.3 gain)
Haptic:    navigator.vibrate([200, 100, 200, 100, 200])
Visual:    Green gradient card with pulse animation
Guard:     useRef flag — fires exactly once
```

## Import Aliases
```typescript
import { Provider } from '@/types';
import { Button, Card } from '@/components/ui';
import { useQueueContext } from '@/context/QueueContext';
import { calculateProgress } from '@/services/queueCalculator';
```

## Seed Providers (for testing manual code entry)
Provider IDs are simple strings: "1", "2", "3", "4", "5"
