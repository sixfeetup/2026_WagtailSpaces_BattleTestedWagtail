import assert from 'node:assert/strict'
import { readFile, readdir, access } from 'node:fs/promises'
import { test } from 'node:test'

const root = new URL('../themes/sixie-purple/', import.meta.url)
const read = path => readFile(new URL(path, root), 'utf8')

test('theme is standalone and declares original fonts and palette defaults', async () => {
  const pkg = JSON.parse(await read('package.json'))
  assert.equal(pkg.name, 'slidev-theme-sixie-purple')
  assert.equal(pkg.slidev.defaults.fonts.sans, 'Poppins')
  assert.equal(pkg.slidev.defaults.fonts.mono, 'Roboto Mono')
  assert.equal(pkg.slidev.defaults.aspectRatio, '16/9')
  assert.equal(pkg.license, 'CC-BY-SA-4.0')
  assert.equal(pkg.dependencies, undefined)
  const css = await read('styles/theme.css')
  for (const color of ['#9d00b0', '#3c23d3', '#4ea6dc', '#f0effa', '#15111f'])
    assert.ok(css.includes(color), `missing original color ${color}`)
})

test('layouts include native slots and all core branded variants', async () => {
  for (const layout of ['default', 'cover', 'section', 'code', 'conclusion', 'center', 'two-cols', 'title-body', 'code-example'])
    assert.match(await read(`layouts/${layout}.vue`), /<slot/)
  assert.match(await read('layouts/two-cols.vue'), /<slot name="right"/)
  assert.match(await read('layouts/two-cols.vue'), /layoutClass/)
  assert.match(await read('layouts/cover.vue'), /speaker/)
  assert.match(await read('layouts/section.vue'), /number/)
})

test('column grid remains isolated and section branding is opt-in', async () => {
  assert.doesNotMatch(await read('layouts/two-cols.vue'), /variant="columns"/)
  assert.match(await read('layouts/section.vue'), /showLogo/)
  assert.match(await read('styles/theme.css'), /\.sixie-section-logo-hidden\s*\{\s*visibility: hidden/)
})

test('original connected cards, staggered conclusions, and code densities are provided', async () => {
  assert.match(await read('layouts/title-body.vue'), /variant="title-body"/)
  const css = await read('styles/theme.css')
  assert.match(css, /rotate\(29deg\)/)
  assert.match(css, /\.sixie-conclusion[^}]*nth-child\(2\)/)
  for (const density of ['large', 'medium', 'wide', 'dense'])
    assert.ok(css.includes(`.code-${density}`), `missing ${density} code sizing`)
  const conclusion = await read('layouts/conclusion.vue')
  for (const field of ['presenter', 'email', 'credit', 'creditEvent'])
    assert.ok(conclusion.includes(field), `missing ${field} contact metadata`)
})

test('all dotted-header layouts share Reveal-style safe gutters', async () => {
  const css = await read('styles/theme.css')
  const rule = css.match(/\.sixie-frame\s*\{([^}]+)\}/)?.[1]
  assert.ok(rule, 'the shared frame must own horizontal gutters')
  const padding = rule.match(/padding:\s*[\d.]+px\s+([\d.]+)px\s+[\d.]+px\s+([\d.]+)px/)
  assert.ok(padding)
  const [right, left] = padding.slice(1).map(Number)
  for (const layout of ['default', 'title-body', 'code', 'code-example', 'conclusion', 'center', 'two-cols'])
    assert.match(await read(`layouts/${layout}.vue`), /<SixieFrame/)
  assert.doesNotMatch(css, /\.sixie-title-body\s*\{[^}]*padding-inline/)
  // Original outer margin contributes 19.6px on the 980px Slidev canvas.
  assert.ok(Math.abs((left - 32.67) - 19.6) < 0.02)
  assert.ok(Math.abs((right - 45.73) - 19.6) < 0.02)
  assert.ok(left - 35.93 > 16, 'first dot must sit safely inside the canvas')
})

test('code uses the original muted palette rather than GitHub highlighting', async () => {
  const theme = JSON.parse(await read('setup/sixie-code.json'))
  assert.equal(theme.type, 'dark')
  assert.equal(theme.colors['editor.background'], '#282828')
  assert.equal(theme.colors['editor.foreground'], '#90a9a1')
  const colors = theme.tokenColors.map(t => t.settings.foreground)
  for (const color of ['#b2b347', '#d58aa6', '#d65a50']) assert.ok(colors.includes(color))
  assert.doesNotMatch(await read('setup/shiki.ts'), /github-dark/)
})

test('Shiki renders YAML keys, strings, booleans, and document markers in the original palette', async () => {
  const { codeToTokens } = await import('shiki')
  const theme = JSON.parse(await read('setup/sixie-code.json'))
  const { tokens } = await codeToTokens('---\nresource: iam-user\nvalue: false\nage: 90', { lang: 'yaml', theme })
  const color = text => tokens.flat().find(t => t.content === text)?.color?.toLowerCase()
  assert.equal(color('resource'), '#90a9a1')
  assert.equal(color('iam-user'), '#b2b347')
  assert.equal(color('false'), '#b2b347')
  assert.equal(color('90'), '#d58aa6')
  assert.equal(color('---'), '#b58900')
})

test('artwork is bundled and all theme asset URLs resolve without deck-root paths', async () => {
  const assets = await readdir(new URL('assets/', root))
  for (const file of ['title-frame.png', 'title-logo.svg', 'section-wave-left.png', 'section-wave-right.png'])
    assert.ok(assets.includes(file), `missing ${file}`)
  for (const dir of ['styles', 'layouts', 'components']) {
    for (const file of await readdir(new URL(`${dir}/`, root))) {
      const source = await read(`${dir}/${file}`)
      assert.doesNotMatch(source, /(?:src=|url\()['"]?\/(?:images|assets)/)
      for (const match of source.matchAll(/['"](\.\.\/assets\/[^'"]+)['"]/g))
        await access(new URL(match[1], new URL(`${dir}/${file}`, root)))
    }
  }
})

test('starter deck uses the local theme and previews core layouts', async () => {
  const deck = await readFile(new URL('../slides.md', import.meta.url), 'utf8')
  assert.match(deck, /theme: \.\/themes\/sixie-purple/)
  for (const layout of ['cover', 'section', 'code', 'conclusion', 'two-cols'])
    assert.ok(deck.includes(`layout: ${layout}`), `missing preview of ${layout}`)
  assert.doesNotMatch(deck, /-webkit-text-fill-color: transparent/)
  assert.ok(deck.includes('# Welcome to Slidev'))
  assert.ok(deck.includes('# Monaco Editor'))
})

test('theme documents reuse, attribution, and the adapted source license', async () => {
  assert.match(await read('README.md'), /theme: \.\/themes\/sixie-purple/)
  assert.match(await read('README.md'), /sixfeetup\/2026_AWSCommunityDayMidwest/)
  assert.match(await read('README.md'), /adapt/i)
  assert.match(await read('LICENSE.md'), /Attribution-ShareAlike 4\.0/)
})
