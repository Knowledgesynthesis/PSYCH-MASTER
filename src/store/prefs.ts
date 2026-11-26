import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { safeStorage } from '@/lib/storage'

export type ThemePref = 'system' | 'light' | 'dark'

interface PrefsState {
  theme: ThemePref
  setTheme: (t: ThemePref) => void
}

export const usePrefs = create<PrefsState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'psych-master:prefs', storage: createJSONStorage(() => safeStorage) },
  ),
)

export function resolveDark(pref: ThemePref) {
  if (pref === 'dark') return true
  if (pref === 'light') return false
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
}
