import { lazy, Suspense, useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { BookOpen, Brain, ClipboardList, Home, Layers, Library, Menu, Monitor, Moon, Search, Settings, Stethoscope, Sun, Wrench, X } from 'lucide-react'
import { modules, CONTENT_REVIEWED } from '@/content'
import { tools } from '@/content/nav'
import { useProgress } from '@/store/progress'
import { usePrefs, type ThemePref } from '@/store/prefs'
import { ModuleIcon } from '@/components/icons'
import { cn, pct } from '@/lib/utils'

const CommandPalette = lazy(() => import('./CommandPalette'))

function useApplyTheme() {
  const theme = usePrefs((s) => s.theme)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => document.documentElement.classList.toggle('dark', theme === 'dark' || (theme === 'system' && mq.matches))
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [theme])
}

function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = usePrefs()
  const next: Record<ThemePref, ThemePref> = { system: 'light', light: 'dark', dark: 'system' }
  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor
  return (
    <button type="button" onClick={() => setTheme(next[theme])} className={cn('inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground', className)} aria-label={`Theme: ${theme}. Switch to ${next[theme]}`} title={`Theme: ${theme}`}>
      <Icon className="h-[18px] w-[18px]" />
    </button>
  )
}

function SideNav({ onNavigate }: { onNavigate?: () => void }) {
  const sections = useProgress((s) => s.sections)
  const link = ({ isActive }: { isActive: boolean }) =>
    cn('flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors', isActive ? 'bg-primary/10 font-medium text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground')
  return (
    <nav className="space-y-6" aria-label="Main">
      <div className="space-y-0.5">
        <NavLink to="/" end className={link} onClick={onNavigate}><Home className="h-4 w-4" /> Dashboard</NavLink>
      </div>
      <div>
        <div className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">Learn</div>
        <div className="space-y-0.5">
          {modules.map((m) => {
            const done = m.sections.filter((s) => sections[`${m.id}/${s.id}`]).length
            return (
              <NavLink key={m.id} to={m.path} className={link} onClick={onNavigate}>
                <ModuleIcon name={m.icon} className="h-4 w-4 shrink-0" />
                <span className="flex-1 truncate">{m.short}</span>
                {done > 0 && <span className="text-[10px] tabular-nums text-muted-foreground">{pct(done, m.sections.length)}%</span>}
              </NavLink>
            )
          })}
        </div>
      </div>
      <div>
        <div className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">Practice</div>
        <div className="space-y-0.5">
          <NavLink to="/practice/questions" className={link} onClick={onNavigate}><ClipboardList className="h-4 w-4" /> Question bank</NavLink>
          <NavLink to="/practice/flashcards" className={link} onClick={onNavigate}><Layers className="h-4 w-4" /> Flashcards</NavLink>
          <NavLink to="/practice/cases" className={link} onClick={onNavigate}><Stethoscope className="h-4 w-4" /> Clinical cases</NavLink>
        </div>
      </div>
      <div>
        <div className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">Tools</div>
        <div className="space-y-0.5">
          {tools.map((t) => (
            <NavLink key={t.id} to={t.to} className={link} onClick={onNavigate}><Wrench className="h-4 w-4" /> <span className="truncate">{t.title}</span></NavLink>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">Reference</div>
        <div className="space-y-0.5">
          <NavLink to="/glossary" className={link} onClick={onNavigate}><BookOpen className="h-4 w-4" /> Glossary</NavLink>
          <NavLink to="/references" className={link} onClick={onNavigate}><Library className="h-4 w-4" /> References</NavLink>
          <NavLink to="/settings" className={link} onClick={onNavigate}><Settings className="h-4 w-4" /> Settings</NavLink>
        </div>
      </div>
    </nav>
  )
}

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Psych Master home">
      <img src="/favicon.svg" alt="" className="h-8 w-8" width={32} height={32} />
      <span className="text-[17px] font-bold tracking-tight">Psych Master</span>
    </Link>
  )
}

export function AppShell() {
  useApplyTheme()
  const location = useLocation()
  const [drawer, setDrawer] = useState(false)
  const [palette, setPalette] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPalette((p) => !p)
      }
      if (e.key === '/' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        setPalette(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Scroll to top on page change, or to the hash target when present.
  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1))
      const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
      return () => clearTimeout(t)
    }
    window.scrollTo({ top: 0 })
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : ''
  }, [drawer])

  const bottom = [
    { to: '/', label: 'Home', icon: Home, end: true },
    { to: '/learn', label: 'Learn', icon: Brain },
    { to: '/practice', label: 'Practice', icon: ClipboardList },
    { to: '/tools', label: 'Tools', icon: Wrench },
  ]

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">Skip to content</a>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-card/70 backdrop-blur lg:flex">
        <div className="flex h-16 items-center justify-between px-5">
          <Logo />
          <ThemeToggle />
        </div>
        <div className="px-3">
          <button type="button" onClick={() => setPalette(true)} className="flex w-full items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground hover:border-primary/50">
            <Search className="h-4 w-4" /> Search
            <kbd className="ml-auto rounded border border-border px-1.5 text-[10px]">⌘K</kbd>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-5 scrollbar-thin">
          <SideNav />
        </div>
      </aside>

      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/85 px-3 backdrop-blur lg:hidden">
        <button type="button" onClick={() => setDrawer(true)} className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
        <Logo />
        <div className="flex items-center">
          <button type="button" onClick={() => setPalette(true)} className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted" aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-slate-950/50" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[82%] max-w-xs flex-col bg-card shadow-2xl animate-fade-in">
            <div className="flex h-14 items-center justify-between px-4">
              <Logo />
              <button type="button" onClick={() => setDrawer(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 pb-8 pt-2">
              <SideNav onNavigate={() => setDrawer(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        <main id="main" className="mx-auto w-full max-w-5xl px-4 pb-28 pt-6 sm:px-6 lg:pb-16 lg:pt-10">
          <Outlet />
        </main>
        <footer className="mx-auto max-w-5xl px-4 pb-24 text-xs text-muted-foreground sm:px-6 lg:pb-8">
          <div className="border-t border-border pt-5">
            Psych Master · content reviewed {CONTENT_REVIEWED} · <Link to="/references" className="underline underline-offset-2">sources</Link> · For learning; confirm doses and approvals against current labeling and local protocols.
          </div>
        </footer>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden" aria-label="Quick">
        {bottom.map((b) => (
          <NavLink key={b.to} to={b.to} end={b.end} className={({ isActive }) => cn('flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium', isActive ? 'text-primary' : 'text-muted-foreground')}>
            <b.icon className="h-5 w-5" />
            {b.label}
          </NavLink>
        ))}
      </nav>

      <Suspense fallback={null}>{palette && <CommandPalette open={palette} onClose={() => setPalette(false)} />}</Suspense>
    </div>
  )
}
