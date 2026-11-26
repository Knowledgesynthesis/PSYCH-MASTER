import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Layers, PartyPopper, RotateCcw } from 'lucide-react'
import { allFlashcards, modules, moduleById } from '@/content'
import type { ModuleId } from '@/content/types'
import { useProgress } from '@/store/progress'
import { previewInterval, type Grade } from '@/lib/srs'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Chip } from '@/components/ui/segmented'
import { Progress } from '@/components/ui/progress'
import { Inline } from '@/components/content/Inline'
import { cn, pct } from '@/lib/utils'

const NEW_PER_SESSION = 20
const grades: { g: Grade; label: string; key: string; cls: string }[] = [
  { g: 'again', label: 'Again', key: '1', cls: 'border-red-500/40 text-red-700 dark:text-red-300 hover:bg-red-500/10' },
  { g: 'hard', label: 'Hard', key: '2', cls: 'border-amber-500/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500/10' },
  { g: 'good', label: 'Good', key: '3', cls: 'border-emerald-500/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10' },
  { g: 'easy', label: 'Easy', key: '4', cls: 'border-sky-500/40 text-sky-700 dark:text-sky-300 hover:bg-sky-500/10' },
]

export function Flashcards() {
  const [params] = useSearchParams()
  const initial = params.get('module') as ModuleId | null
  const [deck, setDeck] = useState<ModuleId | 'all'>(initial && moduleById[initial] ? initial : 'all')
  const { cards, gradeCard } = useProgress()
  const [queue, setQueue] = useState<string[] | null>(null)
  const [flipped, setFlipped] = useState(false)
  const [reviewed, setReviewed] = useState(0)
  const [now, setNow] = useState(() => Date.now())

  const deckCards = useMemo(() => allFlashcards.filter((c) => deck === 'all' || c.module === deck), [deck])
  const due = deckCards.filter((c) => cards[c.id] && cards[c.id].due <= now)
  const fresh = deckCards.filter((c) => !cards[c.id])
  const learned = deckCards.filter((c) => cards[c.id] && cards[c.id].interval >= 21).length

  const start = () => {
    setNow(Date.now())
    setQueue([...due.map((c) => c.id), ...fresh.slice(0, NEW_PER_SESSION).map((c) => c.id)])
    setFlipped(false)
    setReviewed(0)
  }

  const current = queue?.[0] ? allFlashcards.find((c) => c.id === queue[0]) : undefined

  const grade = useCallback(
    (g: Grade) => {
      if (!queue || !current) return
      gradeCard(current.id, g)
      setNow(Date.now())
      setReviewed((r) => r + 1)
      setFlipped(false)
      // "Again" re-queues the card a few positions later in this session.
      const rest = queue.slice(1)
      if (g === 'again') rest.splice(Math.min(3, rest.length), 0, current.id)
      setQueue(rest)
    },
    [queue, current, gradeCard],
  )

  useEffect(() => {
    if (!current) return
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        setFlipped((f) => !f)
      }
      if (flipped) {
        const g = grades.find((x) => x.key === e.key)
        if (g) grade(g.g)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, flipped, grade])

  if (queue && current) {
    const total = reviewed + queue.length
    const s = cards[current.id]
    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
          <button type="button" onClick={() => setQueue(null)} className="hover:text-foreground">← End review</button>
          <span className="tabular-nums">{reviewed} reviewed · {queue.length} left</span>
        </div>
        <Progress value={pct(reviewed, total)} className="mb-5" label="Review progress" />
        <div className="flip-card">
          <button type="button" onClick={() => setFlipped((f) => !f)} className={cn('flip-inner relative block min-h-[260px] w-full text-left', flipped && 'is-flipped')} aria-label={flipped ? 'Show question' : 'Show answer'}>
            <Card className="flip-face absolute inset-0 flex flex-col p-6 sm:p-8">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-primary">{moduleById[current.module].short} · {s ? 'review' : 'new'}</div>
              <div className="flex flex-1 items-center text-lg font-semibold leading-snug sm:text-xl"><span><Inline text={current.front} /></span></div>
              <div className="mt-4 text-xs text-muted-foreground">Tap or press Space to reveal</div>
            </Card>
            <Card className="flip-face flip-back absolute inset-0 flex flex-col border-primary/40 p-6 sm:p-8">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground"><Inline text={current.front} /></div>
              <div className="flex flex-1 items-center text-base leading-relaxed sm:text-lg"><span><Inline text={current.back} /></span></div>
            </Card>
          </button>
        </div>
        <div className={cn('mt-5 grid grid-cols-4 gap-2 transition-opacity', flipped ? 'opacity-100' : 'pointer-events-none opacity-0')} aria-hidden={!flipped}>
          {grades.map(({ g, label, key, cls }) => (
            <button key={g} type="button" onClick={() => grade(g)} className={cn('rounded-xl border bg-card px-2 py-2.5 text-sm font-semibold transition-colors', cls)}>
              {label}
              <span className="block text-[11px] font-normal opacity-70">{previewInterval(s, g, now)} · {key}</span>
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">Be honest: “Good” only if you recalled it before flipping.</p>
      </div>
    )
  }

  return (
    <div>
      <PageHeader eyebrow="Practice" title="Flashcards">
        {allFlashcards.length} high-yield cards scheduled with spaced repetition: each review pushes the next one further out, right before you would forget.
      </PageHeader>
      {queue && !current && (
        <Card className="mb-6 flex items-center gap-4 border-emerald-500/40 bg-emerald-500/[0.06] p-5">
          <PartyPopper className="h-8 w-8 text-emerald-600" />
          <div>
            <div className="font-semibold">Session complete: {reviewed} reviews.</div>
            <div className="text-sm text-muted-foreground">Come back tomorrow; due cards will be waiting. Then try the <Link to="/practice/questions" className="text-primary underline">question bank</Link>.</div>
          </div>
        </Card>
      )}
      <div className="mb-5 flex flex-wrap gap-2">
        <Chip active={deck === 'all'} onClick={() => setDeck('all')}>All decks</Chip>
        {modules.map((m) => (
          <Chip key={m.id} active={deck === m.id} onClick={() => setDeck(m.id)}>{m.short}</Chip>
        ))}
      </div>
      <Card className="p-5 sm:p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div><div className="text-2xl font-bold tabular-nums text-primary">{due.length}</div><div className="text-xs text-muted-foreground">Due now</div></div>
          <div><div className="text-2xl font-bold tabular-nums">{fresh.length}</div><div className="text-xs text-muted-foreground">New</div></div>
          <div><div className="text-2xl font-bold tabular-nums text-emerald-600">{learned}</div><div className="text-xs text-muted-foreground">Mature (≥21 d)</div></div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" onClick={start} disabled={due.length + fresh.length === 0}>
            <Layers className="h-5 w-5" /> Review {due.length + Math.min(fresh.length, NEW_PER_SESSION)} cards
          </Button>
          {due.length + fresh.length === 0 && (
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground"><RotateCcw className="h-4 w-4" /> Nothing due. Come back later.</span>
          )}
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">Up to {NEW_PER_SESSION} new cards per session. Keyboard: Space to flip, 1–4 to grade.</p>
      </Card>
    </div>
  )
}
