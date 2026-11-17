# Deploy Django source and attribution

This deck is an editable Slidev port of [Six Feet Up's 2025 Deploy Django presentation](https://github.com/sixfeetup/2025_PyOhio_DeployDjango), by **Calvin Hendryx-Parker, CTO, Six Feet Up**.

- Pinned source commit: [`cddd5d45494931e121c9848bd4c6aef8ffe25287`](https://github.com/sixfeetup/2025_PyOhio_DeployDjango/tree/cddd5d45494931e121c9848bd4c6aef8ffe25287)
- Source Markdown: [`slides.md`](https://github.com/sixfeetup/2025_PyOhio_DeployDjango/blob/cddd5d45494931e121c9848bd4c6aef8ffe25287/slides.md), preserved verbatim in `tests/fixtures/deploy-django-source.md` for parity tests.
- The source labels the event **DjangoCon 2025** despite its PyOhio repository name. The source fixture retains that wording for provenance; the current presentation is titled **Battle-Tested Wagtail: Running at Scale with Kubernetes** for **Wagtail Space 2026**.
- Source license: **Creative Commons Attribution-ShareAlike 4.0 International**, [as published upstream](https://github.com/sixfeetup/2025_PyOhio_DeployDjango/blob/cddd5d45494931e121c9848bd4c6aef8ffe25287/LICENSE.md). This adaptation uses the same terms; the full license text is also available locally at [`themes/sixie-purple/LICENSE.md`](../../themes/sixie-purple/LICENSE.md). Branding remains its owners' branding; no trademark rights are granted.

## Adaptation

Preserved all 14 slides, their order and copy, eight speaker-note blocks, the two comparison columns, resource/contact links, and the original Argo CD/Scaf logos and GitOps diagram. Slide 2 now links to this Wagtail presentation's repository, with a newly generated QR code. Converted Pandoc attributes, fenced columns and `::: notes` to native Slidev/Vue markup and HTML-comment notes. Replaced Reveal.js/photo styling with the local Sixie Purple theme; photo backgrounds are intentionally not imported. Corrected the Scaf GitHub link's missing `https://` prefix without changing its visible label. The cover title, conference and presentation metadata were subsequently updated for the Wagtail Space 2026 version. The remaining ported content has not yet been rewritten.

## Local image mapping

Images live under `public/images/deploy-django/`. The three original LFS-backed objects retain their source bytes and were downloaded through GitHub's media endpoint, not from the pointer files. The replacement QR is generated locally with `qrencode` 4.1.1 for `https://github.com/sixfeetup/2026_WagtailSpaces_BattleTestedWagtail`:

```sh
qrencode -t PNG -l M -s 10 -m 4 -o public/images/deploy-django/presentation-qr.png 'https://github.com/sixfeetup/2026_WagtailSpaces_BattleTestedWagtail'
```

| Original path | Local name | SHA-256 |
| --- | --- | --- |
| `images/argocd.png` | `argocd.png` | `081b022635e0a61656617d86ad50ecb331abcb8eb7d34a5ae5625688d619f236` |
| `images/scaf_logo.webp` | `scaf-logo.webp` | `ca87c4cf5bf0502c7cc79bbc202eb6b518b5643544a40bc34c3ea874c0bc7a0c` |
| `images/Scaf Gitops Diagram.png` | `gitops-flow.png` | `cec273179ac714aa86662f2472cca6c8b479bbcf46ac1cfc98b28c4982828a6d` |
| Generated locally with `qrencode` (replaces source QR) | `presentation-qr.png` | `002ba690a399ec538725a30b04a7aeaf541d5b88ffd76a7fbbb54ac53de0d7d0` |
