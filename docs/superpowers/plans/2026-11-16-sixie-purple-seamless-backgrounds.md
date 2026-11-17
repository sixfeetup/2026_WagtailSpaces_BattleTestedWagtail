# Seamless full-window background correction

User reported lost fullscreen artwork and a white flash during transitions. Frame tracing reproduced a concrete opacity reset: reversing section → paper before completion jumped pale-background visibility from 0.639 to 1.0 in ~10ms. Existing tests inspected only one intermediate frame and final states, so missed this discontinuity. Asset URLs and viewport bounds were valid in the reproduced session; explicitly anchoring the new layers outside the canvas will guard fullscreen rendering.

- [x] Replace the resettable old-background pseudo-element with four stable, keyed background layers, teleported to the live slide container with Vue's deferred Teleport.
- [x] Keep a constant black base, transparent fixed-ratio content canvas, isolated stacking, and pointer-transparent viewport-sized layers. Crossfade layer opacities through CSS transitions; do not reset them on interruptions or animate keys. Mount all artwork up front.
- [x] Retain current content slide motion, reduced-motion duration, and print/presenter/overview isolation. Reuse theme-local background definitions and leave foreign layouts alone.
- [x] Add failing regression contracts, then browser-test every rendered frame during reversals/rapid navigation, stable fullscreen bounds and decoded art at tall/wide sizes, input controls, print, and copied-theme production paths. Update obsolete tests/docs and self-review. No commits requested.

## Verification and review

- RED: regression contract failed on the old keyframe/phase implementation. Browser regression failed because no persistent outer background layers existed.
- GREEN: 17 Node tests pass. New `tests/sixie-backgrounds.browser.mjs` records every rendered frame, including interruptions/reversals, rather than checking only final states.
- Real Chrome run: 758 consecutive frames retained the same four DOM layers, full 1440×1000 bounds, transparent canvas, nonzero combined background coverage, and continuous opacity changes (bounded by elapsed frame time). No restarts or jumps detected.
- All four background kinds checked at 1440×1000, 1920×800 and 720×1100. Every CSS artwork URL decoded as an actual image, guarding against Vite HTML fallback responses as well as 404s. Stable screenshots visually inspected with content visible and full-window art.
- Reduced motion, presenter, overview, print route and print media pass. Teleported layers are absent outside live play and hidden during browser printing; native slide-local artwork remains.
- Main production build passes (existing starter chunk-size warning retained). Copied-theme subpath build and all 10 rendered samples pass; production forward/backward sliding and the new layer opacity crossfade pass; no local asset failures or page errors.
- Final review: self-review (no subagent tool). Stable keyed layer stack has no timers or resetting keyframes; deferred Teleport safely resolves the live container on initial mount; isolation keeps negative z-order behind content/controls but above black base; pointer events cannot be intercepted; print and foreign-layout boundaries remain unchanged.
- No dependency changes or commits. Previous pseudo-element crossfade assertions were intentionally replaced; documentation now describes persistent layers and the repeatable browser regression command.
