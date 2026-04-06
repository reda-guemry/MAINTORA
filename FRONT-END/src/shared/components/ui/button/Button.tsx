

import { cn } from '@/shared/utils'
import type { ButtonProps } from './button.types'
import { Spinner } from '../spinner'

const variantClasses = {
  primary: 'bg-black text-white border border-black hover:opacity-90',
  secondary: 'bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-200',
  outline: 'bg-transparent text-gray-900 border border-gray-300 hover:bg-gray-50',
  danger: 'bg-red-600 text-white border border-red-600 hover:opacity-90',
  ghost: 'bg-transparent text-gray-900 border border-transparent hover:bg-gray-100',
}

const sizeClasses = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
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
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {isLoading && <Spinner size="sm" />}
      <span>{children}</span>
    </button>
  )
}