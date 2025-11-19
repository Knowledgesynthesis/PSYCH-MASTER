import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Settings } from './pages/Settings'
import { MoodDisorders } from './pages/modules/MoodDisorders'
import { AnxietyDisorders } from './pages/modules/AnxietyDisorders'
import { SuicideRisk } from './pages/modules/SuicideRisk'
import { Psychosis } from './pages/modules/Psychosis'
import { PTSD_OCD } from './pages/modules/PTSD_OCD'
import { SubstanceUse } from './pages/modules/SubstanceUse'
import { Psychopharmacology } from './pages/modules/Psychopharmacology'
import { DiagnosticTool } from './pages/tools/DiagnosticTool'
import { Assessment } from './pages/Assessment'
import { Glossary } from './pages/Glossary'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="settings" element={<Settings />} />

            {/* Module Routes */}
            <Route path="mood" element={<MoodDisorders />} />
            <Route path="anxiety" element={<AnxietyDisorders />} />
            <Route path="suicide-risk" element={<SuicideRisk />} />
            <Route path="psychosis" element={<Psychosis />} />
            <Route path="ptsd-ocd" element={<PTSD_OCD />} />
            <Route path="substance" element={<SubstanceUse />} />
            <Route path="medications" element={<Psychopharmacology />} />

            {/* Tools & Resources Routes */}
            <Route path="tools/diagnostic" element={<DiagnosticTool />} />
            <Route path="assessment" element={<Assessment />} />
            <Route path="glossary" element={<Glossary />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
