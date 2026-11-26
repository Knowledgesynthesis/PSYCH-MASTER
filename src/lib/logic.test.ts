import { describe, expect, it } from 'vitest'
import { DAY, isDue, newCard, schedule } from './srs'
import { scales, scoreScale, maxScore, scaleById } from './scales'
import { antidepressants, planSwitch } from './switching'
import { rankSyndromes, weights, features } from './syndromes'
import { emptyInput, evaluate, type DxInput } from './diagnostic'
import { documentation, formulate, type SuicideInput } from './suicide'
import { shuffle } from './utils'
import { stripInline } from './text'

describe('spaced repetition', () => {
  const t0 = Date.UTC(2026, 0, 1)
  it('new cards are due immediately', () => {
    expect(isDue(undefined, t0)).toBe(true)
    expect(isDue(newCard(t0), t0)).toBe(true)
  })
  it('"good" grows intervals 1 → 3 → ~7.5 days', () => {
    const a = schedule(undefined, 'good', t0)
    expect(a.interval).toBe(1)
    const b = schedule(a, 'good', a.due)
    expect(b.interval).toBe(3)
    const c = schedule(b, 'good', b.due)
    expect(c.interval).toBeGreaterThanOrEqual(7)
    expect(c.due - b.due).toBe(c.interval * DAY)
  })
  it('"again" resets to a short relearning step and lowers ease (floor 1.3)', () => {
    let s = schedule(undefined, 'good', t0)
    for (let i = 0; i < 20; i++) s = schedule(s, 'again', t0)
    expect(s.interval).toBe(0)
    expect(s.ease).toBe(1.3)
    expect(s.due - t0).toBeLessThan(DAY)
    expect(s.lapses).toBe(20)
  })
  it('intervals never exceed 365 days', () => {
    let s = schedule(undefined, 'easy', t0)
    for (let i = 0; i < 30; i++) s = schedule(s, 'easy', s.due)
    expect(s.interval).toBeLessThanOrEqual(365)
  })
  it('easy > good > hard for the same history', () => {
    const base = schedule(schedule(undefined, 'good', t0), 'good', t0)
    const [h, g, e] = (['hard', 'good', 'easy'] as const).map((gr) => schedule(base, gr, t0).interval)
    expect(h).toBeLessThan(g)
    expect(g).toBeLessThan(e)
  })
})

describe('clinical scales', () => {
  it('maximum scores match the published instruments', () => {
    expect(maxScore(scaleById.phq9)).toBe(27)
    expect(maxScore(scaleById.gad7)).toBe(21)
    expect(maxScore(scaleById.auditc)).toBe(12)
    expect(maxScore(scaleById.ciwa)).toBe(67)
    expect(maxScore(scaleById.cows)).toBe(48)
  })
  it('bands cover every possible score without gaps or overlaps', () => {
    for (const s of scales) {
      const max = maxScore(s)
      for (let v = 0; v <= max; v++) {
        const hits = s.bands.filter((b) => v >= b.min && v <= b.max)
        expect(hits.length, `${s.id} score ${v}`).toBe(1)
      }
    }
  })
  it('PHQ-9 cutoffs and item-9 flag', () => {
    const all = (n: number) => Object.fromEntries(scaleById.phq9.items.map((it) => [it.id, n]))
    expect(scoreScale(scaleById.phq9, all(0)).band.label).toBe('Minimal')
    const ten = { p1: 2, p2: 2, p3: 2, p4: 2, p5: 2, p6: 0, p7: 0, p8: 0, p9: 0 }
    expect(scoreScale(scaleById.phq9, ten).band.label).toBe('Moderate')
    expect(scoreScale(scaleById.phq9, { p9: 1 }).flags.length).toBe(1)
    expect(scoreScale(scaleById.phq9, all(3)).band.label).toBe('Severe')
  })
  it('CIWA-Ar uses ASAM 2020 thresholds', () => {
    const s = scaleById.ciwa
    expect(s.bands.find((b) => b.min === 10)?.max).toBe(18)
    expect(s.bands.find((b) => b.min === 19)).toBeDefined()
  })
  it('reports completeness', () => {
    expect(scoreScale(scaleById.gad7, { g1: 1 }).complete).toBe(false)
  })
})

