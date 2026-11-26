import type { Module } from '../types'

export const traumaOcd: Module = {
  id: 'trauma-ocd',
  title: 'Trauma, Stressor & OCD Spectrum',
  short: 'Trauma & OCD',
  path: '/learn/trauma-ocd',
  icon: 'Repeat',
  color: 'from-emerald-500 to-teal-600',
  summary: 'PTSD, acute stress, adjustment and prolonged grief disorders; OCD and related disorders: precise criteria, trauma-focused therapy and ERP first, and what not to prescribe.',
  minutes: 40,
  objectives: [
    'Apply PTSD, acute stress disorder, adjustment disorder and prolonged grief disorder criteria.',
    'Prioritize trauma-focused psychotherapy; know the limits of medications (and why to avoid benzodiazepines).',
    'Distinguish OCD from psychosis, OCPD and GAD worry; use the insight specifier correctly.',
    'Deliver OCD treatment: ERP, high-dose SSRIs, clomipramine, and augmentation for resistance.',
    'Recognize BDD, hoarding, trichotillomania and excoriation disorder and their specific treatments.',
  ],
  sections: [
    {
      id: 'trauma-dx',
      title: 'Trauma- and stressor-related disorders',
      lead: 'Criterion A defines the event; time since exposure defines the diagnosis.',
      blocks: [
        {
          type: 'criteria',
          title: 'PTSD (DSM-5-TR, adults)',
          rule: 'Exposure to actual or threatened death, serious injury, or sexual violence (directly, witnessed, learning it happened to a close person, or repeated professional exposure to details*), then for >1 month:',
          items: [
            'B. Intrusion (≥1): memories, nightmares, flashbacks, distress or physiological reactivity to cues',
            'C. Avoidance (≥1): of trauma-related thoughts/feelings or external reminders',
            'D. Negative cognitions and mood (≥2): amnesia for parts of the event, negative beliefs, distorted blame, persistent negative emotions, diminished interest, detachment, inability to feel positive emotions',
            'E. Arousal and reactivity (≥2): irritability/aggression, recklessness, hypervigilance, exaggerated startle, poor concentration, sleep disturbance',
          ],
          note: '*Exposure through media counts only if work-related (e.g., police reviewing abuse material). Specifiers: with dissociative symptoms; with delayed expression (full criteria ≥6 months after the event). Children ≤6 have separate criteria.',
        },
        {
          type: 'table',
          head: ['Disorder', 'Timing', 'Core requirement'],
          rows: [
            ['Acute stress disorder', '3 days to 1 month after trauma', '≥9 of 14 symptoms across intrusion, negative mood, dissociation, avoidance, arousal'],
            ['PTSD', '>1 month', 'Full criteria B–E (above)'],
            ['Adjustment disorder', 'Within 3 months of any stressor; resolves within 6 months after the stressor ends', 'Distress out of proportion or impairment; does not meet another disorder'],
            ['Prolonged grief disorder (new in DSM-5-TR)', '≥12 months after a death (≥6 months in children)', 'Intense yearning or preoccupation + ≥3 of 8 (identity disruption, disbelief, avoidance, intense emotional pain, difficulty reintegrating, numbness, meaninglessness, intense loneliness), nearly every day for ≥1 month'],
          ],
        },
        {
          type: 'sort',
          prompt: 'Which diagnosis fits?',
          categories: ['Acute stress disorder', 'PTSD', 'Adjustment disorder', 'Prolonged grief disorder', 'Normal response'],
          items: [
            { text: '10 days after a carjacking: nightmares, numbness, avoids driving, startles easily, feels unreal', cat: 0, why: '3 days–1 month with a broad symptom set.' },
            { text: '4 months after an assault: flashbacks, avoids the neighborhood, feels permanently damaged, hypervigilant', cat: 1, why: '>1 month with all clusters.' },
            { text: 'Tearful and not sleeping 6 weeks after a divorce; struggling at work', cat: 2, why: 'Non-traumatic stressor within 3 months, causing impairment.' },
            { text: '18 months after her son died: daily intense yearning, feels part of herself died, cannot re-engage', cat: 3, why: '≥12 months with yearning plus ≥3 associated symptoms.' },
            { text: 'Day 2 after a car crash: shaky, replaying the scene, sleeping poorly', cat: 4, why: 'Acute stress reaction; ASD needs ≥3 days. Support and watchful waiting.' },
          ],
        },
      ],
      refs: ['dsm5tr'],
      check: [
        {
          id: 'tr-dx-1',
          q: 'A man developed nightmares and hypervigilance 3 weeks after witnessing a shooting. Diagnosis?',
          options: ['PTSD', 'Acute stress disorder (if ≥9 symptoms)', 'Adjustment disorder', 'Brief psychotic disorder'],
          answer: 1,
          why: 'Between 3 days and 1 month after trauma = acute stress disorder (if criteria are met). PTSD requires >1 month.',
        },
      ],
    },
    {
      id: 'ptsd-tx',
      title: 'PTSD treatment: what actually works',
      lead: 'Trauma-focused psychotherapy outperforms medication: offer it first.',
      blocks: [
        {
          type: 'table',
          head: ['Treatment', 'Status (VA/DoD 2023, NICE)', 'Notes'],
          rows: [
            ['Cognitive processing therapy (CPT)', 'Strong recommendation', '~12 sessions; restructures stuck points (self-blame, safety, trust)'],
            ['Prolonged exposure (PE)', 'Strong recommendation', 'In-vivo and imaginal exposure to the trauma memory'],
            ['EMDR', 'Strong recommendation', 'Bilateral stimulation during trauma recall'],
            ['Written exposure therapy (WET)', 'Recommended', '5 sessions; lower dropout'],
            ['Trauma-focused CBT (TF-CBT)', 'First-line in children/adolescents', 'Includes caregiver'],
            ['Sertraline, paroxetine, fluoxetine, venlafaxine', 'Suggested when therapy is unavailable or declined', 'Only sertraline and paroxetine are FDA-approved; effects are modest'],
            ['Prazosin', 'Suggested for nightmares; suggested against for global PTSD', 'Largest RCT (Raskind 2018) was negative; watch orthostasis'],
          ],
        },
        {
          type: 'callout',
          tone: 'danger',
          title: 'Do not use',
          items: [
            '**Benzodiazepines** (VA/DoD: recommend against): no benefit for PTSD, associated with worse outcomes, and they impair extinction learning in therapy.',
            '**Cannabis** (VA/DoD: recommend against).',
            '**Single-session psychological debriefing** for everyone exposed: ineffective and may increase PTSD.',
          ],
        },
        {
          type: 'list',
          title: 'Status of newer options (late 2026)',
          items: [
            'Brexpiprazole + sertraline for PTSD: **FDA declined** (complete response letter, September 2025).',
            'MDMA-assisted therapy: FDA declined in 2024; a resubmission has been reported; **not approved**.',
            'Ketamine and stellate ganglion block: insufficient evidence for routine use.',
          ],
        },
        {
          type: 'list',
          title: 'Early after trauma',
          items: [
            'Most people recover naturally. Provide practical support, information, and follow-up (psychological first aid); screen at about 1 month.',
            'For acute stress disorder or significant early symptoms, **brief trauma-focused CBT** can prevent chronic PTSD.',
            'Screen for and treat comorbidity concurrently: depression, substance use (integrated treatment works), TBI, chronic pain, suicide risk.',
          ],
        },
      ],
      refs: ['vadod-ptsd-2023', 'nice-ng116', 'raskind-2018', 'guina-2015', 'rexulti-ptsd-2025'],
      check: [
        {
          id: 'tr-tx-1',
          q: 'A veteran with PTSD asks for alprazolam for anxiety and nightmares. Best response?',
          options: [
            'Prescribe alprazolam; it reduces hyperarousal',
            'Recommend trauma-focused psychotherapy (CPT/PE/EMDR); avoid benzodiazepines; consider an SSRI and prazosin for nightmares',
            'Recommend single-session debriefing',
            'Prescribe brexpiprazole + sertraline (FDA-approved)',
          ],
          answer: 1,
          why: 'Benzodiazepines are recommended against for PTSD. Trauma-focused therapy is first-line; brexpiprazole + sertraline was not approved.',
        },
      ],
    },
    {
      id: 'ocd',
      title: 'Obsessive-compulsive disorder',
      lead: 'Obsessions raise anxiety; compulsions neutralize it, and that relief is what keeps OCD going.',
      blocks: [
        {
          type: 'criteria',
          title: 'OCD',
          rule: 'Obsessions, compulsions, or both, that are time-consuming (>1 h/day) or cause distress or impairment:',
          items: [
            '**Obsessions**: recurrent, intrusive, unwanted thoughts, urges or images that cause anxiety; the person tries to ignore, suppress or neutralize them',
            '**Compulsions**: repetitive behaviors or mental acts performed in response to an obsession or rigid rules, aimed at reducing distress or preventing a feared event; excessive or not realistically connected to it',
          ],
          note: 'Insight specifier: good/fair, poor, or **absent insight/delusional beliefs**. OCD with absent insight is still OCD, not a psychotic disorder. Also: tic-related specifier.',
        },
        {
          type: 'table',
          caption: 'Common symptom dimensions',
          head: ['Dimension', 'Obsession', 'Compulsion'],
          rows: [
            ['Contamination', 'Germs, bodily fluids, chemicals', 'Washing, cleaning, avoidance'],
            ['Harm / responsibility', 'Causing a fire, hitting someone with the car', 'Checking, reassurance-seeking'],
            ['Symmetry / "just right"', 'Unevenness, incompleteness', 'Ordering, arranging, repeating'],
            ['Taboo thoughts', 'Unwanted sexual, religious or aggressive images', 'Mental rituals, praying, undoing'],
          ],
        },
        {
          type: 'compare',
          caption: 'OCD vs look-alikes',
          left: {
            title: 'OCD',
            items: ['Thoughts are intrusive and unwanted (ego-dystonic)', 'Neutralized by compulsions or mental rituals', 'Insight usually present, but can be absent', 'Harm obsessions do NOT increase risk of acting'],
          },
          right: {
            title: 'Look-alikes',
            items: ['**Psychosis**: delusions held without resistance; no neutralizing rituals; other psychotic symptoms', '**OCPD**: perfectionism and rigidity experienced as correct (ego-syntonic); no true obsessions', '**GAD**: worry about real-life problems, not experienced as senseless; no rituals', '**Tics**: brief, sensory urge-driven movements, not anxiety-neutralizing'],
          },
        },
        {
          type: 'sort',
          prompt: 'Obsession, compulsion, or neither?',
          categories: ['Obsession', 'Compulsion', 'Neither'],
          items: [
            { text: 'Horrifying image of stabbing her baby that she tries to push away', cat: 0, why: 'Intrusive, unwanted, ego-dystonic: a harm obsession (not a risk of acting).' },
            { text: 'Silently counting to 50 to "cancel" a bad thought', cat: 1, why: 'Mental ritual to neutralize distress.' },
            { text: 'Worrying whether rent can be paid this month', cat: 2, why: 'Realistic everyday worry.' },
            { text: 'Rechecking that the stove is off 20 times before leaving', cat: 1, why: 'Checking compulsion.' },
            { text: 'Calm certainty that neighbors implanted a microchip in his tooth', cat: 2, why: 'A delusion: held without resistance, no neutralizing ritual.' },
          ],
        },
        {
          type: 'p',
          text: 'Severity is tracked with the **Y-BOCS** (0–40): 0–7 subclinical, 8–15 mild, 16–23 moderate, 24–31 severe, 32–40 extreme. Treatment response is commonly defined as a ≥35% reduction.',
        },
      ],
      refs: ['dsm5tr', 'nice-cg31'],
      check: [
        {
          id: 'ocd-1',
          q: 'A man is fully convinced that unless he taps the door 12 times his family will die, and he has no doubt about it. No other psychotic symptoms. Diagnosis?',
          options: ['Delusional disorder', 'OCD with absent insight/delusional beliefs', 'Schizophrenia', 'OCPD'],
          answer: 1,
          why: 'The belief is tied to a compulsion that neutralizes it. DSM-5-TR keeps this as OCD with the "absent insight/delusional beliefs" specifier.',
        },
      ],
    },
    {
      id: 'ocd-tx',
      title: 'OCD treatment',
      lead: 'ERP plus an SSRI at a higher dose for longer than in depression.',
      blocks: [
        {
          type: 'list',
          items: [
            '**Exposure and response prevention (ERP)** is first-line: graded exposure to obsessional triggers while refraining from rituals, including reassurance-seeking and mental rituals.',
            '**SSRIs**: fluoxetine, fluvoxamine, sertraline and paroxetine are FDA-approved (escitalopram and citalopram are used too). OCD typically needs **higher doses** and a **longer trial (8–12 weeks, ≥4–6 weeks at the maximum tolerated dose)**.',
            '**Clomipramine** (TCA, FDA-approved): at least as effective as SSRIs but with more adverse effects (anticholinergic, seizures above ~250 mg/day, cardiac conduction, lethal in overdose). Usually second-line.',
            'Combine ERP + SSRI for moderate–severe OCD or partial response. After response, continue medication for **1–2 years** before a slow taper.',
          ],
        },
        {
          type: 'steps',
          title: 'Treatment-resistant OCD',
          items: [
            { title: 'Verify', text: 'Adequate dose and duration, adherence, quality of ERP (including mental rituals), comorbid tics, depression, or substance use.' },
            { title: 'Switch', text: 'Another SSRI or clomipramine.' },
            { title: 'Augment', text: 'Low-dose antipsychotic: **risperidone or aripiprazole** have the best evidence (about one-third respond). Haloperidol helps when tics coexist.' },
            { title: 'Intensify', text: 'Intensive or residential ERP programs.' },
            { title: 'Neuromodulation', text: 'Deep TMS (FDA-cleared for OCD, 2018); deep brain stimulation or lesion surgery for severe, refractory cases in specialist centers.' },
          ],
        },
        {
          type: 'callout',
          tone: 'pitfall',
          title: 'Pitfalls',
          items: [
            'Under-dosing SSRIs or stopping before 8–12 weeks.',
            'Providing reassurance repeatedly: it is a compulsion and maintains OCD.',
            'Treating harm obsessions as dangerousness: intrusive harm thoughts in OCD are not associated with acting on them.',
            'Benzodiazepines: no role in OCD.',
          ],
        },
      ],
      refs: ['nice-cg31', 'bloch-2006', 'canmat-anx-2014'],
      check: [
        {
          id: 'ocd-tx-1',
          q: 'OCD with partial response after 12 weeks of maximum-dose sertraline plus ERP. Best evidence-based augmentation?',
          options: ['Clonazepam', 'Low-dose risperidone or aripiprazole', 'Buspirone', 'Lamotrigine'],
          answer: 1,
          why: 'Antipsychotic augmentation (risperidone, aripiprazole) has the best evidence for SSRI-refractory OCD.',
        },
      ],
    },
    {
      id: 'related',
      title: 'Related disorders',
      lead: 'Same family, different targets and treatments.',
      blocks: [
        {
          type: 'table',
          head: ['Disorder', 'Key features', 'Treatment'],
          rows: [
            ['Body dysmorphic disorder', 'Preoccupation with perceived flaws invisible or slight to others; mirror-checking, camouflaging, comparing; insight often poor; muscle dysmorphia specifier; **high suicide risk**', 'CBT for BDD + SSRIs at OCD doses; cosmetic procedures rarely help and often worsen distress'],
            ['Hoarding disorder', 'Persistent difficulty discarding, distress at discarding, clutter that compromises living areas; often poor insight; fire and fall hazards', 'CBT for hoarding; harm reduction; medication evidence is limited'],
            ['Trichotillomania', 'Recurrent hair pulling with hair loss and attempts to stop', 'Habit reversal training (awareness, competing response); N-acetylcysteine has RCT support'],
            ['Excoriation disorder', 'Recurrent skin picking causing lesions', 'Habit reversal training; SSRIs and NAC have mixed evidence'],
          ],
        },
      ],
      refs: ['nice-cg31', 'grant-2009', 'dsm5tr'],
    },
  ],
  takeaways: [
    'PTSD needs >1 month; acute stress disorder spans 3 days to 1 month; prolonged grief needs ≥12 months.',
    'Trauma-focused therapy (CPT, PE, EMDR) first; SSRIs/venlafaxine second; no benzodiazepines, no universal debriefing.',
    'OCD with absent insight is still OCD; harm obsessions are not intent.',
    'ERP + SSRI at high dose for 8–12 weeks; augment with risperidone or aripiprazole if refractory.',
    'BDD carries high suicide risk; cosmetic procedures rarely help.',
  ],
  flashcards: [
    { id: 'fc-tr-1', front: 'PTSD symptom clusters and counts', back: 'Intrusion ≥1, avoidance ≥1, negative cognition/mood ≥2, arousal ≥2; >1 month.' },
    { id: 'fc-tr-2', front: 'Acute stress disorder timing', back: '3 days to 1 month after the trauma; ≥9 of 14 symptoms.' },
    { id: 'fc-tr-3', front: 'Prolonged grief disorder timing (adults)', back: '≥12 months after the death (≥6 months in children).' },
    { id: 'fc-tr-4', front: 'First-line PTSD treatments', back: 'Trauma-focused psychotherapy: CPT, PE, EMDR (also WET).' },
    { id: 'fc-tr-5', front: 'FDA-approved medications for PTSD', back: 'Sertraline and paroxetine.' },
    { id: 'fc-tr-6', front: 'Benzodiazepines in PTSD', back: 'Recommended against (VA/DoD 2023): no benefit, worse outcomes, impair exposure learning.' },
    { id: 'fc-tr-7', front: 'Prazosin in PTSD', back: 'Suggested for nightmares, suggested against for global PTSD; the largest RCT (2018) was negative.' },
    { id: 'fc-tr-8', front: 'Psychological debriefing after trauma', back: 'Not recommended: ineffective and may increase PTSD.' },
    { id: 'fc-tr-9', front: 'OCD insight specifiers', back: 'Good/fair, poor, absent insight/delusional beliefs (still OCD).' },
    { id: 'fc-tr-10', front: 'SSRI dosing in OCD vs depression', back: 'Higher doses and a longer trial: 8–12 weeks, with ≥4–6 weeks at the maximum tolerated dose.' },
    { id: 'fc-tr-11', front: 'Best-evidence augmentation for SSRI-refractory OCD', back: 'Low-dose risperidone or aripiprazole.' },
    { id: 'fc-tr-12', front: 'Clomipramine cautions', back: 'Anticholinergic effects, seizures (>250 mg/day), cardiac conduction delay, lethal in overdose, serotonin syndrome with MAOIs.' },
    { id: 'fc-tr-13', front: 'Y-BOCS severity bands', back: '0–7 subclinical, 8–15 mild, 16–23 moderate, 24–31 severe, 32–40 extreme.' },
    { id: 'fc-tr-14', front: 'Habit reversal training', back: 'Awareness training + competing response + social support; first-line for trichotillomania and excoriation disorder.' },
  ],
}
