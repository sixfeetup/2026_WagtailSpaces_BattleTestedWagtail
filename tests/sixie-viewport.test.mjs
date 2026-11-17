import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFile } from 'node:fs/promises'
import { resolveViewportBackground } from '../themes/sixie-purple/viewport.mjs'

test('uses the active branded layout to select a viewport backdrop', () => {
  assert.equal(resolveViewportBackground(), 'paper')
  assert.equal(resolveViewportBackground({ layout: 'cover' }), 'cover')
  assert.equal(resolveViewportBackground({ layout: 'section' }), 'section')
  for (const layout of ['default', 'title-body', 'code', 'code-example', 'conclusion', 'center', 'two-cols'])
    assert.equal(resolveViewportBackground({ layout }), 'paper')
})

test('dark is a class token, not a substring or a property of a hidden neighboring slide', () => {
  assert.equal(resolveViewportBackground({ layout: 'center', class: 'text-center sixie-dark' }), 'dark')
  assert.equal(resolveViewportBackground({ layout: 'cover', class: ['no-logo', 'sixie-dark'] }), 'dark')
  assert.equal(resolveViewportBackground({ layout: 'default', class: 'not-sixie-dark' }), 'paper')
  assert.equal(resolveViewportBackground({ layout: 'default', class: '' }), 'paper')
})

test('does not interfere with image, iframe or third-party layouts', () => {
  for (const layout of ['image', 'image-right', 'iframe', 'none', 'custom-layout'])
    assert.equal(resolveViewportBackground({ layout, class: 'sixie-dark' }), null)
})

test('viewport layer is restricted to live play, not presenter or exports', async () => {
  const layer = await readFile(new URL('../themes/sixie-purple/global-bottom.vue', import.meta.url), 'utf8')
  assert.match(layer, /currentSlideRoute/)
  assert.match(layer, /isPlaying && !isPrintMode/)
  const css = await readFile(new URL('../themes/sixie-purple/styles/viewport.css', import.meta.url), 'utf8')
  assert.match(css, /@media screen/)
  assert.match(css, /#page-root > #slide-container/)
  assert.doesNotMatch(css, /position:\s*fixed|100vw|100vh|transform:/)
})
