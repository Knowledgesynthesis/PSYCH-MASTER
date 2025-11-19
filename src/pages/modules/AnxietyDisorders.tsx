import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export function AnxietyDisorders() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Anxiety Disorders</h1>
        <p className="text-lg text-muted-foreground">
          Diagnosis and management of GAD, panic disorder, social anxiety, and phobias
        </p>
      </div>

      {/* Generalized Anxiety Disorder */}
      <Card>
        <CardHeader>
          <CardTitle>Generalized Anxiety Disorder (GAD)</CardTitle>
          <CardDescription>Excessive worry about multiple domains, difficult to control</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Diagnostic Features</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Excessive anxiety/worry ≥6 months about multiple events, difficult to control, with ≥3 associated symptoms
            </p>
            <div className="grid md:grid-cols-2 gap-2">
              <Badge variant="outline">Restlessness</Badge>
              <Badge variant="outline">Easily fatigued</Badge>
              <Badge variant="outline">Difficulty concentrating</Badge>
              <Badge variant="outline">Irritability</Badge>
              <Badge variant="outline">Muscle tension</Badge>
              <Badge variant="outline">Sleep disturbance</Badge>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">First-Line Treatment</h3>
            <div className="space-y-2 text-sm">
              <p><strong>SSRIs/SNRIs:</strong> Escitalopram, paroxetine, sertraline, venlafaxine, duloxetine</p>
              <p><strong>Buspirone:</strong> Non-benzodiazepine anxiolytic; takes 2-4 weeks for effect</p>
              <p><strong>Therapy:</strong> Cognitive-behavioral therapy (CBT) with proven efficacy</p>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
              <AlertCircle className="h-4 w-4" />
              Benzodiazepine Cautions
            </h3>
            <p className="text-sm">
              Avoid long-term benzodiazepines for GAD due to tolerance, dependence, and cognitive effects.
              Reserve for short-term use in crisis or as bridge therapy while starting SSRIs/SNRIs.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Panic Disorder */}
      <Card>
        <CardHeader>
          <CardTitle>Panic Disorder</CardTitle>
          <CardDescription>Recurrent unexpected panic attacks with persistent worry about future attacks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Panic Attack Symptoms</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Abrupt surge of intense fear/discomfort peaking within minutes, with ≥4 symptoms:
            </p>
            <div className="grid md:grid-cols-2 gap-2">
              <Badge variant="outline">Palpitations/tachycardia</Badge>
              <Badge variant="outline">Sweating</Badge>
              <Badge variant="outline">Trembling/shaking</Badge>
              <Badge variant="outline">Shortness of breath</Badge>
              <Badge variant="outline">Feeling of choking</Badge>
              <Badge variant="outline">Chest pain/discomfort</Badge>
              <Badge variant="outline">Nausea/abdominal distress</Badge>
              <Badge variant="outline">Dizziness/lightheadedness</Badge>
              <Badge variant="outline">Chills or heat sensations</Badge>
              <Badge variant="outline">Paresthesias (numbness/tingling)</Badge>
              <Badge variant="outline">Derealization/depersonalization</Badge>
              <Badge variant="outline">Fear of losing control</Badge>
              <Badge variant="outline">Fear of dying</Badge>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Panic Attack vs Panic Disorder</h3>
            <p className="text-sm text-muted-foreground">
              <strong>Panic attacks</strong> can occur in many conditions (GAD, PTSD, phobias, medical conditions).
              <strong> Panic disorder</strong> requires recurrent <em>unexpected</em> panic attacks plus ≥1 month of
              persistent concern about additional attacks or maladaptive behavioral changes (e.g., avoidance).
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Treatment</h3>
            <div className="space-y-2 text-sm">
              <p><strong>SSRIs:</strong> First-line (sertraline, fluoxetine, paroxetine)</p>
              <p><strong>SNRIs:</strong> Venlafaxine also effective</p>
              <p><strong>CBT:</strong> Panic-focused CBT highly effective; interoceptive exposure (controlled exposure to panic sensations)</p>
              <p><strong>Avoid:</strong> Caffeine, stimulants, which can trigger attacks</p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-500">Rule Out Medical Causes</h3>
            <p className="text-sm">
              Panic-like symptoms can result from: hyperthyroidism, pheochromocytoma, cardiac arrhythmias,
              pulmonary embolism, hypoglycemia, substance intoxication/withdrawal. Always consider medical workup.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Social Anxiety Disorder */}
      <Card>
        <CardHeader>
          <CardTitle>Social Anxiety Disorder (Social Phobia)</CardTitle>
          <CardDescription>Marked fear of social situations due to fear of negative evaluation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Key Features</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Fear of social or performance situations where scrutiny may occur</li>
              <li>Fear of showing anxiety symptoms or being negatively evaluated</li>
              <li>Social situations almost always provoke fear/anxiety</li>
              <li>Situations avoided or endured with intense distress</li>
              <li>Duration ≥6 months with functional impairment</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Treatment</h3>
            <div className="space-y-2 text-sm">
              <p><strong>SSRIs/SNRIs:</strong> Paroxetine, sertraline, venlafaxine (first-line)</p>
              <p><strong>CBT:</strong> Cognitive restructuring + graded exposure to feared social situations</p>
              <p><strong>Beta-blockers:</strong> Propranolol for performance anxiety (e.g., public speaking) as needed—not for chronic treatment</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specific Phobias */}
      <Card>
        <CardHeader>
          <CardTitle>Specific Phobia</CardTitle>
          <CardDescription>Excessive fear of specific objects or situations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Common Types</h3>
            <div className="flex flex-wrap gap-2">
              <Badge>Animal (dogs, insects, snakes)</Badge>
              <Badge>Natural environment (heights, storms)</Badge>
              <Badge>Blood-injection-injury</Badge>
              <Badge>Situational (flying, elevators, enclosed spaces)</Badge>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Treatment</h3>
            <p className="text-sm text-muted-foreground">
              <strong>Exposure therapy</strong> is the gold standard—gradual, systematic exposure to the phobic stimulus.
              Medications generally not needed unless phobia causes severe impairment or comorbid with other anxiety disorders.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Principles */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Clinical Pearls</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>SSRIs/SNRIs are first-line for most anxiety disorders; allow 4-6 weeks for initial response</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>CBT is highly effective and should be offered whenever possible, alone or with medication</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Avoid long-term benzodiazepines—high risk of dependence, tolerance, cognitive impairment</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Anxiety disorders commonly co-occur with depression—screen for mood symptoms</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Rule out substance use (caffeine, stimulants) and medical conditions (hyperthyroidism, cardiac issues)</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
