

import { cn } from '@/shared/utils/cn'
import type { AlertProps } from './alert.types'

const variantClasses = {
  info: 'border-blue-200 bg-blue-50 text-blue-900',
  success: 'border-green-200 bg-green-50 text-green-900',
  warning: 'border-yellow-200 bg-yellow-50 text-yellow-900',
  error: 'border-red-200 bg-red-50 text-red-900',
}

export function Alert({
  title,
  children,
  variant = 'info',
  className,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        'rounded-md border px-4 py-3 text-sm',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {title && <h4 className="mb-1 font-semibold">{title}</h4>}
      {children && <div>{children}</div>}
    </div>
  )
}