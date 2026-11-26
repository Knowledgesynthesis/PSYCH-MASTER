// Spaced-repetition scheduler (SM-2 family, simplified to four buttons).
// Pure functions so the schedule is unit-testable.

export type Grade = 'again' | 'hard' | 'good' | 'easy'

export interface CardState {
  /** Epoch ms when the card is next due. */
  due: number
  /** Current interval in days (0 = learning). */
  interval: number
  /** Ease factor, 1.3–3.0. */
  ease: number
  reps: number
  lapses: number
}

export const DAY = 24 * 60 * 60 * 1000
const MIN_EASE = 1.3
const MAX_EASE = 3.0

export function newCard(now: number): CardState {
  return { due: now, interval: 0, ease: 2.5, reps: 0, lapses: 0 }
}

export function schedule(prev: CardState | undefined, grade: Grade, now: number): CardState {
  const s = prev ?? newCard(now)
  let { ease, interval, reps, lapses } = s

  if (grade === 'again') {
    lapses += 1
    reps = 0
    ease = Math.max(MIN_EASE, ease - 0.2)
    // Re-show in ~10 minutes within the session.
    return { due: now + 10 * 60 * 1000, interval: 0, ease, reps, lapses }
  }

  reps += 1
  if (grade === 'hard') ease = Math.max(MIN_EASE, ease - 0.15)
  if (grade === 'easy') ease = Math.min(MAX_EASE, ease + 0.15)

  if (reps === 1) {
    interval = grade === 'hard' ? 1 : grade === 'good' ? 1 : 3
  } else if (reps === 2) {
    interval = grade === 'hard' ? 2 : grade === 'good' ? 3 : 6
  } else {
    const factor = grade === 'hard' ? 1.2 : grade === 'good' ? ease : ease * 1.3
    interval = Math.max(interval + 1, Math.round(interval * factor))
  }
  interval = Math.min(interval, 365)
  return { due: now + interval * DAY, interval, ease: Number(ease.toFixed(2)), reps, lapses }
}

export function isDue(s: CardState | undefined, now: number) {
  return !s || s.due <= now
}

/** Human-readable preview of the next interval for a grade button. */
export function previewInterval(prev: CardState | undefined, grade: Grade, now: number): string {
  const next = schedule(prev, grade, now)
  const ms = next.due - now
  if (ms < 60 * 60 * 1000) return `${Math.max(1, Math.round(ms / 60000))}m`
  const days = Math.round(ms / DAY)
  if (days < 31) return `${days}d`
  return `${Math.round(days / 30)}mo`
}
