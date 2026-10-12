// Shows the dark theme before a page is first drawn, if chosen or set on the
// device, so it never flashes white while the app loads. Vite inlines this
// file into every page's head (see vite.config.ts), as a module would run too
// late. Repeats src/lib/theme.ts, which takes over once the app runs; keep
// them in step.
;(() => {
  let stored = null
  try {
    stored = localStorage.getItem('theme')
  } catch {
    // Storage unavailable: follow the device.
  }
  const dark =
    stored === 'dark' ||
    (stored !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
})()
