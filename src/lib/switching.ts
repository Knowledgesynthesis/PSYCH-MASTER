// Antidepressant switching logic, distilled from product labeling and the Maudsley
// Prescribing Guidelines. Produces a strategy, timeline, cautions and monitoring.

export type AdClass = 'ssri' | 'snri' | 'ndri' | 'nassa' | 'multimodal' | 'sari' | 'tca' | 'maoi'

export interface Antidepressant {
  id: string
  name: string
  cls: AdClass
  /** Strong or moderate CYP2D6 inhibitor. */
  cyp2d6?: boolean
  /** Prominent discontinuation symptoms. */
  discontinuation?: boolean
  serotonergic: boolean
}

export const antidepressants: Antidepressant[] = [
  { id: 'sertraline', name: 'Sertraline', cls: 'ssri', serotonergic: true },
  { id: 'escitalopram', name: 'Escitalopram', cls: 'ssri', serotonergic: true },
  { id: 'citalopram', name: 'Citalopram', cls: 'ssri', serotonergic: true },
  { id: 'fluoxetine', name: 'Fluoxetine', cls: 'ssri', serotonergic: true, cyp2d6: true },
  { id: 'paroxetine', name: 'Paroxetine', cls: 'ssri', serotonergic: true, cyp2d6: true, discontinuation: true },
  { id: 'fluvoxamine', name: 'Fluvoxamine', cls: 'ssri', serotonergic: true },
  { id: 'venlafaxine', name: 'Venlafaxine', cls: 'snri', serotonergic: true, discontinuation: true },
  { id: 'desvenlafaxine', name: 'Desvenlafaxine', cls: 'snri', serotonergic: true, discontinuation: true },
  { id: 'duloxetine', name: 'Duloxetine', cls: 'snri', serotonergic: true, cyp2d6: true },
  { id: 'bupropion', name: 'Bupropion', cls: 'ndri', serotonergic: false, cyp2d6: true },
  { id: 'mirtazapine', name: 'Mirtazapine', cls: 'nassa', serotonergic: true },
  { id: 'vortioxetine', name: 'Vortioxetine', cls: 'multimodal', serotonergic: true },
  { id: 'trazodone', name: 'Trazodone', cls: 'sari', serotonergic: true },
  { id: 'nortriptyline', name: 'Nortriptyline', cls: 'tca', serotonergic: false },
  { id: 'amitriptyline', name: 'Amitriptyline', cls: 'tca', serotonergic: true },
  { id: 'clomipramine', name: 'Clomipramine', cls: 'tca', serotonergic: true },
  { id: 'phenelzine', name: 'Phenelzine', cls: 'maoi', serotonergic: true },
  { id: 'tranylcypromine', name: 'Tranylcypromine', cls: 'maoi', serotonergic: true },
  { id: 'selegiline', name: 'Selegiline (transdermal)', cls: 'maoi', serotonergic: true },
]

export const adById = Object.fromEntries(antidepressants.map((a) => [a.id, a])) as Record<string, Antidepressant>

export type Strategy = 'direct' | 'cross-taper' | 'washout'

export interface SwitchPlan {
  strategy: Strategy
  title: string
  summary: string
  steps: { when: string; what: string }[]
  cautions: string[]
  monitoring: string[]
  /** Minimum gap in days between the last dose of A and the first dose of B (0 = none). */
  gapDays: number
}

const label: Record<AdClass, string> = {
  ssri: 'SSRI', snri: 'SNRI', ndri: 'NDRI', nassa: 'NaSSA', multimodal: 'multimodal agent', sari: 'SARI', tca: 'TCA', maoi: 'MAOI',
}

export function classLabel(c: AdClass) {
  return label[c]
}

