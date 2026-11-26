import type { Module, ModuleId } from './types'
import { mood } from './modules/mood'
import { anxiety } from './modules/anxiety'
import { suicide } from './modules/suicide'
import { psychosis } from './modules/psychosis'
import { traumaOcd } from './modules/trauma-ocd'
import { substance } from './modules/substance'
import { pharm } from './modules/pharm'
import { emergencies } from './modules/emergencies'

/** Recommended learning order. */
export const modules: Module[] = [mood, anxiety, suicide, psychosis, traumaOcd, substance, pharm, emergencies]

export const moduleById = Object.fromEntries(modules.map((m) => [m.id, m])) as Record<ModuleId, Module>

export const allFlashcards = modules.flatMap((m) => m.flashcards.map((c) => ({ ...c, module: m.id })))

export const CONTENT_REVIEWED = 'November 2026'
