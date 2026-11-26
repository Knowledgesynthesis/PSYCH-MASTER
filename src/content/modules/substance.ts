import type { Module } from '../types'

export const substance: Module = {
  id: 'substance',
  title: 'Substance Use Disorders',
  short: 'Substance use',
  path: '/learn/substance',
  icon: 'FlaskConical',
  color: 'from-amber-500 to-orange-600',
  summary: 'Screen and diagnose; recognize intoxication and withdrawal; manage alcohol withdrawal safely; deliver MOUD and AUD medications; and talk about change with motivational interviewing.',
  minutes: 55,
  objectives: [
    'Apply DSM-5-TR SUD criteria and severity; screen with validated single questions or AUDIT-C.',
    'Recognize intoxication and withdrawal syndromes, including which are dangerous.',
    'Manage alcohol withdrawal with CIWA-Ar-guided benzodiazepines or phenobarbital, and prevent Wernicke encephalopathy.',
    'Start buprenorphine (including in the fentanyl era), understand methadone and naltrexone, and distribute naloxone.',
    'Prescribe first-line AUD medications and use motivational interviewing.',
  ],
  sections: [
    {
      id: 'dx',
      title: 'Screening and diagnosis',
      lead: 'Screen everyone; use person-first language; severity guides intensity of care.',
      blocks: [
        {
          type: 'criteria',
          title: 'Substance use disorder (DSM-5-TR)',
          rule: '≥2 of 11 within 12 months: mild 2–3, moderate 4–5, severe ≥6',
          items: [
            'Impaired control: larger amounts/longer than intended; unsuccessful efforts to cut down; much time spent; craving',
            'Social impairment: role failure; social/interpersonal problems; activities given up',
            'Risky use: hazardous situations; continued use despite physical/psychological problems',
            'Pharmacological: tolerance; withdrawal',
          ],
          note: 'Tolerance and withdrawal do **not** count when they occur with medications taken as prescribed (e.g., opioids for pain, benzodiazepines, stimulants).',
        },
        {
          type: 'table',
          caption: 'Screening (USPSTF grade B for adults)',
          head: ['Screen', 'Question', 'Positive'],
          rows: [
            ['Single alcohol question', '"How many times in the past year have you had 5 or more drinks in a day?" (4 for women and adults >65)', '≥1 time'],
            ['AUDIT-C', '3 items: frequency, typical quantity, frequency of heavy episodes', '≥4 men, ≥3 women ([calculator](/tools/scales?scale=auditc))'],
            ['Single drug question', '"How many times in the past year have you used an illegal drug or a prescription medication for non-medical reasons?"', '≥1 time'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Language matters',
          text: 'Use "person with a substance use disorder", not "addict" or "abuser"; "MOUD" (medications for opioid use disorder) rather than "MAT"; "positive/negative test" not "dirty/clean". Stigmatizing language measurably changes clinician decisions.',
        },
      ],
      refs: ['dsm5tr', 'uspstf-alcohol-2018', 'uspstf-drug-2020', 'auditc-1998'],
      check: [
        {
          id: 'sud-dx-1',
          q: 'A patient on prescribed oxycodone for cancer pain has tolerance and withdrawal on missed doses but no other criteria. Does she meet OUD criteria?',
          options: ['Yes, mild OUD', 'Yes, moderate OUD', 'No: tolerance and withdrawal under appropriate medical use do not count', 'Yes, because withdrawal is present'],
          answer: 2,
          why: 'Physiological dependence from medications taken as prescribed is not counted toward SUD criteria.',
        },
      ],
    },
    {
      id: 'syndromes',
      title: 'Intoxication and withdrawal patterns',
      lead: 'Sedative withdrawal (alcohol, benzodiazepines, GHB) can kill; opioid withdrawal rarely does directly.',
      blocks: [
        {
          type: 'table',
          head: ['Substance', 'Intoxication', 'Withdrawal', 'Danger'],
          rows: [
            ['Alcohol', 'Disinhibition, slurred speech, ataxia, nystagmus, stupor', 'Tremor, sweating, tachycardia, anxiety → seizures → hallucinosis → delirium tremens', '**Withdrawal can be fatal**'],
            ['Benzodiazepines / sedatives', 'Sedation, ataxia; respiratory depression with opioids/alcohol', 'Like alcohol: anxiety, insomnia, tremor, seizures, delirium (timing depends on half-life)', '**Withdrawal can be fatal**'],
            ['GHB', 'Rapid coma with abrupt awakening, bradycardia', 'Rapid onset (hours), severe, can progress to delirium', '**Withdrawal can be fatal**'],
            ['Opioids', 'Miosis, respiratory depression, sedation, constipation', 'Mydriasis, yawning, lacrimation, rhinorrhea, piloerection, myalgias, GI upset', 'Intoxication kills (overdose); withdrawal rarely does directly, but lost tolerance afterwards does'],
            ['Cocaine / amphetamines', 'Euphoria, mydriasis, tachycardia, hypertension, hyperthermia, paranoia, psychosis', '"Crash": dysphoria, hypersomnia, hyperphagia, craving', 'Intoxication: MI, stroke, arrhythmia, hyperthermia, seizures'],
            ['Cannabis', 'Conjunctival injection, increased appetite, slowed time, anxiety/paranoia', 'Irritability, insomnia, decreased appetite, restlessness (starts within ~1 week)', 'Psychosis risk (high potency); hyperemesis syndrome'],
            ['PCP / ketamine', 'Dissociation, **vertical and horizontal nystagmus**, analgesia, agitation/violence, hyperthermia, rhabdomyolysis', 'Not clinically significant', 'Trauma, hyperthermia'],
            ['Hallucinogens (LSD, psilocybin)', 'Perceptual changes, synesthesia, mydriasis, tachycardia', 'None', 'Accidents; hallucinogen persisting perception disorder'],
            ['MDMA', 'Euphoria, empathy, bruxism, hyperthermia, **hyponatremia**', 'Low mood days later', 'Serotonin toxicity, hyperthermia, seizures'],
            ['Synthetic cannabinoids', 'Severe agitation, psychosis, seizures, tachycardia, AKI', '', 'Not detected by standard urine screens'],
            ['Xylazine (adulterant)', 'Prolonged sedation, bradycardia, hypotension, necrotic wounds', 'Severe withdrawal reported', 'Not reversed by naloxone (give naloxone anyway for the opioid)'],
          ],
        },
        {
          type: 'sort',
          prompt: 'Identify the syndrome.',
          categories: ['Opioid intoxication', 'Opioid withdrawal', 'Stimulant intoxication', 'Stimulant withdrawal', 'Alcohol withdrawal', 'PCP intoxication'],
          items: [
            { text: 'Pinpoint pupils, RR 6, unresponsive', cat: 0, why: 'Miosis + respiratory depression + sedation.' },
            { text: 'Dilated pupils, yawning, runny nose, gooseflesh, cramps', cat: 1, why: 'Classic opioid withdrawal signs.' },
            { text: 'BP 190/110, HR 130, dilated pupils, paranoid, diaphoretic', cat: 2, why: 'Sympathomimetic toxidrome.' },
            { text: 'Sleeping 16 h/day, ravenous, dysphoric after a 3-day binge', cat: 3, why: 'The stimulant "crash".' },
            { text: 'Tremor, sweating, HR 115, anxious, 18 hours after last drink', cat: 4, why: 'Early alcohol withdrawal timing and signs.' },
            { text: 'Agitated and violent, vertical nystagmus, feels no pain', cat: 5, why: 'Vertical nystagmus is the PCP clue.' },
          ],
        },
        {
          type: 'callout',
          tone: 'pearl',
          title: 'Urine drug screen limits',
          items: [
            'Standard opiate immunoassays often miss **fentanyl**, methadone, buprenorphine and oxycodone; order specific tests.',
            'Known false positives include amphetamines (bupropion, pseudoephedrine, labetalol), PCP (dextromethorphan, venlafaxine) and TCAs (quetiapine, diphenhydramine).',
            'Confirm unexpected results with GC-MS or LC-MS/MS before acting on them.',
          ],
        },
      ],
      refs: ['dsm5tr', 'asam-oud-2020'],
    },
    {
      id: 'alcohol-withdrawal',
      title: 'Alcohol withdrawal management',
      lead: 'Predict, measure, treat early with enough medication, and give thiamine to everyone.',
      blocks: [
        { type: 'widget', name: 'alcohol-timeline' },
        {
          type: 'list',
          title: 'Assess',
          items: [
            '**Risk of complicated withdrawal**: prior withdrawal seizures or DTs, PAWSS ≥4, heavy daily use, older age, comorbid illness, elevated BAL with withdrawal signs.',
            '**CIWA-Ar severity** (needs a communicative patient): <10 mild, 10–18 moderate, ≥19 severe ([calculator](/tools/scales?scale=ciwa)). Other causes (sepsis, hypoglycemia, head injury, hepatic encephalopathy) can inflate scores.',
            '**Setting**: ambulatory management suits mild–moderate withdrawal without complicating risks and with support; otherwise inpatient (ICU for severe or resistant withdrawal).',
          ],
        },
        {
          type: 'table',
          head: ['Treatment', 'Role'],
          rows: [
            ['Benzodiazepines', 'First-line; prevent seizures and DTs. Long-acting (diazepam, chlordiazepoxide) smooth the course; lorazepam or oxazepam if severe liver disease or older age. **Symptom-triggered** dosing reduces total dose when patients can be monitored; front-load for severe withdrawal'],
            ['Phenobarbital', 'Appropriate alternative or adjunct in experienced settings; useful for benzodiazepine-resistant withdrawal'],
            ['Carbamazepine, gabapentin', 'Options for mild–moderate ambulatory withdrawal, especially when benzodiazepine risk is high'],
            ['Dexmedetomidine, clonidine, beta-blockers', 'Adjuncts only: do not prevent seizures or DTs and can mask signs'],
            ['Antipsychotics', 'Adjunct for hallucinations/agitation not controlled by adequate benzodiazepines (lower seizure threshold)'],
          ],
        },
        {
          type: 'callout',
          tone: 'danger',
          title: 'Thiamine and Wernicke encephalopathy',
          items: [
            'Give thiamine to **everyone** at risk (parenteral preferred when absorption is doubtful); suspected Wernicke encephalopathy needs **high-dose IV** thiamine (several hundred mg, two to three times daily).',
            'The classic triad (confusion, ataxia, ophthalmoplegia) is present in only a minority (~16% in an autopsy series). Use the Caine criteria (≥2 of dietary deficiency, eye signs, cerebellar signs, altered mental state/memory).',
            '**Never withhold glucose from a hypoglycemic patient** while waiting for thiamine; give both, thiamine first when feasible.',
            'Replace magnesium, potassium and phosphate; feed the patient.',
          ],
        },
        {
          type: 'p',
          text: 'A single brief withdrawal seizure is treated with a benzodiazepine; phenytoin does not prevent alcohol withdrawal seizures. A first seizure still deserves evaluation for head injury and other causes.',
        },
      ],
      refs: ['asam-aw-2020', 'ciwa-1989', 'harper-1986', 'caine-1997'],
      check: [
        {
          id: 'sud-aw-1',
          q: '52 h after his last drink, a man is disoriented, hallucinating, febrile and tachycardic. Most likely diagnosis?',
          options: ['Alcoholic hallucinosis', 'Delirium tremens', 'Wernicke encephalopathy alone', 'Alcohol intoxication'],
          answer: 1,
          why: 'Delirium (disorientation, fluctuating awareness) plus autonomic hyperactivity at 48–96 h = DTs. Hallucinosis occurs with a clear sensorium.',
        },
        {
          id: 'sud-aw-2',
          q: 'Which agent does NOT prevent alcohol withdrawal seizures?',
          options: ['Diazepam', 'Phenobarbital', 'Clonidine', 'Lorazepam'],
          answer: 2,
          why: 'Alpha-2 agonists and beta-blockers treat autonomic symptoms but do not prevent seizures or DTs.',
        },
      ],
    },
    {
      id: 'aud',
      title: 'Alcohol use disorder: long-term treatment',
      lead: 'Effective medications exist and are prescribed to only a small minority of people who could benefit.',
      blocks: [
        {
          type: 'table',
          head: ['Medication', 'Use', 'Key cautions'],
          rows: [
            ['Naltrexone (oral daily or IM monthly)', 'First-line; reduces heavy drinking; can start while still drinking', 'Contraindicated with opioid use or need (blocks analgesia, precipitates withdrawal); acute hepatitis/liver failure'],
            ['Acamprosate', 'First-line; supports abstinence; start after withdrawal', 'Renal dosing; avoid if CrCl ≤30; safe in liver disease'],
            ['Topiramate, gabapentin', 'Second-line (APA)', 'Topiramate: cognitive slowing, paresthesias, kidney stones; gabapentin: misuse with opioids'],
            ['Disulfiram', 'Only with supervised dosing and an abstinence goal', 'Hepatotoxicity; severe reaction with alcohol; never give to an intoxicated patient'],
            ['Baclofen', 'Option in alcohol-related liver disease (some guidelines)', 'Sedation; withdrawal if stopped abruptly'],
          ],
        },
        {
          type: 'list',
          items: [
            'Psychosocial options: CBT, motivational enhancement, contingency management, mutual help. Facilitated Alcoholics Anonymous/12-step participation increases abstinence at least as well as other therapies (Cochrane 2020).',
            'Check liver function and screen for alcohol-related liver disease; vaccinate for hepatitis A/B; counsel on driving.',
          ],
        },
      ],
      refs: ['apa-aud-2018', 'kelly-2020'],
      check: [
        {
          id: 'sud-aud-1',
          q: 'Patient with AUD and chronic opioid therapy for sickle cell pain wants medication to reduce drinking. Normal kidneys. Best choice?',
          options: ['Naltrexone', 'Acamprosate', 'Disulfiram, unsupervised', 'Lorazepam'],
          answer: 1,
          why: 'Naltrexone is contraindicated with ongoing opioid therapy; acamprosate is first-line and safe with normal renal function.',
        },
      ],
    },
    {
      id: 'oud',
      title: 'Opioid use disorder',
      lead: 'Buprenorphine and methadone roughly halve mortality; detoxification alone raises overdose risk.',
      blocks: [
        {
          type: 'callout',
          tone: 'success',
          title: 'Why MOUD is the standard of care',
          items: [
            'Being on methadone or buprenorphine is associated with markedly lower all-cause and overdose mortality (Sordo 2017; Larochelle 2018).',
            'Detoxification or "tapering off" without ongoing treatment leads to high relapse rates, and **loss of tolerance makes the next use more likely to be fatal**.',
            'Since January 2023 (X-waiver removed), any clinician with a DEA registration covering Schedule III can prescribe buprenorphine for OUD.',
          ],
        },
        {
          type: 'table',
          head: ['', 'Buprenorphine', 'Methadone', 'Extended-release naltrexone'],
          rows: [
            ['Mechanism', 'High-affinity partial µ agonist', 'Full µ agonist', 'µ antagonist (monthly IM)'],
            ['Where', 'Any DEA-registered prescriber; telehealth', 'Opioid treatment programs (OTPs) for OUD; hospital inpatients', 'Any prescriber'],
            ['Start', 'When in withdrawal (COWS ≥8–12; usually ≥12–24 h after short-acting opioids)', 'Low initial dose; accumulates over ~5 days, so deaths cluster early when titrated too fast', 'Requires 7–10 days opioid-free (longer after methadone/buprenorphine)'],
            ['Safety', 'Ceiling on respiratory depression (less with sedatives/alcohol); precipitated withdrawal if started too early', 'QTc prolongation (ECG); many CYP interactions', 'Overdose risk if stopped (lost tolerance); induction hurdle'],
            ['Dose', 'Typically 16–24 mg/day; **FDA labeling (2024–25) no longer implies a 24 mg ceiling**', 'Titrate to stop withdrawal and craving', '380 mg IM monthly'],
          ],
        },
        {
          type: 'list',
          title: 'Buprenorphine starts in the fentanyl era',
          items: [
            'Fentanyl is lipophilic and lingers, so **precipitated withdrawal** is more common with standard starts.',
            'Options: wait for clearer withdrawal (COWS ≥8–12 or higher); **high-dose initiation** in the ED; or **low-dose ("micro") initiation**, overlapping tiny buprenorphine doses while full agonists continue.',
            'If precipitated withdrawal occurs, the usual fix is **more buprenorphine** plus symptomatic medication, not stopping.',
            'Long-acting injectable buprenorphine (weekly or monthly) improves adherence and diversion concerns.',
          ],
        },
        {
          type: 'list',
          title: 'Naloxone and harm reduction',
          items: [
            'Offer naloxone to everyone with OUD or opioid exposure and to their families. 4 mg nasal naloxone has been available **over the counter since 2023**.',
            'Fentanyl may need repeated doses; re-sedation can occur as naloxone wears off, so observe. Nalmefene nasal spray is longer acting.',
            'Xylazine adulteration: naloxone does not reverse it, but still give naloxone for the opioid component; support breathing; wound care.',
            'Fentanyl test strips, syringe services, "never use alone" strategies.',
          ],
        },
        {
          type: 'list',
          title: 'Other essentials',
          items: [
            'Withdrawal symptom relief (lofexidine, clonidine, loperamide, antiemetics, NSAIDs) is not treatment of OUD.',
            'Pregnancy: continue or start buprenorphine or methadone; do not detoxify. Neonatal opioid withdrawal syndrome is treatable and preferable to maternal relapse.',
            'X:BOT: once started, XR-naltrexone and buprenorphine-naloxone performed similarly, but many patients could not complete naltrexone induction.',
          ],
        },
      ],
      refs: ['asam-oud-2020', 'sordo-2017', 'larochelle-2018', 'xwaiver-2023', 'fda-bup-2024', 'xbot-2018', 'cows-2003'],
      check: [
        {
          id: 'sud-oud-1',
          q: 'A man who used fentanyl 6 hours ago (COWS 4) wants buprenorphine now. What is the main risk of a standard 8 mg start right now?',
          options: ['Respiratory depression', 'Precipitated withdrawal', 'Serotonin syndrome', 'QTc prolongation'],
          answer: 1,
          why: 'High-affinity partial agonism displaces the full agonist. Wait for more withdrawal (COWS ≥8–12) or use a low-dose or high-dose initiation protocol.',
        },
        {
          id: 'sud-oud-2',
          q: 'Which statement about opioid "detox" alone is most accurate?',
          options: ['It is the preferred first step before MOUD', 'It reduces overdose mortality', 'It increases overdose risk after discharge because tolerance is lost', 'It is required before buprenorphine'],
          answer: 2,
          why: 'Withdrawal management without ongoing MOUD is followed by high relapse and overdose risk.',
        },
      ],
    },
    {
      id: 'others',
      title: 'Stimulants, cannabis, nicotine and benzodiazepines',
      lead: 'Contingency management for stimulants, varenicline for tobacco, slow tapers for benzodiazepines.',
      blocks: [
        {
          type: 'list',
          title: 'Stimulants',
          items: [
            'Acute intoxication: benzodiazepines for agitation, hypertension and tachycardia; active cooling; ECG and troponin for chest pain; avoid physical struggle (hyperthermia, rhabdomyolysis). Traditional teaching avoids pure beta-blockers in acute cocaine toxicity.',
            'Stimulant-induced psychosis usually clears within days to weeks of abstinence; persistence beyond ~1 month suggests a primary psychotic disorder.',
            'Stimulant use disorder: **contingency management** has the strongest evidence; CBT and the community reinforcement approach help. No FDA-approved medication. For methamphetamine, bupropion + XR-naltrexone showed modest benefit (ADAPT-2).',
          ],
        },
        {
          type: 'list',
          title: 'Cannabis',
          items: [
            'Daily use of high-potency cannabis is associated with roughly five times the odds of psychotic disorder (EU-GEI); risk is higher with adolescent onset.',
            '**Cannabinoid hyperemesis syndrome**: cyclic vomiting with compulsive hot showers in chronic users. Treat with cessation (definitive), topical capsaicin, haloperidol or droperidol; opioids are ineffective.',
            'Cannabis use disorder: CBT, motivational enhancement, contingency management; no approved medication.',
          ],
        },
        {
          type: 'list',
          title: 'Tobacco',
          items: [
            'Smoking is the leading cause of the shortened life expectancy in serious mental illness.',
            '**Varenicline** is the most effective single agent and is safe in people with psychiatric disorders (EAGLES; FDA removed the boxed warning in 2016). Combination NRT (patch + short-acting) is comparably effective; bupropion is an alternative.',
            'Remember: quitting smoking raises clozapine and olanzapine levels.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Benzodiazepine tapering (Joint Clinical Practice Guideline, 2025)',
          items: [
            'Taper when risks outweigh benefits; reassess benefit and risk at least every 3 months.',
            'Typical initial pace: **reduce 5–10% every 2–4 weeks**, generally **not exceeding 25% every 2 weeks**; slow down near the end and individualize.',
            'Never stop abruptly after long-term use (seizure risk). Support with CBT (for insomnia and anxiety) and shared decision-making.',
          ],
        },
      ],
      refs: ['asam-stim-2023', 'adapt2-2021', 'diforti-2019', 'eagles-2016', 'asam-bzd-2025', 'fda-benzo-2020'],
      check: [
        {
          id: 'sud-oth-1',
          q: 'Strongest-evidence treatment for stimulant use disorder?',
          options: ['Disulfiram', 'Contingency management', 'Naltrexone alone', 'Long-term benzodiazepines'],
          answer: 1,
          why: 'Contingency management (incentives for verified abstinence) is the best-supported intervention.',
        },
      ],
    },
    {
      id: 'mi',
      title: 'Motivational interviewing',
      lead: 'People are more persuaded by what they hear themselves say.',
      blocks: [
        {
          type: 'list',
          title: 'Spirit (4th ed.): partnership, acceptance, compassion, empowerment',
          items: [
            '**Four processes**: engaging → focusing → evoking → planning.',
            '**OARS skills**: Open questions, Affirmations, Reflections (aim for more reflections than questions), Summaries.',
            '**Change talk (DARN-CAT)**: Desire, Ability, Reasons, Need (preparatory) → Commitment, Activation, Taking steps (mobilizing). Evoke it, reflect it, and summarize it back.',
            '**Resist the righting reflex**: arguing for change provokes sustain talk ("yes, but…").',
          ],
        },
        {
          type: 'reveal',
          prompt: 'Patient: "I know I drink too much, but it\'s the only way I can sleep." Convert the righting reflex ("You need to stop drinking") into an MI response.',
          answer: '**Double-sided reflection**: "On one hand, you\'re worried about how much you\'re drinking; on the other, it feels like the only thing that helps you sleep." Then evoke: "What would you want your sleep to look like if alcohol weren\'t part of it?"',
        },
      ],
      refs: ['mi-2023'],
    },
  ],
  takeaways: [
    'Tolerance and withdrawal from prescribed medication do not count toward SUD criteria.',
    'Alcohol, benzodiazepine and GHB withdrawal can be fatal: treat early with benzodiazepines or phenobarbital.',
    'Thiamine for everyone at risk; high-dose IV for suspected Wernicke; never withhold glucose from hypoglycemia.',
    'MOUD (buprenorphine, methadone) halves mortality; detox alone raises overdose risk. No X-waiver needed since 2023.',
    'Naltrexone or acamprosate for AUD; contingency management for stimulants; varenicline for tobacco.',
    'Benzodiazepine tapers: start at 5–10% every 2–4 weeks.',
  ],
  flashcards: [
    { id: 'fc-sud-1', front: 'SUD severity by criteria count', back: 'Mild 2–3, moderate 4–5, severe ≥6 (of 11, within 12 months).' },
    { id: 'fc-sud-2', front: 'Alcohol withdrawal timeline', back: 'Minor symptoms 6–36 h; seizures 6–48 h; hallucinosis 12–48 h; delirium tremens 48–96 h.' },
    { id: 'fc-sud-3', front: 'CIWA-Ar severity bands (ASAM 2020)', back: '<10 mild, 10–18 moderate, ≥19 severe.' },
    { id: 'fc-sud-4', front: 'Alcohol withdrawal agents that do NOT prevent seizures/DTs', back: 'Clonidine, dexmedetomidine, beta-blockers (adjuncts only).' },
    { id: 'fc-sud-5', front: 'How often is the full Wernicke triad present?', back: 'Only a minority (~16% in an autopsy series); use Caine criteria and treat empirically.' },
    { id: 'fc-sud-6', front: 'Alcoholic hallucinosis vs delirium tremens', back: 'Hallucinosis: hallucinations with a clear sensorium and stable vitals (12–48 h). DTs: delirium + autonomic hyperactivity (48–96 h).' },
    { id: 'fc-sud-7', front: 'First-line medications for AUD', back: 'Naltrexone and acamprosate.' },
    { id: 'fc-sud-8', front: 'Naltrexone vs acamprosate: organ to check', back: 'Naltrexone: liver (avoid in acute hepatitis/failure) and opioids. Acamprosate: kidney (avoid if CrCl ≤30).' },
    { id: 'fc-sud-9', front: 'When to start buprenorphine (standard induction)', back: 'When in objective withdrawal: COWS ≥8–12, usually ≥12–24 h after short-acting opioids.' },
    { id: 'fc-sud-10', front: 'Treatment of buprenorphine-precipitated withdrawal', back: 'Usually more buprenorphine plus symptomatic medications.' },
    { id: 'fc-sud-11', front: 'X-waiver status', back: 'Eliminated January 2023: any DEA Schedule III registrant may prescribe buprenorphine for OUD.' },
    { id: 'fc-sud-12', front: 'XR-naltrexone requirement before starting', back: '7–10 days opioid-free (longer after methadone or buprenorphine).' },
    { id: 'fc-sud-13', front: 'PCP intoxication clue', back: 'Vertical (and horizontal) nystagmus, agitation/violence, analgesia, hyperthermia.' },
    { id: 'fc-sud-14', front: 'Cannabinoid hyperemesis syndrome treatment', back: 'Cessation (definitive), topical capsaicin, haloperidol/droperidol; opioids ineffective.' },
    { id: 'fc-sud-15', front: 'Most effective single smoking-cessation drug', back: 'Varenicline (safe in psychiatric patients per EAGLES).' },
    { id: 'fc-sud-16', front: 'Benzodiazepine taper starting pace (2025 guideline)', back: '5–10% every 2–4 weeks; generally not more than 25% every 2 weeks.' },
    { id: 'fc-sud-17', front: 'DARN-CAT', back: 'Desire, Ability, Reasons, Need, Commitment, Activation, Taking steps: types of change talk.' },
    { id: 'fc-sud-18', front: 'Strongest evidence for stimulant use disorder', back: 'Contingency management.' },
  ],
}
