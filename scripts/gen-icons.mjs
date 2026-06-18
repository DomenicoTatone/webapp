// Reproducible icon/OG generation from inline SVG sources.
// Run: node scripts/gen-icons.mjs
import { Resvg } from '@resvg/resvg-js'
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = resolve(__dirname, '../public')
mkdirSync(PUBLIC, { recursive: true })

const GRAD = `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#0d9488"/><stop offset="1" stop-color="#0891b2"/>
</linearGradient>`

const CHAIN = (tx, ty, scale) => `<g transform="translate(${tx},${ty}) scale(${scale})"
  stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
</g>`

const icon = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>${GRAD}</defs>
  <rect width="512" height="512" rx="112" fill="url(#g)"/>
  ${CHAIN(116, 116, 11.67)}
</svg>`

const maskable = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>${GRAD}</defs>
  <rect width="512" height="512" fill="url(#g)"/>
  ${CHAIN(148, 148, 9)}
</svg>`

const og = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${GRAD}
    <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.10"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#sheen)"/>
  <rect x="92" y="150" width="180" height="180" rx="40" fill="#ffffff" fill-opacity="0.14"/>
  ${CHAIN(120, 178, 5.6)}
  <text x="312" y="262" font-family="Outfit, Inter, Arial, sans-serif" font-size="86" font-weight="800" fill="#ffffff">DeepLink Pro</text>
  <text x="314" y="332" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="500" fill="#ffffff" fill-opacity="0.92">Generatore di link affiliati per viaggi</text>
  <text x="314" y="430" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="600" fill="#ffffff" fill-opacity="0.85">Booking · Tradedoubler · GetYourGuide · Civitatis</text>
</svg>`

function png(svg, width) {
  return new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true },
  })
    .render()
    .asPng()
}

const outputs = [
  ['pwa-512.png', icon, 512],
  ['pwa-192.png', icon, 192],
  ['apple-touch-icon.png', icon, 180],
  ['pwa-512-maskable.png', maskable, 512],
  ['og-image.png', og, 1200],
]

for (const [name, svg, width] of outputs) {
  writeFileSync(resolve(PUBLIC, name), png(svg, width))
  console.log('wrote', name)
}
