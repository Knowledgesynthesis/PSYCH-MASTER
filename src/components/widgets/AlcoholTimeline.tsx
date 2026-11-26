import { useState } from 'react'
import { cn } from '@/lib/utils'

const MAX = 120
const phases = [
  { id: 'minor', label: 'Minor withdrawal', from: 6, to: 36, color: 'bg-amber-400', detail: 'Tremor, anxiety, sweating, nausea, tachycardia, hypertension, insomnia.' },
  { id: 'seizure', label: 'Withdrawal seizures', from: 6, to: 48, color: 'bg-orange-500', detail: 'Usually generalized and brief; treat with a benzodiazepine (phenytoin does not prevent them).' },
  { id: 'halluc', label: 'Alcoholic hallucinosis', from: 12, to: 48, color: 'bg-violet-500', detail: 'Hallucinations (often visual or tactile) with a clear sensorium and orientation.' },
  { id: 'dts', label: 'Delirium tremens', from: 48, to: 96, color: 'bg-red-600', detail: 'Delirium + autonomic hyperactivity (fever, tachycardia, hypertension). Historically up to ~20% mortality untreated; ~1–4% with modern care.' },
]

export function AlcoholTimeline() {
  const [h, setH] = useState(30)
  const active = phases.filter((p) => h >= p.from && h <= p.to)
  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <h4 className="font-semibold">Interactive: alcohol withdrawal timeline</h4>
        <span className="text-sm tabular-nums text-muted-foreground">{h} h since last drink</span>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">Drag the slider to see which syndromes fall within their typical window. Timing varies; anticipate, don't wait.</p>
      <div className="relative space-y-2">
        {phases.map((p) => (
          <div key={p.id} className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-xs font-medium sm:w-40 sm:text-sm">{p.label}</span>
            <div className="relative h-5 flex-1 rounded bg-muted">
              <div
                className={cn('absolute top-0 h-5 rounded transition-opacity', p.color, active.includes(p) ? 'opacity-100' : 'opacity-35')}
                style={{ left: `${(p.from / MAX) * 100}%`, width: `${((p.to - p.from) / MAX) * 100}%` }}
              />
              <div className="absolute top-[-4px] h-7 w-0.5 bg-foreground" style={{ left: `${(h / MAX) * 100}%` }} aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>
      <div className="ml-[7.75rem] mt-1 flex justify-between text-[10px] text-muted-foreground sm:ml-[10.75rem]">
        {[0, 24, 48, 72, 96, 120].map((t) => (
          <span key={t}>{t}h</span>
        ))}
      </div>
      <input
        aria-label="Hours since last drink"
        type="range"
        min={0}
        max={MAX}
        value={h}
        onChange={(e) => setH(Number(e.target.value))}
        className="mt-3 w-full accent-[var(--primary)]"
      />
      <div className="mt-3 rounded-xl bg-muted/60 p-3 text-sm">
        {active.length === 0 ? (
          <p>{h < 6 ? 'Usually before withdrawal begins: assess risk (prior seizures/DTs, PAWSS), give thiamine, plan monitoring.' : 'Beyond typical windows: if new delirium appears, look for other causes (infection, Wernicke, hepatic encephalopathy, head injury).'}</p>
        ) : (
          <ul className="space-y-1.5">
            {active.map((p) => (
              <li key={p.id}>
                <span className="font-semibold">{p.label}:</span> {p.detail}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
