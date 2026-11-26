import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, CircleAlert, RotateCcw, XCircle } from 'lucide-react'
import { cases } from '@/content/cases'
import { moduleById } from '@/content'
import { useProgress } from '@/store/progress'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Inline } from '@/components/content/Inline'
import { Sources } from '@/components/learning/Sources'
import { cn, pct, shuffle } from '@/lib/utils'

const verdict = {
  2: { label: 'Best choice', cls: 'border-emerald-500/50 bg-emerald-500/[0.07]', icon: CheckCircle2, color: 'text-emerald-700 dark:text-emerald-300' },
  1: { label: 'Acceptable, not best', cls: 'border-amber-500/50 bg-amber-500/[0.07]', icon: CircleAlert, color: 'text-amber-700 dark:text-amber-300' },
  0: { label: 'Harmful or incorrect', cls: 'border-red-500/50 bg-red-500/[0.07]', icon: XCircle, color: 'text-red-700 dark:text-red-300' },
} as const

export function CasePlayer() {
  const { caseId } = useParams()
  const c = cases.find((x) => x.id === caseId)
  const recordCase = useProgress((s) => s.recordCase)
  const best = useProgress((s) => (caseId ? s.cases[caseId] : undefined))
  const [step, setStep] = useState(0)
  const [picks, setPicks] = useState<number[]>([])
  const [seed, setSeed] = useState(1)
  const orders = useMemo(() => (c ? c.steps.map((s, i) => shuffle(s.choices.map((_, j) => j), seed * 31 + i)) : []), [c, seed])

  if (!c) return <Navigate to="/practice/cases" replace />

  const max = c.steps.length * 2
  const score = picks.reduce((sum, p, i) => sum + c.steps[i].choices[p].score, 0)
  const finished = picks.length === c.steps.length && step >= c.steps.length

  const restart = () => {
    setPicks([])
    setStep(0)
    setSeed((s) => s + 1)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/practice/cases" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> All cases</Link>
      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">{moduleById[c.module].short} · {c.setting}</div>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{c.title}</h1>
      <Progress value={pct(Math.min(step, c.steps.length), c.steps.length)} className="mb-6 mt-4" label="Case progress" />

      {!finished ? (
        <div className="space-y-4">
          {c.steps.slice(0, step + 1).map((s, si) => {
            const picked = picks[si]
            const answered = picked !== undefined
            return (
              <Card key={s.id} className={cn('p-5 sm:p-6', si < step && 'opacity-80')}>
                <div className="mb-2 text-xs font-semibold text-muted-foreground">Decision {si + 1} of {c.steps.length}</div>
                <p className="leading-relaxed"><Inline text={s.narrative} /></p>
                {s.data && (
                  <dl className="mt-3 grid gap-2 rounded-xl bg-muted/60 p-3 text-sm sm:grid-cols-2">
                    {s.data.map((d) => (
                      <div key={d.label}><dt className="text-xs font-semibold text-muted-foreground">{d.label}</dt><dd>{d.value}</dd></div>
                    ))}
                  </dl>
                )}
                <p className="mt-4 font-semibold">{s.question}</p>
                <div className="mt-3 grid gap-2">
                  {orders[si].map((ci) => {
                    const ch = s.choices[ci]
                    const isPicked = picked === ci
                    const v = verdict[ch.score]
                    return (
                      <div key={ci}>
                        <button
                          type="button"
                          disabled={answered}
                          onClick={() => {
                            const next = [...picks]
                            next[si] = ci
                            setPicks(next)
                          }}
                          className={cn('w-full rounded-xl border px-3.5 py-3 text-left text-sm transition-colors', !answered && 'border-border bg-card hover:border-primary/60', answered && isPicked && v.cls, answered && !isPicked && 'border-border bg-card opacity-60')}
                        >
                          <Inline text={ch.text} />
                        </button>
                        {answered && (isPicked || ch.score === 2) && (
                          <p className={cn('mt-1.5 flex items-start gap-1.5 pl-1 text-sm', v.color)}>
                            <v.icon className="mt-0.5 h-4 w-4 shrink-0" />
                            <span><span className="font-semibold">{isPicked ? v.label : 'Best choice'}:</span> <span className="text-foreground/85"><Inline text={ch.feedback} /></span></span>
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
                {answered && si === step && (
                  <div className="mt-4 flex justify-end">
                    <Button
                      onClick={() => {
                        if (step + 1 >= c.steps.length) {
                          const final = picks.reduce((sum, p, i) => sum + c.steps[i].choices[p].score, 0)
                          if (!best || final > best.score) recordCase(c.id, final, max)
                        }
                        setStep(step + 1)
                      }}
                    >
                      {step + 1 < c.steps.length ? 'Continue' : 'Finish case'} <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="space-y-5">
          <Card className="p-5 sm:p-6">
            <div className="text-sm text-muted-foreground">Your score</div>
            <div className="text-3xl font-bold tabular-nums">{score}/{max} <span className="text-lg text-muted-foreground">({pct(score, max)}%)</span></div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={restart} variant="outline"><RotateCcw className="h-4 w-4" /> Replay</Button>
              <Link to="/practice/cases" className="inline-flex h-10 items-center rounded-lg px-4 text-sm font-medium text-primary hover:bg-muted">More cases</Link>
            </div>
          </Card>
          <Card className="border-primary/30 bg-primary/[0.04] p-5 sm:p-6">
            <h2 className="mb-3 text-lg font-bold">Debrief</h2>
            <ul className="space-y-2">
              {c.debrief.map((d) => (
                <li key={d} className="flex gap-2 leading-relaxed"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" /> <span><Inline text={d} /></span></li>
              ))}
            </ul>
            <Sources ids={c.refs} className="mt-4" />
          </Card>
        </div>
      )}
    </div>
  )
}
