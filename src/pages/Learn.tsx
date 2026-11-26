import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { modules } from '@/content'
import { questions } from '@/content/questions'
import { useProgress } from '@/store/progress'
import { PageHeader } from '@/components/PageHeader'
import { Progress } from '@/components/ui/progress'
import { ModuleIcon } from '@/components/icons'
import { cn, pct } from '@/lib/utils'

export function Learn() {
  const sections = useProgress((s) => s.sections)
  return (
    <div>
      <PageHeader eyebrow="Learn" title="Modules">
        Each module is cited, ends with practice, and links to the tools that apply it. Work through them in order or jump to what you need.
      </PageHeader>
      <div className="grid gap-4 md:grid-cols-2">
        {modules.map((m, i) => {
          const d = m.sections.filter((s) => sections[`${m.id}/${s.id}`]).length
          const nq = questions.filter((q) => q.module === m.id).length
          return (
            <Link key={m.id} to={m.path} className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white', m.color)}>
                  <ModuleIcon name={m.icon} className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-muted-foreground">Module {i + 1}</div>
                  <h2 className="text-lg font-semibold leading-snug">{m.title}</h2>
                </div>
              </div>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{m.summary}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> ~{m.minutes} min</span>
                <span>{m.sections.length} sections</span>
                <span>{nq} questions</span>
                <span>{m.flashcards.length} flashcards</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Progress value={pct(d, m.sections.length)} label={`${m.title} progress`} />
                <span className="text-xs tabular-nums text-muted-foreground">{pct(d, m.sections.length)}%</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
