import type { Provider } from './provider';

export interface QueueEntry {
  providerId: string;
  queueNumber: number;
  timestamp: number;
}

export interface AppState {
  providers: Provider[];
  myQueue: QueueEntry | null;
}
