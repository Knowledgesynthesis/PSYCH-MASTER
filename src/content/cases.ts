import type { ClinicalCase } from './types'

export const cases: ClinicalCase[] = [
  {
    id: 'case-ed-overdose',
    title: 'The overdose at 2 a.m.',
    module: 'suicide',
    setting: 'Emergency department',
    difficulty: 'core',
    summary: 'A man presents after an intentional overdose. Medical safety first, then a suicide assessment that leads to a defensible disposition.',
    steps: [
      {
        id: 's1',
        narrative: 'A 45-year-old man is brought in by his sister after taking "a handful" of acetaminophen tablets about 6 hours ago following an argument. He is alert and says he "just wanted to sleep".',
        data: [{ label: 'Vitals', value: 'HR 96, BP 128/80, RR 16, SpO₂ 98%' }, { label: 'Exam', value: 'Alert, tearful, no focal signs' }],
        question: 'What comes first?',
        choices: [
          { text: 'Full psychiatric interview before anything else', score: 0, feedback: 'Acetaminophen toxicity is silent early and lethal. Medical stabilization comes first: the psychiatric assessment can follow in parallel.' },
          { text: 'Acetaminophen (4-hour or later) level, LFTs, coagulation; start N-acetylcysteine per nomogram/toxicology; continuous observation', score: 2, feedback: 'Correct. Treat the overdose as dangerous until proven otherwise, and keep him under observation because he made a suicide attempt.' },
          { text: 'Reassure him; acetaminophen is safe because he looks well', score: 0, feedback: 'Patients with significant acetaminophen overdoses often look well for the first 24 hours.' },
        ],
      },
      {
        id: 's2',
        narrative: 'NAC is running. He now says he has been thinking about suicide for weeks since losing his job, and that "next time I\'d use something that works". He has a handgun at home.',
        question: 'Which detail most increases your acute concern?',
        choices: [
          { text: 'He lost his job', score: 1, feedback: 'A meaningful stressor, but the stated future intent and firearm access are more urgent.' },
          { text: 'Stated intent to use a more lethal method, with access to a firearm', score: 2, feedback: 'Yes. Ongoing intent plus access to a highly lethal method is the strongest acute signal here.' },
          { text: 'He is male', score: 0, feedback: 'A static population-level factor; it does not tell you about his current state.' },
        ],
      },
      {
        id: 's3',
        narrative: 'His sister is supportive and willing to help. He asks to go home in the morning and promises he "won\'t do anything".',
        question: 'What is the best way to handle his request and promise?',
        choices: [
          { text: 'Have him sign a no-suicide contract and plan discharge', score: 0, feedback: 'Contracts have no protective evidence and can give false reassurance.' },
          { text: 'Explain that ongoing intent with firearm access makes inpatient care necessary now; collaborate on the plan; use an involuntary hold only if he meets criteria and refuses', score: 2, feedback: 'Right. Be transparent and collaborative; least restrictive does not mean ignoring high acute risk.' },
          { text: 'Discharge with the 988 number since he is calm', score: 0, feedback: 'Calm demeanor after an attempt does not resolve intent. Crisis lines complement but do not replace care here.' },
        ],
      },
      {
        id: 's4',
        narrative: 'He agrees to voluntary admission. On day 6 he is improving and discharge is planned.',
        question: 'Which discharge plan best reduces risk?',
        choices: [
          { text: 'Follow-up in 6 weeks with the outpatient psychiatrist', score: 0, feedback: 'The first week after discharge is the highest-risk period: 6 weeks is far too long.' },
          { text: 'Written safety plan, confirmed firearm off-site storage with his sister, follow-up within 72 hours, caring contacts, limited medication supply', score: 2, feedback: 'Excellent: safety planning, means restriction, rapid follow-up and caring contacts all have supporting evidence.' },
          { text: 'Prescribe a 3-month supply of a TCA for convenience', score: 0, feedback: 'TCAs are lethal in overdose; dispense limited supplies of safer agents.' },
        ],
      },
    ],
    debrief: [
      'Medical stabilization of an overdose comes before (and alongside) the psychiatric assessment.',
      'Ongoing intent and access to lethal means drive acute risk more than static demographics.',
      'Replace no-suicide contracts with a written safety plan and lethal-means counseling.',
      'Bridge the post-discharge window: follow-up within days, caring contacts, small medication supplies.',
    ],
    refs: ['stanley-2018', 'chung-2017', 'nice-ng225'],
  },
  {
    id: 'case-fep',
    title: 'Voices in the dorm',
    module: 'psychosis',
    setting: 'Outpatient / early psychosis clinic',
    difficulty: 'core',
    summary: 'A college student with three months of psychotic symptoms and daily high-potency cannabis use.',
    steps: [
      {
        id: 's1',
        narrative: 'A 19-year-old student has heard voices commenting on him for 3 months and believes classmates are filming him. Grades have collapsed. He smokes high-potency cannabis daily. No mood episodes.',
        question: 'What is the working diagnosis?',
        choices: [
          { text: 'Schizophrenia', score: 0, feedback: 'Requires ≥6 months of continuous signs.' },
          { text: 'Schizophreniform disorder (provisional), with cannabis use to address; rule out substance-induced psychosis', score: 2, feedback: '1 to <6 months fits schizophreniform. Persistence beyond ~1 month of abstinence would argue against a purely substance-induced disorder.' },
          { text: 'Brief psychotic disorder', score: 0, feedback: 'Requires <1 month with full return to baseline.' },
        ],
      },
      {
        id: 's2',
        narrative: 'Neurologic exam is normal; vital signs are stable; no seizures or confusion.',
        question: 'Which workup is appropriate?',
        choices: [
          { text: 'No tests needed; start medication', score: 0, feedback: 'A first episode deserves a focused workup once.' },
          { text: 'CBC, CMP, TSH, glucose/HbA1c, lipids, urine toxicology, HIV, syphilis, baseline ECG; MRI/EEG/LP only if red flags', score: 2, feedback: 'A targeted baseline workup that also prepares for antipsychotic monitoring.' },
          { text: 'Whole-body PET scan and genetic panel', score: 0, feedback: 'Not indicated; low yield and costly.' },
        ],
      },
      {
        id: 's3',
        narrative: 'He is worried about weight gain because he plays soccer. He agrees to try medication.',
        question: 'Which antipsychotic choice best fits his priorities?',
        choices: [
          { text: 'Olanzapine 20 mg', score: 0, feedback: 'Effective, but the most weight gain and metabolic harm, and a high starting dose for a first episode.' },
          { text: 'Low-dose aripiprazole (or another weight-sparing agent), titrated slowly', score: 2, feedback: 'A lower-metabolic-risk agent at a first-episode dose respects his priority; monitor for akathisia.' },
          { text: 'Clozapine', score: 0, feedback: 'Reserved for treatment resistance.' },
        ],
      },
      {
        id: 's4',
        narrative: 'On day 6 he is pacing, cannot sit through class, and says he feels "like I\'m crawling out of my skin". The voices are a little quieter.',
        question: 'What is happening, and what do you do?',
        choices: [
          { text: 'Worsening psychosis: increase the dose', score: 0, feedback: 'This is akathisia. Increasing the dose worsens it and raises suicide and dropout risk.' },
          { text: 'Akathisia: lower the dose and add propranolol (or mirtazapine 15 mg)', score: 2, feedback: 'Correct recognition and management. Ask about suicidal thoughts too: akathisia is distressing.' },
          { text: 'Add benztropine', score: 1, feedback: 'Anticholinergics help akathisia little; propranolol or dose reduction are better.' },
        ],
      },
      {
        id: 's5',
        narrative: 'Six weeks later his symptoms have largely resolved. He wants to finish the semester.',
        question: 'Which longer-term plan is best supported?',
        choices: [
          { text: 'Stop medication now that he is better', score: 0, feedback: 'Relapse risk is high; after a first episode, continue for at least 1–2 years with shared decisions.' },
          { text: 'Coordinated specialty care: CBTp, family psychoeducation, supported education, cannabis intervention, metabolic monitoring, discuss an LAI', score: 2, feedback: 'CSC improves outcomes, especially with short untreated duration. Offering an LAI early is reasonable.' },
          { text: 'Medication only, review in 6 months', score: 0, feedback: 'Misses the psychosocial components that change trajectories.' },
        ],
      },
    ],
    debrief: [
      'Duration defines the diagnosis: 1 to <6 months = schizophreniform.',
      'Do a focused first-episode workup once; look for red flags of organic causes.',
      'Match the antipsychotic to the patient\'s priorities and start low in first episodes.',
      'Akathisia is often mistaken for agitation; never respond by raising the dose.',
      'Coordinated specialty care and cannabis reduction change long-term outcomes.',
    ],
    refs: ['raise-2016', 'apa-scz-2020', 'diforti-2019'],
  },
  {
    id: 'case-switch',
    title: 'The antidepressant that lit the fuse',
    module: 'mood',
    setting: 'Primary care → psychiatry',
    difficulty: 'core',
    summary: 'A young woman starts an SSRI for depression and develops something else.',
    steps: [
      {
        id: 's1',
        narrative: 'A 26-year-old woman with 6 weeks of depression was started on sertraline 50 mg by her primary care physician. Ten days later her partner calls: she is sleeping 2 hours a night, talking fast, spent $8,000 online and is irritable.',
        question: 'What is the most likely explanation?',
        choices: [
          { text: 'Normal recovery from depression', score: 0, feedback: 'Recovery does not include decreased need for sleep, pressured speech and reckless spending.' },
          { text: 'Antidepressant-emergent manic/hypomanic episode suggesting bipolar disorder', score: 2, feedback: 'A full syndrome persisting beyond the drug\'s physiological effect counts toward a bipolar diagnosis.' },
          { text: 'Sertraline side effect: insomnia only', score: 0, feedback: 'The full syndrome is more than insomnia.' },
        ],
      },
      {
        id: 's2',
        narrative: 'She is not psychotic and has not been hospitalized, but she has been suspended from work for erratic behavior.',
        question: 'What should happen with the sertraline, and what do you start?',
        choices: [
          { text: 'Continue sertraline and add lorazepam for sleep', score: 0, feedback: 'The antidepressant should be stopped in a manic episode.' },
          { text: 'Stop sertraline; start an antimanic agent (e.g., quetiapine, aripiprazole, risperidone, or lithium)', score: 2, feedback: 'Correct: stop the trigger and treat mania. Marked impairment makes this a manic episode.' },
          { text: 'Switch to bupropion', score: 0, feedback: 'Still an antidepressant during mania.' },
        ],
      },
      {
        id: 's3',
        narrative: 'She responds. She has a history of a past suicide attempt, normal kidneys and thyroid, and is sexually active without contraception.',
        question: 'Which maintenance plan fits best?',
        choices: [
          { text: 'Valproate', score: 0, feedback: 'Avoid in anyone who could become pregnant unless no alternative exists and contraception is assured: high teratogenic risk.' },
          { text: 'Lithium (or quetiapine), with contraception counseling, monitoring plan, psychoeducation and sleep regularity', score: 2, feedback: 'Lithium prevents both poles and reduces suicide; counsel on pregnancy planning and monitoring.' },
          { text: 'Restart sertraline once she is calm', score: 0, feedback: 'Antidepressant monotherapy is contraindicated in bipolar I disorder.' },
        ],
      },
    ],
    debrief: [
      'Screen for bipolarity before every antidepressant: ask about decreased need for sleep with high energy.',
      'Antidepressant-emergent full mania counts toward bipolar diagnosis.',
      'Stop the antidepressant and treat mania; avoid valproate in people who could become pregnant.',
    ],
    refs: ['dsm5tr', 'canmat-bd-2018', 'isbd-ad-2013'],
  },
  {
    id: 'case-awd',
    title: 'Day 2 on the orthopedic ward',
    module: 'substance',
    setting: 'Inpatient medical/surgical',
    difficulty: 'core',
    summary: 'A post-operative patient becomes tremulous and confused: what is it, and how do you treat it?',
    steps: [
      {
        id: 's1',
        narrative: 'A 58-year-old man had a hip fracture repaired yesterday. Thirty-six hours after admission he is tremulous, sweaty and anxious, and says he sees bugs on the wall. He is oriented. His wife says he drinks a liter of vodka daily.',
        data: [{ label: 'Vitals', value: 'HR 118, BP 164/96, T 37.6 °C' }, { label: 'CIWA-Ar', value: '17' }],
        question: 'What is the most likely diagnosis?',
        choices: [
          { text: 'Delirium tremens', score: 1, feedback: 'He is oriented with a clear sensorium; DTs involve delirium, usually at 48–96 h.' },
          { text: 'Moderate alcohol withdrawal with alcoholic hallucinosis', score: 2, feedback: 'Hallucinations with a clear sensorium at 12–48 h plus autonomic signs.' },
          { text: 'Primary psychotic disorder', score: 0, feedback: 'Timing and autonomic signs point to withdrawal.' },
        ],
      },
      {
        id: 's2',
        question: 'Which management is best?',
        narrative: 'There is no significant liver disease. He can communicate reliably.',
        choices: [
          { text: 'Haloperidol for the hallucinations', score: 0, feedback: 'Antipsychotics do not treat withdrawal and lower the seizure threshold.' },
          { text: 'Symptom-triggered long-acting benzodiazepine (e.g., diazepam) guided by CIWA-Ar, plus thiamine, electrolytes and fluids', score: 2, feedback: 'Benzodiazepines prevent progression to seizures and DTs; thiamine and electrolyte repletion are essential.' },
          { text: 'Clonidine only', score: 0, feedback: 'Does not prevent seizures or DTs.' },
        ],
      },
      {
        id: 's3',
        narrative: 'At 60 hours he is disoriented, febrile (38.5 °C), HR 140, and pulling at lines despite high benzodiazepine doses.',
        question: 'Next step?',
        choices: [
          { text: 'Continue the same regimen and add restraints', score: 0, feedback: 'Resistant withdrawal needs escalation and ICU care; restraints alone risk injury and hyperthermia.' },
          { text: 'ICU transfer; escalate with phenobarbital (or propofol if intubated); search for complications (infection, Wernicke, electrolytes)', score: 2, feedback: 'Benzodiazepine-resistant DTs warrant ICU-level care and adjuncts such as phenobarbital.' },
          { text: 'Stop benzodiazepines', score: 0, feedback: 'He needs more GABAergic treatment, not less.' },
        ],
      },
    ],
    debrief: [
      'Ask every admitted patient about alcohol; predict withdrawal risk (PAWSS) and monitor (CIWA-Ar).',
      'Hallucinosis has a clear sensorium; DTs is delirium with autonomic instability at 48–96 h.',
      'Benzodiazepines (or phenobarbital) are the treatment; adjuncts do not prevent seizures or DTs.',
      'Thiamine for all at-risk patients; escalate resistant withdrawal to ICU.',
    ],
    refs: ['asam-aw-2020'],
  },
  {
    id: 'case-bup',
    title: 'After the overdose: starting buprenorphine',
    module: 'substance',
    setting: 'Emergency department',
    difficulty: 'advanced',
    summary: 'A patient revived with naloxone asks for help. Get him on MOUD safely in the fentanyl era.',
    steps: [
      {
        id: 's1',
        narrative: 'A 31-year-old man was revived with naloxone after fentanyl use 4 hours ago. He is now awake, uncomfortable, and says he wants to "get off this stuff".',
        data: [{ label: 'COWS', value: '6' }],
        question: 'What is the most important framing for the plan?',
        choices: [
          { text: 'Detox him over 5 days and then discharge', score: 0, feedback: 'Detox alone leaves him with lost tolerance and high overdose risk.' },
          { text: 'Start MOUD (buprenorphine) today if feasible and link to ongoing care; give naloxone', score: 2, feedback: 'ED-initiated buprenorphine with linkage improves engagement; MOUD is associated with large mortality reductions.' },
          { text: 'Refer him to a clinic next month', score: 0, feedback: 'The period after a non-fatal overdose is high risk; act now.' },
        ],
      },
      {
        id: 's2',
        narrative: 'He wants to start immediately. COWS is 6.',
        question: 'How do you start buprenorphine?',
        choices: [
          { text: 'Give 16 mg now regardless of COWS', score: 0, feedback: 'At low COWS soon after fentanyl, a large dose risks precipitated withdrawal.' },
          { text: 'Wait for COWS ≥8–12, or use a low-dose (micro) or high-dose initiation protocol as appropriate for fentanyl exposure', score: 2, feedback: 'These strategies reduce precipitated withdrawal risk with lipophilic fentanyl.' },
          { text: 'Start methadone 80 mg', score: 0, feedback: 'Far too high an initial methadone dose; methadone deaths cluster in early titration.' },
        ],
      },
      {
        id: 's3',
        narrative: 'Twenty minutes after 4 mg he develops vomiting, piloerection and severe agitation.',
        question: 'What now?',
        choices: [
          { text: 'Give additional buprenorphine plus antiemetics and symptomatic care', score: 2, feedback: 'More buprenorphine usually resolves precipitated withdrawal.' },
          { text: 'Give naloxone', score: 0, feedback: 'Worsens withdrawal.' },
          { text: 'Abandon buprenorphine permanently', score: 0, feedback: 'Most patients can continue successfully.' },
        ],
      },
      {
        id: 's4',
        narrative: 'He is comfortable on 24 mg/day.',
        question: 'Which discharge plan is best?',
        choices: [
          { text: 'Prescription bridge to a confirmed follow-up appointment, naloxone kit, harm-reduction counseling (fentanyl test strips, never use alone)', score: 2, feedback: 'Linkage, naloxone and harm reduction save lives. Any DEA Schedule III registrant can prescribe since 2023.' },
          { text: 'No prescription until he sees an addiction specialist', score: 0, feedback: 'Gaps lead to relapse and overdose.' },
          { text: 'Cap the dose at 16 mg because higher doses are not allowed', score: 0, feedback: 'FDA labeling (2024–2025) no longer implies a maximum; doses above 24 mg may be appropriate for some.' },
        ],
      },
    ],
    debrief: [
      'After a non-fatal overdose, start MOUD and give naloxone; detox alone is dangerous.',
      'In the fentanyl era, wait for more withdrawal or use low-dose or high-dose initiation.',
      'Treat precipitated withdrawal with more buprenorphine.',
      'Bridge prescriptions, confirmed follow-up and harm reduction close the gap.',
    ],
    refs: ['asam-oud-2020', 'larochelle-2018', 'fda-bup-2024', 'xwaiver-2023'],
  },
  {
    id: 'case-ss',
    title: 'The fever after the new painkiller',
    module: 'emergencies',
    setting: 'Urgent care → ED',
    difficulty: 'core',
    summary: 'A patient on an SSRI receives a new prescription and becomes agitated and febrile.',
    steps: [
      {
        id: 's1',
        narrative: 'A 42-year-old woman on sertraline 150 mg was prescribed tramadol for back pain this morning. By evening she is agitated, sweating, tremulous and has diarrhea.',
        data: [{ label: 'Vitals', value: 'T 38.7 °C, HR 128, BP 168/98' }, { label: 'Exam', value: 'Mydriasis, hyperreflexia, sustained ankle clonus, hyperactive bowel sounds' }],
        question: 'Most likely diagnosis?',
        choices: [
          { text: 'Neuroleptic malignant syndrome', score: 0, feedback: 'No dopamine antagonist; onset is hours, with clonus rather than lead-pipe rigidity.' },
          { text: 'Serotonin syndrome', score: 2, feedback: 'Serotonergic combination, rapid onset, clonus and hyperreflexia meet Hunter criteria.' },
          { text: 'Anticholinergic toxicity', score: 0, feedback: 'She is sweating with hyperactive bowel sounds, which argues against it.' },
        ],
      },
      {
        id: 's2',
        question: 'Initial management?',
        narrative: 'She is frightened but cooperative.',
        choices: [
          { text: 'Stop sertraline and tramadol; supportive care; benzodiazepines; consider cyproheptadine', score: 2, feedback: 'Standard management; most cases resolve within 24 hours of stopping the drugs.' },
          { text: 'Give acetaminophen for fever and discharge', score: 0, feedback: 'Fever is muscular; antipyretics do not help. She needs monitoring.' },
          { text: 'Physical restraints and haloperidol', score: 0, feedback: 'Restraints worsen hyperthermia; antipsychotics are not the treatment.' },
        ],
      },
      {
        id: 's3',
        narrative: 'Her temperature rises to 41.2 °C with increasing rigidity despite benzodiazepines.',
        question: 'Next step?',
        choices: [
          { text: 'More oral cyproheptadine only', score: 0, feedback: 'Insufficient for life-threatening hyperthermia.' },
          { text: 'ICU: sedation, non-depolarizing paralysis, intubation and active cooling', score: 2, feedback: 'Severe serotonin syndrome with hyperthermia requires paralysis to stop muscular heat generation.' },
          { text: 'Dantrolene as first-line', score: 1, feedback: 'Not established in serotonin syndrome; paralysis with a non-depolarizing agent is preferred.' },
        ],
      },
    ],
    debrief: [
      'Check interactions whenever adding a drug to an SSRI/SNRI: tramadol, linezolid, methylene blue, MAOIs, dextromethorphan.',
      'Serotonin syndrome: rapid onset, clonus, hyperreflexia; NMS: days, lead-pipe rigidity.',
      'Stop the drugs, benzodiazepines, cyproheptadine; paralysis and intubation for severe hyperthermia.',
    ],
    refs: ['boyer-2005', 'hunter-2003'],
  },
  {
    id: 'case-lithium',
    title: 'Lithium and the new blood-pressure pill',
    module: 'pharm',
    setting: 'Outpatient → ED',
    difficulty: 'advanced',
    summary: 'A stable lithium patient gets a new antihypertensive and a stomach bug.',
    steps: [
      {
        id: 's1',
        narrative: 'A 64-year-old woman has been stable on lithium (level 0.7) for 10 years. Her primary care physician starts hydrochlorothiazide. Two weeks later she has gastroenteritis, then coarse tremor, unsteady gait and confusion.',
        question: 'What is the most likely problem?',
        choices: [
          { text: 'A bipolar relapse', score: 0, feedback: 'Coarse tremor, ataxia and confusion after a lithium-raising drug and dehydration point to toxicity.' },
          { text: 'Chronic lithium toxicity from a thiazide plus dehydration', score: 2, feedback: 'Thiazides and volume loss reduce lithium clearance; chronic toxicity is neurotoxic at relatively lower levels.' },
          { text: 'Stroke only', score: 1, feedback: 'Must be considered, but the drug history makes lithium toxicity the leading explanation; check a level now.' },
        ],
      },
      {
        id: 's2',
        narrative: 'Lithium level 3.2 mmol/L; creatinine doubled from baseline; GCS 14; no seizures; ECG shows sinus bradycardia.',
        question: 'Best management?',
        choices: [
          { text: 'Activated charcoal', score: 0, feedback: 'Charcoal does not bind lithium.' },
          { text: 'Stop lithium and HCTZ; isotonic IV fluids; serial levels; nephrology involvement; dialysis if EXTRIP criteria are met', score: 2, feedback: 'Correct. EXTRIP recommends dialysis with impaired kidney function and level >4.0, or decreased consciousness/seizures/dysrhythmias, and suggests it for significant confusion: discuss early.' },
          { text: 'Continue lithium at half dose', score: 0, feedback: 'Lithium must be stopped in toxicity.' },
        ],
      },
      {
        id: 's3',
        narrative: 'She recovers fully. Her psychiatrist wants to continue lithium.',
        question: 'Which plan prevents a repeat?',
        choices: [
          { text: 'Restart lithium at a lower dose; replace the thiazide with a non-interacting antihypertensive (e.g., a calcium channel blocker); sick-day rules (hold lithium during vomiting/diarrhea); target 0.4–0.8 for her age; closer monitoring', score: 2, feedback: 'This addresses the interaction, dehydration risk and age-appropriate targets.' },
          { text: 'Restart the previous dose with HCTZ', score: 0, feedback: 'Repeats the same interaction.' },
          { text: 'Never use lithium again under any circumstances', score: 1, feedback: 'Sometimes appropriate, but lithium can often be resumed safely with precautions when it has worked well.' },
        ],
      },
    ],
    debrief: [
      'NSAIDs, thiazides, ACE inhibitors/ARBs and dehydration raise lithium levels.',
      'Chronic toxicity causes neurotoxicity at lower levels than acute overdose.',
      'Charcoal does not bind lithium; use EXTRIP criteria for dialysis.',
      'Teach sick-day rules and use age-adjusted targets.',
    ],
    refs: ['extrip-2015', 'isbd-lithium-2019'],
  },
]
