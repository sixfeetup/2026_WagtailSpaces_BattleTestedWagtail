# Sixie Purple fidelity refinement

User requested tightening the theme after rendered comparison with the deployed Reveal.js presentation. Apply the specific comparison findings, not a new visual direction. Work in the current feature branch for live feedback; no commit requested.

- [x] Pin regression contracts for original card silhouettes, optional divider logo, contact metadata, code palette, and density classes; observe failures.
- [x] Match the title's speaker pill and spacing; retain Slidev's native aspect-ratio framing rather than stretch the canvas.
- [x] Port title-body connected ordered-list panels and staggered conclusion panels with presenter/source boxes. Keep ordinary default-layout lists unchanged.
- [x] Add a native Shiki theme matching the original muted code palette and scaled large/medium/wide/dense sizes. Keep the dense starter demo explicitly small.
- [x] Use original sample content in the clean gallery for a like-for-like comparison; retain non-original samples for extra layouts and label the source in documentation.
- [x] Verify browser geometry, typography, assets, native slots, representative click/code behavior, all starter slides, production subpath build and copyable-theme build.

Decisions: retain the reusable theme structure and 980px canvas; convert original 1200px layout measurements by 980/1200. Divider logo hidden by default but reserved layout space preserved, with opt-in `showLogo`. Keep default starter text sizing so its existing widgets continue fitting. Use source content only as theme samples, not new talk content.

## Verification and review

- Initial refinement test run: 3 failures identifying absent original card/contact/density contracts. All passed after implementation.
- Added a real Shiki token-rendering test: first failed on the YAML boolean color, then passed with original boolean/document-marker overrides.
- Final Node suite: 9/9 pass.
- Browser comparison against deployed Reveal.js: cover, divider, connected panels, code, and conclusion heading scales match 980/1200 conversion within 0.15 CSS px; code weight, card text weight, and normalized corner radii match. Identical original sample content used in gallery.
- Browser checked all 16 starter slides: no measured content overflow, missing images, or page errors. Native code click highlighting still changes from 9 highlighted lines to 1.
- Copied theme built independently under `/theme-preview/`; all 10 gallery slides rendered without overflow, failed local asset requests, or page errors.
- Final main subpath production build passes. Existing starter Monaco/Shiki large-chunk warning remains; no dependency changes made.
- Final review: self-review (no subagent tool). Checked separate default vs title-body behavior, line-number specificity, color-scheme token selection, conditional contact metadata, forwarded native slots, preserved attribution, and deployment-relative artwork.
- Native Slidev letterboxing is retained rather than distorting the slide canvas to fill the viewport. Google Fonts still use network requests with local fallbacks. No commits made.
