# Content audit (November 2026)

Every v1 claim was checked against current sources. This log lists the material errors fixed, the blind spots filled, and the 2023–2026 developments added. Regression tests in `src/content/content.test.ts` guard the most consequential fixes.

## Errors corrected

| # | v1 statement | Problem | Now | Source |
|---|---|---|---|---|
| 1 | Aripiprazole "FDA-approved for bipolar depression" | Failed in bipolar depression trials; not approved | Approved: quetiapine, lurasidone, cariprazine, lumateperone, olanzapine-fluoxetine | CANMAT/ISBD 2018; labels |
| 2 | Outpatient care appropriate when "able to contract for safety" | No-suicide contracts have no protective evidence | Collaborative Safety Planning Intervention + lethal-means counseling + follow-up | Stanley 2018; NICE NG225 |
| 3 | "When in doubt, hospitalize" | Not evidence-based; admission has risks | Least-restrictive safe setting with a documented formulation | NICE NG225; Chung 2017 |
| 4 | Risk tiers presented as prediction | Risk scales have low PPV | Formulation (status, state, resources, foreseeable change); tiers guide intervention only | Large 2016; Pisani 2016; NICE NG225 |
| 5 | "National Suicide Prevention Lifeline" | Renamed in 2022 | 988 Suicide & Crisis Lifeline | 988lifeline.org |
| 6 | Acute stress disorder: "short course of benzodiazepines" | Benzodiazepines are recommended against after trauma/PTSD | Brief trauma-focused CBT; no benzodiazepines; no universal debriefing | VA/DoD 2023; Guina 2015 |
| 7 | Agitation: "ziprasidone (not with lorazepam—QTc risk)" | Wrong pairing | Avoid **IM olanzapine with parenteral benzodiazepines** (cardiorespiratory depression) | Project BETA 2012; label |
| 8 | Switch after "no response at 8–12 weeks" | Too late | <20–25% improvement at 2–4 weeks → optimize/switch; adequate trial 6–8 weeks | CANMAT 2023; Szegedi 2009 |
| 9 | Lithium range "0.6–1.2" for everyone | Outdated | Maintenance 0.6–0.8; mania 0.8–1.2; older adults 0.4–0.8 / 0.4–0.7; calcium monitoring; EXTRIP dialysis criteria; charcoal ineffective | ISBD/IGSLi 2019; EXTRIP 2015 |
| 10 | Clozapine "weekly CBC 6 months, then biweekly" | Incomplete; REMS since removed | ANC weekly ×6 mo → every 2 wk to 12 mo → monthly; REMS removed 2025; myocarditis, ileus, smoking interaction | FDA 2025; APA 2020 |
| 11 | "Use atypical antipsychotics first" | SGAs not uniformly superior | Choose by side-effect profile; consider LAIs early; clozapine after 2 failed trials | Huhn 2019; APA 2020; TRRIP 2017 |
| 12 | "Always give thiamine BEFORE glucose" | Can delay treatment of hypoglycemia | Never withhold glucose; give both; high-dose IV thiamine for suspected Wernicke (triad in a minority) | ASAM 2020; Harper 1986; Caine 1997 |
| 13 | Opioid withdrawal "NOT dangerous" | Misses the main lethal risk | Rarely directly fatal, but detox without MOUD → lost tolerance → overdose; MOUD roughly halves mortality | Sordo 2017; Larochelle 2018 |
| 14 | "MAT"; buprenorphine requires specialized prescribers; implied 24 mg ceiling | Outdated | MOUD; X-waiver removed (2023); FDA labeling no longer implies a maximum (2024–25); fentanyl-era initiation | ASAM 2020; FDA 2024 |
| 15 | Alcohol withdrawal: seizures 12–48 h, hallucinosis 12–24 h | Timing off | Seizures 6–48 h, hallucinosis 12–48 h, DTs 48–96 h; CIWA-Ar bands <10 / 10–18 / ≥19; phenobarbital; adjuncts don't prevent seizures | ASAM 2020 |
| 16 | "Delusions are ego-syntonic; OCD has insight" | Oversimplified | OCD with absent insight/delusional beliefs remains OCD | DSM-5-TR |
| 17 | Desvenlafaxine "does not require hepatic metabolism" | Inaccurate | Minimal CYP450 interactions | Label |
| 18 | Psychotic depression: "consider antipsychotic augmentation" | Under-treats | Antidepressant + antipsychotic, or ECT | STOP-PD 2009; CANMAT 2023 |
| 19 | PTSD first-line "TF-CBT or EMDR" | TF-CBT is the pediatric model | Adults: CPT, PE, EMDR (also WET); youth: TF-CBT | VA/DoD 2023 |
| 20 | Schizoaffective criteria | Missing "mood episodes for the majority of the illness" | Added | DSM-5-TR |
| 21 | Prazosin "may reduce nightmares" | Largest RCT negative | Suggested for nightmares only; suggested against for global PTSD | Raskind 2018; VA/DoD 2023 |
| 22 | Tardive dyskinesia "consider VMAT2 inhibitors" | Understated | VMAT2 inhibitors first-line for disabling TD; stop anticholinergics | APA 2020 |
| 23 | Carbamazepine without HLA screening | Safety gap | HLA-B*15:02 before carbamazepine in Asian ancestry | Label; CPIC |
| 24 | Benzodiazepine taper "over weeks to months" | Vague | 5–10% every 2–4 weeks, ≤25% per 2 weeks, individualized | Joint guideline 2025 |
| 25 | Diagnostic tool counted symptom matches (e.g., hypervigilance → GAD) | Not how diagnosis works | Rule engine: safety → medical/substance → episode and duration logic | DSM-5-TR |
| 26 | Several boxed warnings missing (clozapine, antidepressants, antipsychotics) | Incomplete | Class-wide boxed warnings enforced by tests | Labels |

