import type { Tone } from '@/content/types'

export const toneStyles: Record<Tone, { box: string; title: string }> = {
  danger: { box: 'border-red-500/30 bg-red-500/[0.06]', title: 'text-red-700 dark:text-red-300' },
  warning: { box: 'border-amber-500/35 bg-amber-500/[0.07]', title: 'text-amber-800 dark:text-amber-300' },
  info: { box: 'border-sky-500/30 bg-sky-500/[0.06]', title: 'text-sky-800 dark:text-sky-300' },
  pearl: { box: 'border-indigo-500/30 bg-indigo-500/[0.06]', title: 'text-indigo-700 dark:text-indigo-300' },
  pitfall: { box: 'border-orange-500/35 bg-orange-500/[0.07]', title: 'text-orange-800 dark:text-orange-300' },
  success: { box: 'border-emerald-500/30 bg-emerald-500/[0.06]', title: 'text-emerald-800 dark:text-emerald-300' },
}
