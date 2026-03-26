import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { AppState, Provider, QueueEntry } from '@/types'
import { providers as seedProviders } from '@/data/providers'

interface QueueContextValue {
  providers: Provider[]
  myQueue: QueueEntry | null
  joinQueue: (providerId: string) => void
  leaveQueue: () => void
  getCurrentProvider: (id: string) => Provider | undefined
}

const QueueContext = createContext<QueueContextValue | null>(null)

export function QueueProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    providers: seedProviders,
    myQueue: null,
  })

  // Private — only called by the 8-second interval.
  // Uses functional setState so it never closes over stale state,
  // making it safe to capture at mount time with [] deps.
  function advanceQueue() {
    setState((prev) => {
      if (prev.myQueue === null) return prev
      const { providerId } = prev.myQueue
      return {
        ...prev,
        providers: prev.providers.map((p) =>
          p.id === providerId
            ? { ...p, currentServing: p.currentServing + 1 }
            : p
        ),
      }
    })
  }

  useEffect(() => {
    const intervalId = setInterval(advanceQueue, 8000)
    return () => clearInterval(intervalId)
  }, [])

  function joinQueue(providerId: string) {
    setState((prev) => {
      if (prev.myQueue !== null) return prev
      const provider = prev.providers.find((p) => p.id === providerId)
      if (provider === undefined) return prev

      const queueNumber =
        provider.currentServing + provider.totalInQueue + 1

      const myQueue: QueueEntry = {
        providerId,
        queueNumber,
        timestamp: Date.now(),
      }

      return {
        providers: prev.providers.map((p) =>
          p.id === providerId
            ? { ...p, totalInQueue: p.totalInQueue + 1 }
            : p
        ),
        myQueue,
      }
    })
  }

  function leaveQueue() {
    setState((prev) => {
      if (prev.myQueue === null) return prev
      const { providerId } = prev.myQueue
      return {
        providers: prev.providers.map((p) =>
          p.id === providerId
            ? { ...p, totalInQueue: Math.max(0, p.totalInQueue - 1) }
            : p
        ),
        myQueue: null,
      }
    })
  }

  function getCurrentProvider(id: string): Provider | undefined {
    return state.providers.find((p) => p.id === id)
  }

  const value: QueueContextValue = {
    providers: state.providers,
    myQueue: state.myQueue,
    joinQueue,
    leaveQueue,
    getCurrentProvider,
  }

  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useQueueContext(): QueueContextValue {
  const ctx = useContext(QueueContext)
  if (ctx === null) {
    throw new Error(
      'useQueueContext must be used within a QueueProvider. ' +
        'Wrap your component tree with <QueueProvider>.'
    )
  }
  return ctx
}
