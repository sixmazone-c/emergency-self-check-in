// eslint.config.mjs (ESLint v9 flat config)
import js from '@eslint/js'
import globals from 'globals'
import * as tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactRefresh from 'eslint-plugin-react-refresh'
import nextPlugin from '@next/eslint-plugin-next'
import { FlatCompat } from '@eslint/eslintrc'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
})

export default [
  // ignore build artifacts
  { ignores: ['.next/**', '.contentlayer/**', 'node_modules/**', 'dist/**'] },

  // base JS & TS
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // bring in "next/core-web-vitals" (eslintrc) through compat
  ...compat.extends('next/core-web-vitals'),

  // add plugin objects + a few relaxed rules
  {
    plugins: {
      'jsx-a11y': jsxA11y,
      '@next/next': nextPlugin,
      'react-refresh': reactRefresh,
    },
    languageOptions: { ecmaVersion: 2020, globals: globals.browser },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // 'jsx-a11y/anchor-has-content': 'off', // uncomment if it blocks you
    },
  },
]
