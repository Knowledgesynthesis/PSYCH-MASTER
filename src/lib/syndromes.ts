// Weighted differential for hyperthermic / toxic syndromes. Weights encode classic
// discriminators (Boyer & Shannon 2005; Hunter criteria). Educational ranking, not a diagnosis.

export type SyndromeId = 'ss' | 'nms' | 'ac' | 'sym' | 'mh' | 'wd' | 'cat'

export interface Feature {
  id: string
  label: string
  group: 'Exposure' | 'Timing' | 'Neuromuscular' | 'Autonomic & skin' | 'Mental status' | 'Labs & vitals'
}

export const features: Feature[] = [
  { id: 'serotonergic', label: 'New or increased serotonergic drug(s)', group: 'Exposure' },
  { id: 'd2', label: 'Dopamine antagonist started/increased (or dopaminergic drug stopped)', group: 'Exposure' },
  { id: 'anticholinergic', label: 'Anticholinergic exposure (diphenhydramine, TCA, benztropine)', group: 'Exposure' },
  { id: 'stimulant', label: 'Stimulant use (cocaine, amphetamines, cathinones)', group: 'Exposure' },
  { id: 'anesthetic', label: 'Volatile anesthetic or succinylcholine', group: 'Exposure' },
  { id: 'cessation', label: 'Stopped alcohol, benzodiazepines or GHB', group: 'Exposure' },
  { id: 'hours', label: 'Onset within hours (<24 h)', group: 'Timing' },
  { id: 'days', label: 'Onset over days (1–14 days)', group: 'Timing' },
  { id: 'clonus', label: 'Clonus (inducible, ocular or spontaneous)', group: 'Neuromuscular' },
  { id: 'hyperreflexia', label: 'Hyperreflexia', group: 'Neuromuscular' },
  { id: 'leadpipe', label: 'Lead-pipe rigidity', group: 'Neuromuscular' },
  { id: 'bradyreflexia', label: 'Hyporeflexia / bradyreflexia', group: 'Neuromuscular' },
  { id: 'tremor', label: 'Tremor', group: 'Neuromuscular' },
  { id: 'mydriasis', label: 'Mydriasis', group: 'Autonomic & skin' },
  { id: 'diaphoresis', label: 'Diaphoresis', group: 'Autonomic & skin' },
  { id: 'dryskin', label: 'Dry, hot, flushed skin', group: 'Autonomic & skin' },
  { id: 'bowelHyper', label: 'Hyperactive bowel sounds / diarrhea', group: 'Autonomic & skin' },
  { id: 'bowelHypo', label: 'Absent or reduced bowel sounds', group: 'Autonomic & skin' },
  { id: 'retention', label: 'Urinary retention', group: 'Autonomic & skin' },
  { id: 'agitation', label: 'Agitation', group: 'Mental status' },
  { id: 'mutism', label: 'Stupor or mutism', group: 'Mental status' },
  { id: 'delirium', label: 'Delirium / disorientation', group: 'Mental status' },
  { id: 'hallucinations', label: 'Hallucinations', group: 'Mental status' },
  { id: 'seizure', label: 'Seizure', group: 'Mental status' },
  { id: 'hyperthermia', label: 'Temperature >38.5 °C', group: 'Labs & vitals' },
  { id: 'ck', label: 'Markedly elevated CK', group: 'Labs & vitals' },
  { id: 'etco2', label: 'Rising end-tidal CO₂ under anesthesia', group: 'Labs & vitals' },
]

export interface Syndrome {
  id: SyndromeId
  name: string
  key: string
  management: string
  link: string
}

