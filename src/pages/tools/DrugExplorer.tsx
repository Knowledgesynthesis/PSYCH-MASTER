import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronDown, GitCompare, Search, X } from 'lucide-react'
import { AD_DIMS, AP_DIMS, drugById, drugs, type Drug, type DrugGroup } from '@/content/drugs'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Chip } from '@/components/ui/segmented'
import { ProfileHeatmap } from '@/components/widgets/ProfileHeatmap'
import { cn } from '@/lib/utils'

const groups: DrugGroup[] = ['Antidepressant', 'Antipsychotic', 'Mood stabilizer', 'Anxiolytic / hypnotic', 'Addiction', 'Other']
const level = ['Minimal', 'Low', 'Moderate', 'High']

function Field({ title, items, tone }: { title: string; items?: string[]; tone?: 'warn' }) {
  if (!items?.length) return null
  return (
    <div>
      <div className={cn('mb-1 text-xs font-semibold uppercase tracking-wide', tone === 'warn' ? 'text-red-700 dark:text-red-300' : 'text-muted-foreground')}>{title}</div>
      <ul className="space-y-1 text-sm">{items.map((x) => <li key={x}>• {x}</li>)}</ul>
    </div>
  )
}

function DrugDetail({ d }: { d: Drug }) {
  const dims = d.group === 'Antipsychotic' ? AP_DIMS : AD_DIMS
  return (
    <div className="grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
      <div className="sm:col-span-2 text-sm"><span className="font-semibold">Mechanism:</span> {d.mechanism}</div>
      <Field title="Uses" items={d.uses} />
      <Field title="Adverse effects" items={d.adverse} />
      <Field title="Warnings" items={d.warnings} tone="warn" />
      <Field title="Monitoring" items={d.monitoring} />
      <Field title="Interactions" items={d.interactions} />
      <Field title="Pearls" items={d.pearls} />
      {d.pregnancy && <div className="text-sm sm:col-span-2"><span className="font-semibold">Pregnancy:</span> {d.pregnancy}</div>}
      {d.profile && (
        <div className="sm:col-span-2">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Relative profile</div>
          <div className="flex flex-wrap gap-1.5">
            {d.profile.map((v, i) => (
              <span key={i} className={cn('rounded-md px-2 py-1 text-xs', ['bg-emerald-500/15', 'bg-lime-400/25', 'bg-amber-400/35', 'bg-red-500/35'][v])}>{dims[i]}: {level[v]}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function DrugExplorer() {
  const [params, setParams] = useSearchParams()
  const openId = params.get('drug')
  const [q, setQ] = useState('')
  const [group, setGroup] = useState<DrugGroup | 'All'>(() => (openId && drugById[openId] ? drugById[openId].group : 'All'))
  const [compare, setCompare] = useState<string[]>([])
  const [view, setView] = useState<'list' | 'ad' | 'ap'>('list')

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return drugs.filter((d) => (group === 'All' || d.group === group) && (!t || [d.name, d.cls, d.mechanism, ...d.uses, ...d.adverse, ...(d.warnings ?? []), ...(d.pearls ?? [])].join(' ').toLowerCase().includes(t)))
  }, [q, group])

  const toggleCompare = (id: string) => setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length >= 3 ? c : [...c, id]))
  const compared = compare.map((id) => drugById[id] as Drug)

  return (
    <div>
      <PageHeader eyebrow="Tool" title="Drug explorer">
        {drugs.length} psychotropics with uses, adverse effects, boxed warnings, monitoring and interactions. Search by drug, effect or problem (“weight”, “QTc”, “pregnancy”), or compare up to three.
      </PageHeader>

      <div className="mb-4 flex flex-wrap gap-2">
        <Chip active={view === 'list'} onClick={() => setView('list')}>Browse</Chip>
        <Chip active={view === 'ad'} onClick={() => setView('ad')}>Antidepressant heatmap</Chip>
        <Chip active={view === 'ap'} onClick={() => setView('ap')}>Antipsychotic heatmap</Chip>
      </div>

      {view !== 'list' ? (
        <ProfileHeatmap kind={view === 'ad' ? 'antidepressant' : 'antipsychotic'} />
      ) : (
        <>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search drugs, effects, uses…" aria-label="Search drugs" className="h-11 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm outline-none focus:border-primary" />
          </div>
          <div className="mb-5 flex flex-wrap gap-2">
            <Chip active={group === 'All'} onClick={() => setGroup('All')}>All</Chip>
            {groups.map((g) => <Chip key={g} active={group === g} onClick={() => setGroup(g)}>{g}</Chip>)}
          </div>

          {compared.length >= 2 && (
            <Card className="mb-6 p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-semibold"><GitCompare className="h-4 w-4 text-primary" /> Comparison</h2>
                <Button size="sm" variant="ghost" onClick={() => setCompare([])}><X className="h-4 w-4" /> Clear</Button>
              </div>
              <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                <table className="w-full min-w-[600px] text-sm">
                  <thead><tr><th className="w-32 p-2 text-left" />{compared.map((d) => <th key={d.id} className="p-2 text-left font-semibold">{d.name}</th>)}</tr></thead>
                  <tbody className="align-top">
                    {([['Class', (d: Drug) => d.cls], ['Uses', (d: Drug) => d.uses.join('; ')], ['Adverse effects', (d: Drug) => d.adverse.join('; ')], ['Warnings', (d: Drug) => (d.warnings ?? []).join('; ') || '—'], ['Monitoring', (d: Drug) => (d.monitoring ?? []).join('; ') || '—'], ['Interactions', (d: Drug) => (d.interactions ?? []).join('; ') || '—'], ['Pregnancy', (d: Drug) => d.pregnancy ?? '—']] as const).map(([label, fn]) => (
                      <tr key={label} className="border-t border-border">
                        <th scope="row" className="p-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</th>
                        {compared.map((d) => <td key={d.id} className="p-2">{fn(d)}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          <p className="mb-3 text-sm text-muted-foreground">{filtered.length} drugs{compare.length > 0 && ` · ${compare.length} selected to compare${compare.length < 2 ? ' (pick at least 2)' : ''}`}</p>
          <div className="space-y-3">
            {filtered.map((d) => {
              const open = openId === d.id
              return (
                <Card key={d.id} id={d.id} className={cn('p-4 sm:p-5', open && 'border-primary/50')}>
                  <div className="flex items-start gap-3">
                    <button type="button" className="min-w-0 flex-1 text-left" onClick={() => setParams(open ? {} : { drug: d.id }, { replace: true })} aria-expanded={open}>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">{d.name}</span>
                        <Badge variant="secondary">{d.cls}</Badge>
                        {d.warnings?.some((w) => /boxed/i.test(w)) && <Badge variant="danger">Boxed warning</Badge>}
                      </div>
                      <p className="mt-1 truncate text-sm text-muted-foreground">{d.uses.join(' · ')}</p>
                    </button>
                    <label className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                      <input type="checkbox" className="accent-[var(--primary)]" checked={compare.includes(d.id)} onChange={() => toggleCompare(d.id)} disabled={!compare.includes(d.id) && compare.length >= 3} />
                      Compare
                    </label>
                    <button type="button" onClick={() => setParams(open ? {} : { drug: d.id }, { replace: true })} aria-label={open ? 'Collapse' : 'Expand'} className="shrink-0 rounded-lg p-1 hover:bg-muted">
                      <ChevronDown className={cn('h-5 w-5 transition-transform', open && 'rotate-180')} />
                    </button>
                  </div>
                  {open && <div className="mt-3 animate-fade-in"><DrugDetail d={d} /></div>}
                </Card>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
