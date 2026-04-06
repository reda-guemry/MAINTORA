import type { LabelHTMLAttributes, ReactNode } from "react"


export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode
  required?: boolean
}