# Deploy Pages from Repository Root Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the GitHub Pages workflow build the root-level Slidev project successfully.

**Architecture:** Keep the existing two-job Pages workflow. Correct only its Node version source, root working directory assumptions, source path filters, and uploaded artifact path.

**Tech Stack:** GitHub Actions, Node.js 22.12.0, pnpm, Slidev

**Spec:** `docs/superpowers/specs/2026-11-16-deploy-pages-root-design.md`

## Global Constraints

- Pin Node.js to `22.12.0` in root `.nvmrc`.
- Run install and build commands from the repository root.
- Upload the root `dist` directory.

## Review Focus

- Root `slides.md` changes trigger deployment.
- Local theme and component changes trigger deployment.
- Dependency metadata changes trigger deployment.
- No workflow step references a nonexistent `slides` directory.
- The production build honors the repository-specific base path.

---

### Task 1: Correct the Pages workflow

**Files:**
- Create: `.nvmrc`
- Modify: `.github/workflows/deploy-pages.yml`

**Interfaces:**
- Consumes: root `package.json`, `pnpm-lock.yaml`, `slides.md`, and Slidev source directories
- Produces: a root `dist` artifact for `actions/upload-pages-artifact`

- [ ] **Step 1: Run a failing shell assertion**

Assert `.nvmrc` contains `22.12.0`, the workflow has no `working-directory: slides`, uploads `dist`, and watches the root Slidev build inputs.

- [ ] **Step 2: Confirm the assertion fails because the requested configuration is absent**

- [ ] **Step 3: Add `.nvmrc` and minimally update `.github/workflows/deploy-pages.yml`**

- [ ] **Step 4: Rerun the assertion and confirm it passes**

- [ ] **Step 5: Run `pnpm run build --base /2026_WagtailSpaces_BattleTestedWagtail/` and confirm it succeeds**

- [ ] **Step 6: Commit the change**
