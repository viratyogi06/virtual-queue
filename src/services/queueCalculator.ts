export function calculatePeopleAhead(queueNumber: number, currentServing: number): number {
  return Math.max(0, queueNumber - currentServing - 1)
}

export function calculateProgress(queueNumber: number, peopleAhead: number): number {
  if (queueNumber <= 0) return 100
  const raw = ((queueNumber - peopleAhead) / queueNumber) * 100
  return Math.min(100, Math.max(0, raw))
}

export function calculateEstimatedWait(peopleAhead: number, averageWaitTime: number): number {
  return peopleAhead * averageWaitTime
}

export function isNext(peopleAhead: number): boolean {
  return peopleAhead === 0
}

export function isReady(currentServing: number, queueNumber: number): boolean {
  return currentServing >= queueNumber
}
