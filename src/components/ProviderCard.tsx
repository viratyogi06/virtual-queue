import type { Provider } from '@/types';
import { Badge, Card } from '@/components/ui';

export interface ProviderCardProps {
  provider: Provider;
  onTap: (id: string) => void;
  className?: string;
}

export function ProviderCard({ provider, onTap, className = '' }: ProviderCardProps) {
  return (
    <button
      type="button"
      onClick={() => onTap(provider.id)}
      className={`w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-2xl ${className}`}
    >
      <Card padding="md">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-3xl flex-shrink-0">
            {provider.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <span className="text-base font-semibold text-gray-900 truncate">
                {provider.name}
              </span>
              <Badge color="gray" className="flex-shrink-0">
                {provider.specialty}
              </Badge>
            </div>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
              <span>👥 {provider.totalInQueue} in queue</span>
              <span>⏱ ~{provider.averageWaitTime} min wait</span>
            </div>
          </div>
        </div>
      </Card>
    </button>
  );
}
