import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, Circle, ClipboardList, Clock, Layers, Phone, Stethoscope, Target } from 'lucide-react'
import { modules, moduleById } from '@/content'
import type { ModuleId } from '@/content/types'
import { questions } from '@/content/questions'
import { cases } from '@/content/cases'
import { useProgress } from '@/store/progress'
import { BlockView } from '@/components/content/Blocks'
import { Inline } from '@/components/content/Inline'
import { QuickCheck } from '@/components/learning/QuickCheck'
import { Sources } from '@/components/learning/Sources'
import { ModuleIcon } from '@/components/icons'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { cn, pct } from '@/lib/utils'

export function ModulePage() {
  const { moduleId } = useParams()
  const m = moduleById[moduleId as ModuleId]
  const { sections, toggleSection, visit } = useProgress()
  const [showObjectives, setShowObjectives] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (m) visit(m.path, m.title)
  }, [m, visit])

  // Highlight the section currently in view in the table of contents.
  useEffect(() => {
    if (!m || typeof IntersectionObserver === 'undefined') return
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    m.sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [m])

  if (!m) return <Navigate to="/learn" replace />

  const idx = modules.findIndex((x) => x.id === m.id)
  const prev = modules[idx - 1]
  const next = modules[idx + 1]
  const done = m.sections.filter((s) => sections[`${m.id}/${s.id}`]).length
  const nq = questions.filter((q) => q.module === m.id).length
  const moduleCases = cases.filter((c) => c.module === m.id)

  return (
    <div>
      <Link to="/learn" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All modules
      </Link>

      <header className="mb-8">
        <div className="flex items-start gap-4">
          <div className={cn('flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow', m.color)}>
            <ModuleIcon name={m.icon} className="h-7 w-7" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Module {idx + 1} of {modules.length}</div>
            <h1 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">{m.title}</h1>
          </div>
        </div>
        <p className="mt-3 max-w-3xl text-muted-foreground text-pretty">{m.summary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> ~{m.minutes} min</span>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> {done}/{m.sections.length} sections learned</span>
          <span className="inline-flex items-center gap-1.5"><ClipboardList className="h-4 w-4" /> {nq} questions</span>
        </div>
        <Progress value={pct(done, m.sections.length)} className="mt-3 max-w-md" label="Module progress" />

        {m.id === 'suicide' && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/[0.06] p-3 text-sm">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
            <span>If you or someone you know is in crisis: call or text <strong>988</strong> (US Suicide &amp; Crisis Lifeline) or your local emergency number.</span>
          </div>
        )}

        <button type="button" onClick={() => setShowObjectives((v) => !v)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary" aria-expanded={showObjectives}>
          <Target className="h-4 w-4" /> Learning objectives <ChevronDown className={cn('h-4 w-4 transition-transform', showObjectives && 'rotate-180')} />
        </button>
        {showObjectives && (
          <ul className="mt-2 max-w-3xl space-y-1.5 rounded-2xl border border-border bg-card p-4 text-sm animate-fade-in">
            {m.objectives.map((o) => (
              <li key={o} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {o}</li>
            ))}
          </ul>
        )}
      </header>

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_220px]">
        <div className="min-w-0 space-y-14">
          {m.sections.map((s, si) => {
            const key = `${m.id}/${s.id}`
            const learned = !!sections[key]
            return (
              <section key={s.id} id={s.id} className="scroll-mt-20">
                <div className="mb-4">
                  <div className="text-xs font-semibold tabular-nums text-muted-foreground">{m.short} · {si + 1}/{m.sections.length}</div>
                  <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{s.title}</h2>
                  {s.lead && <p className="mt-1 font-medium text-primary/90"><Inline text={s.lead} /></p>}
                </div>
                <div className="space-y-5">
                  {s.blocks.map((b, bi) => (
                    <BlockView key={bi} block={b} />
                  ))}
                </div>
                <Sources ids={s.refs} className="mt-5" />
                {s.check && s.check.length > 0 && (
                  <div className="mt-6 space-y-4">
                    {s.check.map((c) => (
                      <QuickCheck key={c.id} check={c} />
                    ))}
                  </div>
                )}
                <div className="mt-6 flex justify-end">
                  <Button variant={learned ? 'secondary' : 'outline'} size="sm" onClick={() => toggleSection(key)} aria-pressed={learned}>
                    {learned ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Circle className="h-4 w-4" />}
                    {learned ? 'Learned' : 'Mark as learned'}
                  </Button>
                </div>
              </section>
            )
          })}

          <section className="rounded-2xl border border-primary/30 bg-primary/[0.05] p-5 sm:p-6">
            <h2 className="mb-3 text-lg font-bold">Key takeaways</h2>
            <ul className="space-y-2">
              {m.takeaways.map((t) => (
                <li key={t} className="flex gap-2 leading-relaxed"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" /> <span><Inline text={t} /></span></li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold">Lock it in</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link to={`/practice/questions?module=${m.id}`} className="rounded-2xl border border-border bg-card p-4 hover:shadow-md">
                <ClipboardList className="mb-2 h-5 w-5 text-primary" />
                <div className="font-semibold">{nq} questions</div>
                <div className="text-sm text-muted-foreground">Vignettes with a rationale for every option.</div>
              </Link>
              <Link to={`/practice/flashcards?module=${m.id}`} className="rounded-2xl border border-border bg-card p-4 hover:shadow-md">
                <Layers className="mb-2 h-5 w-5 text-primary" />
                <div className="font-semibold">{m.flashcards.length} flashcards</div>
                <div className="text-sm text-muted-foreground">Spaced repetition for durable recall.</div>
              </Link>
              <Link to={moduleCases[0] ? `/practice/cases/${moduleCases[0].id}` : '/practice/cases'} className="rounded-2xl border border-border bg-card p-4 hover:shadow-md">
                <Stethoscope className="mb-2 h-5 w-5 text-primary" />
                <div className="font-semibold">{moduleCases.length ? `${moduleCases.length} case${moduleCases.length > 1 ? 's' : ''}` : 'Clinical cases'}</div>
                <div className="text-sm text-muted-foreground">Make decisions step by step.</div>
              </Link>
            </div>
          </section>

          <nav className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between" aria-label="Module navigation">
            {prev ? (
              <Link to={prev.path} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> {prev.title}</Link>
            ) : <span />}
            {next && (
              <Link to={next.path} className="inline-flex items-center gap-2 text-sm font-semibold text-primary">Next: {next.title} <ArrowRight className="h-4 w-4" /></Link>
            )}
          </nav>
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-8">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">On this page</div>
            <ol className="space-y-1 border-l border-border text-sm">
              {m.sections.map((s) => {
                const learned = !!sections[`${m.id}/${s.id}`]
                return (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className={cn('-ml-px flex items-start gap-2 border-l-2 py-1 pl-3 pr-1 leading-snug transition-colors', activeId === s.id ? 'border-primary font-medium text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground')}>
                      {learned ? <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" /> : <Circle className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-40" />}
                      {s.title}
                    </a>
                  </li>
                )
              })}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  )
}
