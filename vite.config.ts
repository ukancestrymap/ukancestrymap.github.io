import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'
import { en } from './src/content/en.ts'

const escapeHtml = (text: string) =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

const themeInit = readFileSync(
  new URL('src/theme-init.js', import.meta.url),
  'utf8',
)

// https://vite.dev/config/
export default defineConfig({
  // Set in CI from actions/configure-pages, e.g. '/fastsmc_app_static'; unset locally.
  base: `${process.env.BASE_PATH ?? ''}/`,
  // Import aliases such as "@/" come from tsconfig "paths", so they are defined once.
  resolve: { tsconfigPaths: true },
  // Two pages: the map, and the accessibility statement at /accessibility/.
  // The warning limit is in kB, minified, not gzipped: the code they share
  // (React and Base UI among it) is one chunk of about 400 kB, and the map's
  // own, with its 120 kB of boundaries, another of about 380 kB. The default of
  // 500 once warned on every build; this leaves room to grow while still
  // flagging a large new dependency.
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('index.html', import.meta.url)),
        accessibility: fileURLToPath(
          new URL('accessibility/index.html', import.meta.url),
        ),
      },
    },
  },
  // Pre-bundle every Base UI part, used or not. Otherwise the first test run
  // after adding a shadcn/ui component finds a new part, re-bundles mid-run and
  // reloads, failing with "Invalid hook call" (two copies of React).
  optimizeDeps: { include: ['@base-ui/react/*'] },
  plugins: [
    react(),
    tailwindcss(),
    {
      // Into every page: its title, which is copy too, from src/content/en.ts;
      // and the script that sets the theme before the page is first drawn.
      name: 'page-head',
      transformIndexHtml: (html) => ({
        html: html
          .replace('%APP_TITLE%', escapeHtml(en.appTitle))
          .replace('%STATEMENT_TITLE%', escapeHtml(en.statement.pageTitle)),
        tags: [{ tag: 'script', children: themeInit, injectTo: 'head' }],
      }),
    },
  ],
  test: {
    // Logic tests (*.test.ts) run in Node; component tests (*.test.tsx) in a real browser.
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/*.test.ts'],
          environment: 'node',
        },
      },
      {
        extends: true,
        test: {
          name: 'browser',
          include: ['src/**/*.test.tsx'],
          // Tailwind's classes only work with its stylesheet, which main.tsx loads in the app.
          setupFiles: ['./src/index.css'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
})
