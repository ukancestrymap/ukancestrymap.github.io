import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from 'eslint-config-prettier/flat'
import jsdoc from 'eslint-plugin-jsdoc'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

// Attributes whose values are shown or read aloud, so must come from the copy module.
const textAttributes =
  'alt|aria-label|aria-description|aria-placeholder|aria-roledescription|aria-valuetext|helperText|label|placeholder|text|title'
const useCopyInstead =
  'User-visible text belongs in src/content/en.ts; read it with useCopy().'

// shadcn/ui components, copied in by its CLI and kept as generated (see README).
const vendoredUi = 'src/components/ui/**'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    ignores: [vendoredUi],
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // Vendored components: only the basic bug-catching rules, not the strict or style ones.
    files: [vendoredUi],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    languageOptions: { globals: globals.browser },
  },
  {
    // TSDoc on every export of the app's source; tests are documented by their names.
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/**/*.test.ts', 'src/**/*.test.tsx', vendoredUi],
    extends: [jsdoc.configs['flat/recommended-typescript-error']],
    rules: {
      'jsdoc/require-jsdoc': [
        'error',
        {
          publicOnly: true,
          require: { FunctionDeclaration: true },
          contexts: [
            'TSInterfaceDeclaration',
            'TSTypeAliasDeclaration',
            'ExportNamedDeclaration > VariableDeclaration',
          ],
        },
      ],
      // TSDoc conventions where they differ from the plugin's JSDoc defaults:
      // a blank line after the summary, and no types in @throws.
      'jsdoc/require-hyphen-before-param-description': ['error', 'always'],
      'jsdoc/tag-lines': ['error', 'any', { startLines: 1 }],
      'jsdoc/require-throws-type': 'off',
      // Component props are documented once, on their interface, not per field again.
      'jsdoc/require-param': ['error', { checkDestructured: false }],
      'jsdoc/check-param-names': ['error', { checkDestructured: false }],
    },
  },
  {
    // No text written inline in components: it all lives in src/content/en.ts.
    files: ['src/**/*.tsx'],
    ignores: ['src/**/*.test.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        { selector: 'JSXText[value=/\\S/]', message: useCopyInstead },
        {
          selector:
            ':matches(JSXElement, JSXFragment) > JSXExpressionContainer > :matches(Literal[value=/\\S/], TemplateLiteral)',
          message: useCopyInstead,
        },
        {
          selector: `JSXAttribute[name.name=/^(${textAttributes})$/] > Literal`,
          message: useCopyInstead,
        },
        {
          selector: `JSXAttribute[name.name=/^(${textAttributes})$/] > JSXExpressionContainer > :matches(Literal, TemplateLiteral)`,
          message: useCopyInstead,
        },
      ],
    },
  },
  {
    files: ['**/*.js'],
    extends: [js.configs.recommended, tseslint.configs.disableTypeChecked],
    languageOptions: { globals: globals.node },
  },
  {
    // Inlined into each page's head, so it runs in the browser.
    files: ['src/theme-init.js'],
    languageOptions: { globals: globals.browser },
  },
  prettier,
])
