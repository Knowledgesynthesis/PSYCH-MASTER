export interface Module {
  id: string
  title: string
  description: string
  icon: string
  path: string
  color: string
}

export const modules: Module[] = [
  {
    id: 'mood',
    title: 'Mood Disorders',
    description: 'Depression, bipolar disorder, and mood stabilizers',
    icon: '🧠',
    path: '/mood',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'anxiety',
    title: 'Anxiety Disorders',
    description: 'GAD, panic disorder, social anxiety, and phobias',
    icon: '😰',
    path: '/anxiety',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'suicide-risk',
    title: 'Suicide Risk Assessment',
    description: 'Safety evaluation and crisis management',
    icon: '🆘',
    path: '/suicide-risk',
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 'psychosis',
    title: 'Psychosis & Schizophrenia',
    description: 'Positive/negative symptoms and antipsychotic management',
    icon: '🌀',
    path: '/psychosis',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'ptsd-ocd',
    title: 'PTSD & OCD',
    description: 'Trauma-related disorders and obsessive-compulsive spectrum',
    icon: '🔄',
    path: '/ptsd-ocd',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'substance',
    title: 'Substance Use Disorders',
    description: 'Intoxication, withdrawal, and medication-assisted treatment',
    icon: '💊',
    path: '/substance',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'medications',
    title: 'Psychopharmacology',
    description: 'SSRIs, antipsychotics, mood stabilizers, and side effects',
    icon: '💉',
    path: '/medications',
    color: 'from-pink-500 to-rose-500'
  }
]

export const toolsAndResources = [
  {
    id: 'diagnostic',
    title: 'Diagnostic Pattern Recognizer',
    description: 'Interactive symptom-based diagnosis tool',
    icon: '🔍',
    path: '/tools/diagnostic',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'assessment',
    title: 'Practice Assessment',
    description: 'MCQs and case-based vignettes',
    icon: '📝',
    path: '/assessment',
    color: 'from-violet-500 to-purple-500'
  },
  {
    id: 'glossary',
    title: 'Glossary',
    description: 'Key psychiatric terms and concepts',
    icon: '📚',
    path: '/glossary',
    color: 'from-emerald-500 to-green-500'
  }
]
