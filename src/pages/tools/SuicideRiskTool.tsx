import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check as CheckIcon, ClipboardCopy, Phone, RotateCcw } from 'lucide-react'
import { acuteFactors, chronicFactors, documentation, formulate, ideationLevels, protectiveFactors, type Behavior, type Ideation, type SuicideInput, type Tier } from '@/lib/suicide'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Segmented } from '@/components/ui/segmented'
import { cn } from '@/lib/utils'

const empty: SuicideInput = { ideation: 0, recentIdeation: true, behavior: 'none', acute: [], chronic: [], protective: [] }

const presets: { label: string; input: SuicideInput }[] = [
  { label: 'Passive wish to be dead, strong supports', input: { ideation: 1, recentIdeation: true, behavior: 'none', acute: ['hopeless'], chronic: ['dx'], protective: ['reasons', 'connected', 'children', 'care'] } },
  { label: 'Thoughts with method + handgun at home', input: { ideation: 3, recentIdeation: true, behavior: 'none', acute: ['firearm', 'loss', 'agitation'], chronic: ['dx', 'isolation'], protective: ['children'] } },
  { label: 'Overdose 2 weeks ago, still wishes to die', input: { ideation: 4, recentIdeation: true, behavior: 'recent', acute: ['hopeless', 'meds', 'intox'], chronic: ['dx', 'trauma'], protective: [] } },
  { label: 'Command hallucinations to jump', input: { ideation: 2, recentIdeation: true, behavior: 'none', acute: ['command', 'agitation', 'noengage'], chronic: ['dx'], protective: ['connected'] } },
]

const tierStyle: Record<Tier, string> = {
  high: 'border-red-500/50 bg-red-500/[0.07] text-red-700 dark:text-red-300',
  moderate: 'border-amber-500/50 bg-amber-500/[0.08] text-amber-800 dark:text-amber-300',
  low: 'border-emerald-500/50 bg-emerald-500/[0.07] text-emerald-800 dark:text-emerald-300',
}

function toggle(list: string[], id: string) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
}

export function SuicideRiskTool() {
  const [input, setInput] = useState<SuicideInput>(empty)
  const [copied, setCopied] = useState(false)
  const f = useMemo(() => formulate(input), [input])
  const note = useMemo(() => documentation(input, f), [input, f])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(note)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div>
      <PageHeader eyebrow="Tool" title="Suicide Risk Formulation" actions={<Button variant="outline" size="sm" onClick={() => setInput(empty)}><RotateCcw className="h-4 w-4" /> Reset</Button>}>
        Structure the interview (C-SSRS concepts), synthesize risk and protective factors, and match interventions to a SAFE-T-style tier. The tier guides how intensively to intervene; it is not a prediction.
      </PageHeader>

      <div className="mb-4 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/[0.06] p-3 text-sm">
        <Phone className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
        <span>In crisis? Call or text <strong>988</strong> (US) or your local emergency number.</span>
      </div>

      <div className="mb-6">
        <div className="mb-2 text-sm font-medium">Practice cases</div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button key={p.label} type="button" onClick={() => setInput(p.input)} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground hover:border-primary hover:text-primary">{p.label}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)]">
        <div className="space-y-4">
          <Card className="p-5 sm:p-6">
            <h2 className="mb-3 font-semibold">1. Suicidal ideation (most severe)</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {ideationLevels.map((l) => (
                <label key={l.value} className={cn('flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm', input.ideation === l.value ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/60')}>
                  <input type="radio" name="ideation" className="mt-0.5 accent-[var(--primary)]" checked={input.ideation === l.value} onChange={() => setInput({ ...input, ideation: l.value as Ideation })} />
                  <span><span className="font-medium">{l.label}</span><span className="block text-xs text-muted-foreground">{l.detail}</span></span>
                </label>
              ))}
            </div>
            {input.ideation > 0 && (
              <div className="mt-3">
                <div className="mb-1.5 text-sm font-medium">When?</div>
                <Segmented value={input.recentIdeation ? 'recent' : 'past'} onChange={(v) => setInput({ ...input, recentIdeation: v === 'recent' })} label="Timing of ideation" options={[{ value: 'recent', label: 'Within past month' }, { value: 'past', label: 'Earlier only' }]} />
              </div>
            )}
          </Card>

          <Card className="p-5 sm:p-6">
            <h2 className="mb-1 font-semibold">2. Suicidal behavior</h2>
            <p className="mb-3 text-sm text-muted-foreground">Actual, interrupted or aborted attempts, or preparatory acts.</p>
            <Segmented value={input.behavior} onChange={(v: Behavior) => setInput({ ...input, behavior: v })} label="Suicidal behavior" options={[{ value: 'none', label: 'None' }, { value: 'lifetime', label: '>3 months ago' }, { value: 'recent', label: 'Within 3 months' }]} />
          </Card>

          <Card className="p-5 sm:p-6">
            <h2 className="mb-3 font-semibold">3. Acute / modifiable factors and warning signs</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {acuteFactors.map((x) => <Check key={x.id} checked={input.acute.includes(x.id)} onChange={() => setInput({ ...input, acute: toggle(input.acute, x.id) })} label={x.label} />)}
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <h2 className="mb-3 font-semibold">4. Longer-term risk factors</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {chronicFactors.map((x) => <Check key={x.id} checked={input.chronic.includes(x.id)} onChange={() => setInput({ ...input, chronic: toggle(input.chronic, x.id) })} label={x.label} />)}
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <h2 className="mb-3 font-semibold">5. Protective factors</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {protectiveFactors.map((x) => <Check key={x.id} checked={input.protective.includes(x.id)} onChange={() => setInput({ ...input, protective: toggle(input.protective, x.id) })} label={x.label} />)}
            </div>
          </Card>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start" aria-live="polite">
          <Card className="p-5">
            <div className={cn('mb-3 rounded-xl border px-4 py-3', tierStyle[f.tier])}>
              <div className="text-xs font-semibold uppercase tracking-wide opacity-80">Formulation tier</div>
              <div className="text-2xl font-bold capitalize">{f.tier} acute risk</div>
            </div>
            <div className="text-sm font-semibold">Why</div>
            <ul className="mb-3 mt-1 space-y-1 text-sm text-muted-foreground">
              {f.reasons.map((r) => <li key={r}>• {r}</li>)}
            </ul>
            <div className="text-sm font-semibold">Interventions</div>
            <ul className="mt-1 space-y-1.5 text-sm">
              {f.interventions.map((r) => <li key={r}>→ {r}</li>)}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">{f.note} See <Link to="/learn/suicide#formulation" className="text-primary underline">Formulation, not prediction</Link>.</p>
          </Card>
          <Card className="p-5">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-semibold">Documentation summary</h2>
              <Button size="sm" variant="outline" onClick={copy}>{copied ? <CheckIcon className="h-4 w-4" /> : <ClipboardCopy className="h-4 w-4" />} {copied ? 'Copied' : 'Copy'}</Button>
            </div>
            <pre className="max-h-72 overflow-auto whitespace-pre-wrap rounded-xl bg-muted/60 p-3 text-xs leading-relaxed">{note}</pre>
          </Card>
        </aside>
      </div>
    </div>
  )
}
