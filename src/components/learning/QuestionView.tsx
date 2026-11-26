import { CheckCircle2, Flag, XCircle } from 'lucide-react'
import type { Question } from '@/content/types'
import { moduleById } from '@/content'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Inline } from '@/components/content/Inline'
import { Sources } from './Sources'

const levelLabel = { 1: 'Recall', 2: 'Application', 3: 'Next best step' } as const

export interface QuestionViewProps {
  q: Question
  /** Display order of option indices. */
  order: number[]
  picked: number | null
  reveal: boolean
  flagged: boolean
  onPick: (optionIndex: number) => void
  onFlag: () => void
  index?: number
  total?: number
}

export function QuestionView({ q, order, picked, reveal, flagged, onPick, onFlag, index, total }: QuestionViewProps) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {index !== undefined && total !== undefined && (
          <span className="text-sm font-medium text-muted-foreground tabular-nums">
            {index + 1} / {total}
          </span>
        )}
        <Badge variant="secondary">{moduleById[q.module].short}</Badge>
        <Badge variant="outline">{q.topic}</Badge>
        <Badge variant="default">{levelLabel[q.level]}</Badge>
        <button type="button" onClick={onFlag} aria-pressed={flagged} className={cn('ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium', flagged ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300' : 'text-muted-foreground hover:bg-muted')}>
          <Flag className="h-3.5 w-3.5" /> {flagged ? 'Flagged' : 'Flag'}
        </button>
      </div>
      <p className="mb-4 text-[15px] leading-relaxed sm:text-base"><Inline text={q.stem} /></p>
      <div className="grid gap-2" role="radiogroup" aria-label="Answer options">
        {order.map((oi, pos) => {
          const isAnswer = oi === q.answer
          const isPicked = oi === picked
          return (
            <div key={oi}>
              <button
                type="button"
                role="radio"
                aria-checked={isPicked}
                disabled={reveal}
                onClick={() => onPick(oi)}
                className={cn(
                  'flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition-colors sm:text-[15px]',
                  !reveal && isPicked && 'border-primary bg-primary/10',
                  !reveal && !isPicked && 'border-border bg-card hover:border-primary/60',
                  reveal && isAnswer && 'border-emerald-500 bg-emerald-500/10',
                  reveal && isPicked && !isAnswer && 'border-red-500 bg-red-500/10',
                  reveal && !isAnswer && !isPicked && 'border-border bg-card',
                )}
              >
                <span className={cn('mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold', isPicked && !reveal ? 'border-primary bg-primary text-primary-foreground' : 'border-current opacity-70')}>
                  {String.fromCharCode(65 + pos)}
                </span>
                <span className="flex-1"><Inline text={q.options[oi]} /></span>
                {reveal && isAnswer && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" aria-label="Correct answer" />}
                {reveal && isPicked && !isAnswer && <XCircle className="h-5 w-5 shrink-0 text-red-600" aria-label="Your answer" />}
              </button>
              {reveal && q.why?.[oi] && (isPicked || isAnswer || picked !== null) && (
                <p className={cn('ml-9 mt-1 text-xs leading-relaxed', isAnswer ? 'text-emerald-800 dark:text-emerald-300' : 'text-muted-foreground')}>
                  <Inline text={q.why[oi]} />
                </p>
              )}
            </div>
          )
        })}
      </div>
      {reveal && (
        <div className={cn('mt-4 rounded-2xl border p-4 animate-fade-in', picked === q.answer ? 'border-emerald-500/40 bg-emerald-500/[0.06]' : 'border-red-500/40 bg-red-500/[0.06]')} aria-live="polite">
          <p className="font-semibold">{picked === null ? 'Not answered.' : picked === q.answer ? 'Correct.' : 'Incorrect.'}</p>
          <p className="mt-1 text-sm leading-relaxed"><Inline text={q.explanation} /></p>
          <Sources ids={q.refs} className="mt-3" />
        </div>
      )}
    </div>
  )
}
