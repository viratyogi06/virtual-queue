export interface Provider {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  currentServing: number;
  totalInQueue: number;
  averageWaitTime: number;
}
