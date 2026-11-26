import type { Module } from '../types'

export const emergencies: Module = {
  id: 'emergencies',
  title: 'Emergencies & Medical Mimics',
  short: 'Emergencies',
  path: '/learn/emergencies',
  icon: 'Siren',
  color: 'from-red-500 to-rose-700',
  summary: 'Delirium, catatonia, serotonin syndrome, NMS and other toxic syndromes; medical conditions that masquerade as psychiatric illness; capacity and involuntary treatment.',
  minutes: 40,
  objectives: [
    'Detect delirium (including hypoactive) with CAM or 4AT and manage it without making it worse.',
    'Recognize catatonia and treat it with lorazepam or ECT, not antipsychotics.',
    'Differentiate serotonin syndrome, NMS, anticholinergic and sympathomimetic toxicity and malignant hyperthermia.',
    'Know the medical mimics of depression, mania, psychosis and anxiety, including anti-NMDAR encephalitis.',
    'Assess decision-making capacity and apply the basics of involuntary treatment and duty to protect.',
  ],
  sections: [
    {
      id: 'delirium',
      title: 'Delirium: the most important psychiatric mimic',
      lead: 'A disturbance of attention and awareness with acute onset and a fluctuating course is a medical emergency until proven otherwise.',
      blocks: [
        {
          type: 'criteria',
          title: 'Confusion Assessment Method (CAM)',
          rule: 'Delirium = 1 AND 2, plus 3 OR 4',
          items: [
            '1. Acute onset and fluctuating course',
            '2. Inattention (e.g., cannot say months backward)',
            '3. Disorganized thinking',
            '4. Altered level of consciousness (hyperalert, drowsy, stuporous)',
          ],
          note: 'The 4AT (alertness, AMT4 orientation, attention, acute change) needs no training: a score ≥4 suggests delirium. Use CAM-ICU for intubated patients.',
        },
        {
          type: 'list',
          items: [
            '**Hypoactive** delirium is the most common subtype in older patients, the most often missed (mistaken for depression), and carries the worst prognosis.',
            'Causes are usually multiple: infection, drugs (anticholinergics, benzodiazepines, opioids, steroids, polypharmacy), metabolic (sodium, glucose, calcium, uremia, liver failure), hypoxia, urinary retention, constipation, pain, withdrawal, stroke, seizures.',
          ],
        },
        {
          type: 'table',
          caption: 'Management',
          head: ['Do', 'Avoid'],
          rows: [
            ['Find and treat the causes; review every medication', 'Benzodiazepines (worsen delirium), except for alcohol or benzodiazepine withdrawal'],
            ['Multicomponent prevention (HELP): reorientation, sleep protection, mobility, hearing aids and glasses, hydration, family presence; reduces incidence by about a third', 'Routine antipsychotics: haloperidol and ziprasidone did not shorten delirium or reduce mortality in ICU trials (MIND-USA, AID-ICU)'],
            ['Low-dose antipsychotic only for dangerous agitation or distressing psychosis, shortest course', 'Physical restraints (increase agitation and injury); antipsychotics in Parkinson or Lewy body disease (if unavoidable, very low-dose quetiapine)'],
          ],
        },
        {
          type: 'compare',
          caption: 'Delirium vs dementia vs primary psychosis',
          left: { title: 'Delirium', items: ['Onset hours to days', 'Fluctuating attention and consciousness', 'Visual hallucinations common', 'Usually reversible; a medical cause'] },
          right: { title: 'Dementia / primary psychosis', items: ['Dementia: insidious onset, attention preserved until late, alert', 'Primary psychosis: clear sensorium, intact orientation, auditory hallucinations predominate', 'Both increase vulnerability to delirium'] },
        },
      ],
      refs: ['cam-1990', 'help-1999', 'mind-usa-2018', 'aid-icu-2022'],
      check: [
        {
          id: 'em-del-1',
          q: 'An 82-year-old is "withdrawn and depressed" on day 3 after hip surgery; she drifts off mid-sentence and cannot say months backward. Next step?',
          options: ['Start sertraline', 'Treat as hypoactive delirium: search for causes and review medications', 'Start lorazepam for anxiety', 'Psychiatric transfer'],
          answer: 1,
          why: 'Inattention and fluctuating alertness after surgery = hypoactive delirium until proven otherwise.',
        },
      ],
    },
    {
      id: 'catatonia',
      title: 'Catatonia',
      lead: 'Look for it (it is under-recognized), treat it with benzodiazepines or ECT, and keep antipsychotics away.',
      blocks: [
        {
          type: 'criteria',
          title: 'Catatonia (DSM-5-TR)',
          rule: '≥3 of 12:',
          items: ['Stupor', 'Catalepsy', 'Waxy flexibility', 'Mutism', 'Negativism', 'Posturing', 'Mannerism', 'Stereotypy', 'Agitation not influenced by external stimuli', 'Grimacing', 'Echolalia', 'Echopraxia'],
          note: 'Screen with the Bush–Francis Catatonia Rating Scale. Causes: mood disorders (most common, especially bipolar), schizophrenia, autism, medical illness (encephalitis including anti-NMDAR, metabolic, NMS), benzodiazepine withdrawal.',
        },
        {
          type: 'steps',
          title: 'Treatment',
          items: [
            { title: 'Lorazepam challenge', text: '1–2 mg IV/IM; improvement within minutes to hours supports the diagnosis. Then scheduled lorazepam, titrated up; high doses are often tolerated without sedation.' },
            { title: 'ECT', text: 'If lorazepam fails, or immediately for **malignant catatonia** (fever, autonomic instability). Highly effective.' },
            { title: 'Stop dopamine blockers', text: 'Antipsychotics, especially high-potency ones, can worsen catatonia and precipitate NMS.' },
            { title: 'Supportive care', text: 'Hydration, nutrition, VTE prophylaxis, pressure-injury prevention; search for the underlying cause.' },
          ],
        },
      ],
      refs: ['dsm5tr', 'bfcrs-1996'],
      check: [
        {
          id: 'em-cat-1',
          q: 'A mute, rigid patient holds an awkward posture for hours and resists repositioning. First-line treatment?',
          options: ['IM haloperidol', 'IV lorazepam', 'Physical restraint', 'Olanzapine'],
          answer: 1,
          why: 'Catatonia: lorazepam challenge, then scheduled lorazepam; ECT if no response. Antipsychotics risk NMS.',
        },
      ],
    },
    {
      id: 'toxic',
      title: 'Hyperthermic and toxic syndromes',
      lead: 'Exposure, timing, and the neuromuscular exam (clonus vs lead-pipe rigidity) separate them.',
      blocks: [
        {
          type: 'table',
          head: ['', 'Serotonin syndrome', 'NMS', 'Anticholinergic', 'Sympathomimetic', 'Malignant hyperthermia'],
          rows: [
            ['Exposure', 'Serotonergic drugs (often a combination or dose increase)', 'Dopamine antagonist (or stopping dopaminergic drugs)', 'Antihistamines, TCAs, benztropine, scopolamine', 'Cocaine, amphetamines, cathinones', 'Volatile anesthetics, succinylcholine'],
            ['Onset', '<24 h (often <6 h)', 'Days to weeks (often within 2 weeks of a start or dose increase)', '<12 h', 'Minutes to hours', 'Minutes to hours of anesthesia'],
            ['Neuromuscular', '**Clonus, hyperreflexia** (legs > arms), tremor, rigidity in severe cases', '**Lead-pipe rigidity**, bradyreflexia', 'Normal tone; myoclonus possible', 'Tremor, normal reflexes', 'Rigor-like rigidity'],
            ['Pupils', 'Dilated', 'Normal', 'Dilated', 'Dilated', 'Normal'],
            ['Skin', 'Diaphoretic', 'Diaphoretic, pale', '**Dry, hot, flushed**', 'Diaphoretic', 'Mottled, diaphoretic'],
            ['Bowel sounds', 'Hyperactive', 'Normal or reduced', 'Absent or reduced; urinary retention', 'Normal or increased', 'Reduced'],
            ['Mental status', 'Agitation, confusion', 'Stupor, mutism, confusion', 'Agitated delirium, picking at the air', 'Agitation, paranoia', 'Variable (anesthetized)'],
            ['Key labs', 'Clinical diagnosis', 'CK very high, leukocytosis, low serum iron', 'Clinical', 'CK, troponin', 'Rising end-tidal CO2, CK, hyperkalemia'],
          ],
        },
        {
          type: 'criteria',
          title: 'Hunter criteria for serotonin toxicity',
          rule: 'With a serotonergic agent, any one of:',
          items: [
            'Spontaneous clonus',
            'Inducible clonus + agitation or diaphoresis',
            'Ocular clonus + agitation or diaphoresis',
            'Tremor + hyperreflexia',
            'Hypertonia + temperature >38 °C + ocular or inducible clonus',
          ],
        },
        {
          type: 'table',
          caption: 'Management',
          head: ['Syndrome', 'Treatment'],
          rows: [
            ['Serotonin syndrome', 'Stop serotonergic agents; supportive care; benzodiazepines; cyproheptadine (12 mg, then 2 mg every 2 h if symptoms continue); severe hyperthermia → sedation, paralysis with a non-depolarizing agent, intubation. Antipyretics do not help (heat is muscular). Avoid restraints.'],
            ['NMS', 'Stop the antipsychotic (restart dopaminergic drugs if they were stopped); cooling, fluids (rhabdomyolysis), ICU; benzodiazepines; dantrolene, bromocriptine or amantadine in moderate–severe cases; ECT if refractory. Rechallenge only after ≥2 weeks with a lower-potency agent and slow titration.'],
            ['Anticholinergic', 'Supportive care, benzodiazepines; physostigmine (with toxicology input) can reverse delirium but is contraindicated with QRS widening/TCA toxicity.'],
            ['Sympathomimetic', 'Benzodiazepines, cooling, treat ACS/hypertension; avoid physical struggle.'],
            ['Malignant hyperthermia', 'Stop triggers; dantrolene; cooling; treat hyperkalemia.'],
          ],
        },
        {
          type: 'list',
          title: 'Common serotonin syndrome culprits',
          items: [
            'SSRIs/SNRIs combined with: MAOIs (most dangerous), linezolid, methylene blue, tramadol, meperidine, dextromethorphan, fentanyl, MDMA, St John\'s wort, lithium, triptans (low risk).',
            'MAOI + tyramine or sympathomimetics → **hypertensive crisis** (occipital headache, severe hypertension): phentolamine or another rapid IV antihypertensive.',
          ],
        },
        {
          type: 'links',
          items: [{ label: 'Practice: Toxic syndrome differentiator', to: '/tools/syndromes', note: 'Select findings and watch the differential re-rank with explanations.' }],
        },
      ],
      refs: ['boyer-2005', 'hunter-2003'],
      check: [
        {
          id: 'em-tox-1',
          q: 'Six hours after tramadol was added to sertraline: agitation, diaphoresis, T 38.6 °C, inducible ankle clonus. Diagnosis and first steps?',
          options: [
            'NMS: dantrolene',
            'Serotonin syndrome: stop both drugs, benzodiazepines, consider cyproheptadine',
            'Anticholinergic toxicity: physostigmine',
            'Sepsis: antibiotics only',
          ],
          answer: 1,
          why: 'Rapid onset after a serotonergic combination with inducible clonus meets Hunter criteria.',
        },
        {
          id: 'em-tox-2',
          q: 'Ten days after starting haloperidol: T 40 °C, lead-pipe rigidity, mutism, labile BP, CK 22,000. Diagnosis?',
          options: ['Serotonin syndrome', 'NMS', 'Malignant catatonia only', 'Heat stroke'],
          answer: 1,
          why: 'Dopamine antagonist exposure, gradual onset, lead-pipe rigidity, hyperthermia, autonomic instability and very high CK = NMS.',
        },
      ],
    },
    {
      id: 'mimics',
      title: 'Medical mimics checklist',
      lead: 'Atypical age of onset, abnormal vital signs, neurologic signs, or a poor response to standard treatment: look again.',
      blocks: [
        {
          type: 'table',
          head: ['Presentation', 'Do not miss', 'Clue'],
          rows: [
            ['Depression', 'Hypothyroidism, OSA, anemia, B12 deficiency, Parkinson disease, hypercalcemia, Cushing/Addison disease, pancreatic cancer, HIV; steroids, interferon', 'Weight changes out of proportion, neurologic signs, abnormal labs'],
            ['Mania', 'Hyperthyroidism, steroids, stimulants, levodopa, frontotemporal dementia, HIV, neurosyphilis, MS, right-hemisphere stroke', 'First episode after ~50, cognitive or neurologic signs'],
            ['Psychosis', 'Delirium, substances, anti-NMDAR encephalitis, temporal lobe epilepsy, SLE, HIV, syphilis, Wilson disease, B12 deficiency, tumors, Huntington disease, porphyria, Lewy body dementia', 'Visual/olfactory hallucinations, fluctuating awareness, seizures, movement disorder'],
            ['Anxiety / panic', 'Hyperthyroidism, arrhythmia, PE, asthma/COPD, hypoglycemia, pheochromocytoma (rare), caffeine/stimulants, withdrawal', 'Abnormal vitals at rest, exertional symptoms'],
            ['Cognitive decline', 'Delirium, depression, hypothyroidism, B12 deficiency, normal-pressure hydrocephalus, neurosyphilis, HIV, subdural hematoma', 'NPH: gait disturbance + urinary incontinence + cognitive decline'],
          ],
        },
        {
          type: 'callout',
          tone: 'danger',
          title: 'Anti-NMDA receptor encephalitis',
          items: [
            'Often young women; viral-like prodrome → acute psychiatric symptoms (psychosis, agitation, catatonia, insomnia) → seizures, orofacial dyskinesias, autonomic instability, reduced consciousness, hypoventilation.',
            'Associated with ovarian teratoma. Patients often react badly to antipsychotics (NMS-like).',
            'Diagnosis: CSF anti-NMDAR antibodies (more sensitive than serum), EEG, MRI. Treatment: immunotherapy and tumor removal; outcomes are better when treated early.',
          ],
        },
      ],
      refs: ['dalmau-2019', 'nice-cg178'],
    },
    {
      id: 'legal',
      title: 'Capacity, involuntary treatment and confidentiality',
      lead: 'Capacity is decision-specific and any treating clinician can assess it.',
      blocks: [
        {
          type: 'criteria',
          title: 'Decision-making capacity (Appelbaum)',
          rule: 'The patient must be able to:',
          items: [
            'Communicate a clear and consistent choice',
            'Understand the relevant information (risks, benefits, alternatives)',
            'Appreciate how the information applies to their own situation',
            'Reason with the information to compare options',
          ],
          note: 'The bar rises with the stakes of the decision (sliding scale). A psychiatric diagnosis, involuntary status or disagreement with the clinician does not by itself mean incapacity.',
        },
        {
          type: 'list',
          items: [
            '**Involuntary hospitalization**: criteria are set by state law, typically danger to self, danger to others, or grave disability due to mental illness; emergency holds commonly last 48–72 hours. Involuntary admission does **not** authorize non-emergency medication over objection; that needs a separate process.',
            '**Duty to protect** (Tarasoff): when a patient makes a serious threat of violence against an identifiable victim, many states require or permit action (warning the victim, notifying police, hospitalization). Know your state\'s law.',
            '**Confidentiality exceptions**: HIPAA permits disclosure to prevent a serious and imminent threat to health or safety; mandated reporting applies to child and elder abuse.',
            '**EMTALA** applies to psychiatric emergencies: screen and stabilize before transfer.',
          ],
        },
      ],
      refs: ['appelbaum-2007'],
      check: [
        {
          id: 'em-leg-1',
          q: 'A patient with schizophrenia declines a recommended knee surgery. He can explain the risks, how they apply to him, and why he prefers physical therapy. Capacity?',
          options: ['Lacks capacity because of schizophrenia', 'Has capacity for this decision', 'Needs a court to decide', 'Only a psychiatrist can decide'],
          answer: 1,
          why: 'He communicates a choice, understands, appreciates and reasons. Diagnosis alone does not remove capacity.',
        },
      ],
    },
  ],
  takeaways: [
    'Inattention + acute fluctuating course = delirium. Find the cause; avoid benzodiazepines and restraints.',
    'Catatonia: lorazepam challenge, then ECT; antipsychotics can precipitate NMS.',
    'Clonus and rapid onset → serotonin syndrome; lead-pipe rigidity over days → NMS; dry, hot skin → anticholinergic.',
    'New psychiatric symptoms with seizures, dyskinesias or autonomic instability in a young woman → think anti-NMDAR encephalitis.',
    'Capacity is decision-specific; involuntary admission ≠ consent to medication.',
  ],
  flashcards: [
    { id: 'fc-em-1', front: 'CAM algorithm', back: '(1) Acute onset/fluctuating course AND (2) inattention, plus (3) disorganized thinking OR (4) altered level of consciousness.' },
    { id: 'fc-em-2', front: 'Most common and most missed delirium subtype in older adults', back: 'Hypoactive delirium (often mistaken for depression).' },
    { id: 'fc-em-3', front: 'Do antipsychotics shorten delirium?', back: 'No: ICU RCTs (MIND-USA, AID-ICU) showed no reduction in duration or mortality. Use only for dangerous agitation or distress.' },
    { id: 'fc-em-4', front: 'Catatonia first-line treatment', back: 'Lorazepam (challenge, then scheduled); ECT if no response or malignant catatonia.' },
    { id: 'fc-em-5', front: 'Serotonin syndrome vs NMS: the neuromuscular sign', back: 'SS: clonus/hyperreflexia. NMS: lead-pipe rigidity, bradyreflexia.' },
    { id: 'fc-em-6', front: 'Serotonin syndrome antidote', back: 'Cyproheptadine (5-HT2A antagonist), plus benzodiazepines and supportive care.' },
    { id: 'fc-em-7', front: 'NMS labs', back: 'Markedly elevated CK, leukocytosis, low serum iron; myoglobinuria.' },
    { id: 'fc-em-8', front: 'Anticholinergic toxidrome mnemonic', back: 'Hot as a hare, dry as a bone, red as a beet, blind as a bat, mad as a hatter, full as a flask.' },
    { id: 'fc-em-9', front: 'Physostigmine contraindication', back: 'QRS widening / TCA toxicity (risk of asystole and seizures).' },
    { id: 'fc-em-10', front: 'Anti-NMDAR encephalitis: tumor association and test', back: 'Ovarian teratoma; CSF anti-NMDAR antibodies.' },
    { id: 'fc-em-11', front: 'Four abilities of decision-making capacity', back: 'Communicate a choice, understand, appreciate, reason.' },
    { id: 'fc-em-12', front: 'Does involuntary admission permit forced medication?', back: 'No (except emergencies); it requires a separate legal process.' },
    { id: 'fc-em-13', front: 'MAOI hypertensive crisis treatment', back: 'Phentolamine (or another rapid IV antihypertensive).' },
  ],
}
