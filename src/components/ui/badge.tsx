import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger'
}

const variants = {
  default: 'bg-primary/10 text-primary border-transparent',
  secondary: 'bg-muted text-muted-foreground border-transparent',
  outline: 'border-border text-foreground',
  success: 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 border-transparent',
  warning: 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-transparent',
  danger: 'bg-red-500/12 text-red-700 dark:text-red-300 border-transparent',
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return <span className={cn('inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium', variants[variant], className)} {...props} />
}