describe('antidepressant switching', () => {
  it('fluoxetine → MAOI requires ≥5 weeks', () => {
    const p = planSwitch('fluoxetine', 'phenelzine')
    expect(p.strategy).toBe('washout')
    expect(p.gapDays).toBe(35)
  })
  it('MAOI → SSRI requires 14 days', () => {
    const p = planSwitch('phenelzine', 'sertraline')
    expect(p.strategy).toBe('washout')
    expect(p.gapDays).toBe(14)
  })
  it('vortioxetine → MAOI requires 21 days', () => {
    expect(planSwitch('vortioxetine', 'tranylcypromine').gapDays).toBe(21)
  })
  it('SSRI → SSRI is a direct switch', () => {
    expect(planSwitch('sertraline', 'escitalopram').strategy).toBe('direct')
  })
  it('flags CYP2D6 interaction when moving from paroxetine to a TCA', () => {
    const p = planSwitch('paroxetine', 'nortriptyline')
    expect(p.cautions.join(' ')).toMatch(/CYP2D6/)
  })
  it('flags fluvoxamine → duloxetine CYP1A2 problem', () => {
    expect(planSwitch('fluvoxamine', 'duloxetine').cautions.join(' ')).toMatch(/CYP1A2/)
  })
  it('produces a valid plan for every ordered pair', () => {
    for (const a of antidepressants)
      for (const b of antidepressants) {
        if (a.id === b.id) {
          expect(() => planSwitch(a.id, b.id)).toThrow()
          continue
        }
        const p = planSwitch(a.id, b.id)
        expect(p.steps.length, `${a.id}→${b.id}`).toBeGreaterThan(0)
        if (a.cls === 'maoi' || b.cls === 'maoi') expect(p.gapDays, `${a.id}→${b.id}`).toBeGreaterThanOrEqual(14)
      }
  })
})

describe('toxic syndrome differentiator', () => {
  const top = (f: string[]) => rankSyndromes(f)[0].id
  it('every weighted feature exists', () => {
    const ids = new Set(features.map((f) => f.id))
    for (const k of Object.keys(weights)) expect(ids.has(k), k).toBe(true)
  })
  it('classic serotonin syndrome ranks first', () => {
    expect(top(['serotonergic', 'hours', 'clonus', 'hyperreflexia', 'diaphoresis', 'bowelHyper'])).toBe('ss')
  })
  it('classic NMS ranks first', () => {
    expect(top(['d2', 'days', 'leadpipe', 'bradyreflexia', 'hyperthermia', 'ck', 'mutism'])).toBe('nms')
  })
  it('anticholinergic toxidrome ranks first', () => {
    expect(top(['anticholinergic', 'dryskin', 'mydriasis', 'bowelHypo', 'retention', 'delirium'])).toBe('ac')
  })
  it('sympathomimetic toxicity ranks first', () => {
    expect(top(['stimulant', 'hours', 'diaphoresis', 'mydriasis', 'agitation', 'hyperthermia'])).toBe('sym')
  })
  it('malignant hyperthermia ranks first', () => {
    expect(top(['anesthetic', 'etco2', 'leadpipe', 'hyperthermia'])).toBe('mh')
  })
  it('alcohol withdrawal / DTs ranks first', () => {
    expect(top(['cessation', 'tremor', 'diaphoresis', 'hallucinations', 'delirium', 'seizure'])).toBe('wd')
  })
  it('malignant catatonia ranks first without drug exposure', () => {
    expect(top(['mutism', 'leadpipe', 'hyperthermia', 'days'])).toBe('cat')
  })
})

