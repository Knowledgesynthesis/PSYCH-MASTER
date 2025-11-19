import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Shield, AlertCircle } from 'lucide-react'

export function SuicideRisk() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-500 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-red-600 dark:text-red-500 mb-2">Emergency Crisis Resources</h2>
            <p className="text-sm mb-2">
              If you or someone you know is in crisis or having thoughts of suicide:
            </p>
            <ul className="text-sm space-y-1">
              <li><strong>Call 988</strong> - National Suicide Prevention Lifeline (US)</li>
              <li><strong>Call 911</strong> or go to the nearest emergency room</li>
              <li><strong>Text "HELLO" to 741741</strong> - Crisis Text Line</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-2">Suicide Risk Assessment</h1>
        <p className="text-lg text-muted-foreground">
          Systematic evaluation of suicide risk and crisis management strategies
        </p>
      </div>

      {/* Risk Factor Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Risk Factors
          </CardTitle>
          <CardDescription>Factors that increase suicide risk</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Static Risk Factors (Unchangeable)</h3>
            <div className="grid md:grid-cols-2 gap-2">
              <Badge variant="outline">Prior suicide attempt (strongest predictor)</Badge>
              <Badge variant="outline">Male gender (higher completion rate)</Badge>
              <Badge variant="outline">Age {'>'}45 or adolescent</Badge>
              <Badge variant="outline">Family history of suicide</Badge>
              <Badge variant="outline">History of trauma/abuse</Badge>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Dynamic Risk Factors (Modifiable)</h3>
            <div className="grid md:grid-cols-2 gap-2">
              <Badge variant="outline">Active psychiatric illness (depression, psychosis, substance use)</Badge>
              <Badge variant="outline">Acute suicidal ideation with plan and intent</Badge>
              <Badge variant="outline">Recent psychiatric hospitalization or discharge</Badge>
              <Badge variant="outline">Access to lethal means (firearms, medications)</Badge>
              <Badge variant="outline">Severe psychosocial stressors (loss, legal issues)</Badge>
              <Badge variant="outline">Social isolation or lack of support</Badge>
              <Badge variant="outline">Hopelessness (strong predictor)</Badge>
              <Badge variant="outline">Substance intoxication</Badge>
              <Badge variant="outline">Impulsivity or agitation</Badge>
              <Badge variant="outline">Recent suicide of friend/family member</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Protective Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            Protective Factors
          </CardTitle>
          <CardDescription>Factors that reduce suicide risk</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-2">
            <Badge variant="secondary">Strong social support network</Badge>
            <Badge variant="secondary">Sense of responsibility to family</Badge>
            <Badge variant="secondary">Religious/spiritual beliefs</Badge>
            <Badge variant="secondary">Positive therapeutic relationship</Badge>
            <Badge variant="secondary">Reasons for living</Badge>
            <Badge variant="secondary">Problem-solving skills</Badge>
            <Badge variant="secondary">Access to mental health care</Badge>
            <Badge variant="secondary">No access to lethal means</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            <strong>Important:</strong> Protective factors do NOT eliminate risk in high-risk individuals.
            Always assess risk factors alongside protective factors.
          </p>
        </CardContent>
      </Card>

      {/* Assessment Framework */}
      <Card>
        <CardHeader>
          <CardTitle>Systematic Assessment: "IS PATH WARM"</CardTitle>
          <CardDescription>Mnemonic for key suicide warning signs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <span className="font-bold text-primary w-12 flex-shrink-0">I</span>
              <div><strong>Ideation:</strong> Thoughts about suicide, death wishes</div>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary w-12 flex-shrink-0">S</span>
              <div><strong>Substance abuse:</strong> Increased or excessive use</div>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary w-12 flex-shrink-0">P</span>
              <div><strong>Purposelessness:</strong> No reason for living, no sense of purpose</div>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary w-12 flex-shrink-0">A</span>
              <div><strong>Anxiety:</strong> Agitation, insomnia, panic</div>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary w-12 flex-shrink-0">T</span>
              <div><strong>Trapped:</strong> Feeling trapped, no way out</div>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary w-12 flex-shrink-0">H</span>
              <div><strong>Hopelessness:</strong> Loss of hope, nothing will improve</div>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary w-12 flex-shrink-0">W</span>
              <div><strong>Withdrawal:</strong> From friends, family, activities</div>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary w-12 flex-shrink-0">A</span>
              <div><strong>Anger:</strong> Rage, seeking revenge</div>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary w-12 flex-shrink-0">R</span>
              <div><strong>Recklessness:</strong> Risky behavior, seemingly without thinking</div>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary w-12 flex-shrink-0">M</span>
              <div><strong>Mood changes:</strong> Dramatic mood shifts</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Inquiry */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Suicidal Ideation Assessment</CardTitle>
          <CardDescription>Ask directly and without hesitation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Asking about suicide does NOT increase risk—it shows you care and opens dialogue.
          </p>

          <div>
            <h3 className="font-semibold mb-2">Key Questions to Ask</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>Ideation:</strong> "Have you had thoughts of harming yourself or ending your life?"</li>
              <li><strong>Plan:</strong> "Have you thought about how you would do it?"</li>
              <li><strong>Intent:</strong> "Do you intend to act on these thoughts?"</li>
              <li><strong>Means:</strong> "Do you have access to [method mentioned]?"</li>
              <li><strong>Timeline:</strong> "When are you thinking of doing this?"</li>
              <li><strong>Past attempts:</strong> "Have you ever tried to hurt yourself or attempted suicide before?"</li>
              <li><strong>Protective factors:</strong> "What has kept you from acting on these thoughts?"</li>
              <li><strong>Reasons for living:</strong> "What are your reasons for wanting to live?"</li>
            </ul>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-yellow-600 dark:text-yellow-500">High-Risk Features</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Specific, detailed plan</li>
              <li>High lethality method (firearms, hanging, jumping)</li>
              <li>Access to means</li>
              <li>Clear intent to die</li>
              <li>Preparations made (giving away possessions, saying goodbye)</li>
              <li>Recent discharge from psychiatric hospitalization</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Level of Care Determination */}
      <Card>
        <CardHeader>
          <CardTitle>Determining Level of Care</CardTitle>
          <CardDescription>When to hospitalize vs outpatient management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-red-600 dark:text-red-500">Indications for Psychiatric Hospitalization</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Active suicidal ideation with plan and intent</li>
              <li>Recent suicide attempt with ongoing risk</li>
              <li>Unable to contract for safety or maintain safety plan</li>
              <li>Psychosis with command hallucinations to harm self</li>
              <li>Severe depression/mania with impaired judgment</li>
              <li>Lack of adequate social support</li>
              <li>Access to lethal means that cannot be removed</li>
            </ul>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-green-600 dark:text-green-500">Outpatient Management Appropriate When</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Passive suicidal ideation without plan or intent</li>
              <li>Strong protective factors present</li>
              <li>Able to contract for safety</li>
              <li>Reliable social support available</li>
              <li>Willing to remove access to lethal means</li>
              <li>Close follow-up can be arranged (within 24-48 hours)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Safety Planning */}
      <Card>
        <CardHeader>
          <CardTitle>Safety Planning</CardTitle>
          <CardDescription>Collaborative crisis response plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div>
              <strong>Step 1:</strong> Recognize warning signs (thoughts, feelings, situations that precede crisis)
            </div>
            <div>
              <strong>Step 2:</strong> Use internal coping strategies (distraction, relaxation, activities)
            </div>
            <div>
              <strong>Step 3:</strong> Contact people for distraction and support (friends, family)
            </div>
            <div>
              <strong>Step 4:</strong> Contact family members or friends who can help resolve the crisis
            </div>
            <div>
              <strong>Step 5:</strong> Contact mental health professionals (therapist, crisis line: 988)
            </div>
            <div>
              <strong>Step 6:</strong> Go to emergency department or call 911 if imminent danger
            </div>
            <div className="mt-4 pt-4 border-t">
              <strong>Means restriction:</strong> Remove or secure firearms, medications, other lethal means
            </div>
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
            <li><strong>Ask directly:</strong> Never avoid asking about suicide—it does not increase risk</li>
            <li><strong>Hopelessness</strong> is one of the strongest predictors of suicide risk</li>
            <li><strong>Highest risk period:</strong> First week after psychiatric discharge—ensure close follow-up</li>
            <li><strong>Means restriction</strong> saves lives—removing access to lethal means is critical</li>
            <li><strong>Substance use</strong> dramatically increases acute risk through disinhibition and impulsivity</li>
            <li><strong>When in doubt, hospitalize</strong>—err on the side of safety</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
