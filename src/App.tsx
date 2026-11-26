import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Home } from '@/pages/Home'

const named = <T extends Record<string, React.ComponentType>>(loader: () => Promise<T>, key: keyof T) =>
  lazy(() => loader().then((m) => ({ default: m[key] as React.ComponentType })))

const Learn = named(() => import('@/pages/Learn'), 'Learn')
const ModulePage = named(() => import('@/pages/ModulePage'), 'ModulePage')
const PracticeHub = named(() => import('@/pages/practice/PracticeHub'), 'PracticeHub')
const QuestionBank = named(() => import('@/pages/practice/QuestionBank'), 'QuestionBank')
const Flashcards = named(() => import('@/pages/practice/Flashcards'), 'Flashcards')
const Cases = named(() => import('@/pages/practice/Cases'), 'Cases')
const CasePlayer = named(() => import('@/pages/practice/CasePlayer'), 'CasePlayer')
const ToolsHub = named(() => import('@/pages/tools/ToolsHub'), 'ToolsHub')
const DiagnosticPathfinder = named(() => import('@/pages/tools/DiagnosticPathfinder'), 'DiagnosticPathfinder')
const SuicideRiskTool = named(() => import('@/pages/tools/SuicideRiskTool'), 'SuicideRiskTool')
const Scales = named(() => import('@/pages/tools/Scales'), 'Scales')
const SwitchPlanner = named(() => import('@/pages/tools/SwitchPlanner'), 'SwitchPlanner')
const Syndromes = named(() => import('@/pages/tools/Syndromes'), 'Syndromes')
const DrugExplorer = named(() => import('@/pages/tools/DrugExplorer'), 'DrugExplorer')
const Glossary = named(() => import('@/pages/Glossary'), 'Glossary')
const References = named(() => import('@/pages/References'), 'References')
const Settings = named(() => import('@/pages/Settings'), 'Settings')
const NotFound = named(() => import('@/pages/NotFound'), 'NotFound')

function Loading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center" role="status" aria-label="Loading">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

/** v1 URLs kept working. */
const legacy: [string, string][] = [
  ['mood', '/learn/mood'],
  ['anxiety', '/learn/anxiety'],
  ['suicide-risk', '/learn/suicide'],
  ['psychosis', '/learn/psychosis'],
  ['ptsd-ocd', '/learn/trauma-ocd'],
  ['substance', '/learn/substance'],
  ['medications', '/learn/pharm'],
  ['assessment', '/practice/questions'],
]

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Home />} />
            <Route path="learn" element={<Learn />} />
            <Route path="learn/:moduleId" element={<ModulePage />} />
            <Route path="practice" element={<PracticeHub />} />
            <Route path="practice/questions" element={<QuestionBank />} />
            <Route path="practice/flashcards" element={<Flashcards />} />
            <Route path="practice/cases" element={<Cases />} />
            <Route path="practice/cases/:caseId" element={<CasePlayer />} />
            <Route path="tools" element={<ToolsHub />} />
            <Route path="tools/diagnostic" element={<DiagnosticPathfinder />} />
            <Route path="tools/suicide-risk" element={<SuicideRiskTool />} />
            <Route path="tools/scales" element={<Scales />} />
            <Route path="tools/switch" element={<SwitchPlanner />} />
            <Route path="tools/syndromes" element={<Syndromes />} />
            <Route path="tools/drugs" element={<DrugExplorer />} />
            <Route path="glossary" element={<Glossary />} />
            <Route path="references" element={<References />} />
            <Route path="settings" element={<Settings />} />
            {legacy.map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