export function planSwitch(fromId: string, toId: string): SwitchPlan {
  const from = adById[fromId]
  const to = adById[toId]
  if (!from || !to) throw new Error('Unknown antidepressant')
  if (from.id === to.id) throw new Error('Choose two different drugs')

  const cautions: string[] = []
  const monitoring: string[] = ['Mood and suicidality (closer follow-up during any switch)']

  if (from.discontinuation) cautions.push(`${from.name} has prominent discontinuation symptoms: avoid abrupt stops from higher doses, and taper by proportions if long-term.`)
  if (from.cyp2d6 && (to.cls === 'tca' || to.id === 'vortioxetine')) cautions.push(`${from.name} inhibits CYP2D6, raising ${to.name} levels; start ${to.name} low and titrate slowly${to.cls === 'tca' ? ' (consider levels and ECG)' : ''}.`)
  if (to.cyp2d6 && from.cls === 'tca') cautions.push(`${to.name} inhibits CYP2D6 and will raise residual ${from.name} levels during overlap; reduce the TCA before adding it.`)
  if ((from.id === 'fluvoxamine' && to.id === 'duloxetine') || (from.id === 'duloxetine' && to.id === 'fluvoxamine')) cautions.push('Do not overlap fluvoxamine and duloxetine: CYP1A2 inhibition raises duloxetine several-fold. Stop fluvoxamine and allow ~4–5 days before duloxetine.')
  if (to.id === 'bupropion' || from.id === 'bupropion') monitoring.push('Seizure risk factors with bupropion (dose ≤450 mg/day; avoid with eating disorders or abrupt sedative withdrawal)')
  if (to.cls === 'snri') monitoring.push('Blood pressure (SNRIs)')
  if (to.cls === 'tca') monitoring.push('ECG and, where available, plasma levels (TCAs)')
  if (to.id === 'clomipramine' && from.serotonergic && from.cls !== 'maoi') cautions.push('Clomipramine is strongly serotonergic: avoid high doses of both during overlap (serotonin toxicity).')

  // 1) Anything involving an MAOI requires a washout.
  if (to.cls === 'maoi' || from.cls === 'maoi') {
    let gap = 14
    let gapText = '14 days (2 weeks)'
    if (to.cls === 'maoi' && from.id === 'fluoxetine') {
      gap = 35
      gapText = 'at least 5 weeks (norfluoxetine\'s long half-life)'
    } else if (to.cls === 'maoi' && from.id === 'vortioxetine') {
      gap = 21
      gapText = 'at least 3 weeks'
    }
    cautions.unshift('MAOIs combined with serotonergic or noradrenergic antidepressants can cause fatal serotonin syndrome or hypertensive crisis: never overlap.')
    if (to.cls === 'maoi') {
      monitoring.push('Tyramine-restricted diet from the first MAOI dose (except selegiline patch at 6 mg/24 h) and for 2 weeks after stopping')
      monitoring.push('Review all medications for interactions (tramadol, meperidine, dextromethorphan, linezolid, sympathomimetics)')
    }
    return {
      strategy: 'washout',
      title: 'Taper, stop, and wash out',
      summary: `${from.name} → ${to.name} requires a drug-free interval of ${gapText}.`,
      gapDays: gap,
      steps: [
        { when: 'Week 0', what: from.discontinuation || from.cls === 'maoi' ? `Taper ${from.name} over 1–4 weeks (longer if used long-term).` : `Stop ${from.name} (taper if on a higher dose or used long-term).` },
        { when: `Days 1–${gap} after the last dose`, what: `Washout: no antidepressant. Bridge with psychotherapy and support; watch for relapse and discontinuation symptoms.` },
        { when: `Day ${gap + 1}+`, what: `Start ${to.name} at a low dose and titrate.` },
      ],
      cautions,
      monitoring,
    }
  }

  // 2) From fluoxetine: it self-tapers; allow a short gap and start low.
  if (from.id === 'fluoxetine') {
    if (to.cls === 'nassa') {
      return {
        strategy: 'cross-taper',
        title: 'Stop fluoxetine; start mirtazapine',
        summary: 'Fluoxetine\'s long half-life provides a built-in taper; mirtazapine has few interactions.',
        gapDays: 0,
        steps: [
          { when: 'Day 0', what: 'Reduce fluoxetine to 20 mg if higher, then stop.' },
          { when: 'Day 0–7', what: 'Start mirtazapine at a low dose (e.g., 15 mg at night) and titrate.' },
        ],
        cautions,
        monitoring,
      }
    }
    return {
      strategy: 'cross-taper',
      title: 'Stop fluoxetine; delayed, low-dose start',
      summary: `Fluoxetine and norfluoxetine persist for weeks, adding serotonergic load and CYP2D6 inhibition, so start ${to.name} low after a short gap.`,
      gapDays: 4,
      steps: [
        { when: 'Day 0', what: 'Reduce fluoxetine to 20 mg if higher, then stop (no further taper needed).' },
        { when: 'Day 4–7', what: `Start ${to.name} at a low dose.` },
        { when: 'Weeks 2–4', what: `Titrate ${to.name} slowly to a therapeutic dose.` },
      ],
      cautions,
      monitoring: [...monitoring, 'Early serotonergic adverse effects during the first 2 weeks'],
    }
  }

  // 3) SSRI → SSRI (and vortioxetine): direct switch.
  const ssriLike = (a: Antidepressant) => a.cls === 'ssri' || a.cls === 'multimodal'
  if (ssriLike(from) && ssriLike(to)) {
    return {
      strategy: 'direct',
      title: 'Direct switch',
      summary: 'Same mechanism: the new drug covers discontinuation symptoms of the old one.',
      gapDays: 0,
      steps: [
        { when: 'Day 0', what: `Last dose of ${from.name}${from.id === 'paroxetine' ? ' (if on a high dose, reduce first over 1–2 weeks)' : ''}.` },
        { when: 'Day 1', what: `Start ${to.name} at an equivalent or slightly lower dose.` },
        { when: 'Weeks 1–4', what: 'Titrate as needed.' },
      ],
      cautions,
      monitoring,
    }
  }

  // 4) Between SSRIs and SNRIs.
  const serotonergicReuptake = (a: Antidepressant) => a.cls === 'ssri' || a.cls === 'snri' || a.cls === 'multimodal'
  if (serotonergicReuptake(from) && serotonergicReuptake(to)) {
    return {
      strategy: from.discontinuation ? 'cross-taper' : 'direct',
      title: from.discontinuation ? 'Brief cross-taper' : 'Direct switch or brief cross-taper',
      summary: 'Both inhibit serotonin reuptake, so a quick transition is usually well tolerated.',
      gapDays: 0,
      steps: from.discontinuation
        ? [
            { when: 'Week 1', what: `Reduce ${from.name} by ~50%; start ${to.name} at a low dose.` },
            { when: 'Week 2', what: `Stop ${from.name}; increase ${to.name}.` },
            { when: 'Weeks 3–4', what: `Titrate ${to.name} to a therapeutic dose.` },
          ]
        : [
            { when: 'Day 0', what: `Stop ${from.name}.` },
            { when: 'Day 1', what: `Start ${to.name} at a low-to-standard dose; titrate over 1–2 weeks.` },
          ],
      cautions,
      monitoring: [...monitoring, 'Serotonergic adverse effects during any overlap'],
    }
  }

  // 5) Everything else: cross-taper.
  const steps =
    from.cls === 'tca' && to.cyp2d6
      ? [
          { when: 'Week 1', what: `Reduce ${from.name} by at least 50% before adding ${to.name}.` },
          { when: 'Week 2', what: `Start ${to.name} at a low dose; continue reducing ${from.name}.` },
          { when: 'Weeks 3–4', what: `Stop ${from.name}; titrate ${to.name}.` },
        ]
      : [
          { when: 'Week 1', what: `Start ${to.name} at a low dose; reduce ${from.name} by ~25–50%.` },
          { when: 'Week 2', what: `Increase ${to.name}; reduce ${from.name} further.` },
          { when: 'Weeks 3–4', what: `Stop ${from.name}; titrate ${to.name} to a therapeutic dose.` },
        ]
  if (!to.serotonergic && from.serotonergic) cautions.push(`${to.name} does not prevent SSRI/SNRI-type discontinuation symptoms: taper ${from.name} rather than stopping abruptly.`)
  if (from.cls === 'tca') cautions.push('Taper TCAs gradually to avoid cholinergic rebound (nausea, sweating, insomnia).')
  return {
    strategy: 'cross-taper',
    title: 'Cross-taper over 2–4 weeks',
    summary: `Different mechanisms (${label[from.cls]} → ${label[to.cls]}): overlap reduces both discontinuation symptoms and gaps in treatment.`,
    gapDays: 0,
    steps,
    cautions,
    monitoring,
  }
}
