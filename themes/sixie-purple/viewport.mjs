// Keep every artwork layer mounted so interrupted fades retain their real opacity.
export const viewportBackgrounds = ['paper', 'cover', 'section', 'dark']

const brandedLayouts = new Set([
  'default', 'cover', 'section', 'title-body', 'code', 'code-example',
  'conclusion', 'center', 'two-cols',
])

/** Select only backgrounds owned by this theme; leave other layouts untouched. */
export function resolveViewportBackground(frontmatter = {}) {
  const layout = frontmatter.layout ?? 'default'
  if (!brandedLayouts.has(layout)) return null

  const classes = Array.isArray(frontmatter.class)
    ? frontmatter.class
    : String(frontmatter.class ?? '').split(/\s+/)
  if (classes.includes('sixie-dark')) return 'dark'
  if (layout === 'cover' || layout === 'section') return layout
  return 'paper'
}
