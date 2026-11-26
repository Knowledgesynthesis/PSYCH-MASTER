# Psych Master

Evidence-based psychiatry you learn by doing. Psych Master is an offline-capable web app for medical students, residents and clinicians covering mood, anxiety, suicide risk, psychosis, trauma/OCD, substance use, psychopharmacology, and psychiatric emergencies.

**Content reviewed November 2026** against DSM-5-TR, current guidelines (APA, CANMAT, NICE, VA/DoD, ASAM) and FDA actions through late 2026. Every module section cites its sources; see [`docs/CONTENT-AUDIT.md`](docs/CONTENT-AUDIT.md) for what was corrected and added.

## What's inside

| | |
|---|---|
| **8 modules** | 50 sections and 43 inline self-checks; every section has a clinical "why it matters", criteria tables, pitfalls, classify-and-reveal exercises and cited sources |
| **72-question bank** | Vignettes at three levels with a rationale for *every* option; practice mode, timed exam mode, retry missed, flagging, per-topic accuracy |
| **123 flashcards** | Spaced repetition (SM-2 family) with honest-grading prompts and keyboard shortcuts |
| **7 clinical cases** | Step-by-step decisions scored best / acceptable / harmful, with debriefs |
| **6 tools** | Diagnostic Pathfinder (DSM-5-TR episode and duration logic) · Suicide Risk Formulation (SAFE-T/C-SSRS concepts, documentation summary) · Clinical scales (PHQ-9, GAD-7, AUDIT-C, CIWA-Ar, COWS) · Antidepressant switch planner · Toxic syndrome differentiator · Drug explorer (59 drugs, heatmaps, compare) |
| **Reference** | 99-term glossary, 103 references with "cited in" back-links, ⌘K search across everything |

Progress (sections learned, answers, flashcard schedules, case scores) is stored only in the browser and can be exported/imported from Settings.

## Develop

Requires Node ≥ 20.19.

```bash
npm install
npm run dev          # http://localhost:5173
npm run check        # typecheck + lint + 470+ unit/content-integrity tests
npm run build        # production build in dist/ (PWA service worker included)
npm run preview      # serve the build on :4173
npm run e2e          # browser smoke test of every route at desktop and phone sizes (needs `npm run preview` running)
```

Stack: React 19, React Router 7, Vite 8, Tailwind CSS 4, Zustand 5, Vitest, vite-plugin-pwa. Deployed on Vercel (`vercel.json` provides SPA rewrites and asset caching).

## Editing content

All learning content is typed data in `src/content/` (modules, questions, cases, glossary, drugs, references). The content tests (`src/content/content.test.ts`) fail the build if an ID is duplicated, a citation doesn't resolve, a section is uncited, a question lacks per-option rationales, an internal link is dead, or a previously corrected error reappears.

## Scope

A learning resource with synthetic cases. Confirm doses and approvals against current labeling and local protocols. In a crisis in the US, call or text **988**.

License: MIT.
