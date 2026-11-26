const items = [
  { when: 'Hours–days', name: 'Acute dystonia', sign: 'Torticollis, oculogyric crisis, trismus', tx: 'IM benztropine or diphenhydramine' },
  { when: 'Days–weeks', name: 'Akathisia', sign: 'Inner restlessness, pacing, can\'t sit still', tx: 'Lower dose, propranolol, mirtazapine' },
  { when: 'Weeks', name: 'Parkinsonism', sign: 'Bradykinesia, rigidity, tremor, masked face', tx: 'Lower dose/switch; anticholinergic or amantadine' },
  { when: 'Months–years', name: 'Tardive dyskinesia', sign: 'Orofacial and choreiform movements', tx: 'VMAT2 inhibitor; stop anticholinergics' },
]

export function EpsTimeline() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <h4 className="mb-3 font-semibold">Extrapyramidal symptoms over time</h4>
      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        {items.map((it, i) => (
          <li key={it.name} className="relative rounded-xl bg-muted/60 p-3">
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-primary">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] text-primary-foreground">{i + 1}</span>
              {it.when}
            </div>
            <div className="font-semibold">{it.name}</div>
            <div className="mt-1 text-xs text-muted-foreground">{it.sign}</div>
            <div className="mt-2 text-xs"><span className="font-medium">Treat:</span> {it.tx}</div>
          </li>
        ))}
      </ol>
    </div>
  )
}
