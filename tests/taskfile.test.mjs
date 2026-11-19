import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { test } from 'node:test'

const repositoryRoot = new URL('../', import.meta.url)
const taskAvailable = spawnSync('task', ['--version']).status === 0
const taskTestOptions = { skip: taskAvailable ? false : 'Task is an optional local tool' }

function runTask(...args) {
  return spawnSync('task', args, {
    cwd: repositoryRoot,
    encoding: 'utf8',
  })
}

function assertTaskSucceeds(result) {
  assert.equal(result.status, 0, `${result.stdout}${result.stderr}`)
}

test('Taskfile exposes the common presentation workflows', taskTestOptions, () => {
  const result = runTask('--list')

  assertTaskSucceeds(result)
  for (const taskName of ['install', 'start', 'test', 'build', 'pdf']) {
    assert.match(result.stdout, new RegExp(`\\* ${taskName}:`))
  }
})

test('Taskfile delegates to the existing presentation commands', taskTestOptions, () => {
  const expectedCommands = new Map([
    [[], 'task --list'],
    [['install'], 'pnpm install --frozen-lockfile'],
    [['start'], 'pnpm run dev'],
    [['test'], 'node --test tests/*.test.mjs'],
    [['build'], 'pnpm run build'],
    [['pdf'], 'pnpm run export --output battle-tested-wagtail.pdf'],
  ])

  for (const [args, expectedCommand] of expectedCommands) {
    const result = runTask('--dry', ...args)
    assertTaskSucceeds(result)
    assert.match(`${result.stdout}${result.stderr}`, new RegExp(expectedCommand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  }
})

test('native PDF export has a reproducible browser dependency and ignored output', async () => {
  const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))
  const workspace = await readFile(new URL('../pnpm-workspace.yaml', import.meta.url), 'utf8')
  const gitignore = await readFile(new URL('../.gitignore', import.meta.url), 'utf8')
  const playwrightVersion = packageJson.devDependencies?.['playwright-chromium']

  assert.match(playwrightVersion, /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/)
  assert.match(workspace, /^allowBuilds:\n(?:  .+\n)*  playwright-chromium: true$/m)
  assert.match(gitignore, /^\/battle-tested-wagtail\.pdf$/m)
})
