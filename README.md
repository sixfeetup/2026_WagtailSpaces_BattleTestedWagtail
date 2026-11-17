# Battle-Tested Wagtail: Running at Scale with Kubernetes

A presentation for **Wagtail Space 2026**, built from a 14-slide port of [Six Feet Up's Deploy Django presentation](https://github.com/sixfeetup/2025_PyOhio_DeployDjango), using the reusable local [Sixie Purple theme](./themes/sixie-purple/README.md).

The cover title and conference now match this Wagtail talk. The remaining ported wording, slide order, eight speaker-note blocks, logos, and GitOps diagram are preserved for further adaptation. Slide 2's URL and freshly generated QR code point to this Wagtail presentation's repository. The old photo backgrounds are replaced by Sixie Purple. See [source attribution and image provenance](./docs/sources/deploy-django.md).

## Preview

Requires Node.js 22.12+ and pnpm.

```sh
pnpm install
pnpm run dev
```

Normally this opens <http://localhost:3030>. For an isolated worktree preview alongside the main checkout:

```sh
pnpm exec slidev slides.md --port 3032
```

Open <http://localhost:3032>. The worktree version is separate from the existing main-checkout server.

- Edit [`slides.md`](./slides.md) for content.
- Open `/presenter/3` to see the original GitOps speaker notes.
- Original content images are bundled under `public/images/deploy-django`; no Git LFS client is required to view this port.
- Full-window backgrounds and directional transitions come from the theme. Only fonts need network access; the theme has system-font fallbacks.

## Theme gallery

The independent 10-slide branding/layout gallery is unchanged:

```sh
pnpm exec slidev themes/sixie-purple/example.md --port 3031
```

Open <http://localhost:3031/1> and press **Right → Right → Left** to preview sliding content and seamless background crossfades. It uses IAM samples solely to demonstrate the theme, not as part of this talk.

## Verify and build

```sh
node --test tests/*.test.mjs
pnpm run build
# Optional subpath deployment check:
pnpm run build --base /presentation-preview/
```

The source-parity tests check the current title/conference, the remaining 13 source titles, source list items, all eight note blocks, contact links, and image SHA-256 hashes. Theme tests cover shared layout gutters, transitions, and viewport isolation. The [theme README](./themes/sixie-purple/README.md#browser-regression-checks) documents the optional real-browser transition regression.
