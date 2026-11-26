import { Link } from 'react-router-dom'
import { ArrowRight, BookOpenCheck, Brain, ClipboardList, Flame, Layers, Repeat2, Target, Wrench } from 'lucide-react'
import { modules } from '@/content'
import { tools } from '@/content/nav'
import { questions } from '@/content/questions'
import { cases } from '@/content/cases'
import { useProgress, streak } from '@/store/progress'
import { accuracy, dueCount, sectionsDone, totalSections, weakTopics } from '@/lib/stats'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ModuleIcon } from '@/components/icons'
import { cn, pct } from '@/lib/utils'

export function Home() {
  const p = useProgress()
  const done = sectionsDone(p.sections)
  const acc = accuracy(p.attempts)
  const cards = dueCount(p.cards)
  const days = streak(p.activity)
  const weak = weakTopics(p.attempts)
  const nextModule = modules.find((m) => m.sections.some((s) => !p.sections[`${m.id}/${s.id}`])) ?? modules[0]
  const nextSection = nextModule.sections.find((s) => !p.sections[`${nextModule.id}/${s.id}`]) ?? nextModule.sections[0]
  const continueTo = p.lastVisited ?? { path: `${nextModule.path}#${nextSection.id}`, label: `${nextModule.title}: ${nextSection.title}` }

  const stats = [
    { label: 'Sections learned', value: `${done}/${totalSections}`, icon: BookOpenCheck, bar: pct(done, totalSections) },
    { label: 'Question accuracy', value: acc.answered ? `${pct(acc.correct, acc.answered)}%` : '—', icon: Target, sub: `${acc.answered}/${acc.total} answered` },
    { label: 'Flashcards due', value: String(cards.due), icon: Layers, sub: `${cards.fresh} new` },
    { label: 'Day streak', value: String(days), icon: Flame, sub: days ? 'Keep it going' : 'Start today' },
  ]

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-indigo-600 via-indigo-600 to-teal-600 p-6 text-white shadow-lg sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
        <div className="relative max-w-2xl">
          <p className="mb-2 text-sm font-medium text-white/80">Evidence-based · cited · reviewed November 2026</p>
          <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">Psychiatry you can use on the next patient.</h1>
          <p className="mt-3 text-white/85 text-pretty">
            Eight cited modules, six clinical tools, {cases.length} branching cases, {questions.length} vignette questions and spaced-repetition flashcards, built on retrieval practice and spacing, the two study methods with the strongest evidence.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={continueTo.path} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow hover:bg-white/90">
              {p.lastVisited ? 'Continue' : 'Start learning'} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/practice/questions" className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/25">
              <ClipboardList className="h-4 w-4" /> Test yourself
            </Link>
          </div>
          <p className="mt-3 truncate text-xs text-white/70">{p.lastVisited ? `Last: ${continueTo.label}` : `Next: ${continueTo.label}`}</p>
        </div>
      </section>

      <section aria-label="Your progress" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <s.icon className="h-4 w-4 text-primary" /> {s.label}
            </div>
            <div className="mt-1.5 text-2xl font-bold tabular-nums">{s.value}</div>
            {s.bar !== undefined ? <Progress value={s.bar} className="mt-2" label={s.label} /> : <div className="mt-1 text-xs text-muted-foreground">{s.sub}</div>}
          </Card>
        ))}
      </section>

      {(cards.due > 0 || weak.length > 0) && (
        <section className="grid gap-3 md:grid-cols-2">
          {cards.due > 0 && (
            <Link to="/practice/flashcards" className="group flex items-center gap-4 rounded-2xl border border-primary/30 bg-primary/[0.05] p-4 hover:bg-primary/[0.09]">
              <Repeat2 className="h-8 w-8 shrink-0 text-primary" />
              <div className="flex-1">
                <div className="font-semibold">{cards.due} flashcard{cards.due === 1 ? '' : 's'} due for review</div>
                <div className="text-sm text-muted-foreground">Reviewing right before you forget is what makes memories stick.</div>
              </div>
              <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
          {weak.length > 0 && (
            <div className="rounded-2xl border border-amber-500/35 bg-amber-500/[0.06] p-4">
              <div className="mb-2 font-semibold">Weak spots to revisit</div>
              <ul className="space-y-1 text-sm">
                {weak.map((w) => (
                  <li key={w.topic + w.module} className="flex items-center justify-between gap-2">
                    <Link className="underline-offset-2 hover:underline" to={`/practice/questions?module=${w.module}`}>{w.topic}</Link>
                    <span className="tabular-nums text-muted-foreground">{Math.round(w.acc * 100)}% of {w.n}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Learning path</h2>
            <p className="text-sm text-muted-foreground">Recommended order. Each module ends with practice.</p>
          </div>
          <Link to="/learn" className="text-sm font-medium text-primary hover:underline">All modules</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {modules.map((m, i) => {
            const d = m.sections.filter((s) => p.sections[`${m.id}/${s.id}`]).length
            return (
              <Link key={m.id} to={m.path} className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-md">
                <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm', m.color)}>
                  <ModuleIcon name={m.icon} className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <span className="truncate font-semibold">{m.title}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Progress value={pct(d, m.sections.length)} className="h-1.5" label={`${m.title} progress`} />
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{d}/{m.sections.length}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-1 text-xl font-bold tracking-tight">Clinical tools</h2>
        <p className="mb-4 text-sm text-muted-foreground">Apply what you learned to realistic inputs; each tool explains its reasoning.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.id} to={t.to} className="group rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-md">
              <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary"><Wrench className="h-3.5 w-3.5" /> {t.tag}</div>
              <div className="font-semibold">{t.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h2 className="mb-1 flex items-center gap-2 text-lg font-bold"><Brain className="h-5 w-5 text-primary" /> How to reach mastery here</h2>
        <p className="mb-4 text-sm text-muted-foreground">The loop below uses retrieval practice, spacing and interleaving, which rank highest in learning-science reviews.</p>
        <ol className="grid gap-3 sm:grid-cols-4">
          {[
            ['Learn', 'Read one section; attempt its "Check yourself" before moving on.'],
            ['Retrieve', 'Do the module\'s question set; read every rationale, including for the options you ruled out.'],
            ['Space', 'Review due flashcards daily; 10 minutes beats a weekend cram.'],
            ['Apply', 'Run a case and the related tool; then mix modules in exam mode.'],
          ].map(([t, d], i) => (
            <li key={t} className="rounded-xl bg-muted/50 p-3">
              <div className="text-xs font-semibold text-primary">Step {i + 1}</div>
              <div className="font-semibold">{t}</div>
              <div className="mt-1 text-sm text-muted-foreground">{d}</div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
