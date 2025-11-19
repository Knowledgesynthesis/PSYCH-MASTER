import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react'

export function MoodDisorders() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Mood Disorders</h1>
        <p className="text-lg text-muted-foreground">
          Master the diagnosis and treatment of depression, bipolar disorder, and related conditions
        </p>
      </div>

      {/* Major Depressive Disorder */}
      <Card>
        <CardHeader>
          <CardTitle>Major Depressive Disorder (MDD)</CardTitle>
          <CardDescription>Persistent low mood and anhedonia with functional impairment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Diagnostic Criteria (DSM-5-TR Based)
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              ≥5 symptoms for ≥2 weeks, including depressed mood OR anhedonia, plus functional impairment
            </p>
            <div className="grid md:grid-cols-2 gap-2">
              <Badge variant="outline" className="justify-start">Depressed mood most of the day</Badge>
              <Badge variant="outline" className="justify-start">Anhedonia (loss of interest/pleasure)</Badge>
              <Badge variant="outline" className="justify-start">Significant weight change (±5%)</Badge>
              <Badge variant="outline" className="justify-start">Insomnia or hypersomnia</Badge>
              <Badge variant="outline" className="justify-start">Psychomotor agitation/retardation</Badge>
              <Badge variant="outline" className="justify-start">Fatigue or energy loss</Badge>
              <Badge variant="outline" className="justify-start">Worthlessness or guilt</Badge>
              <Badge variant="outline" className="justify-start">Concentration difficulties</Badge>
              <Badge variant="outline" className="justify-start">Suicidal ideation</Badge>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">First-Line Treatment</h3>
            <div className="space-y-2 text-sm">
              <p><strong>SSRIs:</strong> Sertraline, escitalopram, fluoxetine (well-tolerated, broad efficacy)</p>
              <p><strong>SNRIs:</strong> Venlafaxine, duloxetine (consider for comorbid pain)</p>
              <p><strong>Reassessment:</strong> 4-6 weeks for initial response; 8-12 weeks for full effect</p>
              <p><strong>Therapy:</strong> Cognitive-behavioral therapy (CBT) or interpersonal therapy (IPT) highly effective, especially combined with medication</p>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-red-600 dark:text-red-500">
              <AlertCircle className="h-4 w-4" />
              Red Flags
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Suicidal ideation with plan or intent → immediate safety assessment</li>
              <li>Psychotic features → consider antipsychotic augmentation</li>
              <li>Severe functional impairment → may need intensive outpatient or hospitalization</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Bipolar Disorder */}
      <Card>
        <CardHeader>
          <CardTitle>Bipolar Disorder</CardTitle>
          <CardDescription>Episodic mood disturbances: mania/hypomania and depression</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Bipolar I Disorder</h3>
              <p className="text-sm text-muted-foreground mb-2">≥1 manic episode (≥7 days or hospitalization)</p>
              <div className="space-y-1">
                <Badge>Elevated/irritable mood</Badge>
                <Badge>Grandiosity</Badge>
                <Badge>Decreased sleep need</Badge>
                <Badge>Pressured speech</Badge>
                <Badge>Racing thoughts</Badge>
                <Badge>Distractibility</Badge>
                <Badge>Increased goal-directed activity</Badge>
                <Badge>Risky behavior</Badge>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Bipolar II Disorder</h3>
              <p className="text-sm text-muted-foreground mb-2">≥1 hypomanic episode (≥4 days) + ≥1 major depressive episode</p>
              <p className="text-sm">Hypomania: similar symptoms to mania but less severe, no psychosis, no hospitalization needed</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Mood Stabilizer Logic</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Lithium:</strong> Gold standard; proven anti-suicide effect; requires monitoring (levels, renal, thyroid)</p>
              <p><strong>Valproate:</strong> Effective for acute mania; teratogenic (avoid in pregnancy)</p>
              <p><strong>Lamotrigine:</strong> Better for bipolar depression; slow titration to avoid rash</p>
              <p><strong>Atypical antipsychotics:</strong> Quetiapine, lurasidone, aripiprazole (FDA-approved for bipolar depression)</p>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
              <XCircle className="h-4 w-4" />
              Critical Pitfall
            </h3>
            <p className="text-sm">
              <strong>Never start an antidepressant monotherapy in bipolar disorder</strong> without a mood stabilizer—
              risk of inducing mania or rapid cycling. Always screen for prior manic/hypomanic episodes before prescribing antidepressants.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Persistent Depressive Disorder */}
      <Card>
        <CardHeader>
          <CardTitle>Persistent Depressive Disorder (Dysthymia)</CardTitle>
          <CardDescription>Chronic depressed mood ≥2 years (≥1 year in children/adolescents)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Chronic low-grade depression with at least two of: appetite change, sleep disturbance, low energy,
            low self-esteem, poor concentration, hopelessness. Symptoms less severe than MDD but more chronic.
          </p>
          <div>
            <h3 className="font-semibold mb-2">Treatment Approach</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>SSRIs/SNRIs often effective</li>
              <li>Psychotherapy (CBT, IPT) particularly important due to chronicity</li>
              <li>May have superimposed major depressive episodes ("double depression")</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* When to Switch vs Augment */}
      <Card>
        <CardHeader>
          <CardTitle>When to Switch vs Augment</CardTitle>
          <CardDescription>Optimizing antidepressant therapy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Switch (Change Antidepressant)</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>No response after adequate trial (8-12 weeks at therapeutic dose)</li>
              <li>Intolerable side effects</li>
              <li>Consider switching within class or to different mechanism (e.g., SSRI → SNRI or bupropion)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Augment (Add Second Agent)</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Partial response to first agent</li>
              <li>Options: add bupropion, mirtazapine, atypical antipsychotic (aripiprazole, quetiapine), lithium, or thyroid hormone</li>
              <li>Combination therapy may achieve remission when monotherapy fails</li>
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
              <span>Always assess for bipolar disorder before starting antidepressants—ask about manic/hypomanic symptoms</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Suicide risk can increase early in antidepressant treatment—close follow-up essential</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Combination of medication + psychotherapy generally superior to either alone for MDD</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Screen for medical causes: hypothyroidism, anemia, vitamin deficiencies, medications</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
