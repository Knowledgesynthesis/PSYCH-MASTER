// Content integrity: every learning item must be structurally valid and every citation must resolve.
import { describe, expect, it } from 'vitest'
import { modules, allFlashcards } from '.'
import { questions } from './questions'
import { cases } from './cases'
import { references, refById } from './references'
import { glossary } from './glossary'
import { drugs, AD_DIMS, AP_DIMS } from './drugs'
import type { Block } from './types'

const allChecks = modules.flatMap((m) => m.sections.flatMap((s) => s.check ?? []))

function blockStrings(b: Block): string[] {
  switch (b.type) {
    case 'p': return [b.text]
    case 'list': return b.items
    case 'criteria': return [b.rule, ...b.items, b.note ?? '']
    case 'table': return b.rows.flat()
    case 'callout': return [b.text ?? '', ...(b.items ?? [])]
    case 'compare': return [...b.left.items, ...b.right.items]
    case 'steps': return b.items.map((s) => s.text)
    case 'mnemonic': return b.letters.map((l) => l.text)
    case 'timeline': return b.points.map((p) => p.detail ?? '')
    case 'reveal': return [b.prompt, b.answer]
    case 'sort': return b.items.map((i) => i.text)
    default: return []
  }
}

describe('ids are unique', () => {
  const check = (label: string, ids: string[]) =>
    it(label, () => {
      const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
      expect(dupes).toEqual([])
    })
  check('modules', modules.map((m) => m.id))
  check('sections within each module', modules.flatMap((m) => m.sections.map((s) => `${m.id}/${s.id}`)))
  check('quick checks', allChecks.map((c) => c.id))
  check('questions', questions.map((q) => q.id))
  check('flashcards', allFlashcards.map((c) => c.id))
  check('cases', cases.map((c) => c.id))
  check('references', references.map((r) => r.id))
  check('drugs', drugs.map((d) => d.id))
  check('glossary terms', glossary.map((g) => g.term.toLowerCase()))
})

describe('every citation resolves', () => {
  const cited = [
    ...modules.flatMap((m) => m.sections.flatMap((s) => (s.refs ?? []).map((r) => [`${m.id}/${s.id}`, r]))),
    ...questions.flatMap((q) => (q.refs ?? []).map((r) => [q.id, r])),
    ...cases.flatMap((c) => (c.refs ?? []).map((r) => [c.id, r])),
  ]
  it.each(cited)('%s cites %s', (_, ref) => {
    expect(refById[ref]).toBeDefined()
  })
  it('every reference has a link or is a book/statute', () => {
    const missing = references.filter((r) => !r.url && r.kind !== 'manual' && r.kind !== 'regulatory')
    expect(missing.map((r) => r.id)).toEqual([])
  })
  it('every section in every module cites at least one source', () => {
    const uncited = modules.flatMap((m) => m.sections.filter((s) => !s.refs?.length).map((s) => `${m.id}/${s.id}`))
    expect(uncited).toEqual([])
  })
})

describe('questions are well formed', () => {
  it.each(questions.map((q) => [q.id, q] as const))('%s', (_, q) => {
    expect(q.options.length).toBeGreaterThanOrEqual(3)
    expect(q.answer).toBeGreaterThanOrEqual(0)
    expect(q.answer).toBeLessThan(q.options.length)
    expect(new Set(q.options).size).toBe(q.options.length)
    expect(q.stem.length).toBeGreaterThan(40)
    expect(q.explanation.length).toBeGreaterThan(40)
    if (q.why) {
      expect(q.why.length).toBe(q.options.length)
      q.why.forEach((w, i) => (i === q.answer ? null : expect(w.length, `${q.id} option ${i} needs a rationale`).toBeGreaterThan(5)))
    }
    expect(modules.some((m) => m.id === q.module)).toBe(true)
  })
  it('every module has at least 8 questions', () => {
    for (const m of modules) expect(questions.filter((q) => q.module === m.id).length, m.id).toBeGreaterThanOrEqual(8)
  })
  it('answer keys are not all in the same position (no positional bias)', () => {
    const positions = new Set(questions.map((q) => q.answer))
    expect(positions.size).toBeGreaterThanOrEqual(3)
  })
})

