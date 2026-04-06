
import { cn } from '@/shared/utils/cn'
import type { LabelProps } from './Label.type'



export function Label({ children, required = false, className, ...props }: LabelProps) {
  return (
    <label
      className={cn('mb-1 inline-block text-sm font-medium text-gray-900', className)}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  )
}


