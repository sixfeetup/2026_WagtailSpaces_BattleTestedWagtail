# Taskfile Workflow Design

## Intent

Give contributors short, memorable commands for the presentation’s common local workflows, especially starting Slidev and exporting a PDF, while preserving the existing pnpm scripts as the underlying source of truth.

## Goals

- Provide Task v3 commands for dependency installation, presentation startup, tests, production builds, and PDF export.
- Use Slidev’s native exporter rather than DeckTape.
- Make PDF export reproducible by installing `playwright-chromium` as an exact dev dependency.
- Document both the Task-based workflow and the existing direct pnpm commands.

## Non-goals

- Replace pnpm scripts or introduce a second presentation exporter.
- Add deployment, QR-code generation, or theme-gallery tasks.
- Change slide content, theme behavior, or deployment configuration.

## Constraints

- Node.js remains at the project’s existing `22.12.0` floor.
- `pnpm install --frozen-lockfile` remains the reproducible install command.
- The generated PDF is named `battle-tested-wagtail.pdf` and must remain untracked.
- The Taskfile must use Task v3 syntax.

## Approaches

1. **Taskfile wrappers around existing pnpm scripts — selected.** This gives contributors convenient commands without duplicating Slidev configuration or replacing the package scripts.
2. **Expand package scripts only.** This avoids another tool, but does not satisfy the request for a Taskfile and offers no single discoverable `task` command.
3. **Use DeckTape for PDF export.** This can capture browser presentations generically, but adds a redundant exporter and loses Slidev-native export options.

## Design

Create `Taskfile.yml` with a default task that lists commands and named `install`, `start`, `test`, `build`, and `pdf` tasks. Each task delegates to the existing pnpm or Node command; `pdf` passes `--output battle-tested-wagtail.pdf` to `slidev export`.

Add `playwright-chromium` as an exact dev dependency using pnpm so both `package.json` and `pnpm-lock.yaml` stay synchronized. Keep the existing `pnpm-workspace.yaml` build-script approval for that package. Ignore the named PDF output and update the README with Task installation and command examples while retaining direct pnpm instructions.

## Success Criteria

- `task` lists the five workflow tasks.
- `task start`, `task test`, `task build`, and `task pdf` delegate to the intended existing commands.
- `playwright-chromium` is installed as an exact dev dependency and its browser install script remains approved.
- `task pdf` produces `battle-tested-wagtail.pdf` without leaving a trackable generated file.
- Existing presentation tests and the production build continue to pass.
