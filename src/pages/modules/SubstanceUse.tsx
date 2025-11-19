import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export function SubstanceUse() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Substance Use Disorders</h1>
        <p className="text-lg text-muted-foreground">
          Recognition and management of intoxication, withdrawal, and substance use disorders
        </p>
      </div>

      {/* Alcohol Use Disorder */}
      <Card>
        <CardHeader>
          <CardTitle>Alcohol Use Disorder & Withdrawal</CardTitle>
          <CardDescription>Most common substance use disorder; withdrawal can be life-threatening</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Alcohol Intoxication</h3>
            <p className="text-sm text-muted-foreground">
              Disinhibition, slurred speech, ataxia, nystagmus, impaired attention/memory, stupor/coma.
              Blood alcohol level correlates with severity.
            </p>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-red-600 dark:text-red-500">
              <AlertCircle className="h-4 w-4" />
              Alcohol Withdrawal: Can Be Life-Threatening
            </h3>
            <p className="text-sm mb-2">
              Onset 6-24 hours after last drink in chronic heavy users. Symptoms:
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Minor withdrawal (6-12 hours):</strong> Tremor, anxiety, sweating, nausea, tachycardia, hypertension</p>
              <p><strong>Seizures (12-48 hours):</strong> Generalized tonic-clonic; usually single, can recur</p>
              <p><strong>Alcoholic hallucinosis (12-24 hours):</strong> Visual/auditory hallucinations with intact orientation</p>
              <p><strong>Delirium tremens (48-96 hours):</strong> Confusion, disorientation, autonomic instability, hallucinations.
              Mortality 5-15% if untreated.</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Management of Alcohol Withdrawal</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Benzodiazepines:</strong> First-line (chlordiazepoxide, lorazepam, diazepam). Prevent seizures and DTs.</p>
              <p><strong>Symptom-triggered dosing:</strong> Use CIWA-Ar scale to guide benzodiazepine dosing</p>
              <p><strong>Thiamine:</strong> Give BEFORE glucose to prevent Wernicke encephalopathy</p>
              <p><strong>Supportive care:</strong> IV fluids, electrolyte repletion (magnesium, potassium, phosphate)</p>
              <p><strong>Setting:</strong> Severe withdrawal or DTs require inpatient management</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Medication-Assisted Treatment for Alcohol Use Disorder</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Naltrexone:</strong> Opioid antagonist; reduces cravings and rewarding effects of alcohol. PO daily or IM monthly.</p>
              <p><strong>Acamprosate:</strong> Modulates glutamate; reduces cravings. Renally excreted (adjust for CKD).</p>
              <p><strong>Disulfiram:</strong> Causes unpleasant reaction if alcohol consumed (flushing, nausea, headache). Requires motivation and monitoring.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opioid Use Disorder */}
      <Card>
        <CardHeader>
          <CardTitle>Opioid Use Disorder</CardTitle>
          <CardDescription>Intoxication, withdrawal, and medication-assisted treatment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Opioid Intoxication</h3>
            <div className="grid md:grid-cols-3 gap-2">
              <Badge variant="outline">Miosis (pinpoint pupils)</Badge>
              <Badge variant="outline">Respiratory depression</Badge>
              <Badge variant="outline">Decreased consciousness</Badge>
              <Badge variant="outline">Euphoria/sedation</Badge>
              <Badge variant="outline">Constipation</Badge>
              <Badge variant="outline">Hypotension</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Overdose management:</strong> Naloxone (Narcan) IM/IV/intranasal. May need repeated doses.
              Monitor for re-sedation as naloxone wears off.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Opioid Withdrawal</h3>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Extremely uncomfortable but NOT life-threatening</strong> (unlike alcohol/benzodiazepine withdrawal).
              Onset 6-12 hours (short-acting) or 24-48 hours (long-acting like methadone).
            </p>
            <div className="grid md:grid-cols-2 gap-2">
              <Badge variant="outline">Dysphoria, anxiety</Badge>
              <Badge variant="outline">Muscle aches, bone pain</Badge>
              <Badge variant="outline">Lacrimation, rhinorrhea</Badge>
              <Badge variant="outline">Dilated pupils, piloerection</Badge>
              <Badge variant="outline">Nausea, vomiting, diarrhea</Badge>
              <Badge variant="outline">Sweating, yawning</Badge>
              <Badge variant="outline">Tachycardia, hypertension</Badge>
            </div>
            <p className="text-sm mt-2">
              <strong>Symptomatic treatment:</strong> Clonidine (for autonomic symptoms), anti-emetics, NSAIDs, loperamide
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-500">Medication-Assisted Treatment (MAT): First-Line</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Buprenorphine (± naloxone):</strong> Partial opioid agonist. Reduces cravings and withdrawal.
              Can be prescribed in office-based settings. Safer than methadone (ceiling effect on respiratory depression).</p>
              <p><strong>Methadone:</strong> Full opioid agonist. Highly effective. Requires specialized clinic for dispensing.
              Risk of respiratory depression, QTc prolongation.</p>
              <p><strong>Naltrexone:</strong> Opioid antagonist (PO daily or IM monthly). Blocks opioid effects.
              Requires detoxification first (must be opioid-free 7-10 days). Risk of precipitating withdrawal if opioids on board.</p>
            </div>
            <p className="text-sm mt-2 font-semibold">
              MAT significantly reduces overdose deaths and improves outcomes—strongly recommended for opioid use disorder.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stimulant Use */}
      <Card>
        <CardHeader>
          <CardTitle>Stimulant Use Disorders (Cocaine, Amphetamines)</CardTitle>
          <CardDescription>Intoxication can mimic psychosis or mania</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Stimulant Intoxication</h3>
            <div className="grid md:grid-cols-2 gap-2">
              <Badge variant="outline">Euphoria, increased energy</Badge>
              <Badge variant="outline">Tachycardia, hypertension</Badge>
              <Badge variant="outline">Mydriasis (dilated pupils)</Badge>
              <Badge variant="outline">Psychomotor agitation</Badge>
              <Badge variant="outline">Paranoia, psychosis (high doses)</Badge>
              <Badge variant="outline">Hyperthermia, diaphoresis</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Complications:</strong> MI, stroke, arrhythmias, seizures, hyperthermia. Severe intoxication requires
              emergency management (benzodiazepines for agitation, cooling measures, cardiac monitoring).
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Stimulant Withdrawal</h3>
            <p className="text-sm text-muted-foreground">
              Not medically dangerous but very dysphoric. "Crash" with depression, fatigue, hypersomnia, increased appetite,
              anhedonia, intense cravings. Supportive care; no specific pharmacological treatment.
            </p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-yellow-600 dark:text-yellow-500">Stimulant-Induced Psychosis</h3>
            <p className="text-sm">
              Can be indistinguishable from primary psychotic disorder (paranoia, hallucinations, disorganized behavior).
              Key clue: acute onset with recent stimulant use, resolves within days to weeks of abstinence.
              If psychosis persists beyond 1 month of abstinence, consider primary psychotic disorder.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Treatment</h3>
            <p className="text-sm text-muted-foreground">
              No FDA-approved medications for stimulant use disorder. Behavioral therapies (contingency management,
              CBT) most effective. Supportive care, address comorbid psychiatric conditions.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Cannabis */}
      <Card>
        <CardHeader>
          <CardTitle>Cannabis Use Disorder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Intoxication</h3>
            <p className="text-sm text-muted-foreground">
              Euphoria, relaxation, altered time perception, conjunctival injection, increased appetite, dry mouth,
              impaired coordination and memory. High doses can cause anxiety, paranoia, or psychotic symptoms.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Withdrawal</h3>
            <p className="text-sm text-muted-foreground">
              Irritability, anxiety, sleep disturbance, decreased appetite, restlessness. Typically mild.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Cannabis and Psychosis</h3>
            <p className="text-sm text-muted-foreground">
              Heavy cannabis use, especially high-THC products and early-onset use, associated with increased risk
              of psychotic disorders. Can trigger or worsen psychosis in vulnerable individuals.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sedative-Hypnotic Withdrawal */}
      <Card>
        <CardHeader>
          <CardTitle>Sedative-Hypnotic Withdrawal (Benzodiazepines, Barbiturates)</CardTitle>
          <CardDescription>Can be life-threatening, similar to alcohol withdrawal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-red-600 dark:text-red-500">
              <AlertCircle className="h-4 w-4" />
              Potentially Life-Threatening
            </h3>
            <p className="text-sm mb-2">
              Onset hours to days after cessation (depends on half-life). Symptoms:
            </p>
            <div className="space-y-1 text-sm">
              <p>• Anxiety, tremor, insomnia</p>
              <p>• Perceptual disturbances</p>
              <p>• Autonomic hyperactivity (tachycardia, hypertension, diaphoresis)</p>
              <p>• Seizures (grand mal)</p>
              <p>• Delirium</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Management</h3>
            <p className="text-sm text-muted-foreground">
              <strong>Slow taper</strong> is essential to prevent severe withdrawal. Substitute with long-acting benzodiazepine
              (diazepam, chlordiazepoxide) and taper gradually over weeks to months. Abrupt cessation dangerous.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Motivational Interviewing */}
      <Card>
        <CardHeader>
          <CardTitle>Motivational Interviewing</CardTitle>
          <CardDescription>Patient-centered approach to enhance motivation for change</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>Core principles (RULE):</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>R</strong>esist the righting reflex (avoid telling patient what to do)</li>
              <li><strong>U</strong>nderstand patient's motivations (explore their perspective)</li>
              <li><strong>L</strong>isten with empathy (non-judgmental, reflective listening)</li>
              <li><strong>E</strong>mpower the patient (support self-efficacy and autonomy)</li>
            </ul>
            <p className="mt-3">
              Ask open-ended questions, affirm strengths, reflect statements, summarize. Elicit "change talk"
              (patient's own reasons for change). Effective for increasing treatment engagement in substance use disorders.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Pearls */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Clinical Pearls</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Alcohol and benzodiazepine withdrawal can be life-threatening—never let patients quit "cold turkey"</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Opioid withdrawal is extremely uncomfortable but NOT dangerous (unlike alcohol/benzos)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Always give thiamine BEFORE glucose in suspected alcohol use disorder to prevent Wernicke encephalopathy</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Medication-assisted treatment (MAT) for opioid use disorder saves lives—buprenorphine and methadone are first-line</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Stimulant intoxication can mimic mania or psychosis—obtain urine drug screen</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Screen all psychiatric patients for substance use—high comorbidity</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
