// eslint.config.mjs
import next from 'eslint-config-next'
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactRefresh from 'eslint-plugin-react-refresh'
import { globalIgnores } from 'eslint/config'

export default [
  // ignore build artifacts
  globalIgnores(['.next', '.contentlayer', 'node_modules', 'dist']),

  // Next.js base (handles special exports like `metadata`, `viewport`, etc.)
  ...next,

  // TypeScript recommended
  ...tseslint.configs.recommended,

  // Extra plugins + relaxed rules so builds don’t fail
  {
    plugins: { 'jsx-a11y': jsxA11y, 'react-refresh': reactRefresh },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
      // If jsx-a11y throws on anchors without content, you can temporarily turn it off:
      // 'jsx-a11y/anchor-has-content': 'off',
    },
  },
]
