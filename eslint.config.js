import process from 'node:process'
import antfu from '@antfu/eslint-config'

export default antfu({
  settings: {
    'import/core-modules': ['vue-router/auto-routes'],
  },
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
  ignores: ['src-tauri', 'dist', 'node_modules', '.vscode', 'scripts'],
  rules: {
    'antfu/if-newline': 'off',
    'no-console': [process.env.NODE_ENV === 'production' ? 'error' : 'warn', { allow: ['table', 'info', 'warn', 'error'] }],
    'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
    'pnpm/yaml-enforce-settings': ['off', { settings: { trustPolicy: ['off'] } }],
  },
  globals: {
    definePage: 'readonly',
  },
})
