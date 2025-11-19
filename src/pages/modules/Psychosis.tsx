import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export function Psychosis() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Psychosis & Schizophrenia Spectrum</h1>
        <p className="text-lg text-muted-foreground">
          Recognition and management of psychotic disorders and antipsychotic medications
        </p>
      </div>

      {/* Psychotic Symptoms Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Positive vs Negative Symptoms</CardTitle>
          <CardDescription>Core symptom dimensions in schizophrenia spectrum disorders</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Positive Symptoms (Presence of abnormal experiences)</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Hallucinations:</strong> Auditory most common (voices commenting, conversing); also visual, tactile, olfactory</p>
              <p><strong>Delusions:</strong> Fixed false beliefs (persecutory, grandiose, referential, somatic, thought insertion/withdrawal/broadcasting)</p>
              <p><strong>Disorganized speech:</strong> Tangentiality, loose associations, word salad, neologisms</p>
              <p><strong>Disorganized/catatonic behavior:</strong> Unpredictable agitation, bizarre postures, waxy flexibility</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Negative Symptoms (Absence of normal functions)</h3>
            <div className="grid md:grid-cols-2 gap-2">
              <Badge variant="outline">Flat affect (diminished emotional expression)</Badge>
              <Badge variant="outline">Alogia (poverty of speech)</Badge>
              <Badge variant="outline">Avolition (lack of motivation)</Badge>
              <Badge variant="outline">Anhedonia (inability to feel pleasure)</Badge>
              <Badge variant="outline">Social withdrawal</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Negative symptoms often more disabling long-term and less responsive to medications
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Schizophrenia */}
      <Card>
        <CardHeader>
          <CardTitle>Schizophrenia</CardTitle>
          <CardDescription>Chronic psychotic disorder with functional decline</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Diagnostic Criteria</h3>
            <p className="text-sm text-muted-foreground mb-2">
              ≥2 of the following for ≥1 month (at least one must be 1, 2, or 3):
            </p>
            <ul className="list-decimal list-inside space-y-1 text-sm">
              <li>Delusions</li>
              <li>Hallucinations</li>
              <li>Disorganized speech</li>
              <li>Grossly disorganized or catatonic behavior</li>
              <li>Negative symptoms</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              Plus: Continuous signs ≥6 months, functional decline, not due to substance or medical condition
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">First-Episode Psychosis Evaluation</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Medical workup: CBC, CMP, TSH, B12, toxicology, brain imaging (MRI/CT)</li>
              <li>Rule out: Substance-induced, medical causes (autoimmune encephalitis, seizures, tumors), mood disorder with psychotic features</li>
              <li>Assess for safety: Disorganization, command hallucinations, paranoia with agitation</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Brief Psychotic Disorder & Schizophreniform */}
      <Card>
        <CardHeader>
          <CardTitle>Brief Psychotic Disorder & Schizophreniform Disorder</CardTitle>
          <CardDescription>Time-limited psychotic episodes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Brief Psychotic Disorder</h3>
            <p className="text-sm text-muted-foreground">
              Psychotic symptoms lasting <strong>≥1 day but {'<'}1 month</strong> with eventual return to baseline.
              Often precipitated by severe stressor. Treated with antipsychotics; usually resolves fully.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Schizophreniform Disorder</h3>
            <p className="text-sm text-muted-foreground">
              Same symptoms as schizophrenia but duration <strong>1-6 months</strong>. If symptoms persist beyond
              6 months, diagnosis changes to schizophrenia. Better prognosis than schizophrenia.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Schizoaffective Disorder */}
      <Card>
        <CardHeader>
          <CardTitle>Schizoaffective Disorder</CardTitle>
          <CardDescription>Psychosis + mood episodes</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Uninterrupted period of illness with major mood episode (depressive or manic) concurrent with
            schizophrenia criteria, PLUS ≥2 weeks of delusions/hallucinations <em>without</em> prominent mood symptoms.
          </p>
          <div>
            <h3 className="font-semibold mb-2">Treatment</h3>
            <p className="text-sm">
              Antipsychotic + mood stabilizer (if bipolar type) or antidepressant (if depressive type).
              Combination therapy targeting both psychotic and mood symptoms.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Antipsychotic Medications */}
      <Card>
        <CardHeader>
          <CardTitle>Antipsychotic Medication Selection</CardTitle>
          <CardDescription>First-line and special considerations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">First-Line: Atypical (Second-Generation) Antipsychotics</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Risperidone:</strong> Effective; risk of EPS at higher doses, hyperprolactinemia</p>
              <p><strong>Olanzapine:</strong> Highly effective; significant weight gain and metabolic effects</p>
              <p><strong>Quetiapine:</strong> Lower EPS risk; sedating; metabolic effects</p>
              <p><strong>Aripiprazole:</strong> Partial dopamine agonist; lower weight gain; can cause akathisia</p>
              <p><strong>Lurasidone:</strong> Weight-neutral; take with food (350+ calories)</p>
              <p><strong>Ziprasidone:</strong> Weight-neutral; take with food; QTc prolongation risk</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Typical (First-Generation) Antipsychotics</h3>
            <p className="text-sm text-muted-foreground">
              <strong>Haloperidol, fluphenazine, perphenazine:</strong> Effective for positive symptoms but higher
              risk of extrapyramidal symptoms (EPS) and tardive dyskinesia. Generally reserved for specific situations
              or when atypicals fail/not tolerated.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Clozapine: Treatment-Resistant Schizophrenia</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Most effective antipsychotic, especially for treatment-resistant cases (failed ≥2 adequate trials).
              Also reduces suicide risk in schizophrenia.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
              <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-500 mb-1">Requires Monitoring</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Agranulocytosis risk: mandatory weekly CBC for 6 months, then biweekly</li>
                <li>Myocarditis risk (especially first month)</li>
                <li>Seizure risk (dose-related)</li>
                <li>Weight gain, metabolic syndrome</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Antipsychotic Side Effects */}
      <Card>
        <CardHeader>
          <CardTitle>Common Antipsychotic Side Effects</CardTitle>
          <CardDescription>Recognition and management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Extrapyramidal Symptoms (EPS)</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Acute dystonia:</strong> Sudden muscle spasms (neck, eyes). Treat with benztropine or diphenhydramine IM/IV</p>
              <p><strong>Akathisia:</strong> Restlessness, inability to sit still. Reduce dose or add beta-blocker (propranolol) or benzodiazepine</p>
              <p><strong>Parkinsonism:</strong> Tremor, rigidity, bradykinesia. Reduce dose or add anticholinergic (benztropine)</p>
              <p><strong>Tardive dyskinesia:</strong> Late-onset involuntary movements (tongue, face, limbs). Often irreversible; reduce/stop offending agent; consider VMAT2 inhibitors</p>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-red-600 dark:text-red-500">
              <AlertCircle className="h-4 w-4" />
              Neuroleptic Malignant Syndrome (NMS)
            </h3>
            <p className="text-sm mb-2"><strong>Life-threatening emergency:</strong></p>
            <div className="space-y-1 text-sm">
              <p><strong>Symptoms:</strong> Fever, rigidity, altered mental status, autonomic instability (tachycardia, labile BP, diaphoresis)</p>
              <p><strong>Labs:</strong> Elevated CK, leukocytosis</p>
              <p><strong>Management:</strong> Stop antipsychotic immediately, supportive care (ICU), dantrolene or bromocriptine</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Metabolic Side Effects</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Atypical antipsychotics (especially olanzapine, clozapine, quetiapine) can cause:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Weight gain</li>
              <li>Hyperglycemia and diabetes mellitus</li>
              <li>Dyslipidemia</li>
            </ul>
            <p className="text-sm mt-2">
              <strong>Monitoring:</strong> Baseline and periodic weight, fasting glucose, lipid panel
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Other Side Effects</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Hyperprolactinemia (risperidone): galactorrhea, amenorrhea, sexual dysfunction</li>
              <li>QTc prolongation (ziprasidone, thioridazine): baseline ECG recommended</li>
              <li>Sedation (quetiapine, clozapine, olanzapine)</li>
              <li>Anticholinergic effects (clozapine): constipation, dry mouth, urinary retention</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Acute Agitation */}
      <Card>
        <CardHeader>
          <CardTitle>Managing Acute Agitation</CardTitle>
          <CardDescription>De-escalation and pharmacological management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Verbal De-escalation (First-Line)</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Maintain calm, non-threatening demeanor</li>
              <li>Give personal space</li>
              <li>Listen empathically, acknowledge distress</li>
              <li>Offer choices when possible</li>
              <li>Avoid arguing with delusions</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Pharmacological Management</h3>
            <p className="text-sm mb-2">When verbal de-escalation insufficient:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>PO preferred:</strong> Olanzapine, risperidone, haloperidol ± lorazepam</li>
              <li><strong>IM if needed:</strong> Haloperidol ± lorazepam, olanzapine, ziprasidone (not with lorazepam—QTc risk)</li>
              <li>Reassess frequently; avoid over-sedation</li>
            </ul>
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
              <span>First-episode psychosis: always rule out medical/substance causes with thorough workup</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Start low, go slow with antipsychotics—especially in antipsychotic-naive patients</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Monitor for metabolic side effects: baseline and periodic weight, glucose, lipids</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Clozapine is most effective but requires close monitoring—reserve for treatment-resistant cases</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Negative symptoms and cognitive deficits often cause more long-term disability than positive symptoms</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Be alert for NMS—rare but life-threatening; stop antipsychotic immediately if suspected</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
