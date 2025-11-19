import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export function Psychopharmacology() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Psychopharmacology Mastery</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive guide to psychiatric medications, side effects, and switching strategies
        </p>
      </div>

      {/* SSRIs */}
      <Card>
        <CardHeader>
          <CardTitle>Selective Serotonin Reuptake Inhibitors (SSRIs)</CardTitle>
          <CardDescription>First-line for depression, anxiety, OCD, PTSD</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Common SSRIs</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Sertraline:</strong> Broad indications; well-tolerated; GI side effects common initially</p>
              <p><strong>Escitalopram:</strong> Very well-tolerated; effective for anxiety and depression</p>
              <p><strong>Fluoxetine:</strong> Long half-life (reduced discontinuation symptoms); activating; may help with comorbid bulimia</p>
              <p><strong>Paroxetine:</strong> Sedating; anticholinergic effects; higher discontinuation symptoms (short half-life)</p>
              <p><strong>Citalopram:</strong> Well-tolerated; QTc prolongation at higher doses (max 40mg, 20mg if {'>'}60yo)</p>
              <p><strong>Fluvoxamine:</strong> Used primarily for OCD; significant drug interactions (CYP1A2 inhibitor)</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Common Side Effects</h3>
            <div className="grid md:grid-cols-2 gap-2">
              <Badge variant="outline">GI upset, nausea (usually transient)</Badge>
              <Badge variant="outline">Sexual dysfunction (30-50%)</Badge>
              <Badge variant="outline">Insomnia or sedation</Badge>
              <Badge variant="outline">Headache</Badge>
              <Badge variant="outline">Weight gain (varies by agent)</Badge>
              <Badge variant="outline">Hyponatremia (especially elderly)</Badge>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
              <AlertCircle className="h-4 w-4" />
              SSRI Discontinuation Syndrome
            </h3>
            <p className="text-sm mb-2">
              Abrupt cessation (especially paroxetine, short half-life agents) can cause withdrawal: dizziness, "brain zaps,"
              flu-like symptoms, irritability, insomnia. <strong>Taper slowly</strong> to prevent. Fluoxetine rarely causes due to long half-life.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SNRIs */}
      <Card>
        <CardHeader>
          <CardTitle>Serotonin-Norepinephrine Reuptake Inhibitors (SNRIs)</CardTitle>
          <CardDescription>Dual mechanism; effective for depression, anxiety, neuropathic pain</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Common SNRIs</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Venlafaxine:</strong> Dose-dependent SNRI activity; effective for depression and GAD; can increase BP at higher doses</p>
              <p><strong>Duloxetine:</strong> Effective for depression, GAD, neuropathic pain, fibromyalgia; hepatotoxicity risk (avoid in liver disease)</p>
              <p><strong>Desvenlafaxine:</strong> Active metabolite of venlafaxine; does not require hepatic metabolism</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Side Effects</h3>
            <p className="text-sm text-muted-foreground">
              Similar to SSRIs (GI upset, sexual dysfunction, insomnia) plus: hypertension (monitor BP), urinary hesitancy (duloxetine).
              Discontinuation syndrome can be severe—taper slowly.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Other Antidepressants */}
      <Card>
        <CardHeader>
          <CardTitle>Other Antidepressants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Bupropion</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Norepinephrine-dopamine reuptake inhibitor. <strong>No sexual side effects</strong>; activating (can help fatigue);
              aids smoking cessation. <strong>Contraindicated</strong> in seizure disorders, eating disorders (lowers seizure threshold).
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Mirtazapine</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Alpha-2 antagonist. <strong>Sedating, increases appetite</strong>—useful for depression with insomnia/poor appetite.
              Weight gain common. Lower doses more sedating (paradoxical).
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Tricyclic Antidepressants (TCAs)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Amitriptyline, nortriptyline, imipramine, clomipramine (for OCD). Effective but limited by side effects and toxicity.
            </p>
            <div className="space-y-1 text-sm">
              <p><strong>Side effects:</strong> Anticholinergic (dry mouth, constipation, urinary retention, blurred vision),
              sedation, orthostatic hypotension, weight gain, cardiac conduction delays</p>
              <p><strong>Overdose risk:</strong> Lethal in overdose (cardiac arrhythmias)—avoid in suicidal patients</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">MAO Inhibitors (MAOIs)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Phenelzine, tranylcypromine. Reserved for treatment-resistant depression due to dietary restrictions and drug interactions.
            </p>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm">
              <p className="font-semibold text-red-600 dark:text-red-500 mb-1">Requires Dietary Restrictions</p>
              <p>Avoid tyramine-rich foods (aged cheese, cured meats, wine) → hypertensive crisis. Many drug interactions.
              Must allow washout period when switching to/from other antidepressants (2-5 weeks).</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mood Stabilizers */}
      <Card>
        <CardHeader>
          <CardTitle>Mood Stabilizers</CardTitle>
          <CardDescription>Essential for bipolar disorder management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Lithium</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Gold standard</strong> for bipolar disorder; proven anti-suicide effect; effective for mania and prophylaxis</p>
              <p><strong>Therapeutic range:</strong> 0.6-1.2 mEq/L (acute mania may target higher end)</p>
              <p><strong>Side effects:</strong> Tremor, polyuria/polydipsia (nephrogenic DI), hypothyroidism, weight gain, GI upset, cognitive dulling</p>
              <p><strong>Toxicity:</strong> Narrow therapeutic index. Toxicity causes tremor, confusion, ataxia, seizures, arrhythmias, coma</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mt-2">
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-500 mb-1">Monitoring Requirements</p>
              <ul className="text-sm list-disc list-inside">
                <li>Baseline: renal function (Cr, BUN), TSH, pregnancy test, ECG if indicated</li>
                <li>Levels: check 5 days after initiation/dose change, then q3-6 months</li>
                <li>Renal function and TSH: q6-12 months</li>
                <li>Adjust for renal impairment, drug interactions (NSAIDs, thiazides increase lithium levels)</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Valproate (Divalproex)</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Effective for acute mania,</strong> mixed episodes; less data for maintenance/depression</p>
              <p><strong>Side effects:</strong> GI upset, tremor, sedation, weight gain, hair loss, thrombocytopenia</p>
              <p><strong>Serious risks:</strong> Hepatotoxicity (rare; higher risk in children {'<'}2yo), pancreatitis, PCOS, teratogenic (neural tube defects)</p>
              <p><strong>Monitoring:</strong> Baseline LFTs, CBC; periodic monitoring of levels, LFTs, platelets</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Lamotrigine</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Effective for bipolar depression,</strong> maintenance; less effective for acute mania</p>
              <p><strong>Well-tolerated:</strong> Minimal weight gain or metabolic effects</p>
              <p><strong>Slow titration required</strong> to prevent Stevens-Johnson syndrome (SJS)/TEN—serious rash</p>
              <p>Any rash → discontinue immediately and evaluate. Valproate increases lamotrigine levels (slower titration needed).</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Carbamazepine</h3>
            <p className="text-sm text-muted-foreground">
              Less commonly used for bipolar disorder. Side effects: dizziness, ataxia, hyponatremia, agranulocytosis (rare).
              Many drug interactions (CYP3A4 inducer). Requires monitoring of levels, CBC, LFTs.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Atypical Antipsychotics for Mood */}
      <Card>
        <CardHeader>
          <CardTitle>Atypical Antipsychotics in Mood Disorders</CardTitle>
          <CardDescription>FDA-approved options for bipolar depression and augmentation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>Quetiapine:</strong> FDA-approved for bipolar depression (both bipolar I and II); sedating; metabolic effects</p>
            <p><strong>Lurasidone:</strong> FDA-approved for bipolar depression; take with food (≥350 calories); weight-neutral</p>
            <p><strong>Aripiprazole:</strong> FDA-approved for bipolar mania, maintenance, and MDD augmentation; lower metabolic risk; can cause akathisia</p>
            <p><strong>Olanzapine:</strong> Effective for bipolar mania; combination olanzapine-fluoxetine for bipolar depression; significant weight gain</p>
            <p><strong>Risperidone, Ziprasidone, Asenapine:</strong> FDA-approved for bipolar mania</p>
          </div>
        </CardContent>
      </Card>

      {/* Dangerous Drug Reactions */}
      <Card>
        <CardHeader>
          <CardTitle>Life-Threatening Medication Reactions</CardTitle>
          <CardDescription>Recognition and emergency management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-red-600 dark:text-red-500">Serotonin Syndrome</h3>
            <p className="text-sm mb-2">
              <strong>Cause:</strong> Excess serotonergic activity (SSRIs, SNRIs, MAOIs, tramadol, linezolid, St. John's wort, MDMA)
            </p>
            <p className="text-sm mb-2"><strong>Triad:</strong></p>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>Autonomic instability (fever, tachycardia, labile BP, diaphoresis)</li>
              <li>Neuromuscular hyperactivity (tremor, rigidity, hyperreflexia, clonus, myoclonus)</li>
              <li>Mental status changes (agitation, confusion)</li>
            </ul>
            <p className="text-sm mt-2">
              <strong>Management:</strong> Stop offending agents, supportive care, benzodiazepines, cyproheptadine (serotonin antagonist)
            </p>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-red-600 dark:text-red-500">Neuroleptic Malignant Syndrome (NMS)</h3>
            <p className="text-sm mb-2">
              <strong>Cause:</strong> Antipsychotic use (typical {'>'}  atypical, but can occur with any)
            </p>
            <p className="text-sm mb-2"><strong>Features (FEVER):</strong></p>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li><strong>F</strong>ever</li>
              <li><strong>E</strong>ncephalopathy (confusion, altered consciousness)</li>
              <li><strong>V</strong>ital sign instability (labile BP, tachycardia)</li>
              <li><strong>E</strong>levated enzymes (CK markedly elevated)</li>
              <li><strong>R</strong>igidity ("lead pipe" rigidity)</li>
            </ul>
            <p className="text-sm mt-2">
              <strong>Labs:</strong> Elevated CK (often {'>'}1000), leukocytosis
            </p>
            <p className="text-sm">
              <strong>Management:</strong> Stop antipsychotic immediately, ICU supportive care, dantrolene or bromocriptine
            </p>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-red-600 dark:text-red-500">Lithium Toxicity</h3>
            <p className="text-sm mb-2">
              <strong>Causes:</strong> Overdose, renal impairment, dehydration, NSAIDs, thiazides, ACE inhibitors
            </p>
            <p className="text-sm mb-2"><strong>Symptoms (progressive):</strong></p>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>Mild (1.5-2.0): tremor, nausea, diarrhea, polyuria</li>
              <li>Moderate (2.0-2.5): confusion, slurred speech, ataxia, muscle twitching</li>
              <li>Severe ({'>'}2.5): seizures, coma, arrhythmias, renal failure, death</li>
            </ul>
            <p className="text-sm mt-2">
              <strong>Management:</strong> Stop lithium, IV fluids, hemodialysis if severe
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Switching Strategies */}
      <Card>
        <CardHeader>
          <CardTitle>Antidepressant Switching Strategies</CardTitle>
          <CardDescription>Safe transitions between medications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Direct Switch</h3>
            <p className="text-sm text-muted-foreground">
              Stop first medication, start new medication next day. <strong>Use when:</strong> switching between most SSRIs,
              or when risk of relapse is high. Not appropriate when switching to/from MAOIs.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Taper and Switch</h3>
            <p className="text-sm text-muted-foreground">
              Gradually taper first medication, then start new medication after washout. <strong>Use when:</strong>
              switching to/from MAOIs (requires 2-5 week washout depending on agents), or when direct switch poses interaction risk.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Cross-Taper</h3>
            <p className="text-sm text-muted-foreground">
              Gradually decrease first medication while simultaneously increasing new medication. <strong>Use when:</strong>
              switching from SSRI to SNRI, or when discontinuation symptoms likely. Monitor for serotonin syndrome.
            </p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-yellow-600 dark:text-yellow-500">Special Consideration: Fluoxetine</h3>
            <p className="text-sm">
              Fluoxetine has a long half-life (4-6 days; active metabolite 4-16 days). When switching <em>from</em> fluoxetine
              to another antidepressant or MAOI, allow longer washout period (at least 5 weeks before starting MAOI).
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
              <span>SSRIs and SNRIs: Allow 4-6 weeks for initial response, 8-12 weeks for full effect</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Sexual dysfunction is common with SSRIs/SNRIs—consider bupropion or mirtazapine if problematic</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Lithium requires close monitoring—narrow therapeutic index and serious toxicity risk</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Lamotrigine: slow titration essential to prevent Stevens-Johnson syndrome</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Taper antidepressants slowly to prevent discontinuation syndrome (especially paroxetine, venlafaxine)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Monitor for serotonin syndrome when combining serotonergic agents</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Atypical antipsychotics: monitor metabolic parameters (weight, glucose, lipids)</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
