import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

interface Question {
  id: string
  type: 'mcq' | 'case'
  category: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 'q1',
    type: 'mcq',
    category: 'Mood Disorders',
    question: 'A 28-year-old woman presents with 3 weeks of depressed mood, anhedonia, poor sleep, and decreased appetite. She also mentions a 4-day period last year when she felt "on top of the world," needed little sleep, and started multiple new projects. What is the most important consideration before starting an antidepressant?',
    options: [
      'Check thyroid function',
      'Screen for bipolar disorder',
      'Order brain MRI',
      'Start with low-dose SSRI'
    ],
    correctAnswer: 1,
    explanation: 'The history of a distinct period of elevated mood with decreased need for sleep and increased goal-directed activity suggests a past hypomanic episode, raising concern for Bipolar II Disorder. Starting an antidepressant without a mood stabilizer in bipolar disorder can precipitate mania or rapid cycling. Always screen for manic/hypomanic episodes before initiating antidepressant therapy.'
  },
  {
    id: 'q2',
    type: 'mcq',
    category: 'Psychopharmacology',
    question: 'Which side effect is most commonly associated with SSRIs?',
    options: [
      'Weight loss',
      'Sexual dysfunction',
      'Hypertension',
      'Sedation'
    ],
    correctAnswer: 1,
    explanation: 'Sexual dysfunction (decreased libido, anorgasmia, erectile dysfunction) occurs in 30-50% of patients taking SSRIs and is one of the most common reasons for treatment discontinuation. If problematic, consider switching to bupropion or mirtazapine, which have lower rates of sexual side effects.'
  },
  {
    id: 'q3',
    type: 'case',
    category: 'Suicide Risk',
    question: 'A 45-year-old man with major depression reports passive suicidal ideation but denies plan or intent. He has strong family support, is engaged in therapy, and has no prior suicide attempts. He agrees to remove firearms from his home and follow up in 2 days. What is the most appropriate disposition?',
    options: [
      'Immediate psychiatric hospitalization',
      'Outpatient management with close follow-up',
      'Send to emergency department',
      'Prescribe antipsychotic medication'
    ],
    correctAnswer: 1,
    explanation: 'This patient has passive ideation without plan or intent, strong protective factors (family support, therapy engagement), and is willing to implement safety measures (remove lethal means, close follow-up). Outpatient management is appropriate. If he had a specific plan, intent to act, or lacked protective factors, hospitalization would be indicated. Always reassess if clinical picture changes.'
  },
  {
    id: 'q4',
    type: 'mcq',
    category: 'Anxiety Disorders',
    question: 'What is the first-line psychotherapy for panic disorder?',
    options: [
      'Psychodynamic therapy',
      'Supportive therapy',
      'Cognitive-behavioral therapy (CBT) with interoceptive exposure',
      'Dialectical behavior therapy (DBT)'
    ],
    correctAnswer: 2,
    explanation: 'Panic-focused CBT with interoceptive exposure is the gold standard psychotherapy for panic disorder. Interoceptive exposure involves controlled exposure to panic sensations (e.g., hyperventilation, spinning) to reduce fear of these sensations. This, combined with cognitive restructuring, is highly effective for reducing panic frequency and severity.'
  },
  {
    id: 'q5',
    type: 'case',
    category: 'Psychosis',
    question: 'A 22-year-old man on haloperidol for schizophrenia develops fever (103°F), severe muscle rigidity, confusion, and elevated CK (15,000 U/L). What is the most likely diagnosis?',
    options: [
      'Serotonin syndrome',
      'Neuroleptic malignant syndrome',
      'Malignant hyperthermia',
      'Acute dystonia'
    ],
    correctAnswer: 1,
    explanation: 'Neuroleptic Malignant Syndrome (NMS) is characterized by fever, rigidity ("lead pipe"), altered mental status, autonomic instability, and elevated CK. It is a life-threatening reaction to antipsychotics (more common with typical antipsychotics like haloperidol). Immediate management: stop antipsychotic, supportive care (ICU), consider dantrolene or bromocriptine. NMS vs serotonin syndrome: NMS has rigidity and slower onset; serotonin syndrome has hyperreflexia/clonus and faster onset.'
  },
  {
    id: 'q6',
    type: 'mcq',
    category: 'PTSD/OCD',
    question: 'A patient with OCD is not responding to adequate trials of two different SSRIs at maximum doses. What is the most appropriate next step?',
    options: [
      'Add a benzodiazepine',
      'Switch to lamotrigine',
      'Consider clomipramine or augmentation with an antipsychotic',
      'Discontinue all medications'
    ],
    correctAnswer: 2,
    explanation: 'For treatment-resistant OCD (failed ≥2 SSRI trials), options include switching to clomipramine (a tricyclic with strong serotonergic effects, very effective for OCD but more side effects) or augmenting current SSRI with a low-dose atypical antipsychotic (aripiprazole, risperidone). Intensive exposure and response prevention (ERP) therapy should also be considered.'
  },
  {
    id: 'q7',
    type: 'mcq',
    category: 'Substance Use',
    question: 'Which substance withdrawal syndrome is potentially life-threatening and requires medical management?',
    options: [
      'Opioid withdrawal',
      'Alcohol withdrawal',
      'Cannabis withdrawal',
      'Stimulant withdrawal'
    ],
    correctAnswer: 1,
    explanation: 'Alcohol withdrawal can be life-threatening due to risk of seizures and delirium tremens (DTs), which carries 5-15% mortality if untreated. Benzodiazepines are first-line treatment to prevent seizures and DTs. Benzodiazepine withdrawal is also life-threatening. Opioid withdrawal is extremely uncomfortable but not medically dangerous. Cannabis and stimulant withdrawal are not life-threatening.'
  },
  {
    id: 'q8',
    type: 'case',
    category: 'Mood Disorders',
    question: 'A patient with bipolar disorder has been stable on lithium for 2 years. Recent labs show lithium level 1.8 mEq/L (therapeutic 0.6-1.2). She reports tremor, confusion, and slurred speech. What should be done immediately?',
    options: [
      'Continue lithium and recheck level in 1 week',
      'Increase lithium dose',
      'Stop lithium and provide supportive care; consider hemodialysis',
      'Add valproate'
    ],
    correctAnswer: 2,
    explanation: 'This patient has lithium toxicity (level 1.8, symptoms of confusion, tremor, slurred speech). Lithium has a narrow therapeutic index. Immediate management: stop lithium, IV fluids, monitor electrolytes and renal function. For severe toxicity (>2.5 mEq/L or severe symptoms), hemodialysis may be needed. Investigate cause of toxicity (dehydration, renal impairment, drug interactions like NSAIDs or thiazides).'
  },
  {
    id: 'q9',
    type: 'mcq',
    category: 'Psychopharmacology',
    question: 'A patient starting lamotrigine develops a rash. What is the most appropriate action?',
    options: [
      'Continue lamotrigine and monitor',
      'Reduce lamotrigine dose',
      'Add antihistamine',
      'Stop lamotrigine immediately and evaluate'
    ],
    correctAnswer: 3,
    explanation: 'Any rash with lamotrigine is concerning for Stevens-Johnson syndrome (SJS) or toxic epidermal necrolysis (TEN), which can be life-threatening. Lamotrigine must be stopped immediately and the patient evaluated. SJS/TEN risk is reduced by slow titration and avoiding rapid dose increases. Concurrent valproate increases lamotrigine levels and requires even slower titration.'
  },
  {
    id: 'q10',
    type: 'case',
    category: 'Substance Use',
    question: 'A 30-year-old with opioid use disorder wants to start medication-assisted treatment. He used heroin yesterday. Which medication should NOT be started today?',
    options: [
      'Buprenorphine',
      'Methadone',
      'Naltrexone',
      'Clonidine'
    ],
    correctAnswer: 2,
    explanation: 'Naltrexone is an opioid antagonist and will precipitate severe withdrawal if started while opioids are on board. Patient must be opioid-free for 7-10 days before starting naltrexone. Buprenorphine (partial agonist) can be started when patient is in mild withdrawal (usually 12-24 hours after last short-acting opioid use). Methadone (full agonist) can be started same day. Clonidine provides symptomatic relief for withdrawal but is not MAT.'
  }
]

