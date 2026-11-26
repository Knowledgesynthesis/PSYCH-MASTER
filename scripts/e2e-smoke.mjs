// Browser smoke/stress test: visits every route at desktop and phone sizes, fails on
// console errors, uncaught exceptions, horizontal overflow, or broken interactions.
// Usage: npm run build && npx vite preview --port 4173 & node scripts/e2e-smoke.mjs [baseUrl] [shotDir]
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
let chromium
try { ({ chromium } = require('playwright')) } catch { ({ chromium } = require('/opt/node-tools/node_modules/playwright')) }

const base = process.argv[2] ?? 'http://localhost:4173'
const shots = process.argv[3]
const routes = [
  '/', '/learn', '/learn/mood', '/learn/anxiety', '/learn/suicide', '/learn/psychosis', '/learn/trauma-ocd', '/learn/substance', '/learn/pharm', '/learn/emergencies',
  '/practice', '/practice/questions', '/practice/flashcards', '/practice/cases', '/practice/cases/case-ed-overdose', '/practice/cases/case-lithium',
  '/tools', '/tools/diagnostic', '/tools/suicide-risk', '/tools/scales', '/tools/scales?scale=ciwa', '/tools/scales?scale=cows', '/tools/switch', '/tools/syndromes', '/tools/drugs', '/tools/drugs?drug=clozapine',
  '/glossary', '/references', '/settings', '/does-not-exist', '/medications', '/suicide-risk',
]
const viewports = [
  { name: 'desktop', width: 1366, height: 900 },
  { name: 'phone', width: 375, height: 760 },
]

const failures = []
const browser = await chromium.launch()
for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(String(e)))
  for (const r of routes) {
    errors.length = 0
    await page.goto(base + r, { waitUntil: 'networkidle' })
    await page.waitForTimeout(150)
    const h1 = await page.locator('main h1').first().textContent().catch(() => null)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    if (!h1) failures.push(`${vp.name} ${r}: no <h1>`)
    if (overflow > 1) failures.push(`${vp.name} ${r}: horizontal overflow ${overflow}px`)
    if (errors.length) failures.push(`${vp.name} ${r}: ${errors.join(' | ')}`)
    if (shots) await page.screenshot({ path: `${shots}/${vp.name}${r.replace(/[/?=&]/g, '_') || '_home'}.png`, fullPage: false })
  }

  // Interactions
  await page.goto(base + '/practice/questions', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /Start \d+ questions/ }).click()
  await page.getByRole('radio').first().click()
  await page.getByRole('button', { name: 'Check answer' }).click()
  if (!(await page.getByText(/^(Correct|Incorrect)\.$/).first().isVisible())) failures.push(`${vp.name}: question feedback did not appear`)

  await page.goto(base + '/practice/flashcards', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /Review \d+ cards/ }).click()
  await page.getByRole('button', { name: 'Show answer' }).click()
  await page.getByRole('button', { name: /^Good/ }).click()
  if (!(await page.getByText(/1 reviewed/).isVisible())) failures.push(`${vp.name}: flashcard grading failed`)

  await page.goto(base + '/tools/diagnostic', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /Psychosis between manic episodes/ }).click()
  if (!(await page.getByText(/Schizoaffective disorder, bipolar type/).isVisible())) failures.push(`${vp.name}: pathfinder preset failed`)

  await page.goto(base + '/tools/syndromes', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /SSRI \+ tramadol/ }).click()
  if (!(await page.locator('aside li').first().getByText('Serotonin syndrome').isVisible())) failures.push(`${vp.name}: syndromes ranking failed`)

  await page.goto(base + '/learn/mood', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Hypomanic episode' }).first().click()
  if (!(await page.getByText(/observable change, no marked impairment/).first().isVisible())) failures.push(`${vp.name}: sort exercise failed`)

  // Progress persists across reloads
  await page.reload({ waitUntil: 'networkidle' })
  const stored = await page.evaluate(() => localStorage.getItem('psych-master:progress'))
  if (!stored || !stored.includes('attempts')) failures.push(`${vp.name}: progress not persisted`)

  // Command palette
  if (vp.name === 'desktop') {
    await page.keyboard.press('Control+k')
    await page.getByRole('dialog', { name: 'Search' }).getByRole('textbox').fill('lithium toxicity')
    await page.keyboard.press('Enter')
    await page.waitForURL(/learn|tools|glossary/)
  }
  await ctx.close()
}
await browser.close()
if (failures.length) {
  console.error(`FAILURES (${failures.length}):\n` + failures.join('\n'))
  process.exit(1)
}
console.log(`OK: ${routes.length} routes × ${viewports.length} viewports, interactions passed`)
