import React from 'react';

export interface CardProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const paddingClasses: Record<NonNullable<CardProps['padding']>, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export function Card({
  header,
  footer,
  padding = 'md',
  children,
  className = '',
}: CardProps) {
  const bodyPadding = paddingClasses[padding];

  return (
    <div className={`bg-white rounded-2xl shadow-md overflow-hidden ${className}`}>
      {header && (
        <div className={`${bodyPadding} border-b border-gray-100`}>{header}</div>
      )}
      <div className={bodyPadding}>{children}</div>
      {footer && (
        <div className={`${bodyPadding} border-t border-gray-100`}>{footer}</div>
      )}
    </div>
  );
}
