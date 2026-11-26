import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { references } from '@/content/references'
import type { RefKind } from '@/content/types'
import { modules, CONTENT_REVIEWED } from '@/content'
import { questions } from '@/content/questions'
import { cases } from '@/content/cases'
import { PageHeader } from '@/components/PageHeader'
import { Badge } from '@/components/ui/badge'

const kindLabel: Record<RefKind, string> = { guideline: 'Clinical guidelines', manual: 'Diagnostic & prescribing manuals', regulatory: 'Regulatory & approvals', review: 'Systematic reviews & meta-analyses', trial: 'Trials & cohort studies', tool: 'Validated instruments' }
const order: RefKind[] = ['guideline', 'manual', 'regulatory', 'review', 'trial', 'tool']

export function References() {
  const citedIn = useMemo(() => {
    const map = new Map<string, { label: string; to: string }[]>()
    const add = (id: string, label: string, to: string) => {
      const arr = map.get(id) ?? []
      if (!arr.some((x) => x.to === to)) arr.push({ label, to })
      map.set(id, arr)
    }
    for (const m of modules) for (const s of m.sections) for (const r of s.refs ?? []) add(r, `${m.short}: ${s.title}`, `${m.path}#${s.id}`)
    for (const c of cases) for (const r of c.refs ?? []) add(r, `Case: ${c.title}`, `/practice/cases/${c.id}`)
    for (const q of questions) for (const r of q.refs ?? []) add(r, 'Question bank', `/practice/questions?module=${q.module}`)
    return map
  }, [])

  return (
    <div>
      <PageHeader eyebrow="Evidence" title="References">
        {references.length} sources, cited throughout. Content reviewed {CONTENT_REVIEWED}, including regulatory changes through late 2026. Journal articles link to PubMed; guidelines link to the issuing body.
      </PageHeader>
      <div className="space-y-10">
        {order.map((k) => {
          const list = references.filter((r) => r.kind === k).sort((a, b) => b.year - a.year)
          if (!list.length) return null
          return (
            <section key={k}>
              <h2 className="mb-3 text-lg font-bold">{kindLabel[k]}</h2>
              <ol className="space-y-3">
                {list.map((r) => (
                  <li key={r.id} id={r.id} className="scroll-mt-24 rounded-2xl border border-border bg-card p-4 target:border-primary target:ring-2 target:ring-primary/30">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{r.short}</span>
                      <Badge variant="secondary">{r.year}</Badge>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{r.full}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                      {r.url && (
                        <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-primary">
                          Open source <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {(citedIn.get(r.id) ?? []).slice(0, 4).map((c) => (
                        <Link key={c.to} to={c.to} className="text-muted-foreground underline-offset-2 hover:underline">{c.label}</Link>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )
        })}
      </div>
    </div>
  )
}
