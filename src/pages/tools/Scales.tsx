import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { scales, scaleById, scoreScale, type Scale } from '@/lib/scales'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Chip } from '@/components/ui/segmented'
import { Progress } from '@/components/ui/progress'
import { Sources } from '@/components/learning/Sources'
import { toneStyles } from '@/components/content/tones'
import { cn, pct } from '@/lib/utils'

export function Scales() {
  const [params, setParams] = useSearchParams()
  const id = (params.get('scale') as Scale['id']) ?? 'phq9'
  const scale = scaleById[id] ?? scales[0]
  const [answers, setAnswers] = useState<Record<string, Record<string, number>>>({})
  const a = useMemo(() => answers[scale.id] ?? {}, [answers, scale.id])
  const result = scoreScale(scale, a)
  const set = (item: string, score: number) => setAnswers((prev) => ({ ...prev, [scale.id]: { ...(prev[scale.id] ?? {}), [item]: score } }))

  return (
    <div>
      <PageHeader eyebrow="Tool" title="Clinical scales">
        Score validated instruments, see the severity band and what it usually means for management. Results stay in this tab only.
      </PageHeader>
      <div className="mb-6 flex flex-wrap gap-2">
        {scales.map((s) => (
          <Chip key={s.id} active={s.id === scale.id} onClick={() => setParams({ scale: s.id }, { replace: true })}>{s.short}</Chip>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)]">
        <Card className="p-5 sm:p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">{scale.name}</h2>
            <p className="text-sm text-muted-foreground">{scale.purpose}</p>
            <p className="mt-2 text-sm font-medium">{scale.instructions}</p>
          </div>
          <ol className="space-y-5">
            {scale.items.map((it, i) => (
              <li key={it.id}>
                <fieldset>
                  <legend className="mb-2 text-sm font-medium">
                    <span className="mr-1 tabular-nums text-muted-foreground">{i + 1}.</span> {it.label}
                    {it.hint && <span className="block text-xs font-normal text-muted-foreground">{it.hint}</span>}
                  </legend>
                  <div className="flex flex-wrap gap-1.5">
                    {it.options.map((o) => {
                      const on = a[it.id] === o.score
                      return (
                        <button
                          key={o.score}
                          type="button"
                          aria-pressed={on}
                          title={o.label}
                          onClick={() => set(it.id, o.score)}
                          className={cn('rounded-lg border px-2.5 py-1.5 text-left text-xs transition-colors', on ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:border-primary/60', it.options.length > 5 && 'min-w-9 text-center')}
                        >
                          {it.options.length > 5 ? o.score : <><span className="font-semibold tabular-nums">{o.score}</span> · {o.label}</>}
                        </button>
                      )
                    })}
                  </div>
                  {it.options.length > 5 && a[it.id] !== undefined && (
                    <p className="mt-1 text-xs text-muted-foreground">{it.options.find((o) => o.score === a[it.id])?.label}</p>
                  )}
                </fieldset>
              </li>
            ))}
          </ol>
        </Card>

        <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
          <Card className="p-5">
            <div className="flex items-baseline justify-between">
              <h2 className="font-semibold">{scale.short} score</h2>
              <Button size="sm" variant="ghost" onClick={() => setAnswers((p) => ({ ...p, [scale.id]: {} }))}><RotateCcw className="h-4 w-4" /> Clear</Button>
            </div>
            <div className="mt-1 text-4xl font-bold tabular-nums">{result.total}<span className="text-lg text-muted-foreground"> / {result.max}</span></div>
            <Progress value={pct(result.answered, scale.items.length)} className="mt-3" label="Items answered" />
            <p className="mt-1 text-xs text-muted-foreground">{result.answered}/{scale.items.length} items answered{!result.complete && ' (score is provisional)'}</p>
            <div className={cn('mt-4 rounded-xl border p-3', toneStyles[result.band.tone].box)}>
              <div className={cn('font-semibold', toneStyles[result.band.tone].title)}>{result.band.label}</div>
              <p className="mt-1 text-sm">{result.band.advice}</p>
            </div>
            {result.flags.map((f) => (
              <div key={f} className="mt-3 flex gap-2 rounded-xl border border-red-500/40 bg-red-500/[0.07] p-3 text-sm">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" /> {f}
              </div>
            ))}
            <div className="mt-4">
              <div className="mb-1 text-xs font-semibold text-muted-foreground">Bands</div>
              <ul className="space-y-0.5 text-xs">
                {scale.bands.map((b) => (
                  <li key={b.label} className={cn('flex justify-between gap-2 rounded px-1.5 py-0.5', b === result.band && 'bg-muted font-medium')}>
                    <span>{b.label}</span>
                    <span className="tabular-nums text-muted-foreground">{b.min}–{b.max}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Sources ids={scale.refs} className="mt-4" />
          </Card>
        </aside>
      </div>
    </div>
  )
}