export function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())

  const question = questions[currentQuestion]
  const isCorrect = selectedAnswer === question.correctAnswer

  const handleAnswerSelect = (index: number) => {
    if (!showExplanation) {
      setSelectedAnswer(index)
    }
  }

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowExplanation(true)
      setAnsweredQuestions(new Set([...answeredQuestions, currentQuestion]))
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setAnsweredQuestions(new Set())
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Practice Assessment</h1>
        <p className="text-lg text-muted-foreground">
          Test your knowledge with case-based vignettes and multiple-choice questions
        </p>
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm">
            <strong>Learning tool:</strong> Take your time to think through each question. Read the detailed explanations to reinforce your understanding. This assessment is for educational purposes only and does not track or store your responses.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline">{question.category}</Badge>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <CardTitle className="text-lg mt-3">{question.question}</CardTitle>
          {question.type === 'case' && (
            <CardDescription>Case-based vignette</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrectOption = index === question.correctAnswer
              const showCorrect = showExplanation && isCorrectOption
              const showIncorrect = showExplanation && isSelected && !isCorrect

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showCorrect
                      ? 'border-green-500 bg-green-500/10'
                      : showIncorrect
                      ? 'border-red-500 bg-red-500/10'
                      : isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 bg-card'
                  } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5">
                      {showCorrect && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                      {showIncorrect && <XCircle className="h-4 w-4 text-red-600" />}
                      {!showExplanation && isSelected && (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      )}
                    </span>
                    <span className="flex-1">{option}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {!showExplanation && (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="w-full"
            >
              Submit Answer
            </Button>
          )}

          {showExplanation && (
            <div className={`p-4 rounded-lg border-2 ${
              isCorrect
                ? 'border-green-500 bg-green-500/10'
                : 'border-red-500 bg-red-500/10'
            }`}>
              <div className="flex items-start gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h3 className="font-semibold mb-1">
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </h3>
                  <p className="text-sm">{question.explanation}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
              className="flex-1"
            >
              Next Question
            </Button>
            <Button onClick={handleReset} variant="outline">
              Reset
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Answered: {answeredQuestions.size} / {questions.length}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-base">Study Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• Read each question carefully and consider all answer choices before selecting</li>
            <li>• For case vignettes, identify key clinical features and red flags</li>
            <li>• Review the explanations even when you answer correctly—they contain valuable learning points</li>
            <li>• If you answer incorrectly, revisit the relevant module to reinforce the concept</li>
            <li>• Remember: this is a learning tool, not a test. Focus on understanding the reasoning</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
