// eslint.config.mjs
import js from '@eslint/js'
import globals from 'globals'
import * as tseslint from 'typescript-eslint'
import nextPlugin from '@next/eslint-plugin-next'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactRefresh from 'eslint-plugin-react-refresh'
import { globalIgnores } from 'eslint/config'

export default [
  globalIgnores(['.next', '.contentlayer', 'node_modules', 'dist']),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  nextPlugin.configs['core-web-vitals'],
  {
    plugins: { 'jsx-a11y': jsxA11y, 'react-refresh': reactRefresh },
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