export const syndromes: Syndrome[] = [
  { id: 'ss', name: 'Serotonin syndrome', key: 'Hours after a serotonergic change; clonus and hyperreflexia (legs > arms), diaphoresis, diarrhea, mydriasis.', management: 'Stop serotonergic drugs; benzodiazepines; cyproheptadine; for T >41 °C: sedation, non-depolarizing paralysis, intubation. Antipyretics do not help.', link: '/learn/emergencies#toxic' },
  { id: 'nms', name: 'Neuroleptic malignant syndrome', key: 'Days after dopamine blockade; lead-pipe rigidity, bradyreflexia, hyperthermia, stupor/mutism, very high CK.', management: 'Stop the antipsychotic; cooling, fluids, ICU; benzodiazepines; dantrolene, bromocriptine or amantadine; ECT if refractory.', link: '/learn/emergencies#toxic' },
  { id: 'ac', name: 'Anticholinergic toxicity', key: 'Hot, dry, flushed skin; mydriasis; absent bowel sounds; urinary retention; agitated delirium; normal reflexes.', management: 'Supportive care; benzodiazepines; physostigmine with toxicology input if no QRS widening.', link: '/learn/emergencies#toxic' },
  { id: 'sym', name: 'Sympathomimetic toxicity', key: 'Stimulant exposure; tachycardia, hypertension, diaphoresis, mydriasis, agitation/paranoia; no clonus.', management: 'Benzodiazepines, cooling, treat ACS/hypertension, avoid physical struggle.', link: '/learn/substance#others' },
  { id: 'mh', name: 'Malignant hyperthermia', key: 'During anesthesia with volatile agents/succinylcholine; rising end-tidal CO₂, rigidity, hyperthermia.', management: 'Stop triggers; dantrolene; active cooling; treat hyperkalemia and acidosis.', link: '/learn/emergencies#toxic' },
  { id: 'wd', name: 'Alcohol / sedative withdrawal (DTs)', key: 'Hours to days after stopping alcohol, benzodiazepines or GHB; tremor, diaphoresis, hallucinations, seizures, delirium.', management: 'Benzodiazepines or phenobarbital; thiamine; ICU for delirium tremens.', link: '/learn/substance#alcohol-withdrawal' },
  { id: 'cat', name: 'Malignant catatonia', key: 'Catatonic signs (stupor, mutism, posturing) with fever and autonomic instability; may occur without drugs.', management: 'Lorazepam; urgent ECT; stop dopamine blockers.', link: '/learn/emergencies#catatonia' },
]

type W = Partial<Record<SyndromeId, number>>

export const weights: Record<string, W> = {
  serotonergic: { ss: 4 },
  d2: { nms: 4, cat: 1 },
  anticholinergic: { ac: 4 },
  stimulant: { sym: 4, ss: 1 },
  anesthetic: { mh: 6 },
  cessation: { wd: 5 },
  hours: { ss: 2, ac: 2, sym: 2, mh: 2, wd: 1, nms: -2 },
  days: { nms: 2, wd: 1, cat: 1, ss: -2, ac: -1, sym: -1, mh: -2 },
  clonus: { ss: 4, wd: 1, nms: -2, ac: -1, mh: -1, cat: -1 },
  hyperreflexia: { ss: 2, wd: 1, sym: 1, nms: -2 },
  leadpipe: { nms: 4, mh: 3, cat: 2, ss: 1, ac: -2, sym: -1, wd: -1 },
  bradyreflexia: { nms: 2, mh: 1, ss: -3 },
  tremor: { ss: 2, wd: 2, sym: 1, nms: 1 },
  mydriasis: { ss: 1, ac: 2, sym: 2, wd: 1, nms: -1 },
  diaphoresis: { ss: 2, sym: 2, wd: 2, nms: 1, mh: 1, ac: -4 },
  dryskin: { ac: 4, ss: -3, sym: -2, wd: -2, nms: -1 },
  bowelHyper: { ss: 2, wd: 1, ac: -3 },
  bowelHypo: { ac: 2, nms: 1, ss: -2 },
  retention: { ac: 3 },
  agitation: { ss: 1, ac: 1, sym: 2, wd: 2 },
  mutism: { cat: 4, nms: 2, ac: -1, sym: -2 },
  delirium: { ac: 2, wd: 2, nms: 1, ss: 1 },
  hallucinations: { wd: 2, ac: 2, sym: 1 },
  seizure: { wd: 2, sym: 1, ss: 1, ac: 1 },
  hyperthermia: { nms: 2, mh: 2, ss: 1, sym: 1, ac: 1, wd: 1, cat: 1 },
  ck: { nms: 3, mh: 2, sym: 1, cat: 1, ss: 1 },
  etco2: { mh: 6 },
}

export interface RankedSyndrome extends Syndrome {
  score: number
  support: string[]
  against: string[]
}

export function rankSyndromes(selected: Iterable<string>): RankedSyndrome[] {
  const sel = Array.from(selected)
  const featureLabel = Object.fromEntries(features.map((f) => [f.id, f.label]))
  return syndromes
    .map((s) => {
      let score = 0
      const support: string[] = []
      const against: string[] = []
      for (const f of sel) {
        const w = weights[f]?.[s.id] ?? 0
        score += w
        if (w > 0) support.push(featureLabel[f])
        if (w < 0) against.push(featureLabel[f])
      }
      return { ...s, score, support, against }
    })
    .sort((a, b) => b.score - a.score)
}
