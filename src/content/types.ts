// Content model. Every learning page is data rendered by generic components,
// so content can be audited, tested for integrity, and searched.

export type ModuleId =
  | 'mood'
  | 'anxiety'
  | 'suicide'
  | 'psychosis'
  | 'trauma-ocd'
  | 'substance'
  | 'pharm'
  | 'emergencies'

export type Tone = 'danger' | 'warning' | 'info' | 'pearl' | 'pitfall' | 'success'

/** Embeddable interactive widgets rendered inside module sections. */
export type WidgetName = 'alcohol-timeline' | 'antipsychotic-profiles' | 'antidepressant-profiles' | 'eps-timeline'

export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean; title?: string }
  | { type: 'criteria'; title: string; rule: string; items: string[]; note?: string }
  | { type: 'table'; caption?: string; head: string[]; rows: string[][] }
  | { type: 'callout'; tone: Tone; title: string; text?: string; items?: string[] }
  | { type: 'compare'; caption?: string; left: { title: string; items: string[] }; right: { title: string; items: string[] } }
  | { type: 'steps'; title?: string; items: { title: string; text: string }[] }
  | { type: 'mnemonic'; title: string; letters: { l: string; text: string }[]; note?: string }
  | { type: 'timeline'; title: string; points: { at: string; label: string; detail?: string; tone?: Tone }[] }
  | { type: 'reveal'; prompt: string; answer: string }
  | { type: 'sort'; prompt: string; categories: string[]; items: { text: string; cat: number; why: string }[] }
  | { type: 'widget'; name: WidgetName }
  | { type: 'links'; title?: string; items: { label: string; to: string; note?: string }[] }

export interface QuickCheck {
  id: string
  q: string
  options: string[]
  answer: number
  why: string
}

export interface Section {
  id: string
  title: string
  /** One line: why this matters clinically. */
  lead?: string
  blocks: Block[]
  refs?: string[]
  check?: QuickCheck[]
}

export interface Flashcard {
  id: string
  front: string
  back: string
}

export interface Module {
  id: ModuleId
  title: string
  short: string
  path: string
  icon: string
  /** Tailwind gradient classes for the module badge. */
  color: string
  summary: string
  minutes: number
  objectives: string[]
  sections: Section[]
  takeaways: string[]
  flashcards: Flashcard[]
}

export interface Question {
  id: string
  module: ModuleId
  topic: string
  /** 1 = recall, 2 = application, 3 = integration / next-best-step */
  level: 1 | 2 | 3
  stem: string
  options: string[]
  answer: number
  explanation: string
  /** Index-aligned rationale per option (the correct option may be an empty string). */
  why?: string[]
  refs?: string[]
}

export type RefKind = 'guideline' | 'trial' | 'review' | 'regulatory' | 'manual' | 'tool'

export interface Reference {
  id: string
  /** Short label shown inline, e.g. "CANMAT 2023". */
  short: string
  /** Full citation. */
  full: string
  year: number
  kind: RefKind
  url?: string
}

export interface CaseChoice {
  text: string
  /** 2 = best, 1 = acceptable, 0 = harmful / wrong */
  score: 0 | 1 | 2
  feedback: string
}

export interface CaseStep {
  id: string
  narrative: string
  data?: { label: string; value: string }[]
  question: string
  choices: CaseChoice[]
}

export interface ClinicalCase {
  id: string
  title: string
  module: ModuleId
  setting: string
  difficulty: 'core' | 'advanced'
  summary: string
  steps: CaseStep[]
  debrief: string[]
  refs?: string[]
}

export interface GlossaryTerm {
  term: string
  category: string
  definition: string
  module?: ModuleId
}
