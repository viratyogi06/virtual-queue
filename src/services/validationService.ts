import type { QueueEntry } from '@/types'

/**
 * True if id is a non-empty string (not undefined, not '').
 * Use as a type guard before calling getCurrentProvider(id).
 */
export function isValidProviderId(id: string | undefined): id is string {
  return id !== undefined && id !== ''
}

/**
 * True if the user has an active queue entry (myQueue is not null).
 * Type guard narrowing QueueEntry | null → QueueEntry.
 */
export function hasActiveQueue(myQueue: QueueEntry | null): myQueue is QueueEntry {
  return myQueue !== null
}

/**
 * True if the entry's providerId matches the given provider ID.
 * Call only after hasActiveQueue() narrows the type.
 */
export function queueMatchesProvider(myQueue: QueueEntry, providerId: string): boolean {
  return myQueue.providerId === providerId
}
