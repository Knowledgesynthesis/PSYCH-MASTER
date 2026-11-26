import type { Tone } from '@/content/types'

export interface ScaleOption {
  score: number
  label: string
}

export interface ScaleItem {
  id: string
  label: string
  hint?: string
  options: ScaleOption[]
}

export interface Band {
  min: number
  max: number
  label: string
  tone: Tone
  advice: string
}

export interface Scale {
  id: 'phq9' | 'gad7' | 'auditc' | 'ciwa' | 'cows'
  name: string
  short: string
  purpose: string
  instructions: string
  items: ScaleItem[]
  bands: Band[]
  refs: string[]
  flags?: (answers: Record<string, number>) => string[]
}

const freq = [
  { score: 0, label: 'Not at all' },
  { score: 1, label: 'Several days' },
  { score: 2, label: 'More than half the days' },
  { score: 3, label: 'Nearly every day' },
]

/** CIWA-Ar items anchored at 0, 1, 4, 7 with unlabeled intermediate values. */
function anchored(a0: string, a1: string, a4: string, a7: string): ScaleOption[] {
  return [
    { score: 0, label: a0 },
    { score: 1, label: a1 },
    { score: 2, label: `Between "${a1.toLowerCase()}" and "${a4.toLowerCase()}"` },
    { score: 3, label: `Between "${a1.toLowerCase()}" and "${a4.toLowerCase()}"` },
    { score: 4, label: a4 },
    { score: 5, label: `Between "${a4.toLowerCase()}" and "${a7.toLowerCase()}"` },
    { score: 6, label: `Between "${a4.toLowerCase()}" and "${a7.toLowerCase()}"` },
    { score: 7, label: a7 },
  ]
}

function perceptual(kind: string): ScaleOption[] {
  return [
    { score: 0, label: 'Not present' },
    { score: 1, label: `Very mild ${kind}` },
    { score: 2, label: `Mild ${kind}` },
    { score: 3, label: `Moderate ${kind}` },
    { score: 4, label: 'Moderately severe hallucinations' },
    { score: 5, label: 'Severe hallucinations' },
    { score: 6, label: 'Extremely severe hallucinations' },
    { score: 7, label: 'Continuous hallucinations' },
  ]
}

