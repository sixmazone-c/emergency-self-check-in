// eslint.config.mjs
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

const config = [
  // ignore build artifacts + ตัวไฟล์ config เอง
  { ignores: ['.next/**', '.contentlayer/**', 'node_modules/**', 'dist/**', 'eslint.config.mjs'] },

  // base JS & TS
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // bring in "next/core-web-vitals" (eslintrc) via compat
  ...compat.extends('next/core-web-vitals'),

  // ⬇️ silence specific files
  {
    files: ['layouts/ListLayout.tsx', 'layouts/ListLayoutWithTags.tsx', 'layouts/PostSimple.tsx'],
    rules: { '@typescript-eslint/no-unused-vars': 'off' },
  },
  {
    files: ['src/App.tsx'],
    rules: { '@next/next/no-img-element': 'off' },
  },

  {
    plugins: {
      'jsx-a11y': jsxA11y,
      '@next/next': nextPlugin, // (จะคงไว้หรือถอดก็ได้; compat ข้างบนดึงให้แล้ว)
      'react-refresh': reactRefresh,
    },
    languageOptions: { ecmaVersion: 2020, globals: globals.browser },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // 'jsx-a11y/anchor-has-content': 'off', // เปิดเมื่อจำเป็น
    },
  },
]

export default config
