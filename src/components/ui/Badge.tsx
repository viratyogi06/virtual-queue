import React from 'react';

export interface BadgeProps {
  color?: 'blue' | 'green' | 'amber' | 'red' | 'gray';
  children: React.ReactNode;
  className?: string;
}

const colorClasses: Record<NonNullable<BadgeProps['color']>, string> = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  amber: 'bg-amber-100 text-amber-700',
  red: 'bg-red-100 text-red-700',
  gray: 'bg-gray-100 text-gray-600',
};

export function Badge({ color = 'gray', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClasses[color]} ${className}`}
    >
      {children}
    </span>
  );
}
