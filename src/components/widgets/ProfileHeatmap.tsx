import { useMemo, useState } from 'react'
import { ArrowDownUp } from 'lucide-react'
import { AD_DIMS, AP_DIMS, drugs } from '@/content/drugs'
import { cn } from '@/lib/utils'

const cellColor = ['bg-emerald-500/15 text-emerald-800 dark:text-emerald-200', 'bg-lime-400/25 text-lime-900 dark:text-lime-200', 'bg-amber-400/35 text-amber-900 dark:text-amber-100', 'bg-red-500/40 text-red-950 dark:text-red-100']
const cellText = ['—', 'Low', 'Mod', 'High']

export function ProfileHeatmap({ kind }: { kind: 'antipsychotic' | 'antidepressant' }) {
  const dims = kind === 'antipsychotic' ? AP_DIMS : AD_DIMS
  const rows = useMemo(() => drugs.filter((d) => d.profile && d.group === (kind === 'antipsychotic' ? 'Antipsychotic' : 'Antidepressant')), [kind])
  const [sortBy, setSortBy] = useState<number | null>(null)
  const sorted = useMemo(() => (sortBy === null ? rows : [...rows].sort((a, b) => (a.profile![sortBy] ?? 0) - (b.profile![sortBy] ?? 0))), [rows, sortBy])

  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <h4 className="font-semibold">Interactive: {kind === 'antipsychotic' ? 'antipsychotic' : 'antidepressant'} adverse-effect profiles</h4>
      <p className="mb-3 text-sm text-muted-foreground">Tap a column to sort from lowest to highest burden. Relative ratings (approximate) synthesized from network meta-analyses and the Maudsley guidelines.</p>
      <div className="-mx-4 overflow-x-auto px-4 scrollbar-thin sm:mx-0 sm:px-0">
        <table className="w-full min-w-[640px] border-separate border-spacing-0.5 text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-card p-1.5 text-left font-semibold">Drug</th>
              {dims.map((d, i) => (
                <th key={d} className="p-1 align-bottom font-medium">
                  <button type="button" onClick={() => setSortBy(sortBy === i ? null : i)} className={cn('inline-flex items-center gap-1 rounded px-1 py-0.5 text-left leading-tight hover:bg-muted', sortBy === i && 'bg-primary/10 text-primary')} aria-pressed={sortBy === i}>
                    {d}
                    <ArrowDownUp className="h-3 w-3 shrink-0 opacity-60" aria-hidden="true" />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((d) => (
              <tr key={d.id}>
                <th scope="row" className="sticky left-0 z-10 bg-card p-1.5 text-left font-medium whitespace-nowrap">{d.name}</th>
                {d.profile!.map((v, i) => (
                  <td key={i} className={cn('rounded p-1.5 text-center font-medium', cellColor[v])} title={`${d.name} · ${dims[i]}: ${cellText[v]}`}>
                    {cellText[v]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
