import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { safeStorage } from '@/lib/storage'
import { schedule, type CardState, type Grade } from '@/lib/srs'
import { todayKey } from '@/lib/utils'

export interface Attempt {
  /** Most recent answer was correct. */
  last: boolean
  tries: number
  correct: number
  ts: number
}

export interface CaseResult {
  score: number
  max: number
  ts: number
}

interface ProgressData {
  /** key = `${moduleId}/${sectionId}` */
  sections: Record<string, number>
  /** Inline quick-check results by check id. */
  checks: Record<string, boolean>
  /** Question-bank attempts by question id. */
  attempts: Record<string, Attempt>
  flagged: Record<string, true>
  cards: Record<string, CardState>
  cases: Record<string, CaseResult>
  lastVisited?: { path: string; label: string; ts: number }
  activity: Record<string, number>
}

interface ProgressActions {
  toggleSection: (key: string) => void
  markSection: (key: string) => void
  answerCheck: (id: string, correct: boolean) => void
  recordAttempt: (id: string, correct: boolean) => void
  toggleFlag: (id: string) => void
  gradeCard: (id: string, grade: Grade) => void
  recordCase: (id: string, score: number, max: number) => void
  visit: (path: string, label: string) => void
  importData: (data: unknown) => boolean
  reset: () => void
}

const empty: ProgressData = {
  sections: {},
  checks: {},
  attempts: {},
  flagged: {},
  cards: {},
  cases: {},
  activity: {},
}

function bump(activity: Record<string, number>) {
  const k = todayKey()
  return { ...activity, [k]: (activity[k] ?? 0) + 1 }
}

export const useProgress = create<ProgressData & ProgressActions>()(
  persist(
    (set) => ({
      ...empty,
      toggleSection: (key) =>
        set((s) => {
          const sections = { ...s.sections }
          if (sections[key]) delete sections[key]
          else sections[key] = Date.now()
          return { sections, activity: bump(s.activity) }
        }),
      markSection: (key) =>
        set((s) => (s.sections[key] ? s : { sections: { ...s.sections, [key]: Date.now() }, activity: bump(s.activity) })),
      answerCheck: (id, correct) => set((s) => ({ checks: { ...s.checks, [id]: correct }, activity: bump(s.activity) })),
      recordAttempt: (id, correct) =>
        set((s) => {
          const prev = s.attempts[id]
          return {
            attempts: {
              ...s.attempts,
              [id]: {
                last: correct,
                tries: (prev?.tries ?? 0) + 1,
                correct: (prev?.correct ?? 0) + (correct ? 1 : 0),
                ts: Date.now(),
              },
            },
            activity: bump(s.activity),
          }
        }),
      toggleFlag: (id) =>
        set((s) => {
          const flagged = { ...s.flagged }
          if (flagged[id]) delete flagged[id]
          else flagged[id] = true
          return { flagged }
        }),
      gradeCard: (id, grade) =>
        set((s) => ({ cards: { ...s.cards, [id]: schedule(s.cards[id], grade, Date.now()) }, activity: bump(s.activity) })),
      recordCase: (id, score, max) =>
        set((s) => ({ cases: { ...s.cases, [id]: { score, max, ts: Date.now() } }, activity: bump(s.activity) })),
      visit: (path, label) => set({ lastVisited: { path, label, ts: Date.now() } }),
      importData: (data) => {
        if (!data || typeof data !== 'object') return false
        const d = data as Partial<ProgressData>
        const keys: (keyof ProgressData)[] = ['sections', 'checks', 'attempts', 'flagged', 'cards', 'cases', 'activity']
        if (!keys.some((k) => k in d)) return false
        const next: Partial<ProgressData> = {}
        for (const k of keys) {
          const v = d[k]
          if (v && typeof v === 'object' && !Array.isArray(v)) (next as Record<string, unknown>)[k] = v
        }
        set({ ...empty, ...next })
        return true
      },
      reset: () => set({ ...empty, lastVisited: undefined }),
    }),
    {
      name: 'psych-master:progress',
      version: 2,
      storage: createJSONStorage(() => safeStorage),
      partialize: (s) => ({
        sections: s.sections,
        checks: s.checks,
        attempts: s.attempts,
        flagged: s.flagged,
        cards: s.cards,
        cases: s.cases,
        lastVisited: s.lastVisited,
        activity: s.activity,
      }),
    },
  ),
)

/** Consecutive days (ending today or yesterday) with any learning activity. */
export function streak(activity: Record<string, number>, now = new Date()): number {
  let count = 0
  const d = new Date(now)
  if (!activity[todayKey(d)]) d.setDate(d.getDate() - 1)
  while (activity[todayKey(d)]) {
    count += 1
    d.setDate(d.getDate() - 1)
  }
  return count
}