describe('quick checks and interactive blocks', () => {
  it.each(allChecks.map((c) => [c.id, c] as const))('%s', (_, c) => {
    expect(c.answer).toBeGreaterThanOrEqual(0)
    expect(c.answer).toBeLessThan(c.options.length)
    expect(c.why.length).toBeGreaterThan(10)
  })
  it('sort exercises reference valid categories', () => {
    for (const m of modules)
      for (const s of m.sections)
        for (const b of s.blocks)
          if (b.type === 'sort') for (const it of b.items) expect(it.cat, `${m.id}/${s.id}: ${it.text}`).toBeLessThan(b.categories.length)
  })
  it('tables have consistent column counts', () => {
    for (const m of modules)
      for (const s of m.sections)
        for (const b of s.blocks)
          if (b.type === 'table') for (const r of b.rows) expect(r.length, `${m.id}/${s.id}: ${b.caption ?? b.head[0]}`).toBe(b.head.length)
  })
  it('inline markup is balanced (no stray ** bold markers)', () => {
    for (const m of modules)
      for (const s of m.sections)
        for (const b of s.blocks)
          for (const str of blockStrings(b)) expect((str.match(/\*\*/g) ?? []).length % 2, `${m.id}/${s.id}: ${str.slice(0, 60)}`).toBe(0)
  })
  it('internal links point to known routes', () => {
    const known = [/^\/learn\/[a-z-]+(#[a-z-]+)?$/, /^\/tools\/(diagnostic|suicide-risk|scales|switch|syndromes|drugs)(\?scale=\w+)?$/, /^\/practice\//]
    for (const m of modules)
      for (const s of m.sections)
        for (const b of s.blocks)
          for (const str of blockStrings(b))
            for (const [, href] of str.matchAll(/\]\((\/[^)]+)\)/g)) expect(known.some((re) => re.test(href)), href).toBe(true)
  })
  it('learn links target real module sections', () => {
    const ids = new Set(modules.flatMap((m) => [m.path, ...m.sections.map((s) => `${m.path}#${s.id}`)]))
    const hrefs: string[] = []
    for (const m of modules) for (const s of m.sections) for (const b of s.blocks) {
      for (const str of blockStrings(b)) for (const [, h] of str.matchAll(/\]\((\/learn\/[^)]+)\)/g)) hrefs.push(h)
      if (b.type === 'links') hrefs.push(...b.items.map((i) => i.to).filter((t) => t.startsWith('/learn')))
    }
    for (const h of hrefs) expect(ids.has(h), h).toBe(true)
  })
})

describe('cases', () => {
  it.each(cases.map((c) => [c.id, c] as const))('%s has exactly one best choice per step', (_, c) => {
    expect(c.steps.length).toBeGreaterThanOrEqual(3)
    for (const s of c.steps) expect(s.choices.filter((ch) => ch.score === 2).length, s.id).toBe(1)
  })
})

describe('drug data', () => {
  it('profiles have the right number of dimensions', () => {
    for (const d of drugs) {
      if (!d.profile) continue
      const n = d.group === 'Antipsychotic' ? AP_DIMS.length : AD_DIMS.length
      expect(d.profile.length, d.id).toBe(n)
      d.profile.forEach((v) => expect(v >= 0 && v <= 3, d.id).toBe(true))
    }
  })
})

describe('boxed warnings are complete', () => {
  it('every antidepressant (except zuranolone) carries the suicidality boxed warning', () => {
    for (const d of drugs.filter((x) => x.group === 'Antidepressant' && x.id !== 'zuranolone')) expect((d.warnings ?? []).some((w) => /boxed/i.test(w) && /suicid/i.test(w)), d.id).toBe(true)
  })
  it('every dopamine-modulating antipsychotic carries the dementia-mortality boxed warning', () => {
    for (const d of drugs.filter((x) => x.group === 'Antipsychotic' && x.id !== 'xanomeline-trospium')) expect((d.warnings ?? []).some((w) => /boxed/i.test(w) && /dementia/i.test(w)), d.id).toBe(true)
  })
})

describe('evidence currency guards (regression tests for corrected errors)', () => {
  const corpus = JSON.stringify({ modules, questions, cases, glossary, drugs }).toLowerCase()
  it('does not teach no-suicide contracts as protective', () => {
    expect(corpus).not.toMatch(/able to contract for safety/)
  })
  it('does not claim aripiprazole is approved for bipolar depression', () => {
    expect(corpus).not.toMatch(/aripiprazole \(fda-approved for bipolar depression\)/)
  })
  it('uses the current 988 Lifeline name', () => {
    expect(corpus).not.toMatch(/national suicide prevention lifeline/)
  })
  it('does not recommend benzodiazepines after acute trauma', () => {
    expect(corpus).not.toMatch(/short course of benzodiazepines for severe anxiety/)
  })
  it('reflects clozapine REMS removal', () => {
    expect(corpus).toMatch(/rems (registry )?(was )?removed/)
  })
})
