import { beforeEach, describe, expect, it } from 'vitest'
import { streak, useProgress } from './progress'
import { todayKey } from '@/lib/utils'

describe('progress store', () => {
  beforeEach(() => useProgress.getState().reset())

  it('records attempts, keeping the most recent result', () => {
    const s = useProgress.getState()
    s.recordAttempt('q1', false)
    s.recordAttempt('q1', true)
    const a = useProgress.getState().attempts.q1
    expect(a).toMatchObject({ last: true, tries: 2, correct: 1 })
  })
  it('toggles sections and flags', () => {
    useProgress.getState().toggleSection('mood/episodes')
    expect(useProgress.getState().sections['mood/episodes']).toBeTypeOf('number')
    useProgress.getState().toggleSection('mood/episodes')
    expect(useProgress.getState().sections['mood/episodes']).toBeUndefined()
    useProgress.getState().toggleFlag('q2')
    expect(useProgress.getState().flagged.q2).toBe(true)
  })
  it('rejects malformed imports and accepts valid ones', () => {
    expect(useProgress.getState().importData(null)).toBe(false)
    expect(useProgress.getState().importData({ foo: 1 })).toBe(false)
    expect(useProgress.getState().importData({ sections: { 'mood/episodes': 1 }, attempts: [] })).toBe(true)
    expect(useProgress.getState().sections['mood/episodes']).toBe(1)
    expect(useProgress.getState().attempts).toEqual({})
  })
  it('counts streaks across consecutive days', () => {
    const d = new Date(2026, 10, 26)
    const prev = new Date(2026, 10, 25)
    const prev2 = new Date(2026, 10, 24)
    expect(streak({ [todayKey(d)]: 1, [todayKey(prev)]: 2, [todayKey(prev2)]: 1 }, d)).toBe(3)
    expect(streak({ [todayKey(prev)]: 1 }, d)).toBe(1)
    expect(streak({}, d)).toBe(0)
  })
})
