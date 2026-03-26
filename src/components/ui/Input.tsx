import React from 'react';

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  type?: string;
  disabled?: boolean;
  className?: string;
}

export function Input({
  label,
  placeholder,
  value,
  onChange,
  icon,
  type = 'text',
  disabled = false,
  className = '',
}: InputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={[
            'w-full min-h-[44px] rounded-xl border border-gray-200 bg-white text-gray-900',
            'placeholder:text-gray-400 text-base',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1',
            'transition-shadow',
            icon ? 'pl-10 pr-4' : 'px-4',
            disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      </div>
    </div>
  );
}
