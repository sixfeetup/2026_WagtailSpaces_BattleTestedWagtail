import sixieCode from './sixie-code.json'

// Preserve the Reveal.js palette while keeping native Shiki highlighting/clicks.
export default () => ({
  themes: {
    light: sixieCode,
    dark: sixieCode,
  },
})
