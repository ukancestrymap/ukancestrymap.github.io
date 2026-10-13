import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'
import { en } from './src/content/en.ts'
import {
  analyticsEmbedScriptUrl,
  analyticsScriptUrl,
} from './src/content/links.ts'

const escapeHtml = (text: string) =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

// Set by the Deploy workflow to the site's domain, so only published builds
// count visits; unset in development, pull requests and local builds.
const analyticsDomain = process.env.PLAUSIBLE_DOMAIN

const themeInit = readFileSync(
  new URL('src/theme-init.js', import.meta.url),
  'utf8',
)

// https://vite.dev/config/
export default defineConfig({
  // Set in CI from actions/configure-pages: empty for a site at its domain's
  // root, as now, or '/name' for a GitHub project site; unset locally.
  base: `${process.env.BASE_PATH ?? ''}/`,
  // Import aliases such as "@/" come from tsconfig "paths", so they are defined once.
  resolve: { tsconfigPaths: true },
  // Four pages: the map, and the text pages /accessibility/, /privacy/ and
  // /analytics/.
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
        privacy: fileURLToPath(new URL('privacy/index.html', import.meta.url)),
        analytics: fileURLToPath(
          new URL('analytics/index.html', import.meta.url),
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
      // the script that sets the theme before the page is first drawn; and, in
      // published builds, the analytics script. Into the analytics page, also
      // Plausible's script for its embedded dashboard.
      name: 'page-head',
      transformIndexHtml: (html, { path }) => ({
        html: html
          .replace('%APP_TITLE%', escapeHtml(en.appTitle))
          .replace('%STATEMENT_TITLE%', escapeHtml(en.statement.pageTitle))
          .replace('%PRIVACY_TITLE%', escapeHtml(en.privacy.pageTitle))
          .replace('%ANALYTICS_TITLE%', escapeHtml(en.analytics.pageTitle)),
        tags: [
          { tag: 'script', children: themeInit, injectTo: 'head' },
          // Plausible: cookie-free visit counts, in published builds only.
          ...(analyticsDomain
            ? [
                {
                  tag: 'script',
                  attrs: {
                    defer: true,
                    'data-domain': analyticsDomain,
                    src: analyticsScriptUrl,
                  },
                  injectTo: 'head' as const,
                },
              ]
            : []),
          // On the analytics page, Plausible's script that sizes its embedded
          // dashboard to its content.
          ...(path === '/analytics/index.html'
            ? [
                {
                  tag: 'script',
                  attrs: { defer: true, src: analyticsEmbedScriptUrl },
                  injectTo: 'head' as const,
                },
              ]
            : []),
        ],
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