export const scales: Scale[] = [
  {
    id: 'phq9',
    name: 'Patient Health Questionnaire-9',
    short: 'PHQ-9',
    purpose: 'Depression severity and monitoring (measurement-based care).',
    instructions: 'Over the last 2 weeks, how often has the patient been bothered by each problem?',
    items: [
      { id: 'p1', label: 'Little interest or pleasure in doing things', options: freq },
      { id: 'p2', label: 'Feeling down, depressed, or hopeless', options: freq },
      { id: 'p3', label: 'Trouble falling or staying asleep, or sleeping too much', options: freq },
      { id: 'p4', label: 'Feeling tired or having little energy', options: freq },
      { id: 'p5', label: 'Poor appetite or overeating', options: freq },
      { id: 'p6', label: 'Feeling bad about yourself, or that you are a failure or have let yourself or your family down', options: freq },
      { id: 'p7', label: 'Trouble concentrating on things, such as reading or watching television', options: freq },
      { id: 'p8', label: 'Moving or speaking so slowly that others could notice, or being so fidgety or restless that you move around a lot more than usual', options: freq },
      { id: 'p9', label: 'Thoughts that you would be better off dead, or of hurting yourself in some way', options: freq },
    ],
    bands: [
      { min: 0, max: 4, label: 'Minimal', tone: 'success', advice: 'Monitor; re-screen if symptoms emerge.' },
      { min: 5, max: 9, label: 'Mild', tone: 'info', advice: 'Watchful waiting, support, psychotherapy or guided self-help; reassess in 2–4 weeks.' },
      { min: 10, max: 14, label: 'Moderate', tone: 'warning', advice: '≥10 is the usual threshold for probable major depression (~88% sensitivity and specificity). Treatment plan: psychotherapy and/or antidepressant.' },
      { min: 15, max: 19, label: 'Moderately severe', tone: 'warning', advice: 'Active treatment with antidepressant and/or psychotherapy; close follow-up.' },
      { min: 20, max: 27, label: 'Severe', tone: 'danger', advice: 'Antidepressant plus psychotherapy; consider specialist referral; assess safety, psychosis and need for higher level of care.' },
    ],
    refs: ['phq9-2001'],
    flags: (a) => ((a.p9 ?? 0) > 0 ? ['Item 9 is positive: complete a direct suicide risk assessment now.'] : []),
  },
  {
    id: 'gad7',
    name: 'Generalized Anxiety Disorder-7',
    short: 'GAD-7',
    purpose: 'Anxiety severity screening and monitoring.',
    instructions: 'Over the last 2 weeks, how often has the patient been bothered by each problem?',
    items: [
      { id: 'g1', label: 'Feeling nervous, anxious, or on edge', options: freq },
      { id: 'g2', label: 'Not being able to stop or control worrying', options: freq },
      { id: 'g3', label: 'Worrying too much about different things', options: freq },
      { id: 'g4', label: 'Trouble relaxing', options: freq },
      { id: 'g5', label: 'Being so restless that it is hard to sit still', options: freq },
      { id: 'g6', label: 'Becoming easily annoyed or irritable', options: freq },
      { id: 'g7', label: 'Feeling afraid, as if something awful might happen', options: freq },
    ],
    bands: [
      { min: 0, max: 4, label: 'Minimal', tone: 'success', advice: 'Monitor.' },
      { min: 5, max: 9, label: 'Mild', tone: 'info', advice: 'Psychoeducation, self-help; reassess.' },
      { min: 10, max: 14, label: 'Moderate', tone: 'warning', advice: '≥10 warrants further evaluation for GAD (and panic, social anxiety, PTSD). Offer CBT and/or SSRI/SNRI.' },
      { min: 15, max: 21, label: 'Severe', tone: 'danger', advice: 'Active treatment; consider combined therapy and specialist input.' },
    ],
    refs: ['gad7-2006'],
  },
  {
    id: 'auditc',
    name: 'AUDIT-C (alcohol consumption)',
    short: 'AUDIT-C',
    purpose: 'Brief screen for unhealthy alcohol use.',
    instructions: 'Ask about the past year. One standard drink ≈ 14 g alcohol (12 oz beer, 5 oz wine, 1.5 oz spirits).',
    items: [
      { id: 'a1', label: 'How often do you have a drink containing alcohol?', options: [
        { score: 0, label: 'Never' }, { score: 1, label: 'Monthly or less' }, { score: 2, label: '2–4 times a month' }, { score: 3, label: '2–3 times a week' }, { score: 4, label: '4 or more times a week' },
      ] },
      { id: 'a2', label: 'How many standard drinks do you have on a typical day when drinking?', options: [
        { score: 0, label: '1 or 2' }, { score: 1, label: '3 or 4' }, { score: 2, label: '5 or 6' }, { score: 3, label: '7 to 9' }, { score: 4, label: '10 or more' },
      ] },
      { id: 'a3', label: 'How often do you have 6 or more drinks on one occasion?', options: [
        { score: 0, label: 'Never' }, { score: 1, label: 'Less than monthly' }, { score: 2, label: 'Monthly' }, { score: 3, label: 'Weekly' }, { score: 4, label: 'Daily or almost daily' },
      ] },
    ],
    bands: [
      { min: 0, max: 2, label: 'Negative', tone: 'success', advice: 'Reinforce low-risk drinking.' },
      { min: 3, max: 3, label: 'Positive for women (negative for men)', tone: 'info', advice: 'Women: brief intervention and follow-up. Men: below threshold (≥4).' },
      { min: 4, max: 7, label: 'Positive', tone: 'warning', advice: 'Brief intervention; assess for AUD (DSM-5-TR criteria), withdrawal risk, and offer treatment.' },
      { min: 8, max: 12, label: 'Positive: high likelihood of AUD', tone: 'danger', advice: 'Full AUD assessment, withdrawal risk (PAWSS), medications (naltrexone/acamprosate), liver evaluation.' },
    ],
    refs: ['auditc-1998', 'uspstf-alcohol-2018'],
  },
  {
    id: 'ciwa',
    name: 'Clinical Institute Withdrawal Assessment for Alcohol, revised',
    short: 'CIWA-Ar',
    purpose: 'Alcohol withdrawal severity; guides symptom-triggered treatment. Requires a patient who can communicate.',
    instructions: 'Observe and ask about each symptom. Maximum score 67.',
    items: [
      { id: 'c1', label: 'Nausea and vomiting', hint: '"Do you feel sick to your stomach? Have you vomited?"', options: anchored('No nausea and no vomiting', 'Mild nausea, no vomiting', 'Intermittent nausea with dry heaves', 'Constant nausea, frequent dry heaves and vomiting') },
      { id: 'c2', label: 'Tremor', hint: 'Arms extended, fingers spread apart.', options: anchored('No tremor', 'Not visible, but can be felt fingertip to fingertip', 'Moderate, with arms extended', 'Severe, even with arms not extended') },
      { id: 'c3', label: 'Paroxysmal sweats', options: anchored('No sweat visible', 'Barely perceptible sweating, palms moist', 'Beads of sweat obvious on forehead', 'Drenching sweats') },
      { id: 'c4', label: 'Anxiety', hint: '"Do you feel nervous?"', options: anchored('No anxiety, at ease', 'Mildly anxious', 'Moderately anxious, or guarded (anxiety inferred)', 'Equivalent to acute panic states') },
      { id: 'c5', label: 'Agitation', options: anchored('Normal activity', 'Somewhat more than normal activity', 'Moderately fidgety and restless', 'Paces back and forth or constantly thrashes about') },
      { id: 'c6', label: 'Tactile disturbances', hint: 'Itching, pins and needles, burning, numbness, bugs crawling?', options: perceptual('itching, pins and needles, burning or numbness') },
      { id: 'c7', label: 'Auditory disturbances', hint: 'Sounds harsh or frightening? Hearing things that aren\'t there?', options: perceptual('harshness or ability to frighten') },
      { id: 'c8', label: 'Visual disturbances', hint: 'Light too bright, colors different, seeing things that aren\'t there?', options: perceptual('sensitivity') },
      { id: 'c9', label: 'Headache, fullness in head', hint: 'Do not rate dizziness or light-headedness.', options: [
        { score: 0, label: 'Not present' }, { score: 1, label: 'Very mild' }, { score: 2, label: 'Mild' }, { score: 3, label: 'Moderate' }, { score: 4, label: 'Moderately severe' }, { score: 5, label: 'Severe' }, { score: 6, label: 'Very severe' }, { score: 7, label: 'Extremely severe' },
      ] },
      { id: 'c10', label: 'Orientation and clouding of sensorium', hint: '"What day is this? Where are you? Who am I?" Serial additions.', options: [
        { score: 0, label: 'Oriented and can do serial additions' },
        { score: 1, label: 'Cannot do serial additions or is uncertain about date' },
        { score: 2, label: 'Disoriented for date by no more than 2 calendar days' },
        { score: 3, label: 'Disoriented for date by more than 2 calendar days' },
        { score: 4, label: 'Disoriented for place and/or person' },
      ] },
    ],
    bands: [
      { min: 0, max: 9, label: 'Mild withdrawal (<10)', tone: 'success', advice: 'Supportive care; medication often not needed unless high risk of complicated withdrawal. Reassess regularly; thiamine.' },
      { min: 10, max: 18, label: 'Moderate withdrawal (10–18)', tone: 'warning', advice: 'Pharmacotherapy (benzodiazepine, or carbamazepine/gabapentin for ambulatory mild–moderate cases); assess setting; thiamine.' },
      { min: 19, max: 67, label: 'Severe withdrawal (≥19)', tone: 'danger', advice: 'Inpatient care; prompt adequate benzodiazepine (or phenobarbital) dosing; consider ICU; look for complications.' },
    ],
    refs: ['ciwa-1989', 'asam-aw-2020'],
    flags: (a) => ((a.c10 ?? 0) >= 2 ? ['Disorientation: consider delirium tremens or another cause of delirium (infection, head injury, hepatic encephalopathy, hypoglycemia, Wernicke).'] : []),
  },
  {
    id: 'cows',
    name: 'Clinical Opiate Withdrawal Scale',
    short: 'COWS',
    purpose: 'Opioid withdrawal severity; timing of buprenorphine initiation.',
    instructions: 'Rate observed signs (pulse after 1 minute of rest). Maximum score 48.',
    items: [
      { id: 'o1', label: 'Resting pulse rate', options: [{ score: 0, label: '≤80' }, { score: 1, label: '81–100' }, { score: 2, label: '101–120' }, { score: 4, label: '>120' }] },
      { id: 'o2', label: 'Sweating (past 30 min, not due to room temperature or activity)', options: [{ score: 0, label: 'No chills or flushing' }, { score: 1, label: 'Subjective chills or flushing' }, { score: 2, label: 'Flushed or observable moistness on face' }, { score: 3, label: 'Beads of sweat on brow or face' }, { score: 4, label: 'Sweat streaming off face' }] },
      { id: 'o3', label: 'Restlessness (observed during assessment)', options: [{ score: 0, label: 'Able to sit still' }, { score: 1, label: 'Reports difficulty sitting still, but is able to' }, { score: 3, label: 'Frequent shifting or extraneous movements of legs/arms' }, { score: 5, label: 'Unable to sit still for more than a few seconds' }] },
      { id: 'o4', label: 'Pupil size', options: [{ score: 0, label: 'Pinned or normal size for room light' }, { score: 1, label: 'Possibly larger than normal' }, { score: 2, label: 'Moderately dilated' }, { score: 5, label: 'So dilated that only the rim of the iris is visible' }] },
      { id: 'o5', label: 'Bone or joint aches (new, not from prior pain)', options: [{ score: 0, label: 'Not present' }, { score: 1, label: 'Mild diffuse discomfort' }, { score: 2, label: 'Reports severe diffuse aching of joints/muscles' }, { score: 4, label: 'Rubbing joints or muscles and unable to sit still because of discomfort' }] },
      { id: 'o6', label: 'Runny nose or tearing (not from cold or allergies)', options: [{ score: 0, label: 'Not present' }, { score: 1, label: 'Nasal stuffiness or unusually moist eyes' }, { score: 2, label: 'Nose running or tearing' }, { score: 4, label: 'Nose constantly running or tears streaming down cheeks' }] },
      { id: 'o7', label: 'GI upset (past 30 min)', options: [{ score: 0, label: 'No GI symptoms' }, { score: 1, label: 'Stomach cramps' }, { score: 2, label: 'Nausea or loose stool' }, { score: 3, label: 'Vomiting or diarrhea' }, { score: 5, label: 'Multiple episodes of diarrhea or vomiting' }] },
      { id: 'o8', label: 'Tremor (outstretched hands)', options: [{ score: 0, label: 'No tremor' }, { score: 1, label: 'Tremor can be felt, but not observed' }, { score: 2, label: 'Slight tremor observable' }, { score: 4, label: 'Gross tremor or muscle twitching' }] },
      { id: 'o9', label: 'Yawning (during assessment)', options: [{ score: 0, label: 'No yawning' }, { score: 1, label: 'Once or twice' }, { score: 2, label: 'Three or more times' }, { score: 4, label: 'Several times per minute' }] },
      { id: 'o10', label: 'Anxiety or irritability', options: [{ score: 0, label: 'None' }, { score: 1, label: 'Reports increasing irritability or anxiousness' }, { score: 2, label: 'Obviously irritable or anxious' }, { score: 4, label: 'So irritable or anxious that participation in assessment is difficult' }] },
      { id: 'o11', label: 'Gooseflesh skin', options: [{ score: 0, label: 'Skin is smooth' }, { score: 3, label: 'Piloerection can be felt or hairs standing up on arms' }, { score: 5, label: 'Prominent piloerection' }] },
    ],
    bands: [
      { min: 0, max: 4, label: 'No active withdrawal (<5)', tone: 'success', advice: 'Too early for a standard buprenorphine start; reassess, or consider low-dose initiation.' },
      { min: 5, max: 12, label: 'Mild (5–12)', tone: 'info', advice: 'Standard buprenorphine initiation commonly begins at COWS ≥8–12 (later after fentanyl or methadone).' },
      { min: 13, max: 24, label: 'Moderate (13–24)', tone: 'warning', advice: 'Appropriate for buprenorphine initiation; symptomatic care.' },
      { min: 25, max: 36, label: 'Moderately severe (25–36)', tone: 'warning', advice: 'Initiate buprenorphine; monitor hydration and electrolytes.' },
      { min: 37, max: 48, label: 'Severe (>36)', tone: 'danger', advice: 'Initiate treatment promptly; assess for complications and other causes.' },
    ],
    refs: ['cows-2003', 'asam-oud-2020'],
  },
]

export const scaleById = Object.fromEntries(scales.map((s) => [s.id, s])) as Record<Scale['id'], Scale>

export function maxScore(scale: Scale) {
  return scale.items.reduce((sum, it) => sum + Math.max(...it.options.map((o) => o.score)), 0)
}

export function scoreScale(scale: Scale, answers: Record<string, number>) {
  const answered = scale.items.filter((it) => answers[it.id] !== undefined).length
  const total = scale.items.reduce((sum, it) => sum + (answers[it.id] ?? 0), 0)
  const band = scale.bands.find((b) => total >= b.min && total <= b.max) ?? scale.bands[scale.bands.length - 1]
  const flags = scale.flags?.(answers) ?? []
  return { total, answered, complete: answered === scale.items.length, band, flags, max: maxScore(scale) }
}
