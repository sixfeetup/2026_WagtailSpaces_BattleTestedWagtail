# Theme-wide Reveal-style transitions

User requested the original sliding transitions as a theme-wide default, demonstrated in the clean gallery. The deployed Reveal presentation uses 800ms transitions with cubic-bezier(0.26, 0.86, 0.44, 0.985); content moves ±150% and fades, while backgrounds crossfade.

- [x] Add failing theme/default/CSS contracts and a browser motion regression.
- [x] Define paired directional native Slidev transitions as a package default. Remove starter overrides so both previews inherit it; keep explicit consumer overrides supported.
- [x] Crossfade the old full-window background over the new background using a non-interactive container pseudo-element; derive previous background and alternating animation phase from active navigation state. No content transforms or fixed overlays in the backdrop implementation.
- [x] Respect reduced motion. Do not animate initial load, same-slide clicks, unchanged backgrounds, presenter, print/export, or return from those modes.
- [x] Verify forward/backward motion, intermediate/final backdrop opacity, repeated/rapid navigation, same-background slides and native code clicks, reduced motion, preview/export behavior, production subpath build and copied theme. Document usage and self-review; no commits requested.

All visual layers remain theme-local; no new dependency or Slidev runtime patch. Existing viewport/layout safety and export isolation must remain intact.

## Verification and review

- RED: three new Node contracts failed before implementation; browser regression showed no transition classes and `translate: none` during navigation.
- GREEN: 17/17 Node tests pass.
- Theme package defaults are cached by a running gallery server. Restarted only the agent-launched gallery on 3031 after verifying its process; live gallery then inherited defaults without any transition metadata in example.md. Main presentation also verified emitting the new classes after its headmatter reload.
- Browser sampled in-flight motion at 150ms: forward incoming/outgoing travel have opposite signs, backward reverses them, content opacity is intermediate, duration is 800ms, and old viewport background independently fades between 0 and 1. Final states settle correctly.
- Repeated forward/back, same-background slides, rapid navigation, initial load, code clicks and reduced motion all passed. Presenter/print have no backdrop marker; returning to play starts without stale previous artwork. No JavaScript errors.
- Main production subpath build passes (existing starter bundle-size warning retained). Independently copied theme subpath build passes, including browser checks of all 10 samples, production forward/back classes, intermediate backdrop fade, no failed local assets or page errors.
- Final review: self-review (no subagent tool). Confirmed native directional navigation, screen-only/non-interactive backdrop layering, no timer cleanup race, phase-based animation restart, no stale mode state, no motion on same-slide clicks, reduced-motion duration, relative imports/assets, consumer override support, unchanged export backgrounds.
- No dependencies, publishing, or commits added. Gallery remains running at http://localhost:3031/1; Right → Right → Left demonstrates the complete effect.
