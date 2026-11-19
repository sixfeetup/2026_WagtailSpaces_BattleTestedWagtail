---
theme: ./themes/sixie-purple
layout: cover
title: "Battle-Tested Wagtail: Running at Scale with Kubernetes"
speaker: Calvin Hendryx-Parker, CTO
event: Wagtail Space 2026
author: Calvin Hendryx-Parker, CTO, Six Feet Up
date: Wagtail Space 2026
keywords:
  - Kubernetes
  - CI/CD
  - Django
  - Wagtail
info: |
  Battle-Tested Wagtail for Wagtail Space 2026.
  Based on Six Feet Up's Deploy Django presentation.
  Source: https://github.com/sixfeetup/2025_PyOhio_DeployDjango
comark: true
drawings:
  persist: false
---

# Battle-Tested Wagtail: Running at Scale with Kubernetes

Six Feet Up

<!--
We struggled so you don't have to
-->

---

# Wagtail at Scale: The College Intranet

- **Production:** 28k+ visits/day
- **Load test:** 5k simulated concurrent users · 60k requests/minute

<hr class="my-4" />

## How to scale on EKS: a general pattern

1. Add Wagtail replicas to serve more requests.
2. If the new pods can’t fit, Karpenter provisions more nodes.
3. Kubernetes schedules the waiting pods on the new capacity.

<!--
The college’s daily visits are production traffic. The concurrency and request rate are from load tests. The EKS flow is a general scaling pattern, not a description of the college’s infrastructure.

Real Python Podcast #254, 8:11 (https://youtu.be/LHglAeK8fSI?t=491): Karpenter responds to unschedulable pods. It provisions nodes; it doesn’t react directly to traffic or decide how many Wagtail replicas to run.

