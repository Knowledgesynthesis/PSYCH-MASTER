import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { features, rankSyndromes } from '@/lib/syndromes'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Chip } from '@/components/ui/segmented'
import { Sources } from '@/components/learning/Sources'
import { cn } from '@/lib/utils'

const groups = ['Exposure', 'Timing', 'Neuromuscular', 'Autonomic & skin', 'Mental status', 'Labs & vitals'] as const

const presets: { label: string; f: string[] }[] = [
  { label: 'SSRI + tramadol, clonus', f: ['serotonergic', 'hours', 'clonus', 'hyperreflexia', 'diaphoresis', 'mydriasis', 'agitation', 'bowelHyper', 'hyperthermia'] },
  { label: 'Haloperidol day 10, rigid, mute', f: ['d2', 'days', 'leadpipe', 'bradyreflexia', 'mutism', 'diaphoresis', 'hyperthermia', 'ck'] },
  { label: 'Diphenhydramine overdose', f: ['anticholinergic', 'hours', 'dryskin', 'mydriasis', 'bowelHypo', 'retention', 'delirium', 'hallucinations'] },
  { label: '60 h after last drink', f: ['cessation', 'days', 'tremor', 'diaphoresis', 'hallucinations', 'delirium', 'agitation', 'hyperthermia'] },
]

export function Syndromes() {
  const [sel, setSel] = useState<Set<string>>(new Set())
  const ranked = useMemo(() => rankSyndromes(sel), [sel])
  const top = ranked[0]
  const toggle = (id: string) => {
    const n = new Set(sel)
    if (n.has(id)) n.delete(id)
    else n.add(id)
    setSel(n)
  }

  return (
    <div>
      <PageHeader eyebrow="Tool" title="Toxic syndrome differentiator" actions={<Button variant="outline" size="sm" onClick={() => setSel(new Set())}><RotateCcw className="h-4 w-4" /> Reset</Button>}>
        Hyperthermic, agitated or rigid patient on psychotropics? Select the findings and watch the differential re-rank. Each feature is weighted by how well it discriminates.
      </PageHeader>
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="self-center text-sm font-medium">Examples:</span>
        {presets.map((p) => (
          <Chip key={p.label} active={false} onClick={() => setSel(new Set(p.f))}>{p.label}</Chip>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
        <div className="space-y-4">
          {groups.map((g) => (
            <Card key={g} className="p-5">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{g}</h2>
              <div className="flex flex-wrap gap-2">
                {features.filter((f) => f.group === g).map((f) => (
                  <Chip key={f.id} active={sel.has(f.id)} onClick={() => toggle(f.id)}>{f.label}</Chip>
                ))}
              </div>
            </Card>
          ))}
        </div>
        <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
          <Card className="p-5">
            <h2 className="mb-3 font-semibold">Differential</h2>
            {sel.size === 0 ? (
              <p className="text-sm text-muted-foreground">Select findings or load an example.</p>
            ) : (
              <ol className="space-y-2">
                {ranked.map((s, i) => {
                  const maxScore = Math.max(1, top.score)
                  const width = Math.max(0, (s.score / maxScore) * 100)
                  return (
                    <li key={s.id} className={cn('rounded-xl border p-3', i === 0 && s.score > 0 ? 'border-primary/50 bg-primary/[0.05]' : 'border-border')}>
                      <div className="flex items-center justify-between gap-2">
                        <span className={cn('font-medium', i === 0 && 'font-semibold')}>{s.name}</span>
                        <span className="text-xs tabular-nums text-muted-foreground">{s.score}</span>
                      </div>
                      <div className="mt-1.5 h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${width}%` }} /></div>
                      {i === 0 && s.score > 0 && (
                        <div className="mt-2 space-y-2 text-sm">
                          <p className="text-muted-foreground">{s.key}</p>
                          {s.support.length > 0 && <p><span className="font-semibold text-emerald-700 dark:text-emerald-300">For:</span> {s.support.join('; ')}</p>}
                          {s.against.length > 0 && <p><span className="font-semibold text-red-700 dark:text-red-300">Against:</span> {s.against.join('; ')}</p>}
                          <p><span className="font-semibold">Management:</span> {s.management}</p>
                          <Link to={s.link} className="inline-flex items-center gap-1 font-medium text-primary">Review <ArrowRight className="h-3.5 w-3.5" /></Link>
                        </div>
                      )}
                      {i > 0 && s.against.length > 0 && s.score > 0 && <p className="mt-1 text-xs text-muted-foreground">Against: {s.against.join('; ')}</p>}
                    </li>
                  )
                })}
              </ol>
            )}
            <Sources ids={['boyer-2005', 'hunter-2003']} className="mt-4" />
          </Card>
        </aside>
      </div>
    </div>
  )
}
