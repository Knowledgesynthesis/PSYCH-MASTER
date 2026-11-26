import { useMemo, useState } from 'react'
import { ArrowLeftRight, ArrowRight, Eye, ShieldAlert } from 'lucide-react'
import { antidepressants, classLabel, planSwitch } from '@/lib/switching'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sources } from '@/components/learning/Sources'

function DrugSelect({ id, value, onChange, label }: { id: string; value: string; onChange: (v: string) => void; label: string }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="h-11 w-full rounded-xl border border-border bg-card px-3 text-sm">
        {antidepressants.map((a) => (
          <option key={a.id} value={a.id}>{a.name} ({classLabel(a.cls)})</option>
        ))}
      </select>
    </label>
  )
}

const strategyVariant = { direct: 'success', 'cross-taper': 'default', washout: 'danger' } as const

export function SwitchPlanner() {
  const [from, setFrom] = useState('sertraline')
  const [to, setTo] = useState('bupropion')
  const plan = useMemo(() => (from === to ? null : planSwitch(from, to)), [from, to])

  return (
    <div>
      <PageHeader eyebrow="Tool" title="Antidepressant switch planner">
        Choose the current and target antidepressant to get a strategy, timeline, cautions and monitoring plan. Doses are deliberately generic: titrate to each label.
      </PageHeader>
      <Card className="mb-6 p-5 sm:p-6">
        <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <DrugSelect id="from" label="Switching from" value={from} onChange={setFrom} />
          <Button variant="ghost" size="icon" aria-label="Swap" onClick={() => { setFrom(to); setTo(from) }} className="mx-auto"><ArrowLeftRight className="h-5 w-5" /></Button>
          <DrugSelect id="to" label="Switching to" value={to} onChange={setTo} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="text-muted-foreground">Try:</span>
          {[['fluoxetine', 'phenelzine'], ['paroxetine', 'nortriptyline'], ['sertraline', 'escitalopram'], ['venlafaxine', 'mirtazapine'], ['fluvoxamine', 'duloxetine'], ['phenelzine', 'sertraline']].map(([a, b]) => (
            <button key={a + b} type="button" onClick={() => { setFrom(a); setTo(b) }} className="rounded-full border border-border px-2.5 py-1 hover:border-primary hover:text-primary">
              {antidepressants.find((x) => x.id === a)!.name} → {antidepressants.find((x) => x.id === b)!.name}
            </button>
          ))}
        </div>
      </Card>

      {!plan ? (
        <p className="text-muted-foreground">Choose two different drugs.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]" aria-live="polite">
          <Card className="p-5 sm:p-6">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <Badge variant={strategyVariant[plan.strategy]}>{plan.strategy}</Badge>
              {plan.gapDays > 0 && <Badge variant="warning">drug-free gap ≥{plan.gapDays} days</Badge>}
            </div>
            <h2 className="text-xl font-bold">{plan.title}</h2>
            <p className="mt-1 text-muted-foreground">{plan.summary}</p>
            <ol className="relative mt-5 space-y-4 border-l-2 border-primary/25 pl-5">
              {plan.steps.map((s, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[1.85rem] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">{i + 1}</span>
                  <div className="text-xs font-semibold uppercase tracking-wide text-primary">{s.when}</div>
                  <div className="text-sm leading-relaxed">{s.what}</div>
                </li>
              ))}
            </ol>
            <Sources ids={['maudsley', 'boyer-2005']} className="mt-6" />
          </Card>
          <div className="space-y-4">
            {plan.cautions.length > 0 && (
              <Card className="border-amber-500/40 bg-amber-500/[0.05] p-5">
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-300"><ShieldAlert className="h-4 w-4" /> Cautions</h3>
                <ul className="space-y-2 text-sm">{plan.cautions.map((c) => <li key={c}>• {c}</li>)}</ul>
              </Card>
            )}
            <Card className="p-5">
              <h3 className="mb-2 flex items-center gap-2 font-semibold"><Eye className="h-4 w-4 text-primary" /> Monitor</h3>
              <ul className="space-y-2 text-sm">{plan.monitoring.map((c) => <li key={c}><ArrowRight className="mr-1 inline h-3.5 w-3.5 text-primary" />{c}</li>)}</ul>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
