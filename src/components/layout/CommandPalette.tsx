import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, FileText, FlaskConical, Hash, LayoutGrid, Pill, Search, Stethoscope, Wrench } from 'lucide-react'
import { search, type SearchKind } from '@/lib/search'
import { cn } from '@/lib/utils'

const kindIcon: Record<SearchKind, typeof Search> = {
  Module: BookOpen, Section: Hash, Tool: Wrench, Term: FileText, Drug: Pill, Case: Stethoscope, Page: LayoutGrid,
}

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  const results = useMemo(() => search(q), [q])

  if (!open) return null

  const go = (to: string) => {
    onClose()
    navigate(to)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/50 p-3 pt-[10vh] backdrop-blur-sm" onMouseDown={onClose}>
      <div role="dialog" aria-modal="true" aria-label="Search" className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-fade-in" onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <input
            autoFocus
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setActive(0)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose()
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setActive((a) => Math.min(a + 1, results.length - 1))
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault()
                setActive((a) => Math.max(a - 1, 0))
              }
              if (e.key === 'Enter' && results[active]) go(results[active].to)
            }}
            placeholder="Search topics, drugs, terms, tools…"
            aria-label="Search"
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:block">Esc</kbd>
        </div>
        <ul className="max-h-[60vh] overflow-y-auto p-2" role="listbox">
          {q && results.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted-foreground">No results for “{q}”.</li>}
          {!q && (
            <li className="px-3 py-6 text-sm text-muted-foreground">
              <FlaskConical className="mb-2 h-5 w-5" aria-hidden="true" />
              Try “lithium toxicity”, “clozapine”, “CIWA”, “bipolar depression”, “safety plan”.
            </li>
          )}
          {results.map((r, i) => {
            const Icon = kindIcon[r.kind]
            return (
              <li key={r.id} role="option" aria-selected={i === active}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r.to)}
                  className={cn('flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left', i === active ? 'bg-primary/10' : 'hover:bg-muted')}
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{r.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">{r.subtitle}</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{r.kind}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
