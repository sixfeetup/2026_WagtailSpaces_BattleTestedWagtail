# Sixie Purple local Slidev theme

## Intent
Recreate the supplied Reveal.js `sixie_purple` visual identity as a reusable local Slidev theme. Apply it to the existing starter presentation so Calvin can review the look before writing real content. The user selected the reusable local theme approach and requested implementation.

## Approaches
- Selected: self-contained theme folder with Vue layouts, CSS tokens, bundled original assets, and a usage guide. Copyable between decks; no publishing required.
- Rejected: deck-only CSS overrides, which couple branding to one presentation.
- Rejected: a literal Reveal.js stylesheet transplant, which depends on the wrong DOM and Pandoc markup.

## Design
Use `themes/sixie-purple`, selected by `theme: ./themes/sixie-purple`. Keep the original black/purple title frame, wave section dividers, lavender content backgrounds, purple heading rules, Six Feet Up logos, Poppins and Roboto Mono. Translate the original 1200×675 proportions to Slidev's 980×551.25 canvas. Native code highlighting and clicks remain functional.

Provide cover, section, default/title-body, code, conclusion, two-cols, and center layouts. Content/code headings and logo share a reusable frame; numbered cards are opt-in, not the default for every ordered list. Cover metadata and section numbers use frontmatter props. Other built-in layouts remain usable and receive base typography. `class: sixie-dark` supports the original dark content style; `class: no-logo` hides branding.

Keep existing starter content and its 16-slide count; change layout metadata and remove starter-specific visual overrides where they conflict. Use the existing last slide to preview the branded close, one existing slide as a section divider, and an existing content slide for conclusion cards. No real Wagtail content yet.

## Constraints and non-goals
No Reveal.js runtime, publishing, remote assets dependency for theme artwork, or root dependency churn. Bundle source attribution and CC BY-SA 4.0 license. Google fonts are requested by Slidev with system fallbacks; offline font bundling is outside this pass. Artwork must resolve under subpath builds as well as local dev. No commits unless requested.

## Verification
Node contract tests for theme metadata, layout/slot contracts, relative asset references, and deck integration; production Slidev build; browser screenshots and layout checks where browser tooling is available. Review cover, section, content, code, two columns, close, and an isolated deck using only the theme folder.
