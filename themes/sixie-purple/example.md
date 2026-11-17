---
theme: ./
layout: cover
title: Sixie Purple Theme Gallery
speaker: Calvin Hendryx-Parker
event: AWS Community Day Midwest 2026
---

# IAM Drift Is Quietly Killing Your Cloud Security

<!-- Theme comparison sample from the original presentation, not the new talk's content. -->

---
layout: section
number: '01'
---

# A Challenge Everyone Faces

---
layout: title-body
---

# IAM hygiene is a challenge everyone faces

1. Organizations often run on multiple cloud service providers: AWS, Azure, and GCP.
2. Each cloud service provider provides different tools.
3. IAM hygiene requires a holistic view of the entire cloud estate across providers.
4. Manual audits are tedious and just snapshots in time.

---
layout: code
class: code-large
---

# AWS: Using Credential Report Filter

```yaml {lines: true}
---
policies:
  - name: iam-users-without-mfa
    resource: iam-user
    filters:
      - type: credential
        key: mfa_active
        value: false
```

---
layout: two-cols
---

# One idea, two perspectives

## The foundation

- Practical defaults
- Clear ownership
- Small, repeatable steps

::right::

## The outcome

- Confidence in production
- Easier collaboration
- Room to keep improving

---
layout: conclusion
presenter: Calvin Hendryx-Parker, CTO at Six Feet Up
email: calvin@sixfeetup.com
credit: Chris Watkins, Dir. Sec.
creditEvent: Governance As Code Day 2025
---

# Conclusion

1. Cloud Custodian provides a vendor-neutral, policy-as-code solution for continuous IAM hygiene across your entire cloud estate.
2. Start simple with detection, evolve to remediation, and eventually automate enforcement.
3. Maintain compliance and reduce security risk in an open and flexible way.

---
layout: center
class: sixie-dark
---

# A dark alternative

The original purple-black gradient with blue accents.

> Use this variant for a statement or a change of pace.

---
layout: cover
speaker: '#CloudCustodian'
event: '#AWSCommunityDayMidwest'
---

# Questions & Discussions

---
layout: title-body
---

# C7N: A Unified Way to Address IAM Hygiene

Solutions to 4 key IAM challenges using Cloud Custodian's vendor-neutral and open-source approach:

<div class="sixie-challenge-cards">
  <div class="sixie-challenge-card"><span class="sixie-challenge-icon" aria-hidden="true">🔐</span>Users Without MFA</div>
  <div class="sixie-challenge-card"><span class="sixie-challenge-icon" aria-hidden="true">👤</span>Orphaned Identities</div>
  <div class="sixie-challenge-card"><span class="sixie-challenge-icon" aria-hidden="true">🛡️</span>Overly-Permissive Policies</div>
  <div class="sixie-challenge-card"><span class="sixie-challenge-icon" aria-hidden="true">📋</span>Unmet Compliance Requirements</div>
</div>

---
layout: code
class: code-medium
---

# Azure EntraID: Using Auth-Methods Filter

```yaml {lines: true}
---
policies:
  - name: entraid-users-no-mfa
    resource: azure.entraid-user
    filters:
      - not:
        - type: auth-methods
          key: '[]."@odata.type"'
          value:
            - '#microsoft.graph.microsoftAuthenticatorAuthenticationMethod'
            - '#microsoft.graph.phoneAuthenticationMethod'
            - '#microsoft.graph.fido2AuthenticationMethod'
            - '#microsoft.graph.windowsHelloForBusinessAuthenticationMethod'
            - '#microsoft.graph.temporaryAccessPassAuthenticationMethod'
          op: intersect
```
