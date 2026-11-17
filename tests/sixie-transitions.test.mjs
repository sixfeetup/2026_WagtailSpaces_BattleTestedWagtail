import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
const root = new URL('../themes/sixie-purple/', import.meta.url)
const read = path => readFile(new URL(path, root), 'utf8')

test('Reveal-style paired sliding is a reusable theme default, not gallery-only metadata', async () => {
  const pkg = JSON.parse(await read('package.json'))
  assert.equal(pkg.slidev.defaults.transition, 'sixie-slide-left | sixie-slide-right')
  const gallery = await read('example.md')
  assert.doesNotMatch(gallery, /^transition:/m)
  const starter = await readFile(new URL('../slides.md', import.meta.url), 'utf8')
  assert.doesNotMatch(starter, /^transition:/m)
})

test('content matches Reveal timing, easing, travel and reduced-motion support', async () => {
  const css = await read('styles/transitions.css')
  assert.match(css, /--sixie-transition-duration:\s*800ms/)
  assert.match(css, /cubic-bezier\(0\.26, 0\.86, 0\.44, 0\.985\)/)
  for (const direction of ['left', 'right'])
    for (const phase of ['enter-active', 'leave-active', 'enter-from', 'leave-to'])
      assert.ok(css.includes(`.sixie-slide-${direction}-${phase}`))
  assert.match(css, /translate:\s*150% 0/)
  assert.match(css, /translate:\s*-150% 0/)
  assert.match(css, /prefers-reduced-motion:\s*reduce/)
})

test('backdrops persist outside the animated canvas and reverse without resetting opacity', async () => {
  const component = await read('global-bottom.vue')
  assert.match(component, /<Teleport[^>]*to="#slide-container"[^>]*defer/)
  assert.match(component, /v-for="kind in viewportBackgrounds"/)
  assert.match(component, /:key="kind"/)
  assert.doesNotMatch(component, /previousBackground|backgroundPhase|watch\(/)
  const css = await read('styles/viewport.css')
  assert.match(css, /isolation:\s*isolate/)
  assert.match(css, /z-index:\s*-1/)
  assert.match(css, /pointer-events:\s*none/)
  assert.match(css, /transition:\s*opacity var\(--sixie-transition-duration\)/)
  assert.doesNotMatch(css, /@keyframes|animation:|position:\s*fixed/)
})
