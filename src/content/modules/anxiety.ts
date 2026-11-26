import type { Module } from '../types'

export const anxiety: Module = {
  id: 'anxiety',
  title: 'Anxiety Disorders',
  short: 'Anxiety',
  path: '/learn/anxiety',
  icon: 'Wind',
  color: 'from-violet-500 to-fuchsia-500',
  summary: 'GAD, panic, agoraphobia, social anxiety and phobias: tell them apart, rule out mimics, and deliver the treatments that work (exposure-based CBT and SSRIs/SNRIs).',
  minutes: 30,
  objectives: [
    'Differentiate the anxiety disorders by the object of fear and duration.',
    'Distinguish panic attacks (a specifier) from panic disorder.',
    'Rule out medical and substance causes efficiently.',
    'Apply stepped care: CBT with exposure and SSRIs/SNRIs first; benzodiazepines rarely and briefly.',
  ],
  sections: [
    {
      id: 'map',
      title: 'The map: what is the person afraid of?',
      lead: 'The feared object, not the intensity of anxiety, defines the disorder.',
      blocks: [
        {
          type: 'table',
          head: ['Disorder', 'Core fear / feature', 'Duration', 'Distinguishing point'],
          rows: [
            ['Generalized anxiety disorder', 'Excessive, hard-to-control worry about many everyday matters + ≥3 of 6: restlessness, fatigue, poor concentration, irritability, muscle tension, sleep disturbance (1 in children)', '≥6 months, more days than not', 'Worry is multi-topic and future-oriented; no discrete attacks needed'],
            ['Panic disorder', 'Recurrent **unexpected** panic attacks + ≥1 month of worry about attacks or maladaptive behavior change', '≥1 month after an attack', 'Fear of the attacks themselves'],
            ['Agoraphobia', 'Fear/avoidance of ≥2 of: public transport, open spaces, enclosed places, lines/crowds, being outside home alone, because escape or help may be hard', '≥6 months', 'Diagnosed independently of panic disorder since DSM-5'],
            ['Social anxiety disorder', 'Fear of scrutiny and negative evaluation in social or performance situations', '≥6 months', '"Performance only" specifier (e.g., public speaking)'],
            ['Specific phobia', 'Fear of a specific object/situation (animal, natural environment, blood-injection-injury, situational)', '≥6 months', 'Blood-injection-injury type can cause vasovagal fainting'],
            ['Separation anxiety disorder', 'Excessive fear of separation from attachment figures', '≥4 weeks (children), ≥6 months (adults)', 'Can begin in adulthood'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Where did OCD and PTSD go?',
          text: 'Since DSM-5, OCD has its own chapter (obsessive-compulsive and related disorders) and PTSD sits under trauma- and stressor-related disorders. See [Trauma & OCD](/learn/trauma-ocd).',
        },
        {
          type: 'sort',
          prompt: 'Which disorder fits best?',
          categories: ['GAD', 'Panic disorder', 'Social anxiety', 'Specific phobia', 'Agoraphobia'],
          items: [
            { text: 'Worries for a year about finances, kids\' grades, and her health; cannot switch off; tense and sleeping poorly', cat: 0, why: 'Multi-topic uncontrollable worry ≥6 months with somatic symptoms.' },
            { text: 'Sudden surges of terror "out of the blue"; now avoids coffee and checks his pulse constantly', cat: 1, why: 'Unexpected attacks plus ≥1 month of worry and behavior change.' },
            { text: 'Avoids eating in front of colleagues for fear they will see her hands shake', cat: 2, why: 'Fear of scrutiny and negative evaluation.' },
            { text: 'Faints when blood is drawn; has avoided checkups for years', cat: 3, why: 'Blood-injection-injury phobia (vasovagal response).' },
            { text: 'Will not take buses or go to malls alone because escape might be difficult', cat: 4, why: '≥2 agoraphobic situations feared because escape/help may be unavailable.' },
          ],
        },
      ],
      refs: ['dsm5tr'],
      check: [
        {
          id: 'anx-map-1',
          q: 'A man avoids buses, supermarkets and crowds because he fears he could not get out or get help. He has never had a panic attack. Diagnosis?',
          options: ['Panic disorder with agoraphobia', 'Agoraphobia', 'Specific phobia, situational type', 'Social anxiety disorder'],
          answer: 1,
          why: 'Agoraphobia is diagnosed independently of panic disorder and needs ≥2 situation types; specific phobia involves one circumscribed situation.',
        },
      ],
    },
    {
      id: 'panic',
      title: 'Panic attacks vs panic disorder',
      lead: 'Panic attacks occur across many disorders; panic disorder needs unexpected attacks plus persistent fear of them.',
      blocks: [
        {
          type: 'criteria',
          title: 'Panic attack',
          rule: 'Abrupt surge of intense fear or discomfort peaking within minutes, with ≥4 of 13:',
          items: [
            'Palpitations / tachycardia', 'Sweating', 'Trembling', 'Shortness of breath / smothering', 'Choking sensation', 'Chest pain or discomfort', 'Nausea / abdominal distress', 'Dizziness / faintness', 'Chills or heat sensations', 'Paresthesias', 'Derealization / depersonalization', 'Fear of losing control or "going crazy"', 'Fear of dying',
          ],
          note: '<4 symptoms = limited-symptom attack. "With panic attacks" can be added as a specifier to any disorder (e.g., PTSD with panic attacks).',
        },
        {
          type: 'compare',
          left: { title: 'Expected (cued) attacks', items: ['Triggered by a known cue: spider, speech, trauma reminder', 'Point to phobia, social anxiety, PTSD', 'Alone, do not establish panic disorder'] },
          right: { title: 'Unexpected attacks', items: ['No obvious trigger, can wake from sleep', 'Required (recurrently) for panic disorder', 'Plus ≥1 month of worry or avoidance'] },
        },
        {
          type: 'p',
          text: '**Interoceptive exposure** is the panic-specific ingredient of CBT: deliberately provoking feared body sensations (hyperventilating, spinning in a chair, breathing through a straw, running in place) until the patient learns the sensations are safe.',
        },
      ],
      refs: ['dsm5tr', 'nice-cg113'],
      check: [
        {
          id: 'anx-panic-1',
          q: 'A woman with PTSD has panic attacks only when she hears fireworks. What is the correct diagnosis?',
          options: ['Panic disorder', 'PTSD with panic attacks', 'Agoraphobia', 'GAD'],
          answer: 1,
          why: 'Expected (cued) attacks are coded as a specifier on the primary disorder; panic disorder requires unexpected attacks.',
        },
      ],
    },
    {
      id: 'mimics',
      title: 'Rule out what mimics anxiety',
      lead: 'Targeted, not exhaustive: let history and exam choose the tests.',
      blocks: [
        {
          type: 'table',
          head: ['Mimic', 'Clues', 'Test'],
          rows: [
            ['Hyperthyroidism', 'Weight loss, heat intolerance, tremor, tachycardia at rest', 'TSH'],
            ['Arrhythmia (SVT, AF)', 'Abrupt onset/offset palpitations, syncope', 'ECG; ambulatory monitor'],
            ['Asthma/COPD, PE', 'Dyspnea with exertion, wheeze, hypoxia, risk factors', 'Exam, SpO2, D-dimer/CT per risk'],
            ['Hypoglycemia', 'Diabetes on insulin/sulfonylurea; relief with food', 'Glucose during an episode'],
            ['Substances', 'Caffeine, nicotine, stimulants (including ADHD meds), decongestants, cannabis; alcohol or benzodiazepine withdrawal', 'History, urine toxicology'],
            ['Medications', 'Corticosteroids, thyroid hormone excess, beta-agonists, SSRI/SNRI start-up jitteriness', 'Medication review'],
            ['Pheochromocytoma (rare)', 'Paroxysmal **hypertension**, headache, sweating, palpitations', 'Plasma free metanephrines only when suggestive'],
          ],
        },
        {
          type: 'callout',
          tone: 'pearl',
          title: 'Red flags for an organic cause',
          items: ['Onset after age ~45 with no prior history', 'Abnormal vital signs at rest', 'Syncope, focal neurologic signs, exertional chest pain', 'Poor response to adequate standard treatment'],
        },
      ],
      refs: ['nice-cg113'],
    },
    {
      id: 'treatment',
      title: 'Treatment that works',
      lead: 'CBT with exposure and SSRIs/SNRIs are both first-line; CBT gains last longer after stopping.',
      blocks: [
        {
          type: 'steps',
          title: 'Stepped care (NICE)',
          items: [
            { title: 'Step 1', text: 'Identify, educate, actively monitor. Reduce caffeine/alcohol; address sleep.' },
            { title: 'Step 2', text: 'Low-intensity: guided self-help or digital CBT, psychoeducational groups.' },
            { title: 'Step 3', text: 'High-intensity CBT (individual) **or** an SSRI/SNRI, per preference and severity.' },
            { title: 'Step 4', text: 'Combination, specialist care for complex, refractory, or high-risk cases.' },
          ],
        },
        {
          type: 'table',
          caption: 'Medication options (✔ = FDA-approved for that indication; all SSRIs/SNRIs are used across disorders)',
          head: ['Drug', 'GAD', 'Panic', 'Social anxiety', 'Notes'],
          rows: [
            ['Escitalopram', '✔', '', '', 'Well tolerated; common first choice'],
            ['Sertraline', '', '✔', '✔', 'Broad evidence; also used first-line for GAD'],
            ['Paroxetine', '✔', '✔', '✔', 'Effective; more weight gain, anticholinergic effects and discontinuation symptoms'],
            ['Fluoxetine', '', '✔', '', 'Long half-life; can be activating early'],
            ['Venlafaxine XR', '✔', '✔', '✔', 'Watch blood pressure at higher doses; taper carefully'],
            ['Duloxetine', '✔', '', '', 'Useful with comorbid pain'],
            ['Fluvoxamine CR', '', '', '✔', 'CYP1A2/2C19 inhibitor: interactions'],
            ['Buspirone', '✔', '', '', 'GAD only; 2–4 weeks to work; no dependence; ineffective for panic'],
            ['Pregabalin', 'Not US-approved', '', '', 'First-line for GAD in Europe/Canada; misuse potential; respiratory depression with opioids'],
            ['Propranolol', '', '', 'Performance only', 'PRN for performance anxiety; not for generalized social anxiety'],
          ],
        },
        {
          type: 'list',
          title: 'Using SSRIs/SNRIs well in anxiety',
          items: [
            '**Start low** (often half the depression starting dose, especially in panic) to avoid early jitteriness, then titrate to an effective dose.',
            'Expect onset in 2–4 weeks and full effect at 8–12 weeks.',
            'After response, continue **6–12 months**, then taper slowly; relapse is common after early discontinuation.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Benzodiazepines: effective fast, rarely the right long-term answer',
          items: [
            'Risks: tolerance, physical dependence, withdrawal seizures, falls and fractures, cognitive impairment, motor vehicle crashes, and fatal respiratory depression with opioids or alcohol (FDA boxed warnings).',
            'Avoid in substance use disorders, older adults, PTSD, and with opioids.',
            'If used: a short bridge (≈2–4 weeks) while an SSRI takes effect, then taper.',
            'They do not treat comorbid depression, and their effect on exposure learning is debated; avoid them as safety behaviors.',
          ],
        },
      ],
      refs: ['nice-cg113', 'nice-cg159', 'canmat-anx-2014', 'bandelow-2015', 'fda-benzo-2020'],
      check: [
        {
          id: 'anx-tx-1',
          q: 'A patient with panic disorder asks for buspirone because "it isn\'t addictive". Best response?',
          options: [
            'Prescribe buspirone; it is first-line for panic',
            'Buspirone is not effective for panic disorder; offer CBT and/or an SSRI',
            'Prescribe alprazolam long-term instead',
            'Prescribe propranolol daily',
          ],
          answer: 1,
          why: 'Buspirone helps GAD but not panic disorder. CBT with interoceptive exposure and SSRIs/SNRIs are first-line.',
        },
      ],
    },
    {
      id: 'exposure',
      title: 'Exposure: the active ingredient',
      lead: 'Avoidance maintains anxiety; repeated, planned approach dismantles it.',
      blocks: [
        {
          type: 'steps',
          title: 'Running exposure (inhibitory learning model)',
          items: [
            { title: 'Explain the model', text: 'Avoidance and safety behaviors feel protective but prevent learning that the feared outcome does not happen or can be tolerated.' },
            { title: 'Build a hierarchy', text: 'List feared situations and rate them 0–100. Start where the person can engage, not necessarily at the bottom.' },
            { title: 'Target expectancy violation', text: 'Before each exposure, ask "What do you predict will happen?" Afterwards, compare with what happened. Learning comes from surprise, not just habituation.' },
            { title: 'Drop safety behaviors', text: 'Reassurance-seeking, carrying pills "just in case", checking pulse, having a companion. These undermine learning.' },
            { title: 'Vary and repeat', text: 'Different contexts, times, and intensities generalize learning and reduce relapse.' },
          ],
        },
        {
          type: 'reveal',
          prompt: 'A patient with panic disorder only goes to the supermarket while holding a lorazepam tablet in her pocket. Why does that matter for exposure therapy?',
          answer: 'The pill is a **safety behavior**: she attributes "nothing bad happened" to the pill, not to the situation being safe. Fading safety behaviors is part of exposure; otherwise fear returns when the pill is not available.',
        },
        {
          type: 'p',
          text: '**Specific phobia** responds to exposure alone, often in a single prolonged session (one-session treatment). Medications are not first-line.',
        },
      ],
      refs: ['craske-2014', 'nice-cg159'],
    },
  ],
  takeaways: [
    'Name the feared object: worry (GAD), the attacks themselves (panic), scrutiny (social), a specific stimulus (phobia), inescapable situations (agoraphobia).',
    'Panic attacks are a specifier; panic disorder needs unexpected attacks plus ≥1 month of worry or avoidance.',
    'Rule out thyroid, cardiac, respiratory, glucose, substances and medications, guided by the history.',
    'CBT with exposure and SSRIs/SNRIs are first-line; start SSRIs low in panic, then reach an effective dose.',
    'Buspirone works for GAD only; propranolol for performance anxiety only.',
    'Benzodiazepines: short bridges at most; avoid with opioids, substance use, older age, and PTSD.',
  ],
  flashcards: [
    { id: 'fc-anx-1', front: 'GAD criteria (duration and symptoms)', back: '≥6 months of excessive, hard-to-control worry, more days than not, with ≥3 of 6: restlessness, fatigue, poor concentration, irritability, muscle tension, sleep disturbance.' },
    { id: 'fc-anx-2', front: 'Panic disorder criteria', back: 'Recurrent unexpected panic attacks + ≥1 month of persistent worry about attacks or maladaptive behavior change.' },
    { id: 'fc-anx-3', front: 'Panic attack: how many symptoms, and how fast?', back: '≥4 of 13 symptoms, peaking within minutes.' },
    { id: 'fc-anx-4', front: 'Agoraphobia requires fear of how many situation types?', back: '≥2 of 5: public transport, open spaces, enclosed places, lines/crowds, outside the home alone. ≥6 months.' },
    { id: 'fc-anx-5', front: 'Buspirone: indication and limits', back: 'GAD only; takes 2–4 weeks; no dependence; ineffective for panic and social anxiety.' },
    { id: 'fc-anx-6', front: 'Propranolol in social anxiety', back: 'PRN for performance-only anxiety (e.g., public speaking); not effective for generalized social anxiety disorder.' },
    { id: 'fc-anx-7', front: 'Why start SSRIs at a low dose in panic disorder?', back: 'Early activation/jitteriness can mimic panic and cause dropout; start low, then titrate to an effective dose.' },
    { id: 'fc-anx-8', front: 'How long to continue an SSRI after an anxiety disorder responds', back: '6–12 months, then taper slowly.' },
    { id: 'fc-anx-9', front: 'Interoceptive exposure', back: 'Deliberately inducing feared bodily sensations (hyperventilation, spinning, straw breathing) to extinguish fear of them: the panic-specific CBT ingredient.' },
    { id: 'fc-anx-10', front: 'Safety behavior (exposure therapy)', back: 'An action that prevents disconfirmation of the feared outcome (carrying pills, reassurance-seeking); fade these during exposure.' },
    { id: 'fc-anx-11', front: 'First-line for specific phobia', back: 'Exposure therapy, often a single prolonged session; medication not first-line.' },
    { id: 'fc-anx-12', front: 'Pregabalin in GAD', back: 'First-line in Europe/Canada, not FDA-approved for GAD; misuse potential and respiratory depression with opioids.' },
    { id: 'fc-anx-13', front: 'Blood-injection-injury phobia: unique physiology', back: 'Biphasic vasovagal response → fainting. Applied tension technique helps.' },
  ],
}
