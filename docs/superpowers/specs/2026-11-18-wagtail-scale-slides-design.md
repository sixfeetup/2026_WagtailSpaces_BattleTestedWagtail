# Wagtail Scale Slides — Design

Add the case study and practical starting point promised by the Wagtail Space 2026 abstract. The talk is tomorrow, so reuse the deck’s current theme and layouts and keep the two additions easy to rehearse.

## Approaches

- Replacing two existing slides would preserve run time but remove material the speaker wants to keep.
- Adding two slides preserves the existing story and puts each addition where it answers a natural audience question. The speaker chose this approach.
- A third slide just for Karpenter would give more depth, but the approved flow fits on the intranet slide, with the timing anecdote in the notes.

## Slide placement and content

1. After **Why Kubernetes for Django?**, add **Wagtail at Scale: The College Intranet**. Show **28k+ visits/day** as production traffic and **5k simulated concurrent users** and **60k requests/minute** as load-test figures. In a separate section labeled **How to scale on EKS**, show this general pattern: add Wagtail replicas → if Kubernetes can’t schedule them on the existing nodes, Karpenter provisions more → Kubernetes schedules the waiting pods. The slide must not imply that the college used EKS or Karpenter, or that Karpenter adds Wagtail replicas or reacts directly to traffic. In speaker notes, cite the podcast and give the pre-warming example from a separate project: nodes took about 30 seconds to come online, so the team triggered provisioning before running out of room. Bridge to Argo CD: Kubernetes handles capacity; GitOps makes changes to the setup repeatable.
2. After **Hot Off the Presses**, add **New in Scaf: Wagtail CMS**. Show the optional prompt **“Do you want Wagtail CMS?”** and the two rendering paths: Django templates without Next.js, or headless Wagtail with Next.js. Link to the v1.18.0 template release.

## Constraints

- Add exactly two slides. Keep all existing slides and notes unchanged.
- Use existing Slidev layouts and theme. No new dependencies, assets, demos, or deployment changes.

## Sources

- College production and load-test numbers: speaker-supplied Wagtail Space 2026 abstract.
- [Real Python Podcast #254 at 8:11](https://youtu.be/LHglAeK8fSI?t=491): Karpenter provisions nodes for unschedulable pods; the following discussion distinguishes replica count from node count.
- [Same episode at 32:23](https://youtu.be/LHglAeK8fSI?t=1943): separate phone workload triggered provisioning early with a placeholder pod; the speaker reports roughly 30 seconds to add a node in that setup, not a general guarantee.
- [Scaf template v1.18.0 release](https://github.com/getscaf/sfu-fullstack-template/releases/tag/v1.18.0) and [tagged Copier configuration](https://github.com/getscaf/sfu-fullstack-template/blob/v1.18.0/copier.yml): Wagtail support is an opt-in scaffold option, with rendering determined by whether Next.js is enabled.
