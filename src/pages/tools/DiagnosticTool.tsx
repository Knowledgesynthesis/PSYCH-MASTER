import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, RefreshCw } from 'lucide-react'

interface Symptom {
  id: string
  text: string
  category: string[]
}

const symptoms: Symptom[] = [
  { id: 'depressed_mood', text: 'Depressed mood most of the day', category: ['depression', 'bipolar_depression'] },
  { id: 'anhedonia', text: 'Loss of interest or pleasure', category: ['depression', 'bipolar_depression'] },
  { id: 'elevated_mood', text: 'Elevated, expansive, or irritable mood', category: ['mania', 'hypomania'] },
  { id: 'grandiosity', text: 'Inflated self-esteem or grandiosity', category: ['mania', 'hypomania'] },
  { id: 'decreased_sleep', text: 'Decreased need for sleep', category: ['mania', 'hypomania'] },
  { id: 'excessive_worry', text: 'Excessive worry difficult to control', category: ['gad'] },
  { id: 'panic_attacks', text: 'Recurrent unexpected panic attacks', category: ['panic'] },
  { id: 'hallucinations', text: 'Auditory or visual hallucinations', category: ['psychosis'] },
  { id: 'delusions', text: 'Fixed false beliefs (delusions)', category: ['psychosis'] },
  { id: 'disorganized_speech', text: 'Disorganized or incoherent speech', category: ['psychosis'] },
  { id: 'intrusive_memories', text: 'Intrusive traumatic memories or flashbacks', category: ['ptsd'] },
  { id: 'avoidance', text: 'Avoidance of trauma reminders', category: ['ptsd'] },
  { id: 'obsessions', text: 'Recurrent intrusive thoughts (obsessions)', category: ['ocd'] },
  { id: 'compulsions', text: 'Repetitive behaviors (compulsions)', category: ['ocd'] },
  { id: 'social_fear', text: 'Fear of social situations and negative evaluation', category: ['social_anxiety'] },
  { id: 'hypervigilance', text: 'Hypervigilance or exaggerated startle', category: ['ptsd', 'gad'] }
]

export function DiagnosticTool() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set())
  const [showResults, setShowResults] = useState(false)

  const toggleSymptom = (id: string) => {
    const newSet = new Set(selectedSymptoms)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setSelectedSymptoms(newSet)
    setShowResults(false)
  }

  const analyzeSuggestions = () => {
    if (selectedSymptoms.size === 0) return []

    const categoryScores: Record<string, { count: number; label: string; description: string }> = {
      depression: { count: 0, label: 'Major Depressive Disorder', description: 'Consider mood disorders module for diagnosis and treatment' },
      mania: { count: 0, label: 'Bipolar I Disorder (Manic Episode)', description: 'Screen for prior depressive episodes; avoid antidepressant monotherapy' },
      hypomania: { count: 0, label: 'Bipolar II Disorder (Hypomanic Episode)', description: 'Requires history of major depressive episode' },
      gad: { count: 0, label: 'Generalized Anxiety Disorder', description: 'Chronic excessive worry across multiple domains' },
      panic: { count: 0, label: 'Panic Disorder', description: 'Recurrent unexpected panic attacks with persistent concern' },
      psychosis: { count: 0, label: 'Psychotic Disorder', description: 'Rule out substance use and medical causes; consider schizophrenia spectrum' },
      ptsd: { count: 0, label: 'Post-Traumatic Stress Disorder', description: 'Requires exposure to traumatic event plus symptom clusters' },
      ocd: { count: 0, label: 'Obsessive-Compulsive Disorder', description: 'Obsessions and/or compulsions causing significant distress' },
      social_anxiety: { count: 0, label: 'Social Anxiety Disorder', description: 'Marked fear of social situations due to fear of negative evaluation' }
    }

    selectedSymptoms.forEach(symptomId => {
      const symptom = symptoms.find(s => s.id === symptomId)
      if (symptom) {
        symptom.category.forEach(cat => {
          if (categoryScores[cat]) {
            categoryScores[cat].count++
          }
        })
      }
    })

    return Object.entries(categoryScores)
      .filter(([_, data]) => data.count > 0)
      .sort((a, b) => b[1].count - a[1].count)
      .map(([_, data]) => data)
  }

  const suggestions = analyzeSuggestions()

  const reset = () => {
    setSelectedSymptoms(new Set())
    setShowResults(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Diagnostic Pattern Recognizer</h1>
        <p className="text-lg text-muted-foreground">
          Interactive tool to explore symptom patterns and differential diagnoses
        </p>
        <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-sm">
            <strong>Educational use only.</strong> This tool is designed for learning psychiatric diagnostic patterns.
            It is not a substitute for clinical judgment or comprehensive psychiatric evaluation.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Presenting Symptoms</CardTitle>
          <CardDescription>Choose symptoms the patient is experiencing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-3">
            {symptoms.map(symptom => (
              <Button
                key={symptom.id}
                variant={selectedSymptoms.has(symptom.id) ? 'default' : 'outline'}
                className="justify-start h-auto py-3 px-4 text-left"
                onClick={() => toggleSymptom(symptom.id)}
              >
                <span className="flex items-center gap-2">
                  {selectedSymptoms.has(symptom.id) && <CheckCircle2 className="h-4 w-4" />}
                  {symptom.text}
                </span>
              </Button>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => setShowResults(true)}
              disabled={selectedSymptoms.size === 0}
              className="flex-1"
            >
              Analyze Symptom Pattern
            </Button>
            <Button onClick={reset} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {showResults && suggestions.length > 0 && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle>Differential Diagnosis Considerations</CardTitle>
            <CardDescription>
              Based on {selectedSymptoms.size} selected symptom{selectedSymptoms.size !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion.label}
                className="p-4 rounded-lg bg-muted/50 border border-border space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{suggestion.label}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
                  </div>
                  <Badge variant={index === 0 ? 'default' : 'secondary'}>
                    {suggestion.count} symptom{suggestion.count !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </div>
            ))}

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h3 className="font-semibold mb-2">Next Steps in Clinical Reasoning</h3>
              <ul className="space-y-2 text-sm">
                <li>• Conduct full psychiatric interview to meet DSM-5-TR criteria</li>
                <li>• Assess timeline, duration, and functional impairment</li>
                <li>• Rule out medical causes and substance-induced symptoms</li>
                <li>• Screen for comorbid psychiatric conditions</li>
                <li>• Evaluate suicide risk and safety concerns</li>
                <li>• Consider collateral information from family/friends if available</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {showResults && suggestions.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            <p>No matching patterns found. Select symptoms above to see diagnostic considerations.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
