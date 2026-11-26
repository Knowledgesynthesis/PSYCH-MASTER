// Suicide risk formulation (SAFE-T / C-SSRS concepts). Tiers guide intervention
// intensity and documentation; they are not predictions (NICE NG225).

export type Ideation = 0 | 1 | 2 | 3 | 4 | 5
export type Behavior = 'none' | 'lifetime' | 'recent'

export const ideationLevels: { value: Ideation; label: string; detail: string }[] = [
  { value: 0, label: 'None', detail: 'No wish to be dead or suicidal thoughts' },
  { value: 1, label: 'Wish to be dead', detail: 'Passive: wishes to be dead or not wake up' },
  { value: 2, label: 'Active thoughts, no method', detail: 'Non-specific thoughts of killing oneself' },
  { value: 3, label: 'Thoughts with method', detail: 'Has thought of how, without intent or plan' },
  { value: 4, label: 'Intent, no specific plan', detail: 'Some intention of acting on thoughts' },
  { value: 5, label: 'Intent with plan', detail: 'Details worked out and intends to carry it out' },
]

export interface Factor {
  id: string
  label: string
}

export const acuteFactors: Factor[] = [
  { id: 'command', label: 'Psychosis with command hallucinations to self-harm' },
  { id: 'agitation', label: 'Severe agitation, anxiety or insomnia' },
  { id: 'intox', label: 'Current intoxication or escalating substance use' },
  { id: 'hopeless', label: 'Hopelessness, feeling trapped or a burden' },
  { id: 'loss', label: 'Recent loss, humiliation, legal or financial crisis' },
  { id: 'discharge', label: 'Recent psychiatric discharge (≤3 months)' },
  { id: 'firearm', label: 'Access to a firearm' },
  { id: 'meds', label: 'Access to a lethal quantity of medication' },
  { id: 'noengage', label: 'Unable or unwilling to engage in safety planning' },
]

export const chronicFactors: Factor[] = [
  { id: 'dx', label: 'Mood, psychotic, substance use, eating or personality disorder' },
  { id: 'pain', label: 'Chronic pain or serious medical illness' },
  { id: 'family', label: 'Family history of suicide' },
  { id: 'trauma', label: 'Childhood adversity or trauma' },
  { id: 'isolation', label: 'Social isolation' },
  { id: 'demographic', label: 'Higher-risk group (e.g., older man, veteran, LGBTQ+ youth)' },
  { id: 'nssi', label: 'Non-suicidal self-injury' },
]

export const protectiveFactors: Factor[] = [
  { id: 'reasons', label: 'Identifies reasons for living / future plans' },
  { id: 'connected', label: 'Connected to supportive family or friends' },
  { id: 'children', label: 'Responsibility to children or pets' },
  { id: 'care', label: 'Engaged with care; trusted clinician' },
  { id: 'coping', label: 'Problem-solving and coping skills' },
  { id: 'beliefs', label: 'Cultural or religious beliefs against suicide' },
  { id: 'restricted', label: 'Lethal means secured or removed' },
]

export interface SuicideInput {
  ideation: Ideation
  recentIdeation: boolean
  behavior: Behavior
  acute: string[]
  chronic: string[]
  protective: string[]
}

export type Tier = 'low' | 'moderate' | 'high'

export interface Formulation {
  tier: Tier
  reasons: string[]
  interventions: string[]
  note: string
}

const nameOf = (list: Factor[], ids: string[]) => ids.map((id) => list.find((f) => f.id === id)?.label).filter(Boolean) as string[]

