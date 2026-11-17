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

# Talk Slides

<https://github.com/sixfeetup/2026_WagtailSpaces_BattleTestedWagtail>

<img src="/images/deploy-django/presentation-qr.png" alt="QR code linking to the Battle-Tested Wagtail presentation repository" class="mx-auto mt-6 w-64" />

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

# GitOps Flow

<img src="/images/deploy-django/gitops-flow.png" alt="Scaf GitOps deployment flow diagram" class="mx-auto mt-4 max-h-[390px] max-w-full object-contain" />

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

# Hot Off the Presses

- Decoupled from 1Password
- "Dangerous Mode"
- Sealed Secrets Automated
- Teardown works cleanly
- Github Automation for Variables and Keys
- Updated ArgoCD to latest

<!--
Now includes more tools managed by Nix such as `gh` and `copier`
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

# Resources

- [Scaf Project Info](https://sixfeetup.com/scaf)
- [Scaf Github Repo](https://github.com/sixfeetup/scaf)
- [Scaf Full Stack Template](https://github.com/sixfeetup/scaf-fullstack-template)
- [Talk Python to Me Episode on Scaf](https://talkpython.fm/episodes/show/496/scaf-complete-blueprint-for-new-python-kubernetes-projects)

---
layout: center
---

# Talk To Me

📩 [calvin@sixfeetup.com](mailto:calvin@sixfeetup.com)<br />
🤝 <https://linkedin.com/in/calvinhp><br />
✖️ [@calvinhp](https://x.com/calvinhp)<br />
🐘 [@calvinhp@fosstodon.org](https://fosstodon.org/@calvinhp)<br />
🦋 [@calvinhp.com](https://bsky.app/profile/calvinhp.com)
