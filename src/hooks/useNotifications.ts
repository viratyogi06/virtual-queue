import { useEffect, useRef, useState } from 'react'
import { isReady } from '@/services/queueCalculator'
import { triggerNotification } from '@/services/notificationService'

export function useNotifications(
  currentServing: number,
  queueNumber: number,
): { ready: boolean } {
  const hasTriggered = useRef(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!hasTriggered.current && isReady(currentServing, queueNumber)) {
      hasTriggered.current = true
      triggerNotification(() => setReady(true))
    }
  }, [currentServing, queueNumber])

  return { ready }
}