## Blind spots filled

- New module **Emergencies & Medical Mimics**: delirium (CAM/4AT, why antipsychotics don't shorten it), catatonia (lorazepam/ECT), serotonin syndrome vs NMS vs anticholinergic vs sympathomimetic vs malignant hyperthermia, anti-NMDAR encephalitis, capacity, involuntary treatment, duty to protect.
- Mood: specifiers that change management, mixed features, PMDD, perinatal spectrum, older adults and youth, measurement-based care, TRD options.
- Anxiety: agoraphobia, separation anxiety, exposure mechanics (inhibitory learning, safety behaviors).
- Trauma: prolonged grief disorder (DSM-5-TR), adjustment disorder; OCD look-alikes; BDD suicide risk.
- Substance use: screening questions, DSM-5-TR severity, urine drug screen limits, GHB, synthetic cannabinoids, xylazine, cannabinoid hyperemesis, tobacco (varenicline/EAGLES), motivational interviewing (4th ed.).
- Pharmacology: CYP inhibitors/inducers, pharmacogenomics, discontinuation evidence (Henssler 2024) and hyperbolic tapering, valproate hyperammonemia, lamotrigine re-titration and estrogen interaction, pregnancy/lactation table.

## 2023–2026 developments included

Lumateperone adjunct for MDD (2025) · esketamine monotherapy for TRD (2025) · xanomeline–trospium (2024) · milsaperidone (2026) · monthly subcutaneous olanzapine LAI (2026) · clozapine REMS removal (2025) · brexpiprazole + sertraline for PTSD declined (2025) · MDMA-assisted therapy not approved; psilocybin under review · zuranolone for PPD (2023) · iloperidone for bipolar mania (2024) · OTC naloxone (2023) · X-waiver removal (2023) · buprenorphine labeling update (2024–25) · joint benzodiazepine tapering guideline (2025) · NICE NG225 on risk tools (2022).
