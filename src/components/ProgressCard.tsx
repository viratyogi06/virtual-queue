import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'

interface ProgressCardProps {
  progress: number
  peopleAhead: number
  estimatedWait: number
  className?: string
}

export function ProgressCard({ progress, peopleAhead, estimatedWait, className = '' }: ProgressCardProps) {
  const roundedProgress = Math.round(progress)

  return (
    <Card padding="md" className={className}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-700">Your Progress</p>
          <p className="text-sm font-bold text-blue-600">{roundedProgress}% there</p>
        </div>

        <ProgressBar percentage={progress} color="blue" />

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400 text-sm">👥</span>
            <span className="text-sm text-gray-600">
              {peopleAhead === 0 ? 'No one ahead' : `${peopleAhead} ${peopleAhead === 1 ? 'person' : 'people'} ahead`}
            </span>
          </div>
          <div>
            {estimatedWait === 0 ? (
              <span className="text-sm font-semibold text-green-600">Almost your turn!</span>
            ) : (
              <span className="text-sm text-amber-600 font-medium">~{estimatedWait} min wait</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
