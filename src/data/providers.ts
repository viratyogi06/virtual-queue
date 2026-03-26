import type { Provider } from '@/types';

export const providers: Provider[] = [
  {
    id: '1',
    name: 'City Urgent Care',
    specialty: 'Walk-in Clinic',
    avatar: '🏥',
    currentServing: 14,
    totalInQueue: 6,
    averageWaitTime: 12,
  },
  {
    id: '2',
    name: 'The Grooming Lab',
    specialty: 'Barbershop',
    avatar: '✂️',
    currentServing: 8,
    totalInQueue: 3,
    averageWaitTime: 20,
  },
  {
    id: '3',
    name: 'Bright Smile Dental',
    specialty: 'Dental Office',
    avatar: '🦷',
    currentServing: 5,
    totalInQueue: 4,
    averageWaitTime: 30,
  },
  {
    id: '4',
    name: 'Serenity Day Spa',
    specialty: 'Spa & Nail Salon',
    avatar: '💆',
    currentServing: 11,
    totalInQueue: 5,
    averageWaitTime: 25,
  },
  {
    id: '5',
    name: 'Metro Service Center',
    specialty: 'Government Services',
    avatar: '🏛️',
    currentServing: 42,
    totalInQueue: 8,
    averageWaitTime: 15,
  },
];
