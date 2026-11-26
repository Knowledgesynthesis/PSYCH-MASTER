import type { Module } from '../types'

export const suicide: Module = {
  id: 'suicide',
  title: 'Suicide Risk',
  short: 'Suicide risk',
  path: '/learn/suicide',
  icon: 'LifeBuoy',
  color: 'from-rose-500 to-orange-500',
  summary: 'Screen, ask directly, formulate (not predict), and intervene: safety planning, lethal means counseling, follow-up and the right level of care.',
  minutes: 40,
  objectives: [
    'Use validated screening (ASQ, C-SSRS, PHQ-9 item 9) and follow positives with a full assessment.',
    'Ask about ideation, intent, plan, preparatory behavior and past attempts, clearly and without hesitation.',
    'Synthesize risk factors, warning signs and protective factors into a formulation that drives intervention, not a prediction.',
    'Deliver evidence-based interventions: Safety Planning Intervention, lethal means counseling, caring contacts, follow-up.',
    'Choose the least restrictive level of care that keeps the person safe, and document the reasoning.',
  ],
  sections: [
    {
      id: 'numbers',
      title: 'Facts that change practice',
      lead: 'Most people who die by suicide had recent contact with health care: every clinician is part of prevention.',
      blocks: [
        {
          type: 'list',
          items: [
            'In the US, roughly **49,000 people die by suicide each year**; firearms account for **over half** of these deaths.',
            'Men die by suicide about **4×** as often as women; women make more nonfatal attempts. Rates are highest among men ≥75 and among American Indian/Alaska Native people.',
            'A prior suicide attempt or self-harm is the strongest single risk factor: about **1.6%** of people seen in hospital for self-harm die by suicide within a year (~4% within 5 years).',
            'The **first week and first 3 months after psychiatric discharge** carry the highest suicide rates.',
            'About half of people who die by suicide saw a clinician in the month before death, often in primary care or the ED.',
            'Asking about suicide **does not** plant the idea or increase risk.',
          ],
        },
      ],
      refs: ['cdc-suicide', 'carroll-2014', 'chung-2017', 'dazzi-2014'],
      check: [
        {
          id: 'su-num-1',
          q: 'When is suicide risk highest after psychiatric hospitalization?',
          options: ['Months 6–12', 'The first week and first 3 months after discharge', 'Only during the admission', 'Risk returns to baseline at discharge'],
          answer: 1,
          why: 'Post-discharge suicide rates peak in the first week and remain very high for 3 months: schedule follow-up within 7 days (ideally 24–72 h).',
        },
      ],
    },
    {
      id: 'screening',
      title: 'Screening vs assessment',
      lead: 'A screen finds who needs a conversation; the assessment is the conversation.',
      blocks: [
        {
          type: 'table',
          head: ['Tool', 'Use', 'Positive → '],
          rows: [
            ['ASQ (NIMH)', '4 yes/no questions + acuity question; validated in medical settings for ages ≥10, and in adults', 'Brief suicide safety assessment; "yes" to acuity question = imminent risk'],
            ['C-SSRS screener', 'Graded ideation (wish to be dead → intent with plan) and recent behavior', 'Intent, plan with intent, or behavior in past 3 months = high-acuity'],
            ['PHQ-9 item 9', 'Asks about thoughts of death or self-harm over 2 weeks', 'Not a suicide screen alone: high false-positive rate; always follow with direct questions'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Standards',
          text: 'The Joint Commission (NPSG 15.01.01) requires screening with a validated tool for patients ≥12 evaluated or treated for behavioral health conditions, an evidence-based assessment for those who screen positive, safety planning, and follow-up. Many health systems apply universal screening in EDs.',
        },
      ],
      refs: ['asq', 'cssrs-2011', 'tjc-npsg', 'phq9-2001'],
    },
    {
      id: 'interview',
      title: 'The interview: ideation, intent, plan, behavior',
      lead: 'Be specific and calm. Vague questions get vague answers.',
      blocks: [
        {
          type: 'steps',
          title: 'Climb the ladder (C-SSRS concepts, paraphrased)',
          items: [
            { title: 'Wish to be dead', text: '"Have you wished you were dead or could go to sleep and not wake up?"' },
            { title: 'Active thoughts', text: '"Have you had thoughts of killing yourself?"' },
            { title: 'Method', text: '"Have you thought about how you might do it?"' },
            { title: 'Intent', text: '"Have you had any intention of acting on these thoughts?"' },
            { title: 'Plan', text: '"Have you worked out details: when, where, how? Do you intend to carry it out?"' },
            { title: 'Behavior', text: '"Have you done anything, started to, or prepared to end your life: collected pills, got a gun, written a note, rehearsed?" Ask about attempts that were **interrupted** or **aborted**, and when (past 3 months?).' },
          ],
        },
        {
          type: 'list',
          title: 'Interview techniques that increase disclosure',
          items: [
            '**Normalize**: "Many people going through this much pain think about suicide. Have you?"',
            '**Gentle assumption**: "How often have you thought about suicide this week?"',
            '**Timeline**: now, past month, and the worst it has ever been.',
            '**Chain analysis** of a recent attempt: trigger, planning, method and lethality, likelihood of rescue, and reaction to surviving (regret vs relief).',
            '**Collateral**: family, friends, records. HIPAA permits disclosure to prevent a serious and imminent threat.',
          ],
        },
        {
          type: 'reveal',
          prompt: 'Patient: "I\'d never do anything, I just don\'t care if I wake up." What is your next question?',
          answer: 'Explore further rather than accepting reassurance: "When you think about not waking up, have you ever had thoughts of making that happen?" Then ask about method, intent, preparatory acts, access to means (especially firearms and stockpiled medication), and past attempts.',
        },
      ],
      refs: ['cssrs-2011', 'dazzi-2014'],
      check: [
        {
          id: 'su-int-1',
          q: 'Which finding indicates the HIGHEST acute concern?',
          options: ['Passive wish to be dead last year', 'Thoughts of suicide without method', 'Bought a firearm and wrote a note this week', 'Family history of suicide'],
          answer: 2,
          why: 'Recent preparatory behavior (acquiring means, a note) signals active intent; it outweighs ideation alone and static risk factors.',
        },
      ],
    },
    {
      id: 'factors',
      title: 'Risk factors, warning signs, protective factors',
      lead: 'Risk factors tell you who is at elevated risk; warning signs tell you when.',
      blocks: [
        {
          type: 'compare',
          left: {
            title: 'Risk factors (longer-term)',
            items: [
              'Prior attempt or self-harm',
              'Depression, bipolar, schizophrenia, substance use, PTSD, eating disorders, borderline personality disorder',
              'Chronic pain, serious illness, TBI',
              'Family history of suicide; childhood adversity',
              'Male sex, older age, veterans, LGBTQ+ youth (minority stress), incarceration',
              'Firearm access',
            ],
          },
          right: {
            title: 'Warning signs (acute, act now)',
            items: [
              'Talking about wanting to die or being a burden',
              'Seeking means (researching methods, buying a gun, stockpiling)',
              'Hopelessness, feeling trapped, unbearable pain',
              'Agitation, severe insomnia, rage',
              'Increased alcohol or drug use',
              'Withdrawing, saying goodbye, giving things away',
            ],
          },
        },
        {
          type: 'list',
          title: 'Protective factors',
          items: [
            'Reasons for living; responsibility to children or pets; future plans',
            'Connectedness: family, friends, community, faith',
            'Engagement with care and a trusted clinician',
            'Problem-solving and coping skills',
            'Restricted access to lethal means',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Protective factors do not cancel acute risk',
          text: 'A parent with intent, a plan and access to a firearm remains at high acute risk despite loving their children. Use protective factors to build the plan, not to discount danger.',
        },
        {
          type: 'mnemonic',
          title: 'Warning signs: IS PATH WARM? (for recognition, not prediction)',
          letters: [
            { l: 'I', text: 'Ideation' }, { l: 'S', text: 'Substance use' }, { l: 'P', text: 'Purposelessness' }, { l: 'A', text: 'Anxiety / agitation' }, { l: 'T', text: 'Trapped' },
            { l: 'H', text: 'Hopelessness' }, { l: 'W', text: 'Withdrawal' }, { l: 'A', text: 'Anger' }, { l: 'R', text: 'Recklessness' }, { l: 'M', text: 'Mood changes' },
          ],
          note: 'Consensus mnemonic from the American Association of Suicidology; it has not been validated as a prediction tool.',
        },
        {
          type: 'sort',
          prompt: 'Classify each item.',
          categories: ['Static risk factor', 'Modifiable / acute', 'Protective'],
          items: [
            { text: 'Suicide attempt 4 years ago', cat: 0, why: 'History cannot change, but it remains highly relevant.' },
            { text: 'Severe insomnia and agitation this week', cat: 1, why: 'Acute, treatable drivers of risk.' },
            { text: 'Shotgun in the closet', cat: 1, why: 'Access to lethal means is modifiable: counsel on storage/removal.' },
            { text: 'Close relationship with sister who checks in daily', cat: 2, why: 'Connectedness; include her in the safety plan with consent.' },
            { text: 'Father died by suicide', cat: 0, why: 'Family history is a static risk factor.' },
            { text: 'Intoxicated with alcohol', cat: 1, why: 'Disinhibition increases acute risk; reassess when sober.' },
          ],
        },
      ],
      refs: ['mann-2021', 'safe-t'],
    },
    {
      id: 'formulation',
      title: 'Formulation, not prediction',
      lead: 'Risk scores cannot predict who will die by suicide; formulation tells you what to do.',
      blocks: [
        {
          type: 'callout',
          tone: 'danger',
          title: 'The evidence',
          items: [
            'Meta-analyses show that categorizing patients as "high risk" has a very low positive predictive value: most "high-risk" patients do not die by suicide, and many deaths occur in people rated "low risk".',
            '**NICE (2022)**: do not use risk assessment tools or scales to predict suicide or self-harm, or to decide who is offered treatment or discharged. Do a needs-focused psychosocial assessment and safety plan.',
          ],
        },
        {
          type: 'list',
          title: 'A prevention-oriented formulation answers four questions',
          items: [
            '**Risk status**: compared with the general population, how elevated is this person\'s risk (static and longer-term factors)?',
            '**Risk state**: compared with their own baseline, are they worse right now (warning signs, intent, recent behavior)?',
            '**Available resources**: what internal and external supports can be mobilized?',
            '**Foreseeable changes**: what could rapidly increase risk (discharge, court date, relationship loss, intoxication)?',
          ],
        },
        {
          type: 'table',
          caption: 'Tiers guide intervention intensity and documentation (SAFE-T style), not prediction',
          head: ['Tier', 'Typical picture', 'Typical response'],
          rows: [
            ['High', 'Intent with plan, recent serious or lethal attempt, preparatory acts; acute psychosis with command hallucinations; severe agitation', 'Do not leave alone; remove means; emergency psychiatric evaluation; admission usually indicated'],
            ['Moderate', 'Ideation with method or plan but no intent or behavior; multiple risk factors, few protective factors', 'Individualize: intensive outpatient vs admission; safety plan, means counseling, close follow-up within days'],
            ['Low', 'Thoughts of death or passive ideation, no plan, intent or behavior; modifiable risk factors; strong protective factors', 'Outpatient care, safety plan, treat drivers, scheduled follow-up'],
          ],
        },
        {
          type: 'links',
          items: [{ label: 'Practice: Suicide risk formulation tool', to: '/tools/suicide-risk', note: 'Builds the formulation and a documentation summary from your inputs.' }],
        },
      ],
      refs: ['nice-ng225', 'large-2016', 'pisani-2016', 'safe-t'],
      check: [
        {
          id: 'su-form-1',
          q: 'Per NICE 2022, what is the appropriate role of suicide risk scales?',
          options: [
            'Determine who can be discharged',
            'Predict who will die by suicide',
            'None for prediction or allocation of care; use a needs-based psychosocial assessment',
            'Replace clinical interview in busy EDs',
          ],
          answer: 2,
          why: 'Risk scales have poor predictive value; NICE advises against using them to predict suicide or to decide on treatment or discharge.',
        },
      ],
    },
    {
      id: 'interventions',
      title: 'Interventions with evidence',
      lead: 'Safety planning, means counseling and follow-up contact are brief, cheap, and reduce suicidal behavior.',
      blocks: [
        {
          type: 'steps',
          title: 'Safety Planning Intervention (Stanley–Brown): build it with the patient',
          items: [
            { title: '1. Warning signs', text: 'Personal thoughts, moods, situations that precede a crisis.' },
            { title: '2. Internal coping', text: 'Things I can do alone to take my mind off problems.' },
            { title: '3. People and places for distraction', text: 'Social contacts and settings that help.' },
            { title: '4. People I can ask for help', text: 'Named family or friends with phone numbers.' },
            { title: '5. Professionals and crisis lines', text: 'Clinician, after-hours line, **988 Suicide & Crisis Lifeline** (call/text 988 in the US), local emergency number.' },
            { title: '6. Making the environment safe', text: 'Specific steps to limit access to lethal means.' },
          ],
        },
        {
          type: 'p',
          text: 'In a VA ED cohort, the Safety Planning Intervention plus structured follow-up calls was associated with **~45% fewer suicidal behaviors** over 6 months versus usual care (Stanley 2018).',
        },
        {
          type: 'callout',
          tone: 'pitfall',
          title: 'Retire the "no-suicide contract"',
          text: 'Contracts for safety have no evidence of preventing suicide, may give false reassurance, and can damage trust. Replace them with a written, collaborative safety plan.',
        },
        {
          type: 'list',
          title: 'Lethal means counseling',
          items: [
            'Crises are often brief and method substitution is incomplete, so restricting access saves lives.',
            '**Firearms**: temporary off-site storage with a trusted person, gun shop or law enforcement; otherwise locked, unloaded, ammunition stored separately. Many states have extreme risk protection orders.',
            '**Medications**: dispense limited quantities, lock them up, dispose of old supplies; avoid TCAs in high-risk patients.',
            'Agree on specifics, including who will do it and by when, and confirm at follow-up.',
          ],
        },
        {
          type: 'table',
          caption: 'Other evidence-based options',
          head: ['Intervention', 'Evidence'],
          rows: [
            ['Caring contacts (letters, texts after a crisis)', 'Reduced suicides in the classic RCT (Motto 2001); cheap and scalable'],
            ['Brief CBT for suicide prevention', '~60% fewer attempts in a military RCT (Rudd 2015)'],
            ['DBT', 'Reduces self-harm, especially with borderline personality disorder'],
            ['CAMS, ASSIP', 'Suicide-specific frameworks with supportive trials'],
            ['Lithium', 'Anti-suicide effect in mood disorders in meta-analyses; a VA RCT (Katz 2022) added to usual care did not reduce repeat events, so treat the underlying illness'],
            ['Clozapine', 'Reduced suicidal behavior in schizophrenia/schizoaffective disorder (InterSePT); FDA-approved for this'],
            ['Esketamine / ketamine', 'Rapid short-term reduction in suicidal ideation; esketamine approved for MDD with acute suicidal ideation/behavior; not shown to prevent suicide deaths'],
          ],
        },
      ],
      refs: ['stanley-2018', 'mann-2021', 'motto-2001', 'rudd-2015', 'katz-2022', 'intersept-2003', 'lifeline-988'],
      check: [
        {
          id: 'su-int-2',
          q: 'Which intervention is NOT evidence-based for suicide prevention?',
          options: ['Safety Planning Intervention with follow-up calls', 'No-suicide contract', 'Lethal means counseling', 'Caring contacts'],
          answer: 1,
          why: 'No-suicide contracts lack evidence and can provide false reassurance.',
        },
      ],
    },
    {
      id: 'disposition',
      title: 'Disposition and level of care',
      lead: 'Choose the least restrictive setting that keeps the person safe, and write down why.',
      blocks: [
        {
          type: 'table',
          head: ['Consider inpatient when', 'Outpatient can be appropriate when'],
          rows: [
            ['Intent with a plan, or a recent high-lethality attempt with ongoing intent', 'Ideation without intent, plan or recent behavior'],
            ['Psychosis with command hallucinations, severe agitation, or impaired judgment', 'Can engage meaningfully in a safety plan'],
            ['Cannot engage in safety planning or means restriction', 'Means can be secured, with a named person'],
            ['No safe environment or support; intoxication with unresolved intent', 'Follow-up within days is arranged; support available'],
          ],
        },
        {
          type: 'list',
          items: [
            '**"When in doubt, hospitalize" is not evidence-based.** Admission can be lifesaving, but it also carries risks (the post-discharge period, loss of work or custody, trauma). Weigh both sides and document.',
            '**Intoxicated patients**: reassess when clinically sober; ideation may persist or resolve.',
            '**Involuntary holds**: criteria are set by state law (danger to self or others, or grave disability due to mental illness). Involuntary admission does not equal consent to medication.',
            '**Transitions**: follow-up within 7 days of discharge (ideally 24–72 h), caring contacts, and a safety plan in hand.',
            '**Document**: risk and protective factors, ideation and behavior, the formulation, the rationale for disposition, means counseling and who was contacted.',
          ],
        },
      ],
      refs: ['nice-ng225', 'chung-2017', 'safe-t'],
      check: [
        {
          id: 'su-disp-1',
          q: 'An intoxicated man in the ED said he wanted to die; now sober, he denies ideation and has a supportive partner who has removed his firearms. Best approach?',
          options: [
            'Discharge immediately without further assessment',
            'Full reassessment when sober, collaborative safety plan, means confirmation, alcohol intervention, and early follow-up',
            'Mandatory 72-hour hold because he said it while drunk',
            'No-suicide contract and discharge',
          ],
          answer: 1,
          why: 'Reassess when sober; with no ongoing intent and means secured, outpatient care with a safety plan and close follow-up is reasonable. Treat the alcohol use too.',
        },
      ],
    },
  ],
  takeaways: [
    'Ask directly: it does not increase risk and is the only way to know.',
    'Intent, plan, preparatory behavior and recent attempts drive acute concern more than any checklist.',
    'Formulate (status, state, resources, foreseeable changes); don\'t use scores to predict or to deny care.',
    'Every at-risk patient leaves with a written safety plan, a means-restriction plan, and follow-up within days.',
    'No-suicide contracts and "when in doubt, admit" are reflexes, not evidence.',
    'The weeks after discharge are the most dangerous: bridge the transition.',
  ],
  flashcards: [
    { id: 'fc-su-1', front: 'Does asking about suicide increase suicidal ideation?', back: 'No. Studies consistently show no increase; it may reduce distress.' },
    { id: 'fc-su-2', front: 'Strongest single risk factor for suicide', back: 'A prior suicide attempt or self-harm.' },
    { id: 'fc-su-3', front: 'Highest-risk period after psychiatric hospitalization', back: 'First week, and the first 3 months after discharge.' },
    { id: 'fc-su-4', front: 'Most common method of suicide death in the US', back: 'Firearms (over half of deaths).' },
    { id: 'fc-su-5', front: 'Six steps of the Stanley–Brown Safety Plan', back: 'Warning signs → internal coping → people/places for distraction → people to ask for help → professionals/crisis lines (988) → making the environment safe.' },
    { id: 'fc-su-6', front: 'Why replace no-suicide contracts?', back: 'No evidence they prevent suicide; may give false reassurance. Use a collaborative safety plan.' },
    { id: 'fc-su-7', front: 'NICE 2022 position on risk scales', back: 'Do not use them to predict suicide/self-harm or to decide who receives treatment or discharge.' },
    { id: 'fc-su-8', front: 'Four elements of a prevention-oriented risk formulation', back: 'Risk status, risk state, available resources, foreseeable changes.' },
    { id: 'fc-su-9', front: 'Two medications with anti-suicide evidence', back: 'Lithium (mood disorders) and clozapine (schizophrenia/schizoaffective; FDA-approved indication).' },
    { id: 'fc-su-10', front: 'PHQ-9 item 9 positive: next step?', back: 'Direct suicide inquiry and assessment. Item 9 alone has a high false-positive rate.' },
    { id: 'fc-su-11', front: 'Joint Commission NPSG 15.01.01 screening age', back: 'Validated screening for patients ≥12 being evaluated/treated for behavioral health conditions.' },
    { id: 'fc-su-12', front: 'Follow-up timing after psychiatric discharge', back: 'Within 7 days (ideally 24–72 hours).' },
    { id: 'fc-su-13', front: 'Crisis line in the US', back: '988 Suicide & Crisis Lifeline: call, text, or chat 988.' },
  ],
}
