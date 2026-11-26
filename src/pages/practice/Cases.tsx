import { Link } from 'react-router-dom'
import { CheckCircle2, Stethoscope } from 'lucide-react'
import { cases } from '@/content/cases'
import { moduleById } from '@/content'
import { useProgress } from '@/store/progress'
import { PageHeader } from '@/components/PageHeader'
import { Badge } from '@/components/ui/badge'
import { pct } from '@/lib/utils'

export function Cases() {
  const results = useProgress((s) => s.cases)
  return (
    <div>
      <PageHeader eyebrow="Practice" title="Clinical cases">
        Realistic, synthetic patients. Make each decision, get immediate feedback on why it was best, acceptable or harmful, then read the debrief.
      </PageHeader>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cases.map((c) => {
          const r = results[c.id]
          return (
            <Link key={c.id} to={`/practice/cases/${c.id}`} className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{moduleById[c.module].short}</Badge>
                <Badge variant={c.difficulty === 'advanced' ? 'warning' : 'outline'}>{c.difficulty}</Badge>
                <span className="text-xs text-muted-foreground">{c.setting}</span>
              </div>
              <h2 className="flex items-center gap-2 text-lg font-semibold"><Stethoscope className="h-5 w-5 text-primary" /> {c.title}</h2>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{c.summary}</p>
              <div className="mt-3 text-xs text-muted-foreground">
                {r ? (
                  <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5" /> Best score {pct(r.score, r.max)}%</span>
                ) : (
                  <span>{c.steps.length} decisions</span>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
