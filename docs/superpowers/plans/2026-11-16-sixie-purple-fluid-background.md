# Fluid Sixie Purple backgrounds

User approved full-window theme backgrounds around an unchanged, fixed-ratio Slidev content canvas.

## Approach
Use a theme-owned global-bottom marker derived from Slidev's active navigation state. Screen-only CSS sets the live play container's supported background custom property, and makes the fixed canvas/layout backgrounds transparent only while that marker is active. Reuse the same background definitions as ordinary layouts to avoid doubled/misaligned artwork. Do not stretch, resize, or reposition slide content.

Only enable for the theme's own layouts in live play mode. Presenter/overview and print/export retain their existing per-slide backgrounds. Unknown layouts such as image/iframe are left alone. Resolve active layout from navigation rather than querying preloaded/transitioning slide DOM. Keep imports relative and asset URLs Vite-managed for copied themes and subpath deployments.

- [x] Write pure resolver tests and observe missing-module failure; reproduce the black-bar issue in a browser test.
- [x] Implement resolver, theme global layer, shared background values, and screen-scoped viewport CSS.
- [x] Browser-check cover, section, paper and dark backgrounds while resizing the same window; navigate between them, including backward. Check content geometry, controls, presenter/overview, print mode and print media.
- [x] Run Node suite, main production subpath build and copied-theme subpath build/browser checks. Update usage documentation and self-review; no commits requested.

Review focus: active slide rather than preloaded neighbors; lifecycle route changes (presenter/print/play); seamless boundaries at different aspect ratios; native content scaling untouched; no fixed/global backdrop in exports or thumbnails.

## Verification and review

- RED: resolver suite failed on the absent module. Browser regression failed because the live container had no active-background marker.
- GREEN: 13/13 Node tests pass, including exact dark-class matching and unsupported-layout fallback.
- Browser checked cover/section/paper/dark at 1440×900, 1920×800 and 720×1100. Full-window backdrop present; canvas and heading rectangles unchanged from pre-implementation measurements (within 1px).
- Resized the same open window without navigation, then navigated forward/back after neighboring slides preloaded. Background follows active navigation rather than hidden DOM.
- Presenter, overview, `?print` and print-media checks retain local artwork. CSS never changes canvas dimensions, transforms, positions, controls, or pointer behavior.
- Main production subpath build passes (existing starter large-chunk warning remains). Copied-theme subpath build passes; all 10 gallery slides render with no local asset failures, content overflow, or page errors.
- Final review: self-review (no subagent tool). Shared background values prevent duplicated art; marker has no visual/pointer footprint and is absent outside live play; imports/assets remain theme-local; CSS is screen-only and specifically scoped to the play container.
- No new dependencies or commits. Current Chrome/Firefox/Safari required for `:has()`; unsupported browsers retain native slide-local backgrounds.