describe('diagnostic pathfinder', () => {
  const run = (patch: (i: DxInput) => void) => {
    const i = emptyInput()
    patch(i)
    return evaluate(i)
  }
  const ids = (o: ReturnType<typeof evaluate>) => o.results.map((r) => r.id)

  it('psychosis during elevated mood = mania = bipolar I regardless of duration', () => {
    const o = run((i) => {
      i.clusters.elevation = true
      i.elev = { duration: 'lt4', symptomsMet: true, marked: false, hospitalized: false, psychotic: true }
    })
    expect(ids(o)).toContain('bp1')
  })
  it('hypomania + past MDE = bipolar II, not MDD', () => {
    const o = run((i) => {
      i.clusters.depression = true
      i.dep.fullMde = true
      i.hx.hypomania = true
    })
    expect(ids(o)).toContain('bp2')
    expect(ids(o)).not.toContain('mdd')
  })
  it('MDE with no elevation history = MDD with specifiers', () => {
    const o = run((i) => {
      i.clusters.depression = true
      i.dep.fullMde = true
      i.dep.peripartum = true
    })
    const mdd = o.results.find((r) => r.id === 'mdd')
    expect(mdd?.label).toMatch(/peripartum/)
  })
  it('psychosis duration thresholds', () => {
    const at = (d: DxInput['psy']['duration']) => ids(run((i) => { i.clusters.psychosis = true; i.psy.duration = d; i.psy.recovered = true }))
    expect(at('lt1d')).toContain('transient')
    expect(at('1dto1m')).toContain('bpd-brief')
    expect(at('1to6m')).toContain('schizophreniform')
    expect(at('ge6m')).toContain('schizophrenia')
  })
  it('schizoaffective requires ≥2 weeks psychosis without mood AND mood for most of the illness, and subsumes bipolar I', () => {
    const o = run((i) => {
      i.clusters.psychosis = true
      i.clusters.elevation = true
      i.elev = { duration: 'ge7', symptomsMet: true, marked: true, hospitalized: true, psychotic: true }
      i.psy = { ...i.psy, duration: 'ge6m', withoutMood2w: true, moodMajority: true }
    })
    expect(ids(o)).toContain('schizoaffective')
    expect(ids(o)).not.toContain('bp1')
    expect(o.results.find((r) => r.id === 'schizoaffective')?.label).toMatch(/bipolar/)
  })
  it('psychosis confined to mood episodes is a specifier of the mood disorder', () => {
    const o = run((i) => {
      i.clusters.psychosis = true
      i.clusters.depression = true
      i.dep.fullMde = true
      i.psy.onlyDuringMood = true
    })
    expect(ids(o)).toEqual(['mdd'])
    expect(o.results[0].label).toMatch(/psychotic features/)
  })
  it('PTSD vs ASD vs acute reaction by timing', () => {
    const at = (t: DxInput['tr']['timing']) => ids(run((i) => { i.clusters.trauma = true; i.tr = { ...i.tr, exposureA: true, fullClusters: true, timing: t } }))
    expect(at('lt3d')).toContain('asr')
    expect(at('3dto1m')).toContain('asd')
    expect(at('gt1m')).toContain('ptsd')
  })
  it('delirium and safety are prioritized', () => {
    const o = run((i) => {
      i.safety.imminent = true
      i.organic.delirium = true
      i.clusters.depression = true
      i.dep.fullMde = true
    })
    expect(o.alerts.length).toBe(1)
    expect(o.results[0].status).toBe('priority')
  })
  it('OCD with absent insight stays OCD', () => {
    const o = run((i) => {
      i.clusters.oc = true
      i.oc.obsComp = true
      i.oc.insight = 'absent'
    })
    expect(o.results[0].label).toMatch(/absent insight/)
  })
})

describe('suicide risk formulation', () => {
  const base: SuicideInput = { ideation: 0, recentIdeation: true, behavior: 'none', acute: [], chronic: [], protective: [] }
  it('intent with plan → high', () => expect(formulate({ ...base, ideation: 5 }).tier).toBe('high'))
  it('recent attempt → high even without current ideation', () => expect(formulate({ ...base, behavior: 'recent' }).tier).toBe('high'))
  it('method without intent → moderate', () => expect(formulate({ ...base, ideation: 3 }).tier).toBe('moderate'))
  it('passive ideation with supports → low', () => expect(formulate({ ...base, ideation: 1, protective: ['connected', 'reasons'] }).tier).toBe('low'))
  it('active thoughts + firearm access → at least moderate, and means counseling is offered', () => {
    const f = formulate({ ...base, ideation: 2, acute: ['firearm'] })
    expect(f.tier).toBe('moderate')
    expect(f.interventions.join(' ')).toMatch(/firearm/i)
  })
  it('command hallucinations with any ideation → high', () => expect(formulate({ ...base, ideation: 1, acute: ['command'] }).tier).toBe('high'))
  it('ideation older than a month does not drive acute tier by itself', () => expect(formulate({ ...base, ideation: 5, recentIdeation: false }).tier).toBe('low'))
  it('every plan includes a safety plan; none suggests a no-suicide contract', () => {
    for (const ideation of [0, 1, 2, 3, 4, 5] as const) {
      const f = formulate({ ...base, ideation })
      expect(f.interventions.join(' ')).toMatch(/safety plan/i)
      expect(f.interventions.join(' ')).not.toMatch(/contract/i)
    }
  })
  it('documentation summary contains the key fields', () => {
    const input = { ...base, ideation: 3 as const, acute: ['firearm'], protective: ['children'] }
    const doc = documentation(input, formulate(input), new Date('2026-11-26T12:00:00Z'))
    expect(doc).toMatch(/2026-11-26/)
    expect(doc).toMatch(/MODERATE/)
    expect(doc).toMatch(/firearm/i)
  })
})

describe('utilities', () => {
  it('seeded shuffle is deterministic and a permutation', () => {
    const a = shuffle([1, 2, 3, 4, 5, 6], 42)
    expect(shuffle([1, 2, 3, 4, 5, 6], 42)).toEqual(a)
    expect([...a].sort()).toEqual([1, 2, 3, 4, 5, 6])
  })
  it('stripInline removes markup but keeps gene names', () => {
    expect(stripInline('**HLA-B*15:02** before [carbamazepine](/tools/drugs)')).toBe('HLA-B*15:02 before carbamazepine')
  })
})
