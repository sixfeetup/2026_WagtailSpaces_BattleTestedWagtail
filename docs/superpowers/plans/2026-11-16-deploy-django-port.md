# Deploy Django Slidev Port Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement inline; no subagent tool is available. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Replace the starter deck with a faithful editable 14-slide port using Sixie Purple.
**Architecture:** Native Slidev Markdown, existing branded layouts, inline two-column content grids, local public media and HTML-comment notes. Main and theme gallery stay untouched in the main checkout.
**Tech Stack:** Slidev 53, Vue 3, existing Node test runner/parser and browser tooling.
**Spec:** docs/superpowers/specs/2026-11-16-deploy-django-port-design.md

## Global Constraints
- Preserve the source's 14 slides, visible copy/order, eight note blocks and DjangoCon 2025 metadata.
- Use Sixie Purple; omit all original photo backgrounds. Preserve Argo CD/Scaf logos, QR and GitOps diagram.
- Upstream commit cddd5d45494931e121c9848bd4c6aef8ffe25287; download actual LFS objects and verify their hashes.
- Work only in `.worktrees/port-deploy-django` on `feat/port-deploy-django`; leave main checkout clean. No commits/merge unless requested.

## Review Focus
- LFS pointer text or HTML fallback must not masquerade as an image.
- Pandoc note/attribute/fenced-column syntax must not leak into visible slides.
- Long resource URLs and dense lists must fit; comparison headings remain aligned under a full-width title.
- Speaker notes must remain notes, not public slide content.
- Public media must resolve at a deployment subpath, not just localhost.

### Task 1: Source fidelity and media
**Files:** `tests/deploy-django.test.mjs`, `tests/fixtures/deploy-django-source.md`, `public/images/deploy-django/*`, `docs/sources/deploy-django.md`.
**Interfaces:** A source fixture anchors title/order/note/list assertions; four relative public media paths are referenced by the new deck.
- [x] Write source fidelity/media tests and observe failures against starter content/absent images.
- [x] Retrieve real images and source/license metadata from pinned commit; verify object hashes.

### Task 2: Native slide port
**Files:** `slides.md`, `README.md`, theme integration assertions in `tests/sixie-purple.test.mjs`.
**Interfaces:** Headmatter selects existing local theme; 14 native slide records and HTML-comment notes; existing layouts remain unchanged.
- [x] Convert the content and note blocks; keep title/source metadata and meaningful images, not photo styling.
- [x] Decouple theme-gallery tests from starter-demo-specific content; the source fidelity suite owns deck-specific assertions.
- [x] Run all Node tests; expect pass.

### Task 3: Preview and validation
**Files:** adjust slide-only spacing as browser evidence requires; no theme changes by default.
- [x] Build with `--base /presentation-preview/`; serve the worktree on port 3032.
- [x] Inspect all 14 rendered slides and notes, all media decode/requests, list content and before/after column alignment.
- [x] Self-review source parity, rerun tests/build, verify main clean, and report worktree/preview without merging.

## Workspace ledger
- Main baseline: 01450a4. Worktree baseline: 17 tests pass.
- Dependencies are linked read-only from the existing main checkout; no package/lockfile changes needed. Workspace and dependency-link names are locally ignored through git info/exclude, leaving main's tracked files untouched.

## Verification and review

- Source fixture matches the pinned upstream Markdown byte-for-byte. All four image SHA-256 values match source objects; actual Git LFS media was retrieved rather than pointer text.
- RED: all four new source/media tests failed against the starter deck. GREEN: 21/21 Node tests now pass, covering all 14 headings/order, visible list items, eight exact note blocks, contact URLs and real media.
- Production build with `/presentation-preview/` passes. Chrome checked all 14 slides in development and all 14 from the static subpath build: expected titles/list counts, actual image decoding, no measured content overflow, no local asset failures or JavaScript errors. Comparison column headings align.
- Original notes verified in `/presenter/3`. An initial verification used nonexistent `/notes/3`; corrected the test to Slidev's actual presenter route, with no production changes needed.
- Visually reviewed cover, logos, QR, diagram, dense/quick-win lists, comparison columns and contacts. Added only local `my-4` spacing to the source horizontal rule; no theme runtime/layout/transition changes.
- Theme integration test now checks the independent gallery rather than requiring old starter-specific slides to remain forever. Updated an outdated theme README statement about the main deck's slide count; gallery itself is unchanged.
- Final review: self-review (no subagent tool). Source wording/year retained; photo backgrounds omitted per user instruction; Pandoc syntax fully converted; links and notes checked; attribution/license recorded; theme/runtime and lockfiles unchanged.
- Main checkout stays clean on main at 01450a4. Port remains uncommitted in the isolated worktree; preview on port 3032. No merge or push performed.
