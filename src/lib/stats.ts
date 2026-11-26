import { modules, allFlashcards } from '@/content'
import { questions } from '@/content/questions'
import type { Attempt } from '@/store/progress'
import type { CardState } from './srs'

export const totalSections = modules.reduce((n, m) => n + m.sections.length, 0)

export function sectionsDone(sections: Record<string, number>) {
  return modules.reduce((n, m) => n + m.sections.filter((s) => sections[`${m.id}/${s.id}`]).length, 0)
}

export function dueCount(cards: Record<string, CardState>, now = Date.now()) {
  let due = 0
  let fresh = 0
  for (const c of allFlashcards) {
    const s = cards[c.id]
    if (!s) fresh += 1
    else if (s.due <= now) due += 1
  }
  return { due, fresh }
}

export function accuracy(attempts: Record<string, Attempt>) {
  const vals = Object.values(attempts)
  const answered = vals.length
  const correct = vals.filter((a) => a.last).length
  return { answered, correct, total: questions.length }
}

/** Topics with the lowest accuracy on the most recent attempt (needs ≥2 answered questions per topic). */
export function weakTopics(attempts: Record<string, Attempt>, limit = 4) {
  const byTopic = new Map<string, { module: string; n: number; right: number }>()
  for (const q of questions) {
    const a = attempts[q.id]
    if (!a) continue
    const key = `${q.module}|${q.topic}`
    const t = byTopic.get(key) ?? { module: q.module, n: 0, right: 0 }
    t.n += 1
    t.right += a.last ? 1 : 0
    byTopic.set(key, t)
  }
  return [...byTopic.entries()]
    .filter(([, t]) => t.n >= 2 && t.right / t.n < 0.75)
    .map(([k, t]) => ({ topic: k.split('|')[1], module: t.module, acc: t.right / t.n, n: t.n }))
    .sort((a, b) => a.acc - b.acc)
    .slice(0, limit)
}

export function moduleQuestionStats(attempts: Record<string, Attempt>) {
  return modules.map((m) => {
    const qs = questions.filter((q) => q.module === m.id)
    const answered = qs.filter((q) => attempts[q.id])
    const correct = answered.filter((q) => attempts[q.id].last)
    return { module: m, total: qs.length, answered: answered.length, correct: correct.length }
  })
}
