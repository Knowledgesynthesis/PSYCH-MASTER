// Navigation and tool registry (used by the shell, hubs and search).
export interface ToolInfo {
  id: string
  title: string
  /** Short label for navigation. */
  nav: string
  to: string
  description: string
  icon: string
  tag: string
}

export const tools: ToolInfo[] = [
  { id: 'diagnostic', nav: 'Diagnostic pathfinder', title: 'Diagnostic Pathfinder', to: '/tools/diagnostic', description: 'Walk safety → medical rule-outs → episodes and duration to a DSM-5-TR working diagnosis, with the reasoning shown.', icon: 'Route', tag: 'Diagnosis' },
  { id: 'suicide-risk', nav: 'Suicide risk formulation', title: 'Suicide Risk Formulation', to: '/tools/suicide-risk', description: 'Ideation, behavior, risk and protective factors → formulation tier, matched interventions and a documentation summary.', icon: 'LifeBuoy', tag: 'Safety' },
  { id: 'scales', nav: 'Clinical scales', title: 'Clinical Scales', to: '/tools/scales', description: 'Score PHQ-9, GAD-7, AUDIT-C, CIWA-Ar and COWS with interpretation and next steps.', icon: 'Gauge', tag: 'Measurement' },
  { id: 'switch', nav: 'Switch planner', title: 'Antidepressant Switch Planner', to: '/tools/switch', description: 'Any two antidepressants → direct switch, cross-taper or washout, with a timeline and cautions.', icon: 'ArrowLeftRight', tag: 'Prescribing' },
  { id: 'syndromes', nav: 'Toxic syndromes', title: 'Toxic Syndrome Differentiator', to: '/tools/syndromes', description: 'Serotonin syndrome vs NMS vs anticholinergic vs sympathomimetic vs MH vs withdrawal vs catatonia.', icon: 'Thermometer', tag: 'Emergency' },
  { id: 'drugs', nav: 'Drug explorer', title: 'Drug Explorer', to: '/tools/drugs', description: 'Search, filter and compare 50+ psychotropics: uses, adverse effects, warnings, monitoring, interactions.', icon: 'Pill', tag: 'Reference' },
]
