import type { StateStorage } from 'zustand/middleware'

/**
 * localStorage wrapper that never throws (private mode, blocked storage, quota)
 * and falls back to memory so the app always works.
 */
const memory = new Map<string, string>()

export const safeStorage: StateStorage = {
  getItem: (name) => {
    try {
      return window.localStorage.getItem(name) ?? memory.get(name) ?? null
    } catch {
      return memory.get(name) ?? null
    }
  },
  setItem: (name, value) => {
    memory.set(name, value)
    try {
      window.localStorage.setItem(name, value)
    } catch {
      /* memory fallback already holds the value */
    }
  },
  removeItem: (name) => {
    memory.delete(name)
    try {
      window.localStorage.removeItem(name)
    } catch {
      /* ignore */
    }
  },
}
