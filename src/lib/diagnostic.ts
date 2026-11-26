// Rule engine for the Diagnostic Pathfinder. Encodes DSM-5-TR episode and duration logic
// so learners can see *why* a working diagnosis follows from the findings.

export type ElevDuration = 'lt4' | '4to6' | 'ge7'
export type PsyDuration = 'lt1d' | '1dto1m' | '1to6m' | 'ge6m'
export type TraumaTiming = 'lt3d' | '3dto1m' | 'gt1m'

export interface DxInput {
  safety: { imminent: boolean; homicidal: boolean; selfcare: boolean }
  organic: { substance: boolean; medical: boolean; delirium: boolean }
  clusters: { depression: boolean; elevation: boolean; psychosis: boolean; anxiety: boolean; trauma: boolean; oc: boolean }
  dep: { fullMde: boolean; chronic2y: boolean; peripartum: boolean; mixedSx: boolean }
  elev: { duration: ElevDuration; symptomsMet: boolean; marked: boolean; hospitalized: boolean; psychotic: boolean }
  hx: { mania: boolean; hypomania: boolean; mde: boolean }
  psy: { duration: PsyDuration; onlyDelusions: boolean; onlyDuringMood: boolean; withoutMood2w: boolean; moodMajority: boolean; recovered: boolean }
  anx: { worry: boolean; panic: boolean; agora: boolean; social: boolean; specific: boolean }
  tr: { exposureA: boolean; timing: TraumaTiming; fullClusters: boolean; nonTraumaStressor: boolean; bereavement12m: boolean }
  oc: { obsComp: boolean; insight: 'good' | 'poor' | 'absent'; appearance: boolean; hoarding: boolean; bfrb: boolean }
}

export type DxStatus = 'priority' | 'meets' | 'consider'

export interface DxResult {
  id: string
  label: string
  status: DxStatus
  rationale: string[]
  next: string[]
  link?: string
}

export interface DxOutput {
  alerts: string[]
  results: DxResult[]
}

export function emptyInput(): DxInput {
  return {
    safety: { imminent: false, homicidal: false, selfcare: false },
    organic: { substance: false, medical: false, delirium: false },
    clusters: { depression: false, elevation: false, psychosis: false, anxiety: false, trauma: false, oc: false },
    dep: { fullMde: false, chronic2y: false, peripartum: false, mixedSx: false },
    elev: { duration: 'lt4', symptomsMet: false, marked: false, hospitalized: false, psychotic: false },
    hx: { mania: false, hypomania: false, mde: false },
    psy: { duration: '1dto1m', onlyDelusions: false, onlyDuringMood: false, withoutMood2w: false, moodMajority: false, recovered: false },
    anx: { worry: false, panic: false, agora: false, social: false, specific: false },
    tr: { exposureA: false, timing: 'gt1m', fullClusters: false, nonTraumaStressor: false, bereavement12m: false },
    oc: { obsComp: false, insight: 'good', appearance: false, hoarding: false, bfrb: false },
  }
}

