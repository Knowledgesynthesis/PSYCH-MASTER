import { useRef, useState } from 'react'
import { Download, Monitor, Moon, Sun, Trash2, Upload } from 'lucide-react'
import { usePrefs, type ThemePref } from '@/store/prefs'
import { useProgress } from '@/store/progress'
import { CONTENT_REVIEWED, modules, allFlashcards } from '@/content'
import { questions } from '@/content/questions'
import { references } from '@/content/references'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Settings() {
  const { theme, setTheme } = usePrefs()
  const progress = useProgress()
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState<string | null>(null)

  const exportData = () => {
    const { sections, checks, attempts, flagged, cards, cases, activity } = useProgress.getState()
    const blob = new Blob([JSON.stringify({ app: 'psych-master', version: 2, exportedAt: new Date().toISOString(), sections, checks, attempts, flagged, cards, cases, activity }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `psych-master-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMsg('Progress exported.')
  }

  const importData = async (file: File) => {
    try {
      const data = JSON.parse(await file.text())
      setMsg(progress.importData(data) ? 'Progress imported.' : 'That file does not look like a Psych Master export.')
    } catch {
      setMsg('Could not read that file.')
    }
  }

  const themes: { v: ThemePref; label: string; icon: typeof Sun }[] = [
    { v: 'system', label: 'System', icon: Monitor },
    { v: 'light', label: 'Light', icon: Sun },
    { v: 'dark', label: 'Dark', icon: Moon },
  ]

  return (
    <div className="max-w-3xl">
      <PageHeader eyebrow="Settings" title="Settings" />
      <div className="space-y-5">
        <Card className="p-5 sm:p-6">
          <h2 className="mb-3 font-semibold">Appearance</h2>
          <div className="grid grid-cols-3 gap-2">
            {themes.map((t) => (
              <button key={t.v} type="button" onClick={() => setTheme(t.v)} aria-pressed={theme === t.v} className={cn('flex flex-col items-center gap-1.5 rounded-xl border p-3 text-sm', theme === t.v ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-muted')}>
                <t.icon className="h-5 w-5" /> {t.label}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <h2 className="mb-1 font-semibold">Your progress</h2>
          <p className="mb-4 text-sm text-muted-foreground">Stored only in this browser; nothing is sent anywhere. Export it to move between devices or keep a backup.</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={exportData}><Download className="h-4 w-4" /> Export</Button>
            <Button variant="outline" onClick={() => fileRef.current?.click()}><Upload className="h-4 w-4" /> Import</Button>
            <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={(e) => e.target.files?.[0] && importData(e.target.files[0])} />
            <Button
              variant="danger"
              onClick={() => {
                if (window.confirm('Reset all progress, answers and flashcard schedules? This cannot be undone.')) {
                  progress.reset()
                  setMsg('Progress reset.')
                }
              }}
            >
              <Trash2 className="h-4 w-4" /> Reset
            </Button>
          </div>
          {msg && <p className="mt-3 text-sm" role="status">{msg}</p>}
        </Card>

        <Card className="p-5 sm:p-6">
          <h2 className="mb-2 font-semibold">About</h2>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>Version 2.0 · content reviewed {CONTENT_REVIEWED}</li>
            <li>{modules.length} modules · {questions.length} questions · {allFlashcards.length} flashcards · {references.length} references</li>
            <li>Aligned with DSM-5-TR and current guidelines (APA, CANMAT, NICE, VA/DoD, ASAM) and FDA actions through late 2026.</li>
            <li>All cases are synthetic. Works offline once loaded (installable as an app).</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
