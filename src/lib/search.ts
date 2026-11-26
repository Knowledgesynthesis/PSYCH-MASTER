import { modules } from '@/content'
import { glossary } from '@/content/glossary'
import { drugs } from '@/content/drugs'
import { cases } from '@/content/cases'
import { tools } from '@/content/nav'
import type { Block } from '@/content/types'
import { stripInline } from './text'

export type SearchKind = 'Module' | 'Section' | 'Tool' | 'Term' | 'Drug' | 'Case' | 'Page'

export interface SearchEntry {
  id: string
  kind: SearchKind
  title: string
  subtitle: string
  to: string
  text: string
}

function blockText(b: Block): string {
  switch (b.type) {
    case 'p': return b.text
    case 'list': return [b.title ?? '', ...b.items].join(' ')
    case 'criteria': return [b.title, b.rule, ...b.items, b.note ?? ''].join(' ')
    case 'table': return [b.caption ?? '', ...b.head, ...b.rows.flat()].join(' ')
    case 'callout': return [b.title, b.text ?? '', ...(b.items ?? [])].join(' ')
    case 'compare': return [b.caption ?? '', b.left.title, ...b.left.items, b.right.title, ...b.right.items].join(' ')
    case 'steps': return b.items.map((s) => `${s.title} ${s.text}`).join(' ')
    case 'mnemonic': return [b.title, ...b.letters.map((l) => l.text)].join(' ')
    case 'timeline': return [b.title, ...b.points.map((p) => `${p.at} ${p.label} ${p.detail ?? ''}`)].join(' ')
    case 'reveal': return `${b.prompt} ${b.answer}`
    case 'sort': return [b.prompt, ...b.items.map((i) => i.text)].join(' ')
    default: return ''
  }
}

let cache: SearchEntry[] | null = null

export function searchIndex(): SearchEntry[] {
  if (cache) return cache
  const entries: SearchEntry[] = [
    { id: 'p-home', kind: 'Page', title: 'Dashboard', subtitle: 'Progress, due cards, weak spots', to: '/', text: '' },
    { id: 'p-learn', kind: 'Page', title: 'All modules', subtitle: 'Learning path', to: '/learn', text: '' },
    { id: 'p-q', kind: 'Page', title: 'Question bank', subtitle: 'Vignette MCQs with rationales', to: '/practice/questions', text: 'quiz exam mcq practice' },
    { id: 'p-fc', kind: 'Page', title: 'Flashcards', subtitle: 'Spaced repetition review', to: '/practice/flashcards', text: 'anki srs review' },
    { id: 'p-cases', kind: 'Page', title: 'Clinical cases', subtitle: 'Step-by-step decisions', to: '/practice/cases', text: 'simulation vignette' },
    { id: 'p-gloss', kind: 'Page', title: 'Glossary', subtitle: 'Key terms', to: '/glossary', text: '' },
    { id: 'p-refs', kind: 'Page', title: 'References', subtitle: 'Guidelines, trials and regulatory sources', to: '/references', text: 'citations evidence' },
    { id: 'p-settings', kind: 'Page', title: 'Settings', subtitle: 'Theme, export/import progress', to: '/settings', text: 'dark mode backup' },
  ]
  for (const m of modules) {
    entries.push({ id: `m-${m.id}`, kind: 'Module', title: m.title, subtitle: m.summary, to: m.path, text: m.objectives.join(' ') })
    for (const s of m.sections) {
      entries.push({ id: `s-${m.id}-${s.id}`, kind: 'Section', title: s.title, subtitle: m.title, to: `${m.path}#${s.id}`, text: stripInline([s.lead ?? '', ...s.blocks.map(blockText)].join(' ')) })
    }
  }
  for (const t of tools) entries.push({ id: `t-${t.id}`, kind: 'Tool', title: t.title, subtitle: t.description, to: t.to, text: t.tag })
  for (const g of glossary) entries.push({ id: `g-${g.term}`, kind: 'Term', title: g.term, subtitle: g.definition, to: `/glossary?q=${encodeURIComponent(g.term)}`, text: g.category })
  for (const d of drugs) entries.push({ id: `d-${d.id}`, kind: 'Drug', title: d.name, subtitle: `${d.cls} · ${d.uses.slice(0, 3).join(', ')}`, to: `/tools/drugs?drug=${d.id}`, text: [d.mechanism, ...d.uses, ...d.adverse, ...(d.warnings ?? []), ...(d.pearls ?? [])].join(' ') })
  for (const c of cases) entries.push({ id: `c-${c.id}`, kind: 'Case', title: c.title, subtitle: c.summary, to: `/practice/cases/${c.id}`, text: c.setting })
  cache = entries
  return entries
}

const kindWeight: Record<SearchKind, number> = { Page: 3, Tool: 3, Module: 3, Drug: 2, Term: 2, Section: 1, Case: 1 }

export function search(query: string, limit = 30): SearchEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const terms = q.split(/\s+/).filter(Boolean)
  const scored: { e: SearchEntry; s: number }[] = []
  for (const e of searchIndex()) {
    const title = e.title.toLowerCase()
    const sub = e.subtitle.toLowerCase()
    const body = e.text.toLowerCase()
    let s = 0
    let all = true
    for (const t of terms) {
      const inTitle = title.includes(t)
      const inSub = sub.includes(t)
      const inBody = body.includes(t)
      if (!inTitle && !inSub && !inBody) {
        all = false
        break
      }
      s += (inTitle ? 10 : 0) + (title.startsWith(t) ? 6 : 0) + (inSub ? 3 : 0) + (inBody ? 1 : 0)
    }
    if (!all) continue
    if (title === q) s += 20
    scored.push({ e, s: s + kindWeight[e.kind] })
  }
  return scored.sort((a, b) => b.s - a.s).slice(0, limit).map((x) => x.e)
}
