# Sixie Purple for Slidev

A reusable local adaptation of Six Feet Up's Reveal.js `sixie_purple` theme. Includes the original title frame, section waves, and logo. No Reveal.js or deck-specific code required.

## Use in another presentation

Copy this **entire folder** into `themes/sixie-purple` in any Slidev 53+ project. No theme install or workspace setup is required.

```yaml
---
theme: ./themes/sixie-purple
layout: cover
speaker: Calvin Hendryx-Parker
event: Wagtail Space 2026
---
```

Write your title as an ordinary `# Heading`. Slidev requests Poppins and Roboto Mono from Google Fonts, with system fallbacks if unavailable. For offline presentations, self-host those fonts using Slidev's font configuration. Artwork is bundled and resolved by Vite, including deployments under a subpath.

## Fluid live backgrounds

In normal presentation mode, cover artwork, section waves, lavender content backgrounds and the dark gradient fill the entire available window—even when its aspect ratio differs from 16:9. Resize the window freely: only the background expands; slide text/code remain centered on Slidev's proportionally scaled canvas. There is no second copy of the artwork at the canvas edges.

Presenter view, overview thumbnails, print mode and exports retain the original per-slide backgrounds. Image/iframe and other non-theme layouts keep their native behavior. This is built into the theme's `global-bottom.vue` and screen-only `styles/viewport.css`; it requires a modern browser supporting CSS `:has()` (current Chrome, Firefox and Safari). Shared background values live in `styles/theme.css`.

## Reveal-style transitions

The theme defaults to `sixie-slide-left | sixie-slide-right`: forward navigation moves content left, backward navigation reverses it. Travel, fade, **800ms** timing and `cubic-bezier(0.26, 0.86, 0.44, 0.985)` easing match the original Reveal.js presentation. The full-window background crossfades independently using four persistent layers outside the animated canvas, over a constant black base. Interrupted fades reverse from their current opacity instead of restarting a pale overlay at full opacity; all artwork stays mounted and preloaded. Moving between slides with the same background does not restart the fade. Initial load and same-slide code/click animations do not trigger a background transition.

Open <http://localhost:3031/1> and press **Right → Right → Left** to see cover → section → content and the reverse transition. The gallery inherits this from `package.json`; it has no gallery-only transition settings. The main starter also inherits the default now. Explicit deck/per-slide `transition` settings can still override it.

Reduced-motion preferences shorten the transitions to 1ms. Presenter previews and print/export do not animate. To tune the theme's motion, override `--sixie-transition-duration` and `--sixie-transition-easing` in your deck CSS. Restart the dev server after changing theme package defaults.

## Layouts

| Layout | Use |
| --- | --- |
| `cover` | Black framed title/closing slide; optional `speaker` and `event` frontmatter |
| `section` | Black wave divider; optional `number: '01'`; logo hidden by default, opt in with `showLogo: true` |
| `default` | Lavender content, purple heading rule, upper-right logo; ordinary lists |
| `title-body` | Original connected panels with angled number tabs from a top-level ordered list |
| `code` / `code-example` | Same branded frame with native Slidev/Shiki code blocks |
| `two-cols` | Default/left and `::right::` slots; optional `layoutClass` grid utilities |
| `conclusion` | Three staggered, asymmetrically rounded takeaway panels; optional presenter/source boxes and `::footer::` slot |
| `center` | Vertically centered content in the branded frame |

Built-in Slidev layouts (image, image-right, full, etc.) remain available with base typography. Standard `class` frontmatter is forwarded to layout roots. Use `class: sixie-dark` for dark content, `class: no-logo` to hide the logo, or `class: sixie-cards` for connected numbered panels on a regular content slide (automatically fits 3–5 items). Three concise items fit the conclusion layout best. Long content is intentionally not auto-shrunk; use columns, smaller local type, or split it into slides.

```md
---
layout: section
number: '01'
---

# A Section Title

---
layout: two-cols
---

# Left column

First idea.

::right::

Second idea.

---
layout: conclusion
presenter: Your name
email: you@example.com
credit: Original speaker
creditEvent: Original event
---

# Takeaways

1. Start with one useful change.
2. Build confidence through feedback.
3. Keep improving.

::footer::

Your name · your contact information
```

## Code density and source styling

Use `layout: code` (or `code-example`) with `class: code-large`, `code-medium`, `code-wide`, or `code-dense`. These preserve the original's 36px, 21px, 26px, and 16px code scales, converted to the 980px canvas. The default is equivalent to the original 20px code style. Code is bold Roboto Mono on charcoal with a native Shiki theme matching the original muted mint, olive, pink and orange palette. Line numbers remain opt-in with `{lines: true}`; native highlighting, hover information, and click animations still work.

For title-body panels, use a top-level ordered list. Ordinary text and `<span>` wrappers both work. For the optional four challenge cards, use `.sixie-challenge-cards` containing `.sixie-challenge-card` elements with `.sixie-challenge-icon` spans, as demonstrated in `example.md`; labels and icons are caller-supplied.

The gallery deliberately reuses text from the original IAM presentation for an apples-to-apples visual comparison. It is sample content, not the new Wagtail talk. Preview it with `pnpm exec slidev themes/sixie-purple/example.md --port 3031` from the deck root. The main starter deck still has 16 slides.

Theme colors are CSS custom properties (`--sixie-purple`, `--sixie-blue`, etc.) in `styles/theme.css`. Layouts use native slots and preserve click animations, presenter notes, and code highlighting. The original 1200×675 proportions are adapted to Slidev's 980px-wide 16:9 canvas. The starter deck uses a slightly denser body scale for its feature demonstrations.

## Browser regression checks

`node --test tests/*.test.mjs` runs the Node-based theme contracts using the project's existing dependencies. The optional real-browser test samples every animation frame through rapid forward/backward navigation, checks opacity continuity and full-window bounds, decodes the actual CSS artwork, and checks reduced motion and print/presenter isolation. Run the clean gallery first, then:

```sh
npm install --prefix /tmp/sixie-browser playwright-core
PLAYWRIGHT_MODULE=/tmp/sixie-browser/node_modules/playwright-core/index.mjs \
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
node tests/sixie-backgrounds.browser.mjs
```

Use `CHROME_PATH` for your installed Chromium/Chrome executable, or omit it if Playwright's matching Chromium is installed. `SLIDEV_URL` can override the default `http://localhost:3031`. Frame data and screenshots are written outside the repo under the system temporary directory.

## Attribution and license

Adapted from [Six Feet Up's AWS Community Day Midwest 2026 presentation](https://github.com/sixfeetup/2026_AWSCommunityDayMidwest_IAMDriftIsQuietlyKillingYourCloudSecurity), specifically `themes/sixie_purple.scss` and the title/section images at commit `c6a9d66a9f0ee88f0ee296395bb1dd442c5f9306`. Original presentation: Calvin Hendryx-Parker / Six Feet Up; original presentation attribution also credits Chris Watkins.

This adaptation replaces Reveal.js/Pandoc selectors with Slidev Vue layouts, changes canvas-relative spacing, and makes numbered cards opt-in. Source artwork is unchanged. Distributed under **CC BY-SA 4.0**, matching the source repository; see [LICENSE.md](LICENSE.md). Six Feet Up branding remains its owners' branding; the license does not grant trademark rights.
