import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQueueContext } from '@/context/QueueContext'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { QueueStatusDisplay } from '@/components/QueueStatusDisplay'
import { ProgressCard } from '@/components/ProgressCard'
import {
  calculatePeopleAhead,
  calculateProgress,
  calculateEstimatedWait,
  isNext,
} from '@/services/queueCalculator'

export default function Queue() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { myQueue, leaveQueue, getCurrentProvider } = useQueueContext()

  // Validate state on mount — silent redirect if invalid
  useEffect(() => {
    const provider = getCurrentProvider(id ?? '')
    const valid =
      id !== undefined &&
      myQueue !== null &&
      myQueue.providerId === id &&
      provider !== undefined
    if (!valid) navigate('/', { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const provider = getCurrentProvider(id ?? '')

  // Guard: while validation effect runs (or on invalid state before redirect)
  if (!provider || !myQueue || myQueue.providerId !== id) {
    return null
  }

  const peopleAhead = calculatePeopleAhead(myQueue.queueNumber, provider.currentServing)
  const progress = calculateProgress(myQueue.queueNumber, peopleAhead)
  const estWait = calculateEstimatedWait(peopleAhead, provider.averageWaitTime)
  const next = isNext(peopleAhead)

  const handleLeave = () => {
    leaveQueue()
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center">
          <button
            onClick={handleLeave}
            className="inline-flex items-center gap-1 text-blue-600 font-medium min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
          >
            <span className="text-xl">←</span>
            <span>Leave Queue</span>
          </button>
          <h1 className="flex-1 text-center text-base font-semibold text-gray-900 pr-[100px]">
            Queue Tracker
          </h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">

        {/* Provider Info */}
        <Card padding="md">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-4xl flex-shrink-0">
              {provider.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-gray-900 truncate">{provider.name}</h2>
              <Badge color="gray" className="mt-1">{provider.specialty}</Badge>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-gray-500">{provider.totalInQueue} in queue</span>
                <span className="text-xs text-amber-600">{provider.averageWaitTime} min avg</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Queue Status */}
        <QueueStatusDisplay
          currentServing={provider.currentServing}
          queueNumber={myQueue.queueNumber}
        />

        {/* Progress */}
        <ProgressCard
          progress={progress}
          peopleAhead={peopleAhead}
          estimatedWait={estWait}
        />

        {/* You're next banner */}
        {next && (
          <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-4 flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="font-bold text-amber-800">You&apos;re next!</p>
              <p className="text-sm text-amber-700">Get ready — your turn is coming up very soon.</p>
            </div>
          </div>
        )}

        {/* Instruction */}
        <p className="text-xs text-gray-400 text-center px-4 pb-4">
          Keep this page open to receive your notification when it&apos;s your turn.
        </p>

      </main>
    </div>
  )
}
