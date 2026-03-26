export interface ProgressBarProps {
  percentage: number;
  color?: 'blue' | 'green' | 'amber' | 'red';
  className?: string;
}

const fillColorClasses: Record<NonNullable<ProgressBarProps['color']>, string> = {
  blue: 'bg-blue-600',
  green: 'bg-green-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
};

export function ProgressBar({ percentage, color = 'blue', className = '' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percentage));

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${fillColorClasses[color]}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