export function evaluate(i: DxInput): DxOutput {
  const alerts: string[] = []
  const results: DxResult[] = []

  // ── Step 1: safety ───────────────────────────────────────────────
  if (i.safety.imminent || i.safety.homicidal || i.safety.selfcare) {
    alerts.push('Safety first: imminent risk to self or others, or inability to care for self, takes priority over diagnosis. Arrange emergency evaluation and do not leave the person alone.')
  }

  // ── Step 2: medical and substance causes ─────────────────────────
  if (i.organic.delirium) {
    results.push({
      id: 'delirium',
      label: 'Delirium (medical emergency)',
      status: 'priority',
      rationale: ['Acute, fluctuating disturbance of attention and awareness', 'A primary psychiatric diagnosis cannot be made reliably during delirium'],
      next: ['Find and treat causes (infection, drugs, metabolic, withdrawal, hypoxia)', 'Review medications; avoid benzodiazepines (unless withdrawal)', 'CAM or 4AT to monitor'],
      link: '/learn/emergencies#delirium',
    })
  }
  if (i.organic.substance || i.organic.medical) {
    results.push({
      id: 'secondary',
      label: 'Substance/medication-induced, or due to another medical condition',
      status: 'priority',
      rationale: [
        i.organic.substance ? 'Symptoms temporally linked to a substance or medication' : '',
        i.organic.medical ? 'A medical condition can physiologically explain the symptoms' : '',
        'A primary disorder is favored if symptoms preceded use or persist >~1 month after cessation',
      ].filter(Boolean),
      next: ['Targeted labs, toxicology, medication review', 'Reassess after abstinence or treatment of the medical cause'],
      link: '/learn/emergencies#mimics',
    })
  }

  const c = i.clusters

  // ── Mood episodes ────────────────────────────────────────────────
  const manicNow = c.elevation && (i.elev.psychotic || i.elev.hospitalized || (i.elev.duration === 'ge7' && i.elev.symptomsMet && i.elev.marked))
  const hypomanicNow = c.elevation && !manicNow && i.elev.symptomsMet && i.elev.duration !== 'lt4'
  const subthresholdElev = c.elevation && !manicNow && !hypomanicNow
  const mdeNow = c.depression && i.dep.fullMde
  const everMania = manicNow || i.hx.mania
  const everHypo = hypomanicNow || i.hx.hypomania
  const everMde = mdeNow || i.hx.mde
  const anyMoodEpisode = everMania || everHypo || everMde
  const psychosisInMoodOnly = c.psychosis && i.psy.onlyDuringMood

  if (everMania) {
    const current = manicNow ? 'manic' : mdeNow ? 'depressed' : hypomanicNow ? 'hypomanic' : 'most recent episode per history'
    results.push({
      id: 'bp1',
      label: `Bipolar I disorder (current episode: ${current})`,
      status: 'meets',
      rationale: [
        manicNow
          ? i.elev.psychotic
            ? 'Psychotic features during elevated mood define a manic episode, regardless of duration'
            : i.elev.hospitalized
              ? 'Hospitalization for elevated mood defines a manic episode, regardless of duration'
              : '≥7 days of elevated/irritable mood with enough symptoms and marked impairment'
          : 'Past manic episode: once bipolar I, always bipolar I',
        ...(mdeNow && i.dep.mixedSx ? ['Current depressive episode with mixed features'] : []),
      ],
      next: ['Stop antidepressants and stimulants', 'Mania: lithium, valproate (avoid if pregnancy possible) or an SGA; combination if severe', 'Bipolar depression: quetiapine, lurasidone, cariprazine, lumateperone, OFC, lithium, lamotrigine', 'Long-term: lithium is the gold standard'],
      link: '/learn/mood#treat-bipolar',
    })
  } else if (everHypo && everMde) {
    results.push({
      id: 'bp2',
      label: `Bipolar II disorder (current episode: ${mdeNow ? 'depressed' : hypomanicNow ? 'hypomanic' : 'per history'})`,
      status: 'meets',
      rationale: ['≥1 hypomanic episode (≥4 days, observable, no marked impairment or psychosis)', '≥1 major depressive episode', 'No manic episode'],
      next: ['Bipolar II depression: quetiapine or lumateperone; lithium or lamotrigine', 'Avoid antidepressant monotherapy', 'Psychoeducation; sleep regularity'],
      link: '/learn/mood#treat-bipolar',
    })
  } else if (everHypo && !everMde) {
    results.push({
      id: 'hypo-only',
      label: 'Hypomanic episode without a depressive episode',
      status: 'consider',
      rationale: ['Bipolar II requires ≥1 major depressive episode', 'Consider cyclothymic disorder (≥2 years of subthreshold cycling) or other specified bipolar disorder'],
      next: ['Monitor for depression; avoid antidepressant monotherapy if depression develops', 'Collateral history'],
      link: '/learn/mood#disorders',
    })
  } else if (mdeNow) {
    const spec: string[] = []
    if (i.dep.peripartum) spec.push('with peripartum onset')
    if (i.dep.mixedSx) spec.push('with mixed features')
    if (psychosisInMoodOnly) spec.push('with psychotic features')
    results.push({
      id: 'mdd',
      label: `Major depressive disorder${spec.length ? `, ${spec.join(', ')}` : ''}`,
      status: 'meets',
      rationale: ['≥5 of 9 symptoms for ≥2 weeks including depressed mood or anhedonia', 'No lifetime manic or hypomanic episode', ...(i.dep.mixedSx ? ['Mixed features raise the risk of bipolar disorder: avoid antidepressant monotherapy'] : [])],
      next: [
        'PHQ-9 baseline; suicide risk assessment',
        psychosisInMoodOnly ? 'Psychotic depression: antidepressant + antipsychotic, or ECT' : 'Severity-based treatment: psychotherapy and/or antidepressant; judge response at 2–4 weeks',
        ...(i.dep.peripartum ? ['Perinatal: sertraline, psychotherapy, zuranolone; assess infant safety'] : []),
      ],
      link: '/learn/mood#treat-mdd',
    })
  }

  if (subthresholdElev && everMde && !everMania && !everHypo) {
    results.push({
      id: 'osbd',
      label: 'Other specified bipolar disorder (short-duration or subthreshold hypomania) to consider',
      status: 'consider',
      rationale: ['Elevated-mood periods below hypomania thresholds alongside major depression'],
      next: ['Treat as bipolar-spectrum: avoid antidepressant monotherapy; consider mood stabilizer or SGA'],
      link: '/learn/mood#episodes',
    })
  }

  if (c.depression && i.dep.chronic2y && !everMania && !everHypo) {
    results.push({
      id: 'pdd',
      label: `Persistent depressive disorder${mdeNow ? ' (with persistent or intermittent major depressive episodes)' : ''}`,
      status: 'meets',
      rationale: ['Depressed mood most days for ≥2 years with ≥2 associated symptoms'],
      next: ['Combined psychotherapy and antidepressant; expect slower response', 'Screen for comorbid anxiety and substance use'],
      link: '/learn/mood#disorders',
    })
  }
  if (c.depression && !i.dep.fullMde && !i.dep.chronic2y && !anyMoodEpisode) {
    results.push({
      id: 'subdep',
      label: 'Depressive symptoms below MDE threshold',
      status: 'consider',
      rationale: ['Does not meet MDE (≥5 symptoms for ≥2 weeks) or PDD (≥2 years)'],
      next: ['Consider adjustment disorder, other specified depressive disorder, grief, or medical/substance causes', 'Reassess over time'],
      link: '/learn/mood#disorders',
    })
  }

  // ── Psychosis ────────────────────────────────────────────────────
  if (c.psychosis) {
    const moodEpisodes = anyMoodEpisode
    const durationLabel: Record<PsyDuration, string> = { lt1d: '<1 day', '1dto1m': '1 day to <1 month', '1to6m': '1 to <6 months', ge6m: '≥6 months' }
    if (i.psy.onlyDuringMood && moodEpisodes) {
      if (!results.some((r) => r.id === 'mdd' || r.id === 'bp1' || r.id === 'bp2')) {
        results.push({ id: 'mood-psy', label: 'Mood disorder with psychotic features', status: 'meets', rationale: ['Psychosis occurs only during mood episodes'], next: ['Treat the mood disorder plus antipsychotic, or ECT'], link: '/learn/psychosis#spectrum' })
      } else {
        const host = results.find((r) => r.id === 'mdd' || r.id === 'bp1' || r.id === 'bp2')
        host?.rationale.push('Psychotic symptoms occur only during mood episodes → psychotic features of the mood disorder, not a separate psychotic disorder')
      }
    } else if (i.psy.onlyDuringMood && !moodEpisodes) {
      alerts.push('You indicated psychosis only during mood episodes, but no mood episode is selected. Complete the mood findings.')
    } else if (i.psy.withoutMood2w && moodEpisodes && i.psy.moodMajority) {
      results.push({
        id: 'schizoaffective',
        label: `Schizoaffective disorder, ${everMania ? 'bipolar' : 'depressive'} type`,
        status: 'meets',
        rationale: ['Major mood episode concurrent with psychotic symptoms', '≥2 weeks of delusions/hallucinations without a mood episode', 'Mood episodes present for most of the total illness'],
        next: ['Antipsychotic plus mood stabilizer (bipolar type) or antidepressant (depressive type)', 'Paliperidone is FDA-approved for schizoaffective disorder; clozapine if treatment-resistant or suicidal'],
        link: '/learn/psychosis#spectrum',
      })
    } else if (i.psy.onlyDelusions && (i.psy.duration === '1to6m' || i.psy.duration === 'ge6m')) {
      results.push({
        id: 'delusional',
        label: 'Delusional disorder',
        status: 'meets',
        rationale: ['≥1 month of delusions', 'No other prominent criterion A symptoms; function relatively preserved'],
        next: ['Build trust; antipsychotic trial; CBT for psychosis', 'Assess risk related to the delusion (e.g., jealousy, persecution)'],
        link: '/learn/psychosis#spectrum',
      })
    } else {
      const base = { rationale: [`Duration ${durationLabel[i.psy.duration]}`] as string[], link: '/learn/psychosis#spectrum' }
      if (moodEpisodes && !i.psy.moodMajority && i.psy.withoutMood2w) base.rationale.push('Mood episodes occupy only a minority of the illness → schizophrenia spectrum rather than schizoaffective')
      const workup = 'First-episode workup (labs, toxicology, ECG; MRI/EEG/LP if red flags)'
      if (i.psy.duration === 'lt1d') {
        results.push({ id: 'transient', label: 'Transient psychotic symptoms (<1 day)', status: 'consider', ...base, rationale: [...base.rationale, 'Below the 1-day threshold for brief psychotic disorder'], next: ['Evaluate substances, sleep deprivation, dissociation, delirium'] })
      } else if (i.psy.duration === '1dto1m') {
        results.push({ id: 'bpd-brief', label: i.psy.recovered ? 'Brief psychotic disorder' : 'Brief psychotic disorder (provisional until full recovery)', status: i.psy.recovered ? 'meets' : 'consider', ...base, next: [workup, 'If symptoms persist beyond 1 month → schizophreniform disorder'] })
      } else if (i.psy.duration === '1to6m') {
        results.push({ id: 'schizophreniform', label: i.psy.recovered ? 'Schizophreniform disorder' : 'Schizophreniform disorder (provisional)', status: 'meets', ...base, next: [workup, 'Antipsychotic; coordinated specialty care', 'About two-thirds progress to schizophrenia or schizoaffective disorder'] })
      } else {
        results.push({ id: 'schizophrenia', label: 'Schizophrenia', status: 'meets', ...base, rationale: [...base.rationale, 'Continuous signs ≥6 months including ≥1 month of active symptoms'], next: [workup, 'Antipsychotic chosen by side-effect profile; consider LAI early', 'Clozapine after 2 adequate failed trials'] })
      }
    }
  }

  // ── Anxiety ──────────────────────────────────────────────────────
  if (c.anxiety) {
    const a = i.anx
    const link = '/learn/anxiety#map'
    if (a.worry) results.push({ id: 'gad', label: 'Generalized anxiety disorder', status: 'meets', rationale: ['≥6 months of excessive, hard-to-control worry with ≥3 associated symptoms'], next: ['GAD-7; CBT and/or SSRI/SNRI', 'Avoid long-term benzodiazepines'], link })
    if (a.panic) results.push({ id: 'panic', label: 'Panic disorder', status: 'meets', rationale: ['Recurrent unexpected panic attacks', '≥1 month of worry or behavior change'], next: ['Rule out cardiac/thyroid/substance causes', 'CBT with interoceptive exposure and/or SSRI started low'], link: '/learn/anxiety#panic' })
    if (a.agora) results.push({ id: 'agoraphobia', label: 'Agoraphobia', status: 'meets', rationale: ['Fear/avoidance of ≥2 situation types where escape or help is difficult, ≥6 months'], next: ['Graded in-vivo exposure; SSRI if needed'], link })
    if (a.social) results.push({ id: 'sad', label: 'Social anxiety disorder', status: 'meets', rationale: ['Fear of scrutiny/negative evaluation ≥6 months'], next: ['CBT with exposure; SSRI/SNRI; propranolol PRN only for performance-only type'], link })
    if (a.specific) results.push({ id: 'phobia', label: 'Specific phobia', status: 'meets', rationale: ['Circumscribed fear of a specific object or situation ≥6 months'], next: ['Exposure therapy (often one session)'], link: '/learn/anxiety#exposure' })
    if (!a.worry && !a.panic && !a.agora && !a.social && !a.specific) results.push({ id: 'anx-other', label: 'Anxiety symptoms not meeting a specific disorder', status: 'consider', rationale: ['No disorder-defining pattern selected'], next: ['Consider adjustment disorder, substance/medical causes, other specified anxiety disorder'], link })
  }

  // ── Trauma & stressors ───────────────────────────────────────────
  if (c.trauma) {
    const t = i.tr
    const link = '/learn/trauma-ocd#trauma-dx'
    if (t.bereavement12m) results.push({ id: 'pgd', label: 'Prolonged grief disorder', status: 'meets', rationale: ['≥12 months after a death', 'Yearning/preoccupation + ≥3 associated symptoms with impairment'], next: ['Grief-focused psychotherapy; screen for MDD and suicide risk'], link })
    if (t.exposureA) {
      if (t.timing === 'lt3d') results.push({ id: 'asr', label: 'Acute stress reaction (no disorder yet)', status: 'consider', rationale: ['Acute stress disorder requires symptoms from day 3 to 1 month'], next: ['Practical support, psychological first aid; no single-session debriefing; reassess'], link })
      else if (t.fullClusters && t.timing === '3dto1m') results.push({ id: 'asd', label: 'Acute stress disorder', status: 'meets', rationale: ['Criterion A exposure', '≥9 of 14 symptoms between 3 days and 1 month'], next: ['Brief trauma-focused CBT; avoid benzodiazepines'], link })
      else if (t.fullClusters && t.timing === 'gt1m') results.push({ id: 'ptsd', label: 'Posttraumatic stress disorder', status: 'meets', rationale: ['Criterion A exposure', 'Intrusion, avoidance, negative cognition/mood and arousal clusters for >1 month'], next: ['Trauma-focused psychotherapy (CPT, PE, EMDR) first; SSRIs/venlafaxine as alternatives', 'No benzodiazepines'], link: '/learn/trauma-ocd#ptsd-tx' })
      else results.push({ id: 'adjustment-a', label: 'Subthreshold trauma response / adjustment disorder', status: 'consider', rationale: ['Criterion A exposure without full symptom clusters'], next: ['Monitor; brief therapy; reassess for delayed-expression PTSD'], link })
    } else if (t.nonTraumaStressor) {
      results.push({ id: 'adjustment', label: 'Adjustment disorder', status: 'meets', rationale: ['Distress or impairment within 3 months of a stressor', 'Does not meet another disorder'], next: ['Brief psychotherapy, problem-solving; reassess at 6 months'], link })
    }
  }

  // ── Obsessive-compulsive spectrum ────────────────────────────────
  if (c.oc) {
    const o = i.oc
    const link = '/learn/trauma-ocd#ocd'
    const insightText = { good: 'with good or fair insight', poor: 'with poor insight', absent: 'with absent insight/delusional beliefs' }[o.insight]
    if (o.obsComp) results.push({ id: 'ocd', label: `Obsessive-compulsive disorder, ${insightText}`, status: 'meets', rationale: ['Obsessions and/or compulsions, time-consuming (>1 h/day) or impairing', ...(o.insight === 'absent' ? ['Absent insight does not convert OCD into a psychotic disorder'] : [])], next: ['ERP + SSRI at higher doses for 8–12 weeks', 'Y-BOCS to track severity'], link: '/learn/trauma-ocd#ocd-tx' })
    if (o.appearance) results.push({ id: 'bdd', label: 'Body dysmorphic disorder', status: 'meets', rationale: ['Preoccupation with perceived appearance flaws with repetitive behaviors'], next: ['Assess suicide risk; CBT for BDD + SSRI; discourage cosmetic procedures'], link: '/learn/trauma-ocd#related' })
    if (o.hoarding) results.push({ id: 'hoarding', label: 'Hoarding disorder', status: 'meets', rationale: ['Persistent difficulty discarding with clutter compromising living areas'], next: ['CBT for hoarding; safety assessment (fire, falls)'], link: '/learn/trauma-ocd#related' })
    if (o.bfrb) results.push({ id: 'bfrb', label: 'Trichotillomania or excoriation disorder', status: 'meets', rationale: ['Recurrent hair pulling or skin picking with attempts to stop'], next: ['Habit reversal training; consider N-acetylcysteine'], link: '/learn/trauma-ocd#related' })
  }

  const rank: Record<DxStatus, number> = { priority: 0, meets: 1, consider: 2 }
  results.sort((a, b) => rank[a.status] - rank[b.status])
  return { alerts, results }
}
