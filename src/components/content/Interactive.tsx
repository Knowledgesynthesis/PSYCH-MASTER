import { useState } from 'react'
import { CheckCircle2, Eye, RotateCcw, XCircle } from 'lucide-react'
import type { Block } from '@/content/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Inline } from './Inline'

type SortBlock = Extract<Block, { type: 'sort' }>
type RevealBlock = Extract<Block, { type: 'reveal' }>

export function SortExercise({ block }: { block: SortBlock }) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const done = Object.keys(answers).length
  const correct = block.items.filter((it, i) => answers[i] === it.cat).length
  return (
    <div className="rounded-2xl border border-primary/25 bg-primary/[0.03] p-4 sm:p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-primary">Practice · classify</div>
          <h4 className="font-semibold"><Inline text={block.prompt} /></h4>
        </div>
        {done > 0 && (
          <Button size="sm" variant="ghost" onClick={() => setAnswers({})} aria-label="Reset exercise">
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
        )}
      </div>
      <ol className="space-y-3">
        {block.items.map((it, i) => {
          const picked = answers[i]
          const answered = picked !== undefined
          return (
            <li key={i} className="rounded-xl border border-border bg-card p-3">
              <p className="mb-2 text-sm"><Inline text={it.text} /></p>
              <div className="flex flex-wrap gap-1.5">
                {block.categories.map((c, ci) => {
                  const isPicked = picked === ci
                  const isRight = it.cat === ci
                  return (
                    <button
                      key={c}
                      type="button"
                      disabled={answered}
                      onClick={() => setAnswers((a) => ({ ...a, [i]: ci }))}
                      className={cn(
                        'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                        !answered && 'border-border hover:border-primary hover:text-primary',
                        answered && isRight && 'border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200',
                        answered && isPicked && !isRight && 'border-red-500 bg-red-500/15 text-red-800 dark:text-red-200',
                        answered && !isPicked && !isRight && 'border-border opacity-50',
                      )}
                    >
                      {c}
                    </button>
                  )
                })}
              </div>
              {answered && (
                <p className={cn('mt-2 flex items-start gap-1.5 text-xs', picked === it.cat ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300')}>
                  {picked === it.cat ? <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" /> : <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />}
                  <span className="text-foreground/80">{it.why}</span>
                </p>
              )}
            </li>
          )
        })}
      </ol>
      {done === block.items.length && (
        <p className="mt-3 text-sm font-medium">
          Score: {correct}/{block.items.length} {correct === block.items.length ? '· Perfect.' : '· Review the explanations above.'}
        </p>
      )}
    </div>
  )
}

export function Reveal({ block }: { block: RevealBlock }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl border border-dashed border-primary/40 p-4 sm:p-5">
      <div className="text-xs font-semibold uppercase tracking-wide text-primary">Think first</div>
      <p className="mt-1 font-medium"><Inline text={block.prompt} /></p>
      {open ? (
        <p className="mt-3 rounded-xl bg-muted/60 p-3 text-sm leading-relaxed animate-fade-in"><Inline text={block.answer} /></p>
      ) : (
        <Button className="mt-3" size="sm" variant="outline" onClick={() => setOpen(true)}>
          <Eye className="h-4 w-4" /> Reveal answer
        </Button>
      )}
    </div>
  )
}
