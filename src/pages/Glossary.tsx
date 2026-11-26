import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { glossary } from '@/content/glossary'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Chip } from '@/components/ui/segmented'

export function Glossary() {
  const [params] = useSearchParams()
  const [q, setQ] = useState(() => params.get('q') ?? '')
  const [cat, setCat] = useState<string | null>(null)
  const categories = useMemo(() => [...new Set(glossary.map((g) => g.category))].sort(), [])
  const list = useMemo(() => {
    const t = q.trim().toLowerCase()
    return glossary
      .filter((g) => (!cat || g.category === cat) && (!t || g.term.toLowerCase().includes(t) || g.definition.toLowerCase().includes(t)))
      .sort((a, b) => a.term.localeCompare(b.term))
  }, [q, cat])
  const byLetter = useMemo(() => {
    const m = new Map<string, typeof list>()
    for (const g of list) {
      const L = g.term[0].toUpperCase()
      m.set(L, [...(m.get(L) ?? []), g])
    }
    return [...m.entries()]
  }, [list])

  return (
    <div>
      <PageHeader eyebrow="Reference" title="Glossary">{glossary.length} terms, defined the way you will use them clinically.</PageHeader>
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search terms and definitions…" aria-label="Search glossary" className="h-11 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm outline-none focus:border-primary" />
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        <Chip active={!cat} onClick={() => setCat(null)}>All</Chip>
        {categories.map((c) => <Chip key={c} active={cat === c} onClick={() => setCat(cat === c ? null : c)}>{c}</Chip>)}
      </div>
      <p className="mb-4 text-sm text-muted-foreground">{list.length} of {glossary.length} terms</p>
      {list.length === 0 && <Card className="p-8 text-center text-muted-foreground">No matching terms.</Card>}
      <div className="space-y-8">
        {byLetter.map(([L, items]) => (
          <section key={L}>
            <h2 className="mb-3 text-sm font-bold text-primary">{L}</h2>
            <dl className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {items.map((g) => (
                <Card key={g.term} className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <dt className="font-semibold">{g.term}</dt>
                    <Badge variant="secondary" className="shrink-0">{g.category}</Badge>
                  </div>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{g.definition}</dd>
                </Card>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  )
}
