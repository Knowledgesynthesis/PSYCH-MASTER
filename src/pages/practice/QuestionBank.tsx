import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ClipboardList, RotateCcw, Timer, XCircle } from 'lucide-react'
import { modules, moduleById } from '@/content'
import type { ModuleId, Question } from '@/content/types'
import { questions } from '@/content/questions'
import { useProgress } from '@/store/progress'
import { PageHeader } from '@/components/PageHeader'
import { QuestionView } from '@/components/learning/QuestionView'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Chip, Segmented } from '@/components/ui/segmented'
import { Progress } from '@/components/ui/progress'
import { Inline } from '@/components/content/Inline'
import { moduleQuestionStats } from '@/lib/stats'
import { cn, pct, shuffle } from '@/lib/utils'

type Mode = 'practice' | 'exam'
type Pool = 'all' | 'unanswered' | 'incorrect' | 'flagged'

interface Session {
  mode: Mode
  items: { q: Question; order: number[] }[]
  answers: (number | null)[]
  revealed: boolean[]
  index: number
  finished: boolean
  startedAt: number
}

export function QuestionBank() {
  const [params] = useSearchParams()
  const initialModule = params.get('module') as ModuleId | null
  const { attempts, flagged, recordAttempt, toggleFlag } = useProgress()
  const [selected, setSelected] = useState<Set<ModuleId>>(() => new Set(initialModule && moduleById[initialModule] ? [initialModule] : modules.map((m) => m.id)))
  const [mode, setMode] = useState<Mode>('practice')
  const [pool, setPool] = useState<Pool>('all')
  const [count, setCount] = useState<'10' | '20' | 'all'>('10')
  const [session, setSession] = useState<Session | null>(null)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!session || session.finished || session.mode !== 'exam') return
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [session])

  const available = useMemo(
    () =>
      questions.filter((q) => {
        if (!selected.has(q.module)) return false
        if (pool === 'unanswered') return !attempts[q.id]
        if (pool === 'incorrect') return attempts[q.id] && !attempts[q.id].last
        if (pool === 'flagged') return !!flagged[q.id]
        return true
      }),
    [selected, pool, attempts, flagged],
  )

  const start = (subset?: Question[]) => {
    const source = subset ?? available
    const n = subset ? source.length : count === 'all' ? source.length : Math.min(Number(count), source.length)
    const picked = shuffle(source).slice(0, n)
    setSession({
      mode: subset ? 'practice' : mode,
      items: picked.map((q) => ({ q, order: shuffle(q.options.map((_, i) => i)) })),
      answers: picked.map(() => null),
      revealed: picked.map(() => false),
      index: 0,
      finished: false,
      startedAt: Date.now(),
    })
    setNow(Date.now())
  }

  if (session) {
    const { items, index, answers, revealed } = session
    const cur = items[index]

    if (session.finished) {
      const correct = items.filter((it, i) => answers[i] === it.q.answer).length
      const missed = items.filter((it, i) => answers[i] !== it.q.answer).map((it) => it.q)
      const byModule = modules
        .map((m) => {
          const its = items.filter((it) => it.q.module === m.id)
          return { m, n: its.length, c: its.filter((it) => answers[items.indexOf(it)] === it.q.answer).length }
        })
        .filter((x) => x.n > 0)
      return (
        <div>
          <PageHeader eyebrow="Results" title={`${correct} / ${items.length} correct (${pct(correct, items.length)}%)`}>
            {session.mode === 'exam' && <>Time: {Math.round((now - session.startedAt) / 60000)} min. </>}Review every rationale, even for questions you got right.
          </PageHeader>
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {byModule.map(({ m, n, c }) => (
              <Card key={m.id} className="p-4">
                <div className="text-sm font-medium">{m.short}</div>
                <div className="mt-1 text-xl font-bold tabular-nums">{c}/{n}</div>
                <Progress value={pct(c, n)} className="mt-2" barClassName={pct(c, n) >= 75 ? 'bg-emerald-500' : pct(c, n) >= 50 ? 'bg-amber-500' : 'bg-red-500'} label={`${m.short} score`} />
              </Card>
            ))}
          </div>
          <div className="mb-8 flex flex-wrap gap-2">
            {missed.length > 0 && (
              <Button onClick={() => start(missed)}>
                <RotateCcw className="h-4 w-4" /> Retry the {missed.length} missed
              </Button>
            )}
            <Button variant="outline" onClick={() => setSession(null)}>New session</Button>
          </div>
          <h2 className="mb-3 text-lg font-bold">Review</h2>
          <ol className="space-y-6">
            {items.map((it, i) => (
              <li key={it.q.id}>
                <Card className="p-4 sm:p-6">
                  <QuestionView q={it.q} order={it.order} picked={answers[i]} reveal flagged={!!flagged[it.q.id]} onPick={() => {}} onFlag={() => toggleFlag(it.q.id)} index={i} total={items.length} />
                </Card>
              </li>
            ))}
          </ol>
        </div>
      )
    }

    const picked = answers[index]
    const isRevealed = revealed[index]
    const answeredCount = answers.filter((a) => a !== null).length

    const submit = () => {
      if (picked === null) return
      recordAttempt(cur.q.id, picked === cur.q.answer)
      setSession({ ...session, revealed: revealed.map((r, i) => (i === index ? true : r)) })
    }
    const goNext = () => {
      if (index < items.length - 1) setSession({ ...session, index: index + 1 })
      else finishSession()
    }
    const finishSession = () => {
      if (session.mode === 'exam') items.forEach((it, i) => answers[i] !== null && recordAttempt(it.q.id, answers[i] === it.q.answer))
      setSession({ ...session, finished: true })
    }

    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <button type="button" onClick={() => setSession(null)} className="text-sm text-muted-foreground hover:text-foreground">← End session</button>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {session.mode === 'exam' && (
              <span className="inline-flex items-center gap-1 tabular-nums"><Timer className="h-4 w-4" /> {Math.floor((now - session.startedAt) / 60000)}:{String(Math.floor(((now - session.startedAt) / 1000) % 60)).padStart(2, '0')}</span>
            )}
            <span className="tabular-nums">{answeredCount}/{items.length} answered</span>
          </div>
        </div>
        <Progress value={pct(index + (isRevealed ? 1 : 0), items.length)} className="mb-5" label="Session progress" />
        <Card className="p-4 sm:p-6">
          <QuestionView
            q={cur.q}
            order={cur.order}
            picked={picked}
            reveal={session.mode === 'practice' && isRevealed}
            flagged={!!flagged[cur.q.id]}
            onPick={(oi) => setSession({ ...session, answers: answers.map((a, i) => (i === index ? oi : a)) })}
            onFlag={() => toggleFlag(cur.q.id)}
            index={index}
            total={items.length}
          />
          <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
            <Button variant="ghost" size="sm" disabled={index === 0} onClick={() => setSession({ ...session, index: index - 1 })}>Previous</Button>
            {session.mode === 'practice' ? (
              isRevealed ? (
                <Button onClick={goNext}>{index < items.length - 1 ? 'Next question' : 'See results'} <ArrowRight className="h-4 w-4" /></Button>
              ) : (
                <Button onClick={submit} disabled={picked === null}>Check answer</Button>
              )
            ) : index < items.length - 1 ? (
              <Button onClick={goNext}>Next <ArrowRight className="h-4 w-4" /></Button>
            ) : (
              <Button onClick={finishSession}>Submit exam</Button>
            )}
          </div>
        </Card>
        {session.mode === 'exam' && (
          <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Question navigator">
            {items.map((it, i) => (
              <button key={it.q.id} type="button" onClick={() => setSession({ ...session, index: i })} className={cn('h-8 w-8 rounded-lg border text-xs font-medium tabular-nums', i === index ? 'border-primary bg-primary text-primary-foreground' : answers[i] !== null ? 'border-primary/40 bg-primary/10' : 'border-border bg-card')}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  const stats = moduleQuestionStats(attempts)
  const toggleModule = (id: ModuleId) => {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelected(next)
  }

  return (
    <div>
      <PageHeader eyebrow="Practice" title="Question bank">
        {questions.length} clinical vignettes at three levels (recall, application, next-best-step), each with a rationale for every option and its sources. Mixing topics (interleaving) builds the discrimination exams test.
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <Card className="space-y-6 p-5 sm:p-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-semibold">Topics</h2>
              <div className="flex gap-2 text-xs">
                <button type="button" className="text-primary hover:underline" onClick={() => setSelected(new Set(modules.map((m) => m.id)))}>All</button>
                <button type="button" className="text-muted-foreground hover:underline" onClick={() => setSelected(new Set())}>None</button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {modules.map((m) => (
                <Chip key={m.id} active={selected.has(m.id)} onClick={() => toggleModule(m.id)}>{m.short}</Chip>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <h2 className="mb-2 font-semibold">Mode</h2>
              <Segmented value={mode} onChange={setMode} label="Mode" options={[{ value: 'practice', label: 'Practice' }, { value: 'exam', label: 'Timed exam' }]} />
              <p className="mt-2 text-xs text-muted-foreground">{mode === 'practice' ? 'Instant feedback after each question.' : 'No feedback until you submit; timer runs.'}</p>
            </div>
            <div>
              <h2 className="mb-2 font-semibold">Length</h2>
              <Segmented value={count} onChange={setCount} label="Length" options={[{ value: '10', label: '10' }, { value: '20', label: '20' }, { value: 'all', label: 'All' }]} />
            </div>
          </div>
          <div>
            <h2 className="mb-2 font-semibold">Pool</h2>
            <Segmented value={pool} onChange={setPool} label="Question pool" options={[{ value: 'all', label: 'All' }, { value: 'unanswered', label: 'Unanswered' }, { value: 'incorrect', label: 'Missed' }, { value: 'flagged', label: 'Flagged' }]} />
          </div>
          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
            <Button size="lg" onClick={() => start()} disabled={available.length === 0}>
              <ClipboardList className="h-5 w-5" /> Start {count === 'all' ? available.length : Math.min(Number(count), available.length)} questions
            </Button>
            <span className="text-sm text-muted-foreground">{available.length} match these filters</span>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="mb-3 font-semibold">Your performance</h2>
          <ul className="space-y-3">
            {stats.map(({ module: m, total, answered, correct }) => (
              <li key={m.id}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{m.short}</span>
                  <span className="tabular-nums text-muted-foreground">{answered ? `${pct(correct, answered)}% · ` : ''}{answered}/{total}</span>
                </div>
                <Progress value={pct(answered, total)} className="h-1.5" barClassName={answered && pct(correct, answered) < 60 ? 'bg-amber-500' : undefined} label={`${m.short} answered`} />
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> last attempt counts</span>
            <span className="inline-flex items-center gap-1"><XCircle className="h-3.5 w-3.5 text-red-600" /> retry from “Missed”</span>
          </p>
          <p className="mt-2 text-xs text-muted-foreground"><Inline text="Progress is stored only on this device. Export it from [Settings](/settings)." /></p>
        </Card>
      </div>
    </div>
  )
}
