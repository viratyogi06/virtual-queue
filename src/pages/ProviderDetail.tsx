import { useParams, useNavigate } from 'react-router-dom'
import { useQueueContext } from '@/context/QueueContext'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

export default function ProviderDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { myQueue, joinQueue, leaveQueue, getCurrentProvider } = useQueueContext()

  const provider = getCurrentProvider(id ?? '')
  const isInThisQueue = myQueue?.providerId === id
  const isInAnyQueue = myQueue !== null

  const handleJoin = () => {
    joinQueue(id!)
    navigate(`/queue/${id}`)
  }

  const handleLeave = () => {
    leaveQueue()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-lg mx-auto px-4 py-3">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1 text-blue-600 font-medium min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
          >
            <span className="text-xl">←</span>
            <span>Back</span>
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">

        {/* Error state */}
        {!provider && (
          <Card padding="lg">
            <div className="text-center space-y-3">
              <p className="text-4xl">🔍</p>
              <p className="text-lg font-semibold text-gray-900">Provider not found</p>
              <p className="text-sm text-gray-500">The provider you&apos;re looking for doesn&apos;t exist.</p>
              <Button variant="primary" fullWidth onClick={() => navigate('/')}>
                Go Home
              </Button>
            </div>
          </Card>
        )}

        {provider && (
          <>
            {/* Provider Hero */}
            <Card padding="lg">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center text-6xl">
                  {provider.avatar}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mt-3">{provider.name}</h1>
                <Badge color="gray">{provider.specialty}</Badge>
              </div>
            </Card>

            {/* Current Status */}
            <Card padding="md">
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Current Status</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center bg-gray-50 rounded-xl p-3 space-y-1">
                    <p className="text-xs text-gray-500">Now Serving</p>
                    <Badge color="gray" className="text-base font-bold px-3 py-1">
                      {provider.currentServing}
                    </Badge>
                  </div>
                  <div className="flex flex-col items-center bg-gray-50 rounded-xl p-3 space-y-1">
                    <p className="text-xs text-gray-500">People in Queue</p>
                    <Badge color="gray" className="text-base font-bold px-3 py-1">
                      {provider.totalInQueue}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* If You Join Now Preview */}
            <Card padding="md">
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">If You Join Now</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center bg-blue-50 rounded-xl p-3 space-y-1">
                    <p className="text-xs text-gray-500">Your Number</p>
                    <Badge color="blue" className="text-base font-bold px-3 py-1">
                      #{provider.currentServing + provider.totalInQueue + 1}
                    </Badge>
                  </div>
                  <div className="flex flex-col items-center bg-yellow-50 rounded-xl p-3 space-y-1">
                    <p className="text-xs text-gray-500">Est. Wait</p>
                    <Badge color="amber" className="text-base font-bold px-3 py-1">
                      ~{provider.totalInQueue * provider.averageWaitTime} min
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Avg service time: {provider.averageWaitTime} min/person
                </p>
              </div>
            </Card>

            {/* Green banner — user is already in this queue */}
            {isInThisQueue && myQueue && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-green-800 font-semibold">You&apos;re in queue!</p>
                  <Badge color="green">Active</Badge>
                </div>
                <p className="text-sm text-green-700">
                  Your number: <span className="font-bold">#{myQueue.queueNumber}</span>
                </p>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => navigate(`/queue/${id}`)}
                >
                  View Queue Status
                </Button>
                <Button
                  variant="danger"
                  fullWidth
                  onClick={handleLeave}
                >
                  Leave Queue
                </Button>
              </div>
            )}

            {/* Join button — only when not in any queue */}
            {!isInAnyQueue && (
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleJoin}
              >
                Join Queue
              </Button>
            )}
          </>
        )}
      </main>
    </div>
  )
}
