import {
  CloudSun, Wind, LifeBuoy, Orbit, Repeat, FlaskConical, Pill, Siren,
  type LucideIcon,
} from 'lucide-react'

export const moduleIcons: Record<string, LucideIcon> = { CloudSun, Wind, LifeBuoy, Orbit, Repeat, FlaskConical, Pill, Siren }

export function ModuleIcon({ name, className }: { name: string; className?: string }) {
  const Icon = moduleIcons[name] ?? Pill
  return <Icon className={className} aria-hidden="true" />
}
