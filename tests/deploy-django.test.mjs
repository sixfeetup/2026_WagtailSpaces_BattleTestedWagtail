import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { parseSync } from '@slidev/parser'

const root = new URL('../', import.meta.url)
const source = await readFile(new URL('tests/fixtures/deploy-django-source.md', root), 'utf8')
const raw = await readFile(new URL('slides.md', root), 'utf8')
const deck = parseSync(raw)
const normalized = text => (text || '').replace(/\s+/g, ' ').trim()
const heading = section => section.match(/^# (.+)/)[1].replace(/\{[^}]+\}$/, '').trim()
const original = source.replace(/^---\n[\s\S]*?\n---\n/, '').trim().split(/\n(?=# )/)
  .filter(section => heading(section) !== 'Hot Off the Presses')

const title = 'Battle-Tested Wagtail: Running at Scale with Kubernetes'
const slideByTitle = new Map(deck.slides.map(slide => [slide.title, slide]))
const portedSlides = original.map((section, index) => slideByTitle.get(index === 0 ? title : heading(section)))

test('opens with the college case, walks through GitOps, and closes with resources', () => {
  assert.equal(original.length, 13)
  assert.ok(portedSlides.every(Boolean), 'every retained original slide must still be present')
  assert.deepEqual(deck.slides.map(s => s.title), [
    title,
    'Wagtail at Scale: The College Intranet',
    'Why Kubernetes for Django?',
    'GitOps: The Operating Model',
    'Why GitOps for Django?',
    'Enter Argo CD',
    'GitOps Flow',
    'Enabled by Scaf',
    'Nix Solves the Cross-Platform Issues',
    'New in Scaf: Wagtail CMS',
    'Life Before GitOps vs After',
    'Start Your GitOps Journey Today',
    'Resources',
    'Talk Slides',
    'Talk To Me',
  ])
  assert.equal(deck.slides[0].frontmatter.theme, './themes/sixie-purple')
  assert.equal(deck.slides[0].frontmatter.title, title)
  assert.equal(deck.slides[0].frontmatter.event, 'Wagtail Space 2026')
  assert.equal(deck.slides[0].frontmatter.date, 'Wagtail Space 2026')
  assert.doesNotMatch(raw, /data-background-image|semi-filtered|r-fit-text|:::|Welcome to Slidev/)
  assert.doesNotMatch(raw, /^transition:/m)
})

test('Resources links directly to both Scaf repositories in the getscaf organization', () => {
  const { content } = slideByTitle.get('Resources')
  assert.match(content, /\]\(https:\/\/github\.com\/getscaf\/scaf\)/)
  assert.match(content, /\]\(https:\/\/github\.com\/getscaf\/sfu-fullstack-template\)/)
})

test('Resources links to the Real Python podcast interview', () => {
  assert.match(slideByTitle.get('Resources').content, /\[Real Python Podcast #254[^\]]*\]\(https:\/\/realpython\.com\/podcasts\/rpp\/254\/\)/)
})

test('Talk Slides links to the current Wagtail presentation repository', () => {
  const { content } = slideByTitle.get('Talk Slides')
  assert.ok(content.includes('<https://github.com/sixfeetup/2026_WagtailSpaces_BattleTestedWagtail>'))
  assert.doesNotMatch(content, /2025_PyOhio_DeployDjango|original presentation repository/)
  assert.ok(content.includes('/images/deploy-django/presentation-qr.png'))
})

test('preserves every speaker note in Slidev notes, not visible content', () => {
  let count = 0
  original.forEach((section, index) => {
    const note = section.match(/::: notes\n([\s\S]*?)\n:::/)?.[1]
    if (note) count++
    assert.equal(normalized(portedSlides[index]?.note), normalized(note), `notes changed on original slide ${index + 1}`)
    if (note) assert.ok(!portedSlides[index].content.includes(note.trim()))
  })
  assert.equal(count, 7)
})

test('preserves original visible list items except the two superseded Scaf repository links', () => {
  original.forEach((section, index) => {
    const body = section.replace(/::: notes\n[\s\S]*?\n:::/g, '')
    const items = [...body.matchAll(/^\s*(?:\* |\d+\. )(.+)$/gm)].map(m => m[1].trim())
    for (const item of items) {
      if (heading(section) === 'Resources' && /\]\((?:https:\/\/)?github\.com\/sixfeetup\/scaf(?:-fullstack-template)?\)$/.test(item)) continue
      assert.ok(portedSlides[index]?.content.replaceAll('https://', '').includes(item.replaceAll('https://', '')), `missing original slide ${index + 1} item: ${item}`)
    }
  })
  for (const url of ['mailto:calvin@sixfeetup.com', 'https://linkedin.com/in/calvinhp', 'https://x.com/calvinhp', 'https://fosstodon.org/@calvinhp', 'https://bsky.app/profile/calvinhp.com'])
    assert.ok(raw.includes(url), `missing contact link ${url}`)
})

test('bundles verified content images and the updated QR, never Git LFS pointer files', async () => {
  const files = [
    ['argocd.png', '081b022635e0a61656617d86ad50ecb331abcb8eb7d34a5ae5625688d619f236'],
    ['scaf-logo.webp', 'ca87c4cf5bf0502c7cc79bbc202eb6b518b5643544a40bc34c3ea874c0bc7a0c'],
    ['gitops-flow.png', 'cec273179ac714aa86662f2472cca6c8b479bbcf46ac1cfc98b28c4982828a6d'],
    ['presentation-qr.png', '002ba690a399ec538725a30b04a7aeaf541d5b88ffd76a7fbbb54ac53de0d7d0'],
  ]
  for (const [file, hash] of files) {
    const image = await readFile(new URL(`public/images/deploy-django/${file}`, root))
    assert.ok(!image.toString('utf8', 0, 80).includes('git-lfs.github.com'))
    assert.ok(image.length > 500)
    if (hash) assert.equal(createHash('sha256').update(image).digest('hex'), hash)
    if (file.endsWith('.png')) assert.equal(image.subarray(1, 4).toString(), 'PNG')
    else assert.equal(image.subarray(0, 4).toString(), 'RIFF')
    assert.ok(raw.includes(`/images/deploy-django/${file}`))
  }
})
