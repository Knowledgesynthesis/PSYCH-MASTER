import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'

interface Term {
  term: string
  category: string
  definition: string
}

const glossaryTerms: Term[] = [
  {
    term: 'Affect',
    category: 'Mental Status',
    definition: 'Observable expression of emotion (e.g., flat, blunted, constricted, full range, labile). Distinct from mood, which is the patient\'s subjective emotional state.'
  },
  {
    term: 'Akathisia',
    category: 'Side Effects',
    definition: 'Subjective feeling of restlessness and inability to sit still, often a side effect of antipsychotics. Treated by dose reduction, switching medications, or adding propranolol or benzodiazepine.'
  },
  {
    term: 'Anhedonia',
    category: 'Symptoms',
    definition: 'Loss of interest or pleasure in activities previously enjoyed. Core symptom of major depression.'
  },
  {
    term: 'Avolition',
    category: 'Symptoms',
    definition: 'Lack of motivation to initiate and persist in goal-directed activities. A negative symptom of schizophrenia.'
  },
  {
    term: 'Bipolar I Disorder',
    category: 'Diagnosis',
    definition: 'Mood disorder characterized by at least one manic episode (≥7 days or requiring hospitalization) with elevated/irritable mood and increased activity. May also have depressive episodes.'
  },
  {
    term: 'Bipolar II Disorder',
    category: 'Diagnosis',
    definition: 'Mood disorder with at least one hypomanic episode (≥4 days) and at least one major depressive episode. No history of full manic episodes.'
  },
  {
    term: 'Catatonia',
    category: 'Symptoms',
    definition: 'Psychomotor disturbance characterized by stupor, catalepsy, waxy flexibility, mutism, negativism, posturing, or agitation. Can occur in mood disorders, psychotic disorders, or medical conditions.'
  },
  {
    term: 'Clang Associations',
    category: 'Thought Disorder',
    definition: 'Speech pattern where words are chosen based on sound rather than meaning (e.g., rhyming). Seen in mania or schizophrenia.'
  },
  {
    term: 'Cognitive-Behavioral Therapy (CBT)',
    category: 'Treatment',
    definition: 'Evidence-based psychotherapy focusing on identifying and changing maladaptive thought patterns and behaviors. First-line for anxiety disorders, depression, OCD, and PTSD.'
  },
  {
    term: 'Delusion',
    category: 'Symptoms',
    definition: 'Fixed false belief held despite contradictory evidence. Types include persecutory, grandiose, referential, somatic, and thought insertion/withdrawal/broadcasting.'
  },
  {
    term: 'Delirium Tremens (DTs)',
    category: 'Medical Emergency',
    definition: 'Severe alcohol withdrawal syndrome (48-96 hours post-cessation) with confusion, disorientation, hallucinations, autonomic instability. Life-threatening; requires ICU care and benzodiazepines.'
  },
  {
    term: 'Disorganized Speech',
    category: 'Thought Disorder',
    definition: 'Incoherent or illogical speech patterns including loose associations, tangentiality, or word salad. Positive symptom of schizophrenia.'
  },
  {
    term: 'Dystonia',
    category: 'Side Effects',
    definition: 'Sustained muscle contractions causing abnormal postures or spasms (e.g., torticollis, oculogyric crisis). Acute side effect of antipsychotics. Treated with benztropine or diphenhydramine IM/IV.'
  },
  {
    term: 'Ego-dystonic',
    category: 'Symptoms',
    definition: 'Thoughts or behaviors inconsistent with one\'s self-image and values, causing distress (e.g., obsessions in OCD). Contrast with ego-syntonic (consistent with self).'
  },
  {
    term: 'Exposure and Response Prevention (ERP)',
    category: 'Treatment',
    definition: 'Gold standard psychotherapy for OCD. Involves gradual exposure to feared stimuli while preventing compulsive responses, leading to reduced anxiety over time.'
  },
  {
    term: 'Extrapyramidal Symptoms (EPS)',
    category: 'Side Effects',
    definition: 'Movement disorders from antipsychotics including akathisia, dystonia, parkinsonism, and tardive dyskinesia. More common with typical antipsychotics.'
  },
  {
    term: 'Flight of Ideas',
    category: 'Thought Disorder',
    definition: 'Rapid shifting between topics with discernible connections. Seen in mania. Distinct from loose associations (no logical connection).'
  },
  {
    term: 'Hallucination',
    category: 'Symptoms',
    definition: 'Perception in the absence of external stimulus. Can be auditory, visual, tactile, olfactory, or gustatory. Auditory hallucinations most common in schizophrenia.'
  },
  {
    term: 'Hypomania',
    category: 'Symptoms',
    definition: 'Elevated, expansive, or irritable mood with increased activity lasting ≥4 days. Similar to mania but less severe; no psychosis, no hospitalization needed, less functional impairment.'
  },
  {
    term: 'Insight',
    category: 'Mental Status',
    definition: 'Patient\'s awareness of having a mental illness. Poor insight common in psychotic disorders and mania; preserved in anxiety and depressive disorders (usually).'
  },
  {
    term: 'Judgment',
    category: 'Mental Status',
    definition: 'Ability to make sound decisions and understand consequences. Assessed by asking about hypothetical scenarios or recent decisions.'
  },
  {
    term: 'Loose Associations',
    category: 'Thought Disorder',
    definition: 'Speech shifting between unrelated topics with no logical connection. Also called derailment. Seen in schizophrenia.'
  },
  {
    term: 'Mania',
    category: 'Symptoms',
    definition: 'Abnormally elevated, expansive, or irritable mood with increased activity lasting ≥7 days (or any duration if hospitalization needed). Includes ≥3 symptoms: grandiosity, decreased sleep need, pressured speech, racing thoughts, distractibility, increased goal-directed activity, risky behavior.'
  },
  {
    term: 'Mood Stabilizer',
    category: 'Treatment',
    definition: 'Medication used to treat bipolar disorder (e.g., lithium, valproate, lamotrigine, carbamazepine). Prevents manic and depressive episodes.'
  },
  {
    term: 'Negative Symptoms',
    category: 'Symptoms',
    definition: 'Absence of normal functions in schizophrenia: flat affect, alogia (poverty of speech), avolition, anhedonia, social withdrawal. Often more disabling than positive symptoms.'
  },
  {
    term: 'Neuroleptic Malignant Syndrome (NMS)',
    category: 'Medical Emergency',
    definition: 'Life-threatening reaction to antipsychotics: fever, rigidity, altered mental status, autonomic instability, elevated CK. Stop antipsychotic immediately; supportive care, dantrolene/bromocriptine.'
  },
  {
    term: 'Obsession',
    category: 'Symptoms',
    definition: 'Recurrent, persistent, intrusive thoughts, urges, or images causing anxiety or distress. Person attempts to ignore, suppress, or neutralize them. Core feature of OCD.'
  },
  {
    term: 'Compulsion',
    category: 'Symptoms',
    definition: 'Repetitive behaviors or mental acts performed to reduce anxiety from obsessions or prevent feared outcome. Not realistically connected to what they aim to prevent. Core feature of OCD.'
  },
  {
    term: 'Positive Symptoms',
    category: 'Symptoms',
    definition: 'Presence of abnormal experiences in schizophrenia: hallucinations, delusions, disorganized speech, disorganized/catatonic behavior. Respond better to antipsychotics than negative symptoms.'
  },
  {
    term: 'Pressured Speech',
    category: 'Symptoms',
    definition: 'Rapid, difficult-to-interrupt speech. Seen in mania. Patient feels compelled to continue speaking.'
  },
  {
    term: 'Psychosis',
    category: 'Symptoms',
    definition: 'Loss of contact with reality, characterized by hallucinations and/or delusions. Can occur in schizophrenia, mood disorders, substance use, or medical conditions.'
  },
  {
    term: 'Serotonin Syndrome',
    category: 'Medical Emergency',
    definition: 'Excess serotonergic activity from medications (SSRIs, SNRIs, MAOIs, etc.): autonomic instability, neuromuscular hyperactivity (hyperreflexia, clonus), mental status changes. Stop offending agents; supportive care, benzodiazepines, cyproheptadine.'
  },
  {
    term: 'SSRI (Selective Serotonin Reuptake Inhibitor)',
    category: 'Treatment',
    definition: 'First-line antidepressant class for depression, anxiety, OCD, PTSD. Examples: sertraline, escitalopram, fluoxetine, paroxetine, citalopram. Common side effects: GI upset, sexual dysfunction.'
  },
  {
    term: 'SNRI (Serotonin-Norepinephrine Reuptake Inhibitor)',
    category: 'Treatment',
    definition: 'Antidepressant with dual mechanism. Examples: venlafaxine, duloxetine, desvenlafaxine. Effective for depression, anxiety, neuropathic pain.'
  },
  {
    term: 'Suicidal Ideation',
    category: 'Symptoms',
    definition: 'Thoughts about ending one\'s life. Can be passive ("wish I were dead") or active (thoughts of suicide with plan/intent). Always assess plan, intent, means, and prior attempts.'
  },
  {
    term: 'Tangentiality',
    category: 'Thought Disorder',
    definition: 'Answering questions in an oblique or irrelevant manner; never reaching the point. Seen in schizophrenia and mania.'
  },
  {
    term: 'Tardive Dyskinesia',
    category: 'Side Effects',
    definition: 'Late-onset involuntary movements (tongue, lips, face, trunk, limbs) from chronic antipsychotic use. Often irreversible. Risk higher with typical antipsychotics and prolonged use. Treat by reducing/stopping offending agent; consider VMAT2 inhibitors.'
  },
  {
    term: 'Thought Broadcasting',
    category: 'Delusion',
    definition: 'Delusion that one\'s thoughts are transmitted and audible to others. Type of delusion seen in schizophrenia.'
  },
  {
    term: 'Thought Insertion',
    category: 'Delusion',
    definition: 'Delusion that thoughts are being placed into one\'s mind by external forces. Type of delusion seen in schizophrenia.'
  },
  {
    term: 'Thought Withdrawal',
    category: 'Delusion',
    definition: 'Delusion that thoughts are being removed from one\'s mind by external forces. Type of delusion seen in schizophrenia.'
  },
  {
    term: 'Word Salad',
    category: 'Thought Disorder',
    definition: 'Severely disorganized, incoherent speech with no logical connections between words or phrases. Seen in severe schizophrenia.'
  }
]

export function Glossary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(glossaryTerms.map(t => t.category))).sort()

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || term.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Psychiatric Glossary</h1>
        <p className="text-lg text-muted-foreground">
          Key terms and concepts in psychiatric diagnosis and treatment
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Search and Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search terms or definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Filter by Category:</div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === null ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Badge>
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredTerms.length} of {glossaryTerms.length} terms
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filteredTerms.map((item) => (
          <Card key={item.term}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-lg">{item.term}</CardTitle>
                <Badge variant="secondary" className="flex-shrink-0">{item.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.definition}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No terms found matching your search criteria.
          </CardContent>
        </Card>
      )}
    </div>
  )
}
