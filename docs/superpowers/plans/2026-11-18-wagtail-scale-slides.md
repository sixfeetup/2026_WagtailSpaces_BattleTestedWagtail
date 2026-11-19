# Wagtail Scale Slides Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver two conference-ready additions covering the college intranet’s scale, the Karpenter node-scaling pattern, and Scaf’s Wagtail option.

**Architecture:** Insert two Markdown slides into the root deck at the approved anchors. Keep supporting attribution and the podcast anecdote in Slidev presenter notes.

**Tech Stack:** Slidev, Markdown, existing Sixie Purple theme.

**Spec:** [Wagtail Scale Slides — Design](../specs/2026-11-18-wagtail-scale-slides-design.md)

## Global Constraints

- Add exactly two slides. Keep all existing slides and notes unchanged.
- Use existing Slidev layouts and theme. No new dependencies, assets, demos, or deployment changes.

## Review Focus

- Project attribution: EKS and Karpenter are a general example, not college infrastructure.
- Metrics attribution: daily visits are production traffic; concurrency and request rate are load-test figures.
- Scaling responsibilities: Karpenter adds nodes, not replicas; Kubernetes schedules the pods.
- Template scope: Wagtail is optional; Next.js is not required.
- Projection and timing: the two new slides are readable at presentation size and don't require a network call to render.

---

### Task 1: Add and preview both slides

**Files:** Modify `slides.md` only.

**Interfaces:** Consumes two existing slide headings as insertion anchors; produces two ordinary Slidev slides and presenter notes, with no code interface changes.

- [ ] Run `pnpm install --frozen-lockfile` and `pnpm build` in the isolated worktree to establish the baseline. Expect exit 0. Run `rg -n '^# (Wagtail at Scale: The College Intranet|New in Scaf: Wagtail CMS)$' slides.md`; expect no matches before edits.
- [ ] Insert **Wagtail at Scale: The College Intranet** immediately after **Why Kubernetes for Django?**. Display **Production: 28k+ visits/day**, **Load test: 5k simulated concurrent users · 60k requests/minute**, and a separately labeled **How to scale on EKS** flow: add Wagtail replicas → pending pods that do not fit → Karpenter provisions nodes → Kubernetes schedules pods. Add speaker notes with both podcast timestamps from the spec, the separate-project pre-warming anecdote, and the transition to Argo CD.
- [ ] Insert **New in Scaf: Wagtail CMS** immediately after **Hot Off the Presses**. Show **“Do you want Wagtail CMS?”** as an opt-in prompt, list Django templates and headless Wagtail with Next.js as the two paths, and link to the v1.18.0 release from the spec.
- [ ] Rerun the heading search; expect exactly the two new headings. Inspect `git diff -- slides.md`; expect two insertion blocks at the approved anchors, no removed lines, and existing notes unchanged. Read the additions against the Review Focus checks for metrics, project attribution, scaling responsibilities, and template scope.
- [ ] Run `pnpm build`; expect exit 0. Run `pnpm dev` and open the reported URL. Check both new slides at the intended presentation size for wrapping or clipping and in presenter view for correctly attached notes. Check that the v1.18.0 link points to the fullstack template release. Rehearse the transition into Argo CD aloud.
- [ ] Run `git diff --check`; expect no output. Commit only the deck edit with `git add slides.md && git commit -m "Add Wagtail scale and Scaf slides"`.
