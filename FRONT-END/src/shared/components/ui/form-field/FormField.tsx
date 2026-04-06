import { cn } from '@/shared/utils/cn'
import { Label } from '../label'
import type { FormFieldProps } from './FormField.type'



export function FormField({
  label,
  htmlFor,
  error,
  hint,
  required = false,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}

      {children}

      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

