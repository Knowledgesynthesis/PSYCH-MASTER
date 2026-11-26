import { useState } from 'react'
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react'
import type { QuickCheck as QC } from '@/content/types'
import { useProgress } from '@/store/progress'
import { cn } from '@/lib/utils'
import { Inline } from '@/components/content/Inline'

export function QuickCheck({ check }: { check: QC }) {
  const record = useProgress((s) => s.answerCheck)
  const [picked, setPicked] = useState<number | null>(null)
  const answered = picked !== null
  const correct = picked === check.answer

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.06] to-transparent p-4 sm:p-5">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">Check yourself</div>
      <p className="mb-3 font-medium leading-snug"><Inline text={check.q} /></p>
      <div className="grid gap-2" role="group" aria-label="Answer options">
        {check.options.map((o, i) => {
          const isAnswer = i === check.answer
          const isPicked = i === picked
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => {
                setPicked(i)
                record(check.id, i === check.answer)
              }}
              className={cn(
                'flex items-start gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors',
                !answered && 'border-border bg-card hover:border-primary/60',
                answered && isAnswer && 'border-emerald-500 bg-emerald-500/10',
                answered && isPicked && !isAnswer && 'border-red-500 bg-red-500/10',
                answered && !isAnswer && !isPicked && 'border-border bg-card opacity-60',
              )}
            >
              <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[11px] font-semibold opacity-70">{String.fromCharCode(65 + i)}</span>
              <span className="flex-1"><Inline text={o} /></span>
              {answered && isAnswer && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-label="Correct answer" />}
              {answered && isPicked && !isAnswer && <XCircle className="h-4 w-4 shrink-0 text-red-600" aria-label="Your answer" />}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className="mt-3 animate-fade-in" aria-live="polite">
          <p className={cn('text-sm font-semibold', correct ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300')}>{correct ? 'Correct.' : 'Not quite.'}</p>
          <p className="text-sm leading-relaxed"><Inline text={check.why} /></p>
          <button type="button" onClick={() => setPicked(null)} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
            <RotateCcw className="h-3.5 w-3.5" /> Try again
          </button>
        </div>
      )}
    </div>
  )
}
