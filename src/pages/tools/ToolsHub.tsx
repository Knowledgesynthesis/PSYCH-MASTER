import { Link } from 'react-router-dom'
import { ArrowLeftRight, ArrowRight, Gauge, LifeBuoy, Pill, Route, Thermometer } from 'lucide-react'
import { tools } from '@/content/nav'
import { PageHeader } from '@/components/PageHeader'

const icons = { Route, LifeBuoy, Gauge, ArrowLeftRight, Thermometer, Pill } as const

export function ToolsHub() {
  return (
    <div>
      <PageHeader eyebrow="Apply" title="Clinical tools">
        Each tool makes its reasoning visible, so using it teaches the logic rather than replacing it.
      </PageHeader>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tools.map((t) => {
          const Icon = icons[t.icon as keyof typeof icons] ?? Route
          return (
            <Link key={t.id} to={t.to} className="group flex gap-4 rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
              <div className="flex-1">
                <div className="text-xs font-semibold uppercase tracking-wide text-primary">{t.tag}</div>
                <h2 className="font-semibold">{t.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
