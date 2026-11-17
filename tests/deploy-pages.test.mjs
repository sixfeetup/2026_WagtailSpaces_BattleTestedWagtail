import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'

const workflow = await readFile(new URL('../.github/workflows/deploy-pages.yml', import.meta.url), 'utf8')

test('Pages installs pinned pnpm without relying on bundled Corepack signing keys', () => {
  assert.match(workflow, /uses: pnpm\/action-setup@v4\s+with:\s+version: 10\.34\.9/)
  assert.doesNotMatch(workflow, /corepack enable/)
  assert.ok(workflow.indexOf('uses: pnpm/action-setup@v4') < workflow.indexOf('run: pnpm install --frozen-lockfile'))
})
