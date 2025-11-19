import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertCircle } from 'lucide-react'

export function PTSD_OCD() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">PTSD, Trauma & OCD</h1>
        <p className="text-lg text-muted-foreground">
          Trauma-related disorders and obsessive-compulsive spectrum conditions
        </p>
      </div>

      {/* PTSD */}
      <Card>
        <CardHeader>
          <CardTitle>Post-Traumatic Stress Disorder (PTSD)</CardTitle>
          <CardDescription>Response to traumatic event with re-experiencing, avoidance, and hyperarousal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Diagnostic Criteria</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Exposure to actual or threatened death, serious injury, or sexual violence (direct, witnessed, learned about close other, or repeated exposure)
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              Symptoms in 4 clusters for {'>'}1 month with functional impairment:
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">1. Intrusion Symptoms (≥1 required)</h3>
            <div className="grid md:grid-cols-2 gap-2">
              <Badge variant="outline">Recurrent intrusive memories</Badge>
              <Badge variant="outline">Traumatic nightmares</Badge>
              <Badge variant="outline">Dissociative reactions (flashbacks)</Badge>
              <Badge variant="outline">Intense distress to trauma cues</Badge>
              <Badge variant="outline">Physiological reactions to reminders</Badge>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">2. Avoidance (≥1 required)</h3>
            <div className="space-y-1 text-sm">
              <p>• Avoidance of trauma-related thoughts/feelings</p>
              <p>• Avoidance of external reminders (people, places, activities)</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">3. Negative Alterations in Cognition/Mood (≥2 required)</h3>
            <div className="grid md:grid-cols-2 gap-2">
              <Badge variant="outline">Inability to recall trauma details</Badge>
              <Badge variant="outline">Negative beliefs ("I'm bad," "world is dangerous")</Badge>
              <Badge variant="outline">Distorted blame of self/others</Badge>
              <Badge variant="outline">Persistent negative emotional state</Badge>
              <Badge variant="outline">Diminished interest in activities</Badge>
              <Badge variant="outline">Detachment from others</Badge>
              <Badge variant="outline">Inability to feel positive emotions</Badge>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">4. Alterations in Arousal/Reactivity (≥2 required)</h3>
            <div className="grid md:grid-cols-2 gap-2">
              <Badge variant="outline">Irritability/angry outbursts</Badge>
              <Badge variant="outline">Reckless/self-destructive behavior</Badge>
              <Badge variant="outline">Hypervigilance</Badge>
              <Badge variant="outline">Exaggerated startle response</Badge>
              <Badge variant="outline">Concentration problems</Badge>
              <Badge variant="outline">Sleep disturbance</Badge>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Treatment</h3>
            <div className="space-y-2 text-sm">
              <p><strong>First-line therapy:</strong> Trauma-focused CBT (TF-CBT) or Eye Movement Desensitization and Reprocessing (EMDR)</p>
              <p><strong>First-line medications:</strong> SSRIs (sertraline, paroxetine) or SNRIs (venlafaxine)</p>
              <p><strong>Prazosin:</strong> Alpha-1 blocker; may reduce trauma nightmares (evidence mixed)</p>
              <p><strong>Combination:</strong> Psychotherapy + medication often most effective</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Acute Stress Disorder */}
      <Card>
        <CardHeader>
          <CardTitle>Acute Stress Disorder</CardTitle>
          <CardDescription>Similar to PTSD but occurs 3 days to 1 month after trauma</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Similar symptom clusters to PTSD (intrusion, avoidance, arousal, negative mood/cognition) but duration
            is <strong>3 days to 1 month</strong> post-trauma. If symptoms persist beyond 1 month, diagnosis becomes PTSD.
          </p>
          <div>
            <h3 className="font-semibold mb-2">Treatment</h3>
            <p className="text-sm">
              Early trauma-focused CBT can prevent progression to PTSD. Supportive therapy, psychoeducation,
              stress management. Short-term medications if needed (SSRIs, short course of benzodiazepines for severe anxiety).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* OCD */}
      <Card>
        <CardHeader>
          <CardTitle>Obsessive-Compulsive Disorder (OCD)</CardTitle>
          <CardDescription>Obsessions and/or compulsions causing significant distress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Obsessions</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Recurrent, persistent, intrusive thoughts, urges, or images that cause anxiety/distress.
              Person attempts to ignore, suppress, or neutralize them.
            </p>
            <div className="space-y-1 text-sm">
              <p><strong>Common themes:</strong></p>
              <ul className="list-disc list-inside">
                <li>Contamination fears</li>
                <li>Fears of harm to self/others</li>
                <li>Symmetry/order concerns</li>
                <li>Forbidden/taboo thoughts (sexual, religious, violent)</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Compulsions</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Repetitive behaviors or mental acts performed in response to obsessions or according to rigid rules,
              aimed at reducing anxiety or preventing feared outcome.
            </p>
            <div className="space-y-1 text-sm">
              <p><strong>Common compulsions:</strong></p>
              <ul className="list-disc list-inside">
                <li>Washing/cleaning</li>
                <li>Checking (locks, appliances, etc.)</li>
                <li>Counting, repeating</li>
                <li>Ordering/arranging</li>
                <li>Mental rituals (praying, counting, repeating words)</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-500">OCD vs Psychosis</h3>
            <p className="text-sm">
              <strong>Key difference:</strong> In OCD, the person recognizes obsessions as products of their own mind
              (insight present, though may vary). In psychosis, delusions are held with fixed conviction without insight.
              OCD thoughts are ego-dystonic (unwanted), while delusions are ego-syntonic (consistent with self).
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Treatment: Combination Most Effective</h3>
            <div className="space-y-2 text-sm">
              <p><strong>First-line therapy:</strong> Exposure and Response Prevention (ERP)—a type of CBT involving gradual
              exposure to feared stimuli while preventing compulsive responses. Highly effective.</p>
              <p><strong>First-line medications:</strong> SSRIs at higher doses than for depression (e.g., fluoxetine 40-80mg,
              sertraline 150-200mg). Clomipramine (tricyclic) also effective but more side effects.</p>
              <p><strong>Timeline:</strong> Medication response may take 8-12 weeks at therapeutic dose</p>
              <p><strong>Combination:</strong> ERP + SSRI superior to either alone for moderate-severe OCD</p>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
              <AlertCircle className="h-4 w-4" />
              Treatment-Resistant OCD
            </h3>
            <p className="text-sm">
              If inadequate response to multiple SSRI trials + ERP, consider: switching to clomipramine, augmentation
              with antipsychotics (aripiprazole, risperidone), or intensive ERP programs. Severe cases may benefit
              from consultation for deep brain stimulation or other interventions.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Related Disorders */}
      <Card>
        <CardHeader>
          <CardTitle>Related Obsessive-Compulsive Spectrum Disorders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Body Dysmorphic Disorder (BDD)</h3>
            <p className="text-sm text-muted-foreground">
              Preoccupation with perceived defects/flaws in appearance that are not observable or appear slight to others.
              Repetitive behaviors (mirror checking, excessive grooming, reassurance-seeking) or mental acts (comparing appearance).
              Treatment: CBT + SSRIs (higher doses as in OCD).
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Hoarding Disorder</h3>
            <p className="text-sm text-muted-foreground">
              Persistent difficulty discarding possessions regardless of value, due to perceived need to save items and
              distress associated with discarding. Results in accumulation that clutters living areas and impairs function.
              Treatment: Specialized CBT for hoarding; SSRIs may help.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Trichotillomania (Hair-Pulling Disorder)</h3>
            <p className="text-sm text-muted-foreground">
              Recurrent pulling out of one's hair resulting in hair loss, despite attempts to decrease/stop.
              Treatment: Habit reversal training (a type of CBT), N-acetylcysteine may help.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Excoriation (Skin-Picking) Disorder</h3>
            <p className="text-sm text-muted-foreground">
              Recurrent skin picking resulting in lesions, despite attempts to stop.
              Treatment: Habit reversal training, SSRIs.
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
              <span>PTSD: Trauma-focused psychotherapy (TF-CBT, EMDR) is first-line; SSRIs/SNRIs also effective</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Early intervention after trauma (acute stress disorder) can prevent progression to PTSD</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>OCD requires higher SSRI doses than depression—don't underdose</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>ERP (Exposure and Response Prevention) is gold standard for OCD—refer for specialized CBT</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Distinguish OCD from psychosis: OCD patients have insight that thoughts are their own (usually)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Screen PTSD patients for comorbid depression, substance use, and suicide risk</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
