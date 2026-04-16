import { cn } from '@/shared/utils'
import type { ButtonProps } from './Button.type'
import { Spinner } from '../spinner'

const variantClasses = {
  primary:
    'bg-primary text-white border border-primary hover:bg-primary/90 shadow-lg shadow-primary/20',
  secondary:
    'bg-white text-text-main border border-neutral-gray hover:bg-background-light',
  outline:
    'bg-transparent text-text-main border border-neutral-gray hover:bg-white',
  danger:
    'bg-red-600 text-white border border-red-600 hover:bg-red-700',
  ghost:
    'bg-transparent text-text-main border border-transparent hover:bg-background-light',
}

const sizeClasses = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-12 px-4 text-sm',
  lg: 'h-14 px-5 text-base',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  disabled,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={cn(
        className,
        'inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60',
        'focus:outline-none focus:ring-2 focus:ring-primary/20',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
      )}
      {...props}
    >
      {isLoading && <Spinner size="sm" />}
      <span>{children}</span>
    </button>
  )
}