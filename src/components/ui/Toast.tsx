interface ToastProps {
  message: string
  variant: 'success' | 'error'
  onDismiss?: () => void
  className?: string
}

const variantStyles: Record<ToastProps['variant'], { container: string; icon: string }> = {
  success: {
    container: 'bg-green-50 border-green-300 text-green-800',
    icon: 'text-green-500',
  },
  error: {
    container: 'bg-red-50 border-red-300 text-red-800',
    icon: 'text-red-500',
  },
}

export function Toast({ message, variant, onDismiss, className = '' }: ToastProps) {
  const styles = variantStyles[variant]

  return (
    <div
      role="alert"
      className={`fixed bottom-4 left-4 right-4 max-w-lg mx-auto flex items-center gap-3 border rounded-2xl px-4 py-3 shadow-lg ${styles.container} ${className}`}
    >
      {/* Icon */}
      <span className={`flex-shrink-0 text-xl ${styles.icon}`} aria-hidden="true">
        {variant === 'success' ? '✓' : '✕'}
      </span>

      {/* Message */}
      <p className="flex-1 text-sm font-medium">{message}</p>

      {/* Dismiss button */}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current opacity-60 hover:opacity-100 transition-opacity"
        >
          ×
        </button>
      )}
    </div>
  )
}

export type { ToastProps }
