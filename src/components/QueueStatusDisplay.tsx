interface QueueStatusDisplayProps {
  currentServing: number
  queueNumber: number
  className?: string
}

export function QueueStatusDisplay({ currentServing, queueNumber, className = '' }: QueueStatusDisplayProps) {
  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      <div className="flex flex-col items-center justify-center bg-gray-100 rounded-2xl p-4 min-h-[88px]">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Now Serving</p>
        <p className="text-4xl font-bold text-gray-700">{currentServing}</p>
      </div>
      <div className="flex flex-col items-center justify-center bg-blue-600 rounded-2xl p-4 min-h-[88px]">
        <p className="text-xs font-semibold text-blue-200 uppercase tracking-wide mb-1">Your Number</p>
        <p className="text-4xl font-bold text-white">#{queueNumber}</p>
      </div>
    </div>
  )
}
