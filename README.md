# Welcome to [Slidev](https://github.com/slidevjs/slidev)!

To start the slide show:

- `npm install`
- `npm run dev`
- visit <http://localhost:3030>

Edit the [slides.md](./slides.md) to see the changes.

## Sixie Purple theme preview

The starter deck uses the reusable local theme in [`themes/sixie-purple`](./themes/sixie-purple/README.md). Backgrounds now fill the live presentation window at any aspect ratio while slide content keeps its normal proportions. Presenter/overview/print rendering stays slide-local. Preview at <http://localhost:3030>:

- Slide 1: branded title frame
- Slide 2: lavender content
- Slide 3: wave divider (with starter navigation content)
- Slide 4: two columns
- Slide 5: code
- Slide 16: numbered conclusion cards

For a clean gallery of every theme layout, without the starter widgets:

```sh
pnpm exec slidev themes/sixie-purple/example.md --port 3031
```

Open <http://localhost:3031>. The 10-slide gallery now uses original IAM presentation samples to compare the title, section divider, connected cards, large/medium code, and staggered conclusion with presenter/source boxes. It also demonstrates two columns, dark content, and challenge cards. These are theme samples, not the real talk content. Start at <http://localhost:3031/1> and press **Right → Right → Left** to see the theme-wide Reveal-style sliding and background crossfade.

Verify the theme contracts with `node --test tests/*.test.mjs` and build with `pnpm run build`. Google Fonts and the starter deck's external widgets/images require network access; all theme artwork is local.

Learn more about Slidev at the [documentation](https://sli.dev/).
