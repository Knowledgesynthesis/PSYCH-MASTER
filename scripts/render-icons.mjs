// Renders PWA/app icons from public/favicon.svg using the preinstalled Playwright Chromium.
import { createRequire } from 'node:module'
const { chromium } = createRequire(import.meta.url)('playwright')
import { readFileSync } from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const svg = readFileSync(path.join(root, 'public/favicon.svg'), 'utf8')
const targets = [
  { file: 'pwa-192x192.png', size: 192, pad: 0, radius: true },
  { file: 'pwa-512x512.png', size: 512, pad: 0, radius: true },
  { file: 'apple-touch-icon.png', size: 180, pad: 0, radius: false },
  { file: 'maskable-512x512.png', size: 512, pad: 0.18, radius: false },
]
const browser = await chromium.launch()
const page = await browser.newPage({ deviceScaleFactor: 1 })
for (const t of targets) {
  const inner = Math.round(t.size * (1 - t.pad * 2))
  const body = t.radius ? svg : svg.replace('rx="14"', 'rx="0"')
  const html = `<html><body style="margin:0;background:${t.pad ? 'linear-gradient(135deg,#4f46e5,#0d9488)' : 'transparent'};width:${t.size}px;height:${t.size}px;display:grid;place-items:center">
    <div style="width:${inner}px;height:${inner}px">${body.replace('<svg ', `<svg width="${inner}" height="${inner}" `)}</div></body></html>`
  await page.setViewportSize({ width: t.size, height: t.size })
  await page.setContent(html)
  await page.screenshot({ path: path.join(root, 'public', t.file), omitBackground: !t.pad })
}
await browser.close()
console.log('icons rendered')
