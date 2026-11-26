import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, CheckCircle2, Info, Lightbulb, OctagonAlert, TriangleAlert } from 'lucide-react'
import type { Block, Tone, WidgetName } from '@/content/types'
import { cn } from '@/lib/utils'
import { Inline } from './Inline'
import { Reveal, SortExercise } from './Interactive'
import { toneStyles } from './tones'
import { AlcoholTimeline } from '@/components/widgets/AlcoholTimeline'
import { ProfileHeatmap } from '@/components/widgets/ProfileHeatmap'
import { EpsTimeline } from '@/components/widgets/EpsTimeline'

const toneIcon: Record<Tone, typeof Info> = {
  danger: OctagonAlert,
  warning: AlertTriangle,
  info: Info,
  pearl: Lightbulb,
  pitfall: TriangleAlert,
  success: CheckCircle2,
}

function Widget({ name }: { name: WidgetName }) {
  switch (name) {
    case 'alcohol-timeline':
      return <AlcoholTimeline />
    case 'antipsychotic-profiles':
      return <ProfileHeatmap kind="antipsychotic" />
    case 'antidepressant-profiles':
      return <ProfileHeatmap kind="antidepressant" />
    case 'eps-timeline':
      return <EpsTimeline />
  }
}

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return (
        <p className="leading-relaxed text-pretty">
          <Inline text={block.text} />
        </p>
      )
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <div>
          {block.title && <h4 className="mb-2 font-semibold">{block.title}</h4>}
          <Tag className={cn('space-y-2', block.ordered ? 'list-decimal pl-5' : '')}>
            {block.items.map((it, i) => (
              <li key={i} className={cn('leading-relaxed', !block.ordered && 'relative pl-5 before:absolute before:left-1 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary/60')}>
                <Inline text={it} />
              </li>
            ))}
          </Tag>
        </div>
      )
    }
    case 'criteria':
      return (
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h4 className="font-semibold">{block.title}</h4>
            <span className="text-sm text-muted-foreground"><Inline text={block.rule} /></span>
          </div>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {block.items.map((it, i) => (
              <li key={i} className="flex items-start gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span><Inline text={it} /></span>
              </li>
            ))}
          </ul>
          {block.note && <p className="mt-3 text-sm text-muted-foreground"><Inline text={block.note} /></p>}
        </div>
      )
    case 'table':
      return (
        <figure>
          {block.caption && <figcaption className="mb-2 text-sm font-semibold">{block.caption}</figcaption>}
          <div className="-mx-4 overflow-x-auto px-4 scrollbar-thin sm:mx-0 sm:px-0">
            <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-xl text-sm">
              <thead>
                <tr className="bg-muted/70">
                  {block.head.map((h, i) => (
                    <th key={i} scope="col" className="border-b border-border px-3 py-2 text-left font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((r, ri) => (
                  <tr key={ri} className="align-top odd:bg-card even:bg-muted/25">
                    {r.map((c, ci) => (
                      <td key={ci} className={cn('border-b border-border px-3 py-2 leading-relaxed', ci === 0 && 'font-medium')}>
                        <Inline text={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      )
    case 'callout': {
      const Icon = toneIcon[block.tone]
      const s = toneStyles[block.tone]
      return (
        <div className={cn('rounded-2xl border p-4 sm:p-5', s.box)}>
          <div className={cn('mb-1.5 flex items-center gap-2 font-semibold', s.title)}>
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {block.title}
          </div>
          {block.text && <p className="text-sm leading-relaxed"><Inline text={block.text} /></p>}
          {block.items && (
            <ul className="space-y-1.5 text-sm">
              {block.items.map((it, i) => (
                <li key={i} className="relative pl-4 leading-relaxed before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-current before:opacity-40">
                  <Inline text={it} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )
    }
    case 'compare':
      return (
        <figure>
          {block.caption && <figcaption className="mb-2 text-sm font-semibold">{block.caption}</figcaption>}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[block.left, block.right].map((col, i) => (
              <div key={i} className={cn('rounded-2xl border p-4', i === 0 ? 'border-sky-500/30 bg-sky-500/[0.05]' : 'border-violet-500/30 bg-violet-500/[0.05]')}>
                <h4 className="mb-2 font-semibold">{col.title}</h4>
                <ul className="space-y-1.5 text-sm">
                  {col.items.map((it, j) => (
                    <li key={j} className="relative pl-4 leading-relaxed before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-current before:opacity-40">
                      <Inline text={it} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </figure>
      )
    case 'steps':
      return (
        <div>
          {block.title && <h4 className="mb-3 font-semibold">{block.title}</h4>}
          <ol className="relative space-y-3 border-l-2 border-primary/25 pl-5">
            {block.items.map((s, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[1.85rem] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">{i + 1}</span>
                <div className="font-semibold">{s.title}</div>
                <div className="text-sm leading-relaxed text-muted-foreground"><Inline text={s.text} /></div>
              </li>
            ))}
          </ol>
        </div>
      )
    case 'mnemonic':
      return (
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          <h4 className="mb-3 font-semibold">{block.title}</h4>
          <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {block.letters.map((l, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">{l.l}</span>
                <span className="pt-1"><Inline text={l.text} /></span>
              </li>
            ))}
          </ul>
          {block.note && <p className="mt-3 text-sm text-muted-foreground"><Inline text={block.note} /></p>}
        </div>
      )
    case 'timeline':
      return (
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          <h4 className="mb-3 font-semibold">{block.title}</h4>
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
            {block.points.map((pt, i) => (
              <li key={i} className={cn('rounded-xl border p-3', pt.tone ? toneStyles[pt.tone].box : 'border-border bg-muted/40')}>
                <div className={cn('text-xs font-semibold uppercase tracking-wide', pt.tone ? toneStyles[pt.tone].title : 'text-primary')}>{pt.at}</div>
                <div className="mt-0.5 font-semibold">{pt.label}</div>
                {pt.detail && <div className="mt-1 text-sm text-muted-foreground"><Inline text={pt.detail} /></div>}
              </li>
            ))}
          </ol>
        </div>
      )
    case 'reveal':
      return <Reveal block={block} />
    case 'sort':
      return <SortExercise block={block} />
    case 'widget':
      return <Widget name={block.name} />
    case 'links':
      return (
        <div className="grid gap-2">
          {block.title && <h4 className="font-semibold">{block.title}</h4>}
          {block.items.map((l) => (
            <Link key={l.to} to={l.to} className="group flex items-center justify-between gap-3 rounded-2xl border border-primary/25 bg-primary/[0.04] p-4 transition-colors hover:bg-primary/[0.08]">
              <span>
                <span className="font-semibold text-primary">{l.label}</span>
                {l.note && <span className="block text-sm text-muted-foreground">{l.note}</span>}
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      )
  }
}