export function formulate(input: SuicideInput): Formulation {
  const reasons: string[] = []
  const has = (id: string) => input.acute.includes(id)
  const activeIdeation = input.recentIdeation ? input.ideation : 0

  let tier: Tier = 'low'

  // High-acuity triggers
  if (activeIdeation >= 4) {
    tier = 'high'
    reasons.push(activeIdeation === 5 ? 'Suicidal intent with a plan in the past month' : 'Suicidal intent in the past month')
  }
  if (input.behavior === 'recent') {
    tier = 'high'
    reasons.push('Suicidal behavior (attempt, interrupted/aborted attempt or preparation) within 3 months')
  }
  if (has('command') && input.ideation >= 1) {
    tier = 'high'
    reasons.push('Command hallucinations to self-harm with suicidal thinking')
  }
  if (activeIdeation >= 3 && (has('agitation') || has('noengage'))) {
    tier = 'high'
    reasons.push(has('noengage') ? 'Ideation with method and inability to engage in safety planning' : 'Ideation with method plus severe agitation/insomnia')
  }

  // Moderate triggers
  if (tier === 'low') {
    if (activeIdeation === 3) {
      tier = 'moderate'
      reasons.push('Suicidal thoughts with a method, without intent or behavior')
    }
    if (input.behavior === 'lifetime') {
      tier = 'moderate'
      reasons.push('Lifetime suicidal behavior (>3 months ago): the strongest long-term risk factor')
    }
    const lethalAccess = has('firearm') || has('meds')
    if (activeIdeation >= 2 && lethalAccess) {
      tier = 'moderate'
      reasons.push('Active suicidal thoughts with access to lethal means')
    }
    const burden = input.acute.length + input.chronic.length
    if (activeIdeation >= 1 && burden >= 4 && input.protective.length <= 1) {
      tier = 'moderate'
      reasons.push('Multiple risk factors with few protective factors')
    }
  }

  if (tier === 'low') {
    if (activeIdeation === 0 && input.behavior === 'none') reasons.push('No recent suicidal ideation or behavior reported (risk is never zero; address modifiable factors)')
    else reasons.push('Passive or non-specific ideation without method, intent or behavior')
    if (input.protective.length >= 2) reasons.push('Several protective factors present')
  }

  const universal = [
    'Collaborative written safety plan (warning signs, coping, contacts, professionals, 988, means safety)',
    'Treat modifiable drivers: depression, insomnia, agitation, substance use, pain',
    'Document the formulation, rationale and plan',
  ]
  const means: string[] = []
  if (has('firearm')) means.push('Lethal means counseling: temporary off-site firearm storage (or locked and unloaded, ammunition separate); confirm who and when')
  if (has('meds')) means.push('Limit medication supply; lockbox; dispose of stockpiles')

  const byTier: Record<Tier, string[]> = {
    high: [
      'Do not leave the person alone; remove means in the environment',
      'Emergency psychiatric evaluation; inpatient admission usually indicated',
      'Involuntary hold if criteria are met and the person declines',
      'Collateral from family and records',
    ],
    moderate: [
      'Individualize the level of care: intensive outpatient or partial hospitalization vs admission, depending on supports and engagement',
      'Follow-up within days (not weeks); caring contacts',
      'Involve supports with consent',
    ],
    low: ['Outpatient care with scheduled follow-up', 'Give crisis resources; reassess at every visit'],
  }

  return {
    tier,
    reasons,
    interventions: [...byTier[tier], ...means, ...universal],
    note: 'Tiers summarize clinical judgment to match intervention intensity; risk tools cannot predict who will die by suicide (NICE NG225).',
  }
}

export function documentation(input: SuicideInput, f: Formulation, date = new Date()): string {
  const lvl = ideationLevels.find((l) => l.value === input.ideation)!
  const behavior = { none: 'No lifetime suicidal behavior reported', lifetime: 'Lifetime suicidal behavior >3 months ago', recent: 'Suicidal behavior within the past 3 months' }[input.behavior]
  const list = (xs: string[]) => (xs.length ? xs.join('; ') : 'none identified')
  return [
    `Suicide risk formulation — ${date.toISOString().slice(0, 10)}`,
    `Ideation: ${lvl.label} (${lvl.detail.toLowerCase()})${input.ideation > 0 ? (input.recentIdeation ? ', within the past month' : ', not in the past month') : ''}.`,
    `Behavior: ${behavior}.`,
    `Acute/modifiable factors: ${list(nameOf(acuteFactors, input.acute))}.`,
    `Longer-term risk factors: ${list(nameOf(chronicFactors, input.chronic))}.`,
    `Protective factors: ${list(nameOf(protectiveFactors, input.protective))}.`,
    `Formulation: ${f.tier.toUpperCase()} acute risk tier. Basis: ${f.reasons.join('; ')}.`,
    `Plan: ${f.interventions.join('; ')}.`,
  ].join('\n')
}
