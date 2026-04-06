
import { forwardRef } from 'react'
import { cn } from '@/shared/utils/cn'
import type { CheckboxProps } from './checkbox.type'

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, className, id, disabled, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={id}
          className={cn(
            'flex items-start gap-3',
            disabled && 'cursor-not-allowed opacity-70'
          )}
        >
          <input
            ref={ref}
            id={id}
            type="checkbox"
            disabled={disabled}
            className={cn(
              'mt-1 h-4 w-4 rounded border border-gray-300',
              'accent-black',
              'disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />

          {(label || description) && (
            <span className="flex flex-col">
              {label && <span className="text-sm font-medium text-gray-900">{label}</span>}
              {description && <span className="text-xs text-gray-500">{description}</span>}
            </span>
          )}
        </label>

        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'