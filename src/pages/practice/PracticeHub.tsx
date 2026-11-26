import { Link } from 'react-router-dom'
import { ArrowRight, ClipboardList, Layers, Stethoscope } from 'lucide-react'
import { allFlashcards } from '@/content'
import { questions } from '@/content/questions'
import { cases } from '@/content/cases'
import { useProgress } from '@/store/progress'
import { accuracy, dueCount } from '@/lib/stats'
import { PageHeader } from '@/components/PageHeader'
import { pct } from '@/lib/utils'

export function PracticeHub() {
  const p = useProgress()
  const acc = accuracy(p.attempts)
  const cards = dueCount(p.cards)
  const casesDone = Object.keys(p.cases).length
  const items = [
    { to: '/practice/questions', icon: ClipboardList, title: 'Question bank', desc: `${questions.length} vignettes with per-option rationales; practice or timed exam mode.`, stat: acc.answered ? `${pct(acc.correct, acc.answered)}% accuracy · ${acc.answered} answered` : 'Not started' },
    { to: '/practice/flashcards', icon: Layers, title: 'Flashcards', desc: `${allFlashcards.length} spaced-repetition cards across all modules.`, stat: `${cards.due} due · ${cards.fresh} new` },
    { to: '/practice/cases', icon: Stethoscope, title: 'Clinical cases', desc: `${cases.length} step-by-step decision cases with debriefs.`, stat: `${casesDone}/${cases.length} completed` },
  ]
  return (
    <div>
      <PageHeader eyebrow="Practice" title="Practice">Retrieval beats rereading. Test yourself early and often, then space the reviews.</PageHeader>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((it) => (
          <Link key={it.to} to={it.to} className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
            <it.icon className="mb-3 h-7 w-7 text-primary" />
            <h2 className="text-lg font-semibold">{it.title}</h2>
            <p className="mt-1 flex-1 text-sm text-muted-foreground">{it.desc}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{it.stat}</span>
              <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
