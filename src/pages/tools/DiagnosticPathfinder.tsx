import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertOctagon, ArrowRight, CheckCircle2, HelpCircle, RotateCcw, Siren } from 'lucide-react'
import { emptyInput, evaluate, type DxInput, type DxStatus } from '@/lib/diagnostic'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Chip, Segmented } from '@/components/ui/segmented'
import { cn } from '@/lib/utils'

type Patch<K extends keyof DxInput> = Partial<DxInput[K]>

const presets: { label: string; build: (i: DxInput) => DxInput }[] = [
  {
    label: 'Grandiose student, no sleep for 9 days, arrested',
    build: (i) => ({ ...i, clusters: { ...i.clusters, elevation: true }, elev: { duration: 'ge7', symptomsMet: true, marked: true, hospitalized: false, psychotic: false } }),
  },
  {
    label: 'Depressed now; 5-day "high" two years ago',
    build: (i) => ({ ...i, clusters: { ...i.clusters, depression: true }, dep: { ...i.dep, fullMde: true }, hx: { mania: false, hypomania: true, mde: false } }),
  },
  {
    label: 'Voices and paranoia for 3 months, no mood episodes',
    build: (i) => ({ ...i, clusters: { ...i.clusters, psychosis: true }, psy: { ...i.psy, duration: '1to6m' } }),
  },
  {
    label: 'Psychosis between manic episodes; mood most of the time',
    build: (i) => ({ ...i, clusters: { ...i.clusters, psychosis: true, elevation: true }, elev: { duration: 'ge7', symptomsMet: true, marked: true, hospitalized: true, psychotic: true }, psy: { ...i.psy, duration: 'ge6m', withoutMood2w: true, moodMajority: true } }),
  },
  {
    label: 'Nightmares and avoidance 3 months after assault',
    build: (i) => ({ ...i, clusters: { ...i.clusters, trauma: true }, tr: { ...i.tr, exposureA: true, timing: 'gt1m', fullClusters: true } }),
  },
  {
    label: 'New hallucinations in a febrile, inattentive 80-year-old',
    build: (i) => ({ ...i, organic: { ...i.organic, delirium: true, medical: true }, clusters: { ...i.clusters, psychosis: true }, psy: { ...i.psy, duration: 'lt1d' } }),
  },
]

const statusStyle: Record<DxStatus, { label: string; cls: string; icon: typeof CheckCircle2 }> = {
  priority: { label: 'Address first', cls: 'border-red-500/40 bg-red-500/[0.06]', icon: AlertOctagon },
  meets: { label: 'Meets pattern', cls: 'border-emerald-500/40 bg-emerald-500/[0.05]', icon: CheckCircle2 },
  consider: { label: 'Consider / incomplete', cls: 'border-amber-500/40 bg-amber-500/[0.06]', icon: HelpCircle },
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{n}</span>
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </Card>
  )
}

