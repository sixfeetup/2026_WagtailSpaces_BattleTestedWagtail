# Sixie Purple Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** A copyable Sixie Purple theme applied to the current starter deck for visual feedback.
**Architecture:** Local Slidev theme with shared content frame, native Vue slot layouts, CSS tokens, and relative bundled artwork. No Reveal.js dependencies.
**Tech Stack:** Slidev 53, Vue 3, CSS, Node test runner.
**Spec:** docs/superpowers/specs/2026-11-16-sixie-purple-design.md

## Global Constraints
- Preserve the starter content and 16 slides; no real talk content yet.
- Original palette, Poppins/Roboto Mono, artwork and attribution.
- No publishing or root dependency churn; no commits unless requested.
- Theme folder must work independently of this deck.

## Review Focus
- Artwork URLs must work at a deployment subpath.
- Named slots and arbitrary layout classes must remain usable.
- Dense starter content must not collide with the logo/header.
- Cover/section text must not overlap frame artwork.
- Theme must not depend on deck-specific components or asset locations.

### Task 1: Theme package and layouts
**Files:** `tests/sixie-purple.test.mjs`, `themes/sixie-purple/{package.json,styles/*,layouts/*,components/*,assets/*,LICENSE.md,README.md}`.
**Interfaces:** Cover accepts speaker/event; section accepts number; content frame accepts variant; two-cols forwards default/right slots; aliases support title-body and code-example. Relative artwork imports.
- [x] Write Node contract tests for package defaults, layout availability, relative assets, named slots, font defaults and attribution. Run `node --test tests/sixie-purple.test.mjs`, expect missing-theme failures.
- [x] Implement package, base styles, shared frame, layouts, source artwork and attribution.
- [x] Run contract tests; expect pass.

### Task 2: Apply to starter deck
**Files:** `slides.md`, root `README.md`, integration assertions in `tests/sixie-purple.test.mjs`.
**Interfaces:** Headmatter selects local theme; layout metadata previews cover, section, code, conclusion and close.
- [x] Add integration assertions and observe them fail against seriph.
- [x] Change headmatter/layout metadata; remove conflicting gradient heading override; keep starter content and 16 slides. Document preview/layout use.
- [x] Run tests and `pnpm run build --base /theme-preview/`; expect pass, relative assets emitted.

### Task 3: Visual verification and reuse
**Files:** theme CSS/layouts as needed; theme README verification notes.
- [x] Launch browser against local preview; inspect cover, content, section, code, columns and close, including screenshots and console errors.
- [x] Build a separate temporary deck pointing to the theme with no starter dependencies; verify copyable packaging.
- [x] Self-review changes, rerun tests/build, report preview URL and limitations. No subagent tool available; self-review only.

## Execution ledger
- Working on branch `feat/sixie-purple-theme` in current checkout so the existing localhost:3030 preview updates for user feedback; do not move the live deck to a separate worktree.

- Task 1 complete: initial 4 contract tests failed on absent theme; passed after implementation.
- Task 2 complete: integration assertion failed against seriph, then passed after theme selection; all 16 starter slides retained.
- Task 3 complete: 6 Node tests passed; main subpath build passed. Chrome inspected all 16 slides with no content overflow, missing images, or JavaScript errors. Separate copied-theme deck built from its own working directory and rendered all 8 gallery slides under `/theme-preview/` with no failed asset requests or page errors.
- Ruling: preserve starter content rather than turn it into a theme catalog; provide an additional self-contained `example.md` gallery for uncluttered feedback. Cost: two preview URLs instead of one.
- Ruling: use a white-filtered logo on black section slides for legibility; keep original SVG unchanged. Cost: slight departure from the source stylesheet's unfiltered logo rule.
- Verification fixes: separated frame/grid class names, kept code tokens dark-surface compatible, and applied `zoom: 0.95` only to the dense starter Motions slide.
- Independent build command initially failed because Vite resolved an entry outside the command's working directory; running the copied deck from its own directory passed without theme changes.
- Final review: self-review (no subagent tool). Checked slot forwarding, local-only artwork dependencies, theme source attribution, CSS layout scope, code contrast, and subpath asset resolution. No critical/important findings remain.
- Deferred: self-hosted font files (documented network/fallback behavior) and the existing starter deck's large Monaco/Shiki bundle warning. No publishing, merging, or commits performed.