At 32:23 (https://youtu.be/LHglAeK8fSI?t=1943), I describe a separate project handling phone calls. A new node took about 30 seconds to come online in that setup. We submitted a placeholder pod that couldn’t fit to trigger provisioning before we ran out of room.

Optional load-testing example (use this instead of the pre-warming story if time is tight): In the separate phone workload, the load test exposed a per-node pod limit, not a CPU or memory bottleneck. For a Wagtail load test, watch latency and errors alongside throughput. Measure what’s limiting you before adding capacity. Real Python Podcast #254, 20:18 (https://youtu.be/LHglAeK8fSI?t=1218).

Transition: Adding capacity is one reason to run Wagtail on Kubernetes. Let’s look at what else Kubernetes gives us before we get to how we ship changes.
-->

---

# Why Kubernetes for Django?

- **Resource Efficiency**: Auto-scaling based on actual load
- **Zero-downtime Deployments**: Rolling updates by default
- **Self-healing**: Automatic container restarts
- **Service Discovery**: No more hardcoded URLs
- **Secrets Management**: Built-in, encrypted at rest
- **Control Plane**: Automate releases and orchestration
- **Deploy Story**: Matches Developer Environment
- **Cloud Agnostic**: No vendor lock-in

<!--
Don’t read the list. Focus on what Kubernetes does for a Wagtail team: it runs replaceable copies of the web app, routes traffic to ready pods, and replaces failed pods. Keep the database and uploaded media outside the web pods so replacing a pod doesn’t lose content.

A rolling update can keep the site serving while the new version comes up, but zero downtime isn’t automatic. Use readiness probes so new pods only receive traffic when they’re ready, keep enough capacity during the rollout, and make sure old and new versions can coexist with the database schema.

Transition: Kubernetes keeps the app running. GitOps gives us a repeatable way to tell it what to run next.
-->

---

# GitOps: The Operating Model

- **Single Source of Truth**
- **Declarative**
- **Automated Reconciliation**
- **Pull-based Deployments**
- Bonus: **Documentation of Infrastructure and Application**

<!--
Talk about the old days, which may be the current days for meany folks
* **Single Source of Truth**: Git repository contains all deployment configs
* **Declarative**: Describe *what* you want, not *how* to get there
* **Automated Reconciliation**: System continuously ensures actual state matches desired state
* **Pull-based Deployments**: No more `kubectl apply` from laptops
* **Documentation of Infra**: documentation as code of infra and application
-->

---

# Why GitOps for Django?

- **Rollback = Git Revert**: Instant, auditable rollbacks
- **Environment Drift Prevention**: Dev/Staging/Prod stay in sync
- **Security**: No CI/CD needs cluster credentials
- **Compliance**: Complete audit trail of who changed what, when

<!--
You control who has access to the KUBECONFIG

Release safety: A Git revert changes the desired app version. Argo CD still has to reconcile and Kubernetes has to roll it out. That does not undo a Django database migration. Keep schema changes compatible with both app versions during a rollout. When a small, tested fix is practical, I prefer to roll forward.

Environment parity: Think of a feature that works in staging but breaks in production because a new environment variable was never defined there. Put the shared configuration in a base and use Kustomize overlays for environment-specific values. Same deployment pattern, different settings. Original talk, 10:48 (https://youtu.be/H7GMjMgue14?t=648).
-->

---

# Enter Argo CD

<div class="grid grid-cols-[1fr_180px] gap-8 items-start">
<div>

- Kubernetes-native continuous delivery
- Watches Git repos for changes
- Syncs automatically or on-demand
- Beautiful UI for visibility
- Supports Helm, Kustomize, plain YAML

</div>
<img src="/images/deploy-django/argocd.png" alt="Argo CD logo" class="w-40 mt-4 justify-self-center" />
</div>

<!--
Powerful wrapper around kubectl and git
-->

---

# GitOps Flow

<div class="mt-4 isolate" style="background-color: var(--sixie-paper)">
  <img src="/images/deploy-django/gitops-flow.png" alt="Scaf GitOps deployment flow diagram" class="mx-auto max-h-[390px] max-w-full object-contain mix-blend-multiply" />
</div>

<!--
Walk the diagram with one Wagtail release. A reviewed PR merges; GitHub Actions builds the image and pushes it to ECR. Then the staging manifest in Git points to that image. Argo CD sees the desired state change and syncs it. Pushing an image to the registry alone isn’t the instruction to deploy it.

Verify the release in staging: can an editor sign in, publish a test page, and see it served? Then promote the same image to production with a config PR. Build once, verify in staging, promote without rebuilding.

The image push and manifest update are from the original demo at 30:13 (https://youtu.be/H7GMjMgue14?t=1813). Staging-to-production promotion is the recommended pattern here, not a claim about the demo or the college deployment.
-->

---

# Enabled by Scaf

<div class="grid grid-cols-[1fr_180px] gap-8 items-start">
<div>

- **Day Zero GitOps**: No retrofitting required
- **Battle-tested**: Years of production experience baked in
- **Cognitive Load Reduction**: Focus on your app, not infrastructure
- **Immutable Infrastructure**: Talos Linux for secure, minimal K8s nodes

</div>
<img src="/images/deploy-django/scaf-logo.webp" alt="Scaf logo" class="w-40 mt-4 justify-self-center" />
</div>

<!--
The Magic: Best Practices by Default
Scaf solves the "blank page" problem
you don't have to figure out how to structure your k8s configs, how to handle secrets, or how to set up ArgoCD.
It's all there from the start.
-->

---

# Nix Solves the Cross-Platform Issues

This could be a talk on its own...

- Apple's BSD `sed` vs Gnu `sed`
- Apple's BSD `base64` vs Gnu `base64`
- Apple's BSD `tr` vs Gnu `tr`

&nbsp;

## Superpowers

- Install common tools
- Make sure the tools versions match

<!--
sed has some creature comforts on gnu that aren't there on mac
base64 on mac wraps by default, gnu has a command line flag for it
truncate has some creature comforts on gnu that aren't there on mac

Helping another developer shouldn't be a hard experience
No one likes sitting down to a dvorak keyboard when they type on qwerty all day
But each person can still have their own tools and preferences that extend the base
-->

---

# New in Scaf: Wagtail CMS

When generating a project, Scaf asks:

> **Do you want Wagtail CMS?**

If you opt in, you get one of two rendering paths:

- **Without Next.js:** Wagtail pages rendered with Django templates.
- **With Next.js:** Headless Wagtail with a Next.js frontend.

[Scaf fullstack template v1.18.0](https://github.com/getscaf/sfu-fullstack-template/releases/tag/v1.18.0)

<!--
Wagtail is optional, and Next.js is a separate choice. If you want Django to render your Wagtail pages, skip Next.js when generating the project.
-->

---

# Start Your GitOps Journey Today

### 15-Minute Quick Wins:

1. **Install Scaf**: One line installer
2. **Create a Project**: `scaf myproject`
3. **Deploy to AWS**: Login via CLI and deploy
4. **Make a Change**: Edit YAML, commit, watch magic

<hr class="my-4" />

### You Don't Need:

- Perfect Kubernetes knowledge
- Complex CI/CD pipelines
- A huge team

<!--
Lower the barrier to entry - they can start small
-->

---

# Life Before GitOps vs After

<div class="grid grid-cols-2 gap-10">
<div>

### Traditional Deployment 😰

- SSH into servers
- Manual `docker-compose up`
- "Works on my machine"
- Deployment = Anxiety
- Who deployed what?
- How do we rollback?

</div>
<div>

### GitOps Deployment 🚀

- Git push = Deploy
- Automated & consistent
- Works everywhere
- Deployment = Confidence
- Full audit trail
- Rollback = Git revert

</div>
</div>

---

# Resources

- [Scaf Project Info](https://sixfeetup.com/scaf)
- [Scaf GitHub Repo](https://github.com/getscaf/scaf)
- [Scaf Full Stack Template](https://github.com/getscaf/sfu-fullstack-template)
- [Talk Python to Me Episode on Scaf](https://talkpython.fm/episodes/show/496/scaf-complete-blueprint-for-new-python-kubernetes-projects)
- [Real Python Podcast #254: Scaling with Kubernetes and Karpenter](https://realpython.com/podcasts/rpp/254/)

---

# Talk Slides

<https://github.com/sixfeetup/2026_WagtailSpaces_BattleTestedWagtail>

<img src="/images/deploy-django/presentation-qr.png" alt="QR code linking to the Battle-Tested Wagtail presentation repository" class="mx-auto mt-6 w-64" />

---
layout: center
class: sixie-dark
---

# Talk To Me

📩 [calvin@sixfeetup.com](mailto:calvin@sixfeetup.com)<br />
🤝 <https://linkedin.com/in/calvinhp><br />
✖️ [@calvinhp](https://x.com/calvinhp)<br />
🐘 [@calvinhp@fosstodon.org](https://fosstodon.org/@calvinhp)<br />
🦋 [@calvinhp.com](https://bsky.app/profile/calvinhp.com)