export function DiagnosticPathfinder() {
  const [input, setInput] = useState<DxInput>(emptyInput)
  const out = useMemo(() => evaluate(input), [input])
  const set = <K extends keyof DxInput>(k: K, patch: Patch<K>) => setInput((i) => ({ ...i, [k]: { ...i[k], ...patch } }))
  const c = input.clusters
  const anySelected = Object.values(c).some(Boolean) || Object.values(input.organic).some(Boolean)

  return (
    <div>
      <PageHeader eyebrow="Tool" title="Diagnostic Pathfinder" actions={<Button variant="outline" size="sm" onClick={() => setInput(emptyInput())}><RotateCcw className="h-4 w-4" /> Reset</Button>}>
        Follow the same order an expert uses: safety → medical and substance causes → symptom clusters → episode and duration rules. The working diagnosis updates live, with the reasoning shown.
      </PageHeader>

      <div className="mb-6">
        <div className="mb-2 text-sm font-medium">Load an example</div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <Chip key={p.label} active={false} onClick={() => setInput(p.build(emptyInput()))}>{p.label}</Chip>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
        <div className="space-y-4">
          <Step n={1} title="Safety">
            <div className="grid gap-2 sm:grid-cols-3">
              <Check checked={input.safety.imminent} onChange={(v) => set('safety', { imminent: v })} label="Suicidal intent or plan" />
              <Check checked={input.safety.homicidal} onChange={(v) => set('safety', { homicidal: v })} label="Threat to others" />
              <Check checked={input.safety.selfcare} onChange={(v) => set('safety', { selfcare: v })} label="Cannot care for self" />
            </div>
          </Step>

          <Step n={2} title="Medical and substance causes">
            <div className="grid gap-2 sm:grid-cols-3">
              <Check checked={input.organic.delirium} onChange={(v) => set('organic', { delirium: v })} label="Fluctuating attention/awareness" detail="Possible delirium" />
              <Check checked={input.organic.substance} onChange={(v) => set('organic', { substance: v })} label="Substance or medication explains it" />
              <Check checked={input.organic.medical} onChange={(v) => set('organic', { medical: v })} label="Medical condition explains it" />
            </div>
          </Step>

          <Step n={3} title="Symptom clusters present">
            <div className="flex flex-wrap gap-2">
              {([
                ['depression', 'Depression'],
                ['elevation', 'Elevated / irritable mood'],
                ['psychosis', 'Psychosis'],
                ['anxiety', 'Anxiety / panic'],
                ['trauma', 'Trauma / stressor / grief'],
                ['oc', 'Obsessions / compulsions'],
              ] as const).map(([k, label]) => (
                <Chip key={k} active={c[k]} onClick={() => set('clusters', { [k]: !c[k] })}>{label}</Chip>
              ))}
            </div>
          </Step>

          {(c.depression || c.elevation || c.psychosis) && (
            <Step n={4} title="Mood details">
              {c.depression && (
                <div className="grid gap-2 sm:grid-cols-2">
                  <Check checked={input.dep.fullMde} onChange={(v) => set('dep', { fullMde: v })} label="Meets MDE now" detail="≥5 of 9 for ≥2 weeks incl. mood or anhedonia" />
                  <Check checked={input.dep.chronic2y} onChange={(v) => set('dep', { chronic2y: v })} label="Depressed most days ≥2 years" />
                  <Check checked={input.dep.peripartum} onChange={(v) => set('dep', { peripartum: v })} label="Onset in pregnancy or ≤4 weeks postpartum" />
                  <Check checked={input.dep.mixedSx} onChange={(v) => set('dep', { mixedSx: v })} label="≥3 hypomanic symptoms during the episode" detail="Mixed features" />
                </div>
              )}
              {c.elevation && (
                <div className="space-y-3 rounded-xl bg-muted/40 p-3">
                  <div>
                    <div className="mb-1.5 text-sm font-medium">Duration of elevated/irritable mood + increased energy</div>
                    <Segmented value={input.elev.duration} onChange={(v) => set('elev', { duration: v })} label="Elevation duration" options={[{ value: 'lt4', label: '<4 days' }, { value: '4to6', label: '4–6 days' }, { value: 'ge7', label: '≥7 days' }]} />
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <Check checked={input.elev.symptomsMet} onChange={(v) => set('elev', { symptomsMet: v })} label="≥3 DIG FAST symptoms (≥4 if only irritable)" />
                    <Check checked={input.elev.marked} onChange={(v) => set('elev', { marked: v })} label="Marked impairment" />
                    <Check checked={input.elev.hospitalized} onChange={(v) => set('elev', { hospitalized: v })} label="Hospitalized for it" />
                    <Check checked={input.elev.psychotic} onChange={(v) => set('elev', { psychotic: v })} label="Psychotic features during it" />
                  </div>
                </div>
              )}
              <div>
                <div className="mb-1.5 text-sm font-medium">Lifetime history (past episodes)</div>
                <div className="grid gap-2 sm:grid-cols-3">
                  <Check checked={input.hx.mania} onChange={(v) => set('hx', { mania: v })} label="Past manic episode" />
                  <Check checked={input.hx.hypomania} onChange={(v) => set('hx', { hypomania: v })} label="Past hypomanic episode" />
                  <Check checked={input.hx.mde} onChange={(v) => set('hx', { mde: v })} label="Past major depressive episode" />
                </div>
              </div>
            </Step>
          )}

          {c.psychosis && (
            <Step n={5} title="Psychosis details">
              <div>
                <div className="mb-1.5 text-sm font-medium">Total duration of the psychotic illness</div>
                <Segmented value={input.psy.duration} onChange={(v) => set('psy', { duration: v })} label="Psychosis duration" options={[{ value: 'lt1d', label: '<1 day' }, { value: '1dto1m', label: '1 d–1 mo' }, { value: '1to6m', label: '1–6 mo' }, { value: 'ge6m', label: '≥6 mo' }]} />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <Check checked={input.psy.onlyDuringMood} onChange={(v) => set('psy', { onlyDuringMood: v, withoutMood2w: v ? false : input.psy.withoutMood2w })} label="Psychosis only during mood episodes" />
                <Check checked={input.psy.withoutMood2w} onChange={(v) => set('psy', { withoutMood2w: v, onlyDuringMood: v ? false : input.psy.onlyDuringMood })} label="≥2 weeks of psychosis without mood episode" />
                <Check checked={input.psy.moodMajority} onChange={(v) => set('psy', { moodMajority: v })} label="Mood episodes span most of the illness" />
                <Check checked={input.psy.onlyDelusions} onChange={(v) => set('psy', { onlyDelusions: v })} label="Delusions only; functioning preserved" />
                <Check checked={input.psy.recovered} onChange={(v) => set('psy', { recovered: v })} label="Fully recovered to baseline" />
              </div>
            </Step>
          )}

          {c.anxiety && (
            <Step n={6} title="Anxiety pattern">
              <div className="grid gap-2 sm:grid-cols-2">
                <Check checked={input.anx.worry} onChange={(v) => set('anx', { worry: v })} label="Excessive multi-topic worry ≥6 months" />
                <Check checked={input.anx.panic} onChange={(v) => set('anx', { panic: v })} label="Unexpected panic attacks + ≥1 month worry" />
                <Check checked={input.anx.agora} onChange={(v) => set('anx', { agora: v })} label="Avoids ≥2 agoraphobic situations" />
                <Check checked={input.anx.social} onChange={(v) => set('anx', { social: v })} label="Fear of scrutiny / evaluation" />
                <Check checked={input.anx.specific} onChange={(v) => set('anx', { specific: v })} label="Fear of a specific object/situation" />
              </div>
            </Step>
          )}

          {c.trauma && (
            <Step n={7} title="Trauma, stressor or loss">
              <div className="grid gap-2 sm:grid-cols-2">
                <Check checked={input.tr.exposureA} onChange={(v) => set('tr', { exposureA: v })} label="Criterion A trauma" detail="Actual/threatened death, serious injury, sexual violence" />
                <Check checked={input.tr.fullClusters} onChange={(v) => set('tr', { fullClusters: v })} label="Full symptom clusters present" />
                <Check checked={input.tr.nonTraumaStressor} onChange={(v) => set('tr', { nonTraumaStressor: v })} label="Non-traumatic stressor within 3 months" />
                <Check checked={input.tr.bereavement12m} onChange={(v) => set('tr', { bereavement12m: v })} label="Intense grief ≥12 months after a death" />
              </div>
              {input.tr.exposureA && (
                <div>
                  <div className="mb-1.5 text-sm font-medium">Time since the trauma</div>
                  <Segmented value={input.tr.timing} onChange={(v) => set('tr', { timing: v })} label="Time since trauma" options={[{ value: 'lt3d', label: '<3 days' }, { value: '3dto1m', label: '3 days–1 month' }, { value: 'gt1m', label: '>1 month' }]} />
                </div>
              )}
            </Step>
          )}

          {c.oc && (
            <Step n={8} title="Obsessive-compulsive spectrum">
              <div className="grid gap-2 sm:grid-cols-2">
                <Check checked={input.oc.obsComp} onChange={(v) => set('oc', { obsComp: v })} label="Obsessions/compulsions >1 h/day or impairing" />
                <Check checked={input.oc.appearance} onChange={(v) => set('oc', { appearance: v })} label="Preoccupied with perceived appearance flaws" />
                <Check checked={input.oc.hoarding} onChange={(v) => set('oc', { hoarding: v })} label="Cannot discard; cluttered living space" />
                <Check checked={input.oc.bfrb} onChange={(v) => set('oc', { bfrb: v })} label="Recurrent hair pulling or skin picking" />
              </div>
              {input.oc.obsComp && (
                <div>
                  <div className="mb-1.5 text-sm font-medium">Insight</div>
                  <Segmented value={input.oc.insight} onChange={(v) => set('oc', { insight: v })} label="Insight" options={[{ value: 'good', label: 'Good/fair' }, { value: 'poor', label: 'Poor' }, { value: 'absent', label: 'Absent/delusional' }]} />
                </div>
              )}
            </Step>
          )}
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
          <Card className="p-5">
            <h2 className="mb-3 font-semibold">Working formulation</h2>
            {out.alerts.map((a) => (
              <div key={a} className="mb-3 flex gap-2 rounded-xl border border-red-500/40 bg-red-500/[0.07] p-3 text-sm">
                <Siren className="mt-0.5 h-4 w-4 shrink-0 text-red-600" /> {a}
              </div>
            ))}
            {!anySelected && <p className="text-sm text-muted-foreground">Select findings or load an example to see the reasoning.</p>}
            {anySelected && out.results.length === 0 && <p className="text-sm text-muted-foreground">Add details for the selected clusters.</p>}
            <ol className="space-y-3">
              {out.results.map((r) => {
                const s = statusStyle[r.status]
                return (
                  <li key={r.id} className={cn('rounded-xl border p-3', s.cls)}>
                    <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"><s.icon className="h-3.5 w-3.5" /> {s.label}</div>
                    <div className="font-semibold leading-snug">{r.label}</div>
                    <ul className="mt-2 space-y-1 text-sm">
                      {r.rationale.map((x) => <li key={x} className="text-muted-foreground">• {x}</li>)}
                    </ul>
                    <div className="mt-2 text-xs font-semibold">Next steps</div>
                    <ul className="mt-1 space-y-1 text-sm">
                      {r.next.map((x) => <li key={x}>→ {x}</li>)}
                    </ul>
                    {r.link && <Link to={r.link} className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">Review in module <ArrowRight className="h-3.5 w-3.5" /></Link>}
                  </li>
                )
              })}
            </ol>
            <p className="mt-4 text-xs text-muted-foreground">Patterns, not verdicts: a real diagnosis also needs impairment, exclusions and a full history.</p>
          </Card>
        </aside>
      </div>
    </div>
  )
}
