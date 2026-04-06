
import type { HTMLAttributes, ReactNode } from 'react'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  title?: string
  children?: ReactNode
  variant?: AlertVariant
}