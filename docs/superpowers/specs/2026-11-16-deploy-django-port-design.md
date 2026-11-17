# Deploy Django presentation port

## Approved direction
Port the existing 14-slide presentation from `sixfeetup/2025_PyOhio_DeployDjango` into this project's main deck. The user explicitly chose Sixie Purple instead of the original photo backgrounds. Preserve content, slide order, speaker notes, logos, QR code and GitOps diagram. Preserve the source's DjangoCon 2025 wording despite the repository's PyOhio name; no Wagtail-specific rewriting yet.

## Approaches
Selected: native Slidev Markdown using the existing theme and a simple inline grid where the source has comparison columns. This preserves reusable theme behavior and keeps source content editable.
Rejected: retaining Reveal/Pandoc syntax or photo backgrounds, which conflicts with the chosen theme. Rejected: screenshots of slides, which discard editable content and notes.

## Implementation boundaries
Replace `slides.md`, update README for the new talk/worktree preview, add the four content images under `public/images/deploy-django`, and record source/license provenance. Convert Pandoc speaker-note fences to Slidev HTML comments and fenced columns to Vue-compatible HTML grid markup. Correct the missing `https://` on the Scaf GitHub link without changing its visible label. No theme layout or transition changes; the clean theme gallery remains independent.

## Verification
Pin upstream commit cddd5d45494931e121c9848bd4c6aef8ffe25287 in a source fixture. Compare 14 headings, all list items and all note blocks. Verify downloaded LFS objects by SHA-256 and image signatures. Run the Node suite, production build under a subpath, and browser-check all 14 slides for actual image loads, readable layout/overflow and speaker notes. Main checkout remains on main; previews use a separate worktree server on port 3032. Do not commit/merge unless requested.
